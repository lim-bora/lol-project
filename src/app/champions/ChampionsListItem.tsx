import React from "react";
import Image from "next/image";
import Link from "next/link";

type Champion = {
  id: number;
  name: string;
  role: string;
  image: {
    full: string;
  };
  title: string;
  rotationChampions: Champion[];
};

type ChampionsListItemProps = {
  champion: Champion;
};

const ChampionsListItem = ({ champion }: ChampionsListItemProps) => (
  <li className="border border-[#545454] flex flex-col items-center justify-center p-[10px] rounded-[20px]">
    <Link href={`/champions/${champion.id}`}>
      <div className="w-full h-[200px] rounded-[14px]">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${champion.image.full}`}
          alt={champion.name}
          width={128}
          height={128}
        />
      </div>
      <div>{champion.name}</div>
      <div>{champion.title}</div>
    </Link>
  </li>
);

export default ChampionsListItem;
