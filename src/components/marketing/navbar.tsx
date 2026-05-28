"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

const NAV_LINKS = [
  { label: { en: "Fleet", es: "Flota" }, href: "#fleet" },
  { label: { en: "How It Works", es: "Cómo Funciona" }, href: "#how-it-works" },
  { label: { en: "Delivery", es: "Entrega" }, href: "#delivery" },
  { label: { en: "Contact", es: "Contacto" }, href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locale, setLocale] = useState<"en" | "es">("en");

  // Detect scroll to apply glassmorphism background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleLocale = () => setLocale((l) => (l === "en" ? "es" : "en"));

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <nav className="container-px mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/udrive-logo-full.png" 
                alt="Ü Drive PR"
                width={300}
                height={180}
                priority
                className="h-10 md:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-lime transition-colors duration-300 font-medium tracking-wide"
                >
                  {link.label[locale]}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <button
                onClick={toggleLocale}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-xs uppercase tracking-wider text-white/80 hover:text-lime hover:border-lime/40 transition-all"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5" />
                {locale.toUpperCase()}
              </button>

              {/* Reserve CTA */}
              <Link
                href="#reserve"
                className="hidden md:inline-flex btn-primary !py-2 !px-5 !text-sm"
              >
                {locale === "en" ? "Reserve" : "Reservar"}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-white"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-px mx-auto h-full flex flex-col">
              {/* Mobile header */}
              <div className="flex items-center justify-between h-20">
                <Image
                  src="/udrive-logo-full.png"
                  alt="Ü Drive PR"
                  width={300}
                  height={180}
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile links */}
              <div className="flex-1 flex flex-col justify-center items-center gap-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-3xl font-bold text-white hover:text-lime transition-colors"
                    >
                      {link.label[locale]}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile bottom actions */}
              <div className="pb-10 space-y-4">
                <button
                  onClick={toggleLocale}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/15 text-sm uppercase tracking-wider text-white/80"
                >
                  <Globe className="w-4 h-4" />
                  {locale === "en" ? "Español" : "English"}
                </button>

                <Link
                  href="#reserve"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full"
                >
                  {locale === "en" ? "Reserve Now" : "Reservar Ahora"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}