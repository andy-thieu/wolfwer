import { PlayerList } from "~/_components/lobby/player-list";
import { RoomCode } from "~/_components/lobby/room-code";
import { GameSettings } from "~/_components/lobby/game-settings";
import Header from "~/_components/lobby/header";
import { getLobby } from "~/_actions/lobby";
import { Info } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface GameSettings {
  roles: {
    name: string;
    description: string;
    count: number;
    maxCount: number;
  }[];
  seerCanSeeRole: string;
  revealRoleOnDeath: boolean;
}

export default async function Page({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const { id } = await params;

  if (!id) return <div>Loading...</div>;

  const lobbyData = await getLobby(id);

  if (!lobbyData[0])
    return (
      <div className="flex h-screen w-screen items-center justify-center text-center text-2xl">
        <Info className="mr-4 h-6 w-6" />
        <p>Lobby nicht gefunden</p>
      </div>
    );

  const defaultSettings = JSON.parse(lobbyData[0].settings) as GameSettings;

  return (
    <main className="container flex h-full h-screen w-full w-screen flex-col gap-4 p-4">
      <Header />

      <div className="flex flex-col gap-4 lg:flex-row">
        <PlayerList
          lobbyData={lobbyData}
          currentUser={session.user.username ?? ""}
        />

        <div className="w-full space-y-4 lg:w-2/3">
          <RoomCode roomCode={id} />
          <GameSettings isCreator={true} defaultSettings={defaultSettings} />
        </div>
      </div>
    </main>
  );
}
