'use client';

import React, { useState, useEffect, use } from 'react';
import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';



import { useColumn } from '@/hooks/use-column';

///import ControlledTable from '@/components/controlled-table';
import ControlledTable from '@/components/doingdoit/controlled-table';


import cn from '@/utils/class-names';

import DateFiled from '@/components/controlled-table/date-field';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';

import { DatePicker } from '@/components/ui/datepicker';

import { Button } from '@/components/ui/button';

import { CiSearch } from "react-icons/ci";


import { exportToCSV } from '@/utils/export-to-csv';


import { Modal } from '@/components/ui/modal';
import FollowerModal from '@/app/shared/profile/follower-modal';

import { postData, followersData, followingData } from '@/data/profile-data';
import { Badge } from '@/components/ui/badge';
import PostFeed from '@/app/shared/profile/post-feed';

import { Title, Text } from '@/components/ui/text';

import Image from 'next/image';

import { PiMagnifyingGlassBold, PiTray } from 'react-icons/pi';


import {
  useDrawer,
  type DrawerPlacements,
} from '@/app/shared/drawer-views/use-drawer';

import UserProfile from '@/app/shared-doingdoit/feed/user-profile';


//import { useTable } from '@/hooks/doingdoit/use-table-food-user';

import { useTable } from '@/hooks/doingdoit/use-table-food-user-my';


import dynamic from 'next/dynamic';


//import TableFooter from '@/app/shared/table-footer';

/*
const TableFooter = dynamic(() => import('@/app/shared-doingdoit/table-footer'), {
  ssr: false,
});
*/




interface TableFooterProps {
  checkedItems: string[];
  handleDelete: (ids: string[]) => void;
}

export function TableFooter({
  checkedItems,
  handleDelete,
  children,
}: React.PropsWithChildren<TableFooterProps>) {

  /*
  if (checkedItems.length === 0) {
    return null;
  }
  */

  return (

    <div className="sticky bottom-0 left-0 z-10 mt-2.5 flex w-full items-center justify-between bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
     
      <div className='flex flex-row items-center justify-center gap-5'>
        
        
        선택수량:{' '}<Text as="strong">{checkedItems.length}</Text>
        

        <button
          type="button"
          //className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          
          className={` ${checkedItems.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}
          inline-flex items-center px-4 py-2 border-black   border-2 text-xs rounded-md text-black bg-white  focus:outline-none
          `}
          
          onClick={() => {
            if (checkedItems.length === 0) {
              return;
            }
            handleDelete(checkedItems);
          }}
        >
          선택항목 삭제
        </button>
        
          {/*
        <Button
          size="lg"
          variant="text"
          className="underline"
          color="danger"
          onClick={() => {
            handleDelete(checkedItems);
          }}
        >
          삭제하기 
        </Button> 
        */}


      </div>
      {children}
    </div>

  );
}








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


export default function UserFoodTableWidget({
  title,

  data = [],

  getColumns,
  
  //pageSize = 10,

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


  const [sortKey, setSortKey] = useState('createdAt');
  const [order, setOrder] = useState('desc');


  const { openDrawer } = useDrawer();


  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {

    //handleDelete(id);

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



  /*
  const {
    isLoading,
    sortConfig,
    totalItems,
    tableData,
    currentPage,
    
    //////searchTerm,

    handleSort,
    handleDelete,
    
    handleSearch,

    handlePaginate,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,

  } = useTable(data, pageSize);
  */



  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    
    searchTerm,
    handleSearch,

    sortConfig,

    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,



    handleDelete,

    handleReset,
  } = useTable (
    ///data, pageSize, filterState

    data,
   
    pageSize, //countPerPage,

    //filterState,

    {},
    

    //sortKey,

    //order,
  
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
      className={cn('  flex flex-col  ', className)}
      //headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      
      headerClassName='w-full flex flex-row items-center justify-end gap-3'

      {...(enableSearch && {
        action: (

          <div className=' flex flex-row items-center justify-center  gap-5  '>

            
              <div className="  self-stretch flex flex-wrap items-center justify-between gap-3">

                  <div className=" w-40  flex flex-row items-center justify-center gap-[12px]">
                    
                    <button
                      type="button"
                      onClick={() => {
                        //alert('최근식단순');
                        console.log('최근식단순');
                        
                        setSortKey('createdAt');
                        setOrder('desc');

                        
                        handleSort('createdAt');
                       

                        
                      }}
                      /////className="relative font-extrabold"
                      className={cn(
                        'relative font-extrabold',
                        sortKey === 'createdAt' ? 'font-extrabold text-black' : 'font-normal text-grey-9 '
                      )}
                    >
                      최근식단순
                    </button>

                    <div className="relative bg-grey-c w-px h-3" />
                    
                    <button
                      type="button"
                      onClick={() => {
                        //alert('가나다순');
                        console.log('가나다순');

                        setSortKey('foodName');
                        setOrder('asc');


                        handleSort('foodName');

                        
                      }}
                      //className="relative text-grey-9"
                      className={cn(
                        'relative',
                        sortKey === 'foodName' ? 'font-extrabold text-black' : 'font-normal text-grey-9 '
                      )}
                    >
                      가나다순
                    </button>

                  </div>
            


                  <Input
                    size="lg"
                    type="search"
                    
                    placeholder={searchPlaceholder}

                    // palceholder text color
                    className="text-grey-9 "

                    //placeholder="식품명 검색"
                    value={searchTerm}
                    onClear={() =>
                      handleSearch('')
                    }
                    onChange={(event) => 
                      handleSearch(event.target.value)
                    }
                    clearable
                    prefix={<PiMagnifyingGlassBold className="h-6 w-6" />}
                    //labelClassName='text-base font-medium'

                    //labelClassName='text-3xl font-extrabold text-dark'

                    inputClassName=' text-base font-semibold text-dark rounded-lg border-2 border-grey-3 hover:border-grey-3 focus:border-grey-3 '

                  />
              
                </div>

            

            {/*
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchTerm}
              //onClear={() => handleSearch('')}
              ///onChange={(event) => handleSearch(event.target.value)}
              onChange={(event) => {
                
                //setSearchTerm(event.target.value);
                handleSearch(event.target.value);


              } }
              clearable
              prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            />
            */}


            

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

        ),

      })}

    >


      <TableFooter
       

        checkedItems={selectedRowKeys}

        handleDelete={(ids: string[]) => {

          //console.log('handleDelete ids:', ids);


          /*
          ids.map((id) => {

            async ( ) => {
              const res = await fetch(`/api/doingdoit/food/deleteOneUser?userId=${userData?.id}&foodCode=${id}`);
              //const json = res?.json();
              //console.log(json);

      
            }
            
          });
          */



          setSelectedRowKeys([]);


          handleDelete(ids);


          
          setOpen(true);
          modalData.description = '삭제되었습니다.';

        }}

      />



      {!isLoading && tableData.length === 0 ? (
                  
        <div className="py-5 text-center lg:py-8">
    
          <div className="flex flex-col items-center justify-end gap-[8px]">
            <Image
              width={253.5}
              height={200}
              className="relative w-[253.5px] h-[200px] overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/frame2.svg"
            />
            <div className="self-stretch relative">
              검색결과가 없네요.
            </div>

          </div>

        </div>

      ) : (
        
      
      
      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7 ')}
      >
        <ControlledTable

          //searchTerm={searchTerm}


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
          emptyText={
            <div className="py-5 text-center lg:py-8">
              
              <div className="flex flex-col items-center justify-end gap-[8px]">
                <Image
                  width={253.5}
                  height={200}
                  className="relative w-[253.5px] h-[200px] overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/frame2.svg"
                />
                <div className="self-stretch relative">
                  검색결과가 없네요.
                </div>
  
              </div>

            </div>
          }
          */



         



          /*
          tableFooter={
            <TableFooter

              checkedItems={selectedRowKeys}

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

      )}


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
