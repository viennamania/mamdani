import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type InputDateType = {
  /** Style props */
  inputDateWidth?: CSSProperties["width"];
};

const InputDate: NextPage<InputDateType> = ({ inputDateWidth }) => {
  const inputDateStyle: CSSProperties = useMemo(() => {
    return {
      width: inputDateWidth,
    };
  }, [inputDateWidth]);

  return (
    <div
      className="w-full rounded bg-white box-border h-11 overflow-hidden shrink-0 flex flex-row items-center justify-start py-0 px-3 gap-[12px] text-left text-sm text-grey-9 font-menu-off border-[1px] border-solid border-grey-d"
      style={inputDateStyle}
    >
      <div className="flex-1 relative">2022.01.01</div>
      <img
        className="relative w-6 h-6 overflow-hidden shrink-0"
        alt=""
        src="/usermain/images/feather-icons--calendar.svg"
      />
    </div>
  );
};

export default InputDate;
