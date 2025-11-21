import type { NextPage } from "next";

import Link from "next/link";

type List2Type = {
  checkBoxIcon?: boolean;
};

const ListSearch: NextPage<List2Type> = ({ checkBoxIcon }) => {
  return (
    <Link
      href="/usermain/diet/search-details-modal"
      className=" no-underline self-stretch flex flex-row items-center justify-center p-5 text-center text-sm text-dark font-menu-off border-b-[1px] border-solid border-grey-e">
      <div className="flex-1 flex flex-row items-center justify-center gap-[8px] text-left">
        {!checkBoxIcon && (
          <img
            className="relative w-5 h-5 overflow-hidden shrink-0 hidden"
            alt=""
            src="/check-box.svg"
          />
        )}
        <div className="flex-1 relative font-extrabold">된장국 감자</div>
      </div>
      <div className="relative flex items-center justify-center w-20 shrink-0">
        40
      </div>
      <div className="relative flex items-center justify-center w-20 shrink-0">
        6.11
      </div>
      <div className="relative flex items-center justify-center w-20 shrink-0">
        40
      </div>
      <div className="relative flex items-center justify-center w-20 shrink-0">
        6.11
      </div>
      <div className="relative flex items-center justify-center w-[100px] shrink-0">
        6.11
      </div>
      <div className="relative flex items-center justify-center w-20 shrink-0">
        40
      </div>
      <div className="relative flex items-center justify-center w-20 shrink-0">
        6.11
      </div>
      <div className="relative flex items-center justify-center w-[120px] shrink-0">
        6.11
      </div>
    </Link>
  );
};

export default ListSearch;
