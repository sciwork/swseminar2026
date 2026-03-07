import clsx from "clsx";
import type { Viewport } from "next";
import { Inter, Yanone_Kaffeesatz } from "next/font/google";
import { Suspense } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import CookieBanner from "@/components/CookieBanner";
import Hero from "@/components/Hero";
import LocaleProvider from "@/contexts/locale";
import "./globals.css";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

const yanone = Yanone_Kaffeesatz({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-yanone-kaffeesatz",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata() {
  return {
    title: {
      default: "sciwork seminar 2026",
      template: "sciwork seminar 2026 - %s",
    },
    description: "Science, code, and open source.",
    metadataBase: process.env.SITEURL && new URL(process.env.SITEURL),
    openGraph: {
      title: "sciwork seminar 2026",
      description: "science, code, and open source.",
      url: process.env.SITEURL,
      siteName: "sciwork seminar 2026",
      images: [
        {
          url: "/sw26_seminar_meta_img.png",
          width: 1024,
          height: 1024,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "sciwork seminar 2026",
      description: "science, code, and open source.",
      images: [
        {
          url: "/sw26_seminar_meta_img.png",
          width: 1024,
          height: 1024,
        },
      ],
    },
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          sizes: "any",
        },
        {
          url: "/favicon-16x16.png",
          type: "image/png",
          sizes: "16x16",
        },
        {
          url: "/favicon-32x32.png",
          type: "image/png",
          sizes: "32x32",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "tw:relative tw:flex tw:min-h-screen tw:w-full tw:flex-col tw:overscroll-none tw:bg-white",
          inter.className,
          yanone.variable,
        )}
      >
        <LocaleProvider>
          <header className="tw:mb-4">
            <Hero />
          </header>
          <main className="tw:grow">
            <Suspense>{children}</Suspense>
          </main>
          <div id="portal" />
          <CookieBanner />
        </LocaleProvider>
      </body>
    </html>
  );
}
