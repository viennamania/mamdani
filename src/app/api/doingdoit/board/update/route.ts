/**
 * @swagger
 * /api/doingdoit/board/update:
 *  post:
 *  description: "게시물 수정"
 *  parameters:
 * 
 *
 */



import { NextResponse, NextRequest } from 'next/server';

import  { updateOne  } from '@/lib/api/board';


export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  //console.log("update data:", data);

  const results = await updateOne(data as any);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
