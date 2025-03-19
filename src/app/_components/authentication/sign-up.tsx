import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import Link from "next/link";
import { signUp } from "../../_actions/auth";
import { SubmitButton } from "./submit-button";
export function SignUp() {
  return (
    <Card className="z-50 min-w-96 max-w-md rounded-none">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Registrieren</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Erstelle einen neuen wolfwer Account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signUp}>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="first-name">Benutzername</Label>
              <Input
                id="first-name"
                placeholder="endidi"
                required
                name="username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="endidi@example.com"
                required
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                name="password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Passwort bestätigen</Label>
              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                autoComplete="new-password"
              />
            </div>

            <SubmitButton label="Account erstellen" />
          </div>
        </form>
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
