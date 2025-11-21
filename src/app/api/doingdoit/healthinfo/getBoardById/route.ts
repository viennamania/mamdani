import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { getBoardById,  } from '@/lib/api/healthinfo';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _id  = req.nextUrl.searchParams.get('_id');

  /////console.log("getFeedById========= _id:", _id);
  
  const param  = _id as any;


  const results = await getBoardById(
    param
  );
  

  //console.log("getFeedById========= results:", results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
