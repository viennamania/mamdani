'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';
import { PiMagnifyingGlassBold } from 'react-icons/pi';



import { useColumn } from '@/hooks/use-column';

import ControlledTable from '@/components/controlled-table';

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


///import { useTable } from '@/hooks/use-table';

import { useTable } from '@/hooks/doingdoit/use-table-food';


import { useSession, signOut } from 'next-auth/react';


const FilterElement = dynamic(
  () => import('@/app/shared/invoice/invoice-list/filter-element'),
  { ssr: false }
);

///import TableFooter from '@/app/shared/table-footer';


const TableFooter = dynamic(() => import('@/app/shared-doingdoit/table-footer'), {
  ssr: false,
});





////import TableFooter from './table-footer';



import { u } from 'uploadthing/dist/types-e8f81bbc';
import { fa } from '@faker-js/faker';
import _, { set } from 'lodash';
import toast from 'react-hot-toast';

import Image from 'next/image';




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





export default function DatabaseTableWidget({
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

      if (!session?.user?.email || session?.user?.email === "") {
        return;
      }

      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      //////console.log(json);

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


  const [sortSelected, setSortSelected] = useState('createdAt');



  //const [pageSize, setPageSize] = useState(10);



  /*
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);

    //alert('삭제되었습니다.');

    setOpen(true);
    modalData.description = '삭제되었습니다.';

  };
  */



  /*
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


    //handleRowSelect,

    
    handleSelectAll,
    handleDelete,
    
    
    /////handleAdd,


    handleReset,
  } = useTable(data, pageSize, filterState);
  */




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


  const handleRowSelect = (id: string) => {

      
      // close modal
      setOpen(false);

      // add item

      handleAdd([tableData.find((data) => data.foodCode === id)]);
      

  };

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

  */


 
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



  /* 즐겨찾는 음식 */
  const [favoriteFoodData, setFavoriteFoodData] = useState<any[]>([]);


  /* 최근 음식 */
  /* userFoodData */
  /* data from api */

  const [userFoodData, setUserFoodData] = useState<any[]>([]);


  /* selected food */
  const [selectedFood, setSelectedFood] = useState<any[]>([]);


  const [loadingFoodData, setLoadingFoodData] = useState<boolean>(true);


  // 최근식단순

  useEffect(() => {

    const fetchData = async () => {

      if (!userData.id || userData.id === "") {
        return;
      }

      setLoadingFoodData(true);

      const res = await fetch(`/api/doingdoit/food/getAllUserFoodExcludeFavorite?_userId=${userData.id}&_limit=100&_sort=createdAt&_order=desc`);

      const posts  = await res?.json() as any;

      ////console.log("getAllUserFoodExcludeFavorite=", posts?.data);

      //setUserFoodData(posts?.data);
      // set tableData with selection status
      setUserFoodData(posts?.data.map((item: any) => ({
        ...item,
        checked: false,
      })));


   
  

      // get favorite food data from api
      const res2 = await fetch(`/api/doingdoit/food/getFavoriteFood?_userId=${userData.id}`);

      const posts2  = await res2?.json() as any;

      console.log("getFavoriteFood=", posts2?.data);

      setFavoriteFoodData(posts2?.data?.map((item: any) => ({
        ...item,
        checked: false,
      })));

      setLoadingFoodData(false);


    }

    fetchData();

  } , [userData.id]);

  

  
  const handleSelectUserFood = async (id: string) => {
    
    // get food data from api
    const res = await fetch(`/api/doingdoit/food/getOne?_foodCode=${id}`);

    const posts  = await res?.json() as any;

    console.log("getOne=", posts?.data);

    // close modal
    setOpen(false);

    // add item
    handleAdd([posts?.data]);

  }



  const addFavoriteFoodData = async (foodName: string, foodCode: string) => {


    if (!userData?.id || userData?.id === "") {
      return;
    }
  
    const result = await fetch(`/api/doingdoit/food/addFavoriteFood?_userId=${userData?.id}&_foodName=${foodName}&_foodCode=${foodCode}`);

    const posts  = await result?.json() as any;

    ///console.log("addFavoriteFood=", posts?.data);

    setFavoriteFoodData(posts?.data.map((item: any) => ({
      ...item,
      checked: false,
    })));




    const result2 = await fetch(`/api/doingdoit/food/getAllUserFoodExcludeFavorite?_userId=${userData.id}&_limit=100&_sort=createdAt&_order=desc`);

    const posts2  = await result2?.json() as any;

    setUserFoodData([]);

    setUserFoodData(posts2?.data.map((item: any) => ({
      ...item,
      checked: false,
    })));



    toast.success('즐겨찾는 코인에 추가되었습니다.');
      
  }

  const deleteFavoriteFoodData = async (_foodCode: string) => {

    if (!userData?.id || userData?.id === "") {
      return;
    }

    ////const result = await fetch(`/api/doingdoit/food/deleteFavoriteFood?_userId=${userData?.id}&_id=${_id}`);
    const result = await fetch(`/api/doingdoit/food/deleteFavoriteFood?_userId=${userData?.id}&_foodCode=${_foodCode}`);

    const posts  = await result?.json() as any;

    console.log("deleteFavoriteFoodData=", posts?.data);


    if (posts?.data?.length > 0) {

      setFavoriteFoodData(posts?.data?.map((item: any) => ({
        ...item,
        checked: false,
      })));

    }



    const result2 = await fetch(`/api/doingdoit/food/getAllUserFoodExcludeFavorite?_userId=${userData.id}&_limit=100&_sort=createdAt&_order=desc`);

    const posts2  = await result2?.json() as any;

    setUserFoodData([]);

    setUserFoodData(posts2?.data.map((item: any) => ({
      ...item,
      checked: false,
    })));


    toast.success('즐겨찾는 음식에서 삭제되었습니다.');

  }



  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchedData, setSearchedData] = useState<any[]>([]);

  useEffect(() => {
    // set tableData with selection status
    setSearchedData(userFoodData?.map((item: any) => ({
      ...item,
      
      //checked: false,

    })).filter((item) => item?.foodName?.includes(searchTerm)));
  }, [searchTerm, userFoodData]);



  const handleSearch = (value: string) => {
    
    console.log("handleSearch=", value);

    setSearchTerm(value);
  
  };



  return (

    <>


    {loadingFoodData ? (
      <div className=' h-96 flex flex-row items-center justify-center gap-[8px]'>
        <div className="w-2 h-2 bg-dark rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-dark rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-dark rounded-full animate-bounce" />
      </div>
    ) : (



    <div className="flex flex-col gap-10">




      <div className='flex flex-col items-start justify-start gap-3'>

        <div className='flex flex-row items-center justify-start gap-3'>
          <div className='text-base font-semibold text-gray-900'>
            즐겨찾는 음식
          </div>
        </div>



        {favoriteFoodData?.length === 0 ? (

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-base  text-gray-500">
              즐겨찾는 음식이 없습니다.
            </div>
          </div>

        ) : (

          <div
            className=" flex flex-wrap gap-2"
          >
            {favoriteFoodData?.map(( item , index) => (

              <div key={index}
                className={cn(
                  'rounded-81xl flex flex-row items-center justify-start py-3 px-5 gap-[20px] text-center text-xs font-menu-off',
                  ////item?.checked ? 'bg-[#212121] text-white' : 'bg-[#f5f5f5] text-black'

                  item?.checked ? 'bg-[#f5f5f5] border-2  border-[#212121] text-black' : 'bg-[#f5f5f5] border-2 border-white text-gray-500 '

                )}
              >

                {/* remove favorite button */}
                <button
                  onClick={() => {
                      
                      // if item is checked, then uncheck it and remove from selectedFood
                      // if item is unchecked, then check it and add to selectedFood
    

                      // call api to add to favoriteFoodData
                      // if success, then add to favoriteFoodData
                      // if fail, then alert error message

                      deleteFavoriteFoodData(item?.foodCode);

                  } }
                >
                  {/* if item checked is false, then starfil.svg gray color */}
                  {/* if item checked is true, then starfil.svg yellow color */}

                  { item?.checked ? (
                    <Image
                      src="/usermain/images/starfill.svg"
                      alt=""
                      width="16"
                      height="16"
                    />
                  ) : (
                    <Image
                      src="/usermain/images/starline.svg"
                      alt=""
                      width="16"
                      height="16"
                    />
                  )}

                </button>          

                <button
                  key={index}
                  //className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"

                  onClick={() => {
                    
                    //handleSelectUserFood(item?.foodCode)

                    // if item is checked, then uncheck it and remove from selectedFood
                    // when item is unchecked and if check item  when the same foodCode is not in the selectedFood, then add to selectedFood
                    // when the same foodCode is not in the selectedFood, then add to selectedFood

                    setFavoriteFoodData(favoriteFoodData.map((data) => {
                        
                        if (data.foodCode === item?.foodCode) {
        
                          if (data.checked) {
                            
                            // remove from selectedFood
                            setSelectedFood(selectedFood.filter((item) => item.foodCode !== data.foodCode));

                            return {
                              ...data,
                              checked: !data.checked,
                            };
        
                          } else {

                            // if check item  when the same foodCode is not in the selectedFood, then add to selectedFood

                            if (selectedFood.filter((item) => item.foodCode === data.foodCode).length === 0) {
                              setSelectedFood(selectedFood.concat([data]));

                              return {
                                ...data,
                                checked: !data.checked,
                              };
                            }

                          }
        

                        }
                        return data;
        

                      } ));
                    

                  }}
                >
                  <div className="relative font-extrabold">
                    {
                      item?.foodName
                    }
                  </div>

                </button>


              </div>
              

            ))}
          </div>

        )}


      </div>

  




    {/* 최근식단순 */}
    {/* userFoodData */}

    <div className='flex flex-col items-start justify-start gap-3'>


      <div className=' w-full flex flex-row items-center justify-between gap-3'>

        <div className='flex flex-wrap items-center justify-start gap-3'>
          <button
            onClick={() => {
              setSortSelected('createdAt');
              //setUserFoodData(userFoodData.sort((a, b) => a.createdAt - b.createdAt));
              setSearchedData(userFoodData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
            } }
            className={` ${sortSelected === 'createdAt' ? 'text-base' : 'text-sm' } font-semibold text-gray-900`}
          >
            최근식단순
          </button>
          <button
            onClick={() => {
              setSortSelected('foodName');
              //setUserFoodData(userFoodData.sort((a, b) => a.foodName.localeCompare(b.foodName)));
              setSearchedData(userFoodData.sort((a, b) => a.foodName.localeCompare(b.foodName)));
            } }
            className={` ${sortSelected !== 'createdAt' ? 'text-base' : 'text-sm' } font-semibold text-gray-900`}
          >
            가나다순
          </button>
        </div>

        <Input
          size="lg"
          type="search"
          placeholder={searchPlaceholder}
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



      {searchedData?.length === 0 && (
            
        <div className="w-full h-52 flex flex-col items-center justify-center gap-3">


              <div className="flex flex-col items-center justify-center gap-[8px]">
                <Image
                  width={150}
                  height={150}
                  className="relative w-[253.5px] h-[200px] overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/frame2.svg"
                />
                <div className="flex">
                  검색결과가 없네요.
                </div>
              </div>

        </div>

      )}


      {searchedData?.length > 0 && (
        <div
          className=" flex flex-wrap gap-2"
        >
          {searchedData?.map(( item , index) => (

            <div
              key={index}
              className={cn(
                'rounded-81xl flex flex-row items-center justify-start py-3 px-5 gap-[20px] text-center text-xs font-menu-off',
                /////item?.checked ? 'bg-[#212121] text-white' : 'bg-[#f5f5f5] text-black'

                item?.checked ? 'bg-[#f5f5f5] border-2  border-[#212121] text-black' : 'bg-[#f5f5f5] border-2 border-white text-gray-500 '


              )}
            >
              {/*  add favorite button */}
              {/* star icon */}
              {/* onClick, add to favoriteFoodData */}

              <button
                onClick={() => {
                    
                    // if item is checked, then uncheck it and remove from selectedFood
                    // if item is unchecked, then check it and add to selectedFood
  

                    // call api to add to favoriteFoodData
                    // if success, then add to favoriteFoodData
                    // if fail, then alert error message

                    addFavoriteFoodData(item?.foodName, item?.foodCode);

                } }
              >
                { item?.checked ? (
                  <Image
                    src="/usermain/images/starfill.svg"
                    alt=""
                    width="16"
                    height="16"
                  />
                ) : (
                  <Image
                    src="/usermain/images/starline.svg"
                    alt=""
                    width="16"
                    height="16"
                  />
                )}

              </button>


              <button
                key={index}
                //className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"

                //</>className={cn(
                //  'rounded-81xl flex flex-row items-center justify-start py-3 px-5 gap-[20px] text-center text-xs font-menu-off',
                //  item?.checked ? 'bg-[#212121] text-white' : 'bg-[#f5f5f5] text-black'
                //)}
                onClick={() => {

                  // if item is checked, then uncheck it and remove from selectedFood
                  // if item is unchecked, then check it and add to selectedFood

                  setUserFoodData(userFoodData.map((data) => {

                    if (data.foodCode === item?.foodCode) {

                      if (data.checked) {
                        
                        // remove from selectedFood

                        setSelectedFood(selectedFood.filter((item) => item.foodCode !== data.foodCode));

                        return {
                          ...data,
                          checked: !data.checked,
                        };

                      } else {
                        // if check item  when the same foodCode is not in the selectedFood, then add to selectedFood

                        if (selectedFood.filter((item) => item.foodCode === data.foodCode).length === 0) {
                          setSelectedFood(selectedFood.concat([data]));

                          return {
                            ...data,
                            checked: !data.checked,
                          };

                        }

                      }

                    }
                    return data;

                  } ));
                  

                  /*
                  //handleSelectUserFood(item?.foodCode)

                  // set checked status
                  setUserFoodData(userFoodData.map((data) => {
                    if (data.foodCode === item?.foodCode) {
                      return {
                        ...data,
                        checked: !data.checked,
                      };
                    }
                    return data;
                  }));
                  */

                }}
              >
                <div className="relative font-extrabold">
                  {
                    item?.foodName
                  }
                  {/* -{ item?.foodCode } */}
                </div>

              </button>

              {/* remove button x */}
              <button
                onClick={() => {
                  // remove from my food
                  // api call
                  // if success, then remove from userFoodData
                  // if fail, then alert error message
                  async function removeUserFoodData() {
                      
                      const result = await fetch(`/api/doingdoit/food/deleteOneUser?userId=${userData.id}&foodCode=${item?.foodCode}`);
  
                      const posts  = await result?.json() as any;
  
                      console.log("deleteOneUser=", posts?.data);
  
                      if (posts?.data?.length > 0) {
                        setUserFoodData(posts?.data.map((item: any) => ({
                          ...item,
                          checked: false,
                        })));
                      }
  
                    }

                    removeUserFoodData();

                    // update userFoodData

                    setUserFoodData(userFoodData.filter((item2) => item2.foodCode !== item?.foodCode));


                    toast.success('삭제되었습니다.');


                } }
              >
                <Image
                  src="/usermain/images/x.svg"
                  alt=""
                  width="16"
                  height="16"
                />
              </button>
                         

            </div>


          ))}
        </div>
      )}


    </div>



    {/* selcted food */} 

    {/*}
    <div className='flex flex-col items-start justify-start gap-3'>

      <div className='flex flex-row items-center justify-start gap-3'>
        <div className='text-base font-semibold text-gray-900'>
          선택된 음식
        </div>
      </div>

      {selectedFood?.length > 0 && (
        <div
          className="mt-0 flex flex-wrap gap-2"
        >
          {selectedFood?.map(( item , index) => (

            <button
              key={index}
              //className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
              className={cn(
                'rounded-81xl flex flex-row items-center justify-start py-3 px-5 gap-[20px] text-center text-xs font-menu-off bg-[#212121] text-white',
              )}
              onClick={() => {

                // if item is checked, then uncheck it and remove from selectedFood
                // if item is unchecked, then check it and add to selectedFood

                //setSelectedFood(selectedFood.filter((item) => item.foodCode !== data.foodCode));

                ////setSelectedFood(selectedFood.filter((item2) => item2.foodCode !== item?.foodCode));



              }}
            >
              <div className="relative font-extrabold">
                {
                  item?.foodName
                }
              </div>

            </button>
          ))}
        </div>
      )}
    </div>
    */}




    {/* button for add */}
    {/* button text is displayed when items are checked */}
    {/* button text show the checked items count */}

    {/* when userFoodData and favoriteFoodData is checked, button is enabled and show the checked items count */}
    {/* n개 선택완료 */}
    {/* 1개 선택완료 */}
    {/* 2개 선택완료 */}
    {/* checked items count"선택완료" */}


    {/*
    <button
      className={cn(
        'rounded-none flex flex-row items-center justify-center py-3 px-5 gap-[20px] text-center text-base font-menu-off',
        selectedFood.length > 0 ? 'bg-[#212121] text-white' : 'bg-[#f5f5f5] text-black'
      )}
      disabled={
        selectedFood.length > 0 ? false : true
      }
      onClick={() => {
        //handleAdd(selectedRowKeys.map((item, index) => (
        //  tableData.find((data) => data.id === item)
        //)));

        // add item
        ////handleAdd(favoriteFoodData.filter((item) => item.checked).concat(userFoodData.filter((item) => item.checked)));

        handleAdd(selectedFood);
        

      }}
    >
      <div className="relative font-extrabold">
        {
          (favoriteFoodData?.filter((item) => item.checked).length + userFoodData?.filter((item) => item.checked).length) > 0 ?
          
          (favoriteFoodData?.filter((item) => item.checked).length + userFoodData?.filter((item) => item.checked).length) + '개 선택완료' : '선택'
        }
      </div>

    </button>
    */}



    {favoriteFoodData?.filter((item) => item.checked).length + userFoodData?.filter((item) => item.checked).length > 0 && (



        <button
          className={cn(
            'rounded-none flex flex-row items-center justify-center py-3 px-5 gap-[20px] text-center text-base font-menu-off',
            selectedFood.length > 0 ? 'bg-[#212121] text-white' : 'bg-[#f5f5f5] text-black'
          )}
          disabled={
            selectedFood.length > 0 ? false : true
          }
          onClick={() => {
            //handleAdd(selectedRowKeys.map((item, index) => (
            //  tableData.find((data) => data.id === item)
            //)));

            // add item
            ////handleAdd(favoriteFoodData.filter((item) => item.checked).concat(userFoodData.filter((item) => item.checked)));


            console.log("selectedFood=========", selectedFood);


            handleAdd(selectedFood);
            

          }}
        >

          <div className="relative font-extrabold">

            {
              favoriteFoodData?.filter((item) => item.checked).length + userFoodData?.filter((item) => item.checked).length 
            }개 선택완료

          </div>

        </button>



    
    )}
   

 


      {/*
      <WidgetCard
        title={title}

        className={cn('flex flex-col ', className)}
        
        headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
        
        {...(enableSearch && {
          action: (


            <div className=' flex flex-row items-start justify-center gap-3 '>



              <div className='flex flex-wrap items-center justify-start gap-3'>


                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onClear={() => handleSearch('')}
                  onChange={(event) => handleSearch(event.target.value)}
                  clearable
                  prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
                  labelClassName='text-base font-medium'
                
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

          className="mt-6    "

          

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
      */}




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

    </>

    
  );
}
