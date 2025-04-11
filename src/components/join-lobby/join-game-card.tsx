"use client";

import { ArrowRightToLine } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { joinLobby } from "~/data/actions/lobby";

interface JoinGameCardProps {
  currentUserId: string;
}

export function JoinGameCard(props: JoinGameCardProps) {
  const router = useRouter();
  const [lobbyCode, setLobbyCode] = useState("");

  const handleJoinGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.currentUserId) {
      await joinLobby(lobbyCode, props.currentUserId);
      router.push(`/lobby/${lobbyCode}`);
    }
  };

  return (
    <Card className="min-w-[300px]">
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
              onChange={(e) => setLobbyCode(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <span>Lobby beitreten</span>
            <ArrowRightToLine className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
