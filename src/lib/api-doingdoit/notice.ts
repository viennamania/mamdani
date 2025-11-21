import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { S, u } from 'uploadthing/dist/types-e8f81bbc';

import pool, {connect, query} from '@/config/db';



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


export async function getAll({
  limit,
  page,
  sort,
  order,
  q,
  startDate,
  endDate,
 } : {
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
  startDate: string,
  endDate: string,
}): Promise<ResultProps> {


  // boards join users

  if (!sort) {
    sort = 'createdAt';
  }

  if (!order) {
    order = 'desc';
  }

  
  if (startDate === '') {
    startDate = '2000-01-01';
  }

  if (endDate === '') {
    endDate = '2099-12-31';
  }

  console.log('getAll q: ' + q);
  console.log('getAll sort: ' + sort);
  console.log('getAll order: ' + order);

  console.log('getAll startDate: ' + startDate);
  console.log('getAll endDate: ' + endDate);


    const startDateTime = new Date(new Date(startDate).getTime() ).toISOString();
 
    const endDateTime = new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000 - 1).toISOString(); // + 23h 59m 59s


    const connection = await connect();

    try {

      const query = `
      SELECT
      notices.sequenceNumber, 
      notices.id, notices.userId, notices.title, notices.content, notices.images, notices.tags, notices.isTop, notices.createdAt, notices.updatedAt, notices.viewCount,
      users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
      FROM notices
      LEFT JOIN users ON notices.userId = users.id
      WHERE
      notices.createdAt >= ? AND notices.createdAt <= ?

      AND notices.title LIKE ? 

      ORDER BY notices.isTop DESC, notices.createdAt DESC
      LIMIT ?, ?
      `;
      
      const values = [
        startDateTime, endDateTime,
        `%${q}%`, (page - 1) * limit, limit];


      const [rows, fields] = await connection.query(query, values) as any;


      const queryCount = `
      SELECT
      COUNT(*) as totalCount
      FROM notices
      LEFT JOIN users ON notices.userId = users.id
      WHERE
      notices.createdAt >= ? AND notices.createdAt <= ?
      
      AND notices.title LIKE ?

      LIMIT ?, ?
      `;

      const valuesCount = [
        startDateTime, endDateTime,
        `%${q}%`, (page - 1) * limit, limit];

      const [rowsCount, fieldsCount] = await connection.query(queryCount, valuesCount) as any;

      connection.release();

      if (rows) {
        return (
          {
            _id: '1',
            boards: rows,
            totalCount: rowsCount[0].totalCount,
          }
        )
      } else {
        return (
          {
            _id: '1',
            boards: [],
            totalCount: 0,
          }
        )
      }


    } catch (error) {
          
      connection.release();

      console.error('getAll error: ', error);
      return (
        {
          _id: '1',
          boards: [],
          totalCount: 0,
        }
      )
    }

}



/*
export async function getCount(

): Promise<number> {



  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notices');
  return await collection.countDocuments();
}
*/

/* get count */
export async function getCount(
  q: string,
): Promise<number> {


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notices');



  const result = await collection.aggregate([
      {
          $match: {
            $or: [
              { title: { $regex: q, $options: 'i' } },
              { content: { $regex: q, $options: 'i' } },

            ],
          }
      },
      {
          $count: 'count',
      },
  ]).toArray();

  return result[0]?.count || 0;

}




export async function update(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notices');
  return await collection.updateOne({ username }, { $set: { bio } });
}





export async function getOne(
  id: number
): Promise<BoardProps | null> {
  console.log('getOne id: ' + id);

  /*
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
  */

  const connection = await connect();

  try {
      
      const query = `
      SELECT
      notices.sequenceNumber,
      notices.id, notices.userId, notices.title, notices.content, notices.images, notices.tags, notices.isTop, notices.createdAt, notices.updatedAt, notices.viewCount,
      users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
      FROM notices
      LEFT JOIN users ON notices.userId = users.id
      WHERE
      notices.id = ?
      `;
      
      const values = [id];
  
      const [rows, fields] = await connection.query(query, values) as any;
  
      connection.release();
  
      if (rows) {
        return (
          {
            ...rows[0],
          }
        )
      } else {
        return null;
      }
  
    } catch (error) {
        
      connection.release();
  
      console.error('getOne error: ', error);
      return null;
    }

}





// updateOne
export async function updateOne(
  {
    id,
    title,
    content,
    images,
    tags,
    category,
    isTop,
  }: {
    id: string,
    title: string,
    content: string,
    images: string[],
    tags: string[],
    category: string,
    isTop: string,
  }
) {

  /*
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
        images,
        tags,
        category,
        isTop,
        updatedAt: new Date().toISOString()

      }
    }

  )
  */

  const connection = await connect();

  try {

    const query = `
    UPDATE notices
    SET title = ?, content = ?, images = ?, isTop = ?, updatedAt = ?
    WHERE id = ?
    `;

    const values = [title, content, JSON.stringify(images), isTop, new Date(), id];

    const [rows, fields] = await connection.query(query, values) as any;


    // update sequenceNumber of notices table order by isTop DESC, createdAt DESC

    const query2 = `
    SELECT id FROM notices
    ORDER BY isTop DESC, createdAt DESC
    `;
    const value2 = [] as any;

    const [rowsBoard, fieldBoard ] = await connection.query(query2, value2) as any;

    for (let i = 0; i < rowsBoard.length; i++) {

      // update sequence number
      const query = `
      UPDATE notices SET sequenceNumber = ? WHERE id = ?
      `;
      const values = [
          rowsBoard.length - i,
        rowsBoard[i].id
      ];

      await connection.query(query, values);

    }



    connection.release();

    if (rows) {
      return (
        {
          updatedId: id,
        }
      )
    } else {
      return null;
    }

 
  } catch (error) {

    connection.release();

    console.error('updateOne error: ', error);
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






/* register board */
export async function registerOne (
  {
    userId,
    userEmail,
    userName,
    userNickname,
    userAvatar,

    title,
    content,

    images,

    tags,
    category,

    isTop,


    
  }: {
 
    userId: string,
    userEmail: string,
    userName: string,
    userNickname: string,
    userAvatar: string,

    title: string,
    content: string,

    images: string[],

    tags: string[],
    category: string,

    isTop: string,

  }
) {



    // insert notices table
    const connection = await connect();

    try {

      const query = `
      INSERT INTO notices 
      (userId, title, content, images, isTop, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [userId, title, content, JSON.stringify(images), isTop, new Date(), new Date()];
  
      const [rows, fields] = await connection.query(query, values) as any;



    // update sequenceNumber of notices table order by isTop DESC, createdAt DESC

    const query2 = `
    SELECT id FROM notices
    ORDER BY isTop DESC, createdAt DESC
    `;
    const value2 = [] as any;

    const [rowsBoard, fieldBoard ] = await connection.query(query2, value2) as any;

    for (let i = 0; i < rowsBoard.length; i++) {

      // update sequence number
      const query = `
      UPDATE notices SET sequenceNumber = ? WHERE id = ?
      `;
      const values = [
          rowsBoard.length - i,
        rowsBoard[i].id
      ];

      await connection.query(query, values);

    }

  
      connection.release();
  
      if (rows) {
        return (
          {
            insertedId: rows.insertId,
          }
        )
      } else {
        return null;
      }
  
    } catch (error) {
        
      connection.release();
  
      console.error('registerOne error: ', error);
      return null;
    }
  
  



  }
  


    
  export async function getBoardById(
    id: number
  ): Promise<BoardProps | null> {

    console.log('getBoardById  id: ' + id);
  
    /*
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
    */

    const connection = await connect();

    try {
        
        const query = `
        SELECT 
        notices.id, notices.userId, notices.title, notices.content, notices.images, notices.tags, notices.isTop, notices.createdAt, notices.updatedAt, notices.viewCount,
        users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
        FROM notices
        LEFT JOIN users ON notices.userId = users.id
        WHERE
        notices.id = ?
        `;
        
        const values = [id];
    
        const [rows, fields] = await connection.query(query, values) as any;
    
        connection.release();
    
        if (rows) {
          return (
            {
              ...rows[0],
            }
          )
        } else {
          return null;
        }
    
      } catch (error) {
            
        connection.release();
    
        console.error('getBoardById error: ', error);
        return null;
      }



  }



/* get board by id and previous one by createdAt */
export async function getPrevBoardById(
  id: number
): Promise<BoardProps | null> {
  
    console.log('getPrevBoardById  id: ' + id);

    const connection = await connect();

    try {

      // sort by createdAt desc and previous one by createdAt asc

      const query = `
      SELECT
      notices.id, notices.userId, notices.title, notices.content, notices.images, notices.tags, notices.isTop, notices.createdAt, notices.updatedAt, notices.viewCount,
      users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
      FROM notices
      LEFT JOIN users ON notices.userId = users.id
      WHERE
      notices.id = ?
      `;

      const values = [id];

      const [rows, fields] = await connection.query(query, values) as any;

      if (rows) {
        const queryPrev = `
        SELECT
        notices.id, notices.userId, notices.title, notices.content, notices.images, notices.tags, notices.isTop, notices.createdAt, notices.updatedAt, notices.viewCount,
        users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
        FROM notices
        LEFT JOIN users ON notices.userId = users.id
        WHERE
        notices.createdAt > ?
        ORDER BY notices.createdAt ASC
        LIMIT 1
        `;

        const valuesPrev = [rows[0].createdAt];

        const [rowsPrev, fieldsPrev] = await connection.query(queryPrev, valuesPrev) as any;

        connection.release();

        if (rowsPrev) {
          return (
            {
              ...rowsPrev[0],
            }
          )
        } else {
          return null;
        }

      } else {
        return null;

      }
      
    } catch (error) {

      connection.release();

      console.error('getPrevBoardById error: ', error);
      return null;
    }


  
}


/* get board by id and next one by createdAt */
export async function getNextBoardById(
  id: number
) : Promise<BoardProps | null>
{
  
    console.log('getNextBoardById  id: ' + id);
  
    /*
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
    */

    const connection = await connect();

    try {

      // sort by createdAt desc and next one by createdAt asc

      const query = `
      SELECT
      notices.id, notices.userId, notices.title, notices.content, notices.images, notices.tags, notices.isTop, notices.createdAt, notices.updatedAt, notices.viewCount,
      users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
      FROM notices
      LEFT JOIN users ON notices.userId = users.id
      WHERE
      notices.id = ?
      `;

      const values = [id];

      const [rows, fields] = await connection.query(query, values) as any;

      if (rows) {
        const queryNext = `
        SELECT
        notices.id, notices.userId, notices.title, notices.content, notices.images, notices.tags, notices.isTop, notices.createdAt, notices.updatedAt, notices.viewCount,
        users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
        FROM notices
        LEFT JOIN users ON notices.userId = users.id
        WHERE
        notices.createdAt < ?
        ORDER BY notices.createdAt DESC
        LIMIT 1
        `;

        const valuesNext = [rows[0].createdAt];

        const [rowsNext, fieldsNext] = await connection.query(queryNext, valuesNext) as any;

        connection.release();

        if (rowsNext) {
          return (
            {
              ...rowsNext[0],
            }
          )
        } else {
          return null;
        }

      } else {
        return null;
      }


    } catch (error) {
        
      connection.release();

      console.error('getNextBoardById error: ', error);
      return null;
    }

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






/* delete one */
export async function deleteOne(
  id: number,
): Promise<any> {

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('notices');




  return await collection.deleteOne({
      id: id,
  });
  */

  const connection = await connect();

  try {
      
      const query = `
      DELETE FROM notices
      WHERE id = ?
      `;
      
      const values = [id];
  
      const [rows, fields] = await connection.query(query, values) as any;
  
      connection.release();
  
      if (rows) {
        return (
          {
            deletedId: id,
          }
        )
      } else {
        return null;
      }
  
    } catch (error) {
        
      connection.release();
  
      console.error('deleteOne error: ', error);
      return null;
    }

}