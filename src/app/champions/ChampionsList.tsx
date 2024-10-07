"use client";

import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
import ChampionsListItem from "@/app/champions/ChampionsListItem";
import { fetchChampions } from "@/utils/serverApi";

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

const ChampionsList = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchChampions();
        console.log("response", response);
        const championsData = Object.values(response[3]);
        setChampions(championsData);
      } catch (err) {
        console.log("Error fetching champions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>챔피언 목록</h2>
      <ul className="grid grid-cols-4 gap-[10px] p-[20px]">
        {champions.map((champion) => (
          <ChampionsListItem key={champion.id} champion={champion} />
        ))}
      </ul>
    </div>
  );
};

export default ChampionsList;
