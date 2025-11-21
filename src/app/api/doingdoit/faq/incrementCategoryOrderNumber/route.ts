/**
 * @swagger
 * /api/doingdoit/faqs/incrementCategoryOrderNumber:
 * get:
 *    description: 카테고리 순서 변경
 * responses:
 *    200:
 *      description: 카테고리 순서 변경 성공
 *    500:
 *      description: 카테고리 순서 변경 실패
 */


import { NextResponse, NextRequest } from 'next/server';

import { incrementCategoryOrderNumber } from '@/lib/api/faq';


export const GET = async (req: NextRequest, res: NextResponse) => {

  
  const id = req.nextUrl.searchParams.get('id');



  const results = await incrementCategoryOrderNumber(
    id as any,
  ) ;



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
