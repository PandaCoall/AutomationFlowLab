export const enquiryKinds = ["contact", "tool", "custom", "plan"] as const;
export type EnquiryKind = (typeof enquiryKinds)[number];

export const planIds = ["care", "operations", "partner"] as const;
export type PlanId = (typeof planIds)[number];

export type EnquiryInput = {
  kind: EnquiryKind;
  topic: string;
  plan: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  message: string;
  businessProblem: string;
  existingTools: string;
  desiredOutcome: string;
  deadline: string;
  budgetRange: string;
  consent: boolean;
  website: string;
  startedAt: number;
};

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export type ParsedEnquiry = {
  kind: EnquiryKind;
  topic: string;
  plan: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  message: string;
  businessProblem: string;
  existingTools: string;
  desiredOutcome: string;
  deadline: string;
  budgetRange: string;
  startedAt: number;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, max);
}

function longText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function parseEnquiry(
  raw: unknown,
): { ok: true; value: ParsedEnquiry } | { ok: false; message: string; fieldErrors: FieldErrors } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, message: "That form could not be read. Refresh and try again.", fieldErrors: {} };
  }
  const input = raw as Record<string, unknown>;
  const kind = input.kind;
  if (kind !== "contact" && kind !== "tool" && kind !== "custom" && kind !== "plan") {
    return { ok: false, message: "That form could not be read. Refresh and try again.", fieldErrors: {} };
  }

  const website = typeof input.website === "string" ? input.website.trim() : "";
  if (website) {
    return { ok: false, message: "honeypot", fieldErrors: {} };
  }

  const startedAt = typeof input.startedAt === "number" ? input.startedAt : Number(input.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < 700) {
    return {
      ok: false,
      message: "Please wait a moment and send the form again.",
      fieldErrors: {},
    };
  }
  if (elapsed > 24 * 60 * 60 * 1000) {
    return {
      ok: false,
      message: "This form has been open too long. Refresh the page and try again.",
      fieldErrors: {},
    };
  }

  const value: ParsedEnquiry = {
    kind,
    topic: text(input.topic, 160),
    plan: text(input.plan, 40),
    name: text(input.name, 120),
    email: text(input.email, 200).toLowerCase(),
    phone: text(input.phone, 40),
    organisation: text(input.organisation, 160),
    message: longText(input.message, 5000),
    businessProblem: longText(input.businessProblem, 4000),
    existingTools: longText(input.existingTools, 4000),
    desiredOutcome: longText(input.desiredOutcome, 4000),
    deadline: text(input.deadline, 160),
    budgetRange: text(input.budgetRange, 160),
    startedAt,
  };

  const fieldErrors: FieldErrors = {};
  if (value.name.length < 2) fieldErrors.name = "Enter your name.";
  if (!emailPattern.test(value.email)) fieldErrors.email = "Enter a valid email address.";
  if (input.consent !== true) {
    fieldErrors.consent = "Confirm that we may store these details so we can reply.";
  }

  if (kind === "contact" || kind === "tool" || kind === "plan") {
    if (value.message.length < 10) {
      fieldErrors.message = "Add a short note — at least a sentence — so we know what you need.";
    }
  }
  if (kind === "tool" && !value.topic) {
    fieldErrors.topic = "Choose a tool.";
  }
  if (kind === "plan" && !planIds.includes(value.plan as PlanId)) {
    fieldErrors.plan = "Choose Care, Operations, or Partner.";
  }
  if (kind === "custom") {
    if (value.businessProblem.length < 10) {
      fieldErrors.businessProblem = "Describe the business problem in a sentence or two.";
    }
    if (value.existingTools.length < 2) {
      fieldErrors.existingTools = "Name the tools you use today, or say that you are starting from scratch.";
    }
    if (value.desiredOutcome.length < 10) {
      fieldErrors.desiredOutcome = "Describe the outcome you want.";
    }
    if (value.deadline.length < 2) {
      fieldErrors.deadline = "Add a deadline, or write that there isn’t one yet.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  return { ok: true, value };
}
