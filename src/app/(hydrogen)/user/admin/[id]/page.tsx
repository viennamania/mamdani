'use client';

import { routes } from '@/config/routes';

import AdminDetails from '@/app/shared-doingdoit/profile/admin-details';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiList, PiRecordLight, PiPen, } from 'react-icons/pi';

import { useRouter } from 'next/navigation';

import DeletePopover from '@/app/shared-doingdoit/delete-popover-large';



import { useState } from 'react';

import { Modal } from '@/components/ui/modal';
import { Title, Text } from '@/components/ui/text';
import { set } from 'lodash';
import { tr } from '@faker-js/faker';
import toast from 'react-hot-toast';




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
      name: '상세보기',
    }
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

///export default function Page() {

  const { push } = useRouter();

  const [open, setOpen] = useState(false);





  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} >


          <div className="flex items-center space-x-4">


            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              onClick={() => push(routes.user.adminEdit(id))}
            >
              <PiPen className="me-2 h-4 w-4" />
              수정
            </button>

            
            <DeletePopover
              
              title={`삭제`}
              description={`삭제하시겠습니까?`}
              onDelete={() => {
                //push(routes.operation.healthinfo);
                //setOpen(true);
                //modalData.description = '삭제되었습니다.';

                // api call for delete user
                // delete user
                // if success then push to history back

                const deleteOne = async () => {

                  const res = await fetch(`/api/doingdoit/user/deleteOne?id=${id}`);


                  if (res.status === 200) {
                    
                    //console.log('success');

                    //setOpen(true);
                    //modalData.description = '삭제되었습니다.';

                    toast.success('삭제되었습니다.');


                    window.history.back();
                  } else {
                    console.log('fail');
                  }

                }

                deleteOne();


              }}
            />
            
            

            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              onClick={() => window.history.back()}
            >
              <PiList className="me-2 h-4 w-4" />
              {'목록'}
            </button>


          </div>


      </PageHeader>

      <div className="@container">
        <AdminDetails id={id}/>
        
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
