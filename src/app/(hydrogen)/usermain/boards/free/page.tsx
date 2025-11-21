'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Search from "@/components-figma/search";

import Footer from "@/components-figma/footer";

import Link from "next/link";


import { Input } from '@/components/ui/input';


import { useState, useEffect, use } from "react";


import { PiMagnifyingGlassBold } from 'react-icons/pi';


import Image from "next/image";
import { motion } from "framer-motion";


import ListPost from "@/components-figma/list-post";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        <Box sx={{ p: 3 }}>
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





export default function BoardPage() {



  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(false);


  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);









  useEffect(() => {


    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch('/api/doingdoit/board/getAll?_limit=30&_page=1&_start=0');
  
      const posts  = await res?.json() as any;
  
      ////console.log("board data===========================", posts.data);
  
      setData(posts.data);
  
  
  
  
      setLoading(false);
  
    };


    fetchData();
  }
  ,[]);






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


  const [value, setValue] = useState(0);

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
        


        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">

          <div className="xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">


            {/* loading animation */}
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-[20px]">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-8" />
                <div className="text-grey-8">Loading...</div>
              </div>
            ) : (


              <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-left text-sm text-dark">

                
                <div className=" self-stretch flex flex-col xl:flex-row gap-2 items-start justify-between  p-5 xl:p-0 ">
                  
                  
                  
                  <div className=" flex flex-row items-center justify-start gap-[20px]">
                    
                      <div className="flex flex-row items-center justify-center gap-[12px]">
                      
                        <button className="relative font-extrabold">최근순</button>

                        <div className="relative bg-grey-c w-px h-3" />

                        <button className="relative text-grey-9">인기순</button>

                      </div>
                    
                      <div className="flex flex-row items-center justify-center gap-[4px] text-grey-9">
                        <img
                          className="relative w-6 h-6 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/outlinecheck.svg"
                        />
                        <button className="relative font-extrabold">내글보기</button>
                      </div>
                    
                      <div className="hidden flex-row items-center justify-center gap-[4px]">
                        <img
                          className="relative w-6 h-6 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/outlinecheck1.svg"
                        />
                        <button className="relative font-extrabold">내글보기</button>
                      </div>

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

                    className=" w-96  xl:w-[400px] rounded-[8px] border-[1px] border-solid border-grey-e outline-none bg-white"
                  />



                </div>

                


                <div className=" self-stretch grid grid-cols-1 items-center justify-start gap-[20px] text-left text-sm text-dark p-5 xl:p-0  ">
                  {data?.map((item: any) => (
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


              </div>

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




      {/* float buttom right absolute position stikcy */}
      <div className=" z-50 flex flex-col items-center justify-end gap-[40px] text-grey-6 fixed bottom-0 right-0 mr-96  mb-10">
        
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
            <Image
              width="64"
              height="64"

              className="relative w-16 h-16"
              alt=""
              src="/usermain/images/write.svg"
            />
          </Link>
        </motion.div>

      </div>


    </>
  );
};

