'use client'

import { useState, useCallback, useMemo, ChangeEvent, useEffect } from 'react'
import toast from 'react-hot-toast'

import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


/*
type UploaderProps = {

  onSave: (url: string) => void;
};

export default function Uploader(
  onSave: (url: string) => void
): UploaderProps {
*/


type CpfProps = {
  
  title?: React.ReactNode;
  feedbackGoodCount?: number
  feedbackStdCount?: number,
  feedbackBadCount?: number,

};


export default function Cpf({
  title = "단탄지",
  feedbackGoodCount = 0,
  feedbackStdCount = 0,
  feedbackBadCount = 0,
}: CpfProps) {


    const squareVariantsFeedbackGood = {
        visible: {
          //height : (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!)*3 + "px"
    
          width: (feedbackGoodCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%'
          , transition: { duration: 1 }
    
        },
        hidden: { width: "0%" }
      };
    
      const controlsFeedbackGood = useAnimation();
      const [refFeedbackGood, inViewFeedbackGood] = useInView();
    
      useEffect(() => {
        if (inViewFeedbackGood) {
          
          controlsFeedbackGood.start("visible");
    
        } else {
    
          controlsFeedbackGood.start("hidden");
        } 
      } , [controlsFeedbackGood, inViewFeedbackGood]);
    
    
    
      const squareVariantsFeedbackStd = {
        visible: {
          //height : (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!)*3 + "px"
    
          width: (feedbackStdCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%'
          , transition: { duration: 1 }
    
        },
        hidden: { width: "0%" }
      };
    
      const controlsFeedbackStd = useAnimation();
      const [refFeedbackStd, inViewFeedbackStd] = useInView();
    
      useEffect(() => {
        if (inViewFeedbackStd) {
          
          controlsFeedbackStd.start("visible");
    
        } else {
    
          controlsFeedbackStd.start("hidden");
        } 
      } , [controlsFeedbackStd, inViewFeedbackStd]);
    
    
      const squareVariantsFeedbackBad = {
        visible: {
          //height : (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!)*3 + "px"
    
          width: (feedbackBadCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%'
          , transition: { duration: 1 }
    
        },
        hidden: { width: "0%" }
      };
    
      const controlsFeedbackBad = useAnimation();
      const [refFeedbackBad, inViewFeedbackBad] = useInView();
    
      useEffect(() => {
        if (inViewFeedbackBad) {
          
          controlsFeedbackBad.start("visible");
    
        } else {
    
          controlsFeedbackBad.start("hidden");
        } 
      } , [controlsFeedbackBad, inViewFeedbackBad]);
    
    




    return (
     

        <div className="self-stretch flex flex-col items-center justify-start gap-[20px] xl:gap-[35px] ">


                <div className="self-stretch flex flex-col items-center justify-start  gap-[12px] ">

                  <div className="self-stretch relative font-extrabold text-base xl:text-xl">
                    식단 점수에 대한 통계
                  </div>


                  <div className="self-stretch relative text-sm xl:text-base ">

                    { (feedbackGoodCount > 0 || feedbackStdCount > 0 || feedbackBadCount > 0) ? (
                      <>
                        <span>{`식단점수는 대부분 `}</span>
                        <span className="font-extrabold">

                          {/* find most large number of feedbackScoreCount */}
                          {
                            feedbackGoodCount >= feedbackStdCount && feedbackGoodCount >= feedbackBadCount ?
                            '좋음' : feedbackStdCount >= feedbackGoodCount && feedbackStdCount >= feedbackBadCount ?
                            '양호함' : '개선이 필요함'
                          }


                        </span>
                        <span> 입니다.</span>
                      </>
                    ) : (
                      <span>식단점수가 없습니다.</span>
                    ) }

                  </div>

                </div>




            { (feedbackGoodCount > 0 || feedbackStdCount > 0 || feedbackBadCount > 0) && (

            <div className="self-stretch flex flex-col items-center justify-start gap-[10px] xl:gap-[20px] text-sm ">
            
            <div className="w-full flex flex-row items-center justify-center">


                <motion.div
                    ref={refFeedbackGood}
                    animate={controlsFeedbackGood}
                    initial="hidden"
                    variants={squareVariantsFeedbackGood}
                >

                    <div className="relative bg-good  h-10 xl:h-16"

                    // '좋음' feedbackGoodCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100

                    //style = {{ width: (feedbackGoodCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%' }}
                    
                    />

                </motion.div>


                <motion.div
                ref={refFeedbackStd}
                animate={controlsFeedbackStd}
                initial="hidden"
                variants={squareVariantsFeedbackStd}
                >
                <div className="relative bg-std h-10 xl:h-16"
                // 양호함

                // '양호함' feedbackStdCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100

                ///style={{ width: (feedbackStdCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%' }}

                />
                </motion.div>


                <motion.div
                ref={refFeedbackBad}
                animate={controlsFeedbackBad}
                initial="hidden"
                variants={squareVariantsFeedbackBad}
                >
                <div className="flex-1 relative bg-bad h-10 xl:h-16"

                    // '개선이 필요함'

                    // '개선이 필요함' feedbackBadCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100

                    ///style={{ width: (feedbackBadCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100) + '%' }}


                    />
                </motion.div>

            </div>
            


            <div className="flex flex-row items-center justify-start gap-[5px] xl:gap-[20px] text-3xs xl:text-base ">
                
              <div className="flex flex-row items-center justify-center gap-[8px] ">
                
                <div className="relative xl:rounded bg-good w-2 h-2 xl:w-3 xl:h-3" />

                {/*
                <div className="relative font-extrabold">
                */}
                <div className={`relative ${feedbackGoodCount > feedbackStdCount && feedbackGoodCount > feedbackBadCount ? 'font-extrabold' : ''}` }>
                  
                    좋음({ feedbackGoodCount }회, { (feedbackGoodCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100).toFixed(0) }%)
                </div>

              </div>

              <div className="flex flex-row items-center justify-center gap-[8px]">
                
                <div className="relative xl:rounded bg-std w-2 h-2 xl:w-3 xl:h-3" />

                <div className={`relative ${feedbackStdCount > feedbackGoodCount && feedbackStdCount > feedbackBadCount ? 'font-extrabold' : ''}` }>
                    양호함({ feedbackStdCount }회, { (feedbackStdCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100).toFixed(0) }%)
                </div>

              </div>

              <div className="flex flex-row items-center justify-center gap-[8px]">
                <div className="relative xl:rounded bg-bad w-2 h-2 xl:w-3 xl:h-3" />
                <div className={`relative ${feedbackBadCount > feedbackGoodCount && feedbackBadCount > feedbackStdCount ? 'font-extrabold' : ''}` }>
                    개선이 필요함({ feedbackBadCount }회, { (feedbackBadCount / (feedbackGoodCount + feedbackStdCount + feedbackBadCount) * 100).toFixed(0) }%)
                </div>
              </div>

            </div>


            </div>

            )}

        
        
        </div>

    );



}
  
