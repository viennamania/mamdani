import type { NextPage } from "next";
import Bread1 from "./bread1";
import Fav from "./fav";
import Search from "./search";
import BtnBigOn from "./btn-big-on";

import Link from "next/link";

const Component4: NextPage = () => {
  return (
    <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0 text-left text-base text-dark font-menu-off">
      <div className="xl:w-[1000px] flex flex-col items-center justify-start">
        
        <div className="self-stretch bg-white flex flex-col items-center justify-end p-10 gap-[40px]">
          <Bread1
            feedInputText="당신의 식단을 알려주세요!"
            propAlignSelf="unset"
            propWidth="920px"
          />

          <div className="self-stretch flex flex-col items-start justify-center gap-[12px]">
            <div className="self-stretch relative font-extrabold">
              즐겨찾는 음식
            </div>
            <div className="flex flex-row items-center justify-center gap-[8px] text-center text-sm text-grey-9">
              <Fav foodName="된장국" showStarLineIcon starFillIcon={false} />
              <Fav
                foodName="식품명"
                showStarLineIcon={false}
                starFillIcon
                propBackgroundColor="#fff"
                propBorder="1px solid #212121"
                propColor="#212121"
              />
            </div>
          </div>
          <div className="self-stretch relative h-px">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-grey-e" />
          </div>
          <div className="self-stretch flex flex-col items-start justify-center gap-[12px]">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center gap-[12px]">
                <div className="relative font-extrabold">최근식단순</div>
                <div className="relative bg-grey-c w-px h-3" />
                <div className="relative text-grey-9">가나다순</div>
              </div>
              <Search prop="식품명 검색" searchWidth="400px" />
            </div>
            <div className="flex flex-col items-start justify-center gap-[8px]">
              <div className="flex flex-row items-center justify-center gap-[8px]">
                <Fav
                  foodName="된장국"
                  showStarLineIcon
                  starFillIcon={false}
                  propBackgroundColor="#f1f1f1"
                  propBorder="unset"
                  propColor="#999"
                />
                <Fav
                  foodName="식품명"
                  showStarLineIcon={false}
                  starFillIcon
                  propBackgroundColor="#fff"
                  propBorder="1px solid #212121"
                  propColor="#212121"
                />
                <Fav
                  foodName="식품명"
                  showStarLineIcon={false}
                  starFillIcon
                  propBackgroundColor="#fff"
                  propBorder="1px solid #212121"
                  propColor="#212121"
                />
                <Fav
                  foodName="식품명"
                  showStarLineIcon={false}
                  starFillIcon
                  propBackgroundColor="#fff"
                  propBorder="1px solid #212121"
                  propColor="#212121"
                />
              </div>
              <div className="flex flex-row items-center justify-center gap-[8px]">
                <Fav
                  foodName="식품명"
                  showStarLineIcon={false}
                  starFillIcon
                  propBackgroundColor="#fff"
                  propBorder="1px solid #212121"
                  propColor="#212121"
                />
                <Fav
                  foodName="된장국"
                  showStarLineIcon
                  starFillIcon={false}
                  propBackgroundColor="#f1f1f1"
                  propBorder="unset"
                  propColor="#999"
                />
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/usermain/diet/my"
          className=" no-underline self-stretch flex flex-row items-center justify-center"
        >
        <BtnBigOn
          prop="3개 선택 완료"
          btnBigOnWidth="unset"
          btnBigOnBorderRadius="unset"
          btnBigOnAlignSelf="stretch"
          btnBigOnBackgroundColor="#212121"
        />
        </Link>


      </div>
    </div>
  );
};

export default Component4;
