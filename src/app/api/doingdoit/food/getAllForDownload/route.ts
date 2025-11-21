/**
 * @swagger
 * /api/doingdoit/food/getAllForDownload:
 * post:
 *    description: 음식 전체 조회(다운로드용)
 * responses:
 *    200:
 *      description: 조회 성공
 *    500:
 *      description: 조회 실패
 */



import { NextResponse, NextRequest } from 'next/server';

import { getAllForDownload } from '@/lib/api/food';

///import { get } from 'lodash';


export const POST = async (req: NextRequest, res: NextResponse) => {

  
  const data = await req.json();

  const results = await getAllForDownload(data as any);
  


  /*
  let data = results;

  data.forEach((item: any) => {


    if (item.feedContent) {
      // '&nbsp;' is not replaced
      // '&nbsp;' have to be replaced with ' '
      //item.feedContent = item.feedContent.replace(/&nbsp;/g, ' ');
      //item.feedContent = item.feedContent.replace(/<[^>]*>/g, '');


      // '&nbsp;' have to be replaced with ' '

      item.feedContent = item.feedContent.replace(/&nbsp;/g, ' ');


      item.feedContent = item.feedContent.replace(

        /<[^>]*>/g,

        (match: any) => {
          //console.log('match: ' + match);
          if (match === '&nbsp;') { // &nbsp;
            return ' ';
          } else {
            return '';
          }
        }
      );
      

    }


    } );
    */




      


  try {
    
    ///return NextResponse.json({ data: data }, { status: 200 });

    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
