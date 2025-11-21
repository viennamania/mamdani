/**
 * @swagger
 * /api/doingdoit/board/getRepliesByCommentId:
 * get:
 *    description: 댓글에 달린 답글을 가져옵니다.
 * responses:
 *    200:
 *      description: 댓글에 달린 답글 가져오기 성공
 *    500:
 *      description: 댓글에 달린 답글 가져오기 실패
 */


import { NextResponse, NextRequest } from 'next/server';

import { getRepliesByCommentId,  } from '@/lib/api/board';

export const GET = async (req: NextRequest, res: NextResponse) => {

  const _commentId = req.nextUrl.searchParams.get('_commentId');



  const results = await getRepliesByCommentId(
    _commentId as any,
  );
  

  ////console.log("getFeedById========= results:", results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
