import { NextResponse, NextRequest } from 'next/server';

import { getAllCount } from '@/lib/api/point';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _q = req.nextUrl.searchParams.get('_q');

  console.log("getAllCount _q:", _q);

  const results = await getAllCount(
    _q as string,
  );

  
  console.log("getAllCount results:", results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
