"use client";
import { useState } from "react";
import Navbar from "@/components/marketing/navbar";
import Footer from "@/components/marketing/footer";

const faqs = [
  {
    q: "¿Cómo funciona el proceso de reserva?",
    a: "Selecciona tu vehículo, elige fechas y completa el formulario en 3 pasos. Recibirás confirmación por email con los próximos pasos.",
  },
  {
    q: "¿Qué documentos necesito para rentar?",
    a: "Licencia de conducir válida, tarjeta de crédito a tu nombre y un depósito de seguridad. Turistas necesitan licencia internacional o del país de origen.",
  },
  {
    q: "¿Hacen entrega en el aeropuerto?",
    a: "Sí. Ofrecemos delivery en el Aeropuerto Internacional Luis A. Ferré (SJU) y en cualquier punto de Puerto Rico con coordinación previa.",
  },
  {
    q: "¿Cuál es la política de cancelación?",
    a: "Cancelaciones con más de 48 horas de anticipación reciben reembolso completo. Menos de 48 horas aplica cargo de una noche.",
  },
  {
    q: "¿Los vehículos tienen seguro?",
    a: "Todos los vehículos incluyen seguro básico. Ofrecemos cobertura adicional por un cargo diario extra.",
  },
  {
    q: "¿Cómo subo mi licencia de conducir?",
    a: "Después de confirmar tu reserva, recibirás un email con un enlace personalizado para subir tu licencia de forma segura.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", booking: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4">
          ¿Cómo podemos <span className="text-[var(--color-lime)]">ayudarte?</span>
        </h1>
        <p className="text-[var(--color-foreground-muted)] text-lg max-w-xl mx-auto">
          Estamos aquí para que tu experiencia sea perfecta. Escríbenos o encuentra tu respuesta abajo.
        </p>
        
          href="https://wa.me/17872345678"
          target="_blank"
          rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 mt-8 px-8 py-3"
          >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.847L.057 23.885l6.204-1.448A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.031-1.378l-.361-.214-3.732.871.936-3.417-.235-.371A9.865 9.865 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
          </svg>
          Escríbenos por WhatsApp
        </a>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[var(--color-border)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-[var(--color-foreground)] font-medium hover:bg-white/5 transition-colors"
              >
                {faq.q}
                <span className="text-[var(--color-lime)] text-xl ml-4">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-[var(--color-foreground-muted)]">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Formulario */}
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
              <input
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none focus:border-[var(--color-lime)]"
              />
              <input
                type="email"
                placeholder="Tu email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none focus:border-[var(--color-lime)]"
              />
            </div>
            <input
              type="text"
              placeholder="Número de reserva (opcional)"
              value={form.booking}
              onChange={(e) => setForm({ ...form, booking: e.target.value })}
              className="w-full bg-white/5 border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none focus:border-[var(--color-lime)]"
            />
            <textarea
              placeholder="¿En qué podemos ayudarte?"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/5 border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none focus:border-[var(--color-lime)] resize-none"
            />
            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="btn-primary w-full py-3"
            >
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
