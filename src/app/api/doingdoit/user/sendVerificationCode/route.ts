import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { sendVerificationCode } from '@/lib/api/user';
import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _mobile = req.nextUrl.searchParams.get('_mobile');
  const _uuid = req.nextUrl.searchParams.get('_uuid');
  

  const results = await sendVerificationCode(
    _mobile as string,
    _uuid as string,
  );
  
  ////console.log("getUser results:", results);



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
