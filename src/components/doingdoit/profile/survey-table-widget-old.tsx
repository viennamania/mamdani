'use client';

import React, { useState, Fragment } from 'react';



import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';

import { useTable } from '@/hooks/doingdoit/use-table-survey';


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


import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';


import { Combobox, Transition } from '@headlessui/react';

import { PiMagnifyingGlassBold, PiAirplaneLight } from 'react-icons/pi';

import { locationData } from '@/app/shared/explore-flight/listing-filters/filter-utils';

import StatusField from '@/components/controlled-table/status-field';



type LocationProps = {
  id: string;
  city: string;
  cityCode: string;
  country: string;
  airport: string;
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


 /*
  const statusOptions = [
    {
      value: 'completed',
      name: 'Completed',
      label: (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Completed</Text>
        </div>
      ),
    },
    {
      value: 'pending',
      name: 'Pending',
      label: (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">Pending</Text>
        </div>
      ),
    },
    {
      value: 'cancelled',
      name: 'Cancelled',
      label: (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Cancelled</Text>
        </div>
      ),
    },
    {
      value: 'refunded',
      name: 'Refunded',
      label: (
        <div className="flex items-center">
          <Badge className="bg-gray-400" renderAsDot />
          <Text className="ms-2 font-medium text-gray-600">Refunded</Text>
        </div>
      ),
    },
  ];
  */

  /* INTP, INFP, ENTJ, ENTP, INTJ, INFJ, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP */
  const statusOptions = [
    {
      value: 'all',
      name: '전체',
      label: (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">전체</Text>
        </div>
      ),
    },
    {
      value: 'INTP',
      name: 'INTP',
      label: (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">INTP</Text>
        </div>
      ),
    },
    {
      value: 'INFP',
      name: 'INFP',
      label: (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">INFP</Text>
        </div>
      ),
    },
    {
      value: 'ENTJ',
      name: 'ENTJ',
      label: (
        <div className="flex items-center">
          <Badge className="bg-gray-400" renderAsDot />
          <Text className="ms-2 font-medium text-gray-600">ENTJ</Text>
        </div>
      ),
    },
    {
      value: 'ENTP',
      name: 'ENTP',
      label: (
        <div className="flex items-center">
          <Badge className="bg-gray-400" renderAsDot />
          <Text className="ms-2 font-medium text-gray-600">ENTP</Text>
        </div>
      ),
    },
    {
      value: 'INTJ',
      name: 'INTJ',
      label: (
        <div className="flex items-center">
          <Badge className="bg-gray-400" renderAsDot />
          <Text className="ms-2 font-medium text-gray-600">INTJ</Text>
        </div>
      ),
    },
    {
      value: 'INFJ',
      name: 'INFJ',
      label: (
        <div className="flex items-center">
          <Badge className="bg-gray-400" renderAsDot />
          <Text className="ms-2 font-medium text-gray-600">INFJ</Text>
        </div>
      ),
    },

  ]






export default function SurveyTableWidget({
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

  const { openDrawer } = useDrawer();

  const [pageSize, setPageSize] = useState(10);




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
    
    ///////////searchTerm,

    handleSort,
    handleDelete,

    //handleSearch,
    //handlePaginate,

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
    ]
  );

  const { visibleColumns } = useColumn(columns);

 
  const isMediumScreen = true;


  const [value, setValue] = useState('all');


  const [query, setQuery] = useState('');

  const filteredLocation =
  query === ''
    ? locationData
    : locationData.filter((location) =>
        location.city
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );


  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
  const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));


      

  return (

    <WidgetCard
      title={title}
      
      className={cn('flex flex-col   ', className)}

      headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      
      {...(enableSearch && {
        action: (


          <div className=' flex flex-col items-start justify-center gap-3 '>

            <div className='flex flex-wrap items-center justify-start gap-3'>

              <div className=' w-16 flex items-center justify-start gap-3'>
                챰여일시
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

                      //handleSearch('');

                    } }
                  >
                    초기화
                  </Button>
                  <Button
                    className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                    onClick = {() => {
                      //alert('검색');
                      console.log('검색');
                      
                      //handleSearch(searchTerm);

                    } }
                  >
                    <CiSearch className="me-1.5 h-[17px] w-[17px]" />
                    검색
                  </Button>
                </div>

            </div>







            {/* select */}
            <div className='flex flex-wrap items-center justify-start gap-3'>
              <div className=' w-16 flex items-center justify-start gap-2'>
                결과
              </div>
              <StatusField
                placeholder='결과를 선택하세요'
                options={statusOptions}
                //value={filters['status']}
                onChange={(value: string) => {
                  //updateFilter('status', value);
                }}
                getOptionValue={(option) => option.value}
                displayValue={(selected: string) =>
                  statusOptions.find((option) => option.value === selected)?.label ??
                  selected
                }
                
                {...(isMediumScreen && {
                  //label: 'Status',
                  labelClassName: 'text-base font-medium',
                })}
              
                //size='lg'
                className=" w-44 "
              />
            </div>

              

          </div>


        ),

      })}

    >
      
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
          
          //variant={variant}
          variant='modern'

          className="mt-6      "


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

              //onChange: (page: number) => handlePaginate(page),

            },


            paginatorClassName: cn(
              'mt-4 lg:mt-5',
              noGutter && 'px-5 lg:px-7',
              paginatorClassName
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
