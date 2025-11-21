import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { updateFeedById,  } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

======================================= */
//export const GET = async (req: NextRequest, res: NextResponse) => {

export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();
  
  
  console.log("updateOne ========= data:", data);



  const results = await updateFeedById(data as any);
  
  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }

};
