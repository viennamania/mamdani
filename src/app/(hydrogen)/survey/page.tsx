import { routes } from '@/config/routes';



import { data } from '@/data/doingdoit/survey/data';


import { getColumns } from '@/app/shared-doingdoit/survey/columns';



//import { memberData } from '@/data/doingdoit/user/member-data';

///import { getColumns } from '@/app/shared-doingdoit/user/member-columns';



import SurveyTableWidget from '@/components/doingdoit/survey-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';



export const metadata = {
  ...metaObject('설문관리'),
};

const pageHeader = {
  title: '설문관리',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.survey.index,
      name: '설문',
    },
    {
      name: '설문관리',
    },
  ],
};





export default function SearchTablePage() {

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      fileName="feed_data"
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


      <SurveyTableWidget
        title=""
        variant="minimal"
        data={data}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="닉네임, 계정"

        ////setPageSize={setPageSize}

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        sticky
        scroll={{ x: 600, }}


      />

    </TableLayout>
  );
}
