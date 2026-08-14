import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "highlight.js/styles/github-dark.css";
import "./globals.css";
import { Providers } from "./providers";
import { AmbientBackground } from "@/components/AmbientBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Safaat Munazat — Frontend Developer & Creative Technologist",
    template: "%s | Safaat Munazat",
  },
  description:
    "Full-stack developer building resilient, human-centered digital ecosystems. Frontend engineering, glassmorphic design, and production-grade web applications.",
  keywords: [
    "Frontend Developer",
    "Safaat Munazat",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
  ],
  authors: [{ name: "Safaat Munazat", url: siteUrl }],
  creator: "Safaat Munazat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Safaat Munazat",
    title: "Safaat Munazat — Frontend Developer & Creative Technologist",
    description:
      "Full-stack developer building resilient, human-centered digital ecosystems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safaat Munazat — Frontend Developer & Creative Technologist",
    description:
      "Full-stack developer building resilient, human-centered digital ecosystems.",
    creator: "@miftahcoding",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen font-sans antialiased`}
      >
        <Providers>
          <AmbientBackground />
          {children}
        </Providers>
      </body>
    </html>
  );
}
