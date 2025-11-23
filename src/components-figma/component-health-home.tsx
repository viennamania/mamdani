import type { NextPage } from "next";
import Goto from "./goto";
import ListHealthinfo from "./list-healthinfo";
//import { Link } from "react-router-dom";

import Link from "next/link";

import {  motion } from "framer-motion";

import { A11y, Scrollbar, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

import { useState, useEffect } from "react";
import { da } from "@faker-js/faker";


interface AnyObject {
  [key: string]: any;
}


const priceFeedData = [
  {
    id: '0',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: '0.2231345',
    usdBalance: '11,032.24',
    change: '+12.5%',
    isChangePositive: true,
    color: '#FDEDD4',
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 34698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 26577.4 },
      { name: 7, value: 23577.4 },
      { name: 8, value: 18577.4 },
      { name: 9, value: 28577.4 },
    ],
    image: "/usermain/images/rectangle-631@2x.png",
  },
  {
    id: '1',
    name: 'Tether',
    symbol: 'USDT',
    balance: '1.2345',
    usdBalance: '1,032.24',
    change: '-1.5%',
    isChangePositive: false,
    color: '#E1F9F1',
    prices: [
      { name: 1, value: 12187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 37698.98 },
      { name: 4, value: 39587.55 },
      { name: 5, value: 29577.4 },
      { name: 6, value: 31577.4 },
      { name: 7, value: 47577.4 },
      { name: 8, value: 36577.4 },
      { name: 9, value: 28577.4 },
    ],
    image: "/usermain/images/rectangle-632@2x.png",
  },
  {
    id: '2',
    name: 'Cardano',
    symbol: 'ADA',
    balance: '1.2370',
    usdBalance: '532.94',
    change: '+12.5%',
    isChangePositive: true,
    color: '#DBE3FF',
    prices: [
      { name: 1, value: 25187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 34698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 26577.4 },
      { name: 7, value: 23577.4 },
      { name: 8, value: 18577.4 },
      { name: 9, value: 28577.4 },
    ],
    image: "/usermain/images/rectangle-633@2x.png",
  },
  {
    id: '3',
    name: 'Binance',
    symbol: 'BUSD',
    balance: '240.55',
    usdBalance: '340.24',
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 16356.99 },
      { name: 3, value: 17698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 20577.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
    image: "/usermain/images/rectangle-634@2x.png",
  },
  {
    id: '4',
    name: 'Binance',
    symbol: 'BUSD',
    balance: '240.55',
    usdBalance: '340.24',
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 16356.99 },
      { name: 3, value: 17698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 20577.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
    image: "/usermain/images/rectangle-635@2x.png",
  },
  {
    id: '5',
    name: 'Binance',
    symbol: 'BUSD',
    balance: '240.55',
    usdBalance: '340.24',
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 16356.99 },
      { name: 3, value: 17698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 20577.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
    image: "/usermain/images/rectangle-631@2x.png",
  },
  {
    id: '6',
    name: 'Binance',
    symbol: 'BUSD',
    balance: '240.55',
    usdBalance: '340.24',
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 16356.99 },
      { name: 3, value: 17698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 20577.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
    image: "/usermain/images/rectangle-631@2x.png",
  },


];




const ComponentHealthHome: NextPage = () => {



  //const limit =  4;

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



  const [loading, setLoading] = useState(false);


  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");


  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: 'createdAt', // 'createdAt'
    direction: 'desc',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(7);

  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
  
   
  
      // POST /api/doingdoit/healthinfo/getAll

      const res = await fetch(`/api/doingdoit/healthinfo/getAll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: countPerPage,
          page: currentPage,
          sort: sortConfig.key,
          order: sortConfig.direction,
          q: searchTerm,
          startDate: "",
          endDate: "",
        }),
      });


  
      const posts  = await res?.json() as any;
  
      //console.log("healthinfo getAll data=", posts.data.boards);
  
      //setData(posts?.data?.boards);



      setTotalCount(posts?.data?.totalCount);

      console.log("healthinfo getAll totalCount=", posts?.data?.totalCount);
      
   
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
  ,[ currentPage, countPerPage, sortConfig, searchTerm]);


  console.log("limit=", limit);




  return (
    <div className="self-stretch bg-white flex flex-col items-start xl:items-center justify-start py-[50px]  xl:py-[100px] px-5  xl:px-0 text-center text-sm text-dark font-menu-off">
 

      <div className="w-full xl:w-[1000px] flex flex-col items-center justify-start gap-[40px] ">
      
        <div className="w-full self-stretch flex flex-row gap-5 items-end justify-between ">


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
                href="/usermain/boards/health"
                className=" no-underline flex"
              >

                <Goto boardName="테더정보" />

              </Link>
            </motion.div>

            {/* 필독! 원클릭이 전하는 */}
            {/* 테더정보 */}
            {/* when xl screen  don't break line */}
            {/* when lg screen  break line */}

            <div className="self-stretch relative flex flex-col xl:flex-row gap-1 text-xl xl:text-17xl font-jalnan text-left">
              <span>필독! 원클릭이 전하는</span>
              <span className="xl:pl-1">테더정보</span>

            </div>

          </div>


          {limit > 0 && (
            <div className=" flex flex-row items-center justify-center gap-[4px]">

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
        

      </div>

 
      {/* loading animation */}

      { false ? (

        <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">                  
          <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

          </div>
        </div>

       
      )

      : (data?.length === 0) ? <div className="text-2xl text-center text-gray-500"></div>

      : (data?.length > 0) && (


        <div className="mt-10 xl:pl-10 xl:pr-10 flex w-[600px] xl:w-full ">
        
        
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

                                    
                    <ListHealthinfo

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

      )}




    </div>
  );
};

export default ComponentHealthHome;
