import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Resend } from "resend";
import { bookingSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFY_EMAIL = "infopehchaanmedia@gmail.com";
const FROM_EMAIL = "bookings@pnmh.site";

export async function registerRoutes(app: Express): Promise<Server> {
  // Sitemap for search engine crawlers
  app.get("/sitemap.xml", (_req, res) => {
    const lastmod = new Date().toISOString().split("T")[0];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pnmh.site/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://pnmh.site/#work</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pnmh.site/#services</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pnmh.site/#about</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://pnmh.site/#contact</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.send(sitemap);
  });

  app.post("/api/booking", async (req, res) => {
    const result = bookingSubmissionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }

    const { name, email, about, notes, guests, date, time } = result.data;

    const guestList = guests
      ? guests.split(",").map((g) => g.trim()).filter(Boolean)
      : [];

    // Always log booking details as a reliable server-side backup
    console.log(
      `\n📅 NEW BOOKING\n  Name:  ${name}\n  Email: ${email}\n  Date:  ${date} at ${time}\n  About: ${about}` +
      (notes ? `\n  Notes: ${notes}` : "") +
      (guestList.length ? `\n  Guests: ${guestList.join(", ")}` : "") +
      "\n"
    );

    const notifyHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:12px;">
        <h2 style="margin:0 0 24px;font-size:22px;color:#111;">New Booking Request</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#555;width:140px;font-size:14px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-weight:600;font-size:14px;">${name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#555;font-size:14px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;"><a href="mailto:${email}" style="color:#111;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#555;font-size:14px;">Date &amp; Time</td><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-weight:600;font-size:14px;">${date} at ${time}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#555;font-size:14px;">About</td><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;">${about}</td></tr>
          ${notes ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#555;font-size:14px;">Notes</td><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;">${notes}</td></tr>` : ""}
          ${guestList.length > 0 ? `<tr><td style="padding:10px 0;color:#555;font-size:14px;">Guests</td><td style="padding:10px 0;font-size:14px;">${guestList.join(", ")}</td></tr>` : ""}
        </table>
      </div>
    `;

    const confirmHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#111;border-radius:12px;color:#fff;">
        <h2 style="margin:0 0 8px;font-size:22px;color:#fff;">You're booked, ${name}!</h2>
        <p style="color:#a1a1aa;margin:0 0 28px;font-size:15px;">Here's a summary of your upcoming call.</p>
        <div style="background:#1c1c1e;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
          <p style="margin:0 0 12px;font-size:14px;color:#a1a1aa;">DATE &amp; TIME</p>
          <p style="margin:0;font-size:18px;font-weight:700;color:#fff;">${date} at ${time}</p>
        </div>
        <div style="background:#1c1c1e;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:14px;color:#a1a1aa;">WHAT YOU WROTE</p>
          <p style="margin:0;font-size:14px;color:#e4e4e7;line-height:1.6;">${about}</p>
        </div>
        <p style="font-size:13px;color:#52525b;line-height:1.6;margin:0;">We'll reach out to you at <strong style="color:#a1a1aa;">${email}</strong> to confirm the final details. Looking forward to speaking with you.</p>
        <p style="font-size:13px;color:#52525b;margin:24px 0 0;">— The Pehchaan Media Team</p>
      </div>
    `;

    if (!resend) {
      console.warn("RESEND_API_KEY not set — skipping email send");
      return res.status(200).json({ message: "Booking received" });
    }

    // Send both emails in parallel — independently so one can't block the other
    const [notifyResult, confirmResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        reply_to: email,
        subject: `New booking request from ${name}`,
        html: notifyHtml,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Your booking is confirmed — Pehchaan Media",
        html: confirmHtml,
      }),
    ]);

    if (notifyResult.status === "rejected") {
      console.error("Notification email failed:", notifyResult.reason);
    }
    if (confirmResult.status === "rejected") {
      console.error("Confirmation email failed:", confirmResult.reason);
      return res.status(500).json({ message: "Failed to send your confirmation email. Please try again." });
    }

    return res.status(200).json({ message: "Booking confirmed" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
