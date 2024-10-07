
## Riot API를 활용한 리그 오브 레전드 정보 앱

### 프로젝트 소개
Riot API를 활용하여 챔피언목록, 아이템목록, 무료로 사용가능한 챔피언 목록과 디테일한 정보를 볼 수 있습니다.

#### 배포링크 https://lol-project-nine.vercel.app/

### 개발기간
* 2023.9.25~2023.10.07

### 트러블슈팅
1. const allChampions = await fetchChampions(); 이렇게가져왔는데 값이 확인되지 않는 문제
-> 원인 : 디버깅으로 타고타고올라가다가 fetchChampions()를 불렀을때 상태는 0,1,2,3(원하는데이터) 가 있다는걸 깨달음
-> 해결 : const allChampionsData = allChampions[3]; 새로 저장

2. 모든챔피언데이터 중 로테이션아이디들이랑 같은거만 필터링해야하지만 필터링이 안되는 문제
-> 원인 : 필터링할 조건을 잘못쓴것으로 처음엔 생각했지만 결국 타입문제, 로테이션아이디는 넘버였고, 맴버전체의 아이디는 문자열이어서 안맞아서 0이나온것
-> 해결 : rotationData.freeChampionIds를 돌면서 숫자인id값을 문자열로 바꾸었다.
const freeChampionIds: string[] = rotationData.freeChampionIds.map(
      (id: number) => id.toString(). 
    );
