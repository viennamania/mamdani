import { NextResponse, NextRequest } from 'next/server';

import { getWithdrewerCount } from '@/lib/api/user';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _q = req.nextUrl.searchParams.get('_q');

  const results = await getWithdrewerCount(

    _q as string || ''

  );







  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
