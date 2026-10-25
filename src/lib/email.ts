import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Remitente verificado en Cloudflare
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Stellaris Dev <contacto@tiendastellaris.com>";

// Correo donde recibirás las alertas de compra y contacto
const ADMIN_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || "stellarisdev.us@gmail.com";

interface SendPurchaseInquiryParams {
  buyerEmail: string;
  productTitle: string;
  productSlug: string;
  productPrice: string;
  buyerNote?: string;
}

interface SendContactNotificationParams {
  name: string;
  email: string;
  projectType: string;
  details: string;
  lang?: "es" | "en";
}

/**
 * Envía la notificación de compra de Marketplace:
 * 1. Al comprador (confirmación con detalles y próximos pasos)
 * 2. Al administrador (alerta con los datos del comprador para concretar la venta)
 */
export async function sendPurchaseInquiryEmails(params: SendPurchaseInquiryParams) {
  if (!resend) {
    console.warn("Resend no está configurado (falta RESEND_API_KEY). Saltando envío de correo.");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const { buyerEmail, productTitle, productSlug, productPrice, buyerNote } = params;

  try {
    // 1. Notificación al Administrador (stellarisdev.us@gmail.com)
    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 24px; color: #171717; }
            .card { background: #ffffff; max-width: 580px; margin: 0 auto; border-radius: 16px; border: 1px solid #e4e4e7; overflow: hidden; }
            .header { background: #171717; padding: 24px 32px; color: #ffffff; }
            .badge { display: inline-block; background: #FF532A; color: #ffffff; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
            .title { margin: 12px 0 0 0; font-size: 20px; font-weight: bold; color: #ffffff; }
            .content { padding: 32px; }
            .row { margin-bottom: 16px; }
            .label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px; margin-bottom: 4px; }
            .value { font-size: 15px; font-weight: 600; color: #171717; }
            .note-box { background: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 14px; font-size: 14px; color: #3f3f46; line-height: 1.5; margin-top: 6px; }
            .btn { display: inline-block; background: #FF532A; color: #ffffff !important; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-size: 13px; font-weight: bold; margin-top: 20px; }
            .footer { padding: 20px 32px; background: #fafafa; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="badge">Nueva Solicitud de Compra</span>
              <h1 class="title">${productTitle} (${productPrice})</h1>
            </div>
            <div class="content">
              <div class="row">
                <div class="label">Correo del Comprador</div>
                <div class="value"><a href="mailto:${buyerEmail}" style="color: #FF532A;">${buyerEmail}</a></div>
              </div>
              <div class="row">
                <div class="label">Producto Solicitado</div>
                <div class="value">${productTitle} • ${productPrice}</div>
              </div>
              <div class="row">
                <div class="label">Slug / Identificador</div>
                <div class="value" style="font-family: monospace; font-size: 13px;">${productSlug}</div>
              </div>
              ${
                buyerNote
                  ? `
                <div class="row">
                  <div class="label">Mensaje / Requerimientos del Cliente</div>
                  <div class="note-box">${buyerNote.replace(/\n/g, "<br/>")}</div>
                </div>
              `
                  : ""
              }
              <div style="text-align: center;">
                <a href="mailto:${buyerEmail}?subject=Re:%20Purchase%20Request%20for%20${encodeURIComponent(productTitle)}" class="btn">
                  Responder al Comprador
                </a>
              </div>
            </div>
            <div class="footer">
              Recibido a través de Stellaris Dev Marketplace • tiendastellaris.com
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Confirmación al Comprador (en inglés profesional)
    const buyerHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 24px; color: #171717; }
            .card { background: #ffffff; max-width: 580px; margin: 0 auto; border-radius: 20px; border: 1px solid #e4e4e7; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
            .header { background: #171717; padding: 32px; text-align: center; color: #ffffff; }
            .brand { display: inline-flex; align-items: center; gap: 8px; font-size: 18px; font-weight: bold; color: #ffffff; }
            .title { margin: 16px 0 6px 0; font-size: 24px; font-weight: bold; color: #ffffff; }
            .subtitle { font-size: 13px; color: #a1a1aa; margin: 0; }
            .content { padding: 32px; }
            .lead { font-size: 15px; color: #3f3f46; line-height: 1.6; margin-bottom: 24px; }
            .summary-box { background: #fafafa; border: 1px solid #e4e4e7; border-radius: 14px; padding: 20px; margin-bottom: 24px; }
            .item-row { display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid #e4e4e7; }
            .item-name { font-weight: 700; color: #171717; font-size: 16px; }
            .item-price { font-weight: 800; color: #FF532A; font-size: 18px; }
            .step-list { list-style: none; padding: 0; margin: 0 0 24px 0; }
            .step-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: #52525b; margin-bottom: 12px; line-height: 1.5; }
            .step-number { width: 22px; height: 22px; border-radius: 50%; background: #171717; color: #ffffff; font-size: 11px; font-weight: bold; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
            .help-box { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 14px; font-size: 13px; color: #9a3412; line-height: 1.5; }
            .footer { padding: 24px 32px; background: #fafafa; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div class="brand">✦ Stellaris Dev</div>
              <h1 class="title">Purchase Request Received</h1>
              <p class="subtitle">Thank you for your interest in our production software</p>
            </div>
            <div class="content">
              <p class="lead">
                Hello, we have successfully received your purchase request for <strong>${productTitle}</strong>.
              </p>

              <div class="summary-box">
                <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px; margin-bottom: 8px;">Order Summary</div>
                <div style="font-size: 16px; font-weight: 700; color: #171717; margin-bottom: 4px;">${productTitle}</div>
                <div style="font-size: 20px; font-weight: 800; color: #FF532A; margin-bottom: 8px;">${productPrice} <span style="font-size: 12px; font-weight: normal; color: #71717a;">• One-time payment</span></div>
                <div style="font-size: 12px; color: #71717a;">Includes lifetime commercial license, clean Next.js 16 source code, and full database migrations.</div>
              </div>

              <div style="font-size: 13px; font-weight: 700; color: #171717; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">What happens next?</div>
              <div class="step-list">
                <div class="step-item">
                  <div class="step-number">1</div>
                  <div>Our engineering team will review your order details and reach out to this email within a few hours.</div>
                </div>
                <div class="step-item">
                  <div class="step-number">2</div>
                  <div>We will send you a secure checkout link (Stripe / Credit Card / Wire) tailored to your billing preferences.</div>
                </div>
                <div class="step-item">
                  <div class="step-number">3</div>
                  <div>Immediately upon payment, your private GitHub repository invitation and source code download will be delivered.</div>
                </div>
              </div>

              <div class="help-box">
                <strong>Need faster onboarding or custom deployment?</strong><br/>
                Reply directly to this email or contact us via WhatsApp at <strong>+591 69991245</strong> with reference <em>"${productSlug}"</em>.
              </div>
            </div>
            <div class="footer">
              © ${new Date().getFullYear()} Stellaris Dev. All rights reserved. • tiendastellaris.com
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar a ambos en paralelo
    const [adminResult, buyerResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🚨 [Marketplace] Nueva Solicitud de Compra: ${productTitle} (${productPrice})`,
        html: adminHtml,
        replyTo: buyerEmail,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: buyerEmail,
        subject: `Order Request: ${productTitle} | Stellaris Dev`,
        html: buyerHtml,
      }),
    ]);

    return {
      success: true,
      adminSent: adminResult.status === "fulfilled",
      buyerSent: buyerResult.status === "fulfilled",
    };
  } catch (error: any) {
    console.error("Error enviando correos de compra con Resend:", error);
    return { success: false, error: error?.message || "Unknown error" };
  }
}

/**
 * Envía la notificación del formulario de contacto:
 * 1. Al administrador (con los datos completos del prospecto)
 * 2. Al cliente (acuse de recibo bilingüe)
 */
export async function sendContactNotificationEmails(params: SendContactNotificationParams) {
  if (!resend) {
    console.warn("Resend no está configurado (falta RESEND_API_KEY). Saltando envío de correo.");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const { name, email, projectType, details, lang = "es" } = params;

  try {
    const isEn = lang === "en";

    // 1. Notificación al Admin
    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f4f4f5; padding: 24px; color: #171717; }
            .card { background: #fff; max-width: 580px; margin: 0 auto; border-radius: 16px; border: 1px solid #e4e4e7; overflow: hidden; }
            .header { background: #171717; padding: 24px 32px; color: #fff; }
            .badge { display: inline-block; background: #FF532A; color: #fff; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
            .content { padding: 32px; }
            .row { margin-bottom: 16px; }
            .label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #71717a; margin-bottom: 4px; }
            .value { font-size: 15px; font-weight: 600; color: #171717; }
            .message-box { background: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 14px; font-size: 14px; color: #3f3f46; line-height: 1.5; margin-top: 6px; }
            .btn { display: inline-block; background: #FF532A; color: #ffffff !important; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-size: 13px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="badge">Nuevo Lead de Contacto</span>
              <h1 style="margin: 12px 0 0 0; font-size: 20px; font-weight: bold; color: #ffffff;">${name} • ${projectType}</h1>
            </div>
            <div class="content">
              <div class="row">
                <div class="label">Nombre del Cliente</div>
                <div class="value">${name}</div>
              </div>
              <div class="row">
                <div class="label">Correo Electrónico</div>
                <div class="value"><a href="mailto:${email}" style="color: #FF532A;">${email}</a></div>
              </div>
              <div class="row">
                <div class="label">Tipo de Proyecto</div>
                <div class="value">${projectType}</div>
              </div>
              <div class="row">
                <div class="label">Detalles del Mensaje</div>
                <div class="message-box">${details.replace(/\n/g, "<br/>")}</div>
              </div>
              <div style="text-align: center;">
                <a href="mailto:${email}?subject=Re:%20Tu%20consulta%20en%20Stellaris%20Dev" class="btn">
                  Responder al Cliente
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Acuse de recibo al Cliente
    const clientSubject = isEn
      ? "We received your inquiry | Stellaris Dev"
      : "Hemos recibido tu mensaje | Stellaris Dev";

    const clientHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f4f4f5; padding: 24px; color: #171717; }
            .card { background: #fff; max-width: 580px; margin: 0 auto; border-radius: 20px; border: 1px solid #e4e4e7; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
            .header { background: #171717; padding: 32px; text-align: center; color: #fff; }
            .content { padding: 32px; font-size: 15px; color: #3f3f46; line-height: 1.6; }
            .footer { padding: 20px 32px; background: #fafafa; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div style="font-size: 18px; font-weight: bold; color: #fff;">✦ Stellaris Dev</div>
              <h1 style="margin: 14px 0 0 0; font-size: 22px; font-weight: bold; color: #fff;">
                ${isEn ? "Thank you for reaching out!" : "¡Gracias por contactarnos!"}
              </h1>
            </div>
            <div class="content">
              <p>
                ${
                  isEn
                    ? `Hello <strong>${name}</strong>, we have safely received your inquiry regarding <strong>${projectType}</strong>.`
                    : `Hola <strong>${name}</strong>, hemos recibido correctamente tu consulta sobre <strong>${projectType}</strong>.`
                }
              </p>
              <p>
                ${
                  isEn
                    ? "Our engineering team is already reviewing your requirements and will reply within 24 hours with an initial architectural proposal or direct quote."
                    : "Nuestro equipo de ingeniería ya está revisando tus requerimientos y te responderá en menos de 24 horas con una propuesta inicial o cotización personalizada."
                }
              </p>
              <div style="background: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 16px; margin: 20px 0;">
                <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #71717a; margin-bottom: 6px;">
                  ${isEn ? "Your Message Summary" : "Resumen de tu Consulta"}
                </div>
                <div style="font-size: 13px; color: #52525b; line-height: 1.5;">${details.replace(/\n/g, "<br/>")}</div>
              </div>
              <p style="font-size: 13px; color: #71717a; margin: 0;">
                ${
                  isEn
                    ? "If your inquiry is urgent, feel free to contact our direct line via WhatsApp at +591 69991245."
                    : "Si tu requerimiento es urgente, también puedes escribirnos a nuestra línea directa de WhatsApp al +591 69991245."
                }
              </p>
            </div>
            <div class="footer">
              © ${new Date().getFullYear()} Stellaris Dev • tiendastellaris.com
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar en paralelo
    await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `📬 [Contacto] ${name} (${projectType})`,
        html: adminHtml,
        replyTo: email,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: clientSubject,
        html: clientHtml,
      }),
    ]);

    return { success: true };
  } catch (error: any) {
    console.error("Error enviando correos de contacto con Resend:", error);
    return { success: false, error: error?.message || "Unknown error" };
  }
}
