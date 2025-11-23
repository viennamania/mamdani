/**
 * @swagger
 * /api/doingdoit/feed/getAll:
 * post:
 * description: 구매주문를 가져옵니다.
 */

import { NextResponse, NextRequest } from 'next/server';

import { getAll } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const POST = async (req: NextRequest, res: NextResponse) => {

  
  const data = await req.json();

  console.log("Request body:", data);


  const results = await getAll(data as any);
  
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
