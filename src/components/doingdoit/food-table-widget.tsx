'use client';

import React, { useState, useEffect, use } from 'react';
import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';


import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import cn from '@/utils/class-names';

import DateFiled from '@/components/controlled-table/date-field';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';

import { DatePicker } from '@/components/ui/datepicker';

import { Button } from '@/components/ui/button';

import { CiSearch } from "react-icons/ci";


/////import { exportToCSV } from '@/utils/export-to-csv';


import { Modal } from '@/components/ui/modal';
import FollowerModal from '@/app/shared/profile/follower-modal';

//////import { postData, followersData, followingData } from '@/data/profile-data';


import { Badge } from '@/components/ui/badge';
import PostFeed from '@/app/shared/profile/post-feed';

import { Title, Text } from '@/components/ui/text';


import {
  useDrawer,
  type DrawerPlacements,
} from '@/app/shared/drawer-views/use-drawer';

import UserProfile from '@/app/shared-doingdoit/feed/user-profile';


import { useTable } from '@/hooks/doingdoit/use-table-food';


import dynamic from 'next/dynamic';


import { PiMagnifyingGlassBold, PiDownloadSimpleBold, PiUploadSimpleBold } from 'react-icons/pi';

import { useRouter, useSearchParams } from "next/navigation";

import * as XLSX from "xlsx";

import { Checkbox } from '@/components/ui/checkbox';
import { on } from 'events';
import { set } from 'lodash';
import { de } from '@faker-js/faker';



import Image from "next/image";


import { PieChart, Pie, Cell, ResponsiveContainer, Label, Legend } from 'recharts';
import { u } from 'uploadthing/dist/types-e8f81bbc';


import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';


//import TableFooter from '@/app/shared/table-footer';

const TableFooter = dynamic(() => import('@/app/shared-doingdoit/table-footer'), {
  ssr: false,
});



const filterState = {
  amount: ['', ''],
  createdAt: [null, null],
  dueDate: [null, null],
  status: '',
};




type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  checkedItems?: string[];
  handleSelectAll?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;

  onChecked?: (id: string) => void;

  onClickUser: (id: string) => void; // user profile
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

    onClickUser, // user profile
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






const modalData = {
  title: '',
  description: '',
  data: [],
};


export default function FoodTableWidget({

  title,

  ///data = [],
  ///data,

  data =  [],



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




 
  const [openCloseConfirmModal, setOpenCloseConfirmModal] = useState(false);




  const { openDrawer } = useDrawer();






  //const [pageSize, setPageSize] = useState(10);



  const [open, setOpen] = useState(false);

  const [ foodPercentage, setFoodPercentage ] = useState(
    [] as
    {
      name: string;
      value: number;
      color: string;
    }[]
  );



  const [selectedFoodName, setSelectedFoodName] = useState(''); 

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
  


  const [selectedFoodCode, setSelectedFoodCode] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const fetchData = async () => {

      if (!selectedFoodCode || selectedFoodCode === '') return;


      setLoading(true);

      // call api
      const res = await fetch(`/api/doingdoit/food/getOne?_foodCode=${selectedFoodCode}`);

      const data = await res?.json() as any;

      
      ///console.log("selected food ====>", data.data);

      /*
      console.log("fat ====>", data.data?.fat);
      console.log("protein ====>", data.data?.protein);
      console.log("carbohydrate ====>", data.data?.carbohydrate);
      */


      setSelectedFoodName(data.data?.foodName);

      setKcal(parseFloat(data.data?.kcal === '-' ? '0' : data.data?.kcal));


      setSaturatedfat(parseFloat(data.data?.fat === '-' ? '0' : data.data?.fat));
      setSugar(parseFloat(data.data?.protein === '-' ? '0' : data.data?.protein));
      setSalt(parseFloat(data.data?.carbohydrate === '-' ? '0' : data.data?.carbohydrate));
      setCholesterol(parseFloat(data.data?.cholesterol === '-' ? '0' : data.data?.cholesterol));
  
      

  

      const total = parseFloat(data.data?.fat === '-' ? '0' : data.data?.fat) + parseFloat(data.data?.protein === '-' ? '0' : data.data?.protein) + parseFloat(data.data?.carbohydrate === '-' ? '0' : data.data?.carbohydrate);


      setFoodPercentage([


        data.data?.fat !== '-' && data.data?.fat !== '0' && data.data?.fat !== 0 ?
        {
          name: '지방',
          value:
          // float point 2 digits 
          parseFloat((parseFloat(data.data?.fat === '-' ? '0' : data.data?.fat) / total * 100).toFixed(2)),
          color: '#FFC38B'
        } : 
        {
          name: '지방',
          value: 0,
          color: '#FFFFFF'
        },

        /*
        {
          name: '단백질',
          value:
          // float point 2 digits 
          parseFloat((parseFloat(data.data?.protein === '-' ? '0' : data.data?.protein) / total * 100).toFixed(2)),
          

          color: '#FF968D'
        },
        */

        data.data?.protein !== '-' && data.data?.protein !== '0' && data.data?.protein !== 0 ?
        {
          name: '단백질',
          value:
          // float point 2 digits 
          parseFloat((parseFloat(data.data?.protein === '-' ? '0' : data.data?.protein) / total * 100).toFixed(2)),
          color: '#FF968D'
        } : 
        {
          name: '단백질',
          value: 0,
          color: '#FFFFFF'
        },



        /*
        {
          name: '탄수화물',
          value:
          // float point 2 digits
          parseFloat((parseFloat(data.data?.carbohydrate === '-' ? '0' : data.data?.carbohydrate) / total * 100).toFixed(2)),
          color: '#7CD7FA'
        },
        */

        data.data?.carbohydrate !== '-' && data.data?.carbohydrate !== '0' && data.data?.carbohydrate !== 0 ?
        {
          name: '탄수화물',
          value:
          // float point 2 digits
          parseFloat((parseFloat(data.data?.carbohydrate === '-' ? '0' : data.data?.carbohydrate) / total * 100).toFixed(2)),
          color: '#7CD7FA'
        } : 
        {
          name: '탄수화물',
          value: 0,
          color: '#FFFFFF'
        },


      ]);

      setLoading(false);

    }



    fetchData();

  } , [selectedFoodCode]);




  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {

    //handleDelete(id);

    handleDelete([id]);
    

    /* popup modal delete item completed */
    //alert('삭제되었습니다.');

    //setOpen(true);
    //modalData.description = '삭제되었습니다.';

  };


  //placement='right'
  //modalView={<UserProfile />}

  const onClickUser = (id: string) => {

    /*
    openDrawer({
        view: <UserProfile id={id} />,
        placement: 'right',
    });
    */


    console.log('id', id);

    const foodCode = id;

    setSelectedFoodCode(foodCode);
    // open modal
    setOpen(true);

  };


  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
  const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));



  const [foodTypeArray, setFoodTypeArray ] = useState<string[]>([]);
    

  const [searchTerm, setSearchTerm] = useState('');


    
  const [pageSize, setPageSize] = useState(10);
  


  const [currentPage, setCurrentPage] = useState(1);



  const handlePaginate = (page: number) => {
    setCurrentPage(page);
  };

  

  const {
    isLoading,
    isFiltered,
    tableData,
    //currentPage,
    totalItems,
    
    //handlePaginate,

    filters,
    updateFilter,
    
    //searchTerm,

    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    
    
    handleRowSelect,


    handleSelectAll,
    handleDelete,
    handleReset,

    handleDeleteAll,

    foodType,

  } = useTable(
    data,
    
    pageSize,

    currentPage,

    searchTerm,

    //   initialFilterState?: Partial<Record<string, any>>,

    {},

    startDate.toISOString(),
    endDate.toISOString(),


    filterState,
    foodTypeArray,

  );


  ///console.log('foodType====', foodType);

  /*
  if (foodType.length > 0) {

    if (foodTypeArray.length === 0) {
      setFoodTypeArray(foodType);
    }

  }
  */
  useEffect(() => {
      
      if (foodType.length > 0) {
  
        if (foodTypeArray.length === 0) {
          setFoodTypeArray(foodType);
        }
    
      }
  
    }
  , [foodType.length]);



  ///console.log('sortConfig=========', sortConfig);



  // fetch foodType from api
  /*
  useEffect(() => {

    const fetchData = async () => {

      const res = await fetch(`/api/doingdoit/food/getFoodType`);
      const data = await res?.json() as any;

      console.log('getFoodType data.data', data.data);

      ///setFoodTypeData(data.data);

      ///setFoodType(data.data);

      

      setFoodTypeArray(data.data);
      

    }

    fetchData();

  }, [
    startDate,
    endDate,
  ]);
  */

 

  
  //setFoodTypeArray(foodType);






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

        onClickUser, // user profile
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

      onClickUser, // user profile
    ]
  );





  const { visibleColumns } = useColumn(columns);

 
  const isMediumScreen = true;



  const router = useRouter();



  const [isExporting, setIsExporting] = useState(false);  // 엑셀다운로드

  const exportToCSV = async (fileName: string) => {

    
    setIsExporting(true);

      ///const res = await fetch(`/api/doingdoit/feed/getAllForDownload?_limit=${1000}&_page=${1}&_sort=${'mealDate'}&_order=${'desc'}&_q=${''}`);

      ////const res = await fetch(`/api/doingdoit/food/getAllForDownload?_sort=${'createdAt'}&_order=${'desc'}&_q=${''}&_foodTypeArray=${foodTypeArray}&_startDate=${startDate}&_endDate=${endDate}`);
      
      const res = await fetch('/api/doingdoit/food/getAllForDownload', {
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
          foodTypeArray: foodTypeArray,

          }),
      });


      const posts  = await res?.json() as any;

  
      ////console.log('posts', posts);



      /*
 {
    "id": 19342,
    "foodCode": "D018903",
    "foodCategory": "음식",
    "foodName": "<구구스>사천마라탕",
    "foodGroup": "국 및 탕류",
    "quality": "100",
    "kcal": "133",
    "carbohydrate": "14",
    "protein": "8",
    "fat": "5",
    "salt": "569",
    "saturatedfat": "1.7",
    "cholesterol": "11",
    "sugar": "3",
    "publisher": "식품의약품안전처",
    "createdAt": "2024-02-21T17:14:10.000Z",
    "updatedAt": "2024-02-21T17:14:10.000Z"
}
      */

      
    const items = posts.data as any[];

    ////console.log('items', items);


   
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';



    const formattedData  = [] as any[];

    items.map((item, index ) => {

      const { id, ...rest } = item;


      ///console.log('rest', rest);

      formattedData.push({

        '식품코드': rest.foodCode,
        '식품군': rest.foodGroup,
        '식품명': rest.foodName,
        '식품대분류': rest.foodCategory,
        '칼로리': rest.kcal,
        '탄수화물': rest.carbohydrate,
        '단백질': rest.protein,
        '지방': rest.fat,
        '나트륨': rest.salt,
        '포화지방': rest.saturatedfat,
        '콜레스테롤': rest.cholesterol,
        '당': rest.sugar,
        '발행기관': rest.publisher,






        //'No': id,

        /*
        'No': totalItems && totalItems > 0 ? totalItems - index : index + 1,

        '작성자 닉네임': rest.nickname,
        '식사일자': rest.mealDate,
        '식사시간': rest.mealTime,
        '내용': rest.feedContent,
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
        */


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
      
      
    alert('엑셀다운로드 완료');


  }











  return (

    <WidgetCard
      title={title}
      className={cn('flex flex-col  ', className)}
      headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      
      {...(enableSearch && {
        action: (

          

          <div className=' flex flex-col items-start justify-center gap-5 '>

              <div className='w-full flex flex-row items-center justify-end gap-3'>
                <Button

                  className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                  onClick={() => {
                    // go to /setup/food/import
                    router.push('/setup/food/import');
                  } }

                >
                  <PiUploadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
                  DB업로드
                </Button>


              
                <Button

                  isLoading={isExporting}

                  // excel download
                  onClick={() => {
                    //alert('엑셀다운로드');
                    console.log('엑셀다운로드');

                    ///exportToCSV(tableData, 'food_data');

                    exportToCSV('food_data');

                  }}

                  className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
                  <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
                  엑셀다운로드
                </Button>
              </div>


            <div className=' flex flex-wrap items-center justify-between gap-3'>


              <div className=' flex flex-wrap items-center justify-center gap-3'>

                <div className=' flex flex-row items-center justify-center gap-3'>
                  등록일자
                </div>
              
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}

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
                  onChange={(date: Date) => setEndDate(date)}
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
                  //onClear={() => handleSearch('')}
                    
                 // onChange={(event) => handleSearch(event.target.value)}
                 
                 onChange={(event) => {

                  //setCurrentPage(1);
                  //handleSearch(event.target.value)
  
                  setSearchTerm(event.target.value);
  
                } }

                 // clearable
                  prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
                  className=' w-60 '
                />




                <Button
                  onClick={() => {
                    setStartDate(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
                    setEndDate(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
                    
                    
                    setSearchTerm('');
                    setCurrentPage(1);
                    setPageSize(10);

                    

                    setFoodTypeArray(foodType);

                    handleSearch(
                      '',
                      10,
                      1,
                      new Date( new Date().getFullYear(), new Date().getMonth(), 1 ),
                      new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ),

                      foodTypeArray,
                    );
                    

                  }}
                  className="w-24 bg-gray-200 text-black "
                >
                  초기화
                </Button>

                <Button
                  onClick={() => {
                    
                    handleSearch(
                      searchTerm,
                      pageSize,
                      currentPage,
                      startDate,
                      endDate,
                      foodTypeArray,
                    );
                    
                  }}
                  className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                >
                  <CiSearch className="me-1.5 h-[17px] w-[17px]" />
                  검색
                </Button>


              </div>



 
            </div>


            <div className='mt-5 flex flex-row items-center justify-center gap-5'>

              {/* checkbox */}
              
              <div className=' w-20 flex flex-row items-center justify-center gap-3'>
                대분류
              </div>

              <div className='grid grid-cols-7 items-center justify-center gap-3'>
                <Checkbox
                  label="전체"
                  {
                    ...(
                      //foodTypeArray.includes('국 및 탕류') && foodTypeArray.includes('밥류') && foodTypeArray.includes('볶음류') && foodTypeArray.includes('찌개 및 전골류') && foodTypeArray.includes('빵류') && foodTypeArray.includes('면 및 만두류') && foodTypeArray.includes('튀김류') && foodTypeArray.includes('회류') && foodTypeArray.includes('찜류') && foodTypeArray.includes('곡류 및 서류') && foodTypeArray.includes('생채및 무침류') && foodTypeArray.includes('김치류') && foodTypeArray.includes('숙채류') && foodTypeArray.includes('기타') ? { checked: true } : { checked: false}
                      
                      foodTypeArray.length === foodType.length ? { checked: true } : { checked: false }

                    )
                  }

                  onChange={(e) => {

                    if (e.target.checked) {
                      setFoodTypeArray(foodType);
                    } else {
                      setFoodTypeArray([]);
                    }

                  }}
                />

                {
                  foodType.map((type, index) => {
                    return (
                      <Checkbox
                        key={index}
                        label={type}
                        checked={foodTypeArray.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFoodTypeArray((prev) => [...prev, type]);
                          } else {
                            setFoodTypeArray((prev) => prev.filter((item) => item !== type));
                          }
                        }}
                      />
                    );
                  })
                }

              </div>

            </div>

          </div>

        ),

      })}

    >


      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7 ')}
      >





      {/* total items */}

      <div className=" mt-7 flex flex-row items-center justify-start pt-5 gap-3 border-t  border-slate-300 dark:border-slate-700">

        <div className=" flex flex-row items-center justify-center">
          <Text as="p" className="text-sm font-semibold text-gray-900 lg:text-base">
            총 {totalItems}개
          </Text>
        </div>



        <div className=" flex flex-row items-center justify-center gap-5
          bg-gray-100 dark:bg-gray-800  pl-3 pr-3 pt-3 pb-3 rounded-md
        ">

        <div className="flex flex-row items-center justify-center gap-3">
          <TableFooter

            checkedItems={
              selectedRowKeys
            }

            

            handleDelete={(ids: string[]) => {

              console.log('ids=======', ids);




              if (ids.length === 0) {
                alert('삭제할 항목을 선택해주세요.');
                return;
              }

              setSelectedRowKeys([]);
              handleDelete(ids);
              
              //setOpen(true);
              //modalData.description = '삭제되었습니다.';
              ////alert('삭제되었습니다.');

            }}

            // don't hide
            


          />
        </div>


        {/* 전체 삭제하기 */}

        <div className=" flex flex-row items-center justify-center gap-3">

  

          <Button
            type="button"
            isLoading={isLoading}
            size="sm"
            className="dark:bg-gray-100 dark:text-gray-800"

            disabled={isLoading}

            onClick={() => {

              if (totalItems === 0) {
                alert('삭제할 항목이 없습니다.');
                return;
              }

    

              setOpenCloseConfirmModal(true);

             



            }}
          >
            전체 삭제하기
          </Button>

        </div>


        </div>


        {/*
        등록순/식품코드순/식품명순
        circle button
        */}

        <div className="m-10 flex flex-row items-center justify-center gap-3">

          <RadioGroup

            value={sortConfig.key}
            setValue={
              (value) => {
                handleSort(
                  value as string
                );
              }
            }
          >

            <div className="flex flex-row items-center justify-center gap-3">

              {/*
                                    <Radio
                        size='lg'
                        name="diet"
                        label="좋음"
                        value="좋음"
                        labelClassName="pl-2 "
                        checked={feedbackScore == '좋음' ? true : false}
                      />
              */}
              <Radio
                size='lg'
                name="sort"
                label="등록순"
                value="createdAt"
                labelClassName="pl-2 "
                checked={sortConfig.key === 'createdAt' ? true : false}
              />

              <Radio
                size='lg'
                name="sort"
                label="식품코드순"
                value="foodCode"
                labelClassName="pl-2 "
                checked={sortConfig.key === 'foodCode' ? true : false}
              />

              <Radio
                size='lg'
                name="sort"
                label="식품명순"
                value="foodName"
                labelClassName="pl-2 "
                checked={sortConfig.key === 'foodName' ? true : false}
              />
            </div>

          </RadioGroup>


        </div>




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

          className="mt-2"



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


          /*
          tableFooter={
          
            <TableFooter

              checkedItems={
                selectedRowKeys
              }

              handleDelete={(ids: string[]) => {

                setSelectedRowKeys([]);
                handleDelete(ids);
                
                setOpen(true);
                modalData.description = '삭제되었습니다.';

              }}

             
            >
    

            </TableFooter>
          }
          */


        />
      </div>


      {/* modal view */}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          //setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
      >
        <div className="flex flex-col items-center justify-center gap-10 m-5">
            {/*
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
          */}

            {modalData.description && (
              <div className="">
                <Text
                  as="p"
                  className="text-base font-semibold text-gray-900 xl:text-lg"
                >
                  {modalData.description}
                </Text>
              </div>
            )}

              {/*
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
            */}
            {/* close button */}
            <Button
              size="lg"
              color="primary"
              className='flex items-center space-x-2'
              onClick={() => {
                setOpen(false);
                //setActive(() => 'posts');
              }}
            >
              닫기
            </Button>

          
        </div>

              {/*
        {modalData && <FollowerModal data={modalData.data} />}
              */}
      </Modal>






      {/* modal view */}
      <Modal
        isOpen={openCloseConfirmModal}
        onClose={() => {
          setOpenCloseConfirmModal(false);

          //setOpen(false);
          //setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"

        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-xl p-5 "
      >

        <div className="flex flex-col items-center justify-center gap-10 m-5">
            
      
              <div className="">
                <Text
                  as="p"
                  className="text-sm text-gray-900 xl:text-lg"
                >
                
                  정말로 삭제하시겠습니까?

                </Text>
              </div>
            


            <div className="flex flex-row items-center justify-center gap-5">

              {/* close button */}
              <Button
                ///size="lg"

                // rounded

                size="xl"


                
                className='text-white bg-grey-9 rounded-xl w-28 h-12 flex items-center justify-center'
                onClick={() => {

                  setSelectedRowKeys([]);
                  handleDeleteAll();

                  setOpenCloseConfirmModal(false);


                }}
              >
                예
              </Button>

              {/* 확인 button */}
              <Button
                size="lg"
              
                className='text-white bg-dark rounded-xl w-28 h-12 flex items-center justify-center'
                onClick={() => {
                  setOpenCloseConfirmModal(false);
                  //setActive(() => 'posts');

                  // api call


                }}
              >
                아니오
              </Button>
            </div>

          
        </div>

              {/*
        {modalData && <FollowerModal data={modalData.data} />}
              */}
      </Modal>









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
        containerClassName="dark:bg-gray-100 max-w-[620px] max-h-[700px] rounded-md pt-5 pb-5 lg:p-6"
      >

          {/* close button position is top-right in modal view */}

          <div className=" flex flex-row items-center justify-end gap-[20px] pr-5">
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

     
        <div className="flex flex-col items-center justify-center gap-5 m-5">

          <div className="self-stretch flex flex-col items-center justify-center  text-center text-xl xl:text-2xl text-dark font-menu-off">
            <div className="self-stretch relative font-extrabold leading-10 ">
              {selectedFoodCode}
            </div>      
            <div className="self-stretch relative font-extrabold leading-10 ">
              {selectedFoodName}
            </div>


            <div className="mx-auto w-full  "> 

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

                    //innerRadius={50}
                    //outerRadius={80}

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
                      

                      // if right or left side, change textAnchor and more upper or lower

                      //const x =   midAngle > 180 ? cx + radius * Math.cos(-midAngle * RADIAN) : cx + radius * Math.cos(-midAngle * RADIAN);
                      //const y =   midAngle > 180 ? cy + radius * Math.sin(-midAngle * RADIAN) : cy + radius * Math.sin(-midAngle * RADIAN);


                      
                      

                      



                      return (

                        // if value is 0, don't show label
                        value === 0 ? null : (
                      
                          <>
                            <text
                              
                              className='text-3xs xl:text-sm font-semibold text-black'
                              // text color
                              fill='#000000'
                              //fill="#8884d8"

                              x={x}
                              y={y-9}
                              
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                            >

                              {foodPercentage[index]?.name}
                              
                            </text>
                            <text
      
                              className='text-3xs xl:text-sm font-semibold text-black'
                              // text color
                              fill='#000000'
                              //fill="#8884d8"

                              x={x}
                              y={y+9}
                              
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                            >

                              
                              ({value}%)
                            </text>
                          </>

                        )


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



            <div className="mt-10  flex flex-row items-center justify-center gap-5 text-base text-white">
              
              <button
                className="bg-dark rounded-lg p-3"
                onClick={() => {
                  setOpen(false);
                  //setActive(() => 'posts');
                } }
                
              >
                닫기
              </button>


            </div>
          </div>
          

          
        </div>

        


              
      </Modal>

    </WidgetCard>

    
  );
}
