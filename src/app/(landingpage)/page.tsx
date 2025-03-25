"use client";

import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginClick = () => {
    setIsLoading(true);
    router.push("/login");
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-start gap-10">
        <div className="flex max-w-[700px] flex-col gap-6">
          <h1 className="text-3xl font-medium">wolfwer.net</h1>
          <div className="flex flex-col">
            <p>hey! Cool, dass du hier gelandet bist :)</p>
            <p>
              Spiele das berühmte Werwolf-Spiel online mit deinen Freunden und
              sichere dir ein Platz in der Rangliste.
            </p>
          </div>
        </div>
        <Button onClick={handleLoginClick} disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
          Kostenlos Anmelden
        </Button>
      </div>
    </div>
  );
}
