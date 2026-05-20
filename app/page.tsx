import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Reservations from "./components/Reservations";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton"
import { getWordPressMenu } from "./lib/wordpress";

export default async function Home() {
  const menuItems = await getWordPressMenu();

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Menu wordpressItems={menuItems} />
      <Gallery />
      <Reservations />
      <Reviews />
      <Location />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
