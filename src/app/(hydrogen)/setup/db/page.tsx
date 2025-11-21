import { routes } from '@/config/routes';



//import { data } from '@/data/doingdoit/feed/data';

import { data as calorieData } from '@/data/doingdoit/feed/calorie-db-data';

import { getColumns } from '@/app/shared-doingdoit/feed/calorie-db-columns';


//import { memberData } from '@/data/doingdoit/user/member-data';

///import { getColumns } from '@/app/shared-doingdoit/user/member-columns';



import DatabaseTableWidget from '@/components/doingdoit/database-table-widget';


import TableLayout from '../table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';



export const metadata = {
  ...metaObject('식품DB관리'),
};

const pageHeader = {
  title: '식품DB관리',
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
      name: '식품DB관리',
    },
  ],
};





export default function SearchTablePage() {

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={calorieData}
      fileName="calorie-data"
      header="식품코드, 식품명"
    >

      {/*
      <div className='mb-5 w-full flex flex-row items-center justify-end'>
        <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
          <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
          엑셀다운로드
        </Button>
      </div>
    */}


      {/*
      <BasicTableWidget
        title="포인트관리"
        variant="minimal"
        data={data}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="닉네임, 제목, 피드백 작성자"

        ////setPageSize={setPageSize}

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />
      */}


      <DatabaseTableWidget
        title=""
        variant="minimal"
        data={calorieData}

        pageSize={20}

        // @ts-ignore
        getColumns={getColumns}
        //enablePagination
        enableSearch={true}
        enablePagination={true}
        
        searchPlaceholder="식품코드, 식품명, 발행기관"

        className=""
      />



    </TableLayout>
  );
}
