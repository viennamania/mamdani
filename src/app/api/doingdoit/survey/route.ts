import { NextResponse, NextRequest } from 'next/server';

import { data } from '@/data/doingdoit/survey/data';

/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {
 

  /* time seleep */
  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await sleep(1000);


  try {
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
};
