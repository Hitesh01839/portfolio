import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Preloader from "@/components/layout/Preloader";

import ScrollOrbit from "@/components/ui/ScrollOrbit";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hitesh Ganga — Cybersecurity & Software",
    template: "%s — Hitesh Ganga",
  },
  description:
    "Portfolio of Hitesh Ganga — cybersecurity, software, systems, web security, Linux and AOSP experiments.",
  keywords: [
    "Hitesh Ganga",
    "Cybersecurity",
    "Penetration Testing",
    "Web Security",
    "Linux",
    "AOSP",
    "Software Development",
    "Next.js",
  ],
  authors: [{ name: "Hitesh Ganga" }],
  creator: "Hitesh Ganga",
  // metadataBase: new URL("https://YOUR-DOMAIN.com"),
  openGraph: {
    title: "Hitesh Ganga — Cybersecurity & Software",
    description:
      "Cybersecurity, software, systems and security experiments by Hitesh Ganga.",
    type: "website",
    locale: "en_IN",
    siteName: "Hitesh Ganga",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hitesh Ganga — Cybersecurity & Software",
    description:
      "Cybersecurity, software, systems and security experiments by Hitesh Ganga.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Cursor />
        <ScrollOrbit />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
