import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { user } from "~/server/db/schema";

export type UserData = {
  id: string;
  username: string;
  lobbyId: string | null;
  lobbyHost: boolean;
};

export const getUserById = async (userId: string): Promise<UserData> => {
  const userData = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: {
      id: true,
      username: true,
      lobbyId: true,
      lobbyHost: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  return userData;
};
