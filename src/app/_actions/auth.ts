"use server";

import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";

const errorMessages: Record<string, string> = {
  INVALID_USERNAME_OR_PASSWORD: "Benutzername oder Passwort ist falsch",
};

export async function signIn(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  await auth.api.signInUsername({
    body: {
      username,
      password,
    },
  });

  redirect("/join");
}

export async function signUp(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await auth.api.signUpEmail({
    body: { name: username, email, password, username },
  });

  redirect("/join");
}

// You can add more auth-related server actions here
// export async function signUp(formData: FormData) { ... }
// export async function resetPassword(formData: FormData) { ... }
