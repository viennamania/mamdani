'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Bread from "@/components-figma/bread";
import Tag1 from "@/components-figma/tag1";
import CommentContainer from "@/components-figma/comment-container";
import List1 from "@/components-figma/list1";
import Footer from "@/components-figma/footer";

import Link from "next/link";
import InputBox from "@/components-figma/input-box";

import { Autocomplete, TextField, Icon, Input, Button, InputAdornment } from "@mui/material";



const Frame8: NextPage = () => {
  return (

    <>

    <div className="bg-dark felx sticky top-0 z-50 ">
            <Top1
              logo="/usermain/images/logo1.svg"
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


    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-left text-base text-dark font-menu-off">
      <div className="self-stretch flex flex-col items-center justify-start">
     
        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">
          <div className="xl:w-[1000px] flex flex-col items-center justify-start">
            <div className="self-stretch bg-white flex flex-col items-center justify-end p-10 gap-[40px]">

                <Link 
                    href="/usermain/boards"
                    className="flex flex-row items-center justify-start gap-[12px]"
                    style={{ textDecoration: 'none' }}
                >  
                <Bread
                    propAlignSelf="unset"
                    propZIndex="unset"
                    propWidth="920px"
                />
              </Link>

              <div className="self-stretch flex flex-col items-center justify-end gap-[20px] text-xs">
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                  <img className="relative w-6 h-6" alt="" src="/usermain/images/avatar.svg" />
                  <div className="flex-1 relative">
                    <span>
                      <span className="font-extrabold">닉네임</span>
                    </span>
                    <span className="text-grey-9">
                      <span>{` · `}</span>
                      <span>2023.10.09 18:00</span>
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[20px] text-grey-6">
                    
                    <button className="flex flex-row items-center justify-start"
                      onClick={() => {
                        alert("북마크 되었습니다.");
                      } }
                    >
                    <img
                      className="relative w-6 h-6 overflow-hidden shrink-0"
                      alt=""
                      src="/usermain/images/bookmarkline.svg"
                    />
                    </button>
                    
                    <img
                      className="relative w-6 h-6 overflow-hidden shrink-0 hidden"
                      alt=""
                      src="/usermain/images/bookmarkfill.svg"
                    />
                   
                    <div className="flex flex-row items-center justify-start gap-[4px]">
                      
                      <img
                        className="relative w-5 h-5 overflow-hidden shrink-0 hidden"
                        alt=""
                        src="/usermain/images/heart3line.svg"
                      />
                      
                      <button className="flex flex-row items-center justify-start"
                        onClick={() => {
                          alert("좋아요 되었습니다.");
                        } }
                      >
                      <img
                        className="relative w-5 h-5 overflow-hidden shrink-0"
                        alt=""
                        src="/usermain/images/heart3fill.svg"
                      />
                      </button>
                      <div className="relative">142</div>
                    </div>
                    <button className="flex flex-row items-center justify-start">
                    <img
                      className="relative w-6 h-6 overflow-hidden shrink-0"
                      alt=""
                      src="/usermain/images/more2line.svg"
                    />
                    </button>
                  </div>
                </div>
                <div className="self-stretch relative text-13xl font-extrabold">
                  제목입니다.
                </div>
              </div>
              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>
              <div className="self-stretch flex flex-col items-center justify-end gap-[20px]">
                <div className="self-stretch flex flex-col items-center justify-end gap-[12px]">
                  <img
                    className="self-stretch relative max-w-full overflow-hidden h-[560px] shrink-0 object-cover"
                    alt=""
                    src="/usermain/images/rectangle-64@2x.png"
                  />
                  <div className="self-stretch relative leading-[24px]">
                    친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게
                    먹었어요
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">
                  <Tag1 />
                  <Tag1 />
                  <Tag1 />
                </div>
              </div>

              <div className="self-stretch relative h-px">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
              </div>

              <div className="self-stretch flex flex-col items-center justify-end gap-[20px]">

                <div className="self-stretch relative font-extrabold">
                  댓글 45
                </div>
                <div className="self-stretch relative h-px">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
                </div>

                <CommentContainer commentText="댓글입니다." />
                

                <div className="self-stretch relative h-px">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
                </div>


                <List1
                  commentText="댓글입니다."
                  replyButtonText="답글쓰기"
                  commentIconUrl="/usermain/images/more2line.svg"
                  propAlignSelf="stretch"
                  propFlex="unset"
                  propColor="#212121"
                  propDisplay="flex"
                  propFlexDirection="row"
                  propAlignItems="center"
                  propJustifyContent="center"
                  propGap="12px"
                  propColor1="unset"
                  propPosition="relative"
                  propFontSize="12px"
                  propFontWeight="800"
                  propFontFamily="'NanumSquare Neo'"
                  propTextAlign="left"
                  propDisplay1="inline-block"
                  propPosition1="relative"
                  propWidth="24px"
                  propHeight="24px"
                  propOverflow="hidden"
                  propFlexShrink="0"
                  propDisplay2="unset"
                  propFlexDirection1="unset"
                  propAlignItems1="unset"
                  propJustifyContent1="unset"
                  propGap1="unset"
                />
             

                <div className="self-stretch relative h-px">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
                </div>

                <CommentContainer
                  commentText="삭제된 댓글입니다."
                  propColor="#999"
                />
              </div>

              

            </div>


            <div className="self-stretch bg-white box-border h-14 flex flex-row items-center justify-between gap-[8px] text-sm border-[1px] border-solid border-grey-c">
 
              {/*
              <TextField
                label=""
                source="title"
                resource="posts"
                className="flex-1 flex flex-row items-center justify-center py-0 px-5 gap-[12px]"
              />
              */}
              {/*
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
                */}

              
              <div className="flex-1 flex flex-row items-center justify-center py-0 px-5 gap-[12px]">
                <img className="relative w-6 h-6" alt="" src="/usermain/images/avatar.svg" />
                <div className="flex-1 relative">
                  <span>{`@닉네임 `}</span>
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

export default Frame8;
