/**
 * @swagger
 * /api/doingdoit/feed/updateFeedById:
 * get:
 *    description: 피드를 업데이트 합니다.
 * 
 * 
 */

import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { updateFeedById,  } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const id  = req.nextUrl.searchParams.get('_id') as any;

  const userId  = req.nextUrl.searchParams.get('_userId') as any;
  const email  = req.nextUrl.searchParams.get('_email') as any;
  const name = req.nextUrl.searchParams.get('_name') as any;
  const nickname  = req.nextUrl.searchParams.get('_nickname') as any;
  const avatar  = req.nextUrl.searchParams.get('_avatar') as any;


  const feedTitle  = req.nextUrl.searchParams.get('_feedTitle') as any;
  const feedContent  = req.nextUrl.searchParams.get('_feedContent') as any;

  
  

  const results = await updateFeedById(
    
    {
      id,

      userId,
      email,
      name,
      nickname,
      avatar,

      feedTitle,
      feedContent,


    } as any

  );
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
