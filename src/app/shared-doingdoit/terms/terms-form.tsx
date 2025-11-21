'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';


import { PiXBold, PiGenderMale, PiGenderFemale } from 'react-icons/pi';


import { Badge } from '@/components/ui/badge';

import { Title, Text } from '@/components/ui/text';


import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import cn from '@/utils/class-names';
import PostFeed from '@/app/shared/profile/post-feed';
import FollowerModal from '@/app/shared/profile/follower-modal';

import { postData, followersData, followingData } from '@/data/doingdoit/profile-data';

const tabs = [
  { id: 'posts', count: postData.length },
  { id: 'followers', count: followersData.length },
  { id: 'following', count: followingData.length },
];



import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



import PointTableWidget from '@/components/doingdoit/point-table-widget';

import { pointData } from '@/data/doingdoit/user/point-data';

import { getColumns } from '@/app/shared-doingdoit/user/point-columns';



import { memberData } from '@/data/doingdoit/user/member-data';

import FormGroup from '@/app/shared-doingdoit/form-group';

import { Form } from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import DateCell from '@/components/ui/date-cell';



import BasicTableWidget from '@/components/doingdoit/basic-table-widget';

import {
  data as surveyData,
} from '@/data/doingdoit/survey/data';


import {
  getColumns as getSurveyColumns,
} from '@/app/shared-doingdoit/profile/survey-columns';


import {
  data as feedData,
} from '@/data/doingdoit/feed/data';


import {
  getColumns as getFeedColumns,
} from '@/app/shared-doingdoit/profile/feed-columns';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

import { SubmitHandler, Controller } from 'react-hook-form';

/*
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
*/

import {
  termsSchema,
  TermsSchema,
} from '@/utils/validators/doingdoit/terms.schema';
import { set } from 'lodash';



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}



function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});





export default function TermsForm() {



  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: 'Followers',
    data: followersData,
  });
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    setOpen(() => false);
  }, [pathname]);

  // handle follower and following modal open
  function handleTabClick(id: string) {
    if (id === 'followers') {
      setModalData({ title: 'Followers', data: followersData });
    } else if (id === 'following') {
      setModalData({ title: 'Following', data: followingData });
    }
    setOpen(() => true);
    setActive(() => id);
  }


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };




  //const [contractContent, setContractContent] = useState<string>('');
  const [contractContentTerms, setContractContentTerms] = useState<string>('');
  const [contractContentPrivacy, setContractContentPrivacy] = useState<string>('');
  const [contractContentMarketing, setContractContentMarketing] = useState<string>('');
  const [contractContentWithdrawal, setContractContentWithdrawal] = useState<string>('');


  // get contract from DB
  useEffect(() => {

    const getContract = async (contractName: string) => {
      
      try {

        const params = {
          contractName: contractName,
        };

        const res = await fetch(`/api/doingdoit/user/getContract`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        const result = await res.json() as any;

        ///console.log('result ->', result);

        if (result) {
          //setContractContent(result?.data);

          if (contractName === 'terms') {
            setContractContentTerms(result?.data);
          } else if (contractName === 'privacy') {
            setContractContentPrivacy(result?.data);
          } else if (contractName === 'marketing') {
            setContractContentMarketing(result?.data);
          } else if (contractName === 'withdrawal') {
            setContractContentWithdrawal(result?.data);
          }
        }

      } catch (error) {

      }

    }

    // get contract if tab is terms or privacy or marketing or withdrawal
    value === 0 && getContract('terms');
    value === 1 && getContract('privacy');
    value === 2 && getContract('marketing');
    value === 3 && getContract('withdrawal');
    


  } , [value]);




  const [loadingUpate, setLoadingUpdate] = useState<boolean>(false);

  const updateContract = async (
    contractName: string,
    contractContent: string,
  ) => {

    //console.log('contractName ->', contractName);
    ///console.log('contractContent ->', contractContent);

    if (loadingUpate) {
      return;
    }
    setLoadingUpdate(true);
    
    try {

      const params = {
        contractName: contractName,
        contractVersion: '1',
        contractStatus: 'active',
        contractContent: contractContent,
      };


      const res = await fetch(`/api/doingdoit/user/updateContract`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const result = await res.json();

      ///console.log('result ->', result);

      if (result) {
        toast.success(<Text as="b">업데이트 되었습니다!</Text>);
      }

    } catch (error) {
      toast.error(<Text as="b">업데이트에 실패하였습니다!</Text>);
    }

    setLoadingUpdate(false);

   
  }


  const onSubmit: SubmitHandler<TermsSchema> = (data) => {


    //data.terms = data.terms.replace(/<p><br><\/p>/g, '');

    //console.log('onSubmit data ->', data);
    //console.log('value ->', value);

    if (value === 0) {

      updateContract('terms', contractContentTerms);
      
    } else if (value === 1) {

      updateContract('privacy', contractContentPrivacy);

    } else if (value === 2) {

      updateContract('marketing', contractContentMarketing);

    } else if (value === 3) {

      updateContract('withdrawal', contractContentWithdrawal);

    }

   





    /*
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('data ->', {
      ...data,
    });
    */
  };

  
  return (
    
    <Form<TermsSchema>
      validationSchema={termsSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        //defaultValues,
      }}
    >

    {({ register, control, setValue, getValues, formState: { errors } }) => {


      return (
        <>

          <div className=" mt-0 w-full max-w-[1294px]">

          <div className=" flex flex-row items-center justify-end">

            <Button
              type="submit"
              //isLoading={isLoading}
              className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              onClick={() => {
                onSubmit(getValues());
              } }
            >
              저장하기
            </Button>

          </div>

              
          <div className="mt-5 mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">
            


          <Box sx={{ width: '100%' }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  >
                <Tab label="이용약관" {...a11yProps(0)} />
                <Tab label="개인정보처리방침" {...a11yProps(1)} />
                <Tab label="이벤트및마케팅활용" {...a11yProps(2)} />
                <Tab label="회원탈퇴약관" {...a11yProps(3)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>

              <div className='mb-10 grid gap-7 divide-y divide-dashed divide-gray-200'>

                <Controller
                  control={control}
                  name="terms"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor

                      onChange={
                        (e) => {
                          setContractContentTerms(e);

                      } }
                      
                      ///value={value}
                      value={

                     
                        ///contractContent !== undefined && contractContent !== null && contractContent !== '' ? contractContent : ''

                        contractContentTerms !== undefined && contractContentTerms !== null && contractContentTerms !== '' ? contractContentTerms : ''

                      }

                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[600px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />

                    
                  )}
                />
                
              </div>

            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>

              <div className='mb-10 grid gap-7 divide-y divide-dashed divide-gray-200'>

                <Controller
                  control={control}
                  name="privacy"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor
                      

                      onChange={
                        (e) => {
                          setContractContentPrivacy(e);

                      } }

                      ///value={value}

                    value={
                      ///contractContent !== undefined && contractContent !== null && contractContent !== '' ? contractContent : ''

                      contractContentPrivacy !== undefined && contractContentPrivacy !== null && contractContentPrivacy !== '' ? contractContentPrivacy : ''

                    }

                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[600px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />

                    
                  )}
                />

              </div>

            </CustomTabPanel>


            <CustomTabPanel value={value} index={2}>


              <div className='mb-10 grid gap-7 divide-y divide-dashed divide-gray-200'>

                <Controller
                  control={control}
                  name="marketing"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor
                    
                      onChange={
                        (e) => {
                          setContractContentMarketing(e);

                      } }

                      value={
                        ///contractContent !== undefined && contractContent !== null && contractContent !== '' ? contractContent : ''

                        contractContentMarketing !== undefined && contractContentMarketing !== null && contractContentMarketing !== '' ? contractContentMarketing : ''
                      }

                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[600px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />

                    
                  )}
                />

              </div>

            </CustomTabPanel>


            <CustomTabPanel value={value} index={3}>


              <div className='mb-10 grid gap-7 divide-y divide-dashed divide-gray-200'>

                <Controller

                  control={control}

                  name="withdrawal"

                  render={({ field: { onChange, value } }) => (
                    

                    <QuillEditor
                
                      ///onChange={onChange}

                      onChange={
                        (e) => {
                          setContractContentWithdrawal(e);

                      } }


                      value={
                        ///contractContent !== undefined && contractContent !== null && contractContent !== '' ? contractContent : ''

                        contractContentWithdrawal !== undefined && contractContentWithdrawal !== null && contractContentWithdrawal !== '' ? contractContentWithdrawal : ''
                      }

                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[600px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />

                    
                  )}
                />

              </div>

            </CustomTabPanel>


          </Box>


          </div>

            {/*

            <div className="-mx-4 flex items-center justify-around border-b-2 border-b-gray-200 font-medium sm:mx-0 md:justify-start md:gap-8">


              {tabs.map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    'relative pb-4 font-semibold capitalize text-gray-500 focus:outline-none @4xl:pb-5 md:px-4',
                    active === item.id && 'text-gray-1000'
                  )}
                  onClick={() => handleTabClick(item.id)}
                >
                  <span>{item.id}</span>
                  <Badge
                    variant="flat"
                    className="ms-2 border border-gray-300 bg-gray-200 p-0.5 px-1.5"
                  >
                    {item.count}
                  </Badge>
                  {active === 'posts' && item.id === 'posts' && (
                    <span className="absolute inset-x-0 -bottom-0.5 z-10 h-0.5 bg-gray-1000"></span>
                  )}
                </button>
              ))}
            </div>
            <PostFeed />
            */}

          </div>


          <Modal
            isOpen={open}
            onClose={() => {
              setOpen(false);
              setActive(() => 'posts');
            }}
            overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
            containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
          >
            <div className="flex items-center justify-between pb-2 lg:pb-3">
              <Title
                as="h3"
                className="text-lg font-semibold text-gray-900 xl:text-xl"
              >
                {modalData.title}
              </Title>
              <Button
                variant="text"
                onClick={() => {
                  setOpen(false);
                  setActive(() => 'posts');
                }}
                className="h-auto px-1 py-1"
              >
                <PiXBold className="h-5 w-5 text-base" />
              </Button>
            </div>
            {modalData && <FollowerModal data={modalData.data} />}
          </Modal>


        </>
      );
        
      }}
    </Form>

  );

}
