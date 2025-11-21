/**
 * @swagger
 * /api/doingdoit/healthinfo/updateOne:
 * post:
 *    description: 건강정보 수정하기
 * 
 * responses:
 *    200:
 *      description: 수정 성공
 *    500:
 *      description: 수정 실패
 */



import { NextResponse, NextRequest } from 'next/server';



import  { updateOne  } from '@/lib/api/healthinfo';


/* ======================================

======================================= */
export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  //console.log("updateOne data==========:", data);



  const results = await updateOne(data as any);




  
  ////console.log("getUser results:", results);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
