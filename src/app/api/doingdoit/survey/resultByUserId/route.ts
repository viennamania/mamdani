/**
 * @swagger
 * /api/doingdoit/survey/resultByUserId:
 *  get:
 *    description: 사용자 아이디로 설문조사 결과를 가져옵니다.
 *  responses:
 *    200:
 *      description: 설문조사 결과를 가져오기를 성공했습니다.
 *    500:
 *      description: 설문조사 결과를 가져오기를 실패했습니다.
 * 
*/


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


////import { getResultByUserId,  } from '@/lib/api/survey';

import { getResultByUserId,  } from '@/lib/api/survey';



import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _userId = req.nextUrl.searchParams.get('_userId') as any;


  console.log("resultByUserId _userId:", _userId);

  const results = await getResultByUserId(
    _userId 
  );
  

  //console.log("getFeedById========= results:", results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
