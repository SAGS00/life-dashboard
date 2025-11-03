import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Life Dashboard - Track Your Life in One Place",
  description: "A comprehensive personal dashboard for tracking habits, tasks, health, finances, and goals. Take control of your daily life with powerful analytics and insights.",
  keywords: ["life dashboard", "habit tracker", "task manager", "finance tracker", "health tracker", "goal tracker", "productivity"],
  authors: [{ name: "Life Dashboard" }],
  creator: "Life Dashboard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://life-dashboard.vercel.app",
    title: "Life Dashboard - Track Your Life in One Place",
    description: "Track habits, tasks, health, finances, and goals in one beautiful dashboard",
    siteName: "Life Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life Dashboard - Track Your Life in One Place",
    description: "Track habits, tasks, health, finances, and goals in one beautiful dashboard",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
