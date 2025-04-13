"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthButton } from "~/components/authentication/auth-button";
import { Card } from "../ui/card";

export function Navbar() {
  const pathname = usePathname();

  return (
    <Card className="shadow-shadow-nav fixed top-2 left-1/2 z-50 m-2 w-full max-w-[86%] -translate-x-1/2 rounded-none border-[3px] bg-[rgb(253,224,71)] p-4 py-2">
      <div className="flex h-14 w-full items-center justify-between">
        <div className="mr-4 flex">
          <Link
            href="/"
            className={`mr-10 hidden sm:inline-block ${pathname === "/" ? "font-bold" : ""}`}
          >
            <span className="text-lg">wolfwer.net</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/join"
              className={`relative text-lg font-medium transition-colors ${
                pathname === "/join"
                  ? "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-black"
                  : ""
              }`}
            >
              Spielen
            </Link>
            <Link
              href="/leaderboard"
              className={`relative text-lg font-medium transition-colors ${
                pathname === "/leaderboard"
                  ? "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-black"
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
