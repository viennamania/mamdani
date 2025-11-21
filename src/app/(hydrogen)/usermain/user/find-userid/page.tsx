'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import InputBox from "@/components-figma/input-box";
import BtnBigOn from "@/components-figma/btn-big-on";
import FormWithVerificationCode from "@/components-figma/form-with-verification-code";
import Footer from "@/components-figma/footer";
///import { Link } from "react-router-dom";

import Link from "next/link";

import { Form } from '@/components/ui/form';

import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';


import { SignUpSchema, signUpSchema } from '@/utils/validators/doingdoit/signup.schema';

import { useSession } from 'next-auth/react';

import { useState, useEffect, use } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { set } from "lodash";


import useDebounce from './useDebounce';
import { u } from "uploadthing/dist/types-e8f81bbc";


const onSubmit: SubmitHandler<SignUpSchema> = (data) => {

  
  console.log("onSubmit========",data);
 

};


const Frame13: NextPage = () => {


  const [uuid, setUuid] = useState("");

  useEffect(() => {

    //setUuid(uuidv4());

    setUuid(
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
    


  } , []);



  const [loading, setLoading] = useState(true);


  const { data: session, status } = useSession();

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
      };
      fetchData();
    } , [session?.user?.email]);




    const [isExistMobile, setIsExistMobile] = useState(false);
    const [mobileErrorMessage, setMobileErrorMessage] = useState("");

    const [verificationErrorMesssage, setVerificationErrorMesssage] = useState("");
    const [verificationCode, setVerificationCode] = useState("");


    // timer for verification code
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);


    useEffect(() => {

      let interval = null as any;

      if (isActive) {
        interval = setInterval(() => {
          setTimer((timer) => timer - 1);
        }, 1000);
      } else if (!isActive && timer !== 0) {
        clearInterval(interval as any);
      }
      return () => clearInterval(interval as any);

    }, [isActive, timer]);





  const [mobile, setMobile] = useState("");

  const debouncedMobile = useDebounce(mobile, 500)


  useEffect(() => { 

    const fetchData = async () => {

      const res = await fetch(`/api/doingdoit/user/checkDuplicateMobile?_mobile=${debouncedMobile}`);
      const json = await res?.json() as any;

      console.log("json.data", json?.data);

      if (json?.data === 'Y') {

        setIsExistMobile(true);


        setMobileErrorMessage("");


      } else {

        setIsExistMobile(false);
        

        if (debouncedMobile.length > 0) {
        
          setMobileErrorMessage("등록된 휴대폰번호가 아닙니다.");

        }


      }
    }

    fetchData();

  } , [debouncedMobile]);


  console.log("mobile=======", mobile);


  console.log("isExistMobile", isExistMobile);

  console.log("timer", timer);
  console.log("isActive", isActive);

  


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
          email: '',
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

              <div className="self-stretch xl:bg-background flex flex-col items-center justify-start xl:py-10 ">

                <div className=" xl:w-[1000px] flex flex-col items-center justify-start">
                  
                  <div className="self-stretch bg-white flex flex-col items-center justify-end p-[100px] gap-[40px]">

                    
                    <div className="self-stretch relative font-extrabold text-2xl xl:text-3xl ">
                      아이디/비밀번호 찾기
                    </div>

                    <div className="w-[400px] flex flex-col items-start justify-center gap-[40px] text-sm   px-10 xl:px-0 ">
                      
                      <div className="self-stretch flex flex-row items-center justify-center text-base">
                        
                        <Link
                          href="/usermain/user/find-userid"
                          className=" no-underline  flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-dark">
                          <div className="flex-1 relative font-extrabold">
                            아이디 찾기
                          </div>
                        </Link>

                        <Link
                          href="/usermain/user/recovery-password"
                          className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start text-grey-9 border-b-[2px] border-solid border-grey-d">
                          <div className="flex-1 relative font-extrabold">
                            비밀번호 찾기
                          </div>
                        </Link>

                      </div>

                      <div className="self-stretch relative text-base font-extrabold">
                        가입시 입력하신 핸드폰번호를 입력하세요.
                      </div>

                      <div className="self-stretch flex flex-col items-start justify-center gap-3 text-left ">
                        
                        <div className="self-stretch flex flex-col items-start justify-center gap-1">
                          
                          <div className="self-stretch relative font-extrabold">
                            핸드폰번호
                          </div>

                          <Controller
                            name="mobile"
                            control={control}
                            render={({ field: { onChange, value } }) => (

                              <Input
                                type="text"
                                size="lg"
                                //label="휴대폰"
                                placeholder="'-'없이 입력해주세요."
                                //className="[&>label>span]:font-medium"
                                className="w-full"
                                value={value}

                                disabled={timer > 0 && isActive || userData?.email !== ''}

                                onChange={
                                  async (e) => {

                                    // check number only
                                    const regExp = /^[0-9\b -]{0,13}$/;
                                    if (e.target.value === '' || regExp.test(e.target.value)) {

                                        onChange(e.target.value);

                                        setMobile(e.target.value)
                                        

                                    }
                                  }
                                }
                                  
                              />
                              
                            )}
                          />

                          <div className="self-stretch relative text-xs text-red">
                            {mobileErrorMessage}
                          </div>
                        </div>

                        {
                          ///timer === 0 && !userData?.email  && (

                          false && (


                          <Button
                            className={`mt-5 w-full  rounded-full font-extrabold text-base
                            ${isExistMobile ? "bg-dark text-white" : "bg-gray-300  "}`}
                            
                            type="submit"

                            size="xl"


                            disabled={ !isExistMobile }

                            onClick={() => {

                              /*
                              setIsActive(true);

                              setTimer(3 * 60);
                              */

                              // call api to send verification code to mobile
                              // if success, setIsActive(true);
                              // param: mobile
                              // param: uuid

                              const fetchData = async () => {
                                  
                                const res = await fetch(`/api/doingdoit/user/sendVerificationCode?_mobile=${mobile}&_uuid=${uuid}`);
                                const json = await res?.json() as any;
                              
                                console.log("json.data", json?.data);
                              
                              
                                if (json?.data) {
                              
                                  setIsActive(true);
                              
                                  setTimer(3 * 60);

                                  setVerificationErrorMesssage("");

                                }
                              
                              
                              }

                              fetchData();


                            }}

                          >
                            인증번호 받기
                          </Button>

                        )}
                          
                      


                        {/*
                        // display 3 minutes count down at right side of input box

                        // if 3 minutes passed, display "재발송" button
                        */}

                        {/* 확인 버튼 */}
                        {
                          ///timer > 0 && (

                          false && (

                        <>
                          
                          <Input
                            type="text"
                            size="lg"
                            //label="휴대폰"
                            placeholder="인증번호"
                            //className="[&>label>span]:font-medium"
                            className="w-full"

                            onChange={

                              async (e) => {
                                setVerificationCode(e.target.value);
                              }
                              
                            }

                            suffix={
                              <div className="relative text-3xs text-red text-right">
                                
                                {

                                  // if 3 minutes passed, display "재발송" button


                                  timer > 0 && (
                                    <span>
                                      {
                                        //timer
                                        Math.floor(timer / 60) + ":" + ("0" + timer % 60).slice(-2)
                                      }
                                    </span>
                                  )


                                }

                              </div>
                            }

                          />

                        
                          <Button
                            className={`mt-5 w-full rounded-full text-white font-extrabold text-base bg-dark hover:bg-dark-100`}
                            
                            type="submit"

                            size="xl"

                            onClick={() => {


                              if (verificationCode.length === 4) {

                                // call api to verify verification code
                                // if success, setTimer(0);
                                // param: mobile, verificationCode

                                const fetchData = async () => {
                                    
                                  const res = await fetch(`/api/doingdoit/user/verifyVerificationCode?_mobile=${mobile}&_uuid=${uuid}&_verificationCode=${verificationCode}`);
                                  const json = await res?.json() as any;
                                
                                  console.log("verifyVerificationCode json.data", json?.data);
                                
                                
                                  if (json?.data) {

                                    setUserData(json?.data);
                                
                                    setTimer(0);
                                   

                                    setVerificationErrorMesssage("");



                                  } else {
                                      
                                    setVerificationErrorMesssage("인증번호가 일치하지 않습니다.");

                                  }
                                
                                
                                }

                                fetchData();


                              }

                            }}

                          >
                            확인
                          </Button>


                          {verificationErrorMesssage.length > 0 && (
                            
                            <div className="self-stretch relative text-xs text-red">
                              {verificationErrorMesssage}
                            </div>
                          )}


                        </>


                        )}
                               

                      </div>



                      {/* 이메일 확인 버튼 */}
                      <Button
                        className={`mt-5 w-full rounded-full text-white font-extrabold text-base bg-dark hover:bg-dark-100`}
                        size="xl"

                        onClick={() => {

                          const fetchData = async () => {
                                
                              const res = await fetch(`/api/doingdoit/user/getUserByMobile?_mobile=${mobile}`);
                              const json = await res?.json() as any;
                            
                              console.log("json.data", json?.data);
                            
                            
                              if (json?.data) {
                            
                                setUserData(json?.data);

                              }
                            
                            
                            }

                            fetchData();

                        }}

                      >
                        이메일 확인
                      </Button>
                     




                      {userData?.email !== '' && (

                        <div className="self-stretch flex flex-col items-start justify-center gap-[32px]">
                          
                          {userData?.regType === 'email' && (
                            <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                              <div className="self-stretch relative">
                                회원님은 이메일로 가입하셨습니다.
                              </div>
                              <div className="self-stretch relative text-xl font-extrabold">
                                {userData?.email}
                              </div>
                            </div>
                          )}


                          {userData?.regType === 'kakao'  && (
                            <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                              <div className="self-stretch relative leading-[20px]">
                                <p className="m-0">회원님은 카카오톡 간편가입하셨습니다.</p>
                                <p className="m-0">소셜 간편로그인해주세요.</p>
                              </div>
                              <div className="self-stretch flex flex-row items-center justify-center gap-[4px] text-base">
                                <img
                                  className="relative rounded-81xl w-6 h-6 overflow-hidden shrink-0"
                                  alt=""
                                  src="/usermain/images/kakao.svg"
                                />
                                <div className="relative font-extrabold">
                                  {userData?.email}
                                </div>
                              </div>
                            </div>
                          )}

                          {userData?.regType === 'naver' && (
                            <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                              <div className="self-stretch relative leading-[20px]">
                                <p className="m-0">회원님은 네이버 간편가입하셨습니다.</p>
                                <p className="m-0">소셜 간편로그인해주세요.</p>
                              </div>
                              <div className="self-stretch flex flex-row items-center justify-center gap-[4px] text-base">

                                <img
                                  className="relative rounded-81xl w-6 h-6 overflow-hidden shrink-0"
                                  alt=""
                                  src="/usermain/images/naver.svg"
                                />

                                <div className="relative font-extrabold">
                                  {userData?.email}
                                </div>
                              </div>
                            </div>
                          )}

                        

                          { userData?.regType === 'google' && (
                            <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                              <div className="self-stretch relative leading-[20px]">
                                <p className="m-0">회원님은 구글 간편가입하셨습니다.</p>
                                <p className="m-0">소셜 간편로그인해주세요.</p>
                              </div>
                              <div className="self-stretch flex flex-row items-center justify-center gap-[4px] text-base">
                                <img
                                  className="relative rounded-81xl w-6 h-6 overflow-hidden shrink-0"
                                  alt=""
                                  src="/usermain/images/google.svg"
                                />
                                <div className="relative font-extrabold">
                                  {userData?.email}
                                </div>
                              </div>
                            </div>
                          )}


                          {/* goto login page */}

                          <Button
                            className={`w-full  rounded-full font-extrabold text-base bg-dark hover:bg-dark-100`}
                            
                            type="submit"

                            size="xl"

                            onClick={() => {

                              window.location.href = "/usermain/user/login";

                            }}

                          >
                            로그인하기
                          </Button>

                        </div>
                        
                      )}






                      {/*

                      <div className="self-stretch rounded bg-white box-border h-11 overflow-hidden shrink-0 flex flex-row items-center justify-between py-0 px-3 text-base text-grey-9 border-[1px] border-solid border-grey-d">
                        <div className="flex-1 relative" >
                          {
                            //verificationCode
                          }
                        </div>
                        <div className="relative text-3xs text-red text-right">02:59</div>
                      </div>




                      <div className="self-stretch flex flex-col items-start justify-center gap-[32px]">
                        <FormWithVerificationCode
                          phoneNumber="01032545687"
                          verificationCode="인증번호"
                          propColor="#999"
                        />
                        <BtnBigOn
                          prop="확인"
                          btnBigOnWidth="unset"
                          btnBigOnBorderRadius="100px"
                          btnBigOnAlignSelf="stretch"
                          btnBigOnBackgroundColor="#ccc"
                          ///btnBigOnHeight="56px"
                        />
                      </div>
                      */}


                      {/*
                      <div className="self-stretch flex flex-col items-start justify-center gap-[32px] text-left">
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            핸드폰번호
                          </div>
                          <InputBox
                            prop="01032545687"
                            inputBoxWidth="unset"
                            inputBoxAlignSelf="stretch"
                            //inputBoxFlexShrink="0"
                            //inputBoxFlex="unset"
                            //divColor="#212121"
                            //divTextAlign="left"
                          />
                          <div className="self-stretch relative text-xs text-red">
                            등록된 휴대폰번호가 아닙니다.
                          </div>
                        </div>
                        <BtnBigOn
                          prop="인증번호 받기"
                          btnBigOnWidth="unset"
                          btnBigOnBorderRadius="100px"
                          btnBigOnAlignSelf="stretch"
                          btnBigOnBackgroundColor="#212121"
                          ///btnBigOnHeight="56px"
                        />
                      </div>
                      <div className="self-stretch flex flex-col items-start justify-center gap-[32px]">
                        <FormWithVerificationCode
                          phoneNumber="01032545687"
                          verificationCode="인증번호"
                          propColor="#999"
                        />
                        <BtnBigOn
                          prop="확인"
                          btnBigOnWidth="unset"
                          btnBigOnBorderRadius="100px"
                          btnBigOnAlignSelf="stretch"
                          btnBigOnBackgroundColor="#ccc"
                          ///btnBigOnHeight="56px"
                        />
                      </div>
                      <div className="self-stretch flex flex-col items-start justify-center gap-[32px] text-left text-xs text-red">
                        <FormWithVerificationCode
                          phoneNumber="01032545687"
                          verificationCode="5895"
                          propColor="#212121"
                        />
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <BtnBigOn
                            prop="확인"
                            btnBigOnWidth="unset"
                            btnBigOnBorderRadius="100px"
                            btnBigOnAlignSelf="stretch"
                            btnBigOnBackgroundColor="#212121"
                            ///btnBigOnHeight="56px"
                          />
                          <div className="self-stretch relative">
                            인증번호가 일치하지 않습니다.
                          </div>
                        </div>
                      </div>

                      <div className="self-stretch flex flex-col items-start justify-center gap-[32px]">
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative">
                            회원님은 이메일로 가입하셨습니다.
                          </div>
                          <div className="self-stretch relative text-xl font-extrabold">
                            uniwf
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative leading-[20px]">
                            <p className="m-0">회원님은 네이버 간편가입하셨습니다.</p>
                            <p className="m-0">소셜 간편로그인해주세요.</p>
                          </div>
                          <div className="self-stretch flex flex-row items-center justify-center gap-[4px] text-base">
                            <img
                              className="relative rounded-81xl w-6 h-6 overflow-hidden shrink-0"
                              alt=""
                              src="/usermain/images/kakao.svg"
                            />
                            <img
                              className="relative rounded-81xl w-6 h-6 overflow-hidden shrink-0"
                              alt=""
                              src="figma/images/naver.svg"
                            />
                            <img
                              className="relative rounded-81xl w-6 h-6 overflow-hidden shrink-0"
                              alt=""
                              src="/usermain/images/google.svg"
                            />
                            <div className="relative font-extrabold">
                              safie@naver.com
                            </div>
                          </div>
                        </div>
                        <BtnBigOn
                          prop="로그인하기"
                          btnBigOnWidth="unset"
                          btnBigOnBorderRadius="100px"
                          btnBigOnAlignSelf="stretch"
                          btnBigOnBackgroundColor="#212121"
                          ///btnBigOnHeight="56px"
                        />
                      </div>
                      */}


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
        );

        
      }}


    </Form>


    </>

  );


}



  


export default Frame13;
