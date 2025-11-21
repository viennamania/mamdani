import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type TagType = {
  prop?: string;
  x?: string;

  /** Style props */
  tagBackgroundColor?: CSSProperties["backgroundColor"];
  divColor?: CSSProperties["color"];
};

const Tag: NextPage<TagType> = ({ prop, x, tagBackgroundColor, divColor }) => {
  const tagStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: tagBackgroundColor,
    };
  }, [tagBackgroundColor]);

  const divStyle: CSSProperties = useMemo(() => {
    return {
      color: divColor,
    };
  }, [divColor]);

  return (
    <div
      className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-start py-3 px-5 gap-[20px] text-center text-xs text-grey-9 font-menu-off"
      style={tagStyle}
    >
      <div className="relative font-extrabold" style={divStyle}>
        {prop}
      </div>
      <img
        className="relative w-4 h-4 overflow-hidden shrink-0"
        alt=""
        src={x}
      />
    </div>
  );
};

export default Tag;
