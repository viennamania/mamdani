
/**
 * @swagger
 * /api/doingdoit/board/getAllComment:
 * get:
 *    description: 게시글별 댓글 목록을 가져옵니다.
 * 
 * responses:
 *    200:
 *      description: 게시글별 댓글 목록을 가져오기를 성공했습니다.
 *    500:
 *      description: 게시글별 댓글 목록을 가져오기를 실패했습니다.
 */



import { NextResponse, NextRequest } from 'next/server';

import { getCommentByBoardId } from '@/lib/api/board';


export const GET = async (req: NextRequest, res: NextResponse) => {

  

  const _boardId = req.nextUrl.searchParams.get('_boardId');
  const _limit = req.nextUrl.searchParams.get('_limit');
  const _page = req.nextUrl.searchParams.get('_page');

  const _sort = req.nextUrl.searchParams.get('_sort');
  const _order = req.nextUrl.searchParams.get('_order');

  const _q = req.nextUrl.searchParams.get('_q');

  

  const results = await getCommentByBoardId(
    _boardId as any,
    
  ) ;

  ////console.log("board getAll:", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
