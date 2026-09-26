import { Link, createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/frame";
import { Button } from "@/components/ui/button";
import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Staff sign-in — Automation Flow Lab" },
      { name: "description", content: "Sign in to the Automation Flow Lab submission inbox. This is not a client portal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, isPending } = useCurrentUserState();
  return (
    <div className="pb-20">
      <PageIntro
        eyebrow="Staff"
        title="Sign in to the submission inbox"
        lede="This is for reading enquiries sent through the site. It is not a client portal, and it does not open the tools — those workflows are not built yet."
      />
      <div className="mx-auto w-full max-w-md px-5">
        {isPending ? <div className="h-28 rounded-xl border border-line bg-surface" aria-hidden="true" /> : null}
        {!isPending && user ? (
          <div className="rounded-xl border border-line bg-surface p-6">
            <p>You are signed in{user.primaryEmail ? ` as ${user.primaryEmail}` : ""}.</p>
            <Button asChild className="mt-4">
              <Link to="/admin">Open the inbox</Link>
            </Button>
          </div>
        ) : null}
        {!isPending && !user ? (
          <div className="flex flex-col gap-3">
            {GROK_PROVIDERS.map((provider) => (
              <Button
                key={provider.providerId}
                variant="secondary"
                onClick={() => signIn(provider.providerId, { callbackURL: "/admin" })}
              >
                Continue with {provider.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
