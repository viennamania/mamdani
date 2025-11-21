import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import ListPost from "./list-post-home";

import Link from "next/link";


type ContainerCardFormType = {
  imageDimensions?: string;
  showFrameDiv?: boolean;
  frameDivVisible?: boolean;
  showRectangleIcon?: boolean;
  frameDivVisible1?: boolean;

  /** Style props */
  frameDivJustifyContent?: CSSProperties["justifyContent"];
  timeLineIconHeight?: CSSProperties["height"];
};



const ContainerCardFormHome: NextPage<ContainerCardFormType> = ({
  imageDimensions,
  showFrameDiv,
  frameDivVisible,
  showRectangleIcon,
  frameDivVisible1,
  frameDivJustifyContent,
  timeLineIconHeight,
}) => {
  const frameDiv6Style: CSSProperties = useMemo(() => {
    return {
      justifyContent: frameDivJustifyContent,
    };
  }, [frameDivJustifyContent]);

  const listPostStyle: CSSProperties = useMemo(() => {
    return {
      height: timeLineIconHeight,
    };
  }, [timeLineIconHeight]);


  return (
    <div
      className="self-stretch flex flex-col items-center justify-start gap-[12px]"
      style={frameDiv6Style}
    >

      <ListPost
        imageDimensions="/usermain/images/rectangle-62@2x.png"
        frameDiv
        showRectangleIcon
        propHeight="unset"
      />
      
      <ListPost
        imageDimensions="/usermain/images/rectangle-62@2x.png"
        frameDiv
        showRectangleIcon
        propHeight="unset"
      />


      <ListPost
        imageDimensions="/usermain/images/rectangle-62@2x.png"
        frameDiv
        showRectangleIcon
        propHeight="unset"
      />

    </div>
  );
};

export default ContainerCardFormHome;
