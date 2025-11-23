'use client';

import React, { useState, useEffect, use } from 'react';
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


////import { useTable } from '@/hooks/use-table';

import{ useTable } from '@/hooks/doingdoit/use-table-food-user';




import Link from "next/link";

import Image from "next/image";


import { PieChart, Pie, Cell, ResponsiveContainer, Label, Legend } from 'recharts';





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
import { set } from 'lodash';
import HeliumLayout from '@/layouts/helium/helium-layout';
import { parse } from 'path';
import { color } from 'framer-motion';
import { da, ro } from '@faker-js/faker';



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




const dataFood = [
  { name: 'Referral', value: 2560 },
  { name: 'Social Media', value: 2150 },
  { name: 'Email', value: 2780 },
  { name: 'Google', value: 2000 },
];
const COLORS = ['#B92E5D', '#6D1A36', '#D68585', '#FFD1D1'];



export default function DatabaseTableSearch({
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

      if (!session?.user?.email) return;

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



  const [ foodPercentage, setFoodPercentage ] = useState(
    [] as
    {
      name: string;
      value: number;
      color: string;
    }[]
  );



    /*
  const data = [
    { name: '적게', value: 20, color: '#fe847a' },
    { name: '보통', value: 18, color: '#fbe204' },
    { name: '많이', value: 35, color: '#7ed95a' },
  ];
  */


  const [selectedFoodCode, setSelectedFoodCode] = useState('');
  const [selectedFoodName, setSelectedFoodName] = useState(''); 


  // kcal
  const [kcal, setKcal] = useState(0);

  // 포화지방산
  const [saturatedfat, setSaturatedfat] = useState(0);
  // 당류
  const [sugar, setSugar] = useState(0);
  // 나트륨
  const [salt, setSalt] = useState(0);
  // 콜레스테롤
  const [cholesterol, setCholesterol] = useState(0);
  


  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      console.log("selectedFoodCode", selectedFoodCode);

      if (!selectedFoodCode) return;


      setLoading(true);

      // call api
      const res = await fetch(`/api/doingdoit/food/getOne?_foodCode=${selectedFoodCode}`);

      const data = await res?.json() as any;


      console.log("selected food ====>", data.data);

      console.log("fat ====>", data.data?.fat);
      console.log("protein ====>", data.data?.protein);
      console.log("carbohydrate ====>", data.data?.carbohydrate);


      setSelectedFoodName(data.data?.foodName);

      setKcal(parseFloat(data.data?.kcal === '-' ? '0' : data.data?.kcal));


      setSaturatedfat(parseFloat(data.data?.fat === '-' ? '0' : data.data?.fat));
      setSugar(parseFloat(data.data?.protein === '-' ? '0' : data.data?.protein));
      setSalt(parseFloat(data.data?.carbohydrate === '-' ? '0' : data.data?.carbohydrate));
      setCholesterol(parseFloat(data.data?.cholesterol === '-' ? '0' : data.data?.cholesterol));
  
      

  

      const total = parseFloat(data.data?.fat === '-' ? '0' : data.data?.fat) + parseFloat(data.data?.protein === '-' ? '0' : data.data?.protein) + parseFloat(data.data?.carbohydrate === '-' ? '0' : data.data?.carbohydrate);


      setFoodPercentage([

  
        /*

        {
          name: '지방',
          value:
            // float point 2 digits  
          //parseFloat(data.data?.fat === '-' ? '0' : data.data?.fat) / total * 100,
          parseFloat((parseFloat(data.data?.fat === '-' ? '0' : data.data?.fat) / total * 100).toFixed(2)),
          
          color: '#FFC38B'
        },
        */

        data.data?.fat !== '-' && data.data?.fat !== '0' && data.data?.fat !== 0 ?
        {
          name: '지방',
          value:
          // float point 2 digits  
          //parseFloat(data.data?.fat === '-' ? '0' : data.data?.fat) / total * 100,
          parseFloat((parseFloat(data.data?.fat === '-' ? '0' : data.data?.fat) / total * 100).toFixed(2)),
          
          color: '#FFC38B'
        } : 
        {
          name: '지방',
          value: 0,
          color: '#FFFFFF'
        },



      
  
        /*
        {
          name: '단백질',
          value:
          // float point 2 digits 
          parseFloat((parseFloat(data.data?.protein === '-' ? '0' : data.data?.protein) / total * 100).toFixed(2)),
          

          color: '#FF968D'
        },
        */

        data.data?.protein !== '-' && data.data?.protein !== '0' && data.data?.protein !== 0 ?
        {
          name: '단백질',
          value:
          // float point 2 digits 
          parseFloat((parseFloat(data.data?.protein === '-' ? '0' : data.data?.protein) / total * 100).toFixed(2)),
          

          color: '#FF968D'
        } : 
        {
          name: '단백질',
          value: 0,
          color: '#FFFFFF'
        },

        /*
        {
          name: '탄수화물',
          value:
          // float point 2 digits
          parseFloat((parseFloat(data.data?.carbohydrate === '-' ? '0' : data.data?.carbohydrate) / total * 100).toFixed(2)),
          color: '#7CD7FA'
        },
        */

        data.data?.carbohydrate !== '-' && data.data?.carbohydrate !== '0' && data.data?.carbohydrate !== 0 ?
        {
          name: '탄수화물',
          value:
          // float point 2 digits
          parseFloat((parseFloat(data.data?.carbohydrate === '-' ? '0' : data.data?.carbohydrate) / total * 100).toFixed(2)),
          color: '#7CD7FA'
        } : 
        {
          name: '탄수화물',
          value: 0,
          color: '#FFFFFF'
        },

      ]);

      setLoading(false);

    }


    /*
    setFoodPercentage([
      { name: '지방', value: 20, color: '#fe847a' },
      { name: '단백질', value: 18, color: '#fbe204' },
      { name: '탄수화물', value: 35, color: '#7ed95a' },
    ]);
    */

    fetchData();

  } , [selectedFoodCode]);



  console.log("foodPercentage", foodPercentage);






  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });



  const onDeleteItem = (id: string) => {

    
    ////handleDelete(id);

    /*
    handleDelete(
      [id]
    );
    */

    /* popup modal delete item completed */
    //alert('삭제되었습니다.');

    setOpen(true);
    modalData.description = '삭제되었습니다.';

  };


/*
  const addFoodToUser = async (foodCode : string) => {

    // call api
    const res = await fetch(`/api/doingdoit/food/addFoodToUser?_foodCode=${foodCode}&_userId=${userData.id}`);

    const data = await res.json();

    // toast message "추가되었습니다."

    toast.success('코인에 추가되었습니다.');

  }
  */


  {/* My음식에 추가 */}
  const handleRowSelect = async (id: string) => {

    ///console.log('handleRowSelect', id);


      //addFoodToUser(id);

      if (!userData.id) {
        return;
      }

      const foodCode = id;

      setSelectedFoodCode(foodCode);
      // open modal
      setOpen(true);

      /*


      const res = await fetch(`/api/doingdoit/food/addFoodToUser?_foodCode=${foodCode}&_userId=${userData.id}`);

      const data = await res.json();
  
      // toast message "추가되었습니다."
  
      toast.success('My 코인에 추가되었습니다.');
      */

  };





  const addFoodToUser = async (foodCode : string) => {




    
      //////handleAdd(selectedFood);

      handleAdd(
        
        //foodCode

        [foodCode]

      );



      
      // call api
      const res = await fetch(`/api/doingdoit/food/addFoodToUser?_foodCode=${foodCode}&_userId=${userData.id}`);
  
      const data = await res.json();

      ////console.log("addFoodToUser", data);
  
      // toast message "추가되었습니다."
  
      /////toast.success('My 코인에 추가되었습니다.');

      toast.success('코인에 추가되었습니다.');

      
      
      ////////router.push('/usermain/diet/my');


  
    }


    const foodType = [
      '구이류',
  
      '국 및 탕류',
      '볶음류',
      '기타',
      '튀김류',
      '회류',
      '찌개 및 전골류',
      '찜류',
      '생채및 무침류',
      '김치류',
      '숙채류',
      '곡류 및 서류',
      '면 및 만두류',
      '밥류',
      '빵류',
      '음료 및 차류',
      '장아찌 및 절임류',
      '전.적 및 부침류',
      '조림류',
      '죽 및 스프류',
      '포류',
      '과자류',
      '아이스크림류',
      '젓갈류',
      '과자',
      '과/채주스',
      '탄산음료',
      '과/채음료',
      '인삼/홍삼음료',
      '혼합음료',
      '음료베이스',
      '곡류 및 그 제품',
      '감자 및 전분류',
      '두류',
      '견과류 및 종실류',
      '채소류',
      '건면',
      '생면',
      '기타발효음료',
      '가공두유',
      '유산균음료',
      '캔디류',
      '환자용 식품',
      '숙면',
      '커피',
      '기타가공품',
      '유탕면',
      '초콜릿가공품',
      '즉석섭취식품',
      '빙과',
      '탄산수',
      '추잉껌',
      '소시지',
      '햄',
      '프레스햄',
      '만두피',
      '발효소시지',
      '농후발효유',
      '가공유',
      '강화우유',
      '가공치즈',
      '만두',
      '식육추출가공품',
      '양념육',
      '분쇄가공육제품',
      '액상차',
      '참기름',
      '콩기름(대두유)',
      '기타식물성유지',
      '고형차',
      '잼',
      '즉석조리식품',
      '영/유아용 이유식',
      '소스',
      '곡류가공품',
      '마요네즈',
      '카레(커리)',
      '가공버터',
      '밀크초콜릿',
      '어육소시지',
      '초콜릿',
      '두부',
      '복합조미식품',
      '가공두부',
      '기타 수산물가공품',
      '자연치즈',
      '들기름',
      '발효유',
      '우유',
      '향미유',
      '당절임',
      '두류가공품',
      '떡류',
      '물엿',
      '서류가공품',
      '준초콜릿',
      '체중조절용 조제식품',
      '아이스크림',
      '알가열제품',
      '아이스밀크'
  
  
    ];
  
  
   const [foodTypeArray, setFoodTypeArray ] = useState<string[]>(
    
    foodType
  );

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
    
    ///handleRowSelect,

    handleSelectAll,
    //handleDelete,
    


    
    
    /////handleAdd,


    handleReset,

  } = useTable(
    data,
    pageSize,


    //filterState,

    //foodTypeArray,
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
      
      //handleRowSelect,

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


  const addFood = async (
    foodName : string,
  ) => {


    if (!userData.id) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!foodName) {
      alert('음식을 입력해주세요.');
      return;
    }

  
    // call api for add food to foods table
    
    const res = await fetch(`/api/doingdoit/food/registerOne?_foodName=${foodName}&_publisher=user`);
    const data = await res.json() as any;

    //console.log("registerOne==", data);

    const foodCode = data?.data;

    // call api for add food to user_foods table

    ///addFoodToUser(foodCode);

    const res2 = await fetch(`/api/doingdoit/food/addFoodToUser?_foodCode=${foodCode}&_userId=${userData.id}`);
  
    const data2 = await res2.json();


    

    ////toast.success('My 코인에 추가되었습니다.');

    toast.success('코인에 추가되었습니다.');



    // route to my-add page
    
    ///router.push('/usermain/diet/my');

    // goto /usermain/diet/my page



    //router.push('/usermain/diet/my');




    /*
    handleAdd={(items: any[]) => {
      ////alert("handleAdd");

      setOpen(false);

      // add items to the list which are not already in the list mealFood

      const newItems = items.filter((item) => !mealFood.includes(item));

      setMealFood([...mealFood, ...newItems]);

    } }
    */

    ///setMealFood([...mealFood, foodCode]);

    /////handleAdd([foodCode]);



    


  
  }



  /*
  const offsetLabel = (name : any, x : any , y : any) => {
    let offsetX
    let offsetY
    if (name === '100%') return [22, 5]
    if (x <= 145) {
      offsetX = 14
    } else {
      offsetX = 22
    }
    if (y <= 105) {
      offsetY = 11
    } else {
      offsetY = 5
    }
    return [offsetX, offsetY]
  }


  const randerLabelContent = (props : any ) => {
    const { name, x, y, midAngle } = props;
    const [offsetX, offsetY] = offsetLabel(name, x, y);
    return (
      <g transform={`translate(${x}, ${y})`} textAnchor={(midAngle < -90 || midAngle >= 90) ? 'end' : 'start'}>
        <text
        className='text-3xs xl:text-sm font-semibold text-black'
        x={offsetX} y={offsetY}>
          {name}
        </text>

        
      </g>
    );
  }
  */



  /*
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    name,
    fontSize,
    index
  } : any) => {
  
    const RADIAN = Math.PI / 180
    const sin = Math.sin(RADIAN * midAngle)
    const cos = Math.cos(RADIAN * midAngle)
    const startX = cx + (outerRadius) * cos
    const startY = cy + (outerRadius) * -sin
    const middleY = cy + (outerRadius + 50 * Math.abs(sin)) * -sin
    let endX = startX + (cos >= 0 ? 1 : -1) * 90
    let textAnchor = cos >= 0 ? 'start' : 'end'
    const mirrorNeeded = midAngle > -270 && midAngle < -210 && percent < 0.04 && index % 2 === 1
    if (mirrorNeeded) {
      endX = startX + outerRadius * -cos * 2 + 100
      textAnchor = 'start'
    }
  
    return (
      <g>
        <path
          d={`M${startX},${startY}L${startX},${middleY}L${endX},${middleY}`}
          fill="none"
          stroke='#000'
          strokeWidth={1}
        />
        <text
          x={endX + (cos >= 0 || mirrorNeeded ? 1 : -1) * 12}
          y={middleY + fontSize / 2}
          textAnchor={textAnchor}
          fontSize={fontSize}
        >{`${name || ''} ${(percent * 100).toFixed(2)}%`}</text>
      </g>
    )
  }
  */


  let RenderCustomizedLabelLine = function (props: any) {
    return (props.value != 0 ? <path stroke={props.stroke} d={`M${props.points[0].x},${props.points[0].y}L${props.points[1].x},${props.points[1].y}`} className="customized-label-line" /> : <polyline stroke={props.stroke} fill="none" />)    
  }

  let RenderLabel2 = function (props: any) {
      const RADIAN = Math.PI / 180;
      const radius = 25 + props.innerRadius + (props.outerRadius - props.innerRadius);
      const x = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
      const y = props.cy + radius * Math.sin(-props.midAngle * RADIAN);


      return (props.value != 0 ? <text
          className="recharts-text recharts-pie-label-text"
          x={x}
          y={y}
          fontSize='16'
          fontFamily='sans-serif'
          dominantBaseline="central"
          cy={props.cy}
          cx={props.cx}
          fill="#666"
          textAnchor={props.x > props.cx ? 'start' : 'end'}
      >
        {Number.isInteger(props.value) ? Number(props.value) : Number(props.value).toFixed(1)}% {foodPercentage[props.index]?.name}
      </text> : <g>
      <text x={500} y={y} fill="#transparent" rotate="90"></text>
    </g>)

  }





  return (

    <>

    <WidgetCard
      title={title}

      className={cn('flex flex-col  ', className)}
      
      //headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      


      {...(enableSearch && {

        action: (

              <Input
                
                size={`xl`}

                type="search"
                
                placeholder={searchPlaceholder}

                
                // placeholder text color
                

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

        ),

      })}

    >

      {tableData.length === 0 && !isLoading ? (
            
       

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

 
                <Button
                  variant="solid"
                  color="primary"
                  size="xl"
                  className="mt-5 rounded-full border-2 border-grey-6 bg-dark text-white font-bold text-base px-10 py-5"  
                  //startIcon={<AddIcon />}
                  onClick={() => {
                    
                    
                    addFood(searchTerm);

                   



                  }}
                >
                  My코인 추가에 추가
                </Button>



            </div>

            )  : (

      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7 ')}
      >
        <ControlledTable
          showLoadingText={false}
          
          ///isLoading={isLoading}

          data={tableData}
          columns={visibleColumns}
          scroll={scroll}
          sticky={sticky}

          
          //variant={variant}
          variant='modern'

          //border removed
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

        

          
          /*
          emptyText={


            isLoading ? (
              <div className=' h-32 flex flex-row items-center justify-center gap-[8px]'>
                <div className="w-2 h-2 bg-dark rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-dark rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-dark rounded-full animate-bounce" />
              </div>
            ) : (
            
       

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

 
                <Button
                  variant="solid"
                  color="primary"
                  size="xl"
                  className="mt-5 rounded-full border-2 border-grey-6 bg-dark text-white font-bold text-base px-20 py-5"  
                  //startIcon={<AddIcon />}
                  onClick={() => {
                    
                    
                    addFood(searchTerm);

                   



                  }}
                >
                  My코인 추가에 추가
                </Button>



            </div>

            )

          }
          */

           

          

        />
      </div>


      )}




    </WidgetCard>




      {/* modal view */}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          //setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"

        ///containerClassName="dark:bg-gray-100 max-w-[660px] rounded-md p-5 lg:p-6"

        ///containerClassName="dark:bg-gray-100 max-w-[660px] max-h-[400px]   rounded-md p-5 lg:p-6"
        // scrolled container
        containerClassName="dark:bg-gray-100 max-w-[620px] max-h-[700px] rounded-md pt-5 pb-5 lg:p-6"
      >

          {/* close button position is top-right in modal view */}

          <div className=" flex flex-row items-center justify-end gap-[20px] pr-5">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className=" no-underline flex"
            >
            <Image
              width="24"
              height="24"
              className="relative w-6 h-6 overflow-hidden shrink-0"
              alt=""
              src="/usermain/images/x2.svg"
            />
            </button>
          </div>


        {/* fiexd height and scroable */}

     
        <div className="flex flex-col items-center justify-center gap-5 m-5">

          <div className="self-stretch flex flex-col items-center justify-center  text-center text-xl xl:text-13xl text-dark font-menu-off">
      
            <div className="self-stretch relative font-extrabold leading-10 ">
              {selectedFoodName}
            </div>










            <div className="mx-auto w-full  "> 

              <ResponsiveContainer width="100%" height={300}>
                
                <PieChart
                  height={300}
                  width={300}
                >

                  {loading && (
                    <Pie
                      data={[ 
                        { name: 'loading', value: 1, color: '#ffffff' },
                      ]}
                      cx="50%"
                      cy="50%"
                      //labelLine={false}
                      //labelLine={true}

                      ////label={renderCustomizedLabel}

                      //outerRadius={80}

                      //innerRadius={60}
                      //outerRadius={116}
                      innerRadius={50}
                      outerRadius={80}

                      ///fill="#8884d8"

                      //strokeWidth={2}

                      dataKey="value"

                    >
                        
                        {foodPercentage.map((item, index) => (

                          /* gray color  #d9d9d9 */
                          <Cell key={index} fill={`#d9d9d9`} stroke={`#d9d9d9`} />

                        ))}

                    </Pie>

                  )}


                  {/* if foodPercentage is empty,
                  value is NaN, so
                  
                  show empty pie chart */}
                  {
                    //foodPercentage[0]?.value === 0 && foodPercentage[1]?.value === 0 && foodPercentage[2]?.value === 0 ? (
                    !loading && ! foodPercentage[0]?.value && ! foodPercentage[1]?.value && ! foodPercentage[2]?.value ? (

                  
                  // empty pie chart
                  <Pie
                    data={[
                      { name: 'empty', value: 1, color: '#ffffff' },
                    ]}
                    cx="50%"
                    cy="50%"
                    //labelLine={false}
                    //labelLine={true}
                    
                    ////label={renderCustomizedLabel}
                    
                    //outerRadius={80}

                    //innerRadius={60}
                    //outerRadius={116}

                    innerRadius={50}
                    outerRadius={80}

                    ///fill="#8884d8"
                    
                    //strokeWidth={2}

                    dataKey="value"
                  >


                    {foodPercentage.map((item, index) => (

                      /* gray color  #d9d9d9 */
                    <Cell key={index} fill={`#d9d9d9`} stroke={`#d9d9d9`} />

                    ))}


                    {/* label for center of pie chart */}
                    {/* first line is 총 칼로리 */}
                    {/* second line is 총 칼로리 value */}
                    <Label


                    value={`총 유통 공급량`}
                    position="center"
                    dy={-10}

                    fontSize={12}
                    fontWeight={'bold'}

                    fill='#000000'

                    />


                    <Label

                    //className=' text-base font-bold text-black'
                    value={`${kcal}kcal`}

                    position="center"
                    dy={10}

                    fontSize={16}
                    fontWeight={'bold'}
                    fill='#000000'

                    />




                  </Pie>


                  ) : (
                  
                  <Pie



                    data={foodPercentage}
                    cx="50%"
                    cy="50%"


                    
                   
                    
                    //outerRadius={80}

                    //innerRadius={60}
                    //outerRadius={116}

                    //innerRadius={50}
                    //outerRadius={80}

                    innerRadius={50}
                    outerRadius={80}

                    fill="#8884d8"
                    
                    //strokeWidth={2}

                    dataKey="value"


                    // line color
                    //labelLine={false}

                    // change label line size

                    /*
                    labelLine={
                      {
                        stroke: '#000000',
                        strokeWidth: 1,
                      }
                    }
                    */

                    ////label={randerLabelContent}




                    /*
                    labelLine={( { cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      index
                    } ) => {


                      const RADIAN = Math.PI / 180;

                      // eslint-disable-next-line
                      let radius1 = 20 + innerRadius + (outerRadius - innerRadius);

                      let radius2 = innerRadius + (outerRadius - innerRadius);
                      // eslint-disable-next-line
                      let x2 = cx + radius1 * Math.cos(-midAngle * RADIAN);
                      // eslint-disable-next-line
                      let y2 = cy + radius1 * Math.sin(-midAngle * RADIAN);

                      let x1 = cx + radius2 * Math.cos(-midAngle * RADIAN);
                      // eslint-disable-next-line
                      let y1 = cy + radius2 * Math.sin(-midAngle * RADIAN);

                      if (value<30){

                        return (
                          <></>
                        )

                      }


                      return (
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ccc" strokeWidth={1}>

                        </line>
                      )


  
                    }}
                    */



                    //startAngle={90}
                    //endAngle={-270}

                    //labelLine={false}

                    //labelLine={true}

                    ////label={renderCustomizedLabel}


                    paddingAngle={1}
                    //label={RenderLabel2}
                    //labelLine={RenderCustomizedLabelLine}

                    
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      index
                    }) => {
                      

    

                      //console.log("handling label?");
                      const RADIAN = Math.PI / 180;
                      // eslint-disable-next-line
                      const radius = 25 + innerRadius + (outerRadius - innerRadius);
                      // eslint-disable-next-line
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      // eslint-disable-next-line
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);



                      return (

                        // if value is 0, don't show label
                        value === 0 ? null : (
                      
                          <>
                            <text
                              
                              className='text-3xs xl:text-sm font-semibold text-black'
                              // text color
                              fill='#000000'
                              //fill="#8884d8"

                              x={x}
                              y={y-9}
                              
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                            >

                              {foodPercentage[index]?.name}
                              
                            </text>
                            <text
      
                              className='text-3xs xl:text-sm font-semibold text-black'
                              // text color
                              fill='#000000'
                              //fill="#8884d8"

                              x={x}
                              y={y+9}
                              
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                            >

                              
                              ({value}%)
                            </text>
                          </>

                        )


                      );

                    }}
                    
                    
                    

                    
                  >


                    {foodPercentage.map((item, index) => (

                      <Cell key={index} fill={item.color} stroke={item.color} />

                    ))}


                    {/* label for center of pie chart */}
                    {/* first line is 총 칼로리 */}
                    {/* second line is 총 칼로리 value */}
                    <Label

                      //className=' text-xs text-black '
                      // text color
                      
                      

                      value={`총 유통 공급량`}
                      position="center"
                      dy={-10}

                      fontSize={12}

                      fill='#000000'

                    />

                    
                    <Label

                      //className=' text-base font-bold text-black'
                      value={`${kcal}kcal`}

                      position="center"
                      dy={10}

                      fontSize={16}
                      fontWeight={'bold'}
                      fill='#000000'
                  
                    />

                  </Pie>

                  )}


                </PieChart>

              </ResponsiveContainer>

              </div>  





            {/*
             <div className="self-stretch flex flex-row items-center justify-center relative gap-[20px] text-left text-xs ">

                <div className="p-3 flex flex-row gap-[20px] font-extrabold rounded-lg bg-grey-f1  ">

                    <div className="relative leading-[20px] font-extrabold">
                      <p className="m-0">포화지방산</p>
                      <p className="m-0">당류</p>
                      <p className="m-0">나트륨</p>
                      <p className="m-0">콜레스테롤</p>
                    </div>
                    <div className="relative leading-[20px] font-extrabold">
                      <p className="m-0">{saturatedfat}g</p>
                      <p className="m-0">{sugar}mg</p>
                      <p className="m-0">{salt}mg</p>
                      <p className="m-0">{cholesterol}mg</p>
                    </div>

                </div>

              </div> 
            */}



            <div className="mt-10  flex flex-row items-center justify-center gap-5 text-base text-white">
              
              <button
                onClick={() => {
                  setOpen(false);
                  //setActive(() => 'posts');
                } }
                className=" no-underline  rounded-81xl bg-grey-c w-[140px] h-[50px] overflow-hidden shrink-0 flex flex-row items-center justify-center"
              >
                <div className="relative font-extrabold">닫기</div>
              </button>

              <button
                onClick={() => {
                  
                  addFoodToUser(selectedFoodCode);

                  //addFood(searchTerm);
                  setOpen(false);

                  handleSearch('');
                  
                } }
                className=" no-underline rounded-81xl bg-dark w-[140px] h-[50px] overflow-hidden shrink-0 flex flex-row items-center justify-center"
              >
                <div className="relative font-extrabold">코인 추가</div>
              </button>


            </div>
          </div>
          

          
        </div>

        


              
      </Modal>




    </>

    
  );
}
