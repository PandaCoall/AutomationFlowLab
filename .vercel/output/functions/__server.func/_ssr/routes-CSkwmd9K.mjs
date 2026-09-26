import { c as problems, d as tools, l as services, o as plans, u as site } from "./utils-BfRze0pK.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DHCY-lW8.mjs";
import { t as StatusPill } from "./status-pill-B_XDjCL7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CSkwmd9K.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid w-full max-w-6xl gap-10 px-5 pb-8 pt-14 md:grid-cols-12 md:pt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-primary",
						children: site.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-4xl leading-tight text-ink md:text-6xl",
						children: site.positioning
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-lg text-muted",
						children: site.supporting
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/tools",
								children: "Explore Tools"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/custom-builds",
								children: "Discuss a Custom Build"
							})
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-xl border border-line bg-surface p-6 md:col-span-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Two ways to start"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 border-t border-line pt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-sans text-base font-semibold",
								children: "Use a tool we are building"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Three products are in the catalogue. None has a signed-in workflow yet, so each is marked Coming soon. You can ask to be told when it is ready."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/tools",
								className: "mt-3 inline-flex h-11 items-center text-sm font-semibold text-primary",
								children: "Open the catalogue"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 border-t border-line pt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-sans text-base font-semibold",
								children: "Bring a problem that does not fit a product"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "We scope it, build it, hand it over, and can stay on to support it. A budget is optional on the enquiry."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/custom-builds",
								className: "mt-3 inline-flex h-11 items-center text-sm font-semibold text-primary",
								children: "Start a project enquiry"
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-6xl px-5 py-12",
			"aria-labelledby": "stuck-heading",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "stuck-heading",
					className: "font-display text-3xl",
					children: "Where work gets stuck"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted",
					children: "The same kinds of problems, in plain language, and what changes when they are dealt with."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 divide-y divide-line border-y border-line",
					children: problems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 py-5 md:grid-cols-2 md:gap-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: item.stuck
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted",
							children: item.change
						})]
					}, item.stuck))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-6xl px-5 py-12",
			"aria-labelledby": "tools-heading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "tools-heading",
					className: "font-display text-3xl",
					children: "Tools on the bench"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/tools",
					className: "text-sm font-semibold text-primary",
					children: "All tools"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col rounded-xl border border-line bg-surface p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: tool.status }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-2xl",
							children: tool.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 flex-1 text-sm text-muted",
							children: tool.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/tools/$slug",
							params: { slug: tool.slug },
							className: "mt-5 inline-flex h-11 items-center text-sm font-semibold text-primary",
							children: ["View ", tool.name]
						})
					]
				}, tool.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-6xl px-5 py-12",
			"aria-labelledby": "services-heading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "services-heading",
				className: "font-display text-3xl",
				children: "Services"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 divide-y divide-line border-y border-line",
				children: services.map((service, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-3 font-mono text-sm text-primary",
						children: String(index + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/services",
						hash: service.slug,
						className: "font-semibold hover:text-primary",
						children: service.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						search: { topic: service.enquiryTopic },
						className: "text-sm font-semibold text-primary",
						children: "Enquire"
					})]
				}, service.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-6xl px-5 py-12 pb-20",
			"aria-labelledby": "plans-heading",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "plans-heading",
					className: "font-display text-3xl",
					children: "Support after launch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted",
					children: "Three scopes. No prices on this site. Hours, response times, and fees are written into the agreement."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid gap-4 md:grid-cols-3",
					children: plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-line bg-surface p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl",
								children: plan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: plan.for
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/support-plans",
								search: { plan: plan.id },
								hash: "request",
								className: "mt-4 inline-flex h-11 items-center text-sm font-semibold text-primary",
								children: ["Request ", plan.name]
							})
						]
					}, plan.id))
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
