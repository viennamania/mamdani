'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
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

  const [feedbackContent, setFeedbackContent] = useState<string>('');
  const [feedbackScore, setFeedbackScore] = useState<string>('');

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch('/api/doingdoit/feed/getFeedById?_id=' + id);
  
      const json  = await res?.json() as any;
  
      console.log("FeedPage data=", json.data);
  
      setItem(json.data);


      json.data?.feedbackContent && setFeedbackContent(json.data?.feedbackContent);
      json.data?.feedbackScore && setFeedbackScore(json.data?.feedbackScore);
  
      setLoading(false);
  
    };
      
      fetchData();
  } ,[ id, ]);





  //const [feedbackScoreSelected, setFeedbackScoreSelected] = useState<string>('좋음');




  /* updateFeedback */

  const [isUpdating, setIsUpdating] = useState(false);
  
  const updateFeedback = async (
    feedbackWriterId: string,
    feedbackWriterNickname: string,
    feedbackWriterEmail: string,
    feedbackWriterAvatar: string,
   ) => {

    console.log('feedbackWriterId', feedbackWriterId);


    console.log('feedbackScore', feedbackScore);


    setIsUpdating(true)

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
        //push(routes.feed.index);

        window.history.back();

      }
      else {
        
      }
    
    } catch (e) {
      ///setError(e);
    }

    setIsUpdating(false);

  }
  

  console.log('feedbackScore', feedbackScore);



  const onSubmit: SubmitHandler<FeedInfoFormTypes> = (data) => {



    if (feedbackContent === ''
      || feedbackScore === '' ) {


      toast.error(
        '필수 입력값을 모두 입력해주세요.',
        {
          //position: 'top-right',
        }
      );

      return;
    }



    
    // update feedback data to api
    // /api/doingdoit/feed/updateFeedById

    updateFeedback
    (
      data?.feedbackWriterId as string
      , data?.feedbackWriterNickname as string
      , data?.feedbackWriterEmail as string
      , data?.feedbackWriterAvatar as string
      
    );
    

    
    

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

            {/* delete button */}
            

  
            <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">
              
              {/*
              <FormGroup
                title="No"
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
                <Text>좋아요 23, 댓글 3, 조회 34</Text>
              </FormGroup>

              <FormGroup
                title="공개여부"
              >
                <Text>
                  {item?.hiddenYn === 'Y' ? "비공개" : "공개"}
                </Text>
              </FormGroup>

              <FormGroup
                title="식사일자"
              >
                <Text>
                  <DateCell date={item?.mealDate} className='w-fit' />
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

              />

           

            </div>




            



            <div className="mt-10 mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              { true && (

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

                  <div className='flex flex-col items-start justify-center gap-5'>
 
                <TableAvatar
                  src={user?.avatar || '/usermain/images/avatar.svg'}
                  name={user?.nickname || '전문가'}
                  description={user?.email || '이메일'}
                />



                <Controller
                  control={control}
                  name="feedbackWriterAvatar"
                  render={({ field: { onChange, value } }) => (
                    <Image
                      src={

                        !user?.avatar || user?.vavtar == '' || user?.avatar == 'undefined' ? '/usermain/images/avatar.svg' : 
                        user?.avatar
                      }
                      alt="avatar"
                      width={80}
                      height={80}
                      //style={{objectFit: "fill"}}
                      className=" w-12 h-12 rounded-full hidden"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="feedbackWriterId"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="전문가 회원번호"
                      placeholder="feedbackWriterId"
                      onChange={onChange}
                      value={
                        user?.id
                        
                      }
                      className="w-full  hidden"
                      disabled
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="feedbackWriterEmail"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="전문가 이메일"
                      placeholder="feedbackWriterEmail"
                      onChange={onChange}
                      value={
                        user?.email
                      }
                      className="w-full   hidden"
                      disabled
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="feedbackWriterNickname"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="전문가 닉네임"
                      placeholder="feedbackWriterNickname"
                      onChange={onChange}
                      value={
                        user?.nickname
                      }
                      className="w-full   hidden "
                      disabled
                    />
                  )}
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


              ) }
              





              <FormGroup
                title="식단분석 피드백"
              >
                <Controller
                  control={control}
                  name="feedbackContent"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor
                      value={

                        feedbackContent

                        //item?.feedbackYn === 'Y' ? item?.feedbackContent : value

                        //value
                        
                        //////item?.feedbackContent
                      
                      }
                      onChange={
                        (e) => {
                          setFeedbackContent(e)

                      } }
                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[200px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      
                    />

                    
                  )}
                />
              </FormGroup>

              <FormGroup
                title="식단점수"
              >
              
              <Controller
                  control={control}
                  name="feedbackScore"
                  render={({ field: { onChange, value } }) => (
                    


                  <RadioGroup
                    value={
                      feedbackScore
                    }
    
                    setValue={(value) => {
           
                      setFeedbackScore(value)
                    } }

                    className="justify-center space-x-4 space-y-4"
                  >

                    <div className="divide-slate-300 flex flex-row items-center justify-center gap-5">
                      <Radio
                        size='lg'
                        name="diet"
                        label="좋음"
                        value="좋음"
                        labelClassName="pl-2 "
                        checked={feedbackScore == '좋음' ? true : false}
                      />
                      <Radio
                        size='lg'
                        name="diet"
                        label="양호함"
                        value="양호함"
                        labelClassName="pl-2"
                        checked={feedbackScore == '양호함' ? true : false}
                      />
                      <Radio
                        size='lg'
                        name="diet"
                        label="개선이 필요함"
                        value="개선이 필요함"
                        labelClassName="pl-2"
                        checked={feedbackScore == '개선이 필요함' ? true : false}
                      />
                    </div>
                  </RadioGroup>
                  )}
                />

               

              </FormGroup>



         




            </div>



            <FormFooter
              // isLoading={isLoading}

              isLoading={isUpdating}

              altBtnText="취소"
              submitBtnText="저장하기"

              handleSubmitBtn={() => {
                onSubmit(getValues());
              } }

              handleAltBtn={() => {
                console.log('handleAltBtn');

                //push(routes.feed.index);

                //Router.push({routes.feed});

                //Router.push('/feed');

                window.history.back();

              } }

              /*
              handleMainBtn={() => {
                console.log('handleMainBtn');
              }
              */
              
            />







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
