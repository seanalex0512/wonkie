const { useState } = React;

// ───────────────────────────────────────── ICONS
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ───────────────────────────────────────── FLAVOUR MENU
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

// ───────────────────────────────────────── PRICING DATA
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

const ADDONS = [
  { id: "extra-tub", name: "Extra ice cream tub", price: 180, unit: "per tub" },
  { id: "alcoholic-upgrade", name: "Alcoholic flavour upgrade", price: 100, unit: "per tub" },
];


// ───────────────────────────────────────── STEP INDICATOR
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

// ───────────────────────────────────────── STEP 1: EVENT DETAILS
function StepEvent({ data, onChange, onNext }) {
  const update = (field) => (e) => onChange({ ...data, [field]: e.target.value });
  const canProceed = data.eventType && data.venue && data.date;

  return (
    <section className="quote-step">
      <span className="kicker">— 01 your event</span>
      <h2 className="step-h">Tell us about your <em>event.</em></h2>
      <p className="step-desc">We'll tailor everything to your day — just give us the basics.</p>

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
        </label>
        <label className="field">
          <span>venue</span>
          <input placeholder="venue name or address" value={data.venue} onChange={update("venue")} />
        </label>
        <label className="field">
          <span>date</span>
          <input type="date" value={data.date} onChange={update("date")} />
        </label>
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

// ───────────────────────────────────────── STEP 2: PACKAGE SELECTION
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

function StepPackage({ selectedPkg, onSelect, onBack, onNext }) {
  return (
    <section className="quote-step">
      <span className="kicker">— 02 choose your package</span>
      <h2 className="step-h">Pick a <em>package.</em></h2>
      <p className="step-desc">Each package is fully customisable — this is just the starting point.</p>

      <div className="pkg-grid">
        {PACKAGES.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} selected={selectedPkg} onSelect={onSelect} />
        ))}
      </div>

      <div className="flavour-menu">
        <h3 className="flavour-menu-h">Our flavour menu</h3>
        <div className="flavour-columns">
          <div className="flavour-col">
            <span className="flavour-col-label">Non-Alcoholic</span>
            <ul className="flavour-list">
              {FLAVOURS_NON_ALCOHOLIC.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
          <div className="flavour-col">
            <span className="flavour-col-label">Alcoholic</span>
            <ul className="flavour-list">
              {FLAVOURS_ALCOHOLIC.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <span className="flavour-note">+RM100 per tub for alcoholic flavours</span>
          </div>
        </div>
      </div>

      <div className="step-actions">
        <button className="btn btn-ghost" onClick={onBack}>
          <ArrowLeft />
          <span>back</span>
        </button>
        <button className="btn" onClick={onNext} disabled={!selectedPkg}>
          <span>add extras</span>
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

// ───────────────────────────────────────── STEP 3: ADD-ONS
function AddonRow({ addon, qty, onChange }) {
  return (
    <div className="addon-row">
      <div className="addon-info">
        <span className="addon-name">{addon.name}</span>
        <span className="addon-unit">{addon.unit}</span>
      </div>
      <span className="addon-price">+ RM {addon.price}</span>
      <div className="addon-qty">
        <button className="qty-btn" onClick={() => onChange(Math.max(0, qty - 1))} disabled={qty === 0}>-</button>
        <span className="qty-num">{qty}</span>
        <button className="qty-btn" onClick={() => onChange(qty + 1)}>+</button>
      </div>
    </div>
  );
}

function StepAddons({ addons, onUpdate, onBack, onNext }) {
  return (
    <section className="quote-step">
      <span className="kicker">— 03 add-ons</span>
      <h2 className="step-h">Make it <em>extra.</em></h2>
      <p className="step-desc">Optional extras to level up the experience. Skip this if you're happy with the package as-is.</p>

      <div className="addons-list">
        {ADDONS.map((addon) => (
          <AddonRow key={addon.id} addon={addon} qty={addons[addon.id]} onChange={(qty) => onUpdate(addon.id, qty)} />
        ))}
      </div>

      <div className="step-actions">
        <button className="btn btn-ghost" onClick={onBack}>
          <ArrowLeft />
          <span>back</span>
        </button>
        <button className="btn" onClick={onNext}>
          <span>review quote</span>
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

// ───────────────────────────────────────── STEP 4: SUMMARY + CONTACT
function StepSummary({ eventData, selectedPkg, addons, contact, onContactChange, onBack, onSubmit, sent }) {
  const basePkg = PACKAGES.find((p) => p.id === selectedPkg);
  const basePrice = basePkg ? basePkg.price : 0;
  const addonsTotal = ADDONS.reduce((sum, a) => sum + a.price * addons[a.id], 0);
  const total = basePrice + addonsTotal;
  const activeAddons = ADDONS.filter((a) => addons[a.id] > 0);
  const canSubmit = contact.name && contact.email;

  const updateContact = (field) => (e) => onContactChange({ ...contact, [field]: e.target.value });

  const formattedDate = eventData.date
    ? new Date(eventData.date + "T00:00:00").toLocaleDateString("en-MY", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "—";

  if (sent) {
    return (
      <section className="quote-step quote-sent">
        <div className="sent-inner">
          <span className="sent-check"><CheckIcon /></span>
          <h2 className="step-h">Quote <em>sent.</em></h2>
          <p className="step-desc">
            We've got your details — expect to hear from us within 24 hours.
            In the meantime, feel free to stalk us on Instagram.
          </p>
          <a href="../index.html" className="btn">
            <span>back to wonkie</span>
            <ArrowRight />
          </a>
        </div>
      </section>
    );
  }

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
              <span>{basePkg.name} package</span>
              <span>RM {basePrice.toLocaleString()}</span>
            </div>
            {activeAddons.map((a) => (
              <div className="summary-row" key={a.id}>
                <span>{a.name} x{addons[a.id]}</span>
                <span>RM {(a.price * addons[a.id]).toLocaleString()}</span>
              </div>
            ))}
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
        <button className="btn btn-pink" onClick={onSubmit} disabled={!canSubmit}>
          <span>send quote request</span>
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

// ───────────────────────────────────────── QUOTE PAGE
function QuotePage() {
  const [step, setStep] = useState(0);
  const [eventData, setEventData] = useState({
    eventType: "",
    guests: "",
    venue: "",
    date: "",
    notes: "",
  });
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [addons, setAddons] = useState(
    Object.fromEntries(ADDONS.map((a) => [a.id, 0]))
  );
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [sent, setSent] = useState(false);

  const updateAddon = (id, qty) => {
    setAddons({ ...addons, [id]: qty });
  };

  const handleSubmit = () => {
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goTo = (s) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const STEPS = ["Event", "Package", "Extras", "Review"];

  return (
    <>
      <section className="quote-hero">
        <a href="../index.html" className="quote-logo">
          <img src="../Assets/images/WONKIE_LOGO_1.png" alt="wonkie" />
        </a>
        <span className="kicker">— weddings & events</span>
        <h1 className="quote-title">Start your <em>quote.</em></h1>
        <p className="quote-subtitle">
          Tell us about your event and we'll put together a custom ice cream experience.
          Takes about 2 minutes.
        </p>
      </section>

      {!sent && <StepIndicator current={step} steps={STEPS} />}

      {step === 0 && (
        <StepEvent data={eventData} onChange={setEventData} onNext={() => goTo(1)} />
      )}
      {step === 1 && (
        <StepPackage selectedPkg={selectedPkg} onSelect={setSelectedPkg} onBack={() => goTo(0)} onNext={() => goTo(2)} />
      )}
      {step === 2 && (
        <StepAddons addons={addons} onUpdate={updateAddon} onBack={() => goTo(1)} onNext={() => goTo(3)} />
      )}
      {step === 3 && (
        <StepSummary
          eventData={eventData}
          selectedPkg={selectedPkg}
          addons={addons}
          contact={contact}
          onContactChange={setContact}
          onBack={() => goTo(2)}
          onSubmit={handleSubmit}
          sent={sent}
        />
      )}

    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<QuotePage />);
