import type { NextPage } from "next";
import FeedContainerHome from "./feed-container-home";
import List3 from "./list3";



import React, { useEffect } from "react";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const squareVariants = {
  visible: { opacity: 1, scale: 4, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0 }
};

function Square() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={squareVariants}
      className="square"
    >


        <div className="self-stretch flex flex-row items-center justify-center gap-[40px] text-left text-xs">
          <List3
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
            propOpacity="0.25"
          />
          <List3
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
          />
          <List3
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
            propOpacity="unset"
          />
          <List3
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
            propOpacity="0.25"
          />
        </div>

    </motion.div>
  );
}





const Component5: NextPage = () => {
  return (
    <div className="self-stretch bg-white flex flex-col items-center justify-start py-[100px] px-0 text-center text-sm text-dark font-menu-off">
      <div className="xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">
       
        <div className="self-stretch flex flex-row items-end justify-between">

          <FeedContainerHome
            sectionTitle="피드"
            feedSectionSubtitle="당신의 식단을 전문가가 분석해 드려요!"
          />
          <div className="flex flex-row items-center justify-center gap-[4px]">
            <img
              className="relative w-8 h-8 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/arrowleftcircleline.svg"
            />
            <img
              className="relative w-8 h-8 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/arrowrightcircleline.svg"
            />
          </div>
        </div>

        {/*
        <Square />
        */}

             
        <div className="self-stretch flex flex-row items-center justify-center gap-[40px] text-left text-xs">
          <List3
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
            propOpacity="0.25"
          />
          <List3
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
          />
          <List3
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
            propOpacity="unset"
          />
          <List3
            cakeDescription="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            frameDiv={false}
            showRectangleIcon
            propOpacity="0.25"
          />
        </div>
        


      </div>
    </div>
  );
};

export default Component5;
