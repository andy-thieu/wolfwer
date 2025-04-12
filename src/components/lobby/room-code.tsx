"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Copy } from "lucide-react";
import { toast } from "sonner";
interface RoomCodeProps {
  roomCode: string;
}

export function RoomCode(props: RoomCodeProps) {
  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(props.roomCode);
    toast.success("Raumcode kopiert!");
  };

  return (
    <Card className="p-3">
      <CardContent className="p-0">
        <div className="bg-secondary flex items-center justify-between rounded">
          <span className="text-2xl font-bold">{props.roomCode}</span>
          <Button variant="neutral" size="icon" onClick={copyRoomCode}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
