/**
 * @swagger
 * /api/doingdoit/notice/create:
 * post:
 *  description: 공지사항을 생성합니다.
 */


import { NextResponse, NextRequest } from 'next/server';


import  { registerOne  } from '@/lib/api/notice';


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
