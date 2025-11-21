/**
 * @swagger
 * /api/doingdoit/user/updateUserByEmail:
 *  post:
 *   description: 사용자 정보를 업데이트 합니다.
 *  parameters: _email, _nickname, _name, _avatar, _regType, _mobile, _birthDate, _gender, _purpose, _marketingAgree, _emailVerified, _followers, _weight, _height, _medicalHistory, _familyMedicalHistory
 *  responses:
 *   200:
 *   description: 사용자 정보를 업데이트 성공했습니다.
 * 500:
 * description: 사용자 정보를 업데이트 실패했습니다.
 * 
 */


import { NextResponse, NextRequest } from 'next/server';



import { updateUserByEmail } from '@/lib/api/user';


export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();

  console.log("updateUserByEmail data:", data);



  const results = await updateUserByEmail(data as any);
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
