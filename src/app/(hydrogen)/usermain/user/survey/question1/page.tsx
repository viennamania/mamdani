'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Container from "@/components-figma/container-first";
import Footer from "@/components-figma/footer";

import { useAnimation, motion } from "framer-motion";

import Image from "next/image";


import { routes } from '@/config/routes';

import { useRouter } from 'next/navigation';



const Frame2: NextPage = () => {

  const router = useRouter();


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

    
    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start">

      <div className="self-stretch flex flex-col items-center justify-start">

 
        
        <div className="self-stretch xl:bg-background flex flex-col items-center justify-start xl:py-10 px-0">




        <div className="w-full xl:w-[1000px] flex flex-col items-center justify-start text-center text-5xl text-dark font-jalnan  ">

          <div className="self-stretch bg-white flex flex-col items-center justify-end p-5 xl:p-10 gap-[40px]">

               
 

            <Container
              menuNumber="1"
              mealDiaryStyleLunchCancel="갑자기 점심 약속이 취소 되었다. 어떻게 할까?"
              mealDiaryPrompt="다른 친구에게 연락한다."
              mealDiaryContent="혼자 밥을 먹는다."
              mealDiaryStepMealDiaryQue="다음"
              propAlignItems="flex-start"
              propJustifyContent="flex-start"
              propAlignItems1="center"
              propJustifyContent1="center"
            />



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

export default Frame2;
