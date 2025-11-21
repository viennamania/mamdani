/**
 * @swagger
 * /api/doingdoit/feed/updateFeedbackById:
 * get:
 *  description: 피드의 피드백을 업데이트 합니다.
 */


import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import {  updateFeedbackById  } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _id  = req.nextUrl.searchParams.get('_id');


  const _feedbackWriterId = req.nextUrl.searchParams.get('_feedbackWriterId');
  const _feedbackWriterNickname = req.nextUrl.searchParams.get('_feedbackWriterNickname');
  const _feedbackWriterAvatar = req.nextUrl.searchParams.get('_feedbackWriterAvatar');
  const _feedbackWriterEmail = req.nextUrl.searchParams.get('_feedbackWriterEmail');


  const _feedbackContent  = req.nextUrl.searchParams.get('_feedbackContent');
  const _feedbackScore  = req.nextUrl.searchParams.get('_feedbackScore');



  
  const id  = _id as any;



  const feedbackContent  = _feedbackContent as any;
  const feedbackScore  = _feedbackScore as any;
  const feedbackWriterId  = _feedbackWriterId as any;
  const feedbackWriterNickname  = _feedbackWriterNickname as any;
  const feedbackWriterAvatar  = _feedbackWriterAvatar as any;
  const feedbackWriterEmail  = _feedbackWriterEmail as any;




  const results = await updateFeedbackById(
    
    {
      id,
      feedbackContent,
      feedbackScore,
      
      feedbackWriterId,

      feedbackWriterNickname,
      feedbackWriterAvatar,
      feedbackWriterEmail,



    }

  );
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
