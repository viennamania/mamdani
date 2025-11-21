/**
 * @swagger
 * /api/doingdoit/guide/deleteOne:
 * get:
 *    description: 가이드 삭제
 * 
 * responses:
 *    200:
 *      description: 삭제 성공
 *    500:
 *      description: 삭제 실패
 * 
 */




import { NextResponse, NextRequest } from 'next/server';

import { deleteOne } from '@/lib/api/guide';


export const GET = async (req: NextRequest, res: NextResponse) => {

  

  const id = req.nextUrl.searchParams.get('id');

  
 

  const results = await deleteOne(
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
