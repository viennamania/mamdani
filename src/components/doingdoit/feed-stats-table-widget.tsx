'use client';


import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';




import { useColumn } from '@/hooks/use-column';

//import ControlledTable from '@/components/controlled-table';

import ControlledTable from '@/components/doingdoit/controlled-table';


import cn from '@/utils/class-names';

import DateFiled from '@/components/controlled-table/date-field';

import { getDateRangeStateValues } from '@/utils/get-formatted-date';

import { Button } from '@/components/ui/button';

import { CiSearch } from "react-icons/ci";

import { DatePicker } from '@/components/ui/datepicker';

import React, { use, useState, useEffect } from 'react';

import { useTable } from '@/hooks/doingdoit/use-table-feed-stats';

//import { getColumns } from '@/app/shared-doingdoit/feed/stats-columns';


import { HeaderCell } from '@/components/ui/table';
import { Title, Text } from '@/components/ui/text';
import { set } from 'lodash';


import { useSearchParams, useRouter } from 'next/navigation'
import { D } from '@uploadthing/react/types-f6db134c';


import { PiMagnifyingGlassBold, PiDownloadSimpleBold } from 'react-icons/pi';

import * as XLSX from "xlsx";
import { stats } from '@/app/shared/logistics/customer-profile/data';
import { it } from 'node:test';




type Columns = {

  title : any;
  dataIndex : string;
  key: string;
  width: number;
  render: (value: string) => any;

  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};







type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  checkedItems?: string[];
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
  
  /*
  getColumns: ({
    data,
    sortConfig,
    checkedItems,
    handleSelectAll,
    onDeleteItem,
    onHeaderCellClick,
    onChecked,
  }: ColumnTypes) => any;
  */

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




export default function FeedStatsTableWidget({

  title,
  data = [],
  
  ///getColumns,

  pageSize = 10,
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

}: BasicTableWidgetProps) {






  const router = useRouter();

  // get params from query string
  const searchParams = useSearchParams();
  
  
  /*
  const paramStartDate = searchParams.get('paramStartDate')
  || new Date( new Date().getFullYear(), new Date().getMonth(), 1 ).toISOString();
  
  const paramEndDate = searchParams.get('paramEndDate')
  || new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ).toISOString();
  */
  
  

  // conver startDate and endDate to 'YYYY-MM-DD' format


  
  const [startDate, setStartDate] = useState<Date>(
    new Date( new Date().getFullYear(), new Date().getMonth(), 1 )
  );
  
  
  
  
  const [endDate, setEndDate] = useState<Date>(
    new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 )
  );

  /*

  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));

  const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));


  */


  




  console.log("startDate==========", startDate);
  console.log("endDate============", endDate);


  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);
  };


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

    handleReset,

  } = useTable(

    data,
    pageSize,

    [],

    startDate.toISOString(),
    endDate.toISOString(),

  );



    /*
  const columns = React.useMemo(
    () =>

      getColumns({
        //data,
        sortConfig,
        onHeaderCellClick,
        onDeleteItem,
        //checkedItems: selectedRowKeys,
        //onChecked: handleRowSelect,
        //handleSelectAll,
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
    */



  //const { visibleColumns } = useColumn(columns);

  /*
    getColumns: ({
    data,
    sortConfig,
    checkedItems,
    handleSelectAll,
    onDeleteItem,
    onHeaderCellClick,
    onChecked,
  }: ColumnTypes) => any;
  */

  
  const [visibleColumns, setVisibleColumns] = useState(null) as any;
    






  const [feedbackWriterList, setFeedbackWriterList] = useState([] as string[]);



  useEffect(() => {

    // fetch columns from server by api call

    const getFeedbackWriter = async () => {

      
      //const response = await fetch('/api/doingdoit/feed/getAllFeedbackWriter');


      // POST
      const response = await fetch('/api/doingdoit/feed/getAllFeedbackWriter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
      });




      const data = await response.json() as any;

      console.log("getAllFeedbackWriter data", data);

      //const feedbackWriter = data?.data?.nickname;

      /*
      setVisibleColumns(
        getColumns({
          data,
          sortConfig,
          onHeaderCellClick,
          onDeleteItem,
          checkedItems: selectedRowKeys,
          onChecked: handleRowSelect,
          handleSelectAll,
        })
      );
      */


      ///setVisibleColumns(columns);


      setFeedbackWriterList(data?.data?.map((item: any) => item.nickname));

      data?.data?.map((item: any) => {

        ///console.log("item.nickname", item.nickname);

        ///setFeedbackWriterList(feedbackWriterList => [...feedbackWriterList, item.nickname]);


      } );



      // dynamic columns from server



      const getColumns = ({
        sortConfig,
        onDeleteItem,
        onHeaderCellClick,
      }: Columns): Columns[] => {

        const columns: Columns[] = [

          /* No */
          {
            title: <HeaderCell title="No" />,
            dataIndex: 'sequenceNumber',
            key: 'sequenceNumber',
            width: 30,
            
            render: (value: string) => <Text className="text-center">{value}</Text>,

            onDeleteItem: function (id: string): void {
              throw new Error('Function not implemented.');
            },
            onHeaderCellClick: function (value: string): void {
              throw new Error('Function not implemented.');
            }
          },

          /* 일자 */

          {
            title: <HeaderCell title="일자" />,
            dataIndex: 'mealDate',
            key: 'mealDate',
            width: 60,
            render: (value: string) => <Text className="text-center">{value}</Text>,
            onDeleteItem: function (id: string): void {
              throw new Error('Function not implemented.');
            },
            onHeaderCellClick: function (value: string): void {
              throw new Error('Function not implemented.');
            }
          },


        ];

        data?.data?.forEach((item: any) => {
          console.log("item.nickname", item.nickname);

          columns.push({
            title: <HeaderCell title={item.nickname} />,
            dataIndex: item.nickname,
            key: item.nickname,
            width: 40,
            render: (value: string) => <Text className="text-center">
              {
                value ? value : 0
              }건
            </Text>,
            onDeleteItem: function (id: string): void {
              throw new Error('Function not implemented.');
            },
            onHeaderCellClick: function (value: string): void {
              throw new Error('Function not implemented.');
            }
          });

        });

        return columns;
      };







      /*
      console.log("getColumns", getColumns);

      const columnsData = getColumns({
        title: "", // Add the missing 'title' property
        dataIndex: "", // Add the missing 'dataIndex' property
        key: "", // Add the missing 'key' property
        width: 0, // Add the missing 'width' property
        render: (value: string) => <Text className="text-center">{value}</Text>, // Add the missing 'render' property
        sortConfig,
        onHeaderCellClick,
        onDeleteItem,
      });


      setVisibleColumns(columnsData);
      */

      setVisibleColumns(

        getColumns({
          title: "", // Add the missing 'title' property
          dataIndex: "", // Add the missing 'dataIndex' property
          key: "", // Add the missing 'key' property
          width: 0, // Add the missing 'width' property
          render: (value: string) => <Text className="text-center">{value}</Text>, // Add the missing 'render' property
          sortConfig,
          onHeaderCellClick,
          onDeleteItem,
        })

      );





    }

    getFeedbackWriter();

  } ,[ ]);
 



  console.log('visibleColumns', visibleColumns);




  const isMediumScreen = true;









  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = async (fileName: string) => {

    setIsExporting(true);


      ///setStatsData([] as any);

      const items = [] as any;


      let mealDateArray = [] as any;

      // make array from startDate and endDate

      // start is plus 1 day from startDate
      //const start = new Date(startDate as string); 
      const start =  new Date(startDate.getTime() + 24 * 60 * 60 * 1000);


      // end is plus 1 day from endDate
      ///const end = new Date(endDate as string);
      const end =  new Date(endDate.getTime() + 24 * 60 * 60 * 1000);



      const res = await fetch('/api/doingdoit/feed/getStatsAllDownload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          limit: 1000,
          page: 1,
          sort: sortConfig.key,
          order: sortConfig.direction,
          q: searchTerm,
          startMealDate: start,
          endMealDate: end
        })
      });
  
      const posts  = await res?.json() as any;



      console.log("posts?.data?.data=====", posts?.data?.data);


      

    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';

    /*
    const formattedData = items.map((item) => {
      const { id, ...rest } = item;
      return rest;
    });
    */


    console.log("feedbackWriterList", feedbackWriterList);

    /*
    [
    "김회피",
    "김구매주문",
    "주진우",
    "장연수",
    "정수민",
    "하하하",
    "고민정",
    "손지명",
    "이정훈",
    "손오공",
    "김정은",
    "정은아",
    "이은정",
    "원클릭"
    ]
    */

  



    const formattedData  = [] as any[];


    posts?.data?.data.map((item : any  , index : number) => {


      //const { id, ...rest } = item;


    
      console.log("item", item);
      /*
      {
        "mealDate": "2024-03-07",
        "원클릭": 1
      }
      */

      /*
      feedbackWriterList =     [
          "김회피",
          "김구매주문",
          "주진우",
          "장연수",
          "정수민",
          "하하하",
          "고민정",
          "손지명",
          "이정훈",
          "손오공",
          "김정은",
          "정은아",
          "이은정",
          "원클릭"
          ]

      /*
      formattedData = [
      
        {'일자': '2024-03-07', '김회피': 1, '김구매주문': 1, '주진우': 1, '장연수': 1, '정수민': 1, '하하하': 1, '고민정': 1, '손지명': 1, '이정훈': 1, '손오공': 1, '김정은': 1, '정은아': 1, '이은정': 1, '원클릭': 1}
        {'일자': '2024-03-06', '김회피': 1, '김구매주문': 1, '주진우': 1, '장연수': 1, '정수민': 1, '하하하': 1, '고민정': 1, '손지명': 1, '이정훈': 1, '손오공': 1, '김정은': 1, '정은아': 1, '이은정': 1, '원클릭': 1}
        {'일자': '2024-03-05', '김회피': 1, '김구매주문': 1, '주진우': 1, '장연수': 1, '정수민': 1, '하하하': 1, '고민정': 1, '손지명': 1, '이정훈': 1, '손오공': 1, '김정은': 1, '정은아': 1, '이은정': 1, '원클릭': 1}
      ]
      */

      /*
      item = {
        "mealDate": "2024-03-07",
        "원클릭": 1
      }
      item = {
        "mealDate": "2024-03-07",
        "김회피": 1
      }
      item = {
        "mealDate": "2024-03-07",
        "김구매주문": 1
      }
      */


      feedbackWriterList.map((writer: string) => {
          
          console.log("writer", writer);
  
          console.log("item[writer]", item[writer]);


          // if formattedData has no item.mealDate, then push new item
          // if formattedData has item.mealDate, then push new item[writer] to item.mealDate

          const found = formattedData.find((element) => element['일자'] === item.mealDate);

          if (found) {

            formattedData.map((element) => {

              if (element['일자'] === item.mealDate) {

                element[writer] = (item[writer] ? item[writer] : 0) + '건';

              }

            });

          } else {

            formattedData.push({
                // item.seqeunceNumber


              ///'일자': item.mealDate ? item.mealDate : '',

              'No': item.sequenceNumber ? item.sequenceNumber : '',

              '일자': item.mealDate ? item.mealDate : '',




              [writer]: (item[writer] ? item[writer] : 0) + '건'


            });

          }


      } );




    } );


    //console.log("formattedData", formattedData);

  



    const ws = XLSX.utils.json_to_sheet(formattedData);

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], { type: fileType });

    const now = new Date();

    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    const time = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;

    const dateTime = `${date}_${time}`;

    const fileNameExtension = `${fileName}_${dateTime}${fileExtension}`;

    ///XLSX.writeFile(data  , fileNameExtension);

    ///XLSX.writeFile(data, fileNameExtension);

    
    XLSX.writeFile(wb, fileNameExtension);

      
  
    setIsExporting(false);


  }







  return (

    <WidgetCard
      title={title}
      className={cn('flex flex-col ', className)}
      //headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      
      {...(enableSearch && {
        action: (

        

        <div className='w-full flex flex-wrap items-center justify-start gap-3'>

          {/*

          <div className=' w-16 flex flex-row items-center justify-start gap-3'>
            등록일
          </div>
        
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              

              console.log("start date====", date);

              setStartDate(date);

            } }

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
            onChange={(date: Date) => {

              console.log("end date====", date);
              setEndDate(date)
            }}
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

          
          <div className='flex flex-row items-center justify-center gap-3'>
            <Button
              className="w-24 bg-gray-200 text-black "
              onClick={() => {
                setStartDate(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
                setEndDate(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
                
               
                handleSearch("");
              }}
            >
              초기화
            </Button>

            <Button
              className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              onClick={() => {
                //handleSearch();

                handleSearch("");

              }}
            >
              <CiSearch className="me-1.5 h-[17px] w-[17px]" />
              검색
            </Button>
          </div>
          
          



            
          <Button
            // excel download
            isLoading={isExporting}
            onClick={() => {

              exportToCSV('feed_stats_data');

            }}

            className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            엑셀다운로드
          </Button>
          
          */}

        </div>        

        ),
      })}
    >


  <div className='w-full flex flex-wrap items-center justify-between gap-3'>

    <div className='flex flex-row items-center justify-start gap-3'>

    <div className=' w-16 flex flex-row items-center justify-start gap-3'>
      등록일
    </div>

    <DatePicker
      selected={startDate}
      onChange={(date: Date) => {
        

        console.log("start date====", date);

        setStartDate(date);

      } }

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
      onChange={(date: Date) => {

        console.log("end date====", date);
        setEndDate(date)
      }}
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


    <div className='flex flex-row items-center justify-center gap-3'>
      <Button
        className="w-24 bg-gray-200 text-black "
        onClick={() => {

          
          setStartDate(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
          setEndDate(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
        
          /*
          handleSearch("");
          */

          handleReset();
        }}
      >
        초기화
      </Button>

      <Button
        className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
        onClick={() => {
          //handleSearch();

          handleSearch("");

        }}
      >
        <CiSearch className="me-1.5 h-[17px] w-[17px]" />
        검색
      </Button>
    </div>

    </div>





  
    <Button
      // excel download
      isLoading={isExporting}
      onClick={() => {

        exportToCSV('feed_stats_data');

      }}

      className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
      <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
      엑셀다운로드
    </Button>

  

  </div>  

      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7')}
      >

        {/* totalItems */}
        
        <div className=" mt-7 flex flex-row items-center justify-between pt-5 border-t  border-slate-300 dark:border-slate-700">

          <div className="flex flex-row items-center justify-start gap-3">
            <div className="text-base font-medium text-gray-900 dark:text-gray-100">
              총 {totalItems}개
            </div>
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


        {/* table is scrollable horizontally */}



        <div className="">

          <ControlledTable
            isLoading={isLoading}


            data={
                tableData
            }
            

            //columns={
            //  visibleColumns && visibleColumns.length > 0 ? visibleColumns : []
            //}


            columns={

              visibleColumns && visibleColumns.length > 0 ? visibleColumns : []

            }


            scroll={scroll}
            sticky={sticky}
            variant={variant}

            className="mt-4"
            
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


      </div>
    </WidgetCard>
    
  );
}
