import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";


import Image from "next/image";

type SelectBoxType = {
  prop?: string;

  /** Style props */
  selectBoxWidth?: CSSProperties["width"];
  selectBoxFlex?: CSSProperties["flex"];
  selectBoxAlignSelf?: CSSProperties["alignSelf"];
};

const SelectBox: NextPage<SelectBoxType> = ({
  prop,
  selectBoxWidth,
  selectBoxFlex,
  selectBoxAlignSelf,
}) => {
  const selectBoxStyle: CSSProperties = useMemo(() => {
    return {
      width: selectBoxWidth,
      flex: selectBoxFlex,
      alignSelf: selectBoxAlignSelf,
    };
  }, [selectBoxWidth, selectBoxFlex, selectBoxAlignSelf]);

  return (
    <div
      className="w-full rounded bg-white box-border h-11 flex flex-row items-center justify-start py-0 px-3 text-left text-sm text-grey-3 font-menu-off border-[1px] border-solid border-grey-d"
      style={selectBoxStyle}
    >
      <div className="flex-1 relative">{prop}</div>
      <Image
        width="24"
        height="24"
        className="relative w-6 h-6"
        alt=""
        src="/usermain/images/xnixline-down-arrow-5.svg"
      />
    </div>
  );
};

export default SelectBox;
