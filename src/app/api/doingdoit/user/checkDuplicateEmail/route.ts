/**
 * @swagger
 * /api/doingdoit/user/checkDuplicateEmail:
 *    get:
 *      description: 사용자 이메일 중복 체크
 *    responses:
 *      200:
 *        description: 사용자 이메일 중복 체크 성공했습니다.
 *      500:
 *        description: 사용자 이메일 중복 체크 실패했습니다.
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { checkDuplicateEmail } from '@/lib/api/user';
import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _email  = req.nextUrl.searchParams.get('_email');

  



  const results = await checkDuplicateEmail(
    _email as string, 
  );
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
