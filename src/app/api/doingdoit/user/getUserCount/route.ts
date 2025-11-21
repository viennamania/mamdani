import { NextResponse, NextRequest } from 'next/server';

import { getUserCount } from '@/lib/api/user';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _q = req.nextUrl.searchParams.get('_q');

  const results = await getUserCount(

    _q as string || ''

  );



  console.log("getUserCount ======", results);  




  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
