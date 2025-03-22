"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Check } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface Role {
  name: string;
  description: string;
  count: number;
  maxCount: number;
}

interface GameSettingsProps {
  isCreator: boolean;
  defaultSettings: {
    roles: Role[];
    seerCanSeeRole: string;
    revealRoleOnDeath: boolean;
  };
}

export function GameSettings(props: GameSettingsProps) {
  const [roles, setRoles] = useState(props.defaultSettings.roles);
  const [canSeerSeeRole, setCanSeerSeeRole] = useState(
    props.defaultSettings.seerCanSeeRole,
  );

  const canSeerSeeRoleOptions = [
    { value: "alignment", label: "Nur Gesinnung (Gut/Böse)" },
    { value: "role", label: "Genaue Rolle" },
  ] as const;

  const [revealRoleOnDeath, setRevealRoleOnDeath] = useState(
    props.defaultSettings.revealRoleOnDeath,
  );

  const updateRoleCount = (index: number, newCount: number) => {
    if (roles[index] && newCount > roles[index].maxCount) return;
    if (newCount < 0) return;
    setRoles((prevRoles: Role[]) =>
      prevRoles.map((role, i) =>
        i === index ? { ...role, count: newCount } : role,
      ),
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spieleinstellungen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Rollen</Label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((role: Role, index: number) => (
              <div key={role.name} className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateRoleCount(index, role.count - 1)}
                    disabled={!props.isCreator}
                  >
                    -
                  </Button>
                  <span className="flex w-[20px] items-center justify-center text-lg">
                    {role.count}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateRoleCount(index, role.count + 1)}
                    disabled={!props.isCreator}
                  >
                    +
                  </Button>
                </div>
                <Label>{role.description}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="seerSeeRole">Seherin sieht</Label>
          <Select
            value={canSeerSeeRole ? "role" : "alignment"}
            onValueChange={setCanSeerSeeRole}
            disabled={!props.isCreator}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wähle eine Option" />
            </SelectTrigger>
            <SelectContent defaultValue={canSeerSeeRoleOptions[0].value}>
              {canSeerSeeRoleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={revealRoleOnDeath}
            onCheckedChange={setRevealRoleOnDeath}
            disabled={!props.isCreator}
          />
          <Label>Rolle bei Tod aufdecken</Label>
        </div>
        <Button className="w-full" disabled={!props.isCreator}>
          <Check />
          Spiel starten
        </Button>
      </CardContent>
    </Card>
  );
}
