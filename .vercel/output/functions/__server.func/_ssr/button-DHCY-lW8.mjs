import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./utils-BfRze0pK.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DHCY-lW8.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-sm font-sans font-semibold transition-[opacity,background-color] duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-60", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-fg hover:opacity-90",
			secondary: "border border-line bg-surface text-ink hover:bg-paper",
			ghost: "text-ink hover:bg-line"
		},
		size: {
			md: "h-11 px-4 text-base",
			sm: "h-10 px-3 text-sm"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		type: asChild ? void 0 : type ?? "button",
		...props
	});
}
//#endregion
export { Button as t };
