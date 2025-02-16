"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Plus, LogIn } from "lucide-react"

export default function Page() {
  const [createUsername, setCreateUsername] = useState("")
  const [joinLobbyCode, setJoinLobbyCode] = useState("")
  const [joinUsername, setJoinUsername] = useState("")

  const createLobby = (e: React.FormEvent) => {
    e.preventDefault()
    if (createUsername.trim()) {
      console.log(`Lobby erstellt mit Benutzername: ${createUsername}`)
      setCreateUsername("")
    }
  }

  const joinLobby = (e: React.FormEvent) => {
    e.preventDefault()
    if (joinLobbyCode.trim() && joinUsername.trim()) {
      console.log(`Lobby beigetreten mit Code: ${joinLobbyCode} und Benutzername: ${joinUsername}`)
      setJoinLobbyCode("")
      setJoinUsername("")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-4xl font-bold ml-4">Wolfwer</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Neue Lobby erstellen</CardTitle>
            <CardDescription>Starte ein neues Wolfwer-Spiel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createLobby} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="createUsername">Benutzername</Label>
                <Input
                  type="text"
                  id="createUsername"
                  value={createUsername}
                  onChange={(e) => setCreateUsername(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Spiel erstellen
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spiel beitreten</CardTitle>
            <CardDescription>Gib den Lobby-Code ein, um einem bestehenden Wolfwer-Spiel beizutreten</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={joinLobby} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="joinUsername">Benutzername</Label>
                <Input
                  type="text"
                  id="joinUsername"
                  value={joinUsername}
                  onChange={(e) => setJoinUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lobbyCode">Lobby-Code</Label>
                <Input
                  type="text"
                  id="lobbyCode"
                  value={joinLobbyCode}
                  onChange={(e) => setJoinLobbyCode(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" /> Lobby beitreten
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

