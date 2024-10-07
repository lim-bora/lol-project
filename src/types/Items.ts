export interface Items {
  id: string; // e.g., "1001"
  name: string; // e.g., "Boots"
  description: string; // e.g., "<mainText>...</mainText>"
  colloq: string; // e.g., ";"
  plaintext: string; // e.g., "Slightly increases Move Speed"
  into: string[]; // e.g., ["3005", "3047", ...]
  image: {
    full: string; // e.g., "1001.png"
    sprite: string; // e.g., "item0.png"
    group: string; // e.g., "item"
    x: number; // e.g., 0
    y: number; // e.g., 0
    w: number; // e.g., 48
    h: number; // e.g., 48
  };
  gold: {
    base: number; // e.g., 300
    purchasable: boolean; // e.g., true
    total: number; // e.g., 300
    sell: number; // e.g., 210
  };
  tags: string[]; // e.g., ["Boots"]
  maps: {
    [key: string]: boolean; // e.g., {"11": true, "12": true, ...}
  };
  stats: {
    FlatMovementSpeedMod: number; // e.g., 25
  };
}
