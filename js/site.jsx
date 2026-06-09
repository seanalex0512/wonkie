// Wonkie — minimal, bolder hero
const { useState, useEffect, useRef, useLayoutEffect } = React;

// ───────────────────────────────────────── FORMSUBMIT
// Test email: seanalex0512@gmail.com — change to Hello.wonkie@gmail.com for production.
// First submission triggers a confirmation email — click the link to activate.
const FORM_EMAIL = "seanalex0512@gmail.com";

function submitForm(email, data) {
  return fetch(`https://formsubmit.co/ajax/${email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error("Form submission failed");
    return res.json();
  });
}

// ───────────────────────────────────────── SCROLL REVEAL HOOK
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "poster",
  "weddingsBg": "pink"
}/*EDITMODE-END*/;

// SVG arrow icons to avoid emoji rendering on mobile
const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
);
const ArrowDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M20 6L9 17l-5-5"/></svg>
);

// Smaller W mark for inline use (matches logo proportions)
const WMark = ({ fill = "currentColor", style }) => (
  <svg viewBox="0 0 100 78" preserveAspectRatio="xMidYMid meet" style={style} aria-hidden="true">
    <path d="M 4 76 L 30 4 L 50 50 L 72 4 L 96 76 Z" fill={fill} />
  </svg>
);

// ───────────────────────────────────────── NAV
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const jump = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 16, behavior: "smooth" });
  };
  return (
    <nav className="nav">
      <a className="nav-logo" href="#top" onClick={jump("top")}>
        <img src="Assets/images/WONKIE_LOGO_1.png" alt="wonkie" />
      </a>
      <ul className={menuOpen ? "nav-open" : ""}>
        <li><a href="#story" onClick={jump("story")}>story</a></li>
        <li><a href="#weddings" onClick={jump("weddings")}>weddings</a></li>
        <li><a href="#visit" onClick={jump("visit")}>visit</a></li>
        <li><a href="https://wonkieicecream.beepit.com/ordering/?type=delivery" target="_blank" rel="noopener noreferrer">order</a></li>
      </ul>
      <div className="nav-icons">
        <a href="#visit" onClick={jump("visit")} className="nav-icon" aria-label="Location">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </a>
        <a href="https://wonkieicecream.beepit.com/ordering/?type=delivery" target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="Order">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </a>
        <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={menuOpen ? "burger-line open" : "burger-line"} />
          <span className={menuOpen ? "burger-line open" : "burger-line"} />
          <span className={menuOpen ? "burger-line open" : "burger-line"} />
        </button>
      </div>
    </nav>
  );
}

// ───────────────────────────────────────── HERO — poster-style on lime
function Hero({ variant }) {
  if (variant === "split") return <HeroSplit />;
  return <HeroPoster />;
}

function HeroPoster() {
  return (
    <section id="top" className="hero hero-poster" data-screen-label="01 Hero">
      <div className="hero-poster-stack">
        <span className="kicker hero-kicker">— george town, penang</span>
        <h1 className="hero-tag">
          normal is <em>not</em><br/>on our menu.
        </h1>
      </div>
      <div className="hero-corner bl hero-cta-wrap" onClick={() => {
        const el = document.getElementById("story");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }} style={{ cursor: "pointer" }}>
        <span className="hero-cta-btn">
          <span>View more</span>
          <ArrowDown />
        </span>
        <img src="Assets/images/CTA_icecream.png" alt="Ice cream" className="hero-cta-icecream" />
      </div>
    </section>
  );
}

function HeroSplit() {
  return (
    <section id="top" className="hero hero-split" data-screen-label="01 Hero">
      <div className="hero-split-left">
        <img src="Assets/images/WONKIE_LOGO_1.png" alt="wonkie" />
      </div>
      <div className="hero-split-right">
        <span className="kicker">— a wonkie ice cream company</span>
        <h1 className="hero-tag big">
          normal<br/>is <em>not</em><br/>on our<br/>menu.
        </h1>
        <p className="hero-meta">
          Boozy, small-batch ice cream from George Town, Penang.
        </p>
      </div>
    </section>
  );
}

// ───────────────────────────────────────── STORY
function Story() {
  const ref = useReveal();
  return (
    <section id="story" className="story reveal" ref={ref} data-screen-label="02 Story">
      <div className="story-inner">
        <div className="story-founder">
          <img src="Assets/images/founder.png" alt="Wonkie founder" />
        </div>
        <div className="story-copy">
          <span className="kicker">— our story</span>
          <h2 className="story-h">
            We started spiking ice cream in a tiny shophouse on Lebuh Pantai —
            <span className="ink-pink"> and never quite stopped.</span>
          </h2>
          <p className="story-text">
            We make the ice cream your inner adult has been waiting for. Born in Penang in 2019, Wonkie is a made-from-scratch ice cream shop specialising in alcoholic scoops with a touch of whimsy. Tucked into a quiet George Town alley, we're not interested in boring — we push flavours, embrace local spirits, and treat every scoop as a little adventure. Boozy or not, there's always something here to surprise you.
          </p>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────── HIGHLIGHTS
function Highlights() {
  const ref = useReveal();
  return (
    <section className="highlights reveal" ref={ref}>
      <div className="highlights-inner">
        <div className="highlights-copy">
          <h2 className="highlights-h">
            Scoops of happiness,<br /><em>delivered with care.</em>
          </h2>
          <div className="highlights-grid">
            <div className="highlight-item">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14v10"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
              <h4>Same-day cart service</h4>
              <p>We roll up, scoop, and serve — no fuss.</p>
            </div>
            <div className="highlight-item">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5v3H7V7a5 5 0 0 1 5-5Z"/><path d="M19 10H5a2 2 0 0 0-2 2v1a7 7 0 0 0 14 0v-1a2 2 0 0 0-2-2Z"/><path d="M12 17v5"/></svg>
              <h4>Small-batch, always fresh</h4>
              <p>Sixteen flavours at a time, never the same sixteen.</p>
            </div>
            <div className="highlight-item">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
              <h4>Boozy &amp; bold</h4>
              <p>Rum, gin, soju, stout — spiked scoops only.</p>
            </div>
            <div className="highlight-item">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <h4>Events &amp; weddings</h4>
              <p>Our scoopers got you covered — any size, any vibe.</p>
            </div>
          </div>
          <a href="https://wonkieicecream.beepit.com/ordering/?type=delivery" target="_blank" rel="noopener noreferrer" className="btn btn-pink">
            <span>Order now</span>
            <ArrowUpRight />
          </a>
        </div>
        <div className="highlights-scatter">
          <img src="Assets/ice-cream/image.png" alt="Ice cream" className="scatter-img" style={{ top: "5%", left: "10%", transform: "rotate(-8deg)" }} />
          <img src="Assets/ice-cream/image copy.png" alt="Ice cream" className="scatter-img" style={{ top: "2%", right: "15%", transform: "rotate(5deg)" }} />
          <img src="Assets/ice-cream/image copy 2.png" alt="Ice cream" className="scatter-img" style={{ top: "30%", left: "55%", transform: "rotate(-3deg)" }} />
          <img src="Assets/ice-cream/image copy 3.png" alt="Ice cream" className="scatter-img" style={{ top: "25%", left: "5%", transform: "rotate(10deg)" }} />
          <img src="Assets/ice-cream/image copy 4.png" alt="Ice cream" className="scatter-img" style={{ top: "55%", left: "20%", transform: "rotate(-12deg)" }} />
          <img src="Assets/ice-cream/image copy 5.png" alt="Ice cream" className="scatter-img" style={{ top: "50%", right: "10%", transform: "rotate(7deg)" }} />
          <img src="Assets/ice-cream/image copy 6.png" alt="Ice cream" className="scatter-img" style={{ top: "75%", left: "40%", transform: "rotate(-5deg)" }} />
          <img src="Assets/ice-cream/image copy 7.png" alt="Ice cream" className="scatter-img" style={{ top: "70%", left: "0%", transform: "rotate(15deg)" }} />
          <img src="Assets/ice-cream/image copy 8.png" alt="Ice cream" className="scatter-img" style={{ top: "80%", right: "20%", transform: "rotate(-10deg)" }} />
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────── WEDDINGS CAROUSEL
const WEDDING_IMAGES = [
  { src: "Assets/images/weddingimg.jpg", alt: "Wonkie cart at a beachside wedding" },
  { src: "Assets/images/wedding.jpg", alt: "Wonkie ice cream scoops" },
  { src: "Assets/images/weddingpics.jpg", alt: "Wonkie setup with flavour board" },
  { src: "Assets/images/wedding2.jpg", alt: "Wonkie ice cream bar at an event" },
  { src: "Assets/images/wedding3.jpg", alt: "Wonkie at a wedding celebration" },
];

function WeddingsCarousel() {
  const [idx, setIdx] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % WEDDING_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="wed-carousel">
      <div className="wed-carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {WEDDING_IMAGES.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} className="wed-carousel-slide" />
        ))}
      </div>
      <div className="wed-carousel-dots">
        {WEDDING_IMAGES.map((_, i) => (
          <button
            key={i}
            className={`wed-dot${i === idx ? " active" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────── WEDDINGS — full-bleed pink panel
function Weddings({ bg }) {
  const ref = useReveal();
  return (
    <section id="weddings" className="weddings" data-bg={bg} data-screen-label="03 Weddings">
      <div className="weddings-inner weddings-grid">
        <div className="weddings-copy">
          <span className="kicker light">— weddings & private events</span>
          <h2 className="weddings-h">
            We cart our scoops<br/><em>to your I&nbsp;do.</em>
          </h2>
          <p className="weddings-p">
            From small Penang ceremonies to ballroom takeovers — we bring the
            cart, the scoopers, and three rotating boozy flavors. Custom pours
            and branded cups available.
          </p>
          <a href="quote/quote.html" target="_blank" rel="noopener noreferrer" className="btn btn-light">
            <span>start a quote</span>
            <ArrowUpRight />
          </a>
        </div>

        <WeddingsCarousel />

      </div>
    </section>
  );
}

// ───────────────────────────────────────── VISIT
function VisitFind() {
  const ref = useReveal();
  return (
    <section id="visit" className="visit-find reveal" ref={ref} data-screen-label="04 Visit">
      <div className="visit-find-inner">
        <div className="visit-find-left">
          <span className="kicker">— visit</span>
          <h2 className="visit-h">Come find us.</h2>
          <div className="addr-block">
            <div className="addr">
              21D, Lebuh Pantai<br />
              George Town<br />
              Penang 10300, Malaysia
            </div>
            <div className="hours">
              <div><span>sun — thurs</span><span>1 — 10pm</span></div>
              <div><span>fri — sat</span><span>1 — 11pm</span></div>
              <div><span>monday</span><span><em>closed</em></span></div>
            </div>
            <div className="contact-links">
              <a href="tel:+60164897728">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.94 5.94l1.21-1.21a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                016-489 7728
              </a>
              <a href="mailto:Hello.wonkie@gmail.com">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Hello.wonkie@gmail.com
              </a>
              <a href="https://instagram.com/wonkieicecream" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                @wonkieicecream
              </a>
            </div>
          </div>
        </div>
        <div className="visit-map">
          <iframe
            title="Wonkie location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.398!2d100.3381!3d5.4164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac396ef9b48c3%3A0x6f8c16a8e4b5e3b2!2s21D%2C%20Lebuh%20Pantai%2C%20George%20Town%2C%2010300%20George%20Town%2C%20Pulau%20Pinang%2C%20Malaysia!5e0!3m2!1sen!2smy!4v1715000000000"
            width="100%" height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function VisitEnquire() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      "event details": form.message,
    })
      .then(() => { setSent(true); setSending(false); })
      .catch(() => { setError("Something went wrong — please try again."); setSending(false); });
  };
  return (
    <section className="visit-enquire reveal" ref={ref} data-screen-label="04b Enquire">
      <div className="visit-enquire-inner">
        <div className="visit-enquire-label">
          <span className="kicker">— book</span>
          <h2 className="visit-h"><em>Or have us find you.</em></h2>
          <p className="enquire-desc">
            We do weddings, private dinners, pop-ups, corporate dos, and whatever
            else you're dreaming up. Drop us a line and we'll figure out the scoops.
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

// ───────────────────────────────────────── FOOTER
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="footer-headline">
          Let's make your day<br />
          a little <em>sweeter.</em>
        </p>
      </div>

      <div className="footer-grid">
        <div className="footer-col">
          <span className="footer-label">Find us</span>
          <a href="https://maps.google.com/?q=21D+Lebuh+Pantai+George+Town" target="_blank" rel="noopener noreferrer" className="footer-link">
            21D, Lebuh Pantai<br />George Town 10300<br />Penang, Malaysia
          </a>
        </div>

        <div className="footer-col">
          <span className="footer-label">Hours</span>
          <div className="footer-hours">
            <span>Sun — Thurs · 1–10 pm</span>
            <span>Fri — Sat · 1–11 pm</span>
            <span>Monday · <em>Closed</em></span>
          </div>
        </div>

        <div className="footer-col">
          <span className="footer-label">Contact</span>
          <div className="footer-social">
            <a href="https://instagram.com/wonkieicecream" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://wa.me/60164897728" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
            </a>
            <a href="mailto:Hello.wonkie@gmail.com" className="footer-social-link" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="tel:+60164897728" className="footer-social-link" aria-label="Phone">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.94 5.94l1.21-1.21a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Wonkie Ice Cream</span>
        <span className="footer-tagline">Handmade in Penang</span>
      </div>
    </footer>
  );
}

// ───────────────────────────────────────── TWEAKS
function WonkieTweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Hero">
        <TweakRadio label="Variant" value={t.heroVariant}
                    options={["poster", "split"]}
                    onChange={v => setTweak("heroVariant", v)} />
      </TweakSection>
      <TweakSection title="Weddings">
        <TweakRadio label="Background" value={t.weddingsBg}
                    options={["pink", "ink", "lime"]}
                    onChange={v => setTweak("weddingsBg", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// ───────────────────────────────────────── ROOT
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      <Nav />
      <Hero variant={t.heroVariant} />
      <Story />
      <Highlights />
      <svg className="wave-divider" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ background: "var(--lime)" }}>
        <path d="M0,120 L0,80 C80,95 160,40 320,55 C480,70 520,20 720,35 C920,50 960,90 1120,70 C1280,50 1360,85 1440,75 L1440,120 Z" fill="var(--pink)" />
      </svg>
      <Weddings bg={t.weddingsBg} />
      <VisitFind />
      <VisitEnquire />
      <Footer />
      <WonkieTweaks t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
