/**
 * @swagger
 * /api/doingdoit/feed/getFeedbackStatisticsByEmail:
 * get:
 *    description: 이메일로 피드 통계를 가져옵니다.
*/

// /api/doingdoit/feed/getFeedbackStatisticsByUserId

import { NextResponse, NextRequest } from 'next/server';

import { getFeedbackStatisticsWeekByEmail } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================
getStatisticsByEmail
======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {




  

  const _email = req.nextUrl.searchParams.get('_email');
  const _mealDateStart = req.nextUrl.searchParams.get('_mealDateStart');
  const _mealDateEnd = req.nextUrl.searchParams.get('_mealDateEnd');


  

  const results = await getFeedbackStatisticsWeekByEmail (
    _email as any,
    _mealDateStart as any,
    _mealDateEnd as any,

  );



  //console.log('getFeedbackStatisticsByEmail results: ', results);

  
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
