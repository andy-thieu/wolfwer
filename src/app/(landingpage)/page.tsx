import SignIn from "../_components/authentication/sign-in";
import { SignUp } from "../_components/authentication/sign-up";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-20">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold">wolfwer.net</h1>
        <p className="text-sm text-muted-foreground">
          spiele das Werwolf-Spiel online mit anderen Spielern :)
        </p>
      </div>
      <Tabs defaultValue="sign-in" className="w-[400px]">
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
