import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { create, random } from 'lodash';


import pool, {connect, close, query} from '@/config/db';



export interface PointProps {
  id: number;
  name: string;



}




export interface ResultProps {
  _id: string;
  feeds: PointProps[];
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
      
    }: {
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

    }
  ) {

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
  

    // get sequence number and increment it

    ///const id = random(100000, 999999).toString();

    // random 6 digit number
    const id = Math.floor(100000 + Math.random() * 900000).toString();

    console.log('registerOne id: ' + id);


    // insert one document and read it







    await collection.insertOne(
      {
        id: id,
        email: email,

        name: name,
        nickname: nickname,
        avatar: avatar,

        feedTitle: '',
        feedContent: '',

        mealDate: mealDate,
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
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,

      }
    );

    const results =  await collection.findOne(
      {
        id: id,
      }
    );





    // mealFood document insert and update each foodName count
    const mealFoodArray = mealFood as any;
    console.log('mealFoodArray: ' + mealFoodArray);

    for (let i = 0; i < mealFoodArray.length; i++) {

      const mealFoodName = mealFoodArray[i].foodName;
      const mealFoodCount = 1;


      // insert one document and read it
      const mealFoodCollection = client.db('doingdoit').collection('mealFood');

      // mealFood document insert and update each foodName count
      const mealFoodResults = await mealFoodCollection.findOne(
        {
          foodName: mealFoodName,
        }
      );

      console.log('mealFoodResults: ' + mealFoodResults);

      if (mealFoodResults) {

        console.log('mealFoodResults._id: ' + mealFoodResults._id);

        // update mealFood
        await mealFoodCollection.updateOne(
          {
            foodName: mealFoodName,
          },
          {
            $set: {
              foodName: mealFoodName,
              foodCount: mealFoodResults.foodCount + mealFoodCount,
              updatedAt: new Date(),
            }
          }
        );

      } else {

        // insert mealFood
        await mealFoodCollection.insertOne(
          {
            foodName: mealFoodName,
            foodCount: mealFoodCount,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        );

      }

    }
   





  
    return results;
  
  }




  export async function getFeedById(id: string): Promise<PointProps | null> {

    console.log('getFeedById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
    const results = await collection.findOne<PointProps>(
      { id: id },
      { projection: { _id: 0, emailVerified: 0 } }
      ////{ projection: { _id: 0, emailVerified: 0 } }
    );
  
    console.log('getFeedById results: ' + results);
  
    if (results) {
      return {
        ...results,
        //bioMdx: await getMdxSource(results.bio || placeholderBio)
      };
    } else {
      return null;
    }
  }


  export async function getFeedByEmail(id: string): Promise<PointProps | null> {

    console.log('getFeedByEmail getUser id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
    const results = await collection.findOne<PointProps>(
      { email: id },
      { projection: { _id: 0, emailVerified: 0 } }
      ////{ projection: { _id: 0, emailVerified: 0 } }
    );
  
    console.log('getFeedByEmail results: ' + results);
  
    if (results) {
      return {
        ...results,
        //bioMdx: await getMdxSource(results.bio || placeholderBio)
      };
    } else {
      return null;
    }
  }



  
  export async function updateFeedById (
    {
      id,
      feedTitle,
      feedContent,
      tags,

    }: {
      id: string,

      feedTitle: string,
      feedContent: string,

      tags: object,

    }
  ) {



    console.log('updateFeedById id: ' + id);
    console.log('updateFeedById feedTitle: ' + feedTitle);
    console.log('updateFeedById feedContent: ' + feedContent);
    console.log('updateFeedById tags: ' + tags);  
    


    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
  

    //return await collection.updateOne({ username }, { $set: { bio } });

    // update on by email
    // field: { $exists: true }

    const results = await collection.updateOne(

    
      
      { id: id },

      { $set:
      
        {
          feedTitle: feedTitle,
          feedContent: feedContent,

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





    console.log('updateFeedById results: ' + results);

    return results;
  
  }





  export async function updateFeedImage1ById (
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
  ): Promise<PointProps[]> {
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('points');
 
    const query = q === null ? '' : q;


    console.log('getAllByEmail email: ' + email);

    


    return await collection
    .aggregate<PointProps>([
      
      {
        $match: {
          userEmail: email,
        }
      },


      sort === 'createdAt' ? { $sort: { createdAt: order === 'asc' ? 1 : -1 } } : { $sort: { viewCount: order === 'asc' ? 1 : -1 } },

      
      
      {
        $limit: limit,
        //////$skip: (page - 1) * limit, // skip the first n documents

      },

      // match by q and feedTitle and feedContent and hiddenYn is exist  and not 'Y'
      
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
          ],
        }
      },

      

      
    ])
    .toArray();
  
  }



  // get total count
  export async function getAllByEmailCount(
    email: string,
    q: string,
  ) {
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('points');


      const query = q === null ? '' : q;
  
      const results = await collection.countDocuments(

        {
          userEmail: email,
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
          ],
        }
 

      );
  
      return results;
  }






  export async function getAll(
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,

  ): Promise<PointProps[]> {

    const query = q || '';

  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('points');
 

    
    // collection.find({}).sort({ _id: -1 }).limit(1).toArray(function(err, result) {

    return await collection
      .aggregate<PointProps>([

        {
          //sort by follower count
          $sort: {
            _id: -1
          }
        },
        
        {
          $limit: limit,
          //////$skip: (page - 1) * limit, // skip the first n documents

        },
        // feedTitle is exist  and not ''
        {
          $match: {
            feedTitle: {
              $exists: true,
              $ne: ''
            }
          }
        },
  

        
      ])
      .toArray();

  }
  




  // get sum of point by email from points collection

export async function getTotalPointByEmail (
  email: string,
): Promise<number> {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('points');

  const results = await collection
    .aggregate(
      [
        {
          $match: {
            userEmail: email,
          }
        },
        {
          $group: {
            _id: null,
            totalPoint: {
              $sum: '$point'
            }
          }
        }
      ]
    )
    .toArray();

  ///////console.log('getTotalPointByEmail results: ' + results);

  if (results) {
    return results[0]?.totalPoint;
  } else {
    return 0;
  }
}




// update point document of setup collection
// if setup collection is not exist, create setup collection and insert one document



export async function updateSetupPoint (
  {
    feedLike,
    boardLike,
    attendance,
    feedPost,
    boardPost,
    boardComment,
  } : {
    feedLike: number,
    boardLike: number,
    attendance: number,
    feedPost: number,
    boardPost: number,
    boardComment: number,
  }
) {



  const connection = await connect();

  try {


    // update point_category table

    const queryAttendance = `
      UPDATE point_category SET point = ? WHERE category = ?;
    `;
    const valuesAttendance = [attendance, 'attendance'];
    const [rowsAttendance, fieldsAttendance] = await connection.query(queryAttendance, valuesAttendance) as any

    const queryFeedLike = `
      UPDATE point_category SET point = ? WHERE category = ?;
    `;
    const valuesFeedLike = [feedLike, 'feedLike'];
    const [rowsFeedLike, fieldsFeedLike] = await connection.query(queryFeedLike, valuesFeedLike) as any

    const queryBoardLike = `
      UPDATE point_category SET point = ? WHERE category = ?;
    `;
    const valuesBoardLike = [boardLike, 'boardLike'];
    const [rowsBoardLike, fieldsBoardLike] = await connection.query(queryBoardLike, valuesBoardLike) as any

    const queryFeedPost = `
      UPDATE point_category SET point = ? WHERE category = ?;
    `;
    const valuesFeedPost = [feedPost, 'feedPost'];
    const [rowsFeedPost, fieldsFeedPost] = await connection.query(queryFeedPost, valuesFeedPost) as any

    const queryBoardPost = `
      UPDATE point_category SET point = ? WHERE category = ?;
    `;
    const valuesBoardPost = [boardPost, 'boardPost'];
    const [rowsBoardPost, fieldsBoardPost] = await connection.query(queryBoardPost, valuesBoardPost) as any

    const queryBoardComment = `
      UPDATE point_category SET point = ? WHERE category = ?;
    `;
    const valuesBoardComment = [boardComment, 'boardComment'];
    const [rowsBoardComment, fieldsBoardComment] = await connection.query(queryBoardComment, valuesBoardComment) as any

    return {
      attendance: rowsAttendance,
      feedLike: rowsFeedLike,
      boardLike: rowsBoardLike,
      feedPost: rowsFeedPost,
      boardPost: rowsBoardPost,
      boardComment: rowsBoardComment,
    };




    /*
      
    const query = `
      UPDATE setups SET feedLike = ?, boardLike = ?, attendance = ?, feedPost = ?, boardPost = ?, boardComment = ?
      WHERE name = 'point';
    `;

    const values = [feedLike, boardLike, attendance, feedPost, boardPost, boardComment];

    const [rows, fields] = await connection.query(query, values) as any

    ///connection.commit();

    connection.release();



    ///////close(); ==> error: Cannot enqueue Query after invoking quit.



    console.log('updateSetupPoint rows: ' + rows);

    return rows;
    */




  } catch (error) {
    console.log('updateSetupPoint error: ' + error);
    connection.release();
    return null;
  }

}


// getSetup
export async function getSetup (
  name: string,
): Promise<any> {



  const connection = await connect();

  try {

    // whay cannot read updated setup column value?
    // 1. connection is not released

    


    // get attenance point, feedLike, boardLike, feedPost, boardPost, boardComment from point_category table

    const queryAttendance = `
      SELECT point FROM point_category WHERE category = ?;
    `;
    const valuesAttendance = ['attendance'];

    const [rowsAttendance, fieldsAttendance] = await connection.query(queryAttendance, valuesAttendance) as any


    console.log('getSetup rowsAttendance: ' + rowsAttendance[0].point);



    const queryFeedLike = `
      SELECT point FROM point_category WHERE category = ?;
    `;
    const valuesFeedLike = ['feedLike'];
    const [rowsFeedLike, fieldsFeedLike] = await connection.query(queryFeedLike, valuesFeedLike) as any

    console.log('getSetup rowsFeedLike: ' + rowsFeedLike[0].point);


    const queryBoardLike = `
      SELECT point FROM point_category WHERE category = ?;
    `;
    const valuesBoardLike = ['boardLike'];
    const [rowsBoardLike, fieldsBoardLike] = await connection.query(queryBoardLike, valuesBoardLike) as any


    console.log('getSetup rowsBoardLike: ' + rowsBoardLike[0].point);


    const queryFeedPost = `
      SELECT point FROM point_category WHERE category = ?;
    `;
    const valuesFeedPost = ['feedPost'];
    const [rowsFeedPost, fieldsFeedPost] = await connection.query(queryFeedPost, valuesFeedPost) as any

    console.log('getSetup rowsFeedPost: ' + rowsFeedPost[0].point);


    const queryBoardPost = `
      SELECT point FROM point_category WHERE category = ?;
    `;
    const valuesBoardPost = ['boardPost'];
    const [rowsBoardPost, fieldsBoardPost] = await connection.query(queryBoardPost, valuesBoardPost) as any

    console.log('getSetup rowsBoardPost: ' + rowsBoardPost[0].point);



    const queryBoardComment = `
      SELECT point FROM point_category WHERE category = ?;
    `;
    const valuesBoardComment = ['boardComment'];
    const [rowsBoardComment, fieldsBoardComment] = await connection.query(queryBoardComment, valuesBoardComment) as any

    console.log('getSetup rowsBoardComment: ' + rowsBoardComment[0].point);



    connection.release();


    return {
      attendance: rowsAttendance[0].point,
      feedLike: rowsFeedLike[0].point,
      boardLike: rowsBoardLike[0].point,
      feedPost: rowsFeedPost[0].point,
      boardPost: rowsBoardPost[0].point,
      boardComment: rowsBoardComment[0].point,
    };





  } catch (error) {
    console.log('getSetup error: ' + error);
    connection.release();
    return null;
  }
  


}



// getSetup
export async function getRewardPointByCategory (
  category: string,
): Promise<any> {


  const connection = await connect();

  try {

   

    // get attenance point, feedLike, boardLike, feedPost, boardPost, boardComment from point_category table

    const query = `
      SELECT point FROM point_category WHERE category = ?;
    `;
    const values = [category];

    const [rows, fields] = await connection.query (query, values) as any


    connection.release();


    if (rows) {
      return {
        point: rows[0].point,
      };
    } else {
      return null;
    }




  } catch (error) {
    console.log('getSetup error: ' + error);
    connection.release();
    return null;
  }
  


}