'use clinet';

import { routes } from '@/config/routes';



import { data } from '@/data/doingdoit/feed/data';


import { getColumns } from '@/app/shared-doingdoit/feed/columns';


import TableLayout from '../table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';

import PageHeader from '@/app/shared/page-header';

import SetupForm from '@/app/shared-doingdoit/point/setup-form';




export const metadata = {
  ...metaObject('포인트설정'),
};

const pageHeader = {
  title: '포인트설정',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.point.index,
      name: '포인트',
    },
    {
      name: '포인트설정',
    },
  ],
};





export default function SetupPage() {


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>

      <div className="@container ">

        <SetupForm />


      </div>

      
    </>
  );

}
