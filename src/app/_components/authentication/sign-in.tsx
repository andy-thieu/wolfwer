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
import { signIn } from "~/app/_actions/auth";
import { SubmitButton } from "./submit-button";
export default function SignIn() {
  return (
    <Card className="min-w-96 max-w-md rounded-none">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Anmelden</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Melde dich mit deinem wolfwer Account an
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signIn}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                name="username"
                type="username"
                placeholder="endidi"
                required
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
              />
            </div>

            <SubmitButton label="Anmelden" />
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
