"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type FormData = {
  name: string; email: string; subject: string; service: string;
  message: string; consent: boolean; website: string;
};
const empty: FormData = { name: "", email: "", subject: "", service: "", message: "", consent: false, website: "" };
type Fields = Record<string, string>;

export function ContactForm() {
  const [form, setForm] = useState<FormData>(empty);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Fields>({});
  const [notice, setNotice] = useState("");
  const [sent, setSent] = useState(false);
  const fieldClass = "min-h-12 w-full rounded-lg border border-gold/30 bg-navy-deep px-4 py-3 text-sm text-cream placeholder:text-muted/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25";
  function edit<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((old) => ({ ...old, [key]: value }));
    setErrors((old) => ({ ...old, [key]: "" }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setErrors({});
    setNotice("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result: { accepted?: boolean; message?: string; error?: string; fields?: Fields } = await res.json();
      if (res.ok && result.accepted) {
        setSent(true);
        setNotice(result.message ?? "Your message was accepted for delivery.");
        setForm(empty);
      } else {
        setErrors(result.fields ?? {});
        setNotice(result.error ?? "Unable to send. Please contact us by email or WhatsApp.");
      }
    } catch {
      setNotice("Could not reach the website server. Please try again or contact us directly.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-cream">Your name *</label>
          <input id="contact-name" autoComplete="name" required minLength={2} maxLength={80} className={fieldClass}
            value={form.name} onChange={(e)=>edit("name",e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name?"error-name":undefined}
            placeholder="Your name"/>
          {errors.name && <p id="error-name" className="mt-1 text-xs text-red-200">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-cream">Email address *</label>
          <input id="contact-email" type="email" autoComplete="email" required maxLength={254} className={fieldClass}
            value={form.email} onChange={(e)=>edit("email",e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email?"error-email":undefined}
            placeholder="you@example.com"/>
          {errors.email && <p id="error-email" className="mt-1 text-xs text-red-200">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-cream">Subject *</label>
          <input id="contact-subject" required minLength={5} maxLength={120} className={fieldClass}
            value={form.subject} onChange={(e)=>edit("subject",e.target.value)} aria-invalid={!!errors.subject} aria-describedby={errors.subject?"error-subject":undefined}
            placeholder="How can we help?"/>
          {errors.subject && <p id="error-subject" className="mt-1 text-xs text-red-200">{errors.subject}</p>}
        </div>
        <div>
          <label htmlFor="contact-service" className="mb-2 block text-sm font-medium text-cream">Service <span className="text-muted">(optional)</span></label>
          <select id="contact-service" className={fieldClass} value={form.service}
            onChange={(e)=>edit("service",e.target.value)} aria-invalid={!!errors.service}>
            <option value="">General enquiry</option>
            {siteConfig.services.map((service)=><option key={service.slug} value={service.slug}>{service.name}</option>)}
          </select>
          {errors.service && <p className="mt-1 text-xs text-red-200">{errors.service}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-cream">Your message *</label>
        <textarea id="contact-message" required minLength={20} maxLength={2000} rows={6}
          className={fieldClass} value={form.message} onChange={(e)=>edit("message",e.target.value)}
          aria-invalid={!!errors.message} aria-describedby={errors.message?"error-message":undefined}
          placeholder="Explain the consultation topic or question. Avoid sensitive personal or health information."/>
        <div className="mt-2 flex justify-between gap-3 text-xs text-muted">
          <span>{errors.message || "20–2000 characters"}</span><span>{form.message.length} / 2000</span>
        </div>
      </div>
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input tabIndex={-1} id="contact-website" autoComplete="off" value={form.website} onChange={(e)=>edit("website",e.target.value)} />
      </div>
      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gold/20 bg-navy-deep/70 p-4 text-sm leading-6 text-cream/85">
        <input type="checkbox" checked={form.consent} onChange={(e)=>edit("consent",e.target.checked)}
          required aria-invalid={!!errors.consent} className="mt-1 size-4 shrink-0 accent-[#e8b664]"/>
        <span>I agree that SmartJyotishi may use my details to respond to this enquiry. See the <Link href="/privacy-policy" className="text-gold-light underline underline-offset-4">Privacy Policy</Link>. *</span>
      </label>
      {errors.consent && <p className="text-xs text-red-200">{errors.consent}</p>}
      <p className="text-xs leading-6 text-muted">
        This form sends an email to SmartJyotishi when email delivery is configured. It does not book or confirm a consultation.
      </p>
      {notice && <p role={sent?"status":"alert"} aria-live="polite" className={["rounded-lg border px-4 py-3 text-sm leading-6",sent?"border-gold/40 bg-gold/10 text-cream":"border-red-400/40 bg-red-400/10 text-red-100"].join(" ")}>{notice}</p>}
      <button disabled={pending} type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-light disabled:opacity-60 sm:w-auto">
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
