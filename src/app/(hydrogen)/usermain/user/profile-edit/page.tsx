'use client';


import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Profile from "@/components-figma/profile";
import InputBox from "@/components-figma/input-box";
import SelectBox from "@/components-figma/select-box";
import ContainerNoPrescriptionOrDisea from "@/components-figma/container-no-prescription-or-disea";
import BtnBigOn from "@/components-figma/btn-big-on";
import Footer from "@/components-figma/footer";


import { useEffect, useState } from "react";
import Link from "next/link";
import { set, update } from "lodash";

import { Input } from '@/components/ui/input';


import { DatePicker } from '@/components/ui/datepicker';


import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';

import Uploader from '@/components/doingdoit/upload/uploader';

import Image from "next/image";


import { useSession, signOut } from 'next-auth/react';

import { useAnimation, motion } from "framer-motion";



export default function ProfileEditPage() {



  const { data: session, status } = useSession();

  



  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userEmail, setUserEmail] = useState('');

  const [regType, setRegType] = useState('');

  const [userName, setUserName] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  
  const [userBirthDate, setUserBirthDate] = useState('');
  
  const [userGender, setUserGender] = useState('여성');

  const [userWeight, setUserWeight] = useState( 0 ); // number
  const [userHeight, setUserHeight] = useState( 0 ); // number
  const [userPurpose, setUserPurpose] = useState('');
  const [userMarketingAgree, setUserMarketAgree] = useState('Y');


  const [userBirthDateYear, setUserBirthDateYear] = useState(2000);
  const [userBirthDateMonth, setUserBirthDateMonth] = useState(1);
  const [userBirthDateDay, setUserBirthDateDay] = useState(1);

  const [userMedicalHistory, setUserMedicalHistory] = useState('아니오');
  const [userFamilyMedicalHistory, setUserFamilyMedicalHistory] = useState('아니오');


  useEffect(() => {
    setUserBirthDate(`${userBirthDateYear}-${userBirthDateMonth}-${userBirthDateDay}`);
  }, [userBirthDateYear, userBirthDateMonth, userBirthDateDay]);




  const [user, setUser] = useState([]);

  useEffect(() => {

    const getUser = async () => {

      if (!session?.user?.email) {
        return;
      }

      setLoading(true);

      try {
        //setUser(null);
        setError(null);
        const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);

        const json = await res?.json() as any;


        setUser(json?.data);


       


      
      } catch (e) {
        ////setError(e);
      }
      setLoading(false);
    }

    getUser();

  }, [ session?.user?.email ]);




  useEffect(() => {

    //console.log('ProfileEditPage session?.user?.email: ', session?.user?.email);

    setUserEmail(session?.user?.email || '');


    ///setRegType
    // set 구글로그인, set 페이스북로그인, set 카카오로그인, set 애플로그인
    
    if (session?.user?.email?.includes('gmail.com')) {
      setRegType('구글로그인');
    } else if (session?.user?.email?.includes('facebook')) {
      setRegType('페이스북로그인');
    } else if (session?.user?.email?.includes('kakao')) {
      setRegType('카카오로그인');
    } else if (session?.user?.email?.includes('apple')) {
      setRegType('애플로그인');
    } else {
      setRegType('이메일로그인');
    }
    

  }, [ session?.user?.email ]);



  
  if (status === 'loading') {
    return <p>Loading...</p>;
  }




  /* updateUser */
  const updateUser = async () => {
    setLoading(true);
    try {
      //setUser(null);
      setError(null);
      const res = await fetch(
        `/api/doingdoit/user/updateUserByEmail?_email=${session?.user?.email}`
        + `&_name=${userName}&_nickname=${userNickname}&_birthDate=${userBirthDate}&_gender=${userGender}&_regType=${regType}`
        + `&_avatar=${userAvatar}`
        + `&_weight=${userWeight}&_height=${userHeight}&_purpose=${userPurpose}`
        + `&_marketingAgree=${userMarketingAgree}`
        + `&_medicalHistory=${userMedicalHistory}&_familyMedicalHistory=${userFamilyMedicalHistory}`
      );

      //console.log('ProfileEditPage res: ', res);

      

    
    } catch (e) {
      ///setError(e);
    }
    setLoading(false);

    window.location.href = '/';
  }


  /* updateAvatar */
  const updateAvatar = async (url: string) => {
    try {
      //setUser(null);
      setError(null);
      const res = await fetch(`/api/doingdoit/user/updateAvatarByEmail?_email=${session?.user?.email}`
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

        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">





      {/* loading animaiton */}

      { loading ? (

        <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
            
            <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

            </div>
          </div>

        ) : (


          <div className="  xl:w-[1000px] flex flex-col items-center justify-start">


            <div className="self-stretch bg-white flex flex-col items-center justify-end  p-5 xl:p-[50px] gap-[40px]">


              <div
                className="self-stretch flex flex-row items-center justify-center pb-5 gap-[12px] z-[0] text-left text-sm text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
              >

                회원가입


                <Image
                  width="24"
                  height="24"
                  className="relative w-6 h-6 overflow-hidden shrink-0 hidden"
                  alt=""
                  src="/usermain/images/x1.svg"
                />
              </div>


              { userNickname == '' && (
                <>

                  <div className="self-stretch relative text-lg fong-bold">
                    {userEmail}님 환영합니다.
                  </div>
                  
                  <div className="self-stretch relative font-extrabold">
                    프로필을 완성해 주세요.
                  </div>
                </>
                
              ) }




              <div className=" w-80  xl:w-[400px] flex flex-col items-start justify-center text-left text-sm">
                <div className="self-stretch flex flex-col items-center justify-start gap-[32px]">
                  
                  {/*
                  <Profile profileIconPosition="relative" />
                  */}

                  {/* Uploader button overlap to avatar */} 
                  <div className="grid ">
                    <div className="col-start-1 row-start-1">
                      <Image
                        src={userAvatar || '/usermain/images/avatar.svg'}
                        alt="user avatar"
                        width={150}
                        height={150}
                        className="relative w-32 h-32 rounded-full"
                        style = {{ objectFit: 'cover' }}

                        /* loading animation */
                        placeholder="blur"
                        blurDataURL="https://cryptoss.beauty/usermain/images/avatar.svg"
                      />
                    </div>

                    <div className="col-start-1 row-start-1  ">
                      <div className="absolute ">
                      <Uploader
                        onSave={(url: string) => {
                          updateAvatar(url);
                        }}
                      />
                      </div>
                    </div>
                  </div>



                {/* email */}

                  <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                    <div className="self-stretch relative font-extrabold">
                      <span>이메일</span>
                      <span className="text-red">*</span>
                    </div>

                    <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                      <div className="relative">{userEmail}</div>
                      <div className="relative">{regType}</div>
                      
                      {regType === '구글로그인' && (
                        <Image
                          width="24"
                          height="24"
                          className="relative w-6 h-6 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/google.svg"
                        />
                      )}
                      {regType === '페이스북로그인' && (
                        <Image
                          width="24"
                          height="24"
                          className="relative w-6 h-6 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/facebook.svg"
                        />
                      )}


                      {/* singout */}
                      <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                        <button
                          type="button"
                          onClick={() => {
                            signOut();
                          }}
                        >
                          <div className="relative">로그아웃</div>
                        </button>
                      </div>


                    </div>

                  </div>


                  <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                    <div className="self-stretch relative font-extrabold">
                      <span>닉네임</span>
                      <span className="text-red">*</span>
                    </div>
                    {/*
                    <InputBox
                      prop="10자이내 영문,한글"
                      inputBoxWidth="unset"
                      inputBoxAlignSelf="stretch"
                      //inputBoxFlexShrink="0"
                      //inputBoxFlex="unset"
                      //divColor="#999"
                      //divTextAlign="left"
                    />
                    */}

                    <Input
                      type="text"
                      size="lg"
                      //label="닉네임"
                      placeholder="10자이내 영문,한글"
                      className="[&>label>span]:font-medium"
                      value={userNickname}
                      onChange={(e) => setUserNickname(e.target.value)}
                    />

                  </div>


                  <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                    <div className="self-stretch relative font-extrabold">
                      <span>생년월일</span>
                      <span className="text-red">*</span>
                    </div>
                    <div className="self-stretch flex flex-row items-center justify-center gap-[8px]">

                      {/*
                      <SelectBox
                        prop="년도"
                        selectBoxWidth="unset"
                        selectBoxFlex="1"
                        selectBoxAlignSelf="unset"
                      />
                      <SelectBox
                        prop="월"
                        selectBoxWidth="unset"
                        selectBoxFlex="1"
                        selectBoxAlignSelf="unset"
                      />
                      <SelectBox
                        prop="일"
                        selectBoxWidth="unset"
                        selectBoxFlex="1"
                        selectBoxAlignSelf="unset"
                      />
                      */}


                      {/* 년도, 월, 일 선택 */}
                      <DatePicker
                        showYearPicker
                        selected={new Date( userBirthDateYear)}
                        onChange={(date: any) => {
                          console.log('ProfileEditPage date: ', date);

                          setUserBirthDateYear(date.getFullYear());

                        }}
                        dateFormat="yyyy"
                        placeholderText="년도"
                        //className="w-full"
                      />

                      <DatePicker
                        showMonthYearPicker
                        selected={new Date(userBirthDateYear, userBirthDateMonth)}
                        onChange={(date: any) => {
                          console.log('ProfileEditPage date: ', date);

                          setUserBirthDateMonth(date.getMonth());

                        }}
                        dateFormat="MM"
                        placeholderText="월"
                        //className="w-full"
                      />

                      <DatePicker
                        showMonthYearPicker
                        selected={new Date(userBirthDateYear, userBirthDateMonth, userBirthDateDay)}
                        onChange={(date: any) => {
                          console.log('ProfileEditPage date: ', date);

                          setUserBirthDateDay(date.getDate());

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
                    

                    {/* 성별 선택 */}
                    <RadioGroup
                        
                        value={userGender}
                        //setValue={setValue}
    
                        setValue={(value) => {
                          //setValue(value);
                          ///console.log('value', value);
                          setUserGender(value);
                        } }
                    >
                      <div className="self-stretch flex flex-row items-center justify-start gap-[40px]">
                      <Radio
                        size="sm"
                        // text size sm, md, lg
                        labelClassName="pl-2 text-md "
                        
                        name="gender"
                        label="여성"
                        value="여성"
                      />
                      <Radio
                        size="sm"
                        labelClassName="pl-2 text-md "
                        name="gender"
                        label="남성"
                        value="남성"
                      />
                      </div>
                    </RadioGroup>


                  </div>


                  <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                    <div className="self-stretch relative font-extrabold">
                      <span>몸무게</span>
                      <span className="text-red">*</span>
                    </div>
                    <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                      {/*
                      <InputBox
                        prop="0"
                        inputBoxWidth="unset"
                        inputBoxAlignSelf="unset"
                        //inputBoxFlexShrink="unset"
                        //inputBoxFlex="1"
                        //divColor="#999"
                        //divTextAlign="right"
                      />
                      */}

                      <Input
                        type="text"
                        size="lg"
                        ///label="몸무게"
                        placeholder="몸무게"
                        className="[&>label>span]:font-medium"
                        value={userWeight}
                        onChange={(e) => setUserWeight(parseInt(e.target.value))}
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
                      {/*
                      <InputBox
                        prop="0"
                        inputBoxWidth="unset"
                        inputBoxAlignSelf="unset"
                        //inputBoxFlexShrink="unset"
                        //inputBoxFlex="1"
                        //divColor="#999"
                        ///divTextAlign="right"
                      />
                      */}
                      <Input
                        type="text"
                        size="lg"
                        ///label="키"
                        placeholder="키"
                        className="[&>label>span]:font-medium"
                        value={userHeight}
                        onChange={(e) => setUserHeight(parseInt(e.target.value))}
                      />
                      
                      <div className="relative">cm</div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                    <div className="self-stretch relative font-extrabold">
                      <span>식단기록목적</span>
                      <span className="text-red">*</span>
                    </div>
                    <SelectBox
                      prop="선택하세요"
                      selectBoxWidth="unset"
                      selectBoxFlex="unset"
                      selectBoxAlignSelf="stretch"
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
                    <RadioGroup
                        value={userMedicalHistory}
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
                        value="예"
                      />
                      <Radio
                        size="sm"
                        labelClassName="pl-2 text-md "
                        name="medicalHistory"
                        label="아니오"
                        value="아니오"
                      />
                      </div>
                    </RadioGroup>

                  </div>
                  
                  {/*
                  <ContainerNoPrescriptionOrDisea medicalHistoryQuestion="부모, 형제, 자매 중 다음의 질환을 앓았거나 해당 질환으로 사망한 경우가 있나요?(뇌졸중, 심근경색, 고혈압, 당뇨병, 암)" />
                  */}

                  {/* 가족 질병 선택 */  }

                  <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                    <div className="self-stretch relative font-extrabold">
                      <span>부모, 형제, 자매 중 다음의 질환을 앓았거나 해당 질환으로 사망한 경우가 있나요?(뇌졸중, 심근경색, 고혈압, 당뇨병, 암)</span>
                      <span className="text-red">*</span>
                    </div>
                  
                    {/* 질병 선택 */  }
                    <RadioGroup
                        value={userFamilyMedicalHistory}
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
                        value="예"
                      />
                      <Radio
                        size="sm"
                        labelClassName="pl-2 text-md "
                        name="familyMedicalHistory"
                        label="아니오"
                        value="아니오"
                      />
                      </div>
                    </RadioGroup>
                  </div>



                  <button
                    onClick={
                      () => {
                        console.log('ProfileEditPage user: ', user);

                        updateUser();
                      }
                    }
                    className="mt-10 self-stretch flex flex-row items-center justify-center gap-[8px] rounded-[100px] bg-dark text-white font-bold text-lg py-[16px] px-[40px] hover:bg-dark-2 transition duration-200"
                  >
                    {/*
                    <BtnBigOn
                      prop="확인"
                      btnBigOnWidth="unset"
                      btnBigOnBorderRadius="100px"
                      btnBigOnAlignSelf="stretch"
                      
                      //btnBigOnBackgroundColor="#ccc"

                      btnBigOnBackgroundColor="#212121"
                      
                      ///btnBigOnHeight="56px"
                    />
                    */}
                    확인





                  </button>


            


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
};


