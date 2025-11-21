/**
 * @swagger
 * /api/doingdoit/food/deleteFavoriteFood:
 * get:
 *    description: 유저별 즐겨찾는 음식 삭제
 * responses:
 *    200:
 *      description: 삭제 성공
 *    500:
 *      description: 삭제 실패
 */

import { NextResponse, NextRequest } from 'next/server';


import  { deleteFavoriteFood  } from '@/lib/api/food';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _foodCode = req.nextUrl.searchParams.get('_foodCode');
  const _userId = req.nextUrl.searchParams.get('_userId');

  console.log("deleteFavoriteFood _foodCode:", _foodCode);
  console.log("deleteFavoriteFood _userId:", _userId);

  const results = await deleteFavoriteFood(
    _foodCode as any,
    _userId as any
  );


  ////console.log("deleteFavoriteFood results:", results);

  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
