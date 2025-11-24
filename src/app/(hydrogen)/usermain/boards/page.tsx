'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Search from "@/components-figma/search";

import Footer from "@/components-figma/footer";

import Link from "next/link";


import { Input } from '@/components/ui/input';


import { useState, useEffect, use, useMemo } from "react";


import { PiMagnifyingGlassBold } from 'react-icons/pi';


import Image from "next/image";
import { motion } from "framer-motion";


import ListPost from "@/components-figma/list-post";


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



//import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@/components/ui/tabs';



///import { BoardPage } from '@/app/(hydrogen)/usermain/boards/free/page';


import FreePage   from '@/components-figma/boards/free/page';

import HealthinfoPage   from '@/components-figma/boards/healthinfo/page';
import GuidePage   from '@/components-figma/boards/guide/page';
import Notice  from '@/components-figma/boards/notice/page';

import { useSearchParams, useRouter } from 'next/navigation'
import { u } from "uploadthing/dist/types-e8f81bbc";
import { set } from "lodash";
import { Scrollbar } from "swiper/modules";

// tabs for horizontal scroll
import Tabs from '@mui/material/Tabs';

import Tab from '@mui/material/Tab';


import { TabPanel } from "rizzui";

import { Button } from '@/components/ui/button';

import useDebounce from '@/utils/useDebounce';

import { useSession, signIn, signOut } from 'next-auth/react';
import { de } from "@faker-js/faker";


/*
const tabs = [
  { id: 'posts', count: postData.length },
  { id: 'followers', count: followersData.length },
  { id: 'following', count: followingData.length },
];
*/




interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/*
function CustomTabPanel(props: TabPanelProps) {
  
  const { children, value, index, ...other } = props;

  return (
    
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >



      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}

    </div>
  );
}
*/



function CustomTabPanel(props: TabPanelProps) {
  
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// 0 = > 자유게시판 => FeedPage
// 1 => 테더정보 => HealthinfoPage

const a11yProps = (index: number) => {

  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };

};




export default function BoardPage() {


  const { data: session, status } = useSession();


  const [userData, setUserData] = useState({}) as any;

  useEffect(() => {

    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }



      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      //////console.log(json);

      const data = json as any;

      
      console.log('BoardPage data====>', data);



      
      if (data?.data) {
        setUserData(data?.data);
      } else {

        // 로그인 후 최초 접속 시, DB에 유저 정보가 없을 경우
        //alert(json.message);

        // goto user profile edit page
        //window.location.href = `/usermain/user/profile-edit`;

      }

   
    };

    fetchData();

  } , [session?.user?.email]);


  // get params from url
  // search by title, tag, nickname


  const searchParams = useSearchParams();
 
  const search = searchParams.get('search') || ''



  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(false);

  const [totalCount, setTotalCount] = useState(0);


  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500)

 

  const [searchResults, setSearchResults] = useState(
    [] as any
  );

  // sort by date or view count
  const [sortBy, setSortBy] = useState("createdAt");

  
  const [countPerPage, setCountPerPage] = useState(20);




  // search update
  useEffect(() => {

    if (search !== "") {
      setSearchTerm(search);

    } else {
      setSearchTerm("");
    }


  }, [search]);
  

  const [currentPage, setCurrentPage] = useState(1);



  console.log("sortBy=", sortBy);
  
  useEffect(() => {


    const fetchData = async () => {
      setLoading(true);
  
      //const res = await fetch(`/api/doingdoit/board/getAll?_limit=${countPerPage}&_page=${currentPage}&_sort=${sortBy}&_q=${debouncedSearch}`);
  
      const res = await fetch('/api/doingdoit/board/getAll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          userId: userData?.id,
          limit: countPerPage,
          page: currentPage,

          //sort: sortConfig.key,
          //order: sortConfig.direction,

          sort: sortBy,
          order: 'DESC',


          q: debouncedSearch,

          startDate: '2021-01-01',
          endDate: '2050-12-31',

          }),
      });

      
      const posts  = await res?.json() as any;


      
  
      ///console.log("board data.boards ===========================", posts?.data?.boards);
  
      // if currentPage is 1, then set data to posts.data
      // if currentPage is 2, then append data to posts.data

      ///setSearchResults(currentPage === 1 ? posts.data?.boards : [...searchResults, ...posts.data?.boards]);

      /*
      setSearchResults((prev: any) => {
        // check if the new data is already in the searchResults
        const newResults = posts.data?.boards.filter((post: any) => {
          return !prev.some((prevPost: any) => prevPost.id === post.id);
        });
        // return the new data and previous data
        return [...prev, ...newResults];
        
      });
      */

      currentPage === 1 ? setSearchResults(posts.data?.boards) : setSearchResults([...searchResults, ...posts.data?.boards]);



      setTotalCount(posts.data?.totalCount);

      /*
      const res1 = await fetch(`/api/doingdoit/board/getAllCount?_q=${searchTerm}`);

      const posts1  = await res1?.json() as any;
  
      setTotalCount(posts1.data);
      */

  
  
      setLoading(false);
  
    };


    fetchData();
  }
  ,[debouncedSearch, currentPage, countPerPage, sortBy, ]);
  



  /*
  const search = async (searchTerm: string, sortBy: string) => {

    ////console.log("search searchTerm=", searchTerm);

    /////////////////////setLoading(true);

    const res = await fetch(`/api/doingdoit/board/getAll?_limit=30&_page=1&_sort=${sortBy}&_q=${searchTerm}`);

    const posts  = await res?.json() as any;

    ////console.log("FrameComponentFeeds data=", posts.data);

    ////setData(posts.data);
    setSearchResults(posts.data);


    
    // getAllPublicCount
    const res1 = await fetch(`/api/doingdoit/board/getAllCount?_q=${searchTerm}`);

    const posts1  = await res1?.json() as any;

    setTotalCount(posts1.data);

    setLoading(false);

    
  }
  */




  // handleSearch
  const handleSearch = (searchTerm: string) => {


    console.log("handleSearch searchTerm=====", searchTerm);

    setSearchTerm(searchTerm);

    /////search(searchTerm, sortBy);

    if (searchTerm !== "") {

    } else {

      setSearchResults(data);

    }


    /*
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const newFeedList = data.filter((feed: any) => {
        return Object.values(feed).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newFeedList);
    } else {
      setSearchResults(data);
    }
    */
  };





  const router = useRouter();






  // this is for the health info page
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };





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





    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-center text-base text-grey-9 font-menu-off">
      
      <div className="self-stretch flex flex-col items-center justify-start">
        
        <div className="self-stretch bg-background flex flex-col items-center justify-start py-5 xl:py-10 ">

          <div className=" w-full xl:w-[1000px] flex flex-col items-center justify-start gap-[5px] xl:gap-[40px] ">
            
            <div className="pl-5 pr-5 xl:hidden w-full self-stretch flex text-left text-dark text-xl font-extrabold ">
              게시판
            </div>

            <table className="pl-5 pr-5 w-full xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <tr className=" flex-auto xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <Link
                href="/usermain/boards"
                className=" p-0 w-full no-underline box-border h-14 flex flex-row items-center justify-center text-dark  border-b-[2px] border-solid border-dark">
                <div className=" relative font-extrabold text-sm xl:text-base">
                    <p className="xl:hidden  leading-tight ">자유<br></br>게시판</p>
                    <p className="hidden xl:block">자유게시판</p>
                </div>
              </Link>
              </tr>

              <tr className="flex-auto xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <Link
                href="/usermain/boards/health"
                className="p-0 w-full no-underline box-border h-14 flex flex-row items-center justify-center border-b-[2px] border-solid border-orange-light">
                <div className=" relative font-extrabold text-sm xl:text-base">
                
                  <p className="xl:hidden  leading-tight ">테더<br></br>정보</p>
                  <p className="hidden xl:block">테더정보</p>
                  
                </div>
              </Link>
              </tr>

              <tr className="flex-auto xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <Link
                href="/usermain/boards/guide"
                className="p-0 w-full no-underline box-border h-14 flex flex-row items-center justify-center  border-b-[2px] border-solid border-orange-light">
                <div className=" relative font-extrabold text-[14px] xl:text-base">

                  <p className="xl:hidden  leading-tight ">거래<br></br>가이드</p>
                  <p className="hidden xl:block">거래가이드</p>

                </div>
              </Link>
              </tr>

              <tr className="flex-auto xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <Link
                href="/usermain/boards/notice"
                className="p-0 w-full no-underline  box-border h-14 flex flex-row items-center justify-center border-b-[2px] border-solid border-orange-light">
                <div className=" relative font-extrabold text-[14px] xl:text-base ">

                  <p className="xl:hidden  leading-tight ">공지<br></br>사항</p>
                  <p className="hidden xl:block">공지사항</p>

                </div>
              </Link>
              </tr>


              <tr className=" flex-auto xl:w-[1000px] self-stretch flex flex-row items-center justify-center">
              <Link
                href="/usermain/boards/faq"
                className="p-0 w-full no-underline box-border h-14 flex flex-row items-center justify-center border-b-[2px] border-solid border-orange-light">
                <div className=" relative font-extrabold text-[14px] xl:text-base">
                  
                  <p>FAQ</p>

                </div>
              </Link>
              </tr>

            </table>
            

            {/* tabs */}
            {/*  horizontally scrollable tabs */}

            {/*
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
     
                  <Tab label={<div className="text-sm xl:text-base">자유게시판</div>} {...a11yProps(0)} />
                  <Tab label={<div className="text-sm xl:text-base">테더정보</div>} {...a11yProps(1)} />
                  <Tab label={<div className="text-sm xl:text-base">유형별 가이드</div>} {...a11yProps(2)} />
                  <Tab label={<div className="text-sm xl:text-base">공지사항</div>} {...a11yProps(3)} />
                  <Tab label={<div className="text-sm xl:text-base">FAQ</div>} {...a11yProps(4)}/>

                </Tabs>
              </Box>

     

              <CustomTabPanel value={value} index={0}>
                <FreePage />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <HealthinfoPage />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <GuidePage />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <Notice />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                Item Five
              </CustomTabPanel>
            </Box>
            */}
          



          <div className=" w-full self-stretch flex flex-col items-center justify-start gap-[10px] xl:gap-[20px] text-left text-sm text-dark ">

                
            <div className=" self-stretch flex flex-col-reverse xl:flex-row gap-2 items-start justify-between p-5 ">
              
              
              
              <div className=" flex flex-row items-center justify-start gap-[10px] xl:gap-[20px]">
                
                  
                <div className="flex flex-row items-center justify-center gap-[12px]">
                    

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

                  <Link
                    href="/usermain/boards/my"
                    className="no-underline">
                  
                    <div className="flex flex-row items-center justify-center gap-[4px]">
                      <img
                        className="relative w-6 h-6 overflow-hidden shrink-0"
                        alt=""
                        src="/usermain/images/outlinecheck.svg"
                      />
                      <button className="relative">내글보기</button>
                    </div>
                  </Link>


              </div>



              {/*
              <Search prop="제목, 태그, 닉네임 입력" searchWidth="400px" />
              */}
              <Input
                type="search"
                //placeholder={searchPlaceholder}
                placeholder="제목, 태그, 닉네임 입력"
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

                className="w-full xl:w-[400px] rounded-[8px] border-[1px] border-solid border-grey-e outline-none bg-white"
              />



            </div>




  {/* when loading, show empty page */}
  {/* empty page has full height */}
  {/* loading page has empty page */}

{ false ? (

  <div className="self-stretch flex flex-col items-center justify-center gap-[10px] text-left text-sm text-dark   ">
    <div className="self-stretch flex flex-col items-center justify-center gap-[10px] text-center text-sm text-dark">
      <div className="relative w-full h-40">
        <img
          className="relative w-20 h-20"
          alt=""
          src="/usermain/images/loading.svg"
        />
      </div>
      <div className="relative">로딩 중...</div>
    </div>
  </div>


) : (

  <>


    {
      loading === false && searchResults.length === 0 ? (
        <div className="w-full h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
            <div className="text-base">검색 결과가 없습니다.</div>
        </div>
        
      ) : (

  
        <div className="min-h-screen pl-5 pr-5 self-stretch flex flex-col items-start justify-start gap-[10px] xl:gap-[20px] text-left text-sm text-dark  ">
      
        {/*
        <div className="min-h-screen pl-5 pr-5 self-stretch grid grid-cols-1 items-start justify-start gap-[10px] xl:gap-[20px] text-left text-sm text-dark  ">
        */}

          {/* totalCount */}
          {/*
          <div className="w-full text-left relative   text-sm xl:text-base   font-extrabold">게시글 {totalCount}</div>
          */}

          {searchResults?.map((item: any) => (
            


            <ListPost
              key={item.id}
              id={item.id}
              createdAt={item.createdAt}
              userName={item?.userName}
              userNickname={item?.userNickname}
              userAvatar={item?.userAvatar}
              title={

                item?.title
                
              }
              ///content={shortConntent}
              // if content length is over 200, show only 200 characters

              content={
                item?.content
              
              }


              images={item.images}
              tags={item.tags}


              scrapCount={item.scrapCount}
              likeCount={item.likeCount}
              
              commentCount={item.commentCount + item.replyCount}
              //commentCount={item.commentCount }
              //commentCount={item.replyCount }

              viewCount={item.viewCount}


              imageDimensions="/usermain/images/rectangle-62@2x.png"
              frameDiv
              showRectangleIcon
              propHeight="unset"
            />

            

          ))}


          {/* more button */}


          { /*  totalCount > (countPerPage*(currentPage+1)) && searchResults.length < totalCount ? (

            <div className="self-stretch flex flex-row items-center justify-center gap-[10px] text-center text-sm text-dark">
              <button
                className="relative w-full h-12 rounded-[8px] border-[1px] border-solid border-grey-e bg-white"
                onClick={
                  () => {
                    setCurrentPage(currentPage + 1);
                  }
                }
              >
                더보기
              </button>
            </div>
            
          ) : (
            <></>
          )
          */}




          {totalCount > 0 && searchResults.length < totalCount && (

          <div className="self-stretch flex flex-row items-center justify-center gap-[10px] text-center text-sm text-dark">
              <Button
                ///isLoading={isLoading}
                
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }

                className="relative w-full h-12 rounded-[8px] border-[1px] border-solid border-grey-e bg-white text-dark "
              >
                더보기
              </Button>

          </div>

          )}



        </div>


      )}


  </>

)}


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




      {/* float buttom right absolute position stikcy */}
      <div className=" z-50 flex flex-col items-center justify-end gap-[40px] text-grey-6 fixed bottom-0  left-0 right-0 mb-[80px] ml-[250px]  xl:mb-[50px] xl:ml-[900px] ">
 
        {/* auto replay bouncing animation using motion.div */}

        <motion.div
          className="box"
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href="/usermain/boards/create"
          >
          <img
            className=" w-16 h-16"
            alt=""
            src="/usermain/images/write.svg"
          />
          </Link>
        </motion.div>

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
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark ">
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

