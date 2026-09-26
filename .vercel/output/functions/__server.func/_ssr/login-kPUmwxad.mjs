import { r as signIn } from "./client-CVqXY6bk.mjs";
import { t as GROK_PROVIDERS } from "./server-DNFwe2uP.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageIntro, s as useCurrentUserState } from "./router-gh0eeD_u.mjs";
import { t as Button } from "./button-DHCY-lW8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-kPUmwxad.js
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { user, isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Staff",
			title: "Sign in to the submission inbox",
			lede: "This is for reading enquiries sent through the site. It is not a client portal, and it does not open the tools — those workflows are not built yet."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md px-5",
			children: [
				isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-28 rounded-xl border border-line bg-surface",
					"aria-hidden": "true"
				}) : null,
				!isPending && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"You are signed in",
						user.primaryEmail ? ` as ${user.primaryEmail}` : "",
						"."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin",
							children: "Open the inbox"
						})
					})]
				}) : null,
				!isPending && !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => signIn(provider.providerId, { callbackURL: "/admin" }),
						children: ["Continue with ", provider.label]
					}, provider.providerId))
				}) : null
			]
		})]
	});
}
//#endregion
export { LoginPage as component };
