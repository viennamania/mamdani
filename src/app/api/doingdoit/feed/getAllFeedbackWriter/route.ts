/**
 * @swagger
 * /api/doingdoit/feed/getAllFeedbackWriterList:
 * post:
 * description: 피드 작성자 피드 리스트를 가져옵니다.
 */


import { NextResponse, NextRequest } from 'next/server';

import { getAllFeedbackWriterList } from '@/lib/api/user';

// POST

export const POST = async (req: NextRequest, res: NextResponse) => {

  const results = await getAllFeedbackWriterList();


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
