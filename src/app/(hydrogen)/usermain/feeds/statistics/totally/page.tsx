'use client';


import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Ranking from "@/components-figma/ranking";
import MealStatisticsContainer1 from "@/components-figma/meal-statistics-container1";

import GrCalory from "@/components-figma/gr-calory";

import GrP from "@/components-figma/gr-p";


import Cpf from "@/components/doingdoit/statistics/cpf";

import MealSpeed from "@/components/doingdoit/statistics/mealSpeed";

import MealAmount from "@/components/doingdoit/statistics/mealAmount";

import MealFood from "@/components/doingdoit/statistics/mealFood";


import Footer from "@/components-figma/footer";

//import { Link } from "react-router-dom";

import Link from "next/link";



import { useCallback, useState, useEffect, useMemo, use } from "react";

import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import { parse } from "path";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


import Image from "next/image";
import { kMaxLength } from "buffer";
import { set } from "lodash";



import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';






/*
        bad: "#fe847a",
        std: "#fbe204",
        good: "#7ed95a",
        */

const data = [
  { name: '적게', value: 20, color: '#fe847a' },
  { name: '보통', value: 18, color: '#fbe204' },
  { name: '많이', value: 35, color: '#7ed95a' },
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (

    
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {/*
      {`${(percent * 100).toFixed(0)}%`}
      */}
    </text>
    

  );
};






export default function Page() {



 
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
      date: '',
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



  const [mealFoodArray, setMealFoodArray] = useState( [] as any );

  // mealAmount
  const [mealAmountSmall, setMealAmountSmall] = useState(0);
  const [mealAmountMedium, setMealAmountMedium] = useState(0);
  const [mealAmountLarge, setMealAmountLarge] = useState(0);

  const [ mealAmountPercentage, setMealAmountPercentage ] = useState(
    [] as
    {
      name: string;
      value: number;
      color: string;
    }[]
  );


  // mealSpeed
  const [mealSpeedSlow, setMealSpeedSlow] = useState(0);
  const [mealSpeedNormal, setMealSpeedNormal] = useState(0);
  const [mealSpeedFast, setMealSpeedFast] = useState(0);

  const [ mealSpeedPercentage, setMealSpeedPercentage ] = useState(
    [] as
    {
      name: string;
      value: number;
      color: string;
    }[]
  );




  useEffect(() => {



    const fetchData = async () => {
      setLoading(true);

      const res = await fetch(`/api/doingdoit/feed/getStatisticsTotalByEmail?_email=${session?.user?.email}`);

      const data  = await res?.json() as any;

      console.log('email================',session?.user?.email);
      console.log(' data===============',data?.data);

      const posts = data?.data?.mealTimeData;

      if (!posts) {
        setError(data.message);
        return;
      }


      /*
      [
    { mealTime: '저녁', mealAmount: 4, mealSpeed: 3, mealFood: [Array] },
    { mealTime: '간식', mealAmount: 3, mealSpeed: 3, mealFood: [Array] },
    { mealTime: '아침', mealAmount: 2, mealSpeed: 4, mealFood: [Array] },
      ]
      */


      // count of each mealFood.foodName
      // ex) [{name: '밥', count: 3}, {name: '김치', count: 2}, {name: '된장국', count: 1}]

      let mealFoodArray = [] as any;



      for (let i = 0; i < posts.length; i++) {

        for (let j = 0; j < posts[i].mealFood.length; j++) {

          let isExist = false;

          for (let k = 0; k < mealFoodArray.length; k++) {

            if (mealFoodArray[k].name === posts[i].mealFood[j].foodName) {
              isExist = true;
              mealFoodArray[k].count++;
              break;
            }

          }

          if (!isExist) {
            mealFoodArray.push({ name: posts[i].mealFood[j].foodName, count: 1 });
          }

        }
      }

      setMealFoodArray( mealFoodArray.sort((a: any, b: any) => b.count - a.count) );

  






      // count  of each mealAmount

      let mealAmountArray = [] as any;
      for (let i = 0; i < posts.length; i++) {

        //posts[i].mealAmount is string then skip
        if (typeof posts[i].mealAmount === 'string') {
          continue;
        }
          
        let isExist = false;

        for (let j = 0; j < mealAmountArray.length; j++) {

          if (mealAmountArray[j].mealAmount === posts[i].mealAmount) {
            isExist = true;
            mealAmountArray[j].count++;
            break;
          }

        }

        if (!isExist) {
          mealAmountArray.push({ mealAmount: posts[i].mealAmount, count: 1 });
        }

      }


      // if mealAmountArray[].mealAmmount is 1 or 2
      // then set sum of count to the mealAmountSmall
      setMealAmountSmall(
        mealAmountArray.filter((item: any) => item.mealAmount === 1 || item.mealAmount === 2).reduce((acc: any, cur: any) => acc + cur.count, 0)
      );

      // if mealAmountArray[].mealAmmount is 3 or 4
      setMealAmountMedium(
        mealAmountArray.filter((item: any) => item.mealAmount === 3 || item.mealAmount === 4).reduce((acc: any, cur: any) => acc + cur.count, 0)
      );
        
     
      setMealAmountLarge(
        mealAmountArray.filter((item: any) => item.mealAmount === 5).reduce((acc: any, cur: any) => acc + cur.count, 0)
        
      );




        /*
        const data = [
        { name: '적게', value: 20, color: '#fe847a' },
        { name: '보통', value: 18, color: '#fbe204' },
        { name: '많이', value: 35, color: '#7ed95a' },
      ];
      */


      setMealAmountPercentage([
        //{ name: '적게', value: !mealAmount[0]?.count && 0 + !mealAmount[1]?.count && 0, color: '#fe847a' },
        {
          name: '적게',
          
          value:
            mealAmountArray.filter((item: any) => item.mealAmount === 1 || item.mealAmount === 2).reduce((acc: any, cur: any) => acc + cur.count, 0),

          color: '#7ed95a'
         

        },
       

        { name: '보통',
          value: mealAmountArray.filter((item: any) => item.mealAmount === 3 || item.mealAmount === 4).reduce((acc: any, cur: any) => acc + cur.count, 0),
          color: '#fbe204'
        },

        {
          name: '많이',
          value: mealAmountArray.filter((item: any) => item.mealAmount === 5).reduce((acc: any, cur: any) => acc + cur.count, 0),

          color: '#fe847a'
         
        },


      ]);
        




      // count of each mealSpeed
      let mealSpeedArray = [] as any;
      for (let i = 0; i < posts.length; i++) {

        //posts[i].mealSpeed is string then skip
        if (typeof posts[i].mealSpeed === 'string') {
          continue;
        }
          
        let isExist = false;

        for (let j = 0; j < mealSpeedArray.length; j++) {

          if (mealSpeedArray[j].mealSpeed === posts[i].mealSpeed) {
            isExist = true;
            mealSpeedArray[j].count++;
            break;
          }

        }

        if (!isExist) {
          mealSpeedArray.push({ mealSpeed: posts[i].mealSpeed, count: 1 });
        }

      }

      ////console.log(' mealSpeedArray=======: ', mealSpeedArray);

      // if mealSpeedArray[].mealSpeed is 1 or 2
      // then set sum of count to the mealSpeedSlow
      setMealSpeedFast(
        mealSpeedArray.filter((item: any) => item.mealSpeed === 5).reduce((acc: any, cur: any) => acc + cur.count, 0)
      );

      // if mealSpeedArray[].mealSpeed is 3 or 4
      setMealSpeedNormal(
        mealSpeedArray.filter((item: any) => item.mealSpeed === 3 || item.mealSpeed === 4).reduce((acc: any, cur: any) => acc + cur.count, 0)
      );

      setMealSpeedSlow(
        mealSpeedArray.filter((item: any) => item.mealSpeed === 1 || item.mealSpeed === 2 ).reduce((acc: any, cur: any) => acc + cur.count, 0)
      );


      setMealSpeedPercentage([
        //{ name: '적게', value: !mealAmount[0]?.count && 0 + !mealAmount[1]?.count && 0, color: '#fe847a' },

        {
          name: '빠르게',
          value: mealSpeedArray.filter((item: any) => item.mealSpeed === 5).reduce((acc: any, cur: any) => acc + cur.count, 0),
          color: '#fe847a'
        },
       

        { name: '보통',
          value: mealSpeedArray.filter((item: any) => item.mealSpeed === 3 || item.mealSpeed === 4).reduce((acc: any, cur: any) => acc + cur.count, 0),
          color: '#fbe204'
        },
        {
          name: '천천히',
          value: mealSpeedArray.filter((item: any) => item.mealSpeed === 1 || item.mealSpeed === 2 ).reduce((acc: any, cur: any) => acc + cur.count, 0),
          color: '#7ed95a'
        },
      ]);





      const breakfastCount = posts.filter((post: any) => post.mealTime === '아침').length;
      const lunchCount = posts.filter((post: any) => post.mealTime === '점심').length;
      const dinnerCount = posts.filter((post: any) => post.mealTime === '저녁').length;
      const snackCount = posts.filter((post: any) => post.mealTime === '간식').length;
      const midnightSnackCount = posts.filter((post: any) => post.mealTime === '야식').length;

    


      

     /* breakfastMealAmount is average of mealAmount of breakfast*/

      const breakfastMealAmount = posts.filter((post: any) => post.mealTime === '아침').reduce((acc: any, cur: any) => acc + cur.mealAmount, 0) / posts.filter((post: any) => post.mealTime === '아침').length;
      const breakfastMealSpeed = posts.filter((post: any) => post.mealTime === '아침').reduce((acc: any, cur: any) => acc + cur.mealSpeed, 0) / posts.filter((post: any) => post.mealTime === '아침').length;
      const breakfast = posts.filter((post: any) => post.mealTime === '아침').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      // sum of kcal of mealFood of breakfast
      let breakfastKcal = 0;
      for (let i = 0; i < breakfast.length; i++) {
        parseInt(breakfast[i]?.kcal) && (breakfastKcal += parseInt(breakfast[i].kcal));
      }
      breakfastKcal =  Math.floor(breakfastKcal / breakfast.length);


      console.log('======== breakfastKcal: ', breakfastKcal);




      let breakfastCarbohydrate = 0;
      for (let i = 0; i < breakfast.length; i++) {
        parseInt(breakfast[i]?.carbohydrate) && (breakfastCarbohydrate += parseInt(breakfast[i].carbohydrate));
      }
      breakfastCarbohydrate = Math.floor(breakfastCarbohydrate / breakfast.length);

      let breakfastProtein = 0;
      for (let i = 0; i < breakfast.length; i++) {
        parseInt(breakfast[i]?.protein) && (breakfastProtein += parseInt(breakfast[i].protein));
      }
      breakfastProtein = Math.floor(breakfastProtein / breakfast.length);

      let breakfastFat = 0;
      for (let i = 0; i < breakfast.length; i++) {
        parseInt(breakfast[i]?.fat) && (breakfastFat += parseInt(breakfast[i].fat));
      }
      breakfastFat = Math.floor(breakfastFat / breakfast.length);



      const lunchMealAmount = posts.filter((post: any) => post.mealTime === '점심').reduce((acc: any, cur: any) => acc + cur.mealAmount, 0) / posts.filter((post: any) => post.mealTime === '점심').length;
      const lunchMealSpeed = posts.filter((post: any) => post.mealTime === '점심').reduce((acc: any, cur: any) => acc + cur.mealSpeed, 0) / posts.filter((post: any) => post.mealTime === '점심').length;
      const lunch = posts.filter((post: any) => post.mealTime === '점심').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      let lunchKcal = 0;
      for (let i = 0; i < lunch.length; i++) {
        parseInt(lunch[i]?.kcal) && (lunchKcal += parseInt(lunch[i].kcal));
      }
      lunchKcal = Math.floor(lunchKcal / lunch.length);

      let lunchCarbohydrate = 0;
      for (let i = 0; i < lunch.length; i++) {
        parseInt(lunch[i]?.carbohydrate) && (lunchCarbohydrate += parseInt(lunch[i].carbohydrate));
      }
      lunchCarbohydrate = Math.floor(lunchCarbohydrate / lunch.length);

      let lunchProtein = 0;
      for (let i = 0; i < lunch.length; i++) {
        parseInt(lunch[i]?.protein) && (lunchProtein += parseInt(lunch[i].protein));
      }
      lunchProtein = Math.floor(lunchProtein / lunch.length);

      let lunchFat = 0;
      for (let i = 0; i < lunch.length; i++) {
        parseInt(lunch[i]?.fat) && (lunchFat += parseInt(lunch[i].fat));
      }
      lunchFat = Math.floor(lunchFat / lunch.length);




      const dinnerMealAmount = posts.filter((post: any) => post.mealTime === '저녁').reduce((acc: any, cur: any) => acc + cur.mealAmount, 0) / posts.filter((post: any) => post.mealTime === '저녁').length;
      const dinnerMealSpeed = posts.filter((post: any) => post.mealTime === '저녁').reduce((acc: any, cur: any) => acc + cur.mealSpeed, 0) / posts.filter((post: any) => post.mealTime === '저녁').length;
      const dinner = posts.filter((post: any) => post.mealTime === '저녁').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      let dinnerKcal = 0;
      for (let i = 0; i < dinner.length; i++) {
        parseInt(dinner[i]?.kcal) && (dinnerKcal += parseInt(dinner[i].kcal));
      }
      dinnerKcal = Math.floor(dinnerKcal / dinner.length);

      let dinnerCarbohydrate = 0;
      for (let i = 0; i < dinner.length; i++) {
        parseInt(dinner[i]?.carbohydrate) && (dinnerCarbohydrate += parseInt(dinner[i].carbohydrate));
      }
      dinnerCarbohydrate = Math.floor(dinnerCarbohydrate / dinner.length);

      let dinnerProtein = 0;
      for (let i = 0; i < dinner.length; i++) {
        parseInt(dinner[i]?.protein) && (dinnerProtein += parseInt(dinner[i].protein));
      }
      dinnerProtein = Math.floor(dinnerProtein / dinner.length);

      let dinnerFat = 0;
      for (let i = 0; i < dinner.length; i++) {
        parseInt(dinner[i]?.fat) && (dinnerFat += parseInt(dinner[i].fat));
      }
      dinnerFat = Math.floor(dinnerFat / dinner.length);



      const snackMealAmount = posts.filter((post: any) => post.mealTime === '간식').reduce((acc: any, cur: any) => acc + cur.mealAmount, 0) / posts.filter((post: any) => post.mealTime === '간식').length;
      const snackMealSpeed = posts.filter((post: any) => post.mealTime === '간식').reduce((acc: any, cur: any) => acc + cur.mealSpeed, 0) / posts.filter((post: any) => post.mealTime === '간식').length;
      const snack = posts.filter((post: any) => post.mealTime === '간식').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      let snackKcal = 0;
      for (let i = 0; i < snack.length; i++) {
        parseInt(snack[i]?.kcal) && (snackKcal += parseInt(snack[i].kcal));
      }
      snackKcal = Math.floor(snackKcal / snack.length);

      let snackCarbohydrate = 0;
      for (let i = 0; i < snack.length; i++) {
        parseInt(snack[i]?.carbohydrate) && (snackCarbohydrate += parseInt(snack[i].carbohydrate));
      }
      snackCarbohydrate = Math.floor(snackCarbohydrate / snack.length);

      let snackProtein = 0;
      for (let i = 0; i < snack.length; i++) {
        parseInt(snack[i]?.protein) && (snackProtein += parseInt(snack[i].protein));
      }
      snackProtein = Math.floor(snackProtein / snack.length);

      let snackFat = 0;
      for (let i = 0; i < snack.length; i++) {
        parseInt(snack[i]?.fat) && (snackFat += parseInt(snack[i].fat));
      }
      snackFat = Math.floor(snackFat / snack.length);



      const midnightSnackMealAmount = posts.filter((post: any) => post.mealTime === '야식').reduce((acc: any, cur: any) => acc + cur.mealAmount, 0) / posts.filter((post: any) => post.mealTime === '야식').length;
      const midnightSnackMealSpeed = posts.filter((post: any) => post.mealTime === '야식').reduce((acc: any, cur: any) => acc + cur.mealSpeed, 0) / posts.filter((post: any) => post.mealTime === '야식').length;
      const midnightSnack = posts.filter((post: any) => post.mealTime === '야식').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      let midnightSnackKcal = 0;
      for (let i = 0; i < midnightSnack.length; i++) {
        parseInt(midnightSnack[i]?.kcal) && (midnightSnackKcal += parseInt(midnightSnack[i].kcal));
      }
      midnightSnackKcal = Math.floor(midnightSnackKcal / midnightSnack.length);

      let midnightSnackCarbohydrate = 0;
      for (let i = 0; i < midnightSnack.length; i++) {
        parseInt(midnightSnack[i]?.carbohydrate) && (midnightSnackCarbohydrate += parseInt(midnightSnack[i].carbohydrate));
      }
      midnightSnackCarbohydrate = Math.floor(midnightSnackCarbohydrate / midnightSnack.length);

      let midnightSnackProtein = 0;
      for (let i = 0; i < midnightSnack.length; i++) {
        parseInt(midnightSnack[i]?.protein) && (midnightSnackProtein += parseInt(midnightSnack[i].protein));
      }
      midnightSnackProtein = Math.floor(midnightSnackProtein / midnightSnack.length);

      let midnightSnackFat = 0;
      for (let i = 0; i < midnightSnack.length; i++) {
        parseInt(midnightSnack[i]?.fat) && (midnightSnackFat += parseInt(midnightSnack[i].fat));
      }
      midnightSnackFat = Math.floor(midnightSnackFat / midnightSnack.length);



      console.log(' breakfastCarbohydrate: ', breakfastCarbohydrate);
      console.log(' breakfastProtein: ', breakfastProtein);
      console.log(' breakfastFat: ', breakfastFat);

      // sum of breakfastKcal, lunchKcal, dinnerKcal, snackKcal, midnightSnackKcal
      // check if breakfastKcal, lunchKcal, dinnerKcal, snackKcal, midnightSnackKcal is NaN

      //////const totalKcal =  breakfastKcal + lunchKcal + dinnerKcal + snackKcal + midnightSnackKcal;

      ///const totalKcal =  breakfastKcal + lunchKcal + dinnerKcal + midnightSnackKcal;
      // totalKcal is most large number of breakfastKcal, lunchKcal, dinnerKcal, midnightSnackKcal

      
      //const totalKcal = Math.max(breakfastKcal, lunchKcal, dinnerKcal, midnightSnackKcal);
      ///const totalKcal = breakfastKcal + lunchKcal + dinnerKcal + midnightSnackKcal;
      // totalKcal is sum of breakfastKcal, lunchKcal, dinnerKcal, midnightSnackKcal
      // if breakfastKcal, lunchKcal, dinnerKcal, midnightSnackKcal is NaN then set 0
      
      const totalKcal = (breakfastKcal || 0) + (lunchKcal || 0) + (dinnerKcal || 0) + (midnightSnackKcal || 0);


      const totalCarbohydrate = breakfastCarbohydrate + lunchCarbohydrate + dinnerCarbohydrate + snackCarbohydrate + midnightSnackCarbohydrate;
      const totalProtein = breakfastProtein + lunchProtein + dinnerProtein + snackProtein + midnightSnackProtein;
      const totalFat = breakfastFat + lunchFat + dinnerFat + snackFat + midnightSnackFat;

 

      setMeal({
        date: data?.data?.date,
        
        totalKcal: totalKcal,

        breakfastCount: breakfastCount,
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

  } ,[ session?.user?.email, ]);





const [feedbackGoodCount, setFeedbackGoodCount] = useState(0);
const [feedbackStdCount, setFeedbackStdCount] = useState(0);
const [feedbackBadCount, setFeedbackBadCount] = useState(0);


// feed ranking
useEffect(() => {
    
    const fetchData = async () => {

      console.log('getFeedbackStatisticsByEmail session?.user?.email: ', session?.user?.email);



      setLoading(true);

      const res = await fetch(`/api/doingdoit/feed/getFeedbackStatisticsByEmail?_email=${session?.user?.email}`);

      const data  = await res?.json() as any;

      console.log('getFeedbackStatisticsByEmail data===============',data?.data);



      // check feedbackScore is '좋음', '양호함', '개선이 필요함'
      // if not then skip

      data?.data.map ((item: any) => {
        if (item.feedbackScore !== '좋음' && item.feedbackScore !== '양호함' && item.feedbackScore !== '개선이 필요함') {
          return;
        }

        // if feedbackScore is '좋음' then setFeedbackGoodCount + 1
        if (item.feedbackScore === '좋음') {
          setFeedbackGoodCount((prev: any) => prev + item.feedbackScoreCount );
        }
        // if feedbackScore is '양호함' then setFeedbackStdCount + 1
        if (item.feedbackScore === '양호함') {
          setFeedbackStdCount((prev: any) => prev + item.feedbackScoreCount );
        }
        // if feedbackScore is '개선이 필요함' then setFeedbackBadCount + 1
        if (item.feedbackScore === '개선이 필요함') {
          setFeedbackBadCount((prev: any) => prev + item.feedbackScoreCount );
        }

      });
    

    };

    fetchData();

  }, [ session?.user?.email, ]);


  console.log('feedbackGoodCount: ', feedbackGoodCount);
  console.log('feedbackStdCount: ', feedbackStdCount);
  console.log('feedbackBadCount: ', feedbackBadCount);




const [leastRecentlyMealDate, setLeastRecentlyMealDate] = useState('');

useEffect(() => {
    
    const fetchData = async () => {

      console.log('getLeastRecentlyMealDateByEmail session?.user?.email: ', session?.user?.email);


      const res = await fetch(`/api/doingdoit/feed/getLeastRecentlyMealDateByEmail?_email=${session?.user?.email}`);

      const data  = await res?.json() as any;

      //console.log('getLeastRecentlyMealDateByEmail data===============',data?.data);

      setLeastRecentlyMealDate(data?.data);

    }

    fetchData();

  } , [ session?.user?.email, ]);




/*
{{ width: (feedbackGoodCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%' }}
*/

/*
  const squareVariantsFeedbackGood = {
    visible: {
      //height : (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!)*3 + "px"

      width: (feedbackGoodCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%'
      , transition: { duration: 1 }

    },
    hidden: { width: "0%" }
  };

  const controlsFeedbackGood = useAnimation();
  const [refFeedbackGood, inViewFeedbackGood] = useInView();

  useEffect(() => {
    if (inViewFeedbackGood) {
      
      controlsFeedbackGood.start("visible");

    } else {

      controlsFeedbackGood.start("hidden");
    } 
  } , [controlsFeedbackGood, inViewFeedbackGood]);



  const squareVariantsFeedbackStd = {
    visible: {
      //height : (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!)*3 + "px"

      width: (feedbackStdCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%'
      , transition: { duration: 1 }

    },
    hidden: { width: "0%" }
  };

  const controlsFeedbackStd = useAnimation();
  const [refFeedbackStd, inViewFeedbackStd] = useInView();

  useEffect(() => {
    if (inViewFeedbackStd) {
      
      controlsFeedbackStd.start("visible");

    } else {

      controlsFeedbackStd.start("hidden");
    } 
  } , [controlsFeedbackStd, inViewFeedbackStd]);


  const squareVariantsFeedbackBad = {
    visible: {
      //height : (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!)*3 + "px"

      width: (feedbackBadCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%'
      , transition: { duration: 1 }

    },
    hidden: { width: "0%" }
  };

  const controlsFeedbackBad = useAnimation();
  const [refFeedbackBad, inViewFeedbackBad] = useInView();

  useEffect(() => {
    if (inViewFeedbackBad) {
      
      controlsFeedbackBad.start("visible");

    } else {

      controlsFeedbackBad.start("hidden");
    } 
  } , [controlsFeedbackBad, inViewFeedbackBad]);

*/








  if (status === "loading") {
    return <div>loading...</div>;
  }

  if (!session) {
    window.location.href = "/usermain/user/login";
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

        <div className="self-stretch bg-background flex flex-col items-center justify-start py-0 xl:py-10 px-0">

          <div className="self-stretch flex flex-row items-center justify-start text-xl font-extrabold m-6 xl:hidden">
            통계
          </div>

          <div className=" w-full  xl:w-[1000px] flex flex-col items-center justify-start gap-[15px] xl:gap-[40px]">

            
            <div className="self-stretch flex flex-row items-center justify-center pl-5 pr-5">
              
              <Link
                href={"/usermain/feeds/statistics"}
               className="flex-1 box-border h-14 flex flex-row items-center justify-start text-grey-9 border-b-[2px] border-solid border-orange-light"
               style={{ textDecoration: 'none' }}
               >
                <div className="flex-1 relative font-extrabold text-base ">일간</div>
              </Link>


              <Link
                href={"/usermain/feeds/statistics/weekly"}
               className="flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-dark"
               style={{ textDecoration: 'none' }}
               >
                <div className="flex-1 relative font-extrabold text-base ">
                  주간/월간/전체
                </div>
              </Link>

            </div>


            <div className="   self-stretch bg-white flex flex-col items-center justify-start p-5 xl:p-10 gap-[20px] xl:gap-[40px] text-left text-xl text-dark">
              
              
              <div className="self-stretch relative  flex flex-col xl:flex-row gap-2 items-center justify-center  text-xl xl:text-17xl font-extrabold text-center">

                <span>What you eat?(식단)</span>
                <span>& How you eat?(식사패턴)</span>

              </div>
              
              
              <div className="self-stretch flex flex-col items-center justify-start gap-[32px] text-center text-sm xl:text-base text-grey-9">
                
                <div className="self-stretch flex flex-row items-center justify-center">
                  
                  <Link
                    href="/usermain/feeds/statistics/weekly"
                    className="flex-1 box-border h-14 flex flex-row items-center justify-start  border-b-[2px] border-solid border-grey-d">
                    <div className="flex-1 relative font-extrabold">주간</div>
                  </Link>

                  <Link
                    href="/usermain/feeds/statistics/monthly"
                    className="flex-1 box-border h-14 flex flex-row items-center justify-start  border-b-[2px] border-solid border-grey-d">
                    <div className="flex-1 relative font-extrabold">월간</div>
                  </Link>

                  <Link
                    href="/usermain/feeds/statistics/totally"
                    className="flex-1 box-border h-14 flex flex-row items-center justify-start text-dark border-b-[2px] border-solid border-dark">
                    <div className="flex-1 relative font-extrabold">전체</div>
                  </Link>

                </div>

              </div>



              <div className="flex flex-row justify-center items-center gap-2   ">


                <div className="relative text-sm xl:text-xl text-black font-extrabold">

                  {
                    leastRecentlyMealDate ? 
                    new Date(leastRecentlyMealDate).getFullYear() + '.' +
                    (new Date(leastRecentlyMealDate).getMonth() + 1).toString().padStart(2, '0') + '.' +
                    (new Date(leastRecentlyMealDate).getDate()).toString().padStart(2, '0') : ''
                  
                  }

                  {/* 월, 화, 수, 목, 금, 토, 일 */}               
                  {
                    leastRecentlyMealDate ?
                    new Date(leastRecentlyMealDate).getDay() === 0 ? '(일)' :
                    new Date(leastRecentlyMealDate).getDay() === 1 ? '(월)' :
                    new Date(leastRecentlyMealDate).getDay() === 2 ? '(화)' :
                    new Date(leastRecentlyMealDate).getDay() === 3 ? '(수)' :
                    new Date(leastRecentlyMealDate).getDay() === 4 ? '(목)' :
                    new Date(leastRecentlyMealDate).getDay() === 5 ? '(금)' :
                    new Date(leastRecentlyMealDate).getDay() === 6 ? '(토)' : ''
                    : ''
                  }
                  

                </div>

                ~

                <div className="relative text-sm xl:text-xl text-black font-extrabold">
                  {
                  
                    new Date().getFullYear() + '.' +
                    (new Date().getMonth() + 1).toString().padStart(2, '0') + '.' +
                    (new Date().getDate()).toString().padStart(2, '0')

                  
                  }

                  {/* 월, 화, 수, 목, 금, 토, 일 */}               
                  {
                    new Date().getDay() === 0 ? '(일)' :
                    new Date().getDay() === 1 ? '(월)' :
                    new Date().getDay() === 2 ? '(화)' :
                    new Date().getDay() === 3 ? '(수)' :
                    new Date().getDay() === 4 ? '(목)' :
                    new Date().getDay() === 5 ? '(금)' :
                    new Date().getDay() === 6 ? '(토)' : ''
                  }
                
                </div>


                </div>

 

              <MealFood
                mealFoodArray={mealFoodArray}
              />

              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>

              <MealAmount
                mealAmountSmall={mealAmountSmall}
                mealAmountMedium={mealAmountMedium}
                mealAmountLarge={mealAmountLarge}
                mealAmountPercentage={mealAmountPercentage}
              />
              
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>

              <MealSpeed
                mealSpeedSlow={mealSpeedSlow}
                mealSpeedNormal={mealSpeedNormal}
                mealSpeedFast={mealSpeedFast}
                mealSpeedPercentage={mealSpeedPercentage}
              />
                



              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>


              <div className="self-stretch flex flex-col items-center justify-start gap-[40px]">
                
                <div className="self-stretch flex flex-col items-center justify-start">
                  <div className="self-stretch relative font-extrabold text-base xl:text-xl">
                    영양성분에 대한 통계
                  </div>
                </div>


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

                  barTotal={
                    meal?.totalKcal ? meal?.totalKcal.toString() : "0"

                  }
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

              </div>


              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>


              <div className="self-stretch flex flex-col items-center justify-start gap-[40px]">

                <Cpf
                  feedbackGoodCount={feedbackGoodCount}
                  feedbackStdCount={feedbackStdCount}
                  feedbackBadCount={feedbackBadCount}
                />


                  {/*
                
                <div className="self-stretch flex flex-col items-center justify-start gap-[12px]">
                  <div className="self-stretch relative font-extrabold">
                    식단 점수에 대한 통계
                  </div>


                  <div className="self-stretch relative text-base">

                  { (feedbackGoodCount > 0 || feedbackStdCount > 0 || feedbackBadCount > 0) ? (
                    <>
                      <span>{`식단점수는 대부분 `}</span>
                      <span className="font-extrabold">


                        {
                          feedbackGoodCount >= feedbackStdCount && feedbackGoodCount >= feedbackBadCount ?
                          '좋음' : feedbackStdCount >= feedbackGoodCount && feedbackStdCount >= feedbackBadCount ?
                          '양호함' : '개선이 필요함'
                        }


                      </span>
                      <span> 입니다.</span>
                    </>
                    ) : (
                      <span>식단점수가 없습니다.</span>
                    ) }

                  </div>

                </div>






                { (feedbackGoodCount > 0 || feedbackStdCount > 0 || feedbackBadCount > 0) && (

                  <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-sm">
                    
                    <div className="w-full flex flex-row items-center justify-center">


                      <motion.div
                        ref={refFeedbackGood}
                        animate={controlsFeedbackGood}
                        initial="hidden"
                        variants={squareVariantsFeedbackGood}
                      >

                        <div className="relative bg-good h-16"

                        // '좋음' feedbackGoodCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100

                        //style = {{ width: (feedbackGoodCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%' }}
                        
                        />

                      </motion.div>


                      <motion.div
                        ref={refFeedbackStd}
                        animate={controlsFeedbackStd}
                        initial="hidden"
                        variants={squareVariantsFeedbackStd}
                      >
                        <div className="relative bg-std h-16"
                        // 양호함

                        // '양호함' feedbackStdCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100

                        ///style={{ width: (feedbackStdCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%' }}

                        />
                      </motion.div>


                      <motion.div
                        ref={refFeedbackBad}
                        animate={controlsFeedbackBad}
                        initial="hidden"
                        variants={squareVariantsFeedbackBad}
                      >
                        <div className="flex-1 relative bg-bad h-16"

                          // '개선이 필요함'

                          // '개선이 필요함' feedbackBadCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100

                          ///style={{ width: (feedbackBadCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%' }}


                          />
                      </motion.div>

                    </div>
                     


                    <div className="flex flex-row items-center justify-start gap-[20px]">
                      
                      <div className="flex flex-row items-center justify-center gap-[8px]">
                        
                        <div className="relative rounded bg-good w-3 h-3" />

                        <div className="relative font-extrabold">
                          좋음({ feedbackGoodCount }회, { (feedbackGoodCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100).toFixed(2) }%)
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-center gap-[8px]">
                        <div className="relative rounded bg-std w-3 h-3" />
                        <div className="relative">
                          양호함({ feedbackStdCount }회, { (feedbackStdCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100).toFixed(2) }%)
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-center gap-[8px]">
                        <div className="relative rounded bg-bad w-3 h-3" />
                        <div className="relative">
                          개선이 필요함({ feedbackBadCount }회, { (feedbackBadCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100).toFixed(2) }%)
                        </div>
                      </div>

                    </div>


                  </div>

                )}

                */}




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
      <div className="relative">구매주문</div>
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
      <b className="relative">구매주문</b>
    </Link>



    <Link 
        href={'/usermain/feeds/statistics'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/piechart2fill.svg"
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



{/*    <Link 
        href={'/usermain/survey/result'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/questionanswerline.svg"
      />
      <b className="relative">설문</b>
    </Link> */}
    
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


