import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import  { registerOne  } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const _userId = req.nextUrl.searchParams.get('_userId');
  const _email = req.nextUrl.searchParams.get('_email');
  const _name = req.nextUrl.searchParams.get('_name');
  const _nickname = req.nextUrl.searchParams.get('_nickname');
  const _avatar = req.nextUrl.searchParams.get('_avatar');
  const _mealDate = req.nextUrl.searchParams.get('_mealDate');
  const _mealTime = req.nextUrl.searchParams.get('_mealTime');
  
  const _mealFood  = req.nextUrl.searchParams.get('_mealFood');

  const _mealAmount = req.nextUrl.searchParams.get('_mealAmount');
  const _mealSpeed = req.nextUrl.searchParams.get('_mealSpeed');
  const _scrapCount = req.nextUrl.searchParams.get('_scrapCount') || 0;
  const _likeCount = req.nextUrl.searchParams.get('_likeCount') || 0;
  const _commentCount = req.nextUrl.searchParams.get('_commentCount') || 0;
  const _viewCount = req.nextUrl.searchParams.get('_viewCount') || 0;
  const _rating = req.nextUrl.searchParams.get('_rating');
  const _feedbackYn = req.nextUrl.searchParams.get('_feedbackYn');



  const results = await registerOne({
    userId: _userId || 'no id',
    email: _email || 'no email',
    name: _name || 'no name',
    nickname: _nickname || 'no nickname',
    avatar: _avatar || 'no avatar',
    mealDate: _mealDate || 'no mealDate',
    mealTime: _mealTime || 'no mealTime',
    
    
    ///mealFood: _mealFood,

    mealFood: _mealFood || Object(null),
    


    mealAmount: _mealAmount || 'no mealAmount',
    mealSpeed: _mealSpeed || 'no mealSpeed',


    feedbackYn: _feedbackYn || 'no feedbackYn',


    feedTitle: 'feedTitle',
    feedContent: 'feedContent',
    feedImage1: 'feedImage1',
    feedImage2: 'feedImage2',
    feedImage3: 'feedImage3',
    feedImage4: 'feedImage4',
    feedImage5: 'feedImage5',
    feedImage6: 'feedImage6',
    feedImage7: 'feedImage7',
    feedImage8: 'feedImage8',
    feedImage9: 'feedImage9',
    feedImage10: 'feedImage10',

    hiddenYn: 'N',



  });



  
  ////console.log("getUser results:", results);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
