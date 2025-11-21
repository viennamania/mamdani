import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import InputBox from "./input-box";

type FormWithVerificationCodeType = {
  phoneNumber?: string;
  verificationCode?: string;

  /** Style props */
  propColor?: CSSProperties["color"];
};

const FormWithVerificationCode: NextPage<FormWithVerificationCodeType> = ({
  phoneNumber,
  verificationCode,
  propColor,
}) => {
  const div10Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div className="self-stretch flex flex-col items-start justify-center gap-[8px] text-left text-sm text-dark font-menu-off">
      <div className="self-stretch relative font-extrabold">핸드폰번호</div>
      <InputBox
        prop="01012345678"
        inputBoxWidth="unset"
        inputBoxAlignSelf="stretch"
        //inputBoxFlexShrink="0"
        //inputBoxFlex="unset"
        //divColor="#212121"
        //divTextAlign="left"
      />
      <div className="self-stretch rounded bg-white box-border h-11 overflow-hidden shrink-0 flex flex-row items-center justify-between py-0 px-3 text-base text-grey-9 border-[1px] border-solid border-grey-d">
        <div className="flex-1 relative" style={div10Style}>
          {verificationCode}
        </div>
        <div className="relative text-3xs text-red text-right">02:59</div>
      </div>
    </div>
  );
};

export default FormWithVerificationCode;
