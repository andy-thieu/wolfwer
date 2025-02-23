"use client";

import { useState, Suspense } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Users, Copy, X } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

interface Player {
  id: string;
  name: string;
  isCreator: boolean;
}

interface Role {
  name: string;
  count: number;
  maxCount: number;
}

const initialPlayers: Player[] = [
  { id: "1", name: "Devin", isCreator: true },
  { id: "2", name: "Vero", isCreator: false },
  { id: "3", name: "minendie", isCreator: false },
  { id: "4", name: "Michi", isCreator: false },
  { id: "5", name: "Raphi", isCreator: false },
  { id: "6", name: "Mochigiri", isCreator: false },
  { id: "7", name: "endi", isCreator: false },
];

const initialRoles: Role[] = [
  { name: "Werwölfe", count: 2, maxCount: 3 },
  { name: "Dorfbewohner", count: 3, maxCount: 7 },
  { name: "Seherin", count: 1, maxCount: 1 },
  { name: "Hexe", count: 1, maxCount: 1 },
  { name: "Jäger", count: 1, maxCount: 1 },
  { name: "Amor", count: 1, maxCount: 1 },
  { name: "Beschützer", count: 1, maxCount: 1 },
  { name: "Bürgermeister", count: 1, maxCount: 1 },
];

export default function Page() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [nightDuration, setNightDuration] = useState(30);
  const [roles, setRoles] = useState(initialRoles);
  const [seerSeeRole, setSeerSeeRole] = useState("alignment");
  const [revealRoleOnDeath, setRevealRoleOnDeath] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const roomCode = searchParams.get("code");

  if (!roomCode) return <div>Loading...</div>;

  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(roomCode);

    alert("Raumcode in die Zwischenablage kopiert!");
  };

  const updateRoleCount = (index: number, newCount: number) => {
    setRoles((prevRoles) =>
      prevRoles.map((role, i) =>
        i === index
          ? {
              ...role,
              count: Math.max(0, Math.min(role.maxCount, newCount)),
            }
          : role,
      ),
    );
  };

  const removePlayer = (playerId: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== playerId),
    );
  };

  const leaveRoom = () => {
    alert("Du hast die Lobby verlassen.");
    router.push("/");
  };

  const isCreator = players.find(
    (player) => player.id === players[0]?.id,
  )?.isCreator;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Wolfwer Lobby</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Spieler ({players.length}/10)</span>
              <Users className="h-5 w-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={"flex h-full flex-col justify-between"}>
              <div className={"h-full flex-1 overflow-y-auto"}>
                <ul className="space-y-2">
                  {players.map((player) => (
                    <li
                      key={player.id}
                      className="flex items-center justify-between rounded bg-secondary p-2"
                    >
                      <span>
                        {player.name} {player.isCreator ? "(Ersteller)" : ""}
                      </span>
                      {isCreator && !player.isCreator && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePlayer(player.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className="mt-4 w-full"
                variant="destructive"
                onClick={leaveRoom}
              >
                Lobby verlassen
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="w-full space-y-6 lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Raumcode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded bg-secondary p-3">
                <span className="text-2xl font-bold">{roomCode}</span>
                <Button variant="outline" size="icon" onClick={copyRoomCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spieleinstellungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0">
                <div className={"flex-1 space-y-4"}>
                  <Label>Rollen</Label>
                  {roles.map((role, index) => (
                    <div key={role.name} className="flex items-center gap-5">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateRoleCount(index, Math.max(0, role.count - 1))
                          }
                          disabled={!isCreator}
                        >
                          -
                        </Button>
                        <span>{role.count}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            updateRoleCount(index, role.count + 1);
                          }}
                          disabled={!isCreator}
                        >
                          +
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label>{role.name}</Label>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={"flex-1 space-y-6"}>
                  <div>
                    <Label>Seherin sieht</Label>
                    <Select
                      value={seerSeeRole}
                      onValueChange={setSeerSeeRole}
                      disabled={!isCreator}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wähle eine Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alignment">
                          Nur Gesinnung (Gut/Böse)
                        </SelectItem>
                        <SelectItem value="role">Genaue Rolle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={revealRoleOnDeath}
                      onCheckedChange={setRevealRoleOnDeath}
                    />
                    <Label>Rolle bei Tod aufdecken</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Dauer der Nachtphase (Sekunden)</Label>
                    <Slider
                      min={10}
                      max={60}
                      step={5}
                      value={[nightDuration]}
                      onValueChange={(value) =>
                        setNightDuration(value[0] ?? 30)
                      }
                      disabled={!isCreator}
                    />
                    <p className="text-sm text-muted-foreground">
                      Aktuell: {nightDuration} Sekunden
                    </p>
                  </div>
                </div>
              </div>
              <Button className="w-full" disabled={!isCreator}>
                Spiel starten
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
