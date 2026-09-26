import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/frame";
import { privacySummary, site } from "@/lib/site-content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Automation Flow Lab" },
      {
        name: "description",
        content: "How Automation Flow Lab stores enquiry details and how to ask for them to be deleted.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="pb-20">
      <PageIntro
        eyebrow="Privacy"
        title="What we keep from a form"
        lede={privacySummary}
      />
      <div className="mx-auto max-w-3xl space-y-4 px-5 text-muted">
        <p>
          The forms ask only for what we need to reply: your name, email, an optional phone number and organisation, and the description of the work. Custom-build enquiries also ask about the problem, the tools you already use, the outcome, a deadline, and an optional budget range.
        </p>
        <p>
          Submissions are stored so they can be read by the business in a signed-in inbox. They are not shown on the public site. If an email service is configured, a copy is also sent to {site.email}. If it is not configured, nothing is emailed and the inbox is the record.
        </p>
        <p>
          To ask for a copy or for deletion, email{" "}
          <a className="font-semibold text-ink underline decoration-line underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
