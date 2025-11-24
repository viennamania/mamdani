'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import FormContainerFaq from "@/components-figma/form-container-faq";
import Footer from "@/components-figma/footer";


import Link from "next/link";

import { Input } from '@/components/ui/input';


import { useState, useEffect, use } from "react";


import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { da } from "@faker-js/faker";
import { MdSettingsInputComponent } from "react-icons/md";

// tabs for horizontal scroll
import Tabs from '@mui/material/Tabs';

import Tab from '@mui/material/Tab';

import { useRouter } from "next/navigation";
import { start } from "repl";

import { signOut, useSession } from "next-auth/react";


export default function FaqPage() {

  const { data: session, status } = useSession();


  const [data, setData] = useState([] as any);


  const [loading, setLoading] = useState(false);


  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  // handleSearch
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const newFeedList = data.filter((feed: any) => {
        return Object.values(feed).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newFeedList);
    } else {
      setSearchResults(data);
    }
  };


  const [selectedCategory, setSelectedCategory] = useState("");


  const [isTop, setIsTop] = useState('Y');



  useEffect(() => {

    ///console.log("selectedCategory====================", selectedCategory);

    const fetchData = async () => {
      setLoading(true);

      // POST

      const res = await fetch('/api/doingdoit/faq/getAll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          limit: 100,
          page: 1,
          sort: 'createdAt',
          order: 'desc',
          q: '',
          startDate: '',
          endDate: '',
          category: selectedCategory,
          isTop: isTop,
          }),
      });


      const posts  = await res?.json() as any;
  
      //console.log("board data===========================", posts.data);
  
      setData(posts?.data?.boards);

      setSearchResults(posts?.data?.boards);
  
  
  
  
      setLoading(false);
  
    };


    fetchData();
  } ,[ selectedCategory, isTop]);  


  /* fetch category data */

  const [categoryData, setCategoryData] = useState([]);

 

  useEffect(() => {

    const fetchCategoryData = async () => {
        
        const res = await fetch('/api/doingdoit/faq/getAllCategories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            limit: 1000,
            page: 1,
            sort: 'orderNumber',
            order: 'asc',
            q: '',

            }),
        });
        const posts  = await res?.json() as any;
  
        setCategoryData(posts?.data?.categories);
  
      };

    fetchCategoryData();

  }
  ,[]);


  const [isOpenAarray, setIsOpenArray] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);



  const router = useRouter();

  // 0 = > 자유게시판 => /usermain/boards
  // 1 = > 테더정보 => /usermain/boards/health
  // 2 = > 유형별 가이드 => /usermain/boards/guide
  // 3 = > 공지사항 => /usermain/boards/notice
  // 4 = > FAQ => /usermain/boards/faq

  const a11yProps = (index: number) => {

    return {

      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,

      onClick: () => {
        if (index === 0) {
          router.push('/usermain/boards');
        } else if (index === 1) {
          router.push('/usermain/boards/health');
        } else if (index === 2) {
          router.push('/usermain/boards/guide');
        } else if (index === 3) {
          router.push('/usermain/boards/notice');
        } else if (index === 4) {
          router.push('/usermain/boards/faq');
        }
      }

    };

  }

  // this is for the health info page
  const [value, setValue] = useState(4);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  ///console.log("data====================", data);
 

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

    <div className="bg-dark felx sticky top-0 z-50 ">
            <Top1
              logo="/usermain/images/logo-oneclick.png"
              topBackgroundColor="#fff"
              topBorderBottom="1px solid #ddd"
              topBoxSizing="border-box"
              frameDivBorderBottom="unset"
              frameDivBoxSizing="unset"
              divColor="#212121"
              frameDivBorderBottom1="unset"
              frameDivBoxSizing1="unset"
              divColor1="#212121"
              frameDivBorderBottom2="2px solid #212121"
              frameDivBoxSizing2="border-box"
              divColor2="#212121"
              divColor3="#212121"
              aboutColor="#212121"
              frameDivBorder="1px solid #666"
              divColor4="#212121"
              frameDivBorder1="1px solid #666"
              divColor5="#212121"
            />
    </div>


    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start">
      <div className="self-stretch flex flex-col items-center justify-start">



      <div className="self-stretch bg-background flex flex-col items-center justify-start py-5 xl:py-10 px-0 text-center text-base text-grey-9 font-menu-off">
     
      <div className="w-full  xl:w-[1000px] flex flex-col items-center justify-start gap-[5px] xl:gap-[40px]">
        
        <div className="xl:hidden w-full self-stretch flex text-left text-dark text-xl font-extrabold pl-5 pr-5">
          게시판
        </div>


        
        <table className="pl-5 pr-5 w-full xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <tr className="flex-auto xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <Link
                href="/usermain/boards"
                className=" w-full no-underline box-border h-14 flex flex-row items-center justify-center border-b-[2px] border-solid border-orange-light">
                <div className=" relative font-extrabold text-sm xl:text-base">
                    <p className="xl:hidden  leading-tight ">자유<br></br>게시판</p>
                    <p className="hidden xl:block">자유게시판</p>
                </div>
              </Link>
              </tr>

              <tr className="flex-auto xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <Link
                href="/usermain/boards/health"
                className=" w-full no-underline box-border h-14 flex flex-row items-center justify-center  border-b-[2px] border-solid border-orange-light">
                <div className=" relative font-extrabold text-sm xl:text-base">
                
                  <p className="xl:hidden  leading-tight ">테더<br></br>정보</p>
                  <p className="hidden xl:block">테더정보</p>
                  
                </div>
              </Link>
              </tr>

              <tr className="flex-auto xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <Link
                href="/usermain/boards/guide"
                className=" w-full no-underline box-border h-14 flex flex-row items-center justify-center  border-b-[2px] border-solid border-orange-light">
                <div className=" relative font-extrabold text-[14px] xl:text-base">

                  <p className="xl:hidden  leading-tight ">거래<br></br>가이드</p>
                  <p className="hidden xl:block">거래가이드</p>

                </div>
              </Link>
              </tr>

              <tr className="flex-auto xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <Link
                href="/usermain/boards/notice"
              className=" w-full no-underline  box-border h-14 flex flex-row items-center justify-center border-b-[2px] border-solid border-orange-light">
                <div className=" relative font-extrabold text-[14px] xl:text-base ">

                  <p className="xl:hidden  leading-tight ">공지<br></br>사항</p>
                  <p className="hidden xl:block">공지사항</p>

                </div>
              </Link>
              </tr>


              <tr className="flex-auto xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <Link
                href="/usermain/boards/faq"
                className=" w-full no-underline box-border h-14 flex flex-row items-center justify-center text-dark border-b-[2px] border-solid border-dark">
                <div className=" relative font-extrabold text-[14px] xl:text-base">
                  
                  <p>FAQ</p>

                </div>
              </Link>
              </tr>

        </table>
        


        {/* tabs */}
          {/*  horizontally scrollable tabs */}
          {/*
          <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              //className="self-stretch w-full"
              className="w-full"
            >
             
              <Tab
                label={
                  <div className="text-sm xl:text-base">자유게시판</div>
                } {...a11yProps(0)}
              />
              <Tab label={
                <div className="text-sm xl:text-base">테더정보</div>
              } {...a11yProps(1)} />
              <Tab label={
                <div className="text-sm xl:text-base">유형별 가이드</div>
              } {...a11yProps(2)} />
              <Tab label={
                <div className="text-sm xl:text-base">공지사항</div>
              } {...a11yProps(3)} />
              <Tab label={
                <div className="text-sm xl:text-base">FAQ</div>
              } {...a11yProps(4)} />
            </Tabs>
            */}


        <div className="min-h-screen mt-5 w-full self-stretch bg-white flex flex-col items-center justify-start text-left text-xl text-dark">
          
          <div className="self-stretch flex flex-col items-start justify-center p-2 gap-[5px] text-sm text-grey-9 border-b-[1px] border-solid border-grey-e">
            
            <div className="p-5 flex flex-wrap items-center justify-start gap-[8px] ">
            
              {/*
              type TabType = {
                faqTitle?: string;


                propBackgroundColor?: CSSProperties["backgroundColor"];
                propColor?: CSSProperties["color"];
              };
              */}

              {/* list of category */}
              <button
                onClick={() => {
                  
                  //setSelectedCategory("자주하는 질문");
                  setIsTop('Y');
                  setSelectedCategory("");

                }}
                //className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-3 px-8 text-left text-sm text-grey-9 font-menu-off"
              >
                {/*
              <Tab
                faqTitle="자주하는 질문"
                //propBackgroundColor="#f1f1f1"
                //propColor="#999"
                propBackgroundColor={selectedCategory === "자주하는 질문" ? "#fff" : "#f1f1f1"}
                propColor={selectedCategory === "자주하는 질문" ? "#999" : "#212121"}
              />
              */}


                {/* seleted or not  button */}
                {/* when selected bg is dark, text is light */}
              
                <div
                  
                  className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-3 px-5 text-left text-sm text-grey-9 font-menu-off"
                  
                  /*
                  style={{
                    backgroundColor: selectedCategory === "all" ? "#f1f1f1" : "#fff",
                    color: selectedCategory === "all" ? "#212121" : "#999",
                  }}
                  */
                 /* when selected bg is dark, text is light */
                 
                  style={{
                    backgroundColor: isTop === "Y" ? "#000" : "#f1f1f1",
                    color: isTop === "Y" ? "#fff" : "#999",
                  }}
                  

                >
                  자주하는 질문
                </div>


              </button>

              {
                categoryData.map((item: any, index: number) => (
                  <button
                    key = {index}
                    onClick={() => {
                      setIsTop('N');
                      setSelectedCategory(item?.name);
                    }}
                    //className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-3 px-8 text-left text-sm text-grey-9 font-menu-off"
                  >
                  <div className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-3 px-5 text-left text-sm text-grey-9 font-menu-off"
                  style={{
                    backgroundColor: selectedCategory === item?.name ? "#000" : "#f1f1f1",
                    color: selectedCategory === item?.name ? "#fff" : "#999",
                  }}
                  >
                    {item?.name}
                  </div>
                  </button>
                ))
              }


            </div>

          </div>



          { data?.length > 0 && data?.map((item: any, index: number) => (


            
            <div key={index} className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
              
              <div className="self-stretch flex flex-row items-center justify-between gap-2">

                <div className="relative font-extrabold  text-sm xl:text-lg  ">

                  {
                    isTop === 'Y' && ('['+item?.category+'] ')
                  }
                      
                  {item?.title}
                </div>

                {isOpenAarray[index] ? (
                  <img
                    className="relative w-5 h-5 overflow-hidden shrink-0"
                    alt=""
                    src="/usermain/images/chevronup.svg"
                    onClick={() => {
                      const temp = [...isOpenAarray];
                      temp[index] = false;
                      setIsOpenArray(temp);
                    }}
                  />
                ) : (
                  <img
                    className="relative w-5 h-5 overflow-hidden shrink-0"
                    alt=""
                    src="/usermain/images/chevrondown.svg"
                    onClick={() => {
                      const temp = [...isOpenAarray];
                      temp[index] = true;
                      setIsOpenArray(temp);
                    }}
                  />
                )}

                {/*
                <img
                  className="relative w-5 h-5 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/chevronup.svg"
                />
                */}

              </div>


              { isOpenAarray[index] && (
                <div className="self-stretch relative text-sm leading-[24px]">
                  <p className="m-0">
                    {
                      


                      item?.content && <div dangerouslySetInnerHTML={{ __html: 
                      

                        item?.content
                        
                      }} />
                    }
                  </p>
                </div>
              )}
          

            </div>
    
              


          ))}


          


          {/*
          <div className="self-stretch flex flex-row items-center justify-between p-8 border-b-[1px] border-solid border-grey-e">
            <div className="relative font-extrabold">[회원] 질문입니다.1</div>
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/chevrondown.svg"
            />
          </div>

          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>


          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>


          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>


          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>
          */}



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



{/*    <Link 
        href={'/usermain/feeds/statistics'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]    ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/piechart2line.svg"
      />
      <b className="relative">통계</b>
    </Link> */}

    
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
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/message2fill.svg"
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


