import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Download,
  FileSpreadsheet,
  Play,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import JSZip from "jszip";
import { SAMPLE_HEADERS, SAMPLE_ROWS } from "@/lib/cert/sample";
import { buildJobs, shouldThrottle, subjectFor } from "@/lib/cert/jobs";
import { certificatePdf, fileNameFor } from "@/lib/cert/pdf";
import { downloadBlob, guessMapping, parseSheet, rowsToWorkbook } from "@/lib/cert/parse";
import { FIELD_LABEL, FIELDS, type Brand, type JobRow, type Mapping, type Row } from "@/lib/cert/types";
import { LAYOUTS, PALETTES } from "@/lib/cert/style";

const DEFAULT_BRAND: Brand = {
  org: "Northline Language",
  signatory: "M. Dlamini",
  role: "Programme lead",
  line: "Issued automatically. Each certificate has a unique ID.",
  layout: "classic",
  palette: "seal",
  logo: "",
  logoSide: "left",
};

const STEPS = ["List", "Map", "Preview", "Run"] as const;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function CertApp() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [fileLabel, setFileLabel] = useState("Sample cohort · 12 learners");
  const [headers, setHeaders] = useState<string[]>(SAMPLE_HEADERS);
  const [rows, setRows] = useState<Row[]>(SAMPLE_ROWS);
  const [mapping, setMapping] = useState<Mapping>(() => guessMapping(SAMPLE_HEADERS));
  const [brand, setBrand] = useState<Brand>(DEFAULT_BRAND);
  const [fallbackCourse, setFallbackCourse] = useState("English Level 1");
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [busy, setBusy] = useState<"idle" | "pdf" | "mail">("idle");
  const [log, setLog] = useState("Load a list, check the map, then run the batch.");
  const [pdfDone, setPdfDone] = useState(0);

  const planned = useMemo(
    () => buildJobs(rows, mapping, fallbackCourse),
    [rows, mapping, fallbackCourse],
  );
  const preview = planned[Math.min(previewIndex, Math.max(planned.length - 1, 0))];
  const active = jobs.length ? jobs : planned;
  const counts = count(active);

  async function onFile(file: File) {
    const parsed = await parseSheet(file);
    if (!parsed.headers.length || !parsed.rows.length) {
      setLog("That file has no header row or no learner rows.");
      return;
    }
    setHeaders(parsed.headers);
    setRows(parsed.rows);
    setMapping(guessMapping(parsed.headers));
    setFileLabel(`${file.name} · ${parsed.rows.length} rows`);
    setJobs([]);
    setPdfDone(0);
    setPreviewIndex(0);
    setLog(`Loaded ${parsed.rows.length} rows. Check the column map before you run.`);
    setStep(1);
  }

  function useSample() {
    setHeaders(SAMPLE_HEADERS);
    setRows(SAMPLE_ROWS);
    setMapping(guessMapping(SAMPLE_HEADERS));
    setFileLabel("Sample cohort · 12 learners");
    setJobs([]);
    setPdfDone(0);
    setLog("Sample list loaded. One bad email and one duplicate are included on purpose.");
    setStep(1);
  }

  async function makeZip() {
    const source = jobs.length ? jobs : planned;
    const printable = source.filter((j) => j.name && j.status !== "skipped");
    if (!printable.length) return;
    setBusy("pdf");
    setPdfDone(0);
    setLog("Rendering PDFs. Each certificate is its own file.");
    const zip = new JSZip();
    const folder = zip.folder("certificates");
    for (let i = 0; i < printable.length; i++) {
      const bytes = await certificatePdf(printable[i], brand);
      folder?.file(fileNameFor(printable[i]), bytes);
      setPdfDone(i + 1);
      if (i % 4 === 0) await sleep(0);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, "certificates.zip");
    setBusy("idle");
    setLog(`ZIP ready: ${printable.length} PDFs.`);
  }

  async function runQueue(onlyOpen: boolean) {
    const base = (jobs.length ? jobs : planned).map((j) => ({ ...j }));
    const queue = base.map((j) => {
      if (!onlyOpen) return j;
      if (j.note.startsWith("Invalid") || j.note === "Missing name" || j.status === "skipped" || j.status === "sent") {
        return j;
      }
      if (j.status === "failed") return { ...j, status: "retry" as const, note: "Queued again" };
      return j;
    });
    setJobs(queue);
    setBusy("mail");
    setStep(3);
    const work = queue.filter((j) => j.status === "pending" || j.status === "retry");
    setLog(
      onlyOpen
        ? `Resuming ${work.length} open rows. Already sent rows stay sent.`
        : `Dispatching ${work.length} emails. Invalid and duplicate rows are skipped before send.`,
    );
    for (const row of work) {
      let attempt = row.attempts;
      let done = false;
      while (!done && attempt < 3) {
        attempt += 1;
        setJobs((cur) =>
          cur.map((j) =>
            j.certId === row.certId ? { ...j, attempts: attempt, note: `Attempt ${attempt}` } : j,
          ),
        );
        await sleep(90);
        if (shouldThrottle(row, attempt)) {
          setJobs((cur) =>
            cur.map((j) =>
              j.certId === row.certId
                ? { ...j, status: "retry", attempts: attempt, note: "Rate limit — retrying this row only" }
                : j,
            ),
          );
          await sleep(140);
          continue;
        }
        setJobs((cur) =>
          cur.map((j) =>
            j.certId === row.certId
              ? { ...j, status: "sent", attempts: attempt, note: subjectFor(j, brand) }
              : j,
          ),
        );
        done = true;
      }
    }
    setBusy("idle");
    setLog("Batch finished. Download the result sheet. Re-run only touches rows that did not send.");
  }

  function exportResults() {
    const source = jobs.length ? jobs : planned;
    const blob = rowsToWorkbook(
      source.map((j) => ({
        certificate_id: j.certId,
        name: j.name,
        email: j.email,
        course: j.course,
        date: j.date,
        score: j.score,
        status: j.status,
        attempts: String(j.attempts),
        note: j.note,
      })),
      "results",
    );
    downloadBlob(blob, "certificate-results.xlsx");
  }

  function downloadSample() {
    downloadBlob(rowsToWorkbook(SAMPLE_ROWS, "learners"), "sample-learners.xlsx");
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-5 py-6">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">Cert Batch</p>
            <h1 className="font-display text-3xl leading-tight sm:text-4xl">One list. One run.</h1>
            <p className="mt-1 max-w-xl text-sm text-muted">
              Excel or CSV in. A PDF per learner. Failed rows retry on their own — the batch does not stop.
            </p>
          </div>
          <ol className="flex flex-wrap gap-2">
            {STEPS.map((label, i) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className={
                    "min-h-11 rounded-full px-3 text-sm " +
                    (step === i ? "bg-ink text-primary-fg" : "bg-surface text-muted")
                  }
                >
                  {i + 1} {label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </header>

      <main className="mx-auto grid min-w-0 max-w-6xl gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="min-w-0 rounded-2xl border border-line bg-paper p-5">
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl">Learner list</h2>
              <p className="text-sm text-muted">
                One row per learner. Headers can be anything — you map them next. Nothing leaves this browser.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="min-h-11 rounded-full bg-primary px-5 text-sm font-medium text-primary-fg"
                  onClick={() => fileRef.current?.click()}
                >
                  Upload Excel or CSV
                </button>
                <button
                  type="button"
                  className="min-h-11 rounded-full border border-line px-5 text-sm"
                  onClick={useSample}
                >
                  Use sample cohort
                </button>
                <button type="button" className="min-h-11 px-3 text-sm text-muted underline" onClick={downloadSample}>
                  Download sample file
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void onFile(file);
                    e.target.value = "";
                  }}
                />
              </div>
              <p className="text-sm">{fileLabel}</p>
              <Table headers={headers} rows={rows.slice(0, 6)} />
              <p className="text-xs text-muted">Showing {Math.min(6, rows.length)} of {rows.length}.</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl">Column map</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {FIELDS.map((key) => (
                  <label key={key} className="block text-sm">
                    <span className="text-muted">{FIELD_LABEL[key]}</span>
                    <select
                      className="mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-3"
                      value={mapping[key]}
                      onChange={(e) => setMapping({ ...mapping, [key]: e.target.value })}
                    >
                      <option value="">— not in this file —</option>
                      {headers.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
                <label className="block text-sm">
                  <span className="text-muted">Course if the column is empty</span>
                  <input
                    className="mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-3"
                    value={fallbackCourse}
                    onChange={(e) => setFallbackCourse(e.target.value)}
                  />
                </label>
              </div>
              <button
                type="button"
                className="min-h-11 rounded-full bg-ink px-5 text-sm text-primary-fg"
                onClick={() => setStep(2)}
              >
                Preview certificate
              </button>
            </div>
          )}

          {step === 2 && preview && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl">Preview</h2>
                <label className="text-sm text-muted">
                  Row{" "}
                  <select
                    className="min-h-11 rounded-lg border border-line bg-surface px-2"
                    value={previewIndex}
                    onChange={(e) => setPreviewIndex(Number(e.target.value))}
                  >
                    {planned.map((j, i) => (
                      <option key={j.certId} value={i}>
                        {i + 1}. {j.name || "(no name)"}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="text-sm text-muted">This is the real certificate. Logo, colours, and layout update here before you run.</p>
              <PdfPreview row={preview} brand={brand} />
              <StyleDesigner brand={brand} onChange={setBrand} />
              <button
                type="button"
                className="min-h-11 rounded-full bg-primary px-5 text-sm font-medium text-primary-fg"
                onClick={() => {
                  setJobs([]);
                  setStep(3);
                }}
              >
                Continue to run
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl">Run</h2>
              {preview && <PdfPreview row={preview} brand={brand} />}
              <div className="flex flex-wrap gap-2">
                <Stat label="Rows" value={active.length} />
                <Stat label="Ready" value={counts.pending + counts.retry} />
                <Stat label="Sent" value={counts.sent} />
                <Stat label="Failed" value={counts.failed} />
                <Stat label="Skipped" value={counts.skipped} />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={busy !== "idle"}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-fg disabled:opacity-50"
                  onClick={() => void runQueue(jobs.some((j) => j.status === "sent"))}
                >
                  <Play className="size-4" />
                  {jobs.some((j) => j.status === "sent") ? "Retry open rows" : "Run batch"}
                </button>
                <button
                  type="button"
                  disabled={busy !== "idle"}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm disabled:opacity-50"
                  onClick={() => void makeZip()}
                >
                  <Download className="size-4" />
                  {busy === "pdf" ? `PDFs ${pdfDone}` : "Download ZIP"}
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm"
                  onClick={exportResults}
                >
                  <FileSpreadsheet className="size-4" />
                  Result sheet
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-muted"
                  onClick={() => {
                    setJobs([]);
                    setLog("Queue cleared. Run again from the current list.");
                  }}
                >
                  <RotateCcw className="size-4" />
                  Reset queue
                </button>
              </div>
              <ul className="max-h-[420px] divide-y divide-line overflow-auto rounded-xl border border-line">
                {active.map((j) => (
                  <li key={j.certId} className="flex items-start justify-between gap-3 px-3 py-3 text-sm">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{j.name || "—"}</p>
                      <p className="truncate text-muted">{j.email || "no email"} · {j.certId}</p>
                      <p className="text-muted">{j.note}</p>
                    </div>
                    <StatusPill status={j.status} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-paper p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <ShieldCheck className="size-4 text-primary" />
              Why this does not die at row 200
            </div>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0" /> One row is one unit of work.</li>
              <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0" /> Bad emails fail before send.</li>
              <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0" /> Duplicates are skipped.</li>
              <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0" /> A throttle retries that row only.</li>
            </ul>
          </div>
          <p className="rounded-2xl border border-line bg-paper p-4 text-sm text-muted">{log}</p>
          <p className="text-xs text-muted">
            Mail here is a dry-run queue so you can prove the batch. Plug Resend or SES in when you deploy for a client — the row statuses stay the same.
          </p>
        </aside>
      </main>
    </div>
  );
}

function count(rows: JobRow[]) {
  return rows.reduce(
    (acc, row) => {
      acc[row.status] += 1;
      return acc;
    },
    { pending: 0, retry: 0, sent: 0, failed: 0, skipped: 0 },
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-16 rounded-xl bg-surface px-3 py-2">
      <p className="font-display text-xl leading-none">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function StatusPill({ status }: { status: JobRow["status"] }) {
  const label = status === "pending" ? "ready" : status;
  return (
    <span className="shrink-0 rounded-full border border-line px-2 py-1 text-xs uppercase tracking-wide">
      {label}
    </span>
  );
}

function StyleDesigner({ brand, onChange }: { brand: Brand; onChange: (b: Brand) => void }) {
  const fields: ["org" | "signatory" | "role" | "line", string][] = [
    ["org", "Organisation"],
    ["signatory", "Signatory"],
    ["role", "Role"],
    ["line", "Footer line"],
  ];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line px-4 text-sm">
          {brand.logo ? "Replace logo" : "Add logo"}
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              if (file.size > 700_000) return;
              const reader = new FileReader();
              reader.onload = () => onChange({ ...brand, logo: String(reader.result || "") });
              reader.readAsDataURL(file);
            }}
          />
        </label>
        {brand.logo ? (
          <button type="button" className="min-h-11 text-sm text-muted underline" onClick={() => onChange({ ...brand, logo: "" })}>
            Remove logo
          </button>
        ) : (
          <span className="text-sm text-muted">PNG or JPG, under 700 KB. Sits top left or top right.</span>
        )}
        {brand.logo ? (
          <div className="flex gap-2">
            {(["left", "right"] as const).map((side) => (
              <button
                key={side}
                type="button"
                onClick={() => onChange({ ...brand, logoSide: side })}
                className={
                  "min-h-11 rounded-full px-4 text-sm capitalize " +
                  (brand.logoSide === side ? "bg-ink text-primary-fg" : "border border-line")
                }
              >
                {side}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {LAYOUTS.map((layout) => (
          <button
            key={layout.id}
            type="button"
            onClick={() => onChange({ ...brand, layout: layout.id })}
            className={
              "min-h-11 rounded-full px-4 text-sm " +
              (brand.layout === layout.id ? "bg-ink text-primary-fg" : "border border-line")
            }
          >
            {layout.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {PALETTES.map((palette) => (
          <button
            key={palette.id}
            type="button"
            onClick={() => onChange({ ...brand, palette: palette.id })}
            className={
              "min-h-11 rounded-full border px-4 text-sm " +
              (brand.palette === palette.id ? "border-ink" : "border-line")
            }
          >
            {palette.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([key, label]) => (
          <label key={key} className="block text-sm">
            <span className="text-muted">{label}</span>
            <input
              className="mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-3"
              value={brand[key]}
              onChange={(e) => onChange({ ...brand, [key]: e.target.value })}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: Row[] }) {
  if (!headers.length) return null;
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-surface text-muted">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-line">
              {headers.map((h) => (
                <td key={h} className="px-3 py-2">
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PdfPreview({ row, brand }: { row: JobRow; brand: Brand }) {
  const [url, setUrl] = useState("");
  const brandKey = `${brand.org}|${brand.signatory}|${brand.role}|${brand.line}|${brand.layout}|${brand.palette}|${brand.logoSide}|${brand.logo}`;
  const rowKey = `${row.certId}|${row.name}|${row.course}|${row.date}|${row.score}`;

  useEffect(() => {
    let current = "";
    let cancelled = false;
    void certificatePdf(row, brand).then((bytes) => {
      if (cancelled) return;
      const copy = new Uint8Array(bytes.byteLength);
      copy.set(bytes);
      current = URL.createObjectURL(new Blob([copy.buffer], { type: "application/pdf" }));
      setUrl(current);
    });
    return () => {
      cancelled = true;
      if (current) URL.revokeObjectURL(current);
    };
  }, [brand, brandKey, row, rowKey]);

  if (!url) return <p className="text-sm text-muted">Drawing certificate…</p>;
  return (
    <iframe
      title="Certificate preview"
      src={url}
      className="aspect-[1.414/1] w-full rounded-sm border border-line bg-paper"
    />
  );
}
