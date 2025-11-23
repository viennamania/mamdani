'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox } from '@/components/ui/checkbox';

import { Password } from '@/components/ui/password';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';

//import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';

import { loginSchema, LoginSchema } from '@/utils/validators/login-doingdoit.schema';


import { menuItems } from '@/layouts/helium/helium-menu-items-doingdoit';
import { values } from 'lodash';




const initialValues: LoginSchema = {
  id: '',
  ///email: 'admin',
  password: '',
  rememberMe: true,
};

export default function SignInForm() {
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});


  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const [loginErrorMessage, setLoginErrorMessage] = useState(""); 



  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    
    ////console.log(data);


    /*
    signIn('credentials', {
      ...data,

      redirect: false,

      ///redirect: true,

      //callbackUrl: '/',


      //callbackUrl: '/',
      //'invalid url': '/',

      ///callbackUrl: '/dashboard',

    });
    */

    console.log("loginId: ", loginId);
    console.log("password: ", password);




    const res = await signIn('credentials', {
      //id: data.id,
      //password: data.password,
      id: loginId,
      password: password,
      redirect: false,

      //redirect: true,
      //callbackUrl: '/signin',

      
    });
    

   /// alert("res: " + JSON.stringify(res));


    if (res?.ok) {

      ///alert("res: " + JSON.stringify(res));



      /*
      const res = await signIn("credentials", {

        id: data.id,
        password: data.password,
        redirect: true,
        
        ////callbackUrl: '/dashboard',
        callbackUrl: '/signin',


      });
      */
      
      





      
  
      /*
      const email = data.id + "@cryptoss.beauty";
      const response = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${email}`);
      const json = await response?.json();

      const userData = json as any;

      // userData?.data?.access is json string

      const access = JSON.parse(userData?.data?.access) as any;

      ///console.log("access: ", access);

      let accessArray: any = [];

      access?.access_user_member && accessArray.push('access_user_member');
      access?.access_user_withdrew && accessArray.push('access_user_withdrew');
      access?.access_user_admin && accessArray.push('access_user_admin');
      access?.access_feed && accessArray.push('access_feed');
      access?.access_feed_stats && accessArray.push('access_feed_stats');
      access?.access_board && accessArray.push('access_board');
      access?.access_board_tag && accessArray.push('access_board_tag');
      access?.access_survey && accessArray.push('access_survey');
      access?.access_survey_stats && accessArray.push('access_survey_stats');
      access?.access_operation_healthinfo && accessArray.push('access_operation_healthinfo');
      access?.access_operation_guide && accessArray.push('access_operation_guide');
      access?.access_operation_notice && accessArray.push('access_operation_notice');
      access?.access_operation_faq && accessArray.push('access_operation_faq');
      access?.access_operation_faqcategory && accessArray.push('access_operation_faqcategory');
      access?.access_point && accessArray.push('access_point');
      access?.access_point_setting && accessArray.push('access_point_setting');
      access?.access_setup_food && accessArray.push('access_setup_food');
      access?.access_setup_terms && accessArray.push('access_setup_terms');


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

      window.location.href = href;
      */
      

      //window.location.href = '/signin';

      window.location.href = '/dashboard';




      return (
        <div>
          <h1>로그인 성공</h1>
        </div>
      )

  



    } else {
      console.log("res: ", res);
      /*
      {
        "error": "CredentialsSignin",
        "status": 401,
        "ok": false,
        "url": null
      }
      */
      // TODO: Show error message with toast

      //toast.error("비밀번호가 올바르지 않습니다.");

      setLoginErrorMessage("비밀번호가 올바르지 않습니다.");

    }







    ///setReset({ email: "", password: "", isRememberMe: false });
  };



  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}

      >

        {({ register, formState: { errors } }) => (

        
          <div className="space-y-5  ">


            <Input
              type="text"
              size="xl"
              label="아이디"
              placeholder="아이디 입력"
              color="info"
              className="[&>label>span]:font-bold"
              inputClassName="text-lg"
              {...register('id')}
              //error={errors.id?.message}

              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                // if input is "" then don't show error message

                //console.log("e.target.value: ", e.target.value);

                setLoginId(e.target.value);

                setLoginErrorMessage("");
              }}


            />
            <Password
              label="비밀번호"
              placeholder="비밀번호 입력"
              size="xl"
              className="[&>label>span]:font-bold"
              inputClassName="text-lg"
              color="info"
              {...register('password')}
              

              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                // if input is "" then don't show error message

                //console.log("e.target.value: ", e.target.value);

                setPassword(e.target.value);


                
                setLoginErrorMessage("");
             

              }}


              ///error={errors.password?.message}

              //error={loginErrorMessage !== "" ? loginErrorMessage : errors.password?.message}

              error={loginErrorMessage}



              // handle keypress enter event

              onKeyPress={(e) => {
            
                if (e.key === 'Enter') {
                
                  onSubmit({ id: loginId, password: password, rememberMe: true});
                }
              }}
 




              ///error={ '비밀번호가 일치하지 않습니다.'}
            />

            {/*
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                color="info"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            */}

            <Button

              className="w-full" type="submit" size="lg" color="info"

    
            >
              <span>로그인</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>


          </div>

        )}

      </Form>


      {/*
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
      */}

    </>
  );
}
