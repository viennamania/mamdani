'use client';

import { routes } from '@/config/routes';

import Form from '@/app/shared-doingdoit/board/board-form';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { data } from '@/data/doingdoit/feed/data';
import { useEffect, useState } from 'react';

import Link from "next/link";

import { motion } from "framer-motion";

import Image from 'next/image';

import { PiArrowUp, PiDownloadSimpleBold, PiList, PiRecordLight, } from 'react-icons/pi';

/*
export const metadata = {
  ...metaObject('게시글 상세보기'),
};
*/

const pageHeader = {
  title: '게시글 상세보기',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      name: '자유게시판',
    },
    {
      href: routes.board.index,
      name: '게시글 관리',
    },
    {
      name: '게시글 상세보기',
    },
  ],
};




export default function Page({
  params,
}: {
  params: any;
}) {

  const id =  params?.id;

  const [item, setItem] = useState<any>(null);

  const [loading, setLoading] = useState(false);


  // when scroll to bottom, show the button 
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const top = document.documentElement.scrollTop;
      if (top > 100) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);


  /*
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch('/api/doingdoit/feed/getFeedById?_id=' + id);
  
      const json  = await res?.json() as any;
  
      console.log("FeedPage data=", json.data);
  
      setItem(json.data);


  
      setLoading(false);
  
    };
      
      fetchData();
  } ,[ id, ]);
  */



  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>






        

        <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            onClick={
              () =>
              //router.push(routes.feed.index)
              
              //router.back()

              //history.back()

              window.history.back()

            }
          >
            <PiList className="me-2 h-4 w-4" />
            {'목록'}
          </button>



      </PageHeader>

      {loading && (
        <div className="flex justify-center items-center h-96">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      )}

      
      <div className="@container">

        <Form id={id}/>


      </div>
      
      {/* when scroll to bottom, show the button */}


      

      {/* float buttom right absolute position stikcy for scroll to top */}

      {isShow && (

        <div className=" z-100 h-screen  flex flex-col items-center justify-end gap-[40px] text-grey-6 fixed bottom-0 right-0 mr-10 mb-10">
                
        {/* auto replay bouncing animation using motion.div */}

        {/*
        <motion.div
          className="box"
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
         
          <button
            className="w-16 h-16"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            }}
          >
          <PiArrowUp className="w-16 h-16" />
          </button>
          
        </motion.div>

        */}

        </div>
  
      )}

      
    </>
  );


}
