"use client";

import { useEffect, useState } from "react";
import RotationListItem from "./RotationListItem";

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

const RotationList = () => {
  const [rotationChampions, setRotationChampions] = useState<Champion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // console.log("rotationChampions", rotationChampions);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/rotation"); // API 엔드포인트를 실제로 사용 중인 것으로 변경
        const champions = await response.json();
        console.log("Champions:", champions);
        setRotationChampions(champions);
      } catch (err) {
        console.log("Error fetching champions:", err);
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Updated rotationChampions:", rotationChampions);

  return (
    <div className="text-[#fff]">
      <h1>로테이션 챔피언 목록</h1>
      <ul className="grid grid-cols-4 gap-[10px] p-[20px]">
        {rotationChampions.map((rotation) => (
          <RotationListItem key={rotation.id} rotation={rotation} />
        ))}
      </ul>
    </div>
  );
};

export default RotationList;
