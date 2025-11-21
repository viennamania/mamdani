'use client';


import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/doingdoit/widget-card';


import { PiMagnifyingGlassBold } from 'react-icons/pi';


import { useColumn } from '@/hooks/use-column';

import ControlledTable from '@/components/doingdoit/controlled-table';

import cn from '@/utils/class-names';

import DateFiled from '@/components/controlled-table/date-field';

import { getDateRangeStateValues } from '@/utils/get-formatted-date';

import { Button } from '@/components/ui/button';

import { CiSearch } from "react-icons/ci";

import { DatePicker } from '@/components/ui/datepicker';

import React, { use, useState, useEffect } from 'react';

import { useTable } from '@/hooks/doingdoit/use-table-survey-stats';



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
};


type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};






export default function SurveyStatsTableWidget({
  title,
  data = [],
  
  getColumns,

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




  const [startDate, setStartDate] = useState<Date>(
    new Date( new Date().getFullYear(), new Date().getMonth(), 1 )
  );
  
  
  
  
  const [endDate, setEndDate] = useState<Date>(
    new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 )
  );




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

    //handleSearch,

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

  const { visibleColumns } = useColumn(columns);

 
  const isMediumScreen = true;



  // group by mbti
  // count and percentage


  // array of object
  /* {
    "mbti": "INTJ",
    "count": 5,
    "percentage": 11.904761904761903
  }
  */





  const [mbtiStats, setMbtiStats] = useState<
    {
      mbti: string;
      count: number;
      percentage: number;
    }[]
  >([]);



  const [questionStats, setQuestionStats] = useState<any[]>([]);

  /*
  [{"question":"평소 밥 먹는 스타일은?","count1":4,"count2":19,"count3":14,"count4":2},{"question":"평소 고지방 육류(삼겹살, 갈비, 곱창 등)를 먹는 스타일은?","count1":10,"count2":16,"count3":12,"count4":1},{"question":"평소 야채나 채소를 먹는 스타일은?","count1":7,"count2":22,"count3":10,"count4":0},{"question":"평소 빵, 케이크, 과자, 초콜릿 등 간식 먹는 스타일은?","count1":11,"count2":13,"count3":13,"count4":2},{"question":"평소 음주 스타일은?","count1":7,"count2":16,"count3":15,"count4":1},{"question":"평소 야식 스타일은?","count1":10,"count2":15,"count3":12,"count4":2},{"question":"처음 와본 식당에서 무엇을 먹을 지 고민 중이다. 당신의 선택은?","count1":16,"count2":23,"count3":0,"count4":0},{"question":"얼굴만 알고 지내던 옆옆팀 사람들과 같이 밥을 먹게 되었다. 당신의 반응은?","count1":28,"count2":11,"count3":0,"count4":0},{"question":"건강을 위해 식단관리를 시작했다. 점심은 주로 회사에서 먹는 편. 당신의 선택은?","count1":25,"count2":14,"count3":0,"count4":0},{"question":"친구가 주말에 다녀온 디저트 가게에서 인생 디저트를 만났다고 한다. 당신의 반응은?","count1":19,"count2":20,"count3":0,"count4":0},{"question":"토요일 날 친구들과 점심, 디저트, 저녁까지 온 종일 함께 시간을 보내고 집에 돌아왔다. 당신의 상태는?","count1":21,"count2":18,"count3":0,"count4":0},{"question":"난생 처음으로 탕후루를 먹어보았다. 당신의 반응은?","count1":23,"count2":16,"count3":0,"count4":0},{"question":"바디 프로필 촬영을 위해 식단을 관리 중이다. 친구가 연인과 헤어졌다고 술 한잔하자고 한다. 당신의 선택은?","count1":25,"count2":14,"count3":0,"count4":0},{"question":"먹방 예능 '맛있는녀석들'에 평소 자주가던 화덕피자 가게가 나왔다. 당신의 반응은?","count1":16,"count2":23,"count3":0,"count4":0},{"question":"친구가 '민트초코떡볶이'가 출시되었다고 같이 먹으러 가자고 한다. 당신의 반응은?","count1":24,"count2":15,"count3":0,"count4":0},{"question":"여행지에서 식당을 고르는 중이다. 당신의 반응은?","count1":11,"count2":28,"count3":0,"count4":0}]
  */


 
  const handleSearch = (startDate: string, endDate: string) => {

    // fetch data from api

    const fetchData = async () => {
      const response = await fetch('/api/doingdoit/survey/getStatsByMbti', {
        method: 'POST',
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json() as any;

      console.log("getStatsByMbti: ", data?.data);

      setMbtiStats(data?.data);

    }

    fetchData();




    const fetchData2 = async () => {
      const response = await fetch('/api/doingdoit/survey/getStatsByQuestion', {
        method: 'POST',
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json() as any;

      ///console.log("getStatsByQuestion: ", data?.data);

      setQuestionStats(data?.data);

    }



    fetchData2();

  
  };


  useEffect(() => {
      
      handleSearch(
        startDate.toISOString(),
        endDate.toISOString(),
      );
  
    }, []);




  return (

    <WidgetCard
      title={title}
      className={cn('flex flex-col', className)}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      {...(enableSearch && {
        action: (


          <div className='flex flex-wrap items-center justify-start gap-3'>

          <div className=' w-16 flex flex-row items-center justify-start gap-3'>
            일자
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

          <div className='flex flex-row items-center justify-center gap-3'>
            <Button
              className="w-24 bg-gray-200 text-black "
              onClick={() => {

          
                setStartDate(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
                setEndDate(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
              
                /*
                handleSearch("");
                */
      
                handleSearch(
                  new Date( new Date().getFullYear(), new Date().getMonth(), 1 ).toISOString(),
                  new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ).toISOString(),
                );
              }}

            
            >
              초기화
            </Button>
            <Button
              className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"

              onClick={() => {
                //handleSearch();
      
                handleSearch(
                  startDate.toISOString(),
                  endDate.toISOString(),
                );
      
              }}
            >
              <CiSearch className="me-1.5 h-[17px] w-[17px]" />
              검색
            </Button>
          </div>

        </div>          

        ),
      })}
    >

      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7')}
      >


        {/* mbti stats */}
        <div className="mt-4 flex flex-row items-center justify-start gap-3">
          <div className="flex flex-row items-center justify-start gap-3">
            <div className="text-xl font-bold">유형별 통계</div>
          </div>
        </div>

        <table className="mt-4 w-full border-2 border-gray-200">

          <thead className="bg-gray-200

            border-2 border-gray-200

          ">
            <tr>
              {
                mbtiStats.map((item, index) => (
                  <th key={index} className="p-2 text-sm ">{item.mbti}</th>
                ))
              }
            
            </tr>
          </thead>
          <tbody>
            <tr>
              {
                mbtiStats.map((item, index) => (
                  <td
                    key={index}
                    className="p-2 text-sm text-center border-2 border-gray-300"
                  >
                    {item.count} 명 ({item.percentage?.toFixed(2)}%)
                  </td>
                ))
              }
            </tr>
          </tbody>

        </table>




        {/* question stats */}
        <div className="mt-4 flex flex-row items-center justify-start gap-3">
          <div className="flex flex-row items-center justify-start gap-3">
            <div className="text-xl font-bold">질문별 통계</div>
          </div>
        </div>

        <table className="mt-4 w-full border-2 border-gray-200">
            
            <thead className="bg-gray-200
  
              border-2 border-gray-200
  
            ">
              <tr>
                <th className="p-2
                w-[5%]
                ">No</th>
                <th className="p-2
                w-[55%]
                ">질문</th>
                <th className="p-2
                w-[10%]
                ">답변1</th>
                <th className="p-2
                w-[10%]
                ">답변2</th>
                <th className="p-2
                w-[10%]
                ">답변3</th>
                <th className="p-2
                w-[10%]
                ">답변4</th>
              </tr>
            </thead>
            <tbody>
              {
                questionStats.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 text-center border-2 border-gray-300 ">{index+1}</td>
                    <td className="p-2 text-left border-2 border-gray-300  ">{item.question}</td>
                    <td className="p-2 text-center border-2 border-gray-300">{item.count1}명</td>
                    <td className="p-2 text-center border-2 border-gray-300">{item.count2}명</td>
                    <td className="p-2 text-center border-2 border-gray-300">{item.count3}명</td>
                    <td className="p-2 text-center border-2 border-gray-300">{item.count4}명</td>
                  </tr>
                ))
              }
            </tbody>

        </table>



        {/*
        <ControlledTable
          isLoading={isLoading}
          data={tableData}
          columns={visibleColumns}
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
        */}

      </div>


    </WidgetCard>
    
  );
}
