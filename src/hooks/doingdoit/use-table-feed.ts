import { useState, useEffect, useMemo, use } from 'react';
import isString from 'lodash/isString';
import { tr } from '@faker-js/faker';

import { useSession, signOut } from 'next-auth/react';
import { m } from 'framer-motion';


interface AnyObject {
  [key: string]: any;
}

export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  currentPage: number = 1,

  initialFilterState?: Partial<Record<string, any>>,

  startDate?: string,
  endDate?: string,

  mealTimeArray?: string[],
  feedbackArray?: string[],

) {


  const { data: session, status } = useSession();


  const [userData, setUserData] = useState({}) as any;

  useEffect(() => {

    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }



      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      //////console.log(json);

      const data = json as any;

      ///console.log("data?.data", data?.data);

      
      if (data?.data) {
        setUserData(data?.data);
      } else {

        // 로그인 후 최초 접속 시, DB에 유저 정보가 없을 경우
        //alert(json.message);

        // goto user profile edit page
        //window.location.href = `/usermain/user/profile-edit`;

      }

   
    };

    fetchData();

  } , [session?.user?.email]);





  /*
   * Table data
   */
  const [data, setData] = useState(initialData);

  /*
  * Dummy loading state.
  */
  const [isLoading, setLoading] = useState(true);

    
  

  /* get total count */
  const [totalCount, setTotalCount] = useState(0);



  /*
   * Handle row selection
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(data.map((record) => record.id));
    }
  };

  /*
   * Handle sorting
   */
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    
    //key: 'mealDate', // 'mealDate',

    key: 'sequenceNumber', 

    direction: 'desc',
  });

  function sortData(data: T[], sortKey: string, sortDirection: string) {
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const sortedData = useMemo(() => {
    let newData = data;
    if (!sortConfig.key) {
      return newData;
    }
    return sortData(newData, sortConfig.key, sortConfig.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortConfig, data]);


  function handleSort(key: string) {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }



  /*
   * Handle pagination
   */
  /*
  const [currentPage, setCurrentPage] = useState(1);



  function paginatedData(data: T[] = sortedData) {
    const start = (currentPage - 1) * countPerPage;
    const end = start + countPerPage;

    if (data.length > start) return data.slice(start, end);
    return data;
  }

  
  function handlePaginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }
  */



  /*
   * Handle delete
   */
  function handleDelete(id: string | string[]) {

    /*
    const updatedData = Array.isArray(id)
      ? data.filter((item) => !id.includes(item.id))
      : data.filter((item) => item.id !== id);

    setData(updatedData);
    */


    const deleteData = async () => {

      setLoading(true);
  

      console.log("start delete id", id);
  
      const resDelete = await fetch(`/api/doingdoit/feed/deleteOne?id=${id}`);

      console.log("resDelete", resDelete);


      const res = await fetch('/api/doingdoit/feed/getAll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          limit: countPerPage,
          page: currentPage,
          sort: sortConfig.key,
          order: sortConfig.direction,
          q: searchTerm,
          startDate: startDate,
          endDate: endDate,
          mealTimeArray: mealTimeArray,
          feedbackArray: feedbackArray,
          }),
      });

  
      const posts  = await res?.json() as any;
  
      

      ///setData(posts?.data?.feeds);

  

      setData(
        posts?.data?.feeds.map((item: any) => {
          return {
            ...item,
            key: item.id,
            totalCount: posts?.data?.totalCount,
            currentPage: currentPage,
            countPerPage: countPerPage,
            loginUserId: userData?.id,
          };
        })
      )





      setTotalCount(posts?.data?.totalCount);
          
  
      setLoading(false);

    }

    deleteData();
    
  }


  ///console.log("data======", data);


  /*
   * Handle Filters and searching
   */
  const [searchTerm, setSearchTerm] = useState('');


  const [filters, setFilters] = useState<Record<string, any>>(
    initialFilterState ?? {}
  );

  function updateFilter(columnId: string, filterValue: string | any[]) {
    if (!Array.isArray(filterValue) && !isString(filterValue)) {
      throw new Error('filterValue data type should be string or array of any');
    }

    if (Array.isArray(filterValue) && filterValue.length !== 2) {
      throw new Error('filterValue data must be an array of length 2');
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: filterValue,
    }));
  }

  function applyFilters() {

    const searchTermLower = searchTerm.toLowerCase();

    return (
      sortedData
        .filter((item) => {
          const isMatchingItem = Object.entries(filters).some(
            ([columnId, filterValue]) => {
              if (
                Array.isArray(filterValue) &&
                typeof filterValue[1] === 'object'
              ) {
                const itemValue = new Date(item[columnId]);
                return (
                  // @ts-ignore
                  itemValue >= filterValue[0] && itemValue <= filterValue[1]
                );
              }
              if (
                Array.isArray(filterValue) &&
                typeof filterValue[1] === 'string'
              ) {
                const itemPrice = Math.ceil(Number(item[columnId]));
                return (
                  itemPrice >= Number(filterValue[0]) &&
                  itemPrice <= Number(filterValue[1])
                );
              }
              if (isString(filterValue) && !Array.isArray(filterValue)) {
                const itemValue = item[columnId]?.toString().toLowerCase();
                if (itemValue !== filterValue.toString().toLowerCase()) {
                  return false;
                }
                return true;
              }
            }
          );
          return isMatchingItem;
        })
        // global search after running filters
        .filter((item) =>
          Object.values(item).some((value) =>
            typeof value === 'object'
              ? value &&
                Object.values(value).some(
                  (nestedItem) =>
                    nestedItem &&
                    String(nestedItem).toLowerCase().includes(searchTermLower)
                )
              : value && String(value).toLowerCase().includes(searchTermLower)
          )
        )
    );
  }





  const fetchData = async (
    searchTerm: string = '',
    countPerPage: number = 10,
    currentPage: number = 1,
    startDate: Date | string = '',
    endDate: Date | string = '',
    mealTimeArray: string[] = [],
    feedbackArray: string[] = [],
  ) => {
    setLoading(true);





    const res = await fetch('/api/doingdoit/feed/getAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        limit: countPerPage,
        page: currentPage,
        sort: sortConfig.key,
        order: sortConfig.direction,
        q: searchTerm,
        startDate: startDate,
        endDate: endDate,
        mealTimeArray: mealTimeArray,
        feedbackArray: feedbackArray,
        }),
    });


    const posts  = await res?.json() as any;

    console.log("posts?.data?.feeds", posts?.data?.feeds);
    console.log("posts?.data?.totalCount", posts?.data?.totalCount);



    setData(
      posts?.data?.feeds.map((item: any) => {
        return {
          ...item,

          key: item.id,
          totalCount: posts?.data?.totalCount,
          currentPage: currentPage,
          countPerPage: countPerPage,
          loginUserId: userData?.id,


        };
      })
    )


    setTotalCount(posts?.data?.totalCount);


    

    setLoading(false);

  };








  /*
   * Handle searching
   */
  function handleSearch(
    searchValue: string,
    countPerPage: number = 10,
    currentPage: number = 1,
    startDate: Date | string = '',
    endDate: Date | string = '',
    mealTimeArray: string[] = [],
    feedbackArray: string[] = [],

  ) {
    
    ///setSearchTerm(searchValue);

    /*
    console.log('handleSearch searchValue : ' + searchValue);
    console.log('handleSearch countPerPage : ' + countPerPage);
    console.log('handleSearch currentPage : ' + currentPage);
    console.log('handleSearch startDate : ' + startDate);
    console.log('handleSearch endDate : ' + endDate);
    console.log('handleSearch mealTimeArray : ' + mealTimeArray);
    console.log('handleSearch feedbackArray : ' + feedbackArray);
    */



    fetchData(
      searchValue,
      countPerPage,
      currentPage,
      startDate,
      endDate,
      mealTimeArray,
      feedbackArray,

    );

  }


  function searchedData() {
    if (!searchTerm) return sortedData;

    const searchTermLower = searchTerm.toLowerCase();

    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        typeof value === 'object'
          ? value &&
            Object.values(value).some(
              (nestedItem) =>
                nestedItem &&
                String(nestedItem).toLowerCase().includes(searchTermLower)
            )
          : value && String(value).toLowerCase().includes(searchTermLower)
      )
    );

  }

  

  /*
   * Reset search and filters
   */
  function handleReset() {
    setData(() => initialData);
    handleSearch('');
    if (initialFilterState) return setFilters(initialFilterState);
  }

  /*
   * Set isFiltered and final filtered data
   */
  const isFiltered = applyFilters().length > 0;


  function calculateTotalItems() {
    /*
    if (isFiltered) {
      return applyFilters().length;
    }
    if (searchTerm) {
      return searchedData().length;
    }
    return sortedData.length;
    */
    return totalCount;
  }
  
  const filteredAndSearchedData = isFiltered ? applyFilters() : searchedData();

  ////const tableData = paginatedData(filteredAndSearchedData);

  const tableData = data;



  /*
   * Go to first page when data is filtered and searched
   */
  /*
  useEffect(() => {

    handlePaginate(1);

  }, [isFiltered, searchTerm, sortConfig, countPerPage, startDate, endDate, mealTimeArray, feedbackArray]);
  */





  /*
  useEffect(() => {


    fetchData(
      searchTerm,
      countPerPage,
      currentPage,
      startDate,
      endDate,
      mealTimeArray,
      feedbackArray,
    );
  }
  ,[ countPerPage, ]);
  */










  // useTable returns
  return {
    isLoading,
    isFiltered,
    tableData,
    // pagination
    currentPage,
    
    //handlePaginate,

    totalItems: calculateTotalItems(),
    // sorting
    sortConfig,
    handleSort,
    // row selection
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,

    // searching
    searchTerm,
    handleSearch,

    // filters
    filters,
    updateFilter,
    applyFilters,
    handleDelete,
    handleReset,
    
  };
}
