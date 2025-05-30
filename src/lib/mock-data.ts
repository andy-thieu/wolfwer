export interface Role {
  name: string;
  title: string;
  emoji: string;
  count?: number;
  enabled?: boolean;
}

export const mockRoles: Role[] = [
  { name: "werewolf", title: "Werwölfe", emoji: "🐺", count: 0 },
  { name: "seer", title: "Seherin", emoji: "🔮", enabled: false },
  { name: "witch", title: "Hexe", emoji: "🧙", enabled: false },
  { name: "hunter", title: "Jäger", emoji: "🔫", enabled: false },
  { name: "lover", title: "Amor", emoji: "💕", enabled: false },
  { name: "protector", title: "Beschützer", emoji: "🪽", enabled: false },
  { name: "mayor", title: "Bürgermeister", emoji: "👔", enabled: true },
];

export const mockSettings = {
  revealRoleOnDeath: true,
  seerCanSeeRole: true,
  roles: mockRoles,
};

export const mockLeaderboard = [
  {
    id: "1",
    username: "devin",
    wins: 45,
    losses: 5,
    winRate: "90%",
  },
  {
    id: "2",
    username: "minh",
    wins: 40,
    losses: 6,
    winRate: "87%",
  },
  {
    id: "3",
    username: "manni",
    wins: 35,
    losses: 7,
    winRate: "83%",
  },
  {
    id: "4",
    username: "tony",
    wins: 32,
    losses: 8,
    winRate: "80%",
  },
  {
    id: "5",
    username: "endi",
    wins: 28,
    losses: 8,
    winRate: "78%",
  },
  {
    id: "6",
    username: "phuc",
    wins: 25,
    losses: 8,
    winRate: "76%",
  },
  {
    id: "7",
    username: "vuong",
    wins: 22,
    losses: 8,
    winRate: "73%",
  },
  {
    id: "8",
    username: "luna",
    wins: 20,
    losses: 8,
    winRate: "71%",
  },
  {
    id: "9",
    username: "tanja",
    wins: 18,
    losses: 8,
    winRate: "69%",
  },
  {
    id: "10",
    username: "vero",
    wins: 15,
    losses: 8,
    winRate: "65%",
  },
  {
    id: "11",
    username: "michi",
    wins: 12,
    losses: 8,
    winRate: "60%",
  },
  {
    id: "12",
    username: "minendie",
    wins: 10,
    losses: 8,
    winRate: "56%",
  },
  {
    id: "13",
    username: "vici",
    wins: 8,
    losses: 8,
    winRate: "50%",
  },
  {
    id: "14",
    username: "raphi",
    wins: 6,
    losses: 10,
    winRate: "38%",
  },
  {
    id: "15",
    username: "massi",
    wins: 4,
    losses: 12,
    winRate: "25%",
  },
];
