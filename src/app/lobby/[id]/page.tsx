import { PlayerList } from "~/components/lobby/player-list";
import { RoomCode } from "~/components/lobby/room-code";
import { GameSettings } from "~/components/lobby/game-settings";
import { getLobby } from "~/data/actions/lobby";
import { Info } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { getUserById } from "~/data/actions/user";
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

  const defaultSettings = JSON.parse(lobbyData.settings);
  const userList = lobbyData.users;

  return (
    <div className="flex h-screen w-screen flex-col items-center gap-4 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] p-4">
      <div className="flex w-full max-w-[90%] flex-col gap-4 lg:flex-row">
        <PlayerList
          userList={userList}
          currentUser={userData}
          lobbyId={lobbyData.id}
        />

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
