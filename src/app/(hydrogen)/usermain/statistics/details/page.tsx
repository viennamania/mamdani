'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import MealStatisticsContainer from "@/components-figma/meal-statistics-container";
import Footer from "@/components-figma/footer";

import GrCalory from "@/components-figma/gr-calory";
import GrP from "@/components-figma/gr-p";


import Link from "next/link";

const Frame12: NextPage = () => {
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


    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-center text-base text-dark font-menu-off">
      <div className="self-stretch flex flex-col items-center justify-start">

        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">
          <div className=" w-96   xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">
            
            <div className="self-stretch flex flex-row items-center justify-center">
             
              <Link
                href="/usermain/feeds/statistics"
               className="flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-dark"
               style={{ textDecoration: 'none' }}
               >
                <div className="flex-1 relative font-extrabold">일간</div>
              </Link>
             
              <Link
                href="/usermain/feeds/statistics/weekly"
              className="flex-1 box-border h-14 flex flex-row items-center justify-start text-grey-9 border-b-[2px] border-solid border-orange-light"
              style={{ textDecoration: 'none' }}
              >
                <div className="flex-1 relative font-extrabold">
                  주간/월간/전체
                </div>
              </Link>
            
            </div>



            <div className="self-stretch bg-white flex flex-col items-center justify-start p-10 gap-[40px] ">
              
              <div className="relative font-extrabold text-2xl xl:text-17xl">
                How you eat? (식사패턴)
              </div>

              <MealStatisticsContainer
                mealAmountStatsMealTimeSt="식사량 통계"
                healthyEatingTip1HealthyE="적절한 식사량을 유지하면 과식과 폭식을 줄일 수 있어요!"
                eatingSpeedTip="많이"
                eatingSpeedDescription="적게"
              />
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <MealStatisticsContainer
                mealAmountStatsMealTimeSt="식사소요시간 통계"
                healthyEatingTip1HealthyE="천천히 꼭꼭 씹어먹을수록 소화력을 높일 수 있어요"
                eatingSpeedTip="빠르게"
                eatingSpeedDescription="천천히"
                propBackgroundColor="#6cf437"
              />
            </div>



            <div className="self-stretch bg-white flex flex-col items-center justify-start p-10 gap-[40px] text-17xl">
              <div className="relative font-extrabold">What you eat?(식단)</div>
              <GrCalory showFrameDiv showDiv />
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <GrP />
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-left text-xl">
                <div className="self-stretch relative font-extrabold">
                  주의 영양성분별 1일 적정섭취량 및 평균 섭취량
                </div>
                <div className="self-stretch flex flex-col items-center justify-start gap-[8px] text-sm">
                  <div className="self-stretch flex flex-row items-end justify-start">
                    <div className="relative leading-[24px] flex items-center w-[120px] shrink-0">
                      당류(g)
                    </div>
                    <div className="w-[400px] flex flex-col items-start justify-center relative gap-[4px] text-center text-3xs text-orange">
                      <div className="self-stretch flex flex-row items-center justify-start py-0 pr-0 pl-[260px] z-[0]">
                        <div className="relative font-extrabold">25g</div>
                      </div>
                      <div className="self-stretch rounded-81xl bg-background flex flex-col items-start justify-center z-[1] text-white">
                        <div className="rounded-81xl bg-orange w-60 h-6 flex flex-row items-center justify-center py-0 px-3 box-border">
                          <div className="relative font-extrabold">23</div>
                        </div>
                      </div>
                      <div className="absolute my-0 mx-[!important] top-[15px] left-[271px] bg-orange w-0.5 h-6 z-[2]" />
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-end justify-start">
                    <div className="relative leading-[24px] flex items-center w-[120px] shrink-0">
                      포화지방산(g)
                    </div>
                    <div className="w-[400px] flex flex-col items-start justify-center relative gap-[4px] text-center text-3xs text-orange">
                      <div className="self-stretch flex flex-row items-center justify-start py-0 pr-0 pl-60 z-[0]">
                        <div className="relative font-extrabold">15g</div>
                      </div>
                      <div className="self-stretch rounded-81xl bg-background flex flex-col items-start justify-center z-[1] text-white">
                        <div className="rounded-81xl bg-orange w-60 h-6 flex flex-row items-center justify-center py-0 px-3 box-border">
                          <div className="relative font-extrabold">10</div>
                        </div>
                      </div>
                      <div className="absolute my-0 mx-[!important] top-[15px] left-[247px] bg-orange w-0.5 h-6 z-[2]" />
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-end justify-start">
                    <div className="relative leading-[24px] flex items-center w-[120px] shrink-0">
                      나트륨(mg)
                    </div>
                    <div className="w-[400px] flex flex-col items-start justify-center relative gap-[4px] text-center text-3xs text-red">
                      <div className="self-stretch flex flex-row items-center justify-start py-0 pr-0 pl-[330px] z-[0]">
                        <div className="relative font-extrabold">2300mg</div>
                      </div>
                      <div className="rounded-81xl bg-background w-[400px] flex flex-col items-start justify-center z-[1] text-white">
                        <div className="rounded-81xl bg-red w-[360px] h-6 flex flex-row items-center justify-center py-0 px-3 box-border">
                          <div className="relative font-extrabold">2400</div>
                        </div>
                      </div>
                      <div className="absolute my-0 mx-[!important] top-[15px] left-[349px] bg-orange-light w-0.5 h-6 z-[2]" />
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-end justify-start">
                    <div className="relative leading-[24px] flex items-center w-[120px] shrink-0">
                      콜레스테롤(mg)
                    </div>
                    <div className="w-[400px] flex flex-col items-start justify-center relative gap-[4px] text-center text-3xs text-red">
                      <div className="self-stretch flex flex-row items-center justify-start py-0 pr-0 pl-[260px] z-[0]">
                        <div className="relative font-extrabold">300mg</div>
                      </div>
                      <div className="rounded-81xl bg-background w-[400px] flex flex-col items-start justify-center z-[1] text-white">
                        <div className="rounded-81xl bg-red w-[300px] h-6 flex flex-row items-center justify-center py-0 px-3 box-border">
                          <div className="relative font-extrabold">320</div>
                        </div>
                      </div>
                      <div className="absolute my-0 mx-[!important] top-[15px] left-[275px] bg-orange-light w-0.5 h-6 z-[2]" />
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

export default Frame12;
