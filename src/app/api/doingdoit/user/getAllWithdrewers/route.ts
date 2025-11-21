/**
 * @swagger
 * /api/doingdoit/user/getAllWithdrewers:
 *  post:
 *    description: 탈퇴한 사용자 목록을 가져옵니다.
 * 
 */

import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import {  getAllWithdrewers } from '@/lib/api/user';




/* ======================================

    
======================================= */


export const POST = async (req: NextRequest, res: NextResponse) => {

  
  const data = await req.json();



  const results = await getAllWithdrewers(data as any);
  
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
