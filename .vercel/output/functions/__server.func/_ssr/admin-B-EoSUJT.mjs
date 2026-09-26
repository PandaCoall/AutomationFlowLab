import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as contentSettings } from "./content-settings-DrZStKzz.mjs";
import { n as cn } from "./utils-BfRze0pK.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageIntro, o as RedirectToSignIn, s as useCurrentUserState } from "./router-gh0eeD_u.mjs";
import { t as Button } from "./button-DHCY-lW8.mjs";
import { n as saveInboxAdmin, r as setSubmissionStatus, t as listInbox } from "./inbox.functions-D4NpY9nD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-B-EoSUJT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var filters = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "contact",
		label: "Contact"
	},
	{
		id: "tool",
		label: "Tools"
	},
	{
		id: "custom",
		label: "Custom builds"
	},
	{
		id: "plan",
		label: "Support plans"
	}
];
function AdminPage() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-5 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-48 rounded-sm bg-line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-40 rounded-xl border border-line bg-surface" })]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {});
}
function Inbox() {
	const [state, setState] = (0, import_react.useState)("loading");
	const [message, setMessage] = (0, import_react.useState)("");
	const [viewerEmail, setViewerEmail] = (0, import_react.useState)("");
	const [previewBypass, setPreviewBypass] = (0, import_react.useState)(false);
	const [emailSummary, setEmailSummary] = (0, import_react.useState)("");
	const [savedAdmins, setSavedAdmins] = (0, import_react.useState)([]);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [notice, setNotice] = (0, import_react.useState)("");
	async function load() {
		setState("loading");
		try {
			const result = await listInbox();
			setViewerEmail(result.viewerEmail);
			setEmailSummary(result.emailReport.summary);
			if (result.access === "denied") {
				setState("denied");
				return;
			}
			setPreviewBypass(result.previewBypass);
			setSavedAdmins(result.savedAdmins);
			setRows(result.submissions);
			setState("ready");
		} catch (error) {
			if ((error instanceof Error ? error.message : "") === "Unauthorized") {
				setState("denied");
				setMessage("Sign in again to open the inbox.");
				return;
			}
			setState("error");
			setMessage("The inbox could not be loaded.");
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const visible = rows.filter((row) => filter === "all" || row.kind === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Inbox",
			title: "Submission inbox",
			lede: "Enquiries from the public forms land here. This is not a client support area."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-6xl space-y-6 px-5",
			children: [
				state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-xl border border-line bg-surface" }) : null,
				state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-danger",
					children: message
				}) : null,
				state === "denied" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "This account cannot open the inbox"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted",
						children: [
							viewerEmail ? `You are signed in as ${viewerEmail}. ` : "You are signed in, but this account has no email address. ",
							"Production access is limited to ",
							contentSettings.adminEmails.join(", "),
							" and any address already saved on the live database.",
							message ? ` ${message}` : ""
						]
					})]
				}) : null,
				state === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-line bg-surface p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: "Email delivery"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted",
								children: emailSummary
							}),
							previewBypass ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-muted",
								children: [
									"You can see this inbox in the site preview because you are the signed-in preview owner. After publish, only ",
									contentSettings.adminEmails.join(", "),
									" and emails saved on the published database can open it. Saving an address here does not copy the preview database to the published site."
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-muted",
								children: [
									"Configured addresses: ",
									contentSettings.adminEmails.join(", "),
									savedAdmins.length ? `. Saved on this database: ${savedAdmins.join(", ")}` : ". None saved on this database yet."
								]
							}),
							viewerEmail && !contentSettings.adminEmails.map((item) => item.toLowerCase()).includes(viewerEmail) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-4",
								variant: "secondary",
								onClick: () => {
									saveInboxAdmin().then((result) => {
										if (!result.ok) {
											setNotice(result.message);
											return;
										}
										setNotice(`Saved ${result.email} on this database.`);
										setSavedAdmins((current) => current.includes(result.email) ? current : [...current, result.email].sort());
									});
								},
								children: [
									"Save ",
									viewerEmail,
									" on this database"
								]
							}) : null,
							notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm",
								children: notice
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						role: "tablist",
						"aria-label": "Filter submissions",
						children: filters.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": filter === item.id,
							className: cn("h-10 rounded-sm border px-3 text-sm font-semibold", filter === item.id ? "border-primary bg-primary text-primary-fg" : "border-line bg-surface text-ink"),
							onClick: () => setFilter(item.id),
							children: item.label
						}, item.id))
					}),
					visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl border border-line bg-surface p-6 text-muted",
						children: "No submissions in this view yet. Forms on Contact, each tool page, Custom Builds, and Support Plans are stored here."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4",
						children: visible.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-line bg-surface p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold",
										children: [
											row.name,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-normal text-muted",
												children: ["· ", labelKind(row.kind)]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-muted",
										children: row.created_at
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "underline decoration-line underline-offset-4",
											href: `mailto:${row.email}`,
											children: row.email
										}),
										row.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [" · ", row.phone]
										}) : null,
										row.organisation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [" · ", row.organisation]
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-4 space-y-2 text-sm",
									children: [
										row.topic ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
											term: "Topic",
											value: row.topic
										}) : null,
										row.plan_interest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
											term: "Plan",
											value: row.plan_interest
										}) : null,
										row.business_problem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
											term: "Problem",
											value: row.business_problem
										}) : null,
										row.existing_tools ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
											term: "Existing tools",
											value: row.existing_tools
										}) : null,
										row.desired_outcome ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
											term: "Desired outcome",
											value: row.desired_outcome
										}) : null,
										row.deadline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
											term: "Deadline",
											value: row.deadline
										}) : null,
										row.budget_range ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
											term: "Budget range",
											value: row.budget_range
										}) : null,
										row.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
											term: "Message",
											value: row.message
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 text-xs text-muted",
									children: [
										"Status: ",
										row.status,
										". Email notification: ",
										row.notification_status.replaceAll("_", " "),
										"."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [
										"new",
										"reviewed",
										"archived"
									].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: row.status === status ? "primary" : "secondary",
										onClick: () => {
											setSubmissionStatus({ data: {
												id: row.id,
												status
											} }).then((result) => {
												if (!result.ok) return;
												setRows((current) => current.map((item) => item.id === row.id ? {
													...item,
													status
												} : item));
											});
										},
										children: status
									}, status))
								})
							]
						}, row.id))
					})
				] }) : null
			]
		})]
	});
}
function labelKind(kind) {
	if (kind === "tool") return "Tool enquiry";
	if (kind === "custom") return "Custom build";
	if (kind === "plan") return "Support plan";
	return "Contact";
}
function Detail({ term, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "font-semibold",
		children: term
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "whitespace-pre-wrap text-muted",
		children: value
	})] });
}
//#endregion
export { AdminPage as component };
