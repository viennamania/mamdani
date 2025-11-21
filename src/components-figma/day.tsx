import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type DayType = {
  numberValue?: string;
  rectangleDiv?: boolean;
  rectangleDiv1?: boolean;
  rectangleDiv2?: boolean;
  rectangleDiv3?: boolean;
  rectangleDiv4?: boolean;

  /** Style props */
  propOpacity?: CSSProperties["opacity"];
  propBorderRadius?: CSSProperties["borderRadius"];
  propBorder?: CSSProperties["border"];
  propColor?: CSSProperties["color"];
};

const Day: NextPage<DayType> = ({
  numberValue,
  rectangleDiv,
  rectangleDiv1,
  rectangleDiv2,
  rectangleDiv3,
  rectangleDiv4,
  propOpacity,
  propBorderRadius,
  propBorder,
  propColor,
}) => {
  const dayStyle: CSSProperties = useMemo(() => {
    return {
      opacity: propOpacity,
      borderRadius: propBorderRadius,
      border: propBorder,
    };
  }, [propOpacity, propBorderRadius, propBorder]);

  const div15Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center p-5 gap-[12px] text-center text-sm text-dark font-menu-off"
      style={dayStyle}
    >
      <div className="self-stretch relative font-extrabold" style={div15Style}>
        {numberValue}
      </div>
      <div className="self-stretch h-9 flex flex-col items-center justify-start py-0 px-5 box-border gap-[4px]">
        {!rectangleDiv4 && (
          <div className="self-stretch relative bg-red h-1 hidden" />
        )}
        {!rectangleDiv && (
          <div className="self-stretch relative bg-orange1 h-1 hidden" />
        )}
        {!rectangleDiv2 && (
          <div className="self-stretch relative bg-orange1 h-1 hidden" />
        )}
        {!rectangleDiv3 && (
          <div className="self-stretch relative bg-limegreen h-1 hidden" />
        )}
        {!rectangleDiv4 && (
          <div className="self-stretch relative bg-limegreen h-1 hidden" />
        )}
      </div>
    </div>
  );
};

export default Day;
