"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckIcon16 as CheckIcon } from "@/components/Icons";
import TimePicker from "@/components/TimePicker";
import { FORM_EMAIL, submitForm } from "@/lib/formsubmit";

const FLAVOURS_NON_ALCOHOLIC = [
  "French Vanilla",
  "Dark Chocolate Honeycomb",
  "Matcha",
  "Earl Grey Brownie",
  "Chocolate Oolong",
  "Lemon Basil Sorbet",
  "Cookies & Cream",
  "Salted Caramel Potato Chips",
];

const FLAVOURS_ALCOHOLIC = [
  "Rum & Raisins",
  "Smoked Chocolate Whiskey",
  "Baileys Cookies",
  "Tiramisu",
  "Yogurt Roku Gin",
  "Apple & Wine",
];

const EVENT_TYPES = [
  "Wedding / Solemnisation",
  "Corporate event",
  "Birthday party",
  "Pop-up / Collab",
  "Private dinner",
  "Other",
];

const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    desc: "Perfect for intimate weddings and smaller celebrations.",
    guests: "100 — 150",
    tubs: 3,
    includes: [
      "2 hours of ice cream service",
      "2 professional Wonkie scoopers",
      "Cups, spoons & standard styling",
      "Islandwide transport",
    ],
    price: 1088,
  },
  {
    id: "popular",
    name: "Popular",
    desc: "Our most-loved package for medium to large celebrations.",
    guests: "200 — 300",
    tubs: 4,
    includes: [
      "3 hours of ice cream service",
      "2 professional Wonkie scoopers",
      "Customised styling available",
      "Free sample tasting session",
      "Islandwide transport",
    ],
    price: 1388,
    popular: true,
  },
  {
    id: "grand",
    name: "Grand",
    desc: "The full Wonkie experience for large-scale celebrations.",
    guests: "300+",
    tubs: 5,
    includes: [
      "3 hours of ice cream service",
      "2 professional Wonkie scoopers",
      "Flavour story cards for guests",
      "Customised styling available",
      "Free sample tasting session",
      "Islandwide transport",
    ],
    price: 1688,
  },
];

const ALCOHOLIC_SURCHARGE = 100;
const EXTRA_TUB_PRICE = 180;

function StepIndicator({ current, steps }) {
  return (
    <div className="steps-bar">
      {steps.map((label, i) => (
        <div key={i} className={`step-item${i === current ? " step-active" : ""}${i < current ? " step-done" : ""}`}>
          <span className="step-num">{i < current ? <CheckIcon /> : `0${i + 1}`}</span>
          <span className="step-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function StepEvent({ data, onChange, onNext }) {
  const update = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const guestsNum = parseInt(data.guests, 10);
  const guestsValid = data.guests === "" || (Number.isInteger(guestsNum) && guestsNum > 0);
  const dateValid = data.date >= minDate;
  const canProceed = data.eventType && data.venue && data.date && dateValid && data.guests && guestsValid;

  return (
    <section className="quote-step">
      <span className="kicker">— 01 your event</span>
      <h2 className="step-h">Tell us about your <em>event.</em></h2>
      <p className="step-desc">We&apos;ll tailor everything to your day — just give us the basics.</p>

      <div className="form-grid">
        <label className="field">
          <span>type of event</span>
          <select value={data.eventType} onChange={update("eventType")}>
            <option value="">select one...</option>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label className="field">
          <span>estimated guests</span>
          <input type="number" min="1" placeholder="e.g. 80" value={data.guests} onChange={update("guests")} />
          {data.guests && !guestsValid && <span className="field-error">Please enter a valid number</span>}
        </label>
        <label className="field">
          <span>venue</span>
          <input placeholder="venue name or address" value={data.venue} onChange={update("venue")} />
        </label>
        <label className="field">
          <span>date</span>
          <input type="date" min={minDate} value={data.date} onChange={update("date")} />
          {data.date && !dateValid && <span className="field-error">Please choose a future date</span>}
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="field">
            <span>from</span>
            <TimePicker value={data.timeFrom} onChange={v => onChange({...data, timeFrom: v})} placeholder="Start time" />
          </div>
          <div className="field">
            <span>to</span>
            <TimePicker value={data.timeTo} onChange={v => onChange({...data, timeTo: v})} placeholder="End time" />
          </div>
        </div>
        <label className="field field-full">
          <span>anything else we should know?</span>
          <textarea rows={3} placeholder="dietary needs, theme, special requests..." value={data.notes} onChange={update("notes")} />
        </label>
      </div>

      <div className="step-actions">
        <div />
        <button className="btn" onClick={onNext} disabled={!canProceed}>
          <span>choose a package</span>
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

function PackageCard({ pkg, selected, onSelect }) {
  const active = selected === pkg.id;
  return (
    <div className={`pkg-card${active ? " pkg-active" : ""}${pkg.popular ? " pkg-popular" : ""}`} onClick={() => onSelect(pkg.id)}>
      {pkg.popular && <span className="pkg-badge">most popular</span>}
      <div className="pkg-header">
        <span className="kicker">— {pkg.guests} guests</span>
        <h3 className="pkg-name">{pkg.name}</h3>
        <p className="pkg-desc">{pkg.desc}</p>
      </div>
      <div className="pkg-details">
        <div className="pkg-stat">
          <span className="pkg-stat-num">{pkg.tubs}</span>
          <span className="pkg-stat-label">ice cream tubs</span>
        </div>
      </div>
      <ul className="pkg-includes">
        {pkg.includes.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <div className="pkg-footer">
        <span className="pkg-price">RM {pkg.price.toLocaleString()}</span>
        <button className={`btn ${active ? "" : "btn-outline"}`}>
          <span>{active ? "selected" : "select"}</span>
        </button>
      </div>
    </div>
  );
}

function FlavourPicker({ selected, maxSlots, onChange }) {
  const toggle = (name) => {
    if (selected.includes(name)) {
      onChange(selected.filter((f) => f !== name));
    } else if (selected.length < maxSlots) {
      onChange([...selected, name]);
    }
  };
  const atLimit = selected.length >= maxSlots;
  const alcoholicCount = selected.filter((f) => FLAVOURS_ALCOHOLIC.includes(f)).length;

  return (
    <div className="flavour-picker">
      <div className="flavour-picker-status">
        <span className="flavour-picker-count">
          {selected.length} / {maxSlots} flavours selected
        </span>
        {alcoholicCount > 0 && (
          <span className="flavour-picker-surcharge">
            +RM {(alcoholicCount * ALCOHOLIC_SURCHARGE).toLocaleString()} alcoholic surcharge
          </span>
        )}
      </div>
      <div className="flavour-columns">
        <div className="flavour-col">
          <span className="flavour-col-label">Non-Alcoholic</span>
          <ul className="flavour-list flavour-list-select">
            {FLAVOURS_NON_ALCOHOLIC.map((f) => {
              const checked = selected.includes(f);
              const disabled = !checked && atLimit;
              return (
                <li key={f} className={`flavour-option${checked ? " flavour-selected" : ""}${disabled ? " flavour-disabled" : ""}`}
                    onClick={() => !disabled && toggle(f)}>
                  <span className="flavour-check">{checked && <CheckIcon />}</span>
                  <span>{f}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flavour-col">
          <span className="flavour-col-label">Alcoholic</span>
          <ul className="flavour-list flavour-list-select">
            {FLAVOURS_ALCOHOLIC.map((f) => {
              const checked = selected.includes(f);
              const disabled = !checked && atLimit;
              return (
                <li key={f} className={`flavour-option${checked ? " flavour-selected" : ""}${disabled ? " flavour-disabled" : ""}`}
                    onClick={() => !disabled && toggle(f)}>
                  <span className="flavour-check">{checked && <CheckIcon />}</span>
                  <span>{f}</span>
                  <span className="flavour-surcharge-tag">+RM{ALCOHOLIC_SURCHARGE}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StepPackage({ selectedPkg, onSelect, selectedFlavours, onFlavoursChange, onBack, onNext }) {
  const pkg = PACKAGES.find((p) => p.id === selectedPkg);
  const maxSlots = pkg ? pkg.tubs : 0;

  useEffect(() => {
    if (selectedFlavours.length > maxSlots && maxSlots > 0) {
      onFlavoursChange(selectedFlavours.slice(0, maxSlots));
    }
  }, [selectedPkg, selectedFlavours.length, maxSlots, onFlavoursChange]);

  return (
    <section className="quote-step">
      <span className="kicker">— 02 choose your package</span>
      <h2 className="step-h">Pick a <em>package.</em></h2>
      <p className="step-desc">Each package is fully customisable — this is just the starting point.</p>

      <div className="pkg-grid">
        {PACKAGES.map((p) => (
          <PackageCard key={p.id} pkg={p} selected={selectedPkg} onSelect={onSelect} />
        ))}
      </div>

      {selectedPkg && (
        <div className="flavour-menu">
          <h3 className="flavour-menu-h">Choose your {maxSlots} flavours</h3>
          <p className="step-desc">Pick {maxSlots} flavours for your {pkg.name} package. Alcoholic flavours have a +RM{ALCOHOLIC_SURCHARGE} surcharge per tub.</p>
          <FlavourPicker selected={selectedFlavours} maxSlots={maxSlots} onChange={onFlavoursChange} />
        </div>
      )}

      <div className="step-actions">
        <button className="btn btn-ghost" onClick={onBack}>
          <ArrowLeft />
          <span>back</span>
        </button>
        <button className="btn" onClick={onNext} disabled={!selectedPkg || selectedFlavours.length !== maxSlots}>
          <span>add extras</span>
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

function StepExtras({ extraTubs, extraFlavours, onExtraTubsChange, onExtraFlavoursChange, onBack, onNext }) {
  const handleQtyChange = (newQty) => {
    onExtraTubsChange(newQty);
    if (extraFlavours.length > newQty) {
      onExtraFlavoursChange(extraFlavours.slice(0, newQty));
    }
  };

  const extraAlcoholicCount = extraFlavours.filter((f) => FLAVOURS_ALCOHOLIC.includes(f)).length;
  const extraTubCost = extraTubs * EXTRA_TUB_PRICE;
  const extraAlcCost = extraAlcoholicCount * ALCOHOLIC_SURCHARGE;

  return (
    <section className="quote-step">
      <span className="kicker">— 03 extras</span>
      <h2 className="step-h">Want <em>more?</em></h2>
      <p className="step-desc">Add extra tubs on top of your package. Skip this if you&apos;re happy as-is.</p>

      <div className="addons-list">
        <div className="addon-row">
          <div className="addon-info">
            <span className="addon-name">Extra ice cream tubs</span>
            <span className="addon-desc">Additional tubs beyond your package</span>
            <span className="addon-unit">RM {EXTRA_TUB_PRICE} per tub</span>
          </div>
          <span className="addon-price">{extraTubs > 0 ? `+ RM ${(extraTubCost + extraAlcCost).toLocaleString()}` : ""}</span>
          <div className="addon-qty">
            <button className="qty-btn" onClick={() => handleQtyChange(Math.max(0, extraTubs - 1))} disabled={extraTubs === 0}>-</button>
            <span className="qty-num">{extraTubs}</span>
            <button className="qty-btn" onClick={() => handleQtyChange(extraTubs + 1)}>+</button>
          </div>
        </div>
      </div>

      {extraTubs > 0 && (
        <div className="flavour-menu">
          <h3 className="flavour-menu-h">Pick flavours for your extra {extraTubs === 1 ? "tub" : `${extraTubs} tubs`}</h3>
          <FlavourPicker selected={extraFlavours} maxSlots={extraTubs} onChange={onExtraFlavoursChange} />
        </div>
      )}

      <div className="step-actions">
        <button className="btn btn-ghost" onClick={onBack}>
          <ArrowLeft />
          <span>back</span>
        </button>
        <button className="btn" onClick={onNext} disabled={extraTubs > 0 && extraFlavours.length !== extraTubs}>
          <span>review quote</span>
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

function StepSummary({ eventData, selectedPkg, selectedFlavours, extraTubs, extraFlavours, contact, onContactChange, onBack, onSubmit, sent, sending, submitError }) {
  const basePkg = PACKAGES.find((p) => p.id === selectedPkg);
  const basePrice = basePkg ? basePkg.price : 0;

  const pkgAlcoholicCount = selectedFlavours.filter((f) => FLAVOURS_ALCOHOLIC.includes(f)).length;
  const extraAlcoholicCount = extraFlavours.filter((f) => FLAVOURS_ALCOHOLIC.includes(f)).length;
  const totalAlcoholicSurcharge = (pkgAlcoholicCount + extraAlcoholicCount) * ALCOHOLIC_SURCHARGE;
  const extraTubCost = extraTubs * EXTRA_TUB_PRICE;
  const total = basePrice + totalAlcoholicSurcharge + extraTubCost;

  const canSubmit = contact.name && contact.email;
  const updateContact = (field) => (e) => onContactChange({ ...contact, [field]: e.target.value });

  const formattedDate = eventData.date
    ? new Date(eventData.date + "T00:00:00").toLocaleDateString("en-MY", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "—";

  if (sent) {
    return (
      <section className="quote-step quote-sent">
        <div className="sent-inner">
          <h2 className="step-h" style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>Quote <em>sent.</em> <span className="sent-check"><CheckIcon /></span></h2>
          <p className="step-desc">
            We&apos;ve got your details — expect to hear from us within 24 hours.
            In the meantime, feel free to stalk us on Instagram.
          </p>
          <Link href="/" className="btn">
            <span>back to wonkie</span>
            <ArrowRight />
          </Link>
        </div>
      </section>
    );
  }

  const allFlavours = [...selectedFlavours, ...extraFlavours];

  return (
    <section className="quote-step">
      <span className="kicker">— 04 review & send</span>
      <h2 className="step-h">Your <em>quote.</em></h2>

      <div className="summary-grid">
        <div className="summary-card">
          <span className="summary-label">Event</span>
          <div className="summary-details">
            <div className="summary-row">
              <span>Type</span><span>{eventData.eventType}</span>
            </div>
            <div className="summary-row">
              <span>Guests</span><span>{eventData.guests || "—"}</span>
            </div>
            <div className="summary-row">
              <span>Venue</span><span>{eventData.venue}</span>
            </div>
            <div className="summary-row">
              <span>Date</span><span>{formattedDate}</span>
            </div>
            {(eventData.timeFrom || eventData.timeTo) && (
              <div className="summary-row">
                <span>Time</span><span>{eventData.timeFrom || "—"} to {eventData.timeTo || "—"}</span>
              </div>
            )}
            <div className="summary-row summary-row-full">
              <span>Flavours ({allFlavours.length} tubs)</span>
              <span>{allFlavours.join(", ")}</span>
            </div>
            {eventData.notes && (
              <div className="summary-row summary-row-full">
                <span>Notes</span><span>{eventData.notes}</span>
              </div>
            )}
          </div>
        </div>

        <div className="summary-card summary-card-dark">
          <span className="summary-label">Pricing</span>
          <div className="summary-details">
            <div className="summary-row">
              <span>{basePkg.name} package ({basePkg.tubs} tubs)</span>
              <span>RM {basePrice.toLocaleString()}</span>
            </div>
            {totalAlcoholicSurcharge > 0 && (
              <div className="summary-row">
                <span>Alcoholic surcharge x{pkgAlcoholicCount + extraAlcoholicCount}</span>
                <span>RM {totalAlcoholicSurcharge.toLocaleString()}</span>
              </div>
            )}
            {extraTubs > 0 && (
              <div className="summary-row">
                <span>Extra tubs x{extraTubs}</span>
                <span>RM {extraTubCost.toLocaleString()}</span>
              </div>
            )}
            <div className="summary-row summary-total">
              <span>Estimated total</span>
              <span>RM {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h3 className="contact-h">Almost there — how do we reach you?</h3>
        <div className="form-grid form-grid-half">
          <label className="field">
            <span>name</span>
            <input value={contact.name} onChange={updateContact("name")} placeholder="your name" />
          </label>
          <label className="field">
            <span>email</span>
            <input type="email" value={contact.email} onChange={updateContact("email")} placeholder="your@email.com" />
          </label>
          <label className="field">
            <span>phone (optional)</span>
            <input type="tel" value={contact.phone} onChange={updateContact("phone")} placeholder="+60..." />
          </label>
        </div>
      </div>

      <div className="step-actions">
        <button className="btn btn-ghost" onClick={onBack}>
          <ArrowLeft />
          <span>back</span>
        </button>
        <button className="btn btn-pink" onClick={onSubmit} disabled={!canSubmit || sending}>
          <span>{sending ? "sending..." : "send quote request"}</span>
          <ArrowRight />
        </button>
        {submitError && <p style={{ color: "#e53e3e", fontSize: "14px", margin: 0 }}>{submitError}</p>}
      </div>
    </section>
  );
}

export default function QuotePage() {
  const [step, setStep] = useState(0);
  const [eventData, setEventData] = useState({
    eventType: "",
    guests: "",
    venue: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    notes: "",
  });
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [selectedFlavours, setSelectedFlavours] = useState([]);
  const [extraTubs, setExtraTubs] = useState(0);
  const [extraFlavours, setExtraFlavours] = useState([]);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = () => {
    const basePkg = PACKAGES.find((p) => p.id === selectedPkg);
    const allFlavours = [...selectedFlavours, ...extraFlavours];
    const pkgAlcCount = selectedFlavours.filter((f) => FLAVOURS_ALCOHOLIC.includes(f)).length;
    const extraAlcCount = extraFlavours.filter((f) => FLAVOURS_ALCOHOLIC.includes(f)).length;
    const totalAlcSurcharge = (pkgAlcCount + extraAlcCount) * ALCOHOLIC_SURCHARGE;
    const extraTubCost = extraTubs * EXTRA_TUB_PRICE;
    const total = basePkg.price + totalAlcSurcharge + extraTubCost;

    setSending(true);
    setSubmitError(null);

    submitForm(FORM_EMAIL, {
      _subject: `Wonkie Quote Request from ${contact.name}`,
      _replyto: contact.email,
      name: contact.name,
      email: contact.email,
      phone: contact.phone || "—",
      "event type": eventData.eventType,
      guests: eventData.guests || "—",
      venue: eventData.venue,
      date: eventData.date,
      time: eventData.timeFrom || eventData.timeTo ? `${eventData.timeFrom || "—"} to ${eventData.timeTo || "—"}` : "—",
      notes: eventData.notes || "—",
      package: `${basePkg.name} (${basePkg.tubs} tubs) — RM ${basePkg.price.toLocaleString()}`,
      flavours: allFlavours.join(", "),
      "extra tubs": extraTubs > 0 ? `${extraTubs} — RM ${extraTubCost.toLocaleString()}` : "None",
      "alcoholic surcharge": totalAlcSurcharge > 0 ? `x${pkgAlcCount + extraAlcCount} — RM ${totalAlcSurcharge.toLocaleString()}` : "None",
      "estimated total": `RM ${total.toLocaleString()}`,
    })
      .then(() => {
        setSent(true);
        setSending(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(() => {
        setSubmitError("Something went wrong — please try again.");
        setSending(false);
      });
  };

  const goTo = (s) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const STEPS = ["Event", "Package", "Extras", "Review"];

  return (
    <>
      <section className="quote-hero">
        <Link href="/" className="quote-logo">
          <Image src="/images/WONKIE_LOGO_1.png" alt="wonkie" width={130} height={130} priority />
        </Link>
        <span className="kicker">— weddings & events</span>
        <h1 className="quote-title">Start your <em>quote.</em></h1>
        <p className="quote-subtitle">
          Tell us about your event and we&apos;ll put together a custom ice cream experience.
          Takes about 2 minutes.
        </p>
      </section>

      {!sent && <StepIndicator current={step} steps={STEPS} />}

      {step === 0 && (
        <StepEvent data={eventData} onChange={setEventData} onNext={() => goTo(1)} />
      )}
      {step === 1 && (
        <StepPackage
          selectedPkg={selectedPkg}
          onSelect={setSelectedPkg}
          selectedFlavours={selectedFlavours}
          onFlavoursChange={setSelectedFlavours}
          onBack={() => goTo(0)}
          onNext={() => goTo(2)}
        />
      )}
      {step === 2 && (
        <StepExtras
          extraTubs={extraTubs}
          extraFlavours={extraFlavours}
          onExtraTubsChange={setExtraTubs}
          onExtraFlavoursChange={setExtraFlavours}
          onBack={() => goTo(1)}
          onNext={() => goTo(3)}
        />
      )}
      {step === 3 && (
        <StepSummary
          eventData={eventData}
          selectedPkg={selectedPkg}
          selectedFlavours={selectedFlavours}
          extraTubs={extraTubs}
          extraFlavours={extraFlavours}
          contact={contact}
          onContactChange={setContact}
          onBack={() => goTo(2)}
          onSubmit={handleSubmit}
          sent={sent}
          sending={sending}
          submitError={submitError}
        />
      )}
    </>
  );
}
