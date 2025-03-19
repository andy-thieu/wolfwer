"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
export function SignOut() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  return (
    <Button
      className="absolute right-4 top-4 w-[100px]"
      disabled={pending}
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onRequest: () => {
              setPending(true);
            },
            onSuccess: () => {
              router.push("/");
            },
          },
        })
      }
    >
      {pending ? <Loader2 size={16} className="animate-spin" /> : "Abmelden"}
    </Button>
  );
}
