import { CreateGameCard } from "../_components/join-lobby/create-game-card";
import { JoinGameCard } from "../_components/join-lobby/join-game-card";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { SignOut } from "../_components/authentication/sign-out";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className={"flex h-dvh w-dvw flex-col items-center justify-center"}>
      <h1 className="mb-4 text-2xl font-bold">
        {session ? "hi " + session.user.username + " !" : "not logged in"}
      </h1>
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <CreateGameCard />
          <JoinGameCard />
        </div>
      </div>
      <SignOut />
    </div>
  );
}
