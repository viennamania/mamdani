import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type InputMultiType = {
  prop?: string;

  /** Style props */
  inputMultiWidth?: CSSProperties["width"];
  inputMultiHeight?: CSSProperties["height"];
  inputMultiAlignSelf?: CSSProperties["alignSelf"];
};

const InputMulti: NextPage<InputMultiType> = ({
  prop,
  inputMultiWidth,
  inputMultiHeight,
  inputMultiAlignSelf,
}) => {
  const inputMultiStyle: CSSProperties = useMemo(() => {
    return {
      width: inputMultiWidth,
      height: inputMultiHeight,
      alignSelf: inputMultiAlignSelf,
    };
  }, [inputMultiWidth, inputMultiHeight, inputMultiAlignSelf]);

  return (
    <div
      className="w-full rounded bg-white box-border h-[100px] overflow-hidden shrink-0 flex flex-col items-start justify-start p-3 text-left text-sm text-grey-9 font-menu-off border-[1px] border-solid border-grey-d"
      style={inputMultiStyle}
    >
      <div className="self-stretch relative">{prop}</div>
    </div>
  );
};

export default InputMulti;
