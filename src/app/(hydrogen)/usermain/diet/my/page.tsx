'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Bread1 from "@/components-figma/bread1";
import Search from "@/components-figma/search";
import List2 from "@/components-figma/list2";

import Page from "@/components-figma/page";

import Footer from "@/components-figma/footer";

import Link from "next/link";

import Image from "next/image";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useState, useEffect, use } from "react";


import { useSession, signIn, signOut } from 'next-auth/react';


import UserFoodTableWidget from '@/components/doingdoit/user-food-table-widget';

import { getColumns } from '@/app/shared-doingdoit/food/columns-user';




//import { getColumns } from '@/app/shared-doingdoit/feed/calorie-db-columns-user-diet';





export default function DietMyPage() {

  const [searchTerm, setSearchTerm] = useState('');

  /*
  * Handle searching
  */
  function handleSearch(searchValue: string) {
  
    setSearchTerm(searchValue);

    //fetchData();

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

    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-left text-xs text-dark font-menu-off">
      
      <div className="self-stretch flex flex-col items-center justify-start">
   
 
        <div className="self-stretch xl:bg-background flex flex-col items-center justify-start py-5 xl:py-10 px-0">

          <div className=" w-96 xl:w-[1000px] flex flex-col items-center justify-start">
            
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


              <div className="self-stretch flex flex-col items-center justify-end gap-[20px]">

                <div className="self-stretch flex flex-row items-center justify-center text-center text-base text-grey-9">
                  
                  <Link
                    href="/usermain/diet"
                    className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start text-grey-9 border-b-[2px] border-solid border-grey-d"
                    
                  >
                    <div className="flex-1 relative font-extrabold">
                      코인 검색
                    </div>
                  </Link>

                  <Link
                    href="/usermain/diet/my"
                    
                    className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start text-black border-b-[2px] border-solid border-dark"
                  >
                    <div className="flex-1 relative font-extrabold">My 코인</div>
                  </Link>


                </div>


                {/*
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-center gap-[12px]">
                    <div className="relative font-extrabold">최근식단순</div>
                    <div className="relative bg-grey-c w-px h-3" />
                    <div className="relative text-grey-9">가나다순</div>
                  </div>

                

                  <Input
                    size="lg"
                    type="search"
                    //placeholder={searchPlaceholder}
                    placeholder="식품명 검색"
                    value={searchTerm}
                    onClear={() =>
                      handleSearch('')
                    }
                    onChange={(event) => 
                      handleSearch(event.target.value)
                    }
                    clearable
                    prefix={<PiMagnifyingGlassBold className="h-6 w-6" />}
                    //labelClassName='text-base font-medium'

                    //labelClassName='text-3xl font-extrabold text-dark'

                    inputClassName=' text-base font-semibold text-dark rounded-lg border-2 border-grey-3 hover:border-grey-3 focus:border-grey-3 '

                  />
                </div>
                */}
                


                <div className=" self-stretch flex flex-col items-center justify-end gap-[40px] text-grey-6">
                  
                  <UserFoodTableWidget
                    title=""
                    variant="minimal"

                    ////////////data={data}
                    
                    // @ts-ignore
                    getColumns={getColumns}

                    enablePagination={true}
                    //enablePagination={false}
                    
                    searchPlaceholder="식품명 검색"
                    
                    //searchTerm={searchTerm}


                    className="w-full"

                    sticky
                    scroll={{ x: 250, }}
                  />
                  
                </div>

             





                {/*
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-center gap-[12px]">
                    <div className="relative font-extrabold">최근식단순</div>
                    <div className="relative bg-grey-c w-px h-3" />
                    <div className="relative text-grey-9">가나다순</div>
                  </div>

                

                  <Input
                    size="lg"
                    type="search"
                    //placeholder={searchPlaceholder}
                    placeholder="식품명 검색"
                    value={searchTerm}
                    onClear={() =>
                      handleSearch('')
                    }
                    onChange={(event) => 
                      handleSearch(event.target.value)
                    }
                    clearable
                    prefix={<PiMagnifyingGlassBold className="h-6 w-6" />}
                    //labelClassName='text-base font-medium'

                    //labelClassName='text-3xl font-extrabold text-dark'

                    inputClassName=' text-base font-semibold text-dark rounded-lg border-2 border-grey-3 hover:border-grey-3 focus:border-grey-3 '

                  />
                </div>

                
                <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
                  <div className="rounded-lg flex flex-row items-center justify-center py-3 px-5 border-[1px] border-solid border-dark">
                    <div className="relative font-extrabold">선택항목 삭제</div>
                  </div>
                  <div className="self-stretch flex flex-col items-center justify-end text-center text-sm">
                    <div className="self-stretch bg-grey-f1 flex flex-row items-center justify-center py-3 px-5">
                      <div className="flex-1 flex flex-row items-center justify-center gap-[8px] text-left">
                        <img
                          className="relative w-5 h-5 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/check-box-outline-blank.svg"
                        />
                        <div className="flex-1 relative">식품명</div>
                      </div>
                      <div className="relative flex items-center justify-center w-20 shrink-0">
                        kcal
                      </div>
                      <div className="relative flex items-center justify-center w-20 shrink-0">
                        탄수화물(g)
                      </div>
                      <div className="relative flex items-center justify-center w-20 shrink-0">
                        단백질(g)
                      </div>
                      <div className="relative flex items-center justify-center w-20 shrink-0">
                        지방(g)
                      </div>
                      <div className="relative flex items-center justify-center w-[100px] shrink-0">
                        포화지방산(g)
                      </div>
                      <div className="relative flex items-center justify-center w-20 shrink-0">
                        당류(g)
                      </div>
                      <div className="relative flex items-center justify-center w-20 shrink-0">
                        나트륨(mg)
                      </div>
                      <div className="relative flex items-center justify-center w-[120px] shrink-0">
                        콜레스테롤(mg)
                      </div>
                    </div>
                    <List2 checkBoxIcon />
                    <List2 checkBoxIcon />
                    <List2 checkBoxIcon />
                    <List2 checkBoxIcon />
                    <List2 checkBoxIcon />
                  </div>
                  <div className="self-stretch flex flex-col items-center justify-center">
                    <Page />
                  </div>
                </div>
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


