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



import Image from "next/image";


///const Frame15: NextPage = () => {

export default function Page() {

  /*
    // Get the value from local storage if it exists
    const [isLogin, setIsLogin] = useLocalStorage("login", "false");
  */




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



  const [content, setContent] = useState("");

  useEffect(() => {
      
      const fetchData = async () => {


        const params = {
          contractName: 'privacy',
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
                    

                  <div
                    className="
                      self-stretch flex flex-row items-center justify-between pt-0 px-0 pb-5 text-left text-5xl text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
                  >
               

                      <div className="relative tracking-[-0.02em] font-extrabold">
                      개인정보처리방침
                      </div>
                    

                    <button
                      onClick={() => {
                        window.history.back();
                      } }
                      className=" no-underline flex"
                    >
                    <Image
                      width="24"
                      height="24"
                      className="relative w-6 h-6 overflow-hidden shrink-0"
                      alt=""
                      src="/usermain/images/x2.svg"
                    />
                    </button>
                    
                  </div>


    

                    
                    <div className="  flex flex-col items-start justify-center gap-[40px] text-xs">

                   

                    <div  className=" h-[70vh] overflow-y-scroll text-left text-sm ">
                      <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>
                      
                      

                    </div>

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

    </>

  );

};
