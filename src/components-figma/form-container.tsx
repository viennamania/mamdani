import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

import Link from "next/link";

type FormContainerType = {
  dimensionText?: string;
  messageText?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propWidth?: CSSProperties["width"];
  propBackgroundColor1?: CSSProperties["backgroundColor"];
  propBorder?: CSSProperties["border"];
  propColor?: CSSProperties["color"];
};

const FormContainer: NextPage<FormContainerType> = ({
  dimensionText,
  messageText,
  propBackgroundColor,
  propWidth,
  propBackgroundColor1,
  propBorder,
  propColor,
}) => {
  const ellipseDivStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const frameIconStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const frameDiv10Style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor1,
      border: propBorder,
    };
  }, [propBackgroundColor1, propBorder]);

  const div18Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div className="relative w-[360px] h-[360px] overflow-hidden shrink-0 text-center text-9xl text-dark font-jalnan">
      <div
        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-gray-200"
        style={ellipseDivStyle}
      />
      <div className="absolute top-[calc(50%_-_131.5px)] left-[calc(50%_-_87.5px)] flex flex-col items-center justify-start gap-[20px]">
        <img
          className="relative w-[158.7px] h-[120px] overflow-hidden shrink-0"
          alt=""
          src={dimensionText}
          style={frameIconStyle}
        />
        <div className="flex flex-col items-center justify-center gap-[16px]">
          <div className="relative">
            <p className="[margin-block-start:0] [margin-block-end:8px]">
              당신의 식단을
            </p>
            <p className="m-0">{messageText}</p>
          </div>

          <Link
            ///href="/usermain/diet"

            href="/usermain/feeds/write1/-1"

            className=" no-underline rounded-81xl bg-dark flex flex-row items-center justify-center py-3 px-6 text-sm text-white font-menu-off"
            style={frameDiv10Style}
          >
            <div className="relative font-extrabold" style={div18Style}>
              시작
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default FormContainer;
