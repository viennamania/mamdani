'use client';

import { routes } from '@/config/routes';


import AdminEdit from '@/app/shared-doingdoit/profile/admin-edit';


import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { useRouter } from 'next/navigation';



/*
export const metadata = {
  ...metaObject('관리자 계정관리'),
};
*/

const pageHeader = {
  title: '관리자 계정관리',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.user.index,
      name: '회원관리',
    },
    {
      href: routes.user.admin,
      name: '관리자 계정관리',
    },
    {
      name: '수정하기',
    }
  ],
};


export default function ProfilePage({ params }: any) {

  console.log('ProfilePage params: ', params);

  const { id } = params;

  //const id = '1';

  console.log('ProfilePage id: ', id);


  const { push } = useRouter();


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>

      <div className="@container">
        <AdminEdit id={id} />
      </div>

      
    </>
  );


}
