"use client";

import { motion } from "framer-motion";
import { Car, FileCheck, MapPin } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Car,
    title: "Choose & Book",
    description:
      "Pick your car and dates. Reserve in under 60 seconds — no calls, no waiting.",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "Upload License",
    description:
      "Quick digital verification. Upload your driver license and sign the rental agreement online.",
  },
  {
    number: "03",
    icon: MapPin,
    title: "We Deliver",
    description:
      "Your car arrives at SJU Airport or your hotel. Skip the counter — just arrive and drive.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 container-px mx-auto max-w-7xl py-24 md:py-32"
    >
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
            How It Works
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
          Three steps. <span className="text-gradient-lime">Zero hassle.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted max-w-2xl mx-auto"
        >
          Renting a car shouldn&apos;t feel like filing taxes. We rebuilt the
          whole experience.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
        <div
          className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(166,255,0,0.3) 50%, transparent 100%)",
          }}
        />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative group"
          >
            <div className="glass rounded-2xl p-8 md:p-10 h-full hover:border-lime/30 transition-colors duration-500">
              <div className="flex items-start justify-between mb-8">
                <span
                  className="text-5xl md:text-6xl font-black"
                  style={{ color: "#A6FF00" }}
                >
                  {step.number}
                </span>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundColor: "rgba(166,255,0,0.08)",
                    color: "#A6FF00",
                  }}
                >
                  <step.icon className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                {step.title}
              </h3>

              <p className="text-muted leading-relaxed text-sm md:text-base">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-16"
      >
        <p className="text-sm text-muted mb-6">Ready to drive different?</p>
        <a href="#" onClick={() => window.dispatchEvent(new Event("open-booking"))} className="btn-primary inline-flex">
          Reserve in 60 seconds
        </a>
      </motion.div>
    </section>
  );
}
