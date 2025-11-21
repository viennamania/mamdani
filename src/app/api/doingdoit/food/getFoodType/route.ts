/**
 * @swagger
 * /api/doingdoit/food/getFoodType:
 * get:
 *   description: 음식 종류 가져오기
 * responses:
 *    200:
 *      description: 음식 종류 가져오기 성공
 *    500:
 *      description: 음식 종류 가져오기 실패
 */


import { NextResponse, NextRequest } from 'next/server';

import { getFoodType } from '@/lib/api/food';

// Force dynamic rendering
export const dynamic = 'force-dynamic';


export const GET = async (req: NextRequest, res: NextResponse) => {

 

  const results = await getFoodType();

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
