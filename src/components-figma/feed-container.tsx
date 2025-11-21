import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Goto from "./goto";

//import { Link } from "react-router-dom";
import Link from "next/link";


type FeedContainerType = {
  sectionTitle?: string;
  feedSectionSubtitle?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propAlignSelf?: CSSProperties["alignSelf"];
};

const FeedContainer: NextPage<FeedContainerType> = ({
  sectionTitle,
  feedSectionSubtitle,
  propFlex,
  propAlignSelf,
}) => {
  const frameDiv11Style: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
      alignSelf: propAlignSelf,
    };
  }, [propFlex, propAlignSelf]);

  return (

    <div
      className="flex-1 flex flex-col items-start justify-center gap-[20px] text-center text-sm text-dark font-menu-off"
      style={frameDiv11Style}
    >
      <Goto boardName="피드" />
      <div className="self-stretch relative text-17xl font-jalnan text-left">
        {feedSectionSubtitle}
      </div>
    </div>
    

  );
};

export default FeedContainer;
