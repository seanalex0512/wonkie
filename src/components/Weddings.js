"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "./Icons";

const WEDDING_IMAGES = [
  { src: "/images/weddingimg.jpg", alt: "Wonkie cart at a beachside wedding" },
  { src: "/images/wedding.jpg", alt: "Wonkie ice cream scoops" },
  { src: "/images/weddingpics.jpg", alt: "Wonkie setup with flavour board" },
  { src: "/images/wedding2.jpg", alt: "Wonkie ice cream bar at an event" },
  { src: "/images/wedding3.jpg", alt: "Wonkie at a wedding celebration" },
];

function WeddingsCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % WEDDING_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="wed-carousel">
      <div className="wed-carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {WEDDING_IMAGES.map((img, i) => (
          <Image key={i} src={img.src} alt={img.alt} width={360} height={480} className="wed-carousel-slide" />
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

export default function Weddings() {
  return (
    <section id="weddings" className="weddings" data-bg="pink">
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
          <Link href="/quote" className="btn btn-light">
            <span>start a quote</span>
            <ArrowUpRight />
          </Link>
        </div>
        <WeddingsCarousel />
      </div>
    </section>
  );
}
