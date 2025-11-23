'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Bread from "@/components-figma/bread";
import Footer from "@/components-figma/footer";


import Link from "next/link";
import ListDietBar1 from "@/components-figma/list-diet-bar1";
import ListDietBar2 from "@/components-figma/list-diet-bar2";


import { useState, useEffect, useRef, Fragment } from "react";

import { useAnimation, motion } from "framer-motion";

import DateCell from '@/components/ui/date-cell';


import Image from "next/image";
import { create, set } from "lodash";
import { setUser } from "@/lib/api/user";

import { useSession } from 'next-auth/react';


import CommentContainer from "@/components-figma/comment-container";
import List1 from "@/components-figma/list1";


import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';

import {
  defaultValues,
  commentFormSchema,
  CommentFormTypes,
} from '@/utils/validators/doingdoit/create-comment.schema';

import { on } from "events";
import { comment } from "postcss";

import dynamic from 'next/dynamic';
import { setActiveLink } from "react-scroll/modules/mixins/scroller";

const QuillEditor = dynamic(() => import('@/components-figma/ui/quill-editor'), {
  ssr: false,
});


//import { Autocomplete, TextField, Icon, InputAdornment } from "@mui/material";

import toast from "react-hot-toast";

import { classNames } from "uploadthing/client";



import cn from '@/utils/class-names';


import { Form } from '@/components/ui/form';
import { Text, Title } from "@/components/ui/text";
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

import { ActionIcon } from '@/components/ui/action-icon';

import { pageLinks } from './page-links.data';

import { Empty, SearchNotFoundIcon } from '@/components/ui/empty';
import {
  PiArrowRight,
  PiCommand,
  PiFileTextDuotone,
  PiMagnifyingGlassBold,
  PiXBold,
  PiMagnifyingGlass,
} from 'react-icons/pi';



import SearchWidget from '@/components/search/search';

import { Popover } from '@/components/ui/popover';

import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared-doingdoit/delete-popover-user';
import { del } from "@vercel/blob";





function SearchBox({ onClose }: { onClose?: () => void }) {
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState('');

  let menuItemsFiltered = pageLinks;
  if (searchText.length > 0) {
    menuItemsFiltered = pageLinks.filter((item: any) => {
      const label = item.name;
      return (
        label.match(searchText.toLowerCase()) ||
        (label.toLowerCase().match(searchText.toLowerCase()) && label)
      );
    });
  }

  useEffect(() => {
    if (inputRef?.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
    return () => {
      inputRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex items-center px-5 py-4">
        <Input
          variant="flat"
          value={searchText}
          ref={inputRef}
          onChange={(e) => setSearchText(() => e.target.value)}
          placeholder="Search here"
          className="flex-1"
          prefix={
            <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
          }
          suffix={
            searchText && (
              <Button
                size="sm"
                variant="text"
                className="h-auto w-auto px-0"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchText(() => '');
                }}
              >
                Clear
              </Button>
            )
          }
        />
        <ActionIcon
          variant="text"
          size="sm"
          className="ms-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>

      <div className="custom-scrollbar max-h-[60vh] overflow-y-auto border-t border-gray-300 px-2 py-4">
        <>
          {menuItemsFiltered.length === 0 ? (
            <Empty
              className="scale-75"
              image={<SearchNotFoundIcon />}
              text="No Result Found"
              textClassName="text-xl"
            />
          ) : (
            <Title
              as="h6"
              className="mb-5 px-3 font-semibold dark:text-gray-700"
            >
              Quick Page Links
            </Title>
          )}
        </>

        {menuItemsFiltered.map((item, index) => {
          return (
            <Fragment key={item.name + '-' + index}>
              {item?.href ? (
                <Link
                  href={item?.href as string}
                  className="relative my-0.5 flex items-center rounded-lg px-3 py-2 text-sm hover:bg-gray-100 focus:outline-none focus-visible:bg-gray-100 dark:hover:bg-gray-50/50 dark:hover:backdrop-blur-lg"
                >
                  <span className="inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-gray-500">
                    <PiFileTextDuotone className="h-5 w-5" />
                  </span>

                  <span className="ms-3 grid gap-0.5">
                    <span className="font-medium capitalize text-gray-900 dark:text-gray-700">
                      {item.name}
                    </span>
                    <span className="text-gray-500">
                      {item?.href as string}
                    </span>
                  </span>
                </Link>
              ) : (
                <Title
                  as="h6"
                  className={cn(
                    'mb-1 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-500',
                    index !== 0 && 'mt-6 4xl:mt-7'
                  )}
                >
                  {item.name}
                </Title>
              )}
            </Fragment>
          );
        })}
      </div>
    </>
  );
}




export default function BoardPage({ params }: any) {

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

      
      if (!session?.user?.email) {
        return;
      }
      

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

    // image array
    const [boardImages, setBoardImages] = useState([]);

  const [ mainImage, setMainImage ] = useState(null);

  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [scrapCount, setScrapCount] = useState(0);

  const [likeYn, setLikeYn] = useState(false);



  const [deleteCommentId, setDeleteCommentId] = useState("");





  useEffect(() => {

    const fetchData = async () => {


      if (!id) {
        return;
      }

      setLoading(true);
  
      const res = await fetch (`/api/doingdoit/board/getBoardById?_id=${id}&_userId=${userData?.id}`);
      

  
      const json  = await res?.json() as any;
  

      ///console.log('json.data: ', json.data);

 
  
      setData(json.data);

      setUserId(json.data.userId);

      setUserNickname(json.data.userNickname);
      setUserAvatar(json.data.userAvatar);
      setCreatedAt(json.data.createdAt);


      setTitle(json.data.title);
      setContent(json.data.content);
      setTags(json.data.tags);



      setBoardImages(json.data.images);
      
      setMainImage(json.data.images?.[0]);


      setLikeCount(json.data.likeCount || 0);
      /////setCommentCount(json.data.commentCount || 0);
      setViewCount(json.data.viewCount || 0);
      setScrapCount(json.data.scrapCount || 0);

      setLikeYn(json.data.likeYn || false);

     

      setLoading(false);
  
    };
    
      
    fetchData();

  } ,[ id, userData?.id ]);


 



  const [comments, setComments] = useState([] as any);


  useEffect(() => {
      
    const fetchData = async () => {

      if (!id) {
        return;
      }
      
      setLoading(true);
  
      const res = await fetch (`/api/doingdoit/board/getCommentsByBoardId?_boardId=${id}`);
          
      const json  = await res?.json() as any;


      ///console.log('comments json.data: ', json.data);


      setComments(json?.data);

      setCommentCount(json?.data?.length);

      setLoading(false);
  
    };
      
    fetchData();

  } ,[ id ]);

  

  const like = async () => {

    ///setLikeCount(likeCount + 1);

    // update my like list
    const res =  fetch(`/api/doingdoit/board/like?_id=${id}&_userId=${userData?.id}&_userNickname=${userData?.nickname}&_userAvatar=${userData?.avatar}&_userEmail=${userData?.email}`);

    setLikeYn(true);
    setLikeCount(likeCount + 1);

    toast.success("좋아요 되었습니다.");
  }


  const unlike = async () => {

    // update my like list
    const res = fetch(`/api/doingdoit/board/unlike?_id=${id}&_userId=${userData?.id}&_userNickname=${userData?.nickname}&_userAvatar=${userData?.avatar}&_userEmail=${userData?.email}`);

    setLikeYn(false);
    setLikeCount(likeCount - 1);

    toast.success("좋아요가 취소되었습니다.");
  }


  
  
  const [loadingComment, setLoadingComment] = useState(false);

  const createComment = async (commentContent: string) => {

    setLoadingComment(true);

    const params = {
      boardId: id,
      userId: userData?.id,
      userNickname: userData?.nickname,
      userAvatar: userData?.avatar,
      userEmail: userData?.email,
      content: commentContent,
    };


    const res = await fetch(`/api/doingdoit/board/createComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });


    const json = await res?.json();

    const data = json as any;

    const resComments = await fetch (`/api/doingdoit/board/getCommentsByBoardId?_boardId=${id}`);
        

    const jsonComments  = await resComments?.json() as any;


    setComments(jsonComments?.data);


    setCommentCount(jsonComments?.data?.length);


    setLoadingComment(false);


  };



  const [loadingReply, setLoadingReply] = useState(false);

  const createReply = async (commentId: string, replyContent: string) => {
      
      setLoadingReply(true);
  
      const params = {
        boardId: id,
        commentId: commentId,
        userId: userData?.id,
        userNickname: userData?.nickname,
        userAvatar: userData?.avatar,
        userEmail: userData?.email,
        content: replyContent,
      };

      const res = await fetch(`/api/doingdoit/board/createReply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });


      const json = await res?.json();

      const data = json as any;


      // update replies
      // getRepliesByCommentId
      const resReplies = await fetch (`/api/doingdoit/board/getRepliesByCommentId?_commentId=${commentId}`);

      const jsonReplies  = await resReplies?.json() as any;

      const replies = jsonReplies?.data;



      //console.log('replies: ', replies);

      // update replies of comment
      /*
      const newComments = comments?.map((comment: any) => {
        if (comment?.id == commentId) {
          return {
            ...comment,
            replies: replies,
          }
        } else {
          return comment;
        }
      });


      setComments(
        newComments
      );
      */

      // update replies of comment
      const newComments = comments?.map((comment: any) => {
        if (comment?.id == commentId) {
          return {
            ...comment,
            replies: replies,
          }
        } else {
          return comment;
        }
      });


      setComments(
        newComments
      );



      //console.log('newComments: ', newComments);

      ///setComments(newComments || []);




      setLoadingReply(false);

    };









  const [replyOpenArray, setReplyOpenArray] = useState([
    // commentId, replyOpen
    // ["commentId", true],

    //{ commentId: "commentId", replyOpen: false}


  ] as
    {
      commentId: string;
      replyOpen: boolean;
    }[]
  );

  ///console.log('replyOpenArray: ', replyOpenArray);
  


  // reply open array init
  // replayOpen set false for each comment

  useEffect(() => {

    setReplyOpenArray([]);


    comments?.map((comment: any) => {

      setReplyOpenArray(replyOpenArray => [...replyOpenArray, { commentId: comment?.id, replyOpen: false }]);

    })

  } , [comments]);




  ////console.log('replyOpenArray: ', replyOpenArray);

  
  const [open, setOpen] = useState(false);
  const modalData = {
    title: '',
    description: '삭제하시겠습니까?',
    data: [],
  };    

  
  const onSubmit: SubmitHandler<CommentFormTypes> = (data) => {

    console.log('onSubmit data: ', data);

    const { commentContent } = data;

    const { replyContent } = data;



    // if replyOpenArray is empty, then commentContent is comment
    // if replyOpenArray is not empty, then replyContent is reply

    if (replyOpenArray.length > 0 && replyOpenArray.filter((replyOpen: any) => replyOpen.replyOpen == true).length > 0) {
        
        // reply
  
        createReply( replyOpenArray.filter((replyOpen: any) => replyOpen.replyOpen == true)[0].commentId, replyContent as string);

        // content reset
        ///reset({ replyContent: '' });

        return;
    }




    // if content is empty, then toast error message

    if (!commentContent
      || commentContent === ""
      || commentContent === null
      || commentContent === undefined
      || commentContent === "undefined"
      || commentContent === "<p><br></p>"
      
      ) {
      ////alert("댓글을 입력해주세요.");

      toast.error(<Text as="b">댓글을 입력해주세요.</Text>);

      return;
    }

    createComment(commentContent as string);

    // content reset
    ///reset({ content: '' });

    


    /*
    const { title } = data;
    const { content } = data;
    const { hidden } = data;
    const hiddenYn = hidden === true ? 'Y' : 'N';

    create(title as string, content as string, tagList as any, hiddenYn as string);
    */

 
    /*
    toast.success(<Text as="b">Successfully added!</Text>);
   

    console.log('Profile settings data ->', {
      ...data,
    });
    */
    

  };

        





  return (
    <Form<CommentFormTypes>
      validationSchema={commentFormSchema}
      // resetValues={reset}
      
      onSubmit={onSubmit}

      className='@container'
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >


      {({ register, control, setValue, getValues, formState: { errors } }) => {




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
                    //history.back();

                    window.location.href = "/usermain/boards";
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

            { false ? (

              <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
                
                <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">

                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />

                </div>
              </div>

            ) : (
            <>

              <div className=" 
                self-stretch flex flex-col items-center justify-end gap-[20px] z-[1]">


                <div className=" self-stretch flex flex-col items-center justify-end gap-[20px]">

                  <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                    
                    <div className="grid grid-cols-2 gap-[20px] w-full">

                    <div className="self-stretch flex flex-col items-start justify-start gap-[8px] xl:gap-0">


                    <div className="self-stretch flex flex-row items-center justify-start gap-[8px] ">



                      <Image
                        className="relative w-6 h-6 rounded-full "
                        src={userAvatar || "https://cryptoss.beauty/usermain/images/avatar.svg"}
                        alt=""
                        width={24}
                        height={24}
                        style = {{ objectFit: 'cover' }}
                      />

                      <div className="flex flex-row items-center justify-center gap-2 ">
                        
                        <span className="font-extrabold flex  ">{userNickname}</span>
                        
                        <span className="hidden xl:block text-grey-9">
                          {createdAt && (
                          
                            <DateCell
                              date={ new Date(createdAt) }
                              className=""
                              timeClassName=""
                              dateClassName=""
                              dateFormat="YYYY. MM. DD"
                              timeFormat="HH:mm"
                            />
                          )}
                        </span>

                      </div>

                    </div>



                    </div>


                      <div className=" flex flex-row items-center justify-end gap-[3px]   xl:gap-[20px] text-grey-6">

                        
                        <div className="flex flex-row items-center justify-start gap-[4px]">
                
                          {!session?.user?.email ? (
                            <motion.img
                              className="relative w-6 h-6 overflow-hidden shrink-0"
                              alt=""
                              src="/usermain/images/heart3line.svg"
                              whileHover={{ scale: 1.3 }}
                              whileTap={{ scale: 0.8 }}
                            />
                          ) : (

    
                            <button
                              type="button"

                          

                              onClick={ () => {
                                
                                if (likeYn) {
                                  unlike()
                                } else {
                                  like()
                                }
                              
                              } }
                            >
                              {likeYn ? (
                                <motion.img
                                  className="relative w-6 h-6 overflow-hidden shrink-0"
                                  alt=""
                                  src="/usermain/images/heart3fill.svg"
                                  whileHover={{ scale: 1.3 }}
                                  whileTap={{ scale: 0.8 }}
                                />
                              ) : (
                                <motion.img
                                  className="relative w-6 h-6 overflow-hidden shrink-0"
                                  alt=""
                                  src="/usermain/images/heart3line.svg"
                                  whileHover={{ scale: 1.3 }}
                                  whileTap={{ scale: 0.8 }}
                                />
                              ) }
                          

                            </button>

                          )}

                          <div className="relative">
                            {likeCount}
                          </div>
                        </div>



                        {/*
                        <img
                          className="relative w-6 h-6 overflow-hidden shrink-0"
                          alt=""
                          src="/usermain/images/more2line.svg"
                        />
                        */}


                        {/* if my board, then show popup modal with edit and delete button */}

                        { userData?.id == userId && (
                          <Popover
                            className="relative"
                            content={() => (
                              <div className="flex flex-col gap-2 w-20  items-center justify-center " >
                                
                                {/*
                                <ActionIcon
                                  variant="text"
                                  size="sm"
                                  className="hover:text-gray-700"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </ActionIcon>
                                */}

                                <Link
                                  href={`/usermain/boards/${id}/edit`}
                                  className="flex flex-row items-center justify-start gap-[4px]">
                                  수정하기
                                </Link>

                                <DeletePopover
                                  title={`삭제하기`}
                                  description={`삭제하시겠습니까?`}

                                  onDelete={async () => {
                                    const res = await fetch(`/api/doingdoit/board/deleteOne?id=${id}&_userId=${userData?.id}`);
                                    const json = await res?.json();

                                    const data = json as any;

                                    if (data?.data) {
                                      //alert("삭제되었습니다.");

                                      toast.success("삭제되었습니다.");

                                      history.back();
                                    } else {
                                      //alert(json.message);
                                    }
                                  }}


                                />

                              </div>
                            )}
                          >
                            <ActionIcon
                              variant="text"
                              size="sm"
                              className="hover:text-gray-700"
                            >
                              <img
                                className="relative w-6 h-6 overflow-hidden shrink-0"
                                alt=""
                                src="/usermain/images/more2line.svg"
                              />
                              {/*
                              <PiCommand className="h-4 w-4" />
                              */}

                            </ActionIcon>
                          </Popover>


                        ) }
                        
                 
                            



                      </div>


                        

                    </div>



                  </div>


                </div>


              </div>

              <div className="self-stretch flex flex-col items-center justify-end gap-[12px] z-[2] text-base">


                <div className=" break-words self-stretch relative font-bold text-xl xl:text-2xl leading-[32px]">
                  {title}
                </div>



                <div className="self-stretch flex flex-col items-center justify-end gap-[12px] z-[2] text-base">

                  <div className="w-full flex items-center justify-center border  ">
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

                  {/* feed image[1] and feed image[2] is row small images list */}

                  <div className="self-stretch grid grid-cols-5 xl:grid-cols-10 items-center justify-start gap-1  xl:gap-[12px]">

                    {/* feed image[0] */}
                    {boardImages?.[0] && (
                      <Image
                        // hover mouse pointer
                        className={`
                        w-[60px] h-[60px]
                        xl:w-[80px] xl:h-[80px]
                          rounded-sm
                          hover:cursor-pointer
                          ${mainImage == boardImages[0] ? "  border-[1px] border-solid border-dark " : ""}
                        `}
                        
                        src={boardImages[0]}
                        alt=""
                        width={560}
                        height={560}

                        style={{
                          //objectFit: "contain",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}

                        onClick = {() => {
                          boardImages[0] && (
                            setMainImage(boardImages[0])
                          )
                        } }
                      />
                    )}

                    {/* feed image[1] */}
                    {boardImages?.[1] && (
                      <Image
                        // hover mouse pointer
                        className={`
                        w-[60px] h-[60px]
                        xl:w-[80px] xl:h-[80px]
                          rounded-sm
                          hover:cursor-pointer
                          ${mainImage == boardImages[1] ? "  border-[1px] border-solid border-dark " : ""}
                        `}
                        
                        
                        src={boardImages[1]}
                        alt=""
                        width={560}
                        height={560}

                        style={{
                          //objectFit: "contain",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}

                        onClick = {() => {
                          boardImages[1] && (
                            setMainImage(boardImages[1])
                          )
                        } }
                      />
                    )}

                    {/* feed image[2] */}
                    {boardImages?.[2] && (
                      <Image
                      className={`
                      w-[60px] h-[60px]
                      xl:w-[80px] xl:h-[80px]
                        rounded-sm
                        hover:cursor-pointer
                        ${mainImage == boardImages[2] ? "  border-[1px] border-solid border-dark " : ""}
                      `}
                        src={boardImages[2]}
                        alt=""
                        width={560}
                        height={560}

                        style={{
                          //objectFit: "contain",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}

                        /* onClicke change main image */
                        onClick={() => {
                          boardImages[2] && (
                            setMainImage(boardImages[2])
                          )
                        }}

                      />
                    )}


                    {/* feed image[3] */}
                    {boardImages?.[3] && (
                      <Image
                        className={`
                        w-[60px] h-[60px]
                        xl:w-[80px] xl:h-[80px]
                          rounded-sm
                        hover:cursor-pointer
                        ${mainImage == boardImages[3] ? "  border-[1px] border-solid border-dark " : ""}
                      `}
                        src={boardImages[3]}
                        alt=""
                        width={560}
                        height={560}

                        style={{
                          //objectFit: "contain",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}

                        /* onClicke change main image */
                        onClick={() => {
                          boardImages[3] && ( setMainImage(boardImages[3]) )
                        }}

                      />
                    )}

                    {/* feed image[4] */}
                    {boardImages?.[4] && (
                      <Image
                        className={`
                        w-[60px] h-[60px]
                        xl:w-[80px] xl:h-[80px]
                          rounded-sm
                        hover:cursor-pointer
                        ${mainImage == boardImages[4] ? "  border-[1px] border-solid border-dark " : ""}
                      `}
                        src={boardImages[4]}
                        alt=""
                        width={560}
                        height={560}

                        style={{
                          //objectFit: "contain",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}

                        /* onClicke change main image */
                        onClick={() => {
                          boardImages[4] && (
                            setMainImage(boardImages[4])
                          )
                        }}

                      />
                    )}

                    {/* feed image[5] */}
                    {boardImages?.[5] && (
                      <Image
                      className={`
                      w-[60px] h-[60px]
                      xl:w-[80px] xl:h-[80px]
                        rounded-sm
                      hover:cursor-pointer
                      ${mainImage == boardImages[5] ? "  border-[1px] border-solid border-dark " : ""}
                    `}
                        src={boardImages[5]}
                        alt=""
                        width={560}
                        height={560}

                        style={{
                          //objectFit: "contain",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}

                        /* onClicke change main image */
                        onClick={() => {
                          boardImages[5] && (
                            setMainImage(boardImages[5])
                          )
                        }}

                      />
                    )}

                    
                    {/* feed image[6] */}
                    {boardImages?.[6] && (
                      <Image
                        className={`
                        w-[60px] h-[60px]
                        xl:w-[80px] xl:h-[80px]
                          rounded-sm
                        hover:cursor-pointer
                        ${mainImage == boardImages[6] ? "  border-[1px] border-solid border-dark " : ""}
                      `}
                        src={boardImages[6]}
                        alt=""
                        width={560}
                        height={560}

                        style={{
                          //objectFit: "contain",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}

                        /* onClicke change main image */
                        onClick={() => {
                          boardImages[6] && (
                            setMainImage(boardImages[6])
                          
                          )
                        }}

                      />
                    )}

                    {/* feed image[7] */}
                    {boardImages?.[7] && (
                      <Image
                      className={`
                      w-[60px] h-[60px]
                      xl:w-[80px] xl:h-[80px]
                        rounded-sm
                        hover:cursor-pointer
                        ${mainImage == boardImages[7] ? "  border-[1px] border-solid border-dark " : ""}
                      `}
                        src={boardImages[7]}
                        alt=""
                        width={560}
                        height={560}

                        style={{
                          //objectFit: "contain",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}

                        /* onClicke change main image */
                        onClick={() => {
                          boardImages[7] && (
                            setMainImage(boardImages[7])
                          )
                        }}

                      />
                    )}

                    {/* feed image[8] */}
                    {boardImages?.[8] && (
                      <Image
                      className={`
                      w-[60px] h-[60px]
                      xl:w-[80px] xl:h-[80px]
                        rounded-sm
                        hover:cursor-pointer
                        ${mainImage == boardImages[8] ? "  border-[1px] border-solid border-dark " : ""}
                      `}
                        src={boardImages[8]}
                        alt=""
                        width={560}
                        height={560}

                        style={{
                          //objectFit: "contain",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}

                        /* onClicke change main image */
                        onClick={() => {
                          boardImages[8] && (
                            setMainImage(boardImages[8])
                          )
                        }}

                      />
                    )}

                    {/* feed image[9] */}
                    {boardImages?.[9] && (
                      <Image
                      className={`
                      w-[60px] h-[60px]
                      xl:w-[80px] xl:h-[80px]
                        rounded-sm
                        hover:cursor-pointer
                        ${mainImage == boardImages[9] ? "  border-[1px] border-solid border-dark " : ""}
                      `}
                        src={boardImages[9]}
                        alt=""
                        width={560}
                        height={560}

                        style={{
                          //objectFit: "contain",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}

                        /* onClicke change main image */
                        onClick={() => {
                          boardImages[9] && (
                            setMainImage(boardImages[9])
                          
                          )
                        }}

                      />
                    )}


                  </div>


                </div>




                <div className="self-stretch relative leading-[24px]">
                  {
                        
                        // if feedTitle is more than 20 characters, then show only 20 characters and add "..."
                        //feedtitle && feedTitle?.replace(/(<([^>]+)>)/gi, "").length > 20 ? feedTitle?.replace(/(<([^>]+)>)/gi, "").substring(0, 20) + "..." :
                        //feedTitle?.replace(/(<([^>]+)>)/gi, "")
                        
                     // html 태그가 포함된 문자열을 출력할 때는 dangerouslySetInnerHTML 사용
                      <div dangerouslySetInnerHTML={{ __html: content as any }} />
                    
                  }
                </div>

                {/* tags */}
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                  {tags?.map((tag: any) => (
                    <div
                      key={tag}
                      className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                    >
                        {tag}
                    </div>
                  ))}
                </div>



                <div className="mt-7 self-stretch relative h-px">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
                </div>

                <div className="mt-7 self-stretch flex flex-col items-center justify-end gap-[20px]">

                  <div className="self-stretch relative font-extrabold">
                    댓글 {commentCount}
                  </div>
                  <div className="self-stretch relative h-px">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
                  </div>

                </div>



                  {/* 로그인해야 댓글을 달수 있다. */}

                  {!session?.user?.email ? (

                    <div className="self-stretch bg-white box-border flex flex-row items-center justify-between gap-[8px] text-sm border-[1px] border-solid border-grey-c">

                      <div className="m-5 flex-1 flex flex-row items-center justify-start  pl-5">
                        <Image
                          className=" w-6 h-6 rounded-full"
                          alt=""
                          width={24}
                          height={24}
                          src="/usermain/images/avatar.svg"
                        />
                        <span className="pl-3 ">로그인해야 댓글을 달수 있습니다.</span>
                      </div>

                    </div>         

                  ) : (


                    
                    
                    <div className="self-stretch bg-white box-border flex flex-row items-center justify-between gap-[8px] text-sm border-[1px] border-solid border-grey-c">
                    

                      <div className="flex-1 flex flex-row items-center justify-center  pl-5">


                        
                        <Image
                          className=" w-6 h-6 rounded-full"
                          alt=""
                          width={24}
                          height={24}
                          src={ userData?.avatar ?   `${userData?.avatar}` : "/usermain/images/avatar.svg"   }
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          } }
                        />
                        

                        {/*
                        <span className="pl-3 w-24">{`@${userData?.nickname} `}</span>
                        */}
                        
                        <div className="w-full flex flex-row items-center justify-between "> 

                          <Controller

                            // check if commentContent has 100 characters
                            /*
                            rules={{
                              validate: (v) =>  (v as string).length <= 100 || '100자 이내로 입력해주세요.',
                              maxLength: 100,
                            }}
                            */


                            control={control}
                            name="commentContent"
                            render={({ field: { onChange, value } }) => (
                              <QuillEditor
                                // enable buttom  thumbnail to enlarge editor

                                //enableEnlarge={true}

                              
                                // check if commentContent has 100 characters
                                //rules={{
                                //  validate: (v) =>  (v as string).length <= 100 || '100자 이내로 입력해주세요.',
                                //  maxLength: 100,
                                //}}


                                placeholder="댓글 달기...."
                                value={value}
                                onChange={onChange}
                                //className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px] w-full h-64 "
                                //labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"

                                ///className="w-full h-14 flex flex-row items-center justify-center text-center text-base text-white"
                                // border none bg transparent
                                className=" w-full border-none bg-transparent"

                                // no border in editor
                                //editorClassName="border-none"

                                // default view  don't show border in editor
                                
                                theme="bubble"

                                

                              />
                            )}


                            // check if bio has 30 characters
                            //rules={{
                            //  validate: (v) =>  (v as string).length <= 30 || '30자 이내로 입력해주세요.',
                            //  maxLength: 30,
                            //}}
                            
                            //display counter of characters
                          />
          

                        </div>

                        
                      </div> 

                    
                      {loadingComment ? (


                        <div className="mr-5 animate-spin rounded-full h-6 w-6 border-b-2 border-grey-6" />

                      ) : (
                    
                        <button className="p-1 flex flex-row items-center justify-start"
                          onClick={() => {

                            if (getValues().commentContent == "") {
                              return;
                            }
                            
                            onSubmit(getValues());

                            // content reset

                            setValue('commentContent', '');

                          } }
                        >
                          <div className="bg-dark w-[60px]  xl:w-[100px] h-10 xl:h-14 flex flex-row items-center justify-center text-center text-base text-white">
                            <div className="relative font-extrabold text-sm xl:text-base ">등록</div>
                          </div>
                        </button>

                      )}


                    </div>




                  )} 



                <div
                  className="w-full mt-5 self-stretch flex flex-col items-start justify-start gap-[12px] text-left text-xs text-dark font-menu-off"
      
                >
               
                {comments?.map((comment: any) => (

                  <>



                  <div
                    key={comment?.id}
                    className=" flex flex-row items-center justify-center gap-[12px]"
                  >
                 
                    
                    <Image
                      //className="relative w-6 h-6 rounded-full"
                      className=" rounded-full w-6 h-6"
                      alt=""
                      width={24}
                      height={24}
                      src={ comment?.userAvatar ?   `${comment?.userAvatar}` : "/usermain/images/avatar.svg"   }
              
                      //placeholder="blur"
                      //blurDataURL="data:..."

                      // aspact ratio 1:1

                      //style = {{ objectFit: 'cover' }}

                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      
                    />
                  

                    <div className=" flex flex-col items-start justify-start gap-[8px] ">

                      <div className="flex flex-row items-start justify-center ">

                        <span>
                          <span className="font-extrabold font-menu-off">{comment?.userNickname}</span>
                          <span className="text-grey-9">{` · `}</span>
                        </span>

                        <span className="text-grey-9  ">
                          

                            {/* change comment date to from now minutes ago

                            ex) 5분전
                            10분전
                            */}
                            { comment?.createdAt && (

                              <div className=" flex flex-row items-center justify-end gap-2 ">
                              {/* AvTimerOutlinedIcon color gray */}
                              {/*
                              <AvTimerOutlinedIcon fontSize="small" />
                              */}
                              {/* differece between now and createdAt */}


                              {Math.floor(
                                (new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60 / 60 / 24
                              ) > 0 ? (
                                <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                  {Math.floor(
                                    (new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60 / 60 / 24
                                  )}{' '}
                                  일전
                                </div>
                              ) : Math.floor(
                                  (new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60 / 60
                                ) > 0 ? (
                                <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                  {Math.floor(
                                    (new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60 / 60
                                  )}{' '}
                                  시간전
                                </div>
                              ) : Math.floor((new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60) >
                                0 ? (
                                <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                  {Math.floor((new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60)}{' '}
                                  분전
                                </div>
                              ) : Math.floor((new Date().getTime() - Date.parse(comment?.createdAt)) / 1000) >
                                0 ? (
                                <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                  {Math.floor((new Date().getTime() - Date.parse(comment?.createdAt)) / 1000)}{' '}
                                  초전
                                </div>
                              ) : (
                                <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                  방금전
                                </div>
                              )}

                              {/*
                                format(Date.parse(value), 'yyy-MM-dd hh:mm:ss')
                              */}
                              </div>


  
                            )  }
                            
                              




                              {/*
                            {comment?.createdAt && (
                        
                              <DateCell
                                date={ new Date(comment?.createdAt) }
                                className=""
                                timeClassName=""
                                dateClassName=""
                                dateFormat="YYYY. MM. DD"
                                timeFormat="HH:mm"
                              />
                            )}
                            */}

                        
                        </span>
                      </div>

                      
                      { /* html 태그가 포함된 문자열을 출력할 때는 dangerouslySetInnerHTML 사용 */
                        /* word break */


                        <div
                          dangerouslySetInnerHTML={{ __html: comment?.content as any }}
                          // 
                          //className="self-stretch relative text-sm"
                          // width size fixed 
                          ///className="text-sm  w-[240px] xl:w-[860px]"

                          className="text-sm  xl:w-[760px]
                          break-words"
                        />
                      }
                      

                    </div>

                    {/* 답글 작성 */}
                    <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">

                  

                      <button
                        type="button"
                        onClick={() => {
                          //alert("답글 달기");
                          //setReplyOpen(true);
                          
                          ///setReplyOpen(!replyOpen);

                          replyOpenArray.map((replyOpen: any) => {
                            //console.log('replyOpen.commentId: ', replyOpen.commentId);
                            //console.log('comment?.id: ', comment?.id);

                            if (replyOpen.commentId == comment?.id) {
                              //replyOpen.replyOpen = !replyOpen.replyOpen;

                              /////setReplyOpenArray(replyOpenArray => [...replyOpenArray, { commentId: comment?.id, replyOpen: !replyOpen.replyOpen }]);

                              setReplyOpenArray(replyOpenArray => replyOpenArray.map((replyOpen: any) => {
                                if (replyOpen.commentId == comment?.id) {
                                  return {
                                    ...replyOpen,
                                    replyOpen: !replyOpen.replyOpen
                                  }
                                } else {
                                  return {
                                    ...replyOpen,
                                    replyOpen: false
                                  }

                                }
                                return replyOpen;
                              } ) );

                            }
                          } );

                        }}
                        className="w-24 h-8 flex flex-row items-center justify-center gap-2"
                      >
                        <div className="flex flex-row items-center justify-start gap-2">
                          {/*
                          <img
                            className="relative w-6 h-6 overflow-hidden shrink-0"
                            alt=""
                            src="/usermain/images/reply.svg"
                          />
                          */}
                          <div className="relative">답글</div>

                        </div>
                      </button>




                     
                        { userData?.id == comment.userId ? (
                        
                          <Popover


                            className="relative"
                            content={() => (
                              <div className="flex flex-col gap-2 w-20  items-center justify-center " >
                                
                                {/* 삭제 */}
                                <button
                                  type="button"

                                  onClick={
                                    () => {

                                      setDeleteCommentId(comment?.id);

                                      modalData.description = '삭제하시겠습니까?';
                                      setOpen(true);

                                    }  
                                  } 
                                  
                                  /*
                                  onClick={async () => {
                                    const res = await fetch(`/api/doingdoit/board/deleteComment?id=${comment?.id}`);
                                    const json = await res?.json();

                                    const data = json as any;

                                    if (data?.data) {
                                      //alert("삭제되었습니다.");

                                      toast.success("삭제되었습니다.");

                                      // close popover

                                    } else {
                                      //alert(json.message);
                                    }
                                  }}
                                  */
                                >
                                  삭제
                                </button>


                                  {/*
                                <DeletePopover
                                  title={`삭제`}
                                  description={`삭제하시겠습니까?`}

                                  onDelete={async () => {
                                    const res = await fetch(`/api/doingdoit/board/deleteComment?id=${comment?.id}`);
                                    const json = await res?.json();

                                    const data = json as any;

                                    if (data?.data) {
                                      //alert("삭제되었습니다.");

                                      toast.success("삭제되었습니다.");

                                      // close popover





                                      
                                    } else {
                                      //alert(json.message);
                                    }
                                  }}

                                  // after onDelete, close popover



                                />

                                */}


                              </div>

                            )}

                          >

                            <ActionIcon
                              variant="text"
                              size="sm"
                              className="hover:text-gray-700"

                            >

                              <img
                                className="relative w-6 h-6 overflow-hidden shrink-0"
                                alt=""
                                src="/usermain/images/more2line.svg"
                              />


                            </ActionIcon>

                          </Popover>


                        ) : (
                          <></>
                        ) }



                    </div>


                  </div>



                  {replyOpenArray.map((replyOpen: any) => {

                    if (replyOpen.commentId == comment.id && replyOpen.replyOpen == true) {

                      return (
                        <>


                      {/* 로그인해야 답글을 달수 있다. */}

                      {!session?.user?.email ? (

                        <div className="self-stretch bg-white box-border flex flex-row items-center justify-between gap-[8px] text-sm border-[1px] border-solid border-grey-c">

                          <div className="m-5 flex-1 flex flex-row items-center justify-start  pl-5">
                            <Image
                              className=" w-6 h-6 rounded-full"
                              alt=""
                              width={24}
                              height={24}
                              src="/usermain/images/avatar.svg"
                            />

                            <span className="pl-3 w-24">{`@${comment?.userNickname}`}</span>

                            <span className="pl-3 ">로그인해야 답글을 달수 있습니다.</span>
                          </div>


                        </div>         

                        ) : (
                                              
                          
                          
                          
                          <div className="self-stretch bg-white box-border flex flex-row items-center justify-between gap-[8px] text-sm border-[1px] border-solid border-grey-c">
                        

                            <div className="flex-1 flex flex-row items-center justify-center  pl-5">


                              <div className="w-9">
                              <Image
                                className=" w-6 h-6 rounded-full"
                                alt=""
                                width={24}
                                height={24}
                                src={ userData?.avatar ?   `${userData?.avatar}` : "/usermain/images/avatar.svg"   }
                                style={{
                                  objectFit: "cover",
                                  objectPosition: "center",
                                } }
                              />
                              </div>


                              <span className="pl-3 w-24">{`@${comment?.userNickname}`}</span>

                              
                              <div className="w-full flex flex-row items-center justify-between "> 

                                <Controller
                                  control={control}
                                  ////name="commentContent"
                                  name="replyContent"
                                  render={({ field: { onChange, value } }) => (
                                    <QuillEditor
                                      placeholder="답글 달기...."
                                      value={value}
                                      onChange={onChange}
                                      //className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px] w-full h-64 "
                                      //labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"

                                      ///className="w-full h-14 flex flex-row items-center justify-center text-center text-base text-white"
                                      // border none bg transparent
                                      className=" w-full border-none bg-transparent"

                                      // no border in editor
                                      //editorClassName="border-none"

                                      // default view  don't show border in editor
                                      theme="bubble"

                                    />
                                  )}


                                  // check if bio has 30 characters
                                  //rules={{
                                  //  validate: (v) =>  (v as string).length <= 30 || '30자 이내로 입력해주세요.',
                                  //  maxLength: 30,
                                  //}}
                                  
                                  //display counter of characters
                                />
                

                              </div>

                              
                            </div> 

                          
                            {loadingReply ? (


                              <div className="mr-5 animate-spin rounded-full h-6 w-6 border-b-2 border-grey-6" />

                            ) : (
                          
                              <button className="p-1 flex flex-row items-center justify-start"
                                onClick={() => {

                                  if (getValues().replyContent == "") {
                                    return;
                                  }
                                  
                                  onSubmit(getValues());

                                  // content reset

                                  setValue('replyContent', '');

                                } }
                              >
                                <div className="bg-dark w-[60px]  xl:w-[100px] h-10 xl:h-14 flex flex-row items-center justify-center text-center text-base text-white">
                                  <div className="relative font-extrabold text-sm xl:text-base ">등록</div>
                                </div>
                              </button>

                            )}


                          </div>


                        )}


                        </>

                      );

                    }

                  } )}


                  {/* list of reply */}
                  {comment?.replies?.map((reply: any) => (

                    <div
                      key={reply?.id}
                      className="flex flex-row items-start justify-start gap-[12px]">

                      {/* reply icon right arrow

                      mui pi pi-arrow-right
                      
                      */}

                      <PiArrowRight className="w-6 h-6" />


                    


                      <div className=" w-8  ">
                        <Image
                          //className="relative w-6 h-6 rounded-full"
                          className=" rounded-full w-6 h-6"
                          alt=""
                          width={24}
                          height={24}
                          src={ reply?.userAvatar ?   `${reply?.userAvatar}` : "/usermain/images/avatar.svg"   }
                 
                          placeholder="blur"
                          blurDataURL="data:..."

                          // aspact ratio 1:1

                          //style = {{ objectFit: 'cover' }}

                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          
                        />
                      </div>

                      <div className=" flex flex-col items-start justify-start gap-[8px] ">

                        <div className="flex flex-row items-start justify-center ">

                          <span>
                            <span className="font-extrabold font-menu-off">{reply?.userNickname}</span>
                            <span className="text-grey-9">{` · `}</span>
                          </span>

                          <span className="text-grey-9  ">
                            

                              {/* change comment date to from now minutes ago

                              ex) 5분전
                              10분전
                              */}
                              { reply?.createdAt && (

                                <div className=" flex flex-row items-center justify-end gap-2 ">
                                {/* AvTimerOutlinedIcon color gray */}
                                {/*
                                <AvTimerOutlinedIcon fontSize="small" />
                                */}
                                {/* differece between now and createdAt */}


                                {Math.floor(
                                  (new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60 / 60 / 24
                                ) > 0 ? (
                                  <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                    {Math.floor(
                                      (new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60 / 60 / 24
                                    )}{' '}
                                    일전
                                  </div>
                                ) : Math.floor(
                                    (new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60 / 60
                                  ) > 0 ? (
                                  <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                    {Math.floor(
                                      (new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60 / 60
                                    )}{' '}
                                    시간전
                                  </div>
                                ) : Math.floor((new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60) >
                                  0 ? (
                                  <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                    {Math.floor((new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60)}{' '}
                                    분전
                                  </div>
                                ) : Math.floor((new Date().getTime() - Date.parse(reply?.createdAt)) / 1000) >
                                  0 ? (
                                  <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                    {Math.floor((new Date().getTime() - Date.parse(reply?.createdAt)) / 1000)}{' '}
                                    초전
                                  </div>
                                ) : (
                                  <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                    방금전
                                  </div>
                                )}

                                {/*
                                  format(Date.parse(value), 'yyy-MM-dd hh:mm:ss')
                                */}

                                </div>



                              )  }

                          </span>

                        </div>


                        { /* html 태그가 포함된 문자열을 출력할 때는 dangerouslySetInnerHTML 사용 */
                          <div
                            dangerouslySetInnerHTML={{ __html: reply?.content as any }}
                            // 
                            //className="self-stretch relative text-sm"
                            // width size fixed 
                            ///className="text-sm  w-[240px] xl:w-[860px]"

                            className="text-sm  xl:w-[760px]"
                          />
                        }

                      </div>


                    </div>

                  ))}









                  </>

                ))}




                </div>


 




                
               </div>








               

                
                {/*
                <div className="self-stretch bg-white box-border h-14 flex flex-row items-center justify-between gap-[8px] text-sm border-[1px] border-solid border-grey-c">
 
                
                  <TextField
                    label=""
                    source="title"
                    resource="posts"
                    className="flex-1 flex flex-row items-center justify-center py-0 px-5 gap-[12px]"
                  />
                 
                  <TextField
                    label=""
                    //source="title"
                    resource="posts"
                    className="flex-1 flex flex-row items-center justify-center py-0 px-5 gap-[12px]"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon>search</Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                 
                  <div className="flex-1 flex flex-row items-center justify-center py-0 px-5 gap-[12px]">
                    <img className="relative w-6 h-6" alt="" src="/usermain/images/avatar.svg" />
                    <div className="flex-1 relative">
                      <span>{`@${userData?.nickname} `}</span>
                      <span className="text-grey-9">댓글 달기....</span>
                    </div>
                  </div>
                  
                  

                  <button className="flex flex-row items-center justify-start"
                    onClick={() => {
                      alert("등록되었습니다.");
                    } }
                  >
                    <div className="bg-dark w-[100px] h-14 flex flex-row items-center justify-center text-center text-base text-white">
                      <div className="relative font-extrabold">등록</div>
                    </div>
                  </button>
                  

                </div>
                */}
                

              </>

              )}

            </div>

            {/*
            <SearchWidget
            icon={<PiMagnifyingGlass className="me-3 h-[20px] w-[20px]" />}
            className="xl:w-[500px] [&_.search-command]:bg-gray-900 [&_.search-command]:text-gray-50"
            />
            */}

          </div>
        </div>
      </div>


      <Footer
        footerAlignSelf="stretch"
        footerBorderTop="1px solid #eee"
        footerBoxSizing="border-box"
      />
    </div>


      {/* modal view */}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          //setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"

        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-xl p-5 "
      >

        <div className="flex flex-col items-center justify-center gap-10 m-5">
            
             {/*
          <Title
            as="h3"
            className="text-lg font-semibold text-gray-900 xl:text-xl"
          >
            {modalData.title}
          </Title>
        
         
          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              setActive(() => 'posts');
            }}
            className="h-auto px-1 py-1"
          >
            <PiXBold className="h-5 w-5 text-base" />
          </Button>
          */}

            {modalData.description && (
              <div className="">
                <Text
                  as="p"
                  className="text-sm text-gray-900 xl:text-lg"
                >
                  {modalData.description}
                </Text>
              </div>
            )}

              {/*
            <Button
              variant="text"
              onClick={() => {
                setOpen(false);
                setActive(() => 'posts');
              }}
              className="h-auto px-1 py-1"
            >
              <PiXBold className="h-5 w-5 text-base" />
            </Button>
            */}

            <div className="flex flex-row items-center justify-center gap-5">

              {/* close button */}
              <Button
                ///size="lg"

                // rounded

                size="xl"


                
                className='text-white bg-grey-9 rounded-xl w-28 h-12 flex items-center justify-center'
                onClick={

                  async () => {

                  setOpen(false);
                  //setActive(() => 'posts');

                  ///withdrawal();

                  const res = await fetch(`/api/doingdoit/board/deleteComment?id=${deleteCommentId}`);
                  const json = await res?.json();

                  const data = json as any;

                  if (data?.data) {
                    //alert("삭제되었습니다.");


                    // update comment count and comment list

                    setCommentCount(commentCount - 1);

                    // update comment list

                    /*
                    const res = await fetch(`/api/doingdoit/board/getComments?boardId=${id}`);
                    const json = await res?.json();

                    const data = json as any;

                    if (data?.data) {
    

                      setComments(data?.data);

                    } 
                    */
                    // remove comment from comments

                    setComments(comments.filter((comment: any) => comment.id !== deleteCommentId));





                    toast.success("삭제되었습니다.");

                    // close popover

                  } else {
                    //alert(json.message);
                  }




                }}
              >
                예
              </Button>

              {/* 확인 button */}
              <Button
                size="lg"
              
                className='text-white bg-dark rounded-xl w-28 h-12 flex items-center justify-center'
                onClick={() => {
                  setOpen(false);
                  //setActive(() => 'posts');

                  // api call


                }}
              >
                아니오
              </Button>
            </div>

          
        </div>

              {/*
        {modalData && <FollowerModal data={modalData.data} />}
              */}
      </Modal>



    </>

  );


     } }
    </Form>
  );


};


