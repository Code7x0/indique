import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INDIQUE — All of India. One Plate.",
  description:
    "A contemporary Indian restaurant & bar. A little bit of everywhere. A whole lot of India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
