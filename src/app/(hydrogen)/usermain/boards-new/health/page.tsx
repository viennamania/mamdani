'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Search from "@/components-figma/search";
import FormContainerGuide from "@/components-figma/form-container-guide";
import Footer from "@/components-figma/footer";

import Link from "next/link";





import { Input } from '@/components/ui/input';


import { useState, useEffect, use } from "react";


import { PiMagnifyingGlassBold } from 'react-icons/pi';

import ListInfo from "@/components-figma/list-info";


import { routes } from "@/config/routes";

import { useSearchParams } from 'next/navigation';


import Image from 'next/image'


// tabs for horizontal scroll
import Tabs from '@mui/material/Tabs';

import Tab from '@mui/material/Tab';

import { useRouter } from "next/navigation";


export default function HealthInfoPage() {



  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(false);




  const searchParams = useSearchParams()
 
  const search = searchParams.get('search') || ''

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);



  // sort by date or view count
  const [sortBy, setSortBy] = useState("createdAt");

  

  // search update
  useEffect(() => {

    if (search !== "") {
      setSearchTerm(search);

    } else {
      setSearchTerm("");
    }


  }, [search]);




  useEffect(() => {


    const fetchData = async () => {
      setLoading(true);
  
   
   

      const res = await fetch(`/api/doingdoit/healthinfo/getAll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          limit: 30,
          page: 1,
          sort: sortBy,
          q: searchTerm,
          startDate: "",
          endDate: "",
        })
      });



      const posts  = await res?.json() as any;
  
      ///////console.log("board data===========================", posts.data);
  
      setData(posts?.data?.boards);

      setSearchResults(posts?.data?.boards);
  
  
  
  
      setLoading(false);
  
    };


    fetchData();
  }
  ,[searchTerm, sortBy]);




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


  /*
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  */

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
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


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

    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-center text-base text-grey-9 font-menu-off">
      <div className="self-stretch flex flex-col items-center justify-start">
 
        <div className="self-stretch bg-background flex flex-col items-center justify-start py-5 xl:py-10">

          <div className="w-full xl:w-[1000px] flex flex-col items-center justify-start gap-[5px] xl:gap-[40px]">
            
            <div className="xl:hidden w-full self-stretch flex text-left text-dark text-xl font-extrabold pl-5 pr-5">
              게시판
            </div>
            
            {/*
            <div className="self-stretch flex flex-row items-center justify-center pl-5 pr-5 xl:pl-0 xl:pr-0">
              
              <Link
                href="/usermain/boards"
                className="no-underline   flex-1 box-border h-14 flex flex-row items-center justify-start  border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold text-xs">자유게시판</div>
              </Link>

              <Link
                href="/usermain/boards/health"
                className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start text-dark border-b-[2px] border-solid border-dark">
                <div className="flex-1 relative font-extrabold text-xs">테더정보</div>
              </Link>

              <Link
                href="/usermain/boards/guide"
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start  border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold text-xs">
                  유형별 가이드
                </div>
              </Link>

              <Link
                href="/usermain/boards/notice"
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold text-xs">공지사항</div>
              </Link>


              <Link
                href="/usermain/boards/faq"
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold text-xs">FAQ</div>
              </Link>

            </div>
            */}




            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              //className="w-full"
              className="w-full"
            >
              {/* change label size */}
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

        







            <div className=" self-stretch flex flex-col items-center justify-center gap-[0px] xl:gap-[20px] text-left text-sm text-dark">
              
              
              <div className=" self-stretch flex flex-col-reverse xl:flex-row gap-2 items-center justify-between  p-5 ">
                
                <div className="w-full flex flex-row items-center justify-start gap-[12px]">
                

                  { sortBy === "viewCount" ? (
                    <>
                      <button
                        className={`relative text-grey-9 `}
                        onClick={() => {
                          setSortBy("createdAt");

                          

                          //search(searchTerm, "createdAt");
                        } }
                      >
                        최근순
                      </button>
                      <div className="relative bg-grey-c w-px h-3" />
                      <div
                        className={`relative font-extrabold `}
                      >
                        인기순
                      </div>
                    </>
                    

                  ) : (
                    
                    <>
                      <div
                        className={`relative font-extrabold `}
                      >
                        최근순
                      </div>
                      <div className="relative bg-grey-c w-px h-3" />
                      <button
                        className={`relative text-grey-9 `}
                        onClick={() => {
                          setSortBy("viewCount");
                          
                          //search(searchTerm, "viewCount");
                        } }
                      >
                        인기순
                      </button>
                    </>

                  )}

                </div>

                {/*
                <Search prop="제목, 태그 입력" searchWidth="400px" />
                */}
                <Input
                  type="search"
                  //placeholder={searchPlaceholder}
                  placeholder="제목, 태그 입력"
                  value={searchTerm}
                
                  onClear={() =>
                    handleSearch('')
                  }
                  onChange={(event) => 
                    handleSearch(event.target.value)
                  }
                  clearable
                  prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
                  labelClassName='text-base font-medium'

                  className=" w-full xl:w-[400px] rounded-[8px] border-[1px] border-solid border-grey-e outline-none bg-white"
                />

              </div>




              <div className="pl-5 pr-5 self-stretch flex flex-col items-center justify-start gap-[10px] xl:gap-[20px]">

                  { searchTerm.length === 0 && loading ? (

                    <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
                      
                      <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">
                  
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />
                  
                      </div>
                    </div>
                  
                  ) : (

                    <div className=" self-stretch grid grid-cols-1 xl:grid-cols-2 items-start justify-center gap-[20px] text-left text-dark">
                      
                      {searchResults.map((item: any) => (
                        <Link
                          key = {item.id}
                          
                          href={
                            routes.usermain.boardHealthDetails(item.id)
                          }

                          className="no-underline   w-full "
                        >
   
                          {/*
                          <ListInfo  />
                          */}


                          <div className="flex-1 bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] flex flex-col items-center justify-end text-left text-xs text-grey-6 font-menu-off border-[1px] border-solid border-grey-e">
                              
                              <Image
                                //className="self-stretch relative max-w-full overflow-hidden h-[490px] shrink-0 object-cover"
                                alt="healthinfo image"
                                
                                src={
                                  //item?.images && item?.images?.[0] && item?.images?.[0] !== undefined ? item?.images?.[0] : "logo.svg"

                                  item?.images && item?.images?.[0] ? item?.images?.[0] : "logo.svg"
                                }

                                width={490}
                                height={490}
                              />
                 

                              <div className="self-stretch flex flex-col items-center justify-end p-6 gap-[20px]">
                                <div className="self-stretch flex flex-col items-center justify-end gap-[4px]">
                                  {/*
                                  <div className="self-stretch relative">
                                    {item?.title}
                                  </div>
                                  */}
                                  <div className="self-stretch relative text-xl font-extrabold text-dark break-words leading-normal">
                                    {item?.title}
                                  </div>
                                </div>

                                <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">

                                  {item?.tags?.map((tag: any) => (
                                    <div
                                      key={tag}
                                      className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                                    >
                                        {tag}
                                    </div>
                                  ))}

                                </div>

                              </div>
                            </div>

                        </Link>
                      ))}

                    </div>
                  )}
                
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

