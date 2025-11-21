import type { NextPage } from "next";
import Tab from "./tab";

import Link from "next/link";

const FormContainerFaq: NextPage = () => {
  return (
    <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0 text-center text-base text-grey-9 font-menu-off">
      <div className="xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">
        <div className="self-stretch flex flex-row items-center justify-center">

        <Link
                href="/usermain/boards"
                className="no-underline   flex-1 box-border h-14 flex flex-row items-center justify-start  border-b-[2px] border-solid border-dark">
                <div className="flex-1 relative font-extrabold">자유게시판</div>
              </Link>

              <Link
                href="/usermain/boards/health"
                className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-dark">
                <div className="flex-1 relative font-extrabold">건강정보</div>
              </Link>

              <Link
                href="/usermain/boards/guide"
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-dark">
                <div className="flex-1 relative font-extrabold">
                  유형별 가이드
                </div>
              </Link>

              <Link
                href="/usermain/boards/notice"
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-dark">
                <div className="flex-1 relative font-extrabold">공지사항</div>
              </Link>


              <Link
                href="/usermain/boards/faq"
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start text-dark border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold">FAQ</div>
              </Link>


        </div>
        <div className="self-stretch bg-white flex flex-col items-center justify-start text-left text-xl text-dark">
          <div className="self-stretch flex flex-col items-start justify-center p-8 gap-[12px] text-sm text-grey-9 border-b-[1px] border-solid border-grey-e">
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <Tab faqTitle="자주하는 질문" />
              <Tab
                faqTitle="카테고리"
                propBackgroundColor="#212121"
                propColor="#fff"
              />
              <Tab
                faqTitle="카테고리"
                propBackgroundColor="#f1f1f1"
                propColor="#999"
              />
              <Tab
                faqTitle="카테고리"
                propBackgroundColor="#f1f1f1"
                propColor="#999"
              />
              <Tab
                faqTitle="카테고리"
                propBackgroundColor="#f1f1f1"
                propColor="#999"
              />
              <Tab
                faqTitle="카테고리"
                propBackgroundColor="#f1f1f1"
                propColor="#999"
              />
              <Tab
                faqTitle="카테고리"
                propBackgroundColor="#f1f1f1"
                propColor="#999"
              />
            </div>
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <Tab
                faqTitle="카테고리"
                propBackgroundColor="#f1f1f1"
                propColor="#999"
              />
              <Tab
                faqTitle="카테고리"
                propBackgroundColor="#f1f1f1"
                propColor="#999"
              />
              <Tab
                faqTitle="카테고리"
                propBackgroundColor="#f1f1f1"
                propColor="#999"
              />
            </div>
          </div>
          
          <div className="self-stretch flex flex-row items-center justify-between p-8 border-b-[1px] border-solid border-grey-e">
            <div className="relative font-extrabold">[회원] 질문입니다.1</div>
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/chevrondown.svg"
            />
          </div>

          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>


          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>


          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>


          <div className="self-stretch flex flex-col items-start justify-start p-8 gap-[20px] border-b-[1px] border-solid border-grey-d">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="relative font-extrabold">[회원] 질문입니다.1</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/chevronup.svg"
              />
            </div>
            <div className="self-stretch relative text-sm leading-[24px]">
              <p className="m-0">내용입니다. 내용입니다. 내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
              <p className="m-0">내용입니다.</p>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
};

export default FormContainerFaq;
