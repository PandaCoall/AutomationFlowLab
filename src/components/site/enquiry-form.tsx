import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EnquiryKind, FieldErrors } from "@/lib/enquiry";
import { submitEnquiry } from "@/lib/inbox.functions";
import { privacySummary, site } from "@/lib/site-content";

type Props = {
  kind: EnquiryKind;
  topic?: string;
  plan?: string;
  heading?: string;
  intro?: string;
};

const planOptions = [
  { id: "care", label: "Care — one system" },
  { id: "operations", label: "Operations — several systems" },
  { id: "partner", label: "Partner — planned improvement" },
] as const;

export function EnquiryForm({ kind, topic = "", plan = "", heading = "Send an enquiry", intro }: Props) {
  const [startedAt] = useState(() => Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [message, setMessage] = useState("");
  const [topicValue, setTopicValue] = useState(topic);
  const [planValue, setPlanValue] = useState(plan);
  const [businessProblem, setBusinessProblem] = useState("");
  const [existingTools, setExistingTools] = useState("");
  const [desiredOutcome, setDesiredOutcome] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    setTopicValue(topic);
  }, [topic]);

  useEffect(() => {
    setPlanValue(plan);
  }, [plan]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");
    setErrors({});
    setStatus("sending");
    try {
      const result = await submitEnquiry({
        data: {
          kind,
          topic: kind === "tool" ? topic : topicValue,
          plan: planValue,
          name,
          email,
          phone,
          organisation,
          message,
          businessProblem,
          existingTools,
          desiredOutcome,
          deadline,
          budgetRange,
          consent,
          website,
          startedAt,
        },
      });
      if (!result.ok) {
        setStatus("idle");
        setFormError(result.message);
        setErrors(result.fieldErrors ?? {});
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("idle");
      setFormError(`Something went wrong before this was stored. Email ${site.email} if it keeps happening.`);
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-line bg-surface p-6" role="status">
        <h2 className="font-display text-2xl">Enquiry received</h2>
        <p className="mt-3 text-muted">
          We have stored this and will reply to the email you gave. If you do not hear back, write to{" "}
          <a className="font-semibold text-ink underline decoration-line underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form className="relative rounded-xl border border-line bg-surface p-6" onSubmit={onSubmit} noValidate>
      <h2 className="font-display text-2xl">{heading}</h2>
      {intro ? <p className="mt-2 text-muted">{intro}</p> : null}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="mt-6 grid gap-4">
        <Field id="enquiry-name" label="Name" error={errors.name}>
          <Input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            value={name}
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => setName(event.target.value)}
          />
        </Field>
        <Field id="enquiry-email" label="Email" error={errors.email}>
          <Input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            aria-invalid={Boolean(errors.email)}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field id="enquiry-phone" label="Phone (optional)" error={errors.phone}>
          <Input
            id="enquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Field>
        <Field id="enquiry-org" label="Organisation (optional)">
          <Input
            id="enquiry-org"
            name="organisation"
            autoComplete="organization"
            value={organisation}
            onChange={(event) => setOrganisation(event.target.value)}
          />
        </Field>
        {kind === "contact" ? (
          <Field id="enquiry-topic" label="What is this about?" error={errors.topic}>
            <Input id="enquiry-topic" value={topicValue} onChange={(event) => setTopicValue(event.target.value)} />
          </Field>
        ) : null}
        {kind === "plan" ? (
          <Field id="enquiry-plan" label="Plan" error={errors.plan}>
            <select
              id="enquiry-plan"
              className="h-11 w-full rounded-sm border border-line bg-surface px-3 font-sans text-base text-ink"
              value={planValue}
              aria-invalid={Boolean(errors.plan)}
              onChange={(event) => setPlanValue(event.target.value)}
            >
              <option value="">Choose a plan</option>
              {planOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        ) : null}
        {kind === "custom" ? (
          <>
            <Field id="enquiry-problem" label="Business problem" error={errors.businessProblem}>
              <Textarea
                id="enquiry-problem"
                value={businessProblem}
                aria-invalid={Boolean(errors.businessProblem)}
                onChange={(event) => setBusinessProblem(event.target.value)}
              />
            </Field>
            <Field
              id="enquiry-tools"
              label="Existing tools"
              error={errors.existingTools}
              hint="Name what you use today, or say that you are starting from scratch."
            >
              <Textarea
                id="enquiry-tools"
                value={existingTools}
                aria-invalid={Boolean(errors.existingTools)}
                onChange={(event) => setExistingTools(event.target.value)}
              />
            </Field>
            <Field id="enquiry-outcome" label="Desired outcome" error={errors.desiredOutcome}>
              <Textarea
                id="enquiry-outcome"
                value={desiredOutcome}
                aria-invalid={Boolean(errors.desiredOutcome)}
                onChange={(event) => setDesiredOutcome(event.target.value)}
              />
            </Field>
            <Field
              id="enquiry-deadline"
              label="Deadline"
              error={errors.deadline}
              hint="A date, a month, or “no fixed date”."
            >
              <Input
                id="enquiry-deadline"
                value={deadline}
                aria-invalid={Boolean(errors.deadline)}
                onChange={(event) => setDeadline(event.target.value)}
              />
            </Field>
            <Field id="enquiry-budget" label="Budget range (optional)" hint="Leave this blank if you do not have one.">
              <Input id="enquiry-budget" value={budgetRange} onChange={(event) => setBudgetRange(event.target.value)} />
            </Field>
          </>
        ) : null}
        <Field
          id="enquiry-message"
          label={kind === "custom" ? "Anything else (optional)" : "Message"}
          error={errors.message}
        >
          <Textarea
            id="enquiry-message"
            value={message}
            aria-invalid={Boolean(errors.message)}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Field>
        <div>
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              className="mt-1 size-5 accent-primary"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
            />
            <span>I agree that Automation Flow Lab may store these details to reply to this enquiry.</span>
          </label>
          {errors.consent ? <p className="mt-1 text-sm text-danger">{errors.consent}</p> : null}
          <p className="mt-3 text-sm text-muted">{privacySummary}</p>
        </div>
        {formError ? (
          <p className="text-sm text-danger" role="alert">
            {formError}
          </p>
        ) : null}
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
      {error ? (
        <p className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
