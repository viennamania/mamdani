/**
 * @swagger
 * /api/doingdoit/feed/getAllPublic:
 * get:
 *    description: 공개한 피드만 가져옵니다.
 */


import { NextResponse, NextRequest } from 'next/server';

import { getAllPublic } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  

  const _limit = req.nextUrl.searchParams.get('_limit');
  const _page = req.nextUrl.searchParams.get('_page');

  const _sort = req.nextUrl.searchParams.get('_sort');
  const _order = req.nextUrl.searchParams.get('_order');

  const _q = req.nextUrl.searchParams.get('_q');

  ////console.log('req.nextUrl.searchParams', req.nextUrl.searchParams);



  const results = await getAllPublic(
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
    _sort as string,
    _order as string,
    _q as string,
  ) ;
  


  ////console.log('feed/getAllPublic results', results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
