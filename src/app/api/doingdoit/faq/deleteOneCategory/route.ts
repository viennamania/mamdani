/**
 * @swagger
 * /api/doingdoit/faq/deleteOneCategory:
 * get:
 *    description: "카테고리를 삭제합니다."
 * responses:
 *    200:
 *      description: 카테고리를 삭제 성공했습니다.
 *    500:
 *      description: 카테고리를 삭제 실패했습니다.
 */



import { NextResponse, NextRequest } from 'next/server';

import { deleteOneCategory } from '@/lib/api/faq';


export const GET = async (req: NextRequest, res: NextResponse) => {


  const id = req.nextUrl.searchParams.get('id');

 

  const results = await deleteOneCategory(
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
