"use server";

//챔피언 로테이션
export async function fetchChampionRotation() {
  const response = await fetch(`/api/rotation`);
  if (!response.ok) {
    console.error(
      "내 로컬에서 챔피언 로테이션목록을 가져오는 데 실패했습니다.",
      response.statusText
    );
    return null;
  }
  const data = await response.json();
  return Object.values(data);
}
