/**
 * @swagger
 * /api/doingdoit/user/checkEmailRegistered:
 *    get:
 *      description: 이메일 등록 여부를 확인합니다.
 *    parameters:
 *      _email: string
 */

import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { checkEmailRegistered } from '@/lib/api/user';
import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _email  = req.nextUrl.searchParams.get('_email');

  



  const results = await checkEmailRegistered(
    _email as string, 
  );
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
