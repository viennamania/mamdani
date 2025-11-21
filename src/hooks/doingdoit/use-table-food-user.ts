import { useState, useEffect, useMemo, use } from 'react';
import isString from 'lodash/isString';


import { useSession, signOut } from 'next-auth/react';
import { u } from 'uploadthing/dist/types-e8f81bbc';


import useDebounce from './useDebounce';
import { set } from 'lodash';


interface AnyObject {
  [key: string]: any;
}




export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,

  //currentPage: number = 1,

  //searchTerm: string = '',

  initialFilterState?: Partial<Record<string, any>>,

  //startDate?: string,
  //endDate?: string,

  filterState?: Record<string, any>,

  foodTypeArray?: string[],
  



  
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



  /*
  useEffect(() => {

    const fetchData = async () => {

      if (!session?.user?.email) return;
      
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
  
  } , [session?.user?.email]);
  */
  
  








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
  const fetchTotalCount = async () => {
    const res = await fetch(`/api/doingdoit/food/getCount`);

    const posts  = await res?.json() as any;

    ///console.log(posts.data);

    setTotalCount(posts.data);

  }
  */


  
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 500)






  const [foodType, setFoodType] = useState<string[]>([]);







  /*
  const fetchData = async () => {


    setLoading(true);


    try {

      ////const res = await fetch(`/api/doingdoit/food/getAll?_limit=${countPerPage}&_page=${currentPage}&_userId=${userData.id}`);

      const res = await fetch(`/api/doingdoit/food/getAll?_limit=${countPerPage}&_page=${currentPage}&_sort=createdAt&_order=desc&_q=${searchTerm}`);


      const posts  = await res?.json() as any;

      ////console.log("1  food getAll=========",  posts.data);

      setData(posts?.data?.foods);

      setTotalCount(posts?.data?.totalCount);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);

  };
  */



  /*
   * Handle row selection
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);


  
  
  const handleRowSelect = (recordKey: string) => {

    console.log("handleRowSelect===", recordKey);


    
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
    


  };
  
  




  
  const handleSelectAll = () => {

    console.log("handleSelectAll===", selectedRowKeys.length, data.length);

    if (selectedRowKeys.length === data.length) {
    
  
      setSelectedRowKeys([]);

    } else {

      //setSelectedRowKeys(data.map((record) => record.id));

      setSelectedRowKeys(data.map((record) => record.foodCode));

    }
  };

  /*
   * Handle sorting
   */
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: 'createdAt',
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
  



  //console.log('startDate===', startDate);
  //console.log('endDate===', endDate);



  /*
  const fetchData = async () => {


    setLoading(true);


    const res = await fetch('/api/doingdoit/food/getAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        limit: countPerPage,
        page: currentPage,
        sort: sortConfig.key,
        order: sortConfig.direction,
        q: debouncedSearch,
        startDate: startDate,
        endDate: endDate,
        foodTypeArray: foodTypeArray,
        }),
    });

    const posts  = await res?.json() as any;

    setData(posts?.data?.foods);
    setTotalCount(posts?.data?.totalCount);


    setLoading(false);

  }
  */


  useEffect(() => {

    const fetchData = async () => {

      const res = await fetch(`/api/doingdoit/food/getFoodType`);
      const data = await res.json() as any;

      ///console.log('getFoodType data.data==========', data.data);


      setFoodType(data.data);

    }

    fetchData();

  } , [totalCount]);


  /*
   * Handle delete
   */
  


  /*
   * Handle delete
   */



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

    console.log("handleSearch===", searchValue);
    
    setSearchTerm(searchValue);

    //setCurrentPage(1);

  }
  

  /*
  function handleSearch(
    searchValue: string,
    countPerPage: number = 10,
    currentPage: number = 1,
    startDate: Date | string = '',
    endDate: Date | string = '',
    foodTypeArray?: string[],
  ) {
    
    ///setSearchTerm(searchValue);

    console.log('handleSearch searchValue : ' + searchValue);


    fetchData(
      searchValue,
      countPerPage,
      currentPage,
      startDate,
      endDate,
      foodTypeArray,
    );

  }
  */







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

    ////////fetchTotalCount();

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

  
  
  const filteredAndSearchedData = isFiltered ? applyFilters() : searchedData();

  
  //const tableData = paginatedData(filteredAndSearchedData);

  const tableData = data ? data : [];






  useEffect(() => {

    
    const fetchData = async () => {

      
      console.log('use-table-food useEffect fetchData');

      
    
      console.log('use-table-food useEffect currentPage', currentPage);
      console.log('use-table-food useEffect debouncedSearch', debouncedSearch);
      console.log('use-table-food useEffect countPerPage', countPerPage);
      console.log('use-table-food useEffect sortConfig', sortConfig);
      console.log('use-table-food useEffect foodType', foodType);
      

      if (foodType.length === 0) return;


      setLoading(true);
  
  
      const res = await fetch('/api/doingdoit/food/getAll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          limit: countPerPage,
          page: currentPage,
          sort: sortConfig.key,
          order: sortConfig.direction,
          q: debouncedSearch,
          startDate: '',
          endDate: '',
          foodTypeArray: foodType,
  
        }),
      });
  
      const posts  = await res?.json() as any;
  
      
      ///console.log("use-table-food useEffect posts===", posts?.data);
  
  
      setData(posts?.data?.foods);
      setTotalCount(posts?.data?.totalCount);
  
  
  
      setLoading(false);

  
    };

    fetchData();
    
    
    

  }
  //,[ currentPage, debouncedSearch, countPerPage, foodType]);
  
  ,[ countPerPage, currentPage, sortConfig, debouncedSearch, foodType]);



  /*
   * Go to first page when data is filtered and searched
   */
  
  
  useEffect(() => {

    handlePaginate(1);


  }, [isFiltered, debouncedSearch, countPerPage, sortConfig, foodType]);
  




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
    handleReset,


    foodType,
    
  };
}
