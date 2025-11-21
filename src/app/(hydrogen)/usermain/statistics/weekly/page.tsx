'use client';


import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Ranking from "@/components-figma/ranking";
import MealStatisticsContainer1 from "@/components-figma/meal-statistics-container1";
import GrCalory from "@/components-figma/gr-calory";
import GrP from "@/components-figma/gr-p";
import Footer from "@/components-figma/footer";

//import { Link } from "react-router-dom";

import Link from "next/link";

const Frame10: NextPage = () => {
  return (

    <>

<div className="bg-dark sticky top-0 z-50 ">
    <Top1
          logo="/usermain/images/logo1.svg"
          topBackgroundColor="#fff"
          topBorderBottom="1px solid #ddd"
          topBoxSizing="border-box"
          frameDivBorderBottom="unset"
          frameDivBoxSizing="unset"
          divColor="#212121"
          frameDivBorderBottom1="2px solid #212121"
          frameDivBoxSizing1="border-box"
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
        />
    </div>

    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-center text-base text-grey-9 font-menu-off">
      <div className="self-stretch flex flex-col items-center justify-start">

        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">
          <div className=" w-96  xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">
            <div className="self-stretch flex flex-row items-center justify-center">
              

              <Link
                href={"/usermain/feeds/statistics"}
               className="flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light"
               style={{ textDecoration: 'none' }}
               >
                <div className="flex-1 relative font-extrabold">일간</div>
              </Link>

              <Link
                href="/usermain/feeds/statistics/weekly"
                className="flex-1 box-border h-14 flex flex-row items-center justify-start text-dark border-b-[2px] border-solid border-dark"
                style={{ textDecoration: 'none' }}
                >
                <div className="flex-1 relative font-extrabold">
                  주간/월간/전체
                </div>
              </Link>


            </div>
            <div className="self-stretch bg-white flex flex-col items-center justify-start p-10 gap-[40px] text-left text-xl text-dark">
              
              <div className="self-stretch relative text-xl xl:text-17xl font-extrabold text-center">
                {`What you eat?(식단)`}

                
                {`& How you eat?(식사패턴)`}
              </div>

              <div className="self-stretch flex flex-col items-center justify-start gap-[32px] text-center text-base text-grey-9">
                <div className="self-stretch flex flex-row items-center justify-center">
                  <div className="flex-1 box-border h-14 flex flex-row items-center justify-start text-dark border-b-[2px] border-solid border-dark">
                    <div className="flex-1 relative font-extrabold">주간</div>
                  </div>
                  <div className="flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-grey-d">
                    <div className="flex-1 relative font-extrabold">월간</div>
                  </div>
                  <div className="flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-grey-d">
                    <div className="flex-1 relative font-extrabold">전체</div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-center gap-[40px] text-xl text-dark">
                  <img
                    className="relative w-6 h-6 overflow-hidden shrink-0"
                    alt=""
                    src="/usermain/images/chevronleft2.svg"
                  />
                  <div className="relative font-extrabold">
                    2023.10.02(월) ~ 2023.10.08(일)
                  </div>
                  <img
                    className="relative w-6 h-6 overflow-hidden shrink-0"
                    alt=""
                    src="/usermain/images/chevronright2.svg"
                  />
                </div>
              </div>
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <div className="self-stretch flex flex-col items-center justify-start gap-[20px]">
                <div className="self-stretch flex flex-col items-center justify-start gap-[12px]">
                  <div className="self-stretch relative font-extrabold">
                    식단 통계 TOP5
                  </div>
                  <div className="self-stretch relative text-base">
                    <span>{`가장 많이 먹은 음식은 `}</span>
                    <span className="font-extrabold">카레</span>
                    <span>에요!</span>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[40px]">
                  <Ranking menuNumber="1" dishName="카레(15회)" />
                  <Ranking
                    menuNumber="2"
                    dishName="된장국(12회)"
                    propBackgroundColor="#ffd8aa"
                    propFontWeight="unset"
                  />
                  <Ranking
                    menuNumber="3"
                    dishName="샐러드(10회)"
                    propBackgroundColor="#ffd8aa"
                    propFontWeight="unset"
                  />
                  <Ranking
                    menuNumber="4"
                    dishName="과일(7회)"
                    propBackgroundColor="#ffd8aa"
                    propFontWeight="unset"
                  />
                  <Ranking
                    menuNumber="5"
                    dishName="치킨(5회)"
                    propBackgroundColor="#ffd8aa"
                    propFontWeight="unset"
                  />
                </div>
              </div>
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <div className="self-stretch hidden flex-col items-center justify-start gap-[20px]">
                <div className="self-stretch flex flex-col items-center justify-start gap-[12px]">
                  <div className="self-stretch relative font-extrabold">
                    식사방식 통계 TOP3
                  </div>
                  <div className="self-stretch relative text-base">
                    <span>{`가장 많이 이용한 식사방식은 `}</span>
                    <span className="font-extrabold">집밥</span>
                    <span>이에요!</span>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[40px]">
                  <Ranking
                    menuNumber="1"
                    dishName="집밥(15회)"
                    propBackgroundColor="#ff820f"
                    propFontWeight="800"
                  />
                  <Ranking
                    menuNumber="2"
                    dishName="외식(10회)"
                    propBackgroundColor="#ffd8aa"
                    propFontWeight="unset"
                  />
                  <Ranking
                    menuNumber="3"
                    dishName="배달(5회)"
                    propBackgroundColor="#ffd8aa"
                    propFontWeight="unset"
                  />
                </div>
              </div>
              <div className="self-stretch relative h-px hidden">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <div className="self-stretch hidden flex-col items-center justify-start gap-[20px]">
                <div className="self-stretch flex flex-col items-center justify-start gap-[12px]">
                  <div className="self-stretch relative font-extrabold">
                    식단 통계 TOP5
                  </div>
                  <div className="self-stretch relative text-base">
                    <span>{`가장 많이 이용한 식사방식은 `}</span>
                    <span className="font-extrabold">카레</span>
                    <span>이에요!</span>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-center gap-[12px]">
                  <Ranking
                    menuNumber="1"
                    dishName="카레(15회)"
                    propBackgroundColor="#ff820f"
                    propFontWeight="800"
                  />
                  <Ranking
                    menuNumber="2"
                    dishName="된장국(12회)"
                    propBackgroundColor="#ffd8aa"
                    propFontWeight="unset"
                  />
                  <Ranking
                    menuNumber="3"
                    dishName="샐러드(10회)"
                    propBackgroundColor="#ffd8aa"
                    propFontWeight="unset"
                  />
                  <Ranking
                    menuNumber="4"
                    dishName="과일(7회)"
                    propBackgroundColor="#ffd8aa"
                    propFontWeight="unset"
                  />
                  <Ranking
                    menuNumber="5"
                    dishName="치킨(7회)"
                    propBackgroundColor="#ffd8aa"
                    propFontWeight="unset"
                  />
                </div>
              </div>
              <div className="self-stretch relative h-px hidden">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <MealStatisticsContainer1
                mealStatsMealTimeStats="식사량 통계"
                mealAmountStats="식사량은 대부분 "
                eatingSpeedStats="적게"
                mealAmountPercentageEatin="적게(70%)"
                mealAmountPercentageStats="많이(10%)"
              />
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <MealStatisticsContainer1
                mealStatsMealTimeStats="식사소요시간 통계"
                mealAmountStats="식사는 대부분 "
                eatingSpeedStats="천천히"
                mealAmountPercentageEatin="천천히(70%)"
                mealAmountPercentageStats="빠르게(10%)"
              />
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <div className="self-stretch flex flex-col items-center justify-start gap-[40px]">
                <div className="self-stretch flex flex-col items-center justify-start">
                  <div className="self-stretch relative font-extrabold">
                    영양성분에 대한 통계
                  </div>
                </div>
                <GrCalory
                  showFrameDiv={false}
                  showDiv={false}
                  propFontSize="16px"
                  propWidth="unset"
                  propFlex="1"
                  propAlignItems="center"
                  propJustifyContent="center"
                  propHeight="13px"
                />
                <div className="self-stretch relative h-px">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
                </div>
                <GrP
                  divFontSize="16px"
                  propDisplay="flex"
                  propAlignItems="center"
                  propJustifyContent="center"
                  propHeight="13px"
                />
              </div>
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <div className="self-stretch flex flex-col items-center justify-start gap-[40px]">
                <div className="self-stretch flex flex-col items-center justify-start gap-[12px]">
                  <div className="self-stretch relative font-extrabold">
                    식단 점수에 대한 통계
                  </div>
                  <div className="self-stretch relative text-base">
                    <span>{`식단점수는 대부분 `}</span>
                    <span className="font-extrabold">좋음</span>
                    <span> 입니다.</span>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-sm">
                  <div className="w-[920px] flex flex-row items-center justify-center">
                    <div className="relative bg-good w-[200px] h-16" />
                    <div className="relative bg-std w-[400px] h-16" />
                    <div className="flex-1 relative bg-bad h-16" />
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[20px]">
                    <div className="flex flex-row items-center justify-center gap-[8px]">
                      <div className="relative rounded bg-good w-3 h-3" />
                      <div className="relative font-extrabold">
                        좋음(12회, 30%)
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-[8px]">
                      <div className="relative rounded bg-std w-3 h-3" />
                      <div className="relative">양호함(5회, 10%)</div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-[8px]">
                      <div className="relative rounded bg-bad w-3 h-3" />
                      <div className="relative">개선이 필요함(15회, 60%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer
        footerAlignSelf="stretch"
        footerBorderTop="1px solid #eee"
        footerBoxSizing="border-box"
      />
    </div>

    </>
    
  );
};

export default Frame10;
