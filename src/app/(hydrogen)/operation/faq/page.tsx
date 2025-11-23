'use client'

import { routes } from '@/config/routes';

import { data } from '@/data/doingdoit/faq/data';
import { getColumns } from '@/app/shared-doingdoit/faq/columns';

import FaqTableWidget from '@/components/doingdoit/faq-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';


import { PiDownloadSimpleBold, PiPaperclip, PiRecordLight } from 'react-icons/pi';

import { Router } from 'next/router';
import Link from 'next/link';

import { useSession, signIn, signOut } from 'next-auth/react';

/*
export const metadata = {
  ...metaObject('FAQ'),
};
*/

const pageHeader = {
  title: 'FAQ',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.operation.notice,
      name: '운영관리',
    },
    {
      name: 'FAQ',
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



      <FaqTableWidget
        title=""
        variant="minimal"
        data={data}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="질문"

        sticky
        scroll={{ x: 600, }}

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />

    </TableLayout>

  );
}
