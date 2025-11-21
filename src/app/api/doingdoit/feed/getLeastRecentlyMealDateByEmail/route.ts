import { NextResponse, NextRequest } from 'next/server';

import { getLeastRecentlyMealDateByEmail } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================
getStatisticsByEmail
======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _email = req.nextUrl.searchParams.get('_email');

 

  const results = await getLeastRecentlyMealDateByEmail(
    _email as any,
  );



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
