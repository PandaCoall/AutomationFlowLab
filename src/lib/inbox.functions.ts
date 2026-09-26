import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { contentSettings } from "@/lib/content-settings";
import { parseEnquiry, type ParsedEnquiry } from "@/lib/enquiry";

export type SubmissionRow = {
  id: string;
  kind: string;
  topic: string;
  plan_interest: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  message: string;
  business_problem: string;
  existing_tools: string;
  desired_outcome: string;
  deadline: string;
  budget_range: string;
  status: string;
  notification_status: string;
  created_at: string;
};

export type EmailReport = {
  configured: boolean;
  summary: string;
};

type InboxOk = {
  access: "ok";
  viewerEmail: string;
  previewBypass: boolean;
  emailReport: EmailReport;
  savedAdmins: string[];
  submissions: SubmissionRow[];
};

type InboxDenied = {
  access: "denied";
  viewerEmail: string;
  emailReport: EmailReport;
};

async function database() {
  const { getSql } = await import("@/lib/db");
  return getSql();
}

function emailReport(): EmailReport {
  const key = Boolean(process.env.RESEND_API_KEY?.trim());
  const from = process.env.NOTIFY_FROM?.trim() ?? "";
  const to = contentSettings.contactEmail;
  if (key && from) {
    return {
      configured: true,
      summary: `Email notifications use Resend. New submissions are sent to ${to} from ${from}.`,
    };
  }
  if (key && !from) {
    return {
      configured: false,
      summary: `RESEND_API_KEY is set, but NOTIFY_FROM (a verified sender address) is missing, so nothing is emailed. Submissions stay in this inbox. The recipient would be ${to}.`,
    };
  }
  return {
    configured: false,
    summary: `No email service is configured. There is no RESEND_API_KEY, so submissions are not emailed. They stay in this inbox. To notify ${to} later, set RESEND_API_KEY and NOTIFY_FROM (a sender Resend has verified) on the server.`,
  };
}

async function notifyOwner(subject: string, text: string): Promise<"sent" | "not_configured" | "failed"> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.NOTIFY_FROM?.trim();
  if (!key || !from) return "not_configured";
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [contentSettings.contactEmail],
        subject,
        text,
      }),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}

async function clientIpHash(): Promise<string | null> {
  const { getRequest } = await import("@tanstack/react-start/server");
  const request = getRequest();
  if (!request) return null;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip")?.trim() || "";
  if (!ip) return null;
  const data = new TextEncoder().encode(`afl-inbox-v1|${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

async function allowlisted(email: string): Promise<{ allowed: boolean; savedAdmins: string[] }> {
  const sql = await database();
  const saved = await sql<{ email: string }>`select email from inbox_admins order by email`;
  const savedAdmins = saved.map((row) => row.email.toLowerCase());
  const configured = contentSettings.adminEmails.map((item) => item.toLowerCase());
  const allowed = configured.includes(email) || savedAdmins.includes(email);
  return { allowed, savedAdmins };
}

async function viewerEmail(userId: string): Promise<string> {
  const sql = await database();
  const rows = await sql<{ email: string }>`select email from "user" where id = ${userId} limit 1`;
  return (rows[0]?.email ?? "").toLowerCase();
}

async function previewOwner(email: string, userId: string): Promise<boolean> {
  const { isWorkspacePreview } = await import("@/lib/env.server");
  if (!isWorkspacePreview()) return false;
  const { getRequest } = await import("@tanstack/react-start/server");
  const request = getRequest();
  if (!request) return false;
  const { gateIdentityFromHeaders, gateIdentityUserInfo } = await import(
    "@/lib/auth/gate-identity.server"
  );
  const identity = await gateIdentityFromHeaders(request.headers);
  if (!identity) return false;
  const info = gateIdentityUserInfo(identity);
  return info.email === email || identity.sub === userId;
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }): Promise<{ ok: true } | { ok: false; message: string; fieldErrors?: Record<string, string> }> => {
    const parsed = parseEnquiry(data);
    if (!parsed.ok) {
      if (parsed.message === "honeypot") return { ok: true };
      return { ok: false, message: parsed.message, fieldErrors: parsed.fieldErrors };
    }
    const value: ParsedEnquiry = parsed.value;
    try {
      const sql = await database();
      const recent = await sql<{ n: number }>`
        select count(*)::int as n from submissions
        where email = ${value.email} and created_at > now() - interval '1 hour'
      `;
      if (Number(recent[0]?.n ?? 0) >= 5) {
        return {
          ok: false,
          message: `Too many enquiries from this email in the last hour. Write to ${contentSettings.contactEmail} if you still need to reach us.`,
        };
      }
      const ipHash = await clientIpHash();
      if (ipHash) {
        const byIp = await sql<{ n: number }>`
          select count(*)::int as n from submissions
          where ip_hash = ${ipHash} and created_at > now() - interval '1 hour'
        `;
        if (Number(byIp[0]?.n ?? 0) >= 12) {
          return {
            ok: false,
            message: `Too many enquiries were sent just now. Write to ${contentSettings.contactEmail} instead.`,
          };
        }
      }

      const id = crypto.randomUUID();
      await sql`
        insert into submissions (
          id, kind, topic, plan_interest, name, email, phone, organisation, message,
          business_problem, existing_tools, desired_outcome, deadline, budget_range,
          status, notification_status, ip_hash
        ) values (
          ${id}, ${value.kind}, ${value.topic}, ${value.plan}, ${value.name}, ${value.email},
          ${value.phone}, ${value.organisation}, ${value.message}, ${value.businessProblem},
          ${value.existingTools}, ${value.desiredOutcome}, ${value.deadline}, ${value.budgetRange},
          'new', 'not_configured', ${ipHash}
        )
      `;

      const subject = `New enquiry (${value.kind}) from ${value.name}`;
      const body = [
        `Name: ${value.name}`,
        `Email: ${value.email}`,
        value.phone ? `Phone: ${value.phone}` : "",
        value.organisation ? `Organisation: ${value.organisation}` : "",
        value.topic ? `Topic: ${value.topic}` : "",
        value.plan ? `Plan: ${value.plan}` : "",
        value.businessProblem ? `Problem:\n${value.businessProblem}` : "",
        value.existingTools ? `Existing tools:\n${value.existingTools}` : "",
        value.desiredOutcome ? `Desired outcome:\n${value.desiredOutcome}` : "",
        value.deadline ? `Deadline: ${value.deadline}` : "",
        value.budgetRange ? `Budget range: ${value.budgetRange}` : "",
        value.message ? `Message:\n${value.message}` : "",
        "",
        "Stored in the Automation Flow Lab submission inbox.",
      ]
        .filter(Boolean)
        .join("\n\n");
      const notification = await notifyOwner(subject, body);
      if (notification !== "not_configured") {
        await sql`update submissions set notification_status = ${notification} where id = ${id}`;
      }
      return { ok: true };
    } catch {
      return {
        ok: false,
        message: `We could not store that enquiry. Email ${contentSettings.contactEmail} and we will pick it up from there.`,
      };
    }
  });

export const listInbox = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<InboxOk | InboxDenied> => {
    const email = await viewerEmail(context.userId);
    const report = emailReport();
    const list = await allowlisted(email);
    const bypass = !list.allowed && (await previewOwner(email, context.userId));
    if (!list.allowed && !bypass) {
      return { access: "denied", viewerEmail: email, emailReport: report };
    }
    const sql = await database();
    const submissions = await sql<SubmissionRow>`
      select id, kind, topic, plan_interest, name, email, phone, organisation, message,
             business_problem, existing_tools, desired_outcome, deadline, budget_range,
             status, notification_status,
             to_char(created_at at time zone 'UTC', 'YYYY-MM-DD HH24:MI') || ' UTC' as created_at
      from submissions
      order by created_at desc
      limit 200
    `;
    return {
      access: "ok",
      viewerEmail: email,
      previewBypass: bypass,
      emailReport: report,
      savedAdmins: list.savedAdmins,
      submissions,
    };
  });

export const setSubmissionStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const data = input as { id?: unknown; status?: unknown };
    const id = typeof data.id === "string" ? data.id : "";
    const status = data.status;
    if (!id || (status !== "new" && status !== "reviewed" && status !== "archived")) {
      throw new Error("Invalid update");
    }
    return { id, status };
  })
  .handler(async ({ context, data }) => {
    const email = await viewerEmail(context.userId);
    const list = await allowlisted(email);
    const bypass = !list.allowed && (await previewOwner(email, context.userId));
    if (!list.allowed && !bypass) return { ok: false as const };
    const sql = await database();
    await sql`update submissions set status = ${data.status} where id = ${data.id}`;
    return { ok: true as const };
  });

export const saveInboxAdmin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const email = await viewerEmail(context.userId);
    const list = await allowlisted(email);
    const bypass = !list.allowed && (await previewOwner(email, context.userId));
    if (!list.allowed && !bypass) return { ok: false as const, message: "You cannot change inbox access." };
    if (!email || email.endsWith("@viewer.grok.invalid") || !email.includes("@")) {
      return {
        ok: false as const,
        message: "This sign-in has no email address we can save for later.",
      };
    }
    const sql = await database();
    await sql`insert into inbox_admins (email) values (${email}) on conflict (email) do nothing`;
    return { ok: true as const, email };
  });
