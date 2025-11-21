/**
 * @swagger
 *  /api/doingdoit/user/withdrawRecoveryById:
 *  get:
 *   description: "회원탈퇴 복구"
 * 
 */

import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { withdrawRecoveryById, } from '@/lib/api/user';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const id  = req.nextUrl.searchParams.get('id');


  const results = await withdrawRecoveryById(
    
    id as string,
  );


  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
