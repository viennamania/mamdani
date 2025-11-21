import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getUserById, getUser, getAllUsers, getUserCount } from '@/lib/api/user';

///import { get } from 'lodash';


/* ======================================
/api/doingdoit/user/getUserById?_id=57373
======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _id  = req.nextUrl.searchParams.get('_id');

  console.log("getUserById _id:", _id);
  
  const param  = _id as any;


  const results = await getUserById(
    param
  );
  
  ////console.log("getUser results:", results);



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
