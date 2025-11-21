import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { S, u } from 'uploadthing/dist/types-e8f81bbc';
import exp from 'constants';


/* mongoDB ojbect id */
import { ObjectId } from 'mongodb';

export interface SurveyProps {


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
  surveys: SurveyProps[];
  totalCount: number;
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
  {
    limit,
    page,
    sort,
    order,
    q,
    startDate,
    endDate,
    userId,
  }: {
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,
    startDate: string,
    endDate: string,
    userId: number,
  }
): Promise<ResultProps> {

  console.log('limit: ' + limit);
  console.log('page: ' + page);
  console.log('sort: ' + sort);
  console.log('order: ' + order);

  
  ///const query = q === null ? '' : q;

  const query = q || '';

  console.log('query: [' + query + ']');


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('surveys');






   const results = await collection
    .aggregate<SurveyProps>([

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


    const totalCount = await collection.countDocuments({
      $or: [
        //{ title: { $regex: query, $options: 'i' } },
        ////{ content: { $regex: query, $options: 'i' } },
        { nickname: { $regex: query, $options: 'i' } },

        // tags array match
        { tags: { $elemMatch: { $regex: query, $options: 'i' } } },

      ],
    });

    return {
      _id: '1',
      surveys: results,
      totalCount: totalCount,
    };
}




export async function getResultById(
  _id: string,
): Promise<SurveyProps | null> {

  console.log('getResultById  _id: ' + _id);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('surveys');
  
  
  const results = await collection.findOne<SurveyProps>(
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
): Promise<SurveyProps | null> {

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



export async function getOne(id: string): Promise<SurveyProps | null> {
  console.log('getOne id: ' + id);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notices');
  const results = await collection.findOne<SurveyProps>(
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
  


    
  export async function getBoardById(id: string): Promise<SurveyProps | null> {

    console.log('getBoardById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notices');
    
    
    const results = await collection.findOne<SurveyProps>(
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
export async function getPrevBoardById(id: string): Promise<SurveyProps | null> {
  
    console.log('getPrevBoardById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notices');
    
    
    const results = await collection.findOne<SurveyProps>(
      { id: id },
      { projection: { _id: 0, emailVerified: 0 } }
      ////{ projection: { _id: 0, emailVerified: 0 } }
    );
    
    if (results) {

      const prevResults = await collection.findOne<SurveyProps>(
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
export async function getNextBoardById(id: string): Promise<SurveyProps | null> {
  
    console.log('getNextBoardById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('notices');
    
    
    const results = await collection.findOne<SurveyProps>(
      { id: id },
      { projection: { _id: 0, emailVerified: 0 } }
      ////{ projection: { _id: 0, emailVerified: 0 } }
    );
    
    if (results) {

      const nextResults = await collection.findOne<SurveyProps>(
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

  const results = await collection.findOne<SurveyProps>(
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


/* mysql version
export async function getStatsAll(
  {
    limit,
    page,
    sort,
    order,
    q,
    startDate,
    endDate,
  }: {
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,
    startDate: string,
    endDate: string,
  }
): Promise<any> {

  console.log('getStatsAll');

  if (!sort) {
    sort = 'createdAt';
  }

  if (!order) {
    order = 'desc';
  }

  console.log("limit: " + limit);
  console.log("page: " + page);



  if (!startDate) {
    startDate = '2022-01-01';
  }

  if (!endDate) {
    endDate = new Date().toISOString();
  }

  const startDateTime = new Date(new Date(startDate).getTime() ).toISOString();

  const endDateTime = new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000 - 1).toISOString(); // + 23h 59m 59s

  console.log('startDateTime: ' + startDateTime);

  console.log('endDateTime: ' + endDateTime);

  const connection = await connect();


 

  try {

    // get daily stats from surveys
    // if day and day is not exist, add date and count 0
    // if daily stats is exist, return date and count
    // if dauly stats is not exist, add date and count 0


    // get list of endDateTime to startDateTime
    // if between startDatetime and endDateTime  is not exist, add date and count 0
    // limit, page

    const listDay = [] as any;

    const start = new Date(endDate);
    const end = new Date(startDate);

    let loop = new Date(start);

    while(loop >= end) {
      listDay.push(new Date(loop).toISOString().split('T')[0]);
      loop.setDate(loop.getDate() - 1);
    }

    console.log('listDay: ' + listDay);


    // get daily stats from surveys using listDay
    // limit, page
    // limit is count per page, page is current page number


    const result = [] as any;


    // check flag for all async function to be finished

    let flag = 0;

    listDay.forEach(async (date: string) => {

      // limit is count per page, page is current page number

      if (
        listDay.indexOf(date) >= limit * (page - 1) &&
        listDay.indexOf(date) < limit * page
      ) {

        ///console.log('date: ' + date);

        const query = `
        SELECT COUNT(*) as count
        FROM surveys
        WHERE
        createdAt BETWEEN ? AND ?`;

        const values = [
          (new Date(date).toISOString() ),
          (new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000 - 1).toISOString() )

        ];

        const [rows, fields] = await connection.query(query, values) as any;

        ///console.log('rows[0].count: ' + rows[0].count);

        // sequenceNumber is descending order

        result.push(
          {
            sequenceNumber:  listDay.length - listDay.indexOf(date),
            date: date,
            count: rows[0].count
          }
        );

      } else {


          
        ///console.log('date: ' + date + ' is not exist');
      }

      flag++;

    } );
      

      







    // get total count
    const totalCount = listDay.length;



    connection.release();



    // check flag for all async function to be finished

    while (flag < listDay.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }



    ///console.log('result: ' + JSON.stringify(result));






    // return date, count

    if (result) {

      return {
        data: result,
        totalCount: totalCount,
      };

    } else {

      return null;
    }

  } catch (error) {

    connection.release();

    console.log(error);

    return null;
  }

      
}

*/

/* convert mysql version to mongodb version */
export async function getStatsAll(
  data: {
    limit: number,
    page: number,
    sort: string,
    order: string,
    q: string,
    startDate: string,
    endDate: string,
  }
): Promise<any> {

  console.log('getStatsAll mongodb version');

  const {
    limit,
    page,
    sort,
    order,
    q,
    startDate,
    endDate,
  } = data;

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('surveys');
  console.log("limit: " + limit);
  console.log("page: " + page);
  console.log("startDate: " + startDate);
  console.log("endDate: " + endDate);
  console.log("sort: " + sort);
  console.log("order: " + order);
  console.log("q: " + q);
  // get list of dates between startDate and endDate
  const listDay = [] as any;

  const start = new Date(endDate);
  const end = new Date(startDate);

  let loop = new Date(start);

  while(loop >= end) {
    listDay.push(new Date(loop).toISOString().split('T')[0]);
    loop.setDate(loop.getDate() - 1);
  }

  console.log('listDay: ' + listDay);

  const result = [] as any;

  // check flag for all async function to be finished

  let flag = 0;

  for (const date of listDay) {

    // limit is count per page, page is current page number

    if (
      listDay.indexOf(date) >= limit * (page - 1) &&
      listDay.indexOf(date) < limit * page
    ) {

      const count = await collection.countDocuments(
        {
          createdAt: {
            $gte: new Date(date),
            $lte: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000 - 1)
          }
        }
      );

      console.log('date: ' + date + ' count: ' + count);

      result.push(
        {
          sequenceNumber:  listDay.length - listDay.indexOf(date),
          date: date,
          count: count
        }
      );

    } else {

      ///console.log('date: ' + date + ' is not exist');
    }

    flag++;

  }
  

  // get total count
  const totalCount = listDay.length;

  // check flag for all async function to be finished

  while (flag < listDay.length) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  ///console.log('result: ' + JSON.stringify(result));

  // return date, count

  if (result) {

    return {
      data: result,
      totalCount: totalCount,
    };

  } else {

    return null;
  }

      
}
