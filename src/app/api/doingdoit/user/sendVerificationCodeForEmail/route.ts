/**
 * @swagger
 * /api/doingdoit/user/sendVerificationCodeForEmail:
 *  get:
 *   description: 이메일로 인증코드를 보냅니다.
 */

import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { sendVerificationCodeForEmail } from '@/lib/api/user';
import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _email = req.nextUrl.searchParams.get('_email');
  const _uuid = req.nextUrl.searchParams.get('_uuid');
  

  const results = await sendVerificationCodeForEmail(
    _email as string,
    _uuid as string,
  );
  
  ////console.log("getUser results:", results);

  



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
