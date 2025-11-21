import { NextResponse, NextRequest } from 'next/server';

/////import { memberData } from '@/data/doingdoit/user/member-data';


import { updateFeedImageById,  } from '@/lib/api/feed';

///import { get } from 'lodash';


/* ======================================

======================================= */
export const GET = async (req: NextRequest, res: NextResponse) => {


  const id  = req.nextUrl.searchParams.get('_id') as string

  const imageNumber  = req.nextUrl.searchParams.get('_imageNumber') as string

  const image  = req.nextUrl.searchParams.get('_image') as string

  if (imageNumber === null) return NextResponse.json(`Error: imageNumber is null`, { status: 500 });

  if (image === null) return NextResponse.json(`Error: image is null`, { status: 500 });

  if (id === null) return NextResponse.json(`Error: id is null`, { status: 500 });


  var results = null;


    results = await updateFeedImageById(
    
      {
        id,
        imageNumber: parseInt(imageNumber),
        image,
      }
  
    );



  


  try {
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`First Error: ${error}`, { status: 500 });
  }


};
