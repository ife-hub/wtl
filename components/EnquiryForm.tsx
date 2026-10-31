"use client";
import { useState } from "react";

type Kind = "partnership" | "registration" | "contact";

const copy: Record<Kind, { select: string; message: string; button: string; done: string }> = {
  partnership: { select: "How would you like to partner?", message: "Tell us more", button: "Send partnership enquiry", done: "Thank you. We have received your enquiry and will be in touch." },
  registration: { select: "Programme", message: "Anything we should know?", button: "Submit registration", done: "Thank you. Your registration has been received." },
  contact: { select: "Topic", message: "Your message", button: "Send message", done: "Thank you. Your message has been sent." },
};

export default function EnquiryForm({ kind, options }: { kind: Kind; options: string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const c = copy[kind];
  const phoneRequired = kind !== "contact";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(new FormData(form).entries());
    if (sameWhatsapp) data.whatsapp = data.phone ? "Same as phone" : "";
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, ...data }) });
      if (!r.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
      setSameWhatsapp(true);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") return <div className="msg">{c.done}</div>;

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="row">
        <label>Full name<input name="name" required autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <div className="row">
        <label>Phone number<input name="phone" type="tel" required={phoneRequired} autoComplete="tel" inputMode="tel" placeholder="e.g. 0803 000 0000" /></label>
        {kind === "partnership" ? <label>Organization (optional)<input name="organization" /></label> : <label>City / Country<input name="location" /></label>}
      </div>
      <label className="check">
        <input type="checkbox" checked={sameWhatsapp} onChange={(e) => setSameWhatsapp(e.target.checked)} />
        My WhatsApp number is the same as my phone number
      </label>
      {!sameWhatsapp && (
        <label>WhatsApp number<input name="whatsapp" type="tel" required autoComplete="off" inputMode="tel" placeholder="Include the country code if outside Nigeria" /></label>
      )}
      <label>{c.select}
        <select name="choice" required defaultValue="">
          <option value="" disabled>Select one</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <label>{c.message}<textarea name="message" /></label>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : c.button}</button>
      {status === "error" && <div className="msg">Something went wrong. Please try again or contact us directly.</div>}
    </form>
  );
}