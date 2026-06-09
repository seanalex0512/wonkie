"use client";
import Image from "next/image";
import { ArrowDown } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="hero hero-poster">
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
        <Image src="/images/CTA_icecream.png" alt="Ice cream" width={72} height={72} className="hero-cta-icecream" />
      </div>
    </section>
  );
}
