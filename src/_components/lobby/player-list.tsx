"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Users, X } from "lucide-react";
import { clsx } from "clsx";
import { UserData } from "~/_actions/user";

interface Player {
  id: string;
  username: string;
  lobbyHost: boolean;
}

interface PlayerListProps {
  userList: Player[];
  currentUser: UserData;
}

export function PlayerList(props: PlayerListProps) {
  const [players, setPlayers] = useState<Player[]>(props.userList);

  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Spieler ({players.length}/10)</span>
          <Users className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {players.map((player, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded bg-secondary p-2"
            >
              <div className="flex items-center gap-2">
                <p
                  className={clsx({
                    "text-blue-400": props.currentUser.id === player.id,
                  })}
                >
                  {player.username}
                </p>
                {player.lobbyHost ? (
                  <p className="text-xs text-muted-foreground">Ersteller</p>
                ) : null}
              </div>
              {props.currentUser.id !== player.id &&
              props.currentUser.lobbyHost ? (
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
