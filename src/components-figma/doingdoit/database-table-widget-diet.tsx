'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';
import { PiArrowBendDownLeftBold, PiMagnifyingGlassBold } from 'react-icons/pi';



import { useColumn } from '@/hooks/use-column';



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

import dynamic from 'next/dynamic';



import StatusField from '@/components/controlled-table/status-field';

import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';


import ControlledTable from '@/components/doingdoit/controlled-table';


import { useTable } from '@/hooks/use-table';


import Link from "next/link";

import Image from "next/image";




const FilterElement = dynamic(
  () => import('@/app/shared/invoice/invoice-list/filter-element'),
  { ssr: false }
);

///import TableFooter from '@/app/shared/table-footer';

/*
const TableFooter = dynamic(() => import('@/app/shared-doingdoit/table-footer'), {
  ssr: false,
});
*/





import TableFooter from './table-footer';


import { useSession, signIn, signOut } from 'next-auth/react';



import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';



const filterState = {
  amount: ['', ''],
  createdAt: [null, null],
  dueDate: [null, null],
  status: '',
};




type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  
  
  /////////////checkedItems?: string[];
  
  checkedItems?: any[];


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

  handleAdd: (ids: string[]) => void;
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





export default function DatabaseTableWidgetDiet({
  title,
  data = [],
  getColumns,
  
  pageSize = 20,

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


  handleAdd,


}: BasicTableWidgetProps) {


  const router = useRouter();


  const { data: session, status } = useSession();

  /* fetch user data from an API
  /api/doingdoit/user/getUser
  */
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    nickname: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      /////////console.log(json);

      const data = json as any;
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email]);





  const [open, setOpen] = useState(false);



  //const [pageSize, setPageSize] = useState(10);




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






  

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm  ,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    
    
    /////handleAdd,


    handleReset,

  } = useTable(
    data,
    pageSize,
    filterState
  );


  /*
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

  } = useTable(data, pageSize);
  */


  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        
        ///////checkedItems: selectedRowKeys,


        checkedItems: selectedRowKeys.map((item, index) => (
          tableData.find((data) => data.id === item)
        )),


        onHeaderCellClick,
        onDeleteItem,
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


  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);


 
  const isMediumScreen = true;



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
      value: 'foodGroup1',
      name: '구이류',
      label: (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">구이류</Text>
        </div>
      ),
    },
    {
      value: 'foodGroup2',
      name: '음료',
      label: (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">음료</Text>
        </div>
      ),
    },
    {
      value: 'foodGroup3',
      name: '튀김류',
      label: (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">튀김류</Text>
        </div>
      ),
    },

  ]


  const [value, setValue] = useState('createdAt');


  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
  const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));


  const addFood = async () => {

    const foodName = searchTerm;

    // call api


    // call api for add food to foods table

    const res = await fetch(`/api/doingdoit/food/registerOne?_foodName=${foodName}&_publisher=user`);
    const data = await res.json() as any;

    //console.log("registerOne==", data);

    const foodCode = data?.data;

    // call api for add food to user_foods table

    ///addFoodToUser(foodCode);

    const res2 = await fetch(`/api/doingdoit/food/addFoodToUser?_foodCode=${foodCode}&_userId=${userData.id}`);
  
    const data2 = await res2.json();


    // toast message "추가되었습니다."

    toast.success('코인에 추가되었습니다.');



    // route to my-add page
    
    router.push('/usermain/diet/my');




  }




  return (

    <WidgetCard
      title={title}

      className={cn('flex flex-col ', className)}
      
      ////headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      


      {...(enableSearch && {

        action: (


    
            <div className='w-full  flex  items-center justify-center gap-3  '>


              <Input
                
                size={`xl`}

                type="search"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onClear={() => handleSearch('')}
                onChange={(event) => handleSearch(event.target.value)}


                clearable

                prefix={<PiMagnifyingGlassBold className="  h-8 w-8" />}

                //postfix={
                //  <PiMagnifyingGlassBold className="h-4 w-4" />
                //}

                labelClassName=' text-sm  xl:text-xl font-medium'

                inputClassName=' text-sm xl:text-xl font-bold text-dark rounded-full border-2 border-grey-6'
              
              />

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

          // border removed
          //bordered={false}


          className="mt-6 

          dark:border-gray-100 dark:bg-gray-100 dark:text-gray-800
          
            
          "

          

          {...(enablePagination && {
            
            
            paginatorOptions: {
              pageSize,
              ...(setPageSize && { setPageSize }),
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },
            

            /*
            paginatorOptions: {
              pageSize,
              setPageSize,
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },
            */


            paginatorClassName: cn(
              'mt-4 lg:mt-5',
              noGutter && 'px-5 lg:px-7',
              paginatorClassName
            ),
          })}

        

          tableFooter={
            
            <TableFooter

              checkedItems={

                /////////selectedRowKeys

                //selectedRowKeys.map((item, index) => (
                //</div>  tableData.find((data) => data.id === item)?.foodName
                //))

                selectedRowKeys.map((item, index) => (
                  tableData.find((data) => data.id === item)
                ))

                /*
                selectedRowKeys.map((item, index) => (

                  // return { id, foodCode, foodName } object

                  {
                    id: tableData.find((data) => data.id === item)?.id,
                    foodCode: tableData.find((data) => data.id === item)?.foodCode,
                    foodName: tableData.find((data) => data.id === item)?.foodName,
                  }
                 
                  
                  //tableData.find((data) => data.id === item)?.foodCode
                 
                  
                  /////tableData.find((data) => data.id === item).foodName
                  
                 
                  
                )
                )
              

                )

                */


                // selected items list
                /*
                selectedRowKeys.map((item, index) => (
                  
                  tableData.find((data) => data.id === item)
                  
                ))
                */
                

              }
              
              handleDelete={(ids: string[]) => {

                /*
                setSelectedRowKeys([]);
                handleDelete(ids);
                
                setOpen(true);
                modalData.description = '삭제되었습니다.';
                */

              }}
            

              handleAdd={(items: any[]) => {

          

           
              ////handleAdd={(ids: any[]) => {

                  setSelectedRowKeys([]);
                  
                  ///handleDelete(ids);

                  handleAdd(items)

                  
                  //setOpen(true);
                  //modalData.description = '코인에 추가되었습니다.';

             

              }}

            >

              {/*
              <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
                Re-send {selectedRowKeys.length}{' '}
                {selectedRowKeys.length > 1 ? 'Invoices' : 'Invoice'}{' '}
              </Button>
              */}

            </TableFooter>
          }


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
                <div className="relative text-xl font-extrabold text-dark">
                  직접 음식을 등록하시겠습니까?
                </div>
              </div>

              {/*
              <Link
                href="/usermain/diet/my-add"
                className=" no-underline self-stretch flex flex-row items-center justify-center"
              >
              */}
 
                <Button
                  variant="solid"
                  color="primary"
                  size="xl"
                  className="mt-5 rounded-full border-2 border-grey-6 bg-dark text-white font-bold text-base px-20 py-5"  
                  //startIcon={<AddIcon />}
                  onClick={() => {
                    addFood();

                   
                  }}
                >
                  My코인 추가에 추가
                </Button>

              {/*
              </Link>
              */}


            </div>
          }

          

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
