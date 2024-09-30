import React from "react";
import { Champion } from "@/types/Champion";

interface ChampionsListItemProps {
  champion: Champion;
}

const ChampionsListItem = ({ champion }: ChampionsListItemProps) => (
  <li>{champion.name}</li>
);

export default ChampionsListItem;
