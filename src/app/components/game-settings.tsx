import { useState } from "react";
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
import { mockRoles } from "~/lib/mock-data";

interface Role {
  name: string;
  enabled: boolean;
  count: number;
}

interface GameSettingsProps {
  isCreator: boolean;
}

export function GameSettings({ isCreator }: GameSettingsProps) {
  const [roles, setRoles] = useState(mockRoles);
  const [seerSeeRole, setSeerSeeRole] = useState("alignment");
  const [revealRoleOnDeath, setRevealRoleOnDeath] = useState(false);
  const [nightDuration, setNightDuration] = useState(30);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spieleinstellungen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Rollen</Label>
          {roles.map((role, index) => (
            <div key={role.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={role.enabled}
                  onCheckedChange={() => toggleRole(index)}
                  disabled={!isCreator}
                />
                <Label>{role.name}</Label>
              </div>
              {role.enabled && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateRoleCount(index, Math.max(1, role.count - 1))
                    }
                    disabled={!isCreator}
                  >
                    -
                  </Button>
                  <span>{role.count}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateRoleCount(index, role.count + 1)}
                    disabled={!isCreator}
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="seerSeeRole">Seherin sieht</Label>
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
            disabled={!isCreator}
          />
          <Label>Rolle bei Tod aufdecken</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nightDuration">Dauer der Nachtphase (Sekunden)</Label>
          <Slider
            id="nightDuration"
            min={10}
            max={60}
            step={5}
            value={[nightDuration]}
            onValueChange={(value) => setNightDuration(value[0] ?? 30)}
            disabled={!isCreator}
          />
          <p className="text-sm text-muted-foreground">
            Aktuell: {nightDuration} Sekunden
          </p>
        </div>
        <Button className="w-full" disabled={!isCreator}>
          Spiel starten
        </Button>
      </CardContent>
    </Card>
  );
}
