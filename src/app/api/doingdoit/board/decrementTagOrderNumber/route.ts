/**
 * @swagger
 * /api/doingdoit/board/decrementTagOrderNumber:
 * get:
 *    description: "태그 순서를 감소합니다."
 * parameters:
 *    name: id
 *    in: query
 *    description: "태그 id"
 *    required: true
 * 
 * responses:
 *    200:
 *      description: 태그 순서를 감소 성공했습니다.
 *    500:
 *      description: 태그 순서를 감소 실패했습니다.
 * 
 */



import { NextResponse, NextRequest } from 'next/server';

import { decrementTagOrderNumber } from '@/lib/api/board';


export const GET = async (req: NextRequest, res: NextResponse) => {


  const id = req.nextUrl.searchParams.get('id');

  console.log('decrementTagOrderNumber id: ', id );

 

  const results = await decrementTagOrderNumber(
    id as any,
  ) ;

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
