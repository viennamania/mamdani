'use client';

import cn from '@/utils/class-names';
import TicketIcon from '@/components/icons/ticket';

import ShipWithContainer from '@/components/icons/ship-with-container';
import ShippingBox from '@/components/icons/shipping-box';
import CargoPallet from '@/components/icons/cargo-pallet';
import MoneyInHand from '@/components/icons/money-in-hand';
import Containers from '@/components/icons/containers';
import Truck from '@/components/icons/truck';

import Meter from '@/components/icons/meter';

import Notion from '@/components/icons/notion';
import Sales from '@/components/icons/sales';

import Plane from '@/components/icons/plane';

import UserInfo from '@/components/icons/user-info';


import MetricCard from '@/components/doingdoit/metric-card';

import TagIcon from '@/components/icons/tag';
import TagIcon2 from '@/components/icons/tag-2';
import TagIcon3 from '@/components/icons/tag-3';

import {
  PiTShirtFill,
  PiBowlFoodFill,
  PiAirplaneTakeoffFill,
  PiBasketballFill,
  PiBuildingsFill,
  PiTruckFill,
  PiBasketFill,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiArrowsClockwiseFill,
  PiAnchorFill,
  PiDatabase,
} from 'react-icons/pi';


import { useState, useEffect } from 'react';
import _, { set } from 'lodash';
import { u } from 'uploadthing/dist/types-e8f81bbc';



const ticketStats = [
  {
    id: 1,
    icon: <PiDatabase className="h-full w-full" />,
    title: '회원',
    subtitle1: '가입',
    subtitle2: '탈퇴',
    metric: '450',
    metric1: '450',
    metric2: '40',
    metric3: '2,440',
    metric4: '434',
  },
  {
    id: 2,
    icon: <PiDatabase className="h-full w-full" />,
    title: '구매주문',
    subtitle1: '구매주문등록',
    subtitle2: '구매주문 피드백',
    metric: '1,390',
    metric1: '190',
    metric2: '290',
    metric3: '2,390',
    metric4: '4,390',
  },
  {
    id: 3,
    icon: <PiDatabase className="h-full w-full" />,
    title: '자유게시판',
    subtitle1: '게시물등록',
    subtitle2: '댓글등록',
    metric: '2,890',
    metric1: '890',
    metric2: '423',
    metric3: '2,390',
    metric4: '4,390',
  },

];

export default function StatCards({ className }: { className?: string }) {



  const [summaryData, setSummaryData] = useState([

    {
      id: 1,
      icon: <PiDatabase className="h-full w-full" />,
      title: '회원',
      subtitle1: '가입',
      subtitle2: '탈퇴',
      metric: '0',
      metric1: '0',
      metric2: '0',
      metric3: '0',
      metric4: '0',
    },
    {
      id: 2,
      icon: <PiDatabase className="h-full w-full" />,
      title: '구매주문',
      subtitle1: '구매주문등록',
      subtitle2: '구매주문 피드백',
      metric: '0',
      metric1: '0',
      metric2: '0',
      metric3: '0',
      metric4: '0',
    },
    {
      id: 3,
      icon: <PiDatabase className="h-full w-full" />,
      title: '자유게시판',
      subtitle1: '게시물등록',
      subtitle2: '댓글등록',
      metric: '0',
      metric1: '0',
      metric2: '0',
      metric3: '0',
      metric4: '0',
    },




  ]);


  const [userSummaryData, setUserSummaryData] = useState(null);
  const [feedSummaryData, setFeedSummaryData] = useState(null);
  const [boardSummaryData, setBoardSummaryData] = useState(null);


  
  useEffect(() => {
    const fetchUserSummaryData = async () => {
      // 1. Fetch data from the API (POST)
      try {
        const response = await fetch('/api/doingdoit/user/getStatisticsSummary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        const data = await response.json() as any;
        
        //console.log('data====>', data);

        const _userSummaryData = {
          id: 1,
          icon: <PiDatabase className="h-full w-full" />,
          title: '회원',
          subtitle1: '가입',
          subtitle2: '탈퇴',
          metric: 0,
          metric1: data?.data?.todayUserCount,
          metric2: data?.data?.todayWithdrawUserCount,
          metric3: data?.data?.totalUserCount,
          metric4: data?.data?.totalWithdrawUserCount,
        } as any;


        // 2. Set the data to the state
        setUserSummaryData(_userSummaryData);


        // update 0 elelment of summaryData
        setSummaryData((prev) => {
          return prev.map((item, index) => {
            if (index === 0) {
              return _userSummaryData;
            }
            return item;
          });
        } );

    } catch (error) {
      console.log('Error fetching user summary data:', error);
    }


    };
    fetchUserSummaryData();
  }, []);




  useEffect(() => {

    const fetchFeedSummaryData = async () => {
      // 1. Fetch data from the API (POST)
      const response = await fetch('/api/doingdoit/feed/getStatisticsSummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const data = await response.json() as any;
      
      console.log('data====>', data);

      // 2. Set the data to the state
      //setUserSummaryData(data?.data);

      const _feedSummaryData = {
        id: 2,
        icon: <PiDatabase className="h-full w-full" />,
        title: '구매주문',
        subtitle1: '구매주문등록',
        subtitle2: '구매주문 피드백',
        metric: 0,
        metric1: data?.data?.todayFeedCount,
        metric2: data?.data?.todayFeedbackCount,
        metric3: data?.data?.totalFeedCount,
        metric4: data?.data?.totalFeedbackCount,
      } as any;
        
      setFeedSummaryData(_feedSummaryData);

      // update 1 elelment of summaryData

      setSummaryData((prev) => {
        return prev.map((item, index) => {
          if (index === 1) {
            return _feedSummaryData;
          }
          return item;
        });
      } );

    }

    fetchFeedSummaryData();

  } , []);




  useEffect(() => {

    const fetchBoardSummaryData = async () => {
      // 1. Fetch data from the API (POST)
      const response = await fetch('/api/doingdoit/board/getStatisticsSummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const data = await response.json() as any;
      
      ////console.log('data====>', data);

      // 2. Set the data to the state
      //setUserSummaryData(data?.data);

      const _boardSummaryData = {
        id: 3,
        icon: <PiDatabase className="h-full w-full" />,
        title: '자유게시판',
        subtitle1: '게시물등록',
        subtitle2: '댓글등록',
        metric: 0,
        metric1: data?.data?.todayBoardCount,
        metric2: data?.data?.todayCommentCount,
        metric3: data?.data?.totalBoardCount,
        metric4: data?.data?.totalCommentCount,
      } as any;
        
      setBoardSummaryData(_boardSummaryData);

      ///summaryData[2] = _boardSummaryData;

      // update 2 elelment of summaryData

      setSummaryData((prev) => {
        return prev.map((item, index) => {
          if (index === 2) {
            return _boardSummaryData;
          }
          return item;
        });
      } );

      

    }

    fetchBoardSummaryData();

  } , []);




  return (
    <div
      className={cn('grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9', className)}
    >
      {summaryData && summaryData.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center space-y-3">
            <TicketIcon className="w-16 h-16 text-gray-400" />
            <p className="text-gray-400 text-lg font-medium">Loading...</p>
          </div>
        </div>
      ) : (
        summaryData.map((stat) => (
          <MetricCard
            key={stat?.title + stat?.id}
            title={stat?.title}
            subtitle1={stat?.subtitle1}
            subtitle2={stat?.subtitle2}
            metric={stat?.metric}
            metric1={stat?.metric1}
            metric2={stat?.metric2}
            metric3={stat?.metric3}
            metric4={stat?.metric4}
            icon={stat?.icon}
            //iconClassName="bg-transparent w-11 h-11"
            titleClassName=' font-bold text-black '
          />
        ))
      )}
      

    </div>
  );
}
