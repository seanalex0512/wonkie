export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="footer-headline">
          Let&apos;s make your day<br />
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
