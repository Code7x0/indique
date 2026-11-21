"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  eventBudgetRanges,
  eventLocationTypes,
  eventServiceOptions,
  eventTypes,
} from "./content";

type FieldErrors = Partial<Record<string, string>>;

type FormState = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  dateFlexible: boolean;
  eventTime: string;
  guestCount: string;
  locationType: string;
  venue: string;
  services: string[];
  budget: string;
  message: string;
  consent: boolean;
  website: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  dateFlexible: false,
  eventTime: "",
  guestCount: "",
  locationType: "",
  venue: "",
  services: [],
  budget: "",
  message: "",
  consent: false,
  website: "",
};

function fieldClass(hasError: boolean): string {
  return `w-full rounded-[3px] border bg-transparent px-3 py-3 text-[14px] outline-none ${
    hasError
      ? "border-red-700/70 focus:border-red-700"
      : "border-[var(--ap-ink)]/20 focus:border-[var(--ap-ink)]"
  }`;
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function EventsEnquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const venueRequired = form.locationType === "At Another Venue";
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function toggleService(option: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(option)
        ? prev.services.filter((s) => s !== option)
        : [...prev.services, option],
    }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.phone.trim() || !isValidPhone(form.phone)) {
      next.phone = "Please enter a valid mobile number.";
    }
    if (!form.email.trim() || !isValidEmail(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.eventType) next.eventType = "Please select an event type.";
    if (!form.dateFlexible && !form.eventDate) {
      next.eventDate = "Please choose a date, or mark the date as flexible.";
    }
    const guests = Number(form.guestCount);
    if (!Number.isFinite(guests) || guests < 1) {
      next.guestCount = "Please enter a valid number of guests.";
    }
    if (!form.locationType) {
      next.locationType = "Please select an event location.";
    }
    if (venueRequired && !form.venue.trim()) {
      next.venue = "Please share the venue, city or area.";
    }
    if (!form.consent) {
      next.consent = "Please agree to be contacted about your enquiry.";
    }
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/events-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "event_catering_enquiry",
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          eventType: form.eventType,
          eventDate: form.dateFlexible ? "" : form.eventDate,
          dateFlexible: form.dateFlexible,
          eventTime: form.eventTime,
          guestCount: Number(form.guestCount),
          locationType: form.locationType,
          venue: form.venue.trim(),
          services: form.services,
          budget: form.budget,
          message: form.message.trim(),
          consent: form.consent,
          website: form.website,
        }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        errors?: FieldErrors;
      };

      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(
          data.error ||
            "Unable to send your enquiry right now. Please try again.",
        );
        setStatus("error");
        return;
      }

      setForm(initialState);
      setErrors({});
      setStatus("success");
    } catch {
      setServerError(
        "Unable to send your enquiry right now. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[3px] border border-[var(--ap-ink)]/15 bg-[var(--ap-cream)] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ap-gold)]">
          Enquiry received
        </p>
        <h3 className="ap-display mt-3 text-[clamp(28px,4vw,40px)]">
          Your enquiry has been received.
        </h3>
        <p className="mt-4 max-w-[460px] text-[14px] leading-relaxed opacity-85">
          Thank you for considering INDIQUE. Our team will be in touch soon to
          discuss your plans.
        </p>
        <button
          type="button"
          className="ap-button ap-button--dark mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      id="event-enquiry"
      className="relative rounded-[3px] border border-[var(--ap-ink)]/15 bg-[var(--ap-cream)] p-6 md:p-8"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="space-y-8">
        <section>
          <p className="mb-4 text-[11px] uppercase tracking-[0.16em] opacity-60">
            Personal Details
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-[12px] sm:col-span-2">
              <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
                Full Name *
              </span>
              <input
                name="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                autoComplete="name"
                className={fieldClass(Boolean(errors.name))}
              />
              {errors.name ? (
                <span className="mt-1 block text-[12px] text-red-800">
                  {errors.name}
                </span>
              ) : null}
            </label>
            <label className="block text-[12px]">
              <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
                Mobile Number *
              </span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                autoComplete="tel"
                className={fieldClass(Boolean(errors.phone))}
              />
              {errors.phone ? (
                <span className="mt-1 block text-[12px] text-red-800">
                  {errors.phone}
                </span>
              ) : null}
            </label>
            <label className="block text-[12px]">
              <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
                Email Address *
              </span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                autoComplete="email"
                className={fieldClass(Boolean(errors.email))}
              />
              {errors.email ? (
                <span className="mt-1 block text-[12px] text-red-800">
                  {errors.email}
                </span>
              ) : null}
            </label>
          </div>
        </section>

        <section>
          <p className="mb-4 text-[11px] uppercase tracking-[0.16em] opacity-60">
            Event Details
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-[12px] sm:col-span-2">
              <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
                Event Type *
              </span>
              <select
                name="eventType"
                value={form.eventType}
                onChange={(e) => update("eventType", e.target.value)}
                className={fieldClass(Boolean(errors.eventType))}
              >
                <option value="">Select an event type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.eventType ? (
                <span className="mt-1 block text-[12px] text-red-800">
                  {errors.eventType}
                </span>
              ) : null}
            </label>

            <label className="block text-[12px]">
              <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
                Preferred Event Date *
              </span>
              <input
                name="eventDate"
                type="date"
                min={minDate}
                value={form.eventDate}
                disabled={form.dateFlexible}
                onChange={(e) => update("eventDate", e.target.value)}
                className={fieldClass(Boolean(errors.eventDate))}
              />
              <label className="mt-2 flex items-center gap-2 text-[12px] normal-case tracking-normal opacity-80">
                <input
                  type="checkbox"
                  checked={form.dateFlexible}
                  onChange={(e) => {
                    update("dateFlexible", e.target.checked);
                    if (e.target.checked) update("eventDate", "");
                  }}
                />
                Date is flexible / not decided yet
              </label>
              {errors.eventDate ? (
                <span className="mt-1 block text-[12px] text-red-800">
                  {errors.eventDate}
                </span>
              ) : null}
            </label>

            <label className="block text-[12px]">
              <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
                Preferred Time
              </span>
              <input
                name="eventTime"
                type="time"
                value={form.eventTime}
                onChange={(e) => update("eventTime", e.target.value)}
                className={fieldClass(false)}
              />
            </label>

            <label className="block text-[12px]">
              <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
                Number of Guests *
              </span>
              <input
                name="guestCount"
                type="number"
                min={1}
                value={form.guestCount}
                onChange={(e) => update("guestCount", e.target.value)}
                className={fieldClass(Boolean(errors.guestCount))}
              />
              {errors.guestCount ? (
                <span className="mt-1 block text-[12px] text-red-800">
                  {errors.guestCount}
                </span>
              ) : null}
            </label>

            <label className="block text-[12px]">
              <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
                Event Location *
              </span>
              <select
                name="locationType"
                value={form.locationType}
                onChange={(e) => update("locationType", e.target.value)}
                className={fieldClass(Boolean(errors.locationType))}
              >
                <option value="">Select a location</option>
                {eventLocationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.locationType ? (
                <span className="mt-1 block text-[12px] text-red-800">
                  {errors.locationType}
                </span>
              ) : null}
            </label>

            {form.locationType &&
            form.locationType !== "Location Not Decided Yet" ? (
              <label className="block text-[12px] sm:col-span-2">
                <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
                  {venueRequired
                    ? "Event Venue / City / Area *"
                    : "Additional Location Details"}
                </span>
                <input
                  name="venue"
                  value={form.venue}
                  onChange={(e) => update("venue", e.target.value)}
                  placeholder={
                    venueRequired
                      ? "Venue name, city or area"
                      : "Any notes about seating, room or timing"
                  }
                  className={fieldClass(Boolean(errors.venue))}
                />
                {errors.venue ? (
                  <span className="mt-1 block text-[12px] text-red-800">
                    {errors.venue}
                  </span>
                ) : null}
              </label>
            ) : null}
          </div>
        </section>

        <section>
          <p className="mb-4 text-[11px] uppercase tracking-[0.16em] opacity-60">
            Additional Information
          </p>
          <fieldset>
            <legend className="mb-3 text-[12px] uppercase tracking-[0.12em] opacity-70">
              Services Required
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {eventServiceOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-[13px] opacity-90"
                >
                  <input
                    type="checkbox"
                    checked={form.services.includes(option)}
                    onChange={() => toggleService(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-4 block text-[12px]">
            <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
              Estimated Budget
            </span>
            <select
              name="budget"
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={fieldClass(false)}
            >
              <option value="">Select a range (optional)</option>
              {eventBudgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-4 block text-[12px]">
            <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
              Tell Us More
            </span>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Tell us a little about your occasion, preferences or anything else we should know..."
              className={fieldClass(false)}
            />
          </label>

          <label className="mt-4 flex items-start gap-3 text-[13px] leading-relaxed">
            <input
              type="checkbox"
              className="mt-1"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
            />
            <span>
              I agree to be contacted by INDIQUE regarding my enquiry.
              {errors.consent ? (
                <span className="mt-1 block text-[12px] text-red-800">
                  {errors.consent}
                </span>
              ) : null}
            </span>
          </label>
        </section>
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        className="ap-button ap-button--dark mt-8 disabled:cursor-wait disabled:opacity-60"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send Event Enquiry"}
      </button>

      {serverError ? (
        <p className="mt-4 text-[13px] leading-relaxed text-red-800">
          {serverError}
        </p>
      ) : null}

      <p className="mt-4 max-w-[520px] text-[13px] leading-relaxed opacity-70">
        Thank you for considering INDIQUE. Our team will review your enquiry and
        get in touch to discuss the details.
      </p>
    </form>
  );
}
