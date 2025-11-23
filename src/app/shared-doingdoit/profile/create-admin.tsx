'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

import { PhoneNumber } from '@/components/ui/phone-input';

import { Input } from '@/components/ui/input';

import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared-doingdoit/form-group';


import FormFooter from '@/components/doingdoit/form-footer';



import UploadZone from '@/components/ui/file-upload/upload-zone';

import { countries, roles, timezones } from '@/data/doingdoit/forms/my-details';

import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useState } from 'react';

import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

import { Checkbox } from '@/components/ui/checkbox';


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


import { Badge } from '@/components/ui/badge';
import { data } from '@/data/doingdoit/board/data';
import { de } from '@faker-js/faker';



const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});



/*
export const roles = [
  {
    name: '영양사',
    value: 'food_consultant',
  },
  {
    name: '관리자',
    value: 'admin_manager',
  },
  {
    name: '게시판 관리자',
    value: 'board_manager',
  },
  {
    name: '회원 관리자',
    value: 'cs_manager',
  },
];
*/

/*
    {
      value: 'faq',
      name: '자주하는질문',
      label: (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">자주하는질문</Text>
        </div>
      ),
    },
    */

    /* option is different color */

const roleOptions = [

  {
    value: 'feedbackWriter',
    name: '영양사',
    label: (
      <div className="flex items-center">
        <Badge color="info" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">영양사</Text>
      </div>
    ),
  },
  {
    value: 'admin',
    name: '관리자',
    label: (
      <div className="flex items-center">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">관리자</Text>
      </div>
    ),
  },
  {
    value: 'boardManager',
    name: '게시판 관리자',
    label: (
      <div className="flex items-center">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">게시판 관리자</Text>
      </div>
    ),
  },
  {
    value: 'customerManager',
    name: '회원 관리자',
    label: (
      <div className="flex items-center">
        <Badge color="danger" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">회원 관리자</Text>
      </div>
    ),
  },
];





export default function Create() {

  const { push } = useRouter();


  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');


  
  const defaultValues = {
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
  };

  const [ accessData, setAccessData ] = useState(defaultValues);
  

  console.log('accessData:', accessData);


  /*
  const onSubmit: SubmitHandler<ProfileFormTypes> = (data) => {

    
    toast.success(<Text as="b">저장되었습니다!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
    

    ////push(routes.user.admin);

  };
  */


  const [isRegistering, setIsRegitering] = useState(false);


  const onSubmit: SubmitHandler<ProfileFormTypes> = async (data) => {

    console.log('data:', data);

    //return;

    setIsRegitering(true);

    // call api
    const res = await fetch(`/api/doingdoit/user/setOneManager`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.loginId + '@cryptoss.beauty',
        loginId: data.loginId,
        password: data.loginPassword,
        regType: 'email',
        roles: 'admin', // 'admin' or 'user'
        nickname: data.nickname,
        mobile: data.mobile,
        description: data.description,
        isAgreedTerms: 'Y', // 'Y' or 'N'
        isAgreedPrivacy: 'Y', // 'Y' or 'N'
        isAgreedMarketing: 'Y', // 'Y' or 'N'
        access: accessData,
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


  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);


  const [emailErrorMessage, setEmailErrorMessage] = useState("");







  return (
    
    <Form<ProfileFormTypes>
      validationSchema={profileFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        
        //defaultValues,

      }}
    >

      {({ register, control, setValue, getValues, formState: { errors } }) => {


        return (
          <>

            
            <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">


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
                    />
                    <div className="flex items-center justify-start">
                      <Text className="text-sm">
                        관리역할을 입력해주세요.
                      </Text>
                    </div>
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
                    />
                    <div className="flex items-center justify-start">
                      <Text className="text-sm " >
                        노출되는 이름입니다. 실명을 입력해주세요.
                      </Text>
                    </div>
                  
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
                    />
                    <div className="flex items-center justify-start">
                      <Text className="text-sm">
                        연락가능한 핸드폰 번호를 입력해주세요.
                      </Text>
                    </div>
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


                      //error={''}

                      error={
                        emailErrorMessage
                      }
                      errorClassName="text-left "

                      onChange={

                        async (e) => {

                          //setEmail(e.target.value);


                          //onChange(e.target.value);


                          const res = await fetch(`/api/doingdoit/user/checkDuplicateEmail?_email=${e.target.value + '@cryptoss.beauty'}`);
                          const json = await res?.json() as any;

                          ///console.log("json.data", json?.data);

                          if (json?.data === 'Y') {
            

                            setEmailErrorMessage("이미 가입된 아이디입니다.");


                          } else {
                            
                            setEmailErrorMessage("");

                          }

                        }

                      }





                    />
                    <div className="flex items-center justify-start">
                      <Text className="text-sm">
                        아이디는 4자리 이상 영문, 숫자 조합으로 입력해주세요. 
                      </Text>
                    </div>
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
                    />
                    <div className="flex items-center justify-start">
                      <Text className="text-sm">
                        비밀번호는 8자리 이상 영문, 숫자 조합으로 입력해주세요. 
                      </Text>
                    </div>
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

                              setAccessData({
                                ...accessData,
                                access_user_member: e.target.checked,
                              });

                            }

                          }

                          checked={value}

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

                              setAccessData({
                                ...accessData,
                                access_user_withdrew: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_user_admin: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_feed: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_feed_stats: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_board: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_board_tag: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_survey: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_survey_stats: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_operation_healthinfo: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_operation_guide: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_operation_notice: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_operation_faq: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_operation_faqcategory: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_point: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_point_setting: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_setup_food: e.target.checked,
                              });

                            }
                          }
                          checked={value}
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

                              setAccessData({
                                ...accessData,
                                access_setup_terms: e.target.checked,
                              });

                            }
                          }
                          checked={value}
                        />
                      )}
                    />

                  </div>

                </div>
                



            </div>




         



            
            <FormFooter
              isLoading={isRegistering}
              altBtnText="취소"
              submitBtnText="저장하기"

              handleSubmitBtn={() => {

                // if accessData is all false, then show error message
                if (

                  accessData.access_user_member === false &&
                  accessData.access_user_withdrew === false &&
                  accessData.access_user_admin === false &&
                  accessData.access_feed === false &&
                  accessData.access_feed_stats === false &&
                  accessData.access_board === false &&
                  accessData.access_board_tag === false &&
                  accessData.access_survey === false &&
                  accessData.access_survey_stats === false &&
                  accessData.access_operation_healthinfo === false &&
                  accessData.access_operation_guide === false &&
                  accessData.access_operation_notice === false &&
                  accessData.access_operation_faq === false &&
                  accessData.access_operation_faqcategory === false &&
                  accessData.access_point === false &&
                  accessData.access_point_setting === false &&
                  accessData.access_setup_food === false &&
                  accessData.access_setup_terms === false

                ) {
                    
                    toast.error(<Text as="b">권한을 선택해주세요.</Text>);
                    return;
  
                  }



                

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
