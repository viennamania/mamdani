/**
 * @swagger
 * /api/doingdoit/user/verifyVerificationCodeByEmail:
 * get:
 * description: 인증코드를 확인합니다.
 * 
 * 
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { verifyVerificationCodeByEmail } from '@/lib/api/user';
import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _email = req.nextUrl.searchParams.get('_email');
  const _uuid = req.nextUrl.searchParams.get('_uuid');
  const _verificationCode = req.nextUrl.searchParams.get('_verificationCode');

  console.log("_email:", _email);
  console.log("_uuid:", _uuid);
  //console.log("_verificationCode:", _verificationCode);

  
  

  const results = await verifyVerificationCodeByEmail(
    _email as string,
    _uuid as string,
    _verificationCode as string,
  );
  
  ////console.log("getUser results:", results);



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
