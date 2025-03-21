"use client";

import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function CreateGameCard() {
  const handleCreateGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your existing handleCreateGame logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Neue Lobby erstellen</CardTitle>
        <CardDescription>Starte ein neues Wolfwer-Spiel</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleCreateGame}>
          <Button type="submit" className="w-full" disabled>
            <Plus className="mr-2 h-4 w-4" /> <span>Spiel erstellen</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
