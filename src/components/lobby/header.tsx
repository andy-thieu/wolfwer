"use client";

import { Card, CardTitle, CardHeader, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

const Header = () => {
  return (
    <Card className="flex flex-row items-center justify-between">
      <CardHeader>
        <CardTitle>wolfwer Lobby</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center p-0 pr-4">
        <Button variant="outline" onClick={() => redirect("/join")}>
          <span>Lobby verlassen</span>
          <LogOut className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
