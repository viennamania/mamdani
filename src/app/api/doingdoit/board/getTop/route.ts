/**
 * @swagger
 * /api/doingdoit/board/getTop:
 * get:
 *    description: 게시글을 가져옵니다.
 * responses:
 *   200:
 *      description: 게시글 가져오기 성공
 *   500:
 *      description: 게시글 가져오기 실패
 * 
 * 
 */


import { NextResponse, NextRequest } from 'next/server';

import { getTop, getAll } from '@/lib/api/board';

///import { get } from 'lodash';

// Force dynamic rendering
export const dynamic = 'force-dynamic';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  
/*
  const _limit = req.nextUrl.searchParams.get('_limit');
  const _page = req.nextUrl.searchParams.get('_page');

  const _sort = req.nextUrl.searchParams.get('_sort');
  const _order = req.nextUrl.searchParams.get('_order');

  const _q = req.nextUrl.searchParams.get('_q');
*/

  const _limit = "3";
  const _page = "1";
  const _sort = "createdAt";
  const _order = "desc";
  const _q = "";

  

  /*
  const results = await getAll(
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
    _sort as string,
    _order as string,
    _q as string,
  ) ;
  */

  const results = await getAll(
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
    _sort as string,
    _order as string,
    _q as string,
  ) ;

  ///console.log("board getAll:", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
