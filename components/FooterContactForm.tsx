"use client";

import { useMemo, useState } from "react";

type FooterFormLabels = {
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  submitLabel: string;
};

type FooterContactFormProps = {
  labels: FooterFormLabels;
};

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function FooterContactForm({ labels }: FooterContactFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const canSubmit = useMemo(() => {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      return false;
    }
    if (!isValidEmail(form.email)) {
      return false;
    }
    return status !== "sending";
  }, [form, status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get("Content-Type") ?? "";
      const payload = contentType.includes("application/json")
        ? ((await res.json().catch(() => null)) as { ok: boolean; error?: string } | null)
        : null;
      const textFallback = !payload
        ? (await res.text().catch(() => "")).slice(0, 300)
        : "";

      if (!res.ok || !payload?.ok) {
        setStatus("error");
        setErrorMessage(
          (payload?.error ?? textFallback) ||
            `ส่งข้อความไม่สำเร็จ (HTTP ${res.status}) กรุณาลองใหม่อีกครั้ง`
        );
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
    } catch {
      setStatus("error");
      setErrorMessage("ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        value={form.company}
        onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="footer-name">
            {labels.nameLabel}
          </label>
          <input
            id="footer-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="h-10 rounded-md bg-white px-3 text-sm text-zinc-900 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="footer-email">
            {labels.emailLabel}
          </label>
          <input
            id="footer-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="h-10 rounded-md bg-white px-3 text-sm text-zinc-900 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="footer-subject">
          {labels.subjectLabel}
        </label>
        <input
          id="footer-subject"
          type="text"
          value={form.subject}
          onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
          className="h-10 rounded-md bg-white px-3 text-sm text-zinc-900 outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="footer-message">
          {labels.messageLabel}
        </label>
        <textarea
          id="footer-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          className="resize-none rounded-md bg-white px-3 py-2 text-sm text-zinc-900 outline-none"
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 w-fit rounded-md bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition enabled:hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "กำลังส่ง..." : labels.submitLabel}
        </button>

        {status === "success" ? (
          <p className="text-xs text-white/90">ส่งข้อความเรียบร้อยแล้ว</p>
        ) : null}
        {status === "error" ? (
          <p className="text-xs text-white/90">{errorMessage}</p>
        ) : null}
      </div>
    </form>
  );
}

