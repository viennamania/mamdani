import type { NextPage } from "next";

import Image from "next/image";

type MealQuantityContainerType = {
  mealAmountMealTime?: string;
  mealAmountPerPersonMealTi?: string;
  eatingSpeed?: string;
  eatingSpeedDescription?: string;
};

const MealQuantityContainer: NextPage<MealQuantityContainerType> = ({
  mealAmountMealTime,
  mealAmountPerPersonMealTi,
  eatingSpeed,
  eatingSpeedDescription,
}) => {
  return (
    <div className="self-stretch flex flex-col items-start justify-center gap-[8px] text-left text-xs text-dark font-menu-off">
      <div className="self-stretch relative">
        <span>
          <span className="text-sm font-extrabold font-menu-off">
            {mealAmountMealTime}
          </span>
          <span>{mealAmountPerPersonMealTi}</span>
        </span>
        <span className="text-sm font-extrabold text-red">*</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-[4px] text-grey-9">
        <div className="flex flex-row items-center justify-center gap-[2px]">
          <div className="bg-grey-e w-[60px] h-8" />
          <div className="bg-grey-e w-[60px] h-8" />
          <div className="bg-dark w-[60px] h-8 flex flex-row items-center justify-center">
            <Image
              width="24"
              height="24"
              className="relative w-3 h-3 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/outlinecheck2.svg"
            />
          </div>
          <div className="bg-grey-e w-[60px] h-8" />
          <div className="bg-grey-e w-[60px] h-8" />
        </div>
        <div className="self-stretch flex flex-row items-center justify-center">
          <div className="flex-1 relative font-extrabold">{eatingSpeed}</div>
          <div className="flex-1 relative font-extrabold text-dark text-center">
            보통
          </div>
          <div className="flex-1 relative font-extrabold text-right">
            {eatingSpeedDescription}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealQuantityContainer;
