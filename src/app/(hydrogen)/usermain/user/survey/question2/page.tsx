'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Container from "@/components-figma/container";
import Footer from "@/components-figma/footer";



export default function Page() {
  

  return (
    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start">
      <div className="self-stretch flex flex-col items-center justify-start">
        <Top1
          logo="/usermain/images/logo1.svg"
          topBackgroundColor="#fff"
          topBorderBottom="1px solid #ddd"
          topBoxSizing="border-box"
          frameDivBorderBottom="unset"
          frameDivBoxSizing="unset"
          divColor="#212121"
          frameDivBorderBottom1="unset"
          frameDivBoxSizing1="unset"
          divColor1="#212121"
          frameDivBorderBottom2="unset"
          frameDivBoxSizing2="unset"
          divColor2="#212121"
          divColor3="#212121"
          aboutColor="#212121"
          frameDivBorder="1px solid #666"
          divColor4="#212121"
          frameDivBorder1="1px solid #666"
          divColor5="#212121"
          frameDivBorderBottom3="2px solid #212121"
          frameDivBoxSizing3="border-box"
        />
        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">
          <Container
            menuNumber="2"
            mealDiaryStyleLunchCancel="식단일지를 작성 중이다. 당신의 식단일지 작성 스타일은?"
            mealDiaryPrompt="앗.. 이틀째 식단일지 기록을 깜빡했네. 내가 어제 먹었던 내용을 자동으로 적어줬으면…"
            mealDiaryContent="매일 먹은 식단이 시간대별로 꼼꼼하게 적혀있다. 미리 먹을 식단도 적을 수 있었으면.."
            mealDiaryStepMealDiaryQue="완료"
          />
        </div>
      </div>
      <Footer
        footerAlignSelf="stretch"
        footerBorderTop="1px solid #eee"
        footerBoxSizing="border-box"
      />
    </div>
  );
};


