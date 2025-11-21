///'use client';

import { routes } from '@/config/routes';


//import { data } from '@/data/doingdoit/board/data';



import { getColumns } from '@/app/shared-doingdoit/board/columns';



import BoardTableWidget from '@/components/doingdoit/board-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiHourglass } from 'react-icons/pi';

//import { useEffect, useState } from 'react';

import { u } from 'uploadthing/dist/types-e8f81bbc';





export const metadata = {
  ...metaObject('게시글 관리'),
};


const pageHeader = {
  title: '게시글 관리',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.board.index,
      name: '자유게시판',
    },
    {
      name: '게시글 관리',
    },
  ],
};


/*
  {
    id: '3413',
    name: '모히또',
    email: 'august17@naver.com',
    regType: '이메일',
    mobile: '010-3223-3223',
    gender: '여',
    weight: '86',
    height: '173',
    adminType: '영양사',
    mealTime: '아침',

    scrapCount: 23,
    likeCount: 11,
    commentCount: 54,
    viewCount: 123,

    feedbackYn: '미답변',

    feedbackWriter: '김범수',

    title: '안녕하세요. 오늘 날씨가 무척 좋네요. 오늘은 무엇을 드셨나요?',

    tags: ['태그1', '태그2', '태그3'],

    content: '오늘처럼 날씨가 좋을때 밥을 많이 먹습니다. 오늘처럼 날씨가 좋을때 밥을 많이 먹습니다. 오늘처럼 날씨가 좋을때 밥을 많이 먹습니다. 오늘처럼 날씨가 좋을때 밥을 많이 먹습니다. 오늘처럼 날씨가 좋을때 밥을 많이 먹습니다. 오늘처럼 날씨가 좋을때 밥을 많이 먹습니다.', 


    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp',
    items: 83,
    price: '457.00',
    status: 'Cancelled',
    createdAt: '2023-08-06T00:01:51.735Z',
    updatedAt: '2023-08-10T22:39:21.113Z',
    products: [
      {
        id: '0o02051402',
        name: 'Tasty Metal Shirt',
        category: 'Shoes',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
        price: '410.00',
        quantity: 2,
      },
      {
        id: '0o17477064',
        name: 'Modern Cotton Gloves',
        category: 'Watch',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp',
        price: '342.00',
        quantity: 3,
      },
      {
        id: '0o02374305',
        name: 'Rustic Steel Computer',
        category: 'Shoes',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp',
        price: '948.00',
        quantity: 1,
      },
    ],
  }
*/




export default function SearchTablePage() {

  //console.log(data);


  /*
  const [data, setData] = useState([]);
  const [isLoading, setIsLading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/doingdoit/board');

      const posts  = await res?.json() as any;

      
      const data = posts.data.map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          content: item.content,
          tags: item.tags,
          writer: item.writer,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          viewCount: item.viewCount,
          commentCount: item.commentCount,
          likeCount: item.likeCount,
          scrapCount: item.scrapCount,
          feedbackYn: item.feedbackYn,
          feedbackWriter: item.feedbackWriter,
        }

      } );
      
      ///console.log(posts.data);

      setData(posts.data);

      setIsLading(false);

    };

    fetchData();
  }
  ,[]);
  */

  return (
    
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      fileName=""
      
      //header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >

      <BoardTableWidget
        title=""
        variant="minimal"
        ////////////data={data}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="닉네임, 제목, 태그"

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        sticky
        scroll={{ x: 500, }}
      />

    </TableLayout>

  );
}
