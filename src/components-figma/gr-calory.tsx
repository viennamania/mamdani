import type { NextPage } from "next";

import { useMemo, type CSSProperties, useState, useEffect, use } from "react";




import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { set } from "lodash";



type GrCaloryType = {

  breakfastCount?: number;
  lunchCount?: number;
  dinnerCount?: number;
  snackCount?: number;
  midnightSnackCount?: number;


  barBreakfast?: string;
  barLunch?: string;
  barDinner?: string;
  barSnack?: string;
  barMidnightSnack?: string;
  barTotal?: string;

  showFrameDiv?: boolean;
  showDiv?: boolean;

  /** Style props */
  propFontSize?: CSSProperties["fontSize"];
  propWidth?: CSSProperties["width"];
  propFlex?: CSSProperties["flex"];
  propAlignItems?: CSSProperties["alignItems"];
  propJustifyContent?: CSSProperties["justifyContent"];
  propHeight?: CSSProperties["height"];
};



const GrCalory: NextPage<GrCaloryType> = ({

  breakfastCount,
  lunchCount,
  dinnerCount,
  snackCount,
  midnightSnackCount,


  barBreakfast,
  barLunch,
  barDinner,
  barSnack,
  barMidnightSnack,
  barTotal,

  showFrameDiv,
  showDiv,
  propFontSize,
  propWidth,
  propFlex,
  propAlignItems,
  propJustifyContent,
  propHeight,
}) => {


  ///console.log("======gr-calory barBreakfast=", barBreakfast);


  // barTotalMax is 500, 1000, 1500, 2000...
  // barTotalMas is less than (barTotal + 500)

  ////const barTotalMax = (parseInt(barTotal ? barTotal : "0") / 500).toFixed(0) * 500;


  // barTotalMas is least less than (barTotal + 100)
  ///const barTotalMas = (parseInt(barTotal ? barTotal : "0") / 100).toFixed(0) * 100;

  //let  barTotalMax = 0;

  const [barTotalMax, setBarTotalMax] = useState(0);

  const [barUnit, setBarUnit] = useState(0);

  ///const [heightCount, setHeightCount] = useState(0); 

  useEffect(() => {



    if (parseInt(barTotal ? barTotal : "0") < 100) {


      // barTotalMax is less than barTotal + 10

      setBarTotalMax(parseInt(Number(parseInt(barTotal ? barTotal : "0") / 10).toFixed(0)) * 10 + 20);

      setBarUnit(10);

     

    

    
    } else if (parseInt(barTotal ? barTotal : "0") < 1000) {
      
      //barTotalMax is larger than barTotal but less than barTotal + 100

      setBarTotalMax(parseInt(Number(parseInt(barTotal ? barTotal : "0") / 100).toFixed(0)) * 100 + 200);

      setBarUnit(100);


      
      

    } else {
      
      //barTotalMax is larger than barTotal but less than barTotal + 500

      setBarTotalMax(parseInt(Number(parseInt(barTotal ? barTotal : "0") / 500).toFixed(0)) * 500 + 1000);

      setBarUnit(500);

 
    }

  } , [barTotal]);




  //const barTotalMax = (parseInt(barTotal ? barTotal : "0") / 500) * 500 + 500;

  
 
  ///console.log("===========gr-calory barTotalMax=", barTotalMax);



  
  const div11Style: CSSProperties = useMemo(() => {
    return {
      fontSize: propFontSize,
    };
  }, [propFontSize]);
  

  const frameDiv8Style: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      flex: propFlex,
    };
  }, [propWidth, propFlex]);

  const div12Style: CSSProperties = useMemo(() => {
    return {
      alignItems: propAlignItems,
      justifyContent: propJustifyContent,
      height: propHeight,
    };
  }, [propAlignItems, propJustifyContent, propHeight]);







  const [heightBarBreakfast, setHeightBarBreakfast] = useState( "0%");
  const [heightBarLunch, setHeightBarLunch] = useState( "0%");
  const [heightBarDinner, setHeightBarDinner] = useState( "0%");
  const [heightBarSnack, setHeightBarSnack] = useState( "0%");
  const [heightBarMidnightSnack, setHeightBarMidnightSnack] = useState( "0%");
  const [heightBarTotal, setHeightBarTotal] = useState( "0%");

 


  
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

  const squareVariantsTotal = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarTotal, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };



  const controlsBreakfast = useAnimation();
  const controlsLunch = useAnimation();
  const controlsDinner = useAnimation();
  const controlsSnack = useAnimation();
  const controlsMidnightSnack = useAnimation();
  const controlsTotal = useAnimation();

  
  const [refBreakfast, inViewBreakfast] = useInView();
  const [refLunch, inViewLunch] = useInView();
  const [refDinner, inViewDinner] = useInView();
  const [refSnack, inViewSnack] = useInView();
  const [refMidnightSnack, inViewMidnightSnack] = useInView();
  const [refTotal, inViewTotal] = useInView();




  useEffect(() => {
    
  
    setHeightBarBreakfast (
      (
         parseInt (barBreakfast ? barBreakfast : "0") / parseInt (barTotal ? barTotal : "0") * 100
      ).toString() + "%"
    );

    setHeightBarLunch(
      (
         parseInt (barLunch ? barLunch : "0") / parseInt (barTotal ? barTotal : "0") * 100
      ).toString() + "%"
    );

    setHeightBarDinner(
      (
         parseInt (barDinner ? barDinner : "0") / parseInt (barTotal ? barTotal : "0") * 100
      ).toString() + "%"
    );

    setHeightBarSnack(
      (
         parseInt (barSnack ? barSnack : "0") / parseInt (barTotal ? barTotal : "0") * 100
      ).toString() + "%"
    );

    setHeightBarMidnightSnack(
      (
         parseInt (barMidnightSnack ? barMidnightSnack : "0") / parseInt (barTotal ? barTotal : "0") * 100
      ).toString() + "%"
    );

    setHeightBarTotal(
      (
         parseInt (barTotal ? barTotal : "0") / parseInt (barTotal ? barTotal : "0") * 100
      ).toString() + "%"
    );

  } , [barBreakfast, barLunch, barDinner, barSnack, barMidnightSnack, barTotal]);


  //console.log(" heightBarBreakfast=", heightBarBreakfast);
  //console.log(" heightBarLunch=", heightBarLunch);
  //console.log(" heightBarDinner=", heightBarDinner);
  //console.log(" heightBarSnack=", heightBarSnack);
  //console.log(" heightBarMidnightSnack=", heightBarMidnightSnack);
  //console.log(" heightBarTotal=", heightBarTotal);



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

    if (heightBarTotal === "0%") {
      controlsTotal.start("hidden");
    } else {
      controlsTotal.start("visible");
    }

  } , [heightBarBreakfast, heightBarLunch, heightBarDinner, heightBarSnack, heightBarMidnightSnack, heightBarTotal]);



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

  useEffect(() => {
    if (inViewTotal) {
      
      controlsTotal.start("visible");

    } else {

      controlsTotal.start("hidden");
    } 
  } , [controlsTotal, inViewTotal]);



  console.log("barTotalMax========", barTotalMax); 


  return (



    <div className=" ml-3 xl:ml-8 self-stretch flex flex-col items-center justify-start gap-[20px] text-left text-base xl:text-xl text-dark font-menu-off">
      <div className="self-stretch relative font-extrabold" style={div11Style}>
        칼로리
      </div>
     
      <div className="self-stretch flex flex-row items-end justify-center text-right text-xs">
       
        <div className=" flex flex-row items-end justify-center pt-0 px-0  pb-[29px] xl:pb-[28px]">
          
          <div className="w-8 h-[250px]  flex flex-col-reverse items-center justify-start py-0 pr-2 pl-0  border-r-[1px] border-solid border-grey-c">

            {/* barTotalMax, barTotalMas-100, barTotalMas-200, barTotalMas-300, barTotalMas-400, barTotalMas-500 untile barTotalMax is 0 */}

            { // loop from barTotalMax to 0 and decrease by 500 and div hight is variable by divided by barTotalMax

              /*
              Array.from(
                { length: barTotalMax / 500  },
                (_, i) => (
                  <div className={` bg-red self-stretch relative h-[${ 100 / (barTotalMax / 500 ) }%]`} key={i}>
                    {barTotalMax - i * 500 - 500}
                  </div>

                )

              )
              */
        



              /*
              Array.from(
                {
                  //length: barTotalMax / 500

                  length: 250
                },
                (_, i) => (


                  <div className={`bg-red  self-stretch relative h-[${ 100 / (barTotalMax / 500 ) }%]`} key={i}>
                    <span  className=" absolute bottom-0 right-0">
                      {
                      //barTotalMax - i * 100
                        i * 100
                      }
                    </span>
                  </div>

                )

              )
              */

              Array.from(
                {
                  length: barTotalMax / barUnit
                },
                (_, i) => (
                    
                    <div className=" self-stretch relative"
                      key={i}
                      style={{height: (250 / (barTotalMax / barUnit ))}}
                    >
                      
                      <span  className=" absolute bottom-0 right-0 ">
                        {
                        //barTotalMax - i * 100
                          i * barUnit
                        }
                      </span>
                    
                    </div>
  
                  )

              )

                 
            



              /*
              Array.from({ length: barTotalMax / 500 }, (_, i) => (
                <div className="self-stretch relative " key={i}>
                  {barTotalMax - i * 500}
                </div>
              ))
              */
            }

            


           
            

           

              {/*
              <div className="self-stretch relative">
                {barTotal}
              </div>

              <div className="self-stretch relative">
                { Number(parseInt(barTotal ? barTotal : "0") / 2).toFixed(0) }
              </div>

              <div className="self-stretch relative">
                0
              </div>
              */}



           



            


          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-end text-center">
          
          <div className="self-stretch flex flex-row items-end justify-center">
            


            <div className="flex-1 flex flex-col items-center justify-end gap-[8px] h-[200px] ">

              <div className=" h-4 self-stretch relative">
                {barBreakfast}kcal
              </div>
              <motion.div
                ref={refBreakfast}
                animate={controlsBreakfast}
                initial="hidden"
                variants={squareVariantsBreakfast}
              >
                <div className="relative bg-orange-light w-5 h-full" />
              </motion.div>
            </div>



            <div className="flex-1 flex flex-col items-center justify-end gap-[8px] h-[200px] ">
              <div className=" h-4 self-stretch relative">
                {barLunch}kcal
              </div>
              <motion.div
                ref={refLunch}
                animate={controlsLunch}
                initial="hidden"
                variants={squareVariantsLunch}
              >
                <div className="relative bg-orange-light w-5 h-full" />
              </motion.div>
            </div>
            


            <div className="flex-1 flex flex-col items-center justify-end gap-[8px] h-[200px] ">
              <div className=" h-4 self-stretch relative">
                {barDinner}kcal
              </div>
              <motion.div
                ref={refDinner}
                animate={controlsDinner}
                initial="hidden"
                variants={squareVariantsDinner}
              >
                <div className="relative bg-orange-light w-5 h-full" />
              </motion.div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end gap-[8px] h-[200px] ">
              <div className=" h-4 self-stretch relative">
                {barSnack}kcal
              </div>
              <motion.div
                ref={refSnack}
                animate={controlsSnack}
                initial="hidden"
                variants={squareVariantsSnack}
              >
                <div className="relative bg-orange-light w-5 h-full" />
              </motion.div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end gap-[8px] h-[200px] ">
              <div className=" h-4 self-stretch relative">
                {barMidnightSnack}kcal
              </div>
              <motion.div
                ref={refMidnightSnack}
                animate={controlsMidnightSnack}
                initial="hidden"
                variants={squareVariantsMidnightSnack}
              >
                <div className="relative bg-orange-light w-5 h-full" />
              </motion.div>
            </div>


            
            <div className="flex-1 flex flex-col items-center justify-end gap-[8px] h-[200px]">
              <div className=" h-4 self-stretch relative font-extrabold">
                {barTotal}kcal
              </div>
              <motion.div
                ref={refTotal}
                animate={controlsTotal}
                initial="hidden"
                variants={squareVariantsTotal}
              >
                <div className="relative bg-orange-light w-5 h-full" />

              </motion.div>
            </div>
            

          </div>



          <div className=" self-stretch flex flex-row items-start justify-center pt-2 px-0 pb-0 border-t-[1px] border-solid border-grey-c">
            <div className="flex-1 relative">
              아침
            </div>
            <div className="flex-1 relative">
              점심
            </div>
            <div className="flex-1 relative">
              저녁
            </div>
            <div className="flex-1 relative">
              간식
            </div>
            <div className="flex-1 relative">
              야식
            </div>
            
              <div
                className="flex-1 relative font-extrabold"
                style={div12Style}
              >
                총칼로리
              </div>
            
          </div>


        </div>
      </div>
    </div>
  );
};

export default GrCalory;
