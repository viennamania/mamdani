'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import InputBox from "@/components-figma/input-box";
import BoxList from "@/components-figma/box-list";
import InputMulti from "@/components-figma/input-multi";
import Tag1 from "@/components-figma/tag1";
import BtnBigOn from "@/components-figma/btn-big-on";
import Footer from "@/components-figma/footer";



import { useEffect, useState } from "react";
import Link from "next/link";
import { get, set, update } from "lodash";

import { Input } from '@/components/ui/input';






import Uploader from '@/components/doingdoit/upload/uploaderFeedImage';


import Image from "next/image";


import FeedTags from "./feed-tags";


import FormFooter from '@/components/doingdoit/form-footer';


/*
import {
  CreateProductInput,
  productFormSchema,
} from '@/utils/validators/create-product.schema';
*/


import { zodResolver } from '@hookform/resolvers/zod';



import toast from 'react-hot-toast';

import { Text } from '@/components/ui/text';

/////////import { tags } from "@/app/shared/explore-flight/listing-filters/filter-utils";


import dynamic from 'next/dynamic';

import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';

import { Form } from '@/components/ui/form';

import { useSession } from 'next-auth/react';



///import { defaultValues } from '@/app/shared/ecommerce/product/create-edit/form-utils';




import {
  defaultValues,
  boardFormSchema,
  BoardFormTypes,
} from '@/utils/validators/doingdoit/create-board.schema';

import { on } from "events";
import { title } from "process";


const QuillEditor = dynamic(() => import('@/components-figma/ui/quill-editor'), {
  ssr: false,
});




const slug = '';


export default function BoardCreatePage() {



  
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);


  /*
  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    
    /////defaultValues: defaultValues(product),

  });
  */

  const methods = useForm<BoardFormTypes>({
    resolver: zodResolver(boardFormSchema),
    
    //defaultValues: defaultValues(  ),

  });



  const { data: session, status } = useSession();

  /* fetch user data from an API
    /api/doingdoit/user/getUser
  */
  const [userId, setUserId] = useState(session?.user?.id);
  const [userEmail, setUserEmail] = useState(session?.user?.email);
  const [userName, setUserName] = useState(session?.user?.name);
  const [userNickname, setUserNickname] = useState('');
  const [userAvatar, setUserAvatar] = useState(session?.user?.image);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      //////console.log(json);

      const data = json as any;
      
      if (data.data) {
        setUserId(data.data.id);
        setUserEmail(data.data.email);
        setUserName(data.data.name);
        setUserNickname(data.data.nickname);
        setUserAvatar(data.data.avatar);
      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email]);





  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
 
  const [tagList, setTagList] = useState <any[]>([]);





    ///const [tags, setTags] = useState (feed?.tags);

  // tags is string array
  

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



  /* create */
  const create  = async (

    title: string,
    content: string,
    tags: string[],
    hiddenYn: string,


  ) => {

    setLoading(true);

    try {

      setError(null);
      
      //////const res = await fetch(`/api/doingdoit/feed/updateFeedById?_id=${_id}&_feedTitle=${feedTitle}&_feedContent=${feedContent}&_name=${userName}&_avatar=${userAvatar}&_nickname=${userNickname}`);


      // updateOneByIdJson
      // post api for updateOneByIdJson

      const params = {
        userId: userId,
        userEmail: userEmail,
        userName: userName,
        userNickname: userNickname,
        userAvatar: userAvatar,
        


        title: title,
        content: content,
        
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

        tags: tags,

        hiddenYn: hiddenYn,
      };

      console.log('params: ', params);



      const res = await fetch(`/api/doingdoit/board/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });




      if (res.status === 200) {
        const json = await res?.json() as any;

        if (json === undefined) {
          //alert("이메일이 이미 존재합니다.");
          return;
        } else {

          const data = json as any;
      
          if (data)  {
            //alert("구매주문등록이 완료되었습니다.");

            //window.location.href = `/usermain/feeds/${_id}`;

            window.location.href = `/usermain/boards`;


          } else {
            //alert(json.message);
          }    

        }


      }
      else {
        
      }

    
    } catch (e) {
      ///setError(e);
    }
    setLoading(false);

  }







  
  const addUploadedImage = async (imageNumber: number, url: string) => {
    try {
      //setUser(null);
      setError(null);

        //setFeedImage(url);

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
  


  /*
  const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('product_data', data);
      toast.success(
        <Text as="b">Product successfully {slug ? 'updated' : 'created'}</Text>
      );
      methods.reset();
    }, 600);
  };
  */



  const onSubmit: SubmitHandler<BoardFormTypes> = (data) => {

  
    /*
    const { title } = data;
    const { content } = data;
    */


    const { hidden } = data;


    // remove html tags
    ///const strippedHtml = bio?.replace(/(<([^>]+)>)/gi, "");

    ///setFeedTitle(strippedHtml as string);

    ///updateFeed(strippedHtml as string, bio as string);

    //setFeedTitle(bio as string);
    //setFeedContent(bio as string);

    const hiddenYn = hidden === true ? 'Y' : 'N';

    create(title as string, content as string, tagList as any, hiddenYn as string);


 
    /*
    toast.success(<Text as="b">Successfully added!</Text>);
   

    console.log('Profile settings data ->', {
      ...data,
    });
    */
    

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

    <div className="h-full w-full bg-white">

      <div className="bg-dark felx sticky top-0 z-50 ">
        <Top1
          logo="/usermain/images/logo-oneclick.png"
          topBackgroundColor="#fff"
          topBorderBottom="1px solid #ddd"
          topBoxSizing="border-box"
          frameDivBorderBottom="unset"
          frameDivBoxSizing="unset"
          divColor="#212121"
          frameDivBorderBottom1="unset"
          frameDivBoxSizing1="unset"
          divColor1="#212121"
          frameDivBorderBottom2="2px solid #212121"
          frameDivBoxSizing2="border-box"
          divColor2="#212121"
          divColor3="#212121"
          aboutColor="#212121"
          frameDivBorder="1px solid #666"
          divColor4="#212121"
          frameDivBorder1="1px solid #666"
          divColor5="#212121"
        />
      </div>


    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-left text-xs text-dark font-menu-off">
      
      <div className="self-stretch flex flex-col items-center justify-start">
       
        <div className="self-stretch xl:bg-background flex flex-col items-center justify-start py-5 xl:py-10 ">
          <div className=" w-full xl:w-[1000px] flex flex-col items-center justify-start">

            <div className="self-stretch bg-white flex flex-col items-center justify-end  p-5 xl:p-10 gap-[10px] xl:gap-[40px]">
              
  
              <div
                className="self-stretch flex flex-row items-center justify-end pt-0 px-0 pb-5 text-left text-5xl text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
                //style={bread1Style}
              >
             
                {/*
                <div className="w-full relative tracking-[-0.02em] font-extrabold text-xl xl:text-2xl">
                  {'글쓰기'}
                </div>
                */}
                {/* horizontal centering of full width */}
                <div className="absolute   inset-x-0 flex items-center justify-center xl:relative xl:justify-start xl:w-full">
                  <div className="relative font-extrabold text-xl xl:text-2xl">
                    {'글쓰기'}
                  </div>
                </div>
                




                <Link
                  href="/usermain/boards"
                  className=" no-underline flex "
                >
                  <Image
                    width="24"
                    height="24"
                    className="relative w-6 h-6 overflow-hidden shrink-0"
                    alt=""
                    src="/usermain/images/x2.svg"
                  />
                </Link>
              </div>
              
              
              <div className="self-stretch flex flex-col items-center justify-end gap-[20px] xl:gap-[40px]">
                

                
                <div className="xl:hidden self-stretch flex flex-col items-start justify-center gap-[8px]">
                  
                  <div className="self-stretch relative">
                    <span>
                      <span className="text-sm font-extrabold font-menu-off">
                        제목
                      </span>
                      <span>(30자 이내)</span>
                      <span></span>
                    </span>
                    <span className="text-sm font-extrabold text-red">*</span>
                  </div>


                  {/* 제목 */}
                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={title}
                        
                        onChange={(e) => {
                          onChange;            
                          setTitle(e.target.value);
                        }}

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

                  
                </div>


                <div className="self-stretch flex flex-col items-start justify-center gap-[12px] text-sm">

                  
                  
                  <div className="self-stretch relative font-extrabold">
                    <span>이미지</span>
                  </div>
                  

                  {/* image upload */}

                  <div className="flex flex-row gap-2 items-center justify-center ">


                    { !feedImage1 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2 w-14 h-14 xl:w-20 xl:h-20">
                        <Uploader
                          number={0}
                          onSave={(url: string) => {
                            addUploadedImage(1, url);
                          }}
                        />
                      </div>
                    )}


                    
                    { feedImage1 && !feedImage2 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">

                        <Uploader
                          number={1}
                          onSave={(url: string) => {
                            addUploadedImage(2, url);
                          }}
                        />

                        <div className="flex flex-col items-center justify-center ">
                          
                          <Image
                            src={feedImage1}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative  w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />

                          {/* remove button for image 1 */}
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
                        

                      </div>

                    )}

                    { feedImage1 && feedImage2 && !feedImage3 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">
                        <Uploader
                          number={2}
                          onSave={(url: string) => {
                            addUploadedImage(3, url);
                          }}
                        />

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage1}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(1)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage2}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(2)}
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

                      </div>
                    )}
               

                    { feedImage1 && feedImage2 && feedImage3 && !feedImage4 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">

                        <Uploader
                          number={3}
                          onSave={(url: string) => {
                            addUploadedImage(4, url);
                          }}
                        />
                         
                         <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage1}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(1)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage2}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(2)}
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


                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage3}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(3)}
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


                      </div>
                    )}


                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && !feedImage5 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">

                        <Uploader
                          number={4}
                          onSave={(url: string) => {
                            addUploadedImage(5, url);
                          }}
                        />

                        <div className="flex flex-col items-center justify-center ">
                         <Image
                          src={feedImage1}
                          alt="food image"
                          width={150}
                          height={150}
                          className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}
                        />
                        <button
                          onClick={() => removeFeedImage(1)}
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

                        <div className="flex flex-col items-center justify-center ">
                        <Image
                          src={feedImage2}
                          alt="food image"
                          width={150}
                          height={150}
                          className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}
                        />
                        <button
                          onClick={() => removeFeedImage(2)}
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

                        <div className="flex flex-col items-center justify-center ">
                        <Image
                          src={feedImage3}
                          alt="food image"
                          width={150}
                          height={150}
                          className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}
                        />
                        <button
                          onClick={() => removeFeedImage(3)}
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

                        <div className="flex flex-col items-center justify-center ">
                        <Image
                          src={feedImage4}
                          alt="food image"
                          width={150}
                          height={150}
                          className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}
                        />
                        <button
                          onClick={() => removeFeedImage(4)}
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


                      </div>
                    )}


                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && feedImage5 && !feedImage6 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">


                        <Uploader
                          number={5}
                          onSave={(url: string) => {
                            addUploadedImage(6, url);
                          }}
                        />

                        <div className="flex flex-col items-center justify-center ">
                         <Image
                          src={feedImage1}
                          alt="food image"
                          width={150}
                          height={150}
                          className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}
                        />
                        <button
                          onClick={() => removeFeedImage(1)}
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



                        <div className="flex flex-col items-center justify-center ">
                        <Image
                          src={feedImage2}
                          alt="food image"
                          width={150}
                          height={150}
                          className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}
                        />
                        <button
                          onClick={() => removeFeedImage(2)}
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


                        <div className="flex flex-col items-center justify-center ">
                        <Image
                          src={feedImage3}
                          alt="food image"
                          width={150}
                          height={150}
                          className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}

                        />
                        <button
                          onClick={() => removeFeedImage(3)}
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

                        <div className="flex flex-col items-center justify-center ">
                        <Image
                          src={feedImage4}
                          alt="food image"
                          width={150}
                          height={150}
                          className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}

                        />
                        <button
                          onClick={() => removeFeedImage(4)}
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

                        <div className="flex flex-col items-center justify-center ">
                        <Image
                          src={feedImage5}
                          alt="food image"
                          width={150}
                          height={150}
                          className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}
                        />
                        <button
                          onClick={() => removeFeedImage(5)}
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

 
                      </div>
                    )}


                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && feedImage5 && feedImage6 && !feedImage7 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">

                        <Uploader
                          number={6}
                          onSave={(url: string) => {
                            addUploadedImage(7, url);
                          }}
                        />


                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage1}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(1)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage2}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(2)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage3}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(3)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage4}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(4)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage5}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(5)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage6}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(6)}
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

                      </div>
                    )}



                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && feedImage5 && feedImage6 && feedImage7 && !feedImage8 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">



                        <Uploader
                          number={7}
                          onSave={(url: string) => {
                            addUploadedImage(8, url);
                          }}
                        />


                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage1}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(1)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage2}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(2)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage3}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(3)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage4}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(4)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage5}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(5)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage6}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(6)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage7}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(7)}
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

                      </div>
                    )}


                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && feedImage5 && feedImage6 && feedImage7 && feedImage8 && !feedImage9 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">

                        <Uploader
                          number={8}
                          onSave={(url: string) => {
                            addUploadedImage(9, url);
                          }}
                        />


                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage1}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(1)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage2}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(2)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage3}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(3)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage4}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(4)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage5}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(5)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage6}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(6)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage7}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(7)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage8}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(8)}
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

                      </div>
                    )}


                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && feedImage5 && feedImage6 && feedImage7 && feedImage8 && feedImage9 && !feedImage10 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">

                        <Uploader
                          number={9}
                          onSave={(url: string) => {
                            addUploadedImage(10, url);
                          }}
                        />

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage1}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(1)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage2}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(2)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage3}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(3)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage4}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(4)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage5}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(5)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage6}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(6)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage7}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(7)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage8}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(8)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage9}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(9)}
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


                      </div>
                    )}


                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && feedImage5 && feedImage6 && feedImage7 && feedImage8 && feedImage9 && feedImage10 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">
                         
                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage1}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(1)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage2}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(2)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage3}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(3)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage4}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(4)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage5}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(5)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage6}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(6)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage7}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(7)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage8}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(8)}
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


                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage9}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(9)}
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

                        <div className="flex flex-col items-center justify-center ">
                          <Image
                            src={feedImage10}
                            alt="food image"
                            width={150}
                            height={150}
                            className="relative w-14 h-14 xl:w-20 xl:h-20 rounded-lg overflow-hidden shrink-0"
                            style={{objectFit: 'cover'}}
                          />
                          <button
                            onClick={() => removeFeedImage(10)}
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

                        
                      </div>
                    )}
                    
                      

                  </div>

                </div>





                <div className=" hidden  self-stretch xl:flex flex-col items-start justify-center gap-[8px]">
                  
                  <div className="self-stretch relative">
                    <span>
                      <span className="text-sm font-extrabold font-menu-off">
                        제목
                      </span>
                      <span>(30자 이내)</span>
                      <span></span>
                    </span>
                    <span className="text-sm font-extrabold text-red">*</span>
                  </div>


                  {/* 제목 */}
                  
                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={title}
                        
                        onChange={(e) => {
                          onChange;            
                          setTitle(e.target.value);
                        }}
                          
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
                  
                  
                </div>

                <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                  <div className="self-stretch relative">
                    <span>
                      <span className="text-sm font-extrabold font-menu-off">
                        내용
                      </span>
                      <span>(1000자 이내)</span>
                      <span></span>
                    </span>
                    <span className="text-sm font-extrabold text-red">*</span>
                  </div>


                  <Controller
                    control={control}
                    name="content"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={
                          content
                        }

                        onChange={
                          (e) => {
                            onChange;
                            setContent(e);
                        }}

                        className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px] w-full h-64 "
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                    // check if bio has 30 characters
                    rules={{

                      //validate: (v) =>  (v as string).length <= 30 || '30자 이내로 입력해주세요.',

                      //maxLength: 30,
                     

                    }}
                    
                    //display counter of characters
                  />


                  {/* display counter of characters */}
                  {/*
                  <div className="flex justify-end text-xs text-gray-500 dark:text-gray-400">
                    {getValues('bio')?.length}/30
                  </div>
                  */}
                  
                  
                  
                  {/*
                  <Controller
                    control={control}
                    name="hidden"
                    render={({ field: { onChange, value } }) => (
                      <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-gray-500 ">
                        <input
                          type="checkbox"
                          className="w-5 h-5
                          text-dark  border-[1px] border-solid border-dark
                          "
                          //checked={public}
                          onChange={onChange}
                          //{...register('public')}
                        />
                        <label htmlFor="public">비공개하고싶어요!</label>
                      </div>
                    
                    )}

                  />
                    */}



                  

                

                </div>





                {/*
                <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                  
                  <div className="self-stretch relative">
                    <span>
                      <span className="text-sm font-extrabold font-menu-off">
                        내용
                      </span>
                      <span>(1000자 이내)</span>
                    </span>
                    <span className="text-sm font-extrabold text-red">*</span>
                  </div>
                  <Input
                    ///value={feedContent}
                    onChange={(e) => setFeedContent(e.target.value)}
                    placeholder="내용을 입력해 주세요."
                    className="w-full"
                  />
                </div>
                */}
                
                <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                  
                  
                  
                  <div className="self-stretch relative">
                    <span>
                      <span className="text-sm font-extrabold font-menu-off">
                        태그
                      </span>

                      <span>(최대 3개)</span>
                    </span>
                    <span className="text-sm font-extrabold text-red">*</span>
                  </div>
                  


                  {/*
                  <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                    <div className="relative">추천태그</div>
                    <div className="flex-1 flex flex-row items-center justify-start gap-[4px]">
                      
                      <button
                        onClick={() => {


                          var isTagInTags = false;

                          tagList.map((item:string) => {
                            if (item === '맛집') {
                              isTagInTags = true;
                            }
                          } );

                          isTagInTags ? null : setTagList([...tagList, '맛집']);

                          
                        } }
                        className="rounded-81xl flex flex-row items-center justify-center py-2 px-3 text-center text-3xs text-grey-6 font-menu-off border-[1px] border-solid border-grey-c">
                        <div className="relative">맛집</div>
                      </button>

                      <button
                        onClick={() => {
                          const tag = '여행';
                          const newTags = [...tagList, tag];
                          setTagList(newTags);
                        } }
                        className="rounded-81xl flex flex-row items-center justify-center py-2 px-3 text-center text-3xs text-grey-6 font-menu-off border-[1px] border-solid border-grey-c">
                        <div className="relative">여행</div>
                      </button>

                    </div>
                  </div>
                  */}
                  


                  
              <FormProvider {...methods}>
                <form
                  //onSubmit={methods.handleSubmit(onSubmit)}
                  
                  
                  //className={cn('[&_label.block>span]:font-medium', className)}
                >
                  
                  <FeedTags
                    //feedTagsWidth="unset"
                    //feedTagsAlignSelf="stretch"

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
                


                </div>

              </div>
            </div>

                  

            <div className="self-stretch flex flex-row items-center justify-between text-base font-semibold   ">

              {/* title, content */}
              { title !== '' && content !== '' 
                  ? (

                <button
                  className=" p-5 self-stretch w-full flex flex-row items-center justify-center bg-dark text-white "
                  onClick={() => {
                    
                    //updateFeed();

                    onSubmit(getValues());


                  } }
                >
                  등록하기
                </button>

              ) : (
                <button
                  className=" p-5 self-stretch w-full flex flex-row items-center justify-center bg-grey-f1 text-dark "

                  onClick= {() => {
                    toast.error(
                      '필수 입력값을 모두 입력해주세요.',
                      {
                        //position: 'top-right',
                      }
                    );
                  } }

                >
                  등록하기
                </button>


              )}

              </div>



          </div>
        </div>
      </div>








    </div>






    </div>

    );




  }}
  </Form>
);



};


