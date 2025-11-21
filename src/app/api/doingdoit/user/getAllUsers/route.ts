/**
 * @swagger
 * /api/doingdoit/user/getAllUsers:
 *  post:
 *    description: 사용자 목록을 가져옵니다.
 *  responses:
 *    200:
 *      description: 사용자 목록을 가져오기를 성공했습니다.
 *    500:
 *      description: 사용자 목록을 가져오기를 실패했습니다.
 */



import { NextResponse, NextRequest } from 'next/server';

////import { getUser, getAllUsers, getUserCount } from '@/lib/api/user';

import { getAllUsers } from '@/lib/api/user';


/* ======================================

    
======================================= */


export const POST = async (req: NextRequest, res: NextResponse) => {

  
  const data = await req.json();

  const results = await getAllUsers(data as any);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
