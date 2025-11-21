/**
 * @swagger
 * /api/doingdoit/faqs/getAllCategory:
 * post:
 *    description: "모든 태그를 가져옵니다."

 * responses:
 *    200:
 *      description: 모든 태그를 가져오기 성공했습니다.
 *    500:
 *      description: 모든 태그를 가져오기 실패했습니다.
 */


import { NextResponse, NextRequest } from 'next/server';

import { getAllCategories} from '@/lib/api/faq';



export const POST = async (req: NextRequest, res: NextResponse) => {

  
  const data = await req.json();



  const results = await getAllCategories(data as any);
  
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
