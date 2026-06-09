"use client";
import { useReveal } from "@/hooks/useReveal";

export default function VisitFind() {
  const ref = useReveal();
  return (
    <section id="visit" className="visit-find reveal" ref={ref}>
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
