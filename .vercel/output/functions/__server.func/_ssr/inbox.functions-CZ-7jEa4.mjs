import { t as contentSettings } from "./content-settings-DrZStKzz.mjs";
import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DvxaY5kF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox.functions-CZ-7jEa4.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var planIds = [
	"care",
	"operations",
	"partner"
];
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function text(value, max) {
	if (typeof value !== "string") return "";
	return value.trim().replace(/\s+/g, " ").slice(0, max);
}
function longText(value, max) {
	if (typeof value !== "string") return "";
	return value.trim().slice(0, max);
}
function parseEnquiry(raw) {
	if (!raw || typeof raw !== "object") return {
		ok: false,
		message: "That form could not be read. Refresh and try again.",
		fieldErrors: {}
	};
	const input = raw;
	const kind = input.kind;
	if (kind !== "contact" && kind !== "tool" && kind !== "custom" && kind !== "plan") return {
		ok: false,
		message: "That form could not be read. Refresh and try again.",
		fieldErrors: {}
	};
	if (typeof input.website === "string" ? input.website.trim() : "") return {
		ok: false,
		message: "honeypot",
		fieldErrors: {}
	};
	const startedAt = typeof input.startedAt === "number" ? input.startedAt : Number(input.startedAt);
	const elapsed = Date.now() - startedAt;
	if (!Number.isFinite(startedAt) || elapsed < 700) return {
		ok: false,
		message: "Please wait a moment and send the form again.",
		fieldErrors: {}
	};
	if (elapsed > 864e5) return {
		ok: false,
		message: "This form has been open too long. Refresh the page and try again.",
		fieldErrors: {}
	};
	const value = {
		kind,
		topic: text(input.topic, 160),
		plan: text(input.plan, 40),
		name: text(input.name, 120),
		email: text(input.email, 200).toLowerCase(),
		phone: text(input.phone, 40),
		organisation: text(input.organisation, 160),
		message: longText(input.message, 5e3),
		businessProblem: longText(input.businessProblem, 4e3),
		existingTools: longText(input.existingTools, 4e3),
		desiredOutcome: longText(input.desiredOutcome, 4e3),
		deadline: text(input.deadline, 160),
		budgetRange: text(input.budgetRange, 160),
		startedAt
	};
	const fieldErrors = {};
	if (value.name.length < 2) fieldErrors.name = "Enter your name.";
	if (!emailPattern.test(value.email)) fieldErrors.email = "Enter a valid email address.";
	if (input.consent !== true) fieldErrors.consent = "Confirm that we may store these details so we can reply.";
	if (kind === "contact" || kind === "tool" || kind === "plan") {
		if (value.message.length < 10) fieldErrors.message = "Add a short note — at least a sentence — so we know what you need.";
	}
	if (kind === "tool" && !value.topic) fieldErrors.topic = "Choose a tool.";
	if (kind === "plan" && !planIds.includes(value.plan)) fieldErrors.plan = "Choose Care, Operations, or Partner.";
	if (kind === "custom") {
		if (value.businessProblem.length < 10) fieldErrors.businessProblem = "Describe the business problem in a sentence or two.";
		if (value.existingTools.length < 2) fieldErrors.existingTools = "Name the tools you use today, or say that you are starting from scratch.";
		if (value.desiredOutcome.length < 10) fieldErrors.desiredOutcome = "Describe the outcome you want.";
		if (value.deadline.length < 2) fieldErrors.deadline = "Add a deadline, or write that there isn’t one yet.";
	}
	if (Object.keys(fieldErrors).length > 0) return {
		ok: false,
		message: "Check the highlighted fields and try again.",
		fieldErrors
	};
	return {
		ok: true,
		value
	};
}
async function database() {
	const { getSql } = await import("./db-DFfNIozR.mjs").then((n) => n.t).then((n) => n.t);
	return getSql();
}
function emailReport() {
	const key = Boolean(process.env.RESEND_API_KEY?.trim());
	const from = process.env.NOTIFY_FROM?.trim() ?? "";
	const to = contentSettings.contactEmail;
	if (key && from) return {
		configured: true,
		summary: `Email notifications use Resend. New submissions are sent to ${to} from ${from}.`
	};
	if (key && !from) return {
		configured: false,
		summary: `RESEND_API_KEY is set, but NOTIFY_FROM (a verified sender address) is missing, so nothing is emailed. Submissions stay in this inbox. The recipient would be ${to}.`
	};
	return {
		configured: false,
		summary: `No email service is configured. There is no RESEND_API_KEY, so submissions are not emailed. They stay in this inbox. To notify ${to} later, set RESEND_API_KEY and NOTIFY_FROM (a sender Resend has verified) on the server.`
	};
}
async function notifyOwner(subject, text) {
	const key = process.env.RESEND_API_KEY?.trim();
	const from = process.env.NOTIFY_FROM?.trim();
	if (!key || !from) return "not_configured";
	try {
		return (await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${key}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				from,
				to: [contentSettings.contactEmail],
				subject,
				text
			})
		})).ok ? "sent" : "failed";
	} catch {
		return "failed";
	}
}
async function clientIpHash() {
	const { getRequest } = await import("./ssr.mjs").then((n) => n.s).then((n) => n.t);
	const request = getRequest();
	if (!request) return null;
	const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "";
	if (!ip) return null;
	const data = new TextEncoder().encode(`afl-inbox-v1|${ip}`);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 32);
}
async function allowlisted(email) {
	const savedAdmins = (await (await database())`select email from inbox_admins order by email`).map((row) => row.email.toLowerCase());
	return {
		allowed: contentSettings.adminEmails.map((item) => item.toLowerCase()).includes(email) || savedAdmins.includes(email),
		savedAdmins
	};
}
async function viewerEmail(userId) {
	return ((await (await database())`select email from "user" where id = ${userId} limit 1`)[0]?.email ?? "").toLowerCase();
}
async function previewOwner(email, userId) {
	const { isWorkspacePreview } = await import("./env.server-B4a86VpI.mjs").then((n) => n.n).then((n) => n.n);
	if (!isWorkspacePreview()) return false;
	const { getRequest } = await import("./ssr.mjs").then((n) => n.s).then((n) => n.t);
	const request = getRequest();
	if (!request) return false;
	const { gateIdentityFromHeaders, gateIdentityUserInfo } = await import("./gate-identity.server-DWftSsHF.mjs").then((n) => n.a).then((n) => n.a);
	const identity = await gateIdentityFromHeaders(request.headers);
	if (!identity) return false;
	return gateIdentityUserInfo(identity).email === email || identity.sub === userId;
}
var submitEnquiry_createServerFn_handler = createServerRpc({
	id: "0706f38b0444c8765d553b3809d2a3a34b1a1e28685ae7ad9a0801037e5d0c78",
	name: "submitEnquiry",
	filename: "src/lib/inbox.functions.ts"
}, (opts) => submitEnquiry.__executeServer(opts));
var submitEnquiry = createServerFn({ method: "POST" }).validator((input) => input).handler(submitEnquiry_createServerFn_handler, async ({ data }) => {
	const parsed = parseEnquiry(data);
	if (!parsed.ok) {
		if (parsed.message === "honeypot") return { ok: true };
		return {
			ok: false,
			message: parsed.message,
			fieldErrors: parsed.fieldErrors
		};
	}
	const value = parsed.value;
	try {
		const sql = await database();
		const recent = await sql`
        select count(*)::int as n from submissions
        where email = ${value.email} and created_at > now() - interval '1 hour'
      `;
		if (Number(recent[0]?.n ?? 0) >= 5) return {
			ok: false,
			message: `Too many enquiries from this email in the last hour. Write to ${contentSettings.contactEmail} if you still need to reach us.`
		};
		const ipHash = await clientIpHash();
		if (ipHash) {
			const byIp = await sql`
          select count(*)::int as n from submissions
          where ip_hash = ${ipHash} and created_at > now() - interval '1 hour'
        `;
			if (Number(byIp[0]?.n ?? 0) >= 12) return {
				ok: false,
				message: `Too many enquiries were sent just now. Write to ${contentSettings.contactEmail} instead.`
			};
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
		const notification = await notifyOwner(`New enquiry (${value.kind}) from ${value.name}`, [
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
			"Stored in the Automation Flow Lab submission inbox."
		].filter(Boolean).join("\n\n"));
		if (notification !== "not_configured") await sql`update submissions set notification_status = ${notification} where id = ${id}`;
		return { ok: true };
	} catch {
		return {
			ok: false,
			message: `We could not store that enquiry. Email ${contentSettings.contactEmail} and we will pick it up from there.`
		};
	}
});
var listInbox_createServerFn_handler = createServerRpc({
	id: "35f04cc976fc41c203f610c3457b2f6750a3bc99626a2619ab702ca8c0837069",
	name: "listInbox",
	filename: "src/lib/inbox.functions.ts"
}, (opts) => listInbox.__executeServer(opts));
var listInbox = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listInbox_createServerFn_handler, async ({ context }) => {
	const email = await viewerEmail(context.userId);
	const report = emailReport();
	const list = await allowlisted(email);
	const bypass = !list.allowed && await previewOwner(email, context.userId);
	if (!list.allowed && !bypass) return {
		access: "denied",
		viewerEmail: email,
		emailReport: report
	};
	const submissions = await (await database())`
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
		submissions
	};
});
var setSubmissionStatus_createServerFn_handler = createServerRpc({
	id: "0fb59186323b3d475fec9686a6002dedc68c1744051ec28f54e9c670ac9c77ba",
	name: "setSubmissionStatus",
	filename: "src/lib/inbox.functions.ts"
}, (opts) => setSubmissionStatus.__executeServer(opts));
var setSubmissionStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const data = input;
	const id = typeof data.id === "string" ? data.id : "";
	const status = data.status;
	if (!id || status !== "new" && status !== "reviewed" && status !== "archived") throw new Error("Invalid update");
	return {
		id,
		status
	};
}).handler(setSubmissionStatus_createServerFn_handler, async ({ context, data }) => {
	const email = await viewerEmail(context.userId);
	const list = await allowlisted(email);
	const bypass = !list.allowed && await previewOwner(email, context.userId);
	if (!list.allowed && !bypass) return { ok: false };
	await (await database())`update submissions set status = ${data.status} where id = ${data.id}`;
	return { ok: true };
});
var saveInboxAdmin_createServerFn_handler = createServerRpc({
	id: "3b8519963e37f6c4e2ccbe3659661738961c9742fed0aa6ab684a7bae5b70570",
	name: "saveInboxAdmin",
	filename: "src/lib/inbox.functions.ts"
}, (opts) => saveInboxAdmin.__executeServer(opts));
var saveInboxAdmin = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(saveInboxAdmin_createServerFn_handler, async ({ context }) => {
	const email = await viewerEmail(context.userId);
	const list = await allowlisted(email);
	const bypass = !list.allowed && await previewOwner(email, context.userId);
	if (!list.allowed && !bypass) return {
		ok: false,
		message: "You cannot change inbox access."
	};
	if (!email || email.endsWith("@viewer.grok.invalid") || !email.includes("@")) return {
		ok: false,
		message: "This sign-in has no email address we can save for later."
	};
	await (await database())`insert into inbox_admins (email) values (${email}) on conflict (email) do nothing`;
	return {
		ok: true,
		email
	};
});
//#endregion
export { listInbox_createServerFn_handler, saveInboxAdmin_createServerFn_handler, setSubmissionStatus_createServerFn_handler, submitEnquiry_createServerFn_handler };
