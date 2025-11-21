/**
 * @swagger
 * /api/doingdoit/board/unlike:
 * get:
 *    description: 좋아요 취소하기
 * responses:
 *    200:
 *      description: 좋아요 취소하기 성공
 *    500:
 *      description: 좋아요 취소하기 실패
 */


import { NextResponse, NextRequest } from 'next/server';

import { unlike,  } from '@/lib/api/board';


export const GET = async (req: NextRequest, res: NextResponse) => {

  const _id  = req.nextUrl.searchParams.get('_id');
  const _userId  = req.nextUrl.searchParams.get('_userId');


  const results = await unlike(
    _id as any,
    _userId as any,

  );
  

  //console.log("getFeedById========= results:", results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
