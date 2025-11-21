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

import { useSearchParams } from 'next/navigation'



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


  const searchParams = useSearchParams()
 
  const search = searchParams.get('search') || ''




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


  const [totalCount, setTotalCount] = useState(0);


  const [countPerPage, setCountPerPage] = useState(10);


  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {


    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch(`/api/doingdoit/board/getAll?_limit=${countPerPage}&_page=${currentPage}&_sort=${sortBy}&_q=${searchTerm}`);
  
      const posts  = await res?.json() as any;
  
      ///console.log("board data===========================", posts.data);
  
      /////setData(posts.data);
  

      // if currentPage is 1, then set data to posts.data
      // if currentPage is 2, then append data to posts.data

      setSearchResults(currentPage === 1 ? posts.data?.boards : [...searchResults, ...posts.data?.boards]);


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
  ,[ sortBy, searchTerm, currentPage]);






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

    <div className="w-full self-stretch flex flex-col items-center justify-start gap-[10px] xl:gap-[20px] text-left text-sm text-dark ">

                
    <div className=" self-stretch flex flex-col-reverse xl:flex-row gap-2 items-start justify-between ">
      
      
      
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
      
        <div className=" self-stretch grid grid-cols-1 items-center justify-start gap-[10px] xl:gap-[20px] text-left text-sm text-dark  ">
      
          {searchResults?.map((item: any) => (
            


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

            

          ))}


          {/* more button */}

          {   totalCount > countPerPage && searchResults.length < totalCount ? (

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
          )}

        </div>




      </>

    )}


  </div>


  );
};

