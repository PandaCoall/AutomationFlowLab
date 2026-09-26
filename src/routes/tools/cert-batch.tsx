import { createFileRoute } from "@tanstack/react-router";
import { CertApp } from "@/components/cert-app";

export const Route = createFileRoute("/tools/cert-batch")({
  head: () => ({
    meta: [
      { title: "Cert Batch — Automation Flow Lab" },
      {
        name: "description",
        content: "Upload a learner list, preview the certificate, and run the batch. One PDF per person.",
      },
    ],
  }),
  component: CertBatchPage,
});

function CertBatchPage() {
  return <CertApp />;
}
