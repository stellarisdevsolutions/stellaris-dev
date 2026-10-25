import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Remitente oficial
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Stellaris Dev <contact@tiendastellaris.com>";

// Correo de respuesta (tu Gmail para que recibas las respuestas de los clientes directamente)
const REPLY_TO_EMAIL = "stellarisdevsolutions@gmail.com";

export interface OutreachEmailData {
  email: string;
  subject: string;
  greeting: string;
  intro_and_need: string;
  pitch: string;
  demo_url?: string;
  image_url?: string;
  closing: string;
  signature: string;
}

/**
 * Genera el HTML limpio y de alta entregabilidad para prospección B2B
 */
export function buildOutreachHtml(data: OutreachEmailData): string {
  const {
    greeting,
    intro_and_need,
    pitch,
    demo_url,
    image_url,
    closing,
    signature,
  } = data;

  // Formatear saltos de línea para párrafos limpios
  const formatParagraphs = (text: string) => {
    return text
      .split("\n\n")
      .map((p) => `<p style="margin: 0 0 16px 0; line-height: 1.65; color: #27272a; font-size: 15px;">${p.replace(/\n/g, "<br/>")}</p>`)
      .join("");
  };

  const imageBlock = image_url?.trim()
    ? `
      <div style="margin: 24px 0 20px 0; text-align: center;">
        ${
          demo_url?.trim()
            ? `<a href="${demo_url.trim()}" target="_blank" style="text-decoration: none; display: inline-block;">`
            : ""
        }
          <div style="border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); background: #ffffff;">
            <img 
              src="${image_url.trim()}" 
              alt="Demo Preview" 
              style="width: 100%; max-width: 540px; height: auto; display: block; border: 0;"
            />
          </div>
        ${demo_url?.trim() ? `</a>` : ""}

        ${
          demo_url?.trim()
            ? `
            <div style="margin-top: 12px;">
              <a 
                href="${demo_url.trim()}" 
                target="_blank" 
                style="display: inline-block; background: #FF532A; color: #ffffff !important; padding: 10px 22px; border-radius: 999px; text-decoration: none; font-size: 13px; font-weight: bold; letter-spacing: 0.3px; box-shadow: 0 3px 8px rgba(255,83,42,0.25);"
              >
                👉 Ver Demo en Vivo en Pantalla Completa →
              </a>
            </div>
          `
            : ""
        }
      </div>
    `
    : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
            background-color: #f4f4f5; 
            margin: 0; 
            padding: 24px 12px; 
            color: #171717; 
            -webkit-font-smoothing: antialiased;
          }
          .email-card { 
            background: #ffffff; 
            max-width: 580px; 
            margin: 0 auto; 
            border-radius: 16px; 
            border: 1px solid #e4e4e7; 
            overflow: hidden; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.04); 
          }
          .email-body { 
            padding: 32px 28px; 
          }
          .signature-box { 
            margin-top: 24px; 
            padding-top: 18px; 
            border-top: 1px solid #f4f4f5; 
            font-size: 14px; 
            color: #52525b; 
            line-height: 1.5; 
          }
          .footer-note { 
            padding: 16px 28px; 
            background: #fafafa; 
            border-top: 1px solid #f4f4f5; 
            font-size: 11px; 
            color: #a1a1aa; 
            text-align: center; 
            line-height: 1.4; 
          }
          @media only screen and (max-width: 480px) {
            .email-body { padding: 24px 18px !important; }
          }
        </style>
      </head>
      <body>
        <div class="email-card">
          <div class="email-body">
            <!-- Saludo -->
            <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #171717;">
              ${greeting}
            </p>

            <!-- Introducción y Auditoría del Dolor -->
            ${formatParagraphs(intro_and_need)}

            <!-- Pitch y Propuesta -->
            ${formatParagraphs(pitch)}

            <!-- Mockup Visual de la Demo (si existe) -->
            ${imageBlock}

            <!-- Cierre suave -->
            ${formatParagraphs(closing)}

            <!-- Firma -->
            <div class="signature-box">
              ${signature.replace(/\n/g, "<br/>")}
            </div>
          </div>

          <!-- Pie de página discreto y anti-spam -->
          <div class="footer-note">
            Stellaris Dev Solutions • tiendastellaris.com<br/>
            Si no deseas recibir más mensajes de nuestra parte, simplemente responde indicando "dar de baja".
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Envía un correo de prospección real mediante Resend
 */
export async function sendOutreachEmail(data: OutreachEmailData) {
  if (!resend) {
    console.warn("Resend no está configurado (falta RESEND_API_KEY).");
    return { success: false, error: "RESEND_API_KEY no configurado" };
  }

  try {
    const html = buildOutreachHtml(data);

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email.trim(),
      subject: data.subject.trim(),
      html,
      replyTo: REPLY_TO_EMAIL,
    });

    if (result.error) {
      console.error("Resend error sending outreach email:", result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    console.error("Error al enviar correo de prospección:", error);
    return { success: false, error: error?.message || "Error desconocido" };
  }
}
