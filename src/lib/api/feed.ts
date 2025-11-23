import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { create, random, update } from 'lodash';
import { day } from 'date-arithmetic';
import { D } from '@uploadthing/react/types-f6db134c';
import { m } from 'framer-motion';

//import { string } from 'prop-types';

import exp from 'constants';
import { use } from 'react';
import { da, en } from '@faker-js/faker';
import { data } from '@/data/doingdoit/board/data';
import { u } from 'uploadthing/dist/types-e8f81bbc';
import { availableParallelism } from 'os';
import { avatarClasses } from '@mui/material';
import { lookup } from 'dns';

import pool, {connect, query} from '@/config/db';
import MealFood from '@/components/doingdoit/statistics/mealFood';
import { exit } from 'process';
import { sleep } from 'react-query/types/core/utils';
import { AiOutlineConsoleSql } from 'react-icons/ai';




/*
     mealTime: '아침',
    mealFood: '케잌',
    mealAmount: '적게',
    mealSpeed: '천천히',

    scrapCount: 4,
    likeCount: 13,
    commentCount: 67,
    viewCount: 44,
    rating: [5, 5, 2, 3],

    feedbackYn: 'N',
*/


export interface FeedProps {
  id: string;

  userId: number,
  email: string,
  name: string,
  nickname: string,
  avatar: string,

  createdAt: Date,
  updatedAt: Date,

  feedTitle: string,
  feedContent: string,

  mealDate: string,
  mealTime: string,
  mealFood: string,

  mealAmount: string,
  mealSpeed: string,

  image1: string,
  image2: string,
  image3: string,
  image4: string,
  image5: string,
  image6: string,
  image7: string,
  image8: string,
  image9: string,
  image10: string,

  scrapCount: number;
  likeCount: number;
  commentCount: number;
  viewCount: number;

  likeYn: boolean;
  scrapYn: boolean;


  feedbackYn: string,

  feedbackContent: string,
  feedbackScore: string,

  feedbackWriterId: string,
  feedbackWriterNickname: string,
  feedbackWriterAvatar: string,
  feedbackWriterEmail: string,

  

}




export interface ResultProps {
  _id: string;
  feeds: FeedProps[];
  totalCount: number;
}




/*
    email: _email || 'no email',
    mealTime: _mealTime || 'no mealTime',
    mealFood: _mealFood || 'no mealFood',
    mealAmount: _mealAmount || 'no mealAmount',
    mealSpeed: _mealSpeed || 'no mealSpeed',


    feedbackYn: _feedbackYn || 'no feedbackYn',
*/

/* register feed */
export async function registerOne (
    {
      userId,
      email,
      name,
      nickname,
      avatar,

      mealDate,
      mealTime,
      mealFood,
      mealAmount,
      mealSpeed,

      

      //scrapCount,
      //likeCount,
      //commentCount,
      //viewCount,
      //rating,
      feedbackYn,

      feedImage1,
      feedImage2,
      feedImage3,
      feedImage4,
      feedImage5,
      feedImage6,
      feedImage7,
      feedImage8,
      feedImage9,
      feedImage10,



      feedTitle,
      feedContent,
      hiddenYn,



      
    }: {
      userId: string,
      email: string,

      name: string,
      nickname: string,
      avatar: string,

      mealDate: string,
      mealTime: string,
      mealFood: object,

      mealAmount: string,
      mealSpeed: string,

      //scrapCount: number,
      //likeCount: number,
      //commentCount: number,
      //viewCount: number,
      //rating: number[],
      feedbackYn: string,

      feedImage1: string,
      feedImage2: string,
      feedImage3: string,
      feedImage4: string,
      feedImage5: string,
      feedImage6: string,
      feedImage7: string,
      feedImage8: string,
      feedImage9: string,
      feedImage10: string,

      feedTitle: string,
      feedContent: string,
      hiddenYn: string,

    }
  ) {


    // mealDateParam is 2021-09-01 format

    ////const mealDateParam = (new Date(mealDate), 'yyyy-MM-dd');

    //const mealDateParam = (new Date(mealDate)).toISOString().slice(0, 10);


    ///const mealDateParam = (new Date(mealDate))

    console.log('registerOne mealDate: ' + mealDate);

    


    ///mealDate = new Date().toISOString().slice(0, 10);

    let mealDateParam = '';

   
    if (mealDate === undefined) {
      mealDateParam = new Date().toISOString().slice(0, 10);
    } else {
    
      const newYear = new Date(mealDate);

   

      const year = newYear.getFullYear();
      const month = newYear.getMonth() + 1;
      const date = newYear.getDate();

      mealDateParam = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
    }



    console.log('registerOne mealDateParam=============' + mealDateParam);




    

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');

    /*
    // check same mealDate and mealTime and email
    const checkResults = await collection.findOne(
      {
        email: email,
        mealDate: mealDate,
        mealTime: mealTime,
      }
    );

    if (checkResults) {
      console.log('registerOne checkResults: ' + checkResults);


      return null;
    }
    */
  

    // get sequence number and increment it

    ///const id = random(100000, 999999).toString();

    // random 6 digit number
    /*
    const id = Math.floor(100000 + Math.random() * 900000).toString();

    console.log('registerOne id: ' + id);
    */

    // id is sequence number that is incremented by 1 and type string
    // id is unique

    // get sequence number and increment it

    // get sequence number from recent document id and increment it

    // get recent document id
    // if recent document id is null, set 1

    // if recent document id is not null, get sequence number from recent document id and increment it

    // id is string type
    // sequenceResults is string type

  
    
    const recentResults = await collection.findOne(
      {},
      {
        sort: { _id: -1 },
        projection: { _id: 0, id: 1 },
      }
    );

    console.log('======registerOne recentResults id: ' + recentResults?.id);

    let sequenceResults = '';

    if (recentResults) {
      sequenceResults = (parseInt(recentResults.id) + 1).toString();
    } else {
      sequenceResults = '1';
    }
  





    // insert one document and read it


    await collection.insertOne(
      {
        id: sequenceResults,

        userId: userId,
        email: email,
        name: name,
        nickname: nickname,
        avatar: avatar,



        ///mealDate: mealDate,
        mealDate: mealDateParam,

        mealTime: mealTime,
        mealFood: mealFood,
        mealAmount: mealAmount,
        mealSpeed: mealSpeed,
        //scrapCount: scrapCount,
        //likeCount: likeCount,
        //commentCount: commentCount,
        //viewCount: viewCount,
        //rating: rating,
        feedbackYn: feedbackYn,


        image1: feedImage1,
        image2: feedImage2,
        image3: feedImage3,
        image4: feedImage4,
        image5: feedImage5,
        image6: feedImage6,
        image7: feedImage7,
        image8: feedImage8,
        image9: feedImage9,
        image10: feedImage10,

        
        feedTitle: feedTitle,
        feedContent: feedContent,

        hiddenYn: hiddenYn,


        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,

      }
    );

    const results =  await collection.findOne(
      {
        id: sequenceResults,
      }
    );


    // fetch feeds from db  order by mealDate asc
    /*
    $match: {
      feedTitle: {
        $exists: true,
        ////$ne: ''
      }
    }
    */
    // and then update "sequenceNumber" field to sequence number from 1 to count of feeds

    /*
    const feeds = await collection.find(
      {
        feedTitle: {
          $exists: true,
          $ne: ''
        }
      }
    ).sort({ mealDate: 1 }).toArray();
    */


    // update sequenceNumber field to sequence number from 1 to count of feeds
    /*
    const feeds = await collection.aggregate(
      [
        {
          $match: {
            feedTitle: {
              $exists: true,
              $ne: ''
            }
          },
        },
        {
          $match: {
            // 'Y' or 'N'
            feedbackYn: {
              $in: ['Y', 'N'],
            },
          },
        },
        {
          $sort: {
            mealDate: 1,
          }
        },
      ]
    ).toArray();



    for (let i = 0; i < feeds.length; i++) {

      const feed = feeds[i];

      await collection.updateOne(
        {
          id: feed.id,
        },
        {
          $set: {
            sequenceNumber: i + 1,
          }
        }
      );

    }
    */





    /*
    const connection = await connect();

    try {


          // get point from point_category table
          const pointCategoryQuery = `
          SELECT point FROM point_category WHERE category = ?
          `;
          const pointCategoryValues = ['feedPost'];

          const [pointCategoryRows, pointCategoryFields] = await connection.query(pointCategoryQuery, pointCategoryValues) as any;

          if (pointCategoryRows[0]) {

            const point = pointCategoryRows[0].point;

            console.log('point: ' + point);

            // insert point history
            const pointHistoryQuery = `
            INSERT INTO points
            (userId, point, title, createdAt)
            VALUES (?, ?, ?, ?)
            `;
            const pointHistoryValues = [userId, point, 'feedPost', new Date()];

            await connection.query(pointHistoryQuery, pointHistoryValues);

          }


          connection.release();

    } catch (error) {
            
          connection.release();
      
          console.error('getTop error: ', error);
          
    }
    */








    // mealFood document insert and update each foodName count
    const mealFoodArray = mealFood as any;
    console.log('mealFoodArray: ' + mealFoodArray);

    for (let i = 0; i < mealFoodArray.length; i++) {

      const foodName = mealFoodArray[i].foodName;
      const foodCode = mealFoodArray[i].foodCode;
      


      // insert one document and read it

      const foodCollection = client.db('doingdoit').collection('user_foods');


      // mealFood document insert and update each foodName count of userId
      const foodResults = await foodCollection.findOne(
        /*
        {
          foodName: mealFoodName,
          userId: userId,
        }
        */

        {
          $and: [
            { foodCode: foodCode },
            { userId: userId },
          ]
        }
      );

      console.log('foodResults: ' + foodResults);

      if (foodResults) {

        console.log('foodResults._id: ' + foodResults._id);

        // update mealFood
        await foodCollection.updateOne(
          {
            $and: [
              { foodCode: foodCode },
              { userId: userId },
            ]
          },
          {
            $set: {
              foodCount: foodResults.foodCount + 1,
              updatedAt: new Date(),
            }
          }
        );

      } else {

        // insert mealFood
        await foodCollection.insertOne(
          {
            foodCode: foodCode,
            foodName: foodName,
            userId: userId,
            foodCount: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        );

      }

    }


  
    return results;
  
  }




/* register feed */
export async function updateOne (
  {
    id,
    userId,
    email,
    name,
    nickname,
    avatar,

    mealDate,
    mealTime,
    mealFood,
    mealAmount,
    mealSpeed,

    feedbackYn,
    
  }: {
    id: string,
    userId: string,
    email: string,

    name: string,
    nickname: string,
    avatar: string,

    mealDate: string,
    mealTime: string,
    mealFood: object,

    mealAmount: string,
    mealSpeed: string,

    feedbackYn: string,

  }
) {



  let mealDateParam = '';

 
  if (mealDate === undefined) {
    mealDateParam = new Date().toISOString().slice(0, 10);
  } else {
  
    const newYear = new Date(mealDate);

 

    const year = newYear.getFullYear();
    const month = newYear.getMonth() + 1;
    const date = newYear.getDate();

    mealDateParam = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
  }

  

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');


  const results = await collection.updateOne(
    { id: id },
    { $set:
      {
        userId: userId,
        email: email,
        name: name,
        nickname: nickname,
        avatar: avatar,

        mealDate: mealDateParam,
        mealTime: mealTime,
        mealFood: mealFood,
        mealAmount: mealAmount,
        mealSpeed: mealSpeed,
        feedbackYn: feedbackYn,
        updatedAt: new Date(),
      }
    }
  );










  return results;

}







  export async function getFeedById(
    id: string,
    userId: string,
  ): Promise<FeedProps | null> {

    console.log('getFeedById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');

    /*
    const results = await collection.findOne<FeedProps>(
      { id: id },
      { projection: { _id: 0, emailVerified: 0 } }
      ////{ projection: { _id: 0, emailVerified: 0 } }
    );
  
    console.log('getFeedById results: ' + results);
    */

    const results = await collection
      .aggregate<FeedProps>([

        // feedTitle is exist  and not ''

        {
          $match: {
            id: id,

            /*
            feedTitle: {
              $exists: true,
              $ne: ''
            },
            */
           
          }
        },
 

        {
          $lookup:
          {
            from: 'feed_likes',
            localField: 'id',
            foreignField: 'feedId',
            as: 'likes'
          }
        },
        // lookup scrap
        {
          $lookup:
          {
            from: 'feed_scraps',
            localField: 'id',
            foreignField: 'feedId',
            as: 'scraps'
          }
        },

        // likeCount is count of likes array
        {
          $addFields: {
            likeCount: { $size: '$likes' },
            scrapCount: { $size: '$scraps' },
          }

        },

                // local field is foodCode of eache item of mealFood array


        // mealFood is array type
        // each item of mealFood array is object type
        // each item of mealFood array has foodCode field
        // foodCode field is string type
        // foodCode field is unique
        // foodCode field is index
        // foodCode field is not null
        // foodCode field is not empty string

        // check mealFood is not array type, return empty array
        // $lookup argument 'localField' must be a string
        // local field must be string type

        
        
        // lookup mealFood, mealFood is array type
        // if mealFood is not array type, return empty array
        // each item of mealFood array is object type
        // each item of mealFood array has foodCode field
        // foodCode field is string type

        // foodCode field is unique

   



        {
          $lookup:
          {

            from: 'foods',
            // local field is foodCode of eache item of mealFood array
            // mealFood is array type
            // if mealFood is not array type, return empty array
            // each item of mealFood array is object type
            // each item of mealFood array has foodCode field

            // local field is foodCode of eache item of mealFood array

            // if mealFood is not array type, return empty array
            // $lookup argument 'localField' must be a string

           localField: 'mealFood.foodCode',
            foreignField: 'foodCode',
            as: 'foods'
            

          }
        },





        {
          $project: {
            _id: 0,
            emailVerified: 0,
            likes: {
              _id: 0,
              feedId: 0,
              userId: 0,
              userEmail: 0,
              userNickname: 0,
              userAvatar: 0,
              createdAt: 0,
              updatedAt: 0,
            }
          }
        },


        {
          $project: {
            likes: 0
          }
        },
          
        {
          $project: {
            scraps: 0
          }
        },


        {
          $limit: 1,
        },

      ])
      .toArray();


      /* check likes collection and add likeYn field */

      const likeCollection = client.db('doingdoit').collection('feed_likes');

      const likeResults = await likeCollection.findOne(
        {
          feedId: id,
          userId: userId,
        } 
      );

      if (likeResults) {
        results[0].likeYn = true;
      }


      /* check scraps collection and add scrapYn field */
      const scrapCollection = client.db('doingdoit').collection('feed_scraps');

      const scrapResults = await scrapCollection.findOne(
        {
          feedId: id,
          userId: userId,
        } 
      );

      if (scrapResults) {
        results[0].scrapYn = true;
      }




    // view count update
    // if viewCount is null, set 1 else increment 1
    await collection.updateOne(
      {
        id: id,
      },
      {
        $set:
        {
          viewCount: results[0]?.viewCount ? results[0]?.viewCount + 1 : 1,
        }
      }
    );


    if (results) {




      ////console.log('getFeedById results: ' + JSON.stringify(results[0]));

      const userId = results[0].userId;


      const connection = await connect();
      const [rows, fields] = await connection.query(
        'SELECT nickname, avatar FROM users WHERE id = ?',
        [userId]
      ) as any;
  
      if (rows[0]) {

        console.log('rows[0].nickname: ' + rows[0].nickname);
        console.log('rows[0].avatar: ' + rows[0].avatar);

        results[0].nickname = rows[0].nickname;
        results[0].avatar = rows[0].avatar;
      }

      // feedbackWriterId

      const feedbackWriterId = results[0].feedbackWriterId;
      const [feedbackWriterRows, feedbackWriterFields] = await connection.query(
        'SELECT nickname, avatar FROM users WHERE id = ?',
        [feedbackWriterId]
      ) as any;

      if (feedbackWriterRows[0]) {

        console.log('feedbackWriterRows[0].nickname: ' + feedbackWriterRows[0].nickname);
        console.log('feedbackWriterRows[0].avatar: ' + feedbackWriterRows[0].avatar);

        results[0].feedbackWriterNickname = feedbackWriterRows[0].nickname;
        results[0].feedbackWriterAvatar = feedbackWriterRows[0].avatar;
      }
     



      connection.release();

      


      // change results[0].nickname and avatar t




      return {



        ...results[0],
        ///////bioMdx: await getMdxSource(results.bio || placeholderBio)
      };

    } else {
      return null;
    }


  }





  export async function getFeedByMealDateTime(
    email: string,
    mealDate: string,
    mealTime: string,
  ): Promise<FeedProps | null> {

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
 
   
 
    const mealTimeParam = mealTime === 'breakfast' ? '아침' : mealTime === 'lunch' ? '점심' : mealTime === 'dinner' ? '저녁' : mealTime === 'snack' ? '간식' : '야식';



    const results = await collection
    .aggregate<FeedProps>([
      {
        $match: {
          email: email,
          mealDate: mealDate,
          mealTime: mealTimeParam,
        }
      },
    ])
    .toArray();



    return results?.[0];


  }






export async function getFeedByEmail(id: string): Promise<FeedProps | null> {

    console.log('getFeedByEmail getUser id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
    const results = await collection.findOne<FeedProps>(

      { email: id },

      // feedTitle is not null

  

      { projection: { _id: 0, emailVerified: 0 } }
      ////{ projection: { _id: 0, emailVerified: 0 } }
    );
  




    

    return results;
}




/* getFeedCountByEmail */


export async function getFeedCountByEmail(
  email: string,
) {
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('feeds');

      const results = await collection.countDocuments(
        {
          email: email,
        }
      );


      return results;

}


export async function getLikeCountByEmail(
  email: string,
) {
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('likes');

      const results = await collection.countDocuments(
        {
          userEmail: email,
        }
      );


      return results;

}


  
  export async function updateFeedById (
    {
      id,

      
      userId: userId,
      email: email,
      name: name,
      nickname: nickname,
      avatar: avatar,
      


      feedTitle,
      feedContent,
      hiddenYn,
      tags,

    }: {
      id: string,

      
      userId: string,
      email: string,
      name: string,
      nickname: string,
      avatar: string,
      

      feedTitle: string,
      feedContent: string,
      hiddenYn: string,

      tags: object,

    }
  ) {


    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
  

    //return await collection.updateOne({ username }, { $set: { bio } });

    // update on by email
    // field: { $exists: true }

    const results = await collection.updateOne(

    
      
      { id: id },

      { $set:
      
        {

          /*
          userId: userId,
          email: email,
          name: name,
          nickname: nickname,
          avatar: avatar,
          */


          feedTitle: feedTitle,
          feedContent: feedContent,
          hiddenYn: hiddenYn,

          tags: tags,

          createdAt: new Date(),

        }
      }
    );


    // tags document insert and update each count
    const tagsArray = tags as any;
    console.log('tagsArray: ' + tagsArray);

    for (let i = 0; i < tagsArray?.length; i++) {

      const tagName = tagsArray[i];
      const tagCount = 1;

      const tagCollection = client.db('doingdoit').collection('tags');

      const tagResults = await tagCollection.findOne(
        {
          tagName: tagName,
        }
      );

      console.log('tagResults: ' + tagResults);
      if (tagResults) {
          
          console.log('tagResults._id: ' + tagResults._id);
  
          // update tag
          await tagCollection.updateOne(
            {
              tagName: tagName,
            },
            {
              $set: {
                tagName: tagName,
                tagCount: tagResults.tagCount + tagCount,
                updatedAt: new Date(),
              }
            }
          );
  
        } else {

          // insert tag
          await tagCollection.insertOne(
            {
              tagName: tagName,
              tagCount: tagCount,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          );

        }

    }



    

    // points document insert
    // feedPost, feedLike, feedScrap, feedComment, feedFeedback,
    
    const pointsCollection = client.db('doingdoit').collection('points');

    // check points collection userId, feedId and add point only one time
    const pointsResults = await pointsCollection.findOne(
      {
        userId: userId,
        feedId: id,
        title: 'feedPost',
      }
    );

    if (!pointsResults) {


      const setupCollection = client.db('doingdoit').collection('setups');

      const setupResults = await setupCollection.findOne(
        {
          id: 'point',
        }
      );

      const point = setupResults?.feedPost || 0;



      await pointsCollection.insertOne(
        {
          userId: userId,
          userEmail: email,
          userNickname: nickname,
          userAvatar: avatar,
          point: point,
          feedId: id,
          title: 'feedPost',
          createdAt: new Date(),
        }
      );

    }
    


    

    return results;
  
  }





  export async function updateFeedImageById (
    {
      id,
      imageNumber,
      image,
    }: {
      id: string,
      imageNumber: number,
      image: string,
    }
  ) {

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');

    if (imageNumber === 1) {

      const results = await collection.updateOne(
        { id: id },
        { $set:
          {
            image1: image,

          }
        }
      );
      return results;
    }

    if (imageNumber === 2) {

      const results = await collection.updateOne(
        { id: id },
        { $set:
          {
            image2: image,

          }
        }
      );
      return results;
    }

    if (imageNumber === 3) {

      const results = await collection.updateOne(
        { id: id },
        { $set:
          {
            image3: image,

          }
        }
      );
      return results;
    }

    if (imageNumber === 4) {
      const results = await collection.updateOne(
        { id: id },
        { $set:
          {
            image4: image,

          }
        }
      );
      return results;
    }

    if (imageNumber === 5) {
      const results = await collection.updateOne(
        { id: id },
        { $set:
          {
            image5: image,

          }
        }
      );
      return results;
    }

    if (imageNumber === 6) {
      const results = await collection.updateOne(
        { id: id },
        { $set:
          {
            image6: image,

          }
        }
      );
      return results;
    }

    if (imageNumber === 7) {
      const results = await collection.updateOne(
        { id: id },
        { $set:
          {
            image7: image,

          }
        }
      );
      return results;
    }

    if (imageNumber === 8) {
      const results = await collection.updateOne(
        { id: id },
        { $set:
          {
            image8: image,

          }
        }
      );
      return results;
    }

    if (imageNumber === 9) {
      const results = await collection.updateOne(
        { id: id },
        { $set:
          {
            image9: image,

          }
        }
      );
      return results;
    }

    if (imageNumber === 10) {
      const results = await collection.updateOne(
        { id: id },
        { $set:
          {
            image10: image,

          }
        }
      );
      return results;
    }


    return null;

    
  }




  export async function updateFeedByEmail (
    {
      email,
      feedTitle,
      feedContent,
      name,
      nickname,
      mealTime,
      mealFood,
      mealAmount,
      mealSpeed,

     

    }: {
      email: string,

      feedTitle: string,
      feedContent: string,
      name: string,
      nickname: string,

      mealTime: string,
      mealFood: string,
      mealAmount: string,
      mealSpeed: string,
    }
  ) {



    console.log('updateFeedByEmail email: ' + email);
    console.log('updateFeedByEmail feedTitle: ' + feedTitle);
    console.log('updateFeedByEmail feedContent: ' + feedContent);
    


    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
  

    //return await collection.updateOne({ username }, { $set: { bio } });

    // update on by email
    const results = await collection.updateOne(
      { email: email },
      { $set:
      
        {
          feedTitle: feedTitle,
          feedContent: feedContent,


          name: name,
          nickname: nickname,

          mealTime: mealTime,
          mealFood: mealFood,
          mealAmount: mealAmount,
          mealSpeed: mealSpeed,
          updatedAt: new Date(),

        }
      }
    );


    console.log('updateUserByEmail results: ' + results);

    return results;
  
  }






  export async function getAllByEmail(
    email: string,
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,
  ): Promise<FeedProps[]> {
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
 
    const query = q === null ? '' : q;


    console.log('feeds getAllByEmail email: ' + email);
 

    const results =  await collection
    .aggregate<FeedProps>([
      {
        $match: {
          email: email,
        },

      },


      // meaDate is string type
      // convert string to date type
      // and sort by date type

      {
        $sort: {
          
          // mealDate is string type
          // convert string to date type
          // and sort by date type
          
        
 

          mealDate: -1,
          createdAt: -1,


        }
      },

     
      
      
      {
        $limit: limit,
        //////$skip: (page - 1) * limit, // skip the first n documents

      },

      // match by q and feedTitle and feedContent and hiddenYn is exist  and not 'Y'
      {
        $match: {
          $or: [
            { feedTitle: { $regex: query, $options: 'i' } },
            { feedContent: { $regex: query, $options: 'i' } },
          ],
        }
      },

      // feedTitle is not null
      {
        $match: {
          feedTitle: {
            $exists: true,
            $ne: null
          }
        }
      },
      

      
    ])
    .toArray();


    return results;





    /*
    const connection = await connect();

    // copy results to updatedResults
    let updatedResults = [
      ...results,
    ];

    for (let index = 0; index < results.length; index++) {

      const result = results[index];

      const userId = result.userId;
      
      const [rows, fields] = await connection.query(
        'SELECT nickname, avatar FROM users WHERE id = ?',
        [userId]
      ) as any;
  
      if (rows[0]) {

        updatedResults[index].nickname = rows[0].nickname;
        updatedResults[index].avatar = rows[0].avatar;
      }


      const feedbackWriterId = result.feedbackWriterId;
      const [feedbackWriterRows, feedbackWriterFields] = await connection.query(
        'SELECT nickname, avatar FROM users WHERE id = ?',
        [feedbackWriterId]
      ) as any;

      if (feedbackWriterRows[0]) {

        ///console.log('feedbackWriterRows[0].nickname: ' + feedbackWriterRows[0].nickname);
        //console.log('feedbackWriterRows[0].avatar: ' + feedbackWriterRows[0].avatar);

        updatedResults[index].feedbackWriterNickname = feedbackWriterRows[0].nickname;
        updatedResults[index].feedbackWriterAvatar = feedbackWriterRows[0].avatar;
      }

    }

    connection.release();

    return updatedResults;

    */

  
  }
  



  // get total count
  export async function getAllByEmailCount(
    email: string,
    q: string,
  ) {
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('feeds');


      const query = q === null ? '' : q;
  
      const results = await collection.countDocuments(

        {
          email: email,
          $or: [
            { feedTitle: { $regex: query, $options: 'i' } },
            { feedContent: { $regex: query, $options: 'i' } },
          ],
        }
 

      );
  
      return results;
  }








  export async function getAllPublic(
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,

  ///): Promise<ResultProps[]> {

  //): Promise<FeedProps[]> {

  ): Promise<ResultProps> {

  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');

    const query = q === null ? '' : q;

    
    // collection.find({}).sort({ _id: -1 }).limit(1).toArray(function(err, result) {

    const results =  await collection
      .aggregate<FeedProps>([

        // lookup user and project user fields avatar, nickname
        // avatar => userAvatar
        // nickkname => userNickname

        /*
        {
          $lookup:
          {
            from: 'users',
            localField: 'email',
            foreignField: 'email',
            as: 'users'
          }
        },

        {
          $project: {
            user: {
              //$arrayElemAt: ['$users', 0]

              $cond: {
                if: { $eq: [{ $size: '$users' }, 0] },
                then: { avatar: 'no avatar', nickname: 'no nickname' },
                else: { avatar: { $arrayElemAt: ['$users.avatar', 0] }, nickname: { $arrayElemAt: ['$users.nickname', 0] } }
              }

            },

            feedTitle: 1,
            feedContent: 1,
            mealDate: 1,
            mealTime: 1,
            mealFood: 1,
            mealAmount: 1,
            mealSpeed: 1,
            image1: 1,

            scrapCount: 1,
            likeCount: 1,
            commentCount: 1,
            viewCount: 1,
            rating: 1,
            feedbackYn: 1,
            createdAt: 1,
            updatedAt: 1,

            feedbackContent: 1,
            feedbackScore: 1,
            feedbackWriterId: 1,
            feedbackWriterNickname: 1,

            feedbackWriterAvatar: 1,

            feedbackWriterEmail: 1,




          }
        },
        */


          
        // match by q and feedTitle and feedContent and hiddenYn is exist  and not 'Y'
        {
          $match: {
            $or: [
              { feedTitle: { $regex: query, $options: 'i' } },
              { feedContent: { $regex: query, $options: 'i' } },
              { nickname: { $regex: query, $options: 'i' } },

              // mealFood is array type
              // foodName is string type
              { mealFood: { $elemMatch: { foodName: { $regex: query, $options: 'i' } } } },

  

    
            ],
            hiddenYn: {
              $exists: true,
              $ne: 'Y'
            },
            // title is not null
            feedTitle: {
              $exists: true,
              $ne: null
            },

          }
        },

       
        // mealTime is string type
        // '아침', '점심', '저녁', '간식', '야식'
        // sort by mealTime (아침, 점심, 저녁, 간식, 야식)
  

        {
          //sort by follower count
          $sort: {
            //_id: -1
            mealDate: -1,
            createdAt: -1,
          }
        },
        

        {
          $skip: (page - 1) * limit,
        },
        {
            $limit:  limit,
        },

        
      ])
      .toArray();


      const totalCount = await collection.countDocuments(
        {
          $or: [
            { feedTitle: { $regex: query, $options: 'i' } },
            { feedContent: { $regex: query, $options: 'i' } },
            { nickname: { $regex: query, $options: 'i' } },
            { mealFood: { $elemMatch: { foodName: { $regex: query, $options: 'i' } } } },

          ],
          hiddenYn: {
            $exists: true,
            $ne: 'Y'
          },
          // title is not  null
          feedTitle: {
            $exists: true,
            $ne: null
          },
          
        }
      );


      ////////console.log('results: ' + JSON.stringify(results));



      

      /*
      results.forEach(async (result, index) => {

        const userId = result.userId;

        console.log('userId: ' + userId);


        const connection = await connect();
        const [rows, fields] = await connection.query(
          'SELECT nickname, avatar FROM users WHERE id = ?',
          [userId]
        ) as any;
        
        connection.release();
    
        if (rows[0]) {

          console.log('rows[0].nickname: ' + rows[0].nickname);
          console.log('rows[0].avatar: ' + rows[0].avatar);

          results[index].nickname = rows[0].nickname;
          results[index].avatar = rows[0].avatar;
        }

      } );
      */


      
      const connection = await connect();

      // copy results to updatedResults
      let updatedResults = [
        ...results,
      ];
  
      for (let index = 0; index < results.length; index++) {
  
        const result = results[index];
  
        const userId = result.userId;
        
        const [rows, fields] = await connection.query(
          'SELECT nickname, avatar FROM users WHERE id = ?',
          [userId]
        ) as any;
    
        if (rows[0]) {
  
          updatedResults[index].nickname = rows[0].nickname;
          updatedResults[index].avatar = rows[0].avatar;
        }
  
  
        const feedbackWriterId = result.feedbackWriterId;
        const [feedbackWriterRows, feedbackWriterFields] = await connection.query(
          'SELECT nickname, avatar FROM users WHERE id = ?',
          [feedbackWriterId]
        ) as any;
  
        if (feedbackWriterRows[0]) {
  
          updatedResults[index].feedbackWriterNickname = feedbackWriterRows[0].nickname;
          updatedResults[index].feedbackWriterAvatar = feedbackWriterRows[0].avatar;
        }
  
      }
  
  
      connection.release();
  
  
      
    




    
      
      return {
        _id: '1',
        
        ////feeds: results,

        feeds: updatedResults,

        totalCount: totalCount,
      };
      

  }



  // get total count
  export async function getAllPublicCount(
    q: string,
  ) {
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('feeds');


      const query = q === null ? '' : q;
  
      const results = await collection.countDocuments(

        {
          $or: [
            { feedTitle: { $regex: query, $options: 'i' } },
            { feedContent: { $regex: query, $options: 'i' } },
            { nickname: { $regex: query, $options: 'i' } },
          ],
          hiddenYn: {
            $exists: true,
            $ne: 'Y'
          }
        }

      );
  
      return results;
  }







export async function getAll( {
  limit,
  page,
  sort,
  order,
  q,
  startDate,
  endDate,
  mealTimeArray,
  feedbackArray,
}: {
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
  startDate: string,
  endDate: string,
  mealTimeArray: string[],
  feedbackArray: string[],
}): Promise<ResultProps> {


  console.log('getAll q: ' + q);


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');



  const query = q === null ? '' : q;


  
  // lookup like and scrap
  // count of like and scrap

  const results = await collection
    .aggregate<FeedProps>([




      // lookup like
      {
        $lookup:
        {
          from: 'feed_likes',
          localField: 'id',
          foreignField: 'feedId',
          as: 'likes'
        }
      },
      // lookup scrap
      {
        $lookup:
        {
          from: 'feed_scraps',
          localField: 'id',
          foreignField: 'feedId',
          as: 'scraps'
        }
      },
        
      // sum of likeCount and scrapCount
      /*
      {
        $project: {
          _id: 0,
          emailVerified: 0,
          likeCount: { $size: '$likes' },
          scrapCount: { $size: '$scraps' },
          likes: 0,
          scraps: 0,
        }
      },
      */
      



      // search by query param
      {
        $match: {
          $or: [
            { feedTitle: { $regex: q, $options: 'i' } },
            { feedContent: { $regex: q, $options: 'i' } },
            { nickname: { $regex: q, $options: 'i' } },
            { feedbackWriterNickname: { $regex: q, $options: 'i' } },
  
          ],
        },
      },

      // feedTitle is exist  and not ''
      
      {
        $match: {
          feedTitle: {
            $exists: true,
            ////$ne: ''
          }
        }
      },


    // startDate, endDate match for mealDate

    {
      $match: {
        mealDate: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },


      {
        $match: {
          mealTime: {
            $in: mealTimeArray,
          },
        },
      },





      /* feedbacArray is array type */
      /* 미답변, 답변왈료 */
      /* if feedbackArray has '미답변', then match feedbackYn is 'N' */
      /* if feedbackArray has '답변완료', then match feedbackYn is 'Y' */
      /* if feedbackArray has '미답변' and '답변완료', then match feedbackYn is 'N' or 'Y' */
      (feedbackArray.find((feedback) => feedback === '미답변') && feedbackArray.find((feedback) => feedback === '답변완료')) ?
      {
        $match: {
          // 'Y' or 'N'
          feedbackYn: {
            $in: ['Y', 'N'],
          },
        },
      }
      :
      (feedbackArray.find((feedback) => feedback === '미답변')) ?
      {
        $match: {
          feedbackYn: 'N',
        },
      }
      :
      (feedbackArray.find((feedback) => feedback === '답변완료')) ?
      {
        $match: {
          feedbackYn: 'Y',
        },
      } : {
        // no match
        $match: {
          feedbackYn: '',
        },
      },
     


      {
        $sort: {
            [sort]: order === 'asc' ? 1 : -1,
            //_id: -1,

        },
      },
      {
          $skip: (page - 1) * limit,
      },
      {
          $limit:  limit,
      },
      
      
    ])
    .toArray();



    const resultsCount = await collection.aggregate([
      {
          $match: {
            $or: [
              { feedTitle: { $regex: q, $options: 'i' } },
              { feedContent: { $regex: q, $options: 'i' } },
              { nickname: { $regex: q, $options: 'i' } },
              { feedbackWriterNickname: { $regex: q, $options: 'i' } },

            ],
          }
      },
      // feedTitle is exist  and not ''

      {
        $match: {
          feedTitle: {
            $exists: true,
            ////$ne: ''
          }
        }
      },

      // startDate, endDate match for mealDate

      {
        $match: {
          mealDate: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },

      {
        $match: {
          mealTime: {
            $in: mealTimeArray,
          },
        },
      },

      (feedbackArray.find((feedback) => feedback === '미답변') && feedbackArray.find((feedback) => feedback === '답변완료')) ?
      {
        $match: {
          // 'Y' or 'N'
          feedbackYn: {
            $in: ['Y', 'N'],
          },
        },
      }
      :
      (feedbackArray.find((feedback) => feedback === '미답변')) ?
      {
        $match: {
          feedbackYn: 'N',
        },
      }
      :
      (feedbackArray.find((feedback) => feedback === '답변완료')) ?
      {
        $match: {
          feedbackYn: 'Y',
        },
      } : {
        // no match
        $match: {
          feedbackYn: '',
        },
      },



      {
          $count: 'count',
      },
  ]).toArray();


  


  /*
  return {
    _id: '1',
    ////feeds: results,

    feeds: updatedResults,


    totalCount: resultsCount[0]?.count || 0,
  };
  */

  return {
    _id: '1',
    feeds: results,
    totalCount: resultsCount[0]?.count || 0,
  };

}










/* get count */
export async function getCount(
  q: string,
): Promise<number> {


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');



  const result = await collection.aggregate([
      {
          $match: {
            $or: [
              { feedTitle: { $regex: q, $options: 'i' } },
              { feedContent: { $regex: q, $options: 'i' } },
              { nickname: { $regex: q, $options: 'i' } },
              { feedbackWriterNickname: { $regex: q, $options: 'i' } },

            ],
          }
      },
      // feedTitle is exist  and not ''

      {
        $match: {
          feedTitle: {
            $exists: true,
            ////$ne: ''
          }
        }
      },
      {
          $count: 'count',
      },
  ]).toArray();

  return result[0]?.count || 0;

}



  



// get total count
export async function getAllCount() {
  
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  const results = await collection.countDocuments(
    {
      feedTitle: {
        $exists: true,
        $ne: ''
      },
    }
  );

  //console.log('getAllPublicCount results: ' + results);

  return results;
}




export async function updateFeedbackById (
  {
    id,
    feedbackContent,
    feedbackScore,
    feedbackWriterId,
    feedbackWriterNickname,
    feedbackWriterAvatar,
    feedbackWriterEmail,


  }: {
    id: string,

    feedbackContent: string,
    feedbackScore: string,
    feedbackWriterId: string,
    feedbackWriterNickname: string,
    feedbackWriterAvatar: string,
    feedbackWriterEmail: string,


  }
) {



  console.log('updateFeedById id: ' + id);
  console.log('updateFeedById feedbackContent: ' + feedbackContent);
  


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');


  //return await collection.updateOne({ username }, { $set: { bio } });

  // update on by email
  // field: { $exists: true }

  const results = await collection.updateOne(

    
    { id: id },

    { $set:
    
      {
        feedbackContent: feedbackContent,
        feedbackScore: feedbackScore,
        feedbackWriterId: feedbackWriterId,
        feedbackWriterNickname: feedbackWriterNickname,
        feedbackWriterAvatar: feedbackWriterAvatar,
        feedbackWriterEmail: feedbackWriterEmail,

        feedbackCreatedAt: new Date(),

        feedbackYn: 'Y',


      }
    }
  );


  console.log('updateFeedbackById results: ' + results);

  return results;

}











  
 // like 
 export async function like(
  id: string,
  userId: string,
  userEmail: string,
  userNickname: string,
  userAvatar: string,

) {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  const results = await collection.findOne<FeedProps>(
    { id: id },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (results) {

    // like document insert and update each count
    const likeCollection = client.db('doingdoit').collection('feed_likes');

    const likeResults = await likeCollection.findOne(
      {
        feedId: id,
        userId: userId,
      }
    );

    console.log('likeResults: ' + likeResults);
    if (likeResults) {
        
      console.log('likeResults._id: ' + likeResults._id);

      // update like
      await likeCollection.updateOne(
        {
          feedId: id,
          userId: userId,
        },
        {
          $set: {
            feedId: id,
            userId: userId,
            updatedAt: new Date(),
          }
        }
      );

    } else {

      // insert like
      await likeCollection.insertOne(
        {
          feedId: id,
          userId: userId,
          userEmail: userEmail,
          userNickname: userNickname,
          userAvatar: userAvatar,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      );


      // update board likeCount

      await collection.updateOne(
        {
          id: id,
        },
        {
          $set:
          {
            likeCount: results?.likeCount ? results?.likeCount + 1 : 1,
          }
        }
      );

    }






    // points document insert
    // feedPost, feedLike, feedScrap, feedComment, feedFeedback,
    
    const pointsCollection = client.db('doingdoit').collection('points');

    // check points collection userId, feedId and add point only one time
    const pointsResults = await pointsCollection.findOne(
      {
        userId: userId,
        feedId: id,
        title: 'feedLike',
      }
    );

    if (!pointsResults) {


      // get point from setups collection
      // get feedLike point


      const setupCollection = client.db('doingdoit').collection('setups');

      const setupResults = await setupCollection.findOne(
        {
          id: 'point',
        }
      );

      const point = setupResults?.feedLike ? setupResults?.feedLike : 0;




      await pointsCollection.insertOne(
        {
          userId: userId,
          userEmail: userEmail,
          userNickname: userNickname,
          userAvatar: userAvatar,
          
          point: point,

          feedId: id,
          title: 'feedLike',
          createdAt: new Date(),
        }
      );

    }





    const connection = await connect();

    try {


          // get point from point_category table
          // get feedLike point
          const pointCategoryQuery = `
          SELECT point FROM point_category WHERE category = ?
          `;
          const pointCategoryValues = ['feedLike'];

          const [pointCategoryRows, pointCategoryFields] = await connection.query(pointCategoryQuery, pointCategoryValues) as any;

          if (pointCategoryRows[0]) {

            const point = pointCategoryRows[0].point;

            console.log('point: ' + point);

            const pointQuery = `
            INSERT INTO points
            (userId, point, title, createdAt) 
            VALUES (?, ?, ?, ?)
            `;
            const pointValues = [userId, point, 'feedLike', new Date()];

            await connection.query(pointQuery, pointValues);

          }

          connection.release();




    } catch (error) {
            
          connection.release();
      
          console.error('getTop error: ', error);
          
    }


    





    return {
      ...results,
      //bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
    
  } else {
    return null;
  }
}





// unlike 
export async function unlike(
  id: string,
  userId: string,
  userEmail: string,
  userNickname: string,
  userAvatar: string,

) {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  const results = await collection.findOne<FeedProps>(
    { id: id },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (results) {

    // like document insert and update each count
    const likeCollection = client.db('doingdoit').collection('feed_likes');

    const likeResults = await likeCollection.findOne(
      {
        feedId: id,
        userId: userId,
      }
    );

    console.log('likeResults: ' + likeResults);

    if (likeResults) {
        
      console.log('likeResults._id: ' + likeResults._id);

      // update like
      await likeCollection.deleteOne(
        {
          feedId: id,
          userId: userId,
        }
      );

      // update board likeCount
      await collection.updateOne(
        {
          id: id,
        },
        {
          $set:
          {
            likeCount: results?.likeCount ? results?.likeCount - 1 : 0,
          }
        }
      );


      return results;


    } else {
      return null;
    }
  } else {

    return null;
  }
    
}





 // scrap
 export async function scrap(
  id: string,
  userId: string,
  userEmail: string,
  userNickname: string,
  userAvatar: string,

) {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  const results = await collection.findOne<FeedProps>(
    { id: id },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (results) {

    // scrap document insert and update each count
    const scrapCollection = client.db('doingdoit').collection('feed_scraps');

    const scrapResults = await scrapCollection.findOne(
      {
        feedId: id,
        userId: userId,
      }
    );

    console.log('scrapResults: ' + scrapResults);
    if (scrapResults) {
        
        console.log('likeResults._id: ' + scrapResults._id);

        // update scrap
        await scrapCollection.updateOne(
          {
            feedId: id,
            userId: userId,
          },
          {
            $set: {
              feedId: id,
              userId: userId,
              updatedAt: new Date(),
            }
          }
        );

      } else {

        // insert like
        await scrapCollection.insertOne(
          {
            feedId: id,
            userId: userId,
            userEmail: userEmail,
            userNickname: userNickname,
            userAvatar: userAvatar,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        );


        // update board likeCount

        await collection.updateOne(
          {
            id: id,
          },
          {
            $set:
            {
              scrapCount: results?.scrapCount ? results?.scrapCount + 1 : 1,
            }
          }
        );

      }

    return {
      ...results,
      //bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}


// unscrap
export async function unscrap(
  id: string,
  userId: string,
  userEmail: string,
  userNickname: string,
  userAvatar: string,

) {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  const results = await collection.findOne<FeedProps>(
    { id: id },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (results) {

    // scrap document insert and update each count
    const scrapCollection = client.db('doingdoit').collection('feed_scraps');

    const scrapResults = await scrapCollection.findOne(
      {
        feedId: id,
        userId: userId,
      }
    );

    console.log('scrapResults: ' + scrapResults);

    if (scrapResults) {
        
      console.log('scrapResults._id: ' + scrapResults._id);

      // update scrap
      await scrapCollection.deleteOne(
        {
          feedId: id,
          userId: userId,
        }
      );

      // update board likeCount
      await collection.updateOne(
        {
          id: id,
        },
        {
          $set:
          {
            scrapCount: results?.scrapCount ? results?.scrapCount - 1 : 0,
          }
        }
      );


      return results;

    } else {

      return null;

    }

  } else {

    return null;

  }


}







//  join feed  and feed_likes and match by userId
export async function getAllByEmailScrap(
  email: string,
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
): Promise<FeedProps[]> {

  console.log('getAllByEmailScrap email: ' + email);


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feed_scraps');

  const query = q === null ? '' : q;


  // read feed_scraps by userId which is associate with feed
  // using lookup and project
  // https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
  // using unwind
  const results = await collection.aggregate<FeedProps>([
    {
      $match: {
        userEmail: email,
      }
    },
    // lookup feed
    {
      $lookup:
      {
        from: 'feeds',
        localField: 'feedId',
        foreignField: 'id',
        as: 'feed'
      }
    },
  
    {
      $unwind: '$feed'
    },

    

    // sort by follower count
    {
      $sort: {
        //_id: -1
        mealDate: -1,
        createdAt: -1,
      }
    },
    
    {
      $limit: limit,
      //////$skip: (page - 1) * limit, // skip the first n documents

    },



    
  ]).toArray();





  const connection = await connect();

  // copy results to updatedResults
  let updatedResults = [
    ...results,
  ];

  for (let index = 0; index < results.length; index++) {

    const result = results[index];

    const userId = result.userId;
    
    const [rows, fields] = await connection.query(
      'SELECT nickname, avatar FROM users WHERE id = ?',
      [userId]
    ) as any;

    if (rows[0]) {

      updatedResults[index].nickname = rows[0].nickname;
      updatedResults[index].avatar = rows[0].avatar;
    }


    const feedbackWriterId = result.feedbackWriterId;
    const [feedbackWriterRows, feedbackWriterFields] = await connection.query(
      'SELECT nickname, avatar FROM users WHERE id = ?',
      [feedbackWriterId]
    ) as any;

    if (feedbackWriterRows[0]) {

      ///console.log('feedbackWriterRows[0].nickname: ' + feedbackWriterRows[0].nickname);
      //console.log('feedbackWriterRows[0].avatar: ' + feedbackWriterRows[0].avatar);

      updatedResults[index].feedbackWriterNickname = feedbackWriterRows[0].nickname;
      updatedResults[index].feedbackWriterAvatar = feedbackWriterRows[0].avatar;
    }

  }

  connection.release();




  ///return results;


  return updatedResults;

} 





  // get scrap feed count
  export async function getAllByEmailScrapCount(
    email: string,
    q: string,
  ) {
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('feed_scraps');


      const query = q === null ? '' : q;
  
      const results = await collection.countDocuments(
          
          {
            userEmail: email,
          }
  
        );
        

      
  
      return results;
  }


  








  /* getStatisticsMealFoodByEmail result example */
  /*

 [
  {
    date: '2023.12.1',
    breakfast: '된장국, 쌀밥, 오징어볶음',
    lunch: '김밥, 라면',
    dinner: '-',
    snack: '햄버그, 순대국밥, 콜라',
  },
  {
    date: '2023.12.2',
    breakfast: '된장국, 쌀밥, 오징어볶음',
    lunch: '김밥, 라면',
    dinner: '-',
    snack: '햄버그, 순대국밥, 콜라',
  },
 
  {
    date: '2023.12.4',
    breakfast: '된장국, 쌀밥, 오징어볶음',
    lunch: '김밥, 라면',
    dinner: '-',
    snack: '햄버그, 순대국밥, 콜라',
  },
  {
    date: '2023.12.5',
    breakfast: '된장국, 쌀밥, 오징어볶음',
    lunch: '김밥, 라면',
    dinner: '-',
    snack: '햄버그, 순대국밥, 콜라',
  },

  {
    date: '2023.12.7',
    breakfast: '된장국, 쌀밥, 오징어볶음',
    lunch: '김밥, 라면',
    dinner: '-',
    snack: '햄버그, 순대국밥, 콜라',
  },

  {
    date: '2023.12.8',
    breakfast: '된장국, 쌀밥, 오징어볶음',
    lunch: '김밥, 라면',
    dinner: '김밥, 라면',
    snack: '햄버그, 순대국밥, 콜라',
  },

  {
    date: '2023.12.11',
    breakfast: '된장국, 쌀밥, 오징어볶음',
    lunch: '김밥',
    dinner: '김밥, 라면',
    snack: '햄버그, 순대국밥, 콜라',
  },

  {
    date: '2023.12.12',
    breakfast: '된장국, 쌀밥, 오징어볶음',
    lunch: '김밥',
    dinner: '김밥, 라면',
    snack: '햄버그, 순대국밥, 콜라',
  },

  {
    date: '2023.12.13',
    breakfast: '무국, 버터',
    lunch: '마늘, 라면',
    dinner: '자장면, 김밥, 라면',
    snack: '햄버그, 되지국밥, 사이다',
  },


  {
    data: '2023.12.16',
    breakfast: '샌드위치, 쌀밥, 오징어볶음',
    lunch: '수제비, 라면',
    dinner: '카레, 비빔밥, 라면',
    snack: '햄버그, 순대국밥, 콜라',
  },

  {
    date: '2023.12.19',
    breakfast: '된장국, 쌀밥, 오징어볶음',
    lunch: '김밥',
    dinner: '김밥, 라면',
    snack: '햄버그, 순대국밥, 콜라',
  },

];
*/





export async function getStatisticsMealFoodByEmail (
  email: string,
) {

  console.log('====getStatisticsMealFoodByEmail email: ' + email);
  /////////////console.log('====getStatisticsMealFoodByEmail mealDate: ' + queryDate);


  //////const mealDate = new Date(queryDate);

  ////////const nextDay = day(mealDate, 1);






  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  

  if (email === null || email === '' || email === undefined || email === 'undefined') {


    console.log('====getStatisticsMealFoodByEmail email is null');

    const results = await collection.aggregate<FeedProps>([

      {
        $match: {
          mealDate: {
            $exists: true,
            $ne: null,
          },
          mealTime: {
            $exists: true,
            $ne: null,
          },
  
          mealFood: {
            $exists: true,
            $ne: null,
            $type: 'array',
          },

          // feedTtle is not null
          /*
          feedTitle: {
            $exists: true,
            $ne: null,
          },
          */

        }
      },
   
 

      {
        $group: {
          _id: {
            ///mealDate: '$mealDate',
            // day of $mealDate, ex) 2021-09-01
            // can't convert from BSON type string to Date
            ////mealDate: { $dateToString: { format: '%Y-%m-%d', date: '$mealDate' } },
  
            // $mealDate is string type and can't convert to date type and convert to day of $mealDate, ex) 2021-09-01
            // can't convert from BSON type string to Date

            /*
            email: {
              $exists: true,
              $ne: null,
            },
            */
  
            mealDate: {
  
              $dateToString: {
                format: '%Y-%m-%d',
                date: {
                  $dateFromString: {
                    dateString: '$mealDate',
                  }
                }
              }
              
            },
  
            ////////////////////////mealTime: '$mealTime',
          },

          mealTime : {
            $push: '$mealTime',
          },
  
          mealFood: {

            $push: '$mealFood',

          },

          mealFoodTime: {

            $push: {
              'mealFood': '$mealFood',
              'mealTime': '$mealTime',
            },

          },

          mealAmount: {
            $push: '$mealAmount',
          },

          mealSpeed: {
            $push: '$mealSpeed',
          },

          mealTimeData : {
            $push: {
              'mealTime': '$mealTime',
              'mealAmount': '$mealAmount',
              'mealSpeed': '$mealSpeed',
              'mealFood': '$mealFood',
            },
          },
            

        }
      },


      
      {
        $project: {
          _id: 0,
          mealDate: '$_id.mealDate',
          
          mealTime : 1,
          
          mealFood: 1,
  

          feedCount: {
            $sum: 1,
          },

          // $mealAmount is string type and convert to number type
          
          mealAmount : 1,
          mealSpeed : 1,

          mealTimeData : 1,
  
        }
      },
      
  
      {
        $sort: {
          mealDate: 1,
          mealTime: 1,
        }
      },

      /* sum of _id */

  
    ]).toArray();
  
  
    return results;


  } else {


  /* BSONError: Invalid UTF-8 string in BSON document */
  /* https://stackoverflow.com/questions/64869480/bsonerror-invalid-utf-8-string-in-bson-document */

  const results = await collection.aggregate<FeedProps>([
    {
      $match: {

        email: email,


      }

    },

    /* check mealDate is exist and not null */
    {
      $match: {
        mealDate: {
          $exists: true,
          $ne: null,
        },
        mealTime: {
          $exists: true,
          $ne: null,
        },

        mealFood: {
          $exists: true,
          $ne: null,
          $type: 'array',
        },

        // feedTtle is not null
        /*
        feedTitle: {
          $exists: true,
          $ne: null,
        },
        */

      }
    },

    {
      $group: {
        _id: {


          mealDate: {

            $dateToString: {
              format: '%Y-%m-%d',
              date: {
                $dateFromString: {
                  dateString: '$mealDate',
                }
              }
            }
            
          },
          

          //////mealTime: '$mealTime',
        },

        mealTime : {
          $push: '$mealTime',
        },

        mealFood: {
          $push: '$mealFood',
        },


        mealFoodTime: {

          $push: {
            'mealFood': '$mealFood',
            'mealTime': '$mealTime',
            
          },

        },

        mealAmount: {
          $push: '$mealAmount',
        },

        mealSpeed: {
          $push: '$mealSpeed',
        },

        mealTimeData : {
          $push: {
            'mealTime': '$mealTime',
            'mealAmount': '$mealAmount',
            'mealSpeed': '$mealSpeed',
            'mealFood': '$mealFood',
          },
        },

      }
    },

    {
      $project: {
        _id: 0,
        mealDate: '$_id.mealDate',
        
        mealTime : 1,
        
        mealFood: 1,


        feedCount: {
          $sum: 1,
        },

        // $mealAmount is string type and convert to number type
        
        mealAmount : 1,
        mealSpeed : 1,

        mealTimeData : 1,

      }
    },

    {
      $sort: {
        mealDate: 1,
        mealTime: 1,
      }
    },

  ]).toArray();


  return results;

  }

}
  










export async function getStatisticsMealFoodDayByEmail (
  email: string,
  queryDate: string,
) {

  console.log('====getStatisticsMealFoodDayByEmail email: ' + email);

  console.log('====getStatisticsMealFoodDayByEmail queryDate: ' + queryDate);
 

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  

  if (email === null || email === '' || email === undefined || email === 'undefined') {

 
  const results = await collection.aggregate<FeedProps>([

 

    /* check mealDate is exist and not null */
    {
      $match: {

    


        mealDate: {
          $exists: true,
          $ne: null,
        },
        mealTime: {
          $exists: true,
          $ne: null,
        },

        mealFood: {
          $exists: true,
          $ne: null,
          $type: 'array',
        },

        // feedTtle is not null
        /*
        feedTitle: {
          $exists: true,
          $ne: null,
        },
        */

      }
    },

    {
      $group: {
        _id: {

          mealDateDay: {

            $dateToString: {
              format: '%Y-%m-%d',
              date: {
                $dateFromString: {
                  dateString: '$mealDate',
                }
              }
            }
            
          },

        },

        mealTimeData : {
          $push: {
            'mealTime': '$mealTime',
            'mealAmount': '$mealAmount',
            'mealSpeed': '$mealSpeed',
            'mealFood': '$mealFood',
          },
        },

      }
    },

    {
      $project: {
        _id: 0,
        mealDate: '$_id.mealDate',

        mealDateDay: '$_id.mealDateDay',
        mealTime: '$_id.mealTime',

        mealAmount : {
          $sum: '$mealAmount',
        },
        mealSpeed : {
          $sum: '$mealSpeed',
        },

        feedCount: {
          $sum: 1,
        },

        mealTimeData : 1,

      }
    },
    {

      /* match by queryDate */
      /* if queryDate is null or "" or undefined, then return all data */
      $match: {
        mealDateDay: queryDate,
      }

      
    },



  ]).toArray();


  ///return results;

  return results.length > 0 ? results[0] : null; 

} else {

  const results = await collection.aggregate<FeedProps>([

 

    /* check mealDate is exist and not null */
    {
      $match: {

    
        email: email,

        
        mealDate: {
          $exists: true,
          $ne: null,
        },
        mealTime: {
          $exists: true,
          $ne: null,
        },

        mealFood: {
          $exists: true,
          $ne: null,
          $type: 'array',
        },

        // feedTtle is not null
        /*
        feedTitle: {
          $exists: true,
          $ne: null,
        },
        */


      }
    },

    {
      $group: {
        _id: {

          mealDateDay: {

            $dateToString: {
              format: '%Y-%m-%d',
              date: {
                $dateFromString: {
                  dateString: '$mealDate',
                }
              }
            }
            
          },

        },

        mealTimeData : {
          $push: {
            'mealTime': '$mealTime',
            'mealAmount': '$mealAmount',
            'mealSpeed': '$mealSpeed',
            'mealFood': '$mealFood',
          },
        },

      }
    },

    {
      $project: {
        _id: 0,
        mealDate: '$_id.mealDate',

        mealDateDay: '$_id.mealDateDay',
        mealTime: '$_id.mealTime',

        mealAmount : {
          $sum: '$mealAmount',
        },
        mealSpeed : {
          $sum: '$mealSpeed',
        },

        feedCount: {
          $sum: 1,
        },

        mealTimeData : 1,

      }
    },
    {

      /* match by mealDate */

      $match: {
        mealDateDay: queryDate,
      }
      
    },



  ]).toArray();


  ///return results;

  return results.length > 0 ? results[0] : null; 





  }

}













export async function getStatisticsMealFoodWeekByEmail (
  email: string,
  mealDateStart: string,
  mealDateEnd: string,
) {

  //console.log('====getStatisticsMealFoodWeekByEmail email: ' + email);

  //console.log('====getStatisticsMealFoodWeekByEmail mealDateStart: ' + mealDateStart);

  //console.log('====getStatisticsMealFoodWeekByEmail mealDateEnd: ' + mealDateEnd);



  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  

 
  const results = await collection.aggregate<FeedProps>([

 
    /* match by email */

    {
      $match: {

        email: email,

      }
    },


    /* check mealDate is exist and not null */
    {
      $match: {

        mealDate: {
          $exists: true,
          $ne: null,
        },
        mealTime: {
          $exists: true,
          $ne: null,
        },

        mealFood: {
          $exists: true,
          $ne: null,
          $type: 'array',
        },

        // feedTtle is not null
        feedTitle: {
          $exists: true,
          $ne: null,
        },

      }
    },

    // match mealDate from mealDateStart to mealDateEnd
    {
      $match: {
        mealDate: {
          $gte: mealDateStart,
          $lte: mealDateEnd,
        }
      }

    },

            

    {
      $group: {

        _id: {

          mealDateWeek: {
              
              $dateToString: {
                format: '%Y-%m-%d',
                date: {
                  $dateFromString: {
                    dateString: '$mealDate',
                  }
                }
              }
              
            },

        },




        

        mealTimeData : {
          $push: {
            'mealTime': '$mealTime',
            'mealAmount': '$mealAmount',
            'mealSpeed': '$mealSpeed',
            'mealFood': '$mealFood',
          },
        },

      }
    },

    {
      /* project by mealDateWeek */

      $project: {
        _id: 0,
        mealDate: '$_id.mealDateWeek',

        mealAmount : {
          $sum: '$mealAmount',
        },
        mealSpeed : {
          $sum: '$mealSpeed',
        },

        feedCount: {
          $sum: 1,
        },

        mealTimeData : 1,

      }

    },




  ]).toArray();


  ///return results;

  return results.length > 0 ? results[0] : null; 

}











export async function getStatisticsMealFoodMonthByEmail (
  email: string,
  queryDate: string,
) {

  console.log('====getStatisticsMealFoodMonthByEmail email: ' + email);

  console.log('====getStatisticsMealFoodMonthByEmail queryDate: ' + queryDate);
 

  // queryDate is string type and '2021-09', 
  /// match by mealDate which is string type and '2021-09-01' ~ '2021-09-30'


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  

  if (email === null || email === '' || email === undefined || email === 'undefined') {

 
  const results = await collection.aggregate<FeedProps>([

 

    /* check mealDate is exist and not null */
    {
      $match: {

        mealDate: {
          $exists: true,
          $ne: null,
        },
        mealTime: {
          $exists: true,
          $ne: null,
        },

        mealFood: {
          $exists: true,
          $ne: null,
          $type: 'array',
        },

        // feedTtle is not null
        feedTitle: {
          $exists: true,
          $ne: null,
        },

      }
    },

    {
      $group: {

        _id: {

          /*
          mealDateDay: {

            $dateToString: {
              format: '%Y-%m-%d',
              date: {
                $dateFromString: {
                  dateString: '$mealDate',
                }
              }
            }
            
          },
          */

          mealDateMonth: {
              
              $dateToString: {
                format: '%Y-%m',
                date: {
                  $dateFromString: {
                    dateString: '$mealDate',
                  }
                }
              }
              
            },

        },

        mealTimeData : {
          $push: {
            'mealTime': '$mealTime',
            'mealAmount': '$mealAmount',
            'mealSpeed': '$mealSpeed',
            'mealFood': '$mealFood',
          },
        },

      }
    },

    {
      /* project by mealDateMonth */

      $project: {
        _id: 0,
        mealDate: '$_id.mealDate',

        mealDateMonth: '$_id.mealDateMonth',
        mealTime: '$_id.mealTime',

        mealAmount : {
          $sum: '$mealAmount',
        },
        mealSpeed : {
          $sum: '$mealSpeed',
        },

        feedCount: {
          $sum: 1,
        },

        mealTimeData : 1,

      }


      /*
      $project: {
        _id: 0,
        mealDate: '$_id.mealDate',

        mealDateDay: '$_id.mealDateDay',
        mealTime: '$_id.mealTime',

        mealAmount : {
          $sum: '$mealAmount',
        },
        mealSpeed : {
          $sum: '$mealSpeed',
        },

        feedCount: {
          $sum: 1,
        },

        mealTimeData : 1,

      }
      */
    },
    {

      /* match by queryDate */
      /* if queryDate is null or "" or undefined, then return all data */
      /*
      $match: {
        mealDateDay: queryDate,
      }
      */

      /* match by mealDateMonth */
      $match: {
        mealDateMonth: queryDate,
      },

      
    },



  ]).toArray();


  ///return results;

  return results.length > 0 ? results[0] : null; 


} else {


  const results = await collection.aggregate<FeedProps>([

 

    /* check mealDate is exist and not null */
    {
      $match: {

    
        email: email,

        
        mealDate: {
          $exists: true,
          $ne: null,
        },
        mealTime: {
          $exists: true,
          $ne: null,
        },

        mealFood: {
          $exists: true,
          $ne: null,
          $type: 'array',
        },

        // feedTtle is not null
        feedTitle: {
          $exists: true,
          $ne: null,
        },

      }
    },

    {
      $group: {
        _id: {

          /*
          mealDateDay: {

            $dateToString: {
              format: '%Y-%m-%d',
              date: {
                $dateFromString: {
                  dateString: '$mealDate',
                }
              }
            }
            
          },
          */

          mealDateMonth: {
              
              $dateToString: {
                format: '%Y-%m',
                date: {
                  $dateFromString: {
                    dateString: '$mealDate',
                  }
                }
              }
              
            },

        },

        mealTimeData : {
          $push: {
            'mealTime': '$mealTime',
            'mealAmount': '$mealAmount',
            'mealSpeed': '$mealSpeed',
            'mealFood': '$mealFood',
          },
        },

      }
    },

    {

      /*
      $project: {
        _id: 0,
        mealDate: '$_id.mealDate',

        mealDateDay: '$_id.mealDateDay',
        mealTime: '$_id.mealTime',

        mealAmount : {
          $sum: '$mealAmount',
        },
        mealSpeed : {
          $sum: '$mealSpeed',
        },

        feedCount: {
          $sum: 1,
        },

        mealTimeData : 1,

      }
      */

      /* project by mealDateMonth */

      $project: {
        _id: 0,
        mealDate: '$_id.mealDate',

        mealDateMonth: '$_id.mealDateMonth',
        mealTime: '$_id.mealTime',

        mealAmount : {
          $sum: '$mealAmount',
        },
        mealSpeed : {
          $sum: '$mealSpeed',
        },

        feedCount: {
          $sum: 1,
        },

        mealTimeData : 1,

      }



    },
    {

      /* match by mealDate */

      /*
      $match: {
        mealDateDay: queryDate,
      }
      */

      /* match by mealDateMonth */
      $match: {
        mealDateMonth: queryDate,
      },
      
    },



  ]).toArray();


  ///return results;

  return results.length > 0 ? results[0] : null; 





  }

}




// get least recently mealDate by email

export async function getLeastRecentlyMealDateByEmail (
  email: string,
) {

  console.log('====getLeastRecentlyMealDateByEmail email: ' + email);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  const results = await collection.aggregate<FeedProps>([

    {
      $match: {
        email: email,
      }
    },
    {
      $sort: {
        mealDate: 1,
      }
    },
    {
      $limit: 1,
    },

  ]).toArray();

  return results.length > 0 ? results[0].mealDate : null; 

}



export async function getStatisticsMealFoodTotalByEmail (
  email: string,
) {

  console.log('====getStatisticsMealFoodDayByEmail email: ' + email);

 

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  

  if (email === null || email === '' || email === undefined || email === 'undefined') {

 
  const results = await collection.aggregate<FeedProps>([

 

    /* check mealDate is exist and not null */
    {
      $match: {


        mealDate: {
          $exists: true,
          $ne: null,
        },
        mealTime: {
          $exists: true,
          $ne: null,
        },

        mealFood: {
          $exists: true,
          $ne: null,
          $type: 'array',
        },

        // feedTtle is not null
        feedTitle: {
          $exists: true,
          $ne: null,
        },

      }
    },

    // mealFood is array of food
    // food is object of food
    // food.foodName is string
    // group by food.foodName

    // mealFood = [ { foodName: '사과', foodAmount: 100, foodSpeed: 100 }, { foodName: '배', foodAmount: 100, foodSpeed: 100 } ]



    {
      $group: {
        _id: {

          foodName: '$mealTimeData.foodName',


        },

        

        mealTimeData : {
          $push: {
            'mealTime': '$mealTime',
            'mealAmount': '$mealAmount',
            'mealSpeed': '$mealSpeed',
            'mealFood': '$mealFood',
            'foodName': '$mealFood.foodName',
          },
        },

      }
    },

    {
      $project: {
        _id: 0,
        //foodName: '$_id.foodName',

        //mealDate: '$_id.mealDate',


        //mealTime: '$_id.mealTime',

        mealAmount : {
          $sum: '$mealAmount',
        },
        mealSpeed : {
          $sum: '$mealSpeed',
        },

        feedCount: {
          $sum: 1,
        },

        mealTimeData : 1,

      }
    },

  ]).toArray();


  ///return results;

  return results.length > 0 ? results[0] : null; 

} else {



  const results = await collection.aggregate<FeedProps>([

 

    /* check mealDate is exist and not null */
    {
      $match: {

    
        email: email,

        
        mealDate: {
          $exists: true,
          $ne: null,
        },
        mealTime: {
          $exists: true,
          $ne: null,
        },

        mealFood: {
          $exists: true,
          $ne: null,
          $type: 'array',
        },

        // feedTtle is not null
        feedTitle: {
          $exists: true,
          $ne: null,
        },

      }
    },

    {
      $group: {
        _id: {

        },

        mealTimeData : {
          $push: {
            'mealTime': '$mealTime',
            'mealAmount': '$mealAmount',
            'mealSpeed': '$mealSpeed',
            'mealFood': '$mealFood',
          },
        },

      }
    },

    {
      $project: {
        _id: 0,
        mealDate: '$_id.mealDate',

        mealTime: '$_id.mealTime',

        mealAmount : {
          $sum: '$mealAmount',
        },
        mealSpeed : {
          $sum: '$mealSpeed',
        },

        feedCount: {
          $sum: 1,
        },

        mealTimeData : 1,

      }
    },


  ]).toArray();


  ///return results;

  return results.length > 0 ? results[0] : null; 


  }

}
  


// feed feedback statistics
// count of each feedback score

export async function getFeedbackStatisticsByEmail (
  email: string,
) {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  const results = await collection.aggregate<FeedProps>([

    {
      $match: {
        email: email,
      }
    },
      
      {
        $group: {
          _id: {
            
            //feedbackScore: '$feedbackScore',

            // check feedbackScore is not null and not ''

            feedbackScore: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ['$feedbackScore', null] },
                    { $ne: ['$feedbackScore', ''] },
                  ]
                },
                then: '$feedbackScore',
                else: '0',
              }
            },

          },
  
          feedbackScoreCount: {
            $sum: 1,
          },
        }
      },
  
      {
        $project: {
          _id: 0,
          feedbackScore: '$_id.feedbackScore',
          feedbackScoreCount: 1,
        }
      },

  
  
      {
        $sort: {
          feedbackScore: 1,
        }
      },

  ]).toArray();

  return results;

}




// feed feedback statistics
// count of each feedback score

export async function getFeedbackStatisticsWeekByEmail (
  email: string,
  mealDateStart: string,
  mealDateEnd: string,
) {


  console.log('====getFeedbackStatisticsWeekByEmail email: ' + email);

  console.log('====getFeedbackStatisticsWeekByEmail mealDateStart: ' + mealDateStart);

  console.log('====getFeedbackStatisticsWeekByEmail mealDateEnd: ' + mealDateEnd);



  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');

  const results = await collection.aggregate<FeedProps>([

    
    {
      $match: {
        email: email,
      }
    },

   {
    $match: {
      mealDate: {
        
        $gte: mealDateStart,

        $lte: mealDateEnd,

      }
    }
   },


      
      {
        $group: {
          _id: {
            
            //feedbackScore: '$feedbackScore',

            // check feedbackScore is not null and not ''

            feedbackScore: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ['$feedbackScore', null] },
                    { $ne: ['$feedbackScore', ''] },
                  ]
                },
                then: '$feedbackScore',
                else: '0',
              }
            },

          },
  
          feedbackScoreCount: {
            $sum: 1,
          },
        }
      },
  
      {
        $project: {
          _id: 0,
          feedbackScore: '$_id.feedbackScore',
          feedbackScoreCount: 1,
        }
      },

  
  
      {
        $sort: {
          feedbackScore: 1,
        }
      },

  ]).toArray();

  return results;

}







// get feeds having feedback

export async function getAllForHome (
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,

///): Promise<ResultProps[]> {

): Promise<FeedProps[]> {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');


  console.log('getAllForHome limit: ' + limit);
  console.log('getAllForHome page: ' + page);
  console.log('getAllForHome sort: ' + sort);
  console.log('getAllForHome order: ' + order);
  console.log('getAllForHome q: ' + q);

  const query = q === null ? '' : q;


  
  // lookup like and scrap
  // count of like and scrap

  const results =  await collection
    .aggregate<FeedProps>([

      // sort by sort and order params
      {
        $sort: {
          [
            sort === null ? 'createdAt' : sort
          ]: parseInt(
            order === null ? '-1' : order
          )
        }
      },
      // search by query param
      {
        $match: {
          $or: [
            { feedTitle: { $regex: query, $options: 'i' } },
            { feedContent: { $regex: query, $options: 'i' } },
            { nickname: { $regex: query, $options: 'i' } },
          ],
          
          //hiddenYn: {
          //  $exists: true,
          //  $ne: 'Y'
          //}

        }
      },

      // hiddenYn is exist and not 'Y'

      {
        $match: {
          hiddenYn: {
            $exists: true,
            $ne: 'Y'
          }
        }
      },

      
      {
        $match: {
          feedTitle: {
            $exists: true,
            ////$ne: ''
          }
        }
      },
      // feedbackWriterId is exist  and not ''

      
      {
        $match: {
          feedbackWriterId: {
            $exists: true,
            $ne: ''
          }
        }
      },


      {
        $limit: limit,
        //////$skip: (page - 1) * limit, // skip the first n documents

      },
     
      
    ])
    .toArray();



    
    const connection = await connect();

    // copy results to updatedResults
    let updatedResults = [
      ...results,
    ];

    for (let index = 0; index < results.length; index++) {

      const result = results[index];

      const userId = result.userId;
      
      const [rows, fields] = await connection.query(
        'SELECT nickname, avatar FROM users WHERE id = ?',
        [userId]
      ) as any;
  
      if (rows[0]) {

        updatedResults[index].nickname = rows[0].nickname;
        updatedResults[index].avatar = rows[0].avatar;
      }


      const feedbackWriterId = result.feedbackWriterId;
      const [feedbackWriterRows, feedbackWriterFields] = await connection.query(
        'SELECT nickname, avatar FROM users WHERE id = ?',
        [feedbackWriterId]
      ) as any;

      if (feedbackWriterRows[0]) {

        ///console.log('feedbackWriterRows[0].nickname: ' + feedbackWriterRows[0].nickname);
        //console.log('feedbackWriterRows[0].avatar: ' + feedbackWriterRows[0].avatar);

        updatedResults[index].feedbackWriterNickname = feedbackWriterRows[0].nickname;
        updatedResults[index].feedbackWriterAvatar = feedbackWriterRows[0].avatar;
      }

    }

    connection.release();


    return updatedResults;


}








export async function getAllForDownload({

  sort,
  order,
  q,
  startDate,
  endDate,
  feedbackArray,

}: {


  sort: string,
  order: string,
  q: string,
  startDate: string,
  endDate: string,
  feedbackArray: string[],


}): Promise<FeedProps[]> {


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');



  const query = q === null ? '' : q;


  
  // lookup like and scrap
  // count of like and scrap

  return await collection
    .aggregate<FeedProps>([


      // search by query param
      {
        $match: {
          $or: [
            { feedTitle: { $regex: q, $options: 'i' } },
            { feedContent: { $regex: q, $options: 'i' } },
            { nickname: { $regex: q, $options: 'i' } },
            { feedbackWriterNickname: { $regex: q, $options: 'i' } },
  
          ],
        },
      },

      // feedTitle is exist  and not ''
      
      {
        $match: {
          feedTitle: {
            $exists: true,
            ////$ne: ''
          }
        }
      },

      // check mealFood is array and not null
      // check mealFood is array
      {
        $match: {
          mealFood: {
            $exists: true,
            $ne: null,
            $type: 'array',
          }
        }
      },



      /* feedbacArray is array type */
      /* 미답변, 답변왈료 */
      /* if feedbackArray has '미답변', then match feedbackYn is 'N' */
      /* if feedbackArray has '답변완료', then match feedbackYn is 'Y' */
      /* if feedbackArray has '미답변' and '답변완료', then match feedbackYn is 'N' or 'Y' */
      (feedbackArray.find((feedback) => feedback === '미답변') && feedbackArray.find((feedback) => feedback === '답변완료')) ?
      {
        $match: {
          // 'Y' or 'N'
          feedbackYn: {
            $in: ['Y', 'N'],
          },
        },
      }
      :
      (feedbackArray.find((feedback) => feedback === '미답변')) ?
      {
        $match: {
          feedbackYn: 'N',
        },
      }
      :
      (feedbackArray.find((feedback) => feedback === '답변완료')) ?
      {
        $match: {
          feedbackYn: 'Y',
        },
      } : {
        // no match
        $match: {
          feedbackYn: '',
        },
      },


      {
        $lookup:
        {

          from: 'foods',
          // local field is foodCode of eache item of mealFood array
          // mealFood is array type
          // if mealFood is not array type, return empty array
          // each item of mealFood array is object type
          // each item of mealFood array has foodCode field

          // local field is foodCode of eache item of mealFood array

          // if mealFood is not array type, return empty array
          // $lookup argument 'localField' must be a string

         localField: 'mealFood.foodCode',
          foreignField: 'foodCode',
          as: 'foods',
          

        }
      },



      // mealFood is array of food
      // sum of mealFood.kcal, mealFood.carbohydrate, mealFood.protein, mealFood.fat, mealFood.sugar

      {
        $project: {
          _id: 0,
          id: 1,
          createdAt: 1,
          sequenceNumber: 1,
          feedContent: 1,
          nickname: 1,

          scrapCount: 1,
          likeCount: 1,
          viewCount: 1,


          feedbackYn: 1,
          feedbackCreatedAt: 1,
          feedbackScore: 1,
          feedbackContent: 1,

          feedbackWriterNickname: 1,


          mealFood: 1,

          mealDate: 1,
          mealTime: 1,
          mealAmount: 1,
          mealSpeed: 1,

          /////foodDatabase: 1,



          // kcal, carbohydrate, protein, fat, salt, saturatedfat, cholesterol, sugar is sum of each data from foods array
          // foods is array of food
          // if kcal is null or '' or '-' or undefined, then convert to 0
          // kcal is string type and convert to number type

          kcal: {
            $sum: {
              $map: {
                input: '$foods',
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $ne: ['$$item.kcal', null] },
                        { $ne: ['$$item.kcal', ''] },
                        { $ne: ['$$item.kcal', '-'] },
                        { $ne: ['$$item.kcal', undefined] },
                      ]
                    },
                    then: {
                      $toDouble: '$$item.kcal',
                    },
                    else: 0,
                  },
                }
              }
            }
          },


          carbohydrate: {
            $sum: {
              $map: {
                input: '$foods',
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $ne: ['$$item.carbohydrate', null] },
                        { $ne: ['$$item.carbohydrate', ''] },
                        { $ne: ['$$item.carbohydrate', '-'] },
                        { $ne: ['$$item.carbohydrate', undefined] },
                      ]
                    },
                    then: {
                      $toDouble: '$$item.carbohydrate',
                    },
                    else: 0,
                  },
                }
              }
            }
          },


          protein: {
            $sum: {
              $map: {
                input: '$foods',
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $ne: ['$$item.protein', null] },
                        { $ne: ['$$item.protein', ''] },
                        { $ne: ['$$item.protein', '-'] },
                        { $ne: ['$$item.protein', undefined] },
                      ]
                    },
                    then: {
                      $toDouble: '$$item.protein',
                    },
                    else: 0,
                  },
                }
              }
            }
          },


          fat: {
            $sum: {
              $map: {
                input: '$foods',
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $ne: ['$$item.fat', null] },
                        { $ne: ['$$item.fat', ''] },
                        { $ne: ['$$item.fat', '-'] },
                        { $ne: ['$$item.fat', undefined] },
                      ]
                    },
                    then: {
                      $toDouble: '$$item.fat',
                    },
                    else: 0,
                  },
                }
              }
            }
          },


          salt: {
            $sum: {
              $map: {
                input: '$foods',
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $ne: ['$$item.salt', null] },
                        { $ne: ['$$item.salt', ''] },
                        { $ne: ['$$item.salt', '-'] },
                        { $ne: ['$$item.salt', undefined] },
                      ]
                    },
                    then: {
                      $toDouble: '$$item.salt',
                    },
                    else: 0,
                  },
                }
              }
            }
          },



          saturatedfat: {
            $sum: {
              $map: {
                input: '$foods',
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $ne: ['$$item.saturatedfat', null] },
                        { $ne: ['$$item.saturatedfat', ''] },
                        { $ne: ['$$item.saturatedfat', '-'] },
                        { $ne: ['$$item.saturatedfat', undefined] },
                      ]
                    },
                    then: {
                      $toDouble: '$$item.saturatedfat',
                    },
                    else: 0,
                  },
                }
              }
            }
          },


          cholesterol: {
            $sum: {
              $map: {
                input: '$foods',
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $ne: ['$$item.cholesterol', null] },
                        { $ne: ['$$item.cholesterol', ''] },
                        { $ne: ['$$item.cholesterol', '-'] },
                        { $ne: ['$$item.cholesterol', undefined] },
                      ]
                    },
                    then: {
                      $toDouble: '$$item.cholesterol',
                    },
                    else: 0,
                  },
                }
              }
            }
          },


          sugar: {
            $sum: {
              $map: {
                input: '$foods',
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $ne: ['$$item.sugar', null] },
                        { $ne: ['$$item.sugar', ''] },
                        { $ne: ['$$item.sugar', '-'] },
                        { $ne: ['$$item.sugar', undefined] },
                      ]
                    },
                    then: {
                      $toDouble: '$$item.sugar',
                    },
                    else: 0,
                  },
                }
              }
            }
          },


        }
      },


      /* sort by sort and order params  */
      /* and _id desc */


      {
        $sort: {
            [sort]: order === 'asc' ? 1 : -1,
            
        },

        // sort by _id desc


      },

      
    ])
    .toArray();

}




/* delete one */
export async function deleteOne(
  id: string,
): Promise<any> {


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');





  const result =  await collection.deleteOne({
      id: id,
  });


  
  // delete all feed_scraps having feedId
  // delete all feed_likes having feedId

  const collectionFeedScrap = client.db('doingdoit').collection('feed_scraps');

  
  await collectionFeedScrap.deleteMany({
    feedId: id,
  });
  

  const collectionFeedLike = client.db('doingdoit').collection('feed_likes');

  await collectionFeedLike.deleteMany({
    feedId: id,
  });





  // update sequenceNumber
  /*
  const feeds = await collection.aggregate(
    [
      {
        $match: {
          feedTitle: {
            $exists: true,
            $ne: ''
          }
        },
      },
      {
        $match: {
          // 'Y' or 'N'
          feedbackYn: {
            $in: ['Y', 'N'],
          },
        },
      },
      {
        $sort: {
          mealDate: 1,
        }
      },
    ]
  ).toArray();


  console.log('feeds.length: ' + feeds.length);


  for (let i = 0; i < feeds.length; i++) {

    const feed = feeds[i];

    await collection.updateOne(
      {
        id: feed.id,
      },
      {
        $set: {
          sequenceNumber: i + 1,
        }
      }
    );

  }
  */


 

  return result;


}




export async function getStatisticsSummary(
  {
    startDate,
    endDate,
  }: {
    startDate: string,
    endDate: string,
  }
): Promise<any> {

  if (!startDate) startDate = '2021-01-01';
  if (!endDate) endDate = '2030-12-31';

  const client = await clientPromise;

  const collection = client.db('doingdoit').collection('feeds');

  // get total feeds count
  // get today feeds count
  // get total feedback count when feedbackYn = 'Y'
  // get today feedback count when feedbackYn = 'Y'

  // match feedTitle exist and not null

  // results
  /*
      todayFeedCount,
      todayFeedbackCount,
      totalFeedCount,
      totalFeedbackCount,
  */

  const resultsTodayFeed = await collection.aggregate<any>([
    {
      $match: {
        feedTitle: {
          $exists: true,
          $ne: null,
        },
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999)),
        }
      }
    },
    {
      $group: {
        _id: null,
        todayFeedCount: {
          $sum: 1,
        }
      }
    }
  ]).toArray();

  const todayFeedCount = resultsTodayFeed.length > 0 ? resultsTodayFeed[0].todayFeedCount : 0;





  

  const resultsTodayFeedback = await collection.aggregate<any>([
    {
      $match: {
        feedbackYn: 'Y',
        feedbackCreatedAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999)),
        }
      }
    },
    {
      $group: {
        _id: null,
        todayFeedbackCount: {
          $sum: 1,
        }
      }
    }
  ]).toArray();

  const todayFeedbackCount = resultsTodayFeedback.length > 0 ? resultsTodayFeedback[0].todayFeedbackCount : 0;





  const resultsTotalFeed = await collection.aggregate<any>([
    {
      $match: {
        feedTitle: {
          $exists: true,
          $ne: null,
        },
      }
    },
    {
      $match: {
        // 'Y' or 'N'
        feedbackYn: {
          $exists: true,
          $in: ['Y', 'N'],
        },
      },
    },


    {
      $group: {
        _id: null,
        totalFeedCount: {
          $sum: 1,
        }
      }
    }
  ]).toArray();

  const totalFeedCount = resultsTotalFeed.length > 0 ? resultsTotalFeed[0].totalFeedCount : 0;



  const resultsTotalFeedback = await collection.aggregate<any>([
    {
      $match: {
        feedbackYn: 'Y',
      }
    },
    {
      $group: {
        _id: null,
        totalFeedbackCount: {
          $sum: 1,
        }
      }
    }
  ]).toArray();

  const totalFeedbackCount = resultsTotalFeedback.length > 0 ? resultsTotalFeedback[0].totalFeedbackCount : 0;


  return {
    todayFeedCount,
    todayFeedbackCount,
    totalFeedCount,
    totalFeedbackCount,
  };



}






export async function getStats( {
  mealDate,
}: {
  mealDate: string,
}): Promise<any> {



  console.log('getStats mealDate: ' + mealDate);







  const connection = await connect();

  try {

    const query = `
    SELECT * FROM users
    WHERE
    nickname IS NOT NULL

    AND access->'$.access_feed' = true

    ORDER BY createdAt DESC
    `;

    const values = [] as any;

 
    const [rows, fields] = await connection.query(query, values) as any

    connection.release();

    /*

    if (rows) {
        return rows
    } else {
        return [];
    }
    */

 
    //const columnNames = rows.map((row: any) => row.nickname) as string[];

    // feedbackWriters is array of id and nickname

    const feedbackWriters = rows as any;


    // columnNames is array of nickname


    /*
    const results = [

      {"mealDate":"2024-02-12", "영양사1": 3, "영양사2": 0, "영양사3": 2, "영양사4": 1, "영양사5": 0},
      {"mealDate":"2024-02-13", "영양사1": 0, "영양사2": 0, "영양사3": 0, "영양사4": 0, "영양사5": 0},
      {"mealDate":"2024-02-14", "영양사1": 0, "영양사2": 0, "영양사3": 0, "영양사4": 0, "영양사5": 0},
  
    ];
    */

    ///const results = [] as any;

    /*
    for (let i = 0; i < 10; i++) {

      const result = {} as any;

      
      //result.mealDate = '2024-02-12';
      // mealData is mealDate
      // mealData is '2024-02-12', '2024-02-13', '2024-02-14', '2024-02-15', '2024-02-16'

      result.mealDate = mealDate;



      for (let j = 0; j < columnNames.length; j++) {

        result[columnNames[j]] = Math.floor(Math.random() * 10);

      }

      results.push(result);

    }
    */


    /*
        const results = [

      {"mealDate":"2024-02-12", "영양사1": 3, "영양사2": 0, "영양사3": 2, "영양사4": 1, "영양사5": 0},
      {"mealDate":"2024-02-13", "영양사1": 0, "영양사2": 0, "영양사3": 0, "영양사4": 0, "영양사5": 0},
      {"mealDate":"2024-02-14", "영양사1": 0, "영양사2": 0, "영양사3": 0, "영양사4": 0, "영양사5": 0},
  
    ];
    */

    // query by mealDate from feeds table and group by feedbackWriterNickname
    // feddbackYn is 'Y'


      /*
    MongoServerError: The field 'mealDate' must be an accumulator object
    */

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');

    const results = await collection.aggregate<any>([
      {
        $match: {
          mealDate: mealDate,
          feedbackYn: 'Y',
        }
      },
      {
        $group: {

          //_id: '$feedbackWriterNickname',
          _id: '$feedbackWriterId',

          feedbackCount: {
            $sum: 1,
          }
        }
      },
      {
        $sort: {
          feedbackCount: -1,
        }
      }
    ]).toArray();
      


    



    
    results.forEach((result: any) => {
        
      const feedbackWriterId = result._id;

      const feedbackWriter = feedbackWriters.find((feedbackWriter: any) => feedbackWriter.id === parseInt(feedbackWriterId));

      if (feedbackWriter) {
        result.feedbackWriterNickname = feedbackWriter.nickname;
      }

    } );

      


    console.log('results: ' + JSON.stringify(results, null, 2));


    connection.release();
  
  
    return results;


  } catch (error) {

    connection.release();

    console.error('getStats error: ', error);
    return [];

  }


    /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('feeds');


  // group by feedbackWriterNickname
  // match feedbackYn is 'Y'
  // match mealDate is mealDate

  const results = await collection.aggregate<any>([

    {
      $match: {
        feedbackYn: 'Y',
        mealDate: mealDate,
      }
    },
    {
      $group: {
        _id: '$feedbackWriterNickname',
        feedbackCount: {
          $sum: 1,
        }
      }
    },
    {
      $sort: {
        feedbackCount: -1,
      }
    }
  ]).toArray();

  return results;
  */

}

 














export async function getStatsAll({

  limit,
  page,
  sort,
  order,
  q,
  startMealDate,
  endMealDate,
}: {
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
  startMealDate: string,
  endMealDate: string,
}): Promise<any> {


  console.log("getStatsAll limit", limit);
  console.log("getStatsAll page", page);



  const connection = await connect();

  try {



    const query = `
    SELECT id, nickname FROM users
    WHERE
    nickname IS NOT NULL

    AND access->'$.access_feed' = true

    ORDER BY createdAt DESC
    `;

    const values = [] as any;

 
    const [rows, fields] = await connection.query(query, values) as any



    console.log('rows: ' + JSON.stringify(rows, null, 2));



    connection.release();




    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');



    let returnResults = [] as any;


    let totalCount = 0;

    // startMealDate to endMealDate count

  
    //endMealDate - startMealDate + 1;

    //totalCount = endMealDate - startMealDate + 1;

    totalCount = Math.floor((new Date(endMealDate).getTime() - new Date(startMealDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;

    ///console.log('totalCount: ' + totalCount);










    /*
        const results = [

      {"mealDate":"2024-02-12", "영양사1": 3, "영양사2": 0, "영양사3": 2, "영양사4": 1, "영양사5": 0},
      {"mealDate":"2024-02-13", "영양사1": 0, "영양사2": 0, "영양사3": 0, "영양사4": 0, "영양사5": 0},
      {"mealDate":"2024-02-14", "영양사1": 0, "영양사2": 0, "영양사3": 0, "영양사4": 0, "영양사5": 0},
  
    ];
    */
   // group by mealDate and feedbackWriterNickname

   // if feedback of mealDate is not exist, add dummy record having mealDate and  feebackCount = 0


   // loop startMealDate to endMealDate

    // if feedback of mealDate is not exist, add dummy record having mealDate and  feebackCount = 0

    let mealDateArray = [] as any;



    

    let currentDate = new Date(endMealDate);
    let i = 0;
    while (currentDate >= new Date(startMealDate)) {

      if (i >= (page - 1) * limit && i < page * limit) {

        mealDateArray.push(currentDate.toISOString().slice(0, 10));

      } else if (i >= page * limit) {
        break;
      }

      currentDate.setDate(currentDate.getDate() - 1);

      i++;

    }




    // check flag for all async function to be finished

    let flag = 0;

    mealDateArray.forEach( async (mealDate: string) => {

    

      const results = await collection.aggregate<any>([
        {
          $match: {
            mealDate: mealDate,
            feedbackYn: 'Y',
          }
        },
        {
          $group: {
            _id: '$feedbackWriterId',
            feedbackCount: {
              $sum: 1,
            }
          }
        },
        {
          $sort: {
            feedbackCount: -1,
          }
        }
      ]).toArray();



      results.forEach((result: any) => {

      
        const feedbackWriterId = result._id;

        const feedbackWriter = rows.find((feedbackWriter: any) => feedbackWriter.id === parseInt(feedbackWriterId));


        ///console.log('feedbackWriter: ' + JSON.stringify(feedbackWriter, null, 2));



        if (feedbackWriter) {
          result.feedbackWriterNickname = feedbackWriter.nickname;
        }

      } );



      mealDateArray.forEach(

        (mealDateItem: string) => {

          if (mealDateItem === mealDate) {

            results.forEach((result: any) => {

              const feedbackWriterNickname = result.feedbackWriterNickname;

              const feedbackCount = result.feedbackCount;

              //       {"mealDate":"2024-02-12", "영양사1": 3, "영양사2": 0, "영양사3": 2, "영양사4": 1, "영양사5": 0},

              const returnResult = returnResults.find((returnResult: any) => returnResult.mealDate === mealDateItem);

              if (returnResult) {

                returnResult[feedbackWriterNickname] = feedbackCount;

              } else {

                returnResults.push({
                  mealDate: mealDateItem,
                  [feedbackWriterNickname]: feedbackCount,
                });

              }

            });

          } else {

            const returnResult = returnResults.find((returnResult: any) => returnResult.mealDate === mealDateItem);

            if (!returnResult) {

              returnResults.push({
                mealDate: mealDateItem,
              });

            } else {

              // do nothing

            }

          }

        }
      );


      returnResults.sort((a: any, b: any) => {
        return a.mealDate < b.mealDate ? 1 : -1;
      } );


      flag++;

    } );


    while (flag < mealDateArray.length) {

      await new Promise(resolve => setTimeout(resolve, 1000));

      // too long time, then exit this function

      if ( flag > mealDateArray.length * 10) {
        break;
      }

    }
    

    // add sequenceNumber  to returnResults 
    // reverse sequenceNumber
    //const sequenceNumber = (page - 1) * limit + 1;

    const sequenceNumber = totalCount - (page - 1) * limit;


    returnResults.forEach((returnResult: any, index: number) => {
      returnResult.sequenceNumber = sequenceNumber - index;
    });




    return {
      "data" : returnResults,
      "totalCount" : totalCount,
    };



  } catch (error) {

    connection.release();
    console.error(' error: ', error);
    return {
      "data" : [],
      "totalCount" : 0,
    };

  }



}








export async function getStatsAllDownload({

  limit,
  page,
  sort,
  order,
  q,
  startMealDate,
  endMealDate,
}: {
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
  startMealDate: string,
  endMealDate: string,
}): Promise<any> {


 


  const connection = await connect();

  try {



    const query = `
    SELECT * FROM users
    WHERE
    nickname IS NOT NULL

    AND access->'$.access_feed' = true

    ORDER BY createdAt DESC
    `;

    const values = [] as any;

 
    const [rows, fields] = await connection.query(query, values) as any

    connection.release();




    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');



    let returnResults = [] as any;


    let totalCount = 0;

    // startMealDate to endMealDate count

  
    //endMealDate - startMealDate + 1;

    //totalCount = endMealDate - startMealDate + 1;

    totalCount = Math.floor((new Date(endMealDate).getTime() - new Date(startMealDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;

    console.log('totalCount: ' + totalCount);










    /*
        const results = [

      {"mealDate":"2024-02-12", "영양사1": 3, "영양사2": 0, "영양사3": 2, "영양사4": 1, "영양사5": 0},
      {"mealDate":"2024-02-13", "영양사1": 0, "영양사2": 0, "영양사3": 0, "영양사4": 0, "영양사5": 0},
      {"mealDate":"2024-02-14", "영양사1": 0, "영양사2": 0, "영양사3": 0, "영양사4": 0, "영양사5": 0},
  
    ];
    */
   // group by mealDate and feedbackWriterNickname

   // if feedback of mealDate is not exist, add dummy record having mealDate and  feebackCount = 0


   // loop startMealDate to endMealDate

    // if feedback of mealDate is not exist, add dummy record having mealDate and  feebackCount = 0

    let mealDateArray = [] as any;



    
  
    

    let currentDate = new Date(endMealDate);
    let i = 0;
    while (currentDate >= new Date(startMealDate)) {

      if (i >= (page - 1) * limit && i < page * limit) {

        mealDateArray.push(currentDate.toISOString().slice(0, 10));

      } else if (i >= page * limit) {
        break;
      }

      currentDate.setDate(currentDate.getDate() - 1);

      i++;

    }




    // check flag for all async function to be finished

    let flag = 0;

    mealDateArray.forEach( async (mealDate: string) => {

    

      const results = await collection.aggregate<any>([
        {
          $match: {
            mealDate: mealDate,
            feedbackYn: 'Y',
          }
        },
        {
          $group: {
            _id: '$feedbackWriterId',
            feedbackCount: {
              $sum: 1,
            }
          }
        },
        {
          $sort: {
            feedbackCount: -1,
          }
        }
      ]).toArray();



      results.forEach((result: any) => {

      
        const feedbackWriterId = result._id;

        const feedbackWriter = rows.find((feedbackWriter: any) => feedbackWriter.id === parseInt(feedbackWriterId));

        if (feedbackWriter) {
          result.feedbackWriterNickname = feedbackWriter.nickname;
        }

      } );



      mealDateArray.forEach(

        (mealDateItem: string) => {

          if (mealDateItem === mealDate) {

            results.forEach((result: any) => {

              const feedbackWriterNickname = result.feedbackWriterNickname;

              const feedbackCount = result.feedbackCount;

              //       {"mealDate":"2024-02-12", "영양사1": 3, "영양사2": 0, "영양사3": 2, "영양사4": 1, "영양사5": 0},

              const returnResult = returnResults.find((returnResult: any) => returnResult.mealDate === mealDateItem);

              if (returnResult) {

                returnResult[feedbackWriterNickname] = feedbackCount;

              } else {

                returnResults.push({
                  mealDate: mealDateItem,
                  [feedbackWriterNickname]: feedbackCount,
                });

              }

            });

          } else {

            const returnResult = returnResults.find((returnResult: any) => returnResult.mealDate === mealDateItem);

            if (!returnResult) {

              returnResults.push({
                mealDate: mealDateItem,
              });

            } else {

              // do nothing

            }

          }

        }
      );


      returnResults.sort((a: any, b: any) => {
        return a.mealDate < b.mealDate ? 1 : -1;
      } );


      flag++;

    } );


    while (flag < mealDateArray.length) {

      await new Promise(resolve => setTimeout(resolve, 1000));

      // too long time, then exit this function

      if ( flag > mealDateArray.length * 10) {
        break;
      }


    }
    


    // add sequenceNumber  to returnResults 
    // reverse sequenceNumber
    //const sequenceNumber = (page - 1) * limit + 1;

    const sequenceNumber = totalCount - (page - 1) * limit;


    returnResults.forEach((returnResult: any, index: number) => {
      returnResult.sequenceNumber = sequenceNumber - index;
    });
    


    return {
      "data" : returnResults,
      "totalCount" : totalCount,
    };



  } catch (error) {

    connection.release();
    console.error(' error: ', error);
    return {
      "data" : [],
      "totalCount" : 0,
    };

  }



}



// mysql version
/*
export async function getLikeCountByUserId (
  userId: number,
): Promise<number> {

    const connection = await connect();
  
    try {
  
      // get total like count by userId from feed_likes table
        
      const query = `
      SELECT COUNT(*) as likeCount
      FROM feed_likes
      WHERE userId = ?
      `;

      const values = [userId];
      

      const [rows, fields] = await connection.query(query, values) as any
  
      connection.release();
  

  
      return rows[0].likeCount;
  
    } catch (error) {
     
      connection.release();
  
      return 0;
    }

}
*/
// convert to mongo version
export async function getLikeCountByUserId (
  userId: number,
): Promise<number> {

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feed_likes');
  
    try {
  
      // get total like count by userId from feed_likes table
        
      const likeCount = await collection.countDocuments({
        userId: userId,
      });
  

  
      return likeCount;
  
    } catch (error) {
     
      return 0;
    }

}