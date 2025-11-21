'use client';

import { routes } from '@/config/routes';

import InfoForm from '@/app/shared-doingdoit/board/board-form';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { data } from '@/data/doingdoit/board/data';

import { useState, useEffect } from 'react';



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


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>

      <div className="@container">
        <InfoForm id={id} />
      </div>

      
    </>
  );


}
