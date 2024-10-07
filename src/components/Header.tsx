import React from "react";
import Link from "next/link"; //Link 컴포넌트를 임포트
import Image from "next/image"; // Next.js 이미지 컴포넌트 임포트
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="flex justify-between items-center border border-b-white sticky top-0 bg-[#373737]">
      <Link href="/">
        <div>
          <Image
            src="https://e7.pngegg.com/pngimages/88/57/png-clipart-league-of-legends-logo-tournament-sports-league-font-league-of-legends-text-label.png"
            alt="League of Legends Logo"
            width={200}
            height={200}
          />
        </div>
      </Link>
      <nav className="flex-[.5] flex justify-between">
        <Link href="/">홈</Link>
        <Link href="/champions">챔피언 목록</Link>
        <Link href="/items">아이템 목록</Link>
        <Link href="/rotation">챔피언 로테이션</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}

export default Header;

/*
외부 도메인 이미지 사용시 )
Next.js에서 외부 도메인 이미지를 사용하려면 보안 및 최적화 이유로 도메인을 허용하는 설정이 필요
Next.js가 외부 이미지를 로드하고 최적화할 수 있도록 하기 위한거

이미지 크기지정 )
Next.js의 Image 컴포넌트는 이미지의 크기를 미리 알고 있어야 최적화된 로딩가능하기때문에 꼭 써주기

Link href="" 에서 /폴더명으로 할시 
-> 해당 폴더의 page.tsx 파일로 연결





*/
