"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
export function SignOut() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  return (
    <Button
      className="absolute right-4 top-4 w-fit p-4"
      disabled={pending}
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onRequest: () => {
              setPending(true);
            },
            onSuccess: () => {
              toast.success("Erfolgreich abgemeldet");
              router.push("/");
              setPending(false);
            },
            onError: () => {
              toast.error("Fehler beim Abmelden");
              setPending(false);
            },
          },
        })
      }
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut />}
      Abmelden
    </Button>
  );
}
