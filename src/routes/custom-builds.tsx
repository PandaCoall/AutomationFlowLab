import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { PageIntro } from "@/components/site/frame";
import { buildSteps } from "@/lib/site-content";

export const Route = createFileRoute("/custom-builds")({
  head: () => ({
    meta: [
      { title: "Custom Builds — Automation Flow Lab" },
      {
        name: "description",
        content:
          "Discovery, scoping, build, handover, and optional support for a custom business tool. Budget is optional on the enquiry.",
      },
    ],
  }),
  component: CustomBuildsPage,
});

function CustomBuildsPage() {
  return (
    <div className="pb-20">
      <PageIntro
        eyebrow="Custom Builds"
        title="When a product on the shelf is the wrong shape"
        lede="We start from the job that is eating time, agree what will be built, build that, and hand it over. Support afterwards is optional."
      />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 lg:grid-cols-12">
        <ol className="space-y-6 lg:col-span-6">
          {buildSteps.map((step, index) => (
            <li key={step.name} className="border-t border-line pt-5">
              <p className="font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-1 font-display text-2xl">{step.name}</h2>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="lg:col-span-6">
          <EnquiryForm
            kind="custom"
            heading="Project enquiry"
            intro="Budget is optional. Deadline can be “no fixed date” if you do not have one."
          />
        </div>
      </div>
    </div>
  );
}
