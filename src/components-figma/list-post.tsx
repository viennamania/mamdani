import type { NextPage } from "next";
import React, { useEffect, useMemo, type CSSProperties, useState } from "react";
import Tag1 from "./tag1";

import Link from "next/link";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { title } from "process";


import { routes } from "@/config/routes";



import DateCell from '@/components/ui/date-cell';

import Image from 'next/image';




type ListPostType = {
  key?: string;

  id?: string;
  createdAt?: string;

  userName?: string;
  userNickname?: string;
  userAvatar?: string;
  title?: string;
  content?: string;
  images?: string[];
  tags?: string[];

  scrapCount?: number,
  likeCount?: number,
  commentCount?: number,
  viewCount?: number,



  imageDimensions?: string;
  frameDiv?: boolean;
  showRectangleIcon?: boolean;

  /** Style props */
  propHeight?: CSSProperties["height"];


};



const ListPost: NextPage<ListPostType> = ({
  key,
  id,
  createdAt,

  userName,
  userNickname,
  userAvatar,
  title,
  content,
  images,
  tags,

  scrapCount = 0,
  likeCount = 0,
  commentCount = 0,
  viewCount = 0,

  imageDimensions,
  frameDiv,
  showRectangleIcon,
  propHeight,
}) => {
  
  const listPostStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      textDecoration: 'none',
    };
  }, [propHeight]);


  const squareVariants = {
    //visible: { opacity: 1, scale: 4, transition: { duration: 1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0 }
  };
  

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);


  /*
      <motion.div
      className="box"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    />
    */

    //console.log("id: ", id);
    //console.log("userNickname: ", userNickname);
    //console.log("images: ", images);


    // if content has imoji, it will be broken
    // if content has imoji, remove imoji, and remove thml tag and shorten the content

  
      

    
    function removeEmojis (string: string) {
      var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      return string.replace(regex, '');
    }
    



    const [ shortContent, setShortContent ] = useState<string>("");
  

    useEffect(() => {

        if (!content) {
          setShortContent("");
        } else if (content === undefined) {
          setShortContent("");
        } else  if (content === "undefined") {
          setShortContent("");
        } else if ( content.length > 200 ) {





          // when shortening the content, imoji is broken, so remove imoji
    



          setShortContent(
            // content is html and shorten the content and remove html tags
            ///content.slice(0, 200).replace( /(<([^>]+)>)/ig, "") + "..."
            //content.slice(0, 200) + "..."

            // if content has imoji, it will be broken
            // if content has imoji, when it is broken, remove imoji

            
            ///removeEmojis(content).slice(0, 200).replace( /(<([^>]+)>)/ig, "") + "..."

            // if content has imoji, it will be broken

            ///removeEmojis(content).slice(0, 200) + "..."

            //removeEmojis(content.slice(0, 200).replace( /(<([^>]+)>)/ig, ""))


            content.slice(0, 100).replace( /(<([^>]+)>)/ig, "") + "..."





          );

        } 
        else {
          setShortContent(content);
        }

      }, [content]);



  return (



    <Link
      className="w-full
        
      
      "
      href={routes.usermain.boardDetails(id as string)}

      //className="self-stretch bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] flex flex-row items-center justify-between p-10 text-left text-xl text-dark font-menu-off border-[1px] border-solid border-grey-e"
      //style={listPostStyle}
    >

      <div
        //href={routes.usermain.boardDetails(id as string)}
        className=" no-underline self-stretch bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] flex flex-row gap-5 items-center justify-between p-5 xl:p-10 text-left text-xl text-dark font-menu-off border-[1px] border-solid border-grey-e
          hover:border-grey-6

          rounded-lg

        "
        style={listPostStyle}  
      >

     


      <div className="self-stretch flex-1 flex flex-col items-center justify-start gap-[10px] xl:gap-[20px] ">


        <div className=" self-stretch flex-1 flex flex-col items-center justify-start gap-[10px] xl:gap-[20px]  ">

          <div className="self-stretch flex flex-col items-center justify-end gap-[12px]">

      
            <div className="self-stretch flex  flex-row  items-start justify-between gap-[4px]">


              <div className="w-full flex flex-col  items-start justify-center gap-[4px]">

                <div
                  ///className=" break-words self-stretch relative font-extrabold text-base xl:text-xl"

                  className="self-stretch relative font-extrabold text-base xl:text-xl"
                  
                  // overflow-wrap:anywhere

                  style={{
                    overflowWrap: 'anywhere',
                  }}

                >

                  
                  {
                    // html content view

                    // break the content

                    /*
                    title && (
                      <div
                        dangerouslySetInnerHTML={{ __html: title }}
                        />
                    )
                    */

                    // break words


            

                    title
                    //'adfdafdfdafadsfdsfdasfdfdasfdsfdsfdsafdsafsdfsadfadsfasdfsadfsadfdsafasfsdafasasdfafas'
                  
                  }
                  
                </div>



                

                <div
                  className="self-stretch relative text-xs xl:text-sm text-grey-6"

                  style={{
                    overflowWrap: 'anywhere',
                  }}
                  
                >
                  {
                    // html content view and shorten the content and remove emojies


                    shortContent && (
                      <div dangerouslySetInnerHTML={{
                      
                        __html:

                        shortContent
                        
                        }} />
                    )
                    
                    /*
                    content && (
                      <div dangerouslySetInnerHTML={{
                      
                        __html: shortContent 
                        
                        }} />
                    )
                    */
                  }
                  
               
                </div>
              </div>


              {images?.[0] && (
                <div className="flex flex-row w-[110px] h-20  xl:hidden">
                
                  <Image
                    //className="hidden xl:flex relative  w-40 h-40 object-cover rounded-sm"
                    alt=""
                    src={images && images[0] }
                    width={160}
                    height={160}
                    //className=" object-cover rounded-sm"
                    className="  object-cover rounded-sm"
                  />
                 
                </div>
              )}



            </div>


            <div className="self-stretch flex-wrap flex flex-row items-center justify-start gap-[4px]">
   
              {tags?.map((tag: any) => (
                <Link
                  key={tag}
                  className="flex  items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-xs xl:text-sm font-medium text-gray-700"
                  href={`/usermain/boards?search=${tag}`}
                >
                    {tag}

                </Link>
              ))}

            </div>



          </div>

        </div>

        <div className="flex xl:hidden w-full flex-row items-center justify-start gap-[4px] text-xs xl:text-sm ">
          <Image
            className="relative w-4 h-4 rounded-full"
            alt=""
            src={userAvatar || "https://doingdoit-v1.vercel.app/usermain/images/avatar.svg"}
            width={24}
            height={24}
          />
          <div className="relative font-extrabold text-3xs">
            {userNickname}
          </div>
        </div>


        <div className="self-stretch flex flex-row items-center justify-start gap-[20px] text-xs">
          
          <div className="hidden xl:flex flex-row items-center justify-start gap-[4px]">
            <Image
              className="relative w-6 h-6 rounded-full"
              alt=""
              src={userAvatar || "https://doingdoit-v1.vercel.app/usermain/images/avatar.svg"}
              width={24}
              height={24}
            />
            <div className="relative font-extrabold">
              {userNickname}
            </div>
          </div>


          <div className="flex flex-row items-center justify-center gap-[4px]">
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/eyeline.svg"
            />
            <div className="relative">{viewCount}</div>
          </div>

          <div className="flex flex-row items-center justify-center gap-[4px]">
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/message3line.svg"
            />
            <div className="relative">{commentCount}</div>
          </div>

          {/* likeCount */}
          <div className="flex flex-row items-center justify-center gap-[4px]">
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0"
              alt=""

              src={`${likeCount > 0 ? "/usermain/images/heart3fill.svg" : "/usermain/images/heart3line.svg"}`}
               
            />
            <div className="relative">{likeCount}</div>
          </div>

          {/*
          <div className=" flex flex-row items-center justify-center gap-[4px] ">
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/timeline.svg"
            />
           
            <div className="relative">
              <DateCell
                date={  new Date(createdAt as string) }
                className=""
                timeClassName=""
                dateClassName=""
                dateFormat="YYYY. MM. DD"
                timeFormat="HH:mm"
              />
            </div>
            
          </div>
          */}

        </div>


      </div>



      {images?.[0] && (
        <div className="hidden xl:flex">
        
          <Image
            //className="hidden xl:flex relative  w-40 h-40 object-cover rounded-sm"
            alt=""
            src={images && images[0] }
            width={160}
            height={160}
            className="w-40 h-40 object-cover rounded-sm"
          />
         
        </div>
       )}

  

      </div>

    </Link>


  );
};

export default ListPost;
