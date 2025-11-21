import type { NextPage } from "next";
import Top1 from "./top1";

import FormContainerHome1 from "./form-container-home1";

import FormContainerHome2 from "./form-container-home2";

const FrameComponent10: NextPage = () => {
  return (

    <div className="bg-dark flex flex-col items-center justify-start text-center text-45xl text-orange font-montserrat">

      <Top1
        id="100000"
        logo="/usermain/images/logo2.svg"
        topBackgroundColor="unset"
        topBorderBottom="unset"
        topBoxSizing="unset"
        frameDivBorderBottom="unset"
        frameDivBoxSizing="unset"
        divColor="#fff"
        frameDivBorderBottom1="unset"
        frameDivBoxSizing1="unset"
        divColor1="#fff"
        frameDivBorderBottom2="unset"
        frameDivBoxSizing2="unset"
        divColor2="#fff"
        divColor3="#fff"
        aboutColor="#fff"
        frameDivBorder="1px solid rgba(255, 255, 255, 0.5)"
        divColor4="#fff"
        frameDivBorder1="1px solid #fff"
        divColor5="#fff"
      />
      
      <div className="flex flex-col items-center justify-start py-[100px] px-0 gap-[60px]">
        <div className="relative tracking-[0.2em] uppercase font-black">
          Let’s Doing Doit!
        </div>
        <div className="w-[1280px] overflow-hidden flex flex-row items-center justify-center gap-[100px] text-9xl text-dark font-jalnan">

          <FormContainerHome1
            dimensionText="/usermain/images/frame3.svg"
            messageText="알려주세요!"
          />
          
          <FormContainerHome2
            dimensionText="/usermain/images/frame4.svg"
            messageText="확인하세요!"
            propBackgroundColor="#fff"
            propWidth="84.7px"
            propBackgroundColor1="unset"
            propBorder="1px solid #212121"
            propColor="#212121"
          />
        </div>
      </div>
    </div>
  );
};

export default FrameComponent10;
