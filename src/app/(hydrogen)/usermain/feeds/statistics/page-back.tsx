'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import FormContainer1 from "@/components-figma/form-container1";
import Footer from "@/components-figma/footer";

import Link from "next/link";


import { Input } from '@/components/ui/input';
import { useState, useEffect, use } from "react";


import { useSession } from 'next-auth/react';




export default function StatisticsPage() {



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





  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(false);




  useEffect(() => {

      const fetchData = async () => {
        setLoading(true);


        // 
        //////const res = await fetch(`/api/doingdoit/feed/getStatistics?_email=${session?.user?.email}&_mealDate=2023-12-19`);
        const res = await fetch(`/api/doingdoit/feed/getStatisticsByEmail?_email=${session?.user?.email}`);


        const posts  = await res?.json() as any;

        console.log("stats data===========================", posts.data);

        setData(posts.data);




        setLoading(false);

      };


      fetchData();

    } ,[ session?.user?.email]);



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
          <div className="xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">
            <div className="self-stretch flex flex-row items-center justify-center">
              
              <Link
                href={"/usermain/feeds/statistics"}
               className="flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-dark"
               style={{ textDecoration: 'none' }}
               >
                <div className="flex-1 relative font-extrabold">일간</div>
              </Link>


              <Link
                href={"/usermain/feeds/statistics/weekly"}
               className="flex-1 box-border h-14 flex flex-row items-center justify-start text-grey-9 border-b-[2px] border-solid border-orange-light"
               style={{ textDecoration: 'none' }}
               >
                <div className="flex-1 relative font-extrabold">
                  주간/월간/전체
                </div>
              </Link>

            </div>
            <div className="self-stretch bg-white flex flex-col items-center justify-start p-10 gap-[40px] text-5xl">
              <div className="flex flex-row items-end justify-start gap-[40px]">
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/back.svg"
                />
                <div className="relative font-extrabold">2023.10</div>
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/chevronright3.svg"
                />
              </div>
              <div className="self-stretch flex flex-col items-center justify-start text-sm">
                <div className="self-stretch bg-input-bg flex flex-row items-center justify-center py-3 px-0">
                  <div className="flex-1 relative">일</div>
                  <div className="flex-1 relative">월</div>
                  <div className="flex-1 relative">화</div>
                  <div className="flex-1 relative">수</div>
                  <div className="flex-1 relative">목</div>
                  <div className="flex-1 relative">금</div>
                  <div className="flex-1 relative">토</div>
                </div>
                <FormContainer1
                  carCount="29"
                  carNumber="30"
                  carIndex="31"
                  carNumberText="1"
                  carPosition="2"
                  carOptionNumber="3"
                  carNumberValue="4"
                  rectangleDiv={false}
                  rectangleDiv1={false}
                  rectangleDiv2={false}
                  rectangleDiv3={false}
                  rectangleDiv4={false}
                  rectangleDiv5={false}
                  rectangleDiv6={false}
                  rectangleDiv7={false}
                  rectangleDiv8={false}
                  rectangleDiv9={false}
                  rectangleDiv10={false}
                />
                <FormContainer1
                  carCount="6"
                  carNumber="7"
                  carIndex="8"
                  carNumberText="9"
                  carPosition="10"
                  carOptionNumber="11"
                  carNumberValue="12"
                  rectangleDiv={false}
                  rectangleDiv1={false}
                  rectangleDiv2={false}
                  rectangleDiv3={false}
                  rectangleDiv4
                  rectangleDiv5
                  rectangleDiv6={false}
                  rectangleDiv7={false}
                  rectangleDiv8={false}
                  rectangleDiv9={false}
                  rectangleDiv10={false}
                  rectangleDivOpacity="unset"
                  rectangleDivColor="#ff0000"
                  rectangleDivOpacity1="unset"
                  propOpacity="unset"
                  propBorderRadius="unset"
                  propBorder="unset"
                  propOpacity1="unset"
                  propOpacity2="unset"
                  propOpacity3="unset"
                />
                <FormContainer1
                  carCount="13"
                  carNumber="14"
                  carIndex="15"
                  carNumberText="16"
                  carPosition="17"
                  carOptionNumber="18"
                  carNumberValue="19"
                  rectangleDiv
                  rectangleDiv1
                  rectangleDiv2={false}
                  rectangleDiv3={false}
                  rectangleDiv4={false}
                  rectangleDiv5={false}
                  rectangleDiv6
                  rectangleDiv7
                  rectangleDiv8
                  rectangleDiv9
                  rectangleDiv10
                  rectangleDivOpacity="unset"
                  rectangleDivColor="#ff0000"
                  rectangleDivOpacity1="unset"
                  propOpacity="unset"
                  propBorderRadius="12px"
                  propBorder="1px solid #212121"
                  propOpacity1="unset"
                  propOpacity2="unset"
                  propOpacity3="unset"
                />
                <FormContainer1
                  carCount="20"
                  carNumber="21"
                  carIndex="22"
                  carNumberText="23"
                  carPosition="24"
                  carOptionNumber="25"
                  carNumberValue="26"
                  rectangleDiv={false}
                  rectangleDiv1={false}
                  rectangleDiv2
                  rectangleDiv3
                  rectangleDiv4={false}
                  rectangleDiv5={false}
                  rectangleDiv6={false}
                  rectangleDiv7={false}
                  rectangleDiv8={false}
                  rectangleDiv9={false}
                  rectangleDiv10={false}
                  rectangleDivOpacity="unset"
                  rectangleDivColor="#ff0000"
                  rectangleDivOpacity1="unset"
                  propOpacity="unset"
                  propBorderRadius="unset"
                  propBorder="unset"
                  propOpacity1="unset"
                  propOpacity2="unset"
                  propOpacity3="unset"
                />
                <FormContainer1
                  carCount="27"
                  carNumber="28"
                  carIndex="29"
                  carNumberText="30"
                  carPosition="1"
                  carOptionNumber="2"
                  carNumberValue="3"
                  rectangleDiv={false}
                  rectangleDiv1={false}
                  rectangleDiv2={false}
                  rectangleDiv3={false}
                  rectangleDiv4={false}
                  rectangleDiv5={false}
                  rectangleDiv6={false}
                  rectangleDiv7={false}
                  rectangleDiv8={false}
                  rectangleDiv9={false}
                  rectangleDiv10={false}
                  rectangleDivOpacity="unset"
                  rectangleDivColor="#ff0000"
                  rectangleDivOpacity1="unset"
                  propOpacity="unset"
                  propBorderRadius="unset"
                  propBorder="unset"
                  propOpacity1="0.2"
                  propOpacity2="0.2"
                  propOpacity3="0.2"
                />
              </div>


              <Link
                href="/usermain/feeds/statistics/details"
                className="self-stretch rounded-xl flex flex-row items-start justify-center p-5 gap-[20px] text-left text-base border-[1px] border-solid border-dark"
                style={{ textDecoration: 'none' }}
              >
                
        

                <div className="relative font-extrabold flex items-center w-40 shrink-0">
                  2023.10.17(목) 식사
                </div>
                <div className="flex-1 flex flex-col items-start justify-end gap-[8px] text-center text-xs text-grey-6">
                  <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                    <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
                      <div className="relative">아침</div>
                    </div>
                    <div className="relative text-sm text-dark">
                      된장국, 쌀밥, 오징어볶음
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                    <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
                      <div className="relative">점심</div>
                    </div>
                    <div className="relative text-sm text-dark">
                      된장국, 쌀밥, 오징어볶음
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                    <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
                      <div className="relative">저녁</div>
                    </div>
                    <div className="relative text-sm text-dark">-</div>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-start gap-[12px]">
                    <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-1 px-3">
                      <div className="relative">야식</div>
                    </div>
                    <div className="relative text-sm text-dark">
                      된장국, 쌀밥, 오징어볶음
                    </div>
                  </div>
                </div>

           


              </Link>


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


