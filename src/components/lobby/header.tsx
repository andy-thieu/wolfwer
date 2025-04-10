"use client";

import { Card, CardTitle, CardHeader, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

import { leaveLobby } from "~/data/actions/lobby";

interface HeaderProps {
  lobbyId: string;
  userId: string;
}

const Header = (props: HeaderProps) => {
  const leave = async () => {
    console.log("leave");
    await leaveLobby(props.userId, props.lobbyId);
    redirect("/join");
  };
  return (
    <Card className="flex flex-row items-center justify-between">
      <CardHeader>
        <CardTitle>wolfwer Lobby</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center p-0 pr-4">
        <Button variant="outline" onClick={leave}>
          <span>Lobby verlassen</span>
          <LogOut className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
