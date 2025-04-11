import { CreateGameCard } from "../../../components/join-lobby/create-game-card";
import { JoinGameCard } from "../../../components/join-lobby/join-game-card";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div
      className={
        "flex h-dvh w-dvw flex-col items-center justify-center bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] px-4"
      }
    >
      <div className="flex flex-col items-start gap-4">
        <h1 className="mb-4 text-2xl font-bold">
          {session ? "hi " + session.user.username + " !" : "not logged in"}
        </h1>

        <div className="flex flex-col gap-4">
          <CreateGameCard creatorId={session.user.id} />
          <JoinGameCard currentUserId={session.user.id} />
        </div>
      </div>
    </div>
  );
}
