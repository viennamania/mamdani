'use client';

import { useEffect, useState } from 'react';



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


import { routes } from '@/config/routes';

import { usePathname, useRouter } from 'next/navigation';





import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';

import dynamic from 'next/dynamic';


import FormGroup from '@/app/shared-doingdoit/form-group';
import { Form } from '@/components/ui/form';


import { Checkbox } from '@/components/ui/checkbox';

import FormFooter from '@/components/doingdoit/form-footer';



import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';


/*
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
*/


import {
  defaultValues,
  profileFormSchema,
  ProfileFormTypes,
} from '@/utils/validators/doingdoit/create-profile.schema';
import { log } from 'console';
import { access } from 'fs';
import { set } from 'lodash';




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


export default function AdminEdit({
  id,
}: React.PropsWithChildren<ProfileDetailsTypes>) {

 

  console.log('AdminEdit id: ', id);


  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: 'Followers',
    data: followersData,
  });
  const [active, setActive] = useState(tabs[0].id);

  const { push } = useRouter();


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


  const [sequenceNumber, setSequenceNumber] = useState(0);

  const [loginId, setLoginId] = useState(userData.loginId);
  const [loginPassword, setLoginPassword] = useState(userData.password);
  const [nickname, setNickname] = useState(userData.nickname);
  const [mobile, setMobile] = useState(userData.mobile);
  const [description, setDescription] = useState(userData.description);


  const [access_user_member, setAccessUserMember] = useState(userData.access?.access_user_member);
  const [access_user_withdrew, setAccessUserWithdrew] = useState(userData.access?.access_user_withdrew);
  const [access_user_admin, setAccessUserAdmin] = useState(userData.access?.access_user_admin);
  const [access_feed, setAccessFeed] = useState(userData.access?.access_feed);
  const [access_feed_stats, setAccessFeedStats] = useState(userData.access?.access_feed_stats);
  const [access_board, setAccessBoard] = useState(userData.access?.access_board);
  const [access_board_tag, setAccessBoardTag] = useState(userData.access?.access_board_tag);
  const [access_survey, setAccessSurvey] = useState(userData.access?.access_survey);
  const [access_survey_stats, setAccessSurveyStats] = useState(userData.access?.access_survey_stats);
  const [access_operation_healthinfo, setAccessOperationHealthinfo] = useState(userData.access?.access_operation_healthinfo);
  const [access_operation_guide, setAccessOperationGuide] = useState(userData.access?.access_operation_guide);
  const [access_operation_notice, setAccessOperationNotice] = useState(userData.access?.access_operation_notice);
  const [access_operation_faq, setAccessOperationFaq] = useState(userData.access?.access_operation_faq);
  const [access_operation_faqcategory, setAccessOperationFaqcategory] = useState(userData.access?.access_operation_faqcategory);
  const [access_point, setAccessPoint] = useState(userData.access?.access_point);
  const [access_point_setting, setAccessPointSetting] = useState(userData.access?.access_point_setting);
  const [access_setup_food, setAccessSetupFood] = useState(userData.access?.access_setup_food);
  const [access_setup_terms, setAccessSetupTerms] = useState(userData.access?.access_setup_terms);


 


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch(`/api/doingdoit/user/getUser?_id=${id}`);
  
      const data  = await res?.json() as any;

      ///console.log("board data===========================", data.data);
  
      setUserData(data?.data);


      setSequenceNumber(data?.data?.sequenceNumber);

      setLoginId(data?.data?.loginId);
      setLoginPassword(data?.data?.password);
      setNickname(data?.data?.nickname);
      setMobile(data?.data?.mobile);
      setDescription(data?.data?.description);
      
      setAccessUserMember(data?.data?.access?.access_user_member);
      setAccessUserWithdrew(data?.data?.access?.access_user_withdrew);
      setAccessUserAdmin(data?.data?.access?.access_user_admin);
      setAccessFeed(data?.data?.access?.access_feed);
      setAccessFeedStats(data?.data?.access?.access_feed_stats);
      setAccessBoard(data?.data?.access?.access_board);
      setAccessBoardTag(data?.data?.access?.access_board_tag);
      setAccessSurvey(data?.data?.access?.access_survey);
      setAccessSurveyStats(data?.data?.access?.access_survey_stats);
      setAccessOperationHealthinfo(data?.data?.access?.access_operation_healthinfo);
      setAccessOperationGuide(data?.data?.access?.access_operation_guide);
      setAccessOperationNotice(data?.data?.access?.access_operation_notice);
      setAccessOperationFaq(data?.data?.access?.access_operation_faq);
      setAccessOperationFaqcategory(data?.data?.access?.access_operation_faqcategory);
      setAccessPoint(data?.data?.access?.access_point);
      setAccessPointSetting(data?.data?.access?.access_point_setting);
      setAccessSetupFood(data?.data?.access?.access_setup_food);
      setAccessSetupTerms(data?.data?.access?.access_setup_terms);




  
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



  const [ accessData, setAccessData ] = useState(
    userData.access
  );
  







  const [isRegistering, setIsRegitering] = useState(false);


  const onSubmit: SubmitHandler<ProfileFormTypes> = async (data) => {

    console.log('data:', data);

    //return;

    setIsRegitering(true);

    // call api
    const res = await fetch(`/api/doingdoit/user/updateOneManager`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        email: loginId + '@cryptoss.beauty',
        loginId: loginId,
        password: loginPassword,
        regType: 'email',
        roles: 'admin', // 'admin' or 'user'
        nickname: nickname,
        mobile: mobile,
        description: description,
        isAgreedTerms: 'Y', // 'Y' or 'N'
        isAgreedPrivacy: 'Y', // 'Y' or 'N'
        isAgreedMarketing: 'Y', // 'Y' or 'N'

        access: {
          access_user_member: access_user_member,
          access_user_withdrew: access_user_withdrew,
          access_user_admin: access_user_admin,
          access_feed: access_feed,
          access_feed_stats: access_feed_stats,
          access_board: access_board,
          access_board_tag: access_board_tag,
          access_survey: access_survey,
          access_survey_stats: access_survey_stats,
          access_operation_healthinfo: access_operation_healthinfo,
          access_operation_guide: access_operation_guide,
          access_operation_notice: access_operation_notice,
          access_operation_faq: access_operation_faq,
          access_operation_faqcategory: access_operation_faqcategory,
          access_point: access_point,
          access_point_setting: access_point_setting,
          access_setup_food: access_setup_food,
          access_setup_terms: access_setup_terms,
        },
      }),
    });


    const json = await res?.json();

    //console.log('json:', json);

    setIsRegitering(false);


    if (res.status === 200) {
      toast.success(<Text as="b">저장되었습니다!</Text>);
      console.log('Profile settings data ->', {
        ...data,
      });

      ///push(routes.user.admin);

      window.history.back();

    } else {
      toast.error(<Text as="b">저장에 실패했습니다!</Text>);
    }


  }




  return (
    
    <Form<ProfileFormTypes>
      validationSchema={profileFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        
        //defaultValues,
        /*
        defaultValues: {
          loginId: userData.loginId,
          loginPassword: userData.password,
          nickname: userData.nickname,
          mobile: userData.mobile,
          description: userData.description,

          access_user_member: userData.access?.access_user_member,
          access_user_withdrew: userData.access?.access_user_withdrew,
          access_user_admin: userData.access?.access_user_admin,
          access_feed: userData.access?.access_feed,
          access_feed_stats: userData.access?.access_feed_stats,
          access_board: userData.access?.access_board,
          access_board_tag: userData.access?.access_board_tag,
          access_survey: userData.access?.access_survey,
          access_survey_stats: userData.access?.access_survey_stats,
          access_operation_healthinfo: userData.access?.access_operation_healthinfo,
          access_operation_guide: userData.access?.access_operation_guide,
          access_operation_notice: userData.access?.access_operation_notice,
          access_operation_faq: userData.access?.access_operation_faq,
          access_operation_faqcategory: userData.access?.access_operation_faqcategory,
          access_point: userData.access?.access_point,
          access_point_setting: userData.access?.access_point_setting,
          access_setup_food: userData.access?.access_setup_food,
          access_setup_terms: userData.access?.access_setup_terms,
        },
        */


      }}
    >

      {({ register, control, setValue, getValues, formState: { errors } }) => {


        return (
          <>

            
            <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              {/*
              <FormGroup
                title="No"
              >
                <Text>{sequenceNumber}</Text>
              </FormGroup>
              */}


              <Controller
                control={control}
                name="description"
                render={({ field: { value, onChange } }) => (

                  <FormGroup
                    title="관리역할"
                  >
                    {/*
                    <SelectBox
                      size='lg'
                      placeholder="관리역할을 선택하세요"
                      //options={roles}
                      options={roleOptions}
                      onChange={onChange}
                      value={value}
                      //className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        roles?.find((r) => r.value === selected)?.name ?? ''
                      }
                      error={errors?.roles?.message as string}
                    />
                    */}

                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="관리역할을 입력하세요"
                      {...register('description')}
                      error={''}

                      value={
                        description
                      }
                      onChange={
                        (e) => {
                          setDescription(e.target.value);
                        }
                      }
                    />

                  </FormGroup>

                )}
              />


              <Controller
                control={control}
                name="nickname"
                render={({ field: { value, onChange } }) => (
                  <FormGroup
                    title="담당자명"
                  >

                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="담당자명을 입력하세요"
                      {...register('nickname')}
                      error={''}
                      value={
                        nickname
                      }
                      onChange={
                        (e) => {
                          setNickname(e.target.value);
                        }
                      }
                    />

                  
                  </FormGroup>
                )}
              />


              <Controller
                control={control}
                name="mobile"
                render={({ field: { value, onChange } }) => (

                <FormGroup
                    title="연락처"
                  >
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="연락처를 입력하세요"
                      {...register('mobile')}
                      error={''}
                      value={
                        mobile
                      }
                      onChange={
                        (e) => {
                          setMobile(e.target.value);
                        }
                      }
                    />

                  </FormGroup>

                )}

              />


              <Controller
                control={control}
                name="loginId"
                render={({ field: { value, onChange } }) => (

                  <FormGroup
                    title="아이디"
                  >
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="아이디를 입력하세요"

                      {...register('loginId')}

                      error={''}

                      value={
                        loginId
                      }
                      onChange={
                        (e) => {
                          setLoginId(e.target.value);
                        }
                      }

                    />

                  </FormGroup>

                )}

              />

              <Controller
                control={control}
                name="loginPassword"
                render={({ field: { value, onChange } }) => (

                  <FormGroup
                    title="비밀번호"
                  >
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="비밀번호를 입력하세요"
                      {...register('loginPassword')}
                      error={''}
                      value={

                        //loginPassword
                        '**********'
                      }
                      onChange={
                        (e) => {
                          setLoginPassword(e.target.value);
                        }
                      }
                    />

                  </FormGroup>

                )}

              />


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


     

                    <Controller
                      control={control}
                      name="access_user_member"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="회원"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessUserMember(e.target.checked);

                            }

                          }

                          checked={
                            access_user_member
                          }

                        />

                      )}
                    />

                    <Controller
                      control={control}
                      name="access_user_withdrew"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="탈퇴회원"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessUserWithdrew(e.target.checked);

                            }
                          }
                          checked={
                            access_user_withdrew
                          }

                        />

                      )}
                    />

                    <Controller
                      control={control}
                      name="access_user_admin"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="관리계정관리"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessUserAdmin(e.target.checked);

                            }
                          }
                          checked={
                            access_user_admin
                          }
                        />

                      )}
                    />

                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>구매주문</div>

                    <Controller
                      control={control}
                      name="access_feed"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="구매주문관리"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessFeed(e.target.checked);

                            }
                          }
                          checked={
                            access_feed
                          }
                        />

                      )}
                    />

                    <Controller
                      control={control}
                      name="access_feed_stats"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="구매주문통계"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessFeedStats(e.target.checked);
                            }
                          }
                          checked={
                            access_feed_stats
                          }
                        />

                      )}
                    />

                 
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>자유게시판</div>

                    <Controller
                      control={control}
                      name="access_board"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="게시글관리"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessBoard(e.target.checked);

                            }
                          }
                          checked={
                            access_board
                          }
                        />

                      )}
                    />

                    <Controller
                      control={control}
                      name="access_board_tag"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="추천태그관리"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessBoardTag(e.target.checked);

                            }
                          }
                          checked={
                            access_board_tag
                          }
                        />

                      )}
                    />
            

                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>설문</div>

                    <Controller
                      control={control}
                      name="access_survey"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="설문관리"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessSurvey(e.target.checked);
                            }
                          }
                          checked={
                            access_survey
                          }
                        />

                      )}
                    />
              
                    <Controller
                      control={control}
                      name="access_survey_stats"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="설문통계"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessSurveyStats(e.target.checked);

                            }
                          }
                          checked={
                            access_survey_stats
                          }
                        />

                      )}
                    />

                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>운영관리</div>

                    <Controller
                      control={control}
                      name="access_operation_healthinfo"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="테더정보"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessOperationHealthinfo(e.target.checked);

                            }
                          }
                          checked={
                            access_operation_healthinfo
                          }
                        />

                      )}
                    />

                    <Controller
                      control={control}
                      name="access_operation_guide"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="유형별가이드"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessOperationGuide(e.target.checked);

                            }
                          }
                          checked={
                            access_operation_guide
                          }
                        />

                      )}
                    />
                
                    <Controller
                      control={control}
                      name="access_operation_notice"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="공지사항"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessOperationNotice(e.target.checked);

                            }
                          }
                          checked={
                            access_operation_notice
                          }
                        />

                      )}
                    />
                 
                    <Controller
                      control={control}
                      name="access_operation_faq"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="FAQ"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessOperationFaq(e.target.checked);

                            }
                          }
                          checked={
                            access_operation_faq
                          }
                        />

                      )}
                    />

                    <Controller
                      control={control}
                      name="access_operation_faqcategory"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="FAQ분류관리"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessOperationFaqcategory(e.target.checked);

                            }
                          }
                          checked={
                            access_operation_faqcategory
                          }
                        />

                      )}
                    />
                 
    
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>포인트</div>

                    <Controller
                      control={control}
                      name="access_point"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="포인트관리"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessPoint(e.target.checked);

                            }
                          }
                          checked={
                            access_point
                          }
                        />

                      )}
                    />
    
                    <Controller
                      control={control}
                      name="access_point_setting"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="포인트설정"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessPointSetting(e.target.checked);

                            }
                          }
                          checked={
                            access_point_setting
                          }
                        />

                      )}
                    />

                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>설정</div>
                    <Controller
                      control={control}
                      name="access_setup_food"
                      render={({ field: { value, onChange } }) => (

                        <Checkbox
                          label="식품DB관리"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessSetupFood(e.target.checked);

                            }
                          }
                          checked={
                            access_setup_food
                          }
                        />

                      )}
                    />
                    
                    <Controller
                      control={control}
                      name="access_setup_terms"
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          label="약관"
                          className="mt-3"
                          labelClassName="text-gray-800"
                          size="lg"
                          onChange={

                            (e) => {

                              setAccessSetupTerms(e.target.checked);

                            }
                          }
                          checked={
                            access_setup_terms
                          }
                        />
                      )}
                    />

                  </div>

                </div>
                



            </div>




         



            
            <FormFooter
              isLoading={isRegistering}
              altBtnText="취소"
              submitBtnText="저장히기"

              handleSubmitBtn={() => {

                onSubmit(getValues());

              } }

              handleAltBtn={() => {
                console.log('handleAltBtn');

                //push(routes.operation.healthinfo);

                //Router.push({routes.feed});

                //Router.push('/feed');

                window.history.back();

              } }
              /*
              handleMainBtn={() => {

                console.log('handleMainBtn');

              } }
              */
          
            
            />
            

          </>
        );
      }}


      
    </Form>
  );



}
