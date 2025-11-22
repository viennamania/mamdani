'use client';

import { routes } from '@/config/routes';

import InfoForm from '@/app/shared-doingdoit/feed/feed-info-form';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { data } from '@/data/doingdoit/feed/data';
import { useEffect, useState } from 'react';

/*
export const metadata = {
  ...metaObject('구매주문 상세정보'),
};
*/

const pageHeader = {
  title: '구매주문 상세정보',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      name: '구매주문',
    },
    {
      href: routes.feed.index,
      name: '구매주문관리',
    },
    {
      name: '피드백 작성',
    },
  ],
};




export default function EditPage({
  params,
}: {
  params: any;
}) {

  const id =  params?.id;

  console.log("feed edit id=", id);

  const [item, setItem] = useState<any>(null);

  const [loading, setLoading] = useState(false);


  /*
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch('/api/doingdoit/feed/getFeedById?_id=' + id);
  
      const json  = await res?.json() as any;
  
      console.log("FeedPage data=", json.data);
  
      setItem(json.data);


  
      setLoading(false);
  
    };
      
      fetchData();
  } ,[ id, ]);
  */



  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>

      {loading && (
        <div className="flex justify-center items-center h-96">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      )}

      
      <div className="@container">

    
        {/*
        <InfoForm item={item}/>
        */}

        <InfoForm id={id}/>


      </div>
      

      
    </>
  );


}
