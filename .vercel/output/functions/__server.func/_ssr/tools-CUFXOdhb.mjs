import { d as tools } from "./utils-BfRze0pK.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageIntro } from "./router-gh0eeD_u.mjs";
import { t as StatusPill } from "./status-pill-B_XDjCL7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools-CUFXOdhb.js
var import_jsx_runtime = require_jsx_runtime();
function ToolsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Tools",
			title: "Three products. None of them is a demo.",
			lede: "A product is marked Available only after its signed-in workflow works. Until then it is Coming soon, and the way to ask about it is a real enquiry — not a pretend click-through."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mx-auto grid w-full max-w-6xl gap-4 px-5 md:grid-cols-3",
			children: tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col rounded-xl border border-line bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: tool.status }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-2xl",
						children: tool.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm font-semibold",
						children: "Who it is for"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: tool.audience
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 flex-1 text-sm text-muted",
						children: tool.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tools/$slug",
						params: { slug: tool.slug },
						className: "mt-5 inline-flex h-11 items-center font-semibold text-primary",
						children: "Open this tool"
					})
				]
			}, tool.slug))
		})]
	});
}
//#endregion
export { ToolsPage as component };
