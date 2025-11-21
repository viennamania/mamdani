import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';


//import CreateOrder from '@/app/shared/ecommerce/order/create-order';

import InfoCreate from '@/app/shared-doingdoit/board/create-tag';


import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';



export const metadata = {
  ...metaObject('추천태그관리'),
};

const pageHeader = {
  title: '추천태그관리',
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
      href: routes.board.tag,
      name: '추천태그관리',
    },
    {
      name: '등록하기',
    }
  ],
};


export default function CreateOrderPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>
      
      <InfoCreate />

      {/*
      <CreateOrder />
      */}
    </>
  );
}
