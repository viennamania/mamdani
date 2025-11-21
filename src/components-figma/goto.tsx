import type { NextPage } from "next";

type GotoType = {
  boardName?: string;
};

const Goto: NextPage<GotoType> = ({ boardName }) => {
  return (
    <div className="rounded-81xl flex flex-row items-center justify-center py-3 px-5 gap-[4px] text-center text-sm text-dark font-menu-off border-[1px] border-solid border-grey-c">
      <div className="relative font-extrabold">{boardName}</div>
      <img
        className="relative w-4 h-4 overflow-hidden shrink-0"
        alt=""
        src="/usermain/images/feather-icons--chevronright.svg"
      />
    </div>
  );
};

export default Goto;
