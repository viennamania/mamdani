import { NextResponse, NextRequest } from 'next/server';

import { getAll } from '@/lib/api/feed';

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

  console.log('_limit: ' + _limit);
  console.log('_page: ' + _page);

  
  /*
  const results = await getAll(
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
    _sort as string,
    _order as string,
    _q as string,
  );
  */

  const results = await getAll({
    _limit: parseInt(_limit as string, 10),
    _page: parseInt(_page as string, 10),
    _sort: _sort as string,
    _order: _order as string,
    _q: _q as string,

  } as any);



 
  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
