/**
 * @swagger
 * /api/doingdoit/user/updateAvatarByEmail:
 * get:
 *  description: 사용자 프로필 이미지를 업데이트 합니다.
 * responses:
 *  200:
 *    description: 사용자 프로필 이미지를 업데이트를 성공했습니다.
 *  500:
 *    description: 사용자 프로필 이미지를 업데이트를 실패했습니다.
 */

import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


///import { updateAvatarByEmail,  } from '@/lib/api/user';

import { updateWalletAddressByEmail } from '@/lib/api/user';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {
  const email  = req.nextUrl.searchParams.get('email') as string
  const walletAddress  = req.nextUrl.searchParams.get('walletAddress') as string
  const results = await updateWalletAddressByEmail(
    {
      email,
      walletAddress,
    }
  );
  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }
};
