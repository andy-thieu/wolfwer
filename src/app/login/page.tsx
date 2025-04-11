"use client";

import Link from "next/link";

import SignIn from "../../components/authentication/sign-in";
import { SignUp } from "../../components/authentication/sign-up";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { unstable_ViewTransition as ViewTransition } from "react";

import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();

  const loginMethodParam = searchParams.get("method");

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-16 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] px-4">
      <div className="flex flex-col items-center gap-6">
        <Link href="/">
          <ViewTransition name={"logo"}>
            <h1 className="text-spektr-cyan-50 font-regular text-5xl tracking-tighter">
              wolfwer.net
            </h1>
          </ViewTransition>
        </Link>
      </div>
      <Tabs
        defaultValue={loginMethodParam === "sign-in" ? "sign-in" : "sign-up"}
        className="w-full max-w-md"
      >
        <TabsList>
          <TabsTrigger value="sign-in">Anmelden</TabsTrigger>
          <TabsTrigger value="sign-up">Registrieren</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignIn />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}
