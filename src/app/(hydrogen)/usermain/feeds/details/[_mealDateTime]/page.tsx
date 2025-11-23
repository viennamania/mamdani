'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Bread from "@/components-figma/bread";
import Footer from "@/components-figma/footer";


import Link from "next/link";
import ListDietBar1 from "@/components-figma/list-diet-bar1";
import ListDietBar2 from "@/components-figma/list-diet-bar2";


import { useState, useEffect, use } from "react";

import { useAnimation, motion } from "framer-motion";

import DateCell from '@/components/ui/date-cell';
import { u } from "uploadthing/dist/types-e8f81bbc";

import Image from "next/image";

import { useSession } from 'next-auth/react';






export default function FeedPage({ params }: any) {

  const { _mealDateTime } = params;

  console.log(' _mealDateTime: ', _mealDateTime);

  // mealDateTime:  2023-12-1-breakfast, 2023-12-1-lunch, 2023-12-1-dinner, 2023-12-1-snack, 2023-12-1-nightsnack
  

  const mealDateParam = _mealDateTime.split('-')[0] + '-' + _mealDateTime.split('-')[1] + '-' + _mealDateTime.split('-')[2];
  const mealTimeParam = _mealDateTime.split('-')[3];


  console.log(' mealDateParam: ', mealDateParam);
  console.log(' mealTimeParam: ', mealTimeParam);


  const id = '233223';





  const [feed, setFeed] = useState(   {   }  );

  const [loading, setLoading] = useState(false);


 



  const { data: session, status } = useSession();

    /* fetch user data from an API
    /api/doingdoit/user/getUser
  */
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    nickname: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      //////console.log(json);

      const data = json as any;
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email]);




  useEffect(() => {

    setMealDate(new Date(mealDateParam));

  } , [ mealDateParam ]);




  const [userNickname, setUserNickname] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [mealDate, setMealDate] = useState(new Date());

  const [mealFood, setMealFood] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [mealAmount, setMealAmount] = useState(0);
  const [mealSpeed, setMealSpeed] = useState(0);
  const [feedTitle, setFeedTitle] = useState("");
  const [feedContent, setFeedContent] = useState("");

  // image array
  const [feedImages, setFeedImages] = useState([]);

  const [feedbackYn, setFeedbackYn] = useState('');

  const [feedbackWriterId, setFeedbackWriterId] = useState("");
  const [feedbackWriterNickname, setFeedbackWriterNickname] = useState("");
  const [feedbackWriterName, setFeedbackWriterName] = useState("");
  const [feedbackWriterAvatar, setFeedbackWriterAvatar] = useState("");
  const [feddbackWriterEmail, setFeddbackWriterEmail] = useState("");
  const [feedbackContent, setFeedbackContent] = useState("");


  const [ mainImage, setMainImage ] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
  
      ////const res = await fetch('/api/doingdoit/feed/getFeedById?_id=' + id);

      const res = await fetch(`/api/doingdoit/feed/getFeedByMealDateTime?_email=${session?.user?.email}&_mealDate=${mealDateParam}&_mealTime=${mealTimeParam}`);
  
      const json  = await res?.json() as any;
  
      console.log("FeedPage data=", json?.data);
  
      setFeed(json?.data);

      setUserNickname(json.data?.nickname);
      

      if (json.data?.avatar == 'undefined' || json.data?.avatar == undefined) {
        
        //setUserAvatar("/usermain/images/avatar.svg");
        setUserAvatar("https://cryptoss.beauty/usermain/images/avatar.svg")

      } else {
        setUserAvatar(json.data?.avatar);
      }

      ///setMealDate(json.data?.mealDate);

      setMealFood(json.data?.mealFood);
      setMealTime(json.data?.mealTime);
      setMealAmount(json.data?.mealAmount);
      setMealSpeed(json.data?.mealSpeed);
      setFeedTitle(json.data?.feedTitle);
      setFeedContent(json.data?.feedContent);

      console.log("FeedPage image1=", json.data?.image1);

      const images = [] as any;
      images.push(json.data?.image1);
      images.push(json.data?.image2);
      images.push(json.data?.image3);
      images.push(json.data?.image4);
      images.push(json.data?.image5);
      images.push(json.data?.image6);
      images.push(json.data?.image7);
      images.push(json.data?.image8);
      images.push(json.data?.image9);
      images.push(json.data?.image10);

      setFeedImages(images);

      setMainImage(json.data?.image1);
      

      setFeedbackYn(json.data?.feedbackYn);

      setFeedbackWriterId(json.data?.feedbackWriterId);
      
      setFeedbackWriterNickname(
        json.data?.feedbackWriterNickname == 'undefined' || json.data?.feedbackWriterNickname == undefined ?
        "익명" : json.data?.feedbackWriterNickname
      );


      setFeedbackWriterName(json.data?.feedbackWriterName);
      
      setFeedbackWriterAvatar(
        
        json.data?.feedbackWriterAvatar == 'undefined' || json.data?.feedbackWriterAvatar == undefined ?
        "https://cryptoss.beauty/usermain/images/avatar.svg" : json.data?.feedbackWriterAvatar
      
        );


      setFeddbackWriterEmail(json.data?.feddbackWriterEmail);
      setFeedbackContent(json.data?.feedbackContent);

  
      setLoading(false);
  
    };
      
      fetchData();
  } ,[ id, ]);


  const [ mealFoodArray, setMealFoodArray ] = useState<any[]>([]);

  useEffect(() => {
      
      if (mealFood === undefined) {
        //setMealFoodArray([{foodName: "삼겹살"}, {foodName: "소고기"}]);
      } else if ( !Array.isArray(mealFood) ) {
        //setMealFoodArray([{foodName: "삼겹살"}, {foodName: "소고기"}]);
      } else {


        mealFood?.map((item , index) => (
          
          /////setMealFoodArray(mealFoodArray => [...mealFoodArray, item?.foodName])

          setMealFoodArray(mealFoodArray => [...mealFoodArray, item])
  
        ))

      }
    }
  , [mealFood]);

  

  const scrap = () => {

    //setLikeCount(likeCount + 1);

    // update my like list
    const res = fetch(`/api/doingdoit/feed/scrap?_id=${id}&_userId=${userData?.id}&_userNickname=${userData?.nickname}&_userAvatar=${userData?.avatar}&_userEmail=${userData?.email}`);

    // toast message
    //alert("스크랩 되었습니다.");

  }


  return (

    <>

    <div className="bg-dark felx sticky top-0 z-50 ">

      <Top1
        logo="/usermain/images/logo-oneclick.png"
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
    </div>

    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-left text-xs text-dark font-menu-off">
      <div className=" 
      self-stretch flex flex-col items-center justify-start">

        <div className=" 
        self-stretch bg-background flex flex-col items-center justify-start py-5 xl:py-10 ">


          <div className=" pl-5 pr-5 w-full  xl:pl-0 xl:pr-0   xl:w-[1000px] flex flex-col items-center justify-start">


            <div className="self-stretch bg-white flex flex-col items-start justify-end p-5 xl:p-10 relative gap-[40px]">

              <div
                className="self-stretch flex flex-row items-center justify-center pt-0 px-0 pb-5 gap-[12px] z-[0] text-left text-sm text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
              >

                <motion.div
                  className="w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                {/* history back */}

                  <button
                    type="button"
                    onClick={() => {
                      history.back();
                    }}
                  >

                    <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">


                        <Image
                          width="24"
                          height="24"
                          className="relative w-6 h-6 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/back.svg"
                        />
                        <div className="relative">뒤로</div>
                      

                    </div>
                  </button>
                
                </motion.div>


                <Image
                  width="24"
                  height="24"
                  className="relative w-6 h-6 overflow-hidden shrink-0 hidden"
                  alt=""
                  src="/usermain/images/x1.svg"
                />
              </div>


            {/* loading animaiton */}

            { loading ? (

              <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
                
                <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

                </div>
              </div>

            ) : (
            <>

              <div className=" 
                self-stretch flex flex-col items-center justify-end gap-[20px] z-[1]">


                <div className="
                  self-stretch flex flex-col items-center justify-end gap-[20px]">

                    <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                    
                    <div className="grid grid-cols-2 gap-[20px] w-full">

                      <div className="self-stretch flex flex-col items-start justify-start gap-[8px] xl:gap-0">


                        <div className="self-stretch flex flex-row items-center justify-start gap-[8px] ">



                        <Image
                          className="relative w-6 h-6 rounded-full "
                          src={userAvatar || "/usermain/images/avatar.svg"}
                          alt=""
                          width={24}
                          height={24}
                          style = {{ objectFit: 'cover' }}
                        />

                        <div className="flex flex-row items-center justify-center gap-2 ">
                        
                        <span className="font-extrabold flex  ">{userNickname}</span>
                        
                        <span className="hidden xl:block text-grey-9">
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

                        <span className="block  xl:hidden  text-grey-9">
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


                      <div className=" flex flex-row items-center justify-end gap-[3px]   xl:gap-[20px] text-grey-6">

                        <motion.div
                            className="w-6 h-6"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                          <button
                            type="button"
                            onClick={() => {
                              scrap();
                            }}
                          >
                            <img
                              className="relative w-6 h-6 overflow-hidden shrink-0"
                              alt=""
                              src="/usermain/images/bookmarkline.svg"
                            />
                          </button>
                        </motion.div>


                        {/*
                        <img
                          className="relative w-6 h-6 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/bookmarkfill.svg"
                        />
                        */}

                        <div className="flex flex-row items-center justify-start gap-[4px] ">
                          {/*
                          <img
                            className="relative w-5 h-5 overflow-hidden shrink-0"
                            alt=""
                            src="/usermain/images/heart3line.svg"
                          />
                          */}
                          <motion.div
                            className="w-6 h-6"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                          <button
                            type="button"
                            className="relative w-6 h-6 overflow-hidden shrink-0"
                          >
                            <img
                              className="relative w-5 h-5 overflow-hidden shrink-0"
                              alt=""
                              src="/usermain/images/heart3fill.svg"
                            />
                          </button>
                          </motion.div>
                          <div className="relative">142</div>
                        </div>
                        
                        <img
                          className="relative w-6 h-6 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/more2line.svg"
                        />
                      </div>

                    </div>



                    </div>



                    <div className="self-stretch flex flex-col items-center justify-end gap-[4px] text-grey-6">
                    <div className="self-stretch relative">
                      {
                        (mealTime == 'skip') ? '안먹었어요' : mealTime
                      }
                    </div>
                    
                    <div className="self-stretch relative leading-10  text-xl   xl:text-13xl font-extrabold text-dark">



                    {/*
                      //check mealFood is array or not
                      Array.isArray(mealFood) ? (
                        mealFood?.map((item, index) => (
                          <span key={index} >

                            {
                              index == (mealFood?.length-1) ? item + "" : item + ", "
                            }
                            
                          </span>
                        ))
                      ) : (
                        mealFood
                      )
                      
                      */}

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


                </div>


                <div className="self-stretch relative h-px">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
                </div>

                <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">

                 
                  <div className="  flex flex-row items-center justify-center gap-[8px]">
                    <div className="relative flex items-center w-20 shrink-0">
                      식사량
                    </div>

                    <div className="self-stretch rounded-81xl bg-orange-light  w-[200px]   xl:w-[300px] overflow-hidden shrink-0 flex flex-col items-start justify-center text-center text-3xs text-white">
                        <ListDietBar1
                          boardName="과하게"
                          mealAmount={mealAmount}
                        /> 
                    </div>
                  </div>


                  <div className="flex flex-row items-center justify-center gap-[8px]">
                    <div className="relative flex items-center w-20 shrink-0">
                      식사소요시간
                    </div>
                    <div className="self-stretch rounded-81xl bg-orange-light  w-[200px]  xl:w-[300px] overflow-hidden shrink-0 flex flex-col items-start justify-center text-center text-3xs text-white">
            
                      <ListDietBar2
                        boardName="보통"
                        mealSpeed={mealSpeed}
                      />
                    </div>
                  </div>

                </div>
              </div>


              <div className="self-stretch relative leading-[24px] text-base">
                  {
                        
                        // if feedTitle is more than 20 characters, then show only 20 characters and add "..."
                        //feedtitle && feedTitle?.replace(/(<([^>]+)>)/gi, "").length > 20 ? feedTitle?.replace(/(<([^>]+)>)/gi, "").substring(0, 20) + "..." :
                        //feedTitle?.replace(/(<([^>]+)>)/gi, "")
                        
                     // html 태그가 포함된 문자열을 출력할 때는 dangerouslySetInnerHTML 사용
                      <div dangerouslySetInnerHTML={{ __html: feedTitle as any }} />
                    
                  }
                </div>




              <div className="self-stretch flex flex-col items-center justify-end gap-[12px] z-[2] text-base">

                <div className="w-full flex items-center justify-center border  ">
                {/* feed image fit main image    */
                mainImage && (
                  <Image
                    ////className="self-stretch relative max-w-full overflow-hidden  shrink-0 object-cover"
                    className=" w-full rounded-sm "
                    src={mainImage}
                    alt=""
                    width={560}
                    height={560}

                    style={{
                      //objectFit: "contain",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                )}
                </div>

                {/* feed image[1] and feed image[2] is row small images list */}
                <div className="self-stretch grid  grid-cols-5 xl:grid-cols-10 items-center justify-center gap-1  xl:gap-[12px]">

                  {/* feed image[0] */}
                  {feedImages[0] && (
                    <Image
                      // hover mouse pointer
                      className={`
                        w-[80px] h-[80px] rounded-sm
                        hover:cursor-pointer
                        ${mainImage == feedImages[0] ? "  border-[1px] border-solid border-dark " : ""}
                      `}
                      
                      src={feedImages[0]}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}

                      onClick = {() => {
                        feedImages[0] && (
                          setMainImage(feedImages[0])
                        )
                      } }
                    />
                  )}

                  {/* feed image[1] */}
                  {feedImages[1] && (
                    <Image
                      // hover mouse pointer
                      className={`
                        w-[80px] h-[80px]
                        hover:cursor-pointer
                        ${mainImage == feedImages[1] ? "  border-[1px] border-solid border-dark " : ""}
                      `}
                      
                      
                      src={feedImages[1]}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}

                      onClick = {() => {
                        feedImages[1] && (
                          setMainImage(feedImages[1])
                        )
                      } }
                    />
                  )}

                  {/* feed image[2] */}
                  {feedImages[2] && (
                    <Image
                    className={`
                      w-[80px] h-[80px]
                      hover:cursor-pointer
                      ${mainImage == feedImages[2] ? "  border-[1px] border-solid border-dark " : ""}
                    `}
                      src={feedImages[2]}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}

                      /* onClicke change main image */
                      onClick={() => {
                        feedImages[2] && (
                          setMainImage(feedImages[2])
                        )
                      }}

                    />
                  )}


                  {/* feed image[3] */}
                  {feedImages[3] && (
                    <Image
                      className={`
                      w-[80px] h-[80px]
                      hover:cursor-pointer
                      ${mainImage == feedImages[3] ? "  border-[1px] border-solid border-dark " : ""}
                    `}
                      src={feedImages[3]}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}

                      /* onClicke change main image */
                      onClick={() => {
                        feedImages[3] && ( setMainImage(feedImages[3]) )
                      }}

                    />
                  )}

                  {/* feed image[4] */}
                  {feedImages[4] && (
                    <Image
                      className={`
                      w-[80px] h-[80px]
                      hover:cursor-pointer
                      ${mainImage == feedImages[4] ? "  border-[1px] border-solid border-dark " : ""}
                    `}
                      src={feedImages[4]}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}

                      /* onClicke change main image */
                      onClick={() => {
                        feedImages[4] && (
                          setMainImage(feedImages[4])
                        )
                      }}

                    />
                  )}

                  {/* feed image[5] */}
                  {feedImages[5] && (
                    <Image
                    className={`
                    w-[80px] h-[80px]
                    hover:cursor-pointer
                    ${mainImage == feedImages[5] ? "  border-[1px] border-solid border-dark " : ""}
                  `}
                      src={feedImages[5]}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}

                      /* onClicke change main image */
                      onClick={() => {
                        feedImages[5] && (
                          setMainImage(feedImages[5])
                        )
                      }}

                    />
                  )}

                  
                  {/* feed image[6] */}
                  {feedImages[6] && (
                    <Image
                      className={`
                      w-[80px] h-[80px]
                      hover:cursor-pointer
                      ${mainImage == feedImages[6] ? "  border-[1px] border-solid border-dark " : ""}
                    `}
                      src={feedImages[6]}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}

                      /* onClicke change main image */
                      onClick={() => {
                        feedImages[6] && (
                          setMainImage(feedImages[6])
                        
                        )
                      }}

                    />
                  )}

                  {/* feed image[7] */}
                  {feedImages[7] && (
                    <Image
                    className={`
                      w-[80px] h-[80px]
                      hover:cursor-pointer
                      ${mainImage == feedImages[7] ? "  border-[1px] border-solid border-dark " : ""}
                    `}
                      src={feedImages[7]}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}

                      /* onClicke change main image */
                      onClick={() => {
                        feedImages[7] && (
                          setMainImage(feedImages[7])
                        )
                      }}

                    />
                  )}

                  {/* feed image[8] */}
                  {feedImages[8] && (
                    <Image
                    className={`
                      w-[80px] h-[80px]
                      hover:cursor-pointer
                      ${mainImage == feedImages[8] ? "  border-[1px] border-solid border-dark " : ""}
                    `}
                      src={feedImages[8]}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}

                      /* onClicke change main image */
                      onClick={() => {
                        feedImages[8] && (
                          setMainImage(feedImages[8])
                        )
                      }}

                    />
                  )}

                  {/* feed image[9] */}
                  {feedImages[9] && (
                    <Image
                    className={`
                      w-[80px] h-[80px]
                      hover:cursor-pointer
                      ${mainImage == feedImages[9] ? "  border-[1px] border-solid border-dark " : ""}
                    `}
                      src={feedImages[9]}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}

                      /* onClicke change main image */
                      onClick={() => {
                        feedImages[9] && (
                          setMainImage(feedImages[9])
                        
                        )
                      }}

                    />
                  )}


                </div>




                

                {/*

                <div className="self-stretch relative leading-[24px]">
                  {feedContent}
                </div>
                */}

              </div>






              <div className="self-stretch rounded-tl-none rounded-tr-3xl rounded-b-3xl bg-background flex flex-col items-center justify-end p-5 gap-[12px] z-[3] text-xl">
                
                <div className="self-stretch relative font-extrabold">
                  전문가의 식단 분석
                </div>

                {feedbackYn && feedbackYn == 'Y' ? (

                <>
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-xs">


                
                  <Image
                    className="relative w-6 h-6 rounded-full"
                    src={feedbackWriterAvatar || "/usermain/images/avatar.svg"}
                    alt=""
                    width={100}
                    height={100}
                    style = {{ objectFit: 'cover' }}
                  />

                  <img className="relative w-5 h-5" alt="" src="/usermain/images/annotation.svg" />
                  
                  <div className="flex-1 relative">
                    <span className="font-extrabold">{feedbackWriterNickname}</span>
                    <span> 영양사</span>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-center justify-end gap-[8px] text-sm">
                  <div className="self-stretch relative leading-[20px]">

                    {/*
                    <p className="m-0">
                      소고기는 100 g안에 199칼로리가 있습니다.
                    </p>
                    <p className="m-0">
                      칼로리 분석: 47% 지방, 0% 탄수화물, 53% 단백질….
                    </p>
                    */}

                    {/* html 태그가 포함된 문자열을 출력할 때는 dangerouslySetInnerHTML 사용 */}
                    <div dangerouslySetInnerHTML={{ __html: feedbackContent as any }} />

                  </div>
                  {/*
                  <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
                    – 관리자에서 영양사, 관리자가 피드백 함.
                  </div>
                  */}
                </div>
                </>

                ) : (

                <>
                {/* 피드백이 없는 경우 */}
                <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
                  전문가의 식단 분석이 없습니다.
                </div>
                

                </>

                )}


              </div>

              {/*
              <div className="my-0 mx-[!important] absolute top-[137px] left-[859px] rounded-xl bg-white shadow-[4px_4px_20px_rgba(0,_0,_0,_0.1)] flex flex-col items-center justify-center p-5 gap-[20px] z-[4] text-sm border-[1px] border-solid border-grey-e">
                <div className="relative">수정하기</div>
                <div className="relative">삭제하기</div>
              </div>
              */}

              </>

              )}

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


