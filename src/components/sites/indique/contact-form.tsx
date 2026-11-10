"use client";

export function ContactForm() {
  return (
    <form
      className="rounded-[3px] border border-[var(--ap-ink)]/15 bg-[var(--ap-cream)] p-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-4">
        {[
          { id: "name", label: "Name", type: "text" },
          { id: "email", label: "Email", type: "email" },
          { id: "phone", label: "Phone", type: "tel" },
          { id: "subject", label: "Subject", type: "text" },
        ].map((field) => (
          <label key={field.id} className="block text-[12px]">
            <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
              {field.label}
            </span>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              className="w-full rounded-[3px] border border-[var(--ap-ink)]/20 bg-transparent px-3 py-3 text-[14px] outline-none focus:border-[var(--ap-ink)]"
            />
          </label>
        ))}
        <label className="block text-[12px]">
          <span className="mb-2 block uppercase tracking-[0.12em] opacity-70">
            Message
          </span>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full rounded-[3px] border border-[var(--ap-ink)]/20 bg-transparent px-3 py-3 text-[14px] outline-none focus:border-[var(--ap-ink)]"
          />
        </label>
      </div>
      <button type="submit" className="ap-button ap-button--dark mt-6">
        Send Enquiry
      </button>
    </form>
  );
}
