import { routes } from '@/config/routes';



import { data } from '@/data/doingdoit/feed/data';


import { getColumns } from '@/app/shared-doingdoit/feed/columns';


import PageHeader from '@/app/shared/page-header';

import TableLayout from '../table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';

import SetupForm from '@/app/shared-doingdoit/terms/terms-form';




export const metadata = {
  ...metaObject('약관'),
};

const pageHeader = {
  title: '약관',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.setup.index,
      name: '설정',
    },
    {
      name: '약관',
    },
  ],
};





export default function SearchTablePage() {

  return (
    <>

      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>

      <div className="@container">
        <SetupForm />
      </div>

    
    </>
  );

}
