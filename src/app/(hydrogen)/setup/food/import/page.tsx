'use client';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import TeamSettingsView from '@/app/shared/account-settings/team-settings';

//import MyNextJsExcelSheet from './MyAppNextJsExcelSheet';


import React, { useState } from "react";
import * as XLSX from "xlsx";


import BasicTableWidget from '@/components/doingdoit/basic-table-widget';

import { getColumns } from '@/app/shared-doingdoit/feed/calorie-db-columns';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';

import { useRouter, useSearchParams } from "next/navigation";




/*
export const metadata = {
  ...metaObject('식품DB관리'),
};
*/

const pageHeader = {
  title: '식품DB관리',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.setup.index,
      name: '설정',
    },
    {
      name: '식품DB관리',
    },
  ],
};

export default function FoodPage() {


  const router = useRouter();


  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);

  const readExcel = (file: any) => {

    const promise = new Promise((resolve, reject) => {

      setLoading(true);

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target?.result;
            const wb = XLSX.read(bufferArray, {
                type: "buffer"
            });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            //console.log(data);

            //resolve(data);

            /* add id for sequence number */

            const data2 = data.map((d: any, index) => {

                const id = index + 1;
                
                const foodCode = d['식품코드'];
                const foodCategory = d['DB군'];
                const foodName = d['식품명'];
                const foodGroup = d['식품대분류'];
                const quality = d['1회제공량'];
                const kcal = d['에너지(㎉)'];
                const carbohydrate = d['탄수화물(g)'];
                const protein = d['단백질(g)'];
                const fat = d['지방(g)'];
                const salt = d['나트륨(㎎)'];
                const saturatedfat = d['총 포화 지방산(g)'];
                const cholesterol = d['콜레스테롤(㎎)'];
                const sugar = d['총당류(g)'];
                const publisher = d['발행기관'];
  
                return {
                  id: id,
                  foodCode: foodCode,
                  foodCategory: foodCategory,
                  foodName: foodName,
                  foodGroup: foodGroup,
                  quality: quality,
                  kcal: kcal,
                  carbohydrate: carbohydrate,
                  protein: protein,
                  fat: fat,
                  salt: salt,
                  saturatedfat: saturatedfat,
                  cholesterol: cholesterol,
                  sugar: sugar,
                  publisher: publisher
                };
              });

  
            resolve(data2);


            
        };
        fileReader.onerror = (error) => {
            reject(error);
        };

        setLoading(false);

    });

    promise.then((d: any) => {

      setItems(d);

    });

  };




  /* save to database */
  /* api call */
  /* post */

  const [isUploaindg, setIsUploading] = useState(false);

  const saveToDatabase = async () => {

    setIsUploading(true);

    const url = '/api/doingdoit/food/registerMany';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    });

    const data = await response.json();

    console.log(data);

    setIsUploading(false);

    alert('저장되었습니다.');

    router.push('/setup/food/');

  }

 










  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={calorieData}
      data={items}
      fileName=""
      header="식품코드, 식품명"
    >

      {/*
      <div className='mb-5 w-full flex flex-row items-center justify-end'>
        <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
          <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
          엑셀다운로드
        </Button>
      </div>
    */}
      {/*
        엑셀 업로드
            <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      */}

      <div className='mb-5 w-full flex flex-row items-center justify-end'>

        {/* 엑셀 업로드 */}
        <input
          type="file"
          onChange={(e) => {

            const file = e.target?.files?.[0];

            readExcel(file);
          }}
        />

        {/* save to database */}
        {isUploaindg && <div className="text-sm text-gray-500">저장중...</div>}

        <Button
          isLoading={isUploaindg}


          ///enabled={items.length > 0}
          // enable when items.length > 0

          disabled={items.length === 0}







          className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          onClick={() => {
            saveToDatabase();
          }}
        >
          <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
          저장
        </Button>
      

      </div>


      {/* 총 {items.length}개의 데이터가 있습니다. */}
      <div className="mb-5 text-sm text-gray-500">총 {items.length}개의 데이터가 있습니다.</div>


      <BasicTableWidget
        title=""
        variant="minimal"
        data={items}

        pageSize={20}

        // @ts-ignore
        getColumns={getColumns}
        //enablePagination
        enableSearch={true}
        enablePagination={true}
        
        searchPlaceholder="식품코드, 식품명, 발행기관"

        className="w-full"

        sticky
        scroll={{ x: 250, }}
      />



    </TableLayout>
  );

}
