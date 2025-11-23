/**
 * @swagger
 * /api/doingdoit/food/addFoodToUser:
 * get:
 *    description: 유저별 코인 추가
 * responses:
 *    200:
 *      description: 추가 성공
 *    500:
 *      description: 추가 실패
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import  { addFoodToUser  } from '@/lib/api/food';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  const _foodCode = req.nextUrl.searchParams.get('_foodCode');
  const _userId = req.nextUrl.searchParams.get('_userId');




  const results = await addFoodToUser(

    _foodCode as string,
    _userId as any
    
  );



  ///console.log("addFoodToUser results:", results);



  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
