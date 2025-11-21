/**
 * @swagger
 * /api/doingdoit/feed/getInterest:
 * get:
 *  description: 관심 피드를 가져옵니다.
 */

// /api/doingdoit/feed/getInterestFeedByUserId


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getFeedById,  } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _id  = req.nextUrl.searchParams.get('_id');
  const _userId  = req.nextUrl.searchParams.get('_userId');



  const results = await getFeedById(
    _id as any,
    _userId as any,
  );
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
