/**
 * @swagger
 * /api/doingdoit/user/getAllForDownload:
 * post:
 *    description: 사용자 전체 조회
 * responses:
 *    200:
 *      description: 사용자 전체 조회 성공
 *    500:
 *      description: 사용자 전체 조회 실패
 */

import { NextResponse, NextRequest } from 'next/server';

import { getWithdrawForDownload } from '@/lib/api/user';



export const POST = async (req: NextRequest, res: NextResponse) => {

  
  const data = await req.json();

  const results = await getWithdrawForDownload(data as any);
  

  

  ////console.log("results: ", results);

  // feedContent is string type and has html tags
  // so we need to convert it to text

  // TypeError: Cannot read properties of null (reading 'replace')
  // check if feedContent is null

  // '&nbsp;' is not replaced


  let resultData = results;

  resultData.forEach((item: any) => {


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




      


  try {
    return NextResponse.json({ data: resultData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
