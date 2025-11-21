import { NextResponse, NextRequest } from 'next/server';



import  { updateOneCategory  } from '@/lib/api/faq';


export const POST = async (req: NextRequest, res: NextResponse) => {

  const data = await req.json();


  const results = await updateOneCategory(data as any);




  
  ////console.log("getUser results:", results);

  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
