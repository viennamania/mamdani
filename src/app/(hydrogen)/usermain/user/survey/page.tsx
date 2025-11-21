'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import HabitContainer from "@/components-figma/habit-container-first";
import Footer from "@/components-figma/footer";


import Link from "next/link";




export default function Page() {





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
    </div>

    <div className=" relative bg-white w-full overflow-hidden flex flex-col items-center justify-start">

      <div className=" self-stretch flex flex-col items-center justify-start">
        


        <div className=" self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">
          
          <HabitContainer />

        </div>


      </div>


    </div>




    <Footer
        footerAlignSelf="stretch"
        footerBorderTop="1px solid #eee"
        footerBoxSizing="border-box"
      />



    <div className="block xl:hidden sticky bottom-0 z-50  ">

      <div className="self-stretch bg-white shadow-[0px_0px_20px_rgba(0,_0,_0,_0.1)] flex flex-col items-center justify-center text-center text-3xs text-grey-9 font-noto-sans-kr">
        
        <div className="self-stretch flex flex-row flex-wrap items-center justify-between ml-5 mr-5">

          

          {/*
          <Link 
              href={'/'}
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/homefill.svg"
            />
            <b className="relative">홈</b>
          </Link>
          */}

          <Link 
              href={'/'}
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/homeline.svg"
            />
            <b className="relative">홈</b>
          </Link>


            {/*
          <div className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark">
            <input
              className="m-0 w-6 h-6 relative overflow-hidden shrink-0"
              type="checkbox"
            />
            <b className="relative">홈</b>
          </div>
              */}


          {/*
          <Link
              href={'/usermain/feeds'}
              className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/newspaperline.svg"
            />
            <div className="relative">피드</div>
          </Link>
          */}


          <Link 
              href={'/usermain/feeds'}
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/newspaperline.svg"
            />
            <b className="relative">피드</b>
          </Link>



          <Link 
              href={'/usermain/feeds/statistics'}
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]    ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/piechart2line.svg"
            />
            <b className="relative">통계</b>
          </Link>

          
          {/*
          <Link
              href={'/usermain/feeds/statistics'}
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/piechart2line.svg"
            />
            <div className="relative">통계</div>
          </Link>
          
          <div className="h-[60px] w-[48.8px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              alt=""
              src="/piechart2fill.svg"
            />
            <b className="relative">통계</b>
          </div>
          */}



          <Link 
              href={'/usermain/boards'}
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/message2line.svg"
            />
            <b className="relative">게시판</b>
          </Link>
          {/*
          <Link
              href={'/usermain/boards'}
              className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/message2line.svg"
            />
            <div className="relative">게시판</div>
          </Link>


          <div className="h-[60px] w-[55.7px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              alt=""
              src="/message2fill.svg"
            />
            <b className="relative">게시판</b>
          </div>
          */}



          <Link 
              href={'/usermain/survey/result'}
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/questionanswerfill.svg"
            />
            <b className="relative">설문</b>
          </Link>
          
          {/*
          <Link
              href={'/usermain/surveys'}
              className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/questionanswerline.svg"
            />
            <div className="relative">설문</div>
          </Link>
          <div className="h-[60px] w-[65px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              alt=""
              src="/questionanswerfill.svg"
            />
            <b className="relative">설문</b>
          </div>
          */}


          <Link 
              href={'/usermain/user/my-page'}
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/usersettingsline.svg"
            />
            <b className="relative">마이</b>
          </Link>

          {/*
          <Link
              href={'/usermain/user/my-page'}
              className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/usersettingsline.svg"
            />
            <div className="relative">마이</div>
          </Link>
          <div className="h-[60px] w-[55.7px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              alt=""
              src="/usersettingsfill.svg"
            />
            <b className="relative">마이</b>
          </div>
          */}


        </div>

      </div>

    </div>


    </>

  );
};

