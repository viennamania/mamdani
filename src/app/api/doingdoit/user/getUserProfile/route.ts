/**
 * @swagger
 * /api/doingdoit/user/getUser:
 *   get:
 *     description: 사용자 정보를 가져옵니다.
 *     parameters: _id
 *     responses:
 *       200:
 *         description: 사용자 정보를 가져오기를 성공했습니다.
 *     500:
 *      description: 사용자 정보를 가져오기를 실패했습니다.
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


///import { getUser, getAllUsers, getUserCount } from '@/lib/api/user';

import { getUser } from '@/lib/api/user';



///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _id = parseInt(req.nextUrl.searchParams.get('_id') as string);
  

  const results = await getUser(
    _id as number,
  );
  
  ////console.log("getUser results:", results);



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
