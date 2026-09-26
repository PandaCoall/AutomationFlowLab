import { Link, createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/frame";
import { services } from "@/lib/site-content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Automation Flow Lab" },
      {
        name: "description",
        content:
          "AI and workflow automation, custom webapps, Excel repair, website analytics, Zoho configuration, and SharePoint design.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="pb-20">
      <PageIntro
        eyebrow="Services"
        title="Work we will take on"
        lede="Each service is a specific job: a problem, what you actually receive, and a way to ask about it. We do not list integrations we have not confirmed for your account."
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5">
        {services.map((service) => (
          <article key={service.slug} id={service.slug} className="scroll-mt-24 rounded-xl border border-line bg-surface p-6">
            <h2 className="font-display text-3xl">{service.name}</h2>
            <h3 className="mt-5 font-sans text-sm font-semibold">The problem</h3>
            <p className="mt-2 max-w-3xl text-muted">{service.problem}</p>
            <h3 className="mt-5 font-sans text-sm font-semibold">What you get</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-muted">
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              to="/contact"
              search={{ topic: service.enquiryTopic }}
              className="mt-6 inline-flex h-11 items-center font-semibold text-primary"
            >
              Ask about {service.enquiryTopic}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
