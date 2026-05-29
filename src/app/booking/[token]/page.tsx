"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Booking = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
  delivery_location: string;
  total_amount: number | null;
  status: string;
  license_url: string | null;
  client_token: string;
  contract_signed_at: string | null;
  contract_signature: string | null;
  vehicle_id: string;
};

const WA = "https://wa.me/17873197746";

export default function BookingPortal() {
  const { token } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [tab, setTab] = useState<"overview"|"license"|"contract">("overview");
  const [signature, setSignature] = useState("");
  const [signing, setSigning] = useState(false);
  const [signError, setSignError] = useState("");

  useEffect(() => {
    if (!token) return;
    supabase.from("bookings").select("*").eq("client_token", token).single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true);
        else setBooking(data);
        setLoading(false);
      });
  }, [token]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !booking) return;
    setUploading(true); setUploadError("");
    const ext = file.name.split(".").pop();
    const path = `${booking.id}/license.${ext}`;
    const { error: upErr } = await supabase.storage.from("licenses").upload(path, file, { upsert: true });
    if (upErr) { setUploadError("Error al subir. Intenta de nuevo."); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("licenses").getPublicUrl(path);
    await supabase.from("bookings").update({ license_url: urlData.publicUrl }).eq("id", booking.id);
    setBooking({ ...booking, license_url: urlData.publicUrl });
    setUploadDone(true); setUploading(false);
  };

  const handleSign = async () => {
    if (!signature.trim() || !booking) return;
    if (signature.trim().toLowerCase() !== booking.customer_name.toLowerCase()) {
      setSignError("El nombre debe coincidir exactamente con el nombre de la reserva.");
      return;
    }
    setSigning(true); setSignError("");
    const now = new Date().toISOString();
    await supabase.from("bookings").update({ contract_signature: signature, contract_signed_at: now }).eq("id", booking.id);
    setBooking({ ...booking, contract_signature: signature, contract_signed_at: now });
    setSigning(false);
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
  const days = booking!.start_date && booking!.end_date
    ? Math.max(1, Math.ceil((new Date(booking!.end_date).getTime() - new Date(booking!.start_date).getTime()) / 86400000))
    : 1;

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <a href="/" className="text-[var(--color-lime)] font-bold text-xl">Ü Drive PR</a>
          <span className="text-[var(--color-foreground-muted)]">/</span>
          <span className="text-[var(--color-foreground-muted)]">Mi Reserva</span>
        </div>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-1">
          Hola, {booking!.customer_name.split(" ")[0]} 👋
        </h1>
        <p className="text-[var(--color-foreground-muted)] mb-6">Gestiona tu reserva desde aquí.</p>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1">
          {(["overview","license","contract"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-[var(--color-lime)] text-black" : "text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]"}`}>
              {t === "overview" ? "Reserva" : t === "license" ? "Licencia" : "Contrato"}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <div className="border border-[var(--color-border)] rounded-2xl p-6 bg-white/5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-[var(--color-foreground-muted)] uppercase tracking-wider mb-1">Estado</p>
                <p className={`text-lg font-bold ${s.color}`}>{s.label}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--color-foreground-muted)] uppercase tracking-wider mb-1">Reserva</p>
                <p className="text-sm font-mono text-[var(--color-foreground)]">{booking!.id.slice(0,8).toUpperCase()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-[var(--color-foreground-muted)] mb-1">Inicio</p><p className="text-[var(--color-foreground)] font-medium">{booking!.start_date}</p></div>
              <div><p className="text-[var(--color-foreground-muted)] mb-1">Fin</p><p className="text-[var(--color-foreground)] font-medium">{booking!.end_date}</p></div>
              <div><p className="text-[var(--color-foreground-muted)] mb-1">Entrega</p><p className="text-[var(--color-foreground)] font-medium">{booking!.delivery_location}</p></div>
              <div><p className="text-[var(--color-foreground-muted)] mb-1">Total</p><p className="text-[var(--color-foreground)] font-medium">{booking!.total_amount ? `$${booking!.total_amount}` : "—"}</p></div>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <div className="flex gap-2 flex-wrap text-xs">
                <span className={`px-2 py-1 rounded-full ${booking!.license_url ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                  {booking!.license_url ? "✓ Licencia subida" : "⚠ Licencia pendiente"}
                </span>
                <span className={`px-2 py-1 rounded-full ${booking!.contract_signed_at ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                  {booking!.contract_signed_at ? "✓ Contrato firmado" : "⚠ Contrato pendiente"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* License Tab */}
        {tab === "license" && (
          <div className="border border-[var(--color-border)] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-1">Licencia de conducir</h2>
            <p className="text-[var(--color-foreground-muted)] text-sm mb-4">Sube una foto clara del frente de tu licencia.</p>
            {booking!.license_url ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                <div>
                  <p className="text-[var(--color-foreground)] font-medium text-sm">Licencia recibida</p>
                  <a href={booking!.license_url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-lime)] text-xs hover:underline">Ver documento →</a>
                </div>
              </div>
            ) : uploadDone ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                <p className="text-[var(--color-foreground)] font-medium text-sm">¡Licencia subida exitosamente!</p>
              </div>
            ) : (
              <label className="block">
                <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--color-lime)] transition-colors">
                  {uploading ? <p className="text-[var(--color-foreground-muted)]">Subiendo...</p> : (
                    <><p className="text-3xl mb-2">📄</p><p className="text-[var(--color-foreground)] font-medium">Click para subir</p><p className="text-[var(--color-foreground-muted)] text-xs mt-1">JPG, PNG o PDF — máx 10MB</p></>
                  )}
                </div>
                <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
            )}
            {uploadError && <p className="text-red-400 text-sm mt-2">{uploadError}</p>}
          </div>
        )}

        {/* Contract Tab */}
        {tab === "contract" && (
          <div className="border border-[var(--color-border)] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-4">Contrato de Arrendamiento de Vehículo</h2>
            <div className="bg-white/5 rounded-xl p-4 text-xs text-[var(--color-foreground-muted)] space-y-3 mb-6 max-h-80 overflow-y-auto leading-relaxed">
              <p className="text-[var(--color-foreground)] font-semibold text-sm">CONTRATO DE ARRENDAMIENTO DE VEHÍCULO — Ü Drive PR</p>
              <p>Este contrato se celebra entre <strong className="text-[var(--color-foreground)]">Ü Drive PR</strong> ("Arrendador") y <strong className="text-[var(--color-foreground)]">{booking!.customer_name}</strong> ("Arrendatario") para el arrendamiento de un vehículo motor en Puerto Rico.</p>
              <p><strong className="text-[var(--color-foreground)]">PERÍODO DE ARRENDAMIENTO:</strong> Del {booking!.start_date} al {booking!.end_date} ({days} día{days !== 1 ? "s" : ""}).</p>
              <p><strong className="text-[var(--color-foreground)]">LUGAR DE ENTREGA:</strong> {booking!.delivery_location}.</p>
              <p><strong className="text-[var(--color-foreground)]">DEPÓSITO DE SEGURIDAD:</strong> $250.00 USD reembolsable al devolver el vehículo en las condiciones originales.</p>
              <p><strong className="text-[var(--color-foreground)]">RESPONSABILIDADES DEL ARRENDATARIO:</strong> El Arrendatario se compromete a: (1) Operar el vehículo únicamente con licencia de conducir válida; (2) No operar el vehículo bajo efectos de alcohol o sustancias controladas; (3) Respetar todas las leyes de tránsito de Puerto Rico; (4) No subarrendar ni transferir el uso del vehículo a terceros; (5) Reportar cualquier accidente o daño inmediatamente al Arrendador; (6) Devolver el vehículo con el mismo nivel de combustible.</p>
              <p><strong className="text-[var(--color-foreground)]">DAÑOS Y RESPONSABILIDAD:</strong> El Arrendatario es responsable por todos los daños al vehículo durante el período de arrendamiento, incluyendo daños por accidente, vandalismo o uso indebido. El depósito de seguridad puede ser retenido total o parcialmente para cubrir dichos daños.</p>
              <p><strong className="text-[var(--color-foreground)]">CANCELACIÓN:</strong> Cancelaciones con más de 48 horas de anticipación reciben reembolso completo. Cancelaciones con menos de 48 horas aplica cargo equivalente a una noche de renta.</p>
              <p><strong className="text-[var(--color-foreground)]">COMBUSTIBLE:</strong> El vehículo se entrega con tanque lleno y debe ser devuelto en las mismas condiciones. Costo de reposición de combustible: precio del mercado más cargo de servicio de $25.00.</p>
              <p><strong className="text-[var(--color-foreground)]">MULTAS E INFRACCIONES:</strong> El Arrendatario es responsable de todas las multas, peajes y cargos de estacionamiento incurridos durante el período de arrendamiento.</p>
              <p><strong className="text-[var(--color-foreground)]">LEY APLICABLE:</strong> Este contrato se rige por las leyes del Estado Libre Asociado de Puerto Rico.</p>
              <p><strong className="text-[var(--color-foreground)]">CONTACTO:</strong> Para cualquier emergencia o consulta: WhatsApp (787) 319-7746.</p>
            </div>

            {booking!.contract_signed_at ? (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">✓</div>
                <div>
                  <p className="text-[var(--color-foreground)] font-medium text-sm">Contrato firmado</p>
                  <p className="text-[var(--color-foreground-muted)] text-xs">Firmado por: {booking!.contract_signature} · {new Date(booking!.contract_signed_at).toLocaleDateString("es-PR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-[var(--color-foreground-muted)] text-sm mb-3">Para firmar, escribe tu nombre completo exactamente como aparece en la reserva:</p>
                <p className="text-[var(--color-foreground)] text-xs mb-2 font-mono bg-white/5 px-3 py-2 rounded-lg">{booking!.customer_name}</p>
                <input
                  type="text"
                  placeholder="Escribe tu nombre completo aquí"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full bg-white/5 border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none focus:border-[var(--color-lime)] mb-3"
                />
                {signError && <p className="text-red-400 text-xs mb-3">{signError}</p>}
                <button onClick={handleSign} disabled={signing || !signature.trim()} className="btn-primary w-full py-3">
                  {signing ? "Firmando..." : "Firmar contrato digitalmente"}
                </button>
                <p className="text-[var(--color-foreground-muted)] text-xs mt-2 text-center">Al firmar, aceptas todos los términos y condiciones del contrato.</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-6">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="text-[var(--color-lime)] text-sm hover:underline">¿Necesitas ayuda? WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
