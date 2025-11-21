'use client';

import React, { useState, useEffect, use } from 'react';
import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';
import { PiMagnifyingGlassBold } from 'react-icons/pi';








import cn from '@/utils/class-names';

import DateFiled from '@/components/controlled-table/date-field';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';

import { DatePicker } from '@/components/ui/datepicker';

import { Button } from '@/components/ui/button';

import { CiSearch } from "react-icons/ci";

import TableFooter from '@/app/shared/table-footer';

import { exportToCSV } from '@/utils/export-to-csv';


import { Modal } from '@/components/ui/modal';
import FollowerModal from '@/app/shared/profile/follower-modal';

import { postData, followersData, followingData } from '@/data/profile-data';
import { Badge } from '@/components/ui/badge';
import PostFeed from '@/app/shared/profile/post-feed';

import { Title, Text } from '@/components/ui/text';


import {
  useDrawer,
  type DrawerPlacements,
} from '@/app/shared/drawer-views/use-drawer';

import UserProfile from '@/app/shared-doingdoit/feed/user-profile';
import { color } from 'framer-motion';



import ControlledTable from '@/components/doingdoit/controlled-table';
//import ControlledTable from '@/components/controlled-table';


import { useTable } from '@/hooks/doingdoit/use-table-point-session';



import { useColumn } from '@/hooks/use-column';


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


export default function PointTableWidget({
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




  const [open, setOpen] = useState(false);



  const [pageSize, setPageSize] = useState(10);

  const { openDrawer } = useDrawer();


  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);

    /* popup modal delete item completed */
    //alert('삭제되었습니다.');

    setOpen(true);
    modalData.description = '삭제되었습니다.';

  };


  //placement='right'
  //modalView={<UserProfile />}

  const onClickUser = (id: string) => {

    openDrawer({
        view: <UserProfile id={id} />,
        placement: 'right',
    });

  };



  const {
    isLoading,
    sortConfig,
    totalItems,
    
    
    
    tableData,

    currentPage,
    
    ///////searchTerm,

    handleSort,
    
    handleDelete,

    handleSearch,
    
    handlePaginate,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,

  } = useTable(data, pageSize);


  const [searchTerm, setSearchTerm] = useState('');





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

  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
  const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));


  return (

    <WidgetCard
      title={title}
      className={cn('flex flex-col  ', className)}
      headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      
      {...(enableSearch && {
        action: (

          <div className='flex flex-wrap items-center justify-start gap-3'>

            <div className='flex flex-row items-center justify-center gap-3'>
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
              ///onChange={(event) => handleSearch(event.target.value)}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              } }
              //clearable
              prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            />

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



          </div>

        ),

      })}

    >


  


      {/* total items */}
      {/*
      <div className="flex items-center justify-between  mb-4">
        <Text as="p" className="text-sm font-semibold text-gray-900 lg:text-base">
          총 {totalItems}개
        </Text>
      </div>
      */}

      {/* table */}
      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7 ')}
      >
        <ControlledTable

      

          showLoadingText={false}
          isLoading={isLoading}
          
          data={tableData}


          columns={visibleColumns}
          
          scroll={scroll}
          sticky={sticky}

          variant={variant}
        
  

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

            // count of items per page don't show


        
            

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
              paginatorClassName,

            


            ),




          })}

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



    </WidgetCard>

    
  );
}
