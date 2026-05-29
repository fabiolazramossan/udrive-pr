import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { customerName, customerEmail, bookingId, clientToken, startDate, endDate, deliveryLocation } = await req.json();

  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://udrive-pr.vercel.app"}/booking/${clientToken}`;

  try {
    await resend.emails.send({
      from: "Ü Drive PR <onboarding@resend.dev>",
      to: customerEmail,
      subject: "Tu reserva en Ü Drive PR — Próximos pasos",
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
            <div style="margin-bottom:32px;">
              <span style="color:#A6FF00;font-size:24px;font-weight:800;letter-spacing:-0.5px;">Ü Drive PR</span>
            </div>
            <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0 0 8px;">
              ¡Reserva recibida, ${customerName.split(" ")[0]}!
            </h1>
            <p style="color:#888;font-size:16px;margin:0 0 32px;">
              Tu solicitud está siendo procesada. Aquí están los detalles:
            </p>
            <div style="background:#111;border:1px solid #222;border-radius:16px;padding:24px;margin-bottom:24px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:16px;">
                <span style="color:#666;font-size:13px;">Confirmación</span>
                <span style="color:#fff;font-size:13px;font-family:monospace;">${bookingId.slice(0,8).toUpperCase()}</span>
              </div>
              <div style="border-top:1px solid #222;padding-top:16px;display:grid;gap:12px;">
                <div>
                  <span style="color:#666;font-size:12px;display:block;margin-bottom:2px;">Fecha inicio</span>
                  <span style="color:#fff;font-size:14px;">${startDate}</span>
                </div>
                <div>
                  <span style="color:#666;font-size:12px;display:block;margin-bottom:2px;">Fecha fin</span>
                  <span style="color:#fff;font-size:14px;">${endDate}</span>
                </div>
                <div>
                  <span style="color:#666;font-size:12px;display:block;margin-bottom:2px;">Entrega</span>
                  <span style="color:#fff;font-size:14px;">${deliveryLocation}</span>
                </div>
              </div>
            </div>
            <div style="background:#0D1A00;border:1px solid #A6FF00;border-radius:16px;padding:24px;margin-bottom:32px;">
              <p style="color:#A6FF00;font-size:14px;font-weight:600;margin:0 0 8px;">Acción requerida</p>
              <p style="color:#ccc;font-size:14px;margin:0 0-16px;">Sube tu licencia de conducir para confirmar tu reserva:</p>
              <a href="${portalUrl}" style="display:inline-block;margin-top:16px;background:#A6FF00;color:#000;font-weight:700;font-size:14px;padding:12px 24px;border-radius:50px;text-decoration:none;">
                Acceder a mi reserva →
              </a>
            </div>
            <p style="color:#444;font-size:12px;margin:0;">
              ¿Necesitas ayuda? Escríbenos a <a href="https://udrive-pr.vercel.app/support" style="color:#A6FF00;">soporte</a> o por WhatsApp.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
