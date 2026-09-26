import { s as privacySummary, u as site } from "./utils-BfRze0pK.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageIntro } from "./router-gh0eeD_u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-CaiYFb9d.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Privacy",
			title: "What we keep from a form",
			lede: privacySummary
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl space-y-4 px-5 text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The forms ask only for what we need to reply: your name, email, an optional phone number and organisation, and the description of the work. Custom-build enquiries also ask about the problem, the tools you already use, the outcome, a deadline, and an optional budget range." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Submissions are stored so they can be read by the business in a signed-in inbox. They are not shown on the public site. If an email service is configured, a copy is also sent to ",
					site.email,
					". If it is not configured, nothing is emailed and the inbox is the record."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"To ask for a copy or for deletion, email",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "font-semibold text-ink underline decoration-line underline-offset-4",
						href: `mailto:${site.email}`,
						children: site.email
					}),
					"."
				] })
			]
		})]
	});
}
//#endregion
export { PrivacyPage as component };
