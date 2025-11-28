import type { NextPage } from "next";

import LogoIcon from "./logo-icon";

import Link from "next/link";

import { motion } from "framer-motion";

import Image from "next/image";

import { useSession, signIn, signOut } from 'next-auth/react';


///import { getUserByEmail, getUserById } from '@/lib/api/user';

import { useMemo, type CSSProperties, useState, useEffect, use } from "react";
////import { useState, useEffect } from "react";


import { loadBindings } from "next/dist/build/swc";
import { set } from "lodash";
////////import { u } from "uploadthing/dist/types-e8f81bbc";


import { useRouter } from 'next/navigation';
import { routes } from "@/config/routes";
import { fa } from "@faker-js/faker";


type Top1Type = {
  id?: string;

  logo?: string;

  /** Style props */
  topBackgroundColor?: CSSProperties["backgroundColor"];
  topBorderBottom?: CSSProperties["borderBottom"];
  topBoxSizing?: CSSProperties["boxSizing"];
  frameDivBorderBottom?: CSSProperties["borderBottom"];
  frameDivBoxSizing?: CSSProperties["boxSizing"];
  divColor?: CSSProperties["color"];
  frameDivBorderBottom1?: CSSProperties["borderBottom"];
  frameDivBoxSizing1?: CSSProperties["boxSizing"];
  divColor1?: CSSProperties["color"];
  frameDivBorderBottom2?: CSSProperties["borderBottom"];
  frameDivBoxSizing2?: CSSProperties["boxSizing"];
  divColor2?: CSSProperties["color"];
  divColor3?: CSSProperties["color"];
  aboutColor?: CSSProperties["color"];
  frameDivBorder?: CSSProperties["border"];
  divColor4?: CSSProperties["color"];
  frameDivBorder1?: CSSProperties["border"];
  divColor5?: CSSProperties["color"];
  frameDivBorderBottom3?: CSSProperties["borderBottom"];
  frameDivBoxSizing3?: CSSProperties["boxSizing"];
};

const Top1: NextPage<Top1Type> = ({
  id,
  logo,
  topBackgroundColor,
  topBorderBottom,
  topBoxSizing,
  frameDivBorderBottom,
  frameDivBoxSizing,
  divColor,
  frameDivBorderBottom1,
  frameDivBoxSizing1,
  divColor1,
  frameDivBorderBottom2,
  frameDivBoxSizing2,
  divColor2,
  divColor3,
  aboutColor,
  frameDivBorder,
  divColor4,
  frameDivBorder1,
  divColor5,
  frameDivBorderBottom3,
  frameDivBoxSizing3,
}) => {







  const topStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: topBackgroundColor,
      borderBottom: topBorderBottom,
      boxSizing: topBoxSizing,
    };
  }, [topBackgroundColor, topBorderBottom, topBoxSizing]);

  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      borderBottom: frameDivBorderBottom,
      boxSizing: frameDivBoxSizing,
      textDecoration: 'none',
    };
  }, [frameDivBorderBottom, frameDivBoxSizing]);

  const div1Style: CSSProperties = useMemo(() => {
    return {
      color: divColor,
    };
  }, [divColor]);

  const frameDiv1Style: CSSProperties = useMemo(() => {
    return {
      borderBottom: frameDivBorderBottom1,
      boxSizing: frameDivBoxSizing1,
      textDecoration: 'none',
    };
  }, [frameDivBorderBottom1, frameDivBoxSizing1]);

  const div2Style: CSSProperties = useMemo(() => {
    return {
      color: divColor1,
    };
  }, [divColor1]);

  const frameDiv2Style: CSSProperties = useMemo(() => {
    return {
      borderBottom: frameDivBorderBottom2,
      boxSizing: frameDivBoxSizing2,
      textDecoration: 'none',
    };
  }, [frameDivBorderBottom2, frameDivBoxSizing2]);

  const div3Style: CSSProperties = useMemo(() => {
    return {
      color: divColor2,
    };
  }, [divColor2]);

  const div4Style: CSSProperties = useMemo(() => {
    return {
      color: divColor3,
    };
  }, [divColor3]);

  const aboutStyle: CSSProperties = useMemo(() => {
    return {
      color: aboutColor,
    };
  }, [aboutColor]);

  const frameDiv3Style: CSSProperties = useMemo(() => {
    return {
      border: frameDivBorder,
    };
  }, [frameDivBorder]);

  const div5Style: CSSProperties = useMemo(() => {
    return {
      color: divColor4,
    };
  }, [divColor4]);

  const frameDiv4Style: CSSProperties = useMemo(() => {
    return {
      border: frameDivBorder1,
    };
  }, [frameDivBorder1]);

  const div6Style: CSSProperties = useMemo(() => {
    return {
      color: divColor5,
    };
  }, [divColor5]);


  const frameDiv5Style: CSSProperties = useMemo(() => {
    return {
      borderBottom: frameDivBorderBottom3,
      boxSizing: frameDivBoxSizing3,
      textDecoration: 'none',
    };
  }, [frameDivBorderBottom3, frameDivBoxSizing3]);


  const router = useRouter();

  const { data: session, status } = useSession();

  ///const [user, setUser] = useState(null);

    /* fetch user data from an API
    /api/doingdoit/user/getUser
  */
    const [userId, setUserId] = useState(session?.user?.id);
    const [userEmail, setUserEmail] = useState(session?.user?.email);
    const [userName, setUserName] = useState(session?.user?.name);
    const [userNickname, setUserNickname] = useState('');
    const [userAvatar, setUserAvatar] = useState(session?.user?.image);
  

    //const [loading, setLoading] = useState(true);
    const [loading, setLoading] = useState(false);


    console.log('top1-mobile session====>', session);


    useEffect(() => {

      const fetchData = async () => {

        if (!session?.user?.email) {
          return;
        }

        setLoading(true);

        const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
        const json = await res?.json();

        //////console.log(json);
  
        const data = json as any;

        
        console.log('top1-mobile data====>', data);



        
        if (data?.data) {
          setUserId(data.data.id);
          setUserEmail(data.data.email);
          setUserName(data.data.name);
          setUserNickname(data.data.nickname);
          setUserAvatar(data.data.avatar);
        } else {

          // 로그인 후 최초 접속 시, DB에 유저 정보가 없을 경우
          //alert(json.message);

          // goto user profile edit page
          //window.location.href = `/usermain/user/profile-edit`;

          signOut();

        }

        setLoading(false);
      };

      fetchData();

    } , [session?.user?.email]);




  // fetch unread notification count from an API time to time
  const [notificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
      
      const fetchData = async () => {

        try {
          const res = await fetch(`/api/doingdoit/notification/getUnreadCountByUserId?_userId=${userId}`);
          const json = await res?.json();

    
          const data = json as any;

          ////console.log('top1-mobile notification count====>', data?.data);
          
          if (data?.data) {
            setNotificationCount(data.data);
          }
        } catch (error) {
          //console.log('Error fetching notification count:', error);
        }
        
      };

      fetchData();

      // eache 10 seconds
      const interval = setInterval(() => {
        fetchData();
      }, 10000);

    

    } , [userId]);




    useEffect(() => {

      if (session && !session?.user?.email) {
        signOut();
      }
  
    } , [session, session?.user?.email]);



  if (status === 'loading') {
    return <p>Loading...</p>;
  }







  ///console.log('session====>', session);


  /*
  console.log('top1-mobile userId===================>', userId);


  if (session?.user?.email && !loading && !userId) {

    // 로그인 후 최초 접속 시, DB에 유저 정보가 없을 경우
    //alert('로그인 후 최초 접속 시, DB에 유저 정보가 없을 경우');

    // goto user profile edit page
    window.location.href = `/usermain/user/register-sns-user`;


    return <></>
  }
  */
  


  return (

    <div className=" block  sticky top-0 z-50  ">

    <div
      ////className="bg-white w-[1920px] h-[100px] flex flex-row items-center justify-between text-center text-base text-dark font-menu-off"
      className=" bg-white w-full h-[100px] flex flex-row items-center justify-center text-center text-base text-dark font-menu-off "
      
      style={topStyle}
    >
      <div
        className=" xl:w-[1000px] flex flex-row items-center justify-between  w-full pl-[20px] pr-[20px] xl:pl-0 xl:pr-0 "

        //className="w-full flex flex-row items-center justify-between"
      >


        <div className=" flex flex-row items-center justify-center gap-[20px] text-7xs text-white  ">
          <motion.div
            className="box"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/">
              
              {/*
              <LogoIcon carDimensions={logo} />
              */}

              <img
                //className="relative w-[199.5px] h-[35.3px]"
                //className="relative w-[150px]"
                className="relative w-20"
                alt=""
                src={logo}
              />

            </Link>
          </motion.div>
        </div>



        <div className=" hidden xl:flex flex-row items-center justify-center">


        <motion.div
          className="box"
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href="/usermain/feeds"
            ///style={{ textDecoration: 'none' }}
        
            className=" w-[70px] xl:w-[100px] h-14 flex flex-row items-center justify-start"
            style={frameDivStyle  }
          >

            <div className="flex-1 relative font-extrabold" style={div1Style}>
                구매주문            
            </div>

          </Link>
          </motion.div>

          {/*
          <motion.div
            className="box"
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
          <Link
            href="/usermain/feeds/statistics"
            className=" w-[70px] xl:w-[100px] h-14 flex flex-row items-center justify-start"
            style={frameDiv1Style}
          >
            <div className="flex-1 relative font-extrabold" style={div2Style}>
                통계
            </div>
          </Link>
          </motion.div>
          */}

          <motion.div
            className="box"
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
          <Link
            href="/usermain/boards"
            className=" w-[70px] xl:w-[100px] h-14 flex flex-row items-center justify-start"
            style={frameDiv2Style}
          >
            <div className="flex-1 relative font-extrabold" style={div3Style}>
              게시판
            </div>
          </Link>
          </motion.div>

          {/*
          <motion.div
            className="box"
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
          <Link
            href="/usermain/survey/result"
            className=" w-[70px] xl:w-[100px] h-14 flex flex-row items-center justify-start"
            style={frameDiv5Style}
          >

            <div className="flex-1 relative font-extrabold" style={div4Style}>

                설문

            </div>
          </Link>
          </motion.div>
          */}



          <motion.div
            className="box"
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              //href="https://sage-tuberose-d50.notion.site/98b26c7fd5da42c3ad802b1e41005cd2?v=04d931e270a64c869d25f4326a6f3122"
              href="#"

              // hover 시 border-bottom: 2px solid #212121;

              className=" w-[70px] xl:w-[100px] h-14 flex flex-row items-center justify-start

              "
              //style={frameDiv3Style}
            >
              <div className="flex-1 relative font-extrabold" style={aboutStyle}>
                  About
              </div>
            </Link>
          </motion.div>


        </div>


        {/* 로그인 전 loading animation */}


        {/* session is valid, but user is not registered in DB */}
        {/* 로그인 후 최초 접속 시, DB에 유저 정보가 없을 경우 */}
        {/* guide user to profile edit page */}

        {
          //session && !session?.user?.email ? (
          false ? (
              
              <div className="flex flex-row items-center justify-center gap-[20px] text-7xs text-white">
                <span className="text-white text-sm  ">
                회원가입 중...
                </span>
                <Link href="/usermain/user/profile-edit">
                  
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white " />
                </Link>
              </div>
    
          ) : (
            <>




        {session && loading ? (
            
            <div className="flex flex-row items-center justify-center gap-[20px] text-7xs text-white">
              
              
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white " />
              


            </div>
  
        ) : (
 


        <div className="flex">


          {session?.user && userId && !session?.user?.email?.includes('@cryptoss.beauty')
          ? (

            <div className="flex flex-row items-center justify-center gap-[5px]  xl:gap-[20px] text-7xs text-white">

              <Link
                href={`/usermain/notification`}
                className="relative w-6 h-6 ">
                <Image
                  width="24"
                  height="24"
                  className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                  alt=""
                  src="/usermain/images/frame.svg"
                />
                
                {notificationCount > 0 && (
                  <>
                    <div className="absolute top-[0px] right-[0px] rounded-[50%] bg-red box-border w-[13px] h-[13px] border-[1px] border-solid border-white" />

                    <div className="absolute top-[-15%] left-[66%] font-extrabold">
                      {notificationCount}
                    </div>
                  </>
                )}

                
              </Link>
              


              <motion.div
                className="box"
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  className="hidden  xl:flex  rounded-81xl  flex-row items-center justify-start py-3 px-6 text-sm text-dark border-[1px] border-solid border-grey-6"
                  style={frameDiv3Style}
                  
                  onClick={() =>

                    //usermain/user/profile-edit/53897
                    //alert (userId)
                    ///window.location.href = `/usermain/user/profile-edit/${userId}`

                    ///window.location.href = `/usermain/user/mypage`

                    router.push(routes.usermain.myPage)
                    
                  
                  }
                  

                >
                  <div className="relative font-extrabold" style={div5Style}>
                    마이페이지
                  </div>
                </button>

              </motion.div>

          


              {/* 로그아웃 */}
              <motion.div
                className="box"
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >

                  {

                    (session?.user?.email?.includes('@cryptoss.beauty') === true) ? (
                      <button
                        onClick={() => signOut({
                          callbackUrl: '/signin'
                        })}
                        className="flex  rounded-81xl  flex-row items-center justify-start py-3 px-6 text-sm text-dark border-[1px] border-solid border-grey-6"
                        style={frameDiv3Style}
                      >
                        <div className="relative font-extrabold text-xs xl:text-sm " style={div6Style}>
                          로그아웃
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => signOut({
                          callbackUrl: '/usermain/user/login'
                        })}
                        className="flex  rounded-81xl  flex-row items-center justify-start py-3 px-6 text-sm text-dark border-[1px] border-solid border-grey-6"
                        style={frameDiv3Style}
                      >
                        <div className="relative font-extrabold text-xs xl:text-sm " style={div6Style}>
                          로그아웃
                        </div>
                      </button>
                    )

                  }



              </motion.div>

            </div>


          ) : (

            <>

           

            <motion.div
              className="box"
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href="/usermain/user/login"
                className=" no-underline rounded-81xl flex flex-row items-center justify-start py-3 px-6 text-sm border-[1px] border-solid border-grey-6"
                style={frameDiv4Style}
              >
                <div className="relative font-extrabold" style={div6Style}>
                  로그인
                </div>
              </Link>
            </motion.div>

            


            </>

          )}

        </div>

        )}


        </>

        )}


      </div>
    </div>



    </div>

  );
};

export default Top1;
