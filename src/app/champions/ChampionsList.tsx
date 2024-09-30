"use client";

import React from "react";
import { Champion } from "@/types/Champion";
import { useQuery } from "@tanstack/react-query";
import ChampionsListItem from "@/app/champions/ChampionsListItem";

const fetchChampions = async (): Promise<Champion[]> => {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion.json"
  );
  if (!response.ok) {
    //ok : Fetch API의 표준 속성, HTTP 응답이 성공적인지 여부
    console.error("네트워크 응답 실패", response.statusText); //statusText : HTTP 응답의 상태 텍스트
    throw new Error("네트워크 응답 실패");
  }
  const { data } = await response.json(); //JSON 응답을 JavaScript 객체로 변환
  console.log("데이터 가져오기 성공", data);
  return Object.values(data); // 객체의 값들을 배열로 변환
};

const ChampionsList = () => {
  const {
    data: champions,
    isLoading,
    error,
  } = useQuery<Champion[]>({
    queryKey: ["champions"],
    queryFn: fetchChampions,
  });

  if (isLoading) return <div>Loading...</div>; //로딩일땐 로딩중

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>챔피언 목록</h2>
      <ul>
        {champions?.map((champion: Champion) => (
          <ChampionsListItem key={champion.id} champion={champion} />
        ))}
      </ul>
    </div>
  );
};

export default ChampionsList;
