import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as cn, s as privacySummary, u as site } from "./utils-BfRze0pK.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DHCY-lW8.mjs";
import { i as submitEnquiry } from "./inbox.functions-D4NpY9nD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquiry-form-DxKMeOYL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-sm border border-line bg-surface px-3 font-sans text-base text-ink placeholder:text-muted", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block font-sans text-sm font-semibold text-ink", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-32 w-full rounded-sm border border-line bg-surface px-3 py-3 font-sans text-base text-ink placeholder:text-muted", className),
		...props
	});
}
var planOptions = [
	{
		id: "care",
		label: "Care — one system"
	},
	{
		id: "operations",
		label: "Operations — several systems"
	},
	{
		id: "partner",
		label: "Partner — planned improvement"
	}
];
function EnquiryForm({ kind, topic = "", plan = "", heading = "Send an enquiry", intro }) {
	const [startedAt] = (0, import_react.useState)(() => Date.now());
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [organisation, setOrganisation] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [topicValue, setTopicValue] = (0, import_react.useState)(topic);
	const [planValue, setPlanValue] = (0, import_react.useState)(plan);
	const [businessProblem, setBusinessProblem] = (0, import_react.useState)("");
	const [existingTools, setExistingTools] = (0, import_react.useState)("");
	const [desiredOutcome, setDesiredOutcome] = (0, import_react.useState)("");
	const [deadline, setDeadline] = (0, import_react.useState)("");
	const [budgetRange, setBudgetRange] = (0, import_react.useState)("");
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [website, setWebsite] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [formError, setFormError] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	(0, import_react.useEffect)(() => {
		setTopicValue(topic);
	}, [topic]);
	(0, import_react.useEffect)(() => {
		setPlanValue(plan);
	}, [plan]);
	async function onSubmit(event) {
		event.preventDefault();
		setFormError("");
		setErrors({});
		setStatus("sending");
		try {
			const result = await submitEnquiry({ data: {
				kind,
				topic: kind === "tool" ? topic : topicValue,
				plan: planValue,
				name,
				email,
				phone,
				organisation,
				message,
				businessProblem,
				existingTools,
				desiredOutcome,
				deadline,
				budgetRange,
				consent,
				website,
				startedAt
			} });
			if (!result.ok) {
				setStatus("idle");
				setFormError(result.message);
				setErrors(result.fieldErrors ?? {});
				return;
			}
			setStatus("sent");
		} catch {
			setStatus("idle");
			setFormError(`Something went wrong before this was stored. Email ${site.email} if it keeps happening.`);
		}
	}
	if (status === "sent") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-surface p-6",
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: "Enquiry received"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-muted",
			children: [
				"We have stored this and will reply to the email you gave. If you do not hear back, write to",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "font-semibold text-ink underline decoration-line underline-offset-4",
					href: `mailto:${site.email}`,
					children: site.email
				}),
				"."
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "relative rounded-xl border border-line bg-surface p-6",
		onSubmit,
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: heading
			}),
			intro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: intro
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hp",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Website", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: website,
					onChange: (event) => setWebsite(event.target.value),
					tabIndex: -1,
					autoComplete: "off"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "enquiry-name",
						label: "Name",
						error: errors.name,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "enquiry-name",
							name: "name",
							autoComplete: "name",
							value: name,
							"aria-invalid": Boolean(errors.name),
							onChange: (event) => setName(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "enquiry-email",
						label: "Email",
						error: errors.email,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "enquiry-email",
							name: "email",
							type: "email",
							autoComplete: "email",
							inputMode: "email",
							value: email,
							"aria-invalid": Boolean(errors.email),
							onChange: (event) => setEmail(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "enquiry-phone",
						label: "Phone (optional)",
						error: errors.phone,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "enquiry-phone",
							name: "phone",
							type: "tel",
							autoComplete: "tel",
							value: phone,
							onChange: (event) => setPhone(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "enquiry-org",
						label: "Organisation (optional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "enquiry-org",
							name: "organisation",
							autoComplete: "organization",
							value: organisation,
							onChange: (event) => setOrganisation(event.target.value)
						})
					}),
					kind === "contact" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "enquiry-topic",
						label: "What is this about?",
						error: errors.topic,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "enquiry-topic",
							value: topicValue,
							onChange: (event) => setTopicValue(event.target.value)
						})
					}) : null,
					kind === "plan" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "enquiry-plan",
						label: "Plan",
						error: errors.plan,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "enquiry-plan",
							className: "h-11 w-full rounded-sm border border-line bg-surface px-3 font-sans text-base text-ink",
							value: planValue,
							"aria-invalid": Boolean(errors.plan),
							onChange: (event) => setPlanValue(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Choose a plan"
							}), planOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: option.id,
								children: option.label
							}, option.id))]
						})
					}) : null,
					kind === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "enquiry-problem",
							label: "Business problem",
							error: errors.businessProblem,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "enquiry-problem",
								value: businessProblem,
								"aria-invalid": Boolean(errors.businessProblem),
								onChange: (event) => setBusinessProblem(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "enquiry-tools",
							label: "Existing tools",
							error: errors.existingTools,
							hint: "Name what you use today, or say that you are starting from scratch.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "enquiry-tools",
								value: existingTools,
								"aria-invalid": Boolean(errors.existingTools),
								onChange: (event) => setExistingTools(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "enquiry-outcome",
							label: "Desired outcome",
							error: errors.desiredOutcome,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "enquiry-outcome",
								value: desiredOutcome,
								"aria-invalid": Boolean(errors.desiredOutcome),
								onChange: (event) => setDesiredOutcome(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "enquiry-deadline",
							label: "Deadline",
							error: errors.deadline,
							hint: "A date, a month, or “no fixed date”.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "enquiry-deadline",
								value: deadline,
								"aria-invalid": Boolean(errors.deadline),
								onChange: (event) => setDeadline(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "enquiry-budget",
							label: "Budget range (optional)",
							hint: "Leave this blank if you do not have one.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "enquiry-budget",
								value: budgetRange,
								onChange: (event) => setBudgetRange(event.target.value)
							})
						})
					] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "enquiry-message",
						label: kind === "custom" ? "Anything else (optional)" : "Message",
						error: errors.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "enquiry-message",
							value: message,
							"aria-invalid": Boolean(errors.message),
							onChange: (event) => setMessage(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-start gap-3 text-sm text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "mt-1 size-5 accent-primary",
								checked: consent,
								onChange: (event) => setConsent(event.target.checked)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I agree that Automation Flow Lab may store these details to reply to this enquiry." })]
						}),
						errors.consent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-danger",
							children: errors.consent
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: privacySummary
						})
					] }),
					formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						role: "alert",
						children: formError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: status === "sending",
						children: status === "sending" ? "Sending…" : "Send enquiry"
					})
				]
			})
		]
	});
}
function Field({ id, label, error, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			children: label
		}),
		children,
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: hint
		}) : null,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-danger",
			role: "alert",
			children: error
		}) : null
	] });
}
//#endregion
export { EnquiryForm as t };
