import "~/styles/globals.css";
import { Space_Grotesk } from "next/font/google";
import { type Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "~/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "wolfwer.net",
  description: "Das Werwolf-Spiel entwickelt von endi.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body>
        <main>
          <Suspense fallback={<div>Seite wird geladen...</div>}>
            {children}
          </Suspense>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
