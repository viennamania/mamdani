import type { NextPage } from "next";
import Search from "./search";

////import FeedContainer1 from "./feed-container1";


////import WriteIcon from "./write-icon";

import Link from "next/link";

import { motion } from "framer-motion";


//import { Autocomplete, TextField, Icon, Button, InputAdornment } from "@mui/material";

import { Input } from '@/components/ui/input';

import ListFeed from "./list-feed";

import Image from "next/image";


import { useState, useEffect, use } from "react";


import { PiMagnifyingGlassBold } from 'react-icons/pi';


import InfiniteScroll from 'react-infinite-scroll-component';

import {  QueryClient, QueryClientProvider, useInfiniteQuery } from 'react-query';


import { Button } from '@/components/ui/button';


import useDebounce from '@/utils/useDebounce';


//import { useFormik } from "formik";
//import * as Yup from "yup";

//import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};



const queryClient = new QueryClient();


const FrameComponentFeeds: NextPage = () => {


    
  //const [queryClient] = useState(() => new QueryClient());


  



  // fetch feeds data

  //////////////const [data, setData] = useState([]);




  const [loading, setLoading] = useState(true);


  const [totalCount, setTotalCount] = useState(0);


  
  const [searchTerm, setSearchTerm] = useState("");




  const debouncedSearch = useDebounce(searchTerm, 500)



  
  const [searchResults, setSearchResults] = useState(
    [] as any
  );
  


  const [currentPage, setCurrentPage] = useState(1);


  const [countPerPage, setCountPerPage] = useState(20);

  
  useEffect(() => {

    const fetchData = async () => {

      

      setLoading(true);
  
      const res = await fetch(`/api/doingdoit/feed/getAllPublic?_limit=${countPerPage}&_page=${currentPage}&_sort=createdAt&_order=-1&_q=${debouncedSearch}`);
  
      const posts  = await res?.json() as any;
  
      //console.log("FrameComponentFeeds data=", posts.data);
  
      ////////////setData(posts.data);

      
      //setSearchResults(posts.data);

      //console.log("FrameComponentFeeds posts.data.feeds=", posts.data.feeds);


      // add data to searchResults in a way that doesn't remove previous data and check for duplicates
      
      if (currentPage === 1) {
        setSearchResults(posts?.data?.feeds);
      } else {
        setSearchResults((prev: any) => {
          // check if the new data is already in the searchResults
          const newResults = posts?.data?.feeds.filter((post: any) => {
            return !prev.some((prevPost: any) => prevPost.id === post.id);
          });
          // return the new data and previous data
          return [...prev, ...newResults];
          
        });
      }

      /*
      setSearchResults((prev: any) => {
        // check if the new data is already in the searchResults
        const newResults = posts?.data?.feeds.filter((post: any) => {
          return !prev.some((prevPost: any) => prevPost.id === post.id);
        });
        // return the new data and previous data
        return [...prev, ...newResults];
        
      });
      */
      



      setTotalCount(posts?.data?.totalCount);


      /*
      // getAllPublicCount
      const res1 = await fetch(`/api/doingdoit/feed/getAllPublicCount?_q=${debouncedSearch}`);

      const posts1  = await res1?.json() as any;

      setTotalCount(posts1.data);
      */
  
  
      setLoading(false);
  
    };

    fetchData();

  } ,[ debouncedSearch, currentPage, countPerPage  ]);
  


  console.log("FrameComponentFeeds currentPage=", currentPage);

  console.log("FrameComponentFeeds searchResults count", searchResults?.length);


  // handleSearch
  const handleSearch = (searchTerm: string) => {

    ///console.log("handleSearch searchTerm=", searchTerm);


    setCurrentPage(1);

    setSearchTerm(searchTerm);

    //////search(searchTerm);

    if (searchTerm !== "") {


      //console.log("handleSearch searchTerm=====", searchTerm);

      /*
      const newFeedList = data.filter((feed: any) => {
        return Object.values(feed).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
       setSearchResults(newFeedList);
      */


    } else {

      ////setSearchResults(data);

    }


  };



  /*
  const { data, status, fetchNextPage, hasNextPage, refetch } =

  useInfiniteQuery (

    'infiniteCharacters',

    async ({
      pageParam = 1,

      //pageParam = '',
    }) =>

      await fetch(
        `/api/doingdoit/feed/getAllPublic?_limit=20&_page=${pageParam}&_sort=createdAt&_order=-1&_q=${searchTerm}`,
      ).then((result) => {

        console.log("result json=", result.json());

        return result.json();
      }),




    {
      getNextPageParam: (
        /////lastPage // lastPage is the last page returned by the API
        lastPage: any,
        pages,
      ) => {
        //console.log("lastPage======>", lastPage);
        //console.log("pages======>", pages);

        
        if (lastPage.pageKey) {
          return lastPage.pageKey;
        } else {
          return undefined;
        }
        

      },
    }

  );
  */




  return (

    <>


    <div className=" w-full 
      xl:w-[1000px] flex flex-col items-center justify-center relative  gap-[20px] xl:gap-[40px] text-center text-base text-grey-9 font-menu-off">
      
      <div className="
        w-full self-stretch flex flex-row items-center justify-center z-[0]">
        
        <Link
          href="/usermain/feeds"
          className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start text-dark border-b-[2px] border-solid border-dark">
          <div className="flex-1 relative font-extrabold">전체 Feed</div>
          
        </Link>
 

        <Link
          href="/usermain/feeds/interest"
          className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
          <div className="flex-1 relative font-extrabold">관심 Feed</div>
        </Link>

        <Link
          href="/usermain/feeds/my"
          className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
          <div className="flex-1 relative font-extrabold">나의 Feed</div>
        </Link>

      </div>



      

      <div className="ml-5 mr-5 xl:ml-0 xl:mr-0 min-h-screen
        self-stretch flex flex-col items-center justify-start gap-[20px] z-[1] text-left text-dark">

        <div className=" self-stretch flex flex-row items-center justify-between">

          <div className="w-full text-left relative   text-sm xl:text-base   font-extrabold">피드 {totalCount}</div>


          {/*
          <Search prop="제목, 내용, 닉네임 검색" searchWidth="400px" />
          */}
          
          <Input
            type="search"
            //placeholder={searchPlaceholder}
            placeholder="제목, 내용, 닉네임 검색"
            value={searchTerm}
          
            onClear={() =>
              handleSearch('')
            }
            onChange={(event) => 
              handleSearch(event.target.value)
            }
            clearable

            /*
            prefix={
              <PiMagnifyingGlassBold className="h-4 w-4" />
            }
            */
            suffix={
              <PiMagnifyingGlassBold className="h-4 w-4" />
            }

            labelClassName='text-base font-medium'

            className=" w-[650px]  rounded-[8px] border-[1px] border-solid border-grey-e outline-none bg-white"
          />


        </div>

        



        {/* loading animaiton */}

        

        {
        //loading ? (
        false ? (

          

        <div className="w-full h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
          
          <div className="w-full self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

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


                <div className=" min-h-screen   grid grid-cols-1 xl:grid-cols-2 items-start justify-center gap-[20px] xl:gap-[40px] ">



              
                  {searchResults?.map((item: any) => (

                    ////console.log("FrameComponentFeeds item=", item),


                    <div key={item.id}>

                      <ListFeed
                        id={item.id}
                        createdAt={item.createdAt}
                        email={item.email}
                        nickname={item.nickname}
                        name={item.name}
                        avatar={
                          item.avatar
                        }
                        mealDate={item.mealDate}
                        mealTime={item.mealTime}
                        mealFood={item.mealFood}
                        mealAmount={item.mealAmount}
                        mealSpeed={item.mealSpeed}
                        feedTitle={item.feedTitle}
                        feedContent={item.feedContent}
                        feedImage={item.image1}

                        scrapCount={item.scrapCount}
                        likeCount={item.likeCount}
                        commentCount={item.commentCount}
                        viewCount={item.viewCount}
                        

                        feedbackWriterId={item.feedbackWriterId}
                        feedbackWriterNickname={item.feedbackWriterNickname}
                        feedbackWriterName={item.feedbackWriterName}
                        feedbackWriterAvatar={item.feedbackWriterAvatar}
                        
                        feedbackContent={
                          item.feedbackContent
                        }


                        cakeDescription={item.feedTitle}
                        frameDiv
                        showRectangleIcon={false}
                        propOpacity="unset"
                      />

                    </div>




                  ))}

                </div>

              )
            }





          


            {/* if searchResults less than totalCount  show 더보기 button */}

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




          </>

        )}
          
    



      </div>   
      
    



    </div>



    </>

  );
};


export default FrameComponentFeeds;
