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

  const data = await req.json() as any;

  // parse params from body

   

  ///const results = await getAll(data as any);

  /*
    limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
  */

  const results = await getAll(
    parseInt(data.limit as string, 10),
    parseInt(data.page as string, 10),
    data.sort as string,
    data.order as string,
    data.q as string
  ) ;

  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
