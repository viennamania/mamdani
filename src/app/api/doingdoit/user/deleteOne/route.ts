/**
 * @swagger
 * /api/doingdoit/user/deleteOne:
 *   get:
 *    description: 사용자 정보를 삭제 합니다.
 *   responses:
 *    200:
 *      description: 사용자 정보를 삭제 성공했습니다.
 *    500:
 *      description: 사용자 정보를 삭제 실패했습니다.
 */



import { NextResponse, NextRequest } from 'next/server';

///import { deleteOne } from '@/lib/api/user';
import { deleteOne } from '@/lib/api/user';


export const GET = async (req: NextRequest, res: NextResponse) => {

  const id = req.nextUrl.searchParams.get('id');


  const results = await deleteOne(
    id as string
  ) ;

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
