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
};

type RotaitionListItemProps = {
  rotation: Champion;
};

const RotationListItem = ({ rotation }: RotaitionListItemProps) => (
  <li className="border border-[#545454] flex flex-col items-center justify-center p-[10px] rounded-[20px]">
    <Link href={`/rotation/${rotation.id}`}>
      <div className="w-full h-[200px] rounded-[14px]">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${rotation.image.full}`}
          alt={rotation.name}
          width={128}
          height={128}
        />
      </div>
      <h2>{rotation.name}</h2>
      <p>{rotation.title}</p>
    </Link>
  </li>
);
export default RotationListItem;
