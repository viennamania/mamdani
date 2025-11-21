/**
 * @swagger
 * /api/doingdoit/survey/getAll:
 * get:
 *    description: 설문조사를 가져옵니다.
 */

import { NextResponse, NextRequest } from 'next/server';

import { getAll } from '@/lib/api/survey';

export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  ///console.log('data', data);

  const results = await getAll(data as any);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
