import { NextResponse, NextRequest } from 'next/server';

import { getCount } from '@/lib/api/food';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  const _userId = req.nextUrl.searchParams.get('_userId');
  const _q = req.nextUrl.searchParams.get('_q');

 

  const results = await getCount(
    _userId || 'no userId',
    _q || '',
  ) ;

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
