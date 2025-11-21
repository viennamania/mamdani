'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Bread from "@/components-figma/bread";
import Footer from "@/components-figma/footer";


import Link from "next/link";
import ListDietBar1 from "@/components-figma/list-diet-bar1";
import ListDietBar2 from "@/components-figma/list-diet-bar2";


import { useState, useEffect, use } from "react";

import { useAnimation, motion } from "framer-motion";

import DateCell from '@/components/ui/date-cell';


import Image from "next/image";
import { set } from "lodash";
import { setUser } from "@/lib/api/user";


import { useSession } from 'next-auth/react';

import ReactMarkdown from 'react-markdown';



export default function NoticePage({ params }: any) {

  const { id } = params;

  const [data, setData] = useState(   {   }  );

  const [loading, setLoading] = useState(true);


  const { data: session, status } = useSession();

      /* fetch user data from an API
    /api/doingdoit/user/getUser
  */
    const [userData, setUserData] = useState({
      id: "",
      email: "",
      nickname: "",
      avatar: "",
    });
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
        const json = await res?.json();
  
        //////console.log(json);
  
        const data = json as any;
        
        if (data.data) {
          setUserData(data.data);
        } else {
          //alert(json.message);
        }
      };
      fetchData();
    } , [session?.user?.email]);



  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  
  
  const [createdAt, setCreatedAt] = useState("");
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ tags, setTags ] = useState([]);


  const [ mainImage, setMainImage ] = useState(null);


  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [scrapCount, setScrapCount] = useState(0);

  const [likeYn, setLikeYn] = useState(false);


  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch('/api/doingdoit/notice/getBoardById?_id=' + id);
  
      const json  = await res?.json() as any;
  
     
  
      setData(json.data);

      setUserId(json.data.userId);

      setUserNickname(json.data.userNickname);
      setUserAvatar(json.data.userAvatar);
      setCreatedAt(json.data.createdAt);


      setTitle(json.data.title);
      setContent(json.data.content);
      setTags(json.data.tags);
      setMainImage(json.data.images[0]);


      setLikeCount(json.data.likeCount || 0);
      setCommentCount(json.data.commentCount || 0);
      setViewCount(json.data.viewCount || 0);
      setScrapCount(json.data.scrapCount || 0);

      setLikeYn(json.data.likeYn || false);


      setLoading(false);
  
    };
      
      fetchData();
  } ,[ id, ]);


  {/* fetch previous and next board data */}
  const [prevBoard, setPrevBoard] = useState(
    {
      id: "",
      title: "",
    }
  );
  const [nextBoard, setNextBoard] = useState(
    {
      id: "",
      title: "",
    }
  );

  useEffect(() => {
      
      const fetchData = async () => {
        setLoading(true);
    
        const res = await fetch('/api/doingdoit/notice/getPrevBoardById?_id=' + id);
    
        const json  = await res?.json() as any;
    
        setPrevBoard(json.data);
  
        setLoading(false);
    
      };
        
        fetchData();
  } ,[ id, ]);


  useEffect(() => {
      
    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch('/api/doingdoit/notice/getNextBoardById?_id=' + id);
  
      const json  = await res?.json() as any;
  
      setNextBoard(json.data);

      setLoading(false);
  
    };
      
      fetchData();

  } ,[ id, ]);
  

  

  const like = () => {

    setLikeCount(likeCount + 1);

    // update my like list
    const res = fetch(`/api/doingdoit/notice/like?_id=${id}&_userId=${userData?.id}&_userNickname=${userData?.nickname}&_userAvatar=${userData?.avatar}&_userEmail=${userData?.email}`);

  }



  return (

    <>

        <div className="bg-dark felx sticky top-0 z-50 ">
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
                frameDivBorderBottom2="2px solid #212121"
                frameDivBoxSizing2="border-box"
                divColor2="#212121"
                divColor3="#212121"
                aboutColor="#212121"
                frameDivBorder="1px solid #666"
                divColor4="#212121"
                frameDivBorder1="1px solid #666"
                divColor5="#212121"
              />
      </div>



    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-left text-xs text-dark font-menu-off">
      <div className=" self-stretch flex flex-col items-center justify-start">

        <div className=" self-stretch xl:bg-background flex flex-col items-center justify-start py-5 xl:py-10 ">


          <div className=" w-full xl:w-[1000px] flex flex-col items-center justify-start">


            <div className="self-stretch bg-white flex flex-col items-start justify-end p-5 xl:p-10 relative gap-[20px] xl:gap-[40px]">

              {/* history back */}
              <div
                className="self-stretch flex flex-row items-center justify-center pt-0 px-0 pb-5 gap-[12px] z-[0] text-left text-sm text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
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


            {/* loading animaiton */}

            { loading ? (

              <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
                
                <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

                </div>
              </div>

            ) : (
            <>

              {/*
              <div className=" 
                self-stretch flex flex-col items-center justify-end gap-[20px] z-[1]">


                <div className="
                  self-stretch flex flex-col items-center justify-end gap-[20px]">

                  <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                    
                    <div className="grid grid-cols-2 gap-[20px] w-full">

                    <div className="self-stretch flex flex-col items-start justify-start gap-[8px] xl:gap-0">


                    <div className="self-stretch flex flex-row items-center justify-start gap-[8px] ">



                      <Image
                        className="relative w-6 h-6 rounded-full "
                        src={userAvatar || "/usermain/images/avatar.svg"}
                        alt=""
                        width={24}
                        height={24}
                        style = {{ objectFit: 'cover' }}
                      />

                      <div className="flex flex-row items-center justify-center gap-2 ">
                        
                        <span className="font-extrabold flex  ">{userNickname}</span>
                        
                        <span className="hidden xl:block text-grey-9">
                            <DateCell
                              date={ new Date(createdAt) }
                              className=""
                              timeClassName=""
                              dateClassName=""
                              dateFormat="YYYY. MM. DD"
                              timeFormat="HH:mm"
                            />
                        </span>

                      </div>

                    </div>



                    </div>



   

                    </div>



                  </div>


                </div>


              </div>
              */}



              <div className="self-stretch flex flex-col items-start justify-end gap-[12px] z-[2] text-base">


                <div className=" break-words  self-stretch relative font-bold text-xl xl:text-2xl leading-[32px]">
                  {title}
                </div>

                                        
  
                <span className=" text-xs text-grey-9">
                    <DateCell
                      date={ new Date(createdAt) }
                      className=""
                      timeClassName=""
                      dateClassName=""
                      dateFormat="YYYY. MM. DD"
                      timeFormat="HH:mm"
                    />
                </span>


                <div
                  className="self-stretch flex flex-row items-center justify-center pt-0 px-0 pb-5 gap-[12px] z-[0] text-left text-sm text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
                >
                </div>


                <div className="mt-5 w-full flex items-center justify-center   ">
                  {/* feed image fit main image    */
                  mainImage && (
                    <Image
                      ////className="self-stretch relative max-w-full overflow-hidden  shrink-0 object-cover"
                      className=" w-full rounded-sm "
                      src={mainImage}
                      alt=""
                      width={560}
                      height={560}

                      style={{
                        //objectFit: "contain",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  )}

                </div>


                {/* tags */}
                <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">
                  {tags?.map((tag: any) => (
                    <div
                      key={tag}
                      className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                    >
                        {tag}
                    </div>
                  ))}
                </div>


                <div className="mt-5 self-stretch relative leading-[24px]">
                  

                  {
                    // if feedTitle is more than 20 characters, then show only 20 characters and add "..."
                    //feedtitle && feedTitle?.replace(/(<([^>]+)>)/gi, "").length > 20 ? feedTitle?.replace(/(<([^>]+)>)/gi, "").substring(0, 20) + "..." :
                    //feedTitle?.replace(/(<([^>]+)>)/gi, "")

                    // html 태그가 포함된 문자열을 출력할 때는 dangerouslySetInnerHTML 사용


                    <div dangerouslySetInnerHTML={{ __html: content as any }} />

                    // iframe 태그가 포함된 문자열을 출력해야한다면, iframe 태그를 제외한 나머지 문자열을 출력하고, iframe 태그만 따로 출력한다.

                    // content is html

                    // iframe 태그가 포함되어 있으면 iframe 이 보이게 해야한다.
                    /*
                    <iframe src="https://www.youtube.com/embed/PLp9pLaqAQbY2vUjGEVgz8yAOdJlyy3AQb" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    */

                 


                    

                  






                  

                    // content is markdown
                    //<ReactMarkdown>{content}</ReactMarkdown>
                  }
                </div>





                <div className="self-stretch bg-white flex flex-col items-center justify-start text-xs text-grey-9">


                  {/*
                  <Link
                      href="/usermain/boards/notice-details"
                      className=" no-underline self-stretch flex flex-row items-center justify-center py-5 px-0 gap-[12px] border-b-[1px] border-solid border-grey-d"
                  >
                    <div className="relative">이전글</div>
                    <div className="flex-1 relative text-sm text-dark">
                      공지사항입니다.
                    </div>
                  </Link>


                  <Link
                      href="/usermain/boards/notice-details" 
                      className=" no-underline self-stretch flex flex-row items-center justify-center py-5 px-0 gap-[12px] border-b-[1px] border-solid border-grey-d">
                    <div className="relative">다음글</div>
                    <div className="flex-1 relative text-sm text-dark">
                      공지사항입니다.
                    </div>
                  </Link>
                  */}
                  { prevBoard && (
                    <Link
                      href={`/usermain/boards/notice/${prevBoard?.id}`}
                      className=" no-underline self-stretch flex flex-row items-center justify-center py-5 px-0 gap-[12px] border-b-[1px] border-solid border-grey-d"
                    >
                      <div className="relative">이전글</div>
                      <div className="flex-1 relative text-sm text-dark">
                        {prevBoard?.title}
                      </div>
                    </Link>
                  )}

                  { nextBoard && (
                    <Link
                      href={`/usermain/boards/notice/${nextBoard?.id}`}
                      className=" no-underline self-stretch flex flex-row items-center justify-center py-5 px-0 gap-[12px] border-b-[1px] border-solid border-grey-d"
                    >
                      <div className="relative">다음글</div>
                      <div className="flex-1 relative text-sm text-dark">
                        {nextBoard?.title}
                      </div>
                    </Link>
                  )}

                </div>

                <div className="mt-5 self-stretch flex flex-row items-center justify-center gap-[12px] z-[2] text-base">
                  <Link
                    href="/usermain/boards/notice"
                    className=" no-underline rounded-81xl flex flex-row items-center justify-center py-3 px-8 text-center border-[1px] border-solid border-grey-6">
                    <div className="relative font-extrabold">목록</div>
                  </Link>
                </div>




              </div>



              </>

              )}

            </div>
          </div>
        </div>
      </div>
      <Footer
        footerAlignSelf="stretch"
        footerBorderTop="1px solid #eee"
        footerBoxSizing="border-box"
      />
    </div>


    </>

  );
};


