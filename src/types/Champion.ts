export interface ChampionResponseChampion {
  id: string;
  name: string;
  title: string;
  tags: string[];
  image: {
    full: string;
  };
  partype: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
}
