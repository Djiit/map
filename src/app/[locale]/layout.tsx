import "@/app/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Tilt_Warp } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const APP_NAME = "Map";
const APP_DEFAULT_TITLE = "Map";
const APP_TITLE_TEMPLATE = "%s - Map";
const APP_DESCRIPTION = "Best Map in the world!";

const tiltWarp = Tilt_Warp({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export const revalidate = 3600;

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <html lang={locale} dir="ltr" className={tiltWarp.className}>
        <body className="font-tilt-warp">
          <div className="h-full flex flex-col">
            <Header />
            <div className="h-full">{children}</div>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
