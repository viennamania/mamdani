/**
 * @swagger
 * /api/doingdoit/user/getContract:
 *  post:
 *    description: 사용자 계약 정보를 가져옵니다.
 *  parameters: contractName (terms, privacy, marketing, withdrawal)
 *  responses:
 *    200:
 *      description: 사용자 계약 정보를 가져오기를 성공했습니다.
 *    500:
 *      description: 사용자 계약 정보를 가져오기를 실패했습니다.
 */


import { NextResponse, NextRequest } from 'next/server';


import { getContract } from '@/lib/api/user';



export const POST = async (req: NextRequest, res: NextResponse) => {


  const data = await req.json();


  ///console.log('getContract data', data);



  const results = await getContract(data as any);
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
