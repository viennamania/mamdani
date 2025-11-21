import type { NextPage } from "next";
import { useMemo, type CSSProperties, useState, useEffect, use } from "react";




import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";




type MealStatisticsContainerType = {
  barBreakfast?: string;
  barLunch?: string;
  barDinner?: string;
  barSnack?: string;
  barMidnightSnack?: string;

  mealAmountStatsMealTimeSt?: string;
  healthyEatingTip1HealthyE?: string;
  eatingSpeedTip?: string;
  eatingSpeedDescription?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
};

const MealStatisticsContainer: NextPage<MealStatisticsContainerType> = ({
  barBreakfast,
  barLunch,
  barDinner,
  barSnack,
  barMidnightSnack,
  mealAmountStatsMealTimeSt,
  healthyEatingTip1HealthyE,
  eatingSpeedTip,
  eatingSpeedDescription,
  propBackgroundColor,
}) => {


  const rectangleDivStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);




  const [heightBarBreakfast, setHeightBarBreakfast] = useState( barBreakfast + "%");
  const [heightBarLunch, setHeightBarLunch] = useState( barLunch + "%");
  const [heightBarDinner, setHeightBarDinner] = useState( barDinner + "%");
  const [heightBarSnack, setHeightBarSnack] = useState( barSnack + "%");
  const [heightBarMidnightSnack, setHeightBarMidnightSnack] = useState( barMidnightSnack + "%");

 
 
  const colorBarBreakfast = useMemo(() => {

    if (barBreakfast === "0") {
      return "bg-grey-e";
    } else if (barBreakfast === "20") {
      return "bg-good";
    } else if (barBreakfast === "40") {
      return "bg-good";
    } else if (barBreakfast === "60") {
      return "bg-std";
    } else if (barBreakfast === "80") {
      return "bg-bad";
    } else if (barBreakfast === "100") {
      return "bg-bad";
    }

  } , [barBreakfast]);


  const colorBarLunch = useMemo(() => {
      
      if (barLunch === "0") {
        return "bg-grey-e";
      } else if (barLunch === "20") {
        return "bg-good";
      } else if (barLunch === "40") {
        return "bg-good";
      } else if (barLunch === "60") {
        return "bg-std";
      } else if (barLunch === "80") {
        return "bg-bad";
      } else if (barLunch === "100") {
        return "bg-bad";
      }
  
    }
    , [barLunch]);

  const colorBarDinner = useMemo(() => {
      
      if (barDinner === "0") {
        return "bg-grey-e";
      } else if (barDinner === "20") {
        return "bg-good";
      } else if (barDinner === "40") {
        return "bg-good";
      } else if (barDinner === "60") {
        return "bg-std";
      } else if (barDinner === "80") {
        return "bg-bad";
      } else if (barDinner === "100") {
        return "bg-bad";
      }
  
    } , [barDinner]);


  const colorBarSnack = useMemo(() => {
      
      if (barSnack === "0") {
        return "bg-grey-e";
      } else if (barSnack === "20") {
        return "bg-good";
      } else if (barSnack === "40") {
        return "bg-good";
      } else if (barSnack === "60") {
        return "bg-std";
      } else if (barSnack === "80") {
        return "bg-bad";
      } else if (barSnack === "100") {
        return "bg-bad";
      }
  
    } , [barSnack]);

  
  const colorBarMidnightSnack = useMemo(() => {
      
      if (barMidnightSnack === "0") {
        return "bg-grey-e";
      } else if (barMidnightSnack === "20") {
        return "bg-good";
      } else if (barMidnightSnack === "40") {
        return "bg-good";
      } else if (barMidnightSnack === "60") {
        return "bg-std";
      } else if (barMidnightSnack === "80") {
        return "bg-bad";
      } else if (barMidnightSnack === "100") {
        return "bg-bad";
      }
  
    } , [barMidnightSnack]);



  const squareVariantsBreakfast = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    
    visible: { height : heightBarBreakfast, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };

  const squareVariantsLunch = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarLunch, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };

  const squareVariantsDinner = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarDinner, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };

  const squareVariantsSnack = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarSnack, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };

  const squareVariantsMidnightSnack = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarMidnightSnack, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };


  const controlsBreakfast = useAnimation();
  const controlsLunch = useAnimation();
  const controlsDinner = useAnimation();
  const controlsSnack = useAnimation();
  const controlsMidnightSnack = useAnimation();

  
  const [refBreakfast, inViewBreakfast] = useInView();
  const [refLunch, inViewLunch] = useInView();
  const [refDinner, inViewDinner] = useInView();
  const [refSnack, inViewSnack] = useInView();
  const [refMidnightSnack, inViewMidnightSnack] = useInView();




  useEffect(() => {
    
    setHeightBarBreakfast(barBreakfast + "%");
    setHeightBarLunch(barLunch + "%");
    setHeightBarDinner(barDinner + "%");
    setHeightBarSnack(barSnack + "%");
    setHeightBarMidnightSnack(barMidnightSnack + "%");

  } , [barBreakfast, barLunch, barDinner, barSnack, barMidnightSnack]);



  
  useEffect(() => {
    if (heightBarBreakfast === "0%") {
      controlsBreakfast.start("hidden");
    } else {
      controlsBreakfast.start("visible");
    } 

    if (heightBarLunch === "0%") {
      controlsLunch.start("hidden");
    } else {
      controlsLunch.start("visible");
    }

    if (heightBarDinner === "0%") {
      controlsDinner.start("hidden");
    } else {
      controlsDinner.start("visible");
    }

    if (heightBarSnack === "0%") {
      controlsSnack.start("hidden");
    } else {
      controlsSnack.start("visible");
    }

    if (heightBarMidnightSnack === "0%") {
      controlsMidnightSnack.start("hidden");
    } else {
      controlsMidnightSnack.start("visible");
    }

  } , [heightBarBreakfast, heightBarLunch, heightBarDinner, heightBarSnack, heightBarMidnightSnack]);
  

  useEffect(() => {
    if (inViewBreakfast) {
      
      controlsBreakfast.start("visible");

    } else {

      controlsBreakfast.start("hidden");
    } 
  }, [controlsBreakfast, inViewBreakfast]);


  
  useEffect(() => {
    if (inViewLunch) {
      
      controlsLunch.start("visible");

    } else {

      controlsLunch.start("hidden");
    } 
  }, [controlsLunch, inViewLunch]);

  useEffect(() => {
    if (inViewDinner) {
      
      controlsDinner.start("visible");

    } else {

      controlsDinner.start("hidden");
    } 
  }, [controlsDinner, inViewDinner]);

  useEffect(() => {
    if (inViewSnack) {
      
      controlsSnack.start("visible");

    } else {

      controlsSnack.start("hidden");
    } 
  }, [controlsSnack, inViewSnack]);
  
  useEffect(() => {
    if (inViewMidnightSnack) {
      
      controlsMidnightSnack.start("visible");

    } else {

      controlsMidnightSnack.start("hidden");
    } 
  } , [controlsMidnightSnack, inViewMidnightSnack]);



  return (

    <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-center text-base xl:text-xl text-dark font-menu-off ">
      
      <div className="self-stretch flex flex-col items-start justify-end gap-[8px]">
        <div className="relative font-extrabold">
          {mealAmountStatsMealTimeSt}
        </div>
        <div className="relative text-sm xl:text-base">{healthyEatingTip1HealthyE}</div>
      </div>
      
      <div className=" self-stretch flex flex-row items-end justify-center text-right text-xs">
        
        <div className="flex flex-row items-end justify-center pt-0 px-0 pb-7 ">

          <div className=" w-11  flex flex-col items-center justify-start py-0 pr-2 pl-0 gap-[80px] border-r-[1px] border-solid border-grey-c">
            
            <div className="self-stretch relative">{eatingSpeedTip}</div>
            <div className="self-stretch relative">보통</div>
            <div className="self-stretch relative">{eatingSpeedDescription}</div>

          </div>

        </div>
        
        <div className="flex-1 flex flex-col items-center justify-end relative text-center">
          
          <div className="self-stretch flex flex-row items-end justify-center z-[0]">
            
            
            <div className="flex-1 flex flex-row items-end justify-center h-[200px] ">
              <motion.div
                ref={refBreakfast}
                animate={controlsBreakfast}
                initial="hidden"
                variants={squareVariantsBreakfast}
              >
                <div className={`relative  ${colorBarBreakfast}  w-5 flex h-full`} />
              </motion.div>
            </div>


            <div className="flex-1 flex flex-row items-end justify-center h-[200px]">
              <motion.div
                ref={refLunch}
                animate={controlsLunch}
                initial="hidden"
                variants={squareVariantsLunch}
              >
                <div className={`relative ${colorBarLunch} w-5 h-full`} />
              </motion.div>
            </div>

            <div className="flex-1 flex flex-row items-end justify-center h-[200px]">

              <motion.div
                ref={refDinner}
                animate={controlsDinner}
                initial="hidden"
                variants={squareVariantsDinner}
              >
                <div className={`relative ${colorBarDinner} w-5 h-full`} />
              </motion.div>
            </div>

            
            <div className="flex-1 flex flex-row items-end justify-center h-[200px]">

              <motion.div
                ref={refSnack}
                animate={controlsSnack}
                initial="hidden"
                variants={squareVariantsSnack}
              >
                <div className={`relative ${colorBarSnack} w-5 h-full`} />
              </motion.div>
            </div>
            

            <div className="flex-1 flex flex-row items-end justify-center h-[200px]">

              <motion.div
                ref={refMidnightSnack}
                animate={controlsMidnightSnack}
                initial="hidden"
                variants={squareVariantsMidnightSnack}
              >
                <div className={`relative ${colorBarMidnightSnack} w-5 h-full`} />
              </motion.div>
            </div>



          </div>
          
          <div className="self-stretch flex flex-row items-start justify-center pt-2 px-0 pb-0 z-[1] border-t-[1px] border-solid border-grey-c">
            <div className="flex-1 relative">아침</div>
            <div className="flex-1 relative">점심</div>
            <div className="flex-1 relative">저녁</div>
            <div className="flex-1 relative">간식</div>
            <div className="flex-1 relative">야식</div>
          </div>

          <div className="absolute my-0 mx-[!important] top-[79px] left-[0px] box-border w-full h-px  border-t-[1px] border-solid border-red" />
        
        </div>


      </div>
    </div>
  );
};

export default MealStatisticsContainer;
