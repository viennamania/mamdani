/**
 * @swagger
 * /api/doingdoit/notice/updateOne:
 * post:
 * description: 공지사항을 수정합니다.
 * responses:
 *    200:
 *      description: 수정 성공
 *    500:
 *      description: 수정 실패
 */

import { NextResponse, NextRequest } from 'next/server';



import  { updateOne  } from '@/lib/api/notice';


export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();


  const results = await updateOne(data as any);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
