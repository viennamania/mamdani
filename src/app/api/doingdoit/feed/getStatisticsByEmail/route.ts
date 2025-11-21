import { NextResponse, NextRequest } from 'next/server';

import { getStatisticsMealFoodByEmail } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================
getStatisticsByEmail
======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {




  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;

  

  const _email = req.nextUrl.searchParams.get('_email');


  ///console.log('getStatisticsByEmail _email: ' + _email);





  

  const results = await getStatisticsMealFoodByEmail(
    _email as any,
  );





  /////console.log('getStatisticsMealFoodByEmail results: ' + JSON.stringify(results));



  
  

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
