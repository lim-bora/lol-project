"use client";

import { Items } from "@/types/Items";
import { useQuery } from "@tanstack/react-query";
import ItemListItem from "@/app/items/ItemListItem";

const fetchItems = async (): Promise<Items[]> => {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/item.json"
  );
  if (!response.ok) {
    console.error("네트워크 응답 실패", response.statusText); //statusText : HTTP 응답의 상태 텍스트
    throw new Error("네트워크 응답 실패");
  }
  const { data } = await response.json(); //JSON 응답을 JavaScript 객체로 변환
  console.log("데이터 가져오기 성공", data);
  return Object.values(data); // 객체의 값들을 배열로 변환
};

const ItemList = () => {
  const {
    data: items,
    isLoading,
    error,
  } = useQuery<Items[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (isLoading) return <div>Loading...</div>; //로딩일땐 로딩중

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>아이템 목록</h2>
      <ul className="grid grid-cols-4 gap-[10px] p-[20px]">
        {items?.map((item: Items, index) => (
          <ItemListItem key={item.id || index} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
