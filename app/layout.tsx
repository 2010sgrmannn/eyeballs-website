import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EYEBALLS.AI — Turn Viral Content Into Your Next Script",
  description: "AI-powered content intelligence platform. Analyze viral creators, extract winning patterns, and generate scripts in your brand voice.",
  openGraph: {
    title: "EYEBALLS.AI — Turn Viral Content Into Your Next Script",
    description: "AI-powered content intelligence platform. Analyze viral creators, extract winning patterns, and generate scripts in your brand voice.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
