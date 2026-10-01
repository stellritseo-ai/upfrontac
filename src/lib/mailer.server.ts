import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtppro.zoho.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_SECURE = process.env.SMTP_SECURE !== "false";
const SMTP_USER = process.env.SMTP_USER || "eva@stellrit.com";
const SMTP_PASS = process.env.SMTP_PASS || "";
const DEFAULT_NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "eva@stellrit.com";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      connectionTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  return transporter;
}

export interface FormSubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source?: string;
  createdAt?: string;
  extraDetails?: Record<string, any>;
}

export async function sendFormNotificationEmail(
  payload: FormSubmissionPayload,
  recipientEmail: string = DEFAULT_NOTIFICATION_EMAIL
): Promise<boolean> {
  try {
    const transport = getTransporter();
    const source = payload.source || "Website Form";
    const subject = `📬 New HVAC Inquiry: ${payload.name || "Website Visitor"} (${payload.service || "General Inquiry"})`;

    const formattedDate = payload.createdAt
      ? new Date(payload.createdAt).toLocaleString("en-US", { timeZone: "America/Chicago" })
      : new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #005CE6 0%, #00388A 100%); padding: 28px 24px; color: #ffffff; text-align: left; }
          .header h1 { margin: 6px 0 4px 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 28px 24px; }
          .field-row { margin-bottom: 18px; }
          .field-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
          .field-value { font-size: 15px; font-weight: 600; color: #0f172a; word-break: break-word; }
          .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; word-break: break-word; }
          .btn-group { margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap; }
          .btn-primary { background: #005CE6; color: #ffffff !important; text-decoration: none; padding: 12px 20px; border-radius: 10px; font-weight: 700; font-size: 13px; display: inline-block; }
          .btn-secondary { background: #f1f5f9; color: #005CE6 !important; text-decoration: none; padding: 12px 20px; border-radius: 10px; font-weight: 700; font-size: 13px; border: 1px solid #cbd5e1; display: inline-block; }
          .footer { background: #f8fafc; padding: 18px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; margin-bottom: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span style="background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block;">
              New Website Inquiry
            </span>
            <h1>Upfront AC & Heating Notification</h1>
            <p>A new visitor has submitted a request on the website.</p>
          </div>
          <div class="content">
            <div class="field-row">
              <span class="badge">${source}</span>
            </div>
            
            <div style="margin-bottom: 18px;">
              <div class="field-label">Customer Name</div>
              <div class="field-value">${payload.name || "Not provided"}</div>
            </div>

            <div style="margin-bottom: 18px;">
              <div class="field-label">Phone Number</div>
              <div class="field-value">
                ${payload.phone ? `<a href="tel:${payload.phone}" style="color: #005CE6; text-decoration: none; font-weight: 700;">${payload.phone}</a>` : "Not provided"}
              </div>
            </div>

            <div style="margin-bottom: 18px;">
              <div class="field-label">Email Address</div>
              <div class="field-value">
                ${payload.email ? `<a href="mailto:${payload.email}" style="color: #005CE6; text-decoration: none;">${payload.email}</a>` : "Not provided"}
              </div>
            </div>

            <div style="margin-bottom: 18px;">
              <div class="field-label">Service / Request Type</div>
              <div class="field-value">${payload.service || "General HVAC Inquiry"}</div>
            </div>

            <div class="field-row">
              <div class="field-label">Message / Details</div>
              <div class="message-box">${payload.message || "No additional notes provided."}</div>
            </div>

            <div class="btn-group">
              ${payload.phone ? `<a href="tel:${payload.phone}" class="btn-primary">📞 Call Customer Now</a>` : ""}
              ${payload.email ? `<a href="mailto:${payload.email}?subject=Regarding your Upfront AC inquiry" class="btn-secondary">✉️ Reply via Email</a>` : ""}
            </div>
          </div>
          <div class="footer">
            Submitted on ${formattedDate} CT<br/>
            Upfront AC & Heating · Dispatched to <strong>${recipientEmail}</strong>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transport.sendMail({
      from: `"Upfront AC Inquiries" <${SMTP_USER}>`,
      to: recipientEmail,
      replyTo: payload.email && payload.email.includes("@") ? payload.email : SMTP_USER,
      subject,
      text: `New Form Submission from ${source}\n\nName: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nService: ${payload.service}\n\nMessage:\n${payload.message}\n\nSubmitted on: ${formattedDate} CT`,
      html,
    });

    console.log(`[Zoho SMTP] Successfully dispatched form inquiry to ${recipientEmail}. Message ID:`, info.messageId);
    return true;
  } catch (err: any) {
    console.error("[Zoho SMTP Error] Failed to send form notification email:", err);
    return false;
  }
}
