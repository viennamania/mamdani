import type { NextPage } from "next";

import Link from "next/link";

const List: NextPage = () => {
  return (
    <Link
      href="/usermain/boards/notice-details"

    className=" no-underline  self-stretch flex flex-row items-center justify-between p-8 text-left text-base text-dark font-menu-off border-b-[1px] border-solid border-grey-e">
      <div className="relative font-extrabold">[공지] 공지제목입니다.</div>
      <div className="relative text-xs text-grey-9">2023.03.15</div>
    </Link>
  );
};

export default List;
