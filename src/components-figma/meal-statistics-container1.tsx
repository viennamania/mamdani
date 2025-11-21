import type { NextPage } from "next";

import Image from "next/image";

type MealStatisticsContainer1Type = {
  mealStatsMealTimeStats?: string;
  mealAmountStats?: string;
  eatingSpeedStats?: string;
  mealAmountPercentageEatin?: string;
  mealAmountPercentageStats?: string;
};

const MealStatisticsContainer1: NextPage<MealStatisticsContainer1Type> = ({
  mealStatsMealTimeStats,
  mealAmountStats,
  eatingSpeedStats,
  mealAmountPercentageEatin,
  mealAmountPercentageStats,
}) => {
  return (
    <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-left text-xl text-dark font-menu-off">
      <div className="self-stretch flex flex-col items-center justify-start gap-[12px]">
        <div className="self-stretch relative font-extrabold">
          {mealStatsMealTimeStats}
        </div>
        <div className="self-stretch relative text-base">
          <span>{mealAmountStats}</span>
          <span className="font-extrabold">{eatingSpeedStats}</span>
          <span> 했어요!</span>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-sm">
        <Image
          width="24"
          height="24"
          className="relative w-[200px] h-[200px]"
          alt=""
          src="/usermain/images/figpie.svg"
        />

        <div className="flex flex-row items-center justify-start gap-[20px]">
          <div className="flex flex-row items-center justify-center gap-[8px]">
            <div className="relative rounded bg-good w-3 h-3" />
            <div className="relative font-extrabold">
              {mealAmountPercentageEatin}
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-[8px]">
            <div className="relative rounded bg-std w-3 h-3" />
            <div className="relative">보통(20%)</div>
          </div>
          <div className="flex flex-row items-center justify-center gap-[8px]">
            <div className="relative rounded bg-bad w-3 h-3" />
            <div className="relative">{mealAmountPercentageStats}</div>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default MealStatisticsContainer1;
