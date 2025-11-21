import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { S, u } from 'uploadthing/dist/types-e8f81bbc';
import { Interface } from 'readline';
import { contentFieldToContent } from 'uploadthing/client';

// object id
import { ObjectId } from 'mongodb';

import pool, {connect, query} from '@/config/db';
import { tr } from '@faker-js/faker';
import CogSolidIcon from '@/components/icons/cog-solid';


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

  likeYn: boolean;


}


export interface ResultProps {
  _id: string;
  boards: BoardProps[];
  totalCount: number;
}

/*
export interface ResultProps {
  _id: string;
  boards: BoardProps[];
}
*/


export interface TagProps {
  name: string;
  count: number;
}

export interface TagResultProps {
  _id: string;
  tags: TagProps[];
  totalCount: number;
}


export interface ReplyProps { 

  id: string;
  boardId: string;
  commentId: string;
  userId: string;
  userEmail: string;
  userNickname: string;
  userAvatar: string;

  content: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;

}

export interface CommentProps {
  
  id: string;
  boardId: string;
  userId: string;
  userEmail: string;
  userNickname: string;
  userAvatar: string;

  content: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;

  replies: ReplyProps[];
  replyCount: number;

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





  const startDateTime = new Date(new Date(startDate).getTime() ).toISOString();
 
  //const endDateTime = new Date(new Date(endDate).getTime() + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000).toISOString(); // + 23h 59m 59s
  const endDateTime = new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000 - 1).toISOString(); // + 23h 59m 59s




  const connection = await connect();

  try {




    const query = `
    SELECT

    a.id AS id, a.title AS title, a.content AS content, a.images AS images, a.tags AS tags, a.category AS category, a.createdAt AS createdAt, a.updatedAt AS updatedAt, a.deletedAt AS deletedAt, a.viewCount AS viewCount
    , b.id AS userId, b.email AS userEmail, b.name AS userName, b.nickname AS userNickname, b.avatar AS userAvatar

    , (SELECT COUNT(*) FROM comments WHERE boardId = a.id) AS commentCount
    
    
    
    , (SELECT COUNT(*) FROM comment_replies WHERE boardId = a.id  ) AS replyCount



    , (SELECT COUNT(*) FROM likes WHERE boardId = a.id) AS likeCount

    FROM boards AS a LEFT JOIN users AS b ON a.userId = b.id

    WHERE
    
    a.createdAt BETWEEN ? AND ?

    AND (
      a.title LIKE ?
    
      OR JSON_EXTRACT(tags, '$') LIKE ?

      OR (SELECT nickname FROM users WHERE id = userId) LIKE ?
    )
    ORDER BY a.${sort} ${order}

    LIMIT ?, ?
    `;

    //console.log('query: ' + query); 

    

    // startDate and endDate is UTC time, so add 9 hours for korean time

    const values = [
      
      startDateTime, endDateTime,

      `%${q}%`,  `%${q}%`, `%${q}%`,
      (page - 1) * limit, limit
    ];


    const [rows, fields] = await connection.query(query, values) as any;

    

    const queryTotalCount = `
    SELECT COUNT(*) AS count FROM boards
    WHERE
    createdAt BETWEEN ? AND ?
    AND (
      title LIKE ?

      OR JSON_EXTRACT(tags, "$") LIKE ?

      OR (SELECT nickname FROM users WHERE id = userId) LIKE ?
    )
    `;

    const valuesTotalCount = [
      
      startDateTime, endDateTime,

      `%${q}%`,  `"%${q}%"`, `%${q}%`
    ];

    const [rows2, fields2] = await connection.query(queryTotalCount, valuesTotalCount) as any;


    connection.release();

    if (rows) {
      return (
        {
          _id: '1',
          boards: rows,
          totalCount: rows2[0].count,
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








// get total count
export async function getAllCount(
  q: string,
) {
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('boards');


      const query = q || '';
  
      const results = await collection.countDocuments(

        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
            { nickname: { $regex: query, $options: 'i' } },
          ],

        }

      );
  
      return results;
  }











export async function getTop(

  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,

///): Promise<ResultProps[]> {

): Promise<BoardProps[]> {

 
    const connection = await connect();

    try {

      const query = `
      SELECT
  
      a.id AS id, a.title AS title, a.content AS content, a.images AS images, a.tags AS tags, a.category AS category, a.createdAt AS createdAt, a.updatedAt AS updatedAt, a.deletedAt AS deletedAt, a.viewCount AS viewCount
      , b.id AS userId, b.email AS userEmail, b.name AS userName, b.nickname AS userNickname, b.avatar AS userAvatar
  
      FROM boards AS a LEFT JOIN users AS b ON a.userId = b.id
      WHERE a.title LIKE ?
  
  
      ORDER BY a.viewCount DESC
  
  
  
      LIMIT ? OFFSET ?
      `;

      const values = [`%${q}%`, limit, (page - 1) * limit];


      const [rows, fields] = await connection.query(query, values) as any;

      connection.release();

      if (rows) {
        return rows;
      } else {
        return [];
      }


    } catch (error) {
            
      connection.release();
  
      console.error('getTop error: ', error);
      return [];
    }

}






/* get count */
export async function getCount(
  email: string,
  q: string,
): Promise<number> {


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('boards');


  const result = await collection.aggregate([
      {
          $match: {
            $or: [
              { title: { $regex: q, $options: 'i' } },
              ////{ content: { $regex: query, $options: 'i' } },
              { nickname: { $regex: q, $options: 'i' } },

              // tags array match
              { tags: { $elemMatch: { $regex: q, $options: 'i' } } },

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
  const collection = client.db('doingdoit').collection('boards');
  return await collection.updateOne({ username }, { $set: { bio } });
}



export async function getOne(id: string): Promise<BoardProps | null> {
  console.log('getOne id: ' + id);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('boards');
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
    const collection = client.db('doingdoit').collection('boards');
  
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





  export async function getAllByUserId(
    {
      userId,
      limit,
      page,
      sort,
      order,
      q,
    }: {
      userId: string,
      limit: number,
      page: number,
      sort: string,
      order: string,
      q: string,
    }
 
  ): Promise<ResultProps> {
  

    if (!sort) {
      sort = 'createdAt';
    }

    if (!order) {
      order = 'desc';
    }




    // get boards by userId and limit and page and sort and order and q
    // join users and get count of comments and replies
    // get total count

    const connection = await connect();

    try {

      const query = `
      SELECT
      a.id AS id, a.title AS title, a.content AS content, a.images AS images, a.tags AS tags, a.category AS category, a.createdAt AS createdAt, a.updatedAt AS updatedAt, a.viewCount AS viewCount
      , b.id AS userId, b.email AS userEmail, b.name AS userName, b.nickname AS userNickname, b.avatar AS userAvatar
      , (SELECT COUNT(*) FROM comments WHERE boardId = a.id) AS commentCount
      , (SELECT COUNT(*) FROM comment_replies WHERE boardId = a.id) AS replyCount
      FROM boards AS a LEFT JOIN users AS b ON a.userId = b.id
      WHERE a.userId = ?
      AND a.title LIKE ?
      OR json_contains(tags, JSON_ARRAY(?))
      ORDER BY a.${sort} ${order}
      LIMIT ?, ?
      `;

      const values = [userId, `%${q}%`, `"%${q}%"`, (page - 1) * limit, limit];

      const [rows, fields] = await connection.query(query, values) as any;

      const [totalCount, fieldsTotalCount  ] = await connection.query(
        `
        SELECT COUNT(*) AS count FROM boards
        WHERE userId = ?
        AND title LIKE ?
        OR json_contains(tags, JSON_ARRAY(?))
        `,
        [userId, `%${q}%`, `"%${q}%"`]
      ) as any;

      connection.release();

      if (rows) {
        return (
          {
            _id: '1',
            boards: rows,
            totalCount: totalCount[0].count,
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
  
      console.error('getAllByEmail error: ', error);
      return (
        {
          _id: '1',
          boards: [],
          totalCount: 0,
        }
      )

    }

  
  }



  // get total count
  export async function getAllByEmailCount(
    email: string,
    q: string,
  ) {
      
      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('boards');


      const query = q === null ? '' : q;
  
      const results = await collection.countDocuments(

        {
          email: email,
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
          ],
        }
 

      );
  
      return results;
  }





/* register board */
export async function registerOne (
  {
    userId,
    title,
    content,
    images,
    tags,

  }: {
 
    userId: number,
    userEmail: string,
    userName: string,
    userNickname: string,
    userAvatar: string,

    title: string,
    content: string,

    images: string[],

    tags: string[],
    category: string,

  }
) {


  // encode title, content

  //const titleEncoded = encodeURIComponent(title);
  //const contentEncoded = encodeURIComponent(content);

  // images is array of string, convert to json type for query string
  
  const jsonImages =  JSON.stringify(images);
  const jsonTags = JSON.stringify(tags);





  const connection = await connect();

  try {

    const query = `
    INSERT INTO boards 
    (userId, title, content, images, tags, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    //const values = [userId, titleEncoded, contentEncoded, jsonImages, jsonTags, new Date(), new Date()];




    const values = [userId, title, content, jsonImages, jsonTags, new Date(), new Date()];

    const [rows, fields] = await connection.query(query, values) as any;




     // get point value from boardLike field of setup table and insert points (point history table)


     /*
     const setupQuery = `
     SELECT boardPost FROM setups WHERE name = 'point'
     `;
     const setupValues = [] as any;

     const [setupRows, setupFields] = await connection.query(setupQuery, setupValues) as any;

     if (setupRows[0]) {

        const point = setupRows[0].boardPost;

        console.log('point: ' + point);

        if (point > 0) {

          const pointQuery = `
          INSERT INTO points
          (userId, point, title, createdAt) 
          VALUES (?, ?, ?, ?)
          `;
          const pointValues = [userId, point, 'boardPost', new Date()];

          await connection.query(pointQuery, pointValues);

        }

     }
     */

     // get point value from point_category

      const pointQuery = `
      SELECT point FROM point_category WHERE category = ?
      `;
      const pointValues = ['boardPost'];

      const [pointRows, pointFields] = await connection.query(pointQuery, pointValues) as any;

      if (pointRows[0]) {

        const point = pointRows[0].point;

        console.log('point: ' + point);

        if (point > 0) {

          const pointQuery = `
          INSERT INTO points
          (userId, point, title, createdAt) 
          VALUES (?, ?, ?, ?)
          `;
          const pointValues = [userId, point, 'boardPost', new Date()];

          await connection.query(pointQuery, pointValues);

        }

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






/* update board */
export async function updateOne (
  {
    id,

    title,
    content,

    images,

    tags,


    
  }: {
 
    id: string,

    title: string,
    content: string,

    images: string[],

    tags: string[],

  }
) {




    const  connection = await connect();

    try {

      const query = `
      UPDATE boards 
      SET title = ?, content = ?, images = ?, tags = ?, updatedAt = ?
      WHERE id = ?
      `;
      const values = [title, content, JSON.stringify(images), JSON.stringify(tags), new Date(), id];

      const [rows, fields] = await connection.query(query, values) as any;

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
  


    
  export async function getBoardById(
    id: number,
    userId: number,
  ): Promise<BoardProps | null> {


    console.log('getBoardById  id: ' + id);
    console.log('getBoardById  userId: ' + userId);
  


    if (isNaN(id) && !id) {
      return null;
    }
    if (isNaN(userId) && !userId) {
      return null;
    }
    

    const connection = await connect();

    try {


      // join likes and count likes and check userId is exist in likes table and get likeYn

      // get comments count and replies count

      if (userId) {

        const query = `
        SELECT
        a.id AS id, a.title AS title, a.content AS content, a.images AS images, a.tags AS tags, a.category AS category, a.createdAt AS createdAt, a.updatedAt AS updatedAt, a.deletedAt AS deletedAt, a.viewCount AS viewCount
        , b.id AS userId, b.email AS userEmail, b.name AS userName, b.nickname AS userNickname, b.avatar AS userAvatar
        , COUNT(c.id) AS likeCount
        , (SELECT COUNT(*) FROM likes WHERE boardId = ? AND userId = ?) AS likeYn

        , (SELECT COUNT(*) FROM comments WHERE boardId = ?) AS commentCount
        , (SELECT COUNT(*) FROM comment_replies WHERE boardId = ?) AS replyCount

        FROM boards AS a LEFT JOIN users AS b ON a.userId = b.id LEFT JOIN likes AS c ON a.id = c.boardId
        WHERE a.id = ?
        LIMIT 1
        `;
        const values = [id, userId, id, id, id];


        const [rows, fields] = await connection.query(query, values) as any;


        // boards viewCount update
        // if viewCount is null, set 1 else increment 1

        const viewCountQuery = `
        UPDATE boards
        SET viewCount = viewCount + 1
        WHERE id = ?
        `;
        const viewCountValues = [id];

        await connection.query(viewCountQuery, viewCountValues);


        connection.release();

        if (rows) {
          return rows[0];
        } else {
          return null;
        }

      } else {
          
          const query = `
          SELECT
          a.id AS id, a.title AS title, a.content AS content, a.images AS images, a.tags AS tags, a.category AS category, a.createdAt AS createdAt, a.updatedAt AS updatedAt, a.deletedAt AS deletedAt, a.viewCount AS viewCount
          , b.id AS userId, b.email AS userEmail, b.name AS userName, b.nickname AS userNickname, b.avatar AS userAvatar
          , (SELECT COUNT(*) FROM likes WHERE boardId = ?) AS likeCount

          , (SELECT COUNT(*) FROM comments WHERE boardId = ?) AS commentCount
          , (SELECT COUNT(*) FROM comment_replies WHERE boardId = ?) AS replyCount

          FROM boards AS a LEFT JOIN users AS b ON a.userId = b.id
          WHERE a.id = ?
          LIMIT 1
          `;
          const values = [id, id, id, id];

          const [rows, fields] = await connection.query(query, values) as any;

          connection.release();

          if (rows) {
            return rows[0];
          } else {
            return null;
          }

      }


      

    } catch (error) {
          
       connection.release();
    
      console.error('getBoardById error: ', error);
      return null;
    }


    



  }




  
// like 
export async function like(
  id: number,
  userId: string,

) {

  console.log('like id: ' + id);
  console.log('like userId: ' + userId);


  const connection = await connect();

  try {


    // check duplicate like
    const likeQuery = `
    SELECT * FROM likes
    WHERE boardId = ? AND userId = ?
    `;
    const likeValues = [id, userId];

    const [likeRows, likeFields] = await connection.query(likeQuery, likeValues) as any;


    console.log('likeRows: ' + likeRows.length);

    if (likeRows.length > 0) {
      return null;
    }



    const query = `
    INSERT INTO likes 
    (boardId, userId, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?)
    `;
    const values = [id, userId, new Date(), new Date()];
    const [rows, fields] = await connection.query(query, values) as any;


    // get point value from point_category

    const pointQuery = `
    SELECT point FROM point_category WHERE category = ?
    `;
    const pointValues = ['boardLike'];

    const [pointRows, pointFields] = await connection.query(pointQuery, pointValues) as any;

    if (pointRows[0]) {

      const point = pointRows[0].point;

      console.log('point: ' + point);

      if (point > 0) {

        const pointQuery = `
        INSERT INTO points
        (userId, point, title, createdAt) 
        VALUES (?, ?, ?, ?)
        `;
        const pointValues = [userId, point, 'boardLike', new Date()];

        await connection.query(pointQuery, pointValues);

      }

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

    console.error('like error: ', error);
    return null;
  }




}



// unlike 
export async function unlike(
  id: number,
  userId: number,
) {

  const connection = await connect();

  try {

    const query = `
    DELETE FROM likes 
    WHERE boardId = ? AND userId = ?
    `;
    const values = [id, userId];

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

      console.error('unlike error: ', error);
      return null;
    }



    
}












export async function registerComment (
  {
    boardId,
    userId,
    content,

    
  }: {
  
    boardId: string,
    userId: string,
    content: string,

  }
) {
  
  
    const connection = await connect();

    try {

      const query = `
      INSERT INTO comments
      (boardId, userId, content, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?)
      `;
      const values = [boardId, userId, content, new Date(), new Date()];

      const [rows, fields] = await connection.query(query, values) as any;


      // if comment insert success, insert notification record to notifications table for owner of board
      const notificationQuery = `
      INSERT INTO notifications
      (userId, boardId, commentUserId, commentId, createdAt, readYn)
      SELECT
      a.userId AS userId, b.boardId AS boardId, b.userId AS commentUserId, b.id AS commentId, ? AS createdAt, 'N' AS readYn
      FROM boards AS a, comments AS b
      WHERE a.id = ? AND b.id = ?
      `;
    

      /*
      const notificationQuery = `
      INSERT INTO notifications
      (userId, boardId, boardTitle, commentUserId, commentId, createdAt, readYn)
      SELECT
      a.id AS userId, b.id AS boardId, b.title AS boardTitle, c.userId AS commentUserId, c.id AS commentId, ? AS createdAt, 'N' AS readYn
      FROM users AS a, boards AS b, comments AS c
      WHERE b.id = ? AND c.id = ?
      `;
      */
      

      const notificationValues = [new Date(), boardId, rows.insertId];




      // await connection.query(notificationQuery, notificationValues);
      const [notificationRows, notificationFields] = await connection.query(notificationQuery, notificationValues) as any;

      console.log('notificationRows: ' + notificationRows);






      // get point value from boardLike field of setup table and insert points (point history table)
      /*
      const setupQuery = `
      SELECT boardComment FROM setups WHERE name = 'point'
      `;
      const setupValues = [] as any;

      const [setupRows, setupFields] = await connection.query(setupQuery, setupValues) as any;

      if (setupRows[0]) {

        const point = setupRows[0].boardComment;

        console.log('point: ' + point);

        if (point > 0) {

          const pointQuery = `
          INSERT INTO points
          (userId, point, title, createdAt) 
          VALUES (?, ?, ?, ?)
          `;
          const pointValues = [userId, point, 'boardComment', new Date()];

          await connection.query(pointQuery, pointValues);

        }

      }
      */


     // get point value from point_category

      const pointQuery = `
      SELECT point FROM point_category WHERE category = ?
      `;
      const pointValues = ['boardComment'];

      const [pointRows, pointFields] = await connection.query(pointQuery, pointValues) as any;

      if (pointRows[0]) {

        const point = pointRows[0].point;

        console.log('point: ' + point);

        if (point > 0) {

          const pointQuery = `
          INSERT INTO points
          (userId, point, title, createdAt) 
          VALUES (?, ?, ?, ?)
          `;
          const pointValues = [userId, point, 'boardComment', new Date()];

          await connection.query(pointQuery, pointValues);

        }

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

      console.error('registerComment error: ', error);
      return null;
    }

}








  export async function updateComment (
    {
      commentId,
      content,
  
      
    }: {
   
      commentId: number,
      content: string,
  
    }
  ) {
  
  
  
    /*
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('comments');
  
  
    const results = await collection.updateOne(
      {
        id: commentId,
      },
      {
        $set:
        {
          content,
          updatedAt: new Date().toISOString()
  
        }
      }
    );
      */

    const connection = await connect();

    try {
        
        const query = `
        UPDATE comments 
        SET content = ?, updatedAt = ?
        WHERE id = ?
        `;
        const values = [content, new Date(), commentId];
  
        const [rows, fields] = await connection.query(query, values) as any;
  
        connection.release();
  
        if (rows) {
          return (
            {
              updatedId: commentId,
            }
          )
        } else {
          return null;
        }

    } catch (error) {
          
        connection.release();
    
        console.error('updateComment error: ', error);
        return null;
      }



  
  }






  export async function getCommentByBoardId(
    boardId: number,
  ): Promise<CommentProps[]> {

    console.log('getCommentByBoardId boardId: ' + boardId);

    

    const connection = await connect();

    try {


      // get comments and replies

      /*
      const query = `
      SELECT

      a.id AS id, a.boardId AS boardId, a.userId AS userId, a.content AS content, a.createdAt AS createdAt, a.updatedAt AS updatedAt
      , b.id AS userId, b.email AS userEmail, b.name AS userName, b.nickname AS userNickname, b.avatar AS userAvatar
      
      , (SELECT COUNT(*) FROM comment_replies WHERE commentId = a.id) AS replyCount
      , 
      (SELECT 
        JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'boardId', c.boardId, 'commentId', c.commentId, 'userId', c.userId, 'content', c.content, 'createdAt', c.createdAt, 'updatedAt', c.updatedAt)
        )
        FROM comment_replies AS c WHERE c.commentId = a.id
      ) AS replies

      FROM comments AS a LEFT JOIN users AS b ON a.userId = b.id
      WHERE a.boardId = ?
      ORDER BY a.createdAt DESC
      LIMIT 100
      `;
      */


      // comments join users
      // commnet_replies join users

      const query = `
      SELECT

      a.id AS id, a.boardId AS boardId, a.userId AS userId, a.content AS content, a.createdAt AS createdAt, a.updatedAt AS updatedAt
      , b.id AS userId, b.email AS userEmail, b.name AS userName, b.nickname AS userNickname, b.avatar AS userAvatar

  
      , (SELECT COUNT(*) FROM comment_replies WHERE commentId = a.id) AS replyCount
      ,
      (SELECT 
        JSON_ARRAYAGG(
          
      
          JSON_OBJECT('id', c.id, 'boardId', c.boardId, 'commentId', c.commentId, 'userId', c.userId, 'content', c.content, 'createdAt', c.createdAt, 'updatedAt', c.updatedAt,  'userNickname', d.nickname, 'userAvatar', d.avatar,   'user', JSON_OBJECT('id', d.id, 'email', d.email, 'name', d.name, 'nickname', d.nickname, 'avatar', d.avatar))


        )
        FROM comment_replies AS c
        
        JOIN users AS d ON c.userId = d.id

        WHERE c.commentId = a.id
        
      ) AS replies

      FROM comments AS a LEFT JOIN users AS b ON a.userId = b.id
    

      WHERE a.boardId = ?

      ORDER BY a.createdAt DESC
      LIMIT 100
      `;




      
      







      const values = [boardId];

      const [rows, fields] = await connection.query(query, values) as any;

      connection.release();

      if (rows) {
        return rows;
      } else {
        return [];
      }

    } catch (error) {
          
      connection.release();
  
      console.error('getCommentByBoardId error: ', error);
      return [];
    }


  
  }




  

  
  export async function getCommentCountByBoardId(
    boardId: string,
  ) {
        
  
      const connection = await connect();

      try {
          
          const query = `
          SELECT COUNT(*) AS count FROM comments
          WHERE boardId = ?
          `;
          const values = [boardId];
  
          const [rows, fields] = await connection.query(query, values) as any;
  
          connection.release();
  
          if (rows) {
            return rows[0].count;
          } else {
            return 0;
          }
      } catch (error) {
      
        connection.release();
  
        console.error('getCommentCountByBoardId error: ', error);
        return 0;
      }


  } 




export async function getCommentCountByUserId(
  userId: number,
) {
      

  const connection = await connect();

  try {

    const query = `
    SELECT COUNT(*) AS count FROM comments
    WHERE userId = ?
    `;
    const values = [userId];

    const [rows, fields] = await connection.query(query, values) as any;

    connection.release();

    if (rows) {
      return rows[0].count;
    } else {
      return 0;
    }

  
  } catch (error) {
    
    connection.release();

    console.error('getCommentCountByUserId error: ', error);
    return 0;
  }


} 




export async function getLikeCountByUserId(
  userId: number,
) {
      

  const connection = await connect();

  try {

    const query = `
    SELECT COUNT(*) AS count FROM likes
    WHERE userId = ?
    `;
    const values = [userId];

    const [rows, fields] = await connection.query(query, values) as any;

    connection.release();

    if (rows) {
      return rows[0].count;
    } else {
      return 0;
    }

  
  } catch (error) {
    
    connection.release();

    console.error('getLikeCountByUserId error: ', error);
    return 0;
  }


} 


  



export async function registerReply (
  {
    boardId,
    commentId,
    userId,

    content,

    
  }: {
 
    boardId: number,
    commentId: number,
    userId: number,

    content: string,

  }
) {


    const connection = await connect();

    try {

      const query = `
      INSERT INTO comment_replies
      (boardId, commentId, userId, content, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [boardId, commentId, userId, content, new Date(), new Date()];

      const [rows, fields] = await connection.query(query, values) as any;







      // get point value from boardLike field of setup table and insert points (point history table)
      /*
      const setupQuery = `
      SELECT boardComment FROM setups WHERE name = 'point'
      `;
      const setupValues = [] as any;

      const [setupRows, setupFields] = await connection.query(setupQuery, setupValues) as any;

      if (setupRows[0]) {

        const point = setupRows[0].boardComment;

        console.log('point: ' + point);

        if (point > 0) {

          const pointQuery = `
          INSERT INTO points
          (userId, point, title, createdAt) 
          VALUES (?, ?, ?, ?)
          `;
          const pointValues = [userId, point, 'boardComment', new Date()];

          await connection.query(pointQuery, pointValues);

        }

      }
      */

      // get point value from point_category

      const pointQuery = `
      SELECT point FROM point_category WHERE category = ?
      `;
      const pointValues = ['boardComment'];

      const [pointRows, pointFields] = await connection.query(pointQuery, pointValues) as any;

      if (pointRows[0]) {

        const point = pointRows[0].point;

        console.log('point: ' + point);

        if (point > 0) {

          const pointQuery = `
          INSERT INTO points
          (userId, point, title, createdAt) 
          VALUES (?, ?, ?, ?)
          `;
          const pointValues = [userId, point, 'boardComment', new Date()];

          await connection.query(pointQuery, pointValues);

        }

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
  
        console.error('registerReply error: ', error);
        return null;
      }

}





export async function updateReply (
  {
    replyId,
    content,

    
  }: {
 
    replyId: number,
    content: string,

  }
) {
  


    const connection = await connect();

    try {

      const query = `
      UPDATE comment_replies 
      SET content = ?, updatedAt = ?
      WHERE id = ?
      `;
      const values = [content, new Date(), replyId];

      const [rows, fields] = await connection.query(query, values) as any;

      connection.release();

      if (rows) {
        return (
          {
            updatedId: replyId,
          }
        )
      } else {
        return null;
      }


    } catch (error) {
          
      connection.release();

      console.error('updateReply error: ', error);
      return null;
    }

}

  








export async function getRepliesByCommentId(
  commentId: number,
): Promise<ReplyProps[]> {

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('comment_replies');

  return await collection
  .aggregate<ReplyProps>([

    {
      $match: {
        commentId: commentId,
      }
    },

    {
      $sort: { createdAt: -1 }
    },
    
    {
      $limit: 100,
    },

    {
      $project: {
        _id: 0,
        emailVerified: 0,
      }
    },

    {
      $match: {
        deletedAt: null,
      }
    },

    

    
  ])
  .toArray();
  */

  const connection = await connect();

  try {

    const query = `
    SELECT

    a.id AS id, a.boardId AS boardId, a.commentId AS commentId, a.userId AS userId, a.content AS content, a.createdAt AS createdAt, a.updatedAt AS updatedAt
    , b.id AS userId, b.email AS userEmail, b.name AS userName, b.nickname AS userNickname, b.avatar AS userAvatar

    FROM comment_replies AS a LEFT JOIN users AS b ON a.userId = b.id
    WHERE a.commentId = ?
    ORDER BY a.createdAt DESC
    LIMIT 100
    `;
    const values = [commentId];

    const [rows, fields] = await connection.query(query, values) as any;

    connection.release();

    if (rows) {
      return rows;
    } else {
      return [];
    }

  } catch (error) {

    connection.release();

    console.error('getRepliesByCommentId error: ', error);
    return [];
  }

    
    
}




/* delete one board */
export async function deleteOne(
  id: number,
): Promise<any> {

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('boards');


    // delete likes (boardId)
 

    // delete comments (boardId)

    const commentsCollection = client.db('doingdoit').collection('comments');

    await commentsCollection.deleteMany(
      {
        boardId: id,
      }
    );



  // delete comment_replies (boardId, commentId)

  const commentRepliesCollection = client.db('doingdoit').collection('comment_replies');

  await commentRepliesCollection.deleteMany(
    {
      boardId: id,
    }
  );


 


  return await collection.deleteOne({
      id: id,
  });
  */


  const connection = await connect();

  try {

    // deep delete

    // delete notification (boardId)

    const queryDeleteNotification = `
    DELETE FROM notifications
    WHERE boardId = ?
    `;
    const valuesDeleteNotification = [id];

    const [rowsDeleteNotification, fieldsDeleteNotification] = await connection.query(queryDeleteNotification, valuesDeleteNotification) as any;





    // delete likes (boardId)

    const query = `
    DELETE FROM likes
    WHERE boardId = ?
    `;
    const values = [id];

    const [rows, fields] = await connection.query(query, values) as any;



    // delete replies

    const query2 = `
    DELETE FROM comment_replies
    WHERE boardId = ?
    `;
    const values2 = [id];

    const [rows2, fields2] = await connection.query(query2, values2) as any;



    // delete comments

    const query3 = `

    DELETE FROM comments
    WHERE boardId = ?
    `;

    const values3 = [id];

    const [rows3, fields3] = await connection.query(query3, values3) as any;



    // delete board

    const query4 = `

    DELETE FROM boards
    WHERE id = ?
    `;

    const values4 = [id];

    const [rows4, fields4] = await connection.query(query4, values4) as any;

    connection.release();


    if (rows4) {
      return rows4;
    } else {
      return [];
    }

  } catch (error) {

    connection.release();

    console.error('deleteOne error: ', error);
    return [];
  }


}



/* delete one */
export async function deleteComment(
  id: number,
): Promise<any> {

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('comments');


  // delete comment_replies (boardId, commentId)

  const commentRepliesCollection = client.db('doingdoit').collection('comment_replies');

  await commentRepliesCollection.deleteMany(
    {
      commentId: id,
    }
  );


  return await collection.deleteOne({
      id: id,
  });
  */

  const connection = await connect();

  try {


      // delete notification (commentId)

      const queryDeleteNotification = `
      DELETE FROM notifications
      WHERE commentId = ?
      `;
      const valuesDeleteNotification = [id];

      const [rowsDeleteNotification, fieldsDeleteNotification] = await connection.query(queryDeleteNotification, valuesDeleteNotification) as any;



      // delete replies

      const query = `
      DELETE FROM comment_replies
      WHERE commentId = ?
      `;
      const values = [id];

      const [rows, fields] = await connection.query(query, values) as any;

    
          
      // delete comment

      const query2 = `
      DELETE FROM comments
      WHERE id = ?
      `;
      const values2 = [id];

      const [rows2, fields2] = await connection.query(query2, values2) as any;




      connection.release();
  
      if (rows) {
        return rows;
      } else {
        return [];
      }
  
    } catch (error) {

      connection.release();
  
      console.error('deleteComment error: ', error);
      return [];
    }


}



/* delete one */
export async function deleteReply(
  id: number,
): Promise<any> {

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('replys');



  return await collection.deleteOne({
      id: id,
  });
  */

  const connection = await connect();

  try {

    const query = `
    DELETE FROM comment_replies
    WHERE id = ?
    `;
    const values = [id];

    const [rows, fields] = await connection.query(query, values) as any;

    connection.release();

    if (rows) {
      return rows;
    } else {
      return [];
    }

  } catch (error) {

    connection.release();

    console.error('deleteReply error: ', error);
    return [];
  }
  

}









/* register tag */
export async function registerTag (
  {
    name,
  }: {
 
    name: string,

  }
) {
    


  const connection = await connect();

  try {


    // name is unique, check duplicate tag name

    const [tagResults, fields] = await connection.query(
      `
      SELECT name FROM board_tags WHERE name = ?
      `,
      [name]
    ) as any;


    ///console.log('registerTag tagResults: ' + tagResults[0]);


    if (tagResults[0]) {
      return null;
    }



    console.log('registerTag name=====: ' + name);



      // imcrement order number of all tags in tags table and insert 1 order number tag 


    const query = `
    UPDATE board_tags
    SET orderNumber = orderNumber + 1
    `;
    const values = [] as any;

    const [rows, fields2] = await connection.query(query, values) as any;


    // insert new tag with order number 1

    const query2 = `
    INSERT INTO board_tags
    (name, orderNumber, count, createdAt)
    VALUES (?, ?, ?, ?)
    `;

    const values2 = [name, 1, 0, new Date()];

    const [rows2, fields3] = await connection.query(query2, values2) as any;


    console.log('registerTag rows2: ' + rows2);





    connection.release();

    if (rows2) {

      console.log('registerTag rows2.insertId: ' + rows2.insertId);




      return (
        {
          insertedId: rows2.insertId,
        }
      )
    } else {
      return null;
    }

  } catch (error) {
      
    connection.release();

    console.error('registerTag error: ', error);
    return null;
  }


}













export async function getAllTags( {
  limit,
  page,
  sort,
  order,
  q,

}: {
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,

}): Promise<TagResultProps> {


  const query = q || '';


  if ( !sort ) {
    sort = 'orderNumber';
  }

  if ( !order ) {
    order = 'desc';
  }


  const connection = await connect();

  try {

    const query = `
    SELECT * FROM board_tags
    ORDER BY ${sort} ${order}
    LIMIT ? OFFSET ?
    `;

    const values = [limit, (page - 1) * limit];

    const [rows, fields] = await connection.query(query, values) as any;

    const query2 = `
    SELECT COUNT(*) AS count FROM board_tags

    `;

    const values2 = [] as any;

    const [rows2, fields2] = await connection.query(query2, values2) as any;

    connection.release();

    if (rows) {
      return {
        _id: '1',
        tags: rows,
        totalCount: rows2[0]?.count || 0,
      };
    } else {
      return {
        _id: '1',
        tags: [],
        totalCount: 0,
      };
    }

  } catch (error) {

    connection.release();

    console.error('getAllTags error: ', error);
    return {
      _id: '1',
      tags: [],
      totalCount: 0,
    };
  }

  

  
}





/* delete one tag */
export async function deleteOneTag(
  id: number,
): Promise<any> {




  const connection = await connect();
  try {


    // get order number of tag

    const [tagResults, fields] = await connection.query(
      `
      SELECT orderNumber FROM board_tags WHERE id = ?
      `,
      [id]
    ) as any;

    const orderNumber = tagResults[0]?.orderNumber;



    const query = `
    DELETE FROM board_tags
    WHERE id = ?
    `;
    const values = [id];

    const [rows, fields2] = await connection.query(query, values) as any;



    //  decrement orderNumber of greater than orderNumber

    const query2 = `
    UPDATE board_tags
    SET orderNumber = orderNumber - 1
    WHERE orderNumber > ?
    `;
    const values2 = [orderNumber];

    const [rows2, fields3] = await connection.query(query2, values2) as any;





    connection.release();

    if (rows) {
      return rows;
    } else {
      return [];
    }

  } catch (error) {
      
    connection.release();

    console.error('deleteOneTag error: ', error);
    return [];
  }

  

}





/* increament tag orderNumber */
export async function incrementTagOrderNumber(
  id: number,
): Promise<any> {

  console.log('=============incrementTagOrderNumber id: ' + id);




  // increment order number of tag which id is id
  // and other decrement  order number change


  const connection = await connect();

  try {

    // get order number of tag

    const [tagResults, fields] = await connection.query(
      `
      SELECT orderNumber FROM board_tags WHERE id = ?
      `,
      [id]
    ) as any;

    const orderNumber = tagResults[0]?.orderNumber;


    //  decrement orderNumber of orderNumber -1

    const query = `
    UPDATE board_tags
    SET orderNumber = orderNumber + 1
    WHERE orderNumber = ?
    `;

    const values = [orderNumber - 1];

    const [rows, fields2] = await connection.query(query, values) as any;


    const query2 = `
    UPDATE board_tags
    SET orderNumber = orderNumber - 1
    WHERE id = ?
    `;
    const values2 = [id];

    const [rows2, fields3] = await connection.query(query2, values2) as any;

    connection.release();

    if (rows2) {
      return rows2;
    } else {
      return [];
    }

  } catch (error) {

    connection.release();

    console.error('incrementTagOrderNumber error: ', error);
    return [];
  }



}
  

/* increament tag orderNumber */
export async function decrementTagOrderNumber(
  id: string,
): Promise<any> {

  console.log('=============decrementTagOrderNumber id: ' + id);





  const connection = await connect();

  try {

    // get order number of tag

    const [tagResults, fields] = await connection.query(
      `
      SELECT orderNumber FROM board_tags WHERE id = ?
      `,
      [id]
    ) as any;

    const orderNumber = tagResults[0]?.orderNumber;


    //  decrement orderNumber of orderNumber -1

    const query = `
    UPDATE board_tags
    SET orderNumber = orderNumber - 1
    WHERE orderNumber = ?
    `;

    const values = [orderNumber + 1];

    const [rows, fields2] = await connection.query(query, values) as any;


    const query2 = `
    UPDATE board_tags
    SET orderNumber = orderNumber + 1
    WHERE id = ?
    `;
    const values2 = [id];

    const [rows2, fields3] = await connection.query(query2, values2) as any;

    connection.release();

    if (rows2) {
      return rows2;
    } else {
      return [];
    }

  } catch (error) {

    connection.release();

    console.error('incrementTagOrderNumber error: ', error);
    return [];
  }



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

  // get total boards count
  // get today boards count
  // get total comments count
  // get today comments count
  // get total replies count
  // get today replies count

  const connection = await connect();

  try {

    const query = `
    SELECT 
    COUNT(*) AS totalBoardCount
    FROM boards
    
    `;

    const values = [] as any;

    const [rows, fields] = await connection.query(query, values) as any;

    
    const queryToday = `
    SELECT
    COUNT(*) AS todayBoardCount
    FROM boards
    WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT(?, '%Y-%m-%d')
    `;

    const valuesToday = [new Date()];

    const [rowsToday, fieldsToday] = await connection.query(queryToday, valuesToday) as any;




    const queryComment = `
    SELECT
    COUNT(*) AS totalCommentCount
    FROM comments
    WHERE createdAt BETWEEN ? AND ?
    `;
    const valuesComment = [startDate, endDate];

    const [rowsComment, fieldsComment] = await connection.query(queryComment, valuesComment) as any;

    const queryCommentToday = `
    SELECT
    COUNT(*) AS todayCommentCount
    FROM comments
    WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT(?, '%Y-%m-%d')
    `;
    const valuesCommentToday = [new Date()];
    const [rowsCommentToday, fieldsCommentToday] = await connection.query(queryCommentToday, valuesCommentToday) as any;


    const queryReply = `
    SELECT
    COUNT(*) AS totalReplyCount
    FROM comment_replies
    WHERE createdAt BETWEEN ? AND ?
    `;
    const valuesReply = [startDate, endDate];
    const [rowsReply, fieldsReply] = await connection.query(queryReply, valuesReply) as any;

    const queryReplyToday = `
    SELECT
    COUNT(*) AS todayReplyCount

    FROM comment_replies
    WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT(?, '%Y-%m-%d')
    `;

    const valuesReplyToday = [new Date()];
    const [rowsReplyToday, fieldsReplyToday] = await connection.query(queryReplyToday, valuesReplyToday) as any;







    connection.release();

    if (rows) {
      return {
        totalBoardCount: rows[0].totalBoardCount,
        todayBoardCount: rowsToday[0].todayBoardCount,
        totalCommentCount: rowsComment[0].totalCommentCount,
        todayCommentCount: rowsCommentToday[0].todayCommentCount,
        totalReplyCount: rowsReply[0].totalReplyCount,
        todayReplyCount: rowsReplyToday[0].todayReplyCount,
      };
    } else {
      return {
        totalBoardCount: 0,
        todayBoardCount: 0,
        totalCommentCount: 0,
        todayCommentCount: 0,
        totalReplyCount: 0,
        todayReplyCount: 0,
      };
    }

  } catch (error) {
    connection.release();
    console.error('getStatisticsSummary error: ', error);
    return {
      totalBoardCount: 0,
      todayBoardCount: 0,
      totalCommentCount: 0,
      todayCommentCount: 0,
      totalReplyCount: 0,
    };
  }

}