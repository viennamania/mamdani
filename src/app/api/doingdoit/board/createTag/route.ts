/**
 * @swagger
 * /api/doingdoit/board/createTag:
 * post:
 *    description: "태그를 생성합니다."
 * parameters:
 * 
 * 
 * responses:
 *    200:
 *      description: 태그를 생성 성공했습니다.
 *    500:
 *      description: 태그를 생성 실패했습니다.
 */

import { NextResponse, NextRequest } from 'next/server';

import  { registerTag  } from '@/lib/api/board';


export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  console.log("create data:", data);

  const results = await registerTag(data as any);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
