/**
 * @swagger
 * /api/doingdoit/notification/getAllByUserId:
 * get:
 *    description: 유저의 모든 알림을 가져옵니다.
 * parameters: _userId, _limit, _page, _sort, _order, _q
 * responses:
 *    200:
 *      description: 유저의 모든 알림을 가져왔습니다.
 *    500:
 *      description: 유저의 모든 알림을 가져오지 못했습니다.
 */



import { NextResponse, NextRequest } from 'next/server';

import { getAllByUserId } from '@/lib/api/notification';


import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  
  const _userId = req.nextUrl.searchParams.get('_userId');

  const _limit = req.nextUrl.searchParams.get('_limit');
  const _page = req.nextUrl.searchParams.get('_page');

  const _sort = req.nextUrl.searchParams.get('_sort');
  const _order = req.nextUrl.searchParams.get('_order');

  const _q = req.nextUrl.searchParams.get('_q');


  
  console.log("notification _userId:", _userId);
  

  const results = await getAllByUserId(
    _userId as any,
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
    _sort as string,
    _order as string,
    _q as string,
  ) ;

  ///console.log("notification getAllByEmail:", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
