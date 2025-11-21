/**
 * @swagger
 * /api/doingdoit/board/incrementTagOrderNumber:
 * get:
 *    description: 태그 순서 변경
 * responses:
 *    200:
 *      description: 태그 순서 변경 성공
 *    500:
 *      description: 태그 순서 변경 실패
 */


import { NextResponse, NextRequest } from 'next/server';

import { incrementTagOrderNumber } from '@/lib/api/board';


export const GET = async (req: NextRequest, res: NextResponse) => {

  
  const id = req.nextUrl.searchParams.get('id');

  console.log('incrementTagOrderNumber id: ', id );

 

  const results = await incrementTagOrderNumber(
    id as any,
  ) ;

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
