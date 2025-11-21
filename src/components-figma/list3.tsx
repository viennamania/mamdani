import type { NextPage } from "next";
import Link from "next/link";
import { useMemo, type CSSProperties } from "react";

import Image from "next/image";

type List3Type = {
  cakeDescription?: string;
  frameDiv?: boolean;
  showRectangleIcon?: boolean;

  /** Style props */
  propOpacity?: CSSProperties["opacity"];
};

const List3: NextPage<List3Type> = ({
  cakeDescription,
  frameDiv,
  showRectangleIcon,
  propOpacity,
}) => {
  const list1Style: CSSProperties = useMemo(() => {
    return {
      opacity: propOpacity,
    };
  }, [propOpacity]);

  return (
    <div
      className="rounded-tl-none rounded-tr-41xl rounded-b-41xl bg-white shadow-[4px_4px_30px_rgba(140,_144,_171,_0.15)] box-border w-[480px] flex flex-col items-center justify-end p-10 gap-[40px] text-left text-xs text-dark font-menu-off border-[1px] border-solid border-grey-e"
      style={list1Style}
    >
      <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
        <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
          <Image
            width="24"
            height="24"

            className="relative w-6 h-6"
           alt=""
           src="/usermain/images/avatar.svg" />
          <div className="flex-1 relative">
            <span>
              <span className="font-extrabold">닉네임</span>
            </span>
            <span className="text-grey-9">
              <span>{` · `}</span>
              <span>2023.10.09 18:00</span>
            </span>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-center justify-end gap-[4px] text-grey-6">
          <div className="self-stretch relative">저녁</div>
          <div className="self-stretch relative text-5xl font-extrabold text-dark">
            한우등심
          </div>
        </div>
        <div className="w-[300px] flex flex-col items-center justify-end gap-[8px] text-center text-3xs text-white">
          <div className="self-stretch rounded-81xl bg-grey-f1 overflow-hidden flex flex-col items-start justify-center">
            <div className="self-stretch rounded-81xl bg-orange h-6 flex flex-row items-center justify-end py-0 px-3 box-border">
              <div className="relative font-extrabold">과하게</div>
            </div>
          </div>
          <div className="self-stretch rounded-81xl bg-background overflow-hidden flex flex-col items-start justify-center">
            <div className="rounded-81xl bg-orange w-[150px] h-6 flex flex-row items-center justify-end py-0 px-3 box-border">
              <div className="relative font-extrabold">보통</div>
            </div>
          </div>
        </div>
      </div>
      {!frameDiv && (
        <div className="self-stretch hidden flex-col items-center justify-end gap-[12px] text-sm">
          <div className="self-stretch relative leading-[20px]">
            {cakeDescription}
          </div>
          {showRectangleIcon && (
            <Image
              width="24"
              height="24"
              className="self-stretch relative max-w-full overflow-hidden h-60 shrink-0 object-cover"
              alt=""
              src="/usermain/images/rectangle-641@2x.png"
            />
          )}
        </div>
      )}
      <div className="self-stretch rounded-tl-none rounded-tr-3xl rounded-b-3xl bg-background flex flex-col items-center justify-end p-5 gap-[12px]">
        <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
          <Image
            width="24"
            height="24"
          className="relative w-6 h-6" alt="" src="/usermain/images/avatar.svg" />
          <Image
            width="24"
            height="24"
          className="relative w-5 h-5" alt="" src="/usermain/images/annotation.svg" />
          <div className="flex-1 relative">
            <span className="font-extrabold">김지영</span>
            <span> 영양사</span>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-center justify-end gap-[8px] text-sm">
          <div className="self-stretch relative leading-[20px]">
            <p className="m-0">소고기는 100 g안에 199칼로리가 있습니다.</p>
            <p className="m-0">
              칼로리 분석: 47% 지방, 0% 탄수화물, 53% 단백질….
            </p>
          </div>
          <div className="self-stretch relative text-xs [text-decoration:underline] text-grey-6">
            <Link href="/usermain/feeds/details">
              더보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List3;
