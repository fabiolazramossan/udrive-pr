import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground container-px relative overflow-hidden pt-32 pb-20">

{/* Subtle radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(166,255,0,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="text-center relative z-10 max-w-3xl flex flex-col items-center">

        {/* Top label */}
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted mb-12">
          Premium Mobility · Puerto Rico
        </p>

        {/* OFFICIAL LOGO — full version with Drive Different */}
        <div className="flex justify-center mb-12">
          <Image
            src="/udrive-logo-full.png"
            alt="Ü Drive PR — Drive Different"
            width={1200}
            height={700}
            priority
            className="w-auto h-56 md:h-72 lg:h-80 object-contain"
          />
        </div>

        {/* Sub-description */}
        <p className="text-base md:text-lg text-muted max-w-md mx-auto leading-relaxed mb-12">
          Premium car rental in Puerto Rico. Skip the counter. Delivered to your door.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button className="btn-primary">Reserve Now</button>
          <button className="btn-secondary">View Fleet</button>
        </div>

        {/* Brand values strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 pt-12 border-t border-white/[0.08] w-full max-w-3xl">
          {[
            "Safe & Reliable",
            "Best Prices",
            "Quick & Easy",
            "Premium Experience",
          ].map((value) => (
            <p
              key={value}
              className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted text-center"
            >
              {value}
            </p>
          ))}
        </div>

        {/* Setup confirmation */}
        <p className="text-[10px] text-muted/40 mt-16 uppercase tracking-widest">
          ✓ Brand foundation complete · #A6FF00
        </p>
      </div>
    </main>
  );
}