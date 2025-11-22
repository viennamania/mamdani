'use client';

import React, { useState, useEffect, use } from 'react';
import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';
import { PiMagnifyingGlassBold } from 'react-icons/pi';





import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import cn from '@/utils/class-names';

import DateFiled from '@/components/controlled-table/date-field';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';


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


import { DatePicker } from '@/components/ui/datepicker';

import StatusField from '@/components/controlled-table/status-field';


import { useTable } from '@/hooks/doingdoit/use-table-point';

import { Checkbox } from '@/components/ui/checkbox';
import { set } from 'lodash';


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

  ////userEmail?: string;

  userId?: string;

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
    value: 'feedLike',
    name: '구매주문 좋아요',
    label: (
      <div className="flex items-center">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-orange-dark">구매주문 좋아요</Text>
      </div>
    ),
  },
  {
    value: 'login',
    name: '출석',
    label: (
      <div className="flex items-center">
        <Badge color="danger" renderAsDot />
        <Text className="ms-2 font-medium text-red-dark">출석</Text>
      </div>
    ),
  },
  {
    value: 'feedPost',
    name: '구매주문작성',
    label: (
      <div className="flex items-center">
        <Badge className="bg-gray-400" renderAsDot />
        <Text className="ms-2 font-medium text-gray-600">구매주문작성</Text>
      </div>
    ),
  },


]
*/






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

  ////userEmail,

  userId,



  

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





  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
  const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
 


  const pointTypeArrayDefault = ['boardLike', 'boardComment', 'feedLike', 'feedPost', 'attendance'];

  //////////const pointTypeAttrayDefault = ['boardLike', 'boardPost', 'feedLike', 'feedPost', 'attendance'];

  /* collection of pointType */
  const [pointTypeArray, setPointTypeArray] = useState<string[]>(

    pointTypeArrayDefault

  );
 
 







  const {
    isLoading,
    sortConfig,
    totalItems,
    tableData,
    currentPage,
    
    //searchTerm,

    handleSort,
    
    handleDelete,

    handleSearch,
    
    handlePaginate,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,

  } = useTable(
    data,
    pageSize,

    {},


    userId,

    pointTypeArray,
    startDate.toISOString(),
    endDate.toISOString(),



  );

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






  return (

    <WidgetCard
      title={title}
      className={cn('flex flex-col  ', className)}
      headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      
      {...(enableSearch && {
        action: (

        <div className=' flex flex-col items-start justify-center gap-3 '>

         
          <div className='flex flex-wrap items-center justify-start gap-3'>

            <div className='w-16 flex flex-row items-center justify-center gap-3'>
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
              //clearable
            
              //onChange={(event) => handleSearch(event.target.value)}

              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}


              
              
              

              prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            />

            <Button
              onClick={() => {
                setStartDate(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
                setEndDate(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
                setSearchTerm('');
                handleSearch('');
                setPointTypeArray(pointTypeArrayDefault);
              }}
              className="w-24 bg-gray-200 text-black "
            >
              초기화
            </Button>

            <Button
              onClick={() => {
                handleSearch(searchTerm);
              }}
              className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <CiSearch className="me-1.5 h-[17px] w-[17px]" />
              검색
            </Button>


          </div>



            


            <div className='flex flex-wrap items-center justify-center gap-5'>

              {/* checkbox */}
              {/* 전체, 게시판좋아요, 게시판작성, 구매주문좋아요, 구매주문작성, 출석 */}
              
              <div className='flex flex-row items-center justify-center gap-3'>
                내역
              </div>

              <Checkbox
                label="전체"

                ///{...(pointTypeArray.includes('boardLike') && pointTypeArray.includes('boardPost') && pointTypeArray.includes('feedLike') && pointTypeArray.includes('feedPost') && pointTypeArray.includes('attendance') ? { checked: true } : { checked: false})}
                
                {...(pointTypeArray.length === 5 ? { checked: true } : { checked: false})}

                
                onChange={(event) => {
                  if (event.target.checked) {
                    ///setPointTypeArray(['boardLike', 'boardPost', 'feedLike', 'feedPost', 'attendance']);

                    setPointTypeArray(pointTypeArrayDefault);


                  } else {
                    setPointTypeArray([]);
                  }
                }}

              />

              <Checkbox
                label="게시판 좋아요"
                  
                {...(pointTypeArray.includes('boardLike') ? { checked: true } : { checked: false})} 

                onChange={(event) => {
                  if (event.target.checked) {
                    setPointTypeArray([...pointTypeArray, 'boardLike']);
                  } else {
                    setPointTypeArray(pointTypeArray.filter((item) => item !== 'boardLike'));
                  }
                }}
              />

              <Checkbox
                label="게시판 댓글"
                {...(pointTypeArray.includes('boardComment') ? { checked: true } : { checked: false})}
                onChange={(event) => {
                  if (event.target.checked) {
                    setPointTypeArray([...pointTypeArray, 'boardComment']);
                  } else {
                    setPointTypeArray(pointTypeArray.filter((item) => item !== 'boardComment'));
                  }
                }}
              />


              {/*       
              <Checkbox
                label="게시판 게시글"
                {...(pointTypeArray.includes('boardPost') ? { checked: true } : { checked: false})} 
                onChange={(event) => {
                  if (event.target.checked) {
                    setPointTypeArray([...pointTypeArray, 'boardPost']);
                  } else {
                    setPointTypeArray(pointTypeArray.filter((item) => item !== 'boardPost'));
                  }
                }}
              />
              */}
              

              <Checkbox
                label="구매주문 좋아요"
                {...(pointTypeArray.includes('feedLike') ? { checked: true } : { checked: false})} 
                onChange={(event) => {
                  if (event.target.checked) {
                    setPointTypeArray([...pointTypeArray, 'feedLike']);
                  } else {
                    setPointTypeArray(pointTypeArray.filter((item) => item !== 'feedLike'));
                  }
                }}
              />

              <Checkbox
                label="구매주문 게시글"
                {...(pointTypeArray.includes('feedPost') ? { checked: true } : { checked: false})} 
                onChange={(event) => {
                  if (event.target.checked) {
                    setPointTypeArray([...pointTypeArray, 'feedPost']);
                  } else {
                    setPointTypeArray(pointTypeArray.filter((item) => item !== 'feedPost'));
                  }
                }}

              />

              <Checkbox
                label="출석"
                {...(pointTypeArray.includes('attendance') ? { checked: true } : { checked: false})} 
                onChange={(event) => {
                  if (event.target.checked) {
                    setPointTypeArray([...pointTypeArray, 'attendance']);
                  } else {
                    setPointTypeArray(pointTypeArray.filter((item) => item !== 'attendance'));
                  }
                }}

              />


            </div>







            

          </div>

        ),

      })}

    >


  
      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7 ')}
      >


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
