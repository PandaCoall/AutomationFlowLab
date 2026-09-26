import { t as contentSettings } from "./content-settings-DrZStKzz.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BfRze0pK.js
var site = {
	name: "Automation Flow Lab",
	domain: contentSettings.domain,
	email: contentSettings.contactEmail,
	positioning: "Business tools that do the repetitive work for you.",
	supporting: "We build practical webapps, AI-powered workflows, and connected business systems, then support them after launch. From Excel problems to Zoho and SharePoint configuration, we make your processes easier to run."
};
var nav = [
	{
		to: "/tools",
		label: "Tools"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/custom-builds",
		label: "Custom Builds"
	},
	{
		to: "/support-plans",
		label: "Support Plans"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
/**
* A product is "available" only when its signed-in workflow actually works.
* Until then it stays "coming-soon". Do not add a fake interactive demo.
*/
var tools = [
	{
		slug: "request-approval-hub",
		name: "Request & Approval Hub",
		status: "coming-soon",
		summary: "One place to submit an internal request, see who it is waiting on, and keep the decision.",
		audience: "Team leads and office managers who approve requests by email or chat, and then lose track of what was decided.",
		outcome: "A request has a status, a named approver, and a recorded yes or no — instead of another chase email.",
		features: [
			"A request form with the details a reviewer actually needs",
			"A queue of items waiting for a decision",
			"A record of who approved or sent it back, and a short reason",
			"A status the requester can check without sending a follow-up"
		]
	},
	{
		slug: "excel-health-check",
		name: "Excel Health Check",
		status: "coming-soon",
		summary: "A written review of a workbook: what is wrong, what is fragile, and what to fix first.",
		audience: "Anyone who inherited a spreadsheet, or who is the only person who understands how the numbers are made.",
		outcome: "A repair order you can act on — not a dashboard bolted onto a workbook that is already untrustworthy.",
		features: [
			"A review of structure, formulas, and where the numbers come from",
			"Notes on broken links, hidden sheets, and reports that depend on one person’s layout",
			"A split between figures that are wrong and a file that is merely hard to maintain",
			"A short repair plan. Hands-on fixes are booked separately as Excel work, not inside this page"
		]
	},
	{
		slug: "client-operations-portal",
		name: "Client Operations Portal",
		status: "coming-soon",
		summary: "A single list of client work, with the notes and documents that belong to each job.",
		audience: "Small client-service teams who track work across an inbox, a spreadsheet, and a shared drive.",
		outcome: "You can see what is waiting on you and what is waiting on the client, without hunting through threads.",
		features: [
			"A client list with the current job and its status",
			"A place for the notes and files that belong to that client",
			"A simple split between waiting on you and waiting on the client",
			"Access for the people who should see a client, and not for everyone else"
		]
	}
];
function getTool(slug) {
	return tools.find((tool) => tool.slug === slug);
}
var services = [
	{
		slug: "ai-workflow-automation",
		name: "AI and workflow automation",
		problem: "The same details get copied between email, spreadsheets, and chat, and the next step waits on someone remembering it.",
		deliverables: [
			"A written map of the process as it actually runs",
			"An automated workflow for the repetitive steps",
			"A handover note on what runs on its own and what still needs a person",
			"Optional support after it is in use"
		],
		enquiryTopic: "AI and workflow automation"
	},
	{
		slug: "custom-webapps",
		name: "Custom webapp design, development, and ongoing support",
		problem: "A spreadsheet or a chain of emails is doing a job that needs a proper screen, a clear status, and more than one person using it.",
		deliverables: [
			"A scoped webapp for that job",
			"The design and the build",
			"A handover so your team can run it",
			"Ongoing support after launch, if you want it"
		],
		enquiryTopic: "Custom webapp"
	},
	{
		slug: "excel",
		name: "Excel troubleshooting and reporting repair",
		problem: "A workbook is slow, shows the wrong number, or only one person knows how it works.",
		deliverables: [
			"A diagnosis of what is broken",
			"Repairs to formulas and to the way the report is laid out",
			"Notes so someone else can maintain the file",
			"This is hands-on work on your workbook, not a self-serve checker on this website"
		],
		enquiryTopic: "Excel troubleshooting"
	},
	{
		slug: "analytics",
		name: "Website analytics setup and troubleshooting",
		problem: "You cannot tell whether the site is being measured, or the numbers you see do not match what you expect.",
		deliverables: [
			"A working analytics setup, or a repair of the one you have",
			"A check that the site is actually sending data",
			"A plain-language note on what those numbers mean",
			"Where the site already uses Google Analytics, we set that up or fix it. We do not promise a particular vendor feature we have not confirmed on your account"
		],
		enquiryTopic: "Website analytics"
	},
	{
		slug: "zoho",
		name: "Zoho configuration and integrations",
		problem: "Zoho is in place, but the modules, fields, or hand-offs do not match how the business actually works.",
		deliverables: [
			"Configuration of the Zoho apps you already use",
			"A short written record of how it is set up",
			"Connections between those Zoho apps where Zoho itself supports them",
			"We will not promise a third-party connector until we have confirmed it for your account"
		],
		enquiryTopic: "Zoho configuration"
	},
	{
		slug: "sharepoint",
		name: "SharePoint workspace and document-library design",
		problem: "Files live in personal drives and email threads, so people cannot find the current version.",
		deliverables: [
			"A SharePoint workspace structure for the team that will use it",
			"Document libraries with a sensible set of folders or columns",
			"A short guide for the people who will work in it",
			"Permissions agreed with you — not an organisation-wide rollout you have not asked for"
		],
		enquiryTopic: "SharePoint design"
	}
];
var buildSteps = [
	{
		name: "Discovery",
		text: "We talk through the problem, who does the work today, and what a better week would look like. You do not need a specification to start."
	},
	{
		name: "Scoping",
		text: "We write what will be built, what will not, and what we need from you. You can decide whether to go ahead before any build starts."
	},
	{
		name: "Build",
		text: "We design and build the agreed thing, and show you progress you can react to. The length depends on the work — we do not publish a fixed timeline here."
	},
	{
		name: "Handover",
		text: "You get the working system, notes on how to use it, and what to do if it breaks."
	},
	{
		name: "Optional support",
		text: "If you want us to stay on, we agree a support plan. Support is optional. It is not bundled into the build unless we say so in the scope."
	}
];
var plans = [
	{
		id: "care",
		name: "Care",
		for: "Maintenance and support for one system.",
		includes: [
			"Fixes and small adjustments to that one system",
			"Answers about how that system works",
			"A named point of contact for it"
		],
		notIncluded: [
			"Other systems",
			"New projects or a feature backlog",
			"Monitoring across several tools"
		]
	},
	{
		id: "operations",
		name: "Operations",
		for: "Several connected systems, plus monitoring.",
		includes: [
			"Care-level maintenance for each system named in the agreement",
			"Agreed checks so a failed hand-off is noticed",
			"A note to you when one of those checks fails"
		],
		notIncluded: ["A standing backlog of new features", "Systems that are not named in the agreement"]
	},
	{
		id: "partner",
		name: "Partner",
		for: "Priority ongoing improvement and planned development.",
		includes: [
			"Everything in Operations",
			"Development time for improvements agreed in advance",
			"Those planned items scheduled ahead of one-off requests"
		],
		notIncluded: ["Unnamed or unlimited scope", "A promise that every new idea starts immediately"]
	}
];
var planAgreementNote = "These are proposed plan scopes, not a contract. Exact response times, working hours, exclusions, and fees are set in each client agreement. Nothing on this page is a price or a guarantee.";
var problems = [
	{
		stuck: "Requests sit in inboxes until someone chases them.",
		change: "A request has a status, an approver, and a recorded decision."
	},
	{
		stuck: "A spreadsheet is the only copy of the truth, and it breaks.",
		change: "The workbook is repaired, or the job moves into a small webapp."
	},
	{
		stuck: "People retype the same details into the next tool.",
		change: "The repetitive hand-off is automated. A person still handles the exceptions."
	},
	{
		stuck: "You cannot tell if the website is being measured.",
		change: "Analytics is set up or fixed, and the numbers are explained in plain language."
	},
	{
		stuck: "Zoho or SharePoint is there, but the setup fights the way you work.",
		change: "The workspace is configured so people can find the work and move it along."
	}
];
var privacySummary = "We store what you submit — your name, email, and the details of the enquiry — so we can reply and keep a record of the request. We also store a short hash of the network address to limit spam, not the address itself. We do not sell this information. To ask for a copy or for deletion, email " + site.email + ". We keep a submission until the enquiry is finished and any agreed follow-up is done, unless you ask us to remove it sooner or we have to keep it.";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { planAgreementNote as a, problems as c, tools as d, nav as i, services as l, cn as n, plans as o, getTool as r, privacySummary as s, buildSteps as t, site as u };
