/**
 * @swagger
 * /api/doingdoit/survey/resultById:
 * get:
 *   description: 설문조사 결과를 가져옵니다.
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


//import { getResultById,  } from '@/lib/api/survey';

import { getResultById  } from '@/lib/api/survey';


import _ from 'lodash';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _id  = req.nextUrl.searchParams.get('_id') as any;


  console.log("getResultByiId _id:", _id);

  const results = await getResultById(
    _id 
  );
  

  //////console.log("getResultByiId========= results:", results);


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
