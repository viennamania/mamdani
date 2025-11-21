import type { NextPage } from "next";
import List from "./list";
import Page from "./page";


import Link from "next/link";

const Component3: NextPage = () => {
  return (
    <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0 text-center text-base text-grey-9 font-menu-off">
      <div className="xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">
        <div className="self-stretch flex flex-row items-center justify-center">
          
          
        <Link
                href="/usermain/boards"
                className="no-underline   flex-1 box-border h-14 flex flex-row items-center justify-start text-dark border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold">자유게시판</div>
              </Link>

              <Link
                href="/usermain/boards/health"
                className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold">건강정보</div>
              </Link>

              <Link
                href="/usermain/boards/guide"
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
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
              className="no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
                <div className="flex-1 relative font-extrabold">FAQ</div>
              </Link>


        </div>
        <div className="self-stretch bg-white flex flex-col items-center justify-start text-left text-dark">
          <List />
          <List />
          <List />
          <List />
          <div className="self-stretch flex flex-col items-center justify-center p-8">
            <Page />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component3;
