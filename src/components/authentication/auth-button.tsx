"use client";

import { Loader2, LogOut } from "lucide-react";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn } from "lucide-react";
import clsx from "clsx";

interface SignInUserData {
  username: string;
  password: string;
}

interface SignUpUserData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface SubmitButtonBaseProps {
  label: string;
}

interface SignInButtonProps extends SubmitButtonBaseProps {
  action: "signIn";
  userData: SignInUserData;
}

interface SignUpButtonProps extends SubmitButtonBaseProps {
  action: "signUp";
  userData: SignUpUserData;
}

interface SignOutButtonProps extends SubmitButtonBaseProps {
  action: "signOut";
}

type SubmitButtonProps =
  | SignInButtonProps
  | SignUpButtonProps
  | SignOutButtonProps;

const errorMessages: Record<string, string> = {
  INVALID_USERNAME_OR_PASSWORD: "Benutzername oder Passwort ist falsch",
  USER_ALREADY_EXISTS: "Diese Email wird bereits verwendet",
  USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER:
    "Benutzername wird bereits verwendet, sorry :(",
  INVALID_EMAIL: "Ungültige Email",
};

export function AuthButton(props: SubmitButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (props.action === "signIn") {
      setIsLoading(true);
      await authClient.signIn.username(
        {
          username: props.userData.username,
          password: props.userData.password,
        },
        {
          onSuccess: () => {
            toast.success("Erfolgreich angemeldet");
            router.push("/join");
          },
          onError: (ctx) => {
            const errorMessage =
              errorMessages[ctx.error.code as keyof typeof errorMessages] ??
              "Anmeldung fehlgeschlagen";
            toast.error(errorMessage);
            setIsLoading(false);
          },
        },
      );
    } else if (props.action === "signUp") {
      if (props.userData.password !== props.userData.confirmPassword) {
        toast.error("Passwörter stimmen nicht überein");
        return;
      }
      setIsLoading(true);
      await authClient.signUp.email(
        {
          name: props.userData.username,
          email: props.userData.email,
          password: props.userData.password,
          username: props.userData.username,
        },
        {
          onSuccess: () => {
            toast.success("Erfolgreich registriert");
            router.push("/join");
          },
          onError: (ctx) => {
            console.log(ctx.error);
            const errorMessage =
              errorMessages[ctx.error.code as keyof typeof errorMessages] ??
              "Registrierung fehlgeschlagen";
            toast.error(errorMessage);
            setIsLoading(false);
          },
        },
      );
    } else {
      setIsLoading(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Erfolgreich abgemeldet");
            router.push("/");
          },
          onError: () => {
            toast.error("Fehler beim Abmelden");
            setIsLoading(false);
          },
        },
      });
    }
  };

  return (
    <Button
      type="submit"
      className={clsx({
        "w-full": props.action !== "signOut",
      })}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : props.action !== "signOut" ? (
        <LogIn />
      ) : (
        <LogOut />
      )}
      {props.label}
    </Button>
  );
}
