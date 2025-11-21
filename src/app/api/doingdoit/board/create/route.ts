/**
 * @swagger
 * /api/doingdoit/board/create:
 * post:
 *    description: 게시글을 생성합니다.
 * 
 * responses:
 *    200:
 *      description: 게시글을 생성 성공했습니다.
 * 
 *    500:
 *      description: 게시글을 생성 실패했습니다.
 * 
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import  { registerOne  } from '@/lib/api/board';


export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  console.log("create data:", data);

  const results = await registerOne(data as any);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
