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
