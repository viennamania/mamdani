/**
 * @swagger
 * /api/doingdoit/faq/getOne:
 * get:
 *  description: faq를 가져옵니다.
 * responses:
 *    200:
 *      description: faq를 가져옵니다.
 *    500:
 *      description: faq를 가져오는데 실패했습니다.
 */


import { NextResponse, NextRequest } from 'next/server';

import { getOne } from '@/lib/api/faq';

export const GET = async (req: NextRequest, res: NextResponse) => {

  const id = req.nextUrl.searchParams.get('id');

  const results = await getOne(
    id as any
  ) ;

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
