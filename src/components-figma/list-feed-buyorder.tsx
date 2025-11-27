'use client';

import type { NextPage } from "next";
import Link from "next/link";
import React, { useState, useEffect, useMemo, type CSSProperties, use } from "react";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


import ListDietBar1 from "./list-diet-bar1";
import ListDietBar2 from "./list-diet-bar2";
import List from "./list-notice";


import Image from "next/image";

import DateCell from '@/components/ui/date-cell';



/*
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
*/


type List3Type = {

  /** Feed props */
  id: string;

  createdAt?: Date;
  nickname?: string;
  avatar?: string;
  walletAddress?: string;

  krwAmount?: number;
  usdtAmount?: number;
  rate?: number;

  status?: string;

  paymentMethod?: string;
  buyerDepositBankName?: string;
  buyerDepositAccountNumber?: string;
  buyerDepositName?: string;
  
  feedbackWriterId?: string;
  feedbackWriterNickname?: string;
  feedbackWriterAvatar?: string;
  shortFeedbackContent?: string;

  

  cakeDescription?: string;
  frameDiv?: boolean;
  showRectangleIcon?: boolean;

  /** Style props */
  propOpacity?: CSSProperties["opacity"];
};

const ListFeed: NextPage<List3Type> = ({

  id,
  createdAt,
  nickname,
  avatar,
  walletAddress,
  krwAmount,
  usdtAmount,
  rate,

  status,

  paymentMethod,
  buyerDepositBankName,
  buyerDepositAccountNumber,
  buyerDepositName,

  feedbackWriterId,
  feedbackWriterNickname,
  feedbackWriterAvatar,
  shortFeedbackContent,

  cakeDescription,
  frameDiv,
  showRectangleIcon,
  propOpacity,
}) => {
  const list1Style: CSSProperties = useMemo(() => {
    return {
      opacity: propOpacity,
    };
  }, [propOpacity]);


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


  const [ userAvatar, setUserAvatar ] = useState<string>("https://cryptoss.beauty/usermain/images/avatar.svg");


    

  return (
    
    <Link
      href={`/usermain/feeds/${id}`}
      className=" no-underline w-full "
    >

    <motion.div
      ref={ref}
      animate={controls}
      //initial="hidden"
      variants={squareVariants}
      whileInView={{ scale: 1 } }


      className="w-full
      rounded-lg xl:hover:border-gray-900
      rounded-tl-none rounded-tr-41xl rounded-b-41xl bg-white shadow-[4px_4px_30px_rgba(140,_144,_171,_0.15)] box-border flex flex-col items-center justify-end p-5 xl:p-10 gap-5 text-left text-xs text-dark font-menu-off border-[1px] border-solid border-grey-e"
      //style={list1Style}
    >
      
      <div className="
        w-full
        flex flex-col items-start justify-start gap-5">


        {/* tradeId */}
        <div className="w-full flex flex-row items-center justify-start gap-2 ">
          <span className="font-extrabold flex  ">
            주문번호:
          </span>
          {/* copy to clipboard */}
          #<a
            className="text-blue-600 underline cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(id);
              alert("거래번호가 복사되었습니다: " + id);
            }}
          >
            {id}
          </a>
        </div>

        <div className="
          w-full
          flex flex-row items-center justify-start gap-5">
          
          <div className="w-full flex flex-row items-center justify-start gap-2 ">

            <Image
              width={24}
              height={24}
              className="relative w-6 h-6 rounded-full"
              alt=""
              
              //src={userAvatar ? userAvatar : "/usermain/images/icon-user.png"}
              src="/usermain/images/icon-user.png"
            
            

              style = {{ objectFit: 'cover' }}
              ///src="https://cryptoss.beauty/usermain/images/avatar.svg"
            />
            <div className="flex flex-col items-start justify-center">
              <span className="font-extrabold flex  ">
                {nickname && nickname.length > 5 ? nickname.substring(0, 5) + "..." : nickname}
              </span>
              <span className="text-grey-9 flex">
                {walletAddress && walletAddress.length > 10 ? walletAddress.substring(0, 6) + "..." + walletAddress.substring(walletAddress.length - 4) : walletAddress}
              </span>
            </div>
          </div>



          <div className="w-full flex flex-row items-center justify-center gap-2 ">
            
    
            
            <span className="text-grey-9">
   
                {/*
             
                <DateCell
                  date={createdAt as Date}
                  className=""
                  timeClassName=""
                  dateClassName=""
                  dateFormat="YYYY. MM. DD"
                  timeFormat="HH:mm"
                />
                */}
                <DateCell
                  date={createdAt as Date}
                  className=""
                  timeClassName=""
                  dateClassName=""
                  dateFormat="YYYY. MM. DD"
                  //timeFormat=" "
                  timeFormat="HH:mm"
                  // time display is not needed

                  ///timeFormat=""
                />

              

              
            </span>
          </div>

        </div>

        {/*
        <div className="self-stretch flex flex-col items-center justify-end gap-[4px] text-grey-6">
          <div className="self-stretch relative">
             {
              (mealTime == 'skip') ? '안먹었어요' : mealTime
              }

          </div>


          <div className="self-stretch relative leading-8  text-lg xl:text-5xl font-extrabold text-dark">
            
            {
      
                mealFoodArray?.map(
                  (
                    item ,
                    index , 
                    
                  ) => (


                    <span key={index} >
                              {

                                index == (mealFoodArray?.length-1) ? item?.foodName + "" : item?.foodName + ", "

                              }
                    </span>


                  ))
              
            }

          </div>
          

        </div>

        <div className=" w-full  xl:w-[300px] flex flex-col items-center justify-end gap-[8px] text-center text-3xs text-white">
          

          { mealFoodArray?.length === 0 ? (

                               
            <div className="self-stretch rounded-81xl bg-orange  h-6 flex flex-row items-center justify-center py-0 px-3 box-border">
            <div className="relative font-extrabold  ">
              skip(먹지 않았음)
            </div>
            </div>

          ) : (
            <>
          
          <div className="self-stretch rounded-81xl bg-orange-light overflow-hidden flex flex-col items-start justify-center">
            
            <ListDietBar1
              boardName="과하게"
              mealAmount={mealAmount}
            />

          </div>


          <div className="self-stretch rounded-81xl bg-orange-light overflow-hidden flex flex-col items-start justify-center">

            <ListDietBar2
              boardName="보통"
              mealSpeed={mealSpeed}
            />
            
          </div>

          </>
          )}
        </div>
        */}



        <div className="self-stretch relative text-sm font-extrabold text-dark">

          {
          
            //feedTitle?.length && feedTitle?.length < 25 ? feedTitle : feedTitle?.substring(0, 25) + "..."

            // if feedTitle is more than 20 characters, then show only 20 characters and add "..."
            //feedTitle && feedTitle?.replace(/(<([^>]+)>)/gi, "").length > 20 ? feedTitle?.replace(/(<([^>]+)>)/gi, "").substring(0, 20) + "..." :
            //feedTitle?.replace(/(<([^>]+)>)/gi, "")

            //shortFeedTitle
            //`₩ ${krwAmount?.toLocaleString()} / $ ${usdtAmount?.toFixed(2)} (Rate: ${rate})`

            // 회원님으 테더 usdtAmount 개를 krwAmount 원에 구매하기를 원합니다.
            //`회원님께서 테더 ${usdtAmount?.toFixed(2)}개를 ${krwAmount?.toLocaleString()}원에 구매하기를 원합니다.`

          }

          
          <span className="font-extrabold">
            {nickname && nickname.length > 5 ? nickname.substring(0, 5) + "..." : nickname}
            님께서 테더
          </span>
          {' '}
          <span className="text-green-600 text-lg font-extrabold">
            {
              usdtAmount?.toFixed(2)
            }
          </span>
          <span className="font-extrabold">
            개를
          </span>
          {' '}
          <span className="text-yellow-600 text-lg font-extrabold">
            {
              krwAmount?.toLocaleString()
            }
          </span>
          <span className="font-extrabold">
            원에 구매하기를 원합니다.
          </span>

          <br />

          <span className="text-grey-6 font-extrabold">
            환율은 {rate}원 입니다.
          </span>

        </div>


        {/*  feed image fit    */}
        {/*
        <div className="self-stretch relative items-center justify-center">
          {feedImage && (
  
            <Image
              width={480}
              height={480}
              className="relative w-120 h-60"

              style={{
                //objectFit: "contain",
                objectFit: "cover",
                objectPosition: "center",
              }}

              alt=""
              src={
                feedImage
              }
            />
          )}
        </div>
        */}
        
       


      </div>

      {!frameDiv && (
        <div className="self-stretch hidden flex-col items-center justify-end gap-[12px] text-sm">
          <div className="self-stretch relative leading-[20px]">
            {cakeDescription}
          </div>
          {showRectangleIcon && (
            <img
              className="self-stretch relative max-w-full overflow-hidden h-60 shrink-0 object-cover"
              alt=""
              src="/usermain/figma/rectangle-641@2x.png"
            />
          )}
        </div>
      )}

      
      <div className=" self-stretch rounded-tl-none rounded-tr-3xl rounded-b-3xl bg-background flex flex-col items-center justify-start p-5 gap-[12px]">
        
        {!feedbackWriterId  ? (
          <>
      
          <div className="   self-stretch flex flex-col items-center justify-end gap-[8px] text-sm">
            <div className="self-stretch relative leading-[20px]">
              <p className="m-0">
                피드백이 없습니다.
              </p>
            </div>
            <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
              <Link href={`/usermain/feeds/${id}`}>
                더보기
              </Link>
            </div>
          </div>

        </>
        
        ) : (

          <>

        <div className="  self-stretch flex flex-row items-center justify-start gap-[8px]">
          
          {/*
          <img className="relative w-6 h-6" alt="" src="/usermain/images/avatar.svg" />
          */}
          
          <Image
            width={24}
            height={24}
            className="relative w-6 h-6 rounded-full"
            alt=""
            src={
              feedbackWriterAvatar && feedbackWriterAvatar !== undefined && feedbackWriterAvatar !== "undefined" && feedbackWriterAvatar !== "null" 
              ? feedbackWriterAvatar : "https://cryptoss.beauty/usermain/images/avatar.svg"

              ///"/usermain/images/avatar.svg"
            }
            style = {{ objectFit: 'cover' }}

            ///src="https://cryptoss.beauty/usermain/images/avatar.svg"
          />
          


          <img className="relative w-5 h-5" alt="" src="/usermain/images/annotation.svg" />
          
          <div className="flex-1 relative">
            <span className="font-extrabold">
              {
                feedbackWriterNickname === "undefined" ? (
                  //feedbackWriterName
                  "익명"
                ) : (
                  feedbackWriterNickname
                )
              }
            </span>
            <span> 영양사</span>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-center justify-end gap-[8px] text-sm">

            <div
              dangerouslySetInnerHTML={{ __html: shortFeedbackContent as any }}
              className="self-stretch relative leading-[20px] "
            
            />

          <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
            <Link href={`/usermain/feeds/${id}`}>
              더보기
            </Link>
          </div>
        </div>




          </>
        )}

      </div>
    

    </motion.div>

    </Link>


  );
};

export default ListFeed;
