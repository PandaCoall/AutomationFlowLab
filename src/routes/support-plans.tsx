import { Link, createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { PageIntro } from "@/components/site/frame";
import { planAgreementNote, plans, type PlanId } from "@/lib/site-content";

const planIds: PlanId[] = ["care", "operations", "partner"];

export const Route = createFileRoute("/support-plans")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: planIds.includes(search.plan as PlanId) ? (search.plan as PlanId) : "",
  }),
  head: () => ({
    meta: [
      { title: "Support Plans — Automation Flow Lab" },
      {
        name: "description",
        content:
          "Care, Operations, and Partner are proposed support scopes. Response times, hours, exclusions, and fees are set in each client agreement.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  const { plan } = Route.useSearch();
  return (
    <div className="pb-20">
      <PageIntro
        eyebrow="Support Plans"
        title="Stay on after the build, if you want to"
        lede="Three scopes, clearly different, and not priced here. They describe what a plan can cover. The agreement is what makes it binding."
      />
      <ul className="mx-auto grid w-full max-w-6xl gap-4 px-5 md:grid-cols-3">
        {plans.map((item) => (
          <li key={item.id} className="flex flex-col rounded-xl border border-line bg-surface p-6">
            <h2 className="font-display text-3xl">{item.name}</h2>
            <p className="mt-2 text-muted">{item.for}</p>
            <h3 className="mt-5 font-sans text-sm font-semibold">Proposed inclusions</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted">
              {item.includes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h3 className="mt-5 font-sans text-sm font-semibold">Not in this scope</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted">
              {item.notIncluded.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Link
              to="/support-plans"
              search={{ plan: item.id }}
              hash="request"
              className="mt-6 inline-flex h-11 items-center font-semibold text-primary"
            >
              Request {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-8 w-full max-w-6xl px-5 text-sm text-muted">{planAgreementNote}</p>
      <div id="request" className="mx-auto mt-10 w-full max-w-6xl scroll-mt-24 px-5">
        <EnquiryForm
          kind="plan"
          plan={plan}
          heading="Request a plan"
          intro="Say which systems you want looked after. We will reply with what a plan would cover. We will not quote a response time or a fee on this form."
        />
      </div>
    </div>
  );
}
