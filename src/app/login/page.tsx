import SignIn from "../../components/authentication/sign-in";
import { SignUp } from "../../components/authentication/sign-up";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Login() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-16 px-4">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-center text-4xl font-bold">wolfwer.net</h1>
        <p className="text-center text-sm text-muted-foreground">
          spiele das Werwolf-Spiel online mit anderen Spielern :)
        </p>
      </div>
      <Tabs defaultValue="sign-in" className="w-full max-w-md">
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
