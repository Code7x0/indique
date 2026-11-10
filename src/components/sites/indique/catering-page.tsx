import { redirect } from "next/navigation";

/** Legacy route shim — redirects to menu. */
export function CateringPage() {
  redirect("/menu");
}
