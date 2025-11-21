/**
 * @swagger
 * /api/doingdoit/faq/createCategory:
 * post:
 *    description: "카테고리를 생성합니다."
 * parameters:
 * 
 * 
 * responses:
 *    200:
 *      description: 카테고리를 생성 성공했습니다.
 *    500:
 *      description: 카테고리를 생성 실패했습니다.
 */

import { NextResponse, NextRequest } from 'next/server';

import  { registerCategory  } from '@/lib/api/faq';


export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();


  const results = await registerCategory(data as any);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
