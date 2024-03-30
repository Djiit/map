import "@/app/globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";

import Footer from "@/components/Footer";

const APP_NAME = "Map";
const APP_DEFAULT_TITLE = "My Awesome Map";
const APP_TITLE_TEMPLATE = "%s - Map";
const APP_DESCRIPTION = "Best Map in the world!";

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
const inter = Inter({ subsets: ["latin"] });

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
      <html lang={locale} dir="ltr">
        <body className={inter.className}>
          <div className="h-full flex flex-col">
            <div className="navbar bg-base-100">
              <a className="btn btn-ghost text-xl">{APP_NAME}</a>
            </div>
            <div className="h-full">{children}</div>
            <Footer />
          </div>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
