'use client';

import ProfileHeader from '@/app/shared-doingdoit/profile/profile-header';
import ProfileDetails from '@/app/shared-doingdoit/profile/withdrew-details';

import { metaObject } from '@/config/site.config';

import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';

import DeletePopover from '@/app/shared-doingdoit/delete-popover-large';

import RecoveryPopover from '@/app/shared-doingdoit/recovery-popover-large';




import { useRouter } from 'next/navigation';
import { PiList } from 'react-icons/pi';


import { useState } from 'react';

import { Modal } from '@/components/ui/modal';
import { Title, Text } from '@/components/ui/text';



/*
export const metadata = {
  ...metaObject('Profile'),
};
*/

const pageHeader = {
  title: '탈퇴회원 상세보기',
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
      href: routes.user.withdrew,
      name: '탈퇴회원',
    },
    {
      name: '탈퇴회원 상세보기',
    },
  ],
};


const modalData = {
  title: '',
  description: '',
  data: [],
};





export default function ProfilePage({ params }: any) {

  const { id } = params;

  console.log('ProfilePage id: ', id);

  const { push } = useRouter();

  const [open, setOpen] = useState(false);

  const [isRecovering, setIsRecovering] = useState(false);

  
  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

        {/* goto list */}
        <div className="flex items-center gap-5">


          {/* 
          <DeletePopover
            title={`삭제`}
            description={`삭제하시겠습니까?`}
            onDelete={() => {
              //push(routes.user.member);
              setOpen(true);
              modalData.description = '삭제되었습니다.';
            }}
          />
          */}




          { /* 계정복구 */ }

          {/* if withdrawed user, show recovery button */}

          {
            // check user status



          }
          
            <RecoveryPopover
              
              

              title={`계정복구`}
              description={`계정을 복구하시겠습니까?`}
              onDelete={() => {
                //push(routes.user.withdrew);


                /// api call

                async function fetchData() {

                  setIsRecovering(true);
                  const res = await fetch(`/api/doingdoit/user/withdrawRecoveryById?id=${id}`);

                  const json = await res.json();

                  setIsRecovering(false);
                }

                fetchData();


                setOpen(true);
                modalData.description = '복구되었습니다.';


                push(routes.user.withdrew);

              }}
            />
          


          



          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            onClick={() => window.history.back()}
          >
            <PiList className="me-2 h-4 w-4" />
            목록
          </button>


        </div>
        

      </PageHeader>

      <div className="@container  ">

        <ProfileHeader id={id} />

        <ProfileDetails id={id}/>



      </div>


      {/* modal view */}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          //setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
      >
        <div className="flex flex-col items-center justify-center gap-10 m-5">
            {/*
          <Title
            as="h3"
            className="text-lg font-semibold text-gray-900 xl:text-xl"
          >
            {modalData.title}
          </Title>
        
          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              setActive(() => 'posts');
            }}
            className="h-auto px-1 py-1"
          >
            <PiXBold className="h-5 w-5 text-base" />
          </Button>
          */}

            {modalData.description && (
              <div className="">
                <Text
                  as="p"
                  className="text-base font-semibold text-gray-900 xl:text-lg"
                >
                  {modalData.description}
                </Text>
              </div>
            )}

              {/*
            <Button
              variant="text"
              onClick={() => {
                setOpen(false);
                setActive(() => 'posts');
              }}
              className="h-auto px-1 py-1"
            >
              <PiXBold className="h-5 w-5 text-base" />
            </Button>
            */}
            {/* close button */}
            <Button
              size="lg"
              color="primary"
              className='flex items-center space-x-2'
              onClick={() => {
                setOpen(false);
                //setActive(() => 'posts');
              }}
            >
              닫기
            </Button>

          
        </div>

              {/*
        {modalData && <FollowerModal data={modalData.data} />}
              */}
      </Modal>


      
    </>
  );
}
