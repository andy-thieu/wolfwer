"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthButton } from "~/components/authentication/auth-button";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="mr-10">
            <span className="hidden font-medium sm:inline-block">
              wolfwer.net
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/join"
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/join"
                  ? "after:absolute after:bottom-[-20px] after:left-0 after:h-[2px] after:w-full after:bg-primary"
                  : ""
              }`}
            >
              Spielen
            </Link>
            <Link
              href="/leaderboard"
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/leaderboard"
                  ? "after:absolute after:bottom-[-20px] after:left-0 after:h-[2px] after:w-full after:bg-primary"
                  : ""
              }`}
            >
              Leaderboard
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-8 md:justify-end">
          <AuthButton action="signOut" label="Abmelden" />
        </div>
      </div>
    </nav>
  );
}
