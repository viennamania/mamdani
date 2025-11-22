'use client';

import { routes } from '@/config/routes';

import InfoView from '@/app/shared-doingdoit/survey/survey-view';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';


import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiList, PiRecordLight, } from 'react-icons/pi';

import { useRouter } from 'next/navigation';

import { data } from '@/data/doingdoit/survey/data';


import { useEffect, useState } from 'react';


/*
export const metadata = {
  ...metaObject('구매주문 상세정보'),
};
*/

const pageHeader = {
  title: '설문 상세정보',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      name: '설문',
    },
    {
      href: routes.survey.index,
      name: '설문관리',
    },
    {
      name: '설문 상세보기',
    },
  ],
};





export default function Page({
  params,
}: {
  params: any;
}) {

  const id =  params?.id;
  //const { id } = useParams<{ id: string }>();



  const [item, setItem] = useState<any>(null);

  useEffect(() => {

    // fetch data from api
    const fetchData = async () => {
      const response = await fetch(`/api/doingdoit/survey/getOne?id=${id}`);
      const data = await response.json() as any;

  
      ///console.log("data:", data);

      
      setItem(data?.data);
    };

    fetchData();
    
    
  } ,[ id ]);

  const { push } = useRouter();


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

        <div className="flex items-center space-x-4">

          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            onClick={() => window.history.back()}
          >
            <PiList className="me-2 h-4 w-4" />
            {'목록'}
          </button>

        </div>

      </PageHeader>

      <div className="@container">
        <InfoView item={item}/>
      </div>

      
    </>
  );


}
