/**
 * @swagger
 * /api/doingdoit/point/getAllByUserId:
 * post:
 *    description: 이메일로 포인트를 가져옵니다.
 * 
 */


import { NextResponse, NextRequest } from 'next/server';

import { getAllByUserId } from '@/lib/api/point';


  export const POST = async (req: NextRequest, res: NextResponse) => {

  
    const data = await req.json();
  
  
    const results = await getAllByUserId(data as any);
    
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
