/**
 * @swagger
 * /api/doingdoit/board/getAll:
 * get:
 *    description: 게시글 목록을 가져옵니다.
 * responses:
 *    200:
 *      description: 게시글 목록을 가져오기를 성공했습니다.
 *    500:
 *      description: 게시글 목록을 가져오기를 실패했습니다.
 */

import { NextResponse, NextRequest } from 'next/server';

import { getAll } from '@/lib/api/board';


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
