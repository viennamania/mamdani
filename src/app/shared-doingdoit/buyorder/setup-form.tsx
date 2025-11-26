'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

import { PhoneNumber } from '@/components/ui/phone-input';

import { Input } from '@/components/ui/input';

import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared-doingdoit/form-group';
import FormFooter from '@/components/form-footer';



import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useEffect, useState } from 'react';


import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';


import {
  pointSchema,
  PointSchema,
} from '@/utils/validators/doingdoit/point.schema';




//import DeletePopover from '@/app/shared-doingdoit/delete-popover-large';

import SavePopover from '@/app/shared-doingdoit/save-popover-large';


import { Modal } from '@/components/ui/modal';

import { Button } from '@/components/ui/button';
import { set } from 'lodash';
import { setup } from 'scripts/board-data.mjs';


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


const modalData = {
  title: '',
  description: '',
  data: [],
};



const onSubmit: SubmitHandler<PointSchema> = (data) => {
  toast.success(<Text as="b">저장되었습니다!</Text>);
  console.log('Profile settings data ->', {
    ...data,
  });

  //push(routes.operation.healthinfoDetails(item?.id));
};



export default function SetupForm() {

  const { push } = useRouter();

  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');





  const [setupPoint, setSetupPoint] = useState<any>({
    feedLike: 0,
    boardLike: 0,
    attendance: 0,
    feedPost: 0,
    boardPost: 0,
    boardComment: 0,
  });
  

  const [loadingSetupPoint, setLoadingSetupPoint] = useState<boolean>(false);

  
  /*
  useEffect(() => {

    ///async function getSetupPoint() {

    const getSetupPoint = async () => {

      setLoadingSetupPoint(true);
      
      const res = await fetch(`/api/doingdoit/setup/getSetupPoint`);
      const data = await res.json() as any;
      
      //console.log("getSetupPoint data", data.data);

      setSetupPoint(data.data);


      setLoadingSetupPoint(false);

    }

    getSetupPoint();

  } , []);


  console.log("setupPoint", setupPoint);
  */

  const [attendance, setAttendance] = useState<number>(0);
  const [feedLike, setFeedLike] = useState<number>(0);
  const [boardLike, setBoardLike] = useState<number>(0);
  const [feedPost, setFeedPost] = useState<number>(0);
  const [boardPost, setBoardPost] = useState<number>(0);
  const [boardComment, setBoardComment] = useState<number>(0);


  useEffect(() => {

    const getRewardPoint = async () => {

      setLoadingSetupPoint(true);
      
      const res = await fetch(`/api/doingdoit/setup/getRewardPointByCategory?category=attendance`);
      const data = await res.json() as any;

      console.log("getRewardPoint data", data.data);
      
      const point = data.data?.point;

      setAttendance(point);


      setLoadingSetupPoint(false);

    }

    getRewardPoint();

  } , []);


  useEffect(() => {

    const getRewardPoint = async () => {

      setLoadingSetupPoint(true);
      
      const res = await fetch(`/api/doingdoit/setup/getRewardPointByCategory?category=boardLike`);
      const data = await res.json() as any;

      console.log("getRewardPoint data", data.data);
      
      const point = data.data?.point;

      setBoardLike(point);


      setLoadingSetupPoint(false);

    }

    getRewardPoint();

  }
  , []);


  useEffect(() => {

    const getRewardPoint = async () => {

      setLoadingSetupPoint(true);
      
      const res = await fetch(`/api/doingdoit/setup/getRewardPointByCategory?category=feedLike`);
      const data = await res.json() as any;

      console.log("getRewardPoint data", data.data);
      
      const point = data.data?.point;

      setFeedLike(point);


      setLoadingSetupPoint(false);

    }

    getRewardPoint();

  } , []);





  useEffect(() => {

    const getRewardPoint = async () => {

      setLoadingSetupPoint(true);
      
      const res = await fetch(`/api/doingdoit/setup/getRewardPointByCategory?category=feedPost`);
      const data = await res.json() as any;

      console.log("getRewardPoint data", data.data);
      
      const point = data.data?.point;

      setFeedPost(point);

      setLoadingSetupPoint(false);

    }

    getRewardPoint();

  } , []);


  useEffect(() => {

    const getRewardPoint = async () => {

      setLoadingSetupPoint(true);
      
      const res = await fetch(`/api/doingdoit/setup/getRewardPointByCategory?category=boardPost`);
      const data = await res.json() as any;

      console.log("getRewardPoint data", data.data);
      
      const point = data.data?.point;

      setBoardPost(point);


      setLoadingSetupPoint(false);

    }

    getRewardPoint();

  } , []);


  useEffect(() => {

    const getRewardPoint = async () => {

      setLoadingSetupPoint(true);
      
      const res = await fetch(`/api/doingdoit/setup/getRewardPointByCategory?category=boardComment`);
      const data = await res.json() as any;

      console.log("getRewardPoint data", data.data);
      
      const point = data.data?.point;

      setBoardComment(point);

      setLoadingSetupPoint(false);

    }

    getRewardPoint();

  } , []);







  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // setup point api call
  const updateSetupPoint = async (
    feed_like: number,
    board_like: number,
    attendance: number,
    feed_post: number,
    board_post: number,
    board_comment: number,
  ) => {


    setIsUpdating(true);


    const res = await fetch(`/api/doingdoit/setup/updateSetupPoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        feedLike: feed_like,
        boardLike: board_like,
        attendance: attendance,
        feedPost: feed_post,
        boardPost: board_post,
        boardComment: board_comment,

      }),
    });


    
    const data = await res.json();

    console.log("setupPoint data", data);


    setIsUpdating(false);


    toast.success(<Text as="b">저장되었습니다!</Text>);

  }





  const onSubmit: SubmitHandler<PointSchema> = (data) => {

    // if data.feed_like is string type, convert to number type
    /*
    const feed_like = Number(data.feed_like);
    const board_like = Number(data.board_like);
    const attendance = Number(data.attendance);
    const feed_post = Number(data.feed_post);
    */


    updateSetupPoint(
      feedLike,
      boardLike,
      attendance,
      feedPost,
      boardPost,
      boardComment,
    );
    
    //toast.success(<Text as="b">저장되었습니다!</Text>);

    console.log('Profile settings data ->', {
      ...data,
    });

    
  };





  const [open, setOpen] = useState(false);


  console.log("feedLike", feedLike);
  console.log("boardLike", boardLike);
  console.log("attendance", attendance);
  console.log("feedPost", feedPost);
  console.log("boardPost", boardPost);
  console.log("boardComment", boardComment);


  return (
    
    <Form<PointSchema>
      validationSchema={pointSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          feed_like: feedLike,
          board_like: boardLike,
          attendance: attendance,
          feed_post: feedPost,
          board_post: boardPost,
          board_comment: boardComment,
        },
      }}
    >


      {({ register, control, setValue, getValues, formState: { errors } }) => {


        return (
          <>

            <div className=" mt-0 w-full max-w-[1294px]">

              <div className=" flex flex-row items-center justify-end">

                <Button
                  type="button"
                  isLoading={isUpdating}
                  className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                  onClick={() => {
                    onSubmit(getValues());
                  } }
                >
                  저장하기
                </Button>

              </div>


              
              <div className="mt-5 mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">


                <FormGroup
                  title="구매주문 좋아요"
                >

                  
                  <div className="flex flex-row items-center justify-start">

                
                    <Input
                      type='number'
                      //label="Company Name"
                      //placeholder="100"
                      {...register('feed_like')}
                      error={''}

                      //value={'100'}

                      //value={setupPoint?.feedLike}
                      value={
                        feedLike === 0 ? '' : feedLike
                      }
                      
                      onChange={(e) => {
                        setFeedLike(Number(e.target.value));
                      } }

                      inputClassName=' font-semibold text-gray-900 xl:text-lg '
                      className=' w-32 '
                      // center align
                      
                    />
                    
                    <span className="ml-2 text-lg font-bold">P</span>
                  </div>

          
                  
                </FormGroup>

                <FormGroup
                  title="게시판 좋아요"
                >
                  <div className="flex flex-row items-center justify-start">
                    <Input
                      type='number'
                      //label="Company Name"
                      //placeholder="100"
                      {...register('board_like')}
                      error={''}
                    
                      value={
                        boardLike === 0 ? '' :
                        boardLike
                      }

                      onChange={(e) => {
                        setBoardLike(Number(e.target.value));
                      } }

                      inputClassName=' font-semibold text-gray-900 xl:text-lg '
                      className=' w-32 '
                      
                    />
                    <span className="ml-2 text-lg font-bold">P</span>
                  </div>
                </FormGroup>

                <FormGroup
                  title="출석"
                >
                  <div className="flex flex-row items-center justify-start">
                    <Input
                      type='number'
                      //label="Company Name"
                      //placeholder="100"
                      {...register('attendance')}
                      error={''}
                      
                      value={
                        attendance === 0 ? '' :
                        attendance
                      }

                      onChange={(e) => {
                        setAttendance(Number(e.target.value));
                      } }

                      inputClassName=' font-semibold text-gray-900 xl:text-lg '
                      className=' w-32 '
                      
                    />
                    <span className="ml-2 text-lg font-bold">P</span>
                  </div>
                </FormGroup>


                <FormGroup
                  title="구매주문작성"
                >
                  <div className="flex flex-row items-center justify-start">
                    <Input
                      type='number'
                      //label="Company Name"
                      //placeholder="100"
                      {...register('feed_post')}
                      error={''}
                      
                      value={
                        feedPost === 0 ? '' :
                        feedPost
                      }

                      onChange={(e) => {
                        setFeedPost(Number(e.target.value));
                      } }

                      inputClassName=' font-semibold text-gray-900 xl:text-lg '
                      className=' w-32 '
                      
                    />
                    <span className="ml-2 text-lg font-bold">P</span>
                  </div>
                </FormGroup>

                <FormGroup
                  title="게시판댓글 작성"
                >
                  <div className="flex flex-row items-center justify-start">
                    <Input
                      type='number'
                      //label="Company Name"
                      //placeholder="100"
                      {...register('board_comment')}
                      error={''}
                      
                      value={
                        boardComment === 0 ? '' :
                        boardComment
                      }
                      onChange={(e) => {
                        setBoardComment(Number(e.target.value));
                      } }

                      inputClassName=' font-semibold text-gray-900 xl:text-lg '
                      className=' w-32 '
                      
                    />
                    <span className="ml-2 text-lg font-bold">P</span>
                  </div>
                </FormGroup>


                {/*
                <FormGroup
                  title="게시판 게시글 작성"
                >
                  <div className="flex flex-row items-center justify-start">
                    <Input
                      type='number'
                      //label="Company Name"
                      //placeholder="100"
                      {...register('board_post')}
                      error={''}
                      
                      value={
                        setupPoint?.boardPost === 0 ? '' :
                        setupPoint?.boardPost
                      }

                      onChange={(e) => {
                        setSetupPoint({
                          ...setupPoint,
                          boardPost: e.target.value,
                        });
                      } }

                      inputClassName=' font-semibold text-gray-900 xl:text-lg '
                      className=' w-32 '
                      
                    />
                    <span className="ml-2 text-lg font-bold">P</span>
                  </div>
                </FormGroup>
                */}




                

              </div>


            </div>
            

          </>
        );
      }}
    </Form>
  );
}
