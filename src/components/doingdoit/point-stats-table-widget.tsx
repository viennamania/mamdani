'use client';


import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';


import { PiMagnifyingGlassBold } from 'react-icons/pi';


import { useColumn } from '@/hooks/use-column';

import ControlledTable from '@/components/doingdoit/controlled-table';

import cn from '@/utils/class-names';

import DateFiled from '@/components/controlled-table/date-field';

import { getDateRangeStateValues } from '@/utils/get-formatted-date';

import { Button } from '@/components/ui/button';

import { CiSearch } from "react-icons/ci";

import { DatePicker } from '@/components/ui/datepicker';

import React, { useState } from 'react';

import { useTable } from '@/hooks/doingdoit/use-table-survey-stats';



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






export default function PointStatsTableWidget({
  title,
  data = [],
  
  getColumns,

  pageSize = 10,
  setPageSize,
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




  const [startDate, setStartDate] = useState<Date>(
    new Date( new Date().getFullYear(), new Date().getMonth(), 1 )
  );
  
  
  
  
  const [endDate, setEndDate] = useState<Date>(
    new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 )
  );




  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);
  };


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

    handleReset,

  } = useTable(

    data,
    pageSize,

    [],

    startDate.toISOString(),
    endDate.toISOString(),


  );



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

 


  return (

    <WidgetCard
      title={title}
      className={cn('flex flex-col', className)}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      {...(enableSearch && {
        action: (


          <div className='flex flex-wrap items-center justify-start gap-3'>

          <div className=' w-16 flex flex-row items-center justify-start gap-3'>
            일자
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

          <div className='flex flex-row items-center justify-center gap-3'>
            <Button
              className="w-24 bg-gray-200 text-black "
              onClick={() => {

          
                setStartDate(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
                setEndDate(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
              
                /*
                handleSearch("");
                */
      
                handleReset();
              }}

            
            >
              초기화
            </Button>
            <Button
              className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"

              onClick={() => {
                //handleSearch();
      
                handleSearch("");
      
              }}
            >
              <CiSearch className="me-1.5 h-[17px] w-[17px]" />
              검색
            </Button>
          </div>

        </div>          

        ),
      })}
    >

      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7')}
      >

        <ControlledTable
          isLoading={isLoading}
          data={tableData}
          columns={visibleColumns}
          scroll={scroll}
          sticky={sticky}
          variant={variant}
          className="mt-4"
          {...(enablePagination && {
            paginatorOptions: {
              pageSize,
              ...(setPageSize && { setPageSize }),
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
