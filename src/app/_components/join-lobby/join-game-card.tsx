"use client";

import { LogIn } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function JoinGameCard() {
  const handleJoinGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your existing handleJoinGame logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spiel beitreten</CardTitle>
        <CardDescription>
          Gib den Lobby-Code ein, um einem bestehenden Wolfwer-Spiel beizutreten
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleJoinGame}>
          <div className="space-y-2">
            <Label htmlFor="lobbyCode">Lobby-Code</Label>
            <Input
              type="text"
              id="lobbyCode"
              placeholder={'z.B. "KLXNTW"'}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled>
            <LogIn className="mr-2 h-4 w-4" /> Lobby beitreten
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
