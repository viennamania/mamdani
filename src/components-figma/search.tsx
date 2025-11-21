import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

import Image from "next/image";

type SearchType = {
  prop?: string;

  /** Style props */
  searchWidth?: CSSProperties["width"];
};

const Search: NextPage<SearchType> = ({ prop, searchWidth }) => {
  const searchStyle: CSSProperties = useMemo(() => {
    return {
      width: searchWidth,
    };
  }, [searchWidth]);

  return (
    <div
      className="w-full rounded bg-white box-border h-11 overflow-hidden shrink-0 flex flex-row items-center justify-start py-0 px-3 gap-[12px] text-left text-sm text-grey-9 font-menu-off border-[1px] border-solid border-grey-d"
      style={searchStyle}
    >
      <div className="flex-1 relative">{prop}</div>
      <Image
        width="24"
        height="24"
        className="relative w-5 h-5 overflow-hidden shrink-0 hidden"
        alt=""
        src="/usermain/images/xcircle.svg"
      />
      <Image

        width="24"
        height="24"
        className="relative w-6 h-6 overflow-hidden shrink-0"
        alt=""
        src="/usermain/images/feather-icons--search.svg"
      />
    </div>
  );
};

export default Search;
