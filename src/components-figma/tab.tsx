import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type TabType = {
  faqTitle?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propColor?: CSSProperties["color"];
};

const Tab: NextPage<TabType> = ({
  faqTitle,
  propBackgroundColor,
  propColor,
}) => {
  const tabStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const div7Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div
      className="rounded-81xl bg-grey-f1 flex flex-row items-center justify-center py-3 px-8 text-left text-sm text-grey-9 font-menu-off"
      style={tabStyle}
    >
      <div className="relative font-extrabold" style={div7Style}>
        {faqTitle}
      </div>
    </div>
  );
};

export default Tab;
