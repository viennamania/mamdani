import type { NextPage } from "next";

import Image from "next/image";

type PopupType = {
  prop?: string;
  prop1?: string;
  showFrameDiv?: boolean;
  showDiv?: boolean;
  showBtnRectangle?: boolean;
};

const Popup: NextPage<PopupType> = ({
  prop,
  prop1,
  showFrameDiv,
  showDiv,
  showBtnRectangle,
}) => {
  return (
    <div className="rounded-xl bg-white w-[400px] overflow-hidden flex flex-col items-center justify-start p-5 box-border text-center text-5xl text-dark font-menu-off">
      {showFrameDiv && (
        <div className="self-stretch flex flex-row items-center justify-end">
          <Image
            width="24"
            height="24"
            className="relative w-6 h-6 overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/x1.svg"
          />
        </div>
      )}
      <div className="self-stretch flex flex-col items-center justify-center p-2.5 gap-[40px]">
        <div className="self-stretch flex flex-col items-center justify-start gap-[10px]">
          {showDiv && (
            <div className="self-stretch relative font-extrabold">제목</div>
          )}
          <div className="self-stretch relative text-base">{prop}</div>
        </div>
        <div className="flex flex-row items-start justify-start gap-[10px] text-base text-white">
          {showBtnRectangle && (
            <div className="rounded-81xl bg-grey-c w-[120px] h-[50px] overflow-hidden shrink-0 flex flex-row items-center justify-center">
              <div className="relative font-extrabold">{prop1}</div>
            </div>
          )}
          <div className="rounded-81xl bg-dark w-[120px] h-[50px] overflow-hidden shrink-0 flex flex-row items-center justify-center">
            <div className="relative font-extrabold">확인</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
