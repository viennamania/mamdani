import { routes } from '@/config/routes';


//////import { memberData } from '@/data/doingdoit/user/member-data';

import { getColumns } from '@/app/shared-doingdoit/board/tag-columns';


import TagTableWidget from '@/components/doingdoit/tag-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';



export const metadata = {
  ...metaObject('추천태그관리'),
};

const pageHeader = {
  title: '추천태그관리',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.board.index,
      name: '자유게시판',
    },
    {
      name: '추천태그관리',
    },
  ],
};



export default function SearchTablePage() {

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}

      //data={memberData}


      //data=[  // data는 빈 배열로 초기화 해놓는다.  실제 데이터는 아래에서 읽어온다.  (readExcel 함수 참고)]
      //data = {[]}

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


      <TagTableWidget
        title=""
        
        //variant="minimal"
        variant="modern"

        /////data={memberData}

        sticky
        ///scroll={{ x: 1300, y: 760 }}
        scroll={{ x: 500, }}

        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        enableSearch={false}
        searchPlaceholder="닉네임, 계정, 휴대폰번호"

        //setPageSize={setPageSize}



        className="w min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />

    </TableLayout>
  );
}
