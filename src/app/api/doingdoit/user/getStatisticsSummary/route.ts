/**
 * @swagger
 * /api/doingdoit/user/getStatisticsSummary:
 *   post:
 *     description: 사용자 정보를 가져옵니다.
 *     responses:
 *       200:
 *         description: 사용자 정보를 가져오기를 성공했습니다.
 *     500:
 *      description: 사용자 정보를 가져오기를 실패했습니다.
 */


import { NextResponse, NextRequest } from 'next/server';


import { getStatisticsSummary } from '@/lib/api-doingdoit/user';


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
