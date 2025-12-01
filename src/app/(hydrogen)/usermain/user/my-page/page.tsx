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
import { update } from "lodash";

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';


import { DatePicker } from '@/components/ui/datepicker';


import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';

import Uploader from '@/components/doingdoit/upload/uploader';

import Image from "next/image";


import { useSession, signOut } from 'next-auth/react';


import ProfileForm from "@/components-figma/profile-form";
import ProfileHeader from "@/app/shared-doingdoit/profile/profile-header";




export default function ProfileEditPage() {



  const { data: session, status } = useSession();

  
  const [user, setUser] = useState(null) as any;




  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userEmail, setUserEmail] = useState('');
  const [regType, setRegType] = useState('이메일');

  const [userName, setUserName] = useState('');
  const [userNickname, setUserNickname] = useState('닉네임');
  const [userAvatar, setUserAvatar] = useState('');
  
  const [userBirthDate, setUserBirthDate] = useState('생일');
  
  const [userGender, setUserGender] = useState('여성');

  const [userWeight, setUserWeight] = useState( 0 ); // number
  const [userHeight, setUserHeight] = useState( 0 ); // number
  const [userPurpose, setUserPurpose] = useState('다이어트');
  const [userMarketingAgree, setUserMarketAgree] = useState('Y');


  const [userBirthDateYear, setUserBirthDateYear] = useState(2000);
  const [userBirthDateMonth, setUserBirthDateMonth] = useState(1);
  const [userBirthDateDay, setUserBirthDateDay] = useState(1);

  const [userMedicalHistory, setUserMedicalHistory] = useState('아니오');
  const [userFamilyMedicalHistory, setUserFamilyMedicalHistory] = useState('아니오');


  useEffect(() => {
    setUserBirthDate(`${userBirthDateYear}-${userBirthDateMonth}-${userBirthDateDay}`);
  }, [userBirthDateYear, userBirthDateMonth, userBirthDateDay]);



  /////console.log('===ProfileEditPage session: ', session);



  
  useEffect(() => {

    const getUser = async () => {
      setLoading(true);
      try {
        //setUser(null);
        setError(null);
        const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);

        
        ///console.log('ProfileEditPage res: ', res);



        if (res.status === 200) {

          const json = await res?.json() as any;

          ///console.log('ProfileEditPage user: ', json);
          
       
          setUserEmail(json.data.email);
          setRegType(json.data.regType);
          setUserName(json.data.name);
          setUserNickname(json.data.nickname);


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
          setUserPurpose(json.data.purpose);
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

  }, [ session?.user?.email ]);



  
  if (status === 'loading') {
    return <p>Loading...</p>;
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
  

  if (session === null) {
    
    window.location.href = '/usermain/user/login';

    return (
      <div>
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }



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

        <div className="self-stretch xl:bg-background flex flex-col items-center justify-start xl:py-10">


      {/* loading animaiton */}

      { false ? (

        <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[10px] xl:gap-[20px] z-[1] text-left text-dark">
            
            <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

            </div>
          </div>

        ) : (


          <div className="min-h-screen w-full xl:w-[1000px] flex flex-col items-center justify-start">
            <div className="self-stretch bg-white flex flex-col items-center justify-end  p-5 xl:p-[100px] gap-[20px] xl:gap-[40px]">
       

              {/* Uploader button overlap to avatar */} 
              {/* Uploader button located left top of avatar */}
              
              <div className="relative flex flex-col items-center justify-center gap-2">
 
                
                  <Image
                    src={userAvatar || '/usermain/images/avatar.svg'}
                    alt="user avatar"
                    width={150}
                    height={150}
                    className="relative  w-24 h-24 rounded-full"
                    style = {{ objectFit: 'cover' }}
                  />
                

               
                <div className="absolute bottom-0 right-0  w-6 h-6 rounded-full  flex flex-col items-center justify-center">
                 
                
                  
                    <Uploader
                      onSave={(url: string) => {
                        updateAvatar(url);
                      }}
                    />
                
                </div>
                
              </div>

              
              <div className="flex flex-col gap-2">

                
                {/* 사이트ID */}
                {/*
                <div className="text-sm text-gray-500 text-center">
                  상점 ID: {user?.stabilityId || '없음'}
                </div>
                */}
                {/* 나의 판매용 지갑 주소 */}
                <div className="flex flex-row items-center justify-center gap-2 text-sm text-gray-500 text-center">
                  <Image
                    src="/usermain/images/icon-shield.png"
                    alt="wallet"
                    width={16}
                    height={16}
                    className="relative w-4 h-4 rounded-full"
                    style = {{ objectFit: 'cover' }}
                  />
                  <span className="font-bold">
                    {user?.sellerWalletAddress
                      ? `나의 판매용 지갑 주소: ${user?.sellerWalletAddress?.slice(0, 6)}...${user?.sellerWalletAddress?.slice(-4)}`
                      :  '나의 판매용 지갑 주소가 설정되지 않았습니다.'}
                  </span>
                  {/* copy button */}
                  {user?.sellerWalletAddress && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(user?.sellerWalletAddress);
                      }}
                      className="ml-2 text-blue-500 underline"
                    >
                      복사
                    </button>
                  )}
                </div>

                {/* nickname */}
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className=" text-xl font-extrabold">
                    {userNickname}
                  </div>
                  {/* icon-kyc */}
                  <Image
                    src="/usermain/images/icon-kyc.png"
                    alt="kyc"
                    width={50}
                    height={50}
                  />
                  {/* KYC 인증 완료 텍스트 */}
                  <div className="text-sm text-green-500 font-bold">
                    KYC 인증 완료
                  </div>
                </div>

                {/* email */}
                <div className="text-base font-extrabold">
                  {userEmail}
                </div>

                {/* regType */}
                <div className="mt-2 text-sm ">
                {

                  regType == 'email' ? (
                    <div className="flex flex-row items-center justify-center gap-2">
                      이메일로 가입
                    </div>
                  ) : regType == 'kakao' ? (
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Image
                        src="/usermain/images/kakao.svg"
                        alt="kakao"
                        width={20}
                        height={20}
                        className="relative w-4 h-4 rounded-full"
                        style = {{ objectFit: 'cover' }}
                      />
                      카카오로 가입
                    </div>
                  ) : regType == 'naver' ? (
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Image
                        src="/usermain/images/naver.svg"
                        alt="naver"
                        width={20}
                        height={20}
                        className="relative w-4 h-4 rounded-full"
                        style = {{ objectFit: 'cover' }}
                      />
                      네이버로 가입
                    </div>
                  ) : regType == 'google' ? (
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Image
                        src="/usermain/images/google.svg"
                        alt="google"
                        width={20}
                        height={20}
                        className="relative w-4 h-4 rounded-full"
                        style = {{ objectFit: 'cover' }}
                      />
                      구글로 가입
                    </div>
                  ) : (
                    <div className="flex flex-row items-center justify-center gap-2">
                      이메일로 가입
                    </div>
                  )

                }
                </div>


              </div>
                          
                        

              <ProfileForm />

              {/* 로그아웃 버튼 */}

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="self-stretch flex flex-col items-center justify-center gap-[20px] text-base text-gray-400"
              >
                <Button
                  className="w-full bg-dark mt-8  rounded-full text-white font-extrabold text-base h-14"
                  onClick={() => {
                    signOut(
                      {
                        callbackUrl: '/usermain/user/login'
                      }
                    );
                  } }
                >
                  로그아웃
                </Button>
              </motion.div>



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





    <div className=" block xl:hidden sticky bottom-0 z-50  ">


<div className="self-stretch bg-white shadow-[0px_0px_20px_rgba(0,_0,_0,_0.1)] flex flex-col items-center justify-center text-center text-3xs text-grey-9 font-noto-sans-kr">
  
  <div className="self-stretch flex flex-row flex-wrap items-center justify-between ml-5 mr-5">

    

    {/*
    <Link 
        href={'/'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/homefill.svg"
      />
      <b className="relative">홈</b>
    </Link>
    */}

    <Link 
        href={'/'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/homeline.svg"
      />
      <b className="relative">홈</b>
    </Link>


      {/*
    <div className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark">
      <input
        className="m-0 w-6 h-6 relative overflow-hidden shrink-0"
        type="checkbox"
      />
      <b className="relative">홈</b>
    </div>
        */}


    {/*
    <Link
        href={'/usermain/feeds'}
        className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/newspaperline.svg"
      />
      <div className="relative">구매주문</div>
    </Link>
    */}


    <Link 
        href={'/usermain/feeds'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/newspaperline.svg"
      />
      <b className="relative">구매주문</b>
    </Link>



{/*    <Link 
        href={'/usermain/feeds/statistics'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]    ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/piechart2line.svg"
      />
      <b className="relative">통계</b>
    </Link> */}

    
    {/*
    <Link
        href={'/usermain/feeds/statistics'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/piechart2line.svg"
      />
      <div className="relative">통계</div>
    </Link>
    
    <div className="h-[60px] w-[48.8px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        alt=""
        src="/piechart2fill.svg"
      />
      <b className="relative">통계</b>
    </div>
    */}



    <Link 
        href={'/usermain/boards'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/message2line.svg"
      />
      <b className="relative">게시판</b>
    </Link>
    {/*
    <Link
        href={'/usermain/boards'}
        className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/message2line.svg"
      />
      <div className="relative">게시판</div>
    </Link>


    <div className="h-[60px] w-[55.7px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        alt=""
        src="/message2fill.svg"
      />
      <b className="relative">게시판</b>
    </div>
    */}


    {/*
    <Link 
        href={'/usermain/survey/result'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/questionanswerline.svg"
      />
      <b className="relative">설문</b>
    </Link>
    */}
    
    {/*
    <Link
        href={'/usermain/surveys'}
        className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/questionanswerline.svg"
      />
      <div className="relative">설문</div>
    </Link>
    <div className="h-[60px] w-[65px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        alt=""
        src="/questionanswerfill.svg"
      />
      <b className="relative">설문</b>
    </div>
    */}


    <Link 
        href={'/usermain/user/my-page'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/usersettingsfill.svg"
      />
      <b className="relative">마이</b>
    </Link>

    {/*
    <Link
        href={'/usermain/user/my-page'}
        className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/usersettingsline.svg"
      />
      <div className="relative">마이</div>
    </Link>
    <div className="h-[60px] w-[55.7px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        alt=""
        src="/usersettingsfill.svg"
      />
      <b className="relative">마이</b>
    </div>
    */}


  </div>

</div>

  </div>




    </>
  );
};


