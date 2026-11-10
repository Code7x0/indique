import "./indique.css";
import { MotionRoot } from "./motion/motion-root";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PageShell({
  children,
  headerTone = "light",
}: {
  children: React.ReactNode;
  headerTone?: "light" | "dark";
}) {
  return (
    <div className="indique min-h-screen">
      <MotionRoot />
      <SiteHeader tone={headerTone} />
      <main className="pb-[57px] md:pb-0">{children}</main>
      <SiteFooter />
    </div>
  );
}
