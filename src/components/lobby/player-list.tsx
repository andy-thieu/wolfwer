"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Crown, LogOut, Users, X } from "lucide-react";
import { clsx } from "clsx";
import { UserData } from "~/data/actions/user";
import { pusherClient } from "~/lib/pusher-client";
import { redirect } from "next/navigation";

import { leaveLobby } from "~/data/actions/lobby";

interface Player {
  id: string;
  username: string;
  lobbyHost: boolean;
}

interface PlayerListProps {
  userList: Player[];
  currentUser: UserData;
  lobbyId: string;
}

interface PusherNewUserEvent {
  userData: Player;
}

interface PusherRemoveUserEvent {
  userId: string;
}

export function PlayerList(props: PlayerListProps) {
  const [players, setPlayers] = useState<Player[]>(props.userList);

  const leave = async () => {
    console.log("leave");
    await leaveLobby(props.currentUser.id, props.lobbyId);
    redirect("/join");
  };

  useEffect(() => {
    const channel = pusherClient.subscribe(`lobby-${props.lobbyId}`);

    channel.bind("new-user", (data: PusherNewUserEvent) => {
      if (data.userData) {
        setPlayers((prev) => {
          const playerExists = prev.some((p) => p.id === data.userData.id);
          if (playerExists) return prev;
          return [...prev, data.userData];
        });
      }
    });

    channel.bind("remove-user", (data: PusherRemoveUserEvent) => {
      setPlayers((prev) => prev.filter((player) => player.id !== data.userId));
    });

    return () => {
      pusherClient.unsubscribe(`lobby-${props.lobbyId}`);
    };
  }, [props.lobbyId]);

  return (
    <Card className="w-full p-4 lg:w-1/3">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center justify-between">
          <span>Spieler ({players.length}/10)</span>
          <Button variant="neutral" onClick={leave}>
            <span>Lobby verlassen</span>
            <LogOut className="ml-2 h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="space-y-2">
          {players.map((player, index) => (
            <Card
              key={index}
              className="flex flex-row items-center justify-between rounded bg-white p-2"
            >
              <div className="flex items-center gap-2">
                <p
                  className={clsx({
                    "text-green-700": props.currentUser.id === player.id,
                  })}
                >
                  {player.username}
                </p>
                {player.lobbyHost ? (
                  <Crown className="h-4 w-4 text-yellow-500" />
                ) : null}
              </div>
              {props.currentUser.id !== player.id &&
              props.currentUser.lobbyHost ? (
                <Button variant="neutral" className="h-8 w-8" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              ) : null}
            </Card>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
