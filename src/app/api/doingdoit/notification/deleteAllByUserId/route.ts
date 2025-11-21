/**
 * @swagger
 * /api/doingdoit/notification/deleteAllByUserId:
 * get:
 *    description: 유저의 모든 알림을 삭제합니다.
 * parameters: _userId
 * responses:
 *    200:
 *      description: 유저의 모든 알림을 삭제했습니다.
 *    500:
 *      description: 유저의 모든 알림을 삭제하지 못했습니다.
 * 
 */



import { NextResponse, NextRequest } from 'next/server';

import { deleteAllByUserId } from '@/lib/api/notification';


export const GET = async (req: NextRequest, res: NextResponse) => {

  

  const _userId = req.nextUrl.searchParams.get('_userId');


  console.log("notification deleteAllByUserId _userId:", _userId);

 

  const results = await deleteAllByUserId(
    _userId as any,
  ) ;

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
