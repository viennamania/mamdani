/**
 * @swagger
 * /api/doingdoit/notice/getAll:
 * get:
 *    description: 공지사항을 가져옵니다.
 * 
 */

import { NextResponse, NextRequest } from 'next/server';

import { getAll } from '@/lib/api/notice';



export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  const results = await getAll(data as any);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
