import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Goto from "./goto";

//import { Link } from "react-router-dom";
import Link from "next/link";

import {  motion } from "framer-motion";


type FeedContainerType = {
  sectionTitle?: string;
  feedSectionSubtitle?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propAlignSelf?: CSSProperties["alignSelf"];
};

const FeedContainerHome: NextPage<FeedContainerType> = ({
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
      className=" flex-1 flex flex-col items-start justify-center gap-[20px] text-center text-sm text-dark font-menu-off "
      style={frameDiv11Style}
    >


      <motion.div
        className="box"
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          href="/usermain/feeds"
          className=" no-underline flex"
          >
          <Goto boardName="피드" />
        </Link>
      </motion.div>



      <div className="self-stretch relative text-xl xl:text-17xl font-jalnan text-left">
        {feedSectionSubtitle}
      </div>
    

    </div>

  );
};

export default FeedContainerHome;
