import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "wolfwer.net",
  description: "Das Werwolf-Spiel entwickelt von endi.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Suspense fallback={<div>Seite wird geladen...</div>}>
          {children}
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
