'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";

import InputBox from "@/components-figma/input-box";
import BtnBigOn from "@/components-figma/btn-big-on";
import Footer from "@/components-figma/footer";

import Link from "next/link";

import { Autocomplete, TextField, Icon } from "@mui/material";

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Password } from '@/components/ui/password';


import { useState, useEffect } from "react";

///import useLocalStorage from "../hooks/useLocalStorage";


import { useSession, signIn, signOut } from 'next-auth/react';

import AuthWrapperDoingdoit from '@/app/shared-doingdoit/auth-layout/auth-wrapper-doingdoit';

import UnderlineShape from '@/components/shape/underline';

import { SubmitHandler } from 'react-hook-form';

import { Form } from '@/components/ui/form';

import { loginSchema, LoginSchema } from '@/utils/validators/doingdoit/login.schema';


import { motion } from 'framer-motion';
import { set } from "lodash";
import { u } from "uploadthing/dist/types-e8f81bbc";


import { Modal } from '@/components/ui/modal';

import { Text, Title } from '@/components/ui/text';

import Toast from 'react-hot-toast';



///const Frame15: NextPage = () => {

export default function Page() {

  /*
    // Get the value from local storage if it exists
    const [isLogin, setIsLogin] = useLocalStorage("login", "false");
  */


  const [open, setOpen] = useState(false);

  const modalData = {
    title: '',
    description: '회원탈퇴하시겠습니까?',
    data: [],
  };


  const onSubmit: SubmitHandler<LoginSchema> = (data) => {

    console.log("onSubmit=======", data);

    signIn('credentials', {
      ...data,
      callbackUrl: '/'
    });

    ///setReset({ email: "", password: "", isRememberMe: false });
  };




  const [reset, setReset] = useState({});

  const initialValues: LoginSchema = {
    email: 'admin',
    password: '',
    rememberMe: true,
  };



  const [userid, setUserid] = useState("");
  const [userpassword, setUserpassword] = useState("");


  const { data: session, status } = useSession();



  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }

      setLoading(true);

      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      //////console.log(json);

      const data = json as any;
      
      if (data?.data) {
        setUser(data?.data);
      }

      setLoading(false);
    };

    fetchData();

  } , [session?.user?.email]);



  const [content, setContent] = useState([]);

  useEffect(() => {
      
      const fetchData = async () => {


        const params = {
          contractName: 'withdrawal',
        };

        const res = await fetch(`/api/doingdoit/user/getContract`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        const result = await res.json() as any;

        ///console.log('result ->', result);



        setContent(result?.data);
            
    

      };
  
      fetchData();
  
    } , []);




  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  console.log("session=>", session);


  const withdrawal = async () => {

    const res = await fetch(`/api/doingdoit/user/withdrawByEmail?_email=${session?.user?.email}`);

    const json = await res?.json();



    const data = json as any;

    if (data?.data) {
      console.log('data', data?.data);
    }

    Toast.success('회원탈퇴가 완료되었습니다.');

    setTimeout(() => {
      signOut(
        {
          callbackUrl: '/'
        }
      );
    } , 1000);


  }





  
  return (

    <>
    
      <Form<LoginSchema>

        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,

        }}

      >


        {({ register, formState: {
          
          errors  // access the errors of each field in the form

        
        } }) => (


          <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-center text-13xl text-dark font-menu-off">
            
            <div className="self-stretch flex flex-col items-center justify-start">
             
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
                frameDivBorderBottom2="unset"
                frameDivBoxSizing2="unset"
                divColor2="#212121"
                divColor3="#212121"
                aboutColor="#212121"
                frameDivBorder="1px solid #666"
                divColor4="#212121"
                frameDivBorder1="1px solid #666"
                divColor5="#212121"
                frameDivBorderBottom3="unset"
                frameDivBoxSizing3="unset"
              />
              
              <div className="self-stretch xl:bg-background flex flex-col items-center justify-start py-10 px-0">
                
                
                <div className=" w-96  xl:w-[1000px] flex flex-col items-center justify-start  ">

                  <div className="  self-stretch bg-white flex flex-col items-center justify-center  p-5  xl:p-[100px] gap-[40px]">
                    
                    <div className="self-stretch relative font-extrabold text-2xl xl:text-4xl">
                      회원탈퇴
                    </div>

                    
                    <div className="w-full  flex flex-col items-start justify-center gap-[40px] text-xs">

                    

                      <div  className="w-full h-[70vh] overflow-y-scroll text-left text-sm ">
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                      </div>
                      
                      

                    </div>


                  </div>






                  {/* 취소, 탈퇴 버튼 */}



                  <div className="self-stretch flex flex-row items-center justify-between text-base font-semibold   ">

                    <button
                      className=" p-5 self-stretch w-full flex flex-row items-center justify-center bg-grey-f1 text-dark "
                      onClick={() => {
                        
                        history.back();

                      } }
                    >
                      취소
                    </button>

          

                      <button
                        className=" p-5 self-stretch w-full flex flex-row items-center justify-center bg-dark text-white "
                        onClick={() => {
                          
                          //updateFeed();

                          //onSubmit(getValues());

                          modalData.description = '회원탈퇴하시겠습니까?';
                          setOpen(true);
                          


                        } }
                      >
                        탈퇴하기
                      </button>
                      

                    </div>


                </div>

              </div>






            </div>


            <Footer
              footerAlignSelf="stretch"
              footerBorderTop="1px solid #eee"
              footerBoxSizing="border-box"
            />
            
          </div>


        )}


      </Form>







      {/* modal view */}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          //setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"

        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-xl p-5 "
      >

        <div className="flex flex-col items-center justify-center gap-10 m-5">
            
             {/*
          <Title
            as="h3"
            className="text-lg font-semibold text-gray-900 xl:text-xl"
          >
            {modalData.title}
          </Title>
        
         
          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              setActive(() => 'posts');
            }}
            className="h-auto px-1 py-1"
          >
            <PiXBold className="h-5 w-5 text-base" />
          </Button>
          */}

            {modalData.description && (
              <div className="">
                <Text
                  as="p"
                  className="text-sm text-gray-900 xl:text-lg"
                >
                  {modalData.description}
                </Text>
              </div>
            )}

              {/*
            <Button
              variant="text"
              onClick={() => {
                setOpen(false);
                setActive(() => 'posts');
              }}
              className="h-auto px-1 py-1"
            >
              <PiXBold className="h-5 w-5 text-base" />
            </Button>
            */}

            <div className="flex flex-row items-center justify-center gap-5">

              {/* close button */}
              <Button
                ///size="lg"

                // rounded

                size="xl"


                
                className='text-white bg-grey-9 rounded-xl w-28 h-12 flex items-center justify-center'
                onClick={() => {
                  setOpen(false);
                  //setActive(() => 'posts');

                  withdrawal();

                }}
              >
                탈퇴
              </Button>

              {/* 확인 button */}
              <Button
                size="lg"
              
                className='text-white bg-dark rounded-xl w-28 h-12 flex items-center justify-center'
                onClick={() => {
                  setOpen(false);
                  //setActive(() => 'posts');

                  // api call


                }}
              >
                아니오
              </Button>
            </div>

          
        </div>

              {/*
        {modalData && <FollowerModal data={modalData.data} />}
              */}
      </Modal>




    </>

  );

};
