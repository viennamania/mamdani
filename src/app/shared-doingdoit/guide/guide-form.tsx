'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

import { PhoneNumber } from '@/components/ui/phone-input';

import { Input } from '@/components/ui/input';

import Spinner from '@/components/ui/spinner';


///import FormGroup from '@/app/shared-doingdoit/form-group';
import FormGroup from '@/app/shared-doingdoit/form-group-large';


import FormFooter from '@/components/doingdoit/form-footer';

import TableAvatar from '@/components/ui/avatar-card';



import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';


import Uploader from '@/components/doingdoit/upload/uploader';



import  { useState, useEffect, useRef } from 'react';


import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

import DateCell from '@/components/ui/date-cell';

import { Badge } from '@/components/ui/badge';

import Tags from "./tags";

import { SubmitHandler, Controller, useForm, FormProvider, } from 'react-hook-form';

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
  boardFormSchema,
  BoardFormTypes,
} from '@/utils/validators/doingdoit/create-board.schema';





import TableBasicIcon from '@/components/icons/table-basic';
import { set } from 'lodash';
import { fr } from '@faker-js/faker';
import { ChangeStream } from 'mongodb';


/*
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
*/

const WysiwygEditor = dynamic(() => import('@/components/ui/toast-editor'), {
  ssr: false,
});


import {
  CreateProductInput,
  productFormSchema,
} from '@/utils/validators/create-product.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { tags } from '@/app/shared/explore-nft/nft-filter-tags';
import { it } from 'node:test';
import Script from 'next/script';




  export type DetailsTypes = {
    //item: any;
    id: string;
  };
  

  // id param
  
  export default function InfoForm({
    
    id,
    
  }: React.PropsWithChildren<DetailsTypes>) {
  
  
    console.log('id ->', id);

  

  const { push } = useRouter();

  const [values, setValues] = useState<string[]>([]);

  
  //const [value, setValue] = useState(item?.content);

  const [isTop, setIsTop] = useState(false);


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


  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    
    /////defaultValues: defaultValues(product),
  
  });




  const [isLoading, setLoading] = useState(false);

  const [item, setItem] = useState<any>(null);

  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");




  // api call

  useEffect(() => {

    // api call

    const fetcher = async () => {

      setLoading(true);

      const res = await fetch(`/api/doingdoit/guide/getOne?id=${id}`);

      const data = await res?.json() as any;

      console.log('data ->', data);

      setItem(data?.data);

      setTitle(data?.data?.title);
      setContent(data?.data?.content);

      setTagList(data?.data?.tags);

      setFeedImage1(data?.data?.images?.[0]);
      setFeedImage2(data?.data?.images?.[1]);
      setFeedImage3(data?.data?.images?.[2]);
      setFeedImage4(data?.data?.images?.[3]);
      setFeedImage5(data?.data?.images?.[4]);
      setFeedImage6(data?.data?.images?.[5]);
      setFeedImage7(data?.data?.images?.[6]);
      setFeedImage8(data?.data?.images?.[7]);
      setFeedImage9(data?.data?.images?.[8]);
      setFeedImage10(data?.data?.images?.[9]);

      setIsTop(data?.data?.isTop === 'Y' ? true : false);


      


      setLoading(false);
    }

    fetcher();
    
  } ,[ id ]);



  /*
  const editorRef = useRef(null); // 에디터를 초기화할 DOM을 참조하기 위해 ref 사용


  useEffect(() => {
    const editorElement = editorRef.current; // 현재 DOM 참조 가져오기
  
    if (editorElement) {
  
      
      (window as any).nhn.husky.EZCreator.createInIFrame({
        oAppRef: (window as any).oEditors,
        elPlaceHolder: "smarteditor", // 에디터가 초기화될 요소의 ID
        sSkinURI: "/se2/SmartEditor2Skin.html", // 에디터 스킨 경로
        fCreator: "createSEditor2"
      });
      


      //(window as any).oEditors.getById["smarteditor"].setIR(content);


  
    }
  
    // 컴포넌트 언마운트 시 에디터 인스턴스 제거
    return () => {
      if ((window as any).oEditors) {
        ///(window as any).oEditors.getById["smarteditor"].exec("SE2M_EditingAreaManager").removeAll();
      }
    };
  
  }, [ editorRef ]);
  



  useEffect(() => {

    // timer

    const timer = setTimeout(() => {

      console.log('content ->', content);

      const editorElement = editorRef.current; // 현재 DOM 참조 가져오기
  
      if (editorElement) {
  
        try {
          (window as any).oEditors?.getById["smarteditor"].setIR(content);
        } catch (e) {
          console.log('error ->', e);
        }
  
      }

    }, 1000);




  } ,[ (window as any).oEditors?.getById?.["smarteditor"], content ]);

  */


  const onSubmit: SubmitHandler<BoardFormTypes> = (data) => {


    const content = data?.content;


    // update api call

    const fetcher = async () => {
      const res = await fetch(`/api/doingdoit/guide/updateOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          // id + data

          id,
          tags: tagList,
          images: [
            feedImage1,
            feedImage2,
            feedImage3,
            feedImage4,
            feedImage5,
            feedImage6,
            feedImage7,
            feedImage8,
            feedImage9,
            feedImage10,
          ],
          title: title,
          content: content,

          isTop: isTop ? 'Y' : 'N',

          //...data,


          //...data,

        }),
      });

      const resData = await res?.json() as any;

      toast.success(<Text as="b">저장되었습니다!</Text>);

      window.history.back();

    }



    fetcher();



    /*
    toast.success(<Text as="b">저장되었습니다!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });

    push(routes.operation.guide);
    */
  };



  /*
  useEffect(() => {
    if (item) {
      setTitle(item?.title);
      setContent(item?.content);
    }
  } ,[ item ]);
  */


  return (
    
    <Form<BoardFormTypes>
      validationSchema={boardFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      
      className='@container'

      useFormProps={{
        mode: 'onChange',

        defaultValues: {
          title: item?.title,
          content: item?.content,
        },


        /*
        defaultValues : {
          title: item?.title,
          content: item?.content,
        },
        */
      }}
    >

      {({ register, control, setValue, getValues, formState: { errors } }) => {


        return (
          
          <>




            {false ? (
              <div className="grid h-20 place-content-center">
                <Spinner />
              </div>
            ) : (


            
            <div className="mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">



              <FormGroup
                title="등록일자"
                
              >
                <Text >

                  <DateCell date={item?.createdAt} className='w-fit' />
                </Text>
              </FormGroup>

              <FormGroup
                title="작성자"
                
              >
                {/*
              <TableAvatar
                src={
                  item?.userAvatar || '/usermain/images/avatar.svg'
                }
                name={item?.userNickname}
                /////description={row.userEmail}
              />
              */}

              <Text >{item?.userNickname}</Text>

              </FormGroup>



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
                      
                      checked={
                        isTop
                      }

                      onChange={
                        (e) => {
                          setIsTop(e.target.checked);
                        }
                      } 

                    />
                  )}
                />
  
              </FormGroup>


              <FormGroup
                title="제목"
                
              >


                <Controller
                    name="title"
                    
                    control={control}
                    
                    render={({ field: { onChange, value } }) => (
                      <Input
                        //color='info'
                        size='lg'
                        type="text"

                        value={ title   }
                        onChange={
                          (e) => {
                            setTitle(e.target.value);
                            
                          }
                        }

               

                        //onChange={(e) => setTitle(() => e.target.value)} 

                        //label="Company Name"

                        placeholder="제목을 입력하세요"
                        //{...register('last_name')}

                        //{...register('title')}

                        error={''}

                        className='w-full'
                      />
                    )}
                  />
  
                        
              </FormGroup>


              <FormGroup
                title="이미지" 
              >

              
                <div className="flex flex-row items-center justify-start xl:w-[800px]">

                  { !feedImage1 ? (
                    <div className="flex flex-wrap gap-2">
                      <Uploader
                        onSave={(url: string) => {
                          addUploadedImage(1, url);
                        }}
                      />
                    </div>
                  ) : (
                    <div className='flex flex-wrap gap-2'>
                      <div className="flex flex-col items-center justify-center ">
                        <Image
                          src={feedImage1}
                          alt="image"
                          width={150}
                          height={150}
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}
                        />

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              removeFeedImage(1);
                            }}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                
                </div>
              </FormGroup>


              <FormGroup
                title="태그"
                
              >

              { tagList && tagList.length > 0 && (

                <div className="flex flex-wrap gap-2 mb-4">

                  {tagList.map((tag) => (

                    <div
                      key={tag}
                      className="flex flex-wrap gap-2 mb-4">

                    <Badge
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      {/* delete tag */}
                      <div className="flex items-center gap-2">
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => {
                            console.log('tagRemove: ', tag);

                            const updatedTags = tagList.filter((item:string) => item !== tag);
                            setTagList(updatedTags);
                          }}
                        >
                          x
                        </button>
                      </div>
 
                    </Badge>

                    </div>
                  ))}
                </div>

              )}

 

                  
              <FormProvider {...methods}>
                <form
                >

                <Tags
                    //feedTagsWidth="unset"
                    //feedTagsAlignSelf="stretch"

                 
                    //initialTags={item?.tags}

                    // initial tags

                    

                    

               

                    tagAdd={(tag: string) => {
                      console.log('tagAdd: ', tag);

                      // check if tag is already in tags
                      ///const isTagInTags = tags.includes(tag);

                      var isTagInTags = false;

                      tagList.map((item:string) => {
                        if (item === tag) {
                          isTagInTags = true;
                        }
                      } );


                      if (!isTagInTags) {

                        console.log('tagAdd: ', tag);


                        const newTags = [...tagList, tag];

                        console.log('========newTags: ', newTags);

                        setTagList(newTags);

                      }

                      console.log('========tagList: ', tagList);  

                    } }



                    tagRemove={(tag: string) => {
                      console.log('tagRemove: ', tag);

                      const updatedTags = tagList.filter((item:string) => item !== tag);
                      setTagList(updatedTags);

                      
                    } }

                  />
                  
                </form>
              </FormProvider>


              </FormGroup>

              <FormGroup
                title="내용"
              >
                <WysiwygEditor
                  initialValue={content}

                  
                  handleSubmit={
                    (updatedContent: string) => {

                      //console.log('updatedContent', updatedContent)

                      ///setContent(content);

                      setValue('content', updatedContent);


                      //setContent(updatedContent);

                      
                      onSubmit(getValues());


             
                    }
                  }


                />

              </FormGroup>


              

            </div>

            )}



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

                //push(routes.operation.guide);



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
