"use client";

import { useState } from "react";
import { PlayerList } from "~/app/components/player-list";
import { RoomCode } from "~/app/components/room-code";
import { GameSettings } from "~/app/components/game-settings";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [currentPlayerId] = useState("1");

  const searchParams = useSearchParams();

  const roomCode = searchParams.get("code");

  if (!roomCode) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Wolfwer Lobby</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <PlayerList currentPlayerId={currentPlayerId} />

        <div className="w-full space-y-6 lg:w-2/3">
          <RoomCode roomCode={roomCode} />
          <GameSettings isCreator={true} />
        </div>
      </div>
    </div>
  );
}
