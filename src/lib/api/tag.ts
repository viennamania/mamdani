import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { create, random } from 'lodash';


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
  feeds: FeedProps[];
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




  export async function getFeedById(id: string): Promise<FeedProps | null> {

    console.log('getFeedById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
    const results = await collection.findOne<FeedProps>(
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


  export async function getFeedByEmail(id: string): Promise<FeedProps | null> {

    console.log('getFeedByEmail getUser id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
    const results = await collection.findOne<FeedProps>(
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
  ): Promise<FeedProps[]> {
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
  
    /*
    const results = await collection
      .find<UserProps>(
        {},
        {
          projection: { _id: 0, emailVerified: 0 },
          limit: limit,
          skip: (page - 1) * limit,
          sort: { followers: -1 }
        }
      )
      .toArray();
    */
  
    console.log('limit: ' + limit);
    console.log('page: ' + page);

    return await collection
    .aggregate<FeedProps>([
      {
        $match: {
          email: email,
        }
      },

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
      // feedTitle is exist and not null
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
  


    /*
     
    return await collection
      .aggregate<ResultProps>([

        {
          $match: {
            email: email,
          }
        },
  

        {
          //sort by follower count
          $sort: {
            _id: -1
          }
        },
        
        {
          $limit: limit,
          /////$skip: (page - 1) * limit, // skip the first n documents
        },

        {
          $group: {
  
            _id: {
              $toLower: { $substrCP: ['$name', 0, 1] }
            },
  
            feeds: {
              $push: {
  
                id: '$id',
                email: '$email',
                name: '$name',
                nickname: '$nickname',
                avatar: '$avatar',
                feedTitle: '$feedTitle',
                feedContent: '$feedContent',

                mealDate: '$mealDate',
                mealTime: '$mealTime',
                mealFood: '$mealFood',
                mealAmount: '$mealAmount',
                mealSpeed: '$mealSpeed',
                createdAt: '$createdAt',
                updatedAt: '$updatedAt',
                

  
              }
            },
            count: { $sum: 1 }
          }
        },
        

        
      ])
      .toArray();

      */
  
    
  }
  



  export async function getAll(
    limit: number,
    page: number,

  ///): Promise<ResultProps[]> {

  ): Promise<FeedProps[]> {

  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
  
    /*
    const results = await collection
      .find<UserProps>(
        {},
        {
          projection: { _id: 0, emailVerified: 0 },
          limit: limit,
          skip: (page - 1) * limit,
          sort: { followers: -1 }
        }
      )
      .toArray();
    */
  
    console.log('limit: ' + limit);
    console.log('page: ' + page);

    
    // collection.find({}).sort({ _id: -1 }).limit(1).toArray(function(err, result) {

    return await collection
      .aggregate<FeedProps>([
  
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


    /* 
    return await collection
      .aggregate<ResultProps>([
  

        {
          //sort by follower count
          $sort: {
            _id: -1
          }
        },
        
        {
          $limit: limit,
          /////$skip: (page - 1) * limit, // skip the first n documents
        },

        {
          $group: {
  
            _id: {
              $toLower: { $substrCP: ['$name', 0, 1] }
            },
  
            feeds: {

              $push: {
  
                id: '$id',
                email: '$email',
                name: '$name',
                nickname: '$nickname',
                avatar: '$avatar',
                createdAt: '$createdAt',
                updatedAt: '$updatedAt',

                feedTitle: '$feedTitle',
                feedContent: '$feedContent',

                mealDate: '$mealDate',
                mealTime: '$mealTime',
                mealFood: '$mealFood',
                mealAmount: '$mealAmount',
                mealSpeed: '$mealSpeed',

                feedbackYn: '$feedbackYn',

                feedbackContent: '$feedbackContent',
                
                feedbackWriterId: '$feedbackWriterId',
                feedbackWriterNickname: '$feedbackWriterNickname',
                feedbackWriterAvatar: '$feedbackWriterAvatar',
                feedbackWriterEmail: '$feedbackWriterEmail',



  
              }
            },
            count: { $sum: 1 }
          }
        },
        

        
      ])
      .toArray();
      */
  
    
  }
  


  export async function getAllRecommended(
    limit: number,
    page: number,

  ///): Promise<ResultProps[]> {

  ): Promise<FeedProps[]> {

  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
  
    /*
    const results = await collection
      .find<UserProps>(
        {},
        {
          projection: { _id: 0, emailVerified: 0 },
          limit: limit,
          skip: (page - 1) * limit,
          sort: { followers: -1 }
        }
      )
      .toArray();
    */
  
    console.log('limit: ' + limit);
    console.log('page: ' + page);

    
    // collection.find({}).sort({ _id: -1 }).limit(1).toArray(function(err, result) {

    return await collection
      .aggregate<FeedProps>([
  
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


    /* 
    return await collection
      .aggregate<ResultProps>([
  

        {
          //sort by follower count
          $sort: {
            _id: -1
          }
        },
        
        {
          $limit: limit,
          /////$skip: (page - 1) * limit, // skip the first n documents
        },

        {
          $group: {
  
            _id: {
              $toLower: { $substrCP: ['$name', 0, 1] }
            },
  
            feeds: {

              $push: {
  
                id: '$id',
                email: '$email',
                name: '$name',
                nickname: '$nickname',
                avatar: '$avatar',
                createdAt: '$createdAt',
                updatedAt: '$updatedAt',

                feedTitle: '$feedTitle',
                feedContent: '$feedContent',

                mealDate: '$mealDate',
                mealTime: '$mealTime',
                mealFood: '$mealFood',
                mealAmount: '$mealAmount',
                mealSpeed: '$mealSpeed',

                feedbackYn: '$feedbackYn',

                feedbackContent: '$feedbackContent',
                
                feedbackWriterId: '$feedbackWriterId',
                feedbackWriterNickname: '$feedbackWriterNickname',
                feedbackWriterAvatar: '$feedbackWriterAvatar',
                feedbackWriterEmail: '$feedbackWriterEmail',



  
              }
            },
            count: { $sum: 1 }
          }
        },
        

        
      ])
      .toArray();
      */
  
    
  }
  






  export async function updateFeedbackById (
    {
      id,
      feedbackContent,
      feedbackWriterId,
      feedbackWriterNickname,
      feedbackWriterAvatar,
      feedbackWriterEmail,


    }: {
      id: string,

      feedbackContent: string,
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