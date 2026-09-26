import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DvxaY5kF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox.functions-D4NpY9nD.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var submitEnquiry = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0706f38b0444c8765d553b3809d2a3a34b1a1e28685ae7ad9a0801037e5d0c78"));
var listInbox = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("35f04cc976fc41c203f610c3457b2f6750a3bc99626a2619ab702ca8c0837069"));
var setSubmissionStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const data = input;
	const id = typeof data.id === "string" ? data.id : "";
	const status = data.status;
	if (!id || status !== "new" && status !== "reviewed" && status !== "archived") throw new Error("Invalid update");
	return {
		id,
		status
	};
}).handler(createSsrRpc("0fb59186323b3d475fec9686a6002dedc68c1744051ec28f54e9c670ac9c77ba"));
var saveInboxAdmin = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("3b8519963e37f6c4e2ccbe3659661738961c9742fed0aa6ab684a7bae5b70570"));
//#endregion
export { submitEnquiry as i, saveInboxAdmin as n, setSubmissionStatus as r, listInbox as t };
