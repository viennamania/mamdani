'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';



import { useColumn } from '@/hooks/use-column';

//import ControlledTable from '@/components/controlled-table';
import ControlledTable from '@/components/doingdoit/controlled-table';


import cn from '@/utils/class-names';

import DateFiled from '@/components/controlled-table/date-field';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';

import { DatePicker } from '@/components/ui/datepicker';


import { Button } from '@/components/ui/button';

import { CiSearch } from "react-icons/ci";

import TableFooter from '@/app/shared/table-footer';

import { exportToCSV } from '@/utils/export-to-csv';


import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';


import { PiMagnifyingGlassBold, PiDownloadSimpleBold } from 'react-icons/pi';


import {
  useDrawer,
  type DrawerPlacements,
} from '@/app/shared/drawer-views/use-drawer';


import UserProfile from '@/app/shared-doingdoit/feed/user-profile';


import { useTable } from '@/hooks/doingdoit/use-table-feed';

import * as XLSX from "xlsx";


import { Checkbox } from '@/components/ui/checkbox';


import { useSearchParams, useRouter } from 'next/navigation'
import { set } from 'lodash';
import { u } from 'uploadthing/dist/types-e8f81bbc';


type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  checkedItems?: string[];
  handleSelectAll?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;

  onClickUser: (id: string) => void; // user

  totalItems?: number;
};


type BasicTableWidgetProps = {

  title?: React.ReactNode;
  className?: string;
  pageSize?: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  
  getColumns: ({
    data,
    sortConfig,
    checkedItems,
    handleSelectAll,
    onDeleteItem,
    onHeaderCellClick,
    onChecked,

    onClickUser, // user

    totalItems,
    
  }: ColumnTypes) => any;
  

  data: any[];
  enablePagination?: boolean;
  variant?: 'modern' | 'minimal' | 'classic' | 'elegant' | 'retro';
  enableSearch?: boolean;
  paginatorClassName?: string;
  searchPlaceholder?: string;
  noGutter?: boolean;
  scroll?: {
    x?: number;
    y?: number;
  };
  sticky?: boolean;

};


type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};



export default function FeedTableWidget({
  
  title,

  data = [],

  getColumns,
  
  //pageSize = 7,

  //setPageSize,
  enablePagination,
  variant = 'modern',
  enableSearch = true,
  paginatorClassName,
  noGutter,
  sticky,
  scroll = { x: 1300 },
  className,
  searchPlaceholder = 'Search...',


}: BasicTableWidgetProps) {

  const router = useRouter();

  // get params from query string
  const searchParams = useSearchParams();


  const paramSearchTerm = searchParams.get('paramSearchTerm')
  || '';


  const paramStartDate = searchParams.get('paramStartDate')
    || new Date( new Date().getFullYear(), new Date().getMonth(), 1 ).toISOString();

  const paramEndDate = searchParams.get('paramEndDate')
    || new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ).toISOString();
 

  const paramPageSize = searchParams.get('paramPageSize')
    || 10;


  const paramCurrentPage = searchParams.get('paramCurrentPage')
    || 1;


  
  

  const paramSortConfigKey = searchParams.get('paramSortConfigKey')
    || 'createdAt';

  const paramSortConfigDirection = searchParams.get('paramSortConfigDirection')
    || 'desc';

  const paramMealTimeArray = searchParams.get('paramMealTimeArray')
    || '아침,점심,저녁,간식,야식';

  const paramFeedbackArray = searchParams.get('paramFeedbackArray')
    || '미답변,답변완료';


  /*
  console.log('paramSearchTerm=======', paramSearchTerm);
  console.log('paramStartDate=======', paramStartDate);
  console.log('paramEndDate========', paramEndDate);
  console.log('paramPageSize========', paramPageSize);
  console.log('paramCurrentPage=====', paramCurrentPage);
  console.log('paramSortConfigKey===', paramSortConfigKey);
  console.log('paramSortConfigDirection===', paramSortConfigDirection);
  console.log('paramMealTimeArray===', paramMealTimeArray);
  console.log('paramFeedbackArray===', paramFeedbackArray);
  */







  const [searchTerm, setSearchTerm] = useState(
    paramSearchTerm as string
  );

  const [pageSize, setPageSize] = useState(
    parseInt(paramPageSize as string)
  );


  const [currentPage, setCurrentPage] = useState(
    parseInt(paramCurrentPage as string)
  );


  const [startDate, setStartDate] = useState<Date>(
    new Date(paramStartDate as string)
  );


  const [endDate, setEndDate] = useState<Date>(
    
    //new Date(paramEndDate as string)

    // paramEndData is string
    // so, convert to Date
    // and plus 23h 59m 59s 999ms

    new Date(new Date(paramEndDate as string).setHours(23, 59, 59, 999))



  );

  // collection of mealTime (아침, 점심, 저녁, 간식, 야식) 
  //const [mealTimeArray, setMealTimeArray] = useState(['아침', '점심', '저녁', '간식', '야식']);

  // feedbackYn (전체, 미답변, 답변완료)
  //const [feedbackArray, setFeedbackArray] = useState(['미답변', '답변완료']);


  const [mealTimeArray, setMealTimeArray] = useState([
    ...(paramMealTimeArray as string)?.split(',')
    ]);

  const [feedbackArray, setFeedbackArray] = useState([
    ...(paramFeedbackArray as string)?.split(',')
    ]);




    ///console.log('currentPage=====', currentPage);




  /*

  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
  const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
  */


  


  const { openDrawer } = useDrawer();




  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });



  const onDeleteItem = (id: string) => {
    handleDelete(id);
  };


  const onClickUser = (id: string) => {

    openDrawer({
      view: <UserProfile id={id} />,
      placement: 'right',
    });

  };





  /*
  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  }
  */

  
  
  const handlePaginate = (page: number) => {

    setCurrentPage(page);

    handleSearch(
      searchTerm,
      pageSize,
      page,
      startDate,
      endDate,
      mealTimeArray,
      feedbackArray,
    );

  };
  


  const {
    isLoading,
    sortConfig,
    totalItems,
    tableData,

    ///currentPage,
    
    //searchTerm,

    handleSort,
    
    handleDelete,

    handleSearch,
    
    ///handlePaginate,


    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,

  } = useTable(
    data,
    pageSize,
    currentPage,
    [],

    startDate.toISOString(),
    endDate.toISOString(),

    mealTimeArray,
    feedbackArray
  );


  
  //const [searchTerm, setSearchTerm] = useState('');



  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        onHeaderCellClick,
        onDeleteItem,

        checkedItems: selectedRowKeys,
        onChecked: handleRowSelect,
        handleSelectAll,

        onClickUser, // user

        totalItems: totalItems,
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,

      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns } = useColumn(columns);

 
  const isMediumScreen = true;


  const [value, setValue] = useState('all');



  const [open, setOpen] = useState(false);





  useEffect(() => {

    console.log('useEffect=====================');

    router.push(

      // url encoding for url query string

      "/feed?paramSearchTerm=" + searchTerm
      + "&paramPageSize=" + pageSize
      + "&paramCurrentPage=" + currentPage
      + "&paramSortConfigKey=" + sortConfig.key
      + "&paramSortConfigDirection=" + sortConfig.direction
      + "&paramStartDate=" + startDate.toISOString()
      + "&paramEndDate=" + endDate.toISOString()

      + "&paramMealTimeArray=" + mealTimeArray.join(',')
      + "&paramFeedbackArray=" + feedbackArray.join(',')
      
    )

    

  } , [
    searchTerm, pageSize, currentPage, startDate, endDate, sortConfig.key, sortConfig.direction
    , mealTimeArray, feedbackArray

  ]);


  
  useEffect(() => {

    console.log('useEffect>>>>>>>>>>>>>>>>>>>>>');
    console.log('searchTerm', searchTerm);
    console.log('pageSize', pageSize);
    console.log('currentPage', currentPage);
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    console.log('mealTimeArray', mealTimeArray);
    console.log('feedbackArray', feedbackArray);


      
    handleSearch(
      searchTerm,
      pageSize,
      currentPage,
      startDate,
      endDate,
      mealTimeArray,
      feedbackArray,
    );
  
  } , []);
  
   

  /*
  useEffect(() => {

    setCurrentPage(1);

  } , [searchTerm, pageSize, startDate, endDate, mealTimeArray, feedbackArray]);
  */

      







  // export to csv

  ///const exportToCSV = (items: any[], fileName: string) => {

  ///const exportToCSV = (fileName: string) => {


  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = async (fileName: string) => {

    setIsExporting(true);
    


    const res = await fetch('/api/doingdoit/feed/getAllForDownload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        sort: sortConfig.key,
        order: sortConfig.direction,
        q: searchTerm,
        startDate: startDate,
        endDate: endDate,
        mealTimeArray: mealTimeArray,
        feedbackArray: feedbackArray,

        }),
    });



    const posts  = await res?.json() as any;
      
    const items = posts.data as any[];

    ////console.log('items', items);


      

    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';

    /*
    const formattedData = items.map((item) => {
      const { id, ...rest } = item;
      return rest;
    });
    */

    const formattedData  = [] as any[];

    items.map((item, index ) => {

      const { id, ...rest } = item;

      formattedData.push({
        //'No': id,

        'No': rest.sequenceNumber,

        '등록일자':
          rest.createdAt ? new Date(rest.createdAt).toLocaleString() : '',


        '식사일자': rest.mealDate,
        '식사시간': rest.mealTime,

        '작성자 닉네임': rest.nickname,

        '스크랩': rest.scrapCount ? rest.scrapCount : 0,
        '좋아요': rest.likeCount ? rest.likeCount : 0,
        '조회수': rest.viewCount ? rest.viewCount : 0,

        
        //'음식정보': rest.mealFood?.map ( (food: any) => { return food.foodName + ' ' + food.foodAmount + 'g' } ).join(', '),

        '음식정보': rest.mealFood?.map ( (food: any) => { return food.foodName } ).join(', '),

        '내용':
        
        // remove html tags
        // and trim space left and right
        //rest.feedContent.replace(/<[^>]+>/g, ''),

        ///rest.feedContent.replace(/<[^>]+>/g, '').trim(),

        // ⏪️ => \u{23EA}
        //⏩️⏫️⏬️⏭️⏮
        // ⏪️⏩️⏫️⏬️⏭️⏮

        // remove emoji

        // \u{1F600}-\u{1F64F} => emoticons
        
        ////rest.feedContent?.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B00}-\u{2BFF}]+/gu, '').trim(),

        rest.feedContent,



        ///rest.feedContent,

        '식사량': rest.mealAmount === 1 ? '아주적게' : rest.mealAmount === 2 ? '적게' : rest.mealAmount === 3 ? '보통' : rest.mealAmount === 4 ? '많이' : '아주많이',
        '식사소요시간': rest.mealSpeed === 1 ? '아주느림' : rest.mealSpeed === 2 ? '느림' : rest.mealSpeed === 3 ? '보통' : rest.mealSpeed === 4 ? '빠름' : '아주빠름',
        '칼로리': rest.kcal,
        '탄수화물': rest.carbohydrate,
        '단백질': rest.protein,
        '지방': rest.fat,
        '나트륨': rest.salt,
        '포화지방': rest.saturatedfat,
        '콜레스테롤': rest.cholesterol,
        '당': rest.sugar,

        '피드백 작성자': rest?.feedbackWriterNickname,
        
        '피드백 등록일자':
          rest?.feedbackCreatedAt ? new Date(rest?.feedbackCreatedAt).toLocaleString() : '',

        '피드백 내용': rest?.feedbackContent?.replace(/<[^>]+>/g, ''),
        '피드백 식단점수': rest?.feedbackScore,

      });

    } );



    const ws = XLSX.utils.json_to_sheet(formattedData);

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], { type: fileType });

    const now = new Date();

    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    const time = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;

    const dateTime = `${date}_${time}`;

    const fileNameExtension = `${fileName}_${dateTime}${fileExtension}`;

    ///XLSX.writeFile(data  , fileNameExtension);

    ///XLSX.writeFile(data, fileNameExtension);

    XLSX.writeFile(wb, fileNameExtension);
      
  
    setIsExporting(false);


  }








  return (

    <WidgetCard
      title={title}
      className={cn('flex flex-col    ', className)}
      headerClassName="  widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      
      {...(enableSearch && {
        action: (

         <></>




       

          

        ),

      })}

    >


      <div className='flex flex-col items-start justify-center gap-3'>


      <div className='w-full flex flex-wrap items-center justify-between gap-3'>

        
        <div className='flex flex-row items-center justify-center gap-3'>

          <div className=' w-16 flex flex-row items-center justify-center gap-3'>
            식사일자
          </div>
        
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {

              setCurrentPage(1);
              setStartDate(date)
            } }

            placeholderText=""
            showFullMonthYearPicker
            popperPlacement="bottom-end"

            {...(isMediumScreen && {
              inputProps: {
                //label: 'Created Date',
                //labelClassName: 'text-base font-medium',
                inputClassName: ' text-base font-medium',
            },

            })}
            className=" w-44 "
          />

            ~

          <DatePicker
            selected={endDate}
            onChange={(date: Date) => {
              setCurrentPage(1);
              setEndDate(date)
            } }
            placeholderText=""
            showFullMonthYearPicker
            popperPlacement="bottom-end"
            
            {...(isMediumScreen && {
              inputProps: {
                //label: 'Created Date',
                //labelClassName: 'text-base font-medium',
                inputClassName: ' text-base font-medium',
            },

            })}
            className=" w-44 "
          />

            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchTerm}

              onClear={() => {

                  //setCurrentPage(1);

                  //handleSearch('')

                }
              }

              onChange={(event) => {

                //setCurrentPage(1);
                //handleSearch(event.target.value)

                setSearchTerm(event.target.value);

              } }
              //clearable

              prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            />


            <Button
              onClick={() => {
                setStartDate(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
                setEndDate(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
                setSearchTerm('');
                setCurrentPage(1);
                setPageSize(10);
                setMealTimeArray(['아침', '점심', '저녁', '간식', '야식']);
                setFeedbackArray(['미답변', '답변완료']);

                handleSearch(
                  '',
                  10,
                  1,
                  new Date( new Date().getFullYear(), new Date().getMonth(), 1 ),
                  new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ),
                  ['아침', '점심', '저녁', '간식', '야식'],
                  ['미답변', '답변완료'],
                );
              }}
              className="w-24 bg-gray-200 text-black "
            >
              초기화
            </Button>

            <Button
              onClick={() => {

                setCurrentPage(1);
                
                handleSearch(
                  searchTerm,
                  pageSize,
                  currentPage,
                  startDate,
                  endDate,
                  mealTimeArray,
                  feedbackArray,
                );
              }}
              className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              >
              <CiSearch className="me-1.5 h-[17px] w-[17px]" />
              검색
            </Button>

        </div>

        <div className='flex flex-row items-center justify-center gap-3'>

          <Button
            // excel download
            isLoading={isExporting}
            onClick={() => {
              //alert('엑셀다운로드');
              console.log('엑셀다운로드');

              ///exportToCSV(tableData, 'feed_data');

              exportToCSV('feed_data');

            }}

            className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            엑셀다운로드
          </Button>
        </div>


      </div>


      {/*
      <div className='flex flex-wrap items-center justify-center gap-3'>

        <RadioGroup
          value={value}
          //setValue={setValue}

          setValue={(value) => {
            //setValue(value);
            console.log('value', value);
          } }

          className="justify-center space-x-4 space-y-4"
        >
          <div className="divide-slate-300 flex flex-row items-center justify-center gap-5">
            
            <div className=" w-16 ">
              식사시간
            </div>



            <Checkbox
              label="전체"

              {...(mealTimeArray.includes('아침') && mealTimeArray.includes('점심') && mealTimeArray.includes('저녁') && mealTimeArray.includes('간식') && mealTimeArray.includes('야식') ? { checked: true } : { checked: false})}

              onChange={(event) => {

                setCurrentPage(1);
                if (event.target.checked) {
                  setMealTimeArray(['아침', '점심', '저녁', '간식', '야식']);
                } else {
                  setMealTimeArray([]);
                }
              }}
            />

            <Checkbox
              label="아침"
              checked={mealTimeArray.includes('아침')}
              onChange={(event) => {
                
                setCurrentPage(1);

                if (event.target.checked) {
                  setMealTimeArray([...mealTimeArray, '아침']);
                } else {
                  setMealTimeArray(mealTimeArray.filter((item) => item !== '아침'));
                }
              }}
            />

            <Checkbox
              label="점심"
              checked={mealTimeArray.includes('점심')}
              onChange={(event) => {

                setCurrentPage(1);
                if (event.target.checked) {
                  setMealTimeArray([...mealTimeArray, '점심']);
                } else {
                  setMealTimeArray(mealTimeArray.filter((item) => item !== '점심'));
                }
              }}

            />

            <Checkbox
              label="저녁"
              checked={mealTimeArray.includes('저녁')}
              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setMealTimeArray([...mealTimeArray, '저녁']);
                } else {
                  setMealTimeArray(mealTimeArray.filter((item) => item !== '저녁'));
                }
              }}

            />

            <Checkbox
              label="간식"
              checked={mealTimeArray.includes('간식')}
              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setMealTimeArray([...mealTimeArray, '간식']);
                } else {
                  setMealTimeArray(mealTimeArray.filter((item) => item !== '간식'));
                }
              }}

            />

            <Checkbox
              label="야식"
              checked={mealTimeArray.includes('야식')}
              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setMealTimeArray([...mealTimeArray, '야식']);
                } else {
                  setMealTimeArray(mealTimeArray.filter((item) => item !== '야식'));
                }
              }}

            />


          </div>
        </RadioGroup>

      </div>
      */}


      <div className='flex flex-wrap items-center justify-center gap-3'>

        <RadioGroup
          value={value}
          //setValue={setValue}

          setValue={(value) => {
            //setValue(value);
            console.log('value', value);
          } }

          className="justify-center space-x-4 space-y-4"
        >
          <div className="divide-slate-300 flex flex-row items-center justify-center gap-5">
            <div className=" w-16 ">
              판매자 피드백
            </div>

            <Checkbox
              label="전체"

              {...(feedbackArray.includes('미답변') && feedbackArray.includes('답변완료') ? { checked: true } : { checked: false})}

              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setFeedbackArray(['미답변', '답변완료']);
                } else {
                  setFeedbackArray([]);
                }
              }}

            />

            <Checkbox
              label="미답변"
              checked={feedbackArray.includes('미답변')}
              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setFeedbackArray([...feedbackArray, '미답변']);
                } else {
                  setFeedbackArray(feedbackArray.filter((item) => item !== '미답변'));
                }
              }}
            />

            <Checkbox
              label="답변완료"
              checked={feedbackArray.includes('답변완료')}
              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setFeedbackArray([...feedbackArray, '답변완료']);
                } else {
                  setFeedbackArray(feedbackArray.filter((item) => item !== '답변완료'));
                }
              }}

            />


            {/*
            <div className=' flex flex-wrap items-center justify-start gap-3'>
              <Radio
                name="feedback"
                label="전체"
                value="all"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
              />
              <Radio
                name="feedback"
                label="미답변"
                value="noAnswer"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                //helperText="Notify me for all reminders."
              />
              <Radio
                name="feedback"
                label="답변완료"
                value="answerComplete"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                //helperText="Notify me for all reminders."
              />
            </div>
            */}

          </div>
        </RadioGroup>

        </div>




      </div>



      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7 ')}
      >



        {/* totalItems */}
        
        <div className=" mt-7 flex flex-row items-center justify-between pt-5 border-t  border-slate-300 dark:border-slate-700">

          <div className="flex flex-row items-center justify-start gap-3">
            <div className="text-base font-medium text-gray-900 dark:text-gray-100">
              총 {totalItems}개
            </div>
          </div>

          {/* reload button */}

          {/*
          <Button
            className='w-24 bg-gray-200 text-black '
            onClick = {() => {
              
              ///handleSearch('');
              // reload

              //handleSearch (searchTerm);


            } }
          >
            새로고침
          </Button>
          */}

        
          

        </div>



        <ControlledTable

          showLoadingText={false}

          isLoading={isLoading}

          data={tableData}

          columns={visibleColumns}

          scroll={scroll}
          sticky={sticky}
          
          //variant={variant}
          variant='modern'

          className="mt-6"

          {...(enablePagination && {
            
            /*
            paginatorOptions: {
              pageSize,
              ...(setPageSize && { setPageSize }),
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },
            */

            paginatorOptions: {
              pageSize,
              setPageSize,
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },


            paginatorClassName: cn(
              'mt-4 lg:mt-5',
              noGutter && 'px-5 lg:px-7',
              paginatorClassName
            ),
          })}




          onHeaderRow={(column: any) => {
            return {
              onClick: () => {
                //console.log('column', column);
                //alert(column.name);
              },
            };
          } }


        />
      </div>


    </WidgetCard>
    
  );
}
