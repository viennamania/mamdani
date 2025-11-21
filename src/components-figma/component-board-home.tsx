import type { NextPage } from "next";
import FeedContainerFree from "./feed-container-free";

import ContainerCardFormHome from "./container-card-form-home";



import Goto from "./goto";

import Link from "next/link";

import {  motion } from "framer-motion";



import { useEffect, useState } from "react";


import ListPost from "./list-post-home";

import ListPostSlide from "./list-post-slide";



import { de } from "@faker-js/faker";

import { A11y, Scrollbar, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';




const ComponentBoardHome: NextPage = () => {

  const [limit, setLimit] = useState(0);

  const sliderBreakPoints = {

    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    
    1024: {
      slidesPerView: 4,
      ///spaceBetween: 24,
      spaceBetween: 20,
    },

  };

    /* swiper next and prev button click event handler */
  ///const [swiper, setSwiper] = useState( null);
  const [swiper, setSwiper] = useState<any>(null);

  
  const [activeIndex, setActiveIndex] = useState(0);


  ///const [propOpacityArray, setPropOpacityArray] = useState([0.25, 1, 1, 1, 0.25, 0.25, 0.25, 0.25, 0.25]);

  const [propOpacityArray, setPropOpacityArray] = useState([
    0.75, 1, 1, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75,
  ]);


  const [mobilePropOpacityArray, setMobilePropOpacityArray] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]);

 

  const onSwiper = (swiper : any ) => {
    
    setSwiper(swiper);

    swiper.on('slideChange', function () {

      console.log('slide changed');
      console.log('swiper.activeIndex=', swiper.activeIndex);

      setActiveIndex(swiper.activeIndex);


      if (swiper.activeIndex === 0) {
        setPropOpacityArray([0.75, 1, 1, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]);
        setMobilePropOpacityArray([1, 1, 1, 1, 1, 1, 1, 1, 1]);
      } else if (swiper.activeIndex === 1) {
        setPropOpacityArray([0.75, 0.75, 1, 1, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]);
        setMobilePropOpacityArray([1, 1, 1, 1, 1, 1, 1, 1, 1]);
      } else if (swiper.activeIndex === 2) {
        setPropOpacityArray([0.75, 0.75, 0.75, 1, 1, 0.75, 0.75, 0.75, 0.75, 0.75]);
        setMobilePropOpacityArray([1, 1, 1, 1, 1, 1, 1, 1, 1]);
      } else if (swiper.activeIndex === 3) {
        setPropOpacityArray([0.75, 0.75, 0.75, 0.75, 1, 1, 0.75, 0.75, 0.75, 0.75]);
        setMobilePropOpacityArray([1, 1, 1, 1, 1, 1, 1, 1, 1]);
      } else if (swiper.activeIndex === 4) {
        setPropOpacityArray([0.75, 0.75, 0.75, 0.75, 0.75, 1, 1, 0.75, 0.75, 0.75]);
        setMobilePropOpacityArray([1, 1, 1, 1, 1, 1, 1, 1, 1]);
      } else if (swiper.activeIndex === 5) {
        setPropOpacityArray([0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 1, 1, 0.75, 0.75]);
        setMobilePropOpacityArray([1, 1, 1, 1, 1, 1, 1, 1, 1]);
      } else if (swiper.activeIndex === 6) {
        setPropOpacityArray([0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 1, 1, 0.75]);
        setMobilePropOpacityArray([1, 1, 1, 1, 1, 1, 1, 1, 1]);
      }


    });


  };




  const goNext = () => {

    if (swiper !== null) {

      if (swiper.activeIndex === limit) return;

      swiper.slideNext();


    }
  };


  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();

    }
  };




  // fetch feeds data

  const [data, setData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);


  const [loading, setLoading] = useState(true);


 
 
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch('/api/doingdoit/board/getTop?_limit=3&_page=1');
  
      const posts  = await res?.json() as any;
  
      ///console.log("FrameComponentFeeds data=", posts.data);
  
      ///setData(posts?.data?.boards);

      setTotalCount(posts?.data?.totalCount);
  
      const limitLarge = posts?.data?.totalCount > 4 ? posts?.data?.totalCount - 4 : 0;

      const limitMobile = posts?.data?.totalCount > 1 ? posts?.data?.totalCount - 1 : 0;

      window.innerWidth > 1024 ? setLimit(limitLarge) : setLimit(limitMobile);

  
      window.innerWidth > 1024 ? setData(posts?.data?.boards) :
      setData(

        posts?.data?.boards.concat([
          {
            
          },
        ])

      );
  
  
      setLoading(false);
  
    };

    fetchData();
  }
  ,[ ]);




  return (



  



  

    <div className="self-stretch bg-background flex flex-col items-start xl:items-center justify-start py-[50px]  xl:py-[100px] px-5  xl:px-0 text-center text-sm text-dark font-menu-off">
 


      <div className="w-full xl:w-[1000px] flex flex-col items-start justify-start xl:gap-[40px] ">
      
        <div className=" w-full self-stretch flex flex-row gap-5 items-end justify-between ">



          <div
            className=" flex-1 flex flex-col items-start justify-center gap-[20px] text-center text-sm text-dark font-menu-off "
          >
            
            <motion.div
              className="box"
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href="/usermain/boards"
                className=" no-underline flex"
              >

                <Goto boardName="자유게시판" />

              </Link>
            </motion.div>

            {/* 필독! 원클릭이 전하는 */}
            {/* 건강 정보 */}
            {/* when xl screen  don't break line */}
            {/* when lg screen  break line */}

            <div className="self-stretch relative flex flex-col xl:flex-row gap-1 text-xl xl:text-17xl font-jalnan text-left">
              <span>이주의 인기글을</span>
              <span className="xl:pl-1">만나보세요!</span>

            </div>

          </div>


          {limit > 0 && (
            <div className="xl:hidden flex flex-row items-center justify-center gap-[4px] ">

                <button
                  className="relative w-8 h-8 overflow-hidden shrink-0"
                  onClick={goPrev}
                >
                  <img
                    className={`relative w-8 h-8 overflow-hidden shrink-0 ${activeIndex === 0 && `opacity-25`}   `}
                    alt=""
                    src="/usermain/images/arrowleftcircleline.svg"
                  />
                </button>

                <button
                    className="relative w-8 h-8 overflow-hidden shrink-0"
                    onClick={goNext}
                  >
                  <img
                    className={`relative w-8 h-8 overflow-hidden shrink-0
                      ${
                        activeIndex === limit && `opacity-25`
                      }
                    `}
                    alt=""
                    src="/usermain/images/arrowrightcircleline.svg"
                  />
                </button>

            </div>
          )}


        </div>


      {/* loading animaiton */}

      { false ? (

        <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
          
          <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

          </div>
        </div>

      ) : (

        <div className="  xl:w-full">

          <div className="hidden self-stretch xl:flex flex-col items-center justify-start gap-[12px]">

            
            {data.map((post: any) => (
              <div className="self-stretch flex flex-col items-center justify-start gap-[12px]"
                key={post.id}
              >
              <ListPost
                id={post.id }
                userName={post?.userName}
                userNickname={post?.userNickname}
                userAvatar={post?.userAvatar}
                title={
                  post?.title
                }
                content={
                  post?.content
                }
                images={post?.images}
                tags={post?.tags}

                scrapCount={post?.scrapCount}
                likeCount={post?.likeCount}
                commentCount={post?.commentCount + post?.replyCount}
                viewCount={post?.viewCount}


              />

              </div>
            ))}
          </div>



          <div className="mt-10 flex w-[600px] xl:hidden">

            <Swiper
              // swiper view count is 5



              modules={[Pagination, A11y]}
              spaceBetween={24}
              slidesPerView={2}
              breakpoints={sliderBreakPoints}
              //pagination={{ clickable: true }}
              observer={true}
              //dir="ltr"
              //className="w-full pb-20 "
              onSwiper={onSwiper}
              //autoplay={{ delay: 2500, disableOnInteraction: false }}
            >
              {data?.map((item: any, index: number) => (


                <SwiperSlide key={item?.id}>
                  {/*
                  <LivePricingFeed {...item} />
                  */}



                    <div className="  no-underline flex flex-wrap items-center justify-center ">

                      <ListPostSlide

                        {
                          ...item
                        }


                        id={item.id}
                        createdAt={item.createdAt}
                        email={item.email}
                        nickname={item.nickname}
                        name={item.name}
                        avatar={item.avatar}
                        title={item.title}
                        image={item.images?.[0]}
                        tags={item.tags}


                        cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
                        frameDiv={false}
                        showRectangleIcon

                        propOpacity={
                          window.innerWidth > 1024 ? propOpacityArray[index] : mobilePropOpacityArray[index]
                        }

                      />

                    </div>

                

                </SwiperSlide>

              ))}
            </Swiper>

          </div>
  

        </div>

        ) }


      </div>
    </div>


  );
};

export default ComponentBoardHome;
