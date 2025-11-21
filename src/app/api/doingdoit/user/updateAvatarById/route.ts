/**
 * @swagger
 * /api/doingdoit/user/updateAvatarById:
 *   get:
 *     description: 사용자 프로필 이미지를 업데이트 합니다.
 *     parameters: _id, _avatar
 * 
 *     responses:
 *       200:
 *         description: 사용자 프로필 이미지를 업데이트를 성공했습니다.
 *     500:
 *      description: 사용자 프로필 이미지를 업데이트를 실패했습니다.
 */

import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


///import { updateAvatarById,  } from '@/lib/api/user';

import { updateAvatarById } from '@/lib/api/user';



///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {
  const id  = req.nextUrl.searchParams.get('_id') as string
  const avatar  = req.nextUrl.searchParams.get('_avatar') as string
  const results = await updateAvatarById(
    {
      id,
      avatar,
    }
  );
  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
};
