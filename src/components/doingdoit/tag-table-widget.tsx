'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';

import { PiMagnifyingGlassBold } from 'react-icons/pi';



import { useColumn } from '@/hooks/use-column';

import ControlledTable from '@/components/controlled-table';

///import ControlledTable from '@/components/doingdoit/controlled-table';





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


import { useTable } from '@/hooks/doingdoit/use-table-tag';


import { filter } from 'lodash';
import { u } from 'uploadthing/dist/types-e8f81bbc';


import { Checkbox } from '@/components/ui/checkbox';

import * as XLSX from "xlsx";
import { on } from 'events';


type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  checkedItems?: string[];
  handleSelectAll?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;

  onIncrementOrderNumber?: (id: string) => void;

  onDecrementOrderNumber?: (id: string) => void;

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

    onIncrementOrderNumber,

    onDecrementOrderNumber,

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



export default function TagTableWidget({

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
  



  const [pageSize, setPageSize] = useState(10);




  const onHeaderCellClick = (value: string) => ({

    onClick: () => {
      handleSort(value);
    },

  });



  const onDeleteItem = (id: string) => {

    handleDelete(id);

  };



  const onIncrementOrderNumber = (id: string) => { 
    console.log('onIncrementOrderNumber: ', id);

    handleIncrementOrderNumber(id);
    

  }

  const onDecrementOrderNumber = (id: string) => { 
    console.log('onDecrementOrderNumber: ', id);

    handleDecrementOrderNumber(id);

  }









 ///const [value, setValue] = useState('all');

 const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
 const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));


 /* collection of regType */
 const [regTypeArray, setRegTypeArray] = useState(['email', 'kakao', 'naver', 'google']);



   /*
 useEffect(() => {

   updateFilter('regType', regType);

 } , [regType, updateFilter]);
 */


 


  const {
    isLoading,
    sortConfig,
    totalItems,
    tableData,
    currentPage,
    
    searchTerm,

 

    handleSort,
    handleDelete,
    
    handleSearch,

    handlePaginate,
    
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,

    // filters
    filters,
    updateFilter,
    applyFilters,

    // regType

    handleIncrementOrderNumber,
    handleDecrementOrderNumber,
   

  } = useTable(
    data,
    pageSize,

    //   initialFilterState?: Partial<Record<string, any>>,

    {},


    regTypeArray,
    startDate.toISOString(),
    endDate.toISOString(),

  );



  

  ///const [searchTerm, setSearchTerm] = useState('');





  const columns = React.useMemo(
    () =>
      getColumns({
        
        //data,

        data: tableData,


        sortConfig,
        onHeaderCellClick,
        onDeleteItem,
        checkedItems: selectedRowKeys,
        onChecked: handleRowSelect,
        handleSelectAll,

        onIncrementOrderNumber,

        onDecrementOrderNumber,



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

      onIncrementOrderNumber,


      onDecrementOrderNumber,

  
    ]
  );

  const { visibleColumns } = useColumn(columns);

 
  const isMediumScreen = true;


 



  return (

    <WidgetCard
      title={title}
      className={cn('flex flex-col  ', className)}
      headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      
      {...(enableSearch && {
        action: (


            <div className='flex flex-col items-start justify-center gap-3'>


              <div className='flex flex-wrap items-center justify-start gap-3'>

                <div className='flex flex-row items-center justify-center gap-3'>
                  가입일시
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

                  onClear={() => handleSearch('')}
                
                  onChange={(event) => handleSearch(event.target.value)}
                  clearable

                  /*
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  } }
                  */

                  prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
                />


                {/*
                <div className='flex flex-row items-center justify-center gap-3'>
                  <Button
                    className="w-24 bg-gray-200 text-black "
                    onClick = {() => {
                      //alert('초기화');
                      console.log('초기화');
                      setSearchTerm('');
                      setStartDate(new Date( new Date().getFullYear(), new Date().getMonth() - 1, 1 ));
                      setEndDate(new Date());
                      handleSearch('');

                    } }
                  >
                    초기화
                  </Button>
                  <Button
                    className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                    onClick = {() => {
                      //alert('검색');
                      console.log('검색');
                      handleSearch(searchTerm);
                    } }
                  >
                    <CiSearch className="me-1.5 h-[17px] w-[17px]" />
                    검색
                  </Button>
                </div>
                */}

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
                    if (event.target.checked) {
                      setRegTypeArray([...regTypeArray, 'google']);
                    } else {
                      setRegTypeArray(regTypeArray.filter((item) => item !== 'google'));
                    }
                  }}
                />


              </div>

            </div> 

        ),

      })}

    >
      
      <div className={cn('table-wrapper flex-grow ', noGutter && '-mx-5 lg:-mx-7 ')} >
        
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
          
          variant={variant}
          ////////////variant='modern'

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

        />
      </div>

    </WidgetCard>
    
  );
}
