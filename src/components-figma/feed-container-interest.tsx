import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import ListFeed from "./list-feed";

type FeedContainer1Type = {
  messageText?: string;
  showFrameDiv?: boolean;
  frameDivVisible?: boolean;
  rectangleIcon?: boolean;

  /** Style props */
  divAlignItems?: CSSProperties["alignItems"];
};

const FeedContainerInterest: NextPage<FeedContainer1Type> = ({
  messageText,
  showFrameDiv,
  frameDivVisible,
  rectangleIcon,
  divAlignItems,
}) => {
  const frameDiv9Style: CSSProperties = useMemo(() => {
    return {
      alignItems: divAlignItems,
    };
  }, [divAlignItems]);

  return (
    <div
      className="self-stretch flex flex-row items-start justify-center gap-[40px]"
      style={frameDiv9Style}
    >
      <ListFeed
        cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
        frameDiv
        showRectangleIcon
        propOpacity="unset"
      />
      
      <ListFeed
        cakeDescription="영양사님 너무 과식한거 같은데 어떻하죠 ㅜㅜ"
        frameDiv
        showRectangleIcon={false}
        propOpacity="unset"
      />


    </div>
  );
};

export default FeedContainerInterest;
