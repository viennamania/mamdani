
/**
 * @swagger
 * /api/doingdoit/food/getFavoriteFood:
 * 
 * get:
 *    description: 유저별 즐겨찾는 음식 조회
 * responses:
 *    200:
 *      description: 조회 성공
 *    500:
 *      description: 조회 실패
 */



import { NextResponse, NextRequest } from 'next/server';

import { getFavoriteFood } from '@/lib/api/food';


export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  const _userId = req.nextUrl.searchParams.get('_userId');

  
  ////console.log("getAllUserFood _userId ======", _userId);
  

  const results = await getFavoriteFood(
    _userId as any
  ) ;

  ////console.log("getFavoriteFood ======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
