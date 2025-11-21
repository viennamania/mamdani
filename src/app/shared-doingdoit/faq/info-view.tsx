'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared-doingdoit/form-group';
import FormFooter from '@/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useState } from 'react';

import DateCell from '@/components/ui/date-cell';

import { Checkbox } from '@/components/ui/checkbox';

import StatusField from '@/components/controlled-table/status-field';

import { Badge } from '@/components/ui/badge';



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



/* 자주하는질문, 공지사항, 이용약관, 개인정보처리방침, 이용안내, 이벤트, 쿠폰, 포인트, 적립금, 배송정책, 교환/환불, 취소/반품, 결제/배송, 회원정보, 회원탈퇴, 회원등급, 회원혜택, 회원쿠폰, */
const statusOptions = [
  {
    value: 'all',
    name: '전체',
    label: (
      <div className="flex items-center">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">전체</Text>
      </div>
    ),
  },
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
  {
    value: 'notice',
    name: '공지사항',
    label: (
      <div className="flex items-center">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-orange-dark">공지사항</Text>
      </div>
    ),
  },
  {
    value: 'terms',
    name: '이용약관',
    label: (
      <div className="flex items-center">
        <Badge color="danger" renderAsDot />
        <Text className="ms-2 font-medium text-red-dark">이용약관</Text>
      </div>
    ),
  },

]



export type DetailsTypes = {
  item: any;
};


export default function InfoView({
  item,
}: React.PropsWithChildren<DetailsTypes>) {

 
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text>Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };



  return (

          <>
            
            <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              {/*
              <FormGroup
                title="NO"
                
              >
                <Text>{item?.id}</Text>
              </FormGroup>
              */}
              
              <FormGroup
                title="등록일"
              >
                <DateCell date={item?.createdAt} className='w-fit' />
              </FormGroup>

              {/* checkbox */}
              <FormGroup
                title="자주하는 질문"
                
              >
                <Checkbox
                  variant="flat"
                  aria-label={'ID'}
                  className="cursor-pointer"
                  color='primary'
                  checked={item?.isTop}
                />
              </FormGroup>


              <FormGroup
                title="분류"
                
              >
                <Text>
                  {statusOptions.find((option) => option.value === item?.category)?.label ?? item?.category}
                </Text>

              </FormGroup>

              <FormGroup
                title="작성자"
                
              >
                <Text>
                  {item?.name} ({item?.email})
                </Text>
              </FormGroup>

              <FormGroup
                title="질문"
              >
                <Text>회원가입은 어디서 하나요?</Text>
              </FormGroup>

              <FormGroup
                title="답변"
              >
                <div className='flex flex-col items-center justify-start gap-5'>
          
                <Text>
                  회원가입은 첫페이지에서 이메일주소와 비밀번호를 입력하시면 됩니다.

                </Text>
                </div>
              </FormGroup>
              

            </div>



            {/*
            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
            */}

          </>

  );
}
