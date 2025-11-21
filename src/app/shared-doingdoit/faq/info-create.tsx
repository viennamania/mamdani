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



import  { useState, useEffect } from 'react';

import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';


import Select from '@/components/ui/select';


import { useSession } from 'next-auth/react';




import {
  defaultValues,
  boardFormSchema,
  BoardFormTypes,
} from '@/utils/validators/doingdoit/create-board.schema';


import { Checkbox } from '@/components/ui/checkbox';

import TableAvatar from '@/components/ui/avatar-card';
import { categoryFormSchema } from '@/utils/validators/create-category.schema';



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



  const { data: session, status } = useSession();


  const [loading, setLoading] = useState(false);



  const [user, setUser] = useState<any>();


  useEffect(() => {
    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }

      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      //////console.log(json);

      const data = json as any;
      
      if (data?.data) {
        setUser(data?.data)
      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email]);



  /* fetch faq category */

  const [faqCategory, setFaqCategory] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {


      const res = await fetch('/api/doingdoit/faq/getAllCategories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          limit: 1000,
          page: 1,
          sort: 'orderNumber',
          order: 'asc',
          q: '',

          }),
      });

  
      const posts  = await res?.json() as any;

      console.log('posts?.data?.categories: ', posts?.data?.categories);
  
      setFaqCategory(posts?.data?.categories);




    };
    fetchData();
  } , []);



    /* create */
    const create  = async (

      title: string,
      content: string,
      tags: string[],
      category: string,

      isTop: string,


    ) => {

      if (loading) return;

      setLoading(true);

      try {
    
  

        const params = {
          userId: user?.id,
          userEmail: user?.email,
          userName: user?.name,
          userNickname: user?.nickname,
          userAvatar: user?.avatar,
    
    
          title: title,
          content: content,


          
          images: [ ],
    
          tags: [ ],
          category: category,

          isTop: isTop,
    
        };
    
        console.log('params: ', params);
  
  
  
        const res = await fetch(`/api/doingdoit/faq/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
  
  
  
        console.log(' res: ', res);
    
        if (res.status === 200) {
          const json = await res?.json() as any;
    
          if (json === undefined) {
            
            return;
          } else {
    
            const data = json as any;
        
            if (data)  {
              
    
              toast.success(<Text as="b">저장되었습니다.!</Text>);
      
              push(routes.operation.faq);
    
    
            } else {
              //alert(json.message);
            }    
    
          }
    
    
        } else {
          
        }
  
    
      } catch (e) {
        ///setError(e);
      }

      setLoading(false);


    }

  
  
  



  const onSubmit: SubmitHandler<BoardFormTypes> = (data) => {

    const { title } = data as any;
    const { content } = data as any;
    const { category } = data as any;

    const { isTop } = data as any;

    ///const { tags } = data;

    console.log('onSubmit: ', data);

    create(title, content, [], category?.value,
      isTop === true ? 'Y' : 'N',
      );


      
    console.log(' data ->', {
      ...data,
    });
    
  };




  return (
    
    <Form<BoardFormTypes>
      validationSchema={boardFormSchema}
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

              {/*
              <FormGroup
                title="Name"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder="First Name"
                  {...register('first_name')}
                  error={errors.first_name?.message}
                  className="flex-grow"
                />
                <Input
                  placeholder="Last Name"
                  {...register('last_name')}
                  error={errors.last_name?.message}
                  className="flex-grow"
                />
              </FormGroup>
              */}

              <FormGroup
                title="작성자"
                
              >
                <Text as="b">
                
                  <TableAvatar
                    src={user?.avatar || '/usermain/images/avatar.svg'}
                    name={user?.nickname || '작성자'}
                    description={user?.email || '작성자 이메일'}
                  />
                
                </Text>
              </FormGroup>

              {/* category  select */}
              <FormGroup
                title="분류"
              >
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange, value } }) => (
                    <SelectBox
                      value={value}
                      onChange={onChange}

                      options={
                        faqCategory?.map((item: any) => ({
                          label: item.name,
                          value: item.name,
                          name: item.name,
                        }))
                      }

                      placeholder="분류를 선택하세요."
                      className="w-full"
                    />
                  )}
                />

              </FormGroup>


              {/* checkbox */}
              <FormGroup
                title="자주하는 질문"
                
              >

                <Controller
                  control={control}
                  name="isTop"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      variant="flat"
                      aria-label={'isTop'}
                      className="cursor-pointer"
                      //color='primary'
                      checked={value}
                      onChange={onChange}
                    />
                  )}
                />


              </FormGroup>



              <FormGroup
                title="제목"
                
              >

                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        placeholder="제목을 입력해 주세요."
                        className="w-full"
                      />
                    )}
                    // check if bio has 30 characters
                    rules={{

                      //validate: (v) =>  (v as string).length <= 30 || '30자 이내로 입력해주세요.',

                      //maxLength: 30,
                     

                    }}
                    
                    //display counter of characters
                  />

              </FormGroup>



              <FormGroup
                title="내용"
                
              >
                <Controller
                  control={control}
                  name="content"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor
                      value={value}
                      onChange={onChange}
                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[200px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />

                    
                  )}
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
