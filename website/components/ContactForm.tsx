"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { validateContact, type FieldErrors } from "@/lib/validation";

type State = "idle" | "sending" | "sent" | "error";

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  { name: "organization", label: "Organization", type: "text", autoComplete: "organization", required: false },
] as const;

const inputCls =
  "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const { errors: errs } = validateContact(payload);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setState("sending");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setServerMsg(json.message ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }
      form.reset();
      setState("sent");
    } catch {
      setServerMsg("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" aria-hidden />
        <p className="mt-3 text-lg font-semibold text-navy">Thanks — message received.</p>
        <p className="mt-1 text-slate-600">We will get back to you soon.</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 text-sm font-semibold text-brand hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="text-sm font-medium text-slate-700">
            {f.label}
            {!f.required && <span className="text-slate-400"> (optional)</span>}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required={f.required}
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
            className={inputCls}
          />
          {errors[f.name] && (
            <p id={`${f.name}-err`} className="mt-1 text-sm text-red-600">
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="message" className="text-sm font-medium text-slate-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          className={inputCls}
        />
        {errors.message && (
          <p id="message-err" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people, often filled in by bots */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "error" && serverMsg && (
        <p role="alert" className="text-sm text-red-600">
          {serverMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-navy disabled:opacity-60"
      >
        {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
