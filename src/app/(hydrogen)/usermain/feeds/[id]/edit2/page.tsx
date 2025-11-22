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



import { useSession } from 'next-auth/react';


import Uploader from '@/components/doingdoit/upload/uploaderFeedImage';

import Uploader2 from '@/components/doingdoit/upload/uploaderFeedImage2';


import Image from "next/image";


import FeedTags from "./feed-tags";


import FormFooter from '@/components/doingdoit/form-footer';



import {
  CreateProductInput,
  productFormSchema,
} from '@/utils/validators/create-product.schema';

import { zodResolver } from '@hookform/resolvers/zod';



import toast from 'react-hot-toast';

import { Text } from '@/components/ui/text';

/////////import { tags } from "@/app/shared/explore-flight/listing-filters/filter-utils";


import dynamic from 'next/dynamic';

import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';

import { Form } from '@/components/ui/form';



///import { defaultValues } from '@/app/shared/ecommerce/product/create-edit/form-utils';

import {
  defaultValues,
  feedFormSchema,
  FeedFormTypes,
} from '@/utils/validators/doingdoit/create-feed.schema';
import { on } from "events";
import { setUser } from "@/lib/api/user";
import { fa } from "@faker-js/faker";



const QuillEditor = dynamic(() => import('@/components-figma/ui/quill-editor'), {
  ssr: false,
});

const slug = '';


export default function FeedDetailTwoPage({

  params,
}: {
  params: any;
}) {

  const _id =  params?.id;

  console.log('FeedEditPage id: ', _id);


  
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);



  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    
    /////defaultValues: defaultValues(product),

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

      if (!session?.user?.email) {
        return;
      }

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




  //const [feedTitle, setFeedTitle] = useState('');
  //const [feedContent, setFeedContent] = useState('');
 
  //const [tagList, setTagList] = useState <any[]>([]);





  const [feed, setFeed] = useState({}) as any;



  const [feedTitle, setFeedTitle] = useState("");
  const [feedContent, setFeedContent] = useState("");

  const [hiddenYn, setHiddenYn] = useState(false);


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





  useEffect(() => {

    const fetchFeed = async () => {

      if (!_id) {
        return;
      }

      setLoading(true);
      try {

        setError(null);
        const res = await fetch(`/api/doingdoit/feed/getFeedById?_id=${_id}`);

   
        if (res.status === 200) {
          const json = await res?.json() as any;

          console.log('FeedEditPage feed: ', json?.data);
          
       
          ///setUserEmail(json.data.email);

          setFeed(json?.data);

          setFeedTitle(json.data.feedContent);
          setFeedContent(json.data.feedContent);

          setHiddenYn(json.data.hiddenYn === 'Y' ? true : false);

          setFeedImage1(json.data.image1);
          setFeedImage2(json.data.image2);
          setFeedImage3(json.data.image3);
          setFeedImage4(json.data.image4);
          setFeedImage5(json.data.image5);
          setFeedImage6(json.data.image6);
          setFeedImage7(json.data.image7);
          setFeedImage8(json.data.image8);
          setFeedImage9(json.data.image9);
          setFeedImage10(json.data.image10);



        }
        else {
          
        }

      
      } catch (e) {
        ////setError(e);
      }
      setLoading(false);
    }

    fetchFeed();

  }, [_id , ]);


    ///const [tags, setTags] = useState (feed?.tags);

  // tags is string array
  






  /* updateFeed */
  const updateFeed  = async (



  ) => {

    setLoading(true);

    try {

      setError(null);
      
      //////const res = await fetch(`/api/doingdoit/feed/updateFeedById?_id=${_id}&_feedTitle=${feedTitle}&_feedContent=${feedContent}&_name=${userName}&_avatar=${userAvatar}&_nickname=${userNickname}`);


      // updateOneByIdJson
      // post api for updateOneByIdJson

      const params = {
        id: _id,
        
        userId: userId,
        email: userEmail,
        name: userName,
        nickname: userNickname,
        avatar: userAvatar,
        

        feedTitle: feedContent,
        feedContent: feedContent,
        hiddenYn: hiddenYn ? 'Y' : 'N',

        ////tags: tagList,
      };

      //console.log('FeedDetailTwoPage params: ', params);



      const res = await fetch(`/api/doingdoit/feed/updateOneByIdJson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });



      //console.log('FeedDetailTwoPage res: ', res);

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

            window.location.href = `/usermain/feeds/${_id}`;


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

      
      const res = await fetch(`/api/doingdoit/feed/updateFeedImageById?_id=${_id}`
      + `&_imageNumber=${imageNumber}`
      + `&_image=${url}`
      );

      if (res.status === 200) {
        const json = await res?.json() as any;
        
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

      } else {
        
      }
      

    } catch (e) {
      ///setError(e);
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




  const onSubmit: SubmitHandler<FeedFormTypes> = (data) => {

    console.log('FeedDetailTwoPage onSubmit data: ', data);

  

    updateFeed();


 
    /*
    toast.success(<Text as="b">Successfully added!</Text>);
   

    console.log('Profile settings data ->', {
      ...data,
    });
    */
    

  };


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







  return (
    <Form<FeedFormTypes>
      validationSchema={feedFormSchema}
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

    <div className="bg-dark sticky top-0 z-50 ">

        <Top1
          logo="/usermain/images/logo-oneclick.png"
          topBackgroundColor="#fff"
          topBorderBottom="1px solid #ddd"
          topBoxSizing="border-box"
          frameDivBorderBottom="2px solid #212121"
          frameDivBoxSizing="border-box"
          divColor="#212121"
          frameDivBorderBottom1="unset"
          frameDivBoxSizing1="unset"
          divColor1="#212121"
          frameDivBorderBottom2="unset"
          frameDivBoxSizing2="unset"
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
       
        <div className="self-stretch xl:bg-background flex flex-col items-center justify-start py-10 px-0">
          <div className=" w-full pl-5 pr-5
          xl:w-[1000px] xl:pl-0 xl:pr-0   flex flex-col items-center justify-start">

            <div className=" 
            self-stretch bg-white flex flex-col items-center justify-end  p-5 xl:p-10 gap-[40px]">
              
  
              <div
                className="self-stretch flex flex-row items-center justify-between pt-0 px-0 pb-5 text-left text-5xl text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
                //style={bread1Style}
              >
                <div className="relative tracking-[-0.02em] font-extrabold">
                  {'구매주문 수정하기'}
                </div>

                <Link
                  href="/usermain/feeds"
                  className=" no-underline flex"
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
              
              
              <div className="self-stretch flex flex-col items-center justify-end gap-[40px]">
                

                {/* feed */}
                {/*
                {feed?.mealFood?.length === 0 && (
                  <div className="self-stretch flex flex-col items-center justify-center gap-[12px] text-sm">
                    <div className="self-stretch relative font-extrabold">
                      skip(먹지 않았음)
                    </div>
                  </div>
                )}
                */}

                    

                



                <div className="self-stretch flex flex-col items-start justify-center gap-[12px] text-sm">

                  
                  
                  <div className="self-stretch relative font-extrabold">
                    <span>이미지</span>
                    {/*
                    <span className="text-red">*</span>
                    */}
                  </div>
                  
    

                  {/* image upload */}

                  <div className="flex flex-row gap-2 items-center justify-center ">


                    { !feedImage1 && (
                      <div className="grid grid-cols-5 xl:grid-cols-10 gap-2">
                        <Uploader
                          number={0}
                          onSave={(url: string) => {
                            addUploadedImage(1, url);
                          }}
                        />
                      </div>
                    )}


                    
                    { feedImage1 && !feedImage2 && (
                      <div className="grid grid-cols-3 xl:grid-cols-10 gap-2">

                        
                        
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
                            className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                      <div className="grid grid-cols-3 xl:grid-cols-10 gap-2">


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
                            className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                            className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                      <div className="grid grid-cols-3 xl:grid-cols-10 gap-2">

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
                            className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                            className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                            className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                      <div className="grid grid-cols-3 xl:grid-cols-10 gap-2">

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
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                      <div className="grid grid-cols-3 xl:grid-cols-10 gap-2">


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
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
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
                      <div className="grid grid-cols-3 xl:grid-cols-10 gap-2">

                        <Uploader
                          number={6}
                          onSave={(url: string) => {
                            addUploadedImage(7, url);
                          }}
                        />


                         <Image
                          src={feedImage1}
                          alt="food image"
                          width={150}
                          height={150}
                          className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage2}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage3}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm "
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage4}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm "
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage5}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm "
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage6}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm "
                          style={{objectFit: 'cover'}}

                        />


                      </div>
                    )}



                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && feedImage5 && feedImage6 && feedImage7 && !feedImage8 && (
                      <div className="grid grid-cols-3 xl:grid-cols-10 gap-2">


                        <Uploader
                          number={7}
                          onSave={(url: string) => {
                            addUploadedImage(8, url);
                          }}
                        />


                         <Image
                          src={feedImage1}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm  overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage2}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage3}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage4}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage5}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage6}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage7}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />


                      </div>
                    )}


                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && feedImage5 && feedImage6 && feedImage7 && feedImage8 && !feedImage9 && (
                      <div className="grid grid-cols-3 xl:grid-cols-10 gap-2">

                        <Uploader
                          number={8}
                          onSave={(url: string) => {
                            addUploadedImage(9, url);
                          }}
                        />


                         <Image
                          src={feedImage1}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm  overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage2}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage3}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage4}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage5}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage6}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage7}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage8}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />


                      </div>
                    )}


                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && feedImage5 && feedImage6 && feedImage7 && feedImage8 && feedImage9 && !feedImage10 && (
                      <div className="grid grid-cols-3 xl:grid-cols-10 gap-2">

                        <Uploader
                          number={9}
                          onSave={(url: string) => {
                            addUploadedImage(10, url);
                          }}
                        />


                         <Image
                          src={feedImage1}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm  overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage2}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage3}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm   overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage4}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage5}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20 rounded-sm   overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage6}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage7}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage8}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage9}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />


                      </div>
                    )}


                    { feedImage1 && feedImage2 && feedImage3 && feedImage4 && feedImage5 && feedImage6 && feedImage7 && feedImage8 && feedImage9 && feedImage10 && (
                      <div className="grid grid-cols-3 xl:grid-cols-10 gap-2">
                         <Image
                          src={feedImage1}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm   overflow-hidden shrink-0"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage2}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm   overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage3}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm   overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage4}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm   overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage5}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm   overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage6}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm   overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage7}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm   overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage8}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm   overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage9}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20  rounded-sm   overflow-hidden"
                          style={{objectFit: 'cover'}}

                        />
                        <Image
                          src={feedImage10}
                          alt="food image"
                          width={150}
                          height={150}
                          className="mt-2 relative w-20 h-20   rounded-sm  overflow-hidden"
                          style={{objectFit: 'cover'}}
                         

                        />
                      </div>
                    )}
                    
                      
                    




                  </div>

                </div>





                <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                  <div className="self-stretch relative">
                    <span>
                      <span className="text-sm font-extrabold font-menu-off">
                        내용
                      </span>
                      <span>(30자 이내)</span>
                    </span>
                    <span className="text-sm font-extrabold text-red">*</span>
                  </div>
                  {/*
                  <InputBox
                    prop="제목을 입력해주세요."
                    inputBoxWidth="unset"
                    inputBoxAlignSelf="stretch"
                  />
                  */}

                  {/*
                  <Input
                    //value={feedTitle}
                    onChange={(e) => setFeedTitle(e.target.value)}
                    placeholder="내용을 입력해 주세요."
                    className="w-full h-64  "
                    // vertically scrollable
                    //as="textarea"
                    //rows={10}
                  />

                  */}

                  {/* multi line input */}
                  {/*
                  <InputMulti
                    prop="내용을 입력해 주세요."
                    inputMultiWidth="unset"
                    inputMultiAlignSelf="stretch"
                    inputMultiHeight="h-64"
                    //inputMultiPlaceholder="내용을 입력해 주세요." 
                    //inputMultiMaxLength={30}
                    //inputMultiValue={feedContent}
                    //inputMultiOnChange={(e) => setFeedContent(e.target.value)}
                  />
                  */}
                  {/* quill-editor */}

                  {/*
                                        className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    */}

                    {/*
                      <Controller
                        control={control}
                        name="bio"
                        render={({ field: { onChange, value } }) => (
                          <QuillEditor
                            value={value}
                            onChange={onChange}
                            className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
                            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                          />
                        )}
                      />
                    */}

                    {/*
                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (

                  <QuillEditor
                    placeholder="내용을 입력해 주세요."
                    //value={feedContent}
                    //onChange={(e) => setFeedContent(e.target.value)}

                    onChange={onChange}


                    value={value}

                    ///onChange={onChange}

                    // plain text editor
                    //plainTextEditor={true}


                    // quill editor height
                    //height="h-64"

                    // quill editor height
                    //height="h-64"

                    //className="w-full h-64"

                    className="w-full h-64  @3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"


                  />

                  )}
                  />
                  */}



                  <Controller
                    control={control}
                    
                    name="feedTitle"

                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        placeholder="내용을 입력해 주세요"

                        value={

                          feedContent
                        }
                        
                        onChange={
                          (value) => {
                            setFeedContent(value);
                          }
                        }

                        className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px] w-full h-64 "
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"

                        
                      />
                    )}


                    // check if bio has 30 characters
                    rules={{

                      validate: (v) =>  (v as string).length <= 30 || '30자 이내로 입력해주세요.',

                      maxLength: 30,
                     

                    }}
                    
                    //display counter of characters
                  />


                  {/* display counter of characters */}
                  {/*
                  <div className="flex justify-end text-xs text-gray-500 dark:text-gray-400">
                    {getValues('bio')?.length}/30
                  </div>
                  */}
                  
                  
                  
                  
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
                          ///onChange={onChange}
                          //{...register('public')}

                          /*
                          {feed?.mealFood?.length === 0 && (
                            checked={true}
                          )}
                          */

                          checked={hiddenYn}

                          onChange={(e) => {
                            setHiddenYn(e.target.checked);
                          }}
                        

                          //checked={ feed?.mealFood?.length === 0 ? true : value }

                          //setValue={ fedd?.mealFood?.length === 0 ? true : value }

                          //defaultChecked={ feed?.mealFood?.length === 0 ? true : value }
                          

                        />
                        <label htmlFor="public">비공개하고싶어요!</label>
                      </div>
                    
                    )}

                  />





                  

                

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
                  
                  
                  {/*
                  <div className="self-stretch relative">
                    <span>
                      <span className="text-sm font-extrabold font-menu-off">
                        태그
                      </span>

                      <span>(최대 3개)</span>
                    </span>
                    <span className="text-sm font-extrabold text-red">*</span>
                  </div>
                  */}


                  {/*
                  <InputBox
                    prop="쉼표(,)로 구분하여 입력"
                    inputBoxWidth="unset"
                    inputBoxAlignSelf="stretch"
                  />
                  <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                    <div className="relative">추천태그</div>
                    <div className="flex-1 flex flex-row items-center justify-start gap-[4px]">
                      <Tag1 />
                      <Tag1 />
                      <Tag1 />
                    </div>
                  </div>
                  */}


                  {/*
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
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
                */}


                </div>

              </div>
            </div>


            <div className="self-stretch flex flex-row items-center justify-between text-base font-semibold   ">

              <button
                className=" p-5 self-stretch w-full flex flex-row items-center justify-center bg-grey-f1 text-dark "
                onClick={() => {
                  
                  //{`/usermain/feeds/write1/${_id}`}
                  window.location.href = `/usermain/feeds/${_id}/edit`;


                } }
              >
                이전
              </button>
              

              {/*   feedImage1  ? (

              check controller bio
               !getValues('bio')
               */}

              { true ? (
                
            
                <button
                  className=" p-5 self-stretch w-full flex flex-row items-center justify-center bg-dark text-white "
                  onClick={() => {
                    
                    //updateFeed();

                    onSubmit(getValues());


                  } }
                >
                  수정하기
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
                    수정하기
                  </button>


                )}

            </div>



          </div>
        </div>
      </div>


      <div className="hidden xl:block">
      <Footer
        footerAlignSelf="stretch"
        footerBorderTop="1px solid #eee"
        footerBoxSizing="border-box"
      />
      </div>
      


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



};


