import { CreateGameCard } from "../../components/join-lobby/create-game-card";
import { JoinGameCard } from "../../components/join-lobby/join-game-card";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import { AuthButton } from "~/components/authentication/auth-button";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div
      className={"flex h-dvh w-dvw flex-col items-center justify-center px-4"}
    >
      <div className="flex flex-col items-start gap-4">
        <h1 className="mb-4 text-2xl font-bold">
          {session ? "hi " + session.user.username + " !" : "not logged in"}
        </h1>

        <div className="flex max-w-[460px] flex-col gap-4">
          <CreateGameCard creatorId={session.user.id} />
          <JoinGameCard currentUserId={session.user.id} />
        </div>
        <AuthButton action="signOut" label="Abmelden" />
        <p className="mt-4 flex items-center gap-2">
          <Info /> this page is work in progress (wip)
        </p>
      </div>
    </div>
  );
}
