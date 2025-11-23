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

import { useRouter, } from 'next/navigation';



/*
import {
  defaultValues,
  profileFormSchema,
  ProfileFormTypes,
} from '@/utils/validators/doingdoit/create-profile.schema';
*/


import { SignUpSchema, signUpSchema } from '@/utils/validators/doingdoit/signup.schema';
import { publicDecrypt } from "crypto";
import { Button } from "rizzui";


export default function ProfileEditPage() {


  const router = useRouter();


  const { data: session, status } = useSession();

  
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
  const [userMarketingAgree, setUserMarketAgree] = useState('');

 
  const [userIsAgreedTerms, setUserIsAgreedTerms] = useState('');
  const [userIsAgreedPrivacy, setUserIsAgreedPrivacy] = useState('');
  const [userIsAgreedMarketing, setUserIsAgreedMarketing] = useState('');


  const [userBirthDateYear, setUserBirthDateYear] = useState(2000);
  const [userBirthDateMonth, setUserBirthDateMonth] = useState(0);
  const [userBirthDateDay, setUserBirthDateDay] = useState(1);

  const [userMedicalHistory, setUserMedicalHistory] = useState('');
  const [userFamilyMedicalHistory, setUserFamilyMedicalHistory] = useState('');



  useEffect(() => {
    
    setUserBirthDate(`${userBirthDateYear}-${userBirthDateMonth+1}-${userBirthDateDay}`);

  }, [userBirthDateYear, userBirthDateMonth, userBirthDateDay]);



  const [password, setPassword] = useState("");

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


          console.log("profile data: ", json?.data);




          setUserData(json?.data);


       
          setUserEmail(json.data?.email);
          setRegType(json.data?.regType);
          setUserName(json.data?.name);
          setUserNickname(json.data?.nickname);
          setUserMobile(json.data?.mobile);


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



          const year = new Date(json.data?.birthDate).getFullYear();
          const month = new Date(json.data?.birthDate).getMonth();
          const day = new Date(json.data?.birthDate).getDate();





          //const year = new Date(json.data?.birthDate).getFullYear();
          //const month = new Date(json.data?.birthDate).getMonth();
          //const day = new Date(json.data?.birthDate).getDate();

          console.log('birthDate: ', json.data?.birthDate);
          console.log('year: ', year);
          console.log('month: ', month);
          console.log('day: ', day);

          
            /*
          setUserBirthDateYear(year);
          setUserBirthDateMonth(month);
          setUserBirthDateDay(day);
          */

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
          setUserPurpose(json.data?.purpose);

          setUserIsAgreedTerms(json.data?.isAgreedTerms);
          setUserIsAgreedPrivacy(json.data?.isAgreedPrivacy);
          setUserIsAgreedMarketing(json.data?.isAgreedMarketing);
          



          setUserMedicalHistory(json.data?.medicalHistory);
          setUserFamilyMedicalHistory(json.data?.familyMedicalHistory);



          setPassword(json.data?.password);


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



  console.log('userBirthDateYear: ', userBirthDateYear);
  console.log('userBirthDateMonth: ', userBirthDateMonth);
  console.log('userBirthDateDay: ', userBirthDateDay);

  console.log('userBirthDate: ', userBirthDate);
  

  
  if (status === 'loading') {
    return <p>Loading...</p>;
  }




  /* updateUser */
  const updateUser = async () => {


    setLoading(true);
    try {
      //setUser(null);
      setError(null);

      // post api
      const res = await fetch(`/api/doingdoit/user/updatePasswordByEmail?_email=${session?.user?.email}&_password=${password}`);


      toast.success(<Text as="b">비밀번호가 변경되었습니다.</Text>);



    
    } catch (e) {
      ///setError(e);
    }
    setLoading(false);


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


              <div className="  self-stretch xl:bg-white flex flex-col items-center justify-start xl:py-10 px-0">





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





                    <div className=" w-full  xl:w-[400px] flex flex-col items-center justify-center text-left text-sm">



                      <div className="mt-5 xl:mt-10 self-stretch flex flex-col items-center justify-start gap-[15px] xl:gap-[32px]">
      

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
                                // check valid password
                                // check if password is valid
                                



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


                        


                        <div className=" flex flex-row items-center justify-center gap-5">
                        <Button
                          type="button"
                          onClick={
                            () => {
  
                              ///router.push('/');

                              history.back();

                              
                            }
                          }
                          className="self-stretch flex flex-row items-center justify-center rounded-sm
                            border border-gray-100
                           bg-gray-100 text-dark font-bold text-lg py-[16px] px-[40px] hover:bg-gray-50 transition duration-20"
                        >
         
                          닫기

                        </Button>

                        <Button
                          type="button"
                          isLoading={loading}
                          onClick={
                            () => {
  
                              updateUser();
                            }
                          }
                          className="self-stretch flex flex-row items-center justify-center  rounded-sm
                          border border-dark
                          bg-dark text-white font-bold text-lg py-[16px] px-[40px] hover:bg-dark-2 transition duration-200"
                        >
         
                          저장

                        </Button>
                        </div>

                      </div>


                    </div>
                  </div>

                  


                </div>

              )}


              </div>
            </div>

            
          </div>
        
        );




      } }

    </Form>

  );


};


