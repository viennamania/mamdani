'use client';

import type { NextPage } from "next";

import FrameComponentHome from "@/components-figma/frame-component-home";

import ComponentDietHome from "@/components-figma/component-diet-home";

import ComponentBoardHome from "@/components-figma/component-board-home";

import ComponentHealthHome from "@/components-figma/component-health-home";
import ComponentSurveyHome from "@/components-figma/component-survey-home";


import Footer from "@/components-figma/footer";



import React, { useState, useRef, useEffect } from "react";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


import Header from "@/components-figma/header";

//import Top1 from "@/components-figma/top1";

import Top1 from "@/components-figma/top1-mobile";

///import TabBar from "@/components-figma/tab-bar";

import Link from "next/link";

import { useSession } from 'next-auth/react';





const squareVariants = {
  visible: { opacity: 1, scale: 4, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0 }
};

function Square() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={squareVariants}
      className="square"
    >


      <div className="self-stretch flex flex-col items-center justify-start ">

        {/*<Component6 />*/}

        Hello

      </div>

    </motion.div>
  );
}




export default function Dashboard() {

  const { data: session, status } = useSession();




  return (
    <>

    {/*
    <Header />
    */}
  
    <div className=" bg-dark sticky top-0 z-50 ">

      <Top1
        logo="/usermain/images/logo2.svg"
        topBackgroundColor="unset"
        topBorderBottom="unset"
        topBoxSizing="unset"
        frameDivBorderBottom="unset"
        frameDivBoxSizing="unset"
        divColor="#fff"
        frameDivBorderBottom1="unset"
        frameDivBoxSizing1="unset"
        divColor1="#fff"
        frameDivBorderBottom2="unset"
        frameDivBoxSizing2="unset"
        divColor2="#fff"
        divColor3="#fff"
        aboutColor="#fff"
        frameDivBorder="1px solid rgba(255, 255, 255, 0.5)"
        divColor4="#fff"
        frameDivBorder1="1px solid #fff"
        divColor5="#fff"
      />

    </div>


    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start">

      <div className="self-stretch flex flex-col items-center justify-start ">

      

        <FrameComponentHome />
        

        {/*
        <RevealOnScroll> 
            <p className=" text-17xl h-[15em] mt-[10em]"> 
                Welcome to the computer science portal! 
            </p> 
        </RevealOnScroll> 
        */}

        {/*
        <Square />
        */}

        
        <ComponentDietHome />

        
        <ComponentBoardHome />

        
        <ComponentHealthHome />

        <ComponentSurveyHome />
        

      </div>



    </div>


    <Footer
        footerAlignSelf="unset"
        footerBorderTop="unset"
        footerBoxSizing="unset"
      />

    


    <div className="block xl:hidden sticky bottom-0 z-50  ">


      <div className="self-stretch bg-white shadow-[0px_0px_20px_rgba(0,_0,_0,_0.1)] flex flex-col items-center justify-center text-center text-3xs text-grey-9 font-noto-sans-kr">
        
        <div className="self-stretch flex flex-row flex-wrap items-center justify-between ml-5 mr-5">

          


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
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   ">
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
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   ">
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
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
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
              className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   ">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src="/questionanswerline.svg"
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


