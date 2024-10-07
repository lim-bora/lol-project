import React from "react";
import Image from "next/image";
import { Items } from "@/types/Items";

interface ItemsListItemProps {
  item: Items;
}

const ItemListItem = ({ item }: ItemsListItemProps) => {
  return (
    <li>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${item.image.full}`}
        alt={item.name}
        width={128}
        height={128}
      />
      <div>
        <div>{item.name}</div>
        <div>{item.plaintext}</div>
      </div>
    </li>
  );
};

export default ItemListItem;
