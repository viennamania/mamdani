import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type InputBoxType = {
  prop?: string;

  /** Style props */
  inputBoxWidth?: CSSProperties["width"];
  inputBoxAlignSelf?: CSSProperties["alignSelf"];
};

const InputBox: NextPage<InputBoxType> = ({
  prop,
  inputBoxWidth,
  inputBoxAlignSelf,
}) => {
  const inputBoxStyle: CSSProperties = useMemo(() => {
    return {
      width: inputBoxWidth,
      alignSelf: inputBoxAlignSelf,
    };
  }, [inputBoxWidth, inputBoxAlignSelf]);

  return (
    <div
      className="w-full rounded bg-white box-border h-11 overflow-hidden shrink-0 flex flex-col items-start justify-center py-0 px-3 text-left text-sm text-grey-9 font-menu-off border-[1px] border-solid border-grey-d"
      style={inputBoxStyle}
    >
      <div className="self-stretch relative">{prop}</div>
    </div>
  );
};

export default InputBox;
