'use client'

import { useState, useCallback, useMemo, ChangeEvent, useEffect, use } from 'react'
import toast from 'react-hot-toast'

import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import Ranking from "@/components-figma/ranking";



type FoodArrayProps = {
  
  mealFoodArray?: {
    name: string;
    count: number;
  }[],

};


export default function MealFood({
  mealFoodArray = [
    {
      name: "",
      count: 5
    },
    {
      name: "",
      count: 4
    },
    {
      name: "",
      count: 3
    },
    {
      name: "",
      count: 2
    },
    {
      name: "",
      count: 1
    }
  ],

  
}: FoodArrayProps) {



  return (

    <>

      <div className="self-stretch flex flex-col items-center justify-start gap-[20px]">
                      
        <div className="self-stretch flex flex-col items-center justify-start gap-[12px]">
          <div className="self-stretch relative font-extrabold text-base xl:text-xl">
            식단 통계 TOP5
          </div>

          { mealFoodArray.length > 0 ? (
          <div className="self-stretch relative text-sm xl:text-base">
            <span>{`가장 많이 먹은 음식은 `}</span>
            <span className="font-extrabold">
              {
                mealFoodArray.length > 0 && mealFoodArray[0]?.name
              }

            </span>
            <span>에요!</span>
          </div>
          ) : (
            <div className="self-stretch relative text-base">
              <span>가장 많이 먹은 음식은 </span>
              <span className="font-extrabold">
                0회
              </span>
              <span>에요!</span>
            </div>
          )}

        </div>


        <div className="self-stretch grid grid-cols-1 xl:grid-cols-5 items-center justify-start gap-[20px]">

          <Ranking
            menuNumber="1"
            dishName={
              mealFoodArray[0] ?
              mealFoodArray[0]?.name + "(" + mealFoodArray[0]?.count + "회)"
              : ""
            }
          />

          <Ranking
            menuNumber="2"
            
            dishName={
              mealFoodArray[1] ?
              mealFoodArray[1]?.name + " (" + mealFoodArray[1]?.count + "회)"
              : ""
            }

            propBackgroundColor="#ffd8aa"
            propFontWeight="unset"
          />
          <Ranking
            menuNumber="3"
            
            dishName={
              mealFoodArray[2] ?
              mealFoodArray[2]?.name + " (" + mealFoodArray[2]?.count + "회)"
              : ""
            }
            
            propBackgroundColor="#ffd8aa"
            propFontWeight="unset"
          />
          <Ranking
            menuNumber="4"
            
            dishName={
              mealFoodArray[3] ?
              mealFoodArray[3]?.name + " (" + mealFoodArray[3]?.count + "회)"
              : ""
            }

            propBackgroundColor="#ffd8aa"
            propFontWeight="unset"
          />
          <Ranking
            menuNumber="5"
            
            dishName={
              mealFoodArray[4] ?
              mealFoodArray[4]?.name + " (" + mealFoodArray[4]?.count + "회)"
              : ""
            }

            propBackgroundColor="#ffd8aa"
            propFontWeight="unset"
          />
        </div>

      </div>

    </>
    
    


  );



}
  
