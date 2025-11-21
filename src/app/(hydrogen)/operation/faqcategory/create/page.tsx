import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';


//import CreateOrder from '@/app/shared/ecommerce/order/create-order';

import InfoCreate from '@/app/shared-doingdoit/faq/create-category';


import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';



export const metadata = {
  ...metaObject('FAQ분류관리'),
};

const pageHeader = {
  title: 'FAQ분류관리',
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
      href: routes.operation.faqcategory,
      name: 'FAQ분류관리',
    },
    {
      name: 'FAQ분류등록',
    },
  ],
};



export default function CreatePage() {
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
