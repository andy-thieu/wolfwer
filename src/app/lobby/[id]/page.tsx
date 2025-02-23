"use client";

import { useState, useEffect } from "react";
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

interface Player {
  id: string;
  name: string;
  isCreator: boolean;
}

const initialPlayers: Player[] = [
  { id: "1", name: "Spieler 1", isCreator: true },
  { id: "2", name: "Spieler 2", isCreator: false },
  { id: "3", name: "Spieler 3", isCreator: false },
];

const initialRoles = [
  { name: "Werwölfe", enabled: true, count: 2 },
  { name: "Dorfbewohner", enabled: true, count: 3 },
  { name: "Seherin", enabled: true, count: 1 },
  { name: "Hexe", enabled: true, count: 1 },
  { name: "Jäger", enabled: false, count: 1 },
  { name: "Amor", enabled: false, count: 1 },
  { name: "Beschützer", enabled: false, count: 1 },
  { name: "Bürgermeister", enabled: false, count: 1 },
];

export default function Page() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [roomCode, setRoomCode] = useState("ABCD1234");
  const [nightDuration, setNightDuration] = useState(30);
  const [roles, setRoles] = useState(initialRoles);
  const [seerSeeRole, setSeerSeeRole] = useState("alignment");
  const [revealRoleOnDeath, setRevealRoleOnDeath] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState("1"); // Assuming the current player is the creator for this example

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prevPlayers) => {
        if (prevPlayers.length < 10) {
          const newPlayerId = (prevPlayers.length + 1).toString();
          return [
            ...prevPlayers,
            {
              id: newPlayerId,
              name: `Spieler ${newPlayerId}`,
              isCreator: false,
            },
          ];
        }
        return prevPlayers;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(roomCode);
    alert("Raumcode in die Zwischenablage kopiert!");
  };

  const toggleRole = (index: number) => {
    setRoles((prevRoles) =>
      prevRoles.map((role, i) =>
        i === index ? { ...role, enabled: !role.enabled } : role,
      ),
    );
  };

  const updateRoleCount = (index: number, newCount: number) => {
    setRoles((prevRoles) =>
      prevRoles.map((role, i) =>
        i === index ? { ...role, count: newCount } : role,
      ),
    );
  };

  const removePlayer = (playerId: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== playerId),
    );
  };

  const leaveRoom = () => {
    // In a real application, this would trigger an API call to leave the room
    alert("Du hast die Lobby verlassen.");
  };

  const isCreator = players.find(
    (player) => player.id === currentPlayerId,
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
              <div className="flex flex-row">
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
