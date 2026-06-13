import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "MaxDev — Разработка сайтов, CRM, ботов и скриптов",
  description:
    "Создаем современные сайты, CRM-системы, Telegram-ботов и скрипты автоматизации. Быстрые, красивые и прибыльные решения для бизнеса.",
  keywords: [
    "разработка сайтов",
    "CRM системы",
    "Telegram боты",
    "автоматизация бизнеса",
    "веб-разработка",
    "landing page",
    "интернет-магазин",
  ],
  openGraph: {
    title: "MaxDev — Разработка сайтов, CRM, ботов и скриптов",
    description:
      "Создаем современные сайты, CRM-системы, Telegram-ботов и скрипты автоматизации.",
    type: "website",
    locale: "ru_RU",
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
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
