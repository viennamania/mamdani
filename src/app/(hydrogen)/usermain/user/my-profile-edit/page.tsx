'use client';


import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";



////import SelectBox from "@/components-figma/select-box";


import ContainerNoPrescriptionOrDisea from "@/components-figma/container-no-prescription-or-disea";
import BtnBigOn from "@/components-figma/btn-big-on";
import Footer from "@/components-figma/footer";


import { useEffect, useState } from "react";
import Link from "next/link";
import { set, update } from "lodash";

import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';

import { DatePicker } from '@/components/ui/datepicker';


import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';

import Uploader from '@/components/doingdoit/upload/uploader';

import Image from "next/image";

import SelectBox from "@/components/ui/select";




import { useSession, signOut } from 'next-auth/react';

import { useAnimation, motion, m } from "framer-motion";

import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';

import { Form } from '@/components/ui/form';


import { zodResolver } from '@hookform/resolvers/zod';

import toast from 'react-hot-toast';

import { Text } from '@/components/ui/text';

import { Button } from '@/components/ui/button';


/*
import {
  defaultValues,
  profileFormSchema,
  ProfileFormTypes,
} from '@/utils/validators/doingdoit/create-profile.schema';
*/


import { SignUpSchema, signUpSchema } from '@/utils/validators/doingdoit/signup.schema';
import { publicDecrypt } from "crypto";

import { client } from "../../../client";
import {
  getContract,
  sendAndConfirmTransaction,
  sendTransaction,
  waitForReceipt,
  sendBatchTransaction,
} from "thirdweb";

import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useWalletBalance,

  useSetActiveWallet,

  useConnectedWallets,


} from "thirdweb/react";

import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";

import {
  ethereum,
  polygon,
  arbitrum,
  bsc,
} from "thirdweb/chains";



const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "email",
        "x",
        "passkey",
        "phone",
        "facebook",
        "line",
        "apple",
        "coinbase",
      ],
    },
  }),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("io.metamask"),
  createWallet("com.bitget.web3"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),

];





export default function ProfileEditPage() {

  const { data: session, status } = useSession();


  const activeWallet = useActiveWallet();

  const activeAccount = useActiveAccount();

  const address = activeAccount?.address;
  console.log('ProfileEditPage address: ', address);

  // if address is changed, then update user wallet address in database
  useEffect(() => {
    if (address) {
      // call api to update user wallet address
      // /api/doingdoit/user/updateWalletAddressByEmail
      const updateWalletAddress = async () => {
        try {
          // GET method
          const res = await fetch(`/api/doingdoit/user/updateWalletAddressByEmail?email=${session?.user?.email}&walletAddress=${address}`);

          if (!res.ok) {
            throw new Error('Failed to update wallet address');
          }
        } catch (error) {
          console.error('Error updating wallet address:', error);
        }
      };

      updateWalletAddress();
    }
  }, [address, session?.user?.email]);


  
  const [user, setUser] = useState(null) as any;




  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userEmail, setUserEmail] = useState('');
  const [regType, setRegType] = useState('');

  const [userName, setUserName] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [userMobile, setUserMobile] = useState('');
  
  const [userBirthDate, setUserBirthDate] = useState('');
  
  const [userGender, setUserGender] = useState('');

  const [userWeight, setUserWeight] = useState( 0 ); // number
  const [userHeight, setUserHeight] = useState( 0 ); // number
  const [userPurpose, setUserPurpose] = useState('');
  const [userDefinedPurpose, setUserDefinedPurpose] = useState('');
  const [userMarketingAgree, setUserMarketAgree] = useState('');

 
  const [userIsAgreedTerms, setUserIsAgreedTerms] = useState('');
  const [userIsAgreedPrivacy, setUserIsAgreedPrivacy] = useState('');
  const [userIsAgreedMarketing, setUserIsAgreedMarketing] = useState('');


  const [userBirthDateYear, setUserBirthDateYear] = useState(2000);
  const [userBirthDateMonth, setUserBirthDateMonth] = useState(0);
  const [userBirthDateDay, setUserBirthDateDay] = useState(1);

  const [userMedicalHistory, setUserMedicalHistory] = useState('');
  const [userFamilyMedicalHistory, setUserFamilyMedicalHistory] = useState('');


  // 계좌번호
  const [sellerAccountNumber, setSellerAccountNumber] = useState('');
  // 계좌 정보 관련 추가 필드
  // 계좌명
  const [sellerAccountName, setSellerAccountName] = useState('');
  // 은행명
  const [sellerBankName, setSellerBankName] = useState('');

  const [stabilityId, setStabilityId] = useState('');
  const [storecode, setStorecode] = useState('');
  const [sellerWalletAddress, setSellerWalletAddress] = useState('');


  useEffect(() => {
    
    setUserBirthDate(`${userBirthDateYear}-${userBirthDateMonth+1}-${userBirthDateDay}`);

  }, [userBirthDateYear, userBirthDateMonth, userBirthDateDay]);



  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");






  const [userData, setUserData] = useState(null) as any;



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

        ///console.log('ProfileEditPage res: ', res);

        if (res.status === 200) {

          const json = await res?.json() as any;


          ///console.log("profile data: ", json?.data);




          setUserData(json?.data);


       
          setUserEmail(json.data?.email);
          setRegType(json.data?.regType);
          setUserName(json.data?.name);
          setUserNickname(json.data?.nickname);
          setUserMobile(json.data?.mobile);

          setSellerAccountName(json.data?.sellerAccountName);
          setSellerBankName(json.data?.sellerBankName);
          setSellerAccountNumber(json.data?.sellerAccountNumber);


          setStabilityId(json.data?.stabilityId);
          setStorecode(json.data?.storecode);

          setSellerWalletAddress(json.data?.sellerWalletAddress);

          if (json.data?.avatar == 'undefined' || json.data?.avatar == undefined) {
            
            //setUserAvatar("/usermain/images/avatar.svg");
            setUserAvatar("https://cryptoss.beauty/usermain/images/avatar.svg")

          } else {
            setUserAvatar(json.data?.avatar);
          }



          console.log("profile data birthDate: ", json?.data?.birthDate);

         

          // check json.data?.birthDate is valid date
          // json.data?.birthDate is NaN
          // check  NaN is valid date
          // NaN is not valid date

          // son.data?.birthDate is format 'YYYY-MM-DD'
          // get year, month, day from json.data?.birthDate

          // 2022-08-01

          // check json.data?.birthDate is valid date
          // check isNaN(json.data?.birthDate) is valid date

          // check json.data?.birthDate is valid date

          try {


            console.log('json.data?.birthDate: ', json.data?.birthDate);

            // 1994-1-1
            // check json.data?.birthDate is valid date
            // if json.data?.birthDate is valid date then set userBirthDateYear, userBirthDateMonth, userBirthDateDay

            // if json.data?.birthDate is not valid date then set userBirthDateYear, userBirthDateMonth, userBirthDateDay to default value

            // check json.data?.birthDate is valid date



            /*
            const birthDate = new Date(
              json.data?.birthDate !== 'undefined' && json.data?.birthDate !== undefined && json.data?.birthDate !== 'NaN' ? json.data?.birthDate : '2000-01-01'
            );
            */
            
            // birthDate is "Invalid Date " at safari browser


            // convert 'YYYY-MM-DD' to Date object
            // const birthDate = new Date(json.data?.birthDate) is "Invalid Date" at safari browser
            // const birthDate = new Date(json.data?.birthDate) is "Invalid Date" at safari browser


            // console.log (new Date('2011-04-12'.replace(/-/g, "/")));

            const birthDate = new Date(
              json.data?.birthDate.replace(/-/g, "/")
            );






            console.log('birthDate: ', birthDate);


            

            const year = birthDate.getFullYear();
            const month = birthDate.getMonth();
            const day = birthDate.getDate();


            console.log('year: ', year);
            console.log('month: ', month);
            console.log('day: ', day);

            
            
            setUserBirthDateYear(year);
            setUserBirthDateMonth(month);
            setUserBirthDateDay(day);
            
          
          
          

          } catch (e) {
            console.log('birthDate error: ', e);

            setUserBirthDateYear(2000);
            setUserBirthDateMonth(0);
            setUserBirthDateDay(1);
          }

          /*
          
          if ( json.data?.birthDate &&  json.data?.birthDate !== 'undefined' && json.data?.birthDate !== undefined && json.data?.birthDate !== 'NaN') {

            setUserBirthDate(json.data?.birthDate);

            setUserBirthDateYear(new Date(json.data?.birthDate).getFullYear());

            setUserBirthDateMonth(new Date(json.data?.birthDate).getMonth());

            setUserBirthDateDay(new Date(json.data?.birthDate).getDate());

          } 
          */
        




          setUserGender(json.data?.gender);
          setUserWeight(json.data?.weight);
          setUserHeight(json.data?.height);

          /// if userPurpose is not '다이어트' or '체중증가' or '영양보충' or '혈압관리' or '혈당관리' or '콜레스테롤관리' or '건강유지' or '챌린지참여'
          /// then set userDefinedPurpose to userPurpose and userPurpose to '기타(직접입력)'

          if (json.data?.purpose !== '다이어트' && json.data?.purpose !== '체중증가' && json.data?.purpose !== '영양보충' && json.data?.purpose !== '혈압관리' && json.data?.purpose !== '혈당관리' && json.data?.purpose !== '콜레스테롤관리' && json.data?.purpose !== '건강유지' && json.data?.purpose !== '챌린지참여') {
            setUserDefinedPurpose(json.data?.purpose);
            setUserPurpose('기타(직접입력)');
          } else {
            setUserPurpose(json.data?.purpose);
          }
      
 


          setUserIsAgreedTerms(json.data?.isAgreedTerms);
          setUserIsAgreedPrivacy(json.data?.isAgreedPrivacy);
          setUserIsAgreedMarketing(json.data?.isAgreedMarketing);
          



          setUserMedicalHistory(json.data?.medicalHistory);
          setUserFamilyMedicalHistory(json.data?.familyMedicalHistory);



          ////setPassword(json.data?.password);


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



  //console.log('userBirthDateYear: ', userBirthDateYear);
  //console.log('userBirthDateMonth: ', userBirthDateMonth);
  //console.log('userBirthDateDay: ', userBirthDateDay);

  //console.log('userBirthDate: ', userBirthDate);
  
  console.log('userPurpose: ', userPurpose);
  console.log('userDefinedPurpose: ', userDefinedPurpose);



  
  if (status === 'loading') {
    return <p>Loading...</p>;
  }






  /* updateUser */
  const updateUser = async () => {


    console.log('updateUser password: ', password);
    console.log('updateUser userMedicalHistory: ', userMedicalHistory);
    console.log('updateUser userFamilyMedicalHistory: ', userFamilyMedicalHistory);




    ///setUserBirthDate(`${userBirthDateYear}-${userBirthDateMonth}-${userBirthDateDay}`);

    const userBirthDate = `${userBirthDateYear}-${userBirthDateMonth+1}-${userBirthDateDay}`;


    // if userPurpose is '기타(직접입력)' then set userPurposeValue to userDefinedPurpose
    // else set userPurposeValue to userPurpose


    const userPurposeValue = userPurpose == '기타(직접입력)' ? userDefinedPurpose : userPurpose;



    setLoading(true);
    try {
      //setUser(null);
      setError(null);


      /*
      const res = await fetch(
        `/api/doingdoit/user/updateUserByEmail?_email=${session?.user?.email}`
        + `&_name=${userName}`
        + `&_nickname=${userNickname}`
        + `&_mobile=${userMobile}&_birthDate=${userBirthDate}&_gender=${userGender}&_regType=${regType}`
        + `&_weight=${userWeight}&_height=${userHeight}&_purpose=${userPurpose}`
        + `&_marketingAgree=${userMarketingAgree}`
        + `&_medicalHistory=${userMedicalHistory}`
        + `&_familyMedicalHistory=${userFamilyMedicalHistory}`
        + `&_password=${password}`
      );
      */

      // post api
      const res = await fetch(`/api/doingdoit/user/updateUserByEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          name: userName,
          nickname: userNickname,
          mobile: userMobile,
          birthDate: userBirthDate,
          gender: userGender,
          weight: userWeight,
          height: userHeight,
          purpose: userPurposeValue,
          marketingAgree: userMarketingAgree,
          medicalHistory: userMedicalHistory,
          familyMedicalHistory: userFamilyMedicalHistory,
          password: password,


          sellerAccountName: sellerAccountName,
          sellerBankName: sellerBankName,
          sellerAccountNumber: sellerAccountNumber,

          stabilityId: stabilityId,
          storecode: storecode,
          sellerWalletAddress: sellerWalletAddress,
        }),

      });


  

      toast.success("프로필이 수정되었습니다.");
      

    
    } catch (e) {
      ///setError(e);
    }
    setLoading(false);

    /////window.location.href = '/';
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



  console.log('userGender: ', userGender);








  

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {

    console.log(' onSubmit data: ', data);

  
 
    
    toast.success(<Text as="b">Successfully added!</Text>);
   

    console.log('Profile settings data ->', {
      ...data,
    });
    
    

  };



  return (

    <Form<SignUpSchema>
      validationSchema={signUpSchema}
      // resetValues={reset}
      
      onSubmit={onSubmit}

      className='@container'
      useFormProps={{
        mode: 'onChange',
        //defaultValues,
        defaultValues: {
          purpose: userPurpose,
          isAgreedTerms: userIsAgreedTerms === 'Y' ? true : false,
          isAgreedPrivacy: userIsAgreedPrivacy === 'Y' ? true : false,
          isAgreedMarketing: userIsAgreedMarketing === 'Y' ? true : false,
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

              <div className="  self-stretch xl:bg-background flex flex-col items-center justify-start xl:py-10 px-0">





            {/* loading animaiton */}

            { loading ? (

              <div className=" h-screen self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
                  
                  <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

                  </div>
                </div>

              ) : (


                <div className="w-full  xl:w-[1000px] flex flex-col items-center justify-start">


                  <div className="self-stretch bg-white flex flex-col items-center justify-end  p-5 xl:p-[50px] gap-[40px]">

                    
                    <div
                      className="self-stretch flex flex-row items-center justify-center pb-5 gap-[12px] z-[0] text-left text-sm text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
                    >

                      <motion.div
                        className="w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            history.back();
                          }}
                        >

                          <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">


                              <Image
                                width="24"
                                height="24"
                                className="relative w-6 h-6 overflow-hidden shrink-0"
                                alt=""
                                src="/usermain/images/back.svg"
                              />
                              <div className="relative">뒤로</div>
                            

                          </div>
                        </button>
                      
                      </motion.div>


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






                    <div className=" w-full  xl:w-[400px] flex flex-col items-center justify-center text-left text-sm">

                      <div className=" font-extrabold text-xl xl:text-13xl text-dark">
                        프로필 수정
                      </div>


                      <div className="mt-5 xl:mt-10 self-stretch flex flex-col items-center justify-start gap-[15px] xl:gap-[32px]">
                        

                      {address && (
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>나의 지갑 주소</span>
                            <span className="text-red">*</span>
                          </div>
  
                          <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                            
                            <div className="relative font-medium">
                              {address &&
                                address?.slice(0, 6) +
                                "..." +
                                address?.slice(-4)}
                            </div>
                            
                            {/* copy button */}
                            <div>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(address);
                                  toast.success('지갑 주소가 복사되었습니다.');
                                }}
                              >
                                <img
                                  className="w-4 h-4 relative overflow-hidden shrink-0"
                                  alt=""
                                  src="/usermain/images/icon-copy.png"
                                />
                              </button>
                            </div>
                            {/* new window button for bscscan */}
                            <div>
                              <button
                                onClick={() => {
                                  window.open(`https://bscscan.com/address/${address}`, '_blank');
                                }}
                              >
                                <img
                                  className="w-4 h-4 relative overflow-hidden shrink-0"
                                  alt=""
                                  src="/usermain/images/icon-bscscan.png"
                                />
                              </button>
                            </div>

                          </div>

                          {/* disconnect button */}
                          <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                            <Button
                              onClick={() => {
                                  confirm("지갑 연결을 해제하시겠습니까?")
                                  &&
                                  activeWallet?.disconnect()
                                  .then(() => {

                                      toast.success('지갑 연결이 해제되었습니다.');

                                      //router.push(
                                      //    "/admin/" + params.center
                                      //);
                                  });
                              } }
                              className="bg-red text-white"
                            >
                              지갑 연결 해제
                            </Button>
                          </div>

                        </div>
                      )}



                      { !address && (
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">

                          {/* 설명: 지갑을 연결하고 프로필을 완성하세요. */}
                          <div className="self-stretch relative font-extrabold">
                            <span>지갑을 연결하고 프로필을 완성하세요.</span>
                            <span className="text-red">*</span>
                          </div>

                          <ConnectButton
                            client={client}
                            wallets={wallets}
                            chain={bsc}
                            
                            theme={"light"}

                            // button color is dark skyblue convert (49, 103, 180) to hex
                            connectButton={{
                              style: {
                                //backgroundColor: "#3167b4", // dark skyblue
                                backgroundColor: "#e0e7ff", // indigo-100

                                //color: "#f3f4f6", // gray-300 
                                color: "#4338ca", // indigo-700

                                fontWeight: "600",

                                padding: "2px 2px",
                                borderRadius: "10px",
                                fontSize: "14px",
                                //width: "40px",
                                height: "38px",
                              },
                              label: "지갑 연결",
                            }}

                            connectModal={{
                              size: "wide", 
                              //size: "compact",
                              titleIcon: "https://www.stable.makeup/logo.png",                           
                              showThirdwebBranding: false,
                            }}

                            locale={"ko_KR"}
                            //locale={"en_US"}
                          />
                        </div>

                      )}


                        {/* user wallet address */}
                        {/* userData?.walletAddress */}
                        {/*
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>등록된 지갑 주소</span>
                            <span className="text-red">*</span>
                          </div>
  
                          {userData?.walletAddress ? (
                            <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                              
                              <div className="relative font-medium">
                                {userData?.walletAddress &&
                                  userData?.walletAddress?.slice(0, 6) +
                                  "..." +
                                  userData?.walletAddress?.slice(-4)}
                              </div>

                            </div>
                          ) : (
                            <div className="relative font-medium">
                              등록된 지갑 주소가 없습니다.
                            </div>
                          )}
                              
                             
                        </div>
                        */}




                        {/* email */}

                                {/*
                          <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                            <div className="self-stretch relative font-extrabold">
                              <span>이메일</span>
                              <span className="text-red">*</span>
                            </div>

                            <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                              <div className="relative">{userEmail}</div>
                              <div className="relative">{regType}</div>
                            </div>
                          </div>
                          */}

                        {/* stabilityId */}
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>상점 ID</span>
                            <span className="text-red">*</span>
                          </div>
                          <Input
                            type="text"
                            size="lg"
                            //label="닉네임"
                            placeholder="상점 ID"
                            //placeholder={userData?.stabilityId ? userData?.stabilityId : "상점 ID"}

                            //className="[&>label>span]:font-medium"
                            className="w-full"
                            value={stabilityId}
                            onChange={
                              (e) => setStabilityId(e.target.value)
                            }
                          />
                        </div>

                        {/* storecode */}
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>상점코드</span>
                            <span className="text-red">*</span>
                          </div>
                          <Input
                            type="text"
                            size="lg"
                            placeholder="상점코드"
                            className="w-full"
                            value={storecode}
                            onChange={
                              (e) => setStorecode(e.target.value)
                            }
                          />
                        </div>

                        {/* sellerAccountName */}
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>판매자 예금주명</span>
                            <span className="text-red">*</span>
                          </div>

                          <Input
                            type="text"
                            size="lg"
                            placeholder="예금주명"
                            className="w-full"
                            value={sellerAccountName}
                            onChange={
                              (e) => setSellerAccountName(e.target.value)
                            }
                          />             
                        </div>

                        {/* sellerBankName */}
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>판매자 은행명</span>
                            <span className="text-red">*</span>
                          </div>

                          <Input
                            type="text"
                            size="lg"
                            placeholder="은행명"
                            className="w-full"
                            value={sellerBankName}
                            onChange={
                              (e) => setSellerBankName(e.target.value)
                            }
                          />             
                        </div>


                        {/* sellerAccountNumber */}
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>판매자 계좌번호</span>
                            <span className="text-red">*</span>
                          </div>

                          <Input
                            type="text"
                            size="lg"
                            placeholder="'-'없이 입력하세요."
                            className="w-full"
                            value={sellerAccountNumber}
                            onChange={
                              (e) => setSellerAccountNumber(e.target.value)
                            }
                          />             
                        </div>

                        {/* sellerWalletAddress */}
                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>판매자 지갑 주소</span>
                            <span className="text-red">*</span>
                          </div>

                          <Input
                            type="text"
                            size="lg"
                            placeholder="판매자 지갑 주소"
                            className="w-full"
                            value={sellerWalletAddress}
                            onChange={
                              (e) => setSellerWalletAddress(e.target.value)
                            }
                          />             
                        </div>
                        
                        
                        {/* nickname */}


                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>닉네임</span>
                            <span className="text-red">*</span>
                          </div>
  
                          <Input
                            type="text"
                            size="lg"
                            //label="닉네임"
                            
                            placeholder="10자이내 영문,한글"
                            //placeholder={userData?.nickname ? userData?.nickname : "10자이내 영문,한글"}

                            //className="[&>label>span]:font-medium"
                            className="w-full"
                            value={userNickname}
                            onChange={
                              (e) => setUserNickname(e.target.value)
                            }
                          />

                        </div>

                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>휴대폰</span>
                            <span className="text-red">*</span>
                          </div>
     


  
                          <Input
                            type="text"
                            size="lg"
                            //label="닉네임"
                            placeholder="'-'없이 입력하세요."
                            ///className="[&>label>span]:font-medium"
                            className="w-full"
                            value={userMobile}
                            onChange={
                              (e) => 
                              
                              {

                                console.log('userMobile: ', e.target.value);


                                setUserMobile(e.target.value)

                                

                              }
                            } 
                          />

                        </div>




                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>생년월일</span>
                            <span className="text-red">*</span>
                          </div>


                          
                          <div className="self-stretch flex flex-col xl:flex-row items-center justify-center gap-[8px]">


                            <DatePicker
                              showYearPicker
                              selected={
                                new Date(userBirthDateYear, 1, 1)
                              }

                              onChange={(date: any) => {

                                console.log('onChange =======ProfileEditPage date.getFullYear: ', date.getFullYear());

                                setUserBirthDateYear(date.getFullYear());

                              }}

                              dateFormat="yyyy"
                              placeholderText="년도"
                              //className="w-full"
                            />

                            <DatePicker
                              showMonthYearPicker

                              selected = {
                                new Date(userBirthDateYear, userBirthDateMonth)
                              }
                              
                              onChange={(date: any) => {

                                console.log('========ProfileEditPage dategetMonth: ', date.getMonth());

                                setUserBirthDateMonth(date.getMonth());

                              }}

                              dateFormat="MM"
                              placeholderText="월"
                              //className="w-full"
                            />

                            <DatePicker

                              selected={
                                new Date(userBirthDateYear, userBirthDateMonth, userBirthDateDay)
                              }

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
                          

                          {/* 성별 선택 (여성, 남성) */  }
                                                   {/* selected={userGender}

                              if userGender is '여성' then selected={userGender} */}

         

                          <RadioGroup

                              value={userGender}
                              //setValue={setValue}
          

                              /*
                              setValue={(value) => {
                                //setValue(value);
                                ///console.log('value', value);

                                setUserGender(value);



                              } }
                              */

                              setValue={(value) => {
                                //setValue(value);
                                
                                console.log('value', value);

                                ///setUserGender(value);
                              } }

                          >
                            <div className="self-stretch flex flex-row items-center justify-start gap-[40px]">

     

                              <Radio
                                size="sm"
                                labelClassName="pl-2 text-md"
                                name="gender"
                                label="여성"
                                value="여성"

                                checked={userGender == '여성' ? true : false}

                                onChange={
                                  (e) => {
                                    setUserGender(e.target.value);

                                } }



                              />

                            <Radio
                              size="sm"
                              labelClassName="pl-2 text-md "
                              name="gender"
                              label="남성"
                              value="남성"
                              // selected={userGender}

                              // if userGender is '남성' then select this

                              //select this


                              checked={userGender == '남성' ? true : false}

                              onChange={
                                (e) => {
                                  setUserGender(e.target.value);
                                
                                } }

                            />
                           

                            </div>
                          </RadioGroup>
                           


                        </div>


                        <div className="hidden self-stretch flex-col items-start justify-center gap-[8px]">
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
                              //className="[&>label>span]:font-medium"
                              className="w-full"
                              value={userWeight}
                              onChange={(e) => setUserWeight(parseInt(e.target.value))}
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
                              //className="[&>label>span]:font-medium"
                              className="w-full"
                              value={userHeight}
                              onChange={(e) => setUserHeight(parseInt(e.target.value))}
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
                                
                                onChange={
                                  (
                                    e : any
                                  ) => {
                                    
                                    
                                    console.log('purpose e: ', e);

                                    onChange(e.value);



                                    //e.value == '기타(직접입력)' ? setUserPurpose('') : setUserPurpose(e.value);

                                    setUserPurpose(e.value);

                                    
                                    //e.target.value == '기타(직접입력)' ? setUserPurpose('') : setUserPurpose(e.target.value);

                                    //setUserPurpose(e.target.value);

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

                                // select option by userPurpose value
                                ////value={value}


                             

                                
                                value = {
                                  userPurpose == '다이어트' ? '다이어트' :
                                  userPurpose == '체중증가' ? '체중증가' :
                                  userPurpose == '영양보충' ? '영양보충' :
                                  userPurpose == '혈압관리' ? '혈압관리' :
                                  userPurpose == '혈당관리' ? '혈당관리' :
                                  userPurpose == '콜레스테롤관리' ? '콜레스테롤관리' :
                                  userPurpose == '건강유지' ? '건강유지' :
                                  userPurpose == '챌린지참여' ? '챌린지참여' :
                                  userPurpose == '기타(직접입력)' ? '기타(직접입력)' : ''
                                } 
                                

                              />



                              {
                   
                                userPurpose == '기타(직접입력)' && (



                                <Input
                                  type="text"
                                  size="lg"
                                  ///label="키"
                                  placeholder="식단기록목적을 입력해주세요."
                                  //className="[&>label>span]:font-medium"
                                  className="w-full text-sm"
                                  //value={value}
                                  //onChange={onChange}

                                  //onChange={(e) => setUserPurpose(e.target.value)}

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

                        {/* 질병 선택 */  }
                      
                        <div className="hidden self-stretch flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>현재 질병이 있거나 증상 개선을 위해 처방을 받아 복용중인 약이 있나요?</span>
                            <span className="text-red">*</span>
                          </div>
                        
                        
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
                              value="Y"

                              checked={userMedicalHistory == 'Y' ? true : false}
                            />
                            <Radio
                              size="sm"
                              labelClassName="pl-2 text-md "
                              name="medicalHistory"
                              label="아니오"
                              value="N"

                              checked={userMedicalHistory == 'N' ? true : false}
                            />
                            </div>
                          </RadioGroup>

                        </div>
                        
                        
                        {/*
                        <ContainerNoPrescriptionOrDisea medicalHistoryQuestion="부모, 형제, 자매 중 다음의 질환을 앓았거나 해당 질환으로 사망한 경우가 있나요?(뇌졸중, 심근경색, 고혈압, 당뇨병, 암)" />
                        */}

                        {/* 가족 질병 선택 */  }

                        
                        <div className="hidden self-stretch flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            <span>부모, 형제, 자매 중 다음의 질환을 앓았거나 해당 질환으로 사망한 경우가 있나요?(뇌졸중, 심근경색, 고혈압, 당뇨병, 암)</span>
                            <span className="text-red">*</span>
                          </div>
                        
                         
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
                              value="Y"

                              checked={userFamilyMedicalHistory == 'Y' ? true : false}
                            />
                            <Radio
                              size="sm"
                              labelClassName="pl-2 text-md "
                              name="familyMedicalHistory"
                              label="아니오"
                              value="N"

                              checked={userFamilyMedicalHistory == 'N' ? true : false}
                            />
                            </div>
                          </RadioGroup>
                        </div>
                        




                        <div className="self-stretch flex flex-col items-start justify-center gap-[8px]">
                          <div className="self-stretch relative font-extrabold">
                            비밀번호 변경
                          </div>

                          <Password
                            size="lg"
                            placeholder="비밀번호(8~15자리 영문,숫자,특수문자 혼합)"
                            className="w-full"
                            inputClassName="text-xs xl:text-base pl-5"

                            onChange={

                              async (e) => {
                                
                                //setPassword(e.target.value)


                                /*
                                const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
                                if (!re.test(e.target.value)) {
                                  setPasswordError(true);
  
                                  setPasswordConfirmErrorMessage("비밀번호는 8~12자리 영문,숫자,특수문자 혼합");
  
  
                                } else {
                                  setPasswordError(false);
  
                                  setPasswordConfirmErrorMessage("");
                                  
                                }
  
  
                                setPassword(e.target.value);
                              
                                //console.log("password e.target.value", e.target.value);
                                
                                onChange(e.target.value);
                                */

                                // check if password is valid

                                if (e.target.value == "") {
                                  setPasswordError(false);
                                  setPasswordErrorMessage("");
                                } else {

                                  const re = /^(?=.*[a-zA-Z])(?=.*[~!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
                                  if (!re.test(e.target.value)) {
                                    setPasswordError(true);
    
                                    setPasswordErrorMessage("비밀번호는 8~12자리 영문,숫자,특수문자 혼합");
    
    
                                  } else {
                                    setPasswordError(false);
    
                                    setPasswordErrorMessage("");
                                    
                                  }

                                }
                                
                                setPassword(e.target.value);



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

                                setPasswordConfirm(e.target.value);

                                if (e.target.value == "") {
                                  setPasswordErrorMessage("");
                                } else {
                                
                                  if ( passwordError === false ) {
                                  
                                    if (e.target.value !== password) {

                                      // show error message

                                      setPasswordErrorMessage("비밀번호가 일치하지 않습니다.");

                                    } else {

                                      // hide error message

                                      setPasswordErrorMessage("");

                                    }

                                  } 

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


                        


                        {/*
                        <Button
                          onClick={
                            () => {
                              console.log('ProfileEditPage user: ', user);

                              updateUser();
                            }
                          }
                          className="mt-10 self-stretch flex flex-row items-center justify-center gap-[8px] rounded-[100px] bg-dark text-white font-bold text-lg py-[16px] px-[40px] hover:bg-dark-2 transition duration-200"
                        >
                        */}



                        <Button
                            className={`w-full mt-8  rounded-full text-white font-extrabold text-base bg-dark hover:bg-dark-100`}
                            //type="submit"
                            //size={isMedium ? 'lg' : 'xl'}
                            
                            size="lg"

                            /*
                            disabled={
                         
                              userMobile == ""
                              || userNickname == ""
                              || userGender == ""
                              || userWeight == 0
                              || userHeight == 0
                              
                              || userPurpose == ""

                              || userPurpose == '기타(직접입력)' && userDefinedPurpose == ""

                              || userMedicalHistory == ""
                              || userFamilyMedicalHistory == ""

                            }
                            */

                            onClick={
                              () => {

                                /*
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
                                updateUser();
                                */

                                if (password.length > 0) {

                                  if (passwordError) {
                                    toast.error(
                                      '비밀번호를 확인해주세요.',
                                      {
                                        //position: 'top-right',
                                      }
                                    );
                                  } else if (password !== passwordConfirm) {
                                    toast.error(
                                      '비밀번호를 확인해주세요.',
                                      {
                                        //position: 'top-right',
                                      }
                                    );
                                  } else {
                                    updateUser();
                                  }

                                } else {
                                  updateUser();
                                }


                              }
                            }
                          >

         
                          저장

                        </Button>


                  


                      </div>


                      <Link
                        className="mt-10  underline text-sm text-dark"
                        href="/usermain/user/withdrawal"
                      >
                        탈퇴하기
                      </Link>

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




      } }

    </Form>

  );


};


