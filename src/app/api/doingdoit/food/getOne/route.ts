/**
 * @swagger
 * /api/doingdoit/food/getOne:
 * get:
 *    description: 음식 상세 조회
 * responses:
 *    200:
 *      description: 조회 성공
 *    500:
 *      description: 조회 실패
 */



import { NextResponse, NextRequest } from 'next/server';

import { getOne } from '@/lib/api/food';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const foodCode = req.nextUrl.searchParams.get('_foodCode');

  const results = await getOne(
    foodCode as string
  ) ;

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
