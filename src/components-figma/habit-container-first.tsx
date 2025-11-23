import type { NextPage } from "next";

import Link from "next/link";


import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { tr } from "@faker-js/faker";





const HabitContainer: NextPage = () => {

  const { data: session, status } = useSession();


  // fetch feeds data

  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(false);


    /* fetch user data from an API
  /api/doingdoit/user/getUser
  */

  const [loadingUser, setLoadingUser] = useState(true);

  const [userData, setUserData] = useState({
    id: "",
    email: "",
    nickname: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }

      setLoadingUser(true);

      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      

      const data = json as any;

      console.log("user data ====",data?.data);

      
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }

      setLoadingUser(false);
    };
    fetchData();
  } , [session?.user?.email]);

  
  if (!session?.user?.email) {

    window.location.href = "/usermain/user/login";
    return <></>;
  }


  return (
    <div className="xl:w-[1000px] flex flex-col items-center justify-start text-left text-21xl text-dark font-jalnan">
      <div className="self-stretch flex flex-col items-center justify-end p-20 gap-[60px]">
         
        {loadingUser || !userData?.nickname  ?
        
        <div className="flex flex-row items-center justify-center gap-[10px]">
          <div className="w-3 h-3 bg-dark rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-dark rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-dark rounded-full animate-bounce" />
        </div>

        : userData?.nickname && userData?.nickname !== "" ?
        <div className="flex flex-col items-center justify-end gap-[20px]">

          <div className="self-stretch relative flex flex-col  text-xl xl:text-17xl leading-6 xl:leading-10 ">

           
             <span>{userData?.nickname}님의 거래습관</span>
             <span>확인해 보세요.</span>
             
          </div>

          <div className="self-stretch relative text-sm xl:text-xl font-menu-off text-grey-6 text-center">
            {userData?.nickname}님의 맞춤서비스 이용을 위해 설문을 완료해 주세요.
          </div>
        </div>
        :
      
        <div>
          <div className="self-stretch relative text-xl xl:text-5xl font-extrabold text-dark">
            로그인 후 설문을 완료해 주세요.
          </div>
        </div>
        }
        
        
        <div className="  xl:w-[1280px] overflow-hidden flex flex-row items-center justify-center text-center text-base text-grey-9">

          <div className="relative w-[300px] h-[300px]  xl:w-[440px]  xl:h-[440px] overflow-hidden shrink-0">
            
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-white" />

            <div className=" absolute top-[calc(50%_-_172px)] left-[calc(50%_-_100px)]   xl:left-[calc(50%_-_130px)]  flex flex-col items-center justify-center gap-[0px] xl:gap-[32px]">

              
              <img
                className="relative  w-[50px] xl:w-[86.9px] h-40 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/frame-survey.svg"
              />

              <div className="flex flex-col items-center justify-center  xl:gap-[10px]">

                <div className="flex flex-col items-center justify-center gap-[0px]">
                  
                  <div className="relative text-sm ">Waht you sale, waht you are!</div>

                  <div className="mt-3 relative text-xl  xl:text-9xl text-dark">

                    <p className="[margin-block-start:0] [margin-block-end:10px]">

                      먹방으로 나의
                    </p>

                    <p className=" xl:mt-3">세계관을 알아보세요</p>

                  </div>
                  
                </div>

                { !session ? (

                  <Link
                  href="/usermain/user/login"
                  style={{ textDecoration: 'none' }}
                  className="mt-5 rounded-81xl bg-dark flex flex-row items-center justify-center py-3 px-6 text-sm text-white font-menu-off">
                  <div className="relative font-extrabold">
                    로그인 후 시작
                  </div>
                  </Link>

                ) : (
                  <Link
                  href="/usermain/user/survey/question1"
                  style={{ textDecoration: 'none' }}
                  className="mt-5 rounded-81xl bg-dark flex flex-row items-center justify-center py-3 px-6 text-sm text-white font-menu-off">
                  <div className="relative font-extrabold">
                    시작
                  </div>
                </Link>
               
                )}


              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default HabitContainer;
