"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { AuthButton } from "./auth-button";
import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Anmelden</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Melde dich mit deinem wolfwer Account an
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                name="username"
                type="username"
                placeholder="endidi"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Passwort</Label>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <AuthButton
              label="Anmelden"
              action="signIn"
              userData={{ username: username, password: password }}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Gesichert & verschlüsselt mit{" "}
            <Link
              href="https://better-auth.com"
              className="text-orange-400 underline"
              target="_blank"
            >
              <span className="dark:text-orange-200/90">better-auth.</span>
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
