/**
 * @swagger
 * /api/doingdoit/point/getTotalPointByUserId:
 * get:
 *    description: 이메일로 총 포인트 가져오기
 * responses:
 *    200:
 *      description: 가져오기 성공
 *    500:
 *      description: 가져오기 실패
 */

import { NextResponse, NextRequest } from 'next/server';


import { getTotalOrderByUserId,  } from '@/lib/api/order';

export const GET = async (req: NextRequest, res: NextResponse) => {


  const userId  = req.nextUrl.searchParams.get('_userId') as any;

  console.log('getTotalOrderByUserId userId', userId);

  const results = await getTotalOrderByUserId(
    userId as any
  );


  ///console.log('getTotalOrderByUserId results', results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
