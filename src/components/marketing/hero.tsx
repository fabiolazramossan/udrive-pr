"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Plane, FileSignature } from "lucide-react";

export function Hero() {
  return (
    <>
      {/* Animated background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(166,255,0,0.06), transparent 50%), radial-gradient(ellipse at bottom, rgba(166,255,0,0.03), transparent 50%)",
        }}
      />

      <section className="relative z-10 container-px mx-auto max-w-7xl">
        <div className="min-h-screen flex flex-col justify-center pt-28 pb-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-12" style={{ backgroundColor: "#A6FF00" }} />
            <p className="text-[11px] uppercase tracking-[0.35em] text-lime font-semibold">
              Premium Mobility · Puerto Rico
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6"
          >
            Drive <span className="text-gradient-lime">Different.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mb-4"
          >
            Luxury mobility built for Puerto Rico.
          </motion.p>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.45 }}
            className="text-base text-muted max-w-xl mb-12"
          >
            No lines. No paperwork. Just arrive and drive.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-20"
          >
            <Link href="#reserve" className="btn-primary group">
              Reserve Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#fleet" className="btn-secondary group">
              Explore Fleet
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Plane, label: "SJU Airport Delivery", sub: "Free pickup at SJU" },
              { icon: FileSignature, label: "100% Digital", sub: "No counter. No paper." },
              { icon: ShieldCheck, label: "Fully Insured", sub: "Drive with peace of mind" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(166,255,0,0.08)", color: "#A6FF00" }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-muted mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
