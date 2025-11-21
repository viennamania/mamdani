import { NextResponse, NextRequest } from 'next/server';

import { getOneCategory } from '@/lib/api/faq';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _id = req.nextUrl.searchParams.get('_id');

  const results = await getOneCategory(
    _id as string
  ) ;

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
