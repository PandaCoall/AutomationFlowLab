import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/site/status-pill";
import { plans, problems, services, site, tools } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Automation Flow Lab — Business tools that do the repetitive work" },
      {
        name: "description",
        content: site.supporting,
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-8 pt-14 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-7">
          <p className="text-sm font-semibold text-primary">{site.name}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink md:text-6xl">{site.positioning}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{site.supporting}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/tools">Explore Tools</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/custom-builds">Discuss a Custom Build</Link>
            </Button>
          </div>
        </div>
        <aside className="rounded-xl border border-line bg-surface p-6 md:col-span-5">
          <h2 className="font-display text-2xl">Two ways to start</h2>
          <div className="mt-5 border-t border-line pt-5">
            <h3 className="font-sans text-base font-semibold">Use a tool we are building</h3>
            <p className="mt-2 text-sm text-muted">
              The catalogue is IT work: automations, mail, analytics, Excel, documents, and SharePoint. None has a signed-in workflow yet, so each is marked Coming soon.
            </p>
            <Link to="/tools" className="mt-3 inline-flex h-11 items-center text-sm font-semibold text-primary">
              Open the catalogue
            </Link>
          </div>
          <div className="mt-5 border-t border-line pt-5">
            <h3 className="font-sans text-base font-semibold">Bring a problem that does not fit a product</h3>
            <p className="mt-2 text-sm text-muted">
              We scope it, build it, hand it over, and can stay on to support it. A budget is optional on the enquiry.
            </p>
            <Link to="/custom-builds" className="mt-3 inline-flex h-11 items-center text-sm font-semibold text-primary">
              Start a project enquiry
            </Link>
          </div>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12" aria-labelledby="stuck-heading">
        <h2 id="stuck-heading" className="font-display text-3xl">
          Where work gets stuck
        </h2>
        <p className="mt-3 max-w-2xl text-muted">The same kinds of problems, in plain language, and what changes when they are dealt with.</p>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {problems.map((item) => (
            <div key={item.stuck} className="grid gap-2 py-5 md:grid-cols-2 md:gap-10">
              <p className="font-semibold">{item.stuck}</p>
              <p className="text-muted">{item.change}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12" aria-labelledby="tools-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="tools-heading" className="font-display text-3xl">
            Tools on the bench
          </h2>
          <Link to="/tools" className="text-sm font-semibold text-primary">
            All tools
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <li key={tool.slug} className="flex flex-col rounded-xl border border-line bg-surface p-6">
              <StatusPill status={tool.status} />
              <h3 className="mt-4 font-display text-2xl">{tool.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{tool.summary}</p>
              <Link
                to="/tools/$slug"
                params={{ slug: tool.slug }}
                className="mt-5 inline-flex h-11 items-center text-sm font-semibold text-primary"
              >
                View {tool.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12" aria-labelledby="services-heading">
        <h2 id="services-heading" className="font-display text-3xl">
          Services
        </h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {services.map((service, index) => (
            <li key={service.slug} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between">
              <p>
                <span className="mr-3 font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</span>
                <Link to="/services" hash={service.slug} className="font-semibold hover:text-primary">
                  {service.name}
                </Link>
              </p>
              <Link
                to="/contact"
                search={{ topic: service.enquiryTopic }}
                className="text-sm font-semibold text-primary"
              >
                Enquire
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 pb-20" aria-labelledby="plans-heading">
        <h2 id="plans-heading" className="font-display text-3xl">
          Support after launch
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Three scopes. No prices on this site. Hours, response times, and fees are written into the agreement.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.id} className="rounded-xl border border-line bg-surface p-6">
              <h3 className="font-display text-2xl">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted">{plan.for}</p>
              <Link
                to="/support-plans"
                search={{ plan: plan.id }}
                hash="request"
                className="mt-4 inline-flex h-11 items-center text-sm font-semibold text-primary"
              >
                Request {plan.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
