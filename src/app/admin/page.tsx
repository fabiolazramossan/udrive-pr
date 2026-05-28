"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const PASSWORD = "udrive2024";

type Booking = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
  delivery_location: string;
  total_amount: number;
  status: string;
  notes: string | null;
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  async function fetchBookings() {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (authed) fetchBookings();
  }, [authed]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await supabase.from("bookings").update({ status }).eq("id", id);
    await fetchBookings();
    setUpdating(null);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Admin</h1>
          <p className="text-white/40 text-sm mb-6">Ü Drive PR</p>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                if (pw === PASSWORD) setAuthed(true);
                else setError("Wrong password");
              }
            }}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#A6FF00]/50 mb-3"
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            onClick={() => {
              if (pw === PASSWORD) setAuthed(true);
              else setError("Wrong password");
            }}
            className="w-full bg-[#A6FF00] text-black font-semibold py-3 rounded-full"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Bookings</h1>
            <p className="text-white/40 text-sm mt-1">Ü Drive PR Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm">{bookings.length} total</span>
            <button onClick={fetchBookings} className="bg-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors">
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["pending","confirmed","completed","cancelled"].map(s => (
            <div key={s} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{s}</p>
              <p className="text-2xl font-bold text-white">{bookings.filter(b => b.status === s).length}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <p className="text-white/40 text-center py-12">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-white/40 text-center py-12">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold">{b.customer_name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[b.status] || "bg-white/10 text-white/40"}`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div><p className="text-white/40">Email</p><p className="text-white">{b.customer_email}</p></div>
                      <div><p className="text-white/40">Phone</p><p className="text-white">{b.customer_phone}</p></div>
                      <div><p className="text-white/40">Dates</p><p className="text-white">{b.start_date} → {b.end_date}</p></div>
                      <div><p className="text-white/40">Delivery</p><p className="text-white">{b.delivery_location}</p></div>
                    </div>
                    {b.notes && <p className="text-white/40 text-sm mt-2">Notes: {b.notes}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <p className="text-[#A6FF00] font-bold text-xl">${b.total_amount}</p>
                    <select
                      value={b.status}
                      disabled={updating === b.id}
                      onChange={e => updateStatus(b.id, e.target.value)}
                      className="bg-white/10 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none"
                    >
                      <option value="pending" className="bg-[#0A0A0A]">Pending</option>
                      <option value="confirmed" className="bg-[#0A0A0A]">Confirmed</option>
                      <option value="completed" className="bg-[#0A0A0A]">Completed</option>
                      <option value="cancelled" className="bg-[#0A0A0A]">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
