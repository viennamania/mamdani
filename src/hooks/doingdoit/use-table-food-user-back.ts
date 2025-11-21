import { useState, useEffect, useMemo, use } from 'react';
import isString from 'lodash/isString';


import { useSession, signOut } from 'next-auth/react';
import { u } from 'uploadthing/dist/types-e8f81bbc';
import { get, set } from 'lodash';
import { da } from '@faker-js/faker';
import { it } from 'node:test';


import useDebounce from './useDebounce';



interface AnyObject {
  [key: string]: any;
}



export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  initialFilterState?: Partial<Record<string, any>>,

  sortKey?: string,
  order?: string,

) {


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

      if (!session?.user?.email) return;

      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

  
      const data = json as any;

      ///console.log("use-table-food-user data===", data.data);
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email]);
  
  



  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500)



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


  




  
  const fetchData = async () => {
   

    if (!userData?.id) return;


    setLoading(true);

    try {

      ///const res = await fetch(`/api/doingdoit/food/getAll?_limit=${countPerPage}&_page=${currentPage}&_userId=${userData.id}`);
      
      const res = await fetch(`/api/doingdoit/food/getAllUserFood?_limit=${countPerPage}&_page=${currentPage}&_sort=${sortKey}&_order=${order}&_q=${searchTerm}&_userId=${userData?.id}`);


      const posts  = await res?.json() as any;

      ////console.log("getAllUserFood=========",  posts.data);

      
      setData(posts.data);

    } catch (error) {
      console.log(error);
    }



    setLoading(false);

  };



  
  const fetchTotalCount = async () => {

    if (!userData?.id) return;


    const res = await fetch(`/api/doingdoit/food/getCountUser?_q=${searchTerm}&_userId=${userData?.id}`);

    const posts  = await res?.json() as any;

    ///console.log(posts.data);

    setTotalCount(posts?.data);

  }

  
  useEffect(() => {

    fetchTotalCount();

  } , [ searchTerm, userData?.id ]);
  
  


  /*
  useEffect(() => {
    setLoading(false);
  }, []);
  */


  /*
   * Handle row selection
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);


  const handleRowSelect = (recordKey: string) => {

    ///console.log("handleRowSelect===", recordKey);

    

    const selectedKeys = [...selectedRowKeys];
    

    if (selectedKeys.includes(recordKey)) {

      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey));
    
    } else {

      setSelectedRowKeys([...selectedKeys, recordKey]);

    }
    

    //alert(recordKey);

  };


  
  const handleSelectAll = () => {

    //console.log("handleSelectAll===", selectedRowKeys.length, data.length);

    ///console.log("handleSelectAll===selectedRowKeys", selectedRowKeys);
    //console.log("handleSelectAll===data", data);


    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]);
    } else {
      
      //setSelectedRowKeys(data.map((record) => record.id ));

      setSelectedRowKeys(data.map((record) => record.foodCode ));
    }

  };

  /*
   * Handle sorting
   */
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: null,
    direction: null,
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




  /*
  useEffect(() => {
    if (data.length === 0) {
      setCurrentPage(1);
      fetchData();
      fetchTotalCount();
    }
  } , [ data ]);
  */

  /*
  useEffect(() => {
    if (data.length === 0) {
      setCurrentPage(1);
      fetchData();
      fetchTotalCount();
    }
  } , [ data ]);
  */

  // if current page is empty, go back to page 1
  useEffect(() => {
    if (
        totalCount !== 0 && data.length === 0
    ) {
      setCurrentPage(1);
      fetchData();
      fetchTotalCount();
    }
  } , [ data ]);



  /*
   * Handle delete
   */
 

  ///function handleDelete(id: string | string[]) {

  function handleDelete(id: string | string[]) {

    /*
    const updatedData = Array.isArray(id)
      ? data.filter((item) => !id.includes(item.id))
      : data.filter((item) => item.id !== id);

    setData(updatedData);
    */

    
    if (Array.isArray(id)) {

      id.map(async (item) => {
        const res = await fetch(`/api/doingdoit/food/deleteOneUser?userId=${userData?.id}&foodCode=${item}`);
        const json = await res?.json();
        
        console.log(json);


        // update data and total count
        setData((prevData) => prevData.filter((item) => !id.includes(item.foodCode)));

        setTotalCount(totalCount - item.length);

       



         

      });

    } else {

      async ( ) => {
        const res = await fetch(`/api/doingdoit/food/deleteOneUser?userId=${userData?.id}&foodCode=${id}`);
        //const json = res?.json();
        //console.log(json);

        // update data and total count

        setData((prevData) => prevData.filter((item) => item.foodCode !== id));

        setTotalCount(totalCount - 1);



      }
    }

    /*
    setSelectedRowKeys([]);
    */


    /*
    if (data.length === 0) {

      
      setCurrentPage(1);
      fetchData();
      fetchTotalCount();
    }
    */
    




    // update data and total count
    //fetchData();
    //fetchTotalCount();
    

    



   {/*
    const updatedData = Array.isArray(id)
      ? data.filter((item) => !id.includes(item.id))
      : data.filter((item) => item.id !== id);

    setData(updatedData);
    */}

  
    



    /*
    // fetch updated data

    // trigger fetch data
    // useEffect(() => {


    

    
    setSearchTerm('');

    setCurrentPage(1);

    

    setSortConfig({ key: null, direction: null });


    fetchData();

    fetchTotalCount();
    */


    //searchedData();


    ///fetchData();

    //fetchTotalCount();


    // update data and total count




  }



  /*
   * Handle Filters and searching
   */

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


  /*
   * Handle searching
   */
  function handleSearch(searchValue: string) {

    ////console.log("handleSearch===", searchValue);
    
    setSearchTerm(searchValue);


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



    return totalCount;

    /*

    if (isFiltered) {
      return applyFilters().length;
    }
    if (searchTerm) {
      return searchedData().length;
    }

    return sortedData.length;
    */
  }

  
  
  ///const filteredAndSearchedData = isFiltered ? applyFilters() : searchedData();

  /*
  const tableData = paginatedData(filteredAndSearchedData);
  */

  const tableData = searchedData();

 





  //////const [sortKey, setSortKey] = useState('createdAt');



 


  useEffect(() => {

    
    const fetchData = async () => {

      ///if (!userData?.id) return;

     
      if (!userData?.id) return;


      setLoading(true);
  
      /*
          const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm)
      // Send Axios request here
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
    */
  

  
      
      ///const res = await fetch(`/api/doingdoit/food/getAll?_limit=10&_page=${currentPage}&_userId=${userData?.id}`);

      //const res = await fetch(`/api/doingdoit/food/getAll?_limit=10&_page=${currentPage}&_sort=createdAt&_order=-1&_q=${searchTerm}&_userId=${userData?.id}`);

      const res = await fetch(`/api/doingdoit/food/getAllUserFood?_limit=${countPerPage}&_page=${currentPage}&_sort=${sortKey}&_order=${order}&_q=${searchTerm}&_userId=${userData?.id}`);


      const posts  = await res?.json() as any;


      ////console.log("use-table-food data===", posts.data);


      setData(posts.data);


      /*
      // get total count
      const res2 = await fetch(`/api/doingdoit/food/getCount?_q=${searchTerm}`);
      const posts2  = await res2?.json() as any;
      setTotalCount(posts2.data);

      console.log("use-table-food totalCount===", posts2.data);
      */

      ///setTotalCount(posts?.data?.length);


      const res2 = await fetch(`/api/doingdoit/food/getCountUser?_q=${searchTerm}&_userId=${userData?.id}`);

      const posts2  = await res2?.json() as any;
  
      ///console.log(posts.data);
  
      setTotalCount(posts2?.data);


  
  
      setLoading(false);
  
    };

    
    const delayDebounceFn = setTimeout(() => {

      fetchData();

    }, 5000);

    return () => clearTimeout(delayDebounceFn);


  }
  ,[ countPerPage, currentPage, sortKey, order,  searchTerm, userData?.id ]);



  /*
   * Go to first page when data is filtered and searched
   */
  
  useEffect(() => {

    handlePaginate(1);


  }, [isFiltered, searchTerm]);





  // useTable returns
  return {
    isLoading,
    isFiltered,

    tableData,


    // pagination
    currentPage,
    handlePaginate,

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
