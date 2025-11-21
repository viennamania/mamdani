import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type BtnBigOnType = {
  prop?: string;

  /** Style props */
  btnBigOnWidth?: CSSProperties["width"];
  btnBigOnBorderRadius?: CSSProperties["borderRadius"];
  btnBigOnAlignSelf?: CSSProperties["alignSelf"];
  btnBigOnBackgroundColor?: CSSProperties["backgroundColor"];
};

const BtnBigOn: NextPage<BtnBigOnType> = ({
  prop,
  btnBigOnWidth,
  btnBigOnBorderRadius,
  btnBigOnAlignSelf,
  btnBigOnBackgroundColor,
}) => {
  const btnBigOnStyle: CSSProperties = useMemo(() => {
    return {
      width: btnBigOnWidth,
      borderRadius: btnBigOnBorderRadius,
      alignSelf: btnBigOnAlignSelf,
      backgroundColor: btnBigOnBackgroundColor,
    };
  }, [
    btnBigOnWidth,
    btnBigOnBorderRadius,
    btnBigOnAlignSelf,
    btnBigOnBackgroundColor,
  ]);

  return (
    <div
      className="w-full rounded-81xl bg-dark h-14 flex flex-row items-center justify-center text-center text-base text-white font-menu-off"
      style={btnBigOnStyle}
    >
      <div className="flex-1 relative font-extrabold w-40 ">{prop}</div>
    </div>
  );
};

export default BtnBigOn;
