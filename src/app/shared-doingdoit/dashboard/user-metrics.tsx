'use client';

import WidgetCard from '@/components/doingdoit/widget-card';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { useMedia } from '@/hooks/use-media';
import {
  RoundedTopBar,
  RoundedTopBarFill,
} from '@/components/charts/rounded-topbar';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import ButtonGroupAction from '@/components/charts/button-group-action';
import cn from '@/utils/class-names';
import SimpleBar from '@/components/ui/simplebar';


import DateFiled from '@/components/controlled-table/date-field';

import { getDateRangeStateValues } from '@/utils/get-formatted-date';

import { Button } from '@/components/ui/button';

import { CiSearch } from "react-icons/ci";

import {
  PiAddressBook,
  PiGraph,
  
} from 'react-icons/pi';



import { use, useState, useEffect } from 'react';

import { DatePicker } from '@/components/ui/datepicker';
import { date } from 'date-arithmetic';





const data = [
  {
    day: '2023-10-01',
    가입자: 5000,
  },
  {
    day: '2023-10-02',
    가입자: 8500,
  },
  {
    month: 'Mar',
    day: '2023-10-03',
    가입자: 7000,
    user: 3000,
    sessions: 8300,
  },
  {
    month: 'Apr',
    day: '2023-10-04',
    가입자: 5780,
    user: 3908,
    sessions: 6798,
  },
  {
    month: 'May',
    day: '2023-10-05',
    가입자: 4890,
    user: 2500,
    sessions: 5000,
  },
  {
    month: 'Jun',
    day: '2023-10-06',
    가입자: 8000,
    user: 3200,
    sessions: 7800,
  },
  {
    month: 'Jul',
    day: '2023-10-07',
    가입자: 4890,
    user: 2500,
    sessions: 8500,
  },
  {
    month: 'Aug',
    day: '2023-10-08',
    가입자: 3780,
    user: 3908,
    sessions: 9908,
  },
  {
    month: 'Sep',
    day: '2023-10-09',
    가입자: 7800,
    user: 2800,
    sessions: 8500,
  },
  {
    month: 'Oct',
    day: '2023-10-10',
    가입자: 5780,
    user: 1908,
    sessions: 7208,
  },
  {
    month: 'Nov',
    day: '2023-10-11',
    가입자: 4780,
    user: 1908,
    sessions: 4908,
  },
  {
    month: 'Dec',
    day: '2023-10-12',
    가입자: 7500,
    user: 3000,
    sessions: 9000,
  },
];

/*
const data = [
  {
    month: 'Jan',
    day: '2023-10-01',
    가입자: 5000,
    user: 1600,
    sessions: 4000,
  },
  {
    month: 'Feb',
    day: '2023-10-02',
    가입자: 8500,
    user: 2000,
    sessions: 5798,
  },
  {
    month: 'Mar',
    day: '2023-10-03',
    가입자: 7000,
    user: 3000,
    sessions: 8300,
  },
  {
    month: 'Apr',
    day: '2023-10-04',
    가입자: 5780,
    user: 3908,
    sessions: 6798,
  },
  {
    month: 'May',
    day: '2023-10-05',
    가입자: 4890,
    user: 2500,
    sessions: 5000,
  },
  {
    month: 'Jun',
    day: '2023-10-06',
    가입자: 8000,
    user: 3200,
    sessions: 7800,
  },
  {
    month: 'Jul',
    day: '2023-10-07',
    가입자: 4890,
    user: 2500,
    sessions: 8500,
  },
  {
    month: 'Aug',
    day: '2023-10-08',
    가입자: 3780,
    user: 3908,
    sessions: 9908,
  },
  {
    month: 'Sep',
    day: '2023-10-09',
    가입자: 7800,
    user: 2800,
    sessions: 8500,
  },
  {
    month: 'Oct',
    day: '2023-10-10',
    가입자: 5780,
    user: 1908,
    sessions: 7208,
  },
  {
    month: 'Nov',
    day: '2023-10-11',
    가입자: 4780,
    user: 1908,
    sessions: 4908,
  },
  {
    month: 'Dec',
    day: '2023-10-12',
    가입자: 7500,
    user: 3000,
    sessions: 9000,
  },
];
*/

/*
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
*/

const CustomizedDot = (props: any) => {
  const { cx, cy, value } = props;
  if (value > 2500) {
    return (
      <svg
        x={cx - 10}
        y={cy - 10}
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 36 36"
      >
        <circle cx={18} cy={18} r={18} fill="#FFCC4D" />
        <path
          fill="#664500"
          d="M10.515 23.621C10.56 23.8 11.683 28 18 28c6.318 0 7.44-4.2 7.485-4.379a.499.499 0 0 0-.237-.554.505.505 0 0 0-.6.077C24.629 23.163 22.694 25 18 25s-6.63-1.837-6.648-1.855a.502.502 0 0 0-.598-.081.5.5 0 0 0-.239.557z"
        />
        <ellipse cx={12} cy={13.5} fill="#664500" rx={2.5} ry={3.5} />
        <ellipse cx={24} cy={13.5} fill="#664500" rx={2.5} ry={3.5} />
      </svg>
    );
  }
  return (
    <svg
      x={cx - 10}
      y={cy - 10}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 36 36"
    >
      <path
        fill="#FFCC4D"
        d="M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
      />
      <ellipse cx={11.5} cy={16.5} fill="#664500" rx={2.5} ry={3.5} />
      <ellipse cx={24.5} cy={16.5} fill="#664500" rx={2.5} ry={3.5} />
      <path
        fill="#664500"
        d="M23.485 27.879C23.474 27.835 22.34 23.5 18 23.5s-5.474 4.335-5.485 4.379a.496.496 0 0 0 .232.544.51.51 0 0 0 .596-.06c.009-.007 1.013-.863 4.657-.863 3.59 0 4.617.83 4.656.863a.496.496 0 0 0 .59.073.5.5 0 0 0 .239-.557z"
      />
      <path
        fill="#5DADEC"
        d="M10 30c0 2.762-2.238 5-5 5s-5-2.238-5-5 4-10 5-10 5 7.238 5 10z"
      />
      <path
        fill="#664500"
        d="M30 13c-5.554 0-7.802-4.367-7.895-4.553a1 1 0 0 1 1.787-.899C23.967 7.694 25.713 11 30 11a1 1 0 1 1 0 2zM6 13a1 1 0 0 1 0-2c5.083 0 5.996-3.12 6.033-3.253.145-.528.69-.848 1.219-.709.53.139.851.673.718 1.205C13.921 8.437 12.704 13 6 13z"
      />
    </svg>
  );
};




//const filterOptions = ['Week', 'Month', 'Year'];
const filterOptions = ['전체'];

const enableSearch = true;



export default function UserMetrics(
  { className } : { className?: string }
) {

  const isMediumScreen = useMedia('(max-width: 1200px)', false);
  const isTablet = useMedia('(max-width: 800px)', false);

  function handleFilterBy(data: string) {
    console.log('Audience Metrics Filter:', data);
  }


  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
  const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));



  const [ uaerDailyData, setUserDailyData ] = useState([] as any);

  const fetchDailyData = async (
    startDate: Date,
    endDate: Date,
  ) => {

    // 1. Fetch data from the API (POST)
    try {
      const response = await fetch('/api/doingdoit/user/getStatisticsDaily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // startDate + 1 day

          
          startDate:
            // 1 day added to startDate
            
            ( 
              new Date (
                startDate
                ///new Date(startDate).getTime() + 86400000
              )
            ).toISOString().split('T')[0],
                      

          endDate:
            (
              new Date(endDate)
            ).toISOString().split('T')[0],


        }),
      });

      const data = await response.json() as any;



      ///console.log('data====>', data);

      // 2. Set the data to the state from startDate to endDate from data.data
      let dateArray = [];

      // loop from startDate to endDate
      // '2024-10-01' ~ '2024-10-31' array

    
      ///const start = new Date(startDate).toISOString().split('T')[0];


      ///const start = new Date(startDate).toISOString().split('T')[0];

      // start is plus 1 day
      const start = new Date(new Date(startDate).getTime() + 86400000).toISOString().split('T')[0];
  
      
      //const end = new Date(endDate).toISOString().split('T')[0];
      // end is plus 1 day
      const end = new Date(new Date(endDate).getTime() + 86400000).toISOString().split('T')[0];




      // loop from start to end

      for (let d = new Date(start); d <= new Date(end); d.setDate(d.getDate() + 1)) {

        // match the date with data.data.day
        // if it's not matched, set the count to 0
        // if it's matched, set the count to data.data[i].count

        let exists = false;
        for (let i = 0; i < data.data.length; i++) {
          if (d.toISOString().split('T')[0] === data.data[i].day) {
            dateArray.push({
              day: d.toISOString().split('T')[0],
              가입자수: data.data[i].count,
            });
            exists = true;
            break;
          }
        }

        if (!exists) {
          dateArray.push({
            day: d.toISOString().split('T')[0],
            가입자수: 0,
          });
        }
          
      }

      ///console.log('dateArray====>', dateArray);



      setUserDailyData(dateArray);

    } catch (error) {
      console.log('Error fetching user daily data:', error);
    }
   

  }

  /*
  useEffect(() => {
  

    const fetchDailyData = async () => {

      // 1. Fetch data from the API (POST)

      const response = await fetch('/api/doingdoit/user/getStatisticsDaily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // startDate + 1 day

          
          startDate:
            // 1 day added to startDate
            
            ( 
              new Date (
                startDate
                ///new Date(startDate).getTime() + 86400000
              )
            ).toISOString().split('T')[0],
                      

          endDate:
            (
              new Date(endDate)
            ).toISOString().split('T')[0],


        }),
      });

      const data = await response.json() as any;



      ///console.log('data====>', data);

      // 2. Set the data to the state from startDate to endDate from data.data
      let dateArray = [];

      // loop from startDate to endDate
      // '2024-10-01' ~ '2024-10-31' array

     
      ///const start = new Date(startDate).toISOString().split('T')[0];

      const start = new Date(startDate).toISOString().split('T')[0];

      console.log('startDate====>', startDate);
      console.log('start====>', start);
      
      //const end = new Date(endDate).toISOString().split('T')[0];
      // end is plus 1 day
      const end = new Date(new Date(endDate).getTime() + 86400000).toISOString().split('T')[0];

      console.log('endDate====>', endDate);
      console.log('end====>', end);


      // loop from start to end

      for (let d = new Date(start); d <= new Date(end); d.setDate(d.getDate() + 1)) {

        // match the date with data.data.day
        // if it's not matched, set the count to 0
        // if it's matched, set the count to data.data[i].count

        let exists = false;
        for (let i = 0; i < data.data.length; i++) {
          if (d.toISOString().split('T')[0] === data.data[i].day) {
            dateArray.push({
              day: d.toISOString().split('T')[0],
              가입자수: data.data[i].count,
            });
            exists = true;
            break;
          }
        }

        if (!exists) {
          dateArray.push({
            day: d.toISOString().split('T')[0],
            가입자수: 0,
          });
        }
          
      }

      ///console.log('dateArray====>', dateArray);



      setUserDailyData(dateArray);
     

    }

  
    fetchDailyData();

  }, [startDate, endDate]);
  */
 
  useEffect(() => {

    fetchDailyData(
      new Date( new Date().getFullYear(), new Date().getMonth(), 1 ),
      new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ),
    );

  } , []);

  




  return (

    <WidgetCard
      title={''}
      /*
      description={
        <>
          <Badge
            renderAsDot
            className="me-0.5 bg-[#E8E9FF] dark:bg-[#7c88b2]"
          />{' '}
          Users
          <Badge renderAsDot className="me-0.5 ms-4 bg-[#5a5fd7]" /> New Users
          <Badge renderAsDot className="me-0.5 ms-4 bg-[#8200E9]" /> Sessions
          
          <Badge renderAsDot className="me-0.5 ms-4 bg-[#5a5fd7]" /> 가입자
          
        </>
      }
      descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
      */
      
      /*
      action={
        <ButtonGroupAction
          options={filterOptions}
          onChange={(data) => handleFilterBy(data)}
          className="-ms-2 mb-3 @lg:mb-0 @lg:ms-0"
        />
      }
      */

      headerClassName=" flex-col @lg:flex-row"
      rounded="lg"
      className={className}


      {...(enableSearch && {
        action: (
          <div className='flex flex-wrap items-center justify-between gap-3 '>

            <div className=' w-32 font-semibold flex flex-row items-center justify-start '>
              <PiGraph
                className="w-6 h-6 me-2"
                aria-hidden="true"
              />
              가입 현황 
            </div>

            <DatePicker   
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              ///dateFormat="MMM, yyyy"
              dateFormat="yyyy-MM-dd"
              placeholderText="선택하세요"
              
              //showMonthYearPicker
              showFullMonthYearPicker
              popperPlacement="bottom-end"
              
              inputProps={{
                //variant: 'text',
                //inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
                inputClassName: ' text-base font-medium',
              }}
              className=" w-44 "
              
              
            />

            ~

            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              ///dateFormat="MMM, yyyy"
              dateFormat="yyyy-MM-dd"
              placeholderText="선택하세요"
              
              //showMonthYearPicker
              showFullMonthYearPicker
              popperPlacement="bottom-end"
              inputProps={{
                //variant: 'text',
                //inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
                inputClassName: ' text-base font-medium',
              }}
              className=" w-44  "
            />

            
            <Button
              type='button'
              onClick = {() => fetchDailyData(
                startDate,
                endDate,
              )}
              className=" w-24  h-9   @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
              <CiSearch className="me-1.5 h-[17px] w-[17px]" />
              검색
            </Button>

            {/* 초기화 버튼 gray button*/}
            {/*
            <Button
              type='button'
              onClick = {() => {
                setStartDate(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
                setEndDate(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
                
                fetchDailyData(
                  new Date( new Date().getFullYear(), new Date().getMonth(), 1 ),
                  new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ),
                );
              }}
              className=" w-24  h-9   @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              초기화
            </Button>
            */}
            

          </div>

        ),
      })}
    >

      <SimpleBar>
        <div className={cn('h-[300px] w-full pt-9 @7xl:h-[180px]')}>

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={
              //data
              uaerDailyData
            }
            margin={{
              left: -10,
              right: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="가입자수"
              
              //label="가입자"
              
              stroke="#3b82f6"
              activeDot={{ r: 8 }}
              strokeWidth={2}
              //dot={<CustomizedDot />}
            />
            {/*
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="uv"
              stroke="#10b981"
              dot={false}
            />
            */}
          </LineChart>
        </ResponsiveContainer>

        </div>
      </SimpleBar>

    </WidgetCard>
  );

}
