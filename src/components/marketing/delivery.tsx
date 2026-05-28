"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

const zones = [
  { name: "SJU Airport", description: "Luis Muñoz Marín International Airport", time: "Meet & greet at arrivals", free: true },
  { name: "Condado", description: "Hotels & residences in Condado", time: "Delivery in 30 min", free: true },
  { name: "Isla Verde", description: "Hotels & residences in Isla Verde", time: "Delivery in 20 min", free: true },
  { name: "San Juan Area", description: "Old San Juan, Miramar, Santurce", time: "Delivery in 45 min", free: false },
];

export default function Delivery() {
  return (
    <section id="delivery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-[#A6FF00] uppercase mb-4">Delivery</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">We Come To You</h2>
          <p className="text-white/60 max-w-xl mx-auto">No need to go anywhere. We deliver your vehicle directly to the airport or your hotel.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {zones.map((zone, i) => (
            <motion.div key={zone.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass rounded-2xl p-6 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#A6FF00]/10 flex items-center justify-center shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-[#A6FF00]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold">{zone.name}</h3>
                  {zone.free && <span className="text-xs bg-[#A6FF00]/10 text-[#A6FF00] px-2 py-0.5 rounded-full font-medium">Free delivery</span>}
                </div>
                <p className="text-white/50 text-sm mb-2">{zone.description}</p>
                <div className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{zone.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Need delivery outside these zones?</h3>
            <p className="text-white/50">Contact us and we will work something out.</p>
          </div>
          <a href="https://wa.me/17871234567" target="_blank" rel="noopener noreferrer" className="btn-primary bg-[#A6FF00] text-black font-semibold px-8 py-3 rounded-full flex items-center gap-2 whitespace-nowrap">
            <Phone className="w-4 h-4" />
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
