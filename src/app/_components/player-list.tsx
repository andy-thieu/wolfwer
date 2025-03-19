"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Users, X } from "lucide-react";
import { mockPlayers } from "~/lib/mock-data";

interface Player {
  id: string;
  name: string;
  isCreator: boolean;
}

interface PlayerListProps {
  currentPlayerId: string;
}

export function PlayerList({ currentPlayerId }: PlayerListProps) {
  const [players, setPlayers] = useState<Player[]>(mockPlayers);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prevPlayers) => {
        if (prevPlayers.length < 10) {
          const newPlayerId = (prevPlayers.length + 1).toString();
          return [
            ...prevPlayers,
            {
              id: newPlayerId,
              name: `Spieler ${newPlayerId}`,
              isCreator: false,
            },
          ];
        }
        return prevPlayers;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const removePlayer = (playerId: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== playerId),
    );
  };

  const isCreator = players.find(
    (player) => player.id === currentPlayerId,
  )?.isCreator;

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
          {players.map((player) => (
            <li
              key={player.id}
              className="flex items-center justify-between rounded bg-secondary p-2"
            >
              <span>
                {player.name} {player.isCreator ? "(Ersteller)" : ""}
              </span>
              {isCreator && !player.isCreator && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePlayer(player.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
