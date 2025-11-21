import { routes } from '@/config/routes';

import { getColumns } from '@/app/shared-doingdoit/survey/stats-columns';

import SurveyStatsTableWidget from '@/components/doingdoit/survey-stats-table-widget';


import TableLayout from '../table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';


export const metadata = {
  ...metaObject('설문 통계'),
};

const pageHeader = {
  title: '설문 통계',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.feed.index,
      name: '설문',
    },
    {
      name: '설문 통계',
    },
  ],
};


export default function SearchTablePage() {


  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      fileName="feed_stats_data"
      //header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >

      {/*
      <div className='mb-5 w-full flex flex-row items-center justify-end'>
        <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
          <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
          엑셀다운로드
        </Button>
      </div>
    */}


      <SurveyStatsTableWidget
        title=""
        variant="minimal"
        data={[]}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination
        enableSearch={true}
        //searchPlaceholder="닉네임, 계정, 휴대폰번호"


        sticky

        scroll={{ x: 600, }}

        //className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />

    </TableLayout>
  );
}
