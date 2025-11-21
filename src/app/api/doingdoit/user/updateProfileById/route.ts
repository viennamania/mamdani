/**
 * @swagger
 *  /api/doingdoit/user/updateProfileById:
 *  post:
 *    description: 사용자 정보를 업데이트 합니다.
 *  responses:
 *   200:
 *   description: 사용자 정보를 업데이트 성공했습니다.
 *  500:
 * description: 사용자 정보를 업데이트 실패했습니다.
 *  
 */



import { NextResponse, NextRequest } from 'next/server';

//import { updateProfileById } from '@/lib/api/user';

import { updateProfileById } from '@/lib/api/user';




export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();


  console.log("updateProfileById data:", data);




  const results = await updateProfileById(data as any);
  



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
