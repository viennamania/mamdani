import type { NextPage } from "next";
import Link from "next/link";
import { useMemo, type CSSProperties } from "react";

import Image from "next/image";

type SearchBigType = {
  dishNameInput?: string;

  /** Style props */
  propColor?: CSSProperties["color"];
};

const SearchBig: NextPage<SearchBigType> = ({ dishNameInput, propColor }) => {
  const div17Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div className="rounded-81xl bg-input-bg box-border w-[600px] h-20 flex flex-row items-center justify-between py-5 px-10 text-left text-5xl text-grey-9 font-menu-off border-[1px] border-solid border-grey-d">
      <div className="relative" style={div17Style}>
        {dishNameInput}
      </div>


      <Link href="/usermain/diet/search">
      <Image
        width="24"
        height="24"
        className="relative w-9 h-9 overflow-hidden shrink-0"
        alt=""
        src="/usermain/images/searchline.svg"
      />
      </Link>


    </div>
  );
};

export default SearchBig;
