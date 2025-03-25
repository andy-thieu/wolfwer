import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { mockLeaderboard } from "~/lib/mock-data";
import { Crown } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center p-2 sm:p-8">
      <Card className="md:w-[600px] lg:w-[800px] xl:w-[900px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            wolfwer Rangliste
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Platz</TableHead>
                <TableHead>Spieler</TableHead>
                <TableHead className="text-right">Siege</TableHead>
                <TableHead className="text-right">Niederlagen</TableHead>
                <TableHead className="text-right">Sieges Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaderboard.map((player, index) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{player.username}</TableCell>
                  <TableCell className="text-right text-green-600">
                    {player.wins}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    {player.losses}
                  </TableCell>
                  <TableCell className="text-right">{player.winRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
