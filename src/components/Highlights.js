"use client";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { ArrowUpRight } from "./Icons";

export default function Highlights() {
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
              <h4>16 Flavors, always fresh</h4>
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
          <Image src="/ice-cream/image.png" alt="Ice cream" width={120} height={120} className="scatter-img" style={{ top: "5%", left: "10%", transform: "rotate(-8deg)" }} />
          <Image src="/ice-cream/image copy.png" alt="Ice cream" width={120} height={120} className="scatter-img" style={{ top: "2%", right: "15%", transform: "rotate(5deg)" }} />
          <Image src="/ice-cream/image copy 2.png" alt="Ice cream" width={120} height={120} className="scatter-img" style={{ top: "30%", left: "55%", transform: "rotate(-3deg)" }} />
          <Image src="/ice-cream/image copy 3.png" alt="Ice cream" width={120} height={120} className="scatter-img" style={{ top: "25%", left: "5%", transform: "rotate(10deg)" }} />
          <Image src="/ice-cream/image copy 4.png" alt="Ice cream" width={120} height={120} className="scatter-img" style={{ top: "55%", left: "20%", transform: "rotate(-12deg)" }} />
          <Image src="/ice-cream/image copy 5.png" alt="Ice cream" width={120} height={120} className="scatter-img" style={{ top: "50%", right: "10%", transform: "rotate(7deg)" }} />
          <Image src="/ice-cream/image copy 6.png" alt="Ice cream" width={120} height={120} className="scatter-img" style={{ top: "75%", left: "40%", transform: "rotate(-5deg)" }} />
          <Image src="/ice-cream/image copy 7.png" alt="Ice cream" width={120} height={120} className="scatter-img" style={{ top: "70%", left: "0%", transform: "rotate(15deg)" }} />
          <Image src="/ice-cream/image copy 8.png" alt="Ice cream" width={120} height={120} className="scatter-img" style={{ top: "80%", right: "20%", transform: "rotate(-10deg)" }} />
        </div>
      </div>
    </section>
  );
}
