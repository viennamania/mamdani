'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Bread from "@/components-figma/bread";
import Footer from "@/components-figma/footer";

//import { Link } from "react-router-dom";

import Link from "next/link";


const Frame1: NextPage = () => {
  return (

    <>

    <div className="bg-dark felx sticky top-0 z-50 ">
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
                    frameDivBorderBottom2="2px solid #212121"
                    frameDivBoxSizing2="border-box"
                    divColor2="#212121"
                    divColor3="#212121"
                    aboutColor="#212121"
                    frameDivBorder="1px solid #666"
                    divColor4="#212121"
                    frameDivBorder1="1px solid #666"
                    divColor5="#212121"
                  />
          </div>


    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-left text-sm text-dark font-menu-off">
      <div className="self-stretch flex flex-col items-center justify-start">
    
        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">
          <div className="xl:w-[1000px] flex flex-col items-center justify-start">
            <div className="self-stretch bg-white flex flex-col items-start justify-end p-10 gap-[40px]">
              
                <Link
                    href="/usermain/boards/notice"
                    className=" no-underline flex "
                >
                    
              <Bread
                propAlignSelf="stretch"
                propZIndex="unset"
                propWidth="unset"
              />
            </Link>

              <div className="self-stretch flex flex-col items-center justify-end gap-[20px] text-13xl">
                <div className="self-stretch relative font-extrabold">
                  공지사항 입니다. 공지사항 입니다. 공지사항 입니다.
                </div>
                <div className="self-stretch relative text-xs text-grey-9">
                  2023.10.09 18:00
                </div>
              </div>
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <div className="self-stretch flex flex-col items-center justify-end gap-[12px]">
                <div className="self-stretch relative leading-[24px]">
                  친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게 먹었어요
                </div>
                <img
                  className="self-stretch relative max-w-full overflow-hidden h-[560px] shrink-0 object-cover"
                  alt=""
                  src="/rectangle-64@2x.png"
                />
              </div>

              
              
              
              <div className="self-stretch bg-white flex flex-col items-center justify-start p-5 text-xs text-grey-9">
                
                <Link
                    href="/usermain/boards/notice-details"
                    className=" no-underline self-stretch flex flex-row items-center justify-center py-5 px-0 gap-[12px] border-b-[1px] border-solid border-grey-d"
                >
                  <div className="relative">이전글</div>
                  <div className="flex-1 relative text-sm text-dark">
                    공지사항입니다.
                  </div>
                </Link>

                <Link
                    href="/usermain/boards/notice-details" 
                    className=" no-underline self-stretch flex flex-row items-center justify-center py-5 px-0 gap-[12px] border-b-[1px] border-solid border-grey-d">
                  <div className="relative">다음글</div>
                  <div className="flex-1 relative text-sm text-dark">
                    공지사항입니다.
                  </div>
                </Link>

              </div>

              <Link
                href="/usermain/boards/notice"
                 className="no-underline rounded-81xl flex flex-row items-center justify-start py-3 px-8 text-center border-[1px] border-solid border-grey-6">
                <div className="relative font-extrabold">목록</div>
              </Link>
              
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

export default Frame1;
