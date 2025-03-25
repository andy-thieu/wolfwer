export const mockRoles = [
  { name: "werewolf", description: "Werwölfe", count: 0, maxCount: 2 },
  { name: "villager", description: "Dorfbewohner", count: 0, maxCount: 4 },
  { name: "seer", description: "Seherin", count: 0, maxCount: 1 },
  { name: "witch", description: "Hexe", count: 0, maxCount: 1 },
  { name: "hunter", description: "Jäger", count: 0, maxCount: 1 },
  { name: "lover", description: "Amor", count: 0, maxCount: 1 },
  { name: "protector", description: "Beschützer", count: 0, maxCount: 1 },
  {
    name: "mayor",
    description: "Bürgermeister",
    count: 0,
    maxCount: 1,
  },
];

export const mockSettings = {
  revealRoleOnDeath: true,
  seerCanSeeRole: true,
  roles: mockRoles,
};

export const mockLeaderboard = [
  {
    id: "1",
    username: "tanja",
    wins: 15,
    losses: 3,
    winRate: "83%",
  },
  {
    id: "2",
    username: "minh",
    wins: 12,
    losses: 5,
    winRate: "71%",
  },
  {
    id: "3",
    username: "devin",
    wins: 10,
    losses: 7,
    winRate: "59%",
  },
  {
    id: "4",
    username: "raphi",
    wins: 8,
    losses: 4,
    winRate: "67%",
  },
  {
    id: "5",
    username: "michi",
    wins: 7,
    losses: 6,
    winRate: "54%",
  },
  {
    id: "6",
    username: "vero",
    wins: 3,
    losses: 8,
    winRate: "27%",
  },
];
