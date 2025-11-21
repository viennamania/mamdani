import type { NextPage } from "next";
///import Top1 from "./top1";

import FormContainerHome1 from "./form-container-home1";

import FormContainerHome2 from "./form-container-home2";


import React, { useEffect } from "react";


import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";



const FrameComponentHome: NextPage = () => {


  const squareVariants = {
    //visible: { opacity: 1, scale: 4, transition: { duration: 1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0 }
  };

  const controls = useAnimation();



  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);



  const controlsTitle = useAnimation();

  const [refTitle, inViewTitle] = useInView();

  useEffect(() => {
    if (inViewTitle) {
      controlsTitle.start("visible");
    }
  }, [controlsTitle, inViewTitle]);



  const controlsStart1 = useAnimation();

  const [refStart1, inViewStart1] = useInView();

  useEffect(() => {
    if (inViewStart1) {
      controlsStart1.start("visible");
    }
  }, [controlsStart1, inViewStart1]);



  const controlsStart2 = useAnimation();

  const [refStart2, inViewStart2] = useInView();

  useEffect(() => {
    if (inViewStart2) {
      controlsStart2.start("visible");
    }
  }, [controlsStart2, inViewStart2]);



  return (

    <div className="bg-dark flex flex-col items-center justify-start text-center text-45xl text-orange font-montserrat w-full">

      

      <div className="flex flex-col items-center justify-start  py-[30px]  xl:py-[100px] gap-[40px]  xl:gap-[60px]">
        

        <motion.div
          ref={refTitle}
          animate={controlsTitle}
          
          initial="hidden"

          variants={squareVariants}
          whileInView={{ scale: 1 } }
        >
          <div className="relative tracking-[0.2em] uppercase font-black text-5xl  xl:text-45xl ">
            Let’s Doing Doit!
          </div>
        </motion.div>

        

        
        <div className=" xl:w-[1280px] overflow-hidden flex flex-row items-center justify-center gap-[20px] xl:gap-[100px] text-9xl text-dark font-jalnan">


          <motion.div
            ref={refStart1}
            animate={controlsStart1}
            initial="hidden"
            variants={squareVariants}

            whileInView={{ scale: 1 } }
          >
            <FormContainerHome1
              dimensionText="/usermain/images/frame3.svg"
              messageText="알려주세요!"
            />
          </motion.div>
            
          <motion.div
            ref={refStart2}
            animate={controlsStart2}
            initial="hidden"
            variants={squareVariants}

            whileInView={{ scale: 1 } }
          >
            <FormContainerHome2
              dimensionText="/usermain/images/frame4.svg"
              messageText="확인하세요!"
              propBackgroundColor="#fff"
              propWidth="84.7px"
              propBackgroundColor1="unset"
              propBorder="1px solid #212121"
              propColor="#212121"
            />
          </motion.div>

        </div>


      </div>

    </div>
  );
};

export default FrameComponentHome;
