'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';


import { PiXBold, PiGenderMale, PiGenderFemale } from 'react-icons/pi';


import { Badge } from '@/components/ui/badge';

import { Title, Text } from '@/components/ui/text';


import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import cn from '@/utils/class-names';
import PostFeed from '@/app/shared/profile/post-feed';
import FollowerModal from '@/app/shared/profile/follower-modal';

import { postData, followersData, followingData } from '@/data/doingdoit/profile-data';

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



import FormGroup from '@/app/shared-doingdoit/form-group';

import { Form } from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import DateCell from '@/components/ui/date-cell';


/*
import PointTableWidget from '@/components/doingdoit/point-table-widget';

import { pointData } from '@/data/doingdoit/user/point-data';

import { getColumns as getPointColums,} from '@/app/shared-doingdoit/profile/point-columns';
*/


import { getColumns as getPointColums } from '@/app/shared-doingdoit/point/columns-user';



////import SurveyTableWidget from '@/components/doingdoit/profile/survey-table-widget';

import SurveyTableWidget from '@/components/doingdoit/profile/survey-table-widget';
import PointTableWidget from '@/components/doingdoit/profile/point-table-widget';





import FeedTableWidget from '@/components/doingdoit/feed-table-widget';

/*
import {
  data as surveyData,
} from '@/data/doingdoit/survey/data';
*/



import {
  getColumns as getSurveyColumns,
} from '@/app/shared-doingdoit/profile/survey-columns';


import {
  data as feedData,
} from '@/data/doingdoit/feed/data';


import {
  getColumns as getFeedColumns,
} from '@/app/shared-doingdoit/profile/feed-columns';
import { da } from '@faker-js/faker';


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





export default function ProfileDetails({
  id,
}: React.PropsWithChildren<ProfileDetailsTypes>) {

  console.log('ProfileDetails id: ', id);


///export default function ProfileDetails() {

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
  const [data, setData] = useState(
    {
      id: 0,
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

      createdAt: '',
      updatedAt: '',
      deletedAt: '',

      status: '',

      sequenceNumber: 0,
    }
  );

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
  } , [ id ]);


  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {

    const fetchData = async () => {

      ///api/doingdoit/point/getTotalPointByUserId?_userId=1

      const res = await fetch(`/api/doingdoit/point/getTotalPointByUserId?_userId=${id}`);

      const posts  = await res?.json() as any;

      //console.log("board data===========================", posts.data);

      setTotalPoint(posts.data);

    }

    fetchData();

  } , [ id ]);



  return (
    
    <>
      <div className=" mt-0 w-full max-w-[1294px]  ">


      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="기본정보" {...a11yProps(0)} />
            
            <Tab label="거래기록" {...a11yProps(1)} />

            <Tab label="포인트" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {/*
          view data

          가입일시: createdAt
          가입유형: regType
          이메일: email
          닉네임: name
          성별: gender
          휴대폰: mobile
          생년월일: birthDate
          몸무게: weight
          키: height
          식단기록 목적: purpose
          마케팅 수신동의: marketingAgree

          from data
          */}

          {/*
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 ">
          */}

          { data === null && (


            <div className=' m-5 flex items-center justify-center ' >
              정보가 없습니다.
            </div>


          ) }


          { loading ? (


            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>


          ) : (
            <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              {/*
              <FormGroup
                title="회원번호"
              >
                <Text> {data?.sequenceNumber} </Text>
              </FormGroup>
              */}

              <FormGroup
                title="가입일시"
              >
                < DateCell
                  date={ new Date(data?.createdAt) }
                  className='w-fit'
                />
              </FormGroup>

              <FormGroup
                title="가입유형"
              >
                <Text> {data?.regType} </Text>
              </FormGroup>


              <FormGroup
                title="이메일"
              >
                <Text> {data?.email} </Text>
              </FormGroup>

              <FormGroup
                title="닉네임"
              >
                <Text> {data?.nickname} </Text>
              </FormGroup>

              {/*
              <FormGroup
                title="성별"
              >
                {(data?.gender=='남성' ? ( // man
                  <div className='flex flex-row items-center justify-start gap-3'>
                    <PiGenderMale className='h-5 w-5' />
                    <Text className="font-medium text-gray-700">{data?.gender}</Text>
                  </div>
                  ) : (data?.gender=='여성') ? (
                    <div className='flex flex-row items-center justify-start gap-3'>
                      <PiGenderFemale className='h-5 w-5' />
                      <Text className="font-medium text-gray-700">{data?.gender}</Text>
                    </div>
                  ) : (
                    <div className='flex flex-row items-center justify-start gap-3'>
                      <PiGenderMale className='h-5 w-5' />
                      <Text className="font-medium text-gray-700">{data?.gender}</Text>
                    </div>
                  )

                )}

              </FormGroup>
              */}

              <FormGroup
                title="휴대폰"
              >
                <Text> {data?.mobile} </Text>
              </FormGroup>

              <FormGroup
                title="생년월일"
              >
                <Text>
                  {/* 1999년 4월 20일 */}
                  {
                    data?.birthDate && new Date(data?.birthDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })

                    ///data?.birthDate
                  }
                </Text>
              </FormGroup>

              {/*
              <FormGroup
                title="몸무게"
              >
                <Text> {data?.weight} kg </Text>
              </FormGroup>

              <FormGroup
                title="키"
              >

                <Text> {data?.height} cm</Text>
              </FormGroup>

              <FormGroup
                title="식단기록 목적"
              >
                <Text>
                  {                    
                    data?.purpose !== '다이어트' && data?.purpose !== '체중증가' && data?.purpose !== '영양보충' && data?.purpose !== '혈압관리' && data?.purpose !== '혈당관리' && data?.purpose !== '콜레스테롤관리' && data?.purpose !== '건강유지' && data?.purpose !== '챌린지참여' ?
                    '기타(직접입력): ' + data?.purpose :
                    data?.purpose

                  }
                </Text>
              </FormGroup>
              */}

              <FormGroup
                title="마케팅 수신동의"
              >
                <Text>
                  {data?.isAgreedMarketing == 'Y' ? (
                    <Badge variant="solid" color="success">
                      동의함
                    </Badge>
                  ) : (
                    <Badge variant="solid" color="danger">
                      동의안함
                    </Badge>
                  )}
                </Text>
              </FormGroup>

              {data?.status == 'Pending' && (
                
                <FormGroup
                  title="탈퇴일"
                >
                  <Text> {data?.updatedAt} </Text>
                </FormGroup>
              )}

            </div>
          )}



        </CustomTabPanel>



        <CustomTabPanel value={value} index={1}>

          {/*

          <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">
            <FormGroup
              title="전체 설문수"
            >
              <Text className='text-base font-bold'> 42 </Text>
            </FormGroup>
          </div>

          */}


          <SurveyTableWidget
            title="설문내역"
            variant="minimal"

            ////data={surveyData}

            sticky
            ///scroll={{ x: 1300, y: 760 }}
            scroll={{ x: 600, }}

            // @ts-ignore
            getColumns={getSurveyColumns}
            enablePagination={false}
            enableSearch={false}
            //searchPlaceholder="제목, 피드백 작성자"

            ////setPageSize={setPageSize}

            //userId={ parseInt(id) }

            userId={ id }

            className="mt-6 min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium  "
          />

        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>

          <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">
            <FormGroup
              title="보유 포인트"
            >
              <Text className='text-base font-bold'> {totalPoint}P </Text>
            </FormGroup>
          </div>
          
          <PointTableWidget
            title="포인트 내역"
            ///variant="minimal"
            variant='modern'

            //data={pointData}

            sticky
            ///scroll={{ x: 1300, y: 760 }}
            //scroll={{ x: 600, }}
            
            scroll={{ x: 0, }}

            // @ts-ignore
            getColumns={getPointColums}
            enablePagination={true}
            pageSize={10}
            enableSearch={false}
            //searchPlaceholder="닉네임, 계정, 휴대폰번호"

            //////userEmail={data?.email}

            userId={ id }

            className="mt-6 min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
          />


        </CustomTabPanel>
      </Box>



        {/*

        <div className="-mx-4 flex items-center justify-around border-b-2 border-b-gray-200 font-medium sm:mx-0 md:justify-start md:gap-8">


          {tabs.map((item) => (
            <button
              key={item.id}
              className={cn(
                'relative pb-4 font-semibold capitalize text-gray-500 focus:outline-none @4xl:pb-5 md:px-4',
                active === item.id && 'text-gray-1000'
              )}
              onClick={() => handleTabClick(item.id)}
            >
              <span>{item.id}</span>
              <Badge
                variant="flat"
                className="ms-2 border border-gray-300 bg-gray-200 p-0.5 px-1.5"
              >
                {item.count}
              </Badge>
              {active === 'posts' && item.id === 'posts' && (
                <span className="absolute inset-x-0 -bottom-0.5 z-10 h-0.5 bg-gray-1000"></span>
              )}
            </button>
          ))}
        </div>
        <PostFeed />
        */}

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
