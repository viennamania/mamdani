'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';
import { PiChatCircleText, PiTrash, PiUsers, PiXBold } from 'react-icons/pi';
import { useLayout } from '@/hooks/use-layout';
import cn from '@/utils/class-names';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { m } from 'framer-motion';

import { Modal } from '@/components/ui/modal';
import FollowerModal from '@/app/shared/profile/follower-modal';

import { postData, followersData, followingData } from '@/data/profile-data';
import { Badge } from '@/components/ui/badge';
import PostFeed from '@/app/shared/profile/post-feed';



import DeletePopover from '@/app/shared-doingdoit/delete-popover-large';
import RecoveryPopover from '@/app/shared-doingdoit/recovery-popover-large';


///////import { memberData } from '@/data/doingdoit/user/member-data';




const modalData = {
  title: '',
  description: '',
  data: [],
};

//let open = false;



export type ProfileHeaderTypes = {
  id: string;
};


export default function ProfileHeader({
  id,
}: React.PropsWithChildren<ProfileHeaderTypes>) {


  console.log('ProfileHeader id: ', id );

//export default function ProfileHeader() {




  const { layout } = useLayout();
  const [follow, setFollow] = useState(false);


  const [active, setActive] = useState('posts');
  const [open, setOpen] = useState(false);


  /* member data from data */
  const [data, setData] = useState( {
    _id: '',
    email: '',
    nickname: '',
    avatar: '',
    role: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
  } );
  

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch(`/api/doingdoit/user/getUser?_id=${id}`);
  
      const data  = await res?.json() as any;
  
  
  
      setData(data.data);
  
      setLoading(false);
  
    };
  
    fetchData();

  } , [ id  ]);


  return (
    <div
      className={cn(layout === LAYOUT_OPTIONS.LITHIUM ? '3xl:-mt-4' : 'mt-0 ')}
    >

      {/*
      <div className="-mx-6 h-[150px] bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] @5xl:h-[200px] 3xl:-mx-8  3xl:h-[250px] 4xl:-mx-10 4xl:h-[300px]" />
      */}
      <div className="-mx-6 h-[60px] bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF]   " />
    
      {/*
      <div className="mx-auto w-full max-w-[1294px] @container @5xl:mt-0 @5xl:pt-4 sm:flex sm:justify-between  ">
      */}
      
      <div className=" w-full max-w-[1294px] @container @5xl:mt-0 @5xl:pt-4 sm:flex sm:justify-between  ">
        
        

        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-10 h-10 border-2 border-t-2 border-gray-900 rounded-full animate-spin" />
          </div>
        ) : (
              
          <div className="flex gap-4 @5xl:gap-6  h-24 ">

            <div >
              <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-4 border-white bg-white shadow-profilePic  md:border-[6px] ">
                
                <Image
                  src={
                    data?.avatar || '/usermain/images/avatar.svg'
                  }
                  
                  //src={data.avatar}
                  alt="profile-pic"
                  //ill
                  priority
                  //sizes="(max-width: 768px) 100vw"
                  width={200}
                  height={200}
                  className="aspect-auto"
                />
              </div>
            </div>

            <div className="pt-2.5  h-16 ">
              <Title
                as="h1"
                className="text-lg font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
              >
                {data?.nickname}
              </Title>
              <Text className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base ">
                {data?.email}
              </Text>

      
            </div>

          </div>

        )}
        

        {/* delete button */}

        <div className="flex items-center gap-2 @3xl:gap-5">






              {/*
          <Button
            variant="outline"
            className="font-500 text-gray-900 @3xl:text-base 3xl:text-lg"

            onClick={() => {
              setOpen(true);
              setActive(() => 'posts');
              modalData.title = 'Posts';
              //modalData.data = postData;
            } }
          >

            <PiTrash className="h-auto w-[18px]" />

            <span className="ms-1.5 inline-block">삭제</span>
          </Button>
              */}
        </div>



              {/*
              <div className="grid grid-cols-2 pt-3 @3xl:pt-4">
                <Button variant="outline" className="font-500 text-gray-900">
                  <PiChatCircleText className="h-auto w-[18px]" />
                  <span className="ms-1.5 inline-block">Message</span>
                </Button>
                <Button
                  color="primary"
                  className="font-500 ms-3.5 text-white"
                  onClick={() => setFollow(!follow)}
                >
                  <PiUsers className="h-auto w-[18px]" />
                  {follow ? (
                    <span className="ms-1.5 inline-block">Following</span>
                  ) : (
                    <span className="ms-1.5 inline-block">Follow</span>
                  )}
                </Button>
              </div>
            */}


      </div>


      {/* modal view */}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setActive(() => 'posts');
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
                setActive(() => 'posts');
              }}
            >
              닫기
            </Button>

          
        </div>

              {/*
        {modalData && <FollowerModal data={modalData.data} />}
              */}
      </Modal>

    
    </div>
  );
}
