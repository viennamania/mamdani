import type { NextPage } from "next";

const Prog: NextPage = () => {
  return (
    <div className="self-stretch flex flex-col items-center justify-end gap-[20px] text-left text-sm text-grey-6 font-menu-off">
      <div className="self-stretch flex flex-col items-center justify-end gap-[8px]">
        <div className="self-stretch relative">What you eat, what you are!</div>
        <div className="self-stretch relative text-5xl font-extrabold text-dark">
          먹방으로 나의 세계관을 알아보세요!
        </div>
      </div>
      <div className="self-stretch rounded-81xl bg-grey-e h-3 overflow-hidden shrink-0 flex flex-col items-start justify-center">
        <div className="flex-1 relative rounded-81xl bg-orange w-[100px]" />
      </div>
    </div>
  );
};

export default Prog;
