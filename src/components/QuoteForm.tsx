"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "./Button";
import { ArrowIcon, CheckIcon } from "./icons";
import { site } from "@/lib/site";

type Fields = {
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  model: string;
  volume: string;
  incoterm: string;
  timeline: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  name: "",
  role: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  category: "",
  model: "",
  volume: "",
  incoterm: "",
  timeline: "",
  message: "",
};

const categories = [
  "Apparel and shirting",
  "Knitwear and jersey",
  "Outerwear",
  "Denim and casual",
  "Workwear and uniform",
  "Tailoring and formalwear",
  "Woven and knit fabric",
  "Home and soft furnishing",
  "Trims, labels and packaging",
  "Multiple categories",
];

const models = [
  "Buying and import agency",
  "Export and delivered trade",
  "Owned production (full package)",
  "Cut, make and trim",
  "Not yet determined",
];

const incoterms = ["EXW", "FOB", "CIF", "DDP", "To be advised"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter a contact name.";
  if (!values.company.trim()) errors.company = "Enter the contracting company.";
  if (!values.email.trim()) {
    errors.email = "Enter a business email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.category) errors.category = "Select a product category.";
  if (!values.volume.trim()) errors.volume = "Enter an indicative annual volume.";
  if (!values.message.trim())
    errors.message = "Describe the specification or attach-ready detail.";
  return errors;
}

export function QuoteForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  // Honeypot — hidden from people, irresistible to bots.
  const [website, setWebsite] = useState("");

  function update<K extends keyof Fields>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear a field's error as soon as the user edits it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      // Move focus to the first invalid field for keyboard/AT users.
      const first = Object.keys(found)[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }
    setErrors({});
    setSendError(null);
    setPending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setSendError(
          data?.error ??
            "We could not send your enquiry just now. Please email us directly.",
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setSendError(
        "We could not reach the server. Please check your connection, or email us directly.",
      );
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-brand border border-line bg-bg-subtle p-8 sm:p-10"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-brand-sm bg-accent text-white">
          <CheckIcon width={20} height={20} />
        </span>
        <h3 className="display display-md mt-6 text-ink">Enquiry received</h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-muted">
          An Attire Services client services lead will acknowledge your enquiry
          within {site.responseSla.toLowerCase()} and will come back with a
          costed bill of materials, an indicative shipping window and the
          applicable Incoterms. Certification and audit documentation is issued
          on request.
        </p>
        <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <dt className="label-mono">Acknowledgement</dt>
            <dd className="mt-1.5 text-sm text-ink">{site.responseSla}</dd>
          </div>
          <div>
            <dt className="label-mono">Reply address</dt>
            <dd className="mt-1.5 text-sm break-words text-ink">{values.email}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setSubmitted(false);
          }}
          className="link-underline mt-8 text-sm font-medium text-ink"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="relative space-y-10">
      {/* Contact */}
      <fieldset>
        <legend className="label-mono border-b border-line pb-3 w-full">
          01 — Contact
        </legend>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            id="field-name"
            label="Contact name"
            required
            value={values.name}
            onChange={(v) => update("name", v)}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            id="field-role"
            label="Role"
            placeholder="e.g. Head of Sourcing"
            value={values.role}
            onChange={(v) => update("role", v)}
            autoComplete="organization-title"
          />
          <Field
            id="field-company"
            label="Contracting company"
            required
            value={values.company}
            onChange={(v) => update("company", v)}
            error={errors.company}
            autoComplete="organization"
          />
          <Field
            id="field-country"
            label="Country of registration"
            value={values.country}
            onChange={(v) => update("country", v)}
            autoComplete="country-name"
          />
          <Field
            id="field-email"
            label="Business email"
            type="email"
            required
            value={values.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
            autoComplete="email"
          />
          <Field
            id="field-phone"
            label="Telephone"
            type="tel"
            value={values.phone}
            onChange={(v) => update("phone", v)}
            autoComplete="tel"
          />
        </div>
      </fieldset>

      {/* Requirement */}
      <fieldset>
        <legend className="label-mono border-b border-line pb-3 w-full">
          02 — Requirement
        </legend>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Select
            id="field-category"
            label="Product category"
            required
            value={values.category}
            onChange={(v) => update("category", v)}
            error={errors.category}
            options={categories}
            placeholder="Select a category"
          />
          <Select
            id="field-model"
            label="Engagement model"
            value={values.model}
            onChange={(v) => update("model", v)}
            options={models}
            placeholder="Select a model"
          />
          <Field
            id="field-volume"
            label="Indicative annual volume"
            required
            placeholder="e.g. 25,000 units"
            value={values.volume}
            onChange={(v) => update("volume", v)}
            error={errors.volume}
          />
          <Field
            id="field-timeline"
            label="Target delivery window"
            placeholder="e.g. Q3 2026"
            value={values.timeline}
            onChange={(v) => update("timeline", v)}
          />
          <Select
            id="field-incoterm"
            label="Preferred Incoterm"
            value={values.incoterm}
            onChange={(v) => update("incoterm", v)}
            options={incoterms}
            placeholder="Select a term"
          />
        </div>
      </fieldset>

      {/* Specification */}
      <fieldset>
        <legend className="label-mono border-b border-line pb-3 w-full">
          03 — Specification
        </legend>
        <div className="mt-6">
          <Label htmlFor="field-message" required>
            Scope and specification
          </Label>
          <textarea
            id="field-message"
            rows={6}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Construction, materials, size curve, quality standard, packaging requirements, and any compliance obligations in your destination markets."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : undefined}
            className="field mt-2 resize-y"
          />
          <FieldError id="error-message" message={errors.message} />
        </div>
      </fieldset>

      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="field-website">Website</label>
        <input
          id="field-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {sendError && (
        <div
          role="alert"
          className="rounded-brand border border-danger/40 bg-danger/5 p-4 text-sm text-ink"
        >
          <p className="font-medium text-danger">Enquiry not sent</p>
          <p className="mt-1.5 leading-relaxed text-ink-muted">
            {sendError} You can reach us at{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="link-underline font-medium text-ink"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-ink-faint">
          Enquiries are treated as confidential and covered by mutual NDA on
          request. We use your details only to respond to this enquiry.
        </p>
        <Button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className="w-full shrink-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Sending…" : "Submit enquiry"}
          {!pending && <ArrowIcon width={16} height={16} />}
        </Button>
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
      {children}
      {required && (
        <span className="text-accent" aria-hidden>
          {" "}
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-danger">
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const errorId = `error-${id.replace("field-", "")}`;
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="field mt-2"
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  error,
  options,
  placeholder,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  const errorId = `error-${id.replace("field-", "")}`;
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`field mt-2 ${value ? "" : "text-ink-faint"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
