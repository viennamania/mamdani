/**
 * @swagger
 * /api/doingdoit/guide/create:
 * post:
 *    description: 가이드 등록
 * 
 * parameters:
 * 
 * responses:
 *    200:
 *      description: 등록 성공
 *    500:
 *      description: 등록 실패
 * 
 * 
 */



import { NextResponse, NextRequest } from 'next/server';


import  { registerOne  } from '@/lib/api/guide';

///import { get } from 'lodash';


/* ======================================

post json



======================================= */
///export const GET = async (req: NextRequest, res: NextResponse) => {

export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  ///console.log("create data==========:", data);

  const results = await registerOne(data as any);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
