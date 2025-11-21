/**
 * @swagger
 * /api/doingdoit/feed/like:
 * get:
 *  description: 좋아요를 합니다.
 * 
 */



import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { like,  } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _id  = req.nextUrl.searchParams.get('_id');
  const _userId  = req.nextUrl.searchParams.get('_userId');
  const _userEmail  = req.nextUrl.searchParams.get('_userEmail');
  const _userNickname  = req.nextUrl.searchParams.get('_userNickname');
  const _userAvatar  = req.nextUrl.searchParams.get('_userAvatar');



  const results = await like(
    _id as any,
    _userId as any,
    _userEmail as any,
    _userNickname as any,
    _userAvatar as any,
    
  );
  

  //console.log("getFeedById========= results:", results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
