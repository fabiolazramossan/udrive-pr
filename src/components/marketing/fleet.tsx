"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Settings2,
  Fuel,
  Briefcase,
  ArrowRight,
} from "lucide-react";

// ============================================================================
// Vehicle data — Mitsubishi Outlander 2024
// ============================================================================

const OUTLANDER = {
  id: "outlander-2024",
  category: "Premium SUV",
  name: "Mitsubishi Outlander",
  year: 2024,
  pricePerDay: 95,
  description:
    "Spacious, modern, and reliable. Perfect for exploring Puerto Rico in comfort — whether it's family trips to El Yunque or weekend escapes to Rincón.",
  features: [
    { icon: Users, label: "7 Passengers" },
    { icon: Settings2, label: "Automatic" },
    { icon: Fuel, label: "Gasoline" },
    { icon: Briefcase, label: "Spacious Cargo" },
  ],
  images: [
    "/cars/outlander-hero.jpg",
    "/cars/outlander-front.jpg",
    "/cars/outlander-side.jpg",
    "/cars/outlander-side-2.jpg",
    "/cars/outlander-rear.jpg",
    "/cars/outlander-interior-1.jpg",
    "/cars/outlander-interior-2.jpg",
  ],
  available: true,
};

// ============================================================================
// Fleet Section
// ============================================================================

export function Fleet() {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section
      id="fleet"
      className="relative z-10 container-px mx-auto max-w-7xl py-24 md:py-32"
    >
      {/* Section header */}
      <div className="text-center mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-12" style={{ backgroundColor: "#A6FF00" }} />
          <p className="text-[11px] uppercase tracking-[0.35em] text-lime font-semibold">
            The Fleet
          </p>
          <span className="h-px w-12" style={{ backgroundColor: "#A6FF00" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6"
        >
          Hand-picked.{" "}
          <span className="text-gradient-lime">One car at a time.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted max-w-2xl mx-auto"
        >
          We don&apos;t do big lots full of beat-up cars. Every vehicle is
          inspected, cleaned, and ready to go.
        </motion.p>
      </div>

      {/* Vehicle card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="group glass rounded-3xl overflow-hidden hover:border-lime/30 transition-colors duration-500 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="relative bg-elevated">
            {/* Available badge */}
            {OUTLANDER.available && (
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime/10 backdrop-blur-md border border-lime/30">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "#A6FF00" }}
                />
                <span className="text-[10px] uppercase tracking-widest font-semibold text-lime">
                  Available Now
                </span>
              </div>
            )}

            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={OUTLANDER.images[activeImage]}
                alt={`${OUTLANDER.name} - view ${activeImage + 1}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Thumbnail gallery */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-1 z-10">
              {OUTLANDER.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === i
                      ? "border-lime scale-105"
                      : "border-white/20 hover:border-white/50 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content side */}
          <div className="p-8 md:p-10 flex flex-col">
            {/* Category */}
            <p className="text-[11px] uppercase tracking-[0.3em] text-lime font-semibold mb-3">
              {OUTLANDER.category}
            </p>

            {/* Name + Year */}
            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
              {OUTLANDER.name}
            </h3>
            <p className="text-sm text-muted mb-6">{OUTLANDER.year} Model</p>

            {/* Description */}
            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">
              {OUTLANDER.description}
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {OUTLANDER.features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "rgba(166,255,0,0.08)",
                      color: "#A6FF00",
                    }}
                  >
                    <feature.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs md:text-sm text-white/80">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="mt-auto pt-6 border-t border-white/[0.08]">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted mb-1">
                    From
                  </p>
                  <p className="text-3xl md:text-4xl font-black">
                    ${OUTLANDER.pricePerDay}
                    <span className="text-base font-medium text-muted ml-1">
                      / day
                    </span>
                  </p>
                </div>

                <Link href="#reserve" className="btn-primary group/btn !text-sm">
                  Reserve
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* More coming soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-16"
      >
        <p className="text-sm text-muted">
          More vehicles joining the fleet soon —{" "}
          <Link
            href="#contact"
            className="text-lime hover:underline font-semibold"
          >
            request a specific model
          </Link>
        </p>
      </motion.div>
    </section>
  );
}