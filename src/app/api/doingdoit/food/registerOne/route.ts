/**
 * @swagger
 * /api/doingdoit/food/registerOne:
 * get:
 *   description: 음식 등록
 * responses:
 *   200:
 *    description: 음식 등록 성공
 *  500:
 *   description: 음식 등록 실패
 */


import { NextResponse, NextRequest } from 'next/server';


import  { registerOne  } from '@/lib/api/food';



export const GET = async (req: NextRequest, res: NextResponse) => {

  const _foodName = req.nextUrl.searchParams.get('_foodName');
  const _publisher = req.nextUrl.searchParams.get('_publisher');



  const results = await registerOne(
      
    _foodName as string,
    _publisher as any
    
  );
  
  ////console.log("getUser results:", results);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
