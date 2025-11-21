'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import InputBox from "@/components-figma/input-box";
import BtnBigOn from "@/components-figma/btn-big-on";
import FormWithVerificationCode from "@/components-figma/form-with-verification-code";
import Footer from "@/components-figma/footer";

import Link from "next/link";

import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';

import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';

import useDebounce from './useDebounce';


import { Form } from '@/components/ui/form';

import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';


import { SignUpSchema, signUpSchema } from '@/utils/validators/doingdoit/signup.schema';

import toast from "react-hot-toast";
import { set } from "lodash";


const Frame12: NextPage = () => {


  const [uuid, setUuid] = useState("");

  useEffect(() => {

    //setUuid(uuidv4());

    setUuid(
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
    


  } , []);


  console.log("uuid", uuid);
  

  const [userData, setUserData] = useState({
    id: "",
    email: "",
    nickname: "",
    avatar: "",
    regType: "",
  });


  const [isExistEmail, setIsExistEmail] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [guideMessage, setGuideMessage] = useState("");

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



  const [email, setEmail] = useState("");

  const debouncedEmail = useDebounce(email, 500);

  
  const [regType, setRegType] = useState("");


  useEffect(() => { 

    const fetchData = async () => {

      const res = await fetch(`/api/doingdoit/user/checkEmailRegistered?_email=${debouncedEmail}`);
      const json = await res?.json() as any;

      console.log("checkEmailRegistered json.data", json?.data);

      if (json?.data?.result === 'Y') {

        if (json?.data?.regType === 'email') {

          setIsExistEmail(true);

          setEmailErrorMessage("");

        } else {
            
          setIsExistEmail(false);

          setEmailErrorMessage("");
          if (json?.data?.regType === 'kakao') {
            setGuideMessage("※ 카카오로 가입하신 회원님은 소셜로그인을 이용해주세요.");
          } else if (json?.data?.regType === 'naver') {
            setGuideMessage("※ 네이버로 가입하신 회원님은 소셜로그인을 이용해주세요.");
          } else if (json?.data?.regType === 'google') {
            setGuideMessage("※ 구글로 가입하신 회원님은 소셜로그인을 이용해주세요.");
          }


        }


      } else {

        setIsExistEmail(false);
        

        if (debouncedEmail.length > 0) {

          
        
          setEmailErrorMessage("등록된 이메일주소가 아닙니다.");

          setGuideMessage("");

        }


      }
    }

    fetchData();

  } , [debouncedEmail]);

  console.log("email====", email);
  console.log("isExistEmail====", isExistEmail);
  console.log("emailErrorMessage====", emailErrorMessage);




  const [password, setPassword] = useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");



  const [isSendingVerificationCode, setIsSendingVerificationCode] = useState(false);




  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {

  
    console.log("onSubmit========",data);
   
  
  };


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

              <div className="self-stretch xl:bg-background flex flex-col items-center justify-start xl:py-10">
                <div className="w-[1000px] flex flex-col items-center justify-start">
                  <div className="self-stretch bg-white flex flex-col items-center justify-end p-[100px] gap-[40px]">
                    
                    <div className="self-stretch relative font-extrabold text-2xl xl:text-3xl">
                      아이디/비밀번호 찾기
                    </div>

                    <div className="w-[400px] flex flex-col items-start justify-center gap-[40px] text-base px-10 xl:px-0">
                      
                      <div className="self-stretch flex flex-row items-center justify-center text-grey-9">
                        
                        <Link
                          href="/usermain/user/find-userid"
                          className=" no-underline  flex-1 box-border h-14 flex flex-row items-center justify-start text-grey-9 border-b-[2px] border-solidborder-grey-d" >
                          <div className="flex-1 relative font-extrabold">
                            아이디 찾기
                          </div>
                        </Link>

                        <Link
                          href="/usermain/user/recovery-password"
                          className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start  border-b-[2px] border-solid border-dark">
                          <div className="flex-1 relative font-extrabold">
                            비밀번호 찾기
                          </div>
                        </Link>

                      </div>
                      
                      <div className="self-stretch relative text-base font-extrabold">
                        아이디(이메일)을 입력하세요.
                      </div>
                      
                      <div className="self-stretch flex flex-col items-start justify-center gap-[32px] text-left text-sm">
                        
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            아이디(이메일)
                          </div>


                          <Controller
                            name="email"
                            control={control}
                            render={({ field: { onChange, value } }) => (

                              <Input
                                disabled={timer > 0 && isActive || userData?.email !== ''}
                                type="text"
                                size="lg"
                                //label="휴대폰"
                                placeholder="이메일주소를 입력해주세요."
                                //className="[&>label>span]:font-medium"
                                className="w-full"

                                //value={value}

                                //////disabled={timer > 0 && isActive || userData?.email !== ''}

                                
                                onChange={
                                  async (e) => {

                                  

                                        onChange(e.target.value);

                                        setEmail(e.target.value)
                                        

                                    
                                  }
                                }
                                
                                  
                              />



                            )}
                          />




                          <div className="self-stretch relative text-xs text-red">
                            {emailErrorMessage}
                          </div>
                          <div className="self-stretch relative text-sm text-center">
                            {guideMessage}
                          </div>
                          
                        </div>

                     
                        {
                          timer <= 0 && !userData?.email  && (
                          //true && (

                          ///timer <= 0 && (

                          

                          <Button
                            
                            isLoading={isSendingVerificationCode}

                            // if email is valid, enable button

                            disabled={ !isExistEmail }

                            //className={`mt-5 w-full  rounded-full font-extrabold text-base
                           // ${isExistEmail ? "bg-dark text-white" : "bg-gray-300  "}`}

                            className={`mt-5 w-full  rounded-full font-extrabold text-base `}
                            
                            type="submit"

                            size="xl"


                            //disabled={ !isExistEmail }

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

                                setIsSendingVerificationCode(true);
                                  
                                const res = await fetch(`/api/doingdoit/user/sendVerificationCodeForEmail?_email=${email}&_uuid=${uuid}`);
                                const json = await res?.json() as any;
                              
                         
                              
                                if (json?.data) {
                              
                                  setIsActive(true);
                              
                                  setTimer(3 * 60);

                                  setVerificationErrorMesssage("");

                                }

                                setIsSendingVerificationCode(false);
                              
                              
                              }

                              fetchData();


                            }}

                          >
                            인증번호 받기
                          </Button>

                        )}






                      {/* 확인 버튼 */}
                      {timer > 0 && (

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

                                 
                                    
                                  const res = await fetch(`/api/doingdoit/user/verifyVerificationCodeByEmail?_email=${email}&_uuid=${uuid}&_verificationCode=${verificationCode}`);
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



                        {userData?.email && (

                          <div className="self-stretch flex flex-col items-start justify-center gap-[32px]">
                          <div className="self-stretch relative font-extrabold">
                            비밀번호를 재설정해 주세요.
                          </div>
                          
                          <div className="self-stretch flex flex-col items-start justify-center gap-[20px] text-left text-sm">
                            
                            <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                              <div className="self-stretch relative font-extrabold">
                                비밀번호
                              </div>

                              <Password
                                size="lg"
                                placeholder="비밀번호(8~15자리 영문,숫자,특수문자 혼합)"
                                className="w-full"
                                inputClassName="text-xs xl:text-base pl-5"

                                onChange={

                                  async (e) => {
                                    setPassword(e.target.value)
                                  }
                                  
                                }
                              />

                              <Password
                                size="lg"
                                placeholder="비밀번호 재입력"
                                className="w-full"
                                inputClassName="text-xs xl:text-base pl-5"

                                // check if password is same as above

                                onChange={

                                  async (e) => {

                                    console.log("password", password);
                                    console.log("e.target.value", e.target.value)
                                    
                                    if (e.target.value !== password) {

                                      // show error message

                                      setPasswordErrorMessage("비밀번호가 일치하지 않습니다.");

                                    } else {

                                      // hide error message

                                      setPasswordErrorMessage("");

                                    }

                                  }
                                  
                                }
                              />

                              {passwordErrorMessage.length > 0 && (
                                  
                                <div className="self-stretch relative text-xs text-red">
                                  {passwordErrorMessage}
                                </div>
                              )}

                            </div>


                            {
                              //passwordErrorMessage.length > 0 && (
                              true && (

                            <Button
                              className={`mt-5 w-full rounded-full text-white font-extrabold text-base bg-dark hover:bg-dark-100`}
                              
                              type="submit"

                              size="xl"

                              onClick={() => {

                                // update password
                                // param: email, password
                                // if success, redirect to login page

                                const fetchData = async () => {
                                    
                                  const res = await fetch(`/api/doingdoit/user/updatePasswordByEmail?_email=${email}&_password=${password}`);
                                  const json = await res?.json() as any;
                                
                                  console.log("updatePassword json.data", json?.data);
                                
                                
                                  if (json?.data) {

                                    toast.success("비밀번호가 변경되었습니다.");

                                    // redirect to login page

                                    window.location.href = "/usermain/user/login";

                                  }
                                
                                
                                }

                                fetchData();

                              } }

                            >

                              확인

                            </Button>

                            )}








                            {/*
                            <BtnBigOn
                              prop="확인"
                              btnBigOnWidth="unset"
                              btnBigOnBorderRadius="100px"
                              btnBigOnAlignSelf="stretch"
                              btnBigOnBackgroundColor="#212121"
                              //btnBigOnHeight="56px"
                            />
                            */}
                          </div>

                          </div>


                        )}
                        


                        {/*

                        <div className="self-stretch relative text-xs text-center">
                          <p className="m-0">
                            ※ 카카오, 네이버, 구글로 가입하신 회원님은
                          </p>
                          <p className="m-0">소셜로그인을 이용해주세요.</p>
                        </div>

                        */}

                      </div>


                      {/*

                      <div className="self-stretch flex flex-col items-start justify-center gap-[32px] text-left text-sm">
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            아이디
                          </div>
                          <InputBox
                            prop="abcde"
                            inputBoxWidth="unset"
                            inputBoxAlignSelf="stretch"
                            //inputBoxFlexShrink="0"
                            //inputBoxFlex="unset"
                            //divColor="#212121"
                            //divTextAlign="left"
                          />
                        </div>
                        <FormWithVerificationCode
                          phoneNumber="01012345678"
                          verificationCode="인증번호"
                        />
                        <BtnBigOn
                          prop="확인"
                          btnBigOnWidth="unset"
                          btnBigOnBorderRadius="100px"
                          btnBigOnAlignSelf="stretch"
                          btnBigOnBackgroundColor="#ccc"
                          //btnBigOnHeight="56px"
                        />
                      </div>
                      <div className="self-stretch flex flex-col items-start justify-center gap-[32px] text-left text-sm">
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            아이디
                          </div>
                          <InputBox
                            prop="abcde"
                            inputBoxWidth="unset"
                            inputBoxAlignSelf="stretch"
                            //inputBoxFlexShrink="0"
                            //inputBoxFlex="unset"
                            //divColor="#212121"
                            //divTextAlign="left"
                          />
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            핸드폰번호
                          </div>
                          <InputBox
                            prop="01012345678"
                            inputBoxWidth="unset"
                            inputBoxAlignSelf="stretch"
                            //inputBoxFlexShrink="0"
                            //inputBoxFlex="unset"
                            //divColor="#212121"
                            //divTextAlign="left"
                          />
                          <div className="self-stretch rounded bg-white box-border h-11 overflow-hidden shrink-0 flex flex-row items-center justify-between py-0 px-3 text-base border-[1px] border-solid border-grey-d">
                            <div className="flex-1 relative">1234</div>
                            <div className="relative text-3xs text-red text-right">
                              02:59
                            </div>
                          </div>
                          <div className="self-stretch relative text-xs text-red">
                            인증번호가 일치하지 않습니다.
                          </div>
                        </div>
                        <BtnBigOn
                          prop="확인"
                          btnBigOnWidth="unset"
                          btnBigOnBorderRadius="100px"
                          btnBigOnAlignSelf="stretch"
                          btnBigOnBackgroundColor="#212121"
                          //btnBigOnHeight="56px"
                        />
                      </div>

                      <div className="self-stretch flex flex-col items-start justify-center gap-[32px]">
                        <div className="self-stretch relative font-extrabold">
                          비밀번호를 재설정해 주세요.
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-center gap-[20px] text-left text-sm">
                          <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                            <div className="self-stretch relative font-extrabold">
                              비밀번호
                            </div>
                            <InputBox
                              prop="비밀번호(8~15자리 영문,숫자,특수문자 혼합)"
                              inputBoxWidth="unset"
                              inputBoxAlignSelf="stretch"
                              //inputBoxFlexShrink="0"
                              //inputBoxFlex="unset"
                              //divColor="#999"
                              //divTextAlign="left"
                            />
                            <InputBox
                              prop="비밀번호 재입력"
                              inputBoxWidth="unset"
                              inputBoxAlignSelf="stretch"
                              //inputBoxFlexShrink="0"
                              //inputBoxFlex="unset"
                              //divColor="#999"
                              //divTextAlign="left"
                            />
                          </div>
                          <BtnBigOn
                            prop="확인"
                            btnBigOnWidth="unset"
                            btnBigOnBorderRadius="100px"
                            btnBigOnAlignSelf="stretch"
                            btnBigOnBackgroundColor="#212121"
                            //btnBigOnHeight="56px"
                          />
                        </div>

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



      } }


    </Form>


    </>

  );


}

export default Frame12;
