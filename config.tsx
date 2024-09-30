if (!process.env.RIOT_API_KEY) {
  throw new Error("API 키가 없습니다.");
}

// undefined 방지 (string만 받겠다.)
const apiKey: string = process.env.RIOT_API_KEY;

export { apiKey };
