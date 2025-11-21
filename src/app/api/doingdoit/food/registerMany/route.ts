/**
 * @swagger
 * /api/doingdoit/food/registerMany:
 *  post:
 *   description: 음식 등록
 *  responses:
 *  200:
 *  description: 음식 등록 성공
 * 500:
 * description: 음식 등록 실패
 * 
 */



import { NextResponse, NextRequest } from 'next/server';

import  { registerMany  } from '@/lib/api/food';



/* ======================================

======================================= */
export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  ////console.log("/api/doingdoit/food/registerMany data:", data);

  const results = await registerMany(
    data as any,
  );




  
  ////console.log("getUser results:", results);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
