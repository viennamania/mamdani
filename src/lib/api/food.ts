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
) : Promise<any>
{
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('user_foods');

    const foodCode = 'USER' + random(100000, 999999);

    const result = await collection.insertOne({
        foodCode,
        foodName,
        publisher,
        foodCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    return result;
}


export async function addFoodToUser (
    foodCode: string,
    userId: string,
): Promise<any>
{

    //console.log('addFoodToUser foodCode', foodCode);
    //console.log('addFoodToUser userId', userId);



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






}





/* register many */
/* return registered count */

export async function registerMany(
    foods: FoodProps[],
) : Promise<number> {



    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');

    // check foodCode duplication
    // and if not duplicated, and then insert record

    let count = 0;

    foods.forEach(async (food: any) => {
        // check duplication of foodCode

        const result = await collection.findOne({
            foodCode: food?.foodCode,
        });

        if (!result) {
            await collection.insertOne({
                ...food,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            count += 1;
        }

    });

    return count;
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
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');

    ////console.log('getAll', userId, limit, page);

    // search by q ( foodName, foodCode, publisher )

    const foods = await collection
    .aggregate<FoodProps>([


        {
            $match: {
                $or: [
                    {
                        foodName: {
                            $regex: q,
                            $options: 'i',
                        },
                    },

                    /*
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
                    */
                ],
            },
        },

           
        {
            $sort: {
                [sort]: order === 'asc' ? 1 : -1,
            },
        },
    

        {
            $skip: (page - 1) * limit,
        },
        
        {
            $limit: limit,
        },
    ])
    .toArray();

    const totalCount = await getCount(
        '',
        q,
    );

    return {
        foods,
        totalCount,
    };
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


    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');
    const results = await collection.findOne<FoodProps>(
        {
            foodCode: foodCode,
        },
    );


    return results;

}





/* delete one */
export async function deleteOne(
    foodCode: string,
): Promise<any> {

    console.log('deleteOne', foodCode);

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');




    return await collection.deleteOne({
        foodCode: foodCode,
    });

}



/* delete one */
export async function deleteOneUser(
    userId: string,
    foodCode: string,
): Promise<any> {

    console.log('deleteOneUser userId', userId);
    console.log('deleteOneUser foodCode', foodCode);

    const client = await clientPromise;


    // if favorite_foods has userId and same foodCode, then remove

    const favorite_foods_collection = client.db('doingdoit').collection('favorite_foods');

    await favorite_foods_collection.deleteOne({
        userId: userId,
        foodCode: foodCode,
    });

    
    const collection = client.db('doingdoit').collection('user_foods');



    return await collection.deleteOne({
        userId: userId,
        foodCode: foodCode,
    });

}







/* get all user_foods  */

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

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('user_foods');

    console.log('getAllUserFood', userId);

    ////console.log('getAll', userId, limit, page);

    // search by q ( foodName, foodCode, publisher )

    // user_foods lookup foods

    console.log('limit', limit);
    console.log('page', page);
    console.log('sort', sort);
    console.log('order', order);




    const result = await collection.aggregate<FoodProps> ([
        {
            $match: {
                userId: userId,
            },
        },

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


        // user_foods lookup foods and include if not exit foods
        
        {
            $lookup: {
                from: 'foods',
                localField: 'foodCode',
                foreignField: 'foodCode',
                as: 'foods',
            },
        },

        // if foods is empty, then remove
        /*
        {
            $match: {
                foods: {
                    $ne: [],
                },
            },
        },
        */

        
        /*
        {
            $unwind: '$foods',
        },
        */

        // foodName, foodCategory, kcal, carbohydrate, protein, fat, salt, saturatedfat, cholesterol, sugar, publisher
        
        {
            $project: {
                _id: 0,
                id: '$foods.id',
                


                foodCode: '$foods.foodCode',
      
                


                foodCategory: '$foods.foodCategory',
                ///foodName: '$foods.foodName',


                foodName: {
                    $cond: {
                        if: { $eq: [ '$foodName', null ] },
                        then: '$foods.foodName',
                        else: '$foodName',
                    },
                },

                foodGroup: '$foods.foodGroup',
                quality: '$quality',
                kcal: '$foods.kcal',
                carbohydrate: '$foods.carbohydrate',
                protein: '$foods.protein',
                fat: '$foods.fat',
                salt: '$foods.salt',
                saturatedfat: '$foods.saturatedfat',
                cholesterol: '$foods.cholesterol',
                sugar: '$foods.sugar',
                publisher: '$foods.publisher',
                createdAt: '$createdAt',
                updatedAt: '$updatedAt',
            },
        },

        // if sort is foodName, then sort by foodName of foods collection
            
        {
            $sort: {
                [sort]: order === 'asc' ? 1 : -1,
            },
        },
        {
            $skip: (page - 1) * limit,
        },
        {
            $limit:  limit,
        },
        

 
    ]).toArray();

    
    const totalCount = await getCountUser(
        userId as any,
        q,
    );

    return {
        foods: result,
        totalCount,
    };

}







/* get all user_foods  excloud favorite */

export async function getAllUserFoodExcludeFavorite(
    userId: string,
    
    limit: number,

    page: number,
    sort: string,
    order: string,

): Promise<FoodProps[]> {


    console.log('getAllUserFoodExcludeFavorite', userId);



    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('user_foods');


    const result = await collection.aggregate<FoodProps> ([
        {
            $match: {
                userId: userId,
            },
        },

        // remove if foodCode is array
        {
            $match: {
                foodCode: {
                    $not: {
                        $type: 'array',
                    },
                },
            },
        },

        // remove if favorite_foods has same foodCode and userId
        
        {
            $lookup: {

                from: 'favorite_foods',
                let: {
                    foodCode: '$foodCode',
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: [
                                            '$foodCode',
                                            '$$foodCode',
                                        ],
                                    },
                                    {
                                        $eq: [
                                            '$userId',
                                            userId,
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                ],
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
   
        
        

        


        // user_foods lookup foods and include if exit foods
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
        


    
        /*
        {
            $unwind: '$foods',
        },
        */

        // foodName, foodCategory, kcal, carbohydrate, protein, fat, salt, saturatedfat, cholesterol, sugar, publisher
        
        {
            $project: {
                _id: 0,
                ///id: '$foods.id',

                ///foodCode: '$foods.foodCode',
                foodCode: '$foodCode',



                ///foodName: '$foods.foodName',

                /*
                foodName: {
                    $cond: {
                        if: { $eq: [ '$foodName', null ] },
                        then: '$foods.foodName',
                        else: '$foodName',
                    },
                },
                */
                foodName: '$foodName',


                foodCategory: '$foods.foodCategory',
                foodGroup: '$foods.foodGroup',

                quality: '$foods.quality',
                kcal: '$foods.kcal',
                carbohydrate: '$foods.carbohydrate',
                protein: '$foods.protein',
                fat: '$foods.fat',
                salt: '$foods.salt',
                saturatedfat: '$foods.saturatedfat',
                cholesterol: '$foods.cholesterol',
                sugar: '$foods.sugar',
                publisher: '$foods.publisher',
                createdAt: '$createdAt',
                updatedAt: '$updatedAt',
            },
        },

        // if sort is foodName, then sort by foodName of foods collection


        {
            $sort: {
                [sort]: order === 'asc' ? 1 : -1,
            
            },
        },


        {
            $skip: (page - 1) * limit,
        },
        {
            $limit:  limit,
        },
        

 
    ]).toArray();

    
    return result;



}






/* add favorite food and get all favorite foods */
/* favorite_foods */

export async function addFavoriteFood(
    foodCode: string,
    userId: string,
): Promise<FoodProps[]> {


    console.log('addFavoriteFood', foodCode, userId);



    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('favorite_foods');

    // check duplication of foodCode of userId

    const result = await collection.findOne({
        foodCode: foodCode,
        userId: userId,
    });

    if (!result) {


        const result = await collection.insertOne({
            //foodName: foodName,
            foodCode: foodCode,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        ///console.log('addFavoriteFood result', result);


    }


    return await collection
    .aggregate<FoodProps>([
        
        {
            $match: {
                userId: userId,
            },
        },

        {
            $sort: {
                createdAt: -1,
            },
        },
    ])
    .toArray();

}



export async function deleteFavoriteFood(
    _id: string,
    userId: string,
): Promise<FoodProps[]> {
    
    console.log('deleteFavoriteFood', _id);

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('favorite_foods');

    await collection.deleteOne({
        _id: new ObjectId(_id),
    });

    return await collection
    .aggregate<FoodProps>([
        
        {
            $match: {
                userId: userId,
            },
        },

        {
            $sort: {
                createdAt: -1,
            },
        },
    ])
    .toArray();

}





// get all favorite foods

export async function getFavoriteFood(
    userId: string,
): Promise<FoodProps[]> {

    console.log('getAllFavoriteFood', userId);

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('favorite_foods');

    return await collection
    .aggregate<FoodProps>([
        
        {
            $match: {
                userId: userId,
            },
        },

        // remove if foods dont have same foodCode
        {
            $lookup: {
                from: 'foods',
                localField: 'foodCode',
                foreignField: 'foodCode',
                as: 'foods',
            },
        },
        
        /*
        {
            $match: {
                foods: {
                    $ne: [],
                },
            },
        },
        */
        

        {
            $sort: {
                createdAt: -1,
            },
        },
    ])
    .toArray();

}



/* mysql version
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
*/
/* mongodb version */
export async function deleteAll(
): Promise<any> {

    console.log('deleteAll====================');

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');

    return await collection.deleteMany({});
    
}





/* mysql version
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
*/
/* mongodb version */
export async function deleteMany(
    foodCodes: string[],
): Promise<any> {

    console.log('deleteMany', foodCodes);

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');

    return await collection.deleteMany({
        foodCode: {
            $in: foodCodes,
        },
    });

}


// mysql version
/*
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
*/
// mongodb version
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
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');

    ////console.log('getAll', userId, limit, page);

    // search by q ( foodName, foodCode, publisher )

    const foods = await collection
    .aggregate<FoodProps>([
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
            $sort: {
                [sort]: order === 'asc' ? 1 : -1,
            },
        },
    ])
    .toArray();

    return foods;
}


/* mysql version
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
*/
// mongodb version
export async function getFoodType (): Promise<string[]> {

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');

    const result = await collection.aggregate([
        {
            $match: {
                foodGroup: {
                    $ne: '',
                },
            },
        },
        {
            $group: {
                _id: '$foodGroup',
            },
        },
        {
            $sort: {
                _id: 1,
            },
        },
    ]).toArray();

    return result.map((item) => item._id);

}