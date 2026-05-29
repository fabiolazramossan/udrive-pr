"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Booking = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  delivery_location: string;
  total_amount: number | null;
  status: string;
  license_url: string | null;
  notes: string | null;
  created_at: string;
  client_token: string | null;
};

const STATUS_OPTIONS = ["pending", "confirmed", "active", "completed", "cancelled"];
const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: "Pendiente",  color: "text-yellow-400", bg: "bg-yellow-400/10" },
  confirmed: { label: "Confirmada", color: "text-green-400",  bg: "bg-green-400/10" },
  active:    { label: "Activa",     color: "text-lime-400",   bg: "bg-lime-400/10" },
  completed: { label: "Completada", color: "text-blue-400",   bg: "bg-blue-400/10" },
  cancelled: { label: "Cancelada",  color: "text-red-400",    bg: "bg-red-400/10" },
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [filter, setFilter] = useState("all");
  const [copied, setCopied] = useState<string | null>(null);

  async function fetchBookings() {
    setLoading(true);
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
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
    if (selected?.id === id) setSelected((b) => b ? { ...b, status } : b);
    setUpdating(null);
  }

  function copyClientLink(token: string, id: string) {
    const url = `${window.location.origin}/booking/${token}`;
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const counts = STATUS_OPTIONS.reduce((acc, s) => ({ ...acc, [s]: bookings.filter((b) => b.status === s).length }), {} as Record<string, number>);

  if (!authed) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">Ü Drive Admin</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && password === "udrive2024" && setAuthed(true)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 mb-4"
        />
        <button
          onClick={() => password === "udrive2024" && setAuthed(true)}
          className="w-full bg-[#A6FF00] text-black font-bold py-3 rounded-xl hover:bg-[#8FE000] transition-colors"
        >
          Entrar
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-[#A6FF00] font-bold text-lg">Ü Drive</span>
          <span className="text-white/30">/</span>
          <span className="text-white/60 text-sm">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-sm">{bookings.length} reservas total</span>
          <button onClick={fetchBookings} className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
            Actualizar
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Sidebar list */}
        <div className="w-80 border-r border-white/10 flex flex-col">
          {/* Filters */}
          <div className="p-3 border-b border-white/10 flex gap-1 flex-wrap">
            <button onClick={() => setFilter("all")} className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${filter === "all" ? "bg-white/20 text-white" : "text-white/40 hover:text-white/60"}`}>
              Todas ({bookings.length})
            </button>
            {STATUS_OPTIONS.map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${filter === s ? "bg-white/20 text-white" : "text-white/40 hover:text-white/60"}`}>
                {STATUS_LABELS[s].label} ({counts[s] || 0})
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-white/40 text-sm text-center">Cargando...</div>
            ) : filtered.length === 0 ? (
              <div className="p-6 text-white/40 text-sm text-center">No hay reservas</div>
            ) : filtered.map((b) => {
              const s = STATUS_LABELS[b.status] || { label: b.status, color: "text-gray-400", bg: "bg-gray-400/10" };
              return (
                <div
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selected?.id === b.id ? "bg-white/10" : ""}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-white font-medium text-sm truncate">{b.customer_name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.bg} ${s.color} ml-2 shrink-0`}>{s.label}</span>
                  </div>
                  <p className="text-white/40 text-xs">{b.start_date} → {b.end_date}</p>
                  {b.license_url && <span className="text-xs text-[#A6FF00] mt-1 block">✓ Licencia</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selected ? (
            <div className="flex items-center justify-center h-full text-white/20 text-sm">
              Selecciona una reserva para ver detalles
            </div>
          ) : (
            <div className="max-w-2xl">
              {/* Top */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selected.customer_name}</h2>
                  <p className="text-white/40 text-sm font-mono mt-1">{selected.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div className="flex gap-2">
                  {selected.client_token && (
                    <button
                      onClick={() => copyClientLink(selected.client_token!, selected.id)}
                      className="text-xs bg-[#A6FF00]/10 text-[#A6FF00] hover:bg-[#A6FF00]/20 px-3 py-2 rounded-lg transition-colors"
                    >
                      {copied === selected.id ? "¡Copiado!" : "Copiar link cliente"}
                    </button>
                  )}
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Email", value: selected.customer_email },
                  { label: "Teléfono", value: selected.customer_phone },
                  { label: "Inicio", value: selected.start_date },
                  { label: "Fin", value: selected.end_date },
                  { label: "Entrega", value: selected.delivery_location },
                  { label: "Total", value: selected.total_amount ? `$${selected.total_amount}` : "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/40 text-xs mb-1">{label}</p>
                    <p className="text-white text-sm font-medium">{value || "—"}</p>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-white/40 text-xs mb-3">Cambiar estado</p>
                <div className="flex gap-2 flex-wrap">
                  {STATUS_OPTIONS.map((s) => {
                    const sl = STATUS_LABELS[s];
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        disabled={updating === selected.id}
                        className={`text-xs px-3 py-2 rounded-lg transition-colors border ${selected.status === s ? `${sl.bg} ${sl.color} border-current` : "border-white/10 text-white/40 hover:text-white/60 hover:border-white/20"}`}
                      >
                        {sl.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* License */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-white/40 text-xs mb-3">Licencia de conducir</p>
                {selected.license_url ? (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm">✓</div>
                    <div>
                      <p className="text-white text-sm font-medium">Licencia recibida</p>
                      <a href={selected.license_url} target="_blank" rel="noopener noreferrer" className="text-[#A6FF00] text-xs hover:underline">Ver documento →</a>
                    </div>
                  </div>
                ) : (
                  <p className="text-white/40 text-sm">Pendiente — el cliente aún no ha subido su licencia</p>
                )}
              </div>

              {/* Notes */}
              {selected.notes && (
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/40 text-xs mb-2">Notas</p>
                  <p className="text-white text-sm">{selected.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
