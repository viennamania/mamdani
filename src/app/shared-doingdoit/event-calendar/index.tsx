'use client';

import type { CalendarEvent } from '@/types';

/*

export interface CalendarEvent {
  id?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  title: string;
  description?: string;
  location?: string;
}

*/


import dayjs from 'dayjs';


import { Calendar, dayjsLocalizer, momentLocalizer } from 'react-big-calendar'


import moment from 'moment';



import EventForm from './event-form';
import DetailsEvents from './details-event';

import { useModal } from '@/app/shared-doingdoit/modal-views/use-modal';

import useEventCalendar from '@/hooks/doingdoit/use-event-calendar';

import cn from '@/utils/class-names';

//import moment from 'moment';
//import 'react-big-calendar/lib/css/react-big-calendar.css';


////import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';

import Link from "next/link";


import React, {Children, useCallback, useState, useEffect, useMemo  } from 'react';


import { useSession } from 'next-auth/react';


import ListDietBar from "@/components-figma/list-diet-bar-statistics";


///import { PiSelectionBackground } from 'react-icons/pi';

// left arrow icon from 'react-icons/ai'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


import { useRouter } from 'next/navigation';


import { backIn, m, motion } from "framer-motion";
import { day } from 'date-arithmetic';
import { set } from 'lodash';
import { tooltipClasses } from '@mui/material';
import { on } from 'events';


///BigCalendar.momentLocalizer(moment);

const CURRENT_DATE = moment().toDate();

///console.log("CURRENT_DATE", CURRENT_DATE);

  // example implementation of a wrapper
/*
const ColoredDateCellWrapper = (
  {
    children,
    value
  } : {
    children: any;
    value: any;
  }
) =>
React.cloneElement(Children.only(children), {
    style: {
        ...children.style,
        backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
    },
});
*/

const ColoredDateCellWrapper = (
  {
    children,
    value
  } : {
    children: any;
    value: any;
  }
) => 
  React.cloneElement(Children.only(children), {
    style: {
        ...children.style,

        //backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
        //backgroundColor: 'white',

        


    },
  });






const localizer = dayjsLocalizer(dayjs);








//  2023.12.1  - 2023.12.31
// 아침, 점심, 저녁, 간식, 야식
// 아침: 된장국, 쌀밥, 오징어볶음
// 점심: 김밥, 라면
// 저녁: -
// 간식: 된장국, 쌀밥, 오징어볶음
// 야식: 햄버그, 순대국밥, 콜라

/*
const dayMeal = [


  {
    date: '2023.12.19',
    breakfast: '된장국, 쌀밥, 오징어볶음',
    lunch: '김밥',
    dinner: '김밥, 라면',
    snack: '햄버그, 순대국밥, 콜라',
    midnightSnack: '햄버그, 순대국밥, 콜라',
    // 야식 영어로 
    // 간식 영어로  


    count: 4,
  },

];

*/




/*
[
    {
        "mealFood": [
            [
                {
                    "id": 5,
                    "foodCode": "D000012",
                    "foodCategory": "음식",
                    "foodName": "돼지갈비",
                    "foodGroup": "구이류",
                    "quality": "100",
                    "kcal": "240.32",
                    "carbohydrate": "19.5",
                    "protein": "14.4",
                    "fat": "8.1",
                    "salt": "4.5",
                    "saturatedfat": "404.66",
                    "cholesterol": "49.34",
                    "sugar": "4.7",
                    "publisher": "식품의약품안전처"
                }
            ]
        ],
        "mealDate": "2023-12-22T01:10:08.153Z",
        "mealTime": "저녁",
        "mealFoodCount": 4,
    },

  


]
*/





// rbc-active -> black button active
const calendarToolbarClassName =
  '[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900';





  const MyDateHeader = (
    {
      label,
      date
    } : {
      label: string;
      date: string;
    }
  ) => {
    return (
      <div className='bg-black'>
          <button className="rbc-button-link" role="cell">
            {label }
          </button>
          

          

          {/*
          <div className={styles.MyDateHeaderLunarDate}>
            {moment(date).lunar().format("MM.DD")}
          </div>
          */}

     </div>
    )
  }




export default function EventCalendarView() {


  const router = useRouter();


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

      if (!session?.user?.email) {
        return;
      }

      try {
        
        const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
        const json = await res?.json();

        //////console.log(json);

        const data = json as any;
        
        if (data.data) {
          setUserData(data.data);
        } else {
          //alert(json.message);
        }
        
      } catch (error) {
        ///alert(error.message);
      }


    };
    fetchData();
  } , [session?.user?.email]);





  //moment.locale('ko-KR');
  //const localizer = momentLocalizer(moment);



  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());






  ////const [data, setData] = useState([]);

  const [dayMeal, setDayMeal] = useState([]) as any;


  const [loading, setLoading] = useState(false);



  useEffect(() => {

    const fetchData = async () => {


      if (!session?.user?.email) {
        return;
      }


      setLoading(true);



      // 
      //////const res = await fetch(`/api/doingdoit/feed/getStatistics?_email=${session?.user?.email}&_mealDate=2023-12-19`);
      const res = await fetch(`/api/doingdoit/feed/getStatisticsByEmail?_email=${session?.user?.email}`);


      const posts  = await res?.json() as any;

      /////console.log("stats data===========================", posts.data);


      
      setDayMeal([]);


      posts?.data?.map((
        
        item : {
          mealFood: any;

          mealFoodTime: any;

          mealDate: string;
          mealTime: [];
          mealFoodCount: number;

          feedCount: number;
          mealAmount: [];
          mealSpeed: [];

          mealTimeData: [];
        }

      ) => {

        ///console.log("itam.mealTimeData", item.mealTimeData);

        ////console.log("item.mealFoodTime", item.mealFoodTime);

        /*
          date: string;
          breakfastFood: any;
          breakfastFoodCount: number;
          lunchFood: any;
          lunchFoodCount: number;
          dinnerFood: any;
          dinnerFoodCount: number;
          snackFood: any;
          snackFoodCount: number;
          midnightSnackFood: any;
          midnightSnackFoodCount: number;
          */
         /* 아침 => breakfast
          점심 => lunch
          저녁 => dinner
          간식 => snack
          야식 => midnightSnack
          */

          /*
          const breakfastMealTime = item?.mealTime?.filter((mealTimeItem: any) => {
            return mealTimeItem === '아침';
          });

          const lunchMealTime = item?.mealTime?.filter((mealTimeItem: any) => {
            return mealTimeItem === '점심';
          });

          const dinnerMealTime = item?.mealTime?.filter((mealTimeItem: any) => {
            return mealTimeItem === '저녁';
          });

          const snackMealTime = item?.mealTime?.filter((mealTimeItem: any) => {
            return mealTimeItem === '간식';
          });

          const midnightSnackMealTime = item?.mealTime?.filter((mealTimeItem: any) => {
            return mealTimeItem === '야식';
          });
          
          */

          /*
          [
            {
                "mealTime": [
                    "닭갈비",
                    "더덕구이",
                    "돼지갈비",
                    "닭갈비"
                ],
                "mealAmount": "1",
                "mealSpeed": "1"
            },
            {
                "mealTime": "아침",
                "mealAmount": "1",
                "mealSpeed": "1"
            },

          ]
          */

          //const breakfastMealAmountArray = item?.mealTimeData ? item?.mealTimeData?.filter((mealTimeItem: any) => {
          //  return mealTimeItem?.mealTime === '아침';
          //} ) : [];

          let breakfastMealExist = false;
          let breakfastMealAmount = 0;
          let breakfastMealSpeed = 0;
          let breakfastMealFood =  []  as any;

          let lunchMealExist = false;
          let lunchMealAmount = 0;
          let lunchMealSpeed = 0;
          let lunchMealFood = [] as any;

          let dinnerMealExist = false;
          let dinnerMealAmount = 0;
          let dinnerMealSpeed = 0;
          let dinnerMealFood = [] as any;

          let snackMealExist = false;
          let snackMealAmount = 0;
          let snackMealSpeed = 0;
          let snackMealFood = [] as any;

          let midnightSnackMealExist = false;
          let midnightSnackMealAmount = 0;
          let midnightSnackMealSpeed = 0;
          let midnightSnackMealFood = [] as any;

          
          
          
          



          let index = 0;

          item?.mealTimeData?.map((mealTimeItem: any) => {
            if (mealTimeItem?.mealTime === '아침') {
              mealTimeItem?.mealAmount && (breakfastMealAmount = breakfastMealAmount + parseInt(mealTimeItem?.mealAmount ) );
              mealTimeItem?.mealSpeed && (breakfastMealSpeed = breakfastMealSpeed + parseInt(mealTimeItem?.mealSpeed ) );
              mealTimeItem?.mealFood &&
                (breakfastMealFood = [...breakfastMealFood, ...mealTimeItem?.mealFood]);
                
              index = index + 1;
            }
          } );
          breakfastMealAmount = breakfastMealAmount / index;
          breakfastMealSpeed = breakfastMealSpeed / index;

          breakfastMealExist = index > 0 ? true : false;



          index = 0;
          item?.mealTimeData?.map((mealTimeItem: any) => {
            if (mealTimeItem?.mealTime === '점심') {
              mealTimeItem?.mealAmount && (lunchMealAmount = lunchMealAmount + parseInt(mealTimeItem?.mealAmount ) );
              mealTimeItem?.mealSpeed && (lunchMealSpeed = lunchMealSpeed + parseInt(mealTimeItem?.mealSpeed ) );
              ////mealTimeItem?.mealFood && lunchMealFood.push(mealTimeItem?.mealFood);
              mealTimeItem?.mealFood &&
                (lunchMealFood = [...lunchMealFood, ...mealTimeItem?.mealFood]);

              index = index + 1;
            }
          } );
          lunchMealAmount = lunchMealAmount / index;
          lunchMealSpeed = lunchMealSpeed / index;

          lunchMealExist = index > 0 ? true : false;




          index = 0;
          item?.mealTimeData?.map((mealTimeItem: any) => {
            if (mealTimeItem?.mealTime === '저녁') {
              mealTimeItem?.mealAmount && (dinnerMealAmount = dinnerMealAmount + parseInt(mealTimeItem?.mealAmount ) );
              mealTimeItem?.mealSpeed && (dinnerMealSpeed = dinnerMealSpeed + parseInt(mealTimeItem?.mealSpeed ) );
              ///mealTimeItem?.mealFood && dinnerMealFood.push(mealTimeItem?.mealFood);
              mealTimeItem?.mealFood &&
                (dinnerMealFood = [...dinnerMealFood, ...mealTimeItem?.mealFood]);
              index = index + 1;
            }
          } );
          dinnerMealAmount = dinnerMealAmount / index;
          dinnerMealSpeed = dinnerMealSpeed / index;

          dinnerMealExist = index > 0 ? true : false;




          index = 0;
          item?.mealTimeData?.map((mealTimeItem: any) => {
            if (mealTimeItem?.mealTime === '간식') {
              mealTimeItem?.mealAmount && (snackMealAmount = snackMealAmount + parseInt(mealTimeItem?.mealAmount) );
              mealTimeItem?.mealSpeed && (snackMealSpeed = snackMealSpeed + parseInt(mealTimeItem?.mealSpeed) );
              ///mealTimeItem?.mealFood && snackMealFood.push(mealTimeItem?.mealFood);
              mealTimeItem?.mealFood &&
                (snackMealFood = [...snackMealFood, ...mealTimeItem?.mealFood]);
              index = index + 1;
            }
          } );
          snackMealAmount = snackMealAmount / index;
          snackMealSpeed = snackMealSpeed / index;

          snackMealExist = index > 0 ? true : false;



          index = 0;
          item?.mealTimeData?.map((mealTimeItem: any) => {
            if (mealTimeItem?.mealTime === '야식') {
              mealTimeItem?.mealAmount && (midnightSnackMealAmount = midnightSnackMealAmount + parseInt(mealTimeItem?.mealAmount) );
              mealTimeItem?.mealSpeed && (midnightSnackMealSpeed = midnightSnackMealSpeed + parseInt(mealTimeItem?.mealSpeed) );
              ///mealTimeItem?.mealFood && midnightSnackMealFood.push(mealTimeItem?.mealFood);
              mealTimeItem?.mealFood &&
                (midnightSnackMealFood = [...midnightSnackMealFood, ...mealTimeItem?.mealFood]);
              index = index + 1;
            }
          } );

          midnightSnackMealAmount = midnightSnackMealAmount / index;
          midnightSnackMealSpeed = midnightSnackMealSpeed / index;

          midnightSnackMealExist = index > 0 ? true : false;


       

          const meal = {
              
            date: item?.mealDate,

            breakfastCount : item?.mealTime?.filter((mealTimeItem: any) => {
              return mealTimeItem === '아침';
            } ).length,

            breakfastMealAmount : breakfastMealAmount,
            breakfastMealSpeed : breakfastMealSpeed,
            breakfastMealFood: breakfastMealFood ,
            breakfastMealExist: breakfastMealExist,
                

            lunchCount : item?.mealTime?.filter((mealTimeItem: any) => {
              return mealTimeItem === '점심';
            } ).length,
            lunchMealAmount : lunchMealAmount,
            lunchMealSpeed : lunchMealSpeed,
            lunchMealFood: lunchMealFood,
            lunchMealExist: lunchMealExist,

        
            dinnerCount : item?.mealTime?.filter((mealTimeItem: any) => {
              return mealTimeItem === '저녁';
            } ).length,
            dinnerMealAmount : dinnerMealAmount,
            dinnerMealSpeed : dinnerMealSpeed,
            dinnerMealFood: dinnerMealFood,
            dinnerMealExist: dinnerMealExist,


            snackCount : item?.mealTime?.filter((mealTimeItem: any) => {
              return mealTimeItem === '간식';
            } ).length,
            snackMealAmount : snackMealAmount,
            snackMealSpeed : snackMealSpeed,
            snackMealFood: snackMealFood,
            snackMealExist: snackMealExist,

            midnightSnackCount : item?.mealTime?.filter((mealTimeItem: any) => {  
              return mealTimeItem === '야식';
            } ).length,
            midnightSnackMealAmount : midnightSnackMealAmount,
            midnightSnackMealSpeed : midnightSnackMealSpeed,
            midnightSnackMealFood: midnightSnackMealFood,
            midnightSnackMealExist: midnightSnackMealExist,


          } ;

          ////console.log("meal===========================", meal);



          setDayMeal((prev: any) => [...prev, meal]);


      
      } );

      ///setDayMeal(posts?.data as any);


      



      setLoading(false);

    };


    fetchData();

  } ,[ session?.user?.email, selectedStartDate, selectedEndDate, selectedDate]);






  ///console.log("dayMeal===========================", dayMeal);



  /*
  const today = new Date();
  // format 2023-03-01, 2023-12-02  2023-03-09
  const mealDate = `${today.getFullYear()}-${(today.getMonth()+1) < 10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1)}-${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;

  const date = `${ today.getFullYear() }.${ (today.getMonth()+1) < 10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1) }.${ today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;
  */


  /*
  const [meal, setMeal] = useState(

    {
      mealDate: '',

      date: '',
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
      midnightSnack: [],
    }

  );
  */


  /*
  const today = new Date();
  // format 2023-03-01, 2023-12-02  2023-03-09
  const mealDate = `${today.getFullYear()}-${(today.getMonth()+1) < 10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1)}-${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;
  const date = `${ today.getFullYear() }.${ (today.getMonth()+1) < 10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1) }.${ today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;

    */


  const [meal, setMeal] = useState(null) as any;






  useEffect(() => {


    let mealDate = '';
    let date = '';

    //if (meal?.mealDate === '') {
    if (meal === null) {
      
      const today = new Date();
      // format 2023-03-01, 2023-12-02  2023-03-09
      
      //const mealDate = `${today.getFullYear()}-${(today.getMonth()+1) < 10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1)}-${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;
      //const date = `${ today.getFullYear() }.${ (today.getMonth()+1) < 10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1) }.${ today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;
    
      mealDate = `${today.getFullYear()}-${(today.getMonth()+1) < 10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1)}-${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;
      date = `${ today.getFullYear() }.${ (today.getMonth()+1) < 10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1) }.${ today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;

      setMeal(
        {
          mealDate: mealDate,

          date: date,

        }
      );
    }

      /*
      setMeal(
        {
          mealDate: mealDate,

          date: date,

        }
      );
      */


      dayMeal?.map(
      (
        item : {
          date: string;


          breakfastMealExist: boolean;
          breakfastCount: number;
          breakfastMealFood: any;

          lunchMealExist: boolean;
          lunchCount: number;
          lunchMealFood: any;

          dinnerMealExist: boolean;
          dinnerCount: number;
          dinnerMealFood: any;

          snackMealExist: boolean;
          snackCount: number;
          snackMealFood: any;

          midnightSnackMealExist: boolean;
          midnightSnackCount: number;
          midnightSnackMealFood: any;

        }
        
      ) => {



        //console.log("==================================");
        //console.log("item?.date===================", item?.date);
        //console.log("mealDate===================", mealDate);





        if (item?.date === mealDate) {

          //console.log("item?.breakfastMealExist", item?.breakfastMealExist);
          //console.log("item?.breakfastMealFood", item?.breakfastMealFood);



          setMeal(
            {
              mealDate: mealDate,

              date: date,

              /*
              breakfast: item?.breakfastMealFood,
              lunch: item?.lunchMealFood,
              dinner: item?.dinnerMealFood,
              snack: item?.snackMealFood,
              midnightSnack: item?.midnightSnackMealFood,
              */

              /*
              breakfast: item?.breakfastMealFood.length > 0 ? item?.breakfastMealFood : null,
              lunch: item?.lunchMealFood.length > 0 ? item?.lunchMealFood : null,
              dinner: item?.dinnerMealFood.length > 0 ? item?.dinnerMealFood : null,
              snack: item?.snackMealFood.length > 0 ? item?.snackMealFood : null,
              midnightSnack: item?.midnightSnackMealFood.length > 0 ? item?.midnightSnackMealFood : null,
              */

              breakfast: item?.breakfastMealExist && item?.breakfastMealFood.length === 0 ?
              [ { foodName: 'skip(먹지 않았음)' } ] : item?.breakfastMealFood,


              lunch: item?.lunchMealExist && item?.lunchMealFood.length === 0 ?
              [ { foodName: 'skip(먹지 않았음)' } ] : item?.lunchMealFood,

              dinner: item?.dinnerMealExist && item?.dinnerMealFood.length === 0 ?
              [ { foodName: 'skip(먹지 않았음)' } ] : item?.dinnerMealFood,

              snack: item?.snackMealExist && item?.snackMealFood.length === 0 ?
              [ { foodName: 'skip(먹지 않았음)' } ] : item?.snackMealFood,

              midnightSnack: item?.midnightSnackMealExist && item?.midnightSnackMealFood.length === 0 ?
              [ { foodName: 'skip(먹지 않았음)' } ] : item?.midnightSnackMealFood,



            }
          );

        }

      }

      );
      
    ///////////}

  //} ,[dayMeal]);

  } ,[dayMeal, meal]);



          






  const { events } = useEventCalendar();

  const { openModal } = useModal();




  
  const handleSelectSlot = useCallback (


    // handle day text region click in month view
    // handle day click in month view







    ({ start, end }: { start: Date; end: Date }) => {

      console.log("handleSelectSlot start", start);
      console.log("handleSelectSlot end", end);



      ///const mealDate = start.toISOString().slice(0, 10);

      const mealDate = `${start.getFullYear()}-${(start.getMonth()+1) < 10 ? '0' + (start.getMonth()+1) : (start.getMonth()+1)}-${start.getDate() < 10 ? '0' + start.getDate() : start.getDate()}`;

      const date = `${ start.getFullYear() }.${ (start.getMonth()+1) < 10 ? '0' + (start.getMonth()+1) : (start.getMonth()+1) }.${ start.getDate() < 10 ? '0' + start.getDate() : start.getDate()}`;


      // go to /usermain/feeds/statistics/details
      ///////////////////router.push(`/usermain/feeds/statistics/details/${dateDay}`);

      
      setSelectedDate(start);

      setSelectedStartDate(start);
      setSelectedEndDate(end);



      setMeal(
        {
          ///mealDate: `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`,

          // format: 2023-03-01
          // mealDate  format: 2023-03-01 from start Date

          // Date toISOString() format: 2023-03-01T00:00:00.000Z

          

          mealDate: mealDate,

          date: date,

          breakfast: [],
          lunch: [],
          dinner: [],
          snack: [],
          midnightSnack: [],
        }
      );




      dayMeal?.map(
      (
        item : {
          date: string;

          breakfastMealExist: boolean;
          breakfastCount: number;
          breakfastMealFood: any;

          lunchMealExist: boolean;
          lunchCount: number;
          lunchMealFood: any;

          dinnerMealExist: boolean;
          dinnerCount: number;
          dinnerMealFood: any;

          
          snackMealExist: boolean;
          snackCount: number;
          snackMealFood: any;

          midnightSnackMealExist: boolean;
          midnightSnackCount: number;
          midnightSnackMealFood: any;




        }
        
      ) => {



        
       

        if (item?.date === mealDate) {


          


            return setMeal(
              {
                mealDate: mealDate,

                date: date,

                /*
                breakfast: item?.breakfastMealFood,
                lunch: item?.lunchMealFood,
                dinner: item?.dinnerMealFood,
                snack: item?.snackMealFood,
                midnightSnack: item?.midnightSnackMealFood,
                */






                breakfast: item?.breakfastMealExist && item?.breakfastMealFood.length === 0 ?
                [ { foodName: 'skip(먹지 않았음)' } ] : item?.breakfastMealFood,
  
  
                lunch: item?.lunchMealExist && item?.lunchMealFood.length === 0 ?
                [ { foodName: 'skip(먹지 않았음)' } ] : item?.lunchMealFood,
  
                dinner: item?.dinnerMealExist && item?.dinnerMealFood.length === 0 ?
                [ { foodName: 'skip(먹지 않았음)' } ] : item?.dinnerMealFood,
  
                snack: item?.snackMealExist && item?.snackMealFood.length === 0 ?
                [ { foodName: 'skip(먹지 않았음)' } ] : item?.snackMealFood,
  
                midnightSnack: item?.midnightSnackMealExist && item?.midnightSnackMealFood.length === 0 ?
                [ { foodName: 'skip(먹지 않았음)' } ] : item?.midnightSnackMealFood,
  
  





              }
            );


        }

      } );

      openModal({
        view: <EventForm startDate={start} endDate={end} />,
        customSize: '650px',
      });
      
    },

    [openModal]

  );
  




  const handleSelectEvent = useCallback(

    //({ start, end, title, description, location }: CalendarEvent) => {



    (event: CalendarEvent) => {




      console.log("=============handleSelectEvent event", event);


  
      // go to /usermain/feeds/statistics/details
      ///router.push(`/usermain/feeds/statistics/details/${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`);



    
      ///const mealDate = event.start.toISOString().slice(0, 10);

      const mealDate = `${event.start.getFullYear()}-${(event.start.getMonth()+1) < 10 ? '0' + (event.start.getMonth()+1) : (event.start.getMonth()+1)}-${event.start.getDate() < 10 ? '0' + event.start.getDate() : event.start.getDate()}`;


          /*`/usermain/feeds/statistics/details/${meal?.mealDate}`*/



      
      router.push(`/usermain/feeds/statistics/details/${mealDate}`);

      return;
      
      


      
      
      const date = `${ event.start.getFullYear() }.${ (event.start.getMonth()+1) < 10 ? '0' + (event.start.getMonth()+1) : (event.start.getMonth()+1) }.${ event.start.getDate() < 10 ? '0' + event.start.getDate() : event.start.getDate()}`;

      console.log("date", date);

      
      setSelectedDate(event.start);

      setSelectedStartDate(event.start);
      setSelectedEndDate(event.end);

    

      
      setMeal(
        {

          mealDate: mealDate,

          date: date,

          breakfast: [],
          lunch: [],
          dinner: [],
          snack: [],
          midnightSnack: [],
        }
      );

      dayMeal?.map(
      (
        item : {

          date: string;

          breakfastCount: number;
          breakfastMealFood: any;
          lunchCount: number;
          lunchMealFood: any;
          dinnerCount: number;
          dinnerMealFood: any;
          snackCount: number;
          snackMealFood: any;
          midnightSnackCount: number;
          midnightSnackMealFood: any;

        }
        
      ) => {

        console.log("item?.date", item?.date);

        if (item?.date === mealDate) {


            return setMeal(
              {
                mealDate: mealDate,
                
                date: date,

                breakfast: item?.breakfastMealFood,
                lunch: item?.lunchMealFood,
                dinner: item?.dinnerMealFood,
                snack: item?.snackMealFood,
                midnightSnack: item?.midnightSnackMealFood,
              }
            );


        }

      } );
      


      
      openModal({


        //view: <DetailsEvents event={event} />,
        //customSize: '500px',
        
        view: <EventForm startDate={event.start} endDate={event.end} />,
        customSize: '650px',

      });
      

      

    

    }, [openModal]
  


    

  );





  const { views, scrollToTime, formats } = useMemo(
    () => ({

      views: {
        month: true,
        week: false,
        day: false,
        agenda: false,
      },
      
      /////scrollToTime: new Date(2023, 10, 27, 6),
      scrollToTime: new Date(2023, 11, 1, 6),

    
      formats: {

        // korean language
        monthHeaderFormat: (date: Date, culture: any, localizer: any) =>

        
        localizer.format(date, 'YYYY. MM', culture),
       

        dateFormat: 'D',

        weekdayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd', culture),

        dayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd M/D', culture),

        timeGutterFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'hh A', culture),

      },







    }),

    []
  );



  if (!session?.user?.email) {
    
    router.push("/usermain/user/login");

    return;

  }







  ////console.log("dayMeal=====", dayMeal);





  ////console.log("meal============================", meal);



  return (

      
    <div className="@container">
    

      <Calendar

 

  

        







        localizer={localizer}





        ////events={events}

        //events={dayMeal}


        
        
        events={

          /// if mouse over on event than show tooltip
          // prevent tooltip





          dayMeal?.map(
          (
            item : {
              date: string;

              breakfastCount: number;
              breakfastMealAmount: number;
              breakfastMealSpeed: number;
              breakfastMealFood:  any;

              lunchCount: number;
              lunchMealAmount: number;
              lunchMealSpeed: number;
              lunchMealFood: any;

              dinnerCount: number;
              dinnerMealAmount: number;
              dinnerMealSpeed: number;
              dinnerMealFood: any;

              snackCount: number;
              snackMealAmount: number;
              snackMealSpeed: number;
              snackMealFood: any;

              midnightSnackCount: number;
              midnightSnackMealAmount: number;
              midnightSnackMealSpeed: number;
              midnightSnackMealFood: any;


            }

          ) => {


            // mouse over on event than show tooltip

            // prevent tooltip



          
            return {


              // month view is default view
              // make smaller of the font size of the event text in month view

              // month view is default view

              className: 'text-xs',










              start: new Date(item?.date + ' 00:00:00'),
              end: new Date(item?.date + ' 23:59:59' ),

     

              //style: {
              //  backgroundColor: item?.breakfastFoodCount === 0 ? 'white' : 'red',
              //},

              ///color: 'red',

              // cell background color

              ////background: item?.breakfastFoodCount === 0 ? 'white' : 'red',

              //cell: {
              //  backgroundColor: item?.breakfastFoodCount === 0 ? 'white' : 'red',
              //},

              //////title: item?.breakfast,

              

              title:

                <div className=" flex flex-col gap-1 ">

     
                  {(item?.breakfastMealAmount + item?.breakfastMealSpeed) > 0 &&
                  <div className='flex flex-row items-center justify-start gap-2'>
                    <ListDietBar bar={(item?.breakfastMealAmount + item?.breakfastMealSpeed)*10} />
                  </div>
                  }

                  {(item?.lunchMealAmount + item?.lunchMealSpeed) > 0 &&
                  <div className='flex flex-row items-center justify-start gap-2'>
                    <ListDietBar bar={(item?.lunchMealAmount + item?.lunchMealSpeed)  *10} />
                  </div>
                  }

                  {(item?.dinnerMealAmount + item?.dinnerMealSpeed) > 0 &&
                  <div className='flex flex-row items-center justify-start gap-2'>
                    <ListDietBar bar={ (item?.dinnerMealAmount + item?.dinnerMealSpeed) *10} />
                  </div>
                  }

                  {(item?.snackMealAmount + item?.snackMealSpeed) > 0 &&
                  <div className='flex flex-row items-center justify-start gap-2'>
                    <ListDietBar bar={(item?.snackMealAmount + item?.snackMealSpeed)*10} />
                  </div>
                  }

                  {(item?.midnightSnackMealAmount + item?.midnightSnackMealSpeed) > 0 &&
                  <div className='flex flex-row items-center justify-start gap-2'>
                    <ListDietBar bar={(item?.midnightSnackMealAmount + item?.midnightSnackMealSpeed)*10} />
                  </div>
                  }
                 

                </div>


              ,

              //tooltip: item?.breakfast,

              // tooltip disable

              ///tooltip: false,

              // tooltip disable

              onClick: () => {
                  
                  console.log("item?.date", item?.date);
  
                  // go to /usermain/feeds/statistics/details
                  //router.push(`/usermain/feeds/statistics/details/${item?.date}`);
  
                }




              // tooltip


              




             
              // event background color change
              //backgroundColor: 'white',

              
            };


          }


        )}
        
        
        /*
        dayPropGetter={
     
          
        }
        */
        
    

        eventPropGetter={
          (event: CalendarEvent) => {
  
              return {
  
                style: {
                  backgroundColor: 'white',

        

                  
                },
  
              };
  
            }
        }

        
        

        // 


        /*

        // event background blue color change to white color
        eventPropGetter={(event) => {


          console.log("eventPropGetter event", event);

          return {



            style: {
              backgroundColor: 'white',
            },


          };

        } }
        */
        



        

        

        views={views}


        formats={formats}
        
        startAccessor="start"
        endAccessor="end"

        dayLayoutAlgorithm="no-overlap"



                /*
        onSelectSlot={
          
          handleSelectSlot 

        }
        */


        // dateCell click handler
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}

        // handle click event for day text region in month view
        // day display region click event in month view
        // how to handle click event for day text region in month view
        // day click event in month view
        // how to handle click event for day text region in month view

        onKeyPressEvent={ (event: any) => {

          console.log("onKeyPressEvent event", event);

        } }






















        







        // mouse over event handler


    




        // handle event click for day cell






        


        // mouse over on event than show tooltip
        // prevent tooltip


        //onMouseOverEvent={handleMouseOverEvent}
      

        



        // on click date cell


        // on click event
        
        

   
  



        //selectable

        selectable={true}



        scrollToTime={scrollToTime}

        //className={cn('h-[650px] md:h-[1000px]', calendarToolbarClassName)}

        className={cn('h-[800px] md:h-[800px]', calendarToolbarClassName)}




        // toolbar -> calendar header
        // 
        /*
              <div className="flex justify-center items-center mb-10">
                <div className="text-2xl font-extrabold">
                  {localizer.format(new Date(), 'YYYY. MM', 'ko-KR')}
                </div>
              </div>
      
        */
        
        /* customie toolbar for previouse button and next button for changing month */

        /*
        components={{

          month: {
            dateHeader: MyDateHeader,
          },
         

        }}
        */


                  // mouse over on event than show tooltip
          // disable tooltip
          //tooltip={false}
          // prevent tooltip

        tooltipAccessor={null}




        /*
               // language to korean

        components={{
          dateHeader: MyDateHeader,
          dateCellWrapper: ColoredDateCellWrapper,
        }}
        */

        /*
        	components={{
            month: {
              dateHeader: MyDateHeader,
            },
            dateCellWrapper: MyDateCellWrapper,
            }}
            */

        
        components={{



          // language to korean
          // Week, Day, Month, Agenda





          // date header language to korean
          

          



          // cell background color change

          dateCellWrapper: ColoredDateCellWrapper,

          


          




          




          // day cell click event




          // day cell event backgraund color change at month view



          //dateCellWrapper: ColoredDateCellWrapper,
          /*const ColoredDateCellWrapper = (
            {
              children,
              value
            } : {
              children: any;
              value: any;
            }
          ) =>
          React.cloneElement(Children.only(children), {
              style: {
                  ...children.style,
                  backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
              },
          });
          */

          
          /*
          dateCellWrapper: ({ children, value }: { children: any; value: any; }) =>
            
            React.cloneElement(Children.only(children), {

              
              style: {
                  ...children.style,
                  backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
              },
              
            }
            
          ),
          */

          /*
          dateCellWrapper: ({ children, value }: { children: any; value: any; }) => {
            return (
              <div
                /////style={{  backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',  }}
                className='bg-white border-[1px] border-solid w-full h-full'
              >

                {
                  daymeal?.map( (item: any) => {

                    //console.log("item?.date", item?.date);
                    //console.log("value getFullYear", value.getFullYear());
                    //console.log("value getMonth", value.getMonth()+1);
                    //console.log("value getDate", value.getDate());
                    //  check same date ex) 2023.12.01

                    ////if ( new Date(item?.date).getFullYear() === value.getFullYear() && new Date(item?.date).getMonth() === value.getMonth()+1 && new Date(item?.date).getDate() === value.getDate() ) {

                    if (
                      // check same date ex) 2023.12.01
                      new Date(item?.date).getFullYear() === value.getFullYear() &&
                      new Date(item?.date).getMonth() === value.getMonth() &&
                      new Date(item?.date).getDate() === value.getDate()
                    ) {


                      return (
                        <div
                          className='bg-red-500 w-full h-full'
                        >
                        </div>
                      );

                    } else {

                      return (
                        <div
                          className='bg-blue w-full h-full'
                        >
                        </div>
                      );
                    }

                  }
                  )
                }
                 

              </div>
            );
          },
          */


          



          




          month: {

            // 한글로 변경
    
            ///dateHeader background color change

            //dateHeader: {
    
            //}
            

            
            /*
            event: ({ event }: { event: CalendarEvent }) => {

              return (
                <div

                  className="flex flex-col items-start justify-center w-full h-full bg-white"


                  
                  style={
                    {
                      backgroundColor: "#ff0000",
                      color: "#fff",
                      borderRadius: "5px",
                    }
                  }
                

                >
                  <div className="text-sm text-dark">
                    {event?.title}
                  </div>

                </div>
              );

            },
            */

            
               

          },




          toolbar: (props) => {

            return (
              <div className="flex justify-center items-center gap-10 mb-10">

                {/* previouse button */}
                <button
                  type="button"
                  className="flex justify-center items-center"
                  onClick={() => {
                    props.onNavigate('PREV');
                  }}
                >
   

                  <AiOutlineLeft className="h-5 w-5 text-dark" />
                </button>

                <div className="text-xl xl:text-2xl font-extrabold">
                  {localizer.format(props.date, 'YYYY. MM', 'ko-KR')}
                </div>


                {/* next button */}
                <button
                  type="button"
                  className="flex justify-center items-center"
                  onClick={() => {
                    props.onNavigate('NEXT');
                  }}
                >
                  <AiOutlineRight className="h-5 w-5 text-dark" />
                 
                </button>



              </div>
            );
          },


        }}
        


      />



      <div
        ////href={`/usermain/feeds/statistics/details/${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`}

        className=" mt-16 self-stretch rounded-xl flex flex-col xl:flex-row items-start justify-center p-5 gap-[20px] text-left text-base border-[1px] border-solid border-dark"
        style={{ textDecoration: 'none' }}
      >
        


        <Link
          href={`/usermain/feeds/statistics/details/${meal?.mealDate}`}
          className="relative font-extrabold flex items-center w-40 shrink-0">
          
          {/* dayjs().format('YYYY.MM.DD') */}

          {
            meal?.date
          } 식사

          {/* 2023.12.1 식사 */}
          
        </Link>


        <div className="flex-1 flex flex-col items-start justify-end gap-[8px] text-center text-xs text-grey-6">

       
          <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
            <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
              
              { meal?.breakfast?.length === 0 ?
              <span className="relative w-8 ">
                아침 
              </span>
              :
              <Link
                href={`/usermain/feeds/details/${meal?.mealDate}-breakfast`}
                className="relative w-8 ">
                아침
              </Link>
              }

            </div>

            
            <div className="relative text-sm text-dark">

              { meal?.breakfast?.length === 0 ?
                
                
                <Link
                  href={`/usermain/feeds/writeMeal/${meal?.mealDate}-breakfast`}
                  className="text-sm text-dark"
                  style={{ textDecoration: 'none' }}
                >
                  {/*
                  <div className="text-sm text-dark">
                    
                    <motion.div
                      className="box"
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        className=" w-5 h-5 "
                        alt=""
                        src="/usermain/images/write.svg"
                      />                     
                    </motion.div>

                  </div>
                  */}

                </Link>
                
              

                : 
         
                  meal?.breakfast && meal?.breakfast?.map((item: any) => {
                    ///return item?.foodName + ', ';
                    // last item don't add ','
                    return item?.foodName + (meal?.breakfast[meal?.breakfast.length-1] === item ? '' : ', ');
                  } )
                  

              }

            </div>
            

          </div>


          <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
            <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
              
              { meal?.lunch?.length === 0 ?
              <span className="relative w-8 ">
                점심
              </span>
              :
              <Link
                href={`/usermain/feeds/details/${meal?.mealDate}-lunch`}
                className="relative w-8 ">
                점심
              </Link>
              }

            </div>

            
            <div className="relative text-sm text-dark">

              { meal?.lunch?.length === 0 ?

                <Link
                  href={`/usermain/feeds/writeMeal/${meal?.mealDate}-lunch`}
                  className="text-sm text-dark"
                  style={{ textDecoration: 'none' }}
                >
                  {/*
                  <div className="text-sm text-dark">
                    <motion.div
                      className="box"
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        className=" w-5 h-5 "
                        alt=""
                        src="/usermain/images/write.svg"
                      />                     
                    </motion.div> 
                  </div>
                  */}
                </Link>

                :
                meal?.lunch && meal?.lunch?.map((item: any) => {
                  //return item?.foodName + ', ';
                  // last item don't add ','
                  return item?.foodName + (meal?.lunch[meal?.lunch.length-1] === item ? '' : ', ');
                } )
              }
            </div>
            

          </div>


          <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
            
            <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
              { meal?.dinner?.length === 0 ?
              <span className="relative w-8 ">
                저녁
              </span>
              :
              <Link
                href={`/usermain/feeds/details/${meal?.mealDate}-dinner`}
                className="relative w-8 ">
                저녁
              </Link>
              }
            </div>

            
            <div className="relative text-sm text-dark">
              { meal?.dinner?.length === 0 ?

                <Link
                  href={`/usermain/feeds/writeMeal/${meal?.mealDate}-dinner`}
                  className="text-sm text-dark"
                  style={{ textDecoration: 'none' }}
                >
                  {/*
                  <div className="text-sm text-dark">
                    <motion.div
                      className="box"
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        className=" w-5 h-5 "
                        alt=""
                        src="/usermain/images/write.svg"
                      />                     
                    </motion.div>
                  </div>
                  */}

                </Link>

                :

                meal?.dinner && meal?.dinner?.map((item: any) => {
                  //return item?.foodName + ', ';
                  // last item don't add ','
                  return item?.foodName + (meal?.dinner[meal?.dinner.length-1] === item ? '' : ', ');
                } )
              }
            </div>
            

          </div>

          
          <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
            <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
            
              { meal?.snack?.length === 0 ?
              <span className="relative w-8 ">
                간식
              </span>
              :
              <Link
                href={`/usermain/feeds/details/${meal?.mealDate}-snack`}
                className="relative w-8 ">
                간식
              </Link>
              }

            </div>

            
            <div className="relative text-sm text-dark">
              
              { meal?.snack?.length === 0 ?

                <Link
                  href={`/usermain/feeds/writeMeal/${meal?.mealDate}-snack`}
                  className="text-sm text-dark"
                  style={{ textDecoration: 'none' }}
                >
                  {/*
                  <div className="text-sm text-dark">
                    <motion.div
                      className="box"
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        className=" w-5 h-5 "
                        alt=""
                        src="/usermain/images/write.svg"
                      />                     
                    </motion.div>
                  </div>
                  */}

                </Link>

                :


                meal?.snack && meal?.snack?.map((item: any) => {
                  ////return item?.foodName + ', ';
                  // last item don't add ','
                  return item?.foodName + (meal?.snack[meal?.snack.length-1] === item ? '' : ', ');
                } )
              }
            </div>
            

          </div>
        

          <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
            <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
              
              { meal?.midnightSnack?.length === 0 ?
              <span className="relative w-8 ">
                야식
              </span>
              :
              <Link
                href={`/usermain/feeds/details/${meal?.mealDate}-midnightSnack`}
                className="relative w-8 ">
                야식
              </Link>
              }

            </div>

            
            <div className="relative text-sm text-dark">
              
              { meal?.midnightSnack?.length === 0 ?

                <Link
                  href={`/usermain/feeds/writeMeal/${meal?.mealDate}-midnightSnack`}
                  className="text-sm text-dark"
                  style={{ textDecoration: 'none' }}
                >
                  {/*
                  <div className="text-sm text-dark">
                    <motion.div
                      className="box"
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        className=" w-5 h-5 "
                        alt=""
                        src="/usermain/images/write.svg"
                      />                     
                    </motion.div>
                  </div>
                  */}

                </Link>

                :
                

                meal?.midnightSnack && meal?.midnightSnack?.map((item: any) => {
                  ////return item?.foodName + ', ';
                  // last item don't add ','
                  return item?.foodName + (meal?.midnightSnack[meal?.midnightSnack.length-1] === item ? '' : ', ');
                } )
              }
            </div>
            

          </div>


        </div>


      </div>


    
      



    </div>


  );
}
