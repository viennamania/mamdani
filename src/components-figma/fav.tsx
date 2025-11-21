import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type FavType = {
  foodName?: string;
  showStarLineIcon?: boolean;
  starFillIcon?: boolean;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propBorder?: CSSProperties["border"];
  propColor?: CSSProperties["color"];
};

const Fav: NextPage<FavType> = ({
  foodName,
  showStarLineIcon,
  starFillIcon,
  propBackgroundColor,
  propBorder,
  propColor,
}) => {
  const favStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
      border: propBorder,
    };
  }, [propBackgroundColor, propBorder]);

  const div16Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div
      className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-start py-3 px-5 gap-[8px] text-center text-sm text-grey-9 font-menu-off"
      style={favStyle}
    >
      {showStarLineIcon && (
        <img
          className="relative w-4 h-4 overflow-hidden shrink-0"
          alt=""
          src="/usermain/images/starline.svg"
        />
      )}
      {!starFillIcon && (
        <img
          className="relative w-4 h-4 overflow-hidden shrink-0 hidden"
          alt=""
          src="/usermain/images/starfill.svg"
        />
      )}
      <div className="relative font-extrabold" style={div16Style}>
        {foodName}
      </div>
    </div>
  );
};

export default Fav;
