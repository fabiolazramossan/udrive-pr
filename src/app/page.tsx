"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Plane, FileSignature } from "lucide-react";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Fleet } from "@/components/marketing/fleet";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">

      {/* ==================== ANIMATED BACKGROUND ==================== */}

      {/* Primary radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(166,255,0,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Secondary glow bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(166,255,0,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ==================== HERO SECTION ==================== */}

      <section className="relative z-10 container-px mx-auto max-w-7xl">
        <div className="min-h-screen flex flex-col justify-center pt-28 pb-20">

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="h-px w-12"
              style={{ backgroundColor: "#A6FF00" }}
            />
            <p className="text-[11px] uppercase tracking-[0.35em] text-lime font-semibold">
              Premium Mobility · Puerto Rico
            </p>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6 max-w-4xl"
          >
            Drive{" "}
            <span className="text-gradient-lime">Different.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mb-4 leading-relaxed"
          >
            Luxury mobility built for Puerto Rico.
          </motion.p>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.45 }}
            className="text-base md:text-lg text-muted max-w-xl mb-10 leading-relaxed"
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

          {/* Trust signals row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.85 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl pt-10 border-t border-white/[0.08]"
          >
            <TrustItem
              icon={<Plane className="w-4 h-4" />}
              label="SJU Airport Delivery"
              sub="Free pickup at SJU"
            />
            <TrustItem
              icon={<FileSignature className="w-4 h-4" />}
              label="100% Digital"
              sub="No counter. No paper."
            />
            <TrustItem
              icon={<ShieldCheck className="w-4 h-4" />}
              label="Fully Insured"
              sub="Drive with peace of mind"
            />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="block w-px h-8"
              style={{ backgroundColor: "rgba(166,255,0,0.6)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <HowItWorks />

      {/* ============ FLEET ============ */}
      <Fleet />
    </main>
  );
}

// ==================== HELPER COMPONENT ====================

function TrustItem({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: "rgba(166,255,0,0.08)",
          color: "#A6FF00",
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-muted mt-0.5">{sub}</p>
      </div>
    </div>
  );
}