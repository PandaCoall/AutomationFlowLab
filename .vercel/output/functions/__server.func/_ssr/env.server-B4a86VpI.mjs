import { r as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/env.server-B4a86VpI.js
var env_server_B4a86VpI_exports = /* @__PURE__ */ __exportAll({
	n: () => env_server_exports,
	r: () => isWorkspacePreview,
	t: () => env
});
var env_server_exports = /* @__PURE__ */ __exportAll$1({
	env: () => env,
	isWorkspacePreview: () => isWorkspacePreview
});
function env(key) {
	return process.env[key]?.trim() || void 0;
}
/**
* Workspace preview vs deployed app. The deployer writes GROK_PROJECT_ID on
* every publish; the sandbox preview never has it. Single source of truth for
* the split — gate audience, gate endpoints and connector-token semantics all
* key off this predicate.
*/
function isWorkspacePreview() {
	return !env("GROK_PROJECT_ID");
}
//#endregion
export { env_server_B4a86VpI_exports as n, isWorkspacePreview as r, env as t };
