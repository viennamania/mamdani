import type { NextPage } from "next";
import Link from "next/link";
import { useMemo, type CSSProperties } from "react";

import Image from "next/image";

type Bread1Type = {
  feedInputText?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propWidth?: CSSProperties["width"];
};

const Bread1: NextPage<Bread1Type> = ({
  feedInputText,
  propAlignSelf,
  propWidth,
}) => {
  const bread1Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      width: propWidth,
    };
  }, [propAlignSelf, propWidth]);

  return (
    <div
      className="self-stretch flex flex-row items-center justify-between pt-0 px-0 pb-5 text-left text-5xl text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
      style={bread1Style}
    >
      <div className="relative tracking-[-0.02em] font-extrabold">
        {feedInputText}
      </div>

      <Link
        href="/"
        className=" no-underline flex"
      >
      <Image
        width="24"
        height="24"
        className="relative w-6 h-6 overflow-hidden shrink-0"
        alt=""
        src="/usermain/images/x2.svg"
      />
      </Link>
      
    </div>
  );
};

export default Bread1;
