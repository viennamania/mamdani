import { NextResponse, NextRequest } from 'next/server';

import { getUnreadCountByUserId } from '@/lib/api/notification';

///import { get } from 'lodash';


/* get server session */



/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  

  const _userId = req.nextUrl.searchParams.get('_userId');

 

  const results = await getUnreadCountByUserId(
    _userId as any,

  );


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
