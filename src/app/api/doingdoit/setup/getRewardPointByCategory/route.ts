/**
 * @swagger
 * /api/doingdoit/setup/getSetupPoint:
 * get:
 *    description: 포인트 설정 정보 가져오기
 * responses:
 *    200:
 *      description: 가져오기 성공
 *    500:
 *      description: 가져오기 실패
 */


import { NextResponse, NextRequest } from 'next/server';




import { getRewardPointByCategory } from '@/lib/api/setup';




export const GET = async (req: NextRequest, res: NextResponse) => {

  const category = req.nextUrl.searchParams.get('category') as string;

  const results = await getRewardPointByCategory(
    category
  ) ;

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
