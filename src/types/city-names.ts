export const cityNames = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;
export type CityName = (typeof cityNames)[number];
