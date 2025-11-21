/**
 * @swagger
 * /api/doingdoit/feed/getAllByEmail:
 * get:
 * description: 이메일로 피드를 가져옵니다.
 */

// /api/doingdoit/feed/getAllByUserId

import { NextResponse, NextRequest } from 'next/server';

import { getAllByEmail } from '@/lib/api/feed';

///import { get } from 'lodash';


/* get server session */



/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  const _email = req.nextUrl.searchParams.get('_email');

  const _limit = req.nextUrl.searchParams.get('_limit');
  const _page = req.nextUrl.searchParams.get('_page');

  const _sort = req.nextUrl.searchParams.get('_sort');
  const _order = req.nextUrl.searchParams.get('_order');

  const _q = req.nextUrl.searchParams.get('_q');


  
  


  const results = await getAllByEmail(
    _email as any,
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
    _sort as string,
    _order as string,
    _q as string,
  );
  
  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
