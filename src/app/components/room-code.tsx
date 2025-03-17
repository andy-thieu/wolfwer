import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Copy } from "lucide-react";

interface RoomCodeProps {
  roomCode: string;
}

export function RoomCode(props: RoomCodeProps) {
  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(props.roomCode);
    alert("Raumcode in die Zwischenablage kopiert!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Raumcode</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between rounded bg-secondary p-3">
          <span className="text-2xl font-bold">{props.roomCode}</span>
          <Button variant="outline" size="icon" onClick={copyRoomCode}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
