'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";

import InputDate from "@/components-figma/input-date";
import Tag from "@/components-figma/tag";
import MealQuantityContainer from "@/components-figma/meal-quantity-container";
import BtnBigOn from "@/components-figma/btn-big-on";
import Footer from "@/components-figma/footer";

import Link from "next/link";

import { useState, useEffect, use } from "react";

import { useSession, signIn, signOut } from 'next-auth/react';



import { DatePicker } from '@/components/ui/datepicker';


import { Input } from '@/components/ui/input';
//PiMagnifyingGlassBold
import { PiMagnifyingGlassBold, PiXBold } from 'react-icons/pi';


import Image from "next/image";

import { useAnimation, motion } from "framer-motion";


import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Title } from '@/components/ui/text';

import PostFeed from '@/app/shared/profile/post-feed';
import FollowerModal from '@/app/shared/profile/follower-modal';
import { postData, followersData, followingData } from '@/data/profile-data';




import DatabaseTableWidget from '@/components-figma/doingdoit/database-table-widget';

/////import { data as calorieData } from '@/data/doingdoit/feed/calorie-db-data';


import { data as calorieData } from '@/data/doingdoit/feed/calorie-db-data-new';



import { getColumns } from '@/app/shared-doingdoit/feed/calorie-db-columns-user';
import toast from "react-hot-toast";
import { set } from "lodash";

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';




export default function FeedDetailOnePage({ params }: any) {

  const { _mealDateTime } = params;

  const mealDateParam = _mealDateTime.split('-')[0] + '-' + _mealDateTime.split('-')[1] + '-' + _mealDateTime.split('-')[2];
  const mealTimeParam = _mealDateTime.split('-')[3];

  
  console.log('mealDateParam: ', mealDateParam);
  console.log('mealTimeParam: ', mealTimeParam);






  const { data: session, status } = useSession();


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* fetch user data from an API
  /api/doingdoit/user/getUser
  */
  const [userId, setUserId] = useState(session?.user?.id);
  const [userEmail, setUserEmail] = useState(session?.user?.email);
  const [userName, setUserName] = useState(session?.user?.name);
  const [userNickname, setUserNickname] = useState('');
  const [userAvatar, setUserAvatar] = useState(session?.user?.image);


  //const [mealDate, setMealDate] = useState('2023-01-01');

  const [feedEmail, setFeedEmail] = useState<string>('');

  const [mealDate, setMealDate] = useState<string>(mealDateParam);

  const [mealTime, setMealTime] = useState<string>('');
  




  useEffect(() => {

    setMealDate(mealDateParam);

    setMealTime(
      mealTimeParam === 'breakfast' ? '아침' : mealTimeParam === 'lunch' ? '점심' : mealTimeParam === 'dinner' ? '저녁' : mealTimeParam === 'snack' ? '간식' : mealTimeParam === 'midnightSnack' ? '야식' : '아침'
    );

  }, [mealTimeParam, mealDateParam]);



  const [mealFood, setMealFood] = useState<any[]>([]);

  const [mealAmount, setMealAmount] = useState<number>(0);
  const [mealSpeed, setMealSpeed] = useState<number>(0);


  const [meal, setMeal] = useState( {
    mealDate: mealDate,

    date: mealDate,

    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
    midnightSnack: [],

  } as any);



  



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

        setUserNickname(data.data?.nickname);
        setUserId(data.data?.id);

        ///setFeedEmail(data.data?.email);

    
        

      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email]);








  

  const [mealTimeData, setMealTimeData] = useState(
    [] as any[]
  );


  const [isExistBreakfast, setIsExistBreakfast] = useState(false);
  const [isExistLunch, setIsExistLunch] = useState(false);
  const [isExistDinner, setIsExistDinner] = useState(false);
  const [isExistSnack, setIsExistSnack] = useState(false);
  const [isExistNightSnack, setIsExistNightSnack] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      const email = session?.user?.email;
  
      if (!email) return;
  
      setLoading(true);


 
  
      const res = await fetch(`/api/doingdoit/feed/getStatisticsDayByEmail?_email=${session?.user?.email}&_mealDate=${mealDate}`);


      const data  = await res?.json() as any;

      ///console.log(' data: ',data?.data);

      const posts = data?.data?.mealTimeData;



      // set isExistBreakfast, isExistLunch, isExistDinner, isExistSnack, isExistNight

      setIsExistBreakfast(false);
      setIsExistLunch(false);
      setIsExistDinner(false);
      setIsExistSnack(false);
      setIsExistNightSnack(false);
      posts?.map ( (item: any) => {
          
          if (item?.mealTime === "아침") {
            setIsExistBreakfast(true);
          } else if (item?.mealTime === "점심") {
            setIsExistLunch(true);
          } else if (item?.mealTime === "저녁") {
            setIsExistDinner(true);
          } else if (item?.mealTime === "간식") {
            setIsExistSnack(true);
          } else if (item?.mealTime === "야식") {
            setIsExistNightSnack(true);
          }
  
        }
      );
  
  

      setMealTimeData (posts);





      const breakfast = posts?.filter((post: any) => post?.mealTime === '아침').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      const lunch = posts?.filter((post: any) => post?.mealTime === '점심').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      const dinner = posts?.filter((post: any) => post?.mealTime === '저녁').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      const snack = posts?.filter((post: any) => post?.mealTime === '간식').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);

      const midnightSnack = posts?.filter((post: any) => post?.mealTime === '야식').reduce((acc: any, cur: any) => acc.concat(cur.mealFood), []);


      setMeal({
        mealDate: mealDate,

        date: mealDate,

        breakfast: breakfast,

        lunch: lunch,

        dinner: dinner,

        snack: snack,

        midnightSnack: midnightSnack,


      });



  

  
      setLoading(false);
  
    };

    fetchData();
  }
  ,[ session?.user?.email, mealDate  ]);










  const [enableBtn, setEnableBtn] = useState(false);
  useEffect(() => {
    if (mealDate && mealTime && mealFood && mealAmount && mealSpeed) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  }, [mealDate, mealTime, mealFood, mealAmount, mealSpeed]);


  const [feedbackYn, setFeedbackYn] = useState<string>('N');



  ////const [items, setItems] = useState<string[]>([]);

  
  
  
 


  /*
   const [itemText, setItemText] = useState<string>('');
  function handleItemAdd(): void {
    if (itemText.trim() !== '') {
      const newItem: string = itemText;

      setItems([...items, newItem]);
      setValue('tags', [...items, newItem]);
      setItemText('');
    }
  }
  */

  function handleItemRemove(text: string): void {
    
    const updatedItems = mealFood.filter((item) => item?.foodName !== text);

    setMealFood(updatedItems);

  }



  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [modalData, setModalData] = useState({
    title: '식품DB',
    data: followersData,
  });

  ///const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    setOpen(() => false);
  }, [pathname]);

  // handle follower and following modal open
  function handleTabClick(id: string) {
    if (id === 'followers') {
      
      setModalData({ title: '식품DB', data: followersData });

    } else if (id === 'following') {
      setModalData({ title: 'Following', data: followingData });
    }
    setOpen(() => true);
    ////setActive(() => id);
  }






  const register = async () => {

    setLoading(true);


    try {

      setError(null);

      // json post parameter
      const param = {
        userId: userId,
        email: userEmail,
        name: userName,
        nickname: userNickname,
        avatar: userAvatar,

        mealDate: mealDate,
        mealTime: mealTime,

        mealFood: mealFood,

        mealAmount: mealAmount,
        mealSpeed: mealSpeed,
        feedbackYn: feedbackYn,
      };

      const res = await fetch(`/api/doingdoit/feed/registerOneJson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      });


      if (res.status === 200) {

        const json = await res?.json();

        if (json === undefined) {
          //alert("이메일이 이미 존재합니다.");
          return;
        } else {

          const data = json as any;
      
          if (data?.data?.id)  {
            ///window.location.href = "/";

            ///window.location.href = `/usermain/user/profile-edit/${email}  `;
            window.location.href = `/usermain/feeds/write2/${data?.data?.id}  `;
          } else {
            //alert(json.message);
          }    

        }


      } else {
        
        return;
      }

    } catch (error) {
      console.log(error);
      //setError(error);
    }

  }



  console.log("feedEmail : " + feedEmail);
  console.log("session?.user?.email : " + session?.user?.email);


  /* 구매주문 페이지가 없으면 해당 페이지가 없다고 보여준다. */
  /*
  if ( _id !== "1" &&   !feedEmail ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="text-2xl font-bold">구매주문가 없습니다.</div>
        <button
          onClick={() => signIn()}
          className="bg-dark text-white px-4 py-2 rounded-md"
        >
          로그인
        </button>
      </div>
    );
  }
  */
  


  /* 로그인이 안되어 있으면 로그인 하라는 메시지를 보여준다. */
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="text-2xl font-bold">로그인이 필요합니다.</div>
        <button
          onClick={() => signIn()}
          className="bg-dark text-white px-4 py-2 rounded-md"
        >
          로그인
        </button>
      </div>
    );
  }
  


  /* 로그인한 사용자와 글쓴이가 다르면 읽기만 가능한 페이지로 이동한다.

  goto feed detail page if the user is not the author of the feed
  
  */
  if ( feedEmail !== '' &&  session?.user?.email !== feedEmail) {

    window.location.href = `/usermain/feeds`;

  }


  const changeDate = (date: Date) => {

    // fetch data from API
    // mealTime of the date

    console.log("changeDate date : " + date);




    ///setMealDate(date);

    // format 2013-01-01
    // format 2013-01-01
    const mealDate = `${date.getFullYear()}-${(date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;

    setMealDate(mealDate);

    // release check mark
    setMealTime("");
  }





  return (


    <>

    <div className="bg-dark sticky top-0 z-50 ">

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


    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-left text-sm text-dark font-menu-off">

      <div className="self-stretch flex flex-col items-center justify-start">
       
        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">

          {/*
          <div className="  xl:w-[1000px] flex flex-col items-center justify-start">
          */}

          <div className=" w-full pl-5 pr-5
          xl:w-[1000px] xl:pl-0 xl:pr-0   flex flex-col items-center justify-start">


            <div className="self-stretch bg-white flex flex-col items-center justify-end p-5 xl:p-10 gap-[40px]">
              
              <div
                className="self-stretch flex flex-row items-center justify-between pt-0 px-0 pb-5 text-left text-5xl text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
                //style={bread1Style}
              >
                <div className="relative tracking-[-0.02em] font-extrabold">
                  {'구매주문 작성하기'}
                </div>

                
                <motion.div
                  className="relative flex flex-row items-center justify-center gap-[8px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                <button
                  //href="/usermain/feeds"

                  // history back
                  
                  onClick={() => {
                    window.history.back();
                  }}

                  className=" no-underline flex"
                >
                <Image
                  width="24"
                  height="24"
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/x2.svg"
                  
                />
                </button>
                </motion.div>
                
              </div>

              <div className="self-stretch flex flex-col items-center justify-end gap-[40px]">
                
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">

                  <div className="relative font-extrabold flex items-center w-[72px] shrink-0">
                    <span className="[line-break:anywhere] w-full">
                      <span>일자</span>
                      <span className="text-red">*</span>
                    </span>
                  </div>

                  {/* 일자 입력창 */}

                  <div className="flex flex-row items-center justify-start gap-[8px]">


                    {/*
                    <button
                      onClick={() => {
                        const prevDate = new Date(mealDate);
                        prevDate.setDate(prevDate.getDate() - 1);
                        changeDate(prevDate);
                      }}
                    >
                      <AiOutlineLeft className="h-5 w-5" />
                    </button>
                    */}

                    <DatePicker

                      showFullMonthYearPicker


                      selected={
                        new Date(mealDate)
                      }

                      ///onChange={(date: Date) => setMealDate(date)}

                      onChange={(date: Date) => {
                        ///setMealDate(date);

                        changeDate(date);

                      }}

                      placeholderText=""
                      
                      popperPlacement="bottom-end"

                      className=" w-44 "
                    />

                    {/*
                    <button
                      onClick={() => {
                        const nextDate = new Date(mealDate);
                        nextDate.setDate(nextDate.getDate() + 1);
                        changeDate(nextDate);
                      }}
                    >
                      <AiOutlineRight className="h-5 w-5" />
                    </button>
                    */}

                  </div>



                </div>







                <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                  <div className="relative font-extrabold flex items-center w-[72px] shrink-0">
                    
                      <span>식사시간</span>
                      <span className="text-red">*</span>
                    
                  </div>


                  <div className="flex flex-col items-start justify-center gap-[8px] text-center text-grey-9">




                  { mealTimeData?.length > 0 && (
                    <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">


                      <div
                        className=" self-stretch rounded-xl flex flex-col xl:flex-row items-start justify-center p-5 gap-[20px] text-left text-base border-[1px] border-solid border-f1"     
                      >



                        <div className="flex-1 flex flex-col items-start justify-end gap-[8px] text-center text-xs text-grey-6">

                          {meal.breakfast && meal.breakfast?.length > 0 && (
                          <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                            <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
                              <div className="relative w-8 ">아침</div>
                            </div>
                            <div className="relative text-sm text-dark">
                              {
                                //meal.breakfast === '0' ? '-' : meal.breakfast

                                meal.breakfast && meal.breakfast?.map((item: any) => {
                                  ///return item?.foodName + ', ';
                                  // last item don't add ','
                                  return item?.foodName + (meal.breakfast[meal.breakfast.length-1] === item ? '' : ', ');
                                } )
                              }
                              
                            </div>
                          </div>
                          )}

                          {meal.lunch && meal.lunch?.length > 0 && (
                          <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                            <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
                              <div className="relative w-8">점심</div>
                            </div>
                            <div className="relative text-sm text-dark">
                              {
                                meal.lunch && meal.lunch?.map((item: any) => {
                                  //return item?.foodName + ', ';
                                  // last item don't add ','
                                  return item?.foodName + (meal.lunch[meal.lunch.length-1] === item ? '' : ', ');
                                } )
                              }
                            </div>
                          </div>
                          )}

                          {meal.dinner && meal.dinner?.length > 0 && (
                          <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                            <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
                              <div className="relative w-8">저녁</div>
                            </div>
                            <div className="relative text-sm text-dark">
                              {
                                meal.dinner && meal.dinner?.map((item: any) => {
                                  //return item?.foodName + ', ';
                                  // last item don't add ','
                                  return item?.foodName + (meal.dinner[meal.dinner.length-1] === item ? '' : ', ');
                                } )
                              }
                            </div>
                          </div>
                          )}

                          
                          {meal.snack && meal.snack?.length > 0 && (
                          <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                            <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
                              <div className="relative w-8">간식</div>
                            </div>
                            <div className="relative text-sm text-dark">
                              {
                                meal.snack && meal.snack?.map((item: any) => {
                                  ////return item?.foodName + ', ';
                                  // last item don't add ','
                                  return item?.foodName + (meal.snack[meal.snack.length-1] === item ? '' : ', ');
                                } )
                              }
                            </div>
                          </div>
                          )}

                          {meal.midnightSnack && meal.midnightSnack?.length > 0 && (
                          <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                            <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
                              <div className="relative w-8">야식</div>
                            </div>
                            <div className="relative text-sm text-dark">
                              {
                                meal.midnightSnack && meal.midnightSnack?.map((item: any) => {
                                  ////return item?.foodName + ', ';
                                  // last item don't add ','
                                  return item?.foodName + (meal.midnightSnack[meal.midnightSnack.length-1] === item ? '' : ', ');
                                } )
                              }
                            </div>
                          </div>
                          )}

                        
                        </div>

                      </div>

                    </div>
                  )}



                    
                    <div className="flex flex-row items-center justify-center text-xs xl:text-sm ">
   
                   
                      {/* select button  아침, 점심, 저녁, 간식, 야식 */}

                      
                      {!isExistBreakfast && (
                      <button

                        disabled={isExistBreakfast}

                        onClick = {() => setMealTime("아침")}

                        //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                        //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                        className={`  ${ mealTime === "아침" ? "bg-dark text-white  font-extrabold " : "bg-grey-f1  " }   w-[50px]  xl:w-[100px] h-11 flex flex-row items-center justify-center `}
                      >
                        아침
                        {/* if isExistBreakfast, then check mark */}
                        {isExistBreakfast && (
                          <Image
                            width="24"
                            height="24"
                            className={`relative w-3 h-3 ml-2 `}
                            alt=""
                            src="/usermain/images/outlinecheck2.svg"
                          />
                        )}
                      </button>
                      )}


                      {!isExistLunch && (
                      <button

                        disabled={isExistLunch}

                        onClick = {() => setMealTime("점심")}

                        //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                        //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                        className={`

                          ${ mealTime === "점심" ? "bg-dark text-white font-extrabold" : "bg-grey-f1 " } w-[50px]  xl:w-[100px] h-11 flex flex-row items-center justify-center `}
                      >
                        점심

                        {isExistLunch && (
                          <Image
                            width="24"
                            height="24"
                            className={`relative w-3 h-3 ml-2 `}
                            alt=""
                            src="/usermain/images/outlinecheck2.svg"
                          />
                        )}

                      </button>
                      )}


                      {!isExistDinner && (
                      <button

                        disabled={isExistDinner}

                        onClick = {() => setMealTime("저녁")}

                        //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                        //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                        className={`  ${ mealTime === "저녁" ? "bg-dark text-white font-extrabold" : "bg-grey-f1 " } w-[50px]  xl:w-[100px] h-11 flex flex-row items-center justify-center `}
                      >
                        저녁

                        {isExistDinner && (
                          <Image
                            width="24"
                            height="24"
                            className={`relative w-3 h-3 ml-2 `}
                            alt=""
                            src="/usermain/images/outlinecheck2.svg"
                          />
                        )}

                      </button>
                      )}

                      
                      {!isExistSnack && (
                      <button

                        disabled={isExistSnack}


                        onClick = {() => setMealTime("간식")}

                        //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                        //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                        className={`
                          
                          

                          ${ mealTime === "간식" ? "bg-dark text-white font-extrabold" : "bg-grey-f1 " } w-[50px]  xl:w-[100px] h-11 flex flex-row items-center justify-center `}
                      >
                        간식

                        {isExistSnack && (
                          <Image
                            width="24"
                            height="24"
                            className={`relative w-3 h-3 ml-2 `}
                            alt=""
                            src="/usermain/images/outlinecheck2.svg"
                          />
                        )}

                      </button>
                      )}

                      {!isExistNightSnack && (
                      <button

                        disabled={isExistNightSnack}

                        onClick = {() => setMealTime("야식")}

                        //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                        //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                        className={`  ${ mealTime === "야식" ? "bg-dark text-white font-extrabold" : "bg-grey-f1 " } w-[50px]  xl:w-[100px] h-11 flex flex-row items-center justify-center `}
                      >
                        야식

                        {isExistNightSnack && (
                          <Image
                            width="24"
                            height="24"
                            className={`relative w-3 h-3 ml-2 `}
                            alt=""
                            src="/usermain/images/outlinecheck2.svg"
                          />
                        )}
                        
                      </button>
                      )}

                    </div>

                    {/*
                    <div className="flex flex-row items-center justify-center gap-[8px] text-left text-xs text-dark">
                      <img
                        className="relative w-5 h-5 overflow-hidden shrink-0 hidden"
                        alt=""
                        src="/usermain/images/check-box.svg"
                      />
                      <img
                        className="relative w-5 h-5 overflow-hidden shrink-0"
                        alt=""
                        src="/usermain/images/check-box-outline-blank.svg"
                      />
                      <div className="relative">skip(먹지 않았음)</div>
                    </div>
                    */}
                    {/* skip(먹지 않았음) 체크박스 dark color */}
                    <div className="flex flex-row items-center justify-center gap-[8px] text-left text-xs text-dark">
                      <input
                        checked={mealTime === "skip" ? true : false}
                        type="checkbox"
                        id="skip"
                        name="skip"
                        value="skip"
                        // dark color input checkbox
                        className="w-5 h-5
                        text-dark  border-[1px] border-solid border-dark
                        "
                        onChange={(e) => {
                          
                          if (e.target.checked) {
                            setMealTime("skip");
                          } else {
                            setMealTime("아침");
                          }
                          

                        } }
                      />
                      <label htmlFor="skip">skip(먹지 않았음)</label>
                    </div>


                  </div>
                </div>


                <div className="self-stretch flex flex-col items-start justify-center gap-[12px]">
                  <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                    <div className="relative">
                      <span>
                        <span className="font-extrabold">
                          <span>음식을 선택하세요</span>
                          <span className="text-xs">.</span>
                        </span>
                        <span className="text-xs">
                          <span className="font-menu-off">(최대 10개)</span>
                        </span>
                      </span>
                      <span className="font-extrabold text-red">*</span>
                    </div>
                    
                    {/* 찾기 버튼 */}
                    {/*
                    <div className="rounded-81xl bg-white flex flex-row items-center justify-start py-2 px-5 text-center text-xs border-[1px] border-solid border-dark">
                      <div className="relative font-extrabold">찾기</div>
                    </div>
                    */}
                    <button
                      onClick = {() =>  handleTabClick("음식선택")}
                    >
                    <div className="rounded-81xl bg-white flex flex-row items-center justify-start py-2 px-5 text-center text-xs border-[1px] border-solid border-dark">

                      <div className="relative font-extrabold">찾기</div>
                      
                    </div>
                    </button>

                  </div>

                  <div className="flex flex-row items-center justify-center gap-[8px]">

                    {/*
                    <Tag
                      prop="케잌"
                      x="/usermain/images/x.svg"
                      tagBackgroundColor="#f1f1f1"
                      divColor="#999"
                    />
                    <Tag
                      prop="아메리카노"
                      x="/usermain/images/x3.svg"
                      tagBackgroundColor="#212121"
                      divColor="#fff"
                    />
                    */}
                    

                    {/*
                        <div
                        className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-start py-3 px-5 gap-[20px] text-center text-xs text-grey-9 font-menu-off"
                        style={tagStyle}
                      >
                        <div className="relative font-extrabold" style={divStyle}>
                          {prop}
                        </div>
                        <img
                          className="relative w-4 h-4 overflow-hidden shrink-0"
                          alt=""
                          src={x}
                        />
                      </div>
                    */}


                    {mealFood.length > 0 && (
                      <div
                        className="mt-0 flex flex-wrap gap-2"
                      >

                        {mealFood.map(( item , index) => (

                          <div
                            key={index}
                            //className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                            className="rounded-81xl bg-[#212121] flex flex-row items-center justify-start py-3 px-5 gap-[20px] text-center text-xs text-grey-9 font-menu-off"
                          >
                            <div className="relative font-extrabold text-white  ">
                              {
                                item?.foodName
                              }
                            </div>
                            <button
                              onClick={() => handleItemRemove( item?.foodName )}
                            >
                              {/*
                              <PiXBold className="h-3.5 w-3.5" />
                              */}
                               <img
                                className="relative w-4 h-4 overflow-hidden shrink-0"
                                alt=""
                                src={'/usermain/images/x3.svg'}
                                />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}




                  </div>
                </div>



              <div className="self-stretch flex flex-col items-start justify-center gap-[8px] text-left text-xs text-dark font-menu-off">
                
                <div className="self-stretch relative">
                  <span>
                    <span className="text-sm font-extrabold font-menu-off">
                      {"식사량"}
                    </span>
                    <span>{"(1인분 기준으로 식사량은 어땠나요?)"}</span>
                  </span>
                  <span className="text-sm font-extrabold text-red">*</span>
                </div>

                <div className="flex flex-col items-center justify-center gap-[4px] text-grey-9">

                  <div className="flex flex-row items-center justify-center gap-[2px]">


                    {/*}
                    <div className="bg-grey-e w-[60px] h-8" />
                    <div className="bg-grey-e w-[60px] h-8" />
                    <div className="bg-dark w-[60px] h-8 flex flex-row items-center justify-center">
                      <Image
                        width="24"
                        height="24"
                        className="relative w-3 h-3 overflow-hidden shrink-0"
                        alt=""
                        src="/usermain/images/outlinecheck2.svg"
                      />
                    </div>
                    <div className="bg-grey-e w-[60px] h-8" />
                    <div className="bg-grey-e w-[60px] h-8" />
                    */}

                    {/* 식사량 선택버튼 */}
                    <button
                      onClick = {() => setMealAmount(1)}

                      //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                      //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                      className={`  ${ mealAmount === 1 ? "bg-dark text-white" : "bg-grey-f1 " } w-[60px] h-8 flex flex-row items-center justify-center `}
                    >

                          <Image
                          width="24"
                          height="24"
                          className={`relative w-3 h-3 overflow-hidden shrink-0 ${ mealAmount === 1 ? "visible" : "hidden" } `}
                          alt=""
                          src="/usermain/images/outlinecheck2.svg"
                        />
                      
                      
                    </button>
                    <button
                      onClick = {() => setMealAmount(2)}

                      //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                      //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                      className={`  ${ mealAmount === 2 ? "bg-dark text-white" : "bg-grey-f1 " } w-[60px] h-8 flex flex-row items-center justify-center `}
                    >
                          <Image
                          width="24"
                          height="24"
                          className={`relative w-3 h-3 overflow-hidden shrink-0 ${ mealAmount === 2 ? "visible" : "hidden" } `}
                          alt=""
                          src="/usermain/images/outlinecheck2.svg"
                        />
                      
                    </button>

                    <button
                      onClick = {() => setMealAmount(3)}

                      //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                      //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                      className={`  ${ mealAmount === 3 ? "bg-dark text-white" : "bg-grey-f1 " } w-[60px] h-8 flex flex-row items-center justify-center `}
                    >
                      
                          <Image
                          width="24"
                          height="24"
                          className={`relative w-3 h-3 overflow-hidden shrink-0 ${ mealAmount === 3 ? "visible" : "hidden" } `}
                          alt=""
                          src="/usermain/images/outlinecheck2.svg"
                        />
                      
                    </button>

                    <button
                      onClick = {() => setMealAmount(4)}

                      //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                      //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                      className={`  ${ mealAmount === 4 ? "bg-dark text-white" : "bg-grey-f1 " } w-[60px] h-8 flex flex-row items-center justify-center `}
                    >

                          <Image
                          width="24"
                          height="24"
                          className={`relative w-3 h-3 overflow-hidden shrink-0 ${ mealAmount === 4 ? "visible" : "hidden" } `}
                          alt=""
                          src="/usermain/images/outlinecheck2.svg"
                        />
                      
                    </button>

                    <button
                      onClick = {() => setMealAmount(5)}

                      //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                      //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                      className={`  ${ mealAmount === 5 ? "bg-dark text-white" : "bg-grey-f1 " } w-[60px] h-8 flex flex-row items-center justify-center `}
                    >

                          <Image
                          width="24"
                          height="24"
                          className={`relative w-3 h-3 overflow-hidden shrink-0 ${ mealAmount === 5 ? "visible" : "hidden" } `}
                          alt=""
                          src="/usermain/images/outlinecheck2.svg"
                        />
                      
                    </button>




                  </div>

                  <div className="self-stretch flex flex-row items-center justify-center">

                    <div className="flex-1 relative font-extrabold">{"적게"}</div>
                    <div className="flex-1 relative font-extrabold text-dark text-center">
                      {"보통"}
                    </div>
                    <div className="flex-1 relative font-extrabold text-right">
                      {"많이"}
                    </div>

                  </div>

                </div>
              </div>




              <div className="self-stretch flex flex-col items-start justify-center gap-[8px] text-left text-xs text-dark font-menu-off">
                <div className="self-stretch relative">
                  <span>
                    <span className="text-sm font-extrabold font-menu-off">
                      {"식사 소요시간"}
                    </span>
                    <span>{"(15분 기준으로 어땠나요?)"}</span>
                  </span>
                  <span className="text-sm font-extrabold text-red">*</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-[4px] text-grey-9">

                  <div className="flex flex-row items-center justify-center gap-[2px]">


                    {/*}
                    <div className="bg-grey-e w-[60px] h-8" />
                    <div className="bg-grey-e w-[60px] h-8" />
                    <div className="bg-dark w-[60px] h-8 flex flex-row items-center justify-center">
                      <Image
                        width="24"
                        height="24"
                        className="relative w-3 h-3 overflow-hidden shrink-0"
                        alt=""
                        src="/usermain/images/outlinecheck2.svg"
                      />
                    </div>
                    <div className="bg-grey-e w-[60px] h-8" />
                    <div className="bg-grey-e w-[60px] h-8" />
                    */}

                    {/* 식사량 선택버튼 */}
                    <button
                      onClick = {() => setMealSpeed(1)}

                      //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                      //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                      className={`  ${ mealSpeed === 1 ? "bg-dark text-white" : "bg-grey-f1 " } w-[60px] h-8 flex flex-row items-center justify-center `}
                    >
                      <img
                        className={`relative w-3 h-3 overflow-hidden shrink-0 ${ mealSpeed === 1 ? "visible" : "hidden" } `}
                        alt=""
                        src="/usermain/images/outlinecheck2.svg"
                      />
                    </button>
                    <button
                      onClick = {() => setMealSpeed(2)}

                      //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                      //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                      className={`  ${ mealSpeed === 2 ? "bg-dark text-white" : "bg-grey-f1 " } w-[60px] h-8 flex flex-row items-center justify-center `}
                    >
                      <img
                        className={`relative w-3 h-3 overflow-hidden shrink-0 ${ mealSpeed === 2 ? "visible" : "hidden" } `}
                        alt=""
                        src="/usermain/images/outlinecheck2.svg"
                      />
                    </button>

                    <button
                      onClick = {() => setMealSpeed(3)}

                      //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                      //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                      className={`  ${ mealSpeed === 3 ? "bg-dark text-white" : "bg-grey-f1 " } w-[60px] h-8 flex flex-row items-center justify-center `}
                    >
                      <img
                        className={`relative w-3 h-3 overflow-hidden shrink-0 ${ mealSpeed === 3 ? "visible" : "hidden" } `}
                        alt=""
                        src="/usermain/images/outlinecheck2.svg"
                      />
                    </button>

                    <button
                      onClick = {() => setMealSpeed(4)}

                      //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                      //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                      className={`  ${ mealSpeed === 4 ? "bg-dark text-white" : "bg-grey-f1 " } w-[60px] h-8 flex flex-row items-center justify-center `}
                    >
                      <img
                        className={`relative w-3 h-3 overflow-hidden shrink-0 ${ mealSpeed === 4 ? "visible" : "hidden" } `}
                        alt=""
                        src="/usermain/images/outlinecheck2.svg"
                      />
                    </button>

                    <button
                      onClick = {() => setMealSpeed(5)}

                      //className=`{"bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"}`
                      //className="bg-grey-f1 w-[100px] h-11 flex flex-row items-center justify-center"

                      className={`  ${ mealSpeed === 5 ? "bg-dark text-white" : "bg-grey-f1 " } w-[60px] h-8 flex flex-row items-center justify-center `}
                    >
                      <img
                        className={`relative w-3 h-3 overflow-hidden shrink-0 ${ mealSpeed === 5 ? "visible" : "hidden" } `}
                        alt=""
                        src="/usermain/images/outlinecheck2.svg"
                      />
                    </button>

                  </div>

                  <div className="self-stretch flex flex-row items-center justify-center">

                    <div className="flex-1 relative font-extrabold">{"천친히"}</div>
                    <div className="flex-1 relative font-extrabold text-dark text-center">
                      {"보통"}
                    </div>
                    <div className="flex-1 relative font-extrabold text-right">
                      {"빠르게"}
                    </div>

                  </div>
                  
                </div>
              </div>

                
              </div>
            </div>

            { mealTime !== "" && mealFood.length > 0 && mealAmount !== 0 && mealSpeed !== 0 ? (
              <button
                onClick={register}
                className="self-stretch flex flex-row items-center justify-center p-5  text-center text-base text-white font-bold bg-dark"
              >
                <div className="relative">{"다음"}</div>
              </button>

  
            ) : (
              <button
                className="self-stretch flex flex-row items-center justify-center p-5  text-center text-base text-dark font-bold bg-grey-f1"
                
                onClick= {() => {
                  toast.error(
                    '필수 입력값을 모두 입력해주세요.',
                    {
                      //position: 'top-right',
                    }
                  );
                } }
                  
              
              >
                <div className="relative">{"다음"}</div>
              </button>

            )}

          </div>
        </div>
      </div>

      <Footer
        footerAlignSelf="stretch"
        footerBorderTop="1px solid #eee"
        footerBoxSizing="border-box"
      />

    </div>


    <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          ///setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="
        dark:bg-gray-100
        max-w-[860px]
        rounded-md p-5 lg:p-6"

        //containerClassName="
        //dark:bg-gray-100
        //max-w-[460px]
        //rounded-md p-5 lg:p-6"
      >
        <div className="flex items-center justify-between pb-2 lg:pb-3">
          <Title
            as="h3"
            className="text-lg font-semibold text-gray-900 xl:text-xl"
          >
            {modalData.title}
          </Title>
          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              //setActive(() => 'posts');
            }}
            className="h-auto px-1 py-1"
          >
            <PiXBold className="h-5 w-5 text-base" />
          </Button>
        </div>

            {/*
        {modalData && <FollowerModal data={modalData.data} />}
            */}

          <DatabaseTableWidget
            title=""
            variant="minimal"
            data={calorieData}

            pageSize={8}

            sticky
            ///scroll={{ x: 1300, y: 760 }}
            scroll={{ x: 350, }}

            // @ts-ignore
            getColumns={getColumns}
            //enablePagination
            enableSearch={true}
            enablePagination={true}
            
            searchPlaceholder="식품명"

            handleAdd={(items: any[]) => {
              ////alert("handleAdd");

              setOpen(false);

              // add items to the list which are not already in the list mealFood

              const newItems = items.filter((item) => !mealFood.includes(item));

              setMealFood([...mealFood, ...newItems]);

              

              

              //alert(ids);
              //alert(ids[0]);


              //setMealFood(ids[0]);
              //setOpen(false);
              //setActive(() => 'posts');


              //setOpenModal(true);
              //modalData.description = '코인에 추가되었습니다.';


            } }

            
          />



      </Modal>


    </>

  );
};

