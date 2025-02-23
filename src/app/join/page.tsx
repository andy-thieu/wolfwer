"use client";

import type React from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Plus, LogIn } from "lucide-react";

function generateGameCode(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

export default function Page() {
  return (
    <div className={"flex h-dvh w-dvw items-center justify-center"}>
      <div className="p-4">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Neue Lobby erstellen</CardTitle>
              <CardDescription>Starte ein neues Wolfwer-Spiel</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="createUsername">Benutzername</Label>
                  <Input type="text" id="createUsername" required />
                </div>
                <Button type="submit" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Spiel erstellen
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spiel beitreten</CardTitle>
              <CardDescription>
                Gib den Lobby-Code ein, um einem bestehenden Wolfwer-Spiel
                beizutreten
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="joinUsername">Benutzername</Label>
                  <Input type="text" id="joinUsername" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lobbyCode">Lobby-Code</Label>
                  <Input
                    type="text"
                    id="lobbyCode"
                    placeholder={'z.B. "KLXNTW"'}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" /> Lobby beitreten
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
