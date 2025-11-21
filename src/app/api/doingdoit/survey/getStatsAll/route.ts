/**
 * @swagger
 * /api/doingdoit/survey/getStatsAll:
 * post:
 * description: 설문 통계 데이터를 가져옵니다.
 */

import { NextResponse, NextRequest } from 'next/server';

import { getStatsAll } from '@/lib/api/survey';

export const POST = async (req: NextRequest, res: NextResponse) => {

  
  const data = await req.json();


  const results = await getStatsAll(data as any);
  
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
