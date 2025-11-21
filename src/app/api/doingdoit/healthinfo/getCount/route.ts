import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getCount } from '@/lib/api/healthinfo';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _email = req.nextUrl.searchParams.get('_email');
  const _q = req.nextUrl.searchParams.get('_q');



  // getUserCount();

  const results = await getCount(
    _email as string,
    _q as string,
  );

  //results.map(({ count }) => {
  //  console.log(count);
  //}


  ////console.log(results);

  const memberData  = results;




  try {
    return NextResponse.json({ data: memberData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
