import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "~/components/ui/sonner";
import { Navbar } from "~/components/layout/navbar";

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
        <Navbar />
        <main className="mt-14">
          <Suspense fallback={<div>Seite wird geladen...</div>}>
            {children}
          </Suspense>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
