'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';

import { PiClock, PiEnvelopeSimple, PiArrowUp } from 'react-icons/pi';

import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared-doingdoit/form-group';

import FormFooter from '@/components/doingdoit/form-footer';


import {
  PiArrowRight,

} from 'react-icons/pi';


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


import BasicTableWidget from '@/components/doingdoit/basic-table-widget';


///import { data as calorieData } from '@/data/doingdoit/feed/calorie-data';

import { data as calorieData } from '@/data/doingdoit/feed/calorie-db-data';


import { getColumns } from '@/app/shared-doingdoit/feed/calorie-columns';



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

import { Toaster } from 'react-hot-toast';


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




  //const [feedbackScoreSelected, setFeedbackScoreSelected] = useState<string>('좋음');





  /* updateFeedback */
  
  const updateFeedback = async (
    feedbackContent: string,
    feedbackScore: string,
    feedbackWriterId: string,
    feedbackWriterNickname: string,
    feedbackWriterEmail: string,
    feedbackWriterAvatar: string,
   ) => {

    console.log('feedbackWriterId', feedbackWriterId);


    console.log('feedbackScore', feedbackScore);


    //setLoading(true);

    try {
      //setUser(null);
      //setError(null);

      const res = await fetch(`/api/doingdoit/feed/updateFeedbackById?_id=${item?.id}`
      + `&_feedbackContent=${feedbackContent}`

      + `&_feedbackScore=${feedbackScore}`


      //+ `&_feedbackWriterNickname=${feedbackWriterNickname}`
      //+ `&_feedbackWriterEmail=${feedbackWriterEmail}`
      //+ `&_feedbackWriterId=${feedbackWriterId}`
      //+ `&_feedbackWriterAvatar=${feedbackWriterAvatar}`

      + `&_feedbackWriterNickname=${user?.nickname}`
      + `&_feedbackWriterEmail=${user?.email}`
      + `&_feedbackWriterId=${user?.id}`
      + `&_feedbackWriterAvatar=${user?.avatar}`
      

      );


      if (res.status === 200) {
        const json = await res?.json() as any;

        console.log('json: ', json);

        toast.success(<Text>저장되었습니다!</Text>);

        //push(routes.feed.details(item?.id));
        push(routes.feed.index);

      }
      else {
        
      }
    
    } catch (e) {
      ///setError(e);
    }
    //setLoading(false);

  }
  

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
              
              <FormGroup
                title="NO"
              >
                <Text >{item?.id}</Text>
              </FormGroup>

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
                <Text>{item?.title}</Text>
              </FormGroup>



              {/* tage  rounded view list  */}
              <FormGroup
                title="태그"
              >

                          
                <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">

                {item?.tags.map((tag: any) => (
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
                <Text>좋아요 {item?.likeCount || 0}, 댓글 {item?.commentCount || 0}, 조회 {item?.viewCount || 0}</Text>
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
                      && <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                     
                  }
                </Text>
                
              </FormGroup>





              </div>





              <div className='mt-5 flex flex-col items-center justify-start gap-4'>

              {comments?.map((comment: any) => (

                <>



                <div
                  key={comment?.id}
                  className="flex flex-row items-start justify-start gap-[12px]"
                >

                  <div className=" w-8  ">
                    <Image
                      //className="relative w-6 h-6 rounded-full"
                      className=" rounded-full w-6 h-6"
                      alt=""
                      width={24}
                      height={24}
                      src={ comment?.userAvatar ?   `${comment?.userAvatar}` : "/usermain/images/avatar.svg"   }

                      placeholder="blur"
                      blurDataURL="data:..."

                      // aspact ratio 1:1

                      //style = {{ objectFit: 'cover' }}

                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      
                    />
                  </div>

                  <div className=" flex flex-col items-start justify-start gap-[8px] ">

                    <div className="flex flex-row items-start justify-center ">

                      <span>
                        <span className="font-extrabold font-menu-off">{comment?.userNickname}</span>
                        <span className="text-grey-9">{` · `}</span>
                      </span>

                      <span className="text-grey-9  ">
                        

                          {/* change comment date to from now minutes ago

                          ex) 5분전
                          10분전
                          */}
                          { comment?.createdAt && (

                            <div className=" flex flex-row items-center justify-end gap-2 ">
                            {/* AvTimerOutlinedIcon color gray */}
                            {/*
                            <AvTimerOutlinedIcon fontSize="small" />
                            */}
                            {/* differece between now and createdAt */}


                            {Math.floor(
                              (new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60 / 60 / 24
                            ) > 0 ? (
                              <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                {Math.floor(
                                  (new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60 / 60 / 24
                                )}{' '}
                                일전
                              </div>
                            ) : Math.floor(
                                (new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60 / 60
                              ) > 0 ? (
                              <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                {Math.floor(
                                  (new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60 / 60
                                )}{' '}
                                시간전
                              </div>
                            ) : Math.floor((new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60) >
                              0 ? (
                              <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                {Math.floor((new Date().getTime() - Date.parse(comment?.createdAt)) / 1000 / 60)}{' '}
                                분전
                              </div>
                            ) : Math.floor((new Date().getTime() - Date.parse(comment?.createdAt)) / 1000) >
                              0 ? (
                              <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                {Math.floor((new Date().getTime() - Date.parse(comment?.createdAt)) / 1000)}{' '}
                                초전
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                방금전
                              </div>
                            )}

                            {/*
                              format(Date.parse(value), 'yyy-MM-dd hh:mm:ss')
                            */}
                            </div>



                          )  }
                          
                            




                            {/*
                          {comment?.createdAt && (
                      
                            <DateCell
                              date={ new Date(comment?.createdAt) }
                              className=""
                              timeClassName=""
                              dateClassName=""
                              dateFormat="YYYY. MM. DD"
                              timeFormat="HH:mm"
                            />
                          )}
                          */}

                      
                      </span>
                    </div>

                    
                    { /* html 태그가 포함된 문자열을 출력할 때는 dangerouslySetInnerHTML 사용 */
                      <div
                        dangerouslySetInnerHTML={{ __html: comment?.content as any }}
                        // 
                        //className="self-stretch relative text-sm"
                        // width size fixed 
                        ///className="text-sm  w-[240px] xl:w-[860px]"

                        className="text-sm  xl:w-[760px]"
                      />
                    }
                    

                  </div>


                  {/* delete button */}
                  <button
                    className="w-8 h-8"
                    onClick={async () => {
                      

                      console.log('delete comment id: ', comment?.id);

                      const res = await fetch(`/api/doingdoit/board/deleteComment?id=${comment?.id}`);

                      const json = await res?.json() as any;

                      console.log('delete comment json: ', json);

                      // reload
                      //window.location.reload();

                      // update comments and commentCount

                      setComments(comments.filter((item: any) => item?.id !== comment?.id));

                      setCommentCount(commentCount - 1);



                      toast.success('삭제되었습니다.');
                        
                        

                    }}
                  >
                    삭제
                  </button>

                </div>



                {replyOpenArray.map((replyOpen: any) => {

                  if (replyOpen.commentId == comment.id && replyOpen.replyOpen == true) {

                    return (
                      <>


                    {/* 로그인해야 답글을 달수 있다. */}

                    {!session?.user?.email ? (

                      <div className="self-stretch bg-white box-border flex flex-row items-center justify-between gap-[8px] text-sm border-[1px] border-solid border-grey-c">

                        <div className="m-5 flex-1 flex flex-row items-center justify-start  pl-5">
                          <Image
                            className=" w-6 h-6 rounded-full"
                            alt=""
                            width={24}
                            height={24}
                            src="/usermain/images/avatar.svg"
                          />

                          <span className="pl-3 w-24">{`@${comment?.userNickname}`}</span>

                          <span className="pl-3 ">로그인해야 답글을 달수 있습니다.</span>
                        </div>


                      </div>         

                      ) : (
                                            
                        
                        
                        
                        <div className="self-stretch bg-white box-border flex flex-row items-center justify-between gap-[8px] text-sm border-[1px] border-solid border-grey-c">
                      

                          <div className="flex-1 flex flex-row items-center justify-center  pl-5">


      


                            <span className="pl-3 w-24">{`@${comment?.userNickname}`}</span>

                            


                            
                          </div> 



                        </div>


                      )}


                      </>

                    );

                  }

                } )}


                {/* list of reply */}
                {comment?.replies?.map((reply: any) => (

                  <div
                    key={reply?.id}
                    className="flex flex-row items-start justify-start gap-[12px]"
                  >

                    {/* reply icon right arrow

                    mui pi pi-arrow-right
                    
                    */}

                    <PiArrowRight className="w-6 h-6" />


                  


                    <div className=" w-8  ">
                      <Image
                        //className="relative w-6 h-6 rounded-full"
                        className=" rounded-full w-6 h-6"
                        alt=""
                        width={24}
                        height={24}
                        src={ reply?.userAvatar ?   `${reply?.userAvatar}` : "/usermain/images/avatar.svg"   }

                        placeholder="blur"
                        blurDataURL="data:..."

                        // aspact ratio 1:1

                        //style = {{ objectFit: 'cover' }}

                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        
                      />
                    </div>

                    <div className=" flex flex-col items-start justify-start gap-[8px] ">

                      <div className="flex flex-row items-start justify-center ">

                        <span>
                          <span className="font-extrabold font-menu-off">{reply?.userNickname}</span>
                          <span className="text-grey-9">{` · `}</span>
                        </span>

                        <span className="text-grey-9  ">
                          

                            {/* change comment date to from now minutes ago

                            ex) 5분전
                            10분전
                            */}
                            { reply?.createdAt && (

                              <div className=" flex flex-row items-center justify-end gap-2 ">
                              {/* AvTimerOutlinedIcon color gray */}
                              {/*
                              <AvTimerOutlinedIcon fontSize="small" />
                              */}
                              {/* differece between now and createdAt */}


                              {Math.floor(
                                (new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60 / 60 / 24
                              ) > 0 ? (
                                <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                  {Math.floor(
                                    (new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60 / 60 / 24
                                  )}{' '}
                                  일전
                                </div>
                              ) : Math.floor(
                                  (new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60 / 60
                                ) > 0 ? (
                                <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                  {Math.floor(
                                    (new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60 / 60
                                  )}{' '}
                                  시간전
                                </div>
                              ) : Math.floor((new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60) >
                                0 ? (
                                <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                  {Math.floor((new Date().getTime() - Date.parse(reply?.createdAt)) / 1000 / 60)}{' '}
                                  분전
                                </div>
                              ) : Math.floor((new Date().getTime() - Date.parse(reply?.createdAt)) / 1000) >
                                0 ? (
                                <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                  {Math.floor((new Date().getTime() - Date.parse(reply?.createdAt)) / 1000)}{' '}
                                  초전
                                </div>
                              ) : (
                                <div className="text-xs text-gray-500 ltr:text-right rtl:text-left xl:text-xs">
                                  방금전
                                </div>
                              )}

                              {/*
                                format(Date.parse(value), 'yyy-MM-dd hh:mm:ss')
                              */}

                              </div>



                            )  }

                        </span>

                      </div>


                      { /* html 태그가 포함된 문자열을 출력할 때는 dangerouslySetInnerHTML 사용 */
                        <div
                          dangerouslySetInnerHTML={{ __html: reply?.content as any }}
                          // 
                          //className="self-stretch relative text-sm"
                          // width size fixed 
                          ///className="text-sm  w-[240px] xl:w-[860px]"

                          className="text-sm  xl:w-[760px]"
                        />
                      }

                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      className="w-8 h-8"
                      onClick={async () => {
                        

                        console.log('delete reply id: ', reply?.id);

                        const res = await fetch(`/api/doingdoit/board/deleteReply?id=${reply?.id}`);

                        const json = await res?.json() as any;

                        console.log('delete reply json: ', json);

                        // reload
                        //window.location.reload();

                        
                          
                          

                      }}  

                    >
                      삭제
                    </button>


                  </div>

                ))}









                </>

                ))}

              </div>


              
              

           

            </div>



          </>

        );
      }}
    </Form>
  );
}
