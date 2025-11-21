'use client'

import { useState, useCallback, useMemo, ChangeEvent, useEffect, use } from 'react'
import toast from 'react-hot-toast'

import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';




type AmountProps = {
  
  mealAmountSmall?: number,
  mealAmountMedium?: number
  mealAmountLarge?: number,
  mealAmountPercentage?: {
    name: string;
    value: number;
    color: string;
  }[],

};


export default function MealAmout({
  mealAmountSmall = 0,
  mealAmountMedium = 0,
  mealAmountLarge = 0,
  mealAmountPercentage = [
    {
      name: '적게',
      value: mealAmountSmall,
      color: '#0088FE',
    },
    {
      name: '보통',
      value: mealAmountMedium,
      color: '#00C49F',
    },
    {
      name: '많이',
      value: mealAmountLarge,
      color: '#FFBB28',
    },
  ],

}: AmountProps) {



  //console.log('mealAmountSmall', mealAmountSmall);
  //console.log('mealAmountMedium', mealAmountMedium);
  //console.log('mealAmountLarge', mealAmountLarge);

  //console.log('mealAmountPercentage', mealAmountPercentage);



  return (

    <>


      <div className="self-stretch flex flex-col items-center justify-start gap-[12px]">
        <div className="self-stretch relative font-extrabold text-base xl:text-xl">
          식사량 통계
        </div>


        { mealAmountSmall > 0 || mealAmountMedium > 0 || mealAmountLarge > 0 ? (
        <div className="self-stretch relative text-sm xl:text-base">
          <span>식사량은 대부분 </span>
          <span className="font-extrabold">
            {
              // if the largest count among mealAmountSmall, mealAmountMedium, mealAmountLarge
              // is mealAmountSmall then set '적게'
              // is mealAmountMedium then set '보통'
              // is mealAmountLarge then set '많이'


              mealAmountSmall >= mealAmountMedium && mealAmountSmall >= mealAmountLarge ?
              '적게' : mealAmountMedium >= mealAmountSmall && mealAmountMedium >= mealAmountLarge ?
              '보통' : '많이'
            }
            
          </span>
          <span> 했어요!</span>
        </div>
        ) : (

          <div className="self-stretch relative text-sm xl:text-base">
            <span>식사량은 </span>
            <span className="font-extrabold">
              0회
            </span>
            <span> 했어요!</span>
          </div>

        )}
          

      </div>

   
      <div className="self-stretch flex flex-col items-center justify-center gap-[10px] xl:gap-[20px] text-xs xl:text-sm">

      <div className="xl:mb-6 w-full  ">

        <div className="mx-auto w-48 h-48 xl:w-64 xl:h-64   "> 

          <ResponsiveContainer
            // scroll effect


            width="100%"
            height="100%">

            <PieChart className="
              
            [&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
              
              <Pie
                ////data={data}
                data={mealAmountPercentage}
                cx="50%"
                cy="50%"
                labelLine={false}
                ////label={renderCustomizedLabel}
                
                //outerRadius={80}

                fill="#8884d8"
                strokeWidth={2}
                dataKey="value"

                
              >

                {/*
                
                {data.map((item, index) => (
                  <Cell key={index} fill={item.color} stroke={item.color} />
                ))}
                  
                */}

                {mealAmountPercentage.map((item, index) => (
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
            
              ${mealAmountSmall >= mealAmountMedium && mealAmountSmall >= mealAmountLarge ? 'font-extrabold' : ''}

            `}
          >
            적게({
            Math.floor(

              ///mealAmountSmall / (mealAmountSmall + mealAmountMedium + mealAmountLarge) * 100
              mealAmountSmall === 0 && mealAmountMedium === 0 && mealAmountLarge === 0 ?
              0 : mealAmountSmall / (mealAmountSmall + mealAmountMedium + mealAmountLarge) * 100
              
              )

            }%)
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-[8px]">
          <div className="relative xl:rounded bg-std w-2 h-2 xl:w-3 xl:h-3" />
          <div
            className={`relative
            
              ${mealAmountMedium >= mealAmountSmall && mealAmountMedium >= mealAmountLarge ? 'font-extrabold' : ''}

            `}
          >
            보통({
            Math.floor(
              ///mealAmountMedium / (mealAmountSmall + mealAmountMedium + mealAmountLarge) * 100
              mealAmountSmall === 0 && mealAmountMedium === 0 && mealAmountLarge === 0 ?
              0 : mealAmountMedium / (mealAmountSmall + mealAmountMedium + mealAmountLarge) * 100
            )
            }%)
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-[8px]">
          <div className="relative xl:rounded bg-bad w-2 h-2 xl:w-3 xl:h-3" />
          <div
            className={`relative
            
              ${mealAmountLarge >= mealAmountSmall && mealAmountLarge >= mealAmountMedium ? 'font-extrabold' : ''}

            `}
          >
            많이({
            Math.floor(
              ///////mealAmountLarge / (mealAmountSmall + mealAmountMedium + mealAmountLarge) * 100
              mealAmountSmall === 0 && mealAmountMedium === 0 && mealAmountLarge === 0 ?
              0 : mealAmountLarge / (mealAmountSmall + mealAmountMedium + mealAmountLarge) * 100
              
            )
            }%)
          </div>
        </div>

      </div>


      </div>

    </>
    
    


  );



}
  
