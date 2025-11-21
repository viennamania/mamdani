import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

import Image from "next/image";

type List4Type = {
  activityDescription?: string;
  showFa6SolidcheckIcon?: boolean;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propBorder?: CSSProperties["border"];
  propColor?: CSSProperties["color"];
};

const List4: NextPage<List4Type> = ({
  activityDescription,
  showFa6SolidcheckIcon,
  propBackgroundColor,
  propBorder,
  propColor,
}) => {
  const list1Style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
      border: propBorder,
    };
  }, [propBackgroundColor, propBorder]);

  const div9Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div
      className="self-stretch rounded-81xl bg-white flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-xl text-dark font-menu-off border-[2px] border-solid border-dark"
      style={list1Style}
    >
      <div className="flex-1 relative font-extrabold" style={div9Style}>
        {activityDescription}
      </div>
      {showFa6SolidcheckIcon && (
        <Image

          width="24"
          height="24"
          className="relative w-[21px] h-6 overflow-hidden shrink-0"
          alt=""
          src="/usermain/images/fa6solidcheck.svg"
        />
      )}
    </div>
  );
};

export default List4;
