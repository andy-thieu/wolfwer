import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Wolfwer",
  description: "Das Werwolf-Spiel entwickelt von endidi. :)",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>{children}</body>
        <Toaster />
      </html>
    </Suspense>
  );
}
