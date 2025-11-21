import { NextResponse, NextRequest } from 'next/server';

import { getAllByEmailScrapCount } from '@/lib/api/feed';

///import { get } from 'lodash';


/* get server session */



/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  const _email = req.nextUrl.searchParams.get('_email');

  const _q = req.nextUrl.searchParams.get('_q');


  

  


  const results = await getAllByEmailScrapCount(
    _email as any,
    _q as string,
  );

  console.log("getAllByEmailCount results: ", results);
  
  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
