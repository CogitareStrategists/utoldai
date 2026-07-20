import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "UToldAI - AI Teams",
  description: "AI Teams that organizations rely on to achieve business outcomes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17958950446"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-17958950446');
</script></body></html>;
}
