import { routes } from '@/config/routes';



//import { data } from '@/data/doingdoit/feed/data';

////import { data as calorieData } from '@/data/doingdoit/feed/calorie-db-data';



//import { memberData } from '@/data/doingdoit/user/member-data';

///import { getColumns } from '@/app/shared-doingdoit/user/member-columns';

///import { getColumns } from '@/app/shared-doingdoit/feed/calorie-db-columns';

import { getColumns } from '@/app/shared-doingdoit/food/columns';


import FoodTableWidget from '@/components/doingdoit/food-table-widget';


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
      ///data={calorieData}

      //data=[  // data는 빈 배열로 초기화 해놓는다.  실제 데이터는 아래에서 읽어온다.  (readExcel 함수 참고)]
      data = {[]}

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


      <FoodTableWidget
        title=""
        variant="minimal"
        ///data={calorieData}

        pageSize={20}

        scroll={{ x: 600, }}

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
