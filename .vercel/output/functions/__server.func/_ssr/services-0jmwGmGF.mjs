import { l as services } from "./utils-BfRze0pK.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageIntro } from "./router-gh0eeD_u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-0jmwGmGF.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Services",
			title: "Work we will take on",
			lede: "Each service is a specific job: a problem, what you actually receive, and a way to ask about it. We do not list integrations we have not confirmed for your account."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-6 px-5",
			children: services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				id: service.slug,
				className: "scroll-mt-24 rounded-xl border border-line bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: service.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-sans text-sm font-semibold",
						children: "The problem"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-3xl text-muted",
						children: service.problem
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-sans text-sm font-semibold",
						children: "What you get"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 list-disc space-y-2 pl-5 text-muted",
						children: service.deliverables.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						search: { topic: service.enquiryTopic },
						className: "mt-6 inline-flex h-11 items-center font-semibold text-primary",
						children: ["Ask about ", service.enquiryTopic]
					})
				]
			}, service.slug))
		})]
	});
}
//#endregion
export { ServicesPage as component };
