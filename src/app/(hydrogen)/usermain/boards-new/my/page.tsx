'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Search from "@/components-figma/search";

import Footer from "@/components-figma/footer";

import Link from "next/link";


import { Input } from '@/components/ui/input';


import { useState, useEffect, use } from "react";




import Image from "next/image";
import { motion } from "framer-motion";


import ListPost from "@/components-figma/list-post";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



///import { BoardPage } from '@/app/(hydrogen)/usermain/boards/free/page';


import FreePage   from '@/components-figma/boards/free/page';
import HealthinfoPage   from '@/components-figma/boards/healthinfo/page';
import GuidePage   from '@/components-figma/boards/guide/page';


import { PiMagnifyingGlassBold } from 'react-icons/pi';

import { useSession } from "next-auth/react";
import { ro } from "@faker-js/faker";


import { useRouter} from "next/navigation";



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
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}





export default function MyBoardPage() {


  const { data: session, status } = useSession();

  const [userData, setUserData] = useState({
    id: '',
    avatar: '',
    nickname: '',
    gender: '',
    birthDate: '',

  });


  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        
        const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
    
        const posts  = await res?.json() as any;
    
        setUserData(posts?.data);

        ////console.log("useTable-notification userData:", posts?.data);
    
      };
  
      fetchData();
    }
  } , [status, session?.user?.email]);


  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(false);

  const [totalCount, setTotalCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);


  // sort by date or view count
  const [sortBy, setSortBy] = useState("createdAt");

  
  const router = useRouter();
 
  
  useEffect(() => {

    const fetchData = async () => {

  
      setLoading(true);
  
      const res = await fetch(`/api/doingdoit/board/getAllByUserId?_userId=${userData?.id}&_limit=30&_page=1&_sort=${sortBy}&_order=desc&_q=${searchTerm}`);
  
      const posts  = await res?.json() as any;

      setSearchResults(posts?.data?.boards);
      setTotalCount(posts?.data?.totalCount);
  

  
      setLoading(false);
  
    };

    fetchData();
  }
  ,[ userData?.id  , sortBy, searchTerm  ]);
  








  const search = async (searchTerm: string, sortBy: string) => {

    console.log("search searchTerm=", searchTerm);

    /////setLoading(true);

    const res = await fetch(`/api/doingdoit/board/getAllByUserId?_userId=${userData?.id}&_limit=30&_page=1&_sort=${sortBy}&_order=desc&_q=${searchTerm}`);

    const posts  = await res?.json() as any;

    ///console.log(" data=", posts.data);

    ////setData(posts.data);
    setSearchResults(posts?.data?.boards);
    setTotalCount(posts?.data?.totalCount);


    setLoading(false);

    
  }





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


  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  if (status === "loading") return <div>loading...</div>;

  if (!session?.user?.email) {

    router.push("/usermain/user/login");

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
      
      

      {/* 로그인을 하지 않았을 경우 로그인을 유도한다*/}

          


      
      
      
      <div className="self-stretch flex flex-col items-center justify-start">


        


        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">




      




          <div className="  xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">


            {/*
            <Box sx={{ width: '100%' }}>
              <Box sx={
                {
                  borderBottom: 1,
                  ///borderColor: 'divider',
                  //borderColor: ' border-orange-light ',

                  borderColor: '#FFA500',

                }
              }>
                
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="자유게시판" {...a11yProps(0)} />
                  <Tab label="테더정보" {...a11yProps(1)} />
                  <Tab label="유형별 가이드" {...a11yProps(2)} />
                  <Tab label="공지사항" {...a11yProps(3)} />
                  <Tab label="FAQ" {...a11yProps(4)} />
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
                Item Four
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                Item Five
              </CustomTabPanel>
            </Box>
            */}


            <div className="self-stretch flex flex-row items-center justify-center">
              
              <Link
                href="/usermain/boards"
                className="no-underline   flex-1 box-border h-14 flex flex-row items-center justify-start text-dark border-b-[2px] border-solid border-dark">
                <div className="flex-1 relative font-extrabold">자유게시판</div>
              </Link>

              <Link
                href="/usermain/boards/health"
                className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold">테더정보</div>
              </Link>

              <Link
                href="/usermain/boards/guide"
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start  border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold">
                  유형별 가이드
                </div>
              </Link>

              <Link
                href="/usermain/boards/notice"
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold">공지사항</div>
              </Link>


              <Link
                href="/usermain/boards/faq"
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold">FAQ</div>
              </Link>

            </div>






              <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-left text-sm text-dark">

                
                <div className=" self-stretch flex flex-col xl:flex-row gap-2 items-start justify-between  p-5 xl:p-0 ">
                  
                  
                  
                  <div className=" flex flex-row items-center justify-start gap-[20px]">
                    
                      
                      <div className="flex flex-row items-center justify-center gap-[12px]">
                      

                        { sortBy === "viewCount" ? (
                          <>
                            <button
                              className={`relative text-grey-9 `}
                              onClick={() => {
                                setSortBy("createdAt");
                                /////search(searchTerm, "createdAt");
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
                                ////search(searchTerm, "viewCount");
                              } }
                            >
                              인기순
                            </button>
                          </>

                        )}

                      </div>

                    
                      {/*
                      <div className=" hidden  flex-row items-center justify-center gap-[4px] text-grey-9">
                        <img
                          className="relative w-6 h-6 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/outlinecheck.svg"
                        />
                        <button className="relative font-extrabold">내글보기</button>
                      </div>
                      */}
                    
                      <Link
                        href="/usermain/boards"
                        className="no-underline">
                      
                        <div className="flex flex-row items-center justify-center gap-[4px]">
                          <img
                            className="relative w-6 h-6 overflow-hidden shrink-0"
                            alt=""
                            src="/usermain/images/outlinecheck1.svg"
                          />
                          <button className="relative font-extrabold">내글보기</button>
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

                    className=" xl:w-[400px] rounded-[8px] border-[1px] border-solid border-grey-e outline-none bg-white"
                  />



                </div>

                


                  {/* loading animaiton */}

                { false ? (

                  <div className="w-full h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
                    
                    <div className="w-full self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

                    </div>
                  </div>

                ) : (



                  <div className=" self-stretch grid grid-cols-1 items-center justify-start gap-[20px] text-left text-sm text-dark p-5 xl:p-0  ">
              

                      {/* 로그인 안했을경우 로그인을 유도 */}
                      { !session?.user?.email && (


                        <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] text-left text-sm text-dark">

                          <div   className="self-stretch flex flex-col items-center justify-start gap-[20px] text-left text-sm text-dark">
                            <div className="flex flex-row items-center justify-center gap-[12px]">
                              <div className="relative font-extrabold">로그인을 해주세요</div>
                            </div>
                          </div>

                          <motion.div
                            className="box"
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Link
                              href="/usermain/user/login"
                              className="
                              bg-orange
                              no-underline rounded-81xl flex flex-row items-center justify-start py-3 px-6 text-sm border-[1px] border-solid border-grey-6"
                            >
                              <div className="relative font-extrabold">
                                로그인
                              </div>
                            </Link>
                          </motion.div>

                        </div>
                      )}

                      

                      {/* 로그인 했을경우 */}
                      {searchResults?.map((item: any) => (
                        <>


                        <ListPost
                          key={item.id}
                          id={item.id}
                          createdAt={item.createdAt}
                          userName={item?.userName}
                          userNickname={item?.userNickname}
                          userAvatar={item?.userAvatar}
                          title={item.title}
                          ///content={shortConntent}
                          // if content length is over 200, show only 200 characters

                          content={
                            item?.content
                          }


                          images={item.images}
                          tags={item.tags}

        
                          scrapCount={item.scrapCount}
                          likeCount={item.likeCount}
                          commentCount={item.commentCount}
                          viewCount={item.viewCount}


                          imageDimensions="/usermain/images/rectangle-62@2x.png"
                          frameDiv
                          showRectangleIcon
                          propHeight="unset"
                        />

                        </>

                      ))}

                  

                  </div>

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
      <div className=" z-50 flex flex-col items-center justify-end gap-[40px] text-grey-6 fixed bottom-0 right-0 mr-10 mb-28">
        
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


    </>
  );
};

