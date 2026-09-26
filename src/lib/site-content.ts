import { contentSettings } from "@/lib/content-settings";

export const site = {
  name: "Automation Flow Lab",
  domain: contentSettings.domain,
  email: contentSettings.contactEmail,
  positioning: "Business tools that do the repetitive work for you.",
  supporting:
    "We build practical webapps, AI-powered workflows, and connected business systems, then support them after launch. From Excel problems to Zoho and SharePoint configuration, we make your processes easier to run.",
} as const;

export const nav = [
  { to: "/tools", label: "Tools" },
  { to: "/services", label: "Services" },
  { to: "/custom-builds", label: "Custom Builds" },
  { to: "/support-plans", label: "Support Plans" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export type ToolStatus = "coming-soon" | "available";

export type Tool = {
  slug: string;
  name: string;
  status: ToolStatus;
  summary: string;
  audience: string;
  outcome: string;
  features: string[];
};

/**
 * A product is "available" only when its signed-in workflow actually works.
 * Until then it stays "coming-soon". Do not add a fake interactive demo.
 */
export const tools: Tool[] = [
  {
    slug: "automation-watch",
    name: "Automation Watch",
    status: "coming-soon",
    summary: "A short list of named workflows with the last successful run and the last failure.",
    audience:
      "The person who owns overnight flows, scheduled jobs, and connectors that fail quietly until a client notices.",
    outcome:
      "You see which automation is healthy and which one stopped, without opening every tool to check.",
    features: [
      "A named list of the workflows you care about",
      "Last successful run and last failure on each one",
      "A simple healthy or not status — not a monitoring suite",
      "A place to note what you checked after a fail",
    ],
  },
  {
    slug: "analytics-health-check",
    name: "Analytics Health Check",
    status: "coming-soon",
    summary: "A first pass on whether the site tag is present, firing, and on the right domain.",
    audience: "Anyone whose traffic suddenly reads as zero, or who cannot tell if measurement is on at all.",
    outcome:
      "You know whether the numbers are real before anyone spends an hour arguing about a dashboard.",
    features: [
      "A check that the analytics tag is on the pages you name",
      "A note on whether a hit is actually being sent",
      "A flag when the tag is on the wrong domain or a staging host",
      "A plain-language result. A full setup or repair is booked as analytics work, not inside this page",
    ],
  },
  {
    slug: "excel-health-check",
    name: "Excel Health Check",
    status: "coming-soon",
    summary:
      "A written review of a workbook: what is wrong, what is fragile, and what to fix first.",
    audience:
      "Anyone whose spreadsheet is the system — slow, wrong, or understood by only one person.",
    outcome:
      "A repair order you can act on — not a dashboard bolted onto a workbook that is already untrustworthy.",
    features: [
      "A review of structure, formulas, and where the numbers come from",
      "Notes on broken links, hidden sheets, and reports that depend on one person’s layout",
      "A split between figures that are wrong and a file that is merely hard to maintain",
      "A short repair plan. Hands-on fixes are booked separately as Excel work, not inside this page",
    ],
  },
  {
    slug: "form-to-inbox-check",
    name: "Form-to-Inbox Check",
    status: "coming-soon",
    summary: "Confirm that a website form still lands in the mailbox or system it is supposed to hit.",
    audience: "The person who finds out a contact form died only when a customer says they never heard back.",
    outcome: "You know the form posts, and where the message goes, before the next enquiry disappears.",
    features: [
      "A named form and the destination it should reach",
      "A record of the last successful delivery you checked",
      "A clear failed state when the destination does not receive it",
      "No claim that we connect to a mailbox we have not configured",
    ],
  },
  {
    slug: "doc-extract",
    name: "Doc Extract",
    status: "coming-soon",
    summary: "Upload a PDF or photo of a document and get the fields a person would otherwise retype.",
    audience:
      "Anyone pasting supplier invoices, signed forms, or quote photos into a sheet or into Zoho by hand.",
    outcome: "Name, date, amount, and reference come out as fields you can check, then copy onward.",
    features: [
      "Upload a PDF or image",
      "Extract the fields you asked for, not a summary essay",
      "A human check before anything is treated as correct",
      "A change you can copy into Excel or a configured Zoho module",
    ],
  },
  {
    slug: "mail-flow-check",
    name: "Mail Flow Check",
    status: "coming-soon",
    summary: "A short read of whether domain mail is set up to leave and to be trusted.",
    audience: "Anyone whose mail lands in spam, or whose domain records were never checked after a host change.",
    outcome: "You see SPF, DKIM, and DMARC as present or missing, plus whether a test message left.",
    features: [
      "A check of the mail records on the domain you name",
      "A plain note on what is missing",
      "A record of a test send, when one has been run",
      "Fixes to DNS or Zoho mail are booked as configuration work, not promised from this page",
    ],
  },
  {
    slug: "sharepoint-library-builder",
    name: "SharePoint Library Builder",
    status: "coming-soon",
    summary: "Name the libraries, columns, and who should see them. Get a build list, not another drive.",
    audience:
      "Teams whose current files are in personal OneDrive and email, and who need a library structure before anyone migrates.",
    outcome: "A written library plan you can implement — or hand to us to build in SharePoint.",
    features: [
      "Libraries named for the work, not for a department chart",
      "The columns a file needs so the current version is obvious",
      "Who should see each library, written down before permissions are applied",
      "This page does not create a SharePoint site. Building it is the SharePoint service",
    ],
  },
  {
    slug: "change-request",
    name: "Change Request",
    status: "coming-soon",
    summary: "One place for a technical ask: access, a publish, or a change — and the decision that followed.",
    audience:
      "The person who gets “I can’t open the library” or “please publish this” by email, then cannot find what was approved.",
    outcome: "The request has a status, a named owner, and a recorded yes, no, or send-back.",
    features: [
      "A form for access, publish, or a system change — not leave or expenses",
      "A queue of items waiting on a technical decision",
      "Who decided, and a short reason",
      "A status the requester can check without another chase",
    ],
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export type Service = {
  slug: string;
  name: string;
  problem: string;
  deliverables: string[];
  enquiryTopic: string;
};

export const services: Service[] = [
  {
    slug: "ai-workflow-automation",
    name: "AI and workflow automation",
    problem:
      "The same details get copied between email, spreadsheets, and chat, and the next step waits on someone remembering it.",
    deliverables: [
      "A written map of the process as it actually runs",
      "An automated workflow for the repetitive steps",
      "A handover note on what runs on its own and what still needs a person",
      "Optional support after it is in use",
    ],
    enquiryTopic: "AI and workflow automation",
  },
  {
    slug: "custom-webapps",
    name: "Custom webapp design, development, and ongoing support",
    problem:
      "A spreadsheet or a chain of emails is doing a job that needs a proper screen, a clear status, and more than one person using it.",
    deliverables: [
      "A scoped webapp for that job",
      "The design and the build",
      "A handover so your team can run it",
      "Ongoing support after launch, if you want it",
    ],
    enquiryTopic: "Custom webapp",
  },
  {
    slug: "excel",
    name: "Excel troubleshooting and reporting repair",
    problem:
      "A workbook is slow, shows the wrong number, or only one person knows how it works.",
    deliverables: [
      "A diagnosis of what is broken",
      "Repairs to formulas and to the way the report is laid out",
      "Notes so someone else can maintain the file",
      "This is hands-on work on your workbook, not a self-serve checker on this website",
    ],
    enquiryTopic: "Excel troubleshooting",
  },
  {
    slug: "analytics",
    name: "Website analytics setup and troubleshooting",
    problem:
      "You cannot tell whether the site is being measured, or the numbers you see do not match what you expect.",
    deliverables: [
      "A working analytics setup, or a repair of the one you have",
      "A check that the site is actually sending data",
      "A plain-language note on what those numbers mean",
      "Where the site already uses Google Analytics, we set that up or fix it. We do not promise a particular vendor feature we have not confirmed on your account",
    ],
    enquiryTopic: "Website analytics",
  },
  {
    slug: "zoho",
    name: "Zoho configuration and integrations",
    problem:
      "Zoho is in place, but the modules, fields, or hand-offs do not match how the business actually works.",
    deliverables: [
      "Configuration of the Zoho apps you already use",
      "A short written record of how it is set up",
      "Connections between those Zoho apps where Zoho itself supports them",
      "We will not promise a third-party connector until we have confirmed it for your account",
    ],
    enquiryTopic: "Zoho configuration",
  },
  {
    slug: "sharepoint",
    name: "SharePoint workspace and document-library design",
    problem:
      "Files live in personal drives and email threads, so people cannot find the current version.",
    deliverables: [
      "A SharePoint workspace structure for the team that will use it",
      "Document libraries with a sensible set of folders or columns",
      "A short guide for the people who will work in it",
      "Permissions agreed with you — not an organisation-wide rollout you have not asked for",
    ],
    enquiryTopic: "SharePoint design",
  },
];

export const buildSteps = [
  {
    name: "Discovery",
    text: "We talk through the problem, who does the work today, and what a better week would look like. You do not need a specification to start.",
  },
  {
    name: "Scoping",
    text: "We write what will be built, what will not, and what we need from you. You can decide whether to go ahead before any build starts.",
  },
  {
    name: "Build",
    text: "We design and build the agreed thing, and show you progress you can react to. The length depends on the work — we do not publish a fixed timeline here.",
  },
  {
    name: "Handover",
    text: "You get the working system, notes on how to use it, and what to do if it breaks.",
  },
  {
    name: "Optional support",
    text: "If you want us to stay on, we agree a support plan. Support is optional. It is not bundled into the build unless we say so in the scope.",
  },
] as const;

export type PlanId = "care" | "operations" | "partner";

export type Plan = {
  id: PlanId;
  name: string;
  for: string;
  includes: string[];
  notIncluded: string[];
};

export const plans: Plan[] = [
  {
    id: "care",
    name: "Care",
    for: "Maintenance and support for one system.",
    includes: [
      "Fixes and small adjustments to that one system",
      "Answers about how that system works",
      "A named point of contact for it",
    ],
    notIncluded: [
      "Other systems",
      "New projects or a feature backlog",
      "Monitoring across several tools",
    ],
  },
  {
    id: "operations",
    name: "Operations",
    for: "Several connected systems, plus monitoring.",
    includes: [
      "Care-level maintenance for each system named in the agreement",
      "Agreed checks so a failed hand-off is noticed",
      "A note to you when one of those checks fails",
    ],
    notIncluded: [
      "A standing backlog of new features",
      "Systems that are not named in the agreement",
    ],
  },
  {
    id: "partner",
    name: "Partner",
    for: "Priority ongoing improvement and planned development.",
    includes: [
      "Everything in Operations",
      "Development time for improvements agreed in advance",
      "Those planned items scheduled ahead of one-off requests",
    ],
    notIncluded: [
      "Unnamed or unlimited scope",
      "A promise that every new idea starts immediately",
    ],
  },
];

export const planAgreementNote =
  "These are proposed plan scopes, not a contract. Exact response times, working hours, exclusions, and fees are set in each client agreement. Nothing on this page is a price or a guarantee.";

export const problems = [
  {
    stuck: "An automation fails overnight and nobody notices until a client does.",
    change: "The workflow has a last-run status you can see without opening every tool.",
  },
  {
    stuck: "A spreadsheet is the only copy of the truth, and it breaks.",
    change: "The workbook is diagnosed, then repaired as Excel work — not dressed up as a dashboard.",
  },
  {
    stuck: "A form, a tag, or mail stops working after a host or domain change.",
    change: "You check whether it still posts, fires, or leaves — before the next enquiry vanishes.",
  },
  {
    stuck: "Someone retypes a PDF or a photo into a sheet or into Zoho.",
    change: "The fields come out for a person to check, then copy into the system that already exists.",
  },
  {
    stuck: "SharePoint or Zoho is there, but the setup fights the way the systems should work.",
    change: "Libraries, fields, and mail are configured so the technical hand-off is obvious.",
  },
] as const;

export const privacySummary =
  "We store what you submit — your name, email, and the details of the enquiry — so we can reply and keep a record of the request. We also store a short hash of the network address to limit spam, not the address itself. We do not sell this information. To ask for a copy or for deletion, email " +
  site.email +
  ". We keep a submission until the enquiry is finished and any agreed follow-up is done, unless you ask us to remove it sooner or we have to keep it.";
