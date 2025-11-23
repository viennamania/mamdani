'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Bread1 from "@/components-figma/bread1";
import SearchBig from "@/components-figma/search-big";
import BtnBigOn from "@/components-figma/btn-big-on";
import Footer from "@/components-figma/footer";

import Link from "next/link";

import Image from "next/image";

import { Input } from '@/components/ui/input';

import { PiMagnifyingGlassBold } from 'react-icons/pi';

import { useState, useEffect, use } from "react";

//import { Button } from "rizzui";

///import { Button } from "@mui/material";

import { Button } from '@/components/ui/button';
import { MotionConfig } from "framer-motion";

///import DatabaseTableWidget from '@/components-figma/doingdoit/database-table-widget-diet';

///////import DatabaseTableWidget from '@/components-figma/doingdoit/database-table-widget-search';

import DatabaseTableSearch from '@/components-figma/doingdoit/database-table-search';



///import { data as calorieData } from '@/data/doingdoit/feed/calorie-db-data';


////import { data as calorieData } from '@/data/doingdoit/feed/calorie-db-data-new';



///import { getColumns } from '@/app/shared-doingdoit/feed/calorie-db-columns-user-diet';

import { getColumns } from '@/app/shared-doingdoit/food/columns-database';



import { useSession, signIn, signOut } from 'next-auth/react';





export default function DietPage() {

  const { data: session, status } = useSession();


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);






  const [searchTerm, setSearchTerm] = useState('');

  /*
  * Handle searching
  */
  function handleSearch(searchValue: string) {
  
    setSearchTerm(searchValue);

    //fetchData();

  }


  const [mealFood, setMealFood] = useState<any[]>([]);


  const [userId, setUserId] = useState(session?.user?.id);
  const [userEmail, setUserEmail] = useState(session?.user?.email);
  const [userName, setUserName] = useState(session?.user?.name);
  const [userNickname, setUserNickname] = useState('');
  const [userAvatar, setUserAvatar] = useState(session?.user?.image);



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

        setUserId(data.data?.id);

        setUserNickname(data.data?.nickname);

      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email]);

  


  /* cryptoss.beauty 이메일이면 로그아웃 시킨다. */
  if (
    session?.user?.email &&
    session?.user?.email.includes ('@cryptoss.beauty')
  ) {
    signOut(
      {
        callbackUrl: '/usermain/user/login',
      }
    );

    return <></>
  }
  

  return (

    <>

    <div className="bg-dark sticky top-0 z-50 ">

    <Top1
          logo="/usermain/images/logo-oneclick.png"
          topBackgroundColor="#fff"
          topBorderBottom="1px solid #ddd"
          topBoxSizing="border-box"
          //////////////frameDivBorderBottom="2px solid #212121"
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


    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-center text-base text-dark font-menu-off">

      <div className="self-stretch flex flex-col items-center justify-start">
   
        <div className="self-stretch xl:bg-background flex flex-col items-center justify-start py-5 xl:py-10 px-0">


          <div className=" w-96  xl:w-[1000px] flex flex-col items-center justify-start">

            <div className="self-stretch bg-white flex flex-col items-center justify-end p-5 xl:p-10 gap-[20px] xl:gap-[40px]">


         
              <div
                className="self-stretch flex flex-row items-center justify-between pt-0 px-0 pb-5 text-left text-5xl text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
              >
                <Link
                  href="/"
                  className=" no-underline flex"
                >

                  <div className="relative tracking-[-0.02em] font-extrabold">
                    {`당신의 코인을 확인하세요!`}
                  </div>
                </Link>

                <Link
                  href="/"
                  className=" no-underline flex"
                >
                <Image
                  width="24"
                  height="24"
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/x2.svg"
                />
                </Link>
                
              </div>


              
              <div className="self-stretch flex flex-row items-center justify-center">

                <Link
                  href="/usermain/diet"
                  className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-dark"
                >
                  <div className="flex-1 relative font-extrabold">
                    코인 검색
                  </div>
                </Link>

                <Link
                  href="/usermain/diet/my"
                  className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start text-grey-9 border-b-[2px] border-solid border-grey-d"
                >
                  <div className="flex-1 relative font-extrabold">My 코인</div>
                </Link>

              </div>


              <div className=" self-stretch flex flex-col items-center justify-end gap-[40px] text-grey-6">

              

                <DatabaseTableSearch
                  title=""
                  variant="minimal"

                  //data={calorieData}

                  pageSize={10}

                  sticky
                  ///scroll={{ x: 1300, y: 760 }}
                  scroll={{ x: 250, }}

                  ///scroll={{ x: 800 }}

                  //scroll={{ x: 0, }}

                  // @ts-ignore
                  getColumns={getColumns}
                  //enablePagination
                  enableSearch={true}

                  enablePagination={true}
                  
                  searchPlaceholder="코인명을 입력하세요"

                  handleAdd={(items: any[]) => {
                    ////alert("handleAdd");

                    //setOpen(false);

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

                  className="w-full h-full"


   
        

                  
                />
                  
                  



                
                {/*
                <SearchBig dishNameInput="코인명을 입력하세요." />
                */}
                {/*
                <Input
                  size="xl"
                  type="search"
                  //placeholder={searchPlaceholder}
                  placeholder="코인명을 입력하세요."
                  value={searchTerm}
                  onClear={() =>
                    handleSearch('')
                  }
                  onChange={(event) => 
                    handleSearch(event.target.value)
                  }
                  clearable
                  prefix={<PiMagnifyingGlassBold className="h-8 w-8" />}
                  //labelClassName='text-base font-medium'

                  //labelClassName='text-3xl font-extrabold text-dark'

                  inputClassName='text-xl font-bold text-dark rounded-full border-2 border-grey-6'

                />
                */}

                

                {/*

                <div className="flex flex-col items-center justify-end gap-[8px]">
                  <Image
                    width={253.5}
                    height={200}
                    className="relative w-[253.5px] h-[200px] overflow-hidden shrink-0"
                    alt=""
                    src="/usermain/images/frame2.svg"
                  />
                  <div className="self-stretch relative">
                    검색결과가 없네요.
                  </div>
                  <div className="relative text-xl font-extrabold text-dark">
                    직접 음식을 등록하시겠습니까?
                  </div>
                </div>
                <Link
                  href="/usermain/diet/my-add"
                  className=" no-underline self-stretch flex flex-row items-center justify-center"
                >
               
                  
                  <Button
                    variant="solid"
                    color="primary"
                    size="xl"
                    className=" rounded-full border-2 border-grey-6 bg-dark text-white font-bold text-base px-20 py-5"  
                    //startIcon={<AddIcon />}
                  >
                    My코인 추가에 추가
                  </Button>

                </Link>
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

    </>
  );
};


