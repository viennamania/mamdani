import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getCount } from '@/lib/api/guide';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _email = req.nextUrl.searchParams.get('_email');
  const _q = req.nextUrl.searchParams.get('_q');

  const results = await getCount(
    _email as string,
    _q as string,
  );


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
