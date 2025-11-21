import type { NextPage } from "next";
import Link from "next/link";
import React, {useState, useEffect, useMemo, type CSSProperties, use } from "react";



import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import ListDietBar1 from "./list-diet-bar1";
import ListDietBar2 from "./list-diet-bar2";


import Image from "next/image";

import DateCell from '@/components/ui/date-cell';
import { list } from "postcss";



/*
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



    </motion.div>
  );
}
*/




type List3Type = {

  id?: string;
  createdAt?: Date;
  email?: string;
  name?: string;
  nickname?: string;
  avatar?: string;
  mealDate?: Date;
  mealTime?: string;
  mealFood?: string;
  mealAmount?: number;
  mealSpeed?: number;
  feedTitle?: string;
  feedContent?: string;

  feedbackWriterId?: string;
  feedbackWriterNickname?: string;
  feedbackWriterName?: string;
  feedbackWriterAvatar?: string;
  feddbackWriterEmail?: string;
  feedbackContent?: string;




  cakeDescription?: string;
  frameDiv?: boolean;
  showRectangleIcon?: boolean;

  /** Style props */
  propOpacity?: CSSProperties["opacity"];
};

const ListDietSlide: NextPage<List3Type> = ({

  id,
  createdAt,
  email,
  name,
  nickname,
  avatar,
  mealDate,
  mealTime,
  mealFood,
  mealAmount,
  mealSpeed,
  feedTitle,
  feedContent,

  feedbackWriterId,
  feedbackWriterNickname,
  feedbackWriterName,
  feedbackWriterAvatar,
  feddbackWriterEmail,
  feedbackContent,



  cakeDescription,
  frameDiv,
  showRectangleIcon,
  propOpacity,
}) => {

  const list1Style: CSSProperties = useMemo(() => {
    return {
      opacity: propOpacity,
    };
  }, [propOpacity]);


  console.log('list1Style: ', list1Style);



  const squareVariants = {
    //visible: { opacity: 1, scale: 4, transition: { duration: 1 } },
    //visible: { opacity: 1, scale: 1, transition: { duration: 1 } },

    //visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    //hidden: { opacity: 0, scale: 0 }
    //hidden: { opacity: 1, scale: 0 }

    visible: { width : "100%", transition: { duration: 1 } },
    hidden: { width: 0 }
  };



  

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    } 
  }, [controls, inView]);




  const [ userAvatar, setUserAvatar ] = useState<string>("https://doingdoit-v1.vercel.app/usermain/images/avatar.svg");


  useEffect(() => {

    if (avatar === undefined) {
      setUserAvatar("https://doingdoit-v1.vercel.app/usermain/images/avatar.svg");
    } else

    if (avatar === "undefined") {
      setUserAvatar("https://doingdoit-v1.vercel.app/usermain/images/avatar.svg");
    } else if (avatar) {
      setUserAvatar(avatar);
    } 
  }, [avatar]);


  ////const shortFeedbackContent = feedbackContent?.slice(0, 30) + "...";
  
  const [ shortFeedbackContent, setShortFeedbackContent ] = useState<string>("");
  

  useEffect(() => {
      
      if (feedbackContent === undefined) {
        setShortFeedbackContent("");
      } else
  
      if (feedbackContent === "undefined") {
        setShortFeedbackContent("");
      } else if (feedbackContent) {
        setShortFeedbackContent(feedbackContent.slice(0, 20) + "...");
      } 
    }, [feedbackContent]);



    const [ mealFoodArray, setMealFoodArray ] = useState<any[]>([]);

    useEffect(() => {
        
        if (mealFood === undefined) {
          ///setMealFoodArray([{foodName: "삼겹살"}, {foodName: "소고기"}]);
        } else if ( !Array.isArray(mealFood) ) {
          ///setMealFoodArray([{foodName: "삼겹살"}, {foodName: "소고기"}]);
        } else {
  
  
          mealFood?.map((item , index) => (
            
            /////setMealFoodArray(mealFoodArray => [...mealFoodArray, item?.foodName])
  
            setMealFoodArray(mealFoodArray => [...mealFoodArray, item])
    
          ))
  
        }
      }
    , [mealFood]);



  if (!id) {
    return null;
  }


  return (

    <>


    
    <Link
      href={`/usermain/feeds/${id}`}

      //className="
      //  hover:border-gray-900  rounded-tl-none rounded-tr-41xl rounded-b-41xl bg-white shadow-[4px_4px_30px_rgba(140,_144,_171,_0.15)] box-border w-[480px] flex flex-col items-center justify-end p-10 gap-[40px] text-left text-xs text-dark font-menu-off border-[1px] border-solid border-grey-e"
    
      //className="w-80"

      style={
        window.innerWidth > 1024 ? list1Style :
        list1Style
      }

   

    > 

      <div
        className=" 
          xl:w-full  w-72
          rounded-lg
          xl:hover:border-gray-900  rounded-tl-none rounded-tr-41xl rounded-b-41xl bg-white shadow-[4px_4px_30px_rgba(140,_144,_171,_0.15)] box-border flex flex-col items-center justify-end p-5 xl:p-10 gap-[40px] text-left text-xs text-dark font-menu-off border-[1px] border-solid border-grey-e"
        style={list1Style}
      >

    
      
        <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">

          <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
            
            <Image
              width={24}
              height={24}
              className="relative w-6 h-6 rounded-full"
              
              alt=""
              src={userAvatar}
              ///src="https://doingdoit-v1.vercel.app/usermain/images/avatar.svg"
            />

            <div className="flex flex-col">

              <span className="font-extrabold h-5 ">{nickname}</span>

              <span className="text-grey-9">
                  <DateCell
                    date={mealDate as Date}
                    className=""
                    timeClassName=""
                    dateClassName=""
                    dateFormat="YYYY. MM. DD"
                    timeFormat=" "
                  />
              </span>

            </div>

          </div>

          <div className="self-stretch flex flex-col items-center justify-end gap-[4px] text-grey-6">
            <div className="self-stretch relative">
              {mealTime}
            </div>
            
            
            {/*
            <div className="self-stretch relative text-xl xl:text-5xl font-extrabold text-dark">
            {mealFood}
            </div>
            */}



            <div className="self-stretch relative leading-8  text-lg xl:text-5xl font-extrabold text-dark">
              
              {
        
                  mealFoodArray?.map(
                    (
                      item ,
                      index , 
                      
                    ) => (


                      <span key={index} >
                                {

                                  index == (mealFoodArray?.length-1) ? item?.foodName + "" : item?.foodName + ", "

                                }
                      </span>


                    ))
                
              }

            </div>





          </div>

          <div className=" w-full  xl:w-[270px] flex flex-col items-center justify-end gap-[8px] text-center text-3xs text-white">
            
            <div className="self-stretch rounded-81xl bg-grey-f1 overflow-hidden flex flex-col items-start justify-center">


        
              <ListDietBar1
                boardName="과하게"
                mealAmount={mealAmount}
              />
            

            {/*
              <motion.div
                    ref={ref}
                    animate={controls}
                    initial="hidden"
                    variants={squareVariants}
              >
                <div className="self-stretch rounded-81xl bg-orange h-6 flex flex-row items-center justify-end py-0 px-3 box-border">
                  <div className="relative font-extrabold">과하게</div>
                </div>
              </motion.div>
            */}


            </div>
            
            <div className="self-stretch rounded-81xl bg-grey-f1 overflow-hidden flex flex-col items-start justify-center">
              
              <ListDietBar2
                boardName="보통"
                mealSpeed={mealSpeed}
              />

              {/*

              {/*
              <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={squareVariants}
              >
              <div className="rounded-81xl bg-orange w-[150px] h-6 flex flex-row items-center justify-end py-0 px-3 box-border">
                <div className="relative font-extrabold">보통</div>
              </div>
              </motion.div>
              */}

            </div>
            
          </div>

        </div>


        {!frameDiv && (
          <div className="self-stretch hidden flex-col items-center justify-end gap-[12px] text-sm">
            <div className="self-stretch relative leading-[20px]">
              {cakeDescription}
            </div>
            {showRectangleIcon && (
              <img
                className="self-stretch relative max-w-full overflow-hidden h-60 shrink-0 object-cover"
                alt=""
                src="/usermain/images/rectangle-641@2x.png"
              />
            )}
          </div>
        )}


        <div className="mt-10 h-36 self-stretch rounded-tl-none rounded-tr-3xl rounded-b-3xl bg-background flex flex-col items-center justify-start p-5 gap-[12px]">
          
          {!feedbackWriterId  ? (
            <>
        
            <div className="   self-stretch flex flex-col items-center justify-end gap-[8px] text-sm">
              
              <div className="    self-stretch relative leading-[20px]">
                <p className="m-0">
                  피드백이 없습니다.
                </p>
              </div>

              <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
                {/*
                <Link href={`/usermain/feeds/${id}`}>
                */}

                  더보기
                {/*
                </Link>
                */}

              </div>
            </div>

          </>
          
          ) : (

            <>

          <div className="  self-stretch flex flex-row items-center justify-start gap-[8px]">

            
            {/*
            <img className="relative w-6 h-6" alt="" src="/usermain/images/avatar.svg" />
            */}
            <Image
              width={24}
              height={24}
              className="relative w-6 h-6 rounded-full"
              alt=""
              src={feedbackWriterAvatar || '/usermain/images/avatar.svg'}
            />



            <img className="relative w-5 h-5" alt="" src="/usermain/images/annotation.svg" />
            <div className="flex-1 relative">
              <span className="font-extrabold">
                {
                  feedbackWriterNickname === "undefined" ? (
                    //feedbackWriterName
                    "익명"
                  ) : (
                    feedbackWriterNickname
                  )
                }
              </span>
              <span> 영양사</span>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-end gap-[8px] text-sm">

            <div className="  self-stretch relative leading-[20px]">
              <div dangerouslySetInnerHTML={{ __html: shortFeedbackContent as any }} />
            </div>


            <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
              {/*
              <Link href={`/usermain/feeds/${id}`}>
              */}

                더보기
              {/*
              </Link>
              */}
              
            </div>
          </div>




            </>
          )}

        </div>




      </div>


    </Link>

   </>

  );
};

export default ListDietSlide;
