import { Resend } from "resend";

type Env = {
  RESEND_API_KEY: "re_XAAp56NN_6v8sVNwMr6j9Kv7AboaeMVXg";
  RESEND_FROM?: string;
};

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { ...init, headers });
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const payload = (body ?? {}) as Partial<{
    name: string;
    email: string;
    subject: string;
    message: string;
    company: string;
  }>;

  if (payload.company && payload.company.trim().length > 0) {
    return json({ ok: true }, { status: 200 });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const subject = (payload.subject ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name || !email || !subject || !message) {
    return json({ ok: false, error: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return json({ ok: false, error: "อีเมลไม่ถูกต้อง" }, { status: 400 });
  }

  if (message.length > 4000 || subject.length > 200 || name.length > 200) {
    return json({ ok: false, error: "ข้อความยาวเกินไป" }, { status: 400 });
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const from = env.RESEND_FROM ?? "KYN Website <onboarding@resend.dev>";

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
      <h2 style="margin:0 0 12px;">New message from KYN website</h2>
      <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 12px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <pre style="margin:0; padding:12px; background:#f4f4f5; border-radius:10px; white-space:pre-wrap;">${escapeHtml(
        message
      )}</pre>
    </div>
  `.trim();

  const { error } = await resend.emails.send({
    from,
    to: "info@kynpartners.co",
    subject: `[KYN Website] ${subject}`,
    html,
    replyTo: email,
  });

  if (error) {
    return json({ ok: false, error: "ส่งอีเมลไม่สำเร็จ" }, { status: 502 });
  }

  return json({ ok: true }, { status: 200 });
};

