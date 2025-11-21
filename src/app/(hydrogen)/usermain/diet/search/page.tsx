'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Bread1 from "@/components-figma/bread1";
import SearchBig from "@/components-figma/search-big";
import ListSearch from "@/components-figma/list-search";
import Page from "@/components-figma/page";
import Footer from "@/components-figma/footer";
import Link from "next/link";

const Frame17: NextPage = () => {
  return (
    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start text-center text-base text-dark font-menu-off">
      <div className="self-stretch flex flex-col items-center justify-start">
        <Top1
          logo="/usermain/images/logo1.svg"
          topBackgroundColor="#fff"
          topBorderBottom="1px solid #ddd"
          topBoxSizing="border-box"
          frameDivBorderBottom="2px solid #212121"
          frameDivBoxSizing="border-box"
          divColor="#212121"
          frameDivBorderBottom1="unset"
          frameDivBoxSizing1="unset"
          divColor1="#212121"
          frameDivBorderBottom2="unset"
          frameDivBoxSizing2="unset"
          divColor2="#212121"
          divColor3="#212121"
          aboutColor="#212121"
          frameDivBorder="1px solid #666"
          divColor4="#212121"
          frameDivBorder1="1px solid #666"
          divColor5="#212121"
        />
        <div className="self-stretch bg-background flex flex-col items-center justify-start py-10 px-0">
          <div className="xl: flex flex-col items-center justify-start">
            <div className="self-stretch bg-white flex flex-col items-center justify-end p-10 gap-[40px]">
              <Bread1
                feedInputText="당신의 식단을 알려주세요!"
                propAlignSelf="unset"
                propWidth="920px"
              />
              <div className="self-stretch flex flex-row items-center justify-center">

              <Link
                  href="/usermain/diet"
                  className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-dark">
                  <div className="flex-1 relative font-extrabold">
                    음식 검색
                  </div>
                </Link>

                <Link
                  href="/usermain/diet/my"
                  className=" no-underline flex-1 box-border h-14 flex flex-row items-center justify-start text-grey-9 border-b-[2px] border-solid border-grey-d">
                  <div className="flex-1 relative font-extrabold">My 음식</div>
                </Link>

              </div>

              <SearchBig dishNameInput="오징어된장국" propColor="#212121" />
              <div className="self-stretch flex flex-col items-center justify-end gap-[20px] text-sm">
                <div className="self-stretch flex flex-col items-center justify-end">
                    
                  <div className="self-stretch bg-grey-f1 flex flex-row items-center justify-center py-3 px-5">
                    <div className="flex-1 relative text-left">식품명</div>
                    <div className="relative flex items-center justify-center w-20 shrink-0">
                      kcal
                    </div>
                    <div className="relative flex items-center justify-center w-20 shrink-0">
                      탄수화물(g)
                    </div>
                    <div className="relative flex items-center justify-center w-20 shrink-0">
                      단백질(g)
                    </div>
                    <div className="relative flex items-center justify-center w-20 shrink-0">
                      지방(g)
                    </div>
                    <div className="relative flex items-center justify-center w-[100px] shrink-0">
                      포화지방산(g)
                    </div>
                    <div className="relative flex items-center justify-center w-20 shrink-0">
                      당류(g)
                    </div>
                    <div className="relative flex items-center justify-center w-20 shrink-0">
                      나트륨(mg)
                    </div>
                    <div className="relative flex items-center justify-center w-[120px] shrink-0">
                      콜레스테롤(mg)
                    </div>
                  </div>



                    <ListSearch checkBoxIcon={false} />


                  <ListSearch checkBoxIcon={false} />
                  <ListSearch checkBoxIcon={false} />
                  <ListSearch checkBoxIcon={false} />
                  <ListSearch checkBoxIcon={false} />
                  <ListSearch checkBoxIcon={false} />
                  <ListSearch checkBoxIcon={false} />
                  <ListSearch checkBoxIcon={false} />
                  

                </div>
                <Page />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer
        footerAlignSelf="stretch"
        footerBorderTop="1px solid #eee"
        footerBoxSizing="border-box"
      />
    </div>
  );
};

export default Frame17;
