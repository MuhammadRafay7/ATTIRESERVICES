"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./Button";
import { ArrowIcon, CheckIcon } from "./icons";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  cargo: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  origin: "",
  destination: "",
  cargo: "",
  message: "",
};

const cargoTypes = [
  "Manufacturing / production run",
  "Manufacturer sourcing & matchmaking",
  "Order fulfillment",
  "Ocean freight (FCL/LCL)",
  "Air freight",
  "Land & rail",
  "Customs & compliance",
  "Warehousing & fulfillment",
  "End-to-end (make + ship)",
  "Other",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.cargo) errors.cargo = "Please choose what you need.";
  if (!values.message.trim())
    errors.message = "Please add a few details about your shipment.";
  return errors;
}

export function QuoteForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof Fields>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear a field's error as soon as the user edits it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Frontend-only demo: never actually posts (BUILD_BRIEF §6/§9).
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
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center rounded-brand border border-gold/30 bg-gold-tint/50 p-10 text-center"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white">
          <CheckIcon width={28} height={28} />
        </span>
        <h3 className="mt-6 text-2xl text-ink">Thanks — we&apos;ll be in touch.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          Your request has been received. A Meridian trade specialist will
          review the details and get back to you within one business day with a
          tailored quote.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setSubmitted(false);
          }}
          className="link-underline mt-8 text-sm font-medium text-ink"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="field-name"
          label="Full name"
          required
          value={values.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="field-company"
          label="Company"
          value={values.company}
          onChange={(v) => update("company", v)}
          autoComplete="organization"
        />
        <Field
          id="field-email"
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          id="field-phone"
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(v) => update("phone", v)}
          autoComplete="tel"
        />
        <Field
          id="field-origin"
          label="Origin / where to make"
          placeholder="City, country or port"
          value={values.origin}
          onChange={(v) => update("origin", v)}
          error={errors.origin}
        />
        <Field
          id="field-destination"
          label="Destination"
          placeholder="City, country or port"
          value={values.destination}
          onChange={(v) => update("destination", v)}
          error={errors.destination}
        />
      </div>

      {/* What do you need */}
      <div>
        <Label htmlFor="field-cargo" required>
          How can we help?
        </Label>
        <select
          id="field-cargo"
          value={values.cargo}
          onChange={(e) => update("cargo", e.target.value)}
          aria-invalid={Boolean(errors.cargo)}
          aria-describedby={errors.cargo ? "error-cargo" : undefined}
          className={`mt-2 w-full rounded-brand border bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold ${
            errors.cargo ? "border-red-500" : "border-border"
          } ${values.cargo ? "" : "text-muted"}`}
        >
          <option value="" disabled>
            Select what you need…
          </option>
          {cargoTypes.map((c) => (
            <option key={c} value={c} className="text-ink">
              {c}
            </option>
          ))}
        </select>
        <FieldError id="error-cargo" message={errors.cargo} />
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="field-message" required>
          Shipment details
        </Label>
        <textarea
          id="field-message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Product & specs, quantity, target timeline, and anything else we should know — whether you need it made, sourced, or shipped."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "error-message" : undefined}
          className={`mt-2 w-full resize-y rounded-brand border bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold ${
            errors.message ? "border-red-500" : "border-border"
          }`}
        />
        <FieldError id="error-message" message={errors.message} />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          This is a demo form — no data is sent or stored.
        </p>
        <Button type="submit" className="w-full sm:w-auto">
          Request a quote
          <ArrowIcon width={18} height={18} />
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
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-ink-soft"
    >
      {children}
      {required && <span className="text-gold"> *</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-red-600">
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
        className={`mt-2 w-full rounded-brand border bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold ${
          error ? "border-red-500" : "border-border"
        }`}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
