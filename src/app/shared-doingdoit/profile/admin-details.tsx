'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PiXBold } from 'react-icons/pi';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import cn from '@/utils/class-names';
import PostFeed from '@/app/shared/profile/post-feed';
import FollowerModal from '@/app/shared/profile/follower-modal';
import { postData, followersData, followingData } from '@/data/profile-data';

const tabs = [
  { id: 'posts', count: postData.length },
  { id: 'followers', count: followersData.length },
  { id: 'following', count: followingData.length },
];



import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



import PointTableWidget from '@/components/doingdoit/point-table-widget';

import { pointData } from '@/data/doingdoit/user/point-data';

import { getColumns } from '@/app/shared-doingdoit/point/columns';


import { useForm, Controller } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';

import dynamic from 'next/dynamic';


import FormGroup from '@/app/shared-doingdoit/form-group';
import { Form } from '@/components/ui/form';


import { Checkbox } from '@/components/ui/checkbox';
import { de } from '@faker-js/faker';

const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});




interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}



function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export type ProfileDetailsTypes = {
  id: string;
};


export default function AdminDetails({
  id,
}: React.PropsWithChildren<ProfileDetailsTypes>) {

  console.log('ProfileDetails id: ', id);


  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: 'Followers',
    data: followersData,
  });
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    setOpen(() => false);
  }, [pathname]);

  // handle follower and following modal open
  function handleTabClick(id: string) {
    if (id === 'followers') {
      setModalData({ title: 'Followers', data: followersData });
    } else if (id === 'following') {
      setModalData({ title: 'Following', data: followingData });
    }
    setOpen(() => true);
    setActive(() => id);
  }


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };







  /* member data from data */
  const [userData, setUserData] = useState(
    {
      id: '',
      email: '',
      nickname: '',
      avatar: '',
      role: '',
      regType: '',

      gender: '',
      mobile: '',
      birthDate: '',
      weight: 0,
      height: 0,
      purpose: '',
      isAgreedTerms: '',
      isAgreedPolicy: '',
      isAgreedMarketing: '',

      loginId: '',
      password: '',
      roles: '',
      description: '',

      createdAt: '',
      updatedAt: '',
      deletedAt: '',

      status: '',

      sequenceNumber: 0,

      access: {
        access_user_member: false,
        access_user_withdrew: false,
        access_user_admin: false,
        
        access_feed: false,
        access_feed_stats: false,
    
        access_board: false,
        access_board_tag: false,
    
        access_survey: false,
        access_survey_stats: false,
    
        access_operation_healthinfo: false,
        access_operation_guide: false,
        access_operation_notice: false,
        access_operation_faq: false,
        access_operation_faqcategory: false,
    
        access_point: false,
        access_point_setting: false,
    
        access_setup_food: false,
        access_setup_terms: false,

      }
    }
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch(`/api/doingdoit/user/getUser?_id=${id}`);
  
      const data  = await res?.json() as any;

      console.log("board data===========================", data.data);
  
      setUserData(data?.data);
  
      setLoading(false);
  
    };
    
    fetchData();
  } , [ id ]);


  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {

    const fetchData = async () => {

      ///api/doingdoit/point/getTotalPointByUserId?_userId=1

      const res = await fetch(`/api/doingdoit/point/getTotalPointByUserId?_userId=${id}`);

      const posts  = await res?.json() as any;

      ///console.log("board data===========================", posts.data);

      setTotalPoint(posts.data);

    }

    fetchData();

  } , [ id ]);




  return (
    
    <>
      
      <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">

        {/*
        <FormGroup
          title="No"
        >
          <Text>
            {userData?.sequenceNumber}
          </Text>
        </FormGroup>
        */}

        <FormGroup
          title="아이디"
        >
          <Text>
            {userData?.loginId}
          </Text>
        </FormGroup>
        <FormGroup
          title="비밀번호"
        >
          <Text>
            {
              ///userData?.password
              '********'
            }
          </Text>
        </FormGroup>

        <FormGroup
          title="관리역할"
        >

          <Text>
            {userData?.description}
          </Text>

        </FormGroup>


        <FormGroup
          title="담당자명"
        >
          <Text>
            {userData?.nickname}
          </Text>
        </FormGroup>

        <FormGroup
          title="연락처"
        >
          <Text>
            {userData?.mobile}
          </Text>
        </FormGroup>

      </div>

            {/* check box */}

            <div className='mt-10 mb-10 p-5 flex flex-col items-start justify-start gap-5  border rounded-lg '>



              <FormGroup
                title="권한설정"
              >
              </FormGroup>

              <div className=" flex flex-row flex-wrap items-start justify-between gap-5">

                  <div className='flex flex-col items-start justify-start gap-2  border rounded-lg p-5'>
                    <div>회원관리</div>
                    <Checkbox
                      label="회원"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_user_member }
                      disabled
                    />

                    <Checkbox
                      label="탈퇴회원"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_user_withdrew }
                      disabled
                    />

                    <Checkbox
                      label="관리계정관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_user_admin }
                      disabled
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>구매주문</div>
                    <Checkbox
                      label="구매주문관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_feed }
                      disabled
                    />

                    <Checkbox
                      label="구매주문통계"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_feed_stats }
                      disabled
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>자유게시판</div>
                    <Checkbox
                      label="게시글관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_board }
                      disabled
                    />

                    <Checkbox
                      label="추천태그관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_board_tag }
                      disabled
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>설문</div>
                    <Checkbox
                      label="설문관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_survey }
                      disabled
                    />

                    <Checkbox
                      label="설문통계"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_survey_stats }
                      disabled
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>운영관리</div>
                    <Checkbox
                      label="테더정보"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_operation_healthinfo }
                      disabled
                    />
                    <Checkbox
                      label="유형별가이드"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_operation_guide }
                      disabled
                    />
                    <Checkbox
                      label="공지사항"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_operation_notice }
                      disabled
                    />
                    <Checkbox
                      label="FAQ"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_operation_faq }
                      disabled
                    />
                    <Checkbox
                      label="FAQ분류관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_operation_faqcategory }
                      disabled
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>포인트</div>
                    <Checkbox
                      label="포인트관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_point }
                      disabled
                    />

                    <Checkbox
                      label="포인트설정"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_point_setting }
                      disabled
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>설정</div>
                    <Checkbox
                      label="식품DB관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_setup_food }
                      disabled
                    />

                    <Checkbox
                      label="약관"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                      checked = { userData?.access?.access_setup_terms }
                      disabled
                    />
                  </div>

                </div>

            </div>

     

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
      >
        <div className="flex items-center justify-between pb-2 lg:pb-3">
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
        </div>
        {modalData && <FollowerModal data={modalData.data} />}
      </Modal>
      
    </>
  );
}
