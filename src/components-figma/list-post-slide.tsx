import type { NextPage } from "next";
import React, { useEffect, useMemo, type CSSProperties, useState } from "react";
import Tag1 from "./tag1";

import Image from "next/image";
///import { Link } from "react-scroll";

import Link from "next/link";

import { routes } from "@/config/routes";




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

  /** Style props */
  propOpacity?: CSSProperties["opacity"];

};



const ListPostSlide: NextPage<ListPostType> = ({

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

  propOpacity,
}) => {
  



  const listPostStyle: CSSProperties = useMemo(() => {
    return {
      opacity: propOpacity,
    };
  }, [propOpacity]);


  //console.log("ListHealthinfo: image: ", image);



  const [ shortContent, setShortContent ] = useState<string>("");
  

  useEffect(() => {
      
      if (content === undefined) {
        setShortContent("");
      } else
  
      if (content === "undefined") {
        setShortContent("");
      } else if ( content.length > 200 ) {
        setShortContent(content.slice(0, 200) + "...");

      } 
      else {
        setShortContent(content);
      }

    }, [content]);



  if (!id) {
    return null;
  }


  return (

    <div
      className="w-full
        
      
      "

      //className="self-stretch bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] flex flex-row items-center justify-between p-10 text-left text-xl text-dark font-menu-off border-[1px] border-solid border-grey-e"
      //style={listPostStyle}
    >

      <Link
        href={routes.usermain.boardDetails(id as string)}
        className=" no-underline self-stretch bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] flex flex-row gap-5 items-center justify-between p-5 xl:p-10 text-left text-xl text-dark font-menu-off border-[1px] border-solid border-grey-e
          hover:border-grey-6

          rounded-lg

        "
        style={listPostStyle}  
      >

     


      <div className="self-stretch flex-1 flex flex-col items-center justify-start gap-[20px]  ">




        <div className=" self-stretch flex-1 flex flex-col items-center justify-start gap-[20px]  ">

          
          <div className="flex flex-row gap-3 items-start justify-between w-full">
            
            <div className="self-stretch flex flex-col items-center justify-end gap-[12px]">

              <div className="self-stretch relative font-extrabold">

                
                {
                  // html content view

                  title && (
                    <div dangerouslySetInnerHTML={{ __html: title }} />
                  )
                    
                }
              </div>


              <div className="self-stretch relative text-sm text-grey-6">
                {
                  content && (
                    <div dangerouslySetInnerHTML={{
                    
                      __html: shortContent 
                      
                      }} />
                  )
                }
              </div>

              <div className="self-stretch flex flex-wrap items-center justify-start gap-[4px]">

                {tags?.map((tag: any) => (
                  <div
                    key={tag}
                    //className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                  
                    className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                  
                  >

                  
                      {tag}
                

                  </div>
                ))}

              </div>


            </div>


            {images?.[0] && (
                <div className="flex flex-row h-[60px] w-[60px]"> 
                  {/*
                  <img
                    className="flex xl:hidden relative  object-cover rounded-sm"
                    alt=""
                    src={images && images[0] }
                  />
                  */}

                  <Image
                    alt=""
                    src={images && images[0] }
                    width={100}
                    height={100}
                    //className=" object-cover rounded-sm"
                    className="  object-cover rounded-sm"
                  />

              </div>
              )}

          </div>

        </div>


        <div className="self-stretch flex flex-col items-start justify-start gap-[10px] text-xs">

          <div className="flex flex-row items-center justify-start gap-[4px]">

            <Image
              className="relative w-6 h-6 rounded-full"
              alt=""
              src={userAvatar || "/usermain/images/avatar.svg"}
              width={24}
              height={24}
            />

            <div className="relative font-extrabold">
              {userNickname}
            </div>
          </div>

          <div className="flex flex-row items-center justify-start gap-[4px]">
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

          </div>


        </div>
      </div>

      {images?.[0] && (
        <img
          className="hidden xl:flex relative w-40 h-40 object-cover rounded-sm"
          alt=""
          src={images && images[0] }
        />
      )}

      </Link>

    </div>


  );


};


export default ListPostSlide;