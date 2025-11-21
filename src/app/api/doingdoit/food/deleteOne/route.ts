/**
 * @swagger
 * /api/doingdoit/food/deleteOne:
 * get:
 *   description: 음식 삭제
 * responses:
 *    200:
 *      description: 삭제 성공
 *    500:
 *      description: 삭제 실패
 */


import { NextResponse, NextRequest } from 'next/server';

import { deleteOne } from '@/lib/api/food';


export const GET = async (req: NextRequest, res: NextResponse) => {

 


  const foodCode = req.nextUrl.searchParams.get('foodCode');

 
  console.log("foodCode======", foodCode);
  

  const results = await deleteOne(
    foodCode as string,
  ) ;

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
