import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { create, random } from 'lodash';
import { R } from 'uploadthing/dist/upload-builder-aa89ef3a';


import pool, {connect, query} from '@/config/db';
import { u } from 'uploadthing/dist/types-e8f81bbc';



export interface PointProps {
  id: string;

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

  /*
  scrapCount: number,
  likeCount: number,
  commentCount: number,
  viewCount: number,
  rating: number[],
  */



  feedbackYn: string,

  feedbackContent: string,

  feedbackWriterId: string,
  feedbackWriterNickname: string,
  feedbackWriterAvatar: string,
  feedbackWriterEmail: string,

  

}




export interface ResultProps {
  _id: string;
  points: PointProps[];
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


    return results;
  
  }









  export async function getAllByUserId({
    userId,
    limit,
    page,
    sort,
    order,
    q,
  }: {
    userId: number,
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,
  }): Promise<ResultProps> {

  
    /*
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('points');
 
    const query = q === null ? '' : q;



    const results = await collection
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




    const resultsCount = await collection.aggregate([
      {
        $match: {
          userEmail: email,
        }
      },
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
          ],
        }
      },
      {
        $count: 'totalCount'
      }
    ]).toArray();



    return {
      _id: email,
      points: results,
      totalCount: resultsCount[0]?.totalCount,
    };
    */


    const connection = await connect();

    try {

      // get total point by userId
        
      const query = `
      SELECT
      *
      FROM points
      WHERE userId = ?
      ORDER BY ${sort} ${order}
      LIMIT ?
      OFFSET ?
      `;

      const values = [userId, limit, (page - 1) * limit];
        

      const [rows, fields] = await connection.query(query, values) as any

      const totalCount = await connection.query('SELECT COUNT(*) as totalCount FROM points WHERE userId = ?', [userId]) as any;

      connection.release();

      return {
        _id: userId.toString(),
        points: rows,
        totalCount: totalCount[0].totalCount,
      };

    }  catch (error) {
        
      connection.release();

      return {
        _id: userId.toString(),
        points: [],
        totalCount: 0,
      };
    }


  
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





export async function getAll( {
  limit,
  page,
  sort,
  order,
  q,
  userId,
  pointTypeArray,
  startDate,
  endDate,
}: {
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
  userId: number,
  pointTypeArray: string[],
  startDate: string,
  endDate: string,
}): Promise<ResultProps> {



    ////console.log('point getAll q: ' + q);

    console.log('userId: ' + userId);



    const connection = await connect();

    try {
        
        // get points by page and limit
        // join points and users
        // get user info by userId
        // search title by pointTypeArray
        // search createAd by startDate and endDate
        // search userNickname by q
        // order by sort and order



  
        if (userId != undefined ) {

          const query = `
          SELECT
          *
          FROM points
          WHERE userId = ?
          ORDER BY ${sort} ${order}
          LIMIT ?, ?
          `;

          const values = [userId, (page - 1) * limit, limit];

          const [rows, fields] = await connection.query(query, values) as any

          const queryCount = `
          SELECT
          COUNT(*) as totalCount
          FROM points
          WHERE userId = ?
          `;
          const valuesCount = [userId];

          const [totalCount, fieldsCount] = await connection.query(queryCount, valuesCount) as any

          connection.release();

          return {
            _id: 'all',
            points: rows,
            totalCount: totalCount[0].totalCount,
          };



        } else {

          const query = `
          SELECT
          p.id, p.userId, p.title, p.point, p.createdAt, u.email as userEmail, u.name as userName, u.nickname as userNickname, u.avatar as userAvatar
          FROM points p
          JOIN users u
          ON p.userId = u.id
          WHERE u.nickname LIKE ?

          AND p.title IN (?)

          AND p.createdAt >= ?
          AND p.createdAt <= ?

          ORDER BY p.${sort} ${order}
          LIMIT ?, ?
          `;

            
          const values = [`%${q}%`,
          pointTypeArray,
          startDate, endDate,
          (page - 1) * limit, limit];


          const [rows, fields] = await connection.query(query, values) as any
    

          ////console.log('point getAll rows: ' + rows);




          const queryCount = `
          SELECT
          COUNT(*) as totalCount
          FROM points p
          JOIN users u
          ON p.userId = u.id
          WHERE u.nickname LIKE ?

          AND p.title IN (?)

          AND p.createdAt >= ?
          AND p.createdAt <= ?

          `;

          const valuesCount = [`%${q}%`,
          pointTypeArray
          , startDate, endDate];


          const [totalCount, fieldsCount] = await connection.query(queryCount, valuesCount) as any


          connection.release();


          return {
            _id: 'all',
            points: rows,
            totalCount: totalCount[0].totalCount,
          };

        }



    } catch (error) {

        console.log('getAll error: ' + error);
        
        connection.release();
  
        return {
          _id: 'all',
          points: [],
          totalCount: 0,
        };
      }
  
  }




  // get total count
  export async function getAllCount(
    q: string,
  ) {
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('points');


      const query = q === null ? '' : q;
  
      const results = await collection.countDocuments(

        /*
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
          ],
        }
        */
 

      );
  
      return results;
  }







  // get sum of point by email from points collection

export async function getTotalPointByUserId (
  userId: number,
): Promise<number> {


  console.log('getTotalPointByUserId userId: ' + userId);
  

  const connection = await connect();

  try {

    // get total point by userId
    // if not exist, return 0

    const query = `
    SELECT
    
    SUM(point) as totalPoint

    FROM points
    WHERE userId = ?
    `;


    const values = [userId];
      

    const [rows, fields] = await connection.query(query, values) as any

    connection.release();


    ///console.log('getTotalPointByUserId rows: ' + JSON.stringify(rows));






    return rows[0].totalPoint;



  } catch (error) {
    
    connection.release();

    return 0;
  }




}


