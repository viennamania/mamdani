'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Bread from "@/components-figma/bread";
import Footer from "@/components-figma/footer";


import Link from "next/link";


const Frame22: NextPage = () => {
  return (
    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-left text-xs text-dark font-menu-off">
      <div className="self-stretch flex flex-col items-center justify-start">
        <Top1
          logo="/usermain/images/logo1.svg"
          topBackgroundColor="#fff"
          topBorderBottom="1px solid #ddd"
          topBoxSizing="border-box"
          frameDivBorderBottom="2px solid #212121"
          frameDivBoxSizing="border-box"
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
        />
        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">
          <div className="xl:w-[1000px] flex flex-col items-center justify-start">
            <div className="self-stretch bg-white flex flex-col items-start justify-end p-10 relative gap-[40px]">

              <Link 
                    href="/feeds/my"
                    className=" no-underline flex flex-row items-center justify-start gap-[12px]"
                >  
              <Bread />
              </Link>

              <div className="self-stretch flex flex-col items-center justify-end gap-[20px] z-[1]">
                <div className="self-stretch flex flex-col items-center justify-end gap-[20px]">
                  <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-6 h-6"
                      alt=""
                      src="/usermain/images/avatar.svg"
                    />
                    <div className="flex-1 relative">
                      <span>
                        <span className="font-extrabold">닉네임</span>
                      </span>
                      <span className="text-grey-9">
                        <span>{` · `}</span>
                        <span>2023.10.09 18:00</span>
                      </span>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[20px] text-grey-6">
                      <img
                        className="relative w-6 h-6 overflow-hidden shrink-0"
                        alt=""
                        src="/usermain/images/bookmarkline.svg"
                      />
                      <img
                        className="relative w-6 h-6 overflow-hidden shrink-0"
                        alt=""
                        src="/usermain/images/bookmarkfill.svg"
                      />
                      <div className="flex flex-row items-center justify-start gap-[4px]">
                        <img
                          className="relative w-5 h-5 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/heart3line.svg"
                        />
                        <img
                          className="relative w-5 h-5 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/heart3fill.svg"
                        />
                        <div className="relative">142</div>
                      </div>
                      <img
                        className="relative w-6 h-6 overflow-hidden shrink-0"
                        alt=""
                        src="/usermain/images/more2line.svg"
                      />
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-center justify-end gap-[4px] text-grey-6">
                    <div className="self-stretch relative">
                      야식 · 디저트 · 외식
                    </div>
                    <div className="self-stretch relative text-13xl font-extrabold text-dark">
                      케익, 아메리카노
                    </div>
                  </div>
                </div>
                <div className="self-stretch relative h-px">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
                </div>
                <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                  <div className="flex flex-row items-center justify-center gap-[8px]">
                    <div className="relative flex items-center w-20 shrink-0">
                      식사량
                    </div>
                    <div className="self-stretch rounded-81xl bg-grey-f1 w-[300px] overflow-hidden shrink-0 flex flex-col items-start justify-center text-center text-3xs text-white">
                      <div className="self-stretch rounded-81xl bg-orange h-6 flex flex-row items-center justify-end py-0 px-3 box-border">
                        <div className="relative font-extrabold">과하게</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-[8px]">
                    <div className="relative flex items-center w-20 shrink-0">
                      식사소요시간
                    </div>
                    <div className="self-stretch rounded-81xl bg-background w-[300px] overflow-hidden shrink-0 flex flex-col items-start justify-center text-center text-3xs text-white">
                      <div className="rounded-81xl bg-orange w-[150px] h-6 flex flex-row items-center justify-end py-0 px-3 box-border">
                        <div className="relative font-extrabold">보통</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-center justify-end gap-[12px] z-[2] text-base">
                <div className="self-stretch relative leading-[24px]">
                  친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게 먹었어요
                </div>
                <img
                  className="self-stretch relative max-w-full overflow-hidden h-[560px] shrink-0 object-cover"
                  alt=""
                  src="/rectangle-64@2x.png"
                />
              </div>
              <div className="self-stretch rounded-tl-none rounded-tr-3xl rounded-b-3xl bg-background flex flex-col items-center justify-end p-5 gap-[12px] z-[3] text-xl">
                <div className="self-stretch relative font-extrabold">
                  전문가의 식단 분석
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-xs">
                  <img className="relative w-6 h-6" alt="" src="/usermain/images/avatar.svg" />
                  <div className="flex-1 relative">
                    <span className="font-extrabold">김지영</span>
                    <span> 영양사</span>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-center justify-end gap-[8px] text-sm">
                  <div className="self-stretch relative leading-[20px]">
                    <p className="m-0">
                      소고기는 100 g안에 199칼로리가 있습니다.
                    </p>
                    <p className="m-0">
                      칼로리 분석: 47% 지방, 0% 탄수화물, 53% 단백질….
                    </p>
                  </div>
                  {/*
                  <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
                    – 관리자에서 영양사, 관리자가 피드백 함.
                  </div>
                  */}
                </div>
              </div>

              
              <div className="my-0 mx-[!important] absolute top-[137px] left-[859px] rounded-xl bg-white shadow-[4px_4px_20px_rgba(0,_0,_0,_0.1)] flex flex-col items-center justify-center p-5 gap-[20px] z-[4] text-sm border-[1px] border-solid border-grey-e">
                <div className="relative">수정하기</div>
                <div className="relative">삭제하기</div>
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
  );
};

export default Frame22;
