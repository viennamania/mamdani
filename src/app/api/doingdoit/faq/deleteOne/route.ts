/**
 * @swagger
 * /api/doingdoit/faq/deleteOne:
 * get:
 *  description: faq를 삭제합니다.
 */


import { NextResponse, NextRequest } from 'next/server';

import { deleteOne } from '@/lib/api/faq';


/* ======================================
deleteOne
======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  const id = req.nextUrl.searchParams.get('id');

 

  const results = await deleteOne(
    id as string,
  ) ;

  ////console.log("guide getAll======", results);
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
