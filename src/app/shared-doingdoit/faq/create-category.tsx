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
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useState } from 'react';

import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';


import {
  defaultValues,
  categoryFormSchema,
  CategoryFormTypes,
} from '@/utils/validators/doingdoit/create-category.schema';

///import { Button } from '@mui/material';

import { on } from 'events';



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




export default function InfoCreate() {

  const { push } = useRouter();


  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');



  const [isSaving, setIsSaving] = useState(false);

  const saveCategory = async (data: CategoryFormTypes) => {

    if (isSaving) return;

    setIsSaving(true);

    // fetch api
    const res = await fetch('/api/doingdoit/faq/createCategory', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const result = await res.json();

    setIsSaving(false);

    if (result) {


      toast.success(<Text as="b">저장되었습니다!</Text>);

      push(routes.operation.faqcategory);

    };

  

  }


  const onSubmit: SubmitHandler<CategoryFormTypes> = (data) => {

    saveCategory(data);

    /*
    toast.success(<Text as="b">저장되었습니다!</Text>);
    console.log(' data ->', {
      ...data,
    });
    push(routes.operation.faqcategory);
    */

  };



  return (
    
    <Form<CategoryFormTypes>
      
      validationSchema={categoryFormSchema}

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

            
            <div className="mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">


              <FormGroup
                title="분류"
              >

                <Input
                  size='lg'
                  //label="Company Name"
                  placeholder="분류를 입력하세요"
                  {...register('name')}
                  error={''}
                />

                
              </FormGroup>

            </div>



            
            <FormFooter
              // isLoading={isLoading}
              altBtnText="취소"
              submitBtnText="저장히기"

              isLoading={isSaving}
            
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
