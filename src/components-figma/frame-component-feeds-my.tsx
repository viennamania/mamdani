



import type { NextPage } from "next";
import Search from "./search";

////import FeedContainer1 from "./feed-container1";


////import WriteIcon from "./write-icon";

import Link from "next/link";

import { motion } from "framer-motion";


import { Autocomplete, TextField, Icon, Button, InputAdornment } from "@mui/material";

import { Input } from '@/components/ui/input';

import ListFeed from "./list-feed";

import Image from "next/image";


import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";



import { PiMagnifyingGlassBold } from 'react-icons/pi';




//import { useFormik } from "formik";
//import * as Yup from "yup";

//import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};





const FrameComponentFeeds: NextPage = () => {


  const { data: session, status } = useSession();


  // fetch feeds data

  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(false);

 

  const [totalCount, setTotalCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);






  useEffect(() => {

    const fetchData = async () => {

      if (!session?.user?.email) return;
  
      setLoading(true);
  
      const res = await fetch(`/api/doingdoit/feed/getAllByEmail?_email=${session?.user?.email}&_limit=30&_page=1&_q=${searchTerm}`);
  
      const posts  = await res?.json() as any;

      setSearchResults(posts.data);
  

      // getAllCountByEmailCount
      const res1 = await fetch(`/api/doingdoit/feed/getAllByEmailCount?_email=${session?.user?.email}&_q=${searchTerm}`);

      const posts1  = await res1?.json() as any;


      ///console.log("FrameComponentFeeds data=", posts1.data);

      setTotalCount(posts1.data);

  
      setLoading(false);
  
    };

    fetchData();
  }
  ,[ session?.user?.email, searchTerm  ]);



 


  // handleSearch
  const handleSearch = (searchTerm: string) => {

    setSearchTerm(searchTerm);



    if (searchTerm !== "") {


      //console.log("handleSearch searchTerm=====", searchTerm);

      /*
      const newFeedList = data.filter((feed: any) => {
        return Object.values(feed).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
       setSearchResults(newFeedList);
      */


    } else {

      setSearchResults(data);

    }



    /*
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





  return (

    <>

    <div className=" w-full
      xl:w-[1000px] flex flex-col items-center justify-center relative gap-[20px] xl:gap-[40px] text-center text-base text-grey-9 font-menu-off">
      

      <div className="
        w-full self-stretch flex flex-row items-center justify-center z-[0]">
        
        <Link
        href="/usermain/feeds"
        className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start  border-b-[2px] border-solid border-orange-light">
        <div className="flex-1 relative font-extrabold">전체 주문</div>
        </Link>

        <Link
        href="/usermain/feeds/interest"
        className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
        <div className="flex-1 relative font-extrabold">관심 주문</div>
        </Link>

        <Link
        href="/usermain/feeds/my"
        className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start text-dark border-b-[2px] border-solid border-dark">
        <div className="flex-1 relative font-extrabold">나의 주문</div>
        </Link>


      </div>


      


        <div className=" ml-5 mr-5 xl:ml-0 xl:mr-0 min-h-screen 
        self-stretch flex flex-col items-center justify-start gap-[20px] z-[1] text-left text-dark">


        <div className="self-stretch flex flex-row items-center justify-between">

          <div className="w-full text-left relative   text-sm xl:text-base   font-extrabold">구매주문 {totalCount}</div>


          {/*
          <Search prop="제목, 내용, 닉네임 검색" searchWidth="400px" />
          */}
          
          <Input
            type="search"
            //placeholder={searchPlaceholder}
            placeholder="제목, 내용 검색"
            value={searchTerm}
          
            onClear={() =>
              handleSearch('')
            }
            onChange={(event) => 
              handleSearch(event.target.value)
            }
            clearable
            suffix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            labelClassName='text-base font-medium'

            className="w-[650px] rounded-[8px] border-[1px] border-solid border-grey-e outline-none bg-white"
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

          <div className="w-full">


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



            {
              loading === false && searchResults.length === 0 ? (
                <div className="w-full h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
                    <div className="text-base">검색 결과가 없습니다.</div>
                </div>
                
              ) : (


                <div className=" min-h-screen   grid grid-cols-1 xl:grid-cols-2 items-start justify-center gap-[20px] xl:gap-[40px] ">


      
                { searchResults?.map((item: any) => (


                  <div key={item.id}>



                    <ListFeed

                      meYn = "Y"


                      id={item.id}
                      createdAt={item.createdAt}
                      email={item.email}
                      nickname={item.nickname}
                      name={item.name}
                      avatar={item.avatar}
                      
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



                      hiddenYn={item.hiddenYn}

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


                )) }

        


              </div>

            )}

          </div>
          
          )}


      </div>   
      
      



    </div>





    </>

  );



  


};

export default FrameComponentFeeds;

