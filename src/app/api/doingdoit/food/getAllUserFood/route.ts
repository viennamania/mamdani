/**
 * @swagger
 * /api/doingdoit/food/getAllUserFood:
 * get:
 *    description: 유저별 음식 전체 조회
 * responses:
 *    200:
 *      description: 조회 성공
 *    500:
 *      description: 조회 실패
 */



import { NextResponse, NextRequest } from 'next/server';

import { getAllUserFood } from '@/lib/api/food';


/*
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  const _userId = req.nextUrl.searchParams.get('_userId');
  const _limit = req.nextUrl.searchParams.get('_limit') || 10;
  const _page = req.nextUrl.searchParams.get('_page') || 1;
  const _sort = req.nextUrl.searchParams.get('_sort');
  const _order = req.nextUrl.searchParams.get('_order');

  
  console.log("getAllUserFood _userId ======", _userId);
  

  const results = await getAllUserFood(
    _userId as any,
    _limit as number,   
    _page as number,
    _sort as string,
    _order as string
  ) ;
  */


  // POST
export const POST = async (req: NextRequest, res: NextResponse) => {

  

  const data = await req.json();

  const results = await getAllUserFood(data as any);
  


  ///console.log("getAllUserFood ======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
