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

///import FormGroup from '@/app/shared-doingdoit/form-group';
import FormGroup from '@/app/shared-doingdoit/form-group-large';


import FormFooter from '@/components/doingdoit/form-footer';



import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useState, useEffect, useRef, use } from 'react';

///import React, { useRef } from "react";


import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';


import { useSession } from 'next-auth/react';


import Uploader from '@/components/doingdoit/upload/uploaderFeedImage';




import {
  defaultValues,
  boardFormSchema,
  BoardFormTypes,
} from '@/utils/validators/doingdoit/create-board.schema';


import { Checkbox } from '@/components/ui/checkbox';

import TableAvatar from '@/components/ui/avatar-card';




/*
import Link from 'next/link';


import ReactQuill from "react-quill";



const modules = {
  toolbar: {
    container: [
      ["image"],
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "underline"],
    ],
  },
};
*/



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



import { Editor } from '@toast-ui/react-editor'
import { set } from 'lodash';


const WysiwygEditor = dynamic(() => import('@/components/ui/toast-editor'), {
  ssr: false,
});



export default function InfoCreate() {

  const { push } = useRouter();


  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');



  const { data: session, status } = useSession();


  const [loading, setLoading] = useState(false);



  const [user, setUser] = useState<any>();



  //const editorRef = useRef<Editor>(null);



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



  const [tagList, setTagList] = useState <any[]>([]);



  const [feedImage1, setFeedImage1] = useState<any>(null);
  const [feedImage2, setFeedImage2] = useState<any>(null);
  const [feedImage3, setFeedImage3] = useState<any>(null);
  const [feedImage4, setFeedImage4] = useState<any>(null);
  const [feedImage5, setFeedImage5] = useState<any>(null);
  const [feedImage6, setFeedImage6] = useState<any>(null);
  const [feedImage7, setFeedImage7] = useState<any>(null);
  const [feedImage8, setFeedImage8] = useState<any>(null);
  const [feedImage9, setFeedImage9] = useState<any>(null);
  const [feedImage10, setFeedImage10] = useState<any>(null);



  const addUploadedImage = async (imageNumber: number, url: string) => {
    try {
  
  
  
  
      if (imageNumber === 1) {
        setFeedImage1(url);
      } else if (imageNumber === 2) {
        setFeedImage2(url);
      } else if (imageNumber === 3) {
        setFeedImage3(url);
      } else if (imageNumber === 4) {
        setFeedImage4(url);
      } else if (imageNumber === 5) {
        setFeedImage5(url);
      } else if (imageNumber === 6) {
        setFeedImage6(url);
      }
      else if (imageNumber === 7) {
        setFeedImage7(url);
      }
      else if (imageNumber === 8) {
        setFeedImage8(url);
      }
      else if (imageNumber === 9) {
        setFeedImage9(url);
      }
      else if (imageNumber === 10) {
        setFeedImage10(url);
      }
  
  
    } catch (e) {
      ///setError(e);
    }
  }
  


  const removeFeedImage = async (imageNumber: number) => {

    // rotate imageNumber
    // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

    // if imageNumber is 1, then remove imageNumber 1 and move imageNumber 2 to imageNumber 1

    // if imageNumber is 2, then remove imageNumber 2 and move imageNumber 3 to imageNumber 2

    // if imageNumber is 3, then remove imageNumber 3 and move imageNumber 4 to imageNumber 3

    // if imageNumber is 4, then remove imageNumber 4 and move imageNumber 5 to imageNumber 4

    // if imageNumber is 5, then remove imageNumber 5 and move imageNumber 6 to imageNumber 5

    if (imageNumber === 1) {
      setFeedImage1(feedImage2);
      setFeedImage2(feedImage3);
      setFeedImage3(feedImage4);
      setFeedImage4(feedImage5);
      setFeedImage5(feedImage6);
      setFeedImage6(feedImage7);
      setFeedImage7(feedImage8);
      setFeedImage8(feedImage9);
      setFeedImage9(feedImage10);
      setFeedImage10(null);
    } else if (imageNumber === 2) {

      setFeedImage2(feedImage3);
      setFeedImage3(feedImage4);
      setFeedImage4(feedImage5);
      setFeedImage5(feedImage6);
      setFeedImage6(feedImage7);
      setFeedImage7(feedImage8);
      setFeedImage8(feedImage9);
      setFeedImage9(feedImage10);
      setFeedImage10(null);

    } else if (imageNumber === 3) {

      setFeedImage3(feedImage4);
      setFeedImage4(feedImage5);
      setFeedImage5(feedImage6);
      setFeedImage6(feedImage7);
      setFeedImage7(feedImage8);
      setFeedImage8(feedImage9);
      setFeedImage9(feedImage10);
      setFeedImage10(null);

    } else if (imageNumber === 4) {

      setFeedImage4(feedImage5);
      setFeedImage5(feedImage6);
      setFeedImage6(feedImage7);
      setFeedImage7(feedImage8);
      setFeedImage8(feedImage9);
      setFeedImage9(feedImage10);
      setFeedImage10(null);

    } else if (imageNumber === 5) {

      setFeedImage5(feedImage6);
      setFeedImage6(feedImage7);
      setFeedImage7(feedImage8);
      setFeedImage8(feedImage9);
      setFeedImage9(feedImage10);
      setFeedImage10(null);

    } else if (imageNumber === 6) {
        
      setFeedImage6(feedImage7);
      setFeedImage7(feedImage8);
      setFeedImage8(feedImage9);
      setFeedImage9(feedImage10);
      setFeedImage10(null);

    } else if (imageNumber === 7) {

      setFeedImage7(feedImage8);
      setFeedImage8(feedImage9);
      setFeedImage9(feedImage10);
      setFeedImage10(null);

    } else if (imageNumber === 8) {

      setFeedImage8(feedImage9);
      setFeedImage9(feedImage10);
      setFeedImage10(null);

    } else if (imageNumber === 9) {
        
      setFeedImage9(feedImage10);
      setFeedImage10(null);

    } else if (imageNumber === 10) {

      setFeedImage10(null);

    }


  }


  

    /* create */
    const create  = async (

      title: string,
      content: string,
      tags: string[],
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
 

          images: [
          
            feedImage1,
          ],
    
    
          tags: tags,

          isTop: isTop,
    
        };
    
        console.log('params: ', params);
  
  
  
        const res = await fetch(`/api/doingdoit/notice/create`, {
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
      
              push(routes.operation.notice);
    
    
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

  
  
  
  ///const [content, setContent] = useState<string>('');



  const onSubmit: SubmitHandler<BoardFormTypes> = (data) => {

    const { title } = data as any;
    const { content } = data as any;
    const { tags } = data as any;
    const { isTop } = data as any;

    ///const { tags } = data;

    ///console.log('onSubmit: ', data);


    ///let markDownContent = '';
    
    //if (editorRef.current) {
    //  markDownContent = (editorRef.current as any).getInstance().getMarkdown();
    //}
    
    //let htmlContent = (editorRef.current as any)?.getInstance()?.getHTML();

    
    //const htmlContent = editorRef.current?.getInstance().getHTML() || '';
  

    
    //console.log(markDownContent);
    //console.log("================================================");
    //console.log(htmlContent);
    //console.log("================================================");



    

    
    create(title, content, tags,
      isTop ? 'Y' : 'N',
      );
    
    
      
    
    //console.log('Notice data ->', {
    //  ...data,
    //});
    
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
              <link
                rel="stylesheet"
                href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
              />
              */}


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


              {/* checkbox */}
              <FormGroup
                title="상단고정"
                
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



              {/*
              <FormGroup
                title="이미지" 
              >
              
                <div className="flex flex-row gap-2 items-center justify-start ">


                { !feedImage1 && (
                  <div className="flex flex-row gap-2 items-center justify-center ">
                    <Uploader
                      number={1}
                      onSave={(url: string) => {
                        addUploadedImage(1, url);
                      }}
                    />
                  </div>
                )}

                { feedImage1 && (
                  <div className="flex flex-row gap-2 items-center justify-center ">
                    <Image
                      src={feedImage1}
                      alt="user avatar"
                      width={150}
                      height={150}
                      className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"

                      style={{objectFit: 'cover'}}
                    />


                    <button
                      onClick={() => removeFeedImage(1)}
                      //className="absolute top-0 right-0"
                    >
                      <Image
                        src="/usermain/images/x2.svg"
                        alt="remove image"
                        width={20}
                        height={20}
                        className="mt-2 relative w-5 h-5 rounded-sm overflow-hidden shrink-0 "
                        style={{objectFit: 'cover'}}
                      />
                    </button>

                  </div>
                )}

                </div>
                
              </FormGroup>
              */}





              {/*
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
              */}
              

              <FormGroup
                title="내용"
                
              >
     
                <WysiwygEditor

                  initialValue={''}
                  
                  //ref={editorRef}

                  handleSubmit={
                    (updatedContent: string) => {
                      
                      //console.log('updatedContent', updatedContent)

                      ///setContent(content);

                      setValue('content', updatedContent);

                      
                      onSubmit(getValues());

                    }
                  }

                />
                
              </FormGroup>


            </div>



            {/*
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


            />
            */}
            

          </>
        );

        
      }}


    </Form>
  );
}
