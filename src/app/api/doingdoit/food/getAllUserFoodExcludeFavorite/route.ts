/**
 * @swagger
 * /api/doingdoit/food/getAllUserFoodExcludeFavorite:
 * get:
 *    description: 유저별 음식 전체 조회
 * responses:
 *    200:
 *      description: 조회 성공
 *    500:
 *      description: 조회 실패
 */



import { NextResponse, NextRequest } from 'next/server';

import { getAllUserFoodExcludeFavorite } from '@/lib/api/food';
import { parse } from 'path';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  const _userId = req.nextUrl.searchParams.get('_userId');
  const _limit = req.nextUrl.searchParams.get('_limit') || 10;
  const _page = req.nextUrl.searchParams.get('_page') || 1;
  const _sort = req.nextUrl.searchParams.get('_sort');
  const _order = req.nextUrl.searchParams.get('_order');

  
  ////console.log("getAllUserFood _userId ======", _userId);
  

  const results = await getAllUserFoodExcludeFavorite(
    _userId as any,
    
    //_limit as number,
    
    parseInt(_limit as string),

    _page as number,
    _sort as string,
    _order as string
  ) ;

  ///console.log("getAllUserFood ======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
