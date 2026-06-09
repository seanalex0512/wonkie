"use client";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

export default function Story() {
  const ref = useReveal();
  return (
    <section id="story" className="story reveal" ref={ref}>
      <div className="story-inner">
        <div className="story-founder">
          <Image src="/images/founder.png" alt="Wonkie founder" width={500} height={600} />
        </div>
        <div className="story-copy">
          <span className="kicker">— our story</span>
          <h2 className="story-h">
            We started spiking ice cream in a tiny shophouse on Lebuh Pantai —
            <span className="ink-pink"> and never quite stopped.</span>
          </h2>
          <p className="story-text">
            We make the ice cream your inner adult has been waiting for. Born in Penang in 2019, Wonkie is a made-from-scratch ice cream shop specialising in alcoholic scoops with a touch of whimsy. Tucked into a quiet George Town alley, we&apos;re not interested in boring — we push flavours, embrace local spirits, and treat every scoop as a little adventure. Boozy or not, there&apos;s always something here to surprise you.
          </p>
        </div>
      </div>
    </section>
  );
}
