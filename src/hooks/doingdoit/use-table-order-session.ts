import { useState, useEffect, useMemo } from 'react';
import isString from 'lodash/isString';


import { useSession, signOut } from 'next-auth/react';
import { u } from 'uploadthing/dist/types-e8f81bbc';



interface AnyObject {
  [key: string]: any;
}

export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  initialFilterState?: Partial<Record<string, any>>
) {


  const { data: session, status } = useSession();


  const [userData, setUserData] = useState({
    id: '',
    avatar: '',
    nickname: '',
    email: '',
    mobile: '',
    walletAddress: '',
    sellerAccountNumber: '',
    stabilityId: '',
  });

  //const [walletAddress, setWalletAddress] = useState('');
  const [sellerAccountNumber, setSellerAccountNumber] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        
        const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
    
        const posts  = await res?.json() as any;
    
        setUserData(posts?.data);

        console.log("useTable-notification userData:", posts?.data);

        //setWalletAddress(posts?.data?.walletAddress || '');
        setSellerAccountNumber(posts?.data?.sellerAccountNumber || '');
    
      };
  
      fetchData();
    }
  } , [status, session?.user?.email]);


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
    key: 'createdAt', // 'createdAt
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
  
  
      await fetch(`/api/doingdoit/point/deleteOne?id=${id}`);



      const res = await fetch(`/api/doingdoit/point/getCount?email=${session?.user?.email}&_q=${searchTerm}`);
  
      const posts  = await res?.json() as any;
  
      ///console.log(posts.data);
  
      setTotalCount(posts?.data);
    

    
      const res2 = await fetch(`/api/doingdoit/point/getAll?_limit=${countPerPage}&_page=${currentPage}&_sort=${sortConfig.key}&_order=${sortConfig.direction}&_q=${searchTerm}`);
  
      const posts2  = await res2?.json() as any;


      setData(posts2?.data);
          
  
      setLoading(false);

    }

    deleteData();

    
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

  }








  const fetchData = async () => {
    

      const res = await fetch('/api/oneclick/order/getAllBuyOrdersBySellerAccountNumber',{



        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stabilityId: userData?.stabilityId,
          accountNumber: sellerAccountNumber,

          fromDate: "",
          toDate: "",
          limit: countPerPage,
          page: currentPage,
          //searchKeyword: debouncedSearch,

          privateSale: false,


          sortBy: "createdAt",
          sortOrder: "desc",
        }),
      });


    const orders  = await res?.json() as any;

    //console.log("useTable-order-session orders:", orders);



    setData(orders?.result?.orders || []);

    setTotalCount(orders?.result?.totalCount || 0);

  };




  function searchedData() {


    if (!searchTerm) return sortedData;

    /*
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
    */

    return sortedData;
    


    ////fetchData();

    //return data;

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


  ///const tableData = paginatedData(filteredAndSearchedData);

  const tableData = data;





  useEffect(() => {


    const fetchData = async () => {
      

      setLoading(true);
  


        /*
        const res = await fetch('/api/doingdoit/order/getAll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            walletAddress: walletAddress,
            userId: userData?.id,
            limit: countPerPage,
            page: currentPage,
            sort: sortConfig.key,
            order: sortConfig.direction,
            q: searchTerm,
          }),
        });

        const posts  = await res?.json() as any;

        setData(posts?.data?.orders || []);

        setTotalCount(posts?.data?.totalCount);
        */



        //const res = await fetch('/api/oneclick/order/getAllBuyOrders',{

        const res = await fetch('/api/oneclick/order/getAllBuyOrdersBySellerAccountNumber',{



          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stabilityId: userData?.stabilityId,
            accountNumber: sellerAccountNumber,

            fromDate: "",
            toDate: "",
            limit: countPerPage,
            page: currentPage,
            //searchKeyword: debouncedSearch,

            privateSale: false,


            sortBy: "createdAt",
            sortOrder: "desc",
          }),
        });


      const orders  = await res?.json() as any;

      console.log("useTable-order-session orders:", orders);



      setData(orders?.result?.orders || []);

      setTotalCount(orders?.result?.totalCount || 0);

      ///console.log("FrameComponentFeeds orders=", orders);
  

        /*
        {
          result: {
            totalCount: 37433,
            totalKrwAmount: 16039268000,
            totalUsdtAmount: 10709055.43,
            totalSettlementCount: 37430,
            totalSettlementAmount: 10642674.061,
            totalSettlementAmountKRW: 15939847323,
            totalFeeAmount: 65043.599,
            totalFeeAmountKRW: 97417897.758,
            totalAgentFeeAmount: 0,
            totalAgentFeeAmountKRW: 0,
            orders: [
              [Object], [Object],
              [Object], [Object],
              [Object], [Object],
              [Object], [Object],
              [Object], [Object]
            ]
          }
        }
        */

        /*
        orders: [
        {
          "_id": "6921150bd26c3d7f10f45dde",
          "chain": "bsc",
          "lang": null,
          "storecode": "arygljqt",
          "walletAddress": "0x6BB95DF4dcBe4D3C7C380B68E259E92e94Bd5D88",
          "nickname": "maru0611",
          "mobile": "+821012345678",
          "avatar": null,
          "userType": "BBB",
          "userStats": {
              "totalPaymentConfirmedCount": 348,
              "totalPaymentConfirmedKrwAmount": 55420000,
              "totalPaymentConfirmedUsdtAmount": 37136.333
          },
          "usdtAmount": 112.58,
          "krwAmount": 170000,
          "rate": 1510,
          "createdAt": "2025-11-22T01:42:35.640Z",
          "status": "paymentConfirmed",
          "privateSale": false,
          "buyer": {
              "depositBankName": "카카오뱅크",
              "depositBankAccountNumber": "3333136255937",
              "depositName": "박현호"
          },
          "paymentMethod": "bank",
          "tradeId": "59780439",
          "escrowWallet": {
              "address": "0x5bfbA7AA3D0dc12969052f33B9BCC18006A57F4b",
              "privateKey": "0x8f713397a8095b506dbaab77087f6106b028c3bbdbe68491dab26630f750cb10"
          },
          "audioOn": true,
          "returnUrl": "",
          "acceptedAt": "2025-11-22T01:42:38.983Z",
          "seller": {
              "walletAddress": "0x00A6842aEDc1a3BB22d82467d60d9eef3dE63BD6",
              "nickname": "seller",
              "avatar": "",
              "mobile": "+82",
              "memo": "카카오뱅크 111111111111111 지코인",
              "bankInfo": {
                  "bankName": "농협",
                  "accountNumber": "3521606826983",
                  "accountHolder": "김경현"
              }
          },
          "escrowTransactionHash": null,
          "paymentRequestedAt": "2025-11-22T01:42:42.817Z",
          "autoConfirmPayment": true,
          "escrowTransactionConfirmedAt": "2025-11-22T01:43:14.206Z",
          "paymentAmount": 170000,
          "paymentConfirmedAt": "2025-11-22T01:43:14.206Z",
          "queueId": "d42a4ea6-ffbe-4843-823c-6fd0988b9436",
          "sellerWalletAddressBalance": 7072.890801199988,
          "transactionHash": "0x19dfc3b2a7e39c86f4891a038065c0c77f174acb4511a0443a8a452c4e4dbf97",

        }
        ]
        */










      
    
  
      setLoading(false);
  
    };

    fetchData();
  }
  ,[ searchTerm, sortConfig, currentPage, countPerPage, userData?.id,  sellerAccountNumber, userData?.stabilityId]);

  //,[sortConfig, currentPage, countPerPage, sellerAccountNumber, userData?.stabilityId]);




  /*
   * Go to first page when data is filtered and searched
   */
  /*
  useEffect(() => {

    handlePaginate(1);


  }, [isFiltered, searchTerm]);
  */




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
