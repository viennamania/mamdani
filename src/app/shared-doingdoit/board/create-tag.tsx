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
  //defaultValues,
  tagSchema,
  TagSchema,
} from '@/utils/validators/doingdoit/tag.schema';



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

  const [loadingData, setLoadingData] = useState(false);


  const onSubmit: SubmitHandler<TagSchema> = (data) => {





    console.log(' data ->', {
      ...data,
    });

    // api call
    ///async function postData() {

    const postData = async () => {

      if (loadingData) return;

      setLoadingData(true);

      const response = await fetch('/api/doingdoit/board/createTag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


      //////console.log('/api/doingdoit/board/createTag response:', response);




      setLoadingData(false);




      toast.success(<Text as="b">저장되었습니다!</Text>);

      push('/board/tag');
      


      return response.json();

      
    }


    
    postData()
      .then((data) => {
        console.log(data);

        /*
        toast.success(<Text as="b">저장되었습니다!</Text>);

        push('/board/tag');
        */

      })
      .catch((error) => {
        console.error('Error:', error);

        toast.success(<Text as="b">실패하였습니다.!</Text>);

      });
      

    
   

    




 


    /*
    toast.success(<Text as="b">저장되었습니다!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
    push(routes.board.index);
    */


  };



  return (
    
    <Form<TagSchema>
      validationSchema={tagSchema}
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

            
            <div className="mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">


              <FormGroup
                title="태그"
              >

                <Input
                  size='lg'
                  //label="Company Name"
                  placeholder="태그를 입력하세요"
                  {...register('name')}
                  error={''}
                />
                
              </FormGroup>



            </div>



            
            <FormFooter
              // isLoading={isLoading}
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
