'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Bread from "@/components-figma/bread";
import Footer from "@/components-figma/footer";


import Link from "next/link";
import ListDietBar1 from "@/components-figma/list-diet-bar1";
import ListDietBar2 from "@/components-figma/list-diet-bar2";


import { useState, useEffect, use, type ReactNode } from "react";

import { useAnimation, motion } from "framer-motion";

import DateCell from '@/components/ui/date-cell';
import { u } from "uploadthing/dist/types-e8f81bbc";

import Image from "next/image";

import { useSession } from 'next-auth/react';
import { set } from "lodash";
import toast from "react-hot-toast";


import { Popover } from '@/components/ui/popover';

import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared-doingdoit/delete-popover-user';
import { setUser } from "@/lib/api/user";

import { ActionIcon } from '@/components/ui/action-icon';


import { useRouter, useSearchParams } from "next/navigation";
import { it } from "node:test";


export type TradeDetailsTypes = {
  id: string;
};

type TradeChatMessage = {
  id: string;
  role: 'system' | 'buyer' | 'seller';
  time?: string;
  author?: string;
  content: ReactNode;
};


export default function TradeDetails({
  id,
}: React.PropsWithChildren<TradeDetailsTypes>) {


  console.log('TradeDetails id: ', id);


  const [feed, setFeed] = useState(   {   } as any);

  const [loading, setLoading] = useState(true);


  const router = useRouter();



  const { data: session, status } = useSession();

  /* fetch user data from an API
  /api/doingdoit/user/getUser
  */
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    nickname: "",
    avatar: "",
    stabilityId: "",
  });

  const [loadingUserData, setLoadingUserData] = useState(

    session?.user?.email ? true : false

  );

  useEffect(() => {

    const fetchData = async () => {



      setLoadingUserData(true);

      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      /////////console.log(json);

      const data = json as any;
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }

      setLoadingUserData(false);
    };

    fetchData();

  } , [session?.user?.email]);







  const [userNickname, setUserNickname] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [mealDate, setMealDate] = useState(new Date());

  const [mealFood, setMealFood] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [mealAmount, setMealAmount] = useState(0);
  const [mealSpeed, setMealSpeed] = useState(0);
  const [feedTitle, setFeedTitle] = useState("");
  const [feedContent, setFeedContent] = useState("");

  // image array
  const [feedImages, setFeedImages] = useState([]);

  const [feedbackYn, setFeedbackYn] = useState('');

  const [feedbackWriterId, setFeedbackWriterId] = useState("");
  const [feedbackWriterNickname, setFeedbackWriterNickname] = useState("");
  const [feedbackWriterName, setFeedbackWriterName] = useState("");
  const [feedbackWriterAvatar, setFeedbackWriterAvatar] = useState("");
  const [feddbackWriterEmail, setFeddbackWriterEmail] = useState("");
  const [feedbackContent, setFeedbackContent] = useState("");


  const [ mainImage, setMainImage ] = useState(null);

  const [likeCount, setLikeCount] = useState(0);
  const [scrapCount, setScrapCount] = useState(0);

  const [commentCount, setCommentCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
 

  const [likeYn, setLikeYn] = useState(false);
  const [scrapYn, setScrapYn] = useState(false);


  const [userId, setUserId] = useState("");


  useEffect(() => {

    const fetchData = async () => {


      if ( loadingUserData ) {
        return;
      }


      setLoading(true);

      const res = await fetch(`/api/oneclick/order/getOneBuyOrderByTradeId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tradeId: id,
          stabilityId: userData?.stabilityId
        }),
      });
  
      const json  = await res?.json() as any;
  
      ///console.log("FeedPage getOneBuyOrderByTradeId json=", json);
      /*
      {
      result: {
        _id: '69214732ae5826503eca47ed',
        chain: 'bsc',
        lang: null,
        walletAddress: '0xc20d40F1963a8a6389a4Ac6D176c2A5f7Fb042F6',
        nickname: 'partner_koko0',
        mobile: '+821012345678',
        avatar: null,
        userType: '',
        userStats: {
          totalPaymentConfirmedCount: 29,
          totalPaymentConfirmedKrwAmount: 82000000,
          totalPaymentConfirmedUsdtAmount: 54833.83
        },
        usdtAmount: 1986.75,
        krwAmount: 3000000,
        rate: 1510,
        createdAt: '2025-11-22T05:16:34.920Z',
        
        status: 'paymentConfirmed', // paymentRequested(결제요청), paymentConfirmed(결제완료)

        privateSale: false,
        buyer: {
          depositBankName: '농협',
          depositBankAccountNumber: '61581056078003',
          depositName: '송지원'
        },
        paymentMethod: 'bank',
        tradeId: '17486015',
        escrowWallet: {
          address: '0x8280Ba85F0E57b02594eaB62a99281b04F9a0170',
          privateKey: '0xe95c788bf5afecb6a635dc969f7f8604203a300091ea551935dfcfc96095d43c'
        },
        audioOn: true,
        returnUrl: '',
        acceptedAt: '2025-11-22T05:16:37.894Z',
        seller: {
          walletAddress: '0x00A6842aEDc1a3BB22d82467d60d9eef3dE63BD6',
          nickname: 'seller',
          avatar: '',
          mobile: '+82',
          memo: '카카오뱅크 111111111111111 지코인',
          bankInfo: [Object]
        },
        api: '/api/order/buyOrderRequestPayment',
        payactionResult: { status: 'success', response: [Object] },
        escrowTransactionHash: null,
        
        paymentRequestedAt: '2025-11-22T05:16:41.468Z',
        paymentAmount: 3000000,

        autoConfirmPayment: true,
        escrowTransactionConfirmedAt: '2025-11-22T05:18:14.852Z',
        

        
        paymentConfirmedAt: '2025-11-22T05:18:14.852Z',

        queueId: 'd20043aa-6c19-4177-b2cd-da86e81aeb1a',
        sellerWalletAddressBalance: 6977.503491199988,
        transactionHash: '0xcbd70198062e5c58ad334e4df22abc29f1f0990d87e80fed2302c7f34982e457',
        settlement: {
          txid: '0xfb8f3b8f1cbd7fb01f054441baccc3aa938edc75bdb8576c009ecd7c35060798',
          krwRate: 1510,
          paymentAmount: 3000000,
          settlementWalletAddress: '0xc69E592FF923115cCFa41c6ca9605EaA65afa8D5',
          settlementAmount: 1974.83,
          settlementAmountKRW: '2981993',
          settlementWalletBalance: 1017.859,
          feeWalletAddress: '0xB720B00949d2fa980f52A7631580a55b08A6dF97',
          feePercent: 0.6,
          feeAmount: 11.92,
          feeAmountKRW: 17999.2,
          agentWalletAddress: '',
          agentFeePercent: 0,
          agentFeeAmount: 0,
          agentFeeAmountKRW: '0',
          status: 'paymentSettled',
          createdAt: '2025-11-22T05:18:59.482Z'
        }
      }
    }
          */
  
      setFeed(json.result || {});

      /*
      setUserId(json.data.userId);

      setUserNickname(json.data.nickname);
      

      if (json.data.avatar == 'undefined' || json.data.avatar == undefined) {
        
        //setUserAvatar("/usermain/images/avatar.svg");
        setUserAvatar("https://cryptoss.beauty/usermain/images/avatar.svg")

      } else {
        setUserAvatar(json.data.avatar);
      }

      setMealDate(json.data.mealDate);

      setMealFood(json.data.mealFood);
      setMealTime(json.data.mealTime);
      setMealAmount(json.data.mealAmount);
      setMealSpeed(json.data.mealSpeed);
      setFeedTitle(json.data.feedTitle);
      setFeedContent(json.data.feedContent);

      console.log("FeedPage image1=", json.data.image1);

      const images = [] as any;
      images.push(json.data.image1);
      images.push(json.data.image2);
      images.push(json.data.image3);
      images.push(json.data.image4);
      images.push(json.data.image5);
      images.push(json.data.image6);
      images.push(json.data.image7);
      images.push(json.data.image8);
      images.push(json.data.image9);
      images.push(json.data.image10);

      setFeedImages(images);

      setMainImage(json.data.image1);
      

      setFeedbackYn(json.data.feedbackYn);

      setFeedbackWriterId(json.data.feedbackWriterId);
      
      setFeedbackWriterNickname(
        json.data.feedbackWriterNickname == 'undefined' || json.data.feedbackWriterNickname == undefined ?
        "익명" : json.data.feedbackWriterNickname
      );


      setFeedbackWriterName(json.data.feedbackWriterName);
      
      setFeedbackWriterAvatar(
        
        json.data.feedbackWriterAvatar == 'undefined' || json.data.feedbackWriterAvatar == undefined ?
        "https://cryptoss.beauty/usermain/images/avatar.svg" : json.data.feedbackWriterAvatar
      
        );


      setFeddbackWriterEmail(json.data.feddbackWriterEmail);
      setFeedbackContent(json.data.feedbackContent);


      setLikeCount(json.data.likeCount || 0);
      setScrapCount(json.data.scrapCount || 0);
      /////setCommentCount(json.data.commentCount || 0);
      setViewCount(json.data.viewCount || 0);
      setScrapCount(json.data.scrapCount || 0);

      setLikeYn(json.data.likeYn || false);

      setScrapYn(json.data.scrapYn || false);
      */

      // setFeedTitle
      // 구매자 {nickname}님께서 {usdtAmount} USDT를 {krwAmount} 원에 구매하기를 원합니다.
      setFeedTitle(
        `구매자 ${json.result?.buyer?.depositName}님께서 ${json.result?.usdtAmount} USDT를 ${json.result?.krwAmount} 원에 구매하기를 원합니다.`
      );


      setFeedbackYn(
        json.result?.seller ? 'Y' : 'N'
      );

      setFeedbackWriterNickname(
        json.result?.seller?.nickname || ""
      );


  
      setLoading(false);
  
    };
      
    fetchData();

  } ,[ id, loadingUserData, userData?.stabilityId ]);




  const [ mealFoodArray, setMealFoodArray ] = useState<any[]>([]);

  useEffect(() => {
      
      if (mealFood === undefined) {
        //setMealFoodArray([{foodName: "삼겹살"}, {foodName: "소고기"}]);
      } else if ( !Array.isArray(mealFood) ) {
        //setMealFoodArray([{foodName: "삼겹살"}, {foodName: "소고기"}]);
      } else {

        setMealFoodArray([]);

        mealFood?.map((item , index) => (
          
          /////setMealFoodArray(mealFoodArray => [...mealFoodArray, item?.foodName])

          setMealFoodArray(mealFoodArray => [...mealFoodArray, item])
  
        ))

      }

    }
  , [mealFood]);

  

  const scrap = async () => {

    //setLikeCount(likeCount + 1);

    // update my like list
    const res = await fetch(`/api/doingdoit/feed/scrap?_id=${id}&_userId=${userData?.id}&_userNickname=${userData?.nickname}&_userAvatar=${userData?.avatar}&_userEmail=${userData?.email}`);

    // toast message
    //alert("스크랩 되었습니다.");
    setScrapYn(true);
    setScrapCount(scrapCount + 1);

    toast.success("스크랩 되었습니다.");

  }

  const unscrap = async () => {
      
      // update my like list
      const res = await fetch(`/api/doingdoit/feed/unscrap?_id=${id}&_userId=${userData?.id}&_userNickname=${userData?.nickname}&_userAvatar=${userData?.avatar}&_userEmail=${userData?.email}`);
  
      // toast message
      //alert("스크랩이 취소되었습니다.");

      setScrapYn(false);
      setScrapCount(scrapCount - 1);

      toast.success("스크랩이 취소되었습니다.");
  
  }

  


  const like = async () => {

    ///setLikeCount(likeCount + 1);

    // update my like list
    const res =  await fetch(`/api/doingdoit/feed/like?_id=${id}&_userId=${userData?.id}&_userNickname=${userData?.nickname}&_userAvatar=${userData?.avatar}&_userEmail=${userData?.email}`);

    setLikeYn(true);
    setLikeCount(likeCount + 1);

    toast.success("좋아요 되었습니다.");
  }


  const unlike = async () => {

    // update my like list
    const res = await fetch(`/api/doingdoit/feed/unlike?_id=${id}&_userId=${userData?.id}&_userNickname=${userData?.nickname}&_userAvatar=${userData?.avatar}&_userEmail=${userData?.email}`);

    setLikeYn(false);
    setLikeCount(likeCount - 1);

    toast.success("좋아요가 취소되었습니다.");
  }



 


  const formatDateTime = (dateValue?: string) => {
    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return `${date.getFullYear()}.${`0${date.getMonth() + 1}`.slice(-2)}.${`0${date.getDate()}`.slice(-2)} ${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}:${`0${date.getSeconds()}`.slice(-2)}`;
  };

  const formatTime = (dateValue?: string) => {
    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return `${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}:${`0${date.getSeconds()}`.slice(-2)}`;
  };

  const formatKrw = (amount?: number) => {
    if (typeof amount !== "number" || Number.isNaN(amount)) {
      return "0";
    }

    return amount.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
  };

  const formatUsdt = (amount?: number) => {
    if (typeof amount !== "number" || Number.isNaN(amount)) {
      return "0.000";
    }

    return amount.toLocaleString("ko-KR", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  };

  const maskName = (name?: string) => {
    if (!name) {
      return "고객";
    }

    return `${name.slice(0, 1)}**`;
  };

  const maskAccountNumber = (accountNumber?: string) => {
    if (!accountNumber) {
      return "계좌 미등록";
    }

    return `${accountNumber.slice(0, 4)}****`;
  };

  const maskWalletAddress = (walletAddress?: string) => {
    if (!walletAddress) {
      return "지갑주소 없음";
    }

    return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  };

  const copyToClipboard = (value?: string, message = "복사되었습니다.") => {
    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value);
    toast.success(message);
  };

  const buyerMaskedName = maskName(feed?.buyer?.depositName);
  const sellerDisplayName = feed?.seller?.nickname || "판매자";

  const statusTextMap: Record<string, string> = {
    paymentRequested: "결제 요청",
    paymentConfirmed: "결제 완료",
    paymentSettled: "정산 완료",
  };

  const tradeChatMessages: TradeChatMessage[] = [];

  if (feed?.createdAt) {
    tradeChatMessages.push({
      id: "created-system",
      role: "system",
      time: formatDateTime(feed?.createdAt),
      content: `주문 ${feed?.tradeId || "-"}이 생성되었습니다.`,
    });

    tradeChatMessages.push({
      id: "created-buyer",
      role: "buyer",
      author: `구매자 ${buyerMaskedName}`,
      time: formatTime(feed?.createdAt),
      content: `${formatUsdt(feed?.usdtAmount)} USDT를 ${formatKrw(feed?.krwAmount)}원에 구매 신청했습니다.`,
    });
  }

  if (feed?.acceptedAt) {
    tradeChatMessages.push({
      id: "accepted-system",
      role: "system",
      time: formatDateTime(feed?.acceptedAt),
      content: "시스템이 주문을 접수하고 판매자에게 알렸습니다.",
    });
  }

  if (feed?.paymentRequestedAt) {
    tradeChatMessages.push({
      id: "payment-requested-seller",
      role: "seller",
      author: `판매자 ${sellerDisplayName}`,
      time: formatTime(feed?.paymentRequestedAt),
      content: (
        <div className="flex flex-col gap-1">
          <span>{`${formatKrw(feed?.krwAmount)}원 입금을 요청드립니다.`}</span>
          <span className="text-[11px] xl:text-xs text-[#1f5132]">
            계좌: {feed?.seller?.bankInfo?.bankName || "은행 미등록"}{" "}
            {maskAccountNumber(feed?.seller?.bankInfo?.accountNumber)}{" "}
            {maskName(feed?.seller?.bankInfo?.accountHolder)}
          </span>
        </div>
      ),
    });
  }

  if (feed?.paymentConfirmedAt) {
    tradeChatMessages.push({
      id: "payment-confirmed-buyer",
      role: "buyer",
      author: `구매자 ${buyerMaskedName}`,
      time: formatTime(feed?.paymentConfirmedAt),
      content: `${formatKrw(feed?.krwAmount)}원 이체를 완료했습니다. 확인 부탁드려요.`,
    });
  }

  if (feed?.escrowTransactionConfirmedAt) {
    tradeChatMessages.push({
      id: "escrow-confirmed-system",
      role: "system",
      time: formatDateTime(feed?.escrowTransactionConfirmedAt),
      content: "시스템이 입금 상태를 확인했습니다.",
    });
  }

  if (feed?.settlement?.createdAt) {
    tradeChatMessages.push({
      id: "settled-seller",
      role: "seller",
      author: `판매자 ${sellerDisplayName}`,
      time: formatTime(feed?.settlement?.createdAt),
      content: (
        <div className="flex flex-col gap-1">
          <span>{`${formatUsdt(feed?.usdtAmount)} USDT 전송을 완료했습니다.`}</span>
          <div className="text-[11px] xl:text-xs text-[#1f5132]">
            구매자 지갑:{" "}
            <button
              type="button"
              onClick={() =>
                copyToClipboard(feed?.walletAddress, "구매자 지갑주소가 복사되었습니다.")
              }
              className="underline underline-offset-2"
            >
              {maskWalletAddress(feed?.walletAddress)}
            </button>
          </div>
        </div>
      ),
    });
  }

  if (feed?.transactionHash) {
    tradeChatMessages.push({
      id: "tx-system",
      role: "system",
      content: (
        <a
          href={`https://bscscan.com/tx/${feed?.transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          거래내역 보기 ({feed?.transactionHash?.slice(0, 8)}...
          {feed?.transactionHash?.slice(-8)})
        </a>
      ),
    });
  }

  if (feed?.status) {
    tradeChatMessages.push({
      id: "status-system",
      role: "system",
      content: `현재 주문 상태: ${statusTextMap[feed?.status] || feed?.status}`,
    });
  }

  return (

    <div className=" mt-0 w-full max-w-[1294px]  ">


        <div className="self-stretch flex flex-col items-center justify-start gap-[20px] z-[1]">

            { loading ? (

            <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
                
                <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

                </div>
            </div>

            ) : (
            <div className=" self-stretch flex flex-col items-start justify-start gap-[20px]
            bg-background-light p-6 rounded-lg
            ">

                <div className=" 
                    self-stretch flex flex-col items-center justify-end gap-[20px] z-[1]">


                    <div className="
                    self-stretch flex flex-col items-center justify-end gap-[20px]">



                        <div className="self-stretch flex flex-col items-start justify-start gap-[8px] ">

                            {/* 주문번호 */}
                            <div className="flex flex-row items-center justify-start gap-[4px]">
                            <span className="font-normal text-grey-6 flex  ">
                                주문번호:
                            </span>
                            <div className="flex flex-row items-center justify-center gap-2 ">
                                <span className="font-extrabold flex  ">
                                {feed?.tradeId || ''}
                                </span>
                                {/* copy button */}
                                <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(feed?.tradeId || '');

                                    toast.success("주문번호가 복사되었습니다.");
                                }}
                                >
                                <Image
                                    className="relative w-4 h-4 overflow-hidden shrink-0"
                                    src="/usermain/images/icon-copy.png"
                                    alt=""
                                    width={16}
                                    height={16}
                                    style = {{ objectFit: 'cover' }}
                                />
                                </button>
                            </div>
                            </div>

                            {/* 작성일시 */}
                            <div className="flex flex-row items-center justify-start gap-[4px]">
                            <span className="font-normal text-grey-6 flex  ">
                                작성일시:
                            </span>
                            <span className="font-extrabold flex  ">
                                <DateCell
                                date={feed?.createdAt as Date}
                                className=""
                                timeClassName=""
                                dateClassName=""
                                dateFormat="YYYY. MM. DD"
                                timeFormat="HH:mm"
                                />
                            </span>
                            </div>
                        

                            <div className="self-stretch flex flex-row items-center justify-start gap-[8px] ">

                            <Image
                                className="relative w-6 h-6 rounded-full "
                                src='/usermain/images/icon-user.png'
                                alt=""
                                width={24}
                                height={24}
                                style = {{ objectFit: 'cover' }}
                            />

                            <div className="flex flex-row items-center justify-start gap-2 ">
                            
                                <span className="font-extrabold flex  ">
                                {feed?.nickname?.length > 5 ?
                                    feed?.nickname?.slice(0, 5) + '...' :
                                    feed?.nickname
                                }
                                </span>

                                <span className="font-normal text-grey-6 flex ">
                                ({feed?.buyer?.depositName?.slice(0,1) + '**' }) 님의 구매주문
                                </span>
                                

                            </div>

                            </div>

                
                            {/*
                            <span className="block  xl:hidden  text-grey-9">
                            <DateCell
                                date={mealDate as Date}
                                className=""
                                timeClassName=""
                                dateClassName=""
                                dateFormat="YYYY. MM. DD"
                                timeFormat="HH:mm"
                            />
                            </span>
                            */}

                        </div>


                    </div>


                    <div className="self-stretch relative h-px">

                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
                    </div>

                </div>

                <div className="self-stretch rounded-[24px] border border-[#dbe5f1] bg-white p-5 xl:p-6 z-[3]">

                    <div className="self-stretch flex flex-row items-center justify-between gap-3">
                        <div className="relative font-extrabold text-xl text-[#1f2937]">
                            판매 처리내역
                        </div>
                        <span className="rounded-full bg-[#eef5ff] px-3 py-1 text-[11px] xl:text-xs font-semibold text-[#355487]">
                            시스템 / 구매자 / 판매자
                        </span>
                    </div>

                    <div className="mt-2 text-[11px] xl:text-xs text-[#64748b]">
                        주문 진행 상황을 채팅 형식으로 확인할 수 있어요.
                    </div>

                    <div className="mt-4 rounded-2xl border border-[#d9e6f7] bg-gradient-to-b from-[#fbfdff] via-[#f4f8ff] to-[#eef4ff] p-3 xl:p-4">
                        <div className="flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-1">
                            {tradeChatMessages.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-[#c8d7ea] bg-white px-4 py-6 text-center text-xs xl:text-sm text-[#64748b]">
                                    아직 표시할 판매 처리내역이 없습니다.
                                </div>
                            ) : (
                                tradeChatMessages.map((message) => {
                                    if (message.role === "system") {
                                        return (
                                            <div
                                                key={message.id}
                                                className="w-full flex flex-row items-center justify-center"
                                            >
                                                <div className="max-w-[96%] rounded-full border border-[#d8e2ee] bg-[#f8fafc] px-3 py-1 text-[11px] xl:text-xs text-[#475569]">
                                                    {message.time ? (
                                                        <span className="font-semibold">{message.time} · </span>
                                                    ) : null}
                                                    <span>{message.content}</span>
                                                </div>
                                            </div>
                                        );
                                    }

                                    const isSeller = message.role === "seller";

                                    return (
                                        <div
                                            key={message.id}
                                            className={`w-full flex ${isSeller ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className={`max-w-[92%] flex flex-col gap-1 ${isSeller ? "items-end" : "items-start"}`}>
                                                <div className={`flex items-center gap-2 text-[11px] xl:text-xs text-[#64748b] ${isSeller ? "flex-row-reverse" : ""}`}>
                                                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${isSeller ? "bg-[#daf4e2] text-[#14532d]" : "bg-[#dbeafe] text-[#1d4ed8]"}`}>
                                                        {isSeller ? "판" : "구"}
                                                    </span>
                                                    <span className="font-semibold text-[#334155]">{message.author}</span>
                                                    {message.time ? <span>{message.time}</span> : null}
                                                </div>

                                                <div
                                                    className={`rounded-2xl border px-3 py-2 text-xs xl:text-sm leading-5 ${
                                                        isSeller
                                                            ? "rounded-tr-sm border-[#b8e3c6] bg-[#e9f9ed] text-[#14532d]"
                                                            : "rounded-tl-sm border-[#bfd5ff] bg-[#eaf2ff] text-[#1e3a8a]"
                                                    }`}
                                                >
                                                    {message.content}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                </div>



                <div className="self-stretch rounded-tl-none rounded-tr-3xl rounded-b-3xl bg-background flex flex-col items-center justify-end p-5 gap-[12px] z-[3] text-xl">
                    
                    <div className="self-stretch relative font-extrabold">
                    판매자의 피드백
                    </div>

                    {feedbackYn && feedbackYn == 'Y' ? (

                    <>
                    <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-xs">


                    
                    <Image
                        className="relative w-6 h-6 rounded-full"
                        src='/usermain/images/icon-seller.png'
                        alt=""
                        width={50}
                        height={50}
                        style = {{ objectFit: 'cover' }}
                    />

                    <img className="relative w-5 h-5" alt="" src="/usermain/images/annotation.svg" />
                    
                    <div className="flex flex-col items-start justify-center gap-0">
                        <span className="font-extrabold">
                        {feed?.seller?.nickname}
                        </span>
                        <span className="text-grey-6">
                        {feed?.seller?.walletAddress.slice(0, 6)}...{feed?.seller?.walletAddress.slice(-4)}
                        </span>
                    </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-end gap-[8px] text-sm">
                    <div className="self-stretch relative leading-[20px]">

                        {/*
                        <p className="m-0">
                        소고기는 100 g안에 199칼로리가 있습니다.
                        </p>
                        <p className="m-0">
                        칼로리 분석: 47% 지방, 0% 탄수화물, 53% 단백질….
                        </p>
                        */}

                        {/* html 태그가 포함된 문자열을 출력할 때는 dangerouslySetInnerHTML 사용 */}
                        <div dangerouslySetInnerHTML={{ __html: feedbackContent as any }} />

                    </div>
                    {/*
                    <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
                        – 관리자에서 영양사, 관리자가 피드백 함.
                    </div>
                    */}
                    </div>
                    </>

                    ) : (

                    <>
                    {/* 피드백이 없는 경우 */}
                    <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
                    – 판매자가 피드백을 남기지 않았습니다.
                    </div>
                    

                    </>

                    )}


                </div>

                {/*
                <div className="my-0 mx-[!important] absolute top-[137px] left-[859px] rounded-xl bg-white shadow-[4px_4px_20px_rgba(0,_0,_0,_0.1)] flex flex-col items-center justify-center p-5 gap-[20px] z-[4] text-sm border-[1px] border-solid border-grey-e">
                    <div className="relative">수정하기</div>
                    <div className="relative">삭제하기</div>
                </div>
                */}

            </div>

            )}

        </div>



    </div>

  );
};
