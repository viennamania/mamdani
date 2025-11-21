'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple, PiCheckCircleFill } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';

import FormGroup from '@/app/shared-doingdoit/form-group';

import FormFooter from '@/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';



import Image from 'next/image';


import BasicTableWidget from '@/components/doingdoit/basic-table-widget';


//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { use, useEffect, useState } from 'react';

import TableAvatar from '@/components/ui/avatar-card';
import { u } from 'uploadthing/dist/types-e8f81bbc';




///import { surveyData } from '@/data/doingdoit/survey/survey-data';

import { getColumns } from '@/app/shared-doingdoit/survey/survey-columns';


import DateCell from '@/components/ui/date-cell';
import { set } from 'lodash';
import { IoTime } from 'react-icons/io5';



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



export type DetailsTypes = {
  item: any;
};


export default function InfoView({
  item,
}: React.PropsWithChildren<DetailsTypes>) {


  ////console.log('item ->', item);
 
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };



  // encodeURIComponent
  // decodeURIComponent



  /*
  console.log(' item?.surveyResultJson?.mbti ->',
 
    decodeURIComponent(item?.surveyResult)
  );
  */


  const [surveyResult, setSurveyResult] = useState<any>(null);
  const [mbti, setMbti] = useState<any>(null);
  const [character, setCharacter] = useState<any>(null);
  const [nutrition, setNutrition] = useState<any>(null);

  const [surveyData, setSurveyData] = useState<any>([]);

  const [answerArray, setAnswerArray] = useState<any>([]);

  const [selectionArray, setSelectionArray] = useState<any>([]);


  const [loading, setLoading] = useState(false);

  useEffect(() => {



    if (item?.surveyResult) {

      setLoading(true);

      const surveyResult = JSON.parse(decodeURIComponent(item?.surveyResult)) as any;

      console.log('surveyResult ->', surveyResult);


      setSurveyResult(surveyResult);

      setMbti(surveyResult?.mbti);
      setCharacter(surveyResult?.character?.[0]);
      setNutrition(surveyResult?.nutrition);

      /*
         question: '평소 밥 먹는 스타일은?',
    answer: '건강을 위해 매일 현미밥이나 잡곡밥을 챙겨 먹는다.',
      */

      const answerArray = surveyResult?.answerArray;
      setAnswerArray(answerArray);

      /*
      [
        {
            "A": "건강을 위해 매일 현미밥이나 잡곡밥을 챙겨 먹는다.",
            "B": "건강을 위해 자주 현미밥이나 잡곡밥을 챙겨 먹는다.",
            "C": "가끔 현미밥이나 잡곡밥을 먹는 편. 주로 쌀밥을 먹는다.",
            "D": "밥은 자고로 뽀얀 흰 쌀밥이지! 삼시세끼 쌀밥만 먹는다."
        },
        {
            "A": "고기는 별로. 거의 안 먹는다.",
            "B": "생각날 때면 가끔 먹는다. (주 1-2회)",
            "C": "자주 먹는다. (주 3회-5회)",
            "D": "없어서 못 먹는다. 거의 매일 먹는다. (주 6회 이상)"
        },

    ]
      */

    //console.log('answerArray ->', answerArray[15]);
    ///console.log('surveyResult?.selection ->', surveyResult?.selection[15]);
  

 
      setSurveyData(

        surveyResult?.questionArray?.map((item: any, index: number) => {

          //console.log('item ->', item);
          return {
            id: (index + 1).toString(),
            question: item,
            
            //options: answerArray?.[0],

            //answer: surveyResult?.selection?.[index]
            //answer: answerArray?.[index]?.[surveyResult?.selectionArray?.[index]]

            answer:
              // if surveyResult?.selectionArray is not null
              // then use surveyResult?.selectionArray
              // else use surveyResult?.selection

              surveyResult?.selectionArray?.[index] ?
              answerArray?.[index]?.[surveyResult?.selectionArray?.[index]]
              :
              answerArray?.[index]?.[surveyResult?.selection?.[index]]

          };
        })
      );

      
      setLoading(false);


    }
  
  } , [item]);

  
  console.log('surveyData ->', surveyData);


  return (
    

          <>
      
            {/* 게시글 */}
            <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              {/*
              <FormGroup
                title="NO"
                
              >
                <Text>{item?._id}</Text>
              </FormGroup>
              */}

              <FormGroup
                title="참여일시"
              >
                <Text> <DateCell date={item?.createdAt} className='w-fit' /> </Text>
              </FormGroup>

              <FormGroup
                title="참여자"
              >
                {/*
                <TableAvatar
                  src={item?.avatar || '/images/avatars/avatar-blank.webp'}
                  name={item?.name}
                  description={item?.email}
                />
                */}
                <Text>{item?.userNickname} ({item?.userEmail})</Text>
              </FormGroup>



              <FormGroup
                title="결과"
              >

                <div className=" flex flex-row gap-2 ">

                  <Text >
                    {character?.name}
                  </Text>
                  {' '}-{' '}

                  <Text>
                    {
                      mbti?.[0] + mbti?.[1] + mbti?.[2] + mbti?.[3]
                    }
                  </Text>
      



                </div>

              

              </FormGroup>

            </div>
  

              {/* BMTI 데이타 */}


              <BasicTableWidget
                title="설문별 답변"
                variant="minimal"
                data={
                  surveyData
                }
                // @ts-ignore
                getColumns={getColumns}
                //enablePagination
                enableSearch={false}
                enablePagination={false}

                pageSize={100}

                sticky={true}
                scroll={{ x: 600, }}
                
                //searchPlaceholder="닉네임, 제목, 피드백 작성자"

                className="mt-10"
              />

              
          </>

  );
}
