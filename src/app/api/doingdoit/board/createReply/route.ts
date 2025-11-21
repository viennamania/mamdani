/**
 * @swagger
 * /api/doingdoit/board/createReply:
 * post:
 *    description: 댓글을 생성합니다.
 * parameters:
 *    userId:
 *      description: 유저 아이디
 *      required: true
 *    boardId:
 *      description: 게시글 아이디
 *      required: true
 *    commentId:
 *      description: 댓글 아이디
 *      required: true
 *    content:
 *      description: 내용
 *      required: true
 * 
 * responses:
 *    200:
 *      description: 댓글을 생성 성공했습니다.
 *    500:
 *      description: 댓글을 생성 실패했습니다.
 */


import { NextResponse, NextRequest } from 'next/server';


import  { registerReply  } from '@/lib/api/board';

export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();


  const results = await registerReply(data as any);

  console.log("createReply results:", results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
