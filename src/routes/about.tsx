import { Link, createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/frame";
import { contentSettings } from "@/lib/content-settings";
import { services, site } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Automation Flow Lab" },
      {
        name: "description",
        content:
          "Automation Flow Lab builds and supports practical webapps, workflows, and connected business systems.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const person = [contentSettings.ownerName, contentSettings.ownerRole].filter(Boolean).join(", ");
  return (
    <div className="pb-20">
      <PageIntro
        eyebrow="About"
        title="A business that builds the tools, then stays if you need it"
        lede={site.supporting}
      />
      <div className="mx-auto w-full max-w-6xl space-y-10 px-5">
        <section className="max-w-3xl">
          <h2 className="font-display text-2xl">What we do</h2>
          <p className="mt-3 text-muted">
            {site.name} builds and supports practical systems for day-to-day work: AI and workflow automation, custom webapps, Excel troubleshooting, website analytics, Zoho configuration, and SharePoint design.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            {services.map((service) => (
              <li key={service.slug}>{service.name}</li>
            ))}
          </ul>
        </section>
        <section className="max-w-3xl">
          <h2 className="font-display text-2xl">How a piece of work runs</h2>
          <p className="mt-3 text-muted">
            Discovery, then a written scope, then the build, then handover. Support after that is a separate choice. The detail is on the custom builds page.
          </p>
          <Link to="/custom-builds" className="mt-3 inline-flex h-11 items-center font-semibold text-primary">
            Read the build steps
          </Link>
        </section>
        {person || contentSettings.biography || contentSettings.credentials || contentSettings.location ? (
          <section className="max-w-3xl">
            <h2 className="font-display text-2xl">Who you are writing to</h2>
            {person ? <p className="mt-3 text-ink">{person}</p> : null}
            {contentSettings.biography ? <p className="mt-3 text-muted">{contentSettings.biography}</p> : null}
            {contentSettings.credentials ? <p className="mt-3 text-muted">{contentSettings.credentials}</p> : null}
            {contentSettings.location ? <p className="mt-3 text-muted">{contentSettings.location}</p> : null}
          </section>
        ) : null}
        <section className="max-w-3xl">
          <h2 className="font-display text-2xl">Contact</h2>
          <p className="mt-3 text-muted">
            Email{" "}
            <a className="font-semibold text-ink underline decoration-line underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            or use the contact form. {site.domain} is the site address.
          </p>
        </section>
      </div>
    </div>
  );
}
