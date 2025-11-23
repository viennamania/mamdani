'use client';

import { routes } from '@/config/routes';



///////import { data } from '@/data/doingdoit/feed/data';


import { getColumns, getWidgetColumns } from '@/app/shared-doingdoit/feed/columns';



//import { memberData } from '@/data/doingdoit/user/member-data';

///import { getColumns } from '@/app/shared-doingdoit/user/member-columns';



import FeedTableWidget from '@/components/doingdoit/feed-table-widget';

import ShipmentTable from '@/app/shared-doingdoit/feed/feed-table/shipment-table';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';


import { useSession, signIn, signOut } from 'next-auth/react';

/*
export const metadata = {
  ...metaObject('구매주문관리'),
};
*/

const pageHeader = {
  title: '구매주문관리',
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
      name: '구매주문관리',
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
      fileName=""
      
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
      
      <FeedTableWidget
        title=""
        variant="minimal"

        //data={data}

        sticky
        ///scroll={{ x: 1300, y: 760 }}
        scroll={{ x: 600, }}
        
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="닉네임, 제목, 피드백 작성자"

        ////setPageSize={setPageSize}

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        
      />
      

      {/*

        <ShipmentTable
        />
      */}

    </TableLayout>
  );
}
