"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Settings2, Fuel, Briefcase, ArrowRight } from "lucide-react";
import type { Vehicle } from "@/lib/supabase";

export function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  const [activeImage, setActiveImage] = useState(0);

  const features = [
    { icon: Users, label: `${vehicle.passengers} Passengers` },
    { icon: Settings2, label: vehicle.transmission },
    { icon: Fuel, label: vehicle.fuel },
    { icon: Briefcase, label: "Spacious Cargo" },
  ];

  return (
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
          {vehicle.available && (
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

          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={vehicle.images[activeImage]}
              alt={`${vehicle.name} - view ${activeImage + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-1 z-10">
            {vehicle.images.map((img, i) => (
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
                <Image src={img} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content side */}
        <div className="p-8 md:p-10 flex flex-col">
          <p className="text-[11px] uppercase tracking-[0.3em] text-lime font-semibold mb-3">
            {vehicle.category}
          </p>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            {vehicle.name}
          </h3>
          <p className="text-sm text-muted mb-6">{vehicle.year} Model</p>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">
            {vehicle.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {features.map((feature) => (
              <div key={feature.label} className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(166,255,0,0.08)", color: "#A6FF00" }}
                >
                  <feature.icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs md:text-sm text-white/80">{feature.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/[0.08]">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted mb-1">From</p>
                <p className="text-3xl md:text-4xl font-black">
                  ${vehicle.price_per_day}
                  <span className="text-base font-medium text-muted ml-1">/ day</span>
                </p>
              </div>
              <Link href="#" onClick={() => window.dispatchEvent(new Event("open-booking"))} className="btn-primary group/btn !text-sm">
                Reserve
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
