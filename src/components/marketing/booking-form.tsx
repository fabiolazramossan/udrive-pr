"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, User, Mail, Phone, ChevronRight, X, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

const DAILY_RATE = 95;
const ZONES = ["SJU Airport","Condado","Isla Verde","Old San Juan","Miramar","Santurce","Other"];

function calcDays(s: string, e: string) {
  if (!s || !e) return 0;
  return Math.max(1, Math.ceil((new Date(e).getTime() - new Date(s).getTime()) / 86400000));
}

export default function BookingForm({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    start_date: "", end_date: "", delivery_location: "",
    customer_name: "", customer_email: "", customer_phone: "", notes: ""
  });
  const days = calcDays(form.start_date, form.end_date);
  const total = days * DAILY_RATE;
  const update = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));

  async function handleSubmit() {
    setLoading(true); setError("");
    try {
      const { error: e } = await supabase.from("bookings").insert({
        vehicle_id: "da5dc68e-daff-453e-9f4c-12adf294922e", ...form, total_amount: total, status: "pending", notes: form.notes || null
      });
      if (e) throw e;
      setSuccess(true);
    } catch(e: any) { setError(e.message || "Something went wrong."); }
    finally { setLoading(false); }
  }

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#A6FF00]/50 transition-colors";

  if (success) return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-[#A6FF00]/10 flex items-center justify-center mb-6">
        <Check className="w-8 h-8 text-[#A6FF00]" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">Booking Received</h3>
      <p className="text-white/50 mb-2">We will contact you within 24 hours to confirm.</p>
      <p className="text-white/30 text-sm mb-8">{form.customer_email}</p>
      <button onClick={onClose} className="btn-primary bg-[#A6FF00] text-black font-semibold px-8 py-3 rounded-full">Done</button>
    </div>
  );

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Reserve Your Outlander</h2>
          <p className="text-white/40 text-sm mt-1">Step {step} of 3</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
      <div className="flex gap-2 mb-8">
        {[1,2,3].map(s => (
          <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? "bg-[#A6FF00]" : "bg-white/10"}`} />
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} className="space-y-5">
          <div>
            <label className="text-white/60 text-sm mb-2 block">Pick-up date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="date" min={today} value={form.start_date} onChange={e => update("start_date", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-white/60 text-sm mb-2 block">Return date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="date" min={form.start_date || today} value={form.end_date} onChange={e => update("end_date", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-white/60 text-sm mb-2 block">Delivery location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <select value={form.delivery_location} onChange={e => update("delivery_location", e.target.value)} className={inputCls + " appearance-none"}>
                <option value="" disabled>Select zone</option>
                {ZONES.map(z => <option key={z} value={z} className="bg-[#0A0A0A]">{z}</option>)}
              </select>
            </div>
          </div>
          {days > 0 && (
            <div className="glass rounded-xl p-4 flex items-center justify-between">
              <span className="text-white/50 text-sm">{days} day{days !== 1 ? "s" : ""} x $95</span>
              <span className="text-[#A6FF00] font-bold text-lg">${total}</span>
            </div>
          )}
          <button onClick={() => setStep(2)} disabled={!form.start_date || !form.end_date || !form.delivery_location}
            className="w-full btn-primary bg-[#A6FF00] text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed">
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} className="space-y-5">
          <div>
            <label className="text-white/60 text-sm mb-2 block">Full name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="text" placeholder="John Doe" value={form.customer_name} onChange={e => update("customer_name", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-white/60 text-sm mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="email" placeholder="you@email.com" value={form.customer_email} onChange={e => update("customer_email", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-white/60 text-sm mb-2 block">Phone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="tel" placeholder="+1 (787) 000-0000" value={form.customer_phone} onChange={e => update("customer_phone", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-white/60 text-sm mb-2 block">Notes (optional)</label>
            <textarea placeholder="Flight number, hotel name..." value={form.notes} onChange={e => update("notes", e.target.value)} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#A6FF00]/50 transition-colors resize-none" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 btn-secondary py-3 rounded-full font-semibold">Back</button>
            <button onClick={() => setStep(3)} disabled={!form.customer_name || !form.customer_email || !form.customer_phone}
              className="flex-1 btn-primary bg-[#A6FF00] text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} className="space-y-5">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-semibold mb-2">Booking Summary</h3>
            <div className="flex justify-between text-sm"><span className="text-white/40">Vehicle</span><span className="text-white">Mitsubishi Outlander 2024</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Pick-up</span><span className="text-white">{form.start_date}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Return</span><span className="text-white">{form.end_date}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Delivery</span><span className="text-white">{form.delivery_location}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Name</span><span className="text-white">{form.customer_name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Email</span><span className="text-white">{form.customer_email}</span></div>
            <div className="border-t border-white/10 pt-4 flex justify-between">
              <span className="text-white font-semibold">Total</span>
              <span className="text-[#A6FF00] font-bold text-xl">${total}</span>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 btn-secondary py-3 rounded-full font-semibold">Back</button>
            <button onClick={handleSubmit} disabled={loading}
              className="flex-1 btn-primary bg-[#A6FF00] text-black font-semibold py-3 rounded-full disabled:opacity-50">
              {loading ? "Sending..." : "Confirm Booking"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
