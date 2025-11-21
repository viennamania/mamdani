/**
 * @swagger
 * /api/doingdoit/user/getUserByMobile:
 *  get:
 *    description: 사용자 정보를 가져옵니다.
 *  responses:
 *    200:
 *      description: 사용자 정보를 가져오기를 성공했습니다.
 *    500:
 *      description: 사용자 정보를 가져오기를 실패했습니다.
 * 
 */



import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getUserByMobile } from '@/lib/api/user';


export const GET = async (req: NextRequest, res: NextResponse) => {


  const _mobile = req.nextUrl.searchParams.get('_mobile');

  ////console.log("getUserByMobile _mobile:", _mobile);
  


  const results = await getUserByMobile(
    _mobile as string,
  );
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
