import { NextResponse } from "next/server"; //Next.js 서버 응답을 생성
import { fetchChampions } from "@/utils/serverApi"; //모든 챔피언 목록 가져오기

export async function GET(request: Request) {
  //TTP GET 요청을 처리하는 비동기 함수
  try {
    // 요청 정보를 로그로 출력
    console.log("Request received:", request);

    const allChampions = await fetchChampions();
    const allChampionsData = allChampions[3];

    const response = await fetch(
      //RiotGames API에서 챔피언로테이션 데이터 가져오기
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          //API 호출에 필요한 인증 토큰 포함
          "X-Riot-Token": process.env.RIOT_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "롤 api에서 챔피언 로테이션목록을 가져오는 데 실패했습니다.",
        response.statusText
      );
      return null;
    }

    const rotationData = await response.json();
    const freeChampionIds: string[] = rotationData.freeChampionIds.map(
      (id: number) => id.toString() // rotationData.freeChampionIds를 돌면서 숫자인id값을 문자열로 바꿔
    );

    const rotationChampions = Object.values(allChampionsData).filter(
      (champion: { key: string }) => freeChampionIds.includes(champion.key)
    );

    return NextResponse.json(rotationChampions);
  } catch (error) {
    console.error("서버 오류 발생:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

/*
트러블슈팅
1. const allChampions = await fetchChampions(); 이렇게가져왔는데 안떴음
-> 디버깅으로 타고타고올라가다가 fetchChampions()를 불렀을때 상태는 0,1,2,3(원하는데이터) 가 있다는걸 깨달음
-> const allChampionsData = allChampions[3]; 새로 저장


2. 모든챔피언데이터 중 로테이션아이디들이랑 같은거만 필터링해야함-> 필터링이 안댐 필터값을 잘못쓴거같음 
freeChampionIds.includes(champion.key)
-> 타입문제였다. 로테이션아이디는 넘버였고, 맴버전체의 아이디는 문자열이어서 안맞아서 0이나온것 
-> const freeChampionIds: string[] = rotationData.freeChampionIds.map(
      (id: number) => id.toString() // rotationData.freeChampionIds를 돌면서 숫자인id값을 문자열로 바꿔
    );
*/
