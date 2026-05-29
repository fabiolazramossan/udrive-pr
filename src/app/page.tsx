import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Fleet } from "@/components/marketing/fleet";
import Delivery from "@/components/marketing/delivery";
import Footer from "@/components/marketing/footer";
import ReserveWrapper from "@/components/marketing/reserve-wrapper";
import WhatsAppButton from "@/components/marketing/whatsapp-button";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Fleet />
      <Delivery />
      <Footer />
      <ReserveWrapper />
      <WhatsAppButton />
    </main>
  );
}
