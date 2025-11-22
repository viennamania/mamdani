'use client';

import { routes } from '@/config/routes';

import InfoView from '@/app/shared-doingdoit/feed/feed-info-view';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';


import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiList, PiRecordLight, } from 'react-icons/pi';

import { useRouter, } from 'next/navigation';

import { useEffect, useState } from 'react';

import DeletePopover from '@/app/shared-doingdoit/delete-popover-large';

import toast from 'react-hot-toast';



import { Modal } from '@/components/ui/modal';
import { Title, Text } from '@/components/ui/text';

import { ActionIcon } from '@/components/ui/action-icon';

///import { data } from '@/data/doingdoit/feed/data';

import { useSession, signIn, signOut } from 'next-auth/react';
import { ro } from '@faker-js/faker';
import { set } from 'lodash';

/*
export const metadata = {
  ...metaObject('구매주문 상세정보'),
};
*/

const pageHeader = {
  title: '구매주문 상세정보',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      name: '구매주문',
    },
    {
      href: routes.feed.index,
      name: '구매주문관리',
    },
    {
      name: '구매주문 상세보기',
    },
  ],
};


const modalData = {
  title: '',
  description: '',
  data: [],
};





export default function Page({
  params,
}: {
  params: any;
}) {

  const id =  params?.id;
  //const { id } = useParams<{ id: string }>();


  const { data: session, status } = useSession();

  const router = useRouter();



  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<any>(null);


  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch('/api/doingdoit/feed/getFeedById?_id=' + id);
  
      const json  = await res?.json() as any;
  
      console.log("FeedPage data=", json.data);
  
      setItem(json.data);


  
      setLoading(false);
  
    };
      
      fetchData();
  } ,[ id, ]);


  const [open, setOpen] = useState(false);



  const [isDeleting, setIsDeleting] = useState(false);

  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

        <div className="flex items-center space-x-4">


          {/*
          <DeletePopover
            title={`삭제`}
            description={`삭제하시겠습니까?`}
            onDelete={() => {
              setOpen(true);
              modalData.description = '삭제되었습니다.';
            }}
          />
          */}

          {/* 수정 버튼 */}

          {/*
          {item?.feedbackWriterEmail === session?.user?.email && (
          
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              onClick={() => {

                router.push(`/feed/${id}/edit`);
                
              }}
            >
              <PiRecordLight className="me-2 h-4 w-4" />
              {'수정'}

            </button>

          )}
          */}


          {isDeleting ? (
            <Button
              isLoading={true}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              disabled
            >
              삭제
            </Button>
          ) : (
            

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

                  if (isDeleting) {
                    return;
                  }

                  setIsDeleting(true);

                  const res = await fetch(`/api/doingdoit/feed/deleteOne?id=${id}`);


                  if (res.status === 200) {
                    
                    //console.log('success');

                    //setOpen(true);
                    //modalData.description = '삭제되었습니다.';

                    toast.success('삭제되었습니다.');


                    window.history.back();
                  } else {
                    console.log('fail');
                  }

                  setIsDeleting(false);
                }

                deleteOne();


              }}
            />

          )}


          {/* 목록 버튼 */}
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            onClick={
              () =>
              //router.push(routes.feed.index)
              
              //router.back()

              //history.back()

              window.history.back()

            }
          >
            <PiList className="me-2 h-4 w-4" />
            {'목록'}
          </button>



        </div>

      </PageHeader>

      <div className="@container">
        <InfoView id={id} />
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
