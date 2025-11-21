/**
 * @swagger
 * /api/doingdoit/user/getStatisticsSummary:
 *   post:
 *     description: 통계 요약 조회
 *   responses:
 *     200:
 *        description: 통계 요약 조회 성공
 *     500:
 *        description: 통계 요약 조회 실패
 */


import { NextResponse, NextRequest } from 'next/server';


import { getStatisticsSummary } from '@/lib/api/feed';


export const POST = async (req: NextRequest, res: NextResponse) => {


  const results = await getStatisticsSummary(
    req.body as any
  );
  
  ////console.log("getUser results:", results);



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
