import type { NextPage } from "next";

import React, { use, useEffect } from "react";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { set } from "lodash";



type ListDietBar1Type = {
  bar?: any;
};

const ListDietBar: NextPage<ListDietBar1Type> = ({ bar }) => {




  const [widthBar, setWidthBar] = React.useState( "100%");

  useEffect(() => {
    
    
    //if (!bar) return;

    /*
    if (!bar || bar === undefined || bar === null || bar === "" || bar === 0) {
      setWidthBar("0%");
      return;
    }

    setWidthBar(bar + "%");
    */

  


  } , [bar]);


  /////console.log("ListDietBar bar=====", bar);



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


  ////console.log("ListDietBar bar=====", bar);
  

  return (
  
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={squareVariants}
    >

      {!bar || bar === undefined || bar === null || bar === "" || bar === 0  ?  (

        <div className={`self-stretch rounded-sm  h-2 flex flex-row items-center justify-end py-0 px-3 box-border bg-white` }>
        </div>


      ) : (

        <div className={`self-stretch rounded-sm  h-2 flex flex-row items-center justify-end py-0 px-3 box-border

        ${
          //(bar > 0 && bar <= 20) ? "bg-[#07B804]" : (bar > 20 && bar <= 40) ? "bg-[#07B804]" : (bar > 40 && bar <= 60) ? "bg-[#FBBC04]" : (bar > 60 && bar <= 80) ? "bg-[#FBBC04]" : (bar > 80) && "bg-red" 

          (bar > 0 && bar <= 20) ? "bg-good" : (bar > 20 && bar <= 40) ? "bg-good" : (bar > 40 && bar <= 60) ? "bg-std" : (bar > 60 && bar <= 80) ? "bg-std" : (bar > 80) && "bg-bad" 
        }
        
        `}>

    </div>

      )}

    </motion.div>


  );
};

export default ListDietBar;
