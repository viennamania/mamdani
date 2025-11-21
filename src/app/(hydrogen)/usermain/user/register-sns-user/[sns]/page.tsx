/*
Error occurred prerendering page "/user/register". Read more: https://nextjs.org/docs/messages/prerender-error
TypeError: Cannot read properties of undefined (reading 'create')
*/

'use client'



import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import InputBox from "@/components-figma/input-box";
import BtnBigOn from "@/components-figma/btn-big-on";
import Footer from "@/components-figma/footer";

//import { Link } from "react-router-dom";
import Link from "next/link";

import { Autocomplete, TextField, Icon, } from "@mui/material";


import { PiXBold, PiGenderMale, PiGenderFemale } from 'react-icons/pi';


import { Badge } from '@/components/ui/badge';

import { Title, Text } from '@/components/ui/text';


import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';

//import { Button } from '@/components/ui/button';



import { Form } from '@/components/ui/form';




import { SignUpSchema, signUpSchema } from '@/utils/validators/doingdoit/signup.schema';

import { use, useState, useEffect } from "react";



import { useSession, signIn, signOut } from 'next-auth/react';



import { Checkbox } from '@/components/ui/checkbox';

import { Button } from '@/components/ui/button';



import { useMedia } from '@/hooks/use-media';
import { get, set } from "lodash";

import { motion } from 'framer-motion';

import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';

import { fa, tr } from "@faker-js/faker";
import { on } from "events";


import { Modal } from '@/components/ui/modal';
import { u } from "uploadthing/dist/types-e8f81bbc";

import Image from "next/image";
import toast from "react-hot-toast";


export default function Register({ params }: any) {

  const { sns } = params;



  const [loading, setLoading] = useState(true);


  const { data: session, status } = useSession();


  console.log("register-sns-user session", session);


    /* fetch user data from an API
    /api/doingdoit/user/getUser
  */
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    nickname: "",
    avatar: "",
    regType: "",
  });

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
        setUserData(data.data);
      } else {
        //alert(json.message);
      }

      setLoading(false);
    };

    fetchData();

  } , [session?.user?.email]);






  const [reset, setReset] = useState({});



  const isMedium = useMedia('(max-width: 1200px)', false);

  const initialValues = {
    email: '',
    password: '',
    isAgreed: false,
    isAgreedTerms: true,
    isAgreedPrivacy: true,
    isAgreedMarketing: false,
  };


  ///const router = useRouter();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreedTerms, setIsAgreedTerms] = useState(false);
  const [isAgreedPrivacy, setIsAgreedPrivacy] = useState(false);




  const [passwordError, setPasswordError] = useState(false);


  const [emailError, setEmailError] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState("");








  const [contentTerms, setContentTerms] = useState("");
  const [contentPrivacy, setContentPrivacy] = useState("");
  const [contentMarketing, setContentMarketing] = useState("");
  const [contentWithdrawal, setContentWithdrawal] = useState("");


  // get contract content from api
 
  // get contract from DB
  useEffect(() => {

    const getContract = async (contractName: string) => {
      
      try {

        const params = {
          contractName: contractName,
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

        if (result) {
            
            if (contractName === 'terms') {
              setContentTerms(result.data);
            } else if (contractName === 'privacy') {
              setContentPrivacy(result.data);
            } else if (contractName === 'marketing') {
              setContentMarketing(result.data);
            } else if (contractName === 'withdrawal') {
              setContentWithdrawal(result.data);
            } 

        }

      } catch (error) {

      }

    }


    getContract('terms');
    getContract('privacy');
    getContract('marketing');
    getContract('withdrawal');



  } , []);

  //console.log('contentTerms ->', contentTerms);


  const [open, setOpen] = useState(false);

  const [modalData, setModalData] = useState({
    title: '약관' as string,
    data: '' as string,
  });



  /*
  const handleChange = (e: any) => {


    const re = /\S+@\S+\.\S+/;
    if (!re.test(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }


    setEmail(e.target.value);

  };
  */


  const handleChangePass1 = (e: any) => {
      
      /* check valid password */
  
      const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
      if (!re.test(e.target.value)) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }

      setPassword(e.target.value);
  };

  const handleChangePass2 = (e: any) => {
        
      /* check valid password */
  
      const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
      if (!re.test(e.target.value)) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
  
      setPassword(e.target.value);
  }




  if (status === 'loading') {
    return <p>Loading...</p>;
  }


  /*
  if (session ) {
    window.location.href = "/";
  }
  */
  



  if (userData?.email
    && userData?.regType != sns 
    
  ) {
    /* 이미 가입된 이메일입니다. */

    //alert("이미 가입된 이메일입니다.");

    // toast message
    // time : 3000

    if (userData?.regType === 'kakao') {

      toast.success('이미 카카오로 가입된 이메일입니다.', {
        duration: 3000,
      });
    } else if (userData?.regType === 'naver') {

      toast.success('이미 네이버로 가입된 이메일입니다.', {
        duration: 3000,
      });

    } else if (userData?.regType === 'google') {
        
        toast.success('이미 구글로 가입된 이메일입니다.', {
          duration: 3000,
        });
  
      } else if (userData?.regType === 'email') {
        
        toast.success('이미 가입된 이메일입니다.', {
          duration: 3000,
        });
  
      }

    // after 5 seconds, redirect to home

    setTimeout(() => {

      // sing out
      signOut(
        {
          callbackUrl: "/usermain/user/login",
        }
      );

    }, 3000);

  



    return (

      <></>

    );
  }








  const registerUser = async (
    email: string,
    password: string,
    isAgreedTerms: string,
    isAgreedPrivacy: string,
    isAgreedMarketing: string,
  ) => {

    ///console.log("register");

    /*
    if (emailError || passwordError) {
      return;
    }
    */

    ///const res = await fetch(`/api/doingdoit/user/setOne?_email=${email}&_password=${password}`);

    //const json = await res?.json();

    // post api

        // if sns is kakao, then regType is kakao
        // if sns is naver, then regType is naver
        // if sns is google, then regType is google
    let regType = '';

    if (sns === 'kakao') {
      regType = 'kakao';
    } else if (sns === 'naver') {
      regType = 'naver';
    } else if (sns === 'google') {
      regType = 'google';
    } else {
      regType = '';
    }


    const res = await fetch(`/api/doingdoit/user/setOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        loginId: email,
        password: password,


        regType: regType,


        isAgreedTerms: isAgreedTerms,
        isAgreedPrivacy: isAgreedPrivacy,
        isAgreedMarketing: isAgreedMarketing,
      }),
    });


    const json = await res?.json();

    ///alert("json : " + JSON.stringify(json));


    if (json === undefined) {
      alert("이메일이 이미 존재합니다.");
      return;
    } else {

      const data = json as any;

      ///alert("data : " + JSON.stringify(data));
  
      if (data.data  )  {
        ///window.location.href = "/";

        ///window.location.href = `/usermain/user/profile-edit/${email}  `;

        signIn("credentials", {
          id: email,
          password: password,
          callbackUrl: `/usermain/user/profile-edit/${data.data.id}`,
        });

        
        //window.location.href = `/usermain/user/profile-edit/${data.data.id}  `;


      } else {
        //alert(json.message);
      }
    

    }

    
  }



  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {

    ///alert("onSubmit");

    //if (emailError || passwordError) {
    //  return;
   // }

    
    //console.log("onSubmit========",data);

    /*

    registerUser(

      data?.email,
      data?.password,
      data?.isAgreedTerms ? 'Y' : 'N',
      data?.isAgreedPrivacy ? 'Y' : 'N',
      data?.isAgreedMarketing ? 'Y' : 'N',

    );
    */

    
    console.log("onSubmit========",data);
    
    ////setReset({ ...initialValues, isAgreed: false });

    /////registerUser();

  };





  if (session && !loading && userData?.email) {
    window.location.href = "/";

    /* 이미 가입된 이메일입니다. */
    return (

      <></>


    );

  }
  






  if (session && !loading ) {

  return (



    <>



    <Form<SignUpSchema>
      validationSchema={signUpSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        //defaultValues: initialValues,

        defaultValues: {
          email: session?.user?.email,
          password: '',
          isAgreed: false,
          isAgreedTerms: false,
          isAgreedPrivacy: false,
          isAgreedMarketing: false,
          
        },
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



                  <div className="self-stretch relative font-extrabold  text-2xl xl:text-3xl ">
                    회원 가입하기
                  </div>


                  <div className=" w-80   xl:w-[400px] flex flex-col items-start justify-center gap-[8px] text-xs ">
                  
                    <div className="  text-sm font-extrabold text-dark w-full text-left ">
                      이메일 주소
                    </div>
                    
                    <Controller
                      name="email"
                      control={control}

                  

                      render={({ field: { onChange, value } }) => (

                        <Input
                          type="email"
                          size={isMedium ? 'lg' : 'xl'}

                          //label="이메일 주소"
                          placeholder="이메일 주소를 입력"
                          inputClassName="text-xs xl:text-base pl-5"


                          className=" self-stretch"
                        

                          disabled={true}
                          
                          //{...register('email')}

                          error={
                            emailErrorMessage !== "" ? emailErrorMessage : errors.email?.message
                          }
                          errorClassName="text-left "

                          onChange={

                            async (e) => {

                              setEmail(e.target.value);


                              onChange(e.target.value);


                              const res = await fetch(`/api/doingdoit/user/checkDuplicateEmail?_email=${e.target.value}`);
                              const json = await res?.json() as any;

                              console.log("json.data", json?.data);

                              if (json?.data === 'Y') {
                

                                setEmailErrorMessage("이미 가입된 이메일입니다.");


                              } else {
                                
                                setEmailErrorMessage("");

                              }

                            }

                          }

                          value={value}
                        />
                      )}
                    />

                    {/* if sns is google or kakao or naver, display sns icon */}
                    {/* if sns is email, not display sns icon */}

                    {
                        sns === 'google' ? (
                          
                          <div className="flex flex-row items-center justify-start gap-2">
                            
                            <Image
                              src="/usermain/images/google.png"
                              alt="google"
                              width={20}
                              height={20}
                            />

                            <div className="text-xs text-gray-400">
                              Google 계정으로 가입
                            </div>
                          </div>
  
                        ) : sns === 'kakao' ? (
  
                          <div className="flex flex-row items-center justify-start gap-2">
                            <Image
                              src="/usermain/images/kakao.svg"
                              alt="kakao"
                              width={20}
                              height={20}
                            />
                            <div className="text-xs text-gray-400">
                              카카오 계정으로 가입
                            </div>
                          </div>
  
                        ) : sns === 'naver' ? (
  
                          <div className="flex flex-row items-center justify-start gap-2">
                            <Image
                              src="/usermain/images/naver.svg"
                              alt="naver"
                              width={20}
                              height={20}
                            />
                            <div className="text-xs text-gray-400">
                              네이버 계정으로 가입
                            </div>
                          </div>
  
                        ) : (
  
                          <></>
  
                        )
                    }


        
                    {/* checkbox 전체동의 */}
                    {/* checkbox [필수] 서비스 이용약관  isAgreedTerms */}
                    {/* checkbox [필수] 개인정보수집 및 이용 동의 isAgreedPrivacy */}
                    {/* checkbox [선택] 마케팅 정보 수신 isAgreedMarketing */}

                    <div className="mt-5 flex flex-col gap-2   w-full">

                      <Controller
                        name="isAgreed"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            label="전체동의"
                            name="isAgreed"
                            //size={isMedium ? 'lg' : 'xl'}
                            //className="font-extrabold"
                            size='lg'
                            className="text-xs font-extrabold  pl-2"
                            labelClassName="text-xs font-extrabold    pl-2"
                            onChange={(e) => {

                              console.log("isAgreed e.target.checked", e.target.checked);
                              
                              setValue('isAgreed', e.target.checked);

                              setValue('isAgreedTerms', e.target.checked );
                              setIsAgreedTerms(e.target.checked);
                              setValue('isAgreedPrivacy', e.target.checked );
                              setIsAgreedPrivacy(e.target.checked);

                              setValue('isAgreedMarketing', e.target.checked );

                            }}

                            checked={value}

                            

                          />
                        )}

                        
                      />

                      <Controller
                        name="isAgreedTerms"
                        control={control}
                        //render={({ field }) => (
                        render={({ field: { onChange, value } }) => (


                          // if click this, popup terms


                          <Checkbox

                            //label="[필수] 서비스 이용약관"

                            // check click label, popup modal
                            label={

                              <button
                                // underline
                                
                                className="text-xs underline"
                                
                                onClick={() => {
                                  setOpen(true);
                                  setModalData({
                                    title: '서비스 이용약관',
                                    data: contentTerms ? contentTerms : '',
                                  });
                                }}
                              >
                                [필수] 서비스 이용약관
                              </button>
                              
                            }




                            name="isAgreedTerms"
                            //size={isMedium ? 'lg' : 'xl'}
                            //className="text-xs "
                            size='lg'
                            className="text-xs   pl-2"
                            labelClassName="text-xs   pl-2"
                            //onChange={onChange}

                            onChange={ (e) => {

                              setIsAgreedTerms(e.target.checked);

                              //console.log("isAgreedTerms e.target.checked", e.target.checked);
                                
                                setValue('isAgreedTerms', e.target.checked);
      
                                setValue('isAgreed', 
                                  getValues().isAgreedTerms
                                  && getValues().isAgreedPrivacy
                                  && getValues().isAgreedMarketing


                                );
                            } }


                            checked={value}

                            //error = {errors.isAgreedTerms?.message}
                          />
                        )}
                      />

                      <Controller
                        name="isAgreedPrivacy"
                        control={control}
                        //render={({ field }) => (
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            
                          //label="[필수] 개인정보수집 및 이용 동의"

                          // check click label, popup modal
                          label={
                            <button
                              className="text-xs underline"
                              onClick={() => {
                                setOpen(true);
                                setModalData({
                                  title: '개인정보수집 및 이용 동의',
                                  data: contentPrivacy ? contentPrivacy : '',
                                });
                              }}
                            >
                              [필수] 개인정보수집 및 이용 동의
                            </button>
                          }



                            name="isAgreedPrivacy"
                            //size={isMedium ? 'lg' : 'xl'}
                            //className="font-extrabold"
                            size='lg'
                            className="text-xs   pl-2"
                            labelClassName="text-xs   pl-2"
                            ///onChange={onChange}
                            onChange={ (e) => {

                              setIsAgreedPrivacy(e.target.checked);

                              //console.log("isAgreedPrivacy e.target.checked", e.target.checked);
                                
                              setValue('isAgreedPrivacy', e.target.checked);

                              setValue('isAgreed', 
                                getValues().isAgreedTerms
                                && getValues().isAgreedPrivacy
                                && getValues().isAgreedMarketing
                              );

                            } }
                            checked={value}
                          />
                        )}
                      />



                      <div className="flex flex-row items-center justify-start gap-4">
                      <Controller
                        name="isAgreedMarketing"
                        control={control}
                        //render={({ field }) => (
                        render={({ field: { onChange, value } }) => (

                          <Checkbox
                            
                          //label="[선택] 마케팅 정보 수신"

                          // check click label, popup modal

                          /*
                          label={
                          
                            <button
                              className="text-xs underline"
                              onClick={() => {
                                
                                setOpen(true);
                                setModalData({
                                  title: '마케팅 정보 수신',
                                  data: contentMarketing ? contentMarketing : '',
                                });
                                
                              }}
                            >
                              [선택] 마케팅 정보 수신
                            </button>
                          }
                          */
                    

                            name="isAgreedMarketing"
                            //size={isMedium ? 'lg' : 'xl'}
                            //className="font-extrabold"
                            size='lg'
                            className="text-xs   pl-2"
                            labelClassName="text-xs   pl-2"
                            //onChange={onChange}

                            onChange={ (e) => {

                              

                              console.log("isAgreedMarketing e.target.checked", e.target.checked);
                                
                              setValue('isAgreedMarketing', e.target.checked);

                              setValue('isAgreed', 
                                getValues().isAgreedTerms
                                && getValues().isAgreedPrivacy
                                && getValues().isAgreedMarketing
                              );

                            
                            
                          
                            } }

                            checked={value}

                          />
                        )}
                      />
                      <button
                        className="text-xs underline"
                        onClick={() => {
                            
                            setOpen(true);
                            setModalData({
                              title: '마케팅 정보 수신',
                              data: contentMarketing ? contentMarketing : '',
                            });

                        } }
                      >
                        [선택] 마케팅 정보 수신
                      </button>

                      </div>


                    </div>




                    {/* if not valid email and password, diasble button */}
                    {/* if valid email and password, enable button */}

                    
                      
                      <div className="self-stretch flex flex-col items-center justify-center gap-[20px] text-base text-gray-400">


                        {/* if not valid email and password, diasble button */}
                        {/* if valid email and password, enable button */}

                        {

                        


                          ( getValues().email === ''
                          || isAgreedTerms === false
                          || isAgreedPrivacy === false

                          ) ? (

                            <Button
                              //className={`w-full mt-8  rounded-full text-white font-extrabold text-base bg-dark hover:bg-dark-100`}
                              className={`w-full mt-8  rounded-full text-white font-extrabold text-base bg-gray-300 hover:bg-gray-300`}
                              type="submit"
                              size={isMedium ? 'lg' : 'xl'}

                              // if not valid email and password, diasble button
                              // if valid email and password, enable button
                              
                              disabled

                          
                            >
                              다음
                            </Button>

                          ) : (
                              
                              <Button
                                className={`w-full mt-8  rounded-full text-white font-extrabold text-base bg-dark hover:bg-dark-100`}
                                
                                type="submit"

                                size={isMedium ? 'lg' : 'xl'}
      
                                // if not valid email and password, diasble button
                                // if valid email and password, enable button
                                
                                
      
                                onClick={() => {
                                    
                                  //registerUser();
      
                                  ////onSubmit(getValues());

                                  registerUser(

                                    getValues().email,
                                    getValues().password,
                                    getValues().isAgreedTerms ? 'Y' : 'N',
                                    getValues().isAgreedPrivacy ? 'Y' : 'N',
                                    getValues().isAgreedMarketing ? 'Y' : 'N',

                                  
                                  );
      
                                }}
      
                              >
                                다음
                              </Button>
      
                            )

                              
        

                        }


                        {/*
                        <Button
                          className={`w-full mt-8  rounded-full text-white font-extrabold text-base bg-dark hover:bg-dark-100`}
                          type="submit"
                          size={isMedium ? 'lg' : 'xl'}

                          // if not valid email and password, diasble button
                          // if valid email and password, enable button
                          
                        

                          onClick={() => {
                              
                            //registerUser();

                            onSubmit(getValues());

                          }}
                          

                        >
                          다음
                        </Button>
                        */}


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








    </>
        );

        
      }}


    </Form>










    <Modal
            isOpen={open}
            onClose={() => {
              setOpen(false);
            }}

            overlayClassName=" dark:bg-opacity-40 dark:backdrop-blur-lg"
            // y scrollable
            containerClassName="
              dark:bg-gray-100
              max-w-[860px]
              h-[70vh]
              overflow-y-scroll
              rounded-md p-5 lg:p-6 

            
            "

          >
            <div className="flex items-center justify-between pb-2 lg:pb-3  ">
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
                  /////setActive(() => 'posts');
                }}
                className="h-auto px-1 py-1"
              >
                <PiXBold className="h-5 w-5 text-base" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 mr-5   ">

          {/* scrollable */}
          {/* html content */}

                <div  className=" h-full">
                  <div dangerouslySetInnerHTML={{ __html: modalData.data }}></div>
                </div>


            </div>
            
            {/*
            {modalData && <FollowerModal data={modalData.data} />}
            */}

          </Modal>


    </>
    



  );


  } else {

    <>

    회원정보를 불러오는 중입니다.
    
    </>

  }




}

