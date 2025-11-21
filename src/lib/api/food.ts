import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { create, random } from 'lodash';
import { day } from 'date-arithmetic';
import { D } from '@uploadthing/react/types-f6db134c';
import { m } from 'framer-motion';
import { string } from 'prop-types';
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


/* set user_food */
export async function registerOne (
{
    foodName,
    userId,
}: {
    foodName: string,
    userId: string,
})
{
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
}


export async function addFoodToUser (
{
    foodCode,
    userId,
} : {
    foodCode: string,
    userId: string,
})
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

export async function getAll (
    ////userId: string,
    sort: string,
    order: string,
    
    limit: number,

    page: number,
    q: string,
): Promise<FoodProps[]> {
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('foods');

    ////console.log('getAll', userId, limit, page);

    // search by q ( foodName, foodCode, publisher )

    return await collection
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

export async function getAllUserFood(
    userId: string,
    
    limit: number,

    page: number,
    sort: string,
    order: string,

): Promise<FoodProps[]> {
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

    
    return result;

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
{
    foodName,
    foodCode,
    userId,
} : {
    foodName: string,
    foodCode: string,
    userId: string,
}) : Promise<FoodProps[]> {


    console.log('addFavoriteFood', foodName, foodCode, userId);



    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('favorite_foods');

    // check duplication of foodCode of userId

    const result = await collection.findOne({
        foodCode: foodCode,
        userId: userId,
    });

    if (!result) {


        const result = await collection.insertOne({
            foodName: foodName,
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
    {
        _id,
        userId,
    } : {
        _id: string,
        userId: string,
    },
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









