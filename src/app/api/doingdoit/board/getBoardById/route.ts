/**
 * @swagger
 * /api/doingdoit/board/getBoardById:
 *  get:
 *  description: 게시글을 가져옵니다.
 * parameters:
 * _id:
 * description: 게시글 아이디
 * required: true
 */

import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getBoardById,  } from '@/lib/api/board';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _id  = req.nextUrl.searchParams.get('_id');
  const _userId  = req.nextUrl.searchParams.get('_userId');

  


  const results = await getBoardById(
    
    //parseInt(_id as string, 10),

    _id as any,

    _userId as any,
  );
  

  ///console.log("getBoarddById========= results:", results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
