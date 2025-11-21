/**
 * @swagger
 * /api/doingdoit/feed/getAll:
 * post:
 * description: 피드를 가져옵니다.
 */

import { NextResponse, NextRequest } from 'next/server';

import { getStatsAll } from '@/lib/api/feed';

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
