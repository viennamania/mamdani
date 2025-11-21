/**
 * @swagger
 * /api/doingdoit/user/updatePasswordByEmail:
 *   get:
 *    description: 사용자 비밀번호를 업데이트 합니다.
  * 
  */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { updatePasswordByEmail, } from '@/lib/api/user';


export const GET = async (req: NextRequest, res: NextResponse) => {


  const _email  = req.nextUrl.searchParams.get('_email');
  const _password  = req.nextUrl.searchParams.get('_password');



  console.log("updatePasswordByEmail _email:", _email);

  


  const results = await updatePasswordByEmail(
    
    _email as string,
    _password as string,
  );


  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
