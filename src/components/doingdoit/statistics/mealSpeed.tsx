'use client'

import { useState, useCallback, useMemo, ChangeEvent, useEffect, use } from 'react'
import toast from 'react-hot-toast'

import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';



/*
  const [ mealSpeedPercentage, setMealSpeedPercentage ] = useState(
    [] as
    {
      name: string;
      value: number;
      color: string;
    }[]
  );

  */




type SpeedProps = {
  
  mealSpeedSlow?: number,
  mealSpeedNormal?: number
  mealSpeedFast?: number,
  mealSpeedPercentage?: {
    name: string;
    value: number;
    color: string;
  }[],

};


export default function MealSpeed({
  mealSpeedSlow = 0,
  mealSpeedNormal = 0,
  mealSpeedFast = 0,
  mealSpeedPercentage = [
    {
      name: '천천히',
      value: mealSpeedSlow,
      color: '#0088FE',
    },
    {
      name: '보통',
      value: mealSpeedNormal,
      color: '#00C49F',
    },
    {
      name: '빠르게',
      value: mealSpeedFast,
      color: '#FFBB28',
    },
  ],
}: SpeedProps) {



  console.log('mealSpeedSlow', mealSpeedSlow);
  console.log('mealSpeedNormal', mealSpeedNormal);
  console.log('mealSpeedFast', mealSpeedFast);
  console.log('mealSpeedPercentage', mealSpeedPercentage);


  return (

    <>
    <div className="self-stretch flex flex-col items-center justify-start gap-[12px]">
      <div className="self-stretch relative font-extrabold text-base xl:text-xl">
        식사소요시간 통계
      </div>

      { mealSpeedSlow > 0 || mealSpeedNormal > 0 || mealSpeedFast > 0 ? (
      <div className="self-stretch relative text-sm xl:text-base">
        <span>식사는 대부분 </span>
        <span className="font-extrabold">
          {
            // if the largest count among mealSpeedSlow, mealSpeedNormal, mealSpeedFast
            // is mealSpeedSlow then set '느림'
            // is mealSpeedNormal then set '보통'
            // is mealSpeedFast then set '빠름'

            mealSpeedSlow >= mealSpeedNormal && mealSpeedSlow >= mealSpeedFast ?
            '천천히' : mealSpeedNormal >= mealSpeedSlow && mealSpeedNormal >= mealSpeedFast ?
            '보통' : '빠르게'
          }
        </span>
        <span> 했어요!</span>

      </div>
      ) : (

        <div className="self-stretch relative text-base">
          <span>식사는 </span>
          <span className="font-extrabold">
            0회
          </span>
          <span> 했어요!</span>
        </div>
      )}

    </div>




    <div className="self-stretch flex flex-col items-center justify-center gap-[10px] xl:gap-[20px] text-xs xl:text-sm">

      <div className="xl:mb-6 w-full ">

        <div className="mx-auto w-48 h-48 xl:w-64 xl:h-64  "> 

          <ResponsiveContainer width="100%" height="100%">

            <PieChart className="
            [&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
              
              <Pie
                ////data={data}
                data={mealSpeedPercentage}
                cx="50%"
                cy="50%"
                labelLine={false}
                ////label={renderCustomizedLabel}
                ////outerRadius={80}
                fill="#8884d8"
                strokeWidth={2}
                dataKey="value"

                
              >

                {/*
                
                {data.map((item, index) => (
                  <Cell key={index} fill={item.color} stroke={item.color} />
                ))}
                  
                */}

                {mealSpeedPercentage.map(
                  (
                    item,
                    index,
                  ) => (
                  <Cell key={index} fill={item.color} stroke={item.color} />
                ))}

              </Pie>

            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

        
      <div className="flex flex-row items-center justify-center gap-[20px]">

        <div className="flex flex-row items-center justify-center gap-[8px]">
          <div className="relative xl:rounded bg-good w-2 h-2 xl:w-3 xl:h-3" />
          <div
            className={`relative
            
              ${mealSpeedSlow >= mealSpeedNormal && mealSpeedSlow >= mealSpeedFast ? 'font-extrabold' : ''}

            `}
          >
            천천히({
             Math.floor(

              mealSpeedSlow === 0 && mealSpeedNormal === 0 && mealSpeedFast === 0 ?
              0 : mealSpeedSlow / (mealSpeedSlow + mealSpeedNormal + mealSpeedFast) * 100
              

            )
            }%)
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-[8px]">
          <div className="relative xl:rounded bg-std w-2 h-2 xl:w-3 xl:h-3" />
          <div
            className={`relative
            
              ${mealSpeedNormal >= mealSpeedSlow && mealSpeedNormal >= mealSpeedFast ? 'font-extrabold' : ''}

            `}
          >
            보통({
            Math.floor(
              ////mealSpeedNormal / (mealSpeedSlow + mealSpeedNormal + mealSpeedFast) * 100

              mealSpeedSlow === 0 && mealSpeedNormal === 0 && mealSpeedFast === 0 ?
              0 : mealSpeedNormal / (mealSpeedSlow + mealSpeedNormal + mealSpeedFast) * 100

            )
            }%)
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-[8px]">

          <div className="relative xl:rounded bg-bad w-2 h-2 xl:w-3 xl:h-3" />
          <div
            className={`relative
            
              ${mealSpeedFast >= mealSpeedSlow && mealSpeedFast >= mealSpeedNormal ? 'font-extrabold' : ''}

            `}
          >
            빠르게({
             Math.floor(
              /////////mealSpeedFast / (mealSpeedSlow + mealSpeedNormal + mealSpeedFast) * 100

              mealSpeedSlow === 0 && mealSpeedNormal === 0 && mealSpeedFast === 0 ?
              0 : mealSpeedFast / (mealSpeedSlow + mealSpeedNormal + mealSpeedFast) * 100

              )
            }%)
          </div>
        </div>

      </div>

    </div>

    </>
    
    


  );



}
  
