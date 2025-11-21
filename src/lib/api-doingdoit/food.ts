import clientPromise from '@/lib/mongodb';


import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { create, random } from 'lodash';
import { day } from 'date-arithmetic';
import { D } from '@uploadthing/react/types-f6db134c';
import { m } from 'framer-motion';

//import { string } from 'prop-types';

import exp from 'constants';
import { use } from 'react';
import { F } from 'uploadthing/dist/types-e8f81bbc';

import pool, {connect, query} from '@/config/db';



import { ObjectId } from 'mongodb';


export interface FoodProps {

    /*
    _id: string;
    foodName: string;
    userId: string;
    foodCount: number;
    createdAt: Date;
    updatedAt: Date;
    */


    /*
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
    */

    id: string;
    foodCode: string;
    foodCategory: string;
    foodName: string;
    foodGroup: string;
    quality: number;
    kcal: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    salt: number;
    saturatedfat: number;
    cholesterol: number;
    sugar: number;
    publisher: string;
    createdAt: Date;
    updatedAt: Date;
    



}

export interface ResultProps {
    foods: FoodProps[];
    totalCount: number;
}



/* set user_food */
export async function registerOne (
    foodName: string,
    publisher: string,
) : Promise<any> {

    /*
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('user_foods');

    const foodCode = 'USER' + random(100000, 999999);

    const result = await collection.insertOne({
        foodCode,
        foodName,
        userId,
        foodCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    return result;
    */

    // insert to foods table

    const connection = await connect(); 

    try {


        const foodCode = 'USER' + random(100000, 999999);

        const query = `
        INSERT INTO foods (
            foodCode,
            foodName,
            foodGroup,
            quality,
            kcal,
            carbohydrate,
            protein,
            fat,
            salt,
            saturatedfat,
            cholesterol,
            sugar,
            publisher,
            createdAt,
            updatedAt
        ) VALUES (?,?,"",0,0,0,0,0,0,0,0,0,?,?,?)
        `;

        const values = [
            foodCode,
            foodName,
            publisher,
            new Date(),
            new Date(),
        ];

        const [rows, fields] = await connection.query(query, values) as any;

        connection.release();

      

        if (rows) {
            return foodCode;
        } else {
            return null;
        }

    } catch (error) {

        connection.release();

        console.error('registerOne error: ', error);
        return null;

    }


}



export async function addFoodToUser (
    foodCode: string,
    userId: number,
) : Promise<any> {


    //console.log('addFoodToUser foodCode', foodCode);
    //console.log('addFoodToUser userId', userId);


    /*
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('user_foods');

    // check duplication of foodCode of userId

    const result = await collection.findOne({
        foodCode: foodCode,
        userId: userId,
    });

    ///console.log('addFoodToUser result', result);


    if (!result) {

        // get foodName from foods collection

        const foodsCollection = client.db('doingdoit').collection('foods');
        const food = await foodsCollection.findOne({
            foodCode: foodCode,
        });

        ///console.log('addFoodToUser food', food);

        if (!food) {

            console.log('food not found');

            return null;
        }



        return await collection.insertOne({
            foodName: food.foodName,
            foodCode,
            userId,
            foodCount: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        });


    } else {

        return null;


    }
    */

    const connection = await connect();

    try {


        // check duplication of foodCode of userId


        const [checkRows, checkFields] = await connection.query(
            `
            SELECT * FROM user_foods
            WHERE foodCode = ? AND userId = ?
            `,
            [foodCode, userId],
        ) as any;

        if (checkRows.length > 0) {
            return null;
        }



        const query = `
        INSERT INTO user_foods (
            foodCode,
            userId,
            foodCount,
            createdAt,
            updatedAt
        ) VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            foodCode,
            userId,
            1,
            new Date(),
            new Date(),
        ];

        const [rows, fields] = await connection.query(query, values) as any;


        connection.release();


        if (rows) {
            return rows;
        } else {
            return null;
        }

    } catch (error) {


        connection.release();

        console.error('addFoodToUser error: ', error);
        return null;

    }

}





/* register many */
/* return registered count */

export async function registerMany(
    foods: FoodProps[],
) : Promise<number> {


  

    const connection = await connect();

    try {


        // foodCode is unique, if foodCode is duplicated, then skip
        // and if not duplicated, and then insert record


        // egisterMany error:  Error: Column count doesn't match value count at row 1
        // registerMany error:  Error: ER_TRUNCATED_WRONG_VALUE: Incorrect integer value: 'undefined' for column 'quality' at row 1

        let count = 0;

        for (const food of foods) {


            try {

                const query = `
                INSERT INTO foods (
                    foodCode,
                    foodCategory,
                    foodName,
                    foodGroup,
                    quality,
                    kcal,
                    carbohydrate,
                    protein,
                    fat,
                    salt,
                    saturatedfat,
                    cholesterol,
                    sugar,
                    publisher,
                    createdAt,
                    updatedAt
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

                const values = [
                    food.foodCode,
                    food.foodCategory,
                    food.foodName,
                    food.foodGroup,
                    food.quality,
                    food.kcal,
                    food.carbohydrate,
                    food.protein,
                    food.fat,
                    food.salt,
                    food.saturatedfat,
                    food.cholesterol,
                    food.sugar,
                    food.publisher,
                    new Date(),
                    new Date(),
                ];


                const [rows, fields] = await connection.query(query, values) as any;

                if (rows) {
                    count += 1;
                }

            } catch (error) {

                ///console.error('registerMany error: ', error);
            }


        }



        return count;


    } catch (error) {

        console.error('registerMany error: ', error);
        return 0;

    } finally {
        connection.release();
    }

}






/* get all */

export async function getAll( {
    limit,
    page,
    sort,
    order,
    q,
    startDate,
    endDate,
    foodTypeArray,

  }: {
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,
    startDate: string,
    endDate: string,
    foodTypeArray: string[],

  }): Promise<ResultProps> {


    //console.log('getAll', limit, page, sort, order, q, foodTypeArray, startDate, endDate);


    if (!sort) {
        sort = 'createdAt';
    }

    if (!order) {
        order = 'desc';
    }

    if (startDate === undefined || startDate === '') {
        startDate = '2020-01-01';
    }

    if (endDate === undefined || endDate === '') {
        endDate = '2030-12-31';
    }
    

    const startDateTime = new Date(new Date(startDate).getTime() ).toISOString();
 
    const endDateTime = new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000 - 1).toISOString(); // + 23h 59m 59s

    

    console.log('sort', sort);
    console.log('order', order);



    //console.log('startDateTime', startDateTime);
    //console.log('endDateTime', endDateTime);

    
      const connection = await connect();
    
      try {


        // search by q ( foodName, foodCode, publisher )
        // and then order by sort and order
        // and then limit and offset

        // and order by P/D/F/R (first character of foodCode)

        // first character of foodCode is P, D, F, R
        // order by P/D/F/R


        /*
               ORDER BY ${sort} ${order}
        
        ,
        */

        const query = `
        SELECT * FROM foods
        WHERE (foodName LIKE ? OR foodCode LIKE ? OR publisher LIKE ? )
        
        AND createdAt >= ? AND createdAt <= ?

        AND foodGroup IN (?)

        AND publisher <> 'user'


        ORDER BY

        ${sort} ${order},
        
 
        CASE
        WHEN foodCode LIKE 'P%' THEN 1
        WHEN foodCode LIKE 'D%' THEN 2
        WHEN foodCode LIKE 'F%' THEN 3
        WHEN foodCode LIKE 'R%' THEN 4
        ELSE 5
        END ASC
       


        LIMIT ?, ?
        `;
        const values = [
            `%${q}%`, `%${q}%`, `%${q}%`,
            
            ///startDate, endDate,
            startDateTime, endDateTime,

            foodTypeArray,
            (page - 1) * limit, limit,
        ];

        const [rows, fields] = await connection.query(query, values) as any




        // get total count of foods

        const query2 = `
        SELECT COUNT(*) AS count FROM foods
        WHERE (foodName LIKE ? OR foodCode LIKE ? OR publisher LIKE ? )
        AND createdAt >= ? AND createdAt <= ?
        
        AND foodGroup IN (?)

        AND publisher <> 'user'

        `;

        const values2 = [
            `%${q}%`, `%${q}%`, `%${q}%`,
            
            //startDate, endDate,
            startDateTime, endDateTime,


            foodTypeArray,
        ];

        const [rows2, fields2] = await connection.query(query2, values2) as any;

        const count = rows2[0].count;



        connection.release();

        if (rows) {
          return {
            foods: rows,
            totalCount: count,
        };
        } else {
            return {
                foods: [],
                totalCount: 0,
            };
        }
    
      } catch (error) {
          
            connection.release();
      
            console.error('getAll error: ', error);
        
            return {
                foods: [],
                totalCount: 0,
            };
    
      }

         







}




/* get count */
export async function getCount(
    userId: string,
    q: string,
): Promise<number> {


    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');


    // search by q ( foodName, foodCode, publisher )

    const result = await collection.aggregate([
        {
            $match: {
                $or: [
                    {
                        foodName: {
                            $regex: q,
                            $options: 'i',
                        },
                    },
                    {
                        foodCode: {
                            $regex: q,
                            $options: 'i',
                        },
                    },
                    {
                        publisher: {
                            $regex: q,
                            $options: 'i',
                        },
                    },
                ],
            },
        },
        {
            $count: 'count',
        },
    ]).toArray();

    return result[0]?.count || 0;

}


/* get count */
export async function getCountUser(
    userId: string,
    q: string,
): Promise<number> {


    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('user_foods');


    // search by q ( foodName, foodCode, publisher )

    const result = await collection.aggregate([

        /*
        {
            $match: {
                $and: [
                    {
                        userId: userId,
                    },
                    {
                        foodName: {
                            $regex: q,
                            $options: 'i',
                        },
                    },

                ],
            },
        },
        */
        
        

        {
            $match: {
                userId: userId,
            },
        },

        // user_foods lookup foods and include if not exit foods
        {
            $lookup: {
                from: 'foods',
                localField: 'foodCode',
                foreignField: 'foodCode',
                as: 'foods',
            },
        },

        // if foods foodCode is empty, then remove
        /*
        {
            $match: {
                foods: {
                    $ne: [],
                },
            },
        },
        */

        // remove if favorite_foods has same foodCode
        /*
        {
            $lookup: {
                from: 'favorite_foods',
                localField: 'foodCode',
                foreignField: 'foodCode',
                as: 'favorite_foods',
            },
        },
        {
            $match: {
                favorite_foods: {
                    $eq: [],
                },
            },
        },
        */
        


        {
            $count: 'count',
        },
    ]).toArray();

    return result[0]?.count || 0;

}



/*
export async function getOne(id: string): Promise<BoardProps | null> {
*/

// get one
export async function getOne(
    foodCode: string,
): Promise<FoodProps | null> {

    /*
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');
    const results = await collection.findOne<FoodProps>(
        {
            foodCode: foodCode,
        },
    );


    return results;
    */


    const connection = await connect();

    try {

        const query = `
        SELECT * FROM foods
        WHERE foodCode = ?
        `;

        const values = [foodCode];
        const [rows, fields] = await connection.query(query, values) as any

        connection.release();

        if (rows) {
          return rows[0]
        } else {
          return null;
        }

    } catch (error) {
            
        connection.release();

        console.error('getOne error: ', error);
        return null;

    }


}





/* delete one */
export async function deleteOne(
    foodCode: string,
): Promise<any> {

    console.log('deleteOne', foodCode);


   
    const connection = await connect();

    try {

        const query = `
        DELETE FROM foods
        WHERE foodCode = ?
        `;

        const values = [foodCode];
        const [rows, fields] = await connection.query(query, values) as any

        connection.release();

        console.log('deleteOne rows', rows);


        if (rows) {
          return rows
        } else {
          return null;
        }

    } catch (error) {

        connection.release();

        console.error('deleteOne error: ', error);
        return null;

    }

}




/* delete one */
export async function deleteMany(
    {
        foodCodes,
    }: {
        foodCodes: string[],
    }
): Promise<any> {

    console.log('deleteMany', foodCodes);

   
    const connection = await connect();

    try {


        // delete foods

        // delete many foods
        const query = `
        DELETE FROM foods
        WHERE foodCode IN (?)
        `;

        const values = [foodCodes];

        const [rows, fields] = await connection.query(query, values) as any


        console.log('deleteMany rows', rows);

      
        connection.release();



        //console.log('foodCodes', foodCodes);

        //console.log('deleteMany rows', rows);


        if (rows) {
          return rows
        } else {
          return null;
        }



    } catch (error) {

        connection.release();

        console.error('deleteMany error: ', error);
        return null;

    }

}






/* delete all */
export async function deleteAll(
): Promise<any> {

    console.log('deleteAll====================');

    const connection = await connect();

    try {


        const query = `
        DELETE FROM foods
        `;
        const values = [] as any;

        const [rows, fields] = await connection.query(query, values) as any

        console.log('deleteAll rows', rows);


        connection.release();

        if (rows) {
            return rows
          } else {
            return null;
          }

    } catch (error) {

        connection.release();

        console.error('deleteAll error: ', error);
        return null;

    }

}



/* delete one */
export async function deleteOneUser(
    userId: number,
    foodCode: string,
): Promise<any> {

    //console.log('deleteOneUser userId', userId);
    //console.log('deleteOneUser foodCode', foodCode);



    const connection = await connect();

    try {

        const query = `
        DELETE FROM user_foods
        WHERE userId = ? AND foodCode = ?
        `;

        const values = [userId, foodCode];
        const [rows, fields] = await connection.query(query, values) as any

        connection.release();

        if (rows) {
          return rows
        } else {
          return null;
        }

    } catch (error) {
            
        connection.release();

        console.error('deleteOneUser error: ', error);
        return null;

    }

}







/* get all user_foods  */

/*
export async function getAllUserFood(
    userId: number,
    
    limit: number,

    page: number,
    sort: string,
    order: string,
*/


export async function getAllUserFood({
    userId,
    limit,
    page,
    sort,
    order,
    q
}: {
    userId: number,
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,
///}): Promise<FoodProps[]> {
}): Promise<ResultProps> {


    console.log('getAllUserFood', userId, limit, page, sort, order, q);


    if (!sort) {
        sort = 'createdAt';
      }
    
    if (!order) {
        order = 'desc';
    }

    
    
    // limit is string, so convert to number
    limit = Number(limit);

    
      const connection = await connect();


      // join user_foods and foods
    
      try {


        // if sort is createdAt, then order by createdAt of a.user_foods
        // if sort is foodName, then order by foodName of b.foods

        let query = "";

        if (sort === 'createdAt') {
            query = `
            SELECT * FROM user_foods AS a
            LEFT JOIN foods AS b ON a.foodCode = b.foodCode

            WHERE a.userId = ?

            AND b.foodName LIKE ? 
            ORDER BY a.createdAt ${order}
            LIMIT ? OFFSET ?
            `;
        } else if (sort === 'foodName') {
            query = `
            SELECT * FROM user_foods AS a
            LEFT JOIN foods AS b ON a.foodCode = b.foodCode

            WHERE a.userId = ?

            AND b.foodName LIKE ? 
            ORDER BY b.foodName ${order}
            LIMIT ? OFFSET ?
            `;
        } else {
            query = `
            SELECT * FROM user_foods AS a
            LEFT JOIN foods AS b ON a.foodCode = b.foodCode

            WHERE a.userId = ?

            AND b.foodName LIKE ? 
            ORDER BY a.createdAt ${order}
            LIMIT ? OFFSET ?
            `;
        }

        

        /*
        const query = `
        SELECT * FROM user_foods AS a
        LEFT JOIN foods AS b ON a.foodCode = b.foodCode

        WHERE a.userId = ?

        AND b.foodName LIKE ? 
        
        
        ORDER BY a.${sort} ${order}


        LIMIT ? OFFSET ?
        `;
        */




        const values = [userId, `%${q}%`, limit, (page - 1) * limit];



        const [rows, fields] = await connection.query(query, values) as any;



        // total count of user_foods
        let totalCount = 0;

        let query2 = "";

        if (sort === 'createdAt') {
            query2 = `
            SELECT COUNT(*) AS count FROM user_foods AS a
            LEFT JOIN foods AS b ON a.foodCode = b.foodCode

            WHERE a.userId = ?
            AND b.foodName LIKE ?
            `;
        } else if (sort === 'foodName') {
            query2 = `
            SELECT COUNT(*) AS count FROM user_foods AS a
            LEFT JOIN foods AS b ON a.foodCode = b.foodCode

            WHERE a.userId = ?
            AND b.foodName LIKE ?
            `;
        } else {
            query2 = `
            SELECT COUNT(*) AS count FROM user_foods AS a
            LEFT JOIN foods AS b ON a.foodCode = b.foodCode

            WHERE a.userId = ?
            AND b.foodName LIKE ?
            `;
        }


        const values2 = [userId, `%${q}%`];

        const [rows2, fields2] = await connection.query(query2, values2) as any;

        if (rows2) {
            totalCount = rows2[0].count;
        }




        connection.release();




        if (rows) {
          //return rows
            return {
                foods: rows,
                totalCount: totalCount,
            };
        } else {
          return {
            foods: [],
            totalCount: 0,
        };
        }


    } catch (error) {

        connection.release();

        console.error('getAllUserFood error: ', error);
        return {
            foods: [],
            totalCount: 0,
        };

    }

}







/* get all user_foods  excloud favorite */

export async function getAllUserFoodExcludeFavorite(
    userId: number,
    
    limit: number,

    page: number,
    sort: string,
    order: string,

): Promise<FoodProps[]> {


    console.log('getAllUserFoodExcludeFavorite', userId);




    if (!sort) {
        sort = 'createdAt';
    }

    if (!order) {
        order = 'desc';
    }


    // limit is string, so convert to number
    limit = Number(limit);
    
    
    const connection = await connect();

    try {
        // join user_foods and foods
        // get all user_foods exclude favorite_foods

        const query = `
        SELECT * FROM user_foods AS a
        LEFT JOIN foods AS b ON a.foodCode = b.foodCode

        WHERE a.userId = ?
        AND a.foodCode NOT IN (
            SELECT foodCode FROM favorite_foods
            WHERE userId = ?
        )

        ORDER BY a.${sort} ${order}

        LIMIT ? OFFSET ?
        `;

        const values = [userId, userId, limit, (page - 1) * limit];

        const [rows, fields] = await connection.query(query, values) as any

        connection.release();

        if (rows) {
            return rows
        } else {
            return [];
        }


    } catch (error) {
            
        connection.release();

        console.error('getAllUserFoodExcludeFavorite error: ', error);
        return [];

    }


}





/* add favorite food and get all favorite foods */
/* favorite_foods */


export async function addFavoriteFood(
    foodCode: string,
    userId: number,
): Promise<any> {



    const connection = await connect();

    try {

        // add favorite food and then get updated favorite foods

        const query = `
        INSERT INTO favorite_foods (
            foodCode,
            userId,
            createdAt
        ) VALUES (?, ?, ?)
        `;

        const values = [
            foodCode,
            userId,
            new Date(),
        ];

        const [rows, fields] = await connection.query(query, values) as any;


        const query2 = `
        SELECT * FROM favorite_foods AS a
        LEFT JOIN foods AS b ON a.foodCode = b.foodCode

        WHERE a.userId = ?
        ORDER BY a.createdAt DESC
        `;

        const values2 = [userId];
        const [rows2, fields2] = await connection.query(query2, values2) as any;

        connection.release();

        if (rows2) {
            return rows2;
        } else {
            return null;
        }

    } catch (error) {

        connection.release();

        console.error('addFavoriteFood error: ', error);

        return null;

    }



}



export async function deleteFavoriteFood(
    foodCode: string,
    userId: number,
): Promise<any> {


    console.log('deleteFavoriteFood foodCode', foodCode);
    console.log('deleteFavoriteFood userId', userId);



    const connection = await connect();

    try {

        // delete favorite food and then get updated favorite foods

        const query = `
        DELETE FROM favorite_foods
        WHERE foodCode = ? AND userId = ?
        `;
        const values = [foodCode, userId];
        const [rows, fields] = await connection.query(query, values) as any;



        const query2 = `
        SELECT * FROM favorite_foods AS a
        LEFT JOIN foods AS b ON a.foodCode = b.foodCode

        WHERE a.userId = ?
        ORDER BY a.createdAt DESC
        `;

        const values2 = [userId];
        const [rows2, fields2] = await connection.query(query2, values2) as any;



        connection.release();

        if (rows2) {
            return rows2;
        } else {
            return null;
        }


    } catch (error) {
        
        connection.release();

        console.error('deleteFavoriteFood error: ', error);
        return null;

    }

}





// get all favorite foods

export async function getFavoriteFood(
    userId: number,
): Promise<FoodProps[]> {


    
    console.log('getAllFavoriteFood', userId);


    const connection = await connect();
    try {

        const query = `
        SELECT * FROM favorite_foods AS a
        LEFT JOIN foods AS b ON a.foodCode = b.foodCode

        WHERE a.userId = ?
        ORDER BY a.createdAt DESC
        `;

        const values = [userId];
        const [rows, fields] = await connection.query(query, values) as any

        connection.release();

        if (rows) {
            return rows
        } else {
            return [];
        }

    } catch (error) {

        connection.release();

        console.error('getFavoriteFood error: ', error);
        return [];

    }

}





export async function getAllForDownload({

    sort,
    order,
    q,
    startDate,
    endDate,
    foodTypeArray,

  }: {

    sort: string,
    order: string,
    q: string,
    startDate: string,
    endDate: string,
    foodTypeArray: string[],

  }): Promise<FoodProps[]> {

    console.log('getAllForDownload', sort, order, q, foodTypeArray);


    const connection = await connect();

    try {

        if (!sort) {
            sort = 'createdAt';
        }
        
        if (!order) {
            order = 'desc';
        }
        

        const query = `
        SELECT * FROM foods
        WHERE (foodName LIKE ? OR foodCode LIKE ? OR publisher LIKE ? )
        AND createdAt >= ? AND createdAt <= ?
        AND foodGroup IN (?)

        ORDER BY

        ${sort} ${order},
        
 
        CASE
        WHEN foodCode LIKE 'P%' THEN 1
        WHEN foodCode LIKE 'D%' THEN 2
        WHEN foodCode LIKE 'F%' THEN 3
        WHEN foodCode LIKE 'R%' THEN 4
        ELSE 5
        END ASC


        `;
        const values = [
            `%${q}%`, `%${q}%`, `%${q}%`,
            startDate, endDate,
            foodTypeArray,
        ];


        const [rows, fields] = await connection.query(query, values) as any;

        connection.release();
    
        if (rows) {
            return rows
        } else {
            return [];
        }

    } catch (error) {

        connection.release();

        console.error('getAllForDownload error: ', error);
        return [];

    }

}






export async function getFoodType (): Promise<string[]> {

    const connection = await connect();



    try {

        

        const query = `
        SELECT DISTINCT foodGroup
        FROM foods
        WHERE foodGroup <> ''
        ORDER BY foodGroup ASC
        `;

        const values = [] as any;

        const [rows, fields] = await connection.query(query, values) as any

        connection.release();

        if (rows) {
            return rows.map((row: any) => row.foodGroup);
        } else {
            return [];
        }

    } catch (error) {

        connection.release();

        console.error('getFoodType error: ', error);
        return [];

    }

}