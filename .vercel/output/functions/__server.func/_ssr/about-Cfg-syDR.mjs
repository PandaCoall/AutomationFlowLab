import { t as contentSettings } from "./content-settings-DrZStKzz.mjs";
import { l as services, u as site } from "./utils-BfRze0pK.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageIntro } from "./router-gh0eeD_u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-Cfg-syDR.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const person = [contentSettings.ownerName, contentSettings.ownerRole].filter(Boolean).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "About",
			title: "A business that builds the tools, then stays if you need it",
			lede: site.supporting
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-6xl space-y-10 px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "What we do"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-muted",
							children: [site.name, " builds and supports practical systems for day-to-day work: AI and workflow automation, custom webapps, Excel troubleshooting, website analytics, Zoho configuration, and SharePoint design."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 list-disc space-y-2 pl-5 text-muted",
							children: services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: service.name }, service.slug))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "How a piece of work runs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: "Discovery, then a written scope, then the build, then handover. Support after that is a separate choice. The detail is on the custom builds page."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/custom-builds",
							className: "mt-3 inline-flex h-11 items-center font-semibold text-primary",
							children: "Read the build steps"
						})
					]
				}),
				person || contentSettings.biography || contentSettings.credentials || contentSettings.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Who you are writing to"
						}),
						person ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-ink",
							children: person
						}) : null,
						contentSettings.biography ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: contentSettings.biography
						}) : null,
						contentSettings.credentials ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: contentSettings.credentials
						}) : null,
						contentSettings.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: contentSettings.location
						}) : null
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Contact"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted",
						children: [
							"Email",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "font-semibold text-ink underline decoration-line underline-offset-4",
								href: `mailto:${site.email}`,
								children: site.email
							}),
							" ",
							"or use the contact form. ",
							site.domain,
							" is the site address."
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { AboutPage as component };
