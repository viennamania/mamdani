/**
 * @swagger
 * /api/doingdoit/survey/registerOne:
 *   post:
 *     description: 사용자 설문조사 결과를 등록합니다.
 *   responses:
 *        200:
 *          description: 설문조사 결과를 등록하기를 성공했습니다.
 *        500:
 *          description: 설문조사 결과를 등록하기를 실패했습니다.
 */

import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


////import  { registerOne  } from '@/lib/api/survey';

import { registerOne  } from '@/lib/api/survey';


///import { get } from 'lodash';


/* ======================================

post json



======================================= */
///export const GET = async (req: NextRequest, res: NextResponse) => {

export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  
  ///console.log("registerOne data:", data);



  const results = await registerOne(data as any);



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
