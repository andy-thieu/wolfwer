"use client";

import { Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

type SubmitButtonProps = SignInButtonProps | SignUpButtonProps;

const errorMessages: Record<string, string> = {
  INVALID_USERNAME_OR_PASSWORD: "Benutzername oder Passwort ist falsch",
  USER_ALREADY_EXISTS: "Diese Email wird bereits verwendet",
  USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER:
    "Benutzername wird bereits verwendet, sorry :(",
  INVALID_EMAIL: "Ungültige Email",
};

export function SubmitButton(props: SubmitButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    if (props.action === "signIn") {
      setIsLoading(true);
      try {
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
      } catch (error) {
        console.error(error);
        toast.error("Ein Fehler ist aufgetreten");
        setIsLoading(false);
      }
    }
  };

  const signUp = async () => {
    if (props.action === "signUp") {
      if (props.userData.password !== props.userData.confirmPassword) {
        toast.error("Passwörter stimmen nicht überein");
        return;
      }
      setIsLoading(true);
      try {
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
      } catch (error) {
        console.error(error);
        toast.error("Ein Fehler ist aufgetreten");
        setIsLoading(false);
      }
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (props.action === "signIn") {
      await signIn();
    } else {
      await signUp();
    }
  };

  return (
    <Button
      type="submit"
      className="w-full"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {props.label}
    </Button>
  );
}
