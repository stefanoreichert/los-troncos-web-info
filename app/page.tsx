import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import {
  AboutSection,
  AmbienceSection,
  ContactSection,
  MenuImageSection,
  ReservationSection,
  SpecialtiesSection,
} from "./components/PremiumSections";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#050403]">
      <Navbar />
      <Hero />
      <MenuImageSection />
      <AboutSection />
      <SpecialtiesSection />
      <AmbienceSection />
      <ContactSection />
      <ReservationSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
