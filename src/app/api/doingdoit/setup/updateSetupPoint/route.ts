/**
 * @swagger
 * /api/doingdoit/setup/updateSetupPoint:
 *  post:
 *    description: 포인트 설정 정보 수정하기
 *  responses:
 *    200:
 *      description: 수정하기 성공
 *    500:
 *      description: 수정하기 실패
 */


import { NextResponse, NextRequest } from 'next/server';



import  { updateSetupPoint  } from '@/lib/api/setup';


/* ======================================

======================================= */
export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();


  const results = await updateSetupPoint(data as any);




  
  ////console.log("getUser results:", results);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
