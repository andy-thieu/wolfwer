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
import { createLobby } from "~/_actions/lobby";
import { redirect } from "next/navigation";

interface CreateGameCardProps {
  creatorId: string;
}

const handleCreateLobby = async (creatorId: string) => {
  const code = await createLobby({ creatorId });
  redirect(`/lobby/${code}`);
};

export function CreateGameCard(props: CreateGameCardProps) {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleCreateLobby(props.creatorId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Neue Lobby erstellen</CardTitle>
        <CardDescription>Starte ein neues Wolfwer-Spiel</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> <span>Spiel erstellen</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
