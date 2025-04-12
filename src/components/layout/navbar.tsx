"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthButton } from "~/components/authentication/auth-button";
import { Card } from "../ui/card";

export function Navbar() {
  const pathname = usePathname();

  return (
    <Card className="shadow-shadow-nav fixed top-0 left-1/2 z-50 m-2 w-full max-w-[80%] -translate-x-1/2 rounded-none border-[3px] bg-[rgb(253,224,71)] p-4 py-2">
      <div className="flex h-14 w-full items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="mr-10 hidden sm:inline-block">
            <span className="font-medium">wolfwer.net</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/join"
              className={`hover:text-primary relative text-sm font-medium transition-colors ${
                pathname === "/join"
                  ? "after:bg-primary after:absolute after:bottom-[-20px] after:left-0 after:h-[2px] after:w-full"
                  : ""
              }`}
            >
              Spielen
            </Link>
            <Link
              href="/leaderboard"
              className={`hover:text-primary relative text-sm font-medium transition-colors ${
                pathname === "/leaderboard"
                  ? "after:bg-primary after:absolute after:bottom-[-20px] after:left-0 after:h-[2px] after:w-full"
                  : ""
              }`}
            >
              Leaderboard
            </Link>
          </div>
        </div>
        <AuthButton action="signOut" label="Abmelden" />
      </div>
    </Card>
  );
}
