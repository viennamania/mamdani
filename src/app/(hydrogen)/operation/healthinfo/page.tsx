'use client';

import { routes } from '@/config/routes';


import { data } from '@/data/doingdoit/healthinfo/data';


import { getColumns } from '@/app/shared-doingdoit/healthinfo/columns';

import HealthinfoTableWidget from '@/components/doingdoit/healthinfo-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';


import { PiDownloadSimpleBold, PiPaperclip, PiRecordLight } from 'react-icons/pi';

import { Router } from 'next/router';
import Link from 'next/link';

import { useSession, signIn, signOut } from 'next-auth/react';


/*
export const metadata = {
  ...metaObject('테더정보'),
};
*/

const pageHeader = {
  title: '테더정보',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.operation.healthinfo,
      name: '운영관리',
    },
    {
      name: '테더정보',
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



      <HealthinfoTableWidget
        title=""
        variant="minimal"
        data={data}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="제목, 태그"

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        sticky
        scroll={{ x: 600, }}
      />

    </TableLayout>

  );
}
