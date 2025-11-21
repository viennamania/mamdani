import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { create, random } from 'lodash';


import { ObjectId } from 'mongodb';


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


export interface NotificationProps {

  userId: string,
  userEmail: string,
  userName: string,
  userNickname: string,
  userAvatar: string,


  createdAt: Date,
  updatedAt: Date,

  title: string,
  content: string,

  image1: string,

  readYn: string,
  
}




export interface ResultProps {

  _id: string;

  notifications: NotificationProps[];
  totalCount: number,
  unreadCount: number,

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

      //console.log('mealFoodResults: ' + mealFoodResults);

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




  export async function getFeedById(id: string): Promise<NotificationProps | null> {

    console.log('getFeedById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
    const results = await collection.findOne<NotificationProps>(
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


  export async function getFeedByEmail(id: string): Promise<NotificationProps | null> {

    console.log('getFeedByEmail getUser id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
    const results = await collection.findOne<NotificationProps>(
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
  ): Promise<ResultProps> {
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notifications');
 
    const query = q === null ? '' : q;


   /// console.log('notification getAllByEmail email: ' + email);



    const results = await collection
    .aggregate<NotificationProps>([
      
      {
        $match: {
          userEmail: email,
        }
      },


      sort === 'createdAt' ? { $sort: { createdAt: order === 'asc' ? 1 : -1 } } : { $sort: { viewCount: order === 'asc' ? 1 : -1 } },

      

      // match by q and feedTitle and feedContent and hiddenYn is exist  and not 'Y'
      /*
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
          ],
        }
      },
      */

      {
        $limit: limit,

      },
      
      {
        $skip: (page - 1) * limit, // skip the first n documents

      },

      
    ])
    .toArray();

    // get total count
    const totalCount = await collection.countDocuments(

      {
        userEmail: email,
      }

    );

    // get unread count
    const unreadCount = await collection.countDocuments(

      {
        userEmail: email,
        readYn: 'N',
      }

    );


    // update readYn to 'Y' for all notifications
    const updateResults = await collection.updateMany(
      {
        userEmail: email,
      },
      {
        $set: {
          readYn: 'Y',
        }
      }
    );




    return {
      _id: email,
      notifications: results,
      totalCount: totalCount,
      unreadCount: unreadCount,
    };

  
  }



  // get total count
  export async function getAllByEmailCount(
    email: string,
    q: string,
  ) {

    console.log('getAllByEmailCount email: ' + email);
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('notifications');


      const query = q === null ? '' : q;
  
      const results = await collection.countDocuments(

        {
          userEmail: email,

          /*
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
          ],
          */

        }
 

      );
  
      return results;
  }


/* mysql version
  // get unread count
  export async function getUnreadCountByUserId(
    userId: number,

  ) {


      const connection = await connect();

      try {

        const query = `
        SELECT
          COUNT(*) AS unreadCount
        FROM
          notifications
        WHERE
          userId = ? AND readYn = 'N';
        `;

        const values = [userId];

        const [rows, fields] = await connection.query(query, values) as any;

        connection.release();

        return rows[0].unreadCount;


  } catch (error) {
        
      console.error('notification getUnreadCountByUserId error:', error);

      connection.release();

      return 0;

    }

  }
  */
  // converted to mongodb version
  export async function getUnreadCountByUserId(
    userId: string,
  ) {

      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('notifications');
  
      const results = await collection.countDocuments(

        {
          userId: userId,
          readYn: 'N',
        }
 

      );
  
      return results;
  }




  // get unread count
  export async function getUnreadCountByEmail(
    email: string,

  ) {

  
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('notifications');
  
      const results = await collection.countDocuments(

        {
          userEmail: email,
          readYn: 'N',
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

  ): Promise<NotificationProps[]> {

    const query = q || '';

  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notifications');
 

    
    // collection.find({}).sort({ _id: -1 }).limit(1).toArray(function(err, result) {

    return await collection
      .aggregate<NotificationProps>([

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
  




/* delete one */
export async function deleteOne(
  id: string,
): Promise<any> {


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notifications');


  return await collection.deleteOne({
      _id: new ObjectId(id),
  });

}



/* delete one */
export async function deleteAllByEmail(
  email: string,
): Promise<any> {



  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notifications');


  return await collection.deleteMany({
      userEmail: email,
  });
  
}


// mysql version
/*
export async function deleteAllByUserId(
  userId: number,
): Promise<any> {


  console.log('notification deleteAllByUserId userId: ' + userId);

  

  const connection = await connect();

  try {

    const query = `
    DELETE FROM notifications
    WHERE userId = ?;
    `;

    const values = [userId];

    const [rows, fields] = await connection.query(query, values) as any;

    connection.release();

    return rows;

  
  } catch (error) {
      
      console.error('notification deleteAllByUserId error:', error);
  
      connection.release();
  
      return null;
  
    }

  
}*/
// converted to mongodb version
export async function deleteAllByUserId(
  userId: string,
): Promise<any> {
  console.log('notification deleteAllByUserId userId: ' + userId);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notifications');

  return await collection.deleteMany({
      userId: userId,
  });
  
}


/* mysql version
  export async function getAllByUserId(
    userId: number,
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,
  ): Promise<ResultProps> {



 

    if (!sort) {
      sort = 'createdAt';
    }
  
    if (!order) {
      order = 'desc';
    }
  
    const connection = await connect();


    try {

      // get notifications of user and update readYn to 'Y' and get total count and unread count
 

      // join notifications columns commentUserId with user table and get user info
      // join notifications columns commentId with comment table and get comment info

      // join notifications columns commentUserId with users table and get user info
      // join notifications columns commentId with comments table and get comment info

      const query = `
      SELECT
        a.id,
        a.createdAt,
        a.readYn,
        a.boardId,
        b.id AS commentUserId,
        b.email AS commentUserEmail,
        b.nickname AS commentUserNickname,
        b.avatar AS userAvatar,
        c.id AS commentId,
        c.content AS commentContent,
        c.createdAt AS commentCreatedAt

      FROM notifications AS a LEFT JOIN users AS b ON a.commentUserId = b.id
      LEFT JOIN comments AS c ON a.commentId = c.id

      WHERE a.userId = ?

      ORDER BY a.${sort} ${order}
      `;



      const values = [userId];

      const [rows, fields] = await connection.query(query, values) as any;


      /////////console.log('notification getAllByUserId rows: ' + rows);




      // get total count and unread count and update readYn to 'Y'

      const query2 = `
      SELECT
        COUNT(*) AS totalCount
      FROM
        notifications
      WHERE
        userId= ?;
      `;
      const values2 = [userId];

      const [rows2, fields2] = await connection.query(query2, values2) as any;

      const totalCount = rows2[0].totalCount;

      const query3 = `
      SELECT
        COUNT(*) AS unreadCount
      FROM
        notifications
      WHERE
        userId = ? AND readYn = 'N';
      `;
      const values3 = [userId];

      const [rows3, fields3] = await connection.query(query3, values3) as any;

      const unreadCount = rows3[0].unreadCount;


      const query4 = `
      UPDATE
        notifications
      SET
        readYn = 'Y'
      WHERE
        userId = ?;
      `;
      const values4 = [userId];

      const [rows4, fields4] = await connection.query(query4, values4) as any;

      connection.release();


 


      return {
        _id: "userId",
        notifications: rows,
        totalCount: totalCount,
        unreadCount: unreadCount,
      };


    } catch (error) {
      
      console.error('notification getAllByUserId error:', error);


      connection.release();

      return (
        {
          _id: "userId",
          notifications: [],
          totalCount: 0,
          unreadCount: 0,
        }
      )

    }

  
  }
  */
  // converted to mongodb version
  export async function getAllByUserId(
    userId: string,
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,
  ): Promise<ResultProps> {
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notifications');
 
    const query = q === null ? '' : q; 
    console.log('notification getAllByUserId userId: ' + userId);
    const results = await collection
    .aggregate<NotificationProps>([
      
      {
        $match: {
          userId: userId,
        }
      },
      sort === 'createdAt' ? { $sort: { createdAt: order === 'asc' ? 1 : -1 } } : { $sort: { viewCount: order === 'asc' ? 1 : -1 } },

      // match by q and feedTitle and feedContent and hiddenYn is exist  and not 'Y'
      /*
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
          ],
        }
      },
      */

      {
        $limit: limit,

      },
      
      {
        $skip: (page - 1) * limit, // skip the first n documents

      },

      
    ])
    .toArray();

    // get total count
    const totalCount = await collection.countDocuments(

      {
        userId: userId,
      }

    );

    // get unread count
    const unreadCount = await collection.countDocuments(

      {
        userId: userId,
        readYn: 'N',
      }

    );
    // update readYn to 'Y' for all notifications
    const updateResults = await collection.updateMany(
      {
        userId: userId,
      },
      {
        $set: {
          readYn: 'Y',
        }
      }
    );
    return {
      _id: userId,
      notifications: results,
      totalCount: totalCount,
      unreadCount: unreadCount,
    };

  
  }