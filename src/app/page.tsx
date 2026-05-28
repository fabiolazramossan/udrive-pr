import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Fleet } from "@/components/marketing/fleet";
import Delivery from "@/components/marketing/delivery";
import ReserveWrapper from "@/components/marketing/reserve-wrapper";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Hero />
      <HowItWorks />
      <Fleet />
      <Delivery />
      <ReserveWrapper />
    </main>
  );
}
