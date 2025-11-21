import type { NextPage } from "next";
import FeedContainer from "./feed-container";

import Link from "next/link";

const Component8: NextPage = () => {
  return (
    <div className="self-stretch bg-background flex flex-col items-center justify-start py-[100px] px-0 text-center text-xl text-grey-6 font-montserrat">
      <div className="xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">
        <FeedContainer
          sectionTitle="설문"
          feedSectionSubtitle="설문으로 알아보는 나의 식습관!"
          propFlex="unset"
          propAlignSelf="stretch"
        />
        <div className="self-stretch bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] box-border h-60 flex flex-row items-center justify-between p-10 border-[1px] border-solid border-grey-e">
          <img
            className="relative w-[172.7px] h-[140px] overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/frame-survey.svg"
          />
          <div className="flex flex-col items-center justify-center gap-[24px]">
            <div className="flex flex-col items-center justify-end gap-[12px]">
              <div className="self-stretch relative tracking-[0.1em] uppercase font-black">
                What you eat, what you are!
              </div>
              <div className="self-stretch relative text-13xl font-extrabold font-menu-off text-dark">
                먹방으로 나의 세계관을 알아보세요!
              </div>
            </div>

            <Link
              href="survey/question1"
              className=" no-underline rounded-81xl bg-dark flex flex-row items-center justify-center py-3 px-6 text-sm text-background font-menu-off">
              <div className="relative font-extrabold">시작</div>
            </Link>

          </div>
          <img
            className="relative w-[155.9px] h-[140px] overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/frame6.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Component8;
