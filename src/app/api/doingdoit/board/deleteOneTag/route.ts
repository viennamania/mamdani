/**
 * @swagger
 * /api/doingdoit/board/deleteOneTag:
 * get:
 *    description: "태그를 삭제합니다."
 * responses:
 *    200:
 *      description: 태그를 삭제 성공했습니다.
 *    500:
 *      description: 태그를 삭제 실패했습니다.
 */



import { NextResponse, NextRequest } from 'next/server';

import { deleteOneTag } from '@/lib/api/board';


export const GET = async (req: NextRequest, res: NextResponse) => {


  const id = req.nextUrl.searchParams.get('id');

 

  const results = await deleteOneTag(
    id as any
  ) ;

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
