'use client';


import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Profile from "@/components-figma/profile";
import InputBox from "@/components-figma/input-box";

//import SelectBox from "@/components-figma/select-box";

import ContainerNoPrescriptionOrDisea from "@/components-figma/container-no-prescription-or-disea";
import BtnBigOn from "@/components-figma/btn-big-on";
import Footer from "@/components-figma/footer";



import { Button } from '@/components/ui/button';




import { useEffect, useState } from "react";
import Link from "next/link";
import _, { set, update } from "lodash";

import { Input } from '@/components/ui/input';


import { DatePicker } from '@/components/ui/datepicker';


import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';

import Uploader from '@/components/doingdoit/upload/uploader';

import Image from "next/image";
import { __next_app__ } from "next/dist/build/templates/app-page";


import { Form } from '@/components/ui/form';

import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';


import { SignUpSchema, signUpSchema } from '@/utils/validators/doingdoit/signup.schema';



import { on } from "events";

import SelectBox from "@/components/ui/select";
import { u } from "uploadthing/dist/types-e8f81bbc";
import toast from "react-hot-toast";




export default function ProfileEditPage({ params }: any) {

  const { _id } = params;

  console.log('ProfileEditPage _id: ', _id);



  
  const [user, setUser] = useState(null) as any;




  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userEmail, setUserEmail] = useState('');
  const [regType, setRegType] = useState('이메일');

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


  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  

  console.log('ProfileEditPage userNickname: ', userNickname);
  console.log('ProfileEditPage userMobile: ', userMobile);


  useEffect(() => {
    setUserBirthDate(`${userBirthDateYear}-${userBirthDateMonth}-${userBirthDateDay}`);
  }, [userBirthDateYear, userBirthDateMonth, userBirthDateDay]);


  useEffect(() => {

    const getUser = async () => {
      setLoading(true);
      try {
        //setUser(null);
        setError(null);
        const res = await fetch(`/api/doingdoit/user/getUserById?_id=${_id}`);

        ////console.log('ProfileEditPage res: ', res);

        if (res.status === 200) {

          const json = await res?.json() as any;

          //console.log('ProfileEditPage user: ', json);
          
       
          setUserEmail(json?.data?.email);
          setRegType(json?.data?.regType);
          setUserName(json?.data?.name);
          setUserNickname(json?.data?.nickname);
          setUserMobile(json?.data?.mobile);
    

          if (json.data.avatar == 'undefined' || json.data.avatar == undefined) {
            
            //setUserAvatar("/usermain/images/avatar.svg");
            setUserAvatar("https://cryptoss.beauty/usermain/images/avatar.svg")

          } else {
            setUserAvatar(json.data.avatar);
          }

          setUserBirthDate(json.data.birthDate);

          //setUserBirthDateYear(new Date(json.data.birthDate).getFullYear());
          //setUserBirthDateMonth(new Date(json.data.birthDate).getMonth());
          //setUserBirthDateDay(new Date(json.data.birthDate).getDate());


          setUserGender(json.data.gender);
          setUserWeight(json.data.weight);
          setUserHeight(json.data.height);
          
          /// if userPurpose is not '다이어트' or '체중증가' or '영양보충' or '혈압관리' or '혈당관리' or '콜레스테롤관리' or '건강유지' or '챌린지참여'
          /// then set userDefinedPurpose to userPurpose and userPurpose to '기타(직접입력)'

          if (json.data?.purpose !== '다이어트' && json.data?.purpose !== '체중증가' && json.data?.purpose !== '영양보충' && json.data?.purpose !== '혈압관리' && json.data?.purpose !== '혈당관리' && json.data?.purpose !== '콜레스테롤관리' && json.data?.purpose !== '건강유지' && json.data?.purpose !== '챌린지참여') {
            setUserDefinedPurpose(json.data?.purpose);
            setUserPurpose('기타(직접입력)');
          } else {
            setUserPurpose(json.data?.purpose);
          }


          setUserMarketAgree(json.data.marketingAgree);
          setUserMedicalHistory(json.data.medicalHistory);
          setUserFamilyMedicalHistory(json.data.familyMedicalHistory);





          setUser(json.data);

        }
        else {
          
        }

      
      } catch (e) {
        ////setError(e);
      }
      setLoading(false);
    }

    getUser();

  }, [_id , ]);




  /* updateUser */
  const updateUser = async (

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


  ) => {


    setLoading(true);
    try {
      //setUser(null);
      setError(null);



      const res = await fetch(`/api/doingdoit/user/updateProfileById`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: _id,
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
          purpose: userPurpose,
          medicalHistory: userMedicalHistory,
          familyMedicalHistory: userFamilyMedicalHistory,

        }),
      });



      /*
      const res = await fetch(`/api/doingdoit/user/updateUserById?_id=${_id}`
      + `&_name=${userName}&_nickname=${userNickname}&_birthDate=${userBirthDate}&_gender=${userGender}`
      + `&_avatar=${userAvatar}`
      + `&_weight=${userWeight}&_height=${userHeight}&_purpose=${userPurpose}`
      + `&_medicalHistory=${userMedicalHistory}&_familyMedicalHistory=${userFamilyMedicalHistory}`
      );
      

      console.log('ProfileEditPage res: ', res);
      */
  
  

    
    } catch (e) {
      ///setError(e);
    }
    setLoading(false);

 

    ////////window.location.href = '/usermain/survey';


    ////////window.location.href = '/usermain/user/survey';



  }


  /* updateAvatar */
  const updateAvatar = async (url: string) => {
    try {
      //setUser(null);
      setError(null);
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
  

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {

 

    console.log("onSubmit========",data);


 
    setUserBirthDate(`${userBirthDateYear}-${userBirthDateMonth}-${userBirthDateDay}`);

    // if userPurpose is '기타(직접입력)' then set userPurposeValue to userDefinedPurpose
    // else set userPurposeValue to userPurpose

    const userPurposeValue = userPurpose == '기타(직접입력)' ? userDefinedPurpose : userPurpose;

    

    
    updateUser(
      data?.name || userName,
      data?.nickname || userNickname,
      data?.mobile || userMobile,
      
      ///data?.birthDate || userBirthDate,

      userBirthDate,



      //data?.purpose || userPurpose,
      userPurposeValue,

      data?.medicalHistory || userMedicalHistory,
      data?.familyMedicalHistory || userFamilyMedicalHistory,
      data?.avatar || userAvatar,
      data?.gender || userGender,
      
      data?.weight || userWeight,

      data?.height || userHeight,
    );

      
      
    
  
    
    ////setReset({ ...initialValues, isAgreed: false });

    /////registerUser();

  };



  console.log('userNickname: ', userNickname);
  console.log('userMobile: ', userMobile);
  console.log('userGender: ', userGender);
  console.log('userWeight: ', userWeight);
  console.log('userHeight: ', userHeight);
  console.log('userPurpose: ', userPurpose);
  console.log('userMedicalHistory: ', userMedicalHistory);
  console.log('userFamilyMedicalHistory: ', userFamilyMedicalHistory);




  return (


    <Form<SignUpSchema>
      validationSchema={signUpSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        //defaultValues: initialValues,

        defaultValues: {
       

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

              <div className="self-stretch xl:bg-background flex flex-col items-center justify-start py-10 px-0">


            {/* loading animaiton */}

            { loading ? (

              <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
                  
                  <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

                  </div>
                </div>

              ) : (


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


                            {/*
                            <Image
                              src={userAvatar || '/usermain/images/avatar.svg'}
                              alt="user avatar"
                              width={150}
                              height={150}
                              className="relative w-28 h-28 rounded-full"
                              style = {{ objectFit: 'cover' }}
                  
                              placeholder="blur"
                              blurDataURL="https://cryptoss.beauty/usermain/images/avatar.svg"
                            />
                            */}
                          </div>

                          <div className="col-start-1 row-start-1  ">
                            <div className="absolute 
                              
                           
                            ">
                            <Uploader
                              onSave={(url: string) => {

                                updateAvatar(url);

                                setValue('avatar', url);


                              }}
                            />
                            </div>
                          </div>
                        </div>



                  


                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">

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
                              //showMonthYearPicker


                              // day picker

                              //selected={
                              //  new Date(value
                              //  ? value : userBirthDateYear, userBirthDateMonth)
                              //}

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


                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
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
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
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

                            {/*
                            <Input
                              type="text"
                              size="lg"
                              ///label="키"
                              placeholder="키"
                              //className="[&>label>span]:font-medium"
                              className="w-full"
                              value={userHeight}
                              onChange={(e) => setUserHeight(parseInt(e.target.value))}
                            />
                            */}
                            
                            <div className="relative">cm</div>
                          </div>
                        </div>
                        
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
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

                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
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

                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
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
                            className={`w-full mt-8  rounded-full text-white font-extrabold text-base bg-dark hover:bg-dark-100`}
                            type="submit"
                            //size={isMedium ? 'lg' : 'xl'}
                            size="lg"



                            onClick={
                              () => {

                                userMobile == ""
                                || userNickname == ""
                                || userGender == ""
                                || userWeight == 0
                                || userHeight == 0
                                
                                || userPurpose == ""
  
                                || userPurpose == '기타(직접입력)' && userDefinedPurpose == ""
  
                                || userMedicalHistory == ""
                                || userFamilyMedicalHistory == "" ?

                                toast.error(
                                  '필수 입력값을 모두 입력해주세요.',
                                  {
                                    //position: 'top-right',
                                  }
                                ) :
                                ////updateUser();
                                onSubmit(getValues());

                              }
                            }

                          >
                            다음
                          </Button>
                          


                  </div>



                      </div>
                    </div>
                  </div>
                </div>

              )}


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
  );


}




