'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';


import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared-doingdoit/form-group';

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
  feedInfoFormSchema,
  FeedInfoFormTypes,
} from '@/utils/validators/doingdoit/feed-info.schema';


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


import { Modal } from '@/components/ui/modal';

import { PieChart, Pie, Cell, ResponsiveContainer, Label, Legend } from 'recharts';
import { Button } from 'rizzui';


import { PiClock, PiEnvelopeSimple, PiDownloadSimpleBold, PiList, PiRecordLight, } from 'react-icons/pi';



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


  const router = useRouter();

    
  const { data: session, status } = useSession();

  const { push } = useRouter();

 
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');


  const [loading, setLoading] = useState(false);



  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);



  ///console.log('item mealFood', item?.mealFood);

  const [open, setOpen] = useState(false);

  const [selectedFoodName, setSelectedFoodName] = useState(''); 

  const [ foodPercentage, setFoodPercentage ] = useState(
    [] as
    {
      name: string;
      value: number;
      color: string;
    }[]
  );


  // kcal
  const [kcal, setKcal] = useState(0);

  // 포화지방산
  const [saturatedfat, setSaturatedfat] = useState(0);
  // 당류
  const [sugar, setSugar] = useState(0);
  // 나트륨
  const [salt, setSalt] = useState(0);
  // 콜레스테롤
  const [cholesterol, setCholesterol] = useState(0);





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
  
      const res = await fetch('/api/doingdoit/feed/getFeedById?_id=' + id);
  
      const json  = await res?.json() as any;
  
      //console.log("FeedPage data=", json.data);
  
      setItem(json.data);


  
      setLoading(false);
  
    };
      
      fetchData();
  } ,[ id, ]);





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

      + `&_feedbackWriterId=${user?.id}`
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
  



  const deleteOne = async () => {

    const res = await fetch(`/api/doingdoit/feed/deleteOne?id=${id}`);

    const json  = await res?.json() as any;

    console.log("FeedPage data=", json.data);

    //routes.push(routes.feed.index);
    // route to feed index page

    //setOpen(true);
    //modalData.description = '삭제되었습니다.';

    toast.success(<Text>삭제되었습니다!</Text>);


    push('/feed');


  }




  const onSubmit: SubmitHandler<FeedInfoFormTypes> = (data) => {



    if (data?.feedbackContent === '' || data?.feedbackContent === undefined
      || data?.feedbackContent === null || data?.feedbackContent === "undefined"
      || data?.feedbackScore === '' || data?.feedbackScore === undefined
      || data?.feedbackScore === null || data?.feedbackScore === "undefined") {


      toast.error(
        '필수 입력값을 모두 입력해주세요.',
        {
          //position: 'top-right',
        }
      );

      return;
    }


    // delete feed data to api
    // /api/doingdoit/feed/deleteFeedById

    /*
    // update feedback data to api
    // /api/doingdoit/feed/deleteOne
    */

    const fetchData = async () => {

      const res = await fetch(`/api/doingdoit/feed/deleteOne?_id=${id}`);

      const json  = await res?.json() as any;

      console.log("FeedPage data=", json.data);

    }

    fetchData();



    /*
    updateFeedback(
      data?.feedbackContent as string
      , data?.feedbackScore as string
      , data?.feedbackWriterId as string
      , data?.feedbackWriterNickname as string
      , data?.feedbackWriterEmail as string
      , data?.feedbackWriterAvatar as string
      
    );
    */
    

    
    

    console.log('feed settings data ->', {
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
    
    <Form<FeedInfoFormTypes>
      validationSchema={feedInfoFormSchema}
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
                <Text >{item?.sequenceNumber}</Text>
              </FormGroup>
              */}

              <FormGroup
                title="등록일자"
              >
                <Text >

                  <DateCell date={item?.createdAt} className='w-fit' />
                </Text>
              </FormGroup>

              <FormGroup
                title="작성자"
              >
                <TableAvatar
                  src={item?.avatar || '/usermain/images/avatar.svg'}
                  name={item?.nickname || '작성자'}
                  ////description={item?.email || '이메일'}
                />
              </FormGroup>

              <FormGroup
                title="식사일자"
              >
                {/* 2024.11.15(월) */}
                <Text>

                  { item?.mealDate &&

                    new Date(item?.mealDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      weekday: 'long',
                    })
                  
                  }

                </Text>
              </FormGroup>

              <FormGroup
                title="식사시간"
              >
                <Text > {item?.mealTime}</Text>
              </FormGroup>

              <FormGroup
                title="내용"
              >
                <Text>{
                    // html view
                    item?.feedTitle
                      && <div dangerouslySetInnerHTML={{ __html: item?.feedContent }} />
                     
                  }
                </Text>
              </FormGroup>
              {/*
              <FormGroup
                title="내용"
              >
                <Text>{item?.feedContent}</Text>
              </FormGroup>
              */}


              <FormGroup
                title="이미지"
              >
                

                <div className="self-stretch relative xl:w-[800px] grid grid-cols-1 xl:grid-cols-2  gap-5  items-center justify-start ">
                  {item?.image1 && (
          
                    <Image
                      width={480}
                      height={480}
                      className="relative w-120 h-60 rounded-sm "

                      ///  class="object-cover h-48 w-96
                      style={{
                        objectFit: "contain",
                        ///objectFit: "cover",
                        objectPosition: "center",
                      }}

                      alt=""
                      src={item?.image1}
                    />
                  )}


                  {item?.image2 && (
                    
                    <Image
                      width={480}
                      height={480}
                      className="relative w-120 h-60"

                      ///  class="object-cover h-48 w-96
                      style={{
                        objectFit: "contain",
                        ///objectFit: "cover",
                        objectPosition: "center",
                      }}

                      alt=""
                      src={item?.image2}
                    />
                  )}


                  {item?.image3 && (
                      
                      <Image
                        width={480}
                        height={480}
                        className="relative w-120 h-60"
  
                        ///  class="object-cover h-48 w-96
                        style={{
                          objectFit: "contain",
                          ///objectFit: "cover",
                          objectPosition: "center",
                        }}
  
                        alt=""
                        src={item?.image3}
                      />
                    )}

                </div>
             
              </FormGroup>

              <FormGroup
                title="반응"
              >
                <Text>스트랩 {item?.scrapCount}, 좋아요 {item?.likeCount},  조회 {item?.viewCount}</Text>
              </FormGroup>

              <FormGroup
                title="공개여부"
              >
                <Text>
                  {item?.hiddenYn === 'Y' ? "비공개" : "공개"}
                </Text>
              </FormGroup>


              <FormGroup
                title="식사량"
              >

                <div className="rounded-81xl bg-grey-f1 overflow-hidden flex flex-col items-start justify-center text-xs text-white">
                  <ListDietBar1
                    boardName="과하게"
                    mealAmount={item?.mealAmount}
                  />
                </div>
              </FormGroup>
              <FormGroup
                title="식사소요시간"
              >
                <div className="rounded-81xl bg-grey-f1 overflow-hidden flex flex-col items-start justify-center text-xs text-white">
                  <ListDietBar2
                    boardName="보통"
                    mealSpeed={item?.mealSpeed}
                  />
                </div>
              </FormGroup>


             {/*  음식   mealFood array */}
            {/*
             <FormGroup
                title="음식"
              >
                
                  {
                    item?.mealFood && item?.mealFood.map((
                      food: any,
                      index: number
                    ) => (
                      <div key={index} className='flex flex-row items-center justify-start gap-5'>
                        <Text>{food?.foodName}</Text>
                      </div>
                    ))
                  }
              
              
              </FormGroup>
              */}



            </div>





           
              <BasicTableWidget
                sticky
                scroll={{ x: 400, y: 760 }}
                title="식사별 데이타"
                variant="minimal"
                
                
                data={
                  ///item?.mealFood && item?.mealFood.map((

                  //item?.foods && item?.foods.map((
                  item?.mealFood && item?.mealFood.map((
                    food: any,
                    index: number
                  ) => (
                    {
                      id: index,
                      foodCode: food?.foodCode,
                      foodCategory: food?.foodCategory,
                      foodGroup: food?.foodGroup,
                      foodName: food?.foodName,
                      kcal: food?.kcal,
                      carbohydrate: food?.carbohydrate,
                      protein: food?.protein,
                      fat: food?.fat,
                      salt  : food?.salt,
                      saturatedfat: food?.saturatedfat,
                      cholesterol: food?.cholesterol,
                      sugar: food?.sugar,
                    }
                  ))
                }
              

                // @ts-ignore
                
                getColumns={
                  getColumns
                }

                //enablePagination
                enableSearch={false}
                enablePagination={false}
                
                //searchPlaceholder="닉네임, 제목, 피드백 작성자"

                className="mt-5"


                // footer sum of columns
                //footerSumColumns={['kcal', 'carbohydrate', 'protein', 'fat', 'salt', 'saturatedfat', 'cholesterol', 'sugar']}

                //footerSumColumns={
                //  ['kcal', 'carbohydrate', 'protein', 'fat', 'salt', 'saturatedfat', 'cholesterol', 'sugar']
                //}

                // handle row click event
                onRowClick={(row: any) => {
                  console.log('row', row);

                } }


                handleRowClick={(row: any) => {
                  console.log('row', row);

                  setSelectedFoodName(row?.foodName);



                  setKcal(parseFloat(row?.kcal === '-' ? '0' : row?.kcal));
            
            
                  setSaturatedfat(parseFloat(row?.fat === '-' ? '0' : row?.fat));
                  setSugar(parseFloat(row?.protein === '-' ? '0' : row?.protein));
                  setSalt(parseFloat(row?.carbohydrate === '-' ? '0' : row?.carbohydrate));
                  setCholesterol(parseFloat(row?.cholesterol === '-' ? '0' : row?.cholesterol));
              
                  
            
              
            
                  const total = parseFloat(row?.fat === '-' ? '0' : row?.fat) + parseFloat(row?.protein === '-' ? '0' : row?.protein) + parseFloat(row?.carbohydrate === '-' ? '0' : row?.carbohydrate);
            
            
                  setFoodPercentage([
                    {
                      name: '지방',
                      value:
                        // float point 2 digits  
                      //parseFloat(row?.fat === '-' ? '0' : row?.fat) / total * 100,
                      parseFloat((parseFloat(row?.fat === '-' ? '0' : row?.fat) / total * 100).toFixed(2)),
                      
                      color: '#FFC38B'
                    },
                    {
                      name: '단백질',
                      value:
                      // float point 2 digits 
                      parseFloat((parseFloat(row?.protein === '-' ? '0' : row?.protein) / total * 100).toFixed(2)),
                      
            
                      color: '#FF968D'
                    },
                    {
                      name: '탄수화물',
                      value:
                      // float point 2 digits
                      parseFloat((parseFloat(row?.carbohydrate === '-' ? '0' : row?.carbohydrate) / total * 100).toFixed(2)),
                      color: '#7CD7FA'
                    },
                  ]);


                  setOpen(true);


                } }

                // footer sum of columns
                //footerSumColumns={['kcal', 'saturatedfat', 'sugar', 'salt', 'cholesterol']}
                //footerSumColumns={['kcal', 'carbohydrate', 'protein', 'fat', 'salt', 'saturatedfat', 'cholesterol', 'sugar']}



              />

           

            </div>




            
            {item?.feedbackYn === 'Y' ? (


              <div className="flex flex-col items-center justify-center gap-10 m-5">


              <div className="mt-10 mb-5 grid divide-y divide-solid divide-gray-200 border rounded-lg ">

   
                <FormGroup
                  title={
                    <div className="flex flex-col items-center justify-center gap-5">
                      <Text
                        className="text-lg font-bold"
                      >전문가의 피드백</Text>
                      <Text>식단분석 피드백을 남겨주세요.</Text>
                    </div>
                  }
                >
                  <div className=' items-center justify-center self-stretch relative xl:w-[800px] grid grid-cols-1 xl:grid-cols-2 '>
 
                    <div className=" w-64 flex flex-col items-start justify-start gap-5">
                      <TableAvatar
                        src={user?.avatar || '/usermain/images/avatar.svg'}
                        name={user?.nickname || '전문가'}
                        description={user?.email || '이메일'}
                      />
                    </div>

                    {/* 등록완료: feedbackCreatedAt  */}
                    {item?.feedbackCreatedAt && (
                      <div className="flex flex-row items-center justify-start gap-5">
                      
                            <Text>등록완료: </Text>

                            <DateCell date={item?.feedbackCreatedAt} className='w-fit' />

                      </div>
                    )}

                  </div>

                </FormGroup>

                <FormGroup
                  title="식단분석 피드백"
                >

                  {/* html view */}
                  <div 
                    dangerouslySetInnerHTML={{ __html: item?.feedbackContent }}
                    className="w-full h-96"
                  />

                  {/*}
                  <Controller
                    control={control}
                    name="feedbackContent"
                    render={({ field: { onChange, value } }) => (

                      <QuillEditor
                        value={

                          item?.feedbackYn === 'Y' ? item?.feedbackContent : value

                          //value
                          
                          //////item?.feedbackContent
                        
                        }
                        onChange={onChange}
                        className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[200px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                        
                      />

                      
                    )}
                  />
                  */}
                </FormGroup>

                <FormGroup
                  title="식단점수"
                >

                    <Text>{item?.feedbackScore}</Text>
                
                
                </FormGroup>


              </div>


              {item?.feedbackWriterEmail === session?.user?.email && (
          
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    onClick={() => {

                      router.push(`/feed/${id}/edit`);
                      
                    }}
                  >
                    <PiRecordLight className="me-2 h-4 w-4" />
                    {'답변 수정'}

                  </button>

                )}

              </div>

            ) : (

              <div className="flex flex-col items-center justify-center gap-10 m-5">

              <div className="mt-10 mb-5 grid divide-y divide-solid divide-gray-200 border rounded-lg ">
                <FormGroup
                  title={
                    <div className="flex flex-col items-center justify-center gap-5">
                      <Text
                        className="text-lg font-bold"
                      >전문가의 피드백</Text>
                      <Text>식단분석 피드백을 남겨주세요.</Text>
                    </div>
                  }
                >
                  <div className=' items-center justify-center self-stretch relative xl:w-[800px] grid grid-cols-1 xl:grid-cols-2 '>

                    <Text
                      className="text-lg font-bold text-blue-600" 
                    >미답변</Text>

                  </div>
                </FormGroup>





              </div>


                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  onClick={() => {

                    router.push(`/feed/${id}/edit`);
                    
                  }}
                >
                  <PiRecordLight className="me-2 h-4 w-4" />
                  {'답변 등록'}

                </button>
                </div>

              
            )}

                  


            {/*
            <FormFooter
              // isLoading={isLoading}
              altBtnText="취소"
              submitBtnText="삭제하기"

              handleSubmitBtn={() => {
                
                
                //onSubmit(getValues());

                deleteOne();


              } }

              handleAltBtn={() => {
                console.log('handleAltBtn');

                //push(routes.feed.index);

                //Router.push({routes.feed});

                //Router.push('/feed');

                window.history.back();

              } }

              
              //handleMainBtn={() => {
              //  console.log('handleMainBtn');
              //}
              
              
            />
            */}







      {/* modal view */}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          //setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"

        ///containerClassName="dark:bg-gray-100 max-w-[660px] rounded-md p-5 lg:p-6"

        ///containerClassName="dark:bg-gray-100 max-w-[660px] max-h-[400px]   rounded-md p-5 lg:p-6"
        // scrolled container
        containerClassName="dark:bg-gray-100 max-w-[620px] rounded-md p-5 lg:p-6"
      >

          {/* close button position is top-right in modal view */}

        <div className=" flex flex-row items-center justify-end gap-[20px]">
          <button
            onClick={() => {
              setOpen(false);
            }}
            className=" no-underline flex"
          >
          <Image
            width="24"
            height="24"
            className="relative w-6 h-6 overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/x2.svg"
          />
          </button>
        </div>


        {/* fiexd height and scroable */}

     
        <div className="flex flex-col items-center justify-center gap-10 m-5">

          <div className="self-stretch flex flex-col items-center justify-center p-2.5  text-center text-13xl text-dark font-menu-off">
      
            <div className="self-stretch relative font-extrabold leading-10 ">
              {selectedFoodName}
            </div>

            <div className="mx-auto w-full "> 

              <ResponsiveContainer width="100%" height={300}>
                
                <PieChart
                  height={300}
                  width={300}
                >

                  {loading && (
                    <Pie
                      data={[ 
                        { name: 'loading', value: 1, color: '#ffffff' },
                      ]}
                      cx="50%"
                      cy="50%"
                      //labelLine={false}
                      //labelLine={true}

                      ////label={renderCustomizedLabel}

                      //outerRadius={80}

                      //innerRadius={60}
                      //outerRadius={116}

                      innerRadius={50}
                      outerRadius={80}

                      ///fill="#8884d8"

                      //strokeWidth={2}

                      dataKey="value"

                    >
                        
                        {foodPercentage.map((item, index) => (
  
                          /* gray color  #d9d9d9 */
                          <Cell key={index} fill={`#d9d9d9`} stroke={`#d9d9d9`} />
  
                        ))}

                    </Pie>

                  )}


                  {/* if foodPercentage is empty,
                  value is NaN, so
                  
                  show empty pie chart */}
                  {
                    //foodPercentage[0]?.value === 0 && foodPercentage[1]?.value === 0 && foodPercentage[2]?.value === 0 ? (
                    !loading && ! foodPercentage[0]?.value && ! foodPercentage[1]?.value && ! foodPercentage[2]?.value ? (

                   
                   // empty pie chart
                   <Pie
                    data={[
                      { name: 'empty', value: 1, color: '#ffffff' },
                    ]}
                    cx="50%"
                    cy="50%"
                    //labelLine={false}
                    //labelLine={true}
                    
                    ////label={renderCustomizedLabel}
                    
                    //outerRadius={80}

                    //innerRadius={60}
                    //outerRadius={116}

                    innerRadius={50}
                    outerRadius={80}

                    ///fill="#8884d8"
                    
                    //strokeWidth={2}

                    dataKey="value"
                  >


                    {foodPercentage.map((item, index) => (

                      /* gray color  #d9d9d9 */
                    <Cell key={index} fill={`#d9d9d9`} stroke={`#d9d9d9`} />

                    ))}


                    {/* label for center of pie chart */}
                    {/* first line is 총 칼로리 */}
                    {/* second line is 총 칼로리 value */}
                    <Label


                    value={`총 칼로리`}
                    position="center"
                    dy={-10}

                    fontSize={12}
                    fontWeight={'bold'}

                    fill='#000000'

                    />


                    <Label

                    //className=' text-base font-bold text-black'
                    value={`${kcal}kcal`}

                    position="center"
                    dy={10}

                    fontSize={16}
                    fontWeight={'bold'}
                    fill='#000000'

                    />




                  </Pie>


                  ) : (
                  
                  <Pie


                    data={foodPercentage}
                    cx="50%"
                    cy="50%"
                    //labelLine={false}
                    //labelLine={true}
                    
                    ////label={renderCustomizedLabel}
                    
                    //outerRadius={80}

                    //innerRadius={60}
                    //outerRadius={116}

                    innerRadius={50}
                    outerRadius={80}

                    fill="#8884d8"
                    
                    //strokeWidth={2}

                    dataKey="value"


                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      index
                    }) => {


                      

                      //console.log("handling label?");
                      const RADIAN = Math.PI / 180;
                      // eslint-disable-next-line
                      const radius = 25 + innerRadius + (outerRadius - innerRadius);
                      // eslint-disable-next-line
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      // eslint-disable-next-line
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
            
                      return (

                        // if value is 0, don't show label
                        value === 0 ? null : 
                      

                        <text
                          
                          className='text-sm font-bold text-black'
                          // text color
                          fill='#000000'
                          //fill="#8884d8"

                          x={x}
                          y={y}
                          
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                        >
                          {foodPercentage[index]?.name} ({value}%)
                        </text>

 
                      );

                    }}
                  >


                    {foodPercentage.map((item, index) => (

                      <Cell key={index} fill={item.color} stroke={item.color} />

                    ))}


                    {/* label for center of pie chart */}
                    {/* first line is 총 칼로리 */}
                    {/* second line is 총 칼로리 value */}
                    <Label

                      //className=' text-xs text-black '
                      // text color
                      
                      

                      value={`총 유통 공급량`}
                      position="center"
                      dy={-10}

                      fontSize={12}

                      fill='#000000'

                    />
         
                    
                    <Label

                      //className=' text-base font-bold text-black'
                      value={`${kcal}kcal`}

                      position="center"
                      dy={10}

                      fontSize={16}
                      fontWeight={'bold'}
                      fill='#000000'
                  
                    />

                  </Pie>

                  )}



                  {/* legend */}
                  {/*
                  <Legend
                    verticalAlign="bottom"
                    align="right"
                    iconSize={10}
                    iconType="circle"
                    layout="vertical"
                    wrapperStyle={{ lineHeight: '20px' }}
                    formatter={(value, entry, index) => {
                      return (
                        <span className="text-xs text-black">{value}</span>
                      );
                    }}
                  />
                  */}

                  {/* legend */}
                  {/*
                               <div className="self-stretch flex flex-row items-center justify-end relative gap-[20px] text-left text-xs">
               <div className="relative leading-[16px] font-extrabold">
                  <p className="m-0">포화지방산</p>
                  <p className="m-0">당류</p>
                  <p className="m-0">나트륨</p>
                  <p className="m-0">콜레스테롤</p>
                </div>
                <div className="relative leading-[16px] font-extrabold">
                  <p className="m-0">{saturatedfat}g</p>
                  <p className="m-0">{sugar}mg</p>
                  <p className="m-0">{salt}g</p>
                  <p className="m-0">{cholesterol}g</p>
                </div>
              </div> 
                  */}

                  {/*
                  <Legend
                    verticalAlign="bottom"
                    align="right"
                    iconSize={10}
                    iconType="circle"
                    layout="vertical"
                    wrapperStyle={{ lineHeight: '20px' }}

                    formatter={(value, entry, index) => {

                      return (
                        <div className="self-stretch flex flex-row items-center justify-end relative gap-[20px] text-left text-xs">
                          <div className="relative leading-[16px] font-extrabold">
                            <p className="m-0">포화지방산</p>
                            <p className="m-0">당류</p>
                            <p className="m-0">나트륨</p>
                            <p className="m-0">콜레스테롤</p>
                          </div>
                          <div className="relative leading-[16px] font-extrabold">
                            <p className="m-0">{saturatedfat}g</p>
                            <p className="m-0">{sugar}mg</p>
                            <p className="m-0">{salt}g</p>
                            <p className="m-0">{cholesterol}g</p>
                          </div>
                        </div> 
                      );

                    }}
                  />
                  */}


                </PieChart>
              </ResponsiveContainer>

             </div>  

            {/*
             <div className="self-stretch flex flex-row items-center justify-center relative gap-[20px] text-left text-xs ">

                <div className="p-3 flex flex-row gap-[20px] font-extrabold rounded-lg bg-grey-f1  ">

                    <div className="relative leading-[20px] font-extrabold">
                      <p className="m-0">포화지방산</p>
                      <p className="m-0">당류</p>
                      <p className="m-0">나트륨</p>
                      <p className="m-0">콜레스테롤</p>
                    </div>
                    <div className="relative leading-[20px] font-extrabold">
                      <p className="m-0">{saturatedfat}g</p>
                      <p className="m-0">{sugar}mg</p>
                      <p className="m-0">{salt}mg</p>
                      <p className="m-0">{cholesterol}mg</p>
                    </div>

                </div>

              </div> 
            */}



          </div>
        
          
        </div>
              
      </Modal>










          </>
        );
      }}
    </Form>

  );

}
