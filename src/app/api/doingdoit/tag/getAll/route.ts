import { NextResponse, NextRequest } from 'next/server';

import { getAllRecommended } from '@/lib/api/tag';

/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _limit = req.nextUrl.searchParams.get('_limit');
  const _page = req.nextUrl.searchParams.get('_page');

  console.log('_limit: ' + _limit);
  console.log('_page: ' + _page);

  

  const results = await getAllRecommended(
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
  ) ;
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
