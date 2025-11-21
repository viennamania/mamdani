'use client';

import React, { useState, useEffect, use } from 'react';
import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';
import { PiMagnifyingGlassBold } from 'react-icons/pi';



import { useTable } from '@/hooks/doingdoit/use-table-notification';




import { useColumn } from '@/hooks/use-column';

///import ControlledTable from '@/components/controlled-table';

import ControlledTable from '@/components/doingdoit/controlled-table';


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

import DeletePopover from '@/app/shared-doingdoit/delete-popover-user';

import { useSession } from 'next-auth/react';




import {
  useDrawer,
  type DrawerPlacements,
} from '@/app/shared/drawer-views/use-drawer';

import UserProfile from '@/app/shared-doingdoit/feed/user-profile';
import { color } from 'framer-motion';
import toast from 'react-hot-toast';


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


export default function NotificationTableWidget({
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

  const { data: session, status } = useSession();


  const [userData, setUserData] = useState({
    id: '',
    avatar: '',
    nickname: '',
  });

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        
        const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
    
        const posts  = await res?.json() as any;
    
        setUserData(posts?.data);

        ////console.log("useTable-notification userData:", posts?.data);
    
      };
  
      fetchData();
    }
  } , [status, session?.user?.email]);
  


  const [open, setOpen] = useState(false);



  const [pageSize, setPageSize] = useState(10);

  const { openDrawer } = useDrawer();


  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      //handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);

    /* popup modal delete item completed */
    //alert('삭제되었습니다.');

    /*
    setOpen(true);
    modalData.description = '삭제되었습니다.';
    */

    toast.success('삭제되었습니다.');

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

    unreadItems,
    
    
    
    tableData,

    currentPage,
    
    ///////searchTerm,

    //handleSort,
    
    handleDelete,

    handleSearch,
    
    handlePaginate,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,

  } = useTable(
    data, pageSize

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

  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
  const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));


  return (

    <WidgetCard
      title={title}
      className={cn('w-full flex flex-col  ', className)}
      //headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      //headerClassName='widget-card-header flex-col sm:flex-row ps-0 w-full sm:w-auto mt-3 sm:mt-0'

      // header is full width on small screens

      
      
      {...(enableSearch && {

        action: (

          <div className=' w-96  flex flex-row items-center justify-between gap-3 text-sm xl:text-base font-extrabold'>


            {/* 총 알림 개수 */}
            {/*
            <div className="flex flex-row items-center justify-start gap-2 text-dark">
              총 알림 {totalItems}개
            </div>
            */}

           

            <div className="ml-2 flex flex-row items-center justify-start gap-2 text-dark">
              읽지 않은 알림 <span className="font-extrabold">{unreadItems}</span>개
            </div>




            <button className=' mr-10
              flex flex-row items-center justify-center gap-3
              text-dark
              border border-solid border-dark
              px-3 py-1 rounded-md

              '
            >

              <DeletePopover


                title={`전체 삭제`}
                

                //title={`삭제`}
                description={`삭제하시겠습니까?`}

              

                onDelete={async () => {

                
                  
                  const res = await fetch(`/api/doingdoit/notification/deleteAllByUserId?_userId=${userData?.id}&_q=${searchTerm}&_limit=${pageSize}&_page=${currentPage}&_sort=${sortConfig.key}&_order=${sortConfig.direction}`);
                  const json = await res?.json();

                  const data = json as any;

                  if (data?.data) {
                    //alert("삭제되었습니다.");

                    //toast.success("삭제되었습니다.");

                    // reload data


                    handleSearch(" ");


                    setOpen(true);
                    modalData.description = '삭제되었습니다.';

                    
                  
                  } else {
                    //alert(json.message);
                  }

                  
                }}


              />
            </button>







            {/*

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
              
            */}



          </div>

        ),

      })}

    >
      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7 ')}
      >
        <ControlledTable

          // borderless
          ///className='border-none'

          // change distance between cella
         


      

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
