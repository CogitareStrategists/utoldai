import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UToldAI - AI Teams",
  description: "AI Teams that organizations rely on to achieve business outcomes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
