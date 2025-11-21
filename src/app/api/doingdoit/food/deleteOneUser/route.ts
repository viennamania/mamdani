/**
 * @swagger
 * /api/doingdoit/food/deleteOneUser:
 * get:
 *    description: 유저별 음식 삭제
 * responses:
 *    200:
 *      description: 삭제 성공
 *    500:
 *      description: 삭제 실패
 */


import { NextResponse, NextRequest } from 'next/server';

import { deleteOneUser } from '@/lib/api/food';


/* ======================================
deleteOne
======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  const userId = req.nextUrl.searchParams.get('userId');

  const foodCode = req.nextUrl.searchParams.get('foodCode');

 

  const results = await deleteOneUser(
    userId as any,
    foodCode as string,
  ) ;

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
