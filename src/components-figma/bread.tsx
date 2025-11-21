import type { NextPage } from "next";
import Link from "next/link";
import { useMemo, type CSSProperties } from "react";

import Image from "next/image";

type BreadType = {
  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propZIndex?: CSSProperties["zIndex"];
  propWidth?: CSSProperties["width"];
};

const Bread: NextPage<BreadType> = ({
  propAlignSelf,
  propZIndex,
  propWidth,
}) => {
  const breadStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      zIndex: propZIndex,
      width: propWidth,
    };
  }, [propAlignSelf, propZIndex, propWidth]);

  return (
    <div
      className="self-stretch flex flex-row items-center justify-center pt-0 px-0 pb-5 gap-[12px] z-[0] text-left text-sm text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
      style={breadStyle}
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

      <Image
        width="24"
        height="24"
        className="relative w-6 h-6 overflow-hidden shrink-0 hidden"
        alt=""
        src="/usermain/images/x1.svg"
      />
    </div>
  );
};

export default Bread;
