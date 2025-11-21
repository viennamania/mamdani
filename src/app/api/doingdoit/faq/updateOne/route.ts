/**
 * @swagger
 * /api/doingdoit/faq/updateOne:
 * post:
 * description: faq를 업데이트 합니다.
 * responses:
 *    200:
 *      description: faq를 업데이트 성공했습니다.
 *    500:
 *      description: faq를 업데이트 실패했습니다.
 */

import { NextResponse, NextRequest } from 'next/server';

import  { updateOne  } from '@/lib/api/faq';


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
