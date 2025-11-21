import { NextResponse, NextRequest } from 'next/server';

import { getAllCount } from '@/lib/api/faq';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _q = req.nextUrl.searchParams.get('_q');
  

  const results = await getAllCount(
    _q as string,
  ) ;

  ////console.log('results: ' + JSON.stringify(results));

  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
