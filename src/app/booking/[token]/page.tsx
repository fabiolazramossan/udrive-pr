"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Booking = {
  id: string;
  customer_name: string;
  customer_email: string;
  start_date: string;
  end_date: string;
  delivery_location: string;
  status: string;
  license_url: string | null;
  client_token: string;
};

export default function BookingPortal() {
  const { token } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (!token) return;
    supabase
      .from("bookings")
      .select("*")
      .eq("client_token", token)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true);
        else setBooking(data);
        setLoading(false);
      });
  }, [token]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !booking) return;
    setUploading(true);
    setUploadError("");
    const ext = file.name.split(".").pop();
    const path = `${booking.id}/license.${ext}`;
    const { error: upErr } = await supabase.storage.from("licenses").upload(path, file, { upsert: true });
    if (upErr) { setUploadError("Error al subir. Intenta de nuevo."); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("licenses").getPublicUrl(path);
    await supabase.from("bookings").update({ license_url: urlData.publicUrl }).eq("id", booking.id);
    setBooking({ ...booking, license_url: urlData.publicUrl });
    setUploadDone(true);
    setUploading(false);
  };

  const statusLabel: Record<string, { label: string; color: string }> = {
    pending: { label: "Pendiente", color: "text-yellow-400" },
    confirmed: { label: "Confirmada", color: "text-green-400" },
    active: { label: "Activa", color: "text-[var(--color-lime)]" },
    completed: { label: "Completada", color: "text-blue-400" },
    cancelled: { label: "Cancelada", color: "text-red-400" },
  };

  if (loading) return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
      <p className="text-[var(--color-foreground-muted)]">Cargando tu reserva...</p>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Reserva no encontrada</h1>
        <p className="text-[var(--color-foreground-muted)]">El enlace puede haber expirado o ser incorrecto.</p>
        <a href="/" className="btn-primary inline-block mt-6 px-6 py-3">Volver al inicio</a>
      </div>
    </div>
  );

  const s = statusLabel[booking!.status] || { label: booking!.status, color: "text-gray-400" };

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <a href="/" className="text-[var(--color-lime)] font-bold text-xl">Ü Drive PR</a>
          <span className="text-[var(--color-foreground-muted)]">/</span>
          <span className="text-[var(--color-foreground-muted)]">Mi Reserva</span>
        </div>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-2">
          Hola, {booking!.customer_name.split(" ")[0]} 👋
        </h1>
        <p className="text-[var(--color-foreground-muted)] mb-8">Aquí puedes gestionar tu reserva.</p>
        <div className="border border-[var(--color-border)] rounded-2xl p-6 mb-6 bg-white/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-[var(--color-foreground-muted)] uppercase tracking-wider mb-1">Estado</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.label}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--color-foreground-muted)] uppercase tracking-wider mb-1">Reserva</p>
              <p className="text-sm font-mono text-[var(--color-foreground)]">{booking!.id.slice(0, 8).toUpperCase()}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[var(--color-foreground-muted)] mb-1">Inicio</p>
              <p className="text-[var(--color-foreground)] font-medium">{booking!.start_date}</p>
            </div>
            <div>
              <p className="text-[var(--color-foreground-muted)] mb-1">Fin</p>
              <p className="text-[var(--color-foreground)] font-medium">{booking!.end_date}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[var(--color-foreground-muted)] mb-1">Entrega</p>
              <p className="text-[var(--color-foreground)] font-medium">{booking!.delivery_location}</p>
            </div>
          </div>
        </div>
        <div className="border border-[var(--color-border)] rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-1">Licencia de conducir</h2>
          <p className="text-[var(--color-foreground-muted)] text-sm mb-4">Sube una foto clara del frente de tu licencia para confirmar tu reserva.</p>
          {booking!.license_url ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
              <div>
                <p className="text-[var(--color-foreground)] font-medium text-sm">Licencia recibida</p>
                <a href={booking!.license_url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-lime)] text-xs hover:underline">Ver documento</a>
              </div>
            </div>
          ) : uploadDone ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
              <p className="text-[var(--color-foreground)] font-medium text-sm">Licencia subida exitosamente.</p>
            </div>
          ) : (
            <label className="block">
              <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--color-lime)] transition-colors">
                {uploading ? (
                  <p className="text-[var(--color-foreground-muted)]">Subiendo...</p>
                ) : (
                  <>
                    <p className="text-3xl mb-2">📄</p>
                    <p className="text-[var(--color-foreground)] font-medium">Click para subir</p>
                    <p className="text-[var(--color-foreground-muted)] text-xs mt-1">JPG, PNG o PDF — máx 10MB</p>
                  </>
                )}
              </div>
              <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          )}
          {uploadError && <p className="text-red-400 text-sm mt-2">{uploadError}</p>}
        </div>
        <div className="text-center">
          <p className="text-[var(--color-foreground-muted)] text-sm mb-1">¿Necesitas ayuda?</p>
          <a href="/support" className="text-[var(--color-lime)] text-sm hover:underline">Centro de soporte</a>
          <span className="text-[var(--color-foreground-muted)] text-sm mx-2">o</span>
          <a href="https://wa.me/17873197746" target="_blank" rel="noopener noreferrer" className="text-[var(--color-lime)] text-sm hover:underline">WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
