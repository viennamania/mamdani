import { routes } from '@/config/routes';



////import { data } from '@/data/doingdoit/point/data';


import { getColumns } from '@/app/shared-doingdoit/point/columns';



//import { memberData } from '@/data/doingdoit/user/member-data';

///import { getColumns } from '@/app/shared-doingdoit/user/member-columns';



import PointTableWidget from '@/components/doingdoit/point-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';



export const metadata = {
  ...metaObject('포인트관리'),
};

const pageHeader = {
  title: '포인트관리',
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
      name: '포인트관리',
    },
  ],
};





export default function SearchTablePage() {

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      fileName=""
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


      
      <PointTableWidget
        title=""
        variant="minimal"
        
        //////data={data}

        sticky
        ///scroll={{ x: 1300, y: 760 }}
        scroll={{ x: 600, }}
        
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="닉네임"

        ////setPageSize={setPageSize}

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />
      

    </TableLayout>
  );
}
