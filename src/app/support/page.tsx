"use client";
import { useState } from "react";
import Navbar from "@/components/marketing/navbar";
import Footer from "@/components/marketing/footer";

const faqs = [
  { q: "¿Cómo funciona el proceso de reserva?", a: "Selecciona tu vehículo, elige fechas y completa el formulario en 3 pasos. Recibirás confirmación por email con los próximos pasos." },
  { q: "¿Qué documentos necesito para rentar?", a: "Licencia de conducir válida, tarjeta de crédito a tu nombre y un depósito de seguridad. Turistas necesitan licencia internacional o del país de origen." },
  { q: "¿Hacen entrega en el aeropuerto?", a: "Sí. Ofrecemos delivery en el Aeropuerto Internacional Luis A. Ferré (SJU) y en cualquier punto de Puerto Rico con coordinación previa." },
  { q: "¿Cuál es la política de cancelación?", a: "Cancelaciones con más de 48 horas de anticipación reciben reembolso completo. Menos de 48 horas aplica cargo de una noche." },
  { q: "¿Los vehículos tienen seguro?", a: "Todos los vehículos incluyen seguro básico. Ofrecemos cobertura adicional por un cargo diario extra." },
  { q: "¿Cómo subo mi licencia de conducir?", a: "Después de confirmar tu reserva, recibirás un email con un enlace personalizado para subir tu licencia de forma segura." },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", booking: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4">
          ¿Cómo podemos <span className="text-[var(--color-lime)]">ayudarte?</span>
        </h1>
        <p className="text-[var(--color-foreground-muted)] text-lg max-w-xl mx-auto">
          Estamos aquí para que tu experiencia sea perfecta.
        </p>
        <a href="https://wa.me/17872345678" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 mt-8 px-8 py-3">
          Escríbenos por WhatsApp
        </a>
      </section>
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-[var(--color-border)] rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center px-6 py-4 text-left text-[var(--color-foreground)] font-medium hover:bg-white/5 transition-colors">
                {faq.q}
                <span className="text-[var(--color-lime)] text-xl ml-4">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <div className="px-6 pb-4 text-[var(--color-foreground-muted)]">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Envíanos un mensaje</h2>
        <p className="text-[var(--color-foreground-muted)] mb-8">Te respondemos en menos de 24 horas.</p>
        {status === "sent" ? (
          <div className="border border-[var(--color-lime)] rounded-xl p-8 text-center">
            <div className="text-[var(--color-lime)] text-4xl mb-3">✓</div>
            <p className="text-[var(--color-foreground)] font-semibold text-lg">Mensaje enviado</p>
            <p className="text-[var(--color-foreground-muted)] mt-1">Te contactaremos pronto.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Tu nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white/5 border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none focus:border-[var(--color-lime)]" />
              <input type="email" placeholder="Tu email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-white/5 border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none focus:border-[var(--color-lime)]" />
            </div>
            <input type="text" placeholder="Número de reserva (opcional)" value={form.booking} onChange={(e) => setForm({ ...form, booking: e.target.value })} className="w-full bg-white/5 border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none focus:border-[var(--color-lime)]" />
            <textarea placeholder="¿En qué podemos ayudarte?" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-white/5 border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none focus:border-[var(--color-lime)] resize-none" />
            <button onClick={handleSubmit} disabled={status === "sending"} className="btn-primary w-full py-3">
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
