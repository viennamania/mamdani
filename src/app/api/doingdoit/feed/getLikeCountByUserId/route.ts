/**
 * @swagger
 * /api/doingdoit/feed/getLikeCountByUserId:
 * get:
 *    description: 유저의 좋아요 갯수 가져오기
 * responses:
 *    200:
 *      description: 가져오기 성공
 *    500:
 *      description: 가져오기 실패
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getLikeCountByUserId,  } from '@/lib/api/feed';
import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _userId  = req.nextUrl.searchParams.get('_userId');


  const results = await getLikeCountByUserId(
    _userId as any
  );
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
