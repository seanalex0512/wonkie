"use client";
import { useState } from "react";
import Image from "next/image";

export default function Nav() {
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
        <Image src="/images/WONKIE_LOGO_1.png" alt="wonkie" width={140} height={140} priority />
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
