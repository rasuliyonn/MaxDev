import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Stats from "@/components/landing/Stats";
import Process from "@/components/landing/Process";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import { JsonLd } from "@/components/landing/JsonLd";
import Portfolio from "@/components/landing/Portfolio";
import Testimonials from "@/components/landing/Testimonials";
import Particles from "@/components/landing/Particles";
import LoadingScreen from "@/components/landing/LoadingScreen";

export default function Home() {
  return (
    <>
      <JsonLd />
      <LoadingScreen />
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Stats />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
