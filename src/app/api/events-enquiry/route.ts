import { NextResponse } from "next/server";

export const runtime = "nodejs";

type EnquiryPayload = {
  type?: string;
  name?: string;
  phone?: string;
  email?: string;
  eventType?: string;
  eventDate?: string;
  dateFlexible?: boolean;
  eventTime?: string;
  guestCount?: number | string;
  locationType?: string;
  venue?: string;
  services?: string[];
  budget?: string;
  message?: string;
  consent?: boolean;
  website?: string; // honeypot
};

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, "");
}

function isValidPhone(value: string): boolean {
  const digits = normalizePhone(value).replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function buildEmailBody(data: Required<
  Pick<
    EnquiryPayload,
    | "name"
    | "phone"
    | "email"
    | "eventType"
    | "locationType"
    | "consent"
  >
> &
  EnquiryPayload): string {
  const lines = [
    "New INDIQUE Events & Catering enquiry",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Event type: ${data.eventType}`,
    `Event date: ${data.dateFlexible ? "Flexible / not decided" : data.eventDate || "—"}`,
    `Preferred time: ${data.eventTime || "—"}`,
    `Guest count: ${data.guestCount}`,
    `Location: ${data.locationType}`,
    `Venue / area: ${data.venue || "—"}`,
    `Services: ${(data.services || []).join(", ") || "—"}`,
    `Budget: ${data.budget || "—"}`,
    "",
    "Message:",
    data.message || "—",
  ];
  return lines.join("\n");
}

async function notifyTeam(data: EnquiryPayload): Promise<{ ok: boolean; reason?: string }> {
  const to = process.env.EVENTS_ENQUIRY_TO_EMAIL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const webhook = process.env.EVENTS_ENQUIRY_WEBHOOK_URL?.trim();
  const from =
    process.env.EVENTS_ENQUIRY_FROM_EMAIL?.trim() ||
    "INDIQUE Enquiries <onboarding@resend.dev>";

  if (!to && !webhook) {
    return {
      ok: false,
      reason:
        "Enquiry delivery is not configured. Set EVENTS_ENQUIRY_TO_EMAIL (with RESEND_API_KEY) and/or EVENTS_ENQUIRY_WEBHOOK_URL.",
    };
  }

  const body = buildEmailBody({
    name: data.name!,
    phone: data.phone!,
    email: data.email!,
    eventType: data.eventType!,
    locationType: data.locationType!,
    consent: true,
    ...data,
  });

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "event_catering_enquiry",
        ...data,
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      return { ok: false, reason: `Webhook failed (${res.status}).` };
    }
  }

  if (to) {
    if (!resendKey) {
      return {
        ok: false,
        reason:
          "EVENTS_ENQUIRY_TO_EMAIL is set but RESEND_API_KEY is missing.",
      };
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Events enquiry — ${data.name} (${data.eventType})`,
        text: body,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return {
        ok: false,
        reason: `Email provider error (${res.status}): ${detail.slice(0, 180)}`,
      };
    }

    const confirmCustomer = process.env.EVENTS_ENQUIRY_CONFIRM_CUSTOMER === "true";
    if (confirmCustomer && data.email) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [data.email],
          subject: "We received your INDIQUE enquiry",
          text: [
            `Hi ${data.name},`,
            "",
            "Your enquiry has been received.",
            "",
            "Thank you for considering INDIQUE. Our team will be in touch soon to discuss your plans.",
            "",
            "— INDIQUE",
          ].join("\n"),
        }),
      });
    }
  }

  return { ok: true };
}

export async function POST(request: Request) {
  let payload: EnquiryPayload;

  try {
    payload = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot — silently accept bots without notifying the team
  if (isNonEmpty(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};

  if (!isNonEmpty(payload.name)) errors.name = "Please enter your full name.";
  if (!isNonEmpty(payload.phone) || !isValidPhone(payload.phone)) {
    errors.phone = "Please enter a valid mobile number.";
  }
  if (!isNonEmpty(payload.email) || !isValidEmail(payload.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!isNonEmpty(payload.eventType)) {
    errors.eventType = "Please select an event type.";
  }

  const dateFlexible = Boolean(payload.dateFlexible);
  if (!dateFlexible && !isNonEmpty(payload.eventDate)) {
    errors.eventDate = "Please choose a date, or mark the date as flexible.";
  }

  const guestCount = Number(payload.guestCount);
  if (!Number.isFinite(guestCount) || guestCount < 1 || guestCount > 5000) {
    errors.guestCount = "Please enter a valid number of guests.";
  }

  if (!isNonEmpty(payload.locationType)) {
    errors.locationType = "Please select an event location.";
  }

  if (
    payload.locationType === "At Another Venue" &&
    !isNonEmpty(payload.venue)
  ) {
    errors.venue = "Please share the venue, city or area.";
  }

  if (!payload.consent) {
    errors.consent = "Please agree to be contacted about your enquiry.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  try {
    const result = await notifyTeam({
      ...payload,
      type: "event_catering_enquiry",
      guestCount,
      dateFlexible,
      services: Array.isArray(payload.services) ? payload.services : [],
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            result.reason ||
            "Unable to deliver your enquiry right now. Please try again later.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong while sending your enquiry.",
      },
      { status: 500 },
    );
  }
}
