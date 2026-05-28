import { supabase } from "@/lib/supabase";
import { FleetCard } from "./fleet-card";
import Link from "next/link";

export async function Fleet() {
  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("available", true)
    .order("created_at", { ascending: true });

  return (
    <section
      id="fleet"
      className="relative z-10 container-px mx-auto max-w-7xl py-24 md:py-32"
    >
      {/* Section header */}
      <div className="text-center mb-16 md:mb-20">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-12" style={{ backgroundColor: "#A6FF00" }} />
          <p className="text-[11px] uppercase tracking-[0.35em] text-lime font-semibold">
            The Fleet
          </p>
          <span className="h-px w-12" style={{ backgroundColor: "#A6FF00" }} />
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
          Hand-picked.{" "}
          <span className="text-gradient-lime">One car at a time.</span>
        </h2>
        <p className="text-base md:text-lg text-muted max-w-2xl mx-auto">
          We don&apos;t do big lots full of beat-up cars. Every vehicle is
          inspected, cleaned, and ready to go.
        </p>
      </div>

      {/* Vehicle cards from database */}
      {error && (
        <p className="text-center text-muted">
          Unable to load vehicles right now. Please try again later.
        </p>
      )}

      {!error && vehicles && vehicles.length === 0 && (
        <p className="text-center text-muted">
          No vehicles available at the moment. Check back soon.
        </p>
      )}

      {!error && vehicles && vehicles.length > 0 && (
        <div className="space-y-12">
          {vehicles.map((vehicle) => (
            <FleetCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}

      {/* More coming soon */}
      <div className="text-center mt-16">
        <p className="text-sm text-muted">
          More vehicles joining the fleet soon —{" "}
          <Link href="#contact" className="text-lime hover:underline font-semibold">
            request a specific model
          </Link>
        </p>
      </div>
    </section>
  );
}
