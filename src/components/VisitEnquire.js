"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { ArrowUpRight, CheckIcon } from "./Icons";
import { FORM_EMAIL, submitForm } from "@/lib/formsubmit";

export default function VisitEnquire() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", venue: "", date: "", timeFrom: "", timeTo: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    submitForm(FORM_EMAIL, {
      _subject: `Wonkie Enquiry from ${form.name}`,
      _replyto: form.email,
      name: form.name,
      email: form.email,
      venue: form.venue || "—",
      date: form.date || "—",
      time: form.timeFrom || form.timeTo ? `${form.timeFrom || "—"} to ${form.timeTo || "—"}` : "—",
      "event details": form.message,
    })
      .then(() => { setSent(true); setSending(false); })
      .catch(() => { setError("Something went wrong — please try again."); setSending(false); });
  };
  return (
    <section className="visit-enquire reveal" ref={ref}>
      <div className="visit-enquire-inner">
        <div className="visit-enquire-label">
          <span className="kicker">— book</span>
          <h2 className="visit-h"><em>Or have us find you.</em></h2>
          <p className="enquire-desc">
            We do weddings, private dinners, pop-ups, corporate dos, and whatever
            else you&apos;re dreaming up. Drop us a line and we&apos;ll figure out the scoops.
          </p>
          <ul className="enquire-services">
            <li><span className="enquire-dot" />Weddings &amp; solemnisations</li>
            <li><span className="enquire-dot" />Corporate &amp; brand events</li>
            <li><span className="enquire-dot" />Pop-ups &amp; collabs</li>
          </ul>
        </div>
        <form className="visit-form" onSubmit={submit}>
          <span className="kicker">— enquire</span>
          <h3>For event enquiries, fill in your details below or WhatsApp us.</h3>
          <label className="field">
            <span>name</span>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </label>
          <label className="field">
            <span>email</span>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </label>
          <label className="field">
            <span>venue</span>
            <input value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} placeholder="venue name or address" />
          </label>
          <label className="field">
            <span>date</span>
            <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <label className="field">
              <span>from</span>
              <input type="time" value={form.timeFrom} onChange={e => setForm({...form, timeFrom: e.target.value})} />
            </label>
            <label className="field">
              <span>to</span>
              <input type="time" value={form.timeTo} onChange={e => setForm({...form, timeTo: e.target.value})} />
            </label>
          </div>
          <label className="field">
            <span>event details</span>
            <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
              placeholder="Tell us what you have in mind!" />
          </label>
          <button type="submit" className={`btn${sent ? " btn-sent" : ""}`} disabled={sending || sent}>
            <span>{sent ? "sent — talk soon" : sending ? "sending..." : "send"}</span>
            {sent ? <CheckIcon /> : <ArrowUpRight />}
          </button>
          {error && <p style={{ color: "#e53e3e", fontSize: "14px", margin: 0 }}>{error}</p>}
        </form>
      </div>
    </section>
  );
}
