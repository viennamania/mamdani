import type { NextPage } from "next";

import Image from "next/image";

import { use, useEffect, useState } from "react";

import Link from "next/link";
import { de, ro } from "@faker-js/faker";

import { useSession, signOut } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import { routes } from "@/config/routes";



const ProfileForm: NextPage = () => {


  const { data: session, status } = useSession();

  const router = useRouter();

  const [user, setUser] = useState(null) as any;

  const [loadingUser, setLoadingUser] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);


  useEffect(() => {

    const getUser = async () => {
      setLoadingUser(true);
      try {
        //setUser(null);
        setError(null);
        const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);

        ////console.log('ProfileEditPage res: ', res);

        if (res.status === 200) {

          const json = await res?.json() as any;

          //console.log('ProfileEditPage json.data: ', json.data);

          setUser(json.data);

        }
        else {
          
        }

      
      } catch (e) {
        ////setError(e);
      }
      setLoadingUser(false);
    }

    getUser();

  }, [ session?.user?.email ]);







  const [attendanceCount, setAttendanceCount] = useState(0);

  useEffect(() => {

    const getAttendanceCount = async () => {
      setLoading(true);
      try {
        //setUser(null);
        setError(null);
        const res = await fetch(`/api/doingdoit/user/getAttendanceCountByUserId?_userId=${user?.id}`);

        if (res.status === 200) {

          const json = await res?.json() as any;

          setAttendanceCount(json.data);

        }
        else {
          
        }

      
      } catch (e) {
        ////setError(e);
      }
      setLoading(false);
    }

    getAttendanceCount();

  }, [ user?.id ]);




  const [feedCount, setFeedCount] = useState(0);

  useEffect(() => {

    const getFeedCount = async () => {
      setLoading(true);
      try {
        //setUser(null);
        setError(null);
        const res = await fetch(`/api/doingdoit/feed/getFeedCountByEmail?_email=${user?.email}`);

        if (res.status === 200) {

          const json = await res?.json() as any;

          setFeedCount(json.data);

        }
        else {
          
        }

      
      } catch (e) {
        ////setError(e);
      }
      setLoading(false);
    }

    getFeedCount();

  }, [ user?.email ]);





  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {

    const getCommentCount = async () => {
      setLoading(true);
      try {
        //setUser(null);
        setError(null);
        const res = await fetch(`/api/doingdoit/board/getCommentCountByUserId?_userId=${user?.id}`);

        if (res.status === 200) {

          const json = await res?.json() as any;

          ///console.log('ProfileEditPage getCommentCountByEmail json.data: ', json.data);

          setCommentCount(json.data);

        }
        else {
          
        }

      
      } catch (e) {
        ////setError(e);
      }
      setLoading(false);
    }

    getCommentCount();

  }, [ user?.id ]);




  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {

    const getLikeCount = async () => {
      setLoading(true);
      try {
        //setUser(null);
        setError(null);
        const res = await fetch(`/api/doingdoit/feed/getLikeCountByUserId?_userId=${user?.id}`);

        if (res.status === 200) {

          const json = await res?.json() as any;

 
          // get board like count
          const res2 = await fetch(`/api/doingdoit/board/getLikeCountByUserId?_userId=${user?.id}`);

          if (res2.status === 200) {

            const json2 = await res2?.json() as any;


            setLikeCount(json.data + json2.data);

          }
          else {
            
          }


        }
        else {
          
        }

      
      } catch (e) {
        ////setError(e);
      }
      setLoading(false);
    }

    getLikeCount();

  }, [ user?.id ]);


  // total point

  const [totalPoint, setTotalPoint] = useState(0);
  const [loadingPoint, setLoadingPoint] = useState(false);

  useEffect(() => {
      
      const getTotalPoint = async () => {

        setLoadingPoint(true);
        try {
          //setUser(null);
          setError(null);



          const res = await fetch(`/api/doingdoit/point/getTotalPointByUserId?_userId=${user?.id}`);
  
          if (res.status === 200) {
  
            const json = await res?.json() as any;
  
            ///console.log('ProfileEditPage getCommentCountByEmail json.data: ', json.data);
  
            setTotalPoint(json.data);
  
          }
          else {
            
          }
  
        
        } catch (e) {
          ////setError(e);
        }
        setLoadingPoint(false);
      }
  
      getTotalPoint();
  
    }, [ user?.id ]);



  const [surveyResult, setSurveyResult] = useState(null) as any;

  const [characterName, setCharacterName] = useState(null) as any;
  const [characterHashtag, setCharacterHashtag] = useState(null) as any;

  useEffect(() => {

    const getSurveyResult = async () => {
     
      try {
        //setUser(null);
        setError(null);
        ///const res = await fetch(`/api/doingdoit/survey/getSurveyResultByEmail?_email=${session?.user?.email}`);

        const res = await fetch(`/api/doingdoit/survey/resultByUserId?_userId=${user?.id}`);

        ////console.log('ProfileEditPage res: ', res);

        if (res.status === 200) {

          const json = await res?.json() as any;

          ///console.log('ProfileEditPage json.data: ', json?.data);

       
          setSurveyResult(
            JSON.parse(decodeURIComponent(json?.data?.surveyResult))
          )

          const resultData = JSON.parse(decodeURIComponent(json?.data?.surveyResult)) as any;

          ////console.log('ProfileEditPage resultData: ', resultData);


          setCharacterName(resultData?.character?.[0]?.name);
          setCharacterHashtag(resultData?.character?.[0]?.hashtag);


        }
        else {
          
        }

      
      } catch (e) {
        ////setError(e);
      }
     
    }

    getSurveyResult();

  }, [ user?.id ]);




  return (


    <div className="self-stretch bg-white flex flex-col items-center justify-end gap-[40px] text-left text-xl text-dark1 font-h3">
      <div className="self-stretch flex flex-col items-start justify-center gap-[20px]">
        <div className="self-stretch flex flex-row items-center justify-center gap-[8px]">
          <div className="flex-1 relative font-extrabold">프로필</div>
          
          
          <Link

            href={routes.usermain.myProfileEdit}

            className="flex flex-row items-center justify-center gap-[4px] text-sm">

            <div className="relative">프로필 수정</div>

            <Image
              width="24"
              height="24"
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/feather-icons--chevronright.svg"
            />

          </Link>


        </div>

        {/*
        <div className="self-stretch rounded-xl flex flex-col items-start justify-center p-5 gap-[20px] text-base border-[1px] border-solid border-grey-e">


          {loadingUser ? (
            <div className="self-stretch relative font-extrabold">
              로딩중...
            </div>
          ) : (
            <>
            {surveyResult ? (


              <>
                <div className="self-stretch relative font-extrabold">
                  나는 {characterName}
                </div>
                <div className="self-stretch rounded bg-whitesmoke flex flex-row items-center justify-start py-3  gap-[6px] xl:gap-[12px] text-xs text-grey-6">

                  {characterHashtag?.map((item: any, index: number) => (
                    <div key={index} className="relative">#{item}</div>
                  ))}

                </div>
              </>
            ) : (
              <div className="self-stretch relative font-extrabold flex flex-col items-start justify-center gap-2">

                <div className="relative">
                  {user?.nickname}님의 맞춤서비스 이용을 위해 설문을 완료해 주세요.
                </div>
                <Link

                  href={routes.usermain.surveyQuestion}

                  className="flex flex-row items-center justify-center gap-[4px] text-sm">

                  <div className="relative">나의 투자습관을 알아보세요!</div>

                  <Image
                    width="24"
                    height="24"
                    className="relative w-4 h-4 overflow-hidden shrink-0"
                    alt=""
                    src="/usermain/images/feather-icons--chevronright.svg"
                  />
                </Link>

              </div>
            )}
          </>
          )}

        </div>
        */}

      </div>


      <div className="self-stretch flex flex-col items-start justify-center gap-[20px]">
        
        <div className="self-stretch flex flex-row items-center justify-center gap-[8px]">

          <div className="flex-1 relative font-extrabold">나의 거래 현황</div>

          <div className="flex flex-col items-center justify-center gap-[4px] text-sm gap-y-5">
            <Link
              href={'/usermain/orders'}
              className="flex flex-row items-center justify-center gap-[4px] text-sm">
              <div className="relative">판매 내역보기</div>
              <Image
                width="24"
                height="24"
                className="relative w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/feather-icons--chevronright.svg"
              />
            </Link>
            <Link
              href={'/usermain/buyorders'}
              className="flex flex-row items-center justify-center gap-[4px] text-sm">
              <div className="relative">구매 내역보기</div>
              <Image
                width="24"
                height="24"
                className="relative w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/feather-icons--chevronright.svg"
              />
            </Link>
          </div>

        </div>

      </div>



      <div className="self-stretch flex flex-col items-start justify-center gap-[20px]">
        
        <div className="self-stretch flex flex-row items-center justify-center gap-[8px]">
          <div className="flex-1 relative font-extrabold">나의 활동 현황</div>

          <Link
            href={'/usermain/points'}
            className="flex flex-row items-center justify-center gap-[4px] text-sm">
            <div className="relative">포인트 내역보기</div>
            <Image
              width="24"
              height="24"
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/feather-icons--chevronright.svg"
            />
          </Link>

        </div>
        
        
        <div className="self-stretch flex flex-col xl:grid xl:grid-cols-2 items-center justify-center gap-[20px] text-sm text-grey-6">
          
          <div className="self-stretch rounded-xl flex flex-col items-center justify-center p-5 gap-[12px] border-[1px] border-solid border-grey-e">
            <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">
              <Image
                width="24"
                height="24"
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/logoutboxrline.svg"
              />
              <div className="relative flex items-center w-20 shrink-0">
                출석
              </div>
              <div className="flex-1 relative font-extrabold text-dark1 text-right">
                {attendanceCount}회
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">
              <Image
                width="24"
                height="24"
               className="relative w-5 h-5"
               alt=""
               src="/usermain/images/annotation.svg" />
              <div className="relative flex items-center w-20 shrink-0">
                구매주문
              </div>
              <div className="flex-1 relative font-extrabold text-dark1 text-right">
                {feedCount}건
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">
              <Image
                width="24"
                height="24"
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/message3line.svg"
              />
              <div className="relative flex items-center w-20 shrink-0">
                댓글
              </div>
              <div className="flex-1 relative font-extrabold text-dark1 text-right">
                {commentCount}건
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">

              <Image
                width="24"
                height="24"
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                ///src="/usermain/images/heart3line.svg"

                src={` ${likeCount > 0 ? "/usermain/images/heart3fill.svg" : "/usermain/images/heart3line.svg"}`}

              />

              <div className="relative flex items-center w-20 shrink-0">
                좋아요
              </div>
              <div className="flex-1 relative font-extrabold text-dark1 text-right">
                {likeCount}건
              </div>
            </div>
          </div>


          <div className="self-stretch rounded-xl box-border h-[180px] flex flex-col items-center justify-center p-5 text-center border-[1px] border-solid border-grey-e">
            <div className="self-stretch flex flex-col items-center justify-center gap-[12px]">
              <div className="self-stretch flex flex-col items-center justify-center gap-[4px]">
                <Image
                  width="24"
                  height="24"
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/coinline.svg"
                />
                <div className="self-stretch relative">포인트</div>
              </div>

              {loadingPoint ? (
                <div className="self-stretch relative font-extrabold">
                  로딩중...
                </div>
              ) : (
                <div className="self-stretch relative font-extrabold text-13xl text-dark1">
                  {totalPoint}P
                </div>
              )}
             

            </div>
          </div>

        </div>

      </div>





    </div>


  );
};

export default ProfileForm;
