"use client";

const fields = [
  { id: "name", label: "Full Name", type: "text", autoComplete: "name" },
  { id: "phone", label: "Mobile Number", type: "tel", autoComplete: "tel" },
  { id: "email", label: "Email Address", type: "email", autoComplete: "email" },
  { id: "date", label: "Date", type: "date", autoComplete: "off" },
  { id: "time", label: "Preferred Time", type: "time", autoComplete: "off" },
  {
    id: "guests",
    label: "Number of Guests",
    type: "number",
    autoComplete: "off",
  },
] as const;

export function ReservationForm() {
  return (
    <form
      className="rounded-[3px] border border-[var(--ap-ink)]/15 bg-[var(--ap-cream)] p-6 md:p-8"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.id} className="block text-[12px]">
            <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
              {field.label}
            </span>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              autoComplete={field.autoComplete}
              className="w-full rounded-[3px] border border-[var(--ap-ink)]/20 bg-transparent px-3 py-3 text-[14px] outline-none focus:border-[var(--ap-ink)]"
            />
          </label>
        ))}
        <label className="block text-[12px] sm:col-span-2">
          <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
            Special Requests
          </span>
          <textarea
            id="requests"
            name="requests"
            rows={4}
            className="w-full rounded-[3px] border border-[var(--ap-ink)]/20 bg-transparent px-3 py-3 text-[14px] outline-none focus:border-[var(--ap-ink)]"
          />
        </label>
      </div>
      <button type="submit" className="ap-button ap-button--dark mt-6">
        Request a Reservation
      </button>
      <p className="mt-4 max-w-[480px] text-[13px] leading-relaxed opacity-70">
        Our team will get in touch to confirm your reservation. Your request is
        not confirmed until you receive confirmation from us.
      </p>
    </form>
  );
}
