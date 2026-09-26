import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/frame";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { contentSettings } from "@/lib/content-settings";
import {
  listInbox,
  saveInboxAdmin,
  setSubmissionStatus,
  type SubmissionRow,
} from "@/lib/inbox.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Submission inbox — Automation Flow Lab" },
      { name: "description", content: "Private inbox for Automation Flow Lab form submissions." },
    ],
  }),
  component: AdminPage,
});

const filters = [
  { id: "all", label: "All" },
  { id: "contact", label: "Contact" },
  { id: "tool", label: "Tools" },
  { id: "custom", label: "Custom builds" },
  { id: "plan", label: "Support plans" },
] as const;

type FilterId = (typeof filters)[number]["id"];

function AdminPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="h-10 w-48 rounded-sm bg-line" />
        <div className="mt-6 h-40 rounded-xl border border-line bg-surface" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;
  return <Inbox />;
}

function Inbox() {
  const [state, setState] = useState<"loading" | "denied" | "ready" | "error">("loading");
  const [message, setMessage] = useState("");
  const [viewerEmail, setViewerEmail] = useState("");
  const [previewBypass, setPreviewBypass] = useState(false);
  const [emailSummary, setEmailSummary] = useState("");
  const [savedAdmins, setSavedAdmins] = useState<string[]>([]);
  const [rows, setRows] = useState<SubmissionRow[]>([]);
  const [filter, setFilter] = useState<FilterId>("all");
  const [notice, setNotice] = useState("");

  async function load() {
    setState("loading");
    try {
      const result = await listInbox();
      setViewerEmail(result.viewerEmail);
      setEmailSummary(result.emailReport.summary);
      if (result.access === "denied") {
        setState("denied");
        return;
      }
      setPreviewBypass(result.previewBypass);
      setSavedAdmins(result.savedAdmins);
      setRows(result.submissions);
      setState("ready");
    } catch (error) {
      const text = error instanceof Error ? error.message : "";
      if (text === "Unauthorized") {
        setState("denied");
        setMessage("Sign in again to open the inbox.");
        return;
      }
      setState("error");
      setMessage("The inbox could not be loaded.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const visible = rows.filter((row) => filter === "all" || row.kind === filter);

  return (
    <div className="pb-20">
      <PageIntro
        eyebrow="Inbox"
        title="Submission inbox"
        lede="Enquiries from the public forms land here. This is not a client support area."
      />
      <div className="mx-auto w-full max-w-6xl space-y-6 px-5">
        {state === "loading" ? <div className="h-40 rounded-xl border border-line bg-surface" /> : null}
        {state === "error" ? <p className="text-danger">{message}</p> : null}
        {state === "denied" ? (
          <div className="rounded-xl border border-line bg-surface p-6">
            <h2 className="font-display text-2xl">This account cannot open the inbox</h2>
            <p className="mt-3 text-muted">
              {viewerEmail
                ? `You are signed in as ${viewerEmail}. `
                : "You are signed in, but this account has no email address. "}
              Production access is limited to {contentSettings.adminEmails.join(", ")} and any address already saved on the live database.
              {message ? ` ${message}` : ""}
            </p>
          </div>
        ) : null}
        {state === "ready" ? (
          <>
            <section className="rounded-xl border border-line bg-surface p-6">
              <h2 className="font-display text-2xl">Email delivery</h2>
              <p className="mt-3 text-muted">{emailSummary}</p>
              {previewBypass ? (
                <p className="mt-3 text-sm text-muted">
                  You can see this inbox in the site preview because you are the signed-in preview owner. After publish, only {contentSettings.adminEmails.join(", ")} and emails saved on the published database can open it. Saving an address here does not copy the preview database to the published site.
                </p>
              ) : null}
              <p className="mt-3 text-sm text-muted">
                Configured addresses: {contentSettings.adminEmails.join(", ")}
                {savedAdmins.length ? `. Saved on this database: ${savedAdmins.join(", ")}` : ". None saved on this database yet."}
              </p>
              {viewerEmail && !contentSettings.adminEmails.map((item) => item.toLowerCase()).includes(viewerEmail) ? (
                <Button
                  className="mt-4"
                  variant="secondary"
                  onClick={() => {
                    void saveInboxAdmin().then((result) => {
                      if (!result.ok) {
                        setNotice(result.message);
                        return;
                      }
                      setNotice(`Saved ${result.email} on this database.`);
                      setSavedAdmins((current) =>
                        current.includes(result.email) ? current : [...current, result.email].sort(),
                      );
                    });
                  }}
                >
                  Save {viewerEmail} on this database
                </Button>
              ) : null}
              {notice ? <p className="mt-3 text-sm">{notice}</p> : null}
            </section>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter submissions">
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === item.id}
                  className={cn(
                    "h-10 rounded-sm border px-3 text-sm font-semibold",
                    filter === item.id ? "border-primary bg-primary text-primary-fg" : "border-line bg-surface text-ink",
                  )}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {visible.length === 0 ? (
              <p className="rounded-xl border border-line bg-surface p-6 text-muted">
                No submissions in this view yet. Forms on Contact, each tool page, Custom Builds, and Support Plans are stored here.
              </p>
            ) : (
              <ul className="space-y-4">
                {visible.map((row) => (
                  <li key={row.id} className="rounded-xl border border-line bg-surface p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold">
                        {row.name}{" "}
                        <span className="font-normal text-muted">· {labelKind(row.kind)}</span>
                      </p>
                      <p className="font-mono text-xs text-muted">{row.created_at}</p>
                    </div>
                    <p className="mt-1 text-sm">
                      <a className="underline decoration-line underline-offset-4" href={`mailto:${row.email}`}>
                        {row.email}
                      </a>
                      {row.phone ? <span className="text-muted"> · {row.phone}</span> : null}
                      {row.organisation ? <span className="text-muted"> · {row.organisation}</span> : null}
                    </p>
                    <dl className="mt-4 space-y-2 text-sm">
                      {row.topic ? <Detail term="Topic" value={row.topic} /> : null}
                      {row.plan_interest ? <Detail term="Plan" value={row.plan_interest} /> : null}
                      {row.business_problem ? <Detail term="Problem" value={row.business_problem} /> : null}
                      {row.existing_tools ? <Detail term="Existing tools" value={row.existing_tools} /> : null}
                      {row.desired_outcome ? <Detail term="Desired outcome" value={row.desired_outcome} /> : null}
                      {row.deadline ? <Detail term="Deadline" value={row.deadline} /> : null}
                      {row.budget_range ? <Detail term="Budget range" value={row.budget_range} /> : null}
                      {row.message ? <Detail term="Message" value={row.message} /> : null}
                    </dl>
                    <p className="mt-4 text-xs text-muted">
                      Status: {row.status}. Email notification: {row.notification_status.replaceAll("_", " ")}.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(["new", "reviewed", "archived"] as const).map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={row.status === status ? "primary" : "secondary"}
                          onClick={() => {
                            void setSubmissionStatus({ data: { id: row.id, status } }).then((result) => {
                              if (!result.ok) return;
                              setRows((current) =>
                                current.map((item) => (item.id === row.id ? { ...item, status } : item)),
                              );
                            });
                          }}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

function labelKind(kind: string) {
  if (kind === "tool") return "Tool enquiry";
  if (kind === "custom") return "Custom build";
  if (kind === "plan") return "Support plan";
  return "Contact";
}

function Detail({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold">{term}</dt>
      <dd className="whitespace-pre-wrap text-muted">{value}</dd>
    </div>
  );
}
