import type { NextPage } from "next";
import FeedContainerHome from "./feed-container-home";
//import ListDiet from "./list-diet";
import ListBuyOrderSlide from "./list-buyorder-slide";

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
  


  //console.log("propOpacityArray=", propOpacityArray);



  

  
  
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
  
      ///const res = await fetch('/api/doingdoit/feed/getAllForHome?_limit=10&_page=1&_start=0');

      try {
        
        //const res = await fetch('/api/doingdoit/feed/getAllForHome?_limit=7&_page=1&_start=0');
        const res = await fetch('/api/oneclick/order/getAllBuyOrders',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fromDate: "",
            toDate: "",
            limit: 10,
            page: 1,
          }),
        });


    
        const posts  = await res?.json() as any;

        /*
        {
          result: {
            totalCount: 37433,
            totalKrwAmount: 16039268000,
            totalUsdtAmount: 10709055.43,
            totalSettlementCount: 37430,
            totalSettlementAmount: 10642674.061,
            totalSettlementAmountKRW: 15939847323,
            totalFeeAmount: 65043.599,
            totalFeeAmountKRW: 97417897.758,
            totalAgentFeeAmount: 0,
            totalAgentFeeAmountKRW: 0,
            orders: [
              [Object], [Object],
              [Object], [Object],
              [Object], [Object],
              [Object], [Object],
              [Object], [Object]
            ]
          }
        }
        */

        /*
        orders: [
        {
          "_id": "6921150bd26c3d7f10f45dde",
          "chain": "bsc",
          "lang": null,
          "agentcode": "rkbvsbvi",
          "agent": {
              "_id": "68948fbc2e80bcd0437214ed",
              "agentcode": "rkbvsbvi",
              "agentName": "CS스머프AG",
              "agentType": "test",
              "agentUrl": "https://test.com",
              "agentDescription": "CS소속",
              "agentLogo": "https://cryptoss.beauty/logo.png",
              "agentBanner": "https://cryptoss.beauty/logo.png",
              "createdAt": "2025-08-07T11:36:28.777Z",
              "adminWalletAddress": "0x36D70D9CdB096F341BA18F1Cc3C7dD40376022c1",
              "agentFeeWalletAddress": "0x36D70D9CdB096F341BA18F1Cc3C7dD40376022c1",
              "totalStoreCount": 12,
              "totalKrwAmount": 320014690825,
              "totalKrwAmountClearance": 16007431000,
              "totalPaymentConfirmedClearanceCount": 12109,
              "totalPaymentConfirmedCount": 293163,
              "totalUsdtAmount": 6355144.94,
              "totalUsdtAmountClearance": 11579159.832,
              "totalFeeAmount": 169740.645,
              "totalFeeAmountKRW": 247936490.293,
              "totalSettlementAmount": 26389384.021,
              "totalSettlementAmountKRW": 40700234526,
              "totalSettlementCount": 111298,
              "usdtKRWRate": 1500
          },
          "storecode": "arygljqt",
          "store": {
              "_id": "689490169907eaba5bc51341",
              "agentcode": "rkbvsbvi",
              "storecode": "arygljqt",
              "storeName": "MOON",
              "storeType": "test",
              "storeUrl": "https://test.com",
              "storeDescription": "결제 USDT",
              "storeLogo": "https://t0gqytzvlsa2lapo.public.blob.vercel-storage.com/VB1SLu3-2QV9Fl0SzT3NJ6Yi6T5VMumlQjWyld.jpeg",
              "sellerWalletAddress": "0x00A6842aEDc1a3BB22d82467d60d9eef3dE63BD6",
              "settlementFeeWalletAddress": "0xB720B00949d2fa980f52A7631580a55b08A6dF97",
              "settlementFeePercent": 0.6,
              "adminWalletAddress": "0x27819bb55cB09A6Bc1E1a82e7A085A340981039A",
              "settlementWalletAddress": "0x27819bb55cB09A6Bc1E1a82e7A085A340981039A",
              "totalBuyerCount": 1228,
              "bankInfo": {
                  "bankName": "농협",
                  "accountNumber": "3022084120331",
                  "accountHolder": "조건희"
              },
              "totalUsdtAmountClearance": 10059652.578,
              "totalSettlementAmount": 31206612.08709,
              "bankInfoAAA": {
                  "bankName": "농협",
                  "accountNumber": "0105719528509",
                  "accountHolder": "허정우"
              },
              "bankInfoBBB": {
                  "bankName": "농협",
                  "accountNumber": "3521606826983",
                  "accountHolder": "김경현"
              },
              "bankInfoCCC": {
                  "bankName": "농협",
                  "accountNumber": "0102397700209",
                  "accountHolder": "김강민"
              }
          },
          "walletAddress": "0x6BB95DF4dcBe4D3C7C380B68E259E92e94Bd5D88",
          "nickname": "maru0611",
          "mobile": "+821012345678",
          "avatar": null,
          "userType": "BBB",
          "userStats": {
              "totalPaymentConfirmedCount": 348,
              "totalPaymentConfirmedKrwAmount": 55420000,
              "totalPaymentConfirmedUsdtAmount": 37136.333
          },
          "usdtAmount": 112.58,
          "krwAmount": 170000,
          "rate": 1510,
          "createdAt": "2025-11-22T01:42:35.640Z",
          "status": "paymentConfirmed",
          "privateSale": false,
          "buyer": {
              "depositBankName": "카카오뱅크",
              "depositBankAccountNumber": "3333136255937",
              "depositName": "박현호"
          },
          "paymentMethod": "bank",
          "tradeId": "59780439",
          "escrowWallet": {
              "address": "0x5bfbA7AA3D0dc12969052f33B9BCC18006A57F4b",
              "privateKey": "0x8f713397a8095b506dbaab77087f6106b028c3bbdbe68491dab26630f750cb10"
          },
          "audioOn": true,
          "returnUrl": "",
          "acceptedAt": "2025-11-22T01:42:38.983Z",
          "seller": {
              "walletAddress": "0x00A6842aEDc1a3BB22d82467d60d9eef3dE63BD6",
              "nickname": "seller",
              "avatar": "",
              "mobile": "+82",
              "memo": "카카오뱅크 111111111111111 지코인",
              "bankInfo": {
                  "bankName": "농협",
                  "accountNumber": "3521606826983",
                  "accountHolder": "김경현"
              }
          },
          "api": "/api/order/buyOrderRequestPayment",
          "payactionResult": {
              "status": "success",
              "response": {
                  "order_id": 164399,
                  "order_number": "59780439",
                  "auto_confirm": 0,
                  "message": "주문이 성공적으로 생성되었습니다"
              }
          },
          "escrowTransactionHash": null,
          "paymentRequestedAt": "2025-11-22T01:42:42.817Z",
          "autoConfirmPayment": true,
          "escrowTransactionConfirmedAt": "2025-11-22T01:43:14.206Z",
          "paymentAmount": 170000,
          "paymentConfirmedAt": "2025-11-22T01:43:14.206Z",
          "queueId": "d42a4ea6-ffbe-4843-823c-6fd0988b9436",
          "sellerWalletAddressBalance": 7072.890801199988,
          "transactionHash": "0x19dfc3b2a7e39c86f4891a038065c0c77f174acb4511a0443a8a452c4e4dbf97",
          "settlement": {
              "txid": "0x094947d38cb824f1259c51a8aa553cc8bddf93a6c93d729b37ea4a95a8af49a8",
              "krwRate": 1510,
              "paymentAmount": 170000,
              "settlementWalletAddress": "0x27819bb55cB09A6Bc1E1a82e7A085A340981039A",
              "settlementAmount": 111.905,
              "settlementAmountKRW": "168977",
              "settlementWalletBalance": 9337.178358266401,
              "feeWalletAddress": "0xB720B00949d2fa980f52A7631580a55b08A6dF97",
              "feePercent": 0.6,
              "feeAmount": 0.675,
              "feeAmountKRW": 1019.2500000000001,
              "agentWalletAddress": "",
              "agentFeePercent": 0,
              "agentFeeAmount": 0,
              "agentFeeAmountKRW": "0",
              "status": "paymentSettled",
              "createdAt": "2025-11-22T01:43:29.433Z"
          }
        }
        ]
        */
    
        ////console.log("FrameComponentFeeds posts.result.orders=", posts?.result?.orders);
    

    

      

        const limitLarge = posts?.result?.orders?.length > 4 ? posts?.result?.orders?.length - 4 : 0;

        const limitMobile = posts?.result?.orders?.length > 1 ? posts?.result?.orders?.length - 1 : 0;


  
        window.innerWidth > 1024 ? setLimit(limitLarge) : setLimit(limitMobile);


        // if mobile, add empty data
        // posts?.data and add empty data

        /*
        window.innerWidth > 1024 ? setData(posts?.result?.orders) :
        setData(

          posts?.result?.orders.concat([
            {
              
            },
          ])

        );
        */
        setData(posts?.result?.orders);

      } catch (error) {
        console.log("Error fetching feed data:", error);
      }
  
      setLoading(false);
  
    };

    fetchData();

    // interval 30 seconds to fetch data again
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);


    return () => clearInterval(intervalId);

  }
  ,[ ]);


  ///console.log("ComponentDietHome data=", data);


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
                  <Goto boardName="구매주문" />
                </Link>
              </motion.div>

              <div className="self-stretch relative flex flex-col xl:flex-row gap-1 text-xl xl:text-17xl font-jalnan text-left">
                <span>테더를 팔고 싶으면</span>
                <span className="xl:pl-1">구매신청한 사람을 찾아보세요!</span>
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
              {data?.map((
                item: any, index: number
              ) => (
  
                <SwiperSlide key={item.tradeId || index} >
                    
                    <ListBuyOrderSlide
                    
                      {...item}

                      /*
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
                      */

                      id={item.tradeId}
                      createdAt={item.createdAt}
                      email={""}
                      nickname={item.nickname}
                      name={item?.buyer?.depositName || ""}
                      avatar={item.avatar}
                      walletAddress={item.walletAddress}

                      krwAmount={item.krwAmount}
                      usdtAmount={item.usdtAmount}
                      rate={item.rate}


                      feedTitle={""}
                      feedContent={""}
      
                      feedbackWriterId={""}
                      feedbackWriterNickname={""}
                      feedbackWriterName={""}
                      feedbackWriterAvatar={""}
                      
                      feedbackContent={
                        ""
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
            sectionTitle="구매주문"
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
