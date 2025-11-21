import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


///import { updateUserById,  getUserByEmail, getUserById, getUser, getAllUsers, getUserCount } from '@/lib/api/user';


import { updateUserById } from '@/lib/api/user';



///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const id  = req.nextUrl.searchParams.get('_id') as string
  const nickname  = req.nextUrl.searchParams.get('_nickname') as string
  const name  = req.nextUrl.searchParams.get('_name') as string
  const avatar  = req.nextUrl.searchParams.get('_avatar') as string
  const regType  = req.nextUrl.searchParams.get('_regType') as string
  
  const mobile  = req.nextUrl.searchParams.get('_mobile') as string

  const birthDate  = req.nextUrl.searchParams.get('_birthDate') as string

  const gender = req.nextUrl.searchParams.get('_gender') as string

  const purpose  = req.nextUrl.searchParams.get('_purpose') as string
  const marketingAgree  = req.nextUrl.searchParams.get('_marketingAgree') as string
  const emailVerified  = req.nextUrl.searchParams.get('_emailVerified') as string
  const followers  = Number(req.nextUrl.searchParams.get('_followers'));

  const weight  = Number(req.nextUrl.searchParams.get('_weight'));
  const height  = Number(req.nextUrl.searchParams.get('_height'));

  const medicalHistory  = req.nextUrl.searchParams.get('_medicalHistory') as string
  const familyMedicalHistory  = req.nextUrl.searchParams.get('_familyMedicalHistory') as string





  
  //const id  = _id as any;
  ////const nickname  = _nickname as any;
  /////const name  = _name as any;
  ///const avatar  = _avatar as any;
  //const regType  = _regType as any;
  //const mobile  = _mobile as any;
  ///const birthDate  = _birthDate as any;
  ///const gender = _gender as any;
  //const purpose  = _purpose as any;
  //const marketingAgree  = _marketingAgree as any;
  //const emailVerified  = _emailVerified as any;
  //const followers  = _followers as any;
  ///const weight  = _weight as any;
  ////const height  = _height as any;

  //const medicalHistory  = _medicalHistory as any;
  //const familyMedicalHistory  = _familyMedicalHistory as any;

  //const param  = _id as any;

  const results = await updateUserById(
    
    {
      id,
      name,
      nickname,
      avatar,
      birthDate,
      gender,
      weight,
      height,
      purpose,
      medicalHistory,
      familyMedicalHistory,

    }

  );
  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
