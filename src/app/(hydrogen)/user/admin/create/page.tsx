import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';


//import CreateOrder from '@/app/shared/ecommerce/order/create-order';

import Create from '@/app/shared-doingdoit/profile/create-admin';


import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';



export const metadata = {
  ...metaObject('관리자 계정관리'),
};

const pageHeader = {
  title: '관리자 계정관리',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.user.index,
      name: '회원관리',
    },
    {
      href: routes.user.admin,
      name: '관리자 계정관리',
    },
    {
      name: '관리자 계정생성',
    },
  ],
};

export default function CreateOrderPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
       

      </PageHeader>
      
      <Create />

      {/*
      <CreateOrder />
      */}
    </>
  );
}
