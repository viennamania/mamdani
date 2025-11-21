/**
 * @swagger
 * /api/doingdoit/feed/getStatisticsMealFoodWeekByEmail:
 * get:
 *  description: 이메일로 피드 통계를 가져옵니다.
 * 
 */


// /api/doingdoit/feed/getStatisticsMealFoodWeekByUserId

import { NextResponse, NextRequest } from 'next/server';

import { getStatisticsMealFoodWeekByEmail } from '@/lib/api/feed';
import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================
getStatisticsByEmail
======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {




  

  const email = req.nextUrl.searchParams.get('_email');

  const mealDateStart = req.nextUrl.searchParams.get('_mealDateStart');
  const mealDateEnd = req.nextUrl.searchParams.get('_mealDateEnd');




  

  const results = await getStatisticsMealFoodWeekByEmail(
    email as any,
    mealDateStart as any,
    mealDateEnd as any,
  );



  //////console.log('getStatisticsMealFoodWeekByEmail results: ', results);

  
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
