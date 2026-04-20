import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Resend } from "resend";
import { bookingSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = "infopehchaanmedia@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/booking", async (req, res) => {
    const result = bookingSubmissionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }

    const { name, email, about, notes, guests, date, time } = result.data;

    const guestList = guests
      ? guests.split(",").map((g) => g.trim()).filter(Boolean)
      : [];

    try {
      // Notify Pehchaan Media
      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `New booking request from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:12px;">
            <h2 style="margin:0 0 24px;font-size:22px;color:#111;">New Booking Request</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#555;width:140px;font-size:14px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-weight:600;font-size:14px;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#555;font-size:14px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;"><a href="mailto:${email}" style="color:#111;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#555;font-size:14px;">Date & Time</td><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-weight:600;font-size:14px;">${date} at ${time}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#555;font-size:14px;">About</td><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;">${about}</td></tr>
              ${notes ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#555;font-size:14px;">Notes</td><td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;">${notes}</td></tr>` : ""}
              ${guestList.length > 0 ? `<tr><td style="padding:10px 0;color:#555;font-size:14px;">Guests</td><td style="padding:10px 0;font-size:14px;">${guestList.join(", ")}</td></tr>` : ""}
            </table>
          </div>
        `,
      });

      // Confirmation to the person who booked
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Your booking is confirmed — Pehchaan Media",
        html: `
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
        `,
      });

      return res.status(200).json({ message: "Booking confirmed" });
    } catch (err: any) {
      console.error("Email send error:", err);
      return res.status(500).json({ message: "Failed to send confirmation email. Please try again." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
