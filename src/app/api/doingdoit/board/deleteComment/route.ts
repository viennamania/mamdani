/**
 * @swagger
 * /api/doingdoit/board/deleteComment:
 * get:
 *    description: 댓글을 삭제합니다.
 * parameters:
 *    id:
 *    description: 댓글의 id
 *    required: true
 * 
 * responses:
 *   200:
 *      description: 댓글을 삭제했습니다.
 *   500:
 *      description: 댓글을 삭제하지 못했습니다.
 */


import { NextResponse, NextRequest } from 'next/server';

import { deleteComment } from '@/lib/api/board';


/* ======================================
deleteOne
======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  const id = req.nextUrl.searchParams.get('id');

 

  const results = await deleteComment(
    id as any,
  ) ;

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
