import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UtoldAI - AI Teams for Businesses',
  description:
    'AI teams for consultants, architects, structural engineers, CAs and service businesses. Starting at just Rs. 500/month.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
