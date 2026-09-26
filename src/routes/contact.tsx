import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { PageIntro } from "@/components/site/frame";
import { site } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    topic: typeof search.topic === "string" ? search.topic.slice(0, 160) : "",
  }),
  head: () => ({
    meta: [
      { title: "Contact — Automation Flow Lab" },
      {
        name: "description",
        content: `Contact Automation Flow Lab at ${site.email} or send an enquiry. Messages are stored so we can reply.`,
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { topic } = Route.useSearch();
  return (
    <div className="pb-20">
      <PageIntro
        eyebrow="Contact"
        title="Tell us what is stuck"
        lede="Use the form, or email us directly. There is no phone number or street address published for this business."
      />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold">Email</p>
          <a className="mt-2 inline-flex text-lg font-semibold underline decoration-line underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <p className="mt-6 text-sm text-muted">
            The form checks the fields before it sends, rejects obvious spam, and stores the enquiry so it can be read in the business inbox. If email delivery is configured on the server, we are notified as well. If it is not, the inbox is still the record.
          </p>
        </div>
        <div className="lg:col-span-7">
          <EnquiryForm
            kind="contact"
            topic={topic}
            heading="Enquiry"
            intro={topic ? `This form is prefilled for “${topic}”. Change that if it is not right.` : undefined}
          />
        </div>
      </div>
    </div>
  );
}
