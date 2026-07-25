/**
 * Outbound email for the enquiry form.
 *
 * Deliberately dependency-free — both providers are called over plain REST
 * with `fetch`, so nothing needs installing and the API key never reaches
 * the browser. Configure exactly one provider in the environment:
 *
 *   Resend      RESEND_API_KEY, optionally CONTACT_FROM_EMAIL
 *   Web3Forms   WEB3FORMS_ACCESS_KEY
 *
 * Delivery address comes from CONTACT_TO_EMAIL.
 */

export type MailPayload = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export type MailResult =
  | { ok: true; provider: "resend" | "web3forms" }
  | { ok: false; reason: "unconfigured" | "provider_error"; detail?: string };

const TO = process.env.CONTACT_TO_EMAIL ?? "";

export function mailerConfigured(): boolean {
  return Boolean(
    TO && (process.env.RESEND_API_KEY || process.env.WEB3FORMS_ACCESS_KEY),
  );
}

export async function sendMail(payload: MailPayload): Promise<MailResult> {
  if (!mailerConfigured()) return { ok: false, reason: "unconfigured" };

  if (process.env.RESEND_API_KEY) {
    return sendViaResend(payload);
  }
  return sendViaWeb3Forms(payload);
}

async function sendViaResend(payload: MailPayload): Promise<MailResult> {
  // Resend requires a verified domain to use a custom From. Until one is
  // set up, onboarding@resend.dev works and delivers to the address the
  // Resend account was registered with.
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [TO],
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, reason: "provider_error", detail: detail.slice(0, 400) };
    }
    return { ok: true, provider: "resend" };
  } catch (err) {
    return {
      ok: false,
      reason: "provider_error",
      detail: err instanceof Error ? err.message : "network error",
    };
  }
}

async function sendViaWeb3Forms(payload: MailPayload): Promise<MailResult> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: payload.subject,
        from_name: "Ostenmark website enquiry",
        email: payload.replyTo,
        message: payload.text,
      }),
    });

    const body = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (!res.ok || !body?.success) {
      return {
        ok: false,
        reason: "provider_error",
        detail: JSON.stringify(body ?? {}).slice(0, 400),
      };
    }
    return { ok: true, provider: "web3forms" };
  } catch (err) {
    return {
      ok: false,
      reason: "provider_error",
      detail: err instanceof Error ? err.message : "network error",
    };
  }
}
