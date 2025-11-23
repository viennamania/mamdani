'use client';

import { routes } from '@/config/routes';


//////import { memberData } from '@/data/doingdoit/user/member-data';

import { getColumns } from '@/app/shared-doingdoit/user/member-columns';


import UserTableWidget from '@/components/doingdoit/user-table-widget';


import TableLayout from '../table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';


import { useSession, signIn, signOut } from 'next-auth/react';


/*
export const metadata = {
  ...metaObject('회원'),
};
*/


const pageHeader = {
  title: '회원',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.user.member,
      name: '회원관리',
    },
    {
      name: '회원',
    },
  ],
};



export default function SearchTablePage() {

  

  const { data: session, status } = useSession();
  if (
    session?.user?.email &&
    !session?.user?.email.includes ('@cryptoss.beauty')
  ) {
    signOut(
      {
        callbackUrl: '/signin',
      }
    );

    return <></>
  }

  if (status !== 'loading' && !session) {
    window.location.href = '/signin';
    return <></>
  }
    


  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}

      //data={memberData}


      //data=[  // data는 빈 배열로 초기화 해놓는다.  실제 데이터는 아래에서 읽어온다.  (readExcel 함수 참고)]
      //data = {[]}

      fileName="user-data"

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


      <UserTableWidget
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
        
        searchPlaceholder="닉네임, 계정, 휴대폰번호"

        //setPageSize={setPageSize}



        className="w min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />

    </TableLayout>
  );
}
