/**
 * @swagger
 * /api/doingdoit/board/editComment:
 * post:
 *    description: 댓글을 수정합니다.
 * responses:
 *    200:
 *      description: 댓글을 수정했습니다.
 *    500:
 *      description: 댓글을 수정하지 못했습니다.
 *
 */



import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import  { updateComment  } from '@/lib/api/board';

///import { get } from 'lodash';


/* ======================================

post json



======================================= */
///export const GET = async (req: NextRequest, res: NextResponse) => {

export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

 
  console.log("editComment data:", data);
  

  const results = await updateComment(data as any);

  console.log("updateComment results:", results);



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
