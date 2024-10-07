"use client"; //1.유즈쓸거라 유즈클라이언트 쓰기

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { fetchChampions } from "@/utils/serverApi"; //3.전체 데이터 가져오기
// import { Champion } from "@/types/Champion";

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
const fetchChampions = async (): Promise<ChampionResponse> => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion.json`
  );
  if (!response.ok) {
    throw new Error("챔피언 데이터를 가져오는 데 실패했습니다.");
  }
  const data = await response.json();
  return data;
};

const RotaitionChampionsDetailItem = () => {
  const { id } = useParams() as { id: string }; //2.아이디가져오기
  const [allItem, setAllItem] = useState<ChampionData[]>([]);
  const [item, setItem] = useState<ChampionData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //전체데이터 가져오기
    const fetchRotaitionChampion = async () => {
      try {
        const response = await fetchChampions();
        console.log("response", response);
        if (response) {
          const itemsArray = Object.values(response.data);
          setAllItem(itemsArray);
        } else {
          console.error("챔피언 데이터를 가져오지 못했습니다.");
        }
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchRotaitionChampion();
  }, [id]);

  useEffect(() => {
    if (allItem.length > 0) {
      const rotationChampionsItem = allItem.filter((champion) =>
        id.includes(champion.id)
      );
      console.log("rotationChampionsItem", rotationChampionsItem);
      setItem(rotationChampionsItem);
    }
  }, [allItem, id]);

  if (isLoading) {
    //로딩처리했고
    return (
      <div>
        <p>Loading data, please wait...</p>
      </div>
    );
  }

  console.log("allItem", allItem);
  console.log("item", item);
  return (
    <div>
      {item ? ( //아이템이 존재한다면
        item.map((i) => (
          <div key={i.id}>
            <h2>{i.id}</h2>
            <p>{i.name}</p>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${i.image.full}`}
              alt={i.name}
              width={200}
              height={200}
            />
            <p>{i.title}</p>
            <p>{i.name}</p>
            <ul>
              스탯
              <li>공격력: {i.info.attack}</li>
              <li>방어력: {i.info.defense}</li>
              <li>마법력: {i.info.magic}</li>
              <li>난이도: {i.info.difficulty}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>아이템을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default RotaitionChampionsDetailItem;
