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


import { PiXBold, PiGenderMale, PiGenderFemale,  } from 'react-icons/pi';

import { AiTwotoneEyeInvisible } from "react-icons/ai";


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

import { fa, tr, vi } from "@faker-js/faker";
import { on } from "events";


import { Modal } from '@/components/ui/modal';
import { u } from "uploadthing/dist/types-e8f81bbc";

import Image from "next/image";
import Uploader from '@/components/doingdoit/upload/uploader';

import { DatePicker } from '@/components/ui/datepicker';


import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';
import SelectBox from "@/components/ui/select";
import toast from "react-hot-toast";




export default function Register() {



  const { data: session, status } = useSession();


  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: '',
  });





  useEffect(() => {
    const fetchData = async () => {
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



  const [selectedPage, setSelectedPage] = useState(1);



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






  const [userName, setUserName] = useState('');
  const [userNickname, setUserNickname] = useState('');

  const [userMobile, setUserMobile] = useState('');

  const [userAvatar, setUserAvatar] = useState('');
  
  const [userBirthDate, setUserBirthDate] = useState('');
  
  const [userGender, setUserGender] = useState('');

  const [userWeight, setUserWeight] = useState( 0 ); // number
  const [userHeight, setUserHeight] = useState( 0 ); // number

  const [userPurpose, setUserPurpose] = useState('');
  const [userDefinedPurpose, setUserDefinedPurpose] = useState('');

  const [userMarketingAgree, setUserMarketAgree] = useState('Y');


  const [userBirthDateYear, setUserBirthDateYear] = useState(2000);
  const [userBirthDateMonth, setUserBirthDateMonth] = useState(0);
  const [userBirthDateDay, setUserBirthDateDay] = useState(1);

  const [userMedicalHistory, setUserMedicalHistory] = useState('');
  const [userFamilyMedicalHistory, setUserFamilyMedicalHistory] = useState('');

  const [stabilityId, setStabilityId] = useState('');


  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");


  const [isRegistering, setIsRegitering] = useState(false);




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


  
  if (session && userData?.email ) {
    window.location.href = "/";
  }
  









  const registerUser = async (
    email: string,
    password: string,
    isAgreedTerms: string,
    isAgreedPrivacy: string,
    isAgreedMarketing: string,


    userName: string,
    userNickname: string,
    userMobile: string,
    userBirthDate: string,
    userPurpose: string,
    userMedicalHistory: string,
    userFamilyMedicalHistory: string,
    userAvatar: string,
    userGender: string,
    userWeight: number,
    userHeight: number,

    //STABILITY ID
    stabilityId?: string,

  ) => {

    ///console.log("register");

    /*
    if (emailError || passwordError) {
      return;
    }
    */


    setIsRegitering(true);

    const userPurposeValue = userPurpose == '기타(직접입력)' ? userDefinedPurpose : userPurpose;



 
    // post api

    const res = await fetch(`/api/doingdoit/user/setOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        loginId: email,
        password: password,
        regType: 'email',
        isAgreedTerms: isAgreedTerms,
        isAgreedPrivacy: isAgreedPrivacy,
        isAgreedMarketing: isAgreedMarketing,


        name: userName,
        nickname: userNickname,
        mobile: userMobile,

        //birthDate: userBirthDate,
        ///birthDate: `${userBirthDateYear}-${userBirthDateMonth}-${userBirthDateDay}`,
        //birthDate: userBirthDate,
        /// userBirthDate => 2022-01-01
        // convert month to 1 ~ 12

        birthDate: `${userBirthDateYear}-${userBirthDateMonth + 1}-${userBirthDateDay}`,


        gender: userGender,
        avatar: userAvatar,
        weight: userWeight,
        height: userHeight,
        purpose: userPurposeValue,
        medicalHistory: userMedicalHistory,
        familyMedicalHistory: userFamilyMedicalHistory,

        stabilityId: stabilityId ? stabilityId : '',

      }),
    });


    setIsRegitering(false);


    const json = await res?.json();

  




    if (json === undefined) {
      alert("이메일이 이미 존재합니다.");
      return;
    } else {

      const data = json as any;

      ///alert("data : " + JSON.stringify(data));

      ///console.log("data", data);




  
      if (data?.data?.id) {
        ///window.location.href = "/";

        ///window.location.href = `/usermain/user/profile-edit/${email}  `;


        
        signIn("credentials", {
          id: email,
          password: password,

          //callbackUrl: `/usermain/user/profile-edit/${data.data.id}`,


          //callbackUrl: `/usermain/user/survey`,
          callbackUrl: `/`,


        });
        



        

        ///window.location.href = '/usermain/user/survey';


        //window.location.href = `/usermain/user/profile-edit/${data.data.id}  `;


      } else {
        //alert(json.message);
      }
    

    }

    
  }


  /* updateAvatar */
  /*
  const updateAvatar = async (url: string) => {
    try {
      //setUser(null);
      //setError(null);
      const res = await fetch(`/api/doingdoit/user/updateAvatarById?_id=${_id}`
      + `&_avatar=${url}`
      );

      if (res.status === 200) {
        const json = await res?.json() as any;
        setUserAvatar(url);
      } else {
        
      }

    } catch (e) {
      ///setError(e);
    }
  }
  */



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

   {/* page 1 */}

    
   { selectedPage === 1 && (

          
              <div className="self-stretch   xl:bg-background flex flex-col items-center justify-start py-10 px-0">
                
      
        
  

                <div className=" xl:w-[1000px] flex flex-col items-center justify-start p-5  ">

                  <div className="  self-stretch bg-white flex flex-col items-center justify-center  p-10  xl:p-[100px] gap-[40px]  ">



                  <div className="self-stretch relative font-extrabold  text-2xl xl:text-3xl ">
                    이메일로 회원 가입하기
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



                    <div className=" mt-5 text-sm font-extrabold text-dark w-full text-left ">
                      비밀번호
                    </div>

                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Password




                          /*

                          rizzui Password

                          if selected show/hide password, change boundary color

                          visibilityToggleIcon

                          when visibleToggleIcon is clicked, change visibleToggleIcon boundary color to gray
                          */

                          // when selected show/hide password, don't show boundary
                          visibilityToggleIconClassName="
                          

                          
                          "


                          // visibilityToggleIcon disable tabIndex
                          //visibilityToggleIconTabIndex={-1}
                          /*
                          visibilityToggleIcon={(visible) => (
                            <AiTwotoneEyeInvisible
                          
                              // diable tabIndex

                              tabIndex={-1}

                              className="text-gray-400"



                            />

                          )}
                          */


                          // visibilityToggleIcon tabIndex -1







                         


                          //label="비밀번호"
                          placeholder="비밀번호는 8~12자리 영문,숫자,특수문자 혼합"

                          inputClassName="text-xs xl:text-base pl-5"


                          className=" self-stretch"
                          size={isMedium ? 'lg' : 'xl'}
                          ////{...register('password')}
                          //className="[&>label>span]:font-sm"
                          
                          ///error={errors.password?.message}

                          errorClassName="text-left"

                          onChange={
                            (e) => {



                              //console.log("password e.target.value", e.target.value);

                              onChange(e.target.value);

                              setPassword(e.target.value);

                              // check valid password
                              // 8~12자리 영문,숫자,특수문자 혼합
                              // error message
                              // 비밀번호는 8~12자리 영문,숫자,특수문자 혼합
                              // check 8-12 digit and mix of alphabet, number, special character

                              if (e.target.value.length === 0) {
                                setPasswordError(false);
                                setPasswordConfirmErrorMessage("");
                              } else {

                                if (
                                  e.target.value.length < 8
                                  || e.target.value.length > 12
                                  || !/[a-zA-Z]/.test(e.target.value)
                                  || !/[0-9]/.test(e.target.value)
                                  || !/[~!@#$%^*+=-]/.test(e.target.value)
        
                                ) {
                                  setPasswordError(true);
                                  setPasswordConfirmErrorMessage("비밀번호는 8~12자리 영문,숫자,특수문자 혼합");
                                } else {

                                 
                                  setPasswordError(false);
                                  setPasswordConfirmErrorMessage("");
                                }

                              }


                            }
                          
                          }

                          value={value}
                        />
                      )}
                    />

                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Password
                          //label="비밀번호"
                          placeholder="비밀번호 재입력"
                          inputClassName="text-xs xl:text-base pl-5"

                          className=" self-stretch"
                          size={isMedium ? 'lg' : 'xl'}
                          ////{...register('password')}
                          //className="[&>label>span]:font-medium mt-2"
                          
                          
                          error={

                            passwordConfirmErrorMessage !== "" ? passwordConfirmErrorMessage :
                            errors.confirmPassword?.message

                          }



                          errorClassName="text-left"

                          onChange={
                            (e) => {

                              onChange(e.target.value);  
                              
                              setConfirmPassword(e.target.value);

                              if (passwordError === false
                                && e.target.value.length > 0
                              ) {

                                if (password !== e.target.value) {
                                  setPasswordConfirmErrorMessage("비밀번호가 일치하지 않습니다.");
                                } else {
                                  setPasswordConfirmErrorMessage("");

                                  

                                }
 
                              } else {
                                ///setPasswordConfirmErrorMessage("");
                              }
                            }
                          
                          }
                          value={value}
                        />
                      )}

                    />



        
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
                                type="button"
                                
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
                              type="button"
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
                        type="button"
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

                        


                          (email === ""
                          || password === ""
                          || confirmPassword === ""
                          || emailErrorMessage !== ""
                          || confirmPassword === ""
                          || password !== confirmPassword
                          || isAgreedTerms === false
                          || isAgreedPrivacy === false
                          || passwordError === true
                          


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


                                  /*
                                  registerUser(

                                    getValues().email,
                                    getValues().password,
                                    getValues().isAgreedTerms ? 'Y' : 'N',
                                    getValues().isAgreedPrivacy ? 'Y' : 'N',
                                    getValues().isAgreedMarketing ? 'Y' : 'N',

                                  
                                  );
                                  */

                                  setSelectedPage(2);


      
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



   )}






            { selectedPage === 2 && (

              <div className="xl:w-[1000px] flex flex-col items-center justify-start p-5">

              <div className="self-stretch bg-white flex flex-col items-center justify-end p-10  xl:p-[100px] gap-[40px]">

                    
                <div className="self-stretch relative font-extrabold  text-2xl xl:text-3xl ">
                  프로필을 완성해 주세요.
                </div>


                <div className=" xl:w-[400px] flex flex-col items-start justify-center text-left text-sm">
                  
                  <div className="self-stretch flex flex-col items-center justify-start gap-[32px]">
                    
                    {/*
                    <Profile profileIconPosition="relative" />
                    */}

                    {/* Uploader button overlap to avatar */} 
                    <div className="grid ">
                      <div className="col-start-1 row-start-1">

                        <Controller
                          name="avatar"
                          control={control}
                          render={({ field: { onChange, value } }) => (

                            <Image
                              src={value || '/usermain/images/avatar.svg'}
                              alt="user avatar"
                              width={150}
                              height={150}
                              className="relative w-28 h-28 rounded-full"
                              style = {{ objectFit: 'cover' }}
                              /* loading animation */
                              placeholder="blur"
                              blurDataURL="https://cryptoss.beauty/usermain/images/avatar.svg"
                            />

                          )}
                        />


                      </div>

                      <div className="col-start-1 row-start-1  ">
                        <div className="absolute 
                          
                      
                        ">
                        <Uploader
                          onSave={(url: string) => {


                            //updateAvatar(url);


                            setValue('avatar', url);

                            setUserAvatar(url);


                          }}
                        />
                        </div>
                      </div>
                    </div>






                    <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">

                      {/* 상점 ID */}
                      {/* stabilityId */}
                      <div className="self-stretch relative font-extrabold">
                        <span>상점 ID</span>
                        <span className="text-red">*</span>
                      </div>

                      <Controller
                        name="stabilityId"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            type="text"
                            size="lg"
                            //label="상점 ID"
                            placeholder="상점 ID를 입력해주세요."
                            //className="[&>label>span]:font-medium"
                            className="w-full"
                            value={value}
                            onChange={
                              (e) => {
                                setStabilityId(e.target.value);
                                onChange(e.target.value);
                              }
                            }
                              
                          />
                        )}
                      />


                      {/* 휴대폰 */}
                      <div className="self-stretch relative font-extrabold">
                        <span>휴대폰</span>
                        <span className="text-red">*</span>
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
                            onChange={
                              (e) => {


                                // check number only
                                const regExp = /^[0-9\b -]{0,13}$/;
                                if (e.target.value === '' || regExp.test(e.target.value)) {
                                  
                                  setUserMobile(e.target.value);

                                  onChange(e.target.value);
                                }

                                //setUserMobile(e.target.value);
                                //onChange(e.target.value);
                              }
                            }
                              
                          />
                        )}
                      />
                      
                      {/*계정 정보 찾기에 이용됩니다*/}
                      <div className="self-stretch relative font-extrabold">
                        계정 정보 찾기에 이용됩니다.
                      </div>
                    </div>
                        
                      



                    <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">

                      <div className="self-stretch relative font-extrabold">
                        <span>닉네임</span>
                        <span className="text-red">*</span>
                      </div>

                      <Controller
                        name="nickname"
                        control={control}

                    

                        render={({ field: { onChange, value } }) => (

                          <Input
                            type="email"
                            //size={isMedium ? 'lg' : 'xl'}
                            size='lg'
                            //label="이메일 주소"
                            placeholder="10자이내 영문,한글"
                            //className="[&>label>span]:font-medium"
                            className="w-full"
                            
                            //{...register('email')}

                            error={
                              /////emailErrorMessage !== "" ? emailErrorMessage : errors.email?.message

                              nicknameErrorMessage !== "" ? nicknameErrorMessage : errors.nickname?.message

                            }
                            errorClassName="text-left "

                            onChange={

                              async (e) => {

                                //setEmail(e.target.value);
                                setUserNickname(e.target.value);


                                onChange(e.target.value);


                                const res = await fetch(`/api/doingdoit/user/checkDuplicateNickname?_nickname=${e.target.value}`);
                                const json = await res?.json() as any;

                                console.log("json.data", json?.data);

                                if (json?.data === 'Y') {
                  

                                  //setEmailErrorMessage("이미 가입된 이메일입니다.");
                                  setNicknameErrorMessage("이미 가입된 닉네임입니다.");


                                } else {
                                  
                                  //setEmailErrorMessage("");
                                  setNicknameErrorMessage("");

                                }

                              }

                            }

                            value={value}
                          />
                        )}
                      />



                    </div>

                    <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                      <div className="self-stretch relative font-extrabold">
                        <span>생년월일</span>
                        <span className="text-red">*</span>
                      </div>


                      
                      <div className="self-stretch flex flex-wrap items-center justify-center gap-[8px]">

                        {/*
                        userBirthDateYear
                        userBirthDateMonth
                        userBirthDateDay
                        */}

                        <DatePicker
                          showYearPicker
                          selected={new Date(userBirthDateYear, 1, 1)}
                          onChange={(date: any) => {
                            console.log('ProfileEditPage date: ', date);

                            setUserBirthDateYear(date?.getFullYear());

                            

                          }}
                          dateFormat="yyyy"
                          placeholderText="년도"
                          //className="self-stretch w-full"
                        />

                        <DatePicker
                          showMonthYearPicker

                          //defaultValue={new Date(userBirthDateYear, userBirthDateMonth)}
                          // default Year

                      

                          // month picker

                          selected = {
                            new Date(userBirthDateYear, userBirthDateMonth)
                          }
                          
                          onChange={(date: any) => {
                            console.log('ProfileEditPage date: ', date);

                            setUserBirthDateMonth(date?.getMonth());

                          }}
                          dateFormat="MM"
                          placeholderText="월"
                          //className="w-full"
                        />

                        {/* picker for day */}
                        {/* userBirthDateDay */}
                        <DatePicker


                          selected={
                            new Date(userBirthDateYear, userBirthDateMonth, userBirthDateDay)
                          }

                          onChange={(date: any) => {
                            console.log('ProfileEditPage date: ', date);

                            setUserBirthDateDay(date?.getDate());

                          }}

                          dateFormat="dd"

                          placeholderText="일"
                          //className="w-full"
                        />



                      </div>

                      
                    </div>



                    <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                      <div className="self-stretch relative font-extrabold">
                        <span>성별</span>
                        <span className="text-red">*</span>
                      </div>



                      <Controller
                        name="gender"
                        control={control}
                        render={({ field: { onChange, value } }) => (

                          <RadioGroup
                          
                            //value={value}

                            value={userGender}

                            //setValue={setValue}

                            setValue={(value) => {
                              //setValue(value);
                              ///console.log('value', value);
                              
                              //setUserGender(value);

                              onChange(value);

                            } }

                            

                          
                            onChange={onChange}

                          >

                            <div className="self-stretch flex flex-row items-center justify-start gap-[40px]">
                              <Radio
                                size="sm"
                                // text size sm, md, lg
                                labelClassName="pl-2 text-md "
                                name="gender"
                                label="여성"
                                value='여성'

                                // if checked, set userGender to '여성'

                                onChange={(e) => {
                                  setUserGender('여성');
                                } }


                              />

                              <Radio
                              size="sm"
                              labelClassName="pl-2 text-md "
                              name="gender"
                              label="남성"
                              value='남성'

                              // if checked, set userGender to '남성'
                              onChange={(e) => {
                                setUserGender('남성');
                              } }

                              />
                            </div>
                          </RadioGroup>
                        )}

                      />

                    </div>


                    <div className="hidden self-stretch flex-col items-start justify-center gap-[8px]">
                      <div className="self-stretch relative font-extrabold">
                        <span>몸무게</span>
                        <span className="text-red">*</span>
                      </div>
                      <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">

                        <Controller
                          name="weight"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Input
                              type="text"
                              size="lg"
                              ///label="몸무게"
                              placeholder="몸무게"
                              //className="[&>label>span]:font-medium"

                              className="w-full"
                              value={value}
                              onChange={
                                (e) => {
                                  setUserWeight(parseInt(e.target.value));
                                  onChange(e.target.value);
                                }
                              }
                            />
                          )}
                        />


                        <div className="relative">kg</div>
                      </div>
                    </div>

                    <div className="hidden self-stretch flex-col items-start justify-center gap-[8px]">
                      <div className="self-stretch relative font-extrabold">
                        <span>키</span>
                        <span className="text-red">*</span>
                      </div>
                      <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">


                        <Controller
                          name="height"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Input
                              type="text"
                              size="lg"
                              ///label="키"
                              placeholder="키"
                              //className="[&>label>span]:font-medium"
                              className="w-full"
                              value={value}
                              onChange={
                                (e) => {
                                  setUserHeight(parseInt(e.target.value));
                                  onChange(e.target.value);
                                }
                              }
                            />
                          )}
                        />

                        
                        <div className="relative">cm</div>
                      </div>
                    </div>
                    
                    <div className="hidden self-stretch flex-col items-start justify-center gap-[8px]">
                      <div className="self-stretch relative font-extrabold">
                        <span>식단기록목적</span>
                        <span className="text-red">*</span>
                      </div>

                      <Controller
                        name="purpose"
                        control={control}
                        render={({ field: { onChange, value } }) => (

                          <div className="w-full flex flex-col items-start justify-center gap-[8px]">

                          <SelectBox
                            value={value}
                            onChange={
                              (
                                e : any
                              ) => {
                                
                                
                                console.log('purpose e: ', e);

                                onChange(e.value);



                                e.value == '기타(직접입력)' ? setUserPurpose('') : setUserPurpose(e.value);

                                
                                //e.target.value == '기타(직접입력)' ? setUserPurpose('') : setUserPurpose(e.target.value);

                                setUserPurpose(e.value);

                              }
                            }
                              //onChange={(e) => setUserPurpose(e.target.value)}

                            options={
                              [
                                { label: '다이어트', value: '다이어트', name: 'purpose' },
                                { label: '체중증가', value: '체중증가', name: 'purpose' },
                                { label: '영양보충', value: '영양보충', name: 'purpose' },
                                { label: '혈압관리', value: '혈압관리', name: 'purpose' },
                                { label: '혈당관리', value: '혈당관리', name: 'purpose' },
                                { label: '콜레스테롤관리', value: '콜레스테롤관리', name: 'purpose' },
                                { label: '건강유지', value: '건강유지', name: 'purpose' },
                                { label: '챌린지참여', value: '챌린지참여', name: 'purpose' },
                                { label: '기타(직접입력)', value: '기타(직접입력)', name: 'purpose' },

                              ]
                            }

                            placeholder="분류를 선택하세요."
                            className="w-full"

                          />

                          { value == '기타(직접입력)' && (
                            <Input
                              type="text"
                              size="lg"
                              ///label="키"
                              placeholder="식단기록목적을 입력해주세요."
                              //className="[&>label>span]:font-medium"
                              className="w-full text-sm"
                              //value={value}
                              //onChange={onChange}

                              ///onChange={(e) => setUserPurpose(e.target.value)}

                              value={userDefinedPurpose}

                              onChange={
                                (e) => {
                                  setUserDefinedPurpose(e.target.value);
                                }
                              }


                            />
                          )}

                            

                          </div>
                        )}
                      />
                                      

                    </div>


                        {/*
                    <ContainerNoPrescriptionOrDisea medicalHistoryQuestion="현재 질병이 있거나 증상 개선을 위해 처방을 받아 복용중인 약이 있나요?" />
                    */}

                    <div className="hidden self-stretch flex-col items-start justify-center gap-[8px]">
                      <div className="self-stretch relative font-extrabold">
                        <span>현재 질병이 있거나 증상 개선을 위해 처방을 받아 복용중인 약이 있나요?</span>
                        <span className="text-red">*</span>
                      </div>
                    
                      {/* 질병 선택 */  }

                      <Controller
                        name="medicalHistory"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <RadioGroup
                            value={
                              value || userMedicalHistory
                            }
                            //setValue={setValue}

                            setValue={(value) => {
                              //setValue(value);
                              ///console.log('value', value);
                              setUserMedicalHistory(value);
                            } }
                          >
                            <div className="self-stretch flex flex-row items-center justify-start gap-[40px] ">
                            <Radio
                              size="sm"
                              // text size sm, md, lg
                              labelClassName="pl-2 text-md "
                              
                              name="medicalHistory"
                              label="예"
                              value="Y"
                              
                              { ...userMedicalHistory == 'Y' ? { checked: true } : {} }

                              onChange={
                                (e) => {
                                  setUserMedicalHistory('Y');
                                }
                              }

                            />
                            <Radio
                              size="sm"
                              labelClassName="pl-2 text-md "
                              name="medicalHistory"
                              label="아니오"
                              value="N"

                              { ...userMedicalHistory == 'N' ? { checked: true } : {} }

                              onChange={
                                (e) => {
                                  setUserMedicalHistory('N');
                                }
                              }
                            />
                            </div>
                          </RadioGroup>
                        )}
                      />



                    </div>
                    


                    {/* 가족 질병 선택 */  }

                    <div className="hidden self-stretch flex-col items-start justify-center gap-[8px]">
                      <div className="self-stretch relative font-extrabold">
                        <span>부모, 형제, 자매 중 다음의 질환을 앓았거나 해당 질환으로 사망한 경우가 있나요?(뇌졸중, 심근경색, 고혈압, 당뇨병, 암)</span>
                        <span className="text-red">*</span>
                      </div>
                    
                      {/* 질병 선택 */  }


                      <Controller
                        name="familyMedicalHistory"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <RadioGroup
                            value={
                              value || userFamilyMedicalHistory
                            }
                            //setValue={setValue}

                            setValue={(value) => {
                              //setValue(value);
                              ///console.log('value', value);
                              setUserFamilyMedicalHistory(value);
                            } }
                          >
                            <div className="self-stretch flex flex-row items-center justify-start gap-[40px] ">
                            <Radio
                              size="sm"
                              // text size sm, md, lg
                              labelClassName="pl-2 text-md "
                              
                              name="familyMedicalHistory"
                              label="예"
                              value="Y"

                              { ...userFamilyMedicalHistory == 'Y' ? { checked: true } : {} }

                              onChange={
                                (e) => {
                                  setUserFamilyMedicalHistory('Y');
                                }
                              }
                            />
                            <Radio
                              size="sm"
                              labelClassName="pl-2 text-md "
                              name="familyMedicalHistory"
                              label="아니오"
                              value="N"

                              { ...userFamilyMedicalHistory == 'N' ? { checked: true } : {} }

                              onChange={
                                (e) => {
                                  setUserFamilyMedicalHistory('N');
                                }
                              }
                            />
                            </div>
                          </RadioGroup>
                        )}
                      />


                    </div>



                    <div className="self-stretch flex flex-col items-center justify-center gap-[20px] text-base text-gray-400">



                      <Button
                        
                        isLoading={isRegistering}

                        className={`w-full mt-8  rounded-full text-white font-extrabold text-base bg-dark hover:bg-dark-100`}
                        type="submit"
                        //size={isMedium ? 'lg' : 'xl'}
                        size="lg"



                        onClick={
                          () => {

                            userMobile == ""
                            || userNickname == ""
                            || userGender == ""


                            //|| userWeight == 0
                            //|| userHeight == 0
                            
                            //|| userPurpose == ""

                            //|| userPurpose == '기타(직접입력)' && userDefinedPurpose == ""

                            //|| userMedicalHistory == ""
                            //|| userFamilyMedicalHistory == ""

                            ?

                            toast.error(
                              '필수 입력값을 모두 입력해주세요.',
                              {
                                //position: 'top-right',
                              }
                            ) :
                            ////updateUser();
                            //onSubmit(getValues());

                            registerUser(

                              getValues().email,
                              getValues().password,
                              getValues().isAgreedTerms ? 'Y' : 'N',
                              getValues().isAgreedPrivacy ? 'Y' : 'N',
                              getValues().isAgreedMarketing ? 'Y' : 'N',


                              /*
                                  userName: string,
                                  userNickname: string,
                                  userMobile: string,
                                  userBirthDate: string,
                                  userPurpose: string,
                                  userMedicalHistory: string,
                                  userFamilyMedicalHistory: string,
                                  userAvatar: string,
                                  userGender: string,
                                  userWeight: number,
                                  userHeight: number,
                                  */


                              userName,
                              userNickname,
                              userMobile,
                              `${userBirthDateYear}-${userBirthDateMonth}-${userBirthDateDay}`,
                              userPurpose,
                              userMedicalHistory,
                              userFamilyMedicalHistory,
                              userAvatar,
                              userGender,
                              userWeight,
                              userHeight,

                              stabilityId,


                            
                            );

                          }
                        }

                      >
                        완료하기
                      </Button>
                      


              </div>



                  </div>
                </div>
              </div>
              </div>

            )}
          
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
}

