import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type RankingType = {
  menuNumber?: string;
  dishName?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propFontWeight?: CSSProperties["fontWeight"];
};

const Ranking: NextPage<RankingType> = ({
  menuNumber,
  dishName,
  propBackgroundColor,
  propFontWeight,
}) => {
  const frameDiv7Style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const div10Style: CSSProperties = useMemo(() => {
    return {
      fontWeight: propFontWeight,
    };
  }, [propFontWeight]);

  return (
    <div className="flex flex-row items-center justify-center gap-[12px] text-left text-sm xl:text-base text-white font-menu-off">
      
      <div
        className="rounded-lg bg-orange w-6 h-6 xl:w-8 xl:h-8 flex flex-col items-center justify-center"
        style={frameDiv7Style}
      >
        <div className="relative font-extrabold">{menuNumber}</div>
      </div>

      <div className="relative font-extrabold text-dark  w-56 xl:w-36 " style={div10Style}>
        {dishName}
      </div>
    </div>
  );
};

export default Ranking;
