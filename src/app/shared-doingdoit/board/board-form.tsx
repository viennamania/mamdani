'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';

import { PiClock, PiEnvelopeSimple, PiArrowUp, PiArrowRight } from 'react-icons/pi';

import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';


//import FormGroup from '@/app/shared-doingdoit/form-group';
import FormGroup from '@/app/shared-doingdoit/form-group-large';




import FormFooter from '@/components/doingdoit/form-footer';



/*
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
*/

import {
  defaultValues,
  boardFormSchema,
  BoardFormTypes,
} from '@/utils/validators/doingdoit/board.schema';


import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';



import Image from 'next/image';




//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { use, useState, useEffect } from 'react';


import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

import DateCell from '@/components/ui/date-cell';

import { useSession, signIn, signOut } from 'next-auth/react';
import { set } from 'lodash';
import { it } from 'node:test';



import ListDietBar1 from "@/components-figma/list-diet-bar1";
import ListDietBar2 from "@/components-figma/list-diet-bar2";

import TableAvatar from '@/components/ui/avatar-card';

import CommentTableWidget from '@/components/doingdoit/comment-table-widget';

import { getColumns } from '@/app/shared-doingdoit/board/comment-columns';




const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});


/*
export type DetailsTypes = {
  item: any;
};

export default function InfoForm({
  item,
}: React.PropsWithChildren<DetailsTypes>) {
*/

export type DetailsTypes = {
  id: string;
};



export default function InfoForm({
  id,
}: React.PropsWithChildren<DetailsTypes>) {



    
  const { data: session, status } = useSession();

  const { push } = useRouter();

 
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');


  const [loading, setLoading] = useState(false);



  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);



  ///console.log('item mealFood', item?.mealFood);




  useEffect(() => {

    const getUser = async () => {

      console.log('session?.user?.email', session?.user?.email);


      ///setLoading(true);
      try {
        //setUser(null);
        ///setError(null);
        const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);


        if (res.status === 200) {
          const json = await res?.json() as any;

          
          
          console.log('user data: ', json.data);



          setUser(json.data);


          
        }
      
      } catch (e) {
        ////setError(e);
      }
      ///setLoading(false);
    }

    getUser();

  }, [ session?.user?.email , ]);



  const [item, setItem] = useState<any>(null);


  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch('/api/doingdoit/board/getBoardById?_id=' + id);
  
      const json  = await res?.json() as any;
  
  
      console.log("BoardPage data=", json.data);
  
      setItem(json.data);


  
      setLoading(false);
  
    };
      
      fetchData();
  } ,[ id, ]);





  const [commentCount, setCommentCount] = useState(0);

  const [comments, setComments] = useState([] as any);


  useEffect(() => {
      
    const fetchData = async () => {

      if (!id) {
        return;
      }
      
      setLoading(true);
  
      const res = await fetch (`/api/doingdoit/board/getCommentsByBoardId?_boardId=${id}`);
          
      const json  = await res?.json() as any;


      ////console.log('comments json.data: ', json.data);


      setComments(json?.data);

      setCommentCount(json?.data?.length);

      setLoading(false);
  
    };
      
    fetchData();

  } ,[ id ]);



  const [replyOpenArray, setReplyOpenArray] = useState([
    // commentId, replyOpen
    // ["commentId", true],

    //{ commentId: "commentId", replyOpen: false}


  ] as
    {
      commentId: string;
      replyOpen: boolean;
    }[]
  );

  ///console.log('replyOpenArray: ', replyOpenArray);
  


  // reply open array init
  // replayOpen set false for each comment

  useEffect(() => {

    setReplyOpenArray([]);


    comments?.map((comment: any) => {

      setReplyOpenArray(replyOpenArray => [...replyOpenArray, { commentId: comment?.id, replyOpen: false }]);

    })

  } , [comments]);







  const onSubmit: SubmitHandler<BoardFormTypes> = (data) => {
    

    console.log(' settings data ->', {
      ...data,
    });


    ///push(routes.feed.index);

  };


  if (loading) {
    return (
      <div className="grid place-content-center h-96">
        <Spinner />
      </div>
    );
  }


  return (
    
    <Form<BoardFormTypes>
      validationSchema={boardFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >


      {({ register, control, setValue, getValues, formState: { errors } }) => {

        return (


          <>

            <div className='border border-gray-200 rounded-md p-5'>
  
              <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">
              
              {/*
              <FormGroup
                title="NO"
              >
                <Text >{item?.id}</Text>
              </FormGroup>
              */}
              

              <FormGroup
                title="등록일자"
              >
                <Text >

                  <DateCell
                    date={item?.createdAt || new Date()}
                    className='w-fit'
                  />
                </Text>
              </FormGroup>

              <FormGroup
                title="작성자"
              >
                <TableAvatar
                  src={item?.userAvatar || '/usermain/images/avatar.svg'}
                  name={item?.userNickname || '닉네임없음'}
                  description={item?.userEmail || '이메일'}
                />
              </FormGroup>

              <FormGroup
                title="제목"
              >
                <Text>
                  {
              
                    item?.title
                  
                  }
                </Text>
              </FormGroup>



              {/* tage  rounded view list  */}
              <FormGroup
                title="태그"
              >

                          
                <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">

                {item?.tags?.map((tag: any) => (
                  <div
                    key={tag}
                    className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                  >

                      {tag}



                  </div>
                ))}

                </div>
                
              </FormGroup>

              <FormGroup
                title="반응"
              >
                <Text>좋아요 {item?.likeCount || 0}, 댓글 {item?.commentCount + item?.replyCount || 0}, 조회 {item?.viewCount || 0}</Text>
              </FormGroup>



              <FormGroup
                title="이미지"
              >

                <div className="self-stretch relative xl:w-[800px] grid grid-cols-1 xl:grid-cols-2  gap-5  items-center justify-start ">
                  
                  {item?.images && item?.images.map((image: any, index: number) => (
                    <div key={index} className="relative w-full h-full">

                      { image && image != '' && image != 'undefined' && image != 'null' && (
                        
                        <Image
                          src={image}
                          alt="image"
                          width={500}
                          height={500}
                          style={{objectFit: "fill"}}
                          className=" rounded-lg "
                        />
                      
                      )}

                   

                    </div>
                  ))}


                </div>
             
              </FormGroup>

              <FormGroup
                title="내용"
              >
                <Text
                  className=" xl:w-[800px] "
                
                >
                  {
                    // html view
                    item?.content
                      && <div
                          
                          dangerouslySetInnerHTML={{
                             __html: 
                             item?.content
                             ,

                          }}
                        />
                     
                  }
                </Text>
                
              </FormGroup>

              <FormGroup
                title="댓글"
              >

                <CommentTableWidget
                  boardId={id}
                  title=""
                  variant="minimal"
                  ////////////data={data}
                  // @ts-ignore
                  getColumns={getColumns}
                  enablePagination={true}
                  
                  enableSearch={false}
                  searchPlaceholder="닉네임, 제목, 태그"

                  //className=" xl:w-full min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

                  //className=" xl:w-full min-h-[480px] "
                  className="col-span-8 min-h-[480px] "

                  sticky
                  scroll={{ x: 200, }}

                  
                />



              </FormGroup>



              </div>












              
              

           

            </div>



          </>

        );
      }}
    </Form>
  );
}
