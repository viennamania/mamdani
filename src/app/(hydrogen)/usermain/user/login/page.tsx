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


import { useState, useEffect, use } from "react";

///import useLocalStorage from "../hooks/useLocalStorage";


import { useSession, signIn, signOut } from 'next-auth/react';

import AuthWrapperDoingdoit from '@/app/shared-doingdoit/auth-layout/auth-wrapper-doingdoit';

import UnderlineShape from '@/components/shape/underline';



import { Form } from '@/components/ui/form';

import { loginSchema, LoginSchema } from '@/utils/validators/doingdoit/login.schema';


import { m, motion } from 'framer-motion';
import { set } from "lodash";


import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';


import { useRouter } from "next/navigation";

import Image from "next/image";


import { Modal } from '@/components/ui/modal';

import { Title, Text } from '@/components/ui/text';
import { stat } from "fs";
import toast from "react-hot-toast";

import useDebounce from './useDebounce';

///const Frame15: NextPage = () => {

export default function Page() {

  /*
    // Get the value from local storage if it exists
    const [isLogin, setIsLogin] = useLocalStorage("login", "false");
  */



  const router = useRouter();

  const [email, setEmail] = useState("");
  const debouncedEmail = useDebounce(email, 500);

  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [loginErrorMessage, setLoginErrorMessage] = useState(""); 


  const [open, setOpen] = useState(false);

  const modalData = {
    title: '알림',
    description: '탈퇴한 회원입니다.',
    data: [],
  };



  //const onSubmit: SubmitHandler<LoginSchema> = (data) => {

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {

    console.log("onSubmit=======", data);

    // after sign in, then if error, then error message




    // if singInd return null, then error message
    /*
        const res = await signIn('credentials', {
      name: name,
      password: password,
      redirect: false,
    });

    console.log(res);

    // 에러 핸들링
    if (res.status === 401) {
      alert('아이디 혹은 비밀번호가 일치하지 않습니다!');
      router.reload();
    } else {
      router.push('/');
    }
    */

    /*
    const res = signIn('credentials', {
      //...data,

      id : data.email,
      password : data.password,

      callbackUrl: '/',
      //redirect: false,

      redirect: true,

    }) as any;

    ///alert(JSON.stringify(res));

    console.log("res", res);

    // res is {}
    // check if res is {}


    if (JSON.stringify(res) === '{}') {

      //alert('탈퇴한 회원입니다.');

      //setEmailErrorMessage("탈퇴한 회원입니다.");

      //setOpen(true);
      //modalData.title = '탈퇴한 회원입니다.';
      ///modalData.description = '탈퇴한 회원입니다.';


    } else {
      router.push('/');
    }
    */




    /*
    signIn("credentials", {
      
      id : data.email,
      password : data.password,
      redirect: false
      
    })
    .then(({

      ok,
      error,

    }) => {

        if (ok) {
            router.push("/dashboard");
        } else {
            console.log(error)
            toast("Credentials do not match!", { type: "error" });
        }
    });
    */




    /*
    signIn('credentials', {
      //...data,

      id : data.email,
      password : data.password,

      callbackUrl: '/'

    });
    */

    const res = await signIn('credentials', {
      id: data.email,
      password: data.password,
      redirect: false,
    });
    



    if (res?.ok) {


      console.log("res: ", res);
      signIn("credentials", {
        id: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/',
      });

      return (
        <div>
          <h1>로그인 성공</h1>
        </div>
      )


    } else {
      console.log("res: ", res);
      /*
      {
        "error": "CredentialsSignin",
        "status": 401,
        "ok": false,
        "url": null
      }
      */
      // TODO: Show error message with toast

      //toast.error("비밀번호가 올바르지 않습니다.");

      setLoginErrorMessage("비밀번호가 올바르지 않습니다.");

    }


    //alert("======.");



    // error message

    //setEmailErrorMessage("이메일이 없습니다.");

    ///setEmailErrorMessage("비밀번호가 일치하지 않습니다.");

    //setEmailErrorMessage("이미 가입된 이메일입니다.");

    ///setReset({ email: "", password: "", isRememberMe: false });
  };




  const [reset, setReset] = useState({});

  const initialValues: LoginSchema = {
    email: '',
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



  useEffect(() => {

    

    const checkEmail = async () => {


      if (debouncedEmail !== "") {

              // check validate email address format
          // if not valid, then show error message
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

          if (!emailRegex.test(debouncedEmail)) {
            setEmailErrorMessage("이메일 형식이 올바르지 않습니다.");
            return;
          } 


          const res = await fetch(`/api/doingdoit/user/checkEmailRegistered?_email=${debouncedEmail}`);
          const json = await res?.json() as any;
    
          console.log("checkEmailRegistered json.data.result=["+json?.data?.result+"]");

          console.log("checkEmailRegistered json.data.regType=["+json?.data?.regType+"]");

          console.log("checkEmailRegistered json.data.status=["+json?.data?.status+"]");

    
          if (json?.data?.result === 'N') {

            setEmailErrorMessage("가입되지 않은 이메일입니다.");
            return;

          } else {

    
            if (json?.data?.regType !== 'email') {

              setEmailErrorMessage("이메일로 가입된 회원이 아닙니다.");
              return;
            }

            if (json?.data?.status === 'withdraw') {

              setEmailErrorMessage("탈퇴한 계정입니다.");
              return;

            }

            setEmailErrorMessage("");



          }

        }

    }

    checkEmail();

  } , [debouncedEmail]);



  // if password is empty, then don't show error message
  /*
  const [password, setPassword] = useState("");
  
  useEffect(() => {

    if (password === "") {
      setLoginErrorMessage("");
    }

  } , [password]);
  */


 
  if (
    session?.user?.email &&
    session?.user?.email.includes ('@cryptoss.beauty')
  ) {
    signOut(
      {
        callbackUrl: '/usermain/user/login',
      }
    );

    return <></>
  }
  




  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  console.log("session=>", session);

  if (
    session && !session?.user?.email?.includes('cryptoss.beauty')

  ) {

    window.location.href = "/";
    
    return <></>;
    

  }






  
  /*
  if (session && session?.user?.email === 'doingdoit1@gmail.com'
  || session && session?.user?.email === 'doingdoit2@cryptoss.beauty'
  || session && session?.user?.email === 'doingdoit3@cryptoss.beauty'
  || session && session?.user?.email === 'doingdoit4@cryptoss.beauty'
  || session && session?.user?.email === 'doingdoit5@cryptoss.beauty'
  ) {
  */
 /* if session && session?.user?.email  domain is cryptoss.beauty */


  ///if (session && (session as any)?.user?.email?.includes('cryptoss.beauty')) {

  if (false) {

    return (

      <AuthWrapperDoingdoit
        title={
          <div className='fle flex-col gap-3'>
            
            <div>
              <span className="relative inline-block">
                
                <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
              </span>{' '}
              
              관리자로 로그인 되었습니다.
            </div>


          </div>
        }
        //description=""
        //bannerTitle=""
        //bannerDescription=""
        isSocialLoginActive={false}
        /*
        pageImage={
          <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          
            <Image
              src={
                'https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp'
              }
              alt="Sign Up Thumbnail"
              fill
              priority
              sizes="(max-width: 768px) 100vw"
              className="object-cover"
            />
            
          </div>
        }
        */
      >   
        <div className='flex flex-col items-center justify-center '>
            <Link
              href={'/'}
              className="font-semibold text-gray-700 transition-colors hover:text-blue"
            >
              홈으로
            </Link>
        </div>

      </AuthWrapperDoingdoit>

    );
  }


 
  console.log("user=>", user);


  if (session && user && user?.length > 0) {

    window.location.href = "/";

  }

  /*
  if (session && user && user?.length === 0) {

    window.location.href = "/usermain/user/profile-edit";

  }
  */


  /*
      <Form<SignUpSchema>
      validationSchema={signUpSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        //defaultValues: initialValues,

        defaultValues: {
          email: '',
          password: '',
          isAgreed: false,
          isAgreedTerms: false,
          isAgreedPrivacy: false,
          isAgreedMarketing: false,
          
        },
      }}
    >
    */
  
  return (
    
      <Form<LoginSchema>

        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        className='@container'
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,

        }}

      >


      {({ register, control, setValue, getValues, formState: { errors } }) => {


      return (
        <>


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
              
              <div className="self-stretch   xl:bg-background flex flex-col items-center justify-start py-10 px-0">
   
                <div className=" xl:w-[1000px] flex flex-col items-center justify-start p-5  ">

                  <div className="  self-stretch bg-white flex flex-col items-center justify-center  p-10  xl:p-[100px] gap-[40px]  ">

                    

                    <div className="self-stretch relative font-extrabold  text-2xl xl:text-3xl">
                      로그인
                    </div>

                    
                    <div className=" w-80   xl:w-[400px] flex flex-col items-start justify-center gap-[40px] text-xs ">


                      
                      
                      <div className="self-stretch flex flex-col items-start justify-center gap-[32px]">
                        

                        <div className="self-stretch flex flex-col items-start justify-center gap-[20px]">
                          
                          
                          <div className="  self-stretch flex flex-col items-start justify-center gap-[8px]">


                              <Controller
                                name="email"
                                control={control}

                                render={({ field: { onChange, value } }) => (

                                  <Input
                                    type="email"
                                    ///size={isMedium ? 'lg' : 'xl'}
                                    size="xl"
                                    //label="이메일 주소"
                                    placeholder="이메일 주소를 입력"
                                    className=" self-stretch"
                                    
                                    //{...register('email')}

                                    error={
                                      emailErrorMessage !== "" ? emailErrorMessage : errors.email?.message
                                    } 
                                    ///error={ errors.email?.message}

                                    errorClassName="text-left "

                                    onChange={

                                      //onChange

                                      
                                      async (e) => {

                                        setEmail(e.target.value);


                                        onChange(e.target.value);



                                        //setValue('email', e.target.value);


                                        /*
                                        // check validate email address format
                                        // if not valid, then show error message
                                        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

                                        if (!emailRegex.test(e.target.value)) {
                                          setEmailErrorMessage("이메일 형식이 올바르지 않습니다.");
                                          return;
                                        } 


                                        const res = await fetch(`/api/doingdoit/user/checkEmailRegistered?_email=${e.target.value}`);
                                        const json = await res?.json() as any;
                                  
                                        console.log("checkEmailRegistered json.data.result=["+json?.data?.result+"]");

                                  
                                        if (json?.data?.result === 'N') {

                                          setEmailErrorMessage("가입되지 않은 이메일입니다.");
                                          return;

                                        } else {

                                  
                                          if (json?.data?.regType !== 'email') {

                                            setEmailErrorMessage("이메일로 가입된 회원이 아닙니다.");
                                            return;
                                          }

                                          if (json?.data?.status === 'withdraw') {

                                            setEmailErrorMessage("탈퇴한 계정입니다.");
                                            return;

                                          }

                                          setEmailErrorMessage("");



                                        }
                                        */


                                      }
                                      

                                    }

                                    value={value}



                                  />
                                )}
                              />






                              <Password
                                //label="비밀번호"
                                placeholder="비밀번호"
                                size="xl"
                                className=" self-stretch"
                                //inputClassName="text-base"
                                //color="info"
                                {...register('password')}
                                
                                errorClassName="text-left"

                                //error={ errors.password?.message }

                                /*
                                onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  // if input is "" then don't show error message
                                  if (e.target.value === "") {
                                    setLoginErrorMessage("");
                                  }
                                }}
                                */

                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                                  setUserpassword(e.target.value);

                                  // if input is "" then don't show error message
                                  //if (e.target.value === "") {
                                    setLoginErrorMessage("");
                                    
                                  //}
                                }}


                                //error={loginErrorMessage !== "" ? loginErrorMessage : errors.password?.message}
                                error={loginErrorMessage}

                                ///error={ '비밀번호가 일치하지 않습니다.'}

                                onKeyPress={(e) => {
            
                                  if (e.key === 'Enter') {
                                  
                                    onSubmit({ email: email, password: userpassword, rememberMe: true });
                                  }
                                }}


                              />



                          </div>

                          <div className="self-stretch flex flex-row items-center justify-center gap-[20px]">
                            
                            <Link
                              href="/usermain/user/register"
                              className=" no-underline relative">
                                일반 회원가입
                            </Link>



                            
                            <div className="relative bg-grey-c w-px h-3" />
                            
                              <Link
                              href="/usermain/user/find-userid"
                              className=" no-underline relative"
                              >
                                  아이디 찾기
                              </Link>
                            

                            <div className="relative bg-grey-c w-px h-3" />

                            <Link
                              href="/usermain/user/recovery-password"
                            className=" no-underline relative">
                              비밀번호 찾기
                            </Link>
                            
                          </div>


                        </div>



                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="self-stretch flex flex-col items-center justify-center gap-[20px] text-base text-gray-400"
                        >
                          <Button
                            
                            disabled={emailErrorMessage !== "" ? true : false}

                            className="w-full bg-dark  rounded-full text-white font-extrabold text-base h-14"
                            type="submit"

                            onClick={ () => {


                                
                                // 비밀번호는 8~12자리 영문,숫자,특수문자 혼합

                                // check password is "" then show error message


                                //if (getValues('password') == "") {
                                if (userpassword == "") {
                                    //setLoginErrorMessage("비밀번호는 8~12자리 영문,숫자,특수문자 혼합");
                                    //setLoginErrorMessage("비밀번호를 입력해주세요.");
                                    setLoginErrorMessage("비밀번호가 올바르지 않습니다.");
                                }
  
                            }}
                          >
                            로그인
                          </Button>

                        </motion.div>
                      
                        
                      </div>

                     

                      {/* 카카오툭 로그인, 네이버 로그인, 구글 로그인 */}
                      

                      <div className="hidden self-stretch flex-col items-center justify-center gap-[20px] text-base text-gray-400">

                        {/*
                        <Button
                          className="w-full bg-dark mt-8  rounded-full text-white font-extrabold text-base h-14"
                          //type="submit"

                          onClick={ () => {

                            signIn('kakao', {
                              callbackUrl: '/'
                            });

                          }}
                        >
                          카카오톡 로그인
                        </Button>

                        <Button
                          className="w-full bg-dark mt-8  rounded-full text-white font-extrabold text-base h-14"
                          type="submit"
                        >
                          네이버 로그인
                        </Button>
                        */}

                        {/* 카카오톡 로그인 버튼 */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="self-stretch flex flex-col items-center justify-center gap-[20px] text-base text-gray-400"
                        >
                        <button
                          type="button"
                          // when click button, diasble effect button color
                          className="w-full bg-[#F9E000] mt-5 rounded-full text-[#401C26] font-extrabold
                          text-base h-14
                          "
                          onClick={ () => {

                            signIn('kakao', {
                              callbackUrl: '/usermain/user/register-sns-user/kakao',
                              ////callbackUrl: '/',
                            });

                          }}

                        >
                          <div className="flex flex-row items-center justify-center gap-[10px]">
                            <img
                              src="/usermain/images/kakao.svg"
                              alt="kakao"
                              className=" w-14 h-14"
                            />
                            <span className="ml-2">
                              카카오톡 로그인
                            </span>
                          </div>

                        </button>

                        </motion.div>

                        {/* 네이버 로그인 버튼 */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="self-stretch flex flex-col items-center justify-center gap-[20px] text-base text-gray-400"
                        >
                        <button
                          type="button"
                          className="w-full bg-[#07B804] rounded-full text-white font-extrabold
                          text-base h-14 "


                          onClick={ () => {

                            signIn('naver', {
                              callbackUrl: '/usermain/user/register-sns-user/naver',
                            });

                          }}

                        >
                            <div className="flex flex-row items-center justify-center gap-[10px]">
                            <img
                              src="/usermain/images/naver.svg"
                              alt="naver"
                              className=" w-12 h-12"
                            />
  
                            <span className="ml-2">
                              네이버 로그인
                            </span>
                            </div>

                        </button>
                        </motion.div>


                        {/* 구글 로그인 버튼 */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="self-stretch flex flex-col items-center justify-center gap-[20px] text-base text-gray-400"
                        >

                          
                        <button
                          type="button"
                          // when click button, diasble effect button color

                          className="w-full bg-white rounded-full text-black font-extrabold
                          text-base h-14 border border-gray-400

                          "

           

                          onClick={ () => {

                            signIn('google', {
                              callbackUrl: '/usermain/user/register-sns-user/google',
                            });

                          }}

                        >
                          <div className="flex flex-row items-center justify-center gap-[10px]">
                          <img
                            src="/usermain/images/google.png"
                            alt="google"
                            className=" w-6 h-6"
                          />

                          <span className="ml-5">
                            구글 로그인
                          </span>
                          </div>

                        </button>
                        </motion.div>
                      
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




          {/* modal view */}
          <Modal
            isOpen={open}
            onClose={() => {
              setOpen(false);
              //setActive(() => 'posts');
            }}
            overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
            containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
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
                      className="text-base font-semibold text-gray-900 xl:text-lg"
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
                {/* close button */}
                <Button
                  size="lg"
                  color="primary"
                  className='flex items-center space-x-2'
                  onClick={() => {
                    setOpen(false);
                    //setActive(() => 'posts');
                  }}
                >
                  닫기
                </Button>

              
            </div>

                  {/*
            {modalData && <FollowerModal data={modalData.data} />}
                  */}
          </Modal>



          </>
        );

        
      }}


    </Form>





  );


}
