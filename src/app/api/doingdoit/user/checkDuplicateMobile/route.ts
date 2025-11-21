/**
 * @swagger
 * /api/doingdoit/user/checkDuplicateMobile:
 *   get:
 *      description: 사용자 휴대폰번호 중복 체크
 *   responses:
 *      200:
 *        description: 사용자 휴대폰번호 중복 체크 성공했습니다.
 *      500:
 *        description: 사용자 휴대폰번호 중복 체크 실패했습니다.
 * 
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { checkDuplicateMobile } from '@/lib/api/user';
import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _mobile  = req.nextUrl.searchParams.get('_mobile');

  
  const results = await checkDuplicateMobile(
    _mobile as string, 
  );
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
