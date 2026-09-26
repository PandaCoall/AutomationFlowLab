import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-pill-B_XDjCL7.js
var import_jsx_runtime = require_jsx_runtime();
function StatusPill({ status }) {
	if (status === "available") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex h-7 items-center rounded-sm bg-primary px-2 font-sans text-sm font-semibold text-primary-fg",
		children: "Available"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex h-7 items-center rounded-sm border border-line bg-surface px-2 font-sans text-sm font-semibold text-ink",
		children: "Coming soon"
	});
}
//#endregion
export { StatusPill as t };
