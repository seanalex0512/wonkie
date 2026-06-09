import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Highlights from "@/components/Highlights";
import WaveDivider from "@/components/WaveDivider";
import Weddings from "@/components/Weddings";
import VisitFind from "@/components/VisitFind";
import VisitEnquire from "@/components/VisitEnquire";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Story />
      <Highlights />
      <WaveDivider />
      <Weddings />
      <VisitFind />
      <VisitEnquire />
      <Footer />
    </>
  );
}
