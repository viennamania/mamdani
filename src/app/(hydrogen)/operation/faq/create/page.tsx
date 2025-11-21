import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';


//import CreateOrder from '@/app/shared/ecommerce/order/create-order';

import InfoCreate from '@/app/shared-doingdoit/faq/info-create';


import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';



export const metadata = {
  ...metaObject('FAQ'),
};

const pageHeader = {
  title: 'FAQ',
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
      href: routes.operation.faq,
      name: 'FAQ',
    },
    {
      name: '등록하기',
    },
  ],
};

export default function Page() {
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
