import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { StatusPill } from "@/components/site/status-pill";
import { getTool } from "@/lib/site-content";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? `${loaderData.tool.name} — Automation Flow Lab` : "Tool — Automation Flow Lab",
      },
      { name: "description", content: loaderData?.tool.summary ?? "A tool from Automation Flow Lab." },
    ],
  }),
  component: ToolPage,
});

function ToolPage() {
  const { tool } = Route.useLoaderData();
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 md:grid-cols-12 md:py-16">
      <article className="md:col-span-7">
        <Link to="/tools" className="text-sm font-semibold text-primary">
          All tools
        </Link>
        <div className="mt-4">
          <StatusPill status={tool.status} />
        </div>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">{tool.name}</h1>
        <p className="mt-4 text-lg text-muted">{tool.summary}</p>
        <h2 className="mt-10 font-display text-2xl">Who it is for</h2>
        <p className="mt-3 text-muted">{tool.audience}</p>
        <h2 className="mt-8 font-display text-2xl">What it is meant to do</h2>
        <p className="mt-3 text-muted">{tool.outcome}</p>
        <h2 className="mt-8 font-display text-2xl">What it will include</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          {tool.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <p className="mt-8 rounded-lg border border-line bg-surface p-4 text-sm text-muted">
          {tool.status === "available"
            ? "The signed-in workflow for this tool is live."
            : "This page is not a demo. There is no sample login, no file upload, and no pretend result. The signed-in workflow is not built yet."}
        </p>
      </article>
      <div className="md:col-span-5">
        <EnquiryForm
          kind="tool"
          topic={tool.name}
          heading={tool.status === "available" ? "Ask about this tool" : "Request a demo"}
          intro={
            tool.status === "available"
              ? "Tell us what you want to use it for."
              : "Tell us what you would want this to do. We will reply when there is something real to show — we will not send you a fake walkthrough."
          }
        />
      </div>
    </div>
  );
}
