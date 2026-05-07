import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Rodizio from "./components/Rodizio";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Reservations from "./components/Reservations";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Rodizio />
      <Menu />
      <Gallery />
      <Reservations />
      <Reviews />
      <Location />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
