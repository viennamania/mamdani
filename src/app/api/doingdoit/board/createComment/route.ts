/**
 * @swagger
 * /api/doingdoit/board/createComment:
 * post:
 *    description: 댓글을 생성합니다.
 * 
 * responses:
 *    200:
 *      description: 댓글을 생성 성공했습니다.
 *    500:
 *      description: 댓글을 생성 실패했습니다.
 */



import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import  { registerComment  } from '@/lib/api/board';

///import { get } from 'lodash';


/* ======================================

post json



======================================= */
///export const GET = async (req: NextRequest, res: NextResponse) => {

export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

 

  const results = await registerComment(data as any);

  console.log("createComment results:", results);



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
