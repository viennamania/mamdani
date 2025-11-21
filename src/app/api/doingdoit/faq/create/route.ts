/**
 * @swagger
 * /api/doingdoit/faq/create:
 * post:
 *   description: faq를 생성합니다.
 * 
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import  { registerOne  } from '@/lib/api/faq';



export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  ///console.log("create data==========:", data);

  const results = await registerOne(data as any);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
  
};
