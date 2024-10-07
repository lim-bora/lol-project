"use server";
//'use server'를 안써도 작동은함 왜? 넥스트는 서버환경이 디폴트니까
//하지만 클라이언트컴포넌트에서 이거를 끌어다쓰면 클라이언트 환경에서 작동되어버리니까
//이거는 서버로만 작동할거야! 라고 선언한거임 -> 그럼 클라이언트에서 갖다써도 이건 서버로 돌아감

// 모든 챔피언 목록을 가져오는 함수
export async function fetchChampions() {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion.json`
  );
  if (!response.ok) {
    //ok : Fetch API의 표준 속성, HTTP 응답이 성공적인지 여부
    console.error(
      "챔피언 목록을 가져오는 데 실패했습니다.",
      response.statusText
    ); //statusText : HTTP 응답의 상태 텍스트
    return [];
  }
  const data: {
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
  } = await response.json(); //JSON 응답을 JavaScript 객체로 변환
  return Object.values(data);
}

// type Champion = {
//   id: string;
//   name: string;
//   role: string;
//   image: {
//     full: string;
//   };
//   info: {
//     attack: number;
//     defense: number;
//     magic: number;
//     difficulty: number;
//   };
//   title: string;
// };

// // 모든 챔피언 목록을 가져오는 함수
// export async function fetchChampions(): Promise<{ [key: string]: Champion }> {
//   const response = await fetch(
//     `https://ddragon.leagueoflegends.com/cdn/14.19.1/data/ko_KR/champion.json`
//   );
//   if (!response.ok) {
//     //ok : Fetch API의 표준 속성, HTTP 응답이 성공적인지 여부
//     console.error(
//       "챔피언 목록을 가져오는 데 실패했습니다.",
//       response.statusText
//     ); //statusText : HTTP 응답의 상태 텍스트
//     return {};
//   }
//   const data: { [key: string]: Champion } = await response.json(); //JSON 응답을 JavaScript 객체로 변환
//   return data;
// }
