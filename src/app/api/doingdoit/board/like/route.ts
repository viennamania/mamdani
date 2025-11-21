/**
 * @swagger
 * /api/doingdoit/board/like:
 *  get:
 *   description: "좋아요 하기"
 *  
 * 
 *  parameters:
 *  _id:
 *   description: 좋아요 할 게시물의 _id
 * 
 * 
 * responses:
 *  200:
 *  description: 좋아요 성공
 * 500:
 * description: 좋아요 실패
 * 
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { like,  } from '@/lib/api/board';


///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _id  = req.nextUrl.searchParams.get('_id');
  const _userId  = req.nextUrl.searchParams.get('_userId');


  console.log("like _id:", _id);
  console.log("like _userId:", _userId);

  /*
  const results = await like(
    _id as any,
    _userId as any,

    
  );
  */
  const results = await like(
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
