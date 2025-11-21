'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Component4 from "@/components-figma/component4";
import Footer from "@/components-figma/footer";

const Frame15: NextPage = () => {
  return (

    <>

    <div className="bg-dark sticky top-0 z-50 ">

    <Top1
          logo="/usermain/images/logo1.svg"
          topBackgroundColor="#fff"
          topBorderBottom="1px solid #ddd"
          topBoxSizing="border-box"
          //////////////frameDivBorderBottom="2px solid #212121"
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
    </div>


    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start">
      <div className="self-stretch flex flex-col items-center justify-start">
     
        <Component4 />
        
      </div>
      <Footer
        footerAlignSelf="stretch"
        footerBorderTop="1px solid #eee"
        footerBoxSizing="border-box"
      />
    </div>

    </>
  );
};

export default Frame15;
