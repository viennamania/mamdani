/**
 * @swagger
 * /api/doingdoit/user/updateContract:
 *  post:
 *    description: 사용자 계약 정보를 업데이트 합니다.
 * responses:
 *  200:
 *    description: 사용자 계약 정보를 업데이트를 성공했습니다.
 *  500:
 *    description: 사용자 계약 정보를 업데이트를 실패했습니다.
 * 
 */

import { NextResponse, NextRequest } from 'next/server';


import { updateContract } from '@/lib/api/user';




export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();


  ////console.log("setOne data:", data);


  const results = await updateContract(data as any);
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
