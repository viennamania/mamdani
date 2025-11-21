/**
 * @swagger
 * /api/doingdoit/feed/getFeedByMealDateTime:
 * get:
 *  description: 식사일시로 피드를 가져옵니다.
 */

import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getFeedByMealDateTime,  } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _email = req.nextUrl.searchParams.get('_email');
  const _mealDate  = req.nextUrl.searchParams.get('_mealDate');
  const _mealTime  = req.nextUrl.searchParams.get('_mealTime');



  const results = await getFeedByMealDateTime(
    _email as any,
    _mealDate as any,
    _mealTime as any,
  );
  

  //console.log("getFeedById========= results:", results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
