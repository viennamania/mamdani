import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Image from "next/image";

type BoxListType = {
  boxListBoxList?: string;

  /** Style props */
  boxListIconPosition?: CSSProperties["position"];
  boxListIconFlexShrink?: CSSProperties["flexShrink"];
};

const BoxList: NextPage<BoxListType> = ({
  boxListBoxList,
  boxListIconPosition,
  boxListIconFlexShrink,
}) => {
  const boxListIconStyle: CSSProperties = useMemo(() => {
    return {
      position: boxListIconPosition,
      flexShrink: boxListIconFlexShrink,
    };
  }, [boxListIconPosition, boxListIconFlexShrink]);

  return (
    <Image
      width={84}
      height={84}
      className="rounded w-[84px] h-[84px] overflow-hidden"
      alt=""
      src={boxListBoxList || ""}
      style={boxListIconStyle}
    />
  );
};

export default BoxList;
