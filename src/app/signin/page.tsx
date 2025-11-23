'use client';


///import SignInForm from './sign-in-form';

import SignInForm from './sign-in-form-doingdoit';

import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import AuthWrapperTwo from '@/app/shared/auth-layout/auth-wrapper-two';
import AuthWrapperThree from '@/app/shared/auth-layout/auth-wrapper-three';
import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import AuthWrapperFive from '../shared/auth-layout/auth-wrapper-five';

import AuthWrapperDoingdoit from '@/app/shared-doingdoit/auth-layout/auth-wrapper-doingdoit';


import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import { metaObject } from '@/config/site.config';



import { useSession, signOut } from 'next-auth/react';

import { routes } from '@/config/routes';

import Link from 'next/link';




import { useEffect, useState } from 'react';

import { menuItems } from '@/layouts/helium/helium-menu-items-doingdoit';



/*
export const metadata = {
  ...metaObject('Sign In'),
};
*/


export default function SignIn() {


  const { data: session, status } = useSession();









  const [accessArray, setAccessArray] = useState<any>([]);


  /* member data from data */
  const [userData, setUserData] = useState(
    {
      id: '',
      email: '',
      nickname: '',
      avatar: '',
      role: '',
      regType: '',

      gender: '',
      mobile: '',
      birthDate: '',
      weight: 0,
      height: 0,
      purpose: '',
      isAgreedTerms: '',
      isAgreedPolicy: '',
      isAgreedMarketing: '',

      loginId: '',
      password: '',
      roles: '',
      description: '',

      createdAt: '',
      updatedAt: '',
      deletedAt: '',

      status: '',

      access: {
        access_user_member: false,
        access_user_withdrew: false,
        access_user_admin: false,
        
        access_feed: false,
        access_feed_stats: false,
    
        access_board: false,
        access_board_tag: false,
    
        access_survey: false,
        access_survey_stats: false,
    
        access_operation_healthinfo: false,
        access_operation_guide: false,
        access_operation_notice: false,
        access_operation_faq: false,
        access_operation_faqcategory: false,
    
        access_point: false,
        access_point_setting: false,
    
        access_setup_food: false,
        access_setup_terms: false,

      }
    }
  );


  useEffect(() => {

    const getUserData = async () => {
      
      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      const data = json as any;

      setUserData(data?.data);

      console.log('data.data.access', data?.data?.access);

      let tmpAccessArray: any = [];

      /*
      data?.data?.access?.access_user_member && tmpAccessArray.push('access_user_member');
      data?.data?.access?.access_user_withdrew && tmpAccessArray.push('access_user_withdrew');
      data?.data?.access?.access_user_admin && tmpAccessArray.push('access_user_admin');
      data?.data?.access?.access_feed && tmpAccessArray.push('access_feed');
      data?.data?.access?.access_feed_stats && tmpAccessArray.push('access_feed_stats');
      data?.data?.access?.access_board && tmpAccessArray.push('access_board');
      data?.data?.access?.access_board_tag && tmpAccessArray.push('access_board_tag');
      data?.data?.access?.access_survey && tmpAccessArray.push('access_survey');
      data?.data?.access?.access_survey_stats && tmpAccessArray.push('access_survey_stats');
      data?.data?.access?.access_operation_healthinfo && tmpAccessArray.push('access_operation_healthinfo');
      data?.data?.access?.access_operation_guide && tmpAccessArray.push('access_operation_guide');
      data?.data?.access?.access_operation_notice && tmpAccessArray.push('access_operation_notice');
      data?.data?.access?.access_operation_faq && tmpAccessArray.push('access_operation_faq');
      data?.data?.access?.access_operation_faqcategory && tmpAccessArray.push('access_operation_faqcategory');
      data?.data?.access?.access_point && tmpAccessArray.push('access_point');
      data?.data?.access?.access_point_setting && tmpAccessArray.push('access_point_setting');
      data?.data?.access?.access_setup_food && tmpAccessArray.push('access_setup_food');
      data?.data?.access?.access_setup_terms && tmpAccessArray.push('access_setup_terms');
      */

      tmpAccessArray.push('access_user_member');
      tmpAccessArray.push('access_user_withdrew');
      tmpAccessArray.push('access_user_admin');
      
      tmpAccessArray.push('access_feed');
      tmpAccessArray.push('access_feed_stats');

      tmpAccessArray.push('access_board');
      tmpAccessArray.push('access_board_tag');
      
      tmpAccessArray.push('access_survey');
      tmpAccessArray.push('access_survey_stats');

      tmpAccessArray.push('access_operation_healthinfo');
      tmpAccessArray.push('access_operation_guide');

      tmpAccessArray.push('access_operation_notice');
      tmpAccessArray.push('access_operation_faq');
      tmpAccessArray.push('access_operation_faqcategory');

      tmpAccessArray.push('access_point');
      tmpAccessArray.push('access_point_setting');

      tmpAccessArray.push('access_setup_food');
      tmpAccessArray.push('access_setup_terms');




      
      
      setAccessArray(tmpAccessArray);




    }

    getUserData();

  } , [session]);













  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  
  /*
  if (session && session.user.email === 'doingdoit1@cryptoss.beauty'
    || session && session.user.email === 'doingdoit2@cryptoss.beauty'
    || session && session.user.email === 'doingdoit3@cryptoss.beauty'
    || session && session.user.email === 'doingdoit4@cryptoss.beauty'
    || session && session.user.email === 'doingdoit5@cryptoss.beauty'
    ) {
  */
  
  if (session && session?.user?.email?.includes('@cryptoss.beauty')) {



    // check menuItems and access array, then get first href from dropdownItems from menuItems

    let href = '';

    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].dropdownItems) {
        for (let j = 0; j < menuItems[i].dropdownItems.length; j++) {
          
          if (accessArray.includes(menuItems[i].dropdownItems[j].access)) {
            
            href = menuItems[i].dropdownItems[j].href;

            break;
          }
        }
      }
    }


    if (session?.user?.email === 'admin@cryptoss.beauty') {
      href = '/dashboard';
    }

    console.log('href==============', href);
      


    
    if (href) {
      window.location.href = href;
    } else {
      window.location.href = "/";
    }
    






   
    ///window.location.href = "/";


    {/*
    return (

      <AuthWrapperDoingdoit
        title={
          <div className='fle flex-col gap-3'>
            
            <div>
              <span className="relative inline-block">
                
                <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
              </span>{' '}
              
              로그인 되었습니다.
            </div>


          </div>
        }
        //description=""
        //bannerTitle=""
        //bannerDescription=""
        isSocialLoginActive={false}

      >   
        <div className='flex flex-col items-center justify-center '>
            <Link
              href={routes.home}
              className="font-semibold text-gray-700 transition-colors hover:text-blue"
            >
              홈으로
            </Link>
        </div>



          

      </AuthWrapperDoingdoit>



    );

    */}


  }

  /*
  if (session) {

    window.location.href = "/";

  }
  */


  if (false) {


    return (

      <AuthWrapperDoingdoit
        title={
          <div className='fle flex-col gap-3'>
            
            {/*
            <div>
              <span className="relative inline-block">
                
                <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
              </span>{' '}
              
              사용자로 로그인 되었습니다.
            </div>
            */}


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
              href={routes.home}
              className="font-semibold text-gray-700 transition-colors hover:text-blue"
            >
              홈으로
            </Link>
        </div>


      </AuthWrapperDoingdoit>



    );
  }


  return (

    <AuthWrapperDoingdoit
      title={
        <>
          {/*
          <span className="relative inline-block">
            
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
          */}
         로그인
        </>
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
    



     
        <SignInForm />
      
      


    
    </AuthWrapperDoingdoit>
    

  
   

  );
}
