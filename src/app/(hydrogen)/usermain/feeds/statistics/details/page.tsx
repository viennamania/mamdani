'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import MealStatisticsContainer from "@/components-figma/meal-statistics-container";
import Footer from "@/components-figma/footer";

import GrCalory from "@/components-figma/gr-calory";
import GrP from "@/components-figma/gr-p";


import Link from "next/link";


import { useCallback, useState, useEffect, useMemo } from "react";

import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import { parse } from "path";


import { useAnimation, motion } from "framer-motion";
import Image from "next/image";


import { DatePicker } from '@/components/ui/datepicker';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';




export default function Page() {

  const [mealDate, setMealDate] = useState<string>();

  if (mealDate === undefined) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    setMealDate(`${year}-${month}-${date}`);

  }




  const router = useRouter();

  
  const { data: session, status } = useSession();


  const [loading, setLoading] = useState(false);

  const [error, setError] = useState();


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

      //////////console.log(json);

      const data = json as any;
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email]);





  const [selectedDate, setSelectedDate] = useState(new Date());


  const [meal, setMeal] = useState(

    {
      date: mealDate,
      totalKcal: 0,

      breakfastCount: 0,
      breakfast: [],
      breakfastMealAmount: 0,
      breakfastMealSpeed: 0,
      
      breakfastKcal: 0,
      breakfastCarbohydrate: 0,
      breakfastProtein: 0,
      breakfastFat: 0,

      lunchCount: 0,
      lunch: [],
      lunchMealAmount: 0,
      lunchMealSpeed: 0,
      
      lunchKcal: 0,
      lunchCarbohydrate: 0,
      lunchProtein: 0,
      lunchFat: 0,

      dinnerCount: 0,
      dinner: [],
      dinnerMealAmount: 0,
      dinnerMealSpeed: 0,
      
      dinnerKcal: 0,
      dinnerCarbohydrate: 0,
      dinnerProtein: 0,
      dinnerFat: 0,


      snackCount: 0,
      snack: [],
      snackMealAmount: 0,
      snackMealSpeed: 0,
      
      snackKcal: 0,
      snackCarbohydrate: 0,
      snackProtein: 0,
      snackFat: 0,


      midnightSnackCount: 0,
      midnightSnack: [],
      midnightSnackMealAmount: 0,
      midnightSnackMealSpeed: 0,

      midnightSnackKcal: 0,
      midnightSnackCarbohydrate: 0,
      midnightSnackProtein: 0,
      midnightSnackFat: 0,
    }

  );







  useEffect(() => {


    setSelectedDate(new Date(mealDate || new Date()));
    

    const fetchData = async () => {
      setLoading(true);


      // 
      //////const res = await fetch(`/api/doingdoit/feed/getStatistics?_email=${session?.user?.email}&_mealDate=2023-12-19`);

      const res = await fetch(`/api/doingdoit/feed/getStatisticsDayByEmail?_email=${session?.user?.email}&_mealDate=${mealDate}`);


      const data  = await res?.json() as any;

      
      ////console.log(' data: ',data?.data);



      const posts = data?.data?.mealTimeData;

  


      /*
      [
    { mealTime: '저녁', mealAmount: 4, mealSpeed: 3, mealFood: [Array] },
    { mealTime: '간식', mealAmount: 3, mealSpeed: 3, mealFood: [Array] },
    { mealTime: '아침', mealAmount: 2, mealSpeed: 4, mealFood: [Array] },
      ]
      */
     /* breakfastMealAmount is average of mealAmount of breakfast*/

      const breakfastMealAmount = posts?.filter((post: any) => post.mealTime === '아침').reduce((acc: any, cur: any) => acc + cur.mealAmount, 0) / posts?.filter((post: any) => post.mealTime === '아침')?.length;
      const breakfastMealSpeed = posts?.filter((post: any) => post.mealTime === '아침').reduce((acc: any, cur: any) => acc + cur.mealSpeed, 0) / posts?.filter((post: any) => post.mealTime === '아침')?.length;
      const breakfast = posts?.filter((post: any) => post.mealTime === '아침').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      // sum of kcal of mealFood of breakfast
      let breakfastKcal = 0;
      for (let i = 0; i < breakfast?.length; i++) {
        parseInt(breakfast[i]?.kcal) && (breakfastKcal += parseInt(breakfast[i].kcal));
      }
      let breakfastCarbohydrate = 0;
      for (let i = 0; i < breakfast?.length; i++) {
        parseInt(breakfast[i]?.carbohydrate) && (breakfastCarbohydrate += parseInt(breakfast[i].carbohydrate));
      }
      let breakfastProtein = 0;
      for (let i = 0; i < breakfast?.length; i++) {
        parseInt(breakfast[i]?.protein) && (breakfastProtein += parseInt(breakfast[i].protein));
      }
      let breakfastFat = 0;
      for (let i = 0; i < breakfast?.length; i++) {
        parseInt(breakfast[i]?.fat) && (breakfastFat += parseInt(breakfast[i].fat));
      }



      const lunchMealAmount = posts?.filter((post: any) => post.mealTime === '점심').reduce((acc: any, cur: any) => acc + cur.mealAmount, 0) / posts?.filter((post: any) => post.mealTime === '점심')?.length;
      const lunchMealSpeed = posts?.filter((post: any) => post.mealTime === '점심').reduce((acc: any, cur: any) => acc + cur.mealSpeed, 0) / posts?.filter((post: any) => post.mealTime === '점심')?.length;
      const lunch = posts?.filter((post: any) => post.mealTime === '점심').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      let lunchKcal = 0;
      for (let i = 0; i < lunch?.length; i++) {
        parseInt(lunch[i]?.kcal) && (lunchKcal += parseInt(lunch[i].kcal));
      }
      let lunchCarbohydrate = 0;
      for (let i = 0; i < lunch?.length; i++) {
        parseInt(lunch[i]?.carbohydrate) && (lunchCarbohydrate += parseInt(lunch[i].carbohydrate));
      }
      let lunchProtein = 0;
      for (let i = 0; i < lunch?.length; i++) {
        parseInt(lunch[i]?.protein) && (lunchProtein += parseInt(lunch[i].protein));
      }
      let lunchFat = 0;
      for (let i = 0; i < lunch?.length; i++) {
        parseInt(lunch[i]?.fat) && (lunchFat += parseInt(lunch[i].fat));
      }



      const dinnerMealAmount = posts?.filter((post: any) => post.mealTime === '저녁').reduce((acc: any, cur: any) => acc + cur.mealAmount, 0) / posts?.filter((post: any) => post.mealTime === '저녁')?.length;
      const dinnerMealSpeed = posts?.filter((post: any) => post.mealTime === '저녁').reduce((acc: any, cur: any) => acc + cur.mealSpeed, 0) / posts?.filter((post: any) => post.mealTime === '저녁')?.length;
      const dinner = posts?.filter((post: any) => post.mealTime === '저녁').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      let dinnerKcal = 0;
      for (let i = 0; i < dinner?.length; i++) {
        parseInt(dinner[i]?.kcal) && (dinnerKcal += parseInt(dinner[i].kcal));
      }
      let dinnerCarbohydrate = 0;
      for (let i = 0; i < dinner?.length; i++) {
        parseInt(dinner[i]?.carbohydrate) && (dinnerCarbohydrate += parseInt(dinner[i].carbohydrate));
      }
      let dinnerProtein = 0;
      for (let i = 0; i < dinner?.length; i++) {
        parseInt(dinner[i]?.protein) && (dinnerProtein += parseInt(dinner[i].protein));
      }
      let dinnerFat = 0;
      for (let i = 0; i < dinner?.length; i++) {
        parseInt(dinner[i]?.fat) && (dinnerFat += parseInt(dinner[i].fat));
      }



      const snackMealAmount = posts?.filter((post: any) => post.mealTime === '간식').reduce((acc: any, cur: any) => acc + cur.mealAmount, 0) / posts?.filter((post: any) => post.mealTime === '간식')?.length;
      const snackMealSpeed = posts?.filter((post: any) => post.mealTime === '간식').reduce((acc: any, cur: any) => acc + cur.mealSpeed, 0) / posts?.filter((post: any) => post.mealTime === '간식')?.length;
      const snack = posts?.filter((post: any) => post.mealTime === '간식').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      let snackKcal = 0;
      for (let i = 0; i < snack?.length; i++) {
        parseInt(snack[i]?.kcal) && (snackKcal += parseInt(snack[i].kcal));
      }
      let snackCarbohydrate = 0;
      for (let i = 0; i < snack?.length; i++) {
        parseInt(snack[i]?.carbohydrate) && (snackCarbohydrate += parseInt(snack[i].carbohydrate));
      }
      let snackProtein = 0;
      for (let i = 0; i < snack?.length; i++) {
        parseInt(snack[i]?.protein) && (snackProtein += parseInt(snack[i].protein));
      }
      let snackFat = 0;
      for (let i = 0; i < snack?.length; i++) {
        parseInt(snack[i]?.fat) && (snackFat += parseInt(snack[i].fat));
      }



      const midnightSnackMealAmount = posts?.filter((post: any) => post.mealTime === '야식').reduce((acc: any, cur: any) => acc + cur.mealAmount, 0) / posts?.filter((post: any) => post.mealTime === '야식')?.length;
      const midnightSnackMealSpeed = posts?.filter((post: any) => post.mealTime === '야식').reduce((acc: any, cur: any) => acc + cur.mealSpeed, 0) / posts?.filter((post: any) => post.mealTime === '야식')?.length;
      const midnightSnack = posts?.filter((post: any) => post.mealTime === '야식').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      let midnightSnackKcal = 0;
      for (let i = 0; i < midnightSnack?.length; i++) {
        parseInt(midnightSnack[i]?.kcal) && (midnightSnackKcal += parseInt(midnightSnack[i].kcal));
      }
      let midnightSnackCarbohydrate = 0;
      for (let i = 0; i < midnightSnack?.length; i++) {
        parseInt(midnightSnack[i]?.carbohydrate) && (midnightSnackCarbohydrate += parseInt(midnightSnack[i].carbohydrate));
      }
      let midnightSnackProtein = 0;
      for (let i = 0; i < midnightSnack?.length; i++) {
        parseInt(midnightSnack[i]?.protein) && (midnightSnackProtein += parseInt(midnightSnack[i].protein));
      }
      let midnightSnackFat = 0;
      for (let i = 0; i < midnightSnack?.length; i++) {
        parseInt(midnightSnack[i]?.fat) && (midnightSnackFat += parseInt(midnightSnack[i].fat));
      }


      const beakfastCount = posts?.filter((post: any) => post.mealTime === '아침')?.length;
      const lunchCount = posts?.filter((post: any) => post.mealTime === '점심')?.length;
      const dinnerCount = posts?.filter((post: any) => post.mealTime === '저녁')?.length;
      const snackCount = posts?.filter((post: any) => post.mealTime === '간식')?.length;
      const midnightSnackCount = posts?.filter((post: any) => post.mealTime === '야식')?.length;

    




      console.log(' breakfastCarbohydrate: ', breakfastCarbohydrate);
      console.log(' breakfastProtein: ', breakfastProtein);
      console.log(' breakfastFat: ', breakfastFat);

      // sum of breakfastKcal, lunchKcal, dinnerKcal, snackKcal, midnightSnackKcal
      // check if breakfastKcal, lunchKcal, dinnerKcal, snackKcal, midnightSnackKcal is NaN

      ///const totalKcal =  breakfastKcal + lunchKcal + dinnerKcal + snackKcal + midnightSnackKcal;

      // sum of breakfastKcal, lunchKcal, dinnerKcal, , midnightSnackKcal
      // check if breakfastKcal, lunchKcal, dinnerKcal, midnightSnackKcal is NaN

      const totalKcal = (breakfastKcal || 0) + (lunchKcal || 0) + (dinnerKcal || 0) + (snackKcal || 0) +  (midnightSnackKcal || 0);






      const totalCarbohydrate = (breakfastCarbohydrate || 0) + (lunchCarbohydrate || 0) + (dinnerCarbohydrate || 0) + (snackCarbohydrate || 0) + (midnightSnackCarbohydrate || 0);
      const totalProtein = (breakfastProtein || 0) + (lunchProtein || 0) + (dinnerProtein || 0) + (snackProtein || 0) + (midnightSnackProtein || 0);
      const totalFat = (breakfastFat || 0) + (lunchFat || 0) + (dinnerFat || 0) + (snackFat || 0) + (midnightSnackFat || 0);



 

      setMeal({
        date: mealDate,
        
        totalKcal: totalKcal,

        breakfastCount: beakfastCount,
        breakfast: breakfast,
        breakfastMealAmount: breakfastMealAmount,
        breakfastMealSpeed: breakfastMealSpeed,
        
      
        breakfastKcal: breakfastKcal,
        breakfastCarbohydrate: breakfastCarbohydrate,
        breakfastProtein: breakfastProtein,
        breakfastFat: breakfastFat,


        lunchCount: lunchCount,
        lunch: lunch,
        lunchMealAmount: lunchMealAmount,
        lunchMealSpeed: lunchMealSpeed,


        lunchKcal: lunchKcal,
        lunchCarbohydrate: lunchCarbohydrate,
        lunchProtein: lunchProtein,
        lunchFat: lunchFat,


        dinnerCount: dinnerCount,
        dinner: dinner,
        dinnerMealAmount: dinnerMealAmount,
        dinnerMealSpeed: dinnerMealSpeed,
        
        dinnerKcal: dinnerKcal,
        dinnerCarbohydrate: dinnerCarbohydrate,
        dinnerProtein: dinnerProtein,
        dinnerFat: dinnerFat,


        snackCount: snackCount,
        snack: snack,
        snackMealAmount: snackMealAmount,
        snackMealSpeed: snackMealSpeed,
        
        snackKcal: snackKcal,
        snackCarbohydrate: snackCarbohydrate,
        snackProtein: snackProtein,
        snackFat: snackFat,


        midnightSnackCount: midnightSnackCount,
        midnightSnack: midnightSnack,
        midnightSnackMealAmount: midnightSnackMealAmount,
        midnightSnackMealSpeed: midnightSnackMealSpeed,
        
        midnightSnackKcal: midnightSnackKcal,
        midnightSnackCarbohydrate: midnightSnackCarbohydrate,
        midnightSnackProtein: midnightSnackProtein,
        midnightSnackFat: midnightSnackFat,

      });
    

          
      

      setLoading(false);

    };


    fetchData();


  } ,[ session?.user?.email, mealDate ]);




  ///////console.log(' meal: ', meal);

  const changeDate = (date: Date) => {

    // fetch data from API
    // mealTime of the date

    console.log("changeDate date : " + date);




    setMealDate(date.toISOString().slice(0, 10));


  }



  
  return (

    <>

    <div className="bg-dark sticky top-0 z-50 ">
    <Top1
          logo="/usermain/images/logo-oneclick.png"
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

          <div className=" w-full pl-5 pr-5 xl:pl-0 xl:pr-0 xl:w-[1000px] flex flex-col items-center justify-start gap-[40px] ">
            
            {/*
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
            */}


  




            <div className="self-stretch bg-white flex flex-col items-center justify-start p-10 gap-[40px] ">



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




              <div className="relative font-extrabold text-xl xl:text-17xl">
                How you eat? (식사패턴)
              </div>

              

              <div className="flex-1 flex flex-col items-center justify-center gap-[8px] text-center text-xs text-grey-6">


                <div className="flex flex-row items-center justify-center gap-10">

                  {/* previos day button */}
                  <button
                    onClick={() => {
                      const prevDate = new Date( mealDate || new Date()  );
                      prevDate.setDate(prevDate.getDate() - 1);
                      changeDate(prevDate);
                    }}
                  >
                    <AiOutlineLeft className="h-5 w-5" />
                  </button>

                  <DatePicker
                    selected={
                      new Date(mealDate || new Date() )
                    }

                    ///onChange={(date: Date) => setMealDate(date)}

                    onChange={(date: Date) => {
                      ///setMealDate(date);

                      changeDate(date);

                    }}

                    placeholderText=""
                    showFullMonthYearPicker
                    popperPlacement="bottom-end"

                    className=" w-48  text-large text-black font-semibold "
                  />

                  {/* next day button */}
                  <button
                    onClick={() => {
                      const nextDate = new Date(mealDate || new Date());
                      nextDate.setDate(nextDate.getDate() + 1);
                      changeDate(nextDate);
                    }}
                  >
                    <AiOutlineRight className="h-5 w-5" />
                  </button>

                </div>




                <div
                  className="mt-5 self-stretch rounded-xl flex flex-col xl:flex-row items-start justify-center p-5 gap-[20px] text-left text-base border-[1px] border-solid border-grey-light"     
                >
                

                    
                <div className="relative font-extrabold flex items-center w-40 shrink-0">
                  

                  {/*
                  {selectedDate.getFullYear()}.{selectedDate.getMonth()+1}.{selectedDate.getDate()}
                  */}
                  
                  식사

                </div>
                


                <div className="flex-1 flex flex-col items-start justify-end gap-[8px] text-center text-xs text-grey-6">

              
                  {meal.breakfast && meal.breakfast?.length > 0 && (
                  <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                    <Link
                      href={`/usermain/feeds/details/${mealDate}-breakfast`}
                      className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3"
                    >
                      <div className="relative w-8 ">아침</div>
                    </Link>
                    <div className="relative text-sm text-dark">
                      {
                        //meal.breakfast === '0' ? '-' : meal.breakfast

                        meal.breakfast && meal.breakfast?.map((item: any) => {
                          ///return item?.foodName + ', ';
                          // last item don't add ','
                          return item?.foodName + (meal.breakfast[meal.breakfast?.length-1] === item ? '' : ', ');
                        } )
                      }
                      
                    </div>
                  </div>
                  )}

                  {meal.lunch && meal.lunch?.length > 0 && (
                  <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                    <Link
                      href={`/usermain/feeds/details/${mealDate}-lunch`}
                      className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3"
                    >
                      <div className="relative w-8">점심</div>
                    </Link>
                    <div className="relative text-sm text-dark">
                      {
                        meal.lunch && meal.lunch?.map((item: any) => {
                          //return item?.foodName + ', ';
                          // last item don't add ','
                          return item?.foodName + (meal.lunch[meal.lunch?.length-1] === item ? '' : ', ');
                        } )
                      }
                    </div>
                  </div>
                  )}

                  {meal.dinner && meal.dinner?.length > 0 && (
                  <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                    <Link
                      href={`/usermain/feeds/details/${mealDate}-dinner`}
                      className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3"
                    >
                      <div className="relative w-8">저녁</div>
                    </Link>
                    <div className="relative text-sm text-dark">
                      {
                        meal.dinner && meal.dinner?.map((item: any) => {
                          //return item?.foodName + ', ';
                          // last item don't add ','
                          return item?.foodName + (meal.dinner[meal.dinner?.length-1] === item ? '' : ', ');
                        } )
                      }
                    </div>
                  </div>
                  )}


                  {meal.snack && meal.snack?.length > 0 && (
                  <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                    <Link
                      href={`/usermain/feeds/details/${mealDate}-snack`}
                      className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3"
                    >
                      <div className="relative w-8">간식</div>
                    </Link>
                    <div className="relative text-sm text-dark">
                      {
                        meal.snack && meal.snack?.map((item: any) => {
                          ////return item?.foodName + ', ';
                          // last item don't add ','
                          return item?.foodName + (meal.snack[meal.snack?.length-1] === item ? '' : ', ');
                        } )
                      }
                    </div>
                  </div>
                  )}
                  

                  {meal.midnightSnack && meal.midnightSnack?.length > 0 && (
                  <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                    <Link
                      href={`/usermain/feeds/details/${mealDate}-midnightSnack`}
                      className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3"
                    >
                      <div className="relative w-8">야식</div>
                    </Link>
                    <div className="relative text-sm text-dark">
                      {
                        meal.midnightSnack && meal.midnightSnack?.map((item: any) => {
                          ////return item?.foodName + ', ';
                          // last item don't add ','
                          return item?.foodName + (meal.midnightSnack[meal.midnightSnack?.length-1] === item ? '' : ', ');
                        } )
                      }
                    </div>
                  </div>
                  )}


                </div>


                </div>

                </div>



       
              <MealStatisticsContainer
                //barBreakfast={  (int)(meal?.breakfastMealAmount* 20 ).toString() }
                //barLunch={ (meal?.lunchMealAmount * 20).toString() }
                //barDinner={ (meal?.dinnerMealAmount * 20).toString() }
                //barSnack={ (meal?.snackMealAmount * 20).toString() }

                barBreakfast={ meal?.breakfastMealAmount ? (meal?.breakfastMealAmount * 20).toString() : "0" }
                barLunch={ meal?.lunchMealAmount ? (meal?.lunchMealAmount * 20).toString() : "0" }
                barDinner={ meal?.dinnerMealAmount ? (meal?.dinnerMealAmount * 20).toString() : "0" }
                barSnack={ meal?.snackMealAmount ? (meal?.snackMealAmount * 20).toString() : "0" }
                barMidnightSnack={ meal?.midnightSnackMealAmount ? (meal?.midnightSnackMealAmount * 20).toString() : "0" }
                
                mealAmountStatsMealTimeSt="식사량 통계"
                healthyEatingTip1HealthyE="적절한 식사량을 유지하면 과식과 폭식을 줄일 수 있어요!"
                eatingSpeedTip="많이"
                eatingSpeedDescription="적게"
              />

              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>

              <MealStatisticsContainer
                barBreakfast={ meal?.breakfastMealSpeed ? (meal?.breakfastMealSpeed * 20).toString() : "0" }
                barLunch={ meal?.lunchMealSpeed ? (meal?.lunchMealSpeed * 20).toString() : "0" }
                barDinner={ meal?.dinnerMealSpeed ? (meal?.dinnerMealSpeed * 20).toString() : "0" }
                barSnack={ meal?.snackMealSpeed ? (meal?.snackMealSpeed * 20).toString() : "0" }
                barMidnightSnack={ meal?.midnightSnackMealSpeed ? (meal?.midnightSnackMealSpeed * 20).toString() : "0" }

                mealAmountStatsMealTimeSt="식사소요시간 통계"
                healthyEatingTip1HealthyE="천천히 꼭꼭 씹어먹을수록 소화력을 높일 수 있어요"
                eatingSpeedTip="빠르게"
                eatingSpeedDescription="천천히"
                propBackgroundColor="#6cf437"
              />
            </div>



            <div className="self-stretch bg-white flex flex-col items-center justify-start p-10 gap-[40px] text-2xl xl:text-17xl">
              <div className="relative font-extrabold">What you eat?(식단)</div>
              
              <GrCalory
                breakfastCount={ meal?.breakfastCount ? meal?.breakfastCount : 0 }
                lunchCount={ meal?.lunchCount ? meal?.lunchCount : 0 }
                dinnerCount={ meal?.dinnerCount ? meal?.dinnerCount : 0 }
                snackCount={ meal?.snackCount ? meal?.snackCount : 0 }
                midnightSnackCount={ meal?.midnightSnackCount ? meal?.midnightSnackCount : 0 }
            
                barBreakfast={ meal?.breakfastKcal ? meal?.breakfastKcal.toString() : "0" }
                barLunch={ meal?.lunchKcal ? meal?.lunchKcal.toString() : "0" }
                barDinner={ meal?.dinnerKcal ? meal?.dinnerKcal.toString() : "0" }
                barSnack={ meal?.snackKcal ? meal?.snackKcal.toString() : "0" }
                barMidnightSnack={ meal?.midnightSnackKcal ? meal?.midnightSnackKcal.toString() : "0" }
                barTotal={ meal?.totalKcal ? meal?.totalKcal.toString() : "0" }

                showFrameDiv showDiv
              />


              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>

              <GrP
                barBreakfastCarbohydrate={ meal?.breakfastCarbohydrate ? meal?.breakfastCarbohydrate : 0 }
                barBreakfastProtein={ meal?.breakfastProtein ? meal?.breakfastProtein : 0 }
                barBreakfastFat={ meal?.breakfastFat ? meal?.breakfastFat : 0 }

                barLunchCarbohydrate={ meal?.lunchCarbohydrate ? meal?.lunchCarbohydrate : 0 }
                barLunchProtein={ meal?.lunchProtein ? meal?.lunchProtein : 0 }
                barLunchFat={ meal?.lunchFat ? meal?.lunchFat : 0 }

                barDinnerCarbohydrate={ meal?.dinnerCarbohydrate ? meal?.dinnerCarbohydrate : 0 }
                barDinnerProtein={ meal?.dinnerProtein ? meal?.dinnerProtein : 0 }
                barDinnerFat={ meal?.dinnerFat ? meal?.dinnerFat : 0 }

                barSnackCarbohydrate={ meal?.snackCarbohydrate ? meal?.snackCarbohydrate : 0 }
                barSnackProtein={ meal?.snackProtein ? meal?.snackProtein : 0 }
                barSnackFat={ meal?.snackFat ? meal?.snackFat : 0 }

                barMidnightSnackCarbohydrate={ meal?.midnightSnackCarbohydrate ? meal?.midnightSnackCarbohydrate : 0 }
                barMidnightSnackProtein={ meal?.midnightSnackProtein ? meal?.midnightSnackProtein : 0 }
                barMidnightSnackFat={ meal?.midnightSnackFat ? meal?.midnightSnackFat : 0 }
              />

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

