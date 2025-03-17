"use client";

import { Button } from "~/components/ui/button";
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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const errorMessages: Record<string, string> = {
  INVALID_USERNAME_OR_PASSWORD: "Benutzername oder Passwort ist falsch",
};

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Card className="min-w-96 max-w-md rounded-none">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Anmelden</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Melde dich mit deinem wolfwer Account an
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Benutzername</Label>
            <Input
              id="username"
              type="username"
              placeholder="endidi"
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Passwort</Label>
            </div>

            <Input
              id="password"
              type="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || username === "" || password === ""}
            onClick={async () => {
              await authClient.signIn.username({
                username,
                password,
                fetchOptions: {
                  onRequest: () => {
                    setLoading(true);
                  },
                  onResponse: () => {
                    setLoading(false);
                  },
                  onError: (ctx) => {
                    const errorCode = ctx.error
                      .code as keyof typeof errorMessages;
                    toast.error(errorMessages[errorCode]);
                  },
                  onSuccess: async () => {
                    router.push("/join");
                  },
                },
              });
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Anmelden"
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Gesichert mit{" "}
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
