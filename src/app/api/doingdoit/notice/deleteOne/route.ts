/**
 * @swagger
 * /api/doingdoit/notice/deleteOne:
 * get:
 *  description: 공지사항 삭제
 * responses:
 *    200:
 *      description: 삭제 성공
 *    500:
 *      description: 삭제 실패
 * 
 */


import { NextResponse, NextRequest } from 'next/server';

import { deleteOne } from '@/lib/api/notice';


export const GET = async (req: NextRequest, res: NextResponse) => {

  


  const id = req.nextUrl.searchParams.get('id');


  const results = await deleteOne(
    id as any,
  ) ;

 

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
