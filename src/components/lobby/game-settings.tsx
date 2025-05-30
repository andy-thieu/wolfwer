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

import { Role } from "~/lib/mock-data";

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
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [werewolfCount, setWerewolfCount] = useState(1);
  const [canSeerSeeRole, setCanSeerSeeRole] = useState(
    props.defaultSettings.seerCanSeeRole,
  );

  const canSeerSeeRoleOptions = [
    { value: true, label: "Genaue Rolle" },
    { value: false, label: "Nur Gesinnung (Gut/Böse)" },
  ] as const;

  const [revealRoleOnDeath, setRevealRoleOnDeath] = useState(
    props.defaultSettings.revealRoleOnDeath,
  );

  const toggleRole = (roleName: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleName)
        ? prev.filter((name) => name !== roleName)
        : [...prev, roleName],
    );
  };

  const updateWerewolfCount = (increment: boolean) => {
    setWerewolfCount((prev) => {
      const newCount = increment ? prev + 1 : prev - 1;
      return Math.max(1, newCount);
    });
    setRoles((prev) =>
      prev.map((role) =>
        role.name === "werewolf"
          ? {
              ...role,
              count: Math.max(
                1,
                increment ? werewolfCount + 1 : werewolfCount - 1,
              ),
            }
          : role,
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
            {roles.map((role: Role) => (
              <div key={role.name} className="flex flex-1">
                <Button
                  className={`flex h-10 w-1/2 justify-between ${role.name === "werewolf" ? "pointer-events-none" : ""}`}
                  variant={
                    selectedRoles.includes(role.name) ? "default" : "neutral"
                  }
                  onClick={() => toggleRole(role.name)}
                  disabled={!props.isCreator}
                >
                  <span className="mr-2">{role.emoji}</span>
                  {role.title}
                </Button>
                {role.name === "werewolf" && (
                  <div className="ml-2 flex items-center">
                    <Button
                      onClick={() => updateWerewolfCount(false)}
                      disabled={!props.isCreator || werewolfCount <= 1}
                      variant="neutral"
                      size="sm"
                    >
                      -
                    </Button>
                    <span className="mx-6">{werewolfCount}</span>
                    <Button
                      onClick={() => updateWerewolfCount(true)}
                      disabled={!props.isCreator}
                      variant="neutral"
                      size="sm"
                    >
                      +
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="seerSeeRole">Seherin sieht</Label>
          <Select
            value={canSeerSeeRole.toString()}
            onValueChange={(value) => setCanSeerSeeRole(value)}
            disabled={!props.isCreator}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wähle eine Option" />
            </SelectTrigger>
            <SelectContent>
              {canSeerSeeRoleOptions.map((option) => (
                <SelectItem
                  key={option.value.toString()}
                  value={option.value.toString()}
                >
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
          <span>Spiel starten</span>
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
