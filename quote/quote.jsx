const { useState } = React;

// ───────────────────────────────────────── PRICING DATA
const PACKAGES = [
  {
    id: "essentials",
    name: "Essentials",
    desc: "Perfect for intimate gatherings up to 50 guests.",
    guests: "Up to 50",
    flavours: 3,
    scoops: 1,
    includes: ["1 cart", "1 scooper", "Branded cups & spoons", "1.5 hour service"],
    price: 1500,
  },
  {
    id: "classic",
    name: "Classic",
    desc: "Our most popular option for medium-sized celebrations.",
    guests: "50 — 120",
    flavours: 4,
    scoops: 2,
    includes: ["1 cart", "2 scoopers", "Branded cups & spoons", "2 hour service", "Menu signage"],
    price: 2800,
  },
  {
    id: "grand",
    name: "Grand",
    desc: "The full Wonkie experience for large-scale events.",
    guests: "120 — 250",
    flavours: 5,
    scoops: 2,
    includes: ["2 carts", "3 scoopers", "Branded cups & spoons", "3 hour service", "Menu signage", "Custom flavour naming"],
    price: 4500,
  },
];

const ADDONS = [
  { id: "extra-flavour", name: "Extra flavour", price: 350, unit: "per flavour" },
  { id: "extra-hour", name: "Extra hour of service", price: 500, unit: "per hour" },
  { id: "custom-cups", name: "Custom printed cups", price: 400, unit: "flat" },
  { id: "alcohol-upgrade", name: "Premium alcohol upgrade", price: 600, unit: "flat" },
  { id: "dessert-bar", name: "Dessert bar (brownies, toppings)", price: 800, unit: "flat" },
  { id: "transport", name: "Transport (outside Penang)", price: 500, unit: "per trip" },
];

// ───────────────────────────────────────── NAV
function QuoteNav() {
  return (
    <nav className="nav">
      <a className="nav-logo" href="index.html">
        <img src="../Assets/images/logo.png" alt="wonkie" />
      </a>
      <ul>
        <li><a href="index.html">back to site</a></li>
      </ul>
    </nav>
  );
}

// ───────────────────────────────────────── PACKAGE CARD
function PackageCard({ pkg, selected, onSelect }) {
  const active = selected === pkg.id;
  return (
    <div className={`pkg-card${active ? " pkg-active" : ""}`} onClick={() => onSelect(pkg.id)}>
      <div className="pkg-header">
        <span className="kicker">— {pkg.guests} guests</span>
        <h3 className="pkg-name">{pkg.name}</h3>
        <p className="pkg-desc">{pkg.desc}</p>
      </div>
      <div className="pkg-details">
        <div className="pkg-stat">
          <span className="pkg-stat-num">{pkg.flavours}</span>
          <span className="pkg-stat-label">flavours</span>
        </div>
        <div className="pkg-stat">
          <span className="pkg-stat-num">{pkg.scoops}</span>
          <span className="pkg-stat-label">scoops pp</span>
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

// ───────────────────────────────────────── ADDON ROW
function AddonRow({ addon, qty, onChange }) {
  return (
    <div className="addon-row">
      <div className="addon-info">
        <span className="addon-name">{addon.name}</span>
        <span className="addon-unit">{addon.unit}</span>
      </div>
      <span className="addon-price">+ RM {addon.price}</span>
      <div className="addon-qty">
        <button
          className="qty-btn"
          onClick={() => onChange(Math.max(0, qty - 1))}
          disabled={qty === 0}
        >-</button>
        <span className="qty-num">{qty}</span>
        <button
          className="qty-btn"
          onClick={() => onChange(qty + 1)}
        >+</button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────── QUOTE PAGE
function QuotePage() {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [addons, setAddons] = useState(
    Object.fromEntries(ADDONS.map((a) => [a.id, 0]))
  );

  const updateAddon = (id) => (qty) => {
    setAddons({ ...addons, [id]: qty });
  };

  const basePkg = PACKAGES.find((p) => p.id === selectedPkg);
  const basePrice = basePkg ? basePkg.price : 0;
  const addonsTotal = ADDONS.reduce((sum, a) => sum + a.price * addons[a.id], 0);
  const total = basePrice + addonsTotal;

  return (
    <>
      <QuoteNav />

      <section className="quote-hero">
        <span className="kicker">— weddings & events</span>
        <h1 className="quote-title">Build your <em>quote.</em></h1>
        <p className="quote-subtitle">
          Pick a package, add extras, and see your estimated total instantly.
          Prices in RM. Final quote may vary based on specifics.
        </p>
      </section>

      <section className="quote-packages">
        <span className="kicker">— 01 choose your package</span>
        <div className="pkg-grid">
          {PACKAGES.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              selected={selectedPkg}
              onSelect={setSelectedPkg}
            />
          ))}
        </div>
      </section>

      {selectedPkg && (
        <section className="quote-addons">
          <span className="kicker">— 02 add-ons</span>
          <h2 className="addons-h">Make it <em>extra.</em></h2>
          <div className="addons-list">
            {ADDONS.map((addon) => (
              <AddonRow
                key={addon.id}
                addon={addon}
                qty={addons[addon.id]}
                onChange={updateAddon(addon.id)}
              />
            ))}
          </div>
        </section>
      )}

      {selectedPkg && (
        <section className="quote-total">
          <div className="total-inner">
            <span className="kicker">— estimated total</span>
            <div className="total-breakdown">
              <div className="total-line">
                <span>{basePkg.name} package</span>
                <span>RM {basePrice.toLocaleString()}</span>
              </div>
              {ADDONS.filter((a) => addons[a.id] > 0).map((a) => (
                <div className="total-line" key={a.id}>
                  <span>{a.name} x{addons[a.id]}</span>
                  <span>RM {(a.price * addons[a.id]).toLocaleString()}</span>
                </div>
              ))}
              <div className="total-line total-final">
                <span>Estimated total</span>
                <span>RM {total.toLocaleString()}</span>
              </div>
            </div>
            <p className="total-note">
              This is an estimate. We'll confirm the final price once we know
              your date, venue, and any custom requests.
            </p>
            <a href="index.html#visit" className="btn">
              <span>get in touch</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="footer-row">
          <span>&copy; 2026 wonkie sdn bhd</span>
          <span>21+ — please scoop responsibly.</span>
          <span>george town &middot; penang</span>
        </div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<QuotePage />);
