import { PlayerList } from "~/components/lobby/player-list";
import { RoomCode } from "~/components/lobby/room-code";
import { GameSettings } from "~/components/lobby/game-settings";
import Header from "~/components/lobby/header";
import { getLobby } from "~/server-actions/lobby";
import { Info } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { getUserById } from "~/server-actions/user";
import { tryCatch } from "~/lib/try-catch";

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

  const { data: lobbyData, error: lobbyError } = await tryCatch(getLobby(id));
  const { data: userData, error: userError } = await tryCatch(
    getUserById(session.user.id),
  );

  if (lobbyError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-center text-2xl">
        <Info className="mr-4 h-6 w-6" />
        <p>Lobby nicht gefunden</p>
      </div>
    );
  }
  if (userError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-center text-2xl">
        <Info className="mr-4 h-6 w-6" />
        <p>Benutzer nicht gefunden</p>
      </div>
    );
  }

  try {
  } catch (e) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-center text-2xl">
        <Info className="mr-4 h-6 w-6" />
        <p>Lobby nicht gefunden</p>
      </div>
    );
  }

  const defaultSettings = JSON.parse(lobbyData.settings) as GameSettings;
  const userList = lobbyData.users;

  return (
    <div className="flex h-screen w-screen flex-col gap-4 p-4">
      <Header />

      <div className="flex flex-col gap-4 lg:flex-row">
        <PlayerList userList={userList} currentUser={userData} />

        <div className="w-full space-y-4 lg:w-2/3">
          <RoomCode roomCode={id} />
          <GameSettings
            isCreator={userData.lobbyHost && userData.lobbyId === lobbyData.id}
            defaultSettings={defaultSettings}
          />
        </div>
      </div>
    </div>
  );
}
