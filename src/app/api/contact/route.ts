import { mailerConfigured, sendMail } from "@/lib/mailer";

/**
 * Enquiry form endpoint.
 *
 * Validates server-side (never trust the client's own check), rate-limits
 * per IP, drops anything that trips the honeypot, then hands off to the
 * configured mail provider.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = Record<string, unknown>;

const REQUIRED = ["name", "company", "email", "category", "volume", "message"] as const;

const FIELD_LABELS: Record<string, string> = {
  name: "Contact name",
  role: "Role",
  company: "Contracting company",
  country: "Country of registration",
  email: "Business email",
  phone: "Telephone",
  category: "Product category",
  model: "Engagement model",
  volume: "Indicative annual volume",
  timeline: "Target delivery window",
  incoterm: "Preferred Incoterm",
  message: "Scope and specification",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Small in-memory limiter. Resets on redeploy, which is fine for this volume —
// it exists to stop a bot hammering the endpoint, not to enforce a quota.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  if (!mailerConfigured()) {
    // Explicit, so a misconfigured deploy is obvious rather than silently
    // swallowing enquiries.
    return Response.json(
      {
        ok: false,
        error:
          "Email delivery is not configured on this deployment. Please contact us directly by email.",
      },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many enquiries from this address. Please try again later." },
      { status: 429 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real person never fills a hidden field.
  if (str(body.website)) {
    return Response.json({ ok: true });
  }

  const missing = REQUIRED.filter((k) => !str(body[k]));
  if (missing.length > 0) {
    return Response.json(
      { ok: false, error: "Please complete all required fields.", fields: missing },
      { status: 400 },
    );
  }

  const email = str(body.email);
  if (!EMAIL.test(email)) {
    return Response.json(
      { ok: false, error: "Please provide a valid email address.", fields: ["email"] },
      { status: 400 },
    );
  }

  const company = str(body.company);

  const lines = Object.entries(FIELD_LABELS)
    .map(([key, label]) => [label, str(body[key])] as const)
    .filter(([, value]) => value.length > 0);

  const text = [
    "New sourcing enquiry from the Attire Services website",
    "",
    ...lines.map(([label, value]) => `${label}: ${value}`),
    "",
    `Received: ${new Date().toUTCString()}`,
  ].join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#0a1a2b;line-height:1.6">
      <h2 style="margin:0 0 4px;font-size:18px">New production enquiry</h2>
      <p style="margin:0 0 20px;color:#5f6d7a;font-size:13px">
        Submitted via the Attire Services website
      </p>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${lines
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 16px 8px 0;vertical-align:top;border-bottom:1px solid #dfe3e8;
                       font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#5f6d7a;
                       white-space:nowrap">${escapeHtml(label)}</td>
            <td style="padding:8px 0;vertical-align:top;border-bottom:1px solid #dfe3e8;
                       font-size:14px">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 0;color:#8b97a3;font-size:12px">
        Reply directly to this email to reach ${escapeHtml(email)}.
      </p>
    </div>`;

  const result = await sendMail({
    subject: `Production enquiry — ${company}`,
    text,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    console.error("[contact] send failed:", result.reason, result.detail ?? "");
    return Response.json(
      { ok: false, error: "We could not send your enquiry just now. Please email us directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
