import ProfileHeader from '@/app/shared-doingdoit/profile/profile-header';
import ProfileDetails from '@/app/shared-doingdoit/profile/user-details';
import { metaObject } from '@/config/site.config';

import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';


export const metadata = {
  ...metaObject('회원 상세보기'),
};

const pageHeader = {
  title: '회원 상세보기',
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
      href: routes.user.member,
      name: '회원',
    },
    {
      name: '회원 상세보기',
    },
  ],
};

export default function ProfilePage(id: any) {

  
  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>

      <div className="@container">
        <ProfileHeader id={'3413'} />
        <ProfileDetails id={'3413'} />
      </div>

      
    </>
  );
}
