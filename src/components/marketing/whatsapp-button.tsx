"use client";
import { motion } from "framer-motion";
export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/17873197746"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg text-white font-bold text-2xl"
      aria-label="WhatsApp"
    >
      W
    </motion.a>
  );
}
