import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFrame } from "@/components/site/frame";
import { Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";

const APP_NAME = "Automation Flow Lab";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Automation Flow Lab builds practical webapps, AI-powered workflows, and connected business systems, then supports them after launch.",
      },
      { name: "theme-color", content: "#c4004f" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteFrame>
            <Outlet />
          </SiteFrame>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-20">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-3 font-display text-4xl">That page is not here</h1>
      <p className="mt-3 max-w-xl text-muted">The address does not match a page on this site.</p>
      <Link to="/" className="mt-6 inline-flex h-11 items-center font-semibold text-primary">
        Back to the homepage
      </Link>
    </div>
  );
}
