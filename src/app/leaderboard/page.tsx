"use client";

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
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export default function LeaderboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(mockLeaderboard.length / rowsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return mockLeaderboard.slice(startIndex, endIndex);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
      <Card className="md:w-[600px] lg:w-[700px] xl:w-[800px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Crown className="h-6 w-6 text-yellow-500" />
            wolfwer Rangliste
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[570px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 sm:w-20">
                    <span className="hidden sm:inline">Platz</span>
                    <span className="sm:hidden">#</span>
                  </TableHead>
                  <TableHead className="min-w-[120px]">Spieler</TableHead>
                  <TableHead className="text-right">
                    <span className="hidden sm:inline">Siege</span>
                    <span className="sm:hidden">S</span>
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="hidden sm:inline">Niederlagen</span>
                    <span className="sm:hidden">N</span>
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="hidden sm:inline">Sieges Rate</span>
                    <span className="sm:hidden">Rate</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentPageData().map((player, index) => (
                  <TableRow key={player.id} className="h-[52px]">
                    <TableCell className="w-20 font-medium">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="w-[40%]">{player.username}</TableCell>
                    <TableCell className="w-24 text-right text-green-600">
                      {player.wins}
                    </TableCell>
                    <TableCell className="w-28 text-right text-red-600">
                      {player.losses}
                    </TableCell>
                    <TableCell className="w-28 text-right">
                      {player.winRate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                    className={`hover:cursor-pointer ${
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }`}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="hover:cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < totalPages &&
                      setCurrentPage(currentPage + 1)
                    }
                    className={`hover:cursor-pointer ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
