import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { S, u } from 'uploadthing/dist/types-e8f81bbc';
import exp from 'constants';


/* mongoDB ojbect id */
import { ObjectId } from 'mongodb';

export interface BoardProps {


  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userNickname: string;
  userAvatar: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;


  title: string;
  content: string;
  images: string[];

  category: string;
  tags: string[];


  scrapCount: number;
  likeCount: number;
  commentCount: number;
  viewCount: number;


}

export interface ResultProps {
  _id: string;
  boards: BoardProps[];
}

export async function getMdxSource(postContents: string) {
  // Use remark plugins to convert markdown into HTML string
  const processedContent = await remark()
    // Native remark plugin that parses markdown into MDX
    .use(remarkMdx)
    .process(postContents);

  // Convert converted html to string format
  const contentHtml = String(processedContent);

  // Serialize the content string into MDX
  const mdxSource = await serialize(contentHtml);

  return mdxSource;
}

export const placeholderBio = `
Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.

Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.`;




/*
export async function getAll(
  limit: number,
  page: number,

///): Promise<ResultProps[]> {

): Promise<BoardProps[]> {


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('healthinfos');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  
  // collection.find({}).sort({ _id: -1 }).limit(1).toArray(function(err, result) {

  return await collection
    .aggregate<BoardProps>([

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



      
    ])
    .toArray();

  
}
*/


export async function getAll(

  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,

///): Promise<ResultProps[]> {

): Promise<BoardProps[]> {

  console.log('limit: ' + limit);
  console.log('page: ' + page);
  console.log('sort: ' + sort);
  console.log('order: ' + order);

  
  ///const query = q === null ? '' : q;

  const query = q || '';

  console.log('query: [' + query + ']');


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('surveys');






  return await collection
    .aggregate<BoardProps>([

      sort === 'createdAt' ? { $sort: { createdAt: order === 'asc' ? 1 : -1 } } : { $sort: { viewCount: order === 'asc' ? 1 : -1 } },
      
      {
        $limit: limit,
        //////$skip: (page - 1) * limit, // skip the first n documents

      },
      // match by q and feedTitle and feedContent and hiddenYn is exist  and not 'Y'
      {
        $match: {
          $or: [
            //{ title: { $regex: query, $options: 'i' } },
            ////{ content: { $regex: query, $options: 'i' } },
            { nickname: { $regex: query, $options: 'i' } },

            // tags array match
            { tags: { $elemMatch: { $regex: query, $options: 'i' } } },

          ],

        }
      },

      // lookup comments and get count of comments
      {
        $lookup:
        {
          from: 'comments',
          localField: 'id',
          foreignField: 'boardId',
          as: 'comments'
        }
      },

      { // just get sum of comments
        $addFields: {
          commentCount: { $size: "$comments" }
        }
      },

      {
        $project: {
          _id: 0,
          emailVerified: 0,
          comments: 0,
        }
      },



      
    ])
    .toArray();

}




export async function getResultById(
  _id: string,
): Promise<BoardProps | null> {

  console.log('getResultById  _id: ' + _id);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('surveys');
  
  
  const results = await collection.findOne<BoardProps>(
    { _id: new ObjectId(_id) },
    { projection: { _id: 0, emailVerified: 0 } }
    ////{ projection: { _id: 0, emailVerified: 0 } }
  );
  
  if (results) {
    return {
      ...results,
      //bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}




export async function getResultByUserId(
  _userId: string,
): Promise<BoardProps | null> {

  console.log('getResultByUserId  _email: ' + _userId);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('surveys');

  // search by id
  // latest one

  const results = await collection.find (
    { userId: _userId }
  )
  .sort({ createdAt: -1 })
  .limit(1)
  .toArray() as any;


  console.log('results: ' + results);

  if (results) {
    return {
      ...results[0],
      //bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }




}




export async function getCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notices');
  return await collection.countDocuments();
}



export async function update(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notices');
  return await collection.updateOne({ username }, { $set: { bio } });
}



export async function getOne(id: string): Promise<BoardProps | null> {
  console.log('getOne id: ' + id);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notices');
  const results = await collection.findOne<BoardProps>(
    { id },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    return {
      ...results,
      ///bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}




export async function updateBasic(
  id: string,
  title: string,
  content: string,


  ) {
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notices');
  
    return await collection.updateOne(
      {
        id
      },
      {
        $set:
        {
          title,
          content,
          updatedAt: new Date().toISOString()
  
        }
      }
  
  )}





  export async function getAllByEmail(
    email: string,
    limit: number,
    page: number,
  ): Promise<ResultProps[]> {
  


    console.log('getAllByEmail email: ' + email);


    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notices');
  
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
      .aggregate<ResultProps>([
  
        
        {
          $limit: limit,
          /////$skip: (page - 1) * limit, // skip the first n documents
        },
        {
          $match: {
            email: email
          }
        },
        
        
        //{
        //  $skip: (page - 1) * limit, // skip the first n documents
        //},
        
        //{ $limit : 10 },
        //{ $skip : 2 },
        ///{ projection: { _id: 0, emailVerified: 0 } },
  
  
  
        {
          $group: {
  
            _id: {
              $toLower: { $substrCP: ['$name', 0, 1] }
            },
  
            boards: {
              $push: {
  
                id: '$id',
                createdAt: '$createdAt',
                category: '$category',
                avatar: '$avatar',
                tags: '$tags',
                title: '$title',
                content: '$content',
                scrapCount: '$scrapCount',
                likeCount: '$likeCount',
                commentCount: '$commentCount',
                viewCount: '$viewCount',
  
  
              }
            },
            count: { $sum: 1 }
          }
        },
        
        {
          //sort alphabetically
          $sort: {
            _id: 1
          }
        }
        
      ])
      .toArray();
  
    
  }



/*
          userId: userId,
          email: userEmail,
          name: userName,
          nickname: userNickname,
          avatar: userAvatar,
  
          surveyResult: surveyResult,
          */


/* register board */
export async function registerOne (
  {
    userId,
    userEmail,
    userName,
    userNickname,
    userAvatar,

    surveyResult,


    
  }: {
 
    userId: string,
    userEmail: string,
    userName: string,
    userNickname: string,
    userAvatar: string,

    surveyResult: object,

  }
) {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('surveys');


  // get sequence number and increment it

  ///const id = random(100000, 999999).toString();

  // random 6 digit number
  const id = Math.floor(100000 + Math.random() * 900000).toString();

  
  console.log('survey registerOne id: ' + id);



  const results = await collection.insertOne(
    {

      id: id,
      
      userId: userId,
      userEmail: userEmail,
      userName: userName,
      userNickname: userNickname,
      userAvatar: userAvatar,

      surveyResult: surveyResult,

      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,

    }
  );

  
  // update user's surveyResult
  const userCollection = client.db('doingdoit').collection('users');

  userCollection.updateOne(
    {
      id: userId,
    },
    {
      $set:
      {
        surveyResult: surveyResult,
      }
    }
  );
  
  


  return results;
    

}
  


    
  export async function getBoardById(id: string): Promise<BoardProps | null> {

    console.log('getBoardById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notices');
    
    
    const results = await collection.findOne<BoardProps>(
      { id: id },
      { projection: { _id: 0, emailVerified: 0 } }
      ////{ projection: { _id: 0, emailVerified: 0 } }
    );
  
    
        // view count update
    // if viewCount is null, set 1 else increment 1
    await collection.updateOne(
      {
        id: id,
      },
      {
        $set:
        {
          viewCount: results?.viewCount ? results?.viewCount + 1 : 1,
          updatedAt: new Date().toISOString()
        }
      }
    );
  
    if (results) {
      return {
        ...results,
        //bioMdx: await getMdxSource(results.bio || placeholderBio)
      };
    } else {
      return null;
    }
  }



/* get board by id and previous one by createdAt */
export async function getPrevBoardById(id: string): Promise<BoardProps | null> {
  
    console.log('getPrevBoardById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notices');
    
    
    const results = await collection.findOne<BoardProps>(
      { id: id },
      { projection: { _id: 0, emailVerified: 0 } }
      ////{ projection: { _id: 0, emailVerified: 0 } }
    );
    
    if (results) {

      const prevResults = await collection.findOne<BoardProps>(
        {
          createdAt: { $gt: results.createdAt }
        },
        {
          projection: { _id: 0, emailVerified: 0 },
          sort: { createdAt: 1 }
        }
      );

      console.log('prevResults: ' + prevResults);
      if (prevResults) {
        return {
          ...prevResults,
          //bioMdx: await getMdxSource(results.bio || placeholderBio)
        };
      } else {
        return null;
      }

    }

    return null;
}


/* get board by id and next one by createdAt */
export async function getNextBoardById(id: string): Promise<BoardProps | null> {
  
    console.log('getNextBoardById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notices');
    
    
    const results = await collection.findOne<BoardProps>(
      { id: id },
      { projection: { _id: 0, emailVerified: 0 } }
      ////{ projection: { _id: 0, emailVerified: 0 } }
    );
    
    if (results) {

      const nextResults = await collection.findOne<BoardProps>(
        {
          createdAt: { $lt: results.createdAt }
        },
        {
          projection: { _id: 0, emailVerified: 0 },
          sort: { createdAt: -1 }
        }
      );

      console.log('nextResults: ' + nextResults);
      if (nextResults) {
        return {
          ...nextResults,
          //bioMdx: await getMdxSource(results.bio || placeholderBio)
        };
      } else {
        return null;
      }

    }

    return null;

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
  const collection = client.db('doingdoit').collection('notices');

  const results = await collection.findOne<BoardProps>(
    { id: id },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (results) {

    // like document insert and update each count
    const likeCollection = client.db('doingdoit').collection('notice_likes');

    const likeResults = await likeCollection.findOne(
      {
        boardId: id,
        userId: userId,
      }
    );

    console.log('likeResults: ' + likeResults);
    if (likeResults) {
        
        console.log('likeResults._id: ' + likeResults._id);

        // update like
        await likeCollection.updateOne(
          {
            boardId: id,
            userId: userId,
          },
          {
            $set: {
              boardId: id,
              userId: userId,
              updatedAt: new Date(),
            }
          }
        );

      } else {

        // insert like
        await likeCollection.insertOne(
          {
            boardId: id,
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

    return {
      ...results,
      //bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}
