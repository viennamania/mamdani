import type { NextPage } from "next";

import React, { use, useEffect } from "react";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";



type ListDietBar1Type = {
  boardName?: string;
  mealAmount?: number;
};

const ListDietBar1: NextPage<ListDietBar1Type> = ({ boardName, mealAmount }) => {

  const [widthBar, setWidthBar] = React.useState("10%");
  const [textBar, setTextBar] = React.useState("");

  useEffect(() => {

    console.log("mealAmount : " + mealAmount);
    
    if (mealAmount == 1) {

      setWidthBar("30%");
      setTextBar("아주적게");

    } else if (mealAmount == 2) {
      setWidthBar("40%");
      setTextBar("적게");

    } else if (mealAmount == 3) {
      setWidthBar("50%");
      setTextBar("보통");
    } else if (mealAmount == 4) {
      setWidthBar("75%");
      setTextBar("많이");
    } else {
      setWidthBar("100%");
      setTextBar("아주많이");
    }

  } , [mealAmount]);



  const squareVariants = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { width : widthBar, transition: { duration: 1 } },
    hidden: { width: 0 }
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    } 
  }, [controls, inView]);

  

  return (

    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={squareVariants}
    >
    <div className="self-stretch rounded-81xl bg-orange  h-6 flex flex-row items-center justify-end py-0 px-3 box-border">
      <div className="relative font-extrabold  ">
        {textBar}
      </div>
    </div>
    </motion.div>

  );
};

export default ListDietBar1;
