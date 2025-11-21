/**
 * @swagger
 * /api/doingdoit/feed/registerOneJson:
 * post:
 *  description: 피드를 등록합니다.
 */


// /api/doingdoit/feed/registerOne


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import  { registerOne  } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

post json



======================================= */
///export const GET = async (req: NextRequest, res: NextResponse) => {

export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();
  
  //console.log("registerOne data:", data);


  const results = await registerOne(data as any);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
