/**
 * @swagger
 * /api/doingdoit/food/deleteAll:
 * post:
 *  description: 음식 삭제
 * responses:
 *    200:
 *      description: 삭제 성공
 *    500:
 *      description: 삭제 실패
 */


import { NextResponse, NextRequest } from 'next/server';

import { deleteAll } from '@/lib/api/food';

export const POST = async (req: NextRequest, res: NextResponse) => {

  
  console.log('deleteAll');
  


  const results = await deleteAll();
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
