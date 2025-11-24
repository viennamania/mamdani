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



export default function InfoView() {

 
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };



  return (
    
    <Form<PersonalInfoFormTypes>
      validationSchema={personalInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {

        return (
          <>
            
            <div className="pt-10 mb-10 grid gap-7 divide-y divide-dashed divide-gray-200  ">


              
              <FormGroup
                title="등록일"
                className="pt-3 "
              >
                <Text as="b">2023-11-15 13:43:55 </Text>
              </FormGroup>

              <FormGroup
                title="작성자"
                className="pt-3"
              >
                <Text as="b">에일리 (abcd@gmail.com)</Text>
              </FormGroup>

              <FormGroup
                title="제목"
                className="pt-3"
              >
                <Text as="b">서비스 준비중입니다.</Text>
              </FormGroup>


              <FormGroup
                title="내용"
                className="pt-3"
              >
                <div className='flex flex-col items-center justify-start gap-5'>
                <Text as="b">내용입니다.</Text>
                <Text as="b">내용입니다.</Text>
                <Text as="b">내용입니다.</Text>
                <Text as="b">
                  서비스 준비중입니다.

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
      }}
    </Form>
  );
}
