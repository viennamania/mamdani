'use client';

import type { NextPage } from "next";
import Link from "next/link";
import React, { useState, useEffect, useMemo, type CSSProperties, use } from "react";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


import ListDietBar1 from "./list-diet-bar1";
import ListDietBar2 from "./list-diet-bar2";
import List from "./list-notice";


import Image from "next/image";

import DateCell from '@/components/ui/date-cell';
import { set } from "lodash";




type List3Type = {

  meYn?: string;

  id?: string;
  createdAt?: Date;
  email?: string;
  name?: string;
  nickname?: string;
  avatar?: string;


  mealDate?: Date;
  mealTime?: string;
  mealFood?: any[];



  mealAmount?: number;
  mealSpeed?: number;
  feedTitle?: string;
  feedContent?: string;
  feedImage?: string;

  hiddenYn?: string;

  scrapCount?: number;
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;



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

const ListFeed: NextPage<List3Type> = ({

  meYn,

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
  feedImage,

  hiddenYn,

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


  const squareVariants = {
    //visible: { opacity: 1, scale: 4, transition: { duration: 1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0 }
  };

  

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
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
        setShortFeedbackContent(feedbackContent.slice(0, 200) + "...");
      } 
    }, [feedbackContent]);



  const [ mealFoodArray, setMealFoodArray ] = useState<any[]>([]);

  useEffect(() => {
      
      if (mealFood === undefined) {
        //setMealFoodArray([{foodName: "삼겹살"}, {foodName: "소고기"}]);
      } else if ( !Array.isArray(mealFood) ) {
        //setMealFoodArray([{foodName: "삼겹살"}, {foodName: "소고기"}]);
      } else {

        setMealFoodArray(mealFood);

        /*
        mealFood?.map((item , index) => (
          
          /////setMealFoodArray(mealFoodArray => [...mealFoodArray, item?.foodName])

          ////setMealFoodArray(mealFoodArray => [...mealFoodArray, item])

          
  
        ))
        */

      }
    }
  , [mealFood]);



  // feedTitle is more than 20 characters, then show only 20 characters and add "..."

  const [ shortFeedTitle, setShortFeedTitle ] = useState<string>("");
  useEffect(() => {


    if (!feedTitle || feedTitle === undefined) {
      setShortFeedTitle("");
      return;
    }


    let title = feedTitle.replace(/&nbsp;/g, ' ');


    title = title?.replace(/(<([^>]+)>)/gi, "");

    setShortFeedTitle(title?.length > 20 ? title?.substring(0, 20) + "..." : title);



    /*
                //feedTitle?.length && feedTitle?.length < 25 ? feedTitle : feedTitle?.substring(0, 25) + "..."

    // if feedTitle is more than 20 characters, then show only 20 characters and add "..."
    feedTitle && feedTitle?.replace(/(<([^>]+)>)/gi, "").length > 20 ? feedTitle?.replace(/(<([^>]+)>)/gi, "").substring(0, 20) + "..." :
    feedTitle?.replace(/(<([^>]+)>)/gi, "")
    */


  }, [feedTitle]);



    

  return (
    
    <Link href={`/usermain/feeds/${id}`}>
    <motion.div
      ref={ref}
      animate={controls}
      //initial="hidden"
      variants={squareVariants}
      whileInView={{ scale: 1 } }


      className=" 
      rounded-tl-none rounded-tr-41xl rounded-b-41xl bg-white shadow-[4px_4px_30px_rgba(140,_144,_171,_0.15)] box-border  xl:w-[480px] flex flex-col items-center justify-end p-5 xl:p-10 gap-[20px] xl:gap-[40px] text-left text-xs text-dark font-menu-off border-[1px] border-solid border-grey-e"
      style={list1Style}
    >
      
      <div className="self-stretch flex flex-col items-start justify-start gap-[20px]  ">

        <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">

          { meYn === "Y" ? (

            
            <div className="self-stretch relative leading-[20px]">
              
              <span className="font-extrabold">

                { hiddenYn === "Y" ? (
                  "비공개"
                ) : (
                  "공개"
                )}
                
              </span>
              
            </div>

          ) : (

            <div className="flex flex-row items-center justify-center gap-2 ">

              <Image
                width={24}
                height={24}
                className="relative w-6 h-6 rounded-full"
                alt=""
                
                src={userAvatar ? userAvatar : "/usermain/images/avatar.svg"}
             
              

                style = {{ objectFit: 'cover' }}
                ///src="https://doingdoit-v1.vercel.app/usermain/images/avatar.svg"
              />
              <span className="font-extrabold flex  ">{nickname}</span>
            </div>

          )}


          <div className="flex flex-row items-center justify-center gap-2 ">
            
    
            
            <span className="text-grey-9">
   
                {/*
             
                <DateCell
                  date={createdAt as Date}
                  className=""
                  timeClassName=""
                  dateClassName=""
                  dateFormat="YYYY. MM. DD"
                  timeFormat="HH:mm"
                />
                */}
                <DateCell
                  date={mealDate as Date}
                  className=""
                  timeClassName=""
                  dateClassName=""
                  dateFormat="YYYY. MM. DD"
                  timeFormat=" "
                  ///timeFormat="HH:mm"
                  // time display is not needed

                  ///timeFormat=""
                />

              

              
            </span>
          </div>

        </div>

        <div className="self-stretch flex flex-col items-center justify-end gap-[4px] text-grey-6">
          <div className="self-stretch relative">
             {
              (mealTime == 'skip') ? '안먹었어요' : mealTime
              }

          </div>


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




        <div className=" w-full  xl:w-[300px] flex flex-col items-center justify-end gap-[8px] text-center text-3xs text-white">
          

          { mealFoodArray?.length === 0 ? (

                               
            <div className="self-stretch rounded-81xl bg-orange  h-6 flex flex-row items-center justify-center py-0 px-3 box-border">
            <div className="relative font-extrabold  ">
              skip(먹지 않았음)
            </div>
            </div>

          ) : (
            <>
          
          <div className="self-stretch rounded-81xl bg-orange-light overflow-hidden flex flex-col items-start justify-center">
            
            <ListDietBar1
              boardName="과하게"
              mealAmount={mealAmount}
            />

          </div>


          <div className="self-stretch rounded-81xl bg-orange-light overflow-hidden flex flex-col items-start justify-center">

            <ListDietBar2
              boardName="보통"
              mealSpeed={mealSpeed}
            />
            
          </div>

          </>
          )}
        </div>

        <div className="self-stretch relative text-sm font-extrabold text-dark">

          {
          
            //feedTitle?.length && feedTitle?.length < 25 ? feedTitle : feedTitle?.substring(0, 25) + "..."

            // if feedTitle is more than 20 characters, then show only 20 characters and add "..."
            //feedTitle && feedTitle?.replace(/(<([^>]+)>)/gi, "").length > 20 ? feedTitle?.replace(/(<([^>]+)>)/gi, "").substring(0, 20) + "..." :
            //feedTitle?.replace(/(<([^>]+)>)/gi, "")

            shortFeedTitle

          }

        </div>


        {/*  feed image fit    */}
        
        <div className="self-stretch relative items-center justify-center">
          {feedImage && (
  
            <Image
              width={480}
              height={480}
              className="relative w-120 h-60"

              style={{
                //objectFit: "contain",
                objectFit: "cover",
                objectPosition: "center",
              }}

              alt=""
              src={
                feedImage
              }
            />
          )}
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
              src="/usermain/figma/rectangle-641@2x.png"
            />
          )}
        </div>
      )}

      
      <div className=" self-stretch rounded-tl-none rounded-tr-3xl rounded-b-3xl bg-background flex flex-col items-center justify-start p-5 gap-[12px]">
        
        {!feedbackWriterId  ? (
          <>
      
          <div className="   self-stretch flex flex-col items-center justify-end gap-[8px] text-sm">
            <div className="self-stretch relative leading-[20px]">
              <p className="m-0">
                피드백이 없습니다.
              </p>
            </div>
            <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
              <Link href={`/usermain/feeds/${id}`}>
                더보기
              </Link>
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
            src={
              feedbackWriterAvatar && feedbackWriterAvatar !== undefined && feedbackWriterAvatar !== "undefined" && feedbackWriterAvatar !== "null" 
              ? feedbackWriterAvatar : "https://doingdoit-v1.vercel.app/usermain/images/avatar.svg"

              ///"/usermain/images/avatar.svg"
            }
            style = {{ objectFit: 'cover' }}

            ///src="https://doingdoit-v1.vercel.app/usermain/images/avatar.svg"
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

            <div
              dangerouslySetInnerHTML={{ __html: shortFeedbackContent as any }}
              className="self-stretch relative leading-[20px] "
            
            />

          <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
            <Link href={`/usermain/feeds/${id}`}>
              더보기
            </Link>
          </div>
        </div>




          </>
        )}

      </div>
    

    </motion.div>

    </Link>


  );
};

export default ListFeed;
