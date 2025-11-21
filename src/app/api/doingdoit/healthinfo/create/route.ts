/**
 * @swagger
 * /api/doingdoit/healthinfo/create:
 * post:
 *    description: 건강정보 등록
 * responses:
 *    200:
 *      description: 등록 성공
 *    500:
 *      description: 등록 실패
 */


import { NextResponse, NextRequest } from 'next/server';



import  { registerOne  } from '@/lib/api/healthinfo';


export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  ///console.log("create data==========:", data);

  const results = await registerOne(data as any);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
