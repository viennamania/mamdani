/**
 * @swagger
 * /api/doingdoit/board/getCommentCountByBoardId:
 * get:
 *    description: 게시글의 댓글 갯수를 가져옵니다.
 * responses:
 *    200:
 *      description: 게시글의 댓글 갯수 가져오기 성공
 *    500:
 *      description: 게시글의 댓글 갯수 가져오기 실패
 */

import { NextResponse, NextRequest } from 'next/server';

import { getCommentCountByBoardId } from '@/lib/api/board';


export const GET = async (req: NextRequest, res: NextResponse) => {

  
  const _boardId  = req.nextUrl.searchParams.get('_boardId');

  const _q = req.nextUrl.searchParams.get('_q');
  

  const results = await getCommentCountByBoardId(
    _boardId as string,
  ) ;

    console.log("getCommentCountByBoardId results", results);

  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
