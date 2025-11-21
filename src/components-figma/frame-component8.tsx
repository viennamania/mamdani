import type { NextPage } from "next";

import Link from "next/link";

const FrameComponent8: NextPage = () => {
  return (
    <div className="self-stretch flex flex-col items-center justify-center p-2.5 gap-[40px] text-center text-13xl text-dark font-menu-off">
      
      <div className="self-stretch relative font-extrabold">된장국 감자</div>

      <div className="self-stretch flex flex-col items-center justify-start relative gap-[20px] text-left text-xs">
        <div className="relative w-60 h-60 z-[0] text-center text-base">
          <img
            className="absolute top-[-0.2px] left-[0px] w-60 h-60"
            alt=""
            src="/usermain/images/figpie1.svg"
          />
          <div className="absolute top-[calc(50%_-_70px)] left-[calc(50%_-_70px)] rounded-[50%] bg-white w-[140px] h-[140px]" />
          <div className="absolute top-[calc(50%_-_21.5px)] left-[calc(50%_-_49.5px)] flex flex-col items-center justify-center gap-[4px]">
            <div className="relative font-extrabold">총 칼로리</div>
            <div className="relative font-extrabold text-xl">
              <span>2,000</span>
              <span className="text-base">kcal</span>
            </div>
          </div>
        </div>
        <div className="my-0 mx-[!important] absolute top-[156px] left-[397.5px] rounded-xl bg-grey-f1 flex flex-row items-center justify-center p-3 gap-[8px] z-[1]">
          <div className="relative leading-[16px] font-extrabold">
            <p className="m-0">포화지방산</p>
            <p className="m-0">당류</p>
            <p className="m-0">나트륨</p>
            <p className="m-0">콜레스테롤</p>
          </div>
          <div className="relative leading-[16px] font-extrabold">
            <p className="m-0">1.5g</p>
            <p className="m-0">3g</p>
            <p className="m-0">360mg</p>
            <p className="m-0">30mg</p>
          </div>
        </div>
        <div className="absolute my-0 mx-[!important] top-[-11.5px] left-[171px] w-[61.6px] h-[37.2px] z-[2]">
          <div className="absolute top-[0px] left-[0px] font-extrabold">
            <p className="m-0">{`지방 `}</p>
            <p className="m-0">3g</p>
          </div>
          <img
            className="absolute top-[10.9px] left-[28px] w-[34px] h-[18.9px]"
            alt=""
            src="/line-4.svg"
          />
        </div>
        <div className="absolute my-0 mx-[!important] top-[151.5px] left-[102px] w-[68.6px] h-[34.5px] z-[3]">
          <div className="absolute top-[8.5px] left-[0px] font-extrabold">
            <p className="m-0">단백질</p>
            <p className="m-0">3g</p>
          </div>
          <img
            className="absolute top-[7.5px] left-[35px] w-[34px] h-[18.9px]"
            alt=""
            src="/line-6.svg"
          />
        </div>
        <div className="absolute my-0 mx-[!important] top-[20.5px] left-[352px] w-[91px] h-[37.6px] z-[4]">
          <div className="absolute top-[0px] left-[42px] font-extrabold">
            <p className="m-0">{`탄수화물 `}</p>
            <p className="m-0">3g</p>
          </div>
          <img
            className="absolute top-[11.3px] left-[-0.4px] w-[34px] h-[18.9px]"
            alt=""
            src="/line-41.svg"
          />
        </div>
      </div>
      <div className="flex flex-row items-start justify-start gap-[10px] text-base text-white">
        
        <Link
        href="/usermain/diet/search"
        className=" no-underline  rounded-81xl bg-grey-c w-[140px] h-[50px] overflow-hidden shrink-0 flex flex-row items-center justify-center">
          <div className="relative font-extrabold">닫기</div>
        </Link>

        <Link
          href="/usermain/diet/search"
          className=" no-underline rounded-81xl bg-dark w-[140px] h-[50px] overflow-hidden shrink-0 flex flex-row items-center justify-center">
          <div className="relative font-extrabold">My 음식 추가</div>
        </Link>


      </div>
    </div>
    
  );
};

export default FrameComponent8;
