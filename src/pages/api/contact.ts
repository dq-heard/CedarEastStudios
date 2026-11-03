// Contact form handler. Runs on demand (not prerendered) and sends the message through Resend.
import type { APIRoute } from "astro";
import {
  RESEND_API_KEY,
  CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL,
} from "astro:env/server";

export const prerender = false;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const field = (form: FormData, name: string, max: number) => {
  const value = form.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
};
// Header values can't contain line breaks
const oneLine = (text: string) => text.replace(/[\r\n]+/g, " ");

export const POST: APIRoute = async ({ request, redirect }) => {
  const wantsJson = request.headers.get("accept")?.includes("application/json");

  // Forms submitted without JavaScript get sent back to the page with a status
  const reply = (ok: boolean, error?: string, status = ok ? 200 : 400) =>
    wantsJson
      ? new Response(JSON.stringify(ok ? { ok: true } : { ok: false, error }), {
          status,
          headers: { "Content-Type": "application/json" },
        })
      : redirect(
          ok ? "/thank-you?type=form" : "/contact?status=error#send-message",
          303
        );

  // Only accept posts from this site
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return reply(false, "Request blocked.", 403);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(false, "That form couldn't be read.");
  }

  // Honeypot: a bot filled the hidden field. Pretend it worked and send nothing.
  if (field(form, "website", 200)) return reply(true);

  const firstName = field(form, "firstName", 100);
  const lastName = field(form, "lastName", 100);
  const email = field(form, "email", 200);
  const company = field(form, "company", 200);
  const service = field(form, "service", 200);
  const message = field(form, "message", 5000);

  if (!firstName || !lastName || !email || !message) {
    return reply(false, "Please fill in the required fields.");
  }
  if (!EMAIL.test(email))
    return reply(false, "That email address doesn't look right.");

  // Optional fields are left out when empty; the blank line before the message stays
  const lines: (string | null)[] = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    service ? `Package interest: ${service}` : null,
    "",
    message,
  ];
  const text = lines.filter((line): line is string => line !== null).join("\n");

  // No Resend key yet: in dev, print the message to the terminal and report success
  if (import.meta.env.DEV && !RESEND_API_KEY) {
    console.log(
      "\n[contact form] No RESEND_API_KEY set, so nothing was emailed. Message:\n" +
        text +
        "\n"
    );
    return reply(true);
  }

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form: Resend environment variables are not set.");
    return reply(false, "Your message couldn't be sent right now.", 500);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: oneLine(
        `New inquiry from ${firstName} ${lastName}${company ? ` (${company})` : ""}`
      ),
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return reply(false, "Your message couldn't be sent right now.", 502);
  }
  return reply(true);
};
