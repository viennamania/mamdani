import { useState, useEffect, useMemo, use } from 'react';
import isString from 'lodash/isString';
import { m } from 'framer-motion';
import { stats } from '@/app/shared/logistics/customer-profile/data';

interface AnyObject {
  [key: string]: any;
}

export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,



  initialFilterState?: Partial<Record<string, any>>,

  startDate?: string,
  endDate?: string,

) {

  /*
   * Table data
   */
  const [data, setData] = useState(initialData);

  /*
  * Dummy loading state.
  */
  const [isLoading, setLoading] = useState(true);

  
  



  ////const [statsData, setStatsData] = useState([] as any);





  ///async function fetchStats(

  /*
  const fetchStats = async function(
    mealDate: string,
  ) {

    setStatsData([] as any);


    const res = await fetch('/api/doingdoit/feed/getStats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mealDate: mealDate })
    });

    const posts  = await res?.json() as any;

    posts.data.length === 0 && setStatsData(
      (prevStatsData: any) => [
        ...prevStatsData,
        { "mealDate": mealDate }
      ]
    );


    posts.data.map((item: any) => {

      const columnName = item.feedbackWriterNickname;

      const columnValue = item.feedbackCount;

      setStatsData( (prevStatsData: any) => {
          
        const found = prevStatsData.find((item: any) => item.mealDate === mealDate);

        if (found) {
          return prevStatsData.map((item: any) => item.mealDate === mealDate ? { ...item, [columnName]: columnValue } : item);
        } else {
          return [
            ...prevStatsData,
            { "mealDate": mealDate, [columnName]: columnValue }
          ];
        }

      });


    } );


  }
  */


  ////console.log("statsData======", statsData);









  console.log("data======", data);



  /*
  useEffect(() => {
    console.log("statsData======", statsData);

  
    // sort statsData by mealDate and set data
    // 


    setData(
      statsData.sort((a: any, b: any) => {
        return new Date(b.mealDate).getTime() - new Date(a.mealDate).getTime();
      })
    );




  } ,[statsData]);
  */



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
   * Handle delete
   */
  function handleDelete(id: string | string[]) {

    const updatedData = Array.isArray(id)
      ? data.filter((item) => !id.includes(item.id))
      : data.filter((item) => item.id !== id);

    setData(updatedData);
    
  }



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


  /*
   * Handle searching
   */
  function handleSearch(searchValue: string) {
    
    setSearchTerm(searchValue);

    setCurrentPage(1);

    fetchData();


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

    /*
    setData(() => initialData);
    handleSearch('');
    if (initialFilterState) return setFilters(initialFilterState);
    */

    handleSearch('');





    const fetchData = async () => {

      setLoading(true);
  

      const start = new Date( new Date().getFullYear(), new Date().getMonth(), 1 );
      const end = new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 );

  
      const res = await fetch('/api/doingdoit/feed/getStatsAll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          limit: countPerPage,
          page: currentPage,
          sort: sortConfig.key,
          order: sortConfig.direction,
          q: searchTerm,
          startMealDate: start, endMealDate: end
        })
      });
  
      const posts  = await res?.json() as any;
  
  
      //console.log("posts.data.data============", posts.data.data);


  
      if (!posts?.data?.data) {
        setLoading(false);
        return;
      }
    
      setData(posts?.data?.data);
  
  
      
  
      setTotalCount(posts?.data?.totalCount);
      
              
  
  
      setLoading(false);
  
  
    };
  


    fetchData();



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


  //////const tableData = paginatedData(filteredAndSearchedData);


  const tableData = data;



  /*
   * Go to first page when data is filtered and searched
   */
  useEffect(() => {

    handlePaginate(1);
  }, [isFiltered, searchTerm]);






  /* get total count */
  const [totalCount, setTotalCount] = useState(0);





  const fetchData = async () => {

    setLoading(true);

    // start is plus 1 day from startDate
    //const start = new Date(startDate as string); 
    const start =  new Date(new Date(startDate as string).getTime() + 24 * 60 * 60 * 1000);


    // end is plus 1 day from endDate
    ///const end = new Date(endDate as string);
    const end =  new Date(new Date(endDate as string).getTime() + 24 * 60 * 60 * 1000);


    const res = await fetch('/api/doingdoit/feed/getStatsAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        limit: countPerPage,
        page: currentPage,
        sort: sortConfig.key,
        order: sortConfig.direction,
        q: searchTerm,
        startMealDate: start, endMealDate: end
      })
    });

    const posts  = await res?.json() as any;


    //console.log("posts.data.data============", posts.data.data);



    if (!posts?.data?.data) {
      setLoading(false);
      return;
    }
  
    setData(posts?.data?.data);


    

    setTotalCount(posts?.data?.totalCount);
    
            


    setLoading(false);


  };

  
  
  useEffect(() => {  

    fetchData();

  } ,[currentPage]);

  












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
