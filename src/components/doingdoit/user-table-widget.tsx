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

import TableFooter from '@/app/shared/table-footer';

import { exportToCSV } from '@/utils/export-to-csv';


import { RadioGroup } from '@/components/ui/radio-group';

import { Radio } from '@/components/ui/radio';


import { useTable } from '@/hooks/doingdoit/use-table-user';


import { filter } from 'lodash';
import { u } from 'uploadthing/dist/types-e8f81bbc';


import { Title, Text } from '@/components/ui/text';

import { Checkbox } from '@/components/ui/checkbox';

import * as XLSX from "xlsx";

import { PiMagnifyingGlassBold, PiDownloadSimpleBold } from 'react-icons/pi';



import { useSearchParams, useRouter } from 'next/navigation';
import { url } from 'inspector';
import { ro } from '@faker-js/faker';





type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  checkedItems?: string[];
  handleSelectAll?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
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



export default function UserTableWidget({

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


  const paramRegTypeArray = searchParams.get('paramRegTypeArray')
    || "email,kakao,naver,google";
  



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
    new Date(paramEndDate as string)
  );

  /* collection of regType */
  const [regTypeArray, setRegTypeArray] = useState(
   [
    ...(paramRegTypeArray as string)?.split(',')
   ]
  );
 





  const onHeaderCellClick = (value: string) => ({

    onClick: () => {
      handleSort(value);
    },

  });



  const onDeleteItem = (id: string) => {

    handleDelete(id);

  };


  ///const [value, setValue] = useState('all');



   /*
  useEffect(() => {

    updateFilter('regType', regType);

  } , [regType, updateFilter]);
  */


     


  /*
  const handleSearch = (searchValue: string) => {
      setSearchTerm(searchValue);
  }
  */

  const handlePaginate = (page: number) => {
    setCurrentPage(page);
  };
 

  
  const handlePageSize = (pageSize: number) => {

    console.log('pageSize', pageSize);

    setCurrentPage(1);
    setPageSize(pageSize);
  };


  const {
    isLoading,
    sortConfig,
    totalItems,
    tableData,

    //currentPage,
    
    ///searchTerm,

 

    handleSort,
    handleDelete,
    
    handleSearch,

    //handlePaginate,
    
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,

    // filters
    filters,
    updateFilter,
    applyFilters,

    // regType

   

  } = useTable(

    data,
    pageSize,

    currentPage,

    searchTerm,

    //   initialFilterState?: Partial<Record<string, any>>,

    {},

    regTypeArray,

    startDate.toISOString(),

    endDate.toISOString(),



  );



  //handleSearch(paramSearchTerm as string);

  //handlePaginate(parseInt(paramCurrentPage as string));


    /*
  useEffect(() => {

    handlePaginate(1);

  

  }, [searchTerm, pageSize, sortConfig, startDate, endDate]);

  */

  /*
  useEffect(() => {

      
      handlePaginate(1);
  
  }, [pageSize, ]);
  */



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


  useEffect(() => {

    router.push(

      // url encoding for url query string

      "/user/member?paramSearchTerm=" + searchTerm
      + "&paramPageSize=" + pageSize
      + "&paramCurrentPage=" + currentPage
      + "&paramSortConfigKey=" + sortConfig.key
      + "&paramSortConfigDirection=" + sortConfig.direction
      + "&paramStartDate=" + startDate.toISOString()
      + "&paramEndDate=" + endDate.toISOString()

      + "&paramRegTypeArray=" + regTypeArray.join(',')
      
    ) 

  } , [
    searchTerm, pageSize, currentPage, startDate, endDate, sortConfig.key, sortConfig.direction
    , regTypeArray
    , router

  ]);

 
  /*
  useEffect(() => {

    setCurrentPage(1);

  } , [searchTerm, pageSize, startDate, endDate, regTypeArray]);
  */
      


 




  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = async (fileName: string) => {

    setIsExporting(true);
    

      const res = await fetch('/api/doingdoit/user/getAllForDownload', {
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
          regTypeArray: regTypeArray,

          }),
      });



      const posts  = await res?.json() as any;

   

 

      
    const items = posts.data as any[];

    console.log('items', items);


      

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

        //'회원번호': id,


        'No': rest.sequenceNumber,

        '가입일시': new Date(rest.createdAt).toLocaleString(),
        '이메일': rest.email,
        '닉네임': rest.nickname,
        '가입유형': rest.regType === 'email' ? '이메일' : rest.regType === 'kakao' ? '카카오' : rest.regType === 'naver' ? '네이버' : rest.regType === 'google' ? '구글' : '기타',
        '생년월일': rest.birthDate,
        '셩별': rest.gender,
        '휴대전화': rest.mobile,
        '식단기록 목적': rest.purpose,
        '키': rest.height,
        '몸무게': rest.weight,
        

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
      className={cn(' flex flex-col  ', className)}
      headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      
      {...(enableSearch && {
        action: (

         
            <div className=' flex flex-col items-start justify-center gap-3'>

              {/*
              <div className=' flex flex-row items-center justify-between gap-3'>

                <div className='flex flex-row items-center justify-center gap-3'>
                  가입일시
                </div>
              
                <DatePicker
                  selected={startDate}
                  onChange={        
                    (date: Date) => {

                      setCurrentPage(1);

                      setStartDate(date);
                    }
                  }

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
                  onChange={
                    (date: Date) =>{

                      setCurrentPage(1);

                      setEndDate(date)
                    }
                  }
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

                      setCurrentPage(1);

                      handleSearch('')

                    }
                  }
                
                  onChange={(event) => {

                    setCurrentPage(1);
                    handleSearch(event.target.value)

                  } }
                  clearable

                  prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
                />

                <Button
                  // excel download
                  isLoading={isExporting}
                  onClick={() => {
                    //alert('엑셀다운로드');
                    console.log('엑셀다운로드');

                    ///exportToCSV(tableData, 'feed_data');

                    exportToCSV('user_data');

                  }}

                  className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
                  <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
                  엑셀다운로드
                </Button>

              </div>



              <div className='flex flex-wrap items-center justify-center gap-5'>

    
                <div className='flex flex-row items-center justify-center gap-3'>
                  가입유형
                </div>

                <Checkbox
                  label="전체"


                  {...(regTypeArray.includes('email') && regTypeArray.includes('kakao') && regTypeArray.includes('naver') && regTypeArray.includes('google') ? { checked: true } : { checked: false})}

                  onChange={(event) => {

                    setCurrentPage(1);

                    if (event.target.checked) {
                      setRegTypeArray(['email', 'kakao', 'naver', 'google']);
                    } else {
                      setRegTypeArray([]);
                    }

                   

                  }}

                />

                <Checkbox
                  label="이메일"

                  {...(regTypeArray.includes('email') ? { checked: true } : { checked: false})}

                  onChange={(event) => {

                    setCurrentPage(1);

                    if (event.target.checked) {
                      setRegTypeArray([...regTypeArray, 'email']);
                    } else {
                      setRegTypeArray(regTypeArray.filter((item) => item !== 'email'));
                    }
                  }}
                />

                <Checkbox
                  label="카카오"

                  {...(regTypeArray.includes('kakao') ? { checked: true } : { checked: false})}

                  onChange={(event) => {

                    setCurrentPage(1);

                    if (event.target.checked) {
                      setRegTypeArray([...regTypeArray, 'kakao']);
                    } else {
                      setRegTypeArray(regTypeArray.filter((item) => item !== 'kakao'));
                    }
                  }}
                />

                <Checkbox
                  label="네이버"

                  {...(regTypeArray.includes('naver') ? { checked: true } : { checked: false})}

                  onChange={(event) => {

                    setCurrentPage(1);

                    if (event.target.checked) {
                      setRegTypeArray([...regTypeArray, 'naver']);
                    } else {
                      setRegTypeArray(regTypeArray.filter((item) => item !== 'naver'));
                    }
                  }}
                />

                <Checkbox
                  label="구글"

                  {...(regTypeArray.includes('google') ? { checked: true } : { checked: false})}

                  onChange={(event) => {

                    setCurrentPage(1);

                    if (event.target.checked) {
                      setRegTypeArray([...regTypeArray, 'google']);
                    } else {
                      setRegTypeArray(regTypeArray.filter((item) => item !== 'google'));
                    }
                  }}
                />


              </div>
              */}

            </div> 

            

        ),

      })}

    >



      <div className=' flex flex-col items-start justify-center gap-3'>


        <div className='w-full flex flex-row items-center justify-between gap-3'>

          <div className='flex flex-row items-center justify-center gap-3'>

            <div className='flex flex-row items-center justify-center gap-3'>
              가입일시
            </div>

            <DatePicker
              selected={startDate}
              onChange={        
                (date: Date) => {

                  setCurrentPage(1);

                  setStartDate(date);
                }
              }

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
              onChange={
                (date: Date) =>{

                  setCurrentPage(1);

                  setEndDate(date)
                }
              }
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
                setRegTypeArray(['email', 'kakao', 'naver', 'google']);

                handleSearch(
                  '',
                  10,
                  1,
                  new Date( new Date().getFullYear(), new Date().getMonth(), 1 ),
                  new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ),
                  ['email', 'kakao', 'naver', 'google'],
                );

                //setPointTypeArray(pointTypeArrayDefault);
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
                  regTypeArray,
                );
              }}
              className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <CiSearch className="me-1.5 h-[17px] w-[17px]" />
              검색
            </Button>




          </div>

          <Button
            // excel download
            isLoading={isExporting}
            onClick={() => {
              //alert('엑셀다운로드');
              console.log('엑셀다운로드');

              ///exportToCSV(tableData, 'feed_data');

              exportToCSV('user_data');

            }}

            className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            엑셀다운로드
          </Button>

        </div>



        <div className='flex flex-wrap items-center justify-center gap-5'>

          {/* 가입유형 checkbox */}
          {/* 전체, 이메일, 카카오, 네이버, 구글 */}
          {/* icheck 전체 if  check 이메일 and check 카카오 and check 네이버 and check 구글 */}

          <div className='flex flex-row items-center justify-center gap-3'>
            가입유형
          </div>

          <Checkbox
            label="전체"


            {...(regTypeArray.includes('email') && regTypeArray.includes('kakao') && regTypeArray.includes('naver') && regTypeArray.includes('google') ? { checked: true } : { checked: false})}

            onChange={(event) => {

              setCurrentPage(1);

              if (event.target.checked) {
                setRegTypeArray(['email', 'kakao', 'naver', 'google']);
              } else {
                setRegTypeArray([]);
              }

            

            }}

          />

          <Checkbox
            label="이메일"

            {...(regTypeArray.includes('email') ? { checked: true } : { checked: false})}

            onChange={(event) => {

              setCurrentPage(1);

              if (event.target.checked) {
                setRegTypeArray([...regTypeArray, 'email']);
              } else {
                setRegTypeArray(regTypeArray.filter((item) => item !== 'email'));
              }
            }}
          />

          <Checkbox
            label="카카오"

            {...(regTypeArray.includes('kakao') ? { checked: true } : { checked: false})}

            onChange={(event) => {

              setCurrentPage(1);

              if (event.target.checked) {
                setRegTypeArray([...regTypeArray, 'kakao']);
              } else {
                setRegTypeArray(regTypeArray.filter((item) => item !== 'kakao'));
              }
            }}
          />

          <Checkbox
            label="네이버"

            {...(regTypeArray.includes('naver') ? { checked: true } : { checked: false})}

            onChange={(event) => {

              setCurrentPage(1);

              if (event.target.checked) {
                setRegTypeArray([...regTypeArray, 'naver']);
              } else {
                setRegTypeArray(regTypeArray.filter((item) => item !== 'naver'));
              }
            }}
          />

          <Checkbox
            label="구글"

            {...(regTypeArray.includes('google') ? { checked: true } : { checked: false})}

            onChange={(event) => {

              setCurrentPage(1);

              if (event.target.checked) {
                setRegTypeArray([...regTypeArray, 'google']);
              } else {
                setRegTypeArray(regTypeArray.filter((item) => item !== 'google'));
              }
            }}
          />


        </div>


      </div>

      
      <div className={cn('table-wrapper flex-grow ', noGutter && '-mx-5 lg:-mx-7 ')} >
        
        {/* totalItems */}
        
        <div className=" mt-7 flex flex-row items-center justify-between pt-5 border-t  border-slate-300 dark:border-slate-700">

          <div className="flex flex-row items-center justify-start gap-3">
            <Text as="p" className="text-sm font-semibold text-gray-900 lg:text-base">
              총 {totalItems}개
            </Text>
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
          
          variant={variant}
          ////////////variant='modern'

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

              //handlePageSize,

              ///setPageSize: handlePageSize,

              ///setPageSize,

              //setPageSize: (pageSize: number) => setPageSize(pageSize),




              total: totalItems,

              current: currentPage,

              onChange: (
                page: number,
              ) => {

                console.log('page======', page);

                handlePaginate(page);

              },
            },


            paginatorClassName: cn(
              'mt-4 lg:mt-5',
              noGutter && 'px-5 lg:px-7',
              paginatorClassName
            ),
          })}

        />
      </div>

    </WidgetCard>
    
  );
}
