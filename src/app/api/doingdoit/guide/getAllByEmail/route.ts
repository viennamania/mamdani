import { NextResponse, NextRequest } from 'next/server';

import { getAllByEmail } from '@/lib/api/guide';
import { tags } from '@/app/shared/explore-flight/listing-filters/filter-utils';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {

  
  // _limit=10&_page=${currentPage}

  //const { _limit, _page } = req.query;

  //const currentPage = _page ? _page : 1;


  const email = req.nextUrl.searchParams.get('email');

  const _limit = req.nextUrl.searchParams.get('_limit');
  const _page = req.nextUrl.searchParams.get('_page');

  console.log('_limit: ' + _limit);
  console.log('_page: ' + _page);

  

  const results = await getAllByEmail(
    email as string,
    parseInt(_limit as string, 10),
    parseInt(_page as string, 10),
  );
  

     console.log(results);

  
        /*
    id: '100009',
    title: '제목',
    category: 'Computers',
    tags: [ '태그1', '태그2', '태그3' ],
    avatar: 'https://doingdoit.vercel.app/images/avatar.svg',
    createdAt: 2022-12-29T06:36:33.023Z,
    updatedAt: undefined,
    scrapCount: 83,
    likeCount: 14,
    commentCount: 100,
    viewCount: 98
        */
  

  
  const data = results.flatMap(({ boards }) =>
    //users.map((user) => ({ params: { username: user.username } }))

    //users.map((user) => ({ user }))
    boards.map((board) => ({

   
      id: board.id,
      nickname: board.userNickname,
      email: board.userEmail,
      avatar: board.userAvatar,
      title: board.title,
      category: board.category,
      tags: board.tags,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
      scrapCount: board.scrapCount,
      likeCount: board.likeCount,
      commentCount: board.commentCount,
      viewCount: board.viewCount,






    }))

  );

  console.log(data);
  

  ////const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));

  //const paths = results.flatMap(( users ) => ( users ));

  //console.log(paths);
  

  /* time seleep */
  /*
  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await sleep(1000);
  */


  try {
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
