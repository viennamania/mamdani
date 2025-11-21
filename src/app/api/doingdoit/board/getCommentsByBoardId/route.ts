/**
 * @swagger
 * /api/doingdoit/board/getCommentsByBoardId:
 * get:
 *    description: 게시글의 댓글을 가져옵니다.
 * responses:
 *   200:
 *     description: 게시글의 댓글 가져오기 성공
 *   500:
 *     description: 게시글의 댓글 가져오기 실패
 */



import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getCommentByBoardId,  } from '@/lib/api/board';


///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _boardId = req.nextUrl.searchParams.get('_boardId');



  const results = await getCommentByBoardId(
    _boardId as any,
  );
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
