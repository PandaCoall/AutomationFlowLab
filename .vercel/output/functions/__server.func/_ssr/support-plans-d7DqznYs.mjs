import { a as planAgreementNote, o as plans } from "./utils-BfRze0pK.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageIntro, r as Route$3 } from "./router-gh0eeD_u.mjs";
import { t as EnquiryForm } from "./enquiry-form-DxKMeOYL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-plans-d7DqznYs.js
var import_jsx_runtime = require_jsx_runtime();
function SupportPage() {
	const { plan } = Route$3.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Support Plans",
				title: "Stay on after the build, if you want to",
				lede: "Three scopes, clearly different, and not priced here. They describe what a plan can cover. The agreement is what makes it binding."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mx-auto grid w-full max-w-6xl gap-4 px-5 md:grid-cols-3",
				children: plans.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col rounded-xl border border-line bg-surface p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: item.for
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 font-sans text-sm font-semibold",
							children: "Proposed inclusions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 list-disc space-y-2 pl-5 text-sm text-muted",
							children: item.includes.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 font-sans text-sm font-semibold",
							children: "Not in this scope"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 list-disc space-y-2 pl-5 text-sm text-muted",
							children: item.notIncluded.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/support-plans",
							search: { plan: item.id },
							hash: "request",
							className: "mt-6 inline-flex h-11 items-center font-semibold text-primary",
							children: ["Request ", item.name]
						})
					]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-8 w-full max-w-6xl px-5 text-sm text-muted",
				children: planAgreementNote
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "request",
				className: "mx-auto mt-10 w-full max-w-6xl scroll-mt-24 px-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryForm, {
					kind: "plan",
					plan,
					heading: "Request a plan",
					intro: "Say which systems you want looked after. We will reply with what a plan would cover. We will not quote a response time or a fee on this form."
				})
			})
		]
	});
}
//#endregion
export { SupportPage as component };
