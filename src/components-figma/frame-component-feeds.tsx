import type { NextPage } from "next";
import Search from "./search";

////import FeedContainer1 from "./feed-container1";


////import WriteIcon from "./write-icon";

import Link from "next/link";

import { motion } from "framer-motion";


//import { Autocomplete, TextField, Icon, Button, InputAdornment } from "@mui/material";

import { Input } from '@/components/ui/input';

import ListFeed from "./list-feed-buyorder";

import Image from "next/image";


import { useState, useEffect, use } from "react";


import { PiMagnifyingGlassBold } from 'react-icons/pi';


import InfiniteScroll from 'react-infinite-scroll-component';

import {  QueryClient, QueryClientProvider, useInfiniteQuery } from 'react-query';


import { Button } from '@/components/ui/button';


import useDebounce from '@/utils/useDebounce';
import { set } from "lodash";


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
  
      //const res = await fetch(`/api/doingdoit/feed/getAllPublic?_limit=${countPerPage}&_page=${currentPage}&_sort=createdAt&_order=-1&_q=${debouncedSearch}`);

        const res = await fetch('/api/oneclick/order/getAllBuyOrders',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fromDate: "",
            toDate: "",
            limit: countPerPage,
            page: currentPage,
            searchKeyword: debouncedSearch,
            sortBy: "createdAt",
            sortOrder: "desc",
          }),
        });


      const posts  = await res?.json() as any;

      ///console.log("FrameComponentFeeds posts=", posts);
  

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
          "storecode": "arygljqt",
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

        setSearchResults(
          currentPage === 1 ? posts?.result?.orders : [
            ...searchResults,
            ...posts?.result?.orders,
          ]
        );
    
      
      /*
      if (currentPage === 1) {
        
        //setSearchResults(posts?.data?.feeds);

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
      */

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
      



      //setTotalCount(posts?.data?.totalCount);
      setTotalCount(posts?.result?.totalCount);


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
          <div className="flex-1 relative font-extrabold">전체 주문</div>
          
        </Link>
 

        <Link
          href="/usermain/feeds/interest"
          className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
          <div className="flex-1 relative font-extrabold">관심 주문</div>
        </Link>

        <Link
          href="/usermain/feeds/my"
          className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
          <div className="flex-1 relative font-extrabold">나의 주문</div>
        </Link>

      </div>



      

      <div className="ml-5 mr-5 xl:ml-0 xl:mr-0 min-h-screen
        self-stretch flex flex-col items-center justify-start gap-[20px] z-[1] text-left text-dark">

        <div className=" self-stretch flex flex-row items-center justify-between">

          <div className="w-full text-left relative   text-sm xl:text-base   font-extrabold">구매주문 {totalCount}</div>


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
              loading === false && searchResults && searchResults.length === 0 ? (
                <div className="w-full h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
                    <div className="text-base">검색 결과가 없습니다.</div>
                </div>
                
              ) : (


                <div className="w-full min-h-screen   grid grid-cols-1 xl:grid-cols-2 items-start justify-center gap-8 xl:gap-10">



              
                  {searchResults?.map((item: any) => (

                    ////console.log("FrameComponentFeeds item=", item),


                    <div key={item.tradeId} className="w-full
                      flex flex-col items-center justify-center gap-5 z-[1] text-left text-dark">

                      {/*}
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
                      */}
                      <ListFeed
                        id={item.tradeId}
                        createdAt={item.createdAt}
                        nickname={item.nickname}
                        walletAddress={item.walletAddress}
                        avatar={
                          item.avatar
                        }
                        krwAmount={item.krwAmount}
                        usdtAmount={item.usdtAmount}
                        rate={item.rate}
                        
                        status={item.status}

                        paymentMethod={item.paymentMethod}
                        buyerDepositBankName={item.buyer?.depositBankName}
                        buyerDepositAccountNumber={item.buyer?.depositBankAccountNumber}
                        buyerDepositName={item.buyer?.depositName}

                        cakeDescription={`#${item.tradeId} ${item.krwAmount}원 - ${item.status}`}
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
