import type { Metadata } from "next";
import { EventsCateringPage } from "@/components/sites/indique/events-catering-page";

export const metadata: Metadata = {
  title: "Events & Catering — INDIQUE",
  description:
    "Plan private celebrations, group gatherings and catering enquiries with INDIQUE. All of India. Around One Table.",
};

export default function Page() {
  return <EventsCateringPage />;
}
