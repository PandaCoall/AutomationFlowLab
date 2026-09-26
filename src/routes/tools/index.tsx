import { Link, createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/frame";
import { StatusPill } from "@/components/site/status-pill";
import { tools } from "@/lib/site-content";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Tools — Automation Flow Lab" },
      {
        name: "description",
        content:
          "IT tools for automations, analytics, Excel, forms, documents, mail, SharePoint, and technical change requests. Cert Batch is live. The others stay Coming soon until their workflow works.",
      },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <div className="pb-20">
      <PageIntro
        eyebrow="Tools"
        title="IT tools. None of them is a demo."
        lede="These are the jobs we already get called for: something stopped running, two systems are not talking, or the same technical step is still done by hand. A product is marked Available only after its signed-in workflow works. Until then it is Coming soon."
      />
      <ul className="mx-auto grid w-full max-w-6xl gap-4 px-5 md:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.slug} className="flex flex-col rounded-xl border border-line bg-surface p-6">
            <StatusPill status={tool.status} />
            <h2 className="mt-4 font-display text-2xl">{tool.name}</h2>
            <p className="mt-3 text-sm font-semibold">Who it is for</p>
            <p className="mt-1 text-sm text-muted">{tool.audience}</p>
            <p className="mt-4 flex-1 text-sm text-muted">{tool.summary}</p>
            {tool.slug === "cert-batch" ? (
              <Link to="/tools/cert-batch" className="mt-5 inline-flex h-11 items-center font-semibold text-primary">
                Open Cert Batch
              </Link>
            ) : (
              <Link
                to="/tools/$slug"
                params={{ slug: tool.slug }}
                className="mt-5 inline-flex h-11 items-center font-semibold text-primary"
              >
                Read about this tool
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
