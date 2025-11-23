'use client';

import { routes } from '@/config/routes';



///import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns';

import { getColumns } from '@/app/shared-doingdoit/feed/stats-columns';

import FeedStatsTableWidget from '@/components/doingdoit/feed-stats-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';

import { useSession, signIn, signOut } from 'next-auth/react';

/*
export const metadata = {
  ...metaObject('구매주문 통계'),
};
*/

const pageHeader = {
  title: '구매주문 통계',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.feed.index,
      name: '구매주문',
    },
    {
      name: '구매주문 통계',
    },
  ],
};


export default function SearchTablePage() {

  const { data: session, status } = useSession();
  if (
    session?.user?.email &&
    !session?.user?.email.includes ('@cryptoss.beauty')
  ) {
    signOut(
      {
        callbackUrl: '/signin',
      }
    );

    return <></>
  }

  if (status !== 'loading' && !session) {
    window.location.href = '/signin';
    return <></>
  }

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      
      //fileName="feed_stats_data"

      fileName=''


      //header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >

      {/*
      <div className='mb-5 w-full flex flex-row items-center justify-end'>
        <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
          <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
          엑셀다운로드
        </Button>
      </div>
    */}





      
        <FeedStatsTableWidget
          title=""
          variant="minimal"
          
          data={ [] }

          // @ts-ignore
          ////getColumns={getColumns}
          enablePagination={true}
          enableSearch={false}
          //searchPlaceholder="닉네임, 계정, 휴대폰번호"

          sticky

          scroll={{ x: 1800, }}

          // always show  horizontal scrollbar

      

          //className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"




          className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        />
     
    

    </TableLayout>
   
  );
}
