import type { NextPage } from "next";
import FeedContainerSurvey from "./feed-container-survey";

import Link from "next/link";


import React, { useEffect, useState } from "react";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Image from "next/image";

import { useSession, signIn, signOut } from 'next-auth/react';







const ComponentSurveyHome: NextPage = () => {


  const { data: session, status } = useSession();


  const [userData, setUserData] = useState<any>(null);


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);

      if (res.status === 404) {
        return;
      }

      const json = await res?.json();



      //////console.log(json);

      const data = json as any;
      
      if (data?.data) {

        setUserData(data?.data);

      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email]);





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



  const [createdAt, setCreatedAt] = useState(''); // 2024.01.03 15:34
  const [nutrition, setNutrition] = useState('');
  const [character, setCharacter] = useState('');


  const [loadingResult, setLoadingResult] = useState(true);



  // fetch survey result from server
  useEffect(() => {

    const fetchSurveyResult = async () => {
      
      if (userData?.id) {

        setLoadingResult(true);

        ///const res = await fetch(`/api/doingdoit/survey/resultById?_id=${id}`);

        const res = await fetch(`/api/doingdoit/survey/resultByUserId?_userId=${userData?.id}`);


        const json = await res?.json();
  
        //////console.log(json);
  
        const data = json as any;

      

        ///console.log("data=======", data);


        if (data?.data?.surveyResult) {

          ///console.log("data?.data?.surveyResult=======", data?.data?.surveyResult);

          // data?.data?.surveyResult is encodeURIComponent
          // decodeURIComponent(data?.data?.surveyResult) is string


          /////console.log("surveyResult=======", surveyResult);


          //console.log("createdAt=======", data?.data?.createdAt);


          setCreatedAt(data?.data?.createdAt);

          const surveyResult = JSON.parse(decodeURIComponent(data?.data?.surveyResult)) as any;


          const { character, nutrition } = surveyResult;

          setCharacter(character?.[0]?.code);
          setNutrition(nutrition);


          setLoadingResult(false);


        } else {

          setLoadingResult(false);

        }

      }

    }

    fetchSurveyResult();

  } , [userData?.id]);


  // if session.user.email includes '@cryptoss.beauty',
  // then don't redirect to survey page

  /*
  if ( session && !session.user.email.includes('@cryptoss.beauty') 
    && !loadingResult && createdAt === ''
    ) {

    window.location.href = "/usermain/survey/question1";

  }
  */


  return (

    <div className="
      hidden
      self-stretch bg-background flex-col items-center justify-start py-[50px] xl:py-[100px] px-5 xl:px-0 text-center text-xl text-grey-6 font-montserrat">
      <div className=" xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">

        <FeedContainerSurvey
          sectionTitle="설문"
          feedSectionSubtitle="설문으로 알아보는 나의 식습관!"
          propFlex="unset"
          propAlignSelf="stretch"
        />



        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={squareVariants}
          whileInView={{ scale: 1 } }

          className="
            rounded-lg
            self-stretch bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] box-border gap-5 flex flex-col xl:flex-row items-center justify-between p-10 border-[1px] border-solid border-grey-e"
        >
          <Image
            width={173}
            height={140}
            className="relative w-[172.7px]  h-[80px]  xl:h-[140px] overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/frame-survey.svg"
          />

          <div className="flex flex-col items-center justify-center gap-[24px]">

            <div className="  flex flex-col items-center justify-end gap-[12px]">
              <div className="self-stretch relative tracking-[0.1em] uppercase font-black">
                Waht you sale, waht you are!
              </div>
              <div className="self-stretch relative text-xl xl:text-13xl font-extrabold font-menu-off text-dark">
              나의 투자습관을 알아보세요!
              </div>
            </div>




            <motion.div
              className="box"
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
            <Link
              href="/usermain/survey/question1"
              className=" no-underline rounded-81xl bg-dark flex flex-row items-center justify-center py-3 px-6 text-sm text-background font-menu-off
                hover:bg-orange
              ">
              <div className="relative font-extrabold">시작</div>
            </Link>
            </motion.div>



          </div>
          {/*
          <img
            className="relative w-[155.9px] h-[140px] overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/frame6.svg"
          />
          */}

          <Image
            width={156}
            height={140}
            className="relative w-[155.9px] h-[80px] xl:h-[140px] overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/frame6.svg"
          />
        </motion.div>



      </div>
    </div>
  );
};

export default ComponentSurveyHome;
