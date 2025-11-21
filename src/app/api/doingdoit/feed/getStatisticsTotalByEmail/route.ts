/**
 * @swagger
 * /api/doingdoit/feed/getStatisticsMealFoodTotalByEmail:
 * get:
 *   description: 이메일로 피드 통계를 가져옵니다.
 *
 */ 


// /api/doingdoit/feed/getStatisticsMealFoodTotalByUserId



import { NextResponse, NextRequest } from 'next/server';

import { getStatisticsMealFoodTotalByEmail } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================
getStatisticsByEmail
======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {




  

  const _email = req.nextUrl.searchParams.get('_email');

  const _mealDate = req.nextUrl.searchParams.get('_mealDate');



  

  const results = await getStatisticsMealFoodTotalByEmail(
    _email as any,
  );



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
