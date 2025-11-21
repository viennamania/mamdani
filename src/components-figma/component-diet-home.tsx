import type { NextPage } from "next";
import FeedContainerHome from "./feed-container-home";
//import ListDiet from "./list-diet";
import ListDietSlide from "./list-diet-slide";

import ListFeed from "./list-feed";


//import { Swiper, SwiperSlide } from "swiper/react";
//import { A11y, Pagination, Autoplay } from 'swiper';

//import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
//import SwiperCore from 'swiper';

///import { Scrollbar, A11y } from 'swiper';

import { A11y, Scrollbar, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
//import SwiperCore, { Navigation } from 'swiper/core';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




import { useEffect, useState } from "react";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Link from "next/link";
import Goto from "./goto";
import { space } from "postcss/lib/list";





const ComponentDietHome: NextPage = () => {


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


  // fetch feeds data

  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(false);



  /* swiper next and prev button click event handler */
  
  //const [swiper, setSwiper] = useState( null);

  const [swiper, setSwiper] = useState<any>(null);

  const [activeIndex, setActiveIndex] = useState(0);

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


  const squareVariants = {
    //visible: { opacity: 1, scale: 4, transition: { duration: 1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0 }
  };
  

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  


  console.log("propOpacityArray=", propOpacityArray);



  

  
  
    useEffect(() => {

      const fetchData = async () => {
        setLoading(true);
    
        ///const res = await fetch('/api/doingdoit/feed/getAllForHome?_limit=10&_page=1&_start=0');

        const res = await fetch('/api/doingdoit/feed/getAllForHome?_limit=7&_page=1&_start=0');
    
        const posts  = await res?.json() as any;
    
        console.log("FrameComponentFeeds data=", posts?.data);
    

     

       
        const limitLarge = posts?.data?.length > 4 ? posts?.data?.length - 4 : 0;

        const limitMobile = posts?.data?.length > 1 ? posts?.data?.length - 1 : 0;


  
        window.innerWidth > 1024 ? setLimit(limitLarge) : setLimit(limitMobile);


        // if mobile, add empty data
        // posts?.data and add empty data


        window.innerWidth > 1024 ? setData(posts?.data) :
        setData(

          posts?.data.concat([
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

    <div className="self-stretch bg-white flex flex-col items-start xl:items-center justify-start py-[50px]  xl:py-[100px] px-5  xl:px-0 text-center text-sm text-dark font-menu-off">
 

        <div className="w-full xl:w-[1000px] flex flex-col items-center justify-start gap-[40px] ">
        
          <div className="w-full self-stretch flex flex-row gap-5  items-end justify-between ">


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
                  href="/usermain/feeds"
                  className=" no-underline flex"
                  >
                  <Goto boardName="피드" />
                </Link>
              </motion.div>

              <div className="self-stretch relative flex flex-col xl:flex-row gap-1 text-xl xl:text-17xl font-jalnan text-left">
                <span>당신의 식단을 전문가가</span>
                <span className="xl:pl-1">분석해 드려요!</span>
              </div>
            

            </div>

          

            {limit > 0 && (
              <div className="flex flex-row items-center justify-center gap-[4px]  ">
            
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

                  onClick={
                    goNext
                  }
                >
                <img
                  
                  //className={`relative w-8 h-8 overflow-hidden shrink-0 ${activeIndex === 6 && `opacity-25`} `}

                  className={`relative w-8 h-8 overflow-hidden shrink-0 ${activeIndex === limit && `opacity-25`} `}


                  alt=""
                  src="/usermain/images/arrowrightcircleline.svg"
                />
                </button>
              </div>
            )}

          </div>
          
        </div>






        {/* swiper */}

        {/* swiper left and right button */}

              {/* loading animaiton */}

        { false ? (

          <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
            
            <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

            </div>
          </div>

        ) : (


          <div className="mt-10 xl:pl-10 xl:pr-10 flex w-[600px] xl:w-full ">

            <Swiper

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

              className="  "
            >
              {data.map((
                item: any, index: number
              ) => (
  
                <SwiperSlide key={item.id}>
                    
                    <ListDietSlide
                    
                      {...item}


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
      
                      feedbackWriterId={item.feedbackWriterId}
                      feedbackWriterNickname={item.feedbackWriterNickname}
                      feedbackWriterName={item.feedbackWriterName}
                      feedbackWriterAvatar={item.feedbackWriterAvatar}
                      
                      feedbackContent={
                        item.feedbackContent
                      }


                      cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
                      frameDiv={false}
                      showRectangleIcon
                      
                      propOpacity={
                        window.innerWidth > 1024 ? propOpacityArray[index] : mobilePropOpacityArray[index]
                      }

                    />

                

                </SwiperSlide>

     

              ))}
            </Swiper>

          </div>


        )}


      {/*
      <div className="xl:w-[1000px] flex flex-col items-center justify-start gap-[40px] border">
       
        <div className="self-stretch flex flex-row items-end justify-between">

          <FeedContainerHome
            sectionTitle="피드"
            feedSectionSubtitle="당신의 식단을 전문가가 분석해 드려요!"
          />

          <div className="flex flex-row items-center justify-center gap-[4px]">

            <img
              className="relative w-8 h-8 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/arrowleftcircleline.svg"
            />
            <img
              className="relative w-8 h-8 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/arrowrightcircleline.svg"
            />
          </div>
        </div>



  
  





             
        <div className="self-stretch flex flex-row items-center justify-center gap-[40px] text-left text-xs">
          <ListDiet
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
            propOpacity="0.25"
          />
          <ListDiet
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
          />
          <ListDiet
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
            propOpacity="unset"
          />
          <ListDiet
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
            propOpacity="0.25"
          />
        </div>
        


      </div>
      */}


    </div>

     

  );
};

export default ComponentDietHome;
