/**
 * @swagger
 * /api/doingdoit/faq/decrementCategoryOrderNumber:
 * get:
 *    description: "카테고리 순서를 감소합니다."
 * parameters:
 *    name: id
 *    in: query
 *    description: "카테고리 id"
 *    required: true
 * 
 * responses:
 *    200:
 *      description: 카테고리 순서를 감소 성공했습니다.
 *    500:
 *      description: 카테고리 순서를 감소 실패했습니다.
 * 
 */



import { NextResponse, NextRequest } from 'next/server';

import { decrementCategoryOrderNumber } from '@/lib/api/faq';


export const GET = async (req: NextRequest, res: NextResponse) => {


  const id = req.nextUrl.searchParams.get('id');

  
 

  const results = await decrementCategoryOrderNumber(
    id as any,
  ) ;

  
  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
