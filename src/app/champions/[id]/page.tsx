"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type ChampionData = {
  id: string;
  name: string;
  role: string;
  image: {
    full: string;
  };
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  title: string;
};

type ChampionResponse = {
  data: {
    [key: string]: ChampionData;
  };
};

const ChampionsDetailItem = () => {
  const { id } = useParams() as { id: string };
  const [items, setItems] = useState<ChampionData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //useEffect쓴 이유는 클릭한 아이템의 아디가 변경될때마다 리렌더링되게!
    const fetchChampionDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CHAMPION_URL}/${id}.json`
        );

        if (!response.ok) {
          throw new Error("데이터 못가져옴!");
        }

        const detailItemData: ChampionResponse = await response.json();
        const detailItem = detailItemData.data[id];
        setItems([detailItem]);
      } catch (err) {
        console.log("err", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchChampionDetails();
    }
  }, [id]);
  console.log("items", items);

  if (isLoading) {
    return (
      <div>
        <p>Loading data, please wait...</p>
      </div>
    );
  }

  return (
    <div>
      {items && (
        <div>
          {items.map((item) => (
            <div key={item.id} className="text-[#fff]">
              <h2>ID: {item.id}</h2>
              <p>Name: {item.name}</p>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${item.image.full}`}
                alt={item.name}
                width={200}
                height={200}
              />
              <p>{item.title}</p>
              <ul>
                스탯
                <li>공격력: {item.info.attack}</li>
                <li>방어력: {item.info.defense}</li>
                <li>마법력: {item.info.magic}</li>
                <li>난이도: {item.info.difficulty}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChampionsDetailItem;
