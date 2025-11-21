import React, { useState } from "react";
import * as XLSX from "xlsx";

//import Table from 'react-bootstrap/Table';

//import 'bootstrap/dist/css/bootstrap.min.css';

///import { Col, Form, Row } from 'react-bootstrap';

import Table, { HeaderCell } from '@/components/ui/table';

import BasicTableWidget from '@/components/doingdoit/basic-table-widget';

import FoodTableWidget from '@/components/doingdoit/food-table-widget';

//import { data } from '@/data/doingdoit/feed/calorie-db-data-new';


///import ControlledTable from '@/components/controlled-table';


/*
식품코드	DB군	식품명	식품대분류	1회제공량	에너지(㎉)	단백질(g)	지방(g)	탄수화물(g)	총당류(g)	나트륨(㎎)	콜레스테롤(㎎)	총 포화 지방산(g)	발행기관
*/

/*
    "foodCode": "D000007",
    "foodCategory": "음식",
    "foodName": "닭갈비",
    "foodGroup": "구이류",
    "quality": "400",
    "kcal": "595.61",
    "carbohydrate": "45.9",
    "protein": "25.8",
    "fat": "44.9",
    "salt": "21.2",
    "saturatedfat": "1535.83",
    "cholesterol": "193.4",
    "sugar": "6",
    "publisher": "식품의약품안전처"
*/

/*
columns in excel sheet
식품코드	DB군	식품명	식품대분류	1회제공량	에너지(㎉)	단백질(g)	지방(g)	탄수화물(g)	총당류(g)	나트륨(㎎)	콜레스테롤(㎎)	총 포화 지방산(g)	발행기관
*/
/*
recharts-console-error.ts:6 Warning: Each record in table should have a unique `key` prop, or set `rowKey` to an unique
*/



import { getColumns } from '@/app/shared-doingdoit/feed/calorie-db-columns';
import { set } from "lodash";


  
 






export default function MyNextJsExcelSheet() {

  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);

  const readExcel = (file) => {

    const promise = new Promise((resolve, reject) => {

      setLoading(true);

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, {
                type: "buffer"
            });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            //console.log(data);

            //resolve(data);

            /* add id for sequence number */

            const data2 = data.map((d, index) => {

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

    promise.then((d) => {

      setItems(d);

    });

  };

  

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <br></br>
      <br></br>
      <br></br>



      {/* Table from excel sheet */}
      {/*
      <Table

        columns={getColumns}
        data={items}
      />
      */}



      <div className=" self-stretch flex flex-col items-center justify-end gap-[40px] text-grey-6">

        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
            <div className="text-xl text-gray-500 font-semibold mt-2">Loading...</div>
          </div>
        ) : (




          <BasicTableWidget
            title=""
            variant="minimal"
            data={items}

            // @ts-ignore
            getColumns={getColumns}
            enablePagination={true}
            
            enableSearch={false}
            enableSettings={false}


            className="w-full"

            sticky
            scroll={{ x: 250, }}
          />

        )}

      </div>



      {/*
      <Row>
        <Col lg={12}>
          <h3>The Data of The Uploaded Excel Sheet</h3>

          <Table striped bordered hover variant="warning">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Phone</th>
                <th>UserName</th>
                <th>Email Id</th>
                <th>Password</th>
                <th>Test Date</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {items.map((datas, index) =>
                <tr key={index}>

                  <td>{datas.FirstName}</td>
                  <td>{datas.LastName}</td>
                  <td>{datas.Phone}</td>
                  <td>{datas.UserName}</td>
                  <td>{datas.emailid}</td>
                  <td>{datas.Password}</td>
                  <td>{datas.testdate}</td>
                  <td>{datas.Comment}</td>

                </tr>
              )}
            </tbody>
          </Table>

        </Col>
      </Row>
      */}



    </div>
  );
}