import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { S, u } from 'uploadthing/dist/types-e8f81bbc';

/// mongodbb object id
import { ObjectId } from 'mongodb';


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


export interface CategoryProps {
  _id: string;
  title: string;
  count: number;
}

export interface CategoryResultProps {
  _id: string;
  categories: CategoryProps[];
  totalCount: number;
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





export async function getAll({
  limit,
  page,
  sort,
  order,
  q,
  startDate,
  endDate,
  category,
  isTop,
 } : {
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
  startDate: string,
  endDate: string,
  category: string,
  isTop: string,
}): Promise<ResultProps> {


  // faqs join users

  if (q === undefined) {
    q = '';
  }


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
  console.log('category: ' + category);



  const startDateTime = new Date(new Date(startDate).getTime() ).toISOString();
 
  //const endDateTime = new Date(new Date(endDate).getTime() + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000).toISOString(); // + 23h 59m 59s
  const endDateTime = new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000 - 1).toISOString(); // + 23h 59m 59s


  const connection = await connect();



  try {


    // if selectCategory is all, select all of where isTop is 'Y'

    if (category === 'all') {

      const query = `
      SELECT
      faqs.id, faqs.userId, faqs.title, faqs.content, faqs.images, faqs.tags, faqs.category, faqs.isTop, faqs.createdAt, faqs.updatedAt, faqs.viewCount,
      users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
      FROM faqs
      LEFT JOIN users ON faqs.userId = users.id
      WHERE
      faqs.createdAt >= ? AND faqs.createdAt <= ?
      AND faqs.title LIKE ?
      ORDER BY faqs.createdAt DESC
      LIMIT ?, ?
      `;

      const values = [
        startDateTime, endDateTime,
        `%${q}%`, (page - 1) * limit, limit];

      const [rows, fields] = await connection.query(query, values) as any;

      const queryCount = `
      SELECT
      COUNT(*) as totalCount
      FROM faqs
      LEFT JOIN users ON faqs.userId = users.id
      WHERE
      faqs.createdAt >= ? AND faqs.createdAt <= ?
      AND faqs.title LIKE ?
      `;

      const valuesCount = [
        startDateTime, endDateTime,
        `%${q}%`];

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

    }






    if (isTop === 'Y') {
     
      const query = `
      SELECT
      faqs.id, faqs.userId, faqs.title, faqs.content, faqs.images, faqs.tags, faqs.category, faqs.isTop, faqs.createdAt, faqs.updatedAt, faqs.viewCount,
      users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
      FROM faqs
      LEFT JOIN users ON faqs.userId = users.id
      WHERE
      isTop = 'Y'
      AND faqs.createdAt >= ? AND faqs.createdAt <= ?
      AND faqs.title LIKE ?
      ORDER BY faqs.createdAt DESC
      LIMIT ?, ?
      `;

      const values = [
        startDateTime, endDateTime,
        `%${q}%`, (page - 1) * limit, limit];

      const [rows, fields] = await connection.query(query, values) as any;

      const queryCount = `
      SELECT
      COUNT(*) as totalCount
      FROM faqs
      LEFT JOIN users ON faqs.userId = users.id
      WHERE
      isTop = 'Y'
      AND faqs.createdAt >= ? AND faqs.createdAt <= ?
      AND faqs.title LIKE ?
      `;

      const valuesCount = [
        startDateTime, endDateTime,
        `%${q}%`];

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


    } else {



      const query = `
      SELECT 
      faqs.id, faqs.userId, faqs.title, faqs.content, faqs.images, faqs.tags, faqs.category, faqs.isTop, faqs.createdAt, faqs.updatedAt, faqs.viewCount,
      users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
      FROM faqs
      LEFT JOIN users ON faqs.userId = users.id
      WHERE
      faqs.category = ?
      AND faqs.createdAt >= ? AND faqs.createdAt <= ?

      AND faqs.title LIKE ? 

      ORDER BY faqs.createdAt DESC
      LIMIT ?, ?
      `;
      
      const values = [
        category,
        startDateTime, endDateTime,
        `%${q}%`, (page - 1) * limit, limit];


      const [rows, fields] = await connection.query(query, values) as any;


      //console.log('getAll rows: ' + rows);


      const queryCount = `
      SELECT
      COUNT(*) as totalCount
      FROM faqs
      LEFT JOIN users ON faqs.userId = users.id
      WHERE
      faqs.category = ?
      AND faqs.createdAt >= ? AND faqs.createdAt <= ?
      
      AND faqs.title LIKE ?

      LIMIT ?, ?
      `;

      const valuesCount = [
        category,
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
    const collection = client.db('doingdoit').collection('faqs');


    const query = q || '';

    const results = await collection.countDocuments(

      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          ////{ content: { $regex: query, $options: 'i' } },
          { nickname: { $regex: query, $options: 'i' } },

          // tags array match
          { tags: { $elemMatch: { $regex: query, $options: 'i' } } },

        ],

      }

    );

    return results;
}




export async function getCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('faqs');
  return await collection.countDocuments();
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


  const connection = await connect();

  try {
      
      // get one board by id and join users table

      const query = `
      SELECT
      faqs.id, faqs.userId, faqs.title, faqs.content, faqs.images, faqs.tags, faqs.category, faqs.isTop, faqs.createdAt, faqs.updatedAt, faqs.viewCount,
      users.email AS userEmail, users.nickname AS userNickname, users.avatar AS userAvatar
      FROM faqs
      LEFT JOIN users ON faqs.userId = users.id
      WHERE faqs.id = ?
      `;

  
      const values = [id];
  
      const [rows, fields] = await connection.query(query, values) as any;



      // view count update
      // if viewCount is null, set 1 else increment 1
      if (rows[0]?.viewCount === null) {
        const queryViewCount = `
        UPDATE faqs
        SET viewCount = 1
        WHERE id = ?
        `;
    
        const valuesViewCount = [id];
    
        const [rowsViewCount, fieldsViewCount] = await connection.query(queryViewCount, valuesViewCount) as any;
      } else {
        const queryViewCount = `
        UPDATE faqs
        SET viewCount = viewCount + 1
        WHERE id = ?
        `;
    
        const valuesViewCount = [id];
    
        const [rowsViewCount, fieldsViewCount] = await connection.query(queryViewCount, valuesViewCount) as any;
      }




  
      connection.release();
  
      if (rows) {
        return rows[0];
      } else {
        return null;
      }

  } catch (error) {

    connection.release();

    console.error(' error: ', error);
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


    title,
    content,

    images,

    tags,
    category,

    isTop,

    
  }: {
 
    userId: string,

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
  const collection = client.db('doingdoit').collection('faqs');


  // get sequence number and increment it

  ///const id = random(100000, 999999).toString();

  // random 6 digit number
  const id = Math.floor(100000 + Math.random() * 900000).toString();

  console.log('registerOne id: ' + id);


  await collection.insertOne(
    {

      id: id,
      
      userId: userId,
      userEmail: userEmail,
      userName: userName,
      userNickname: userNickname,
      userAvatar: userAvatar,

      title: title,
      content: content,

      images: images,

      tags: tags,
      category: category,

      isTop: isTop,

    
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


    return results;

    */

    const connection = await connect();

    try {

      const query = `
      INSERT INTO faqs
      (userId, title, content, images, tags, category, isTop, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [userId, title, content, JSON.stringify(images), JSON.stringify(tags), category, isTop, new Date(), new Date()];

      const [rows, fields] = await connection.query(query, values) as any;

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

      console.error(' error: ', error);
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



  console.log('updateOne id: ' + id);

  console.log('updateOne isTop: ' + isTop);



  

    const connection = await connect();

    try {
        
        const query = `
        UPDATE faqs
        SET title = ?, content = ?, images = ?, tags = ?, category = ?, isTop = ?, updatedAt = ?
        WHERE id = ?
        `;
  
        const values = [title, content, JSON.stringify(images), JSON.stringify(tags), category, isTop, new Date(), id];
  
        const [rows, fields] = await connection.query(query, values) as any;
  
        connection.release();
  
        if (rows) {
          return rows;
        } else {
          return [];
        }
    } catch (error) {

      connection.release();

      console.error(' error: ', error);
      return [];
    }


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




/* register tag */
export async function registerCategory (
  {
    name,
  }: {
 
    name: string,

  }
) {
    


  const connection = await connect();

  try {


    // name is unique, check duplicate tag name

    const [categoryResults, fields] = await connection.query(
      `
      SELECT name FROM faq_categories WHERE name = ?
      `,
      [name]
    ) as any;


    ///console.log('registerTag tagResults: ' + tagResults[0]);


    if (categoryResults[0]) {
      return null;
    }





      // imcrement order number of all tags in tags table and insert 1 order number tag 


    const query = `
    UPDATE faq_categories
    SET orderNumber = orderNumber + 1
    `;
    const values = [] as any;

    const [rows, fields2] = await connection.query(query, values) as any;


    // insert new tag with order number 1

    const query2 = `
    INSERT INTO faq_categories
    (name, orderNumber, count, createdAt)
    VALUES (?, ?, ?, ?)
    `;

    const values2 = [name, 1, 0, new Date()];

    const [rows2, fields3] = await connection.query(query2, values2) as any;





    connection.release();

    if (rows2) {


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

    console.error(' error: ', error);
    return null;
  }


}




export async function getAllCategories( {
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

}): Promise<CategoryResultProps> {


  const query = q || '';

  if (!limit) {
    limit = 10;
  }

  if (!page) {
    page = 1;
  }


  if ( !sort ) {
    sort = 'orderNumber';
  }

  if ( !order ) {
    order = 'desc';
  }


  const connection = await connect();

  try {

    const query = `
    SELECT * FROM faq_categories
    ORDER BY ${sort} ${order}
    LIMIT ? OFFSET ?
    `;

    const values = [limit, (page - 1) * limit];

    const [rows, fields] = await connection.query(query, values) as any;

    const query2 = `
    SELECT COUNT(*) AS count FROM faq_categories

    `;

    const values2 = [] as any;

    const [rows2, fields2] = await connection.query(query2, values2) as any;

    connection.release();


    //console.log('getAllCategories rows: ' + rows);


    if (rows) {
      return {
        _id: '1',
        categories: rows,
        totalCount: rows2[0]?.count || 0,
      };
    } else {
      return {
        _id: '1',
        categories: [],
        totalCount: 0,
      };
    }

  } catch (error) {

    connection.release();

    console.error('error: ', error);
    return {
      _id: '1',
      categories: [],
      totalCount: 0,
    };
  }

  

  
}






// get total count
export async function getCountCategory(
  q: string,
) {
    
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('faq_categories');


    const query = q || '';

    const results = await collection.countDocuments(

      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          ////{ content: { $regex: query, $options: 'i' } },
          { nickname: { $regex: query, $options: 'i' } },

          // tags array match
          { tags: { $elemMatch: { $regex: query, $options: 'i' } } },

        ],

      }

    );

    return results;
}



export async function getOneCategory(_id: string) {
 

  console.log('getOneCategory _id: ' + _id);

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('faq_categories');
  const results = await collection.findOne<BoardProps>(

    ///{ ojectId: _id },
    { _id: new ObjectId(_id) },
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
    SELECT * FROM faq_categories
    WHERE id = ?
    `;

    const values = [_id];

    const [rows, fields] = await connection.query(query, values) as any;

    connection.release();

    if (rows) {
      return rows[0];
    } else {
      return null;
    }

  
  } catch (error) {

    connection.release();

    console.error('error: ', error);
    return null;
  }




}




/* delete one category */
export async function deleteOneCategory(
  id: number,
): Promise<any> {

  const connection = await connect();
  try {


    // get order number of tag

    const [tagResults, fields] = await connection.query(
      `
      SELECT orderNumber FROM faq_categories WHERE id = ?
      `,
      [id]
    ) as any;

    const orderNumber = tagResults[0]?.orderNumber;



    const query = `
    DELETE FROM faq_categories
    WHERE id = ?
    `;
    const values = [id];

    const [rows, fields2] = await connection.query(query, values) as any;



    //  decrement orderNumber of greater than orderNumber

    const query2 = `
    UPDATE faq_categories
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

    console.error('deleteOneCategory error: ', error);
    return [];
  }

  

}





/* increament tag orderNumber */
export async function incrementCategoryOrderNumber(
  id: number,
): Promise<any> {


  console.log('incrementCategoryOrderNumber id: ' + id);

  const connection = await connect();

  try {

    // get order number of tag

    const [tagResults, fields] = await connection.query(
      `
      SELECT orderNumber FROM faq_categories WHERE id = ?
      `,
      [id]
    ) as any;

    const orderNumber = tagResults[0]?.orderNumber;


    //  decrement orderNumber of orderNumber -1

    const query = `
    UPDATE faq_categories
    SET orderNumber = orderNumber + 1
    WHERE orderNumber = ?
    `;

    const values = [orderNumber - 1];

    const [rows, fields2] = await connection.query(query, values) as any;


    const query2 = `
    UPDATE faq_categories
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

    console.error(' error: ', error);
    return [];
  }



}
  

/* increament tag orderNumber */
export async function decrementCategoryOrderNumber(
  id: string,
): Promise<any> {




  const connection = await connect();

  try {

    // get order number of tag

    const [tagResults, fields] = await connection.query(
      `
      SELECT orderNumber FROM faq_categories WHERE id = ?
      `,
      [id]
    ) as any;

    const orderNumber = tagResults[0]?.orderNumber;


    //  decrement orderNumber of orderNumber -1

    const query = `
    UPDATE faq_categories
    SET orderNumber = orderNumber - 1
    WHERE orderNumber = ?
    `;

    const values = [orderNumber + 1];

    const [rows, fields2] = await connection.query(query, values) as any;


    const query2 = `
    UPDATE faq_categories
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

    console.error(' error: ', error);
    return [];
  }



}













// updateOne
export async function updateOneCategory(
  {
    id,
    name,

  }: {

    id: string,

    name: string,

  }
) {

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('faq_categories');

  return await collection.updateOne(
    {

      _id: new ObjectId(id),


    },
    {
      $set:
      {
        title,
        updatedAt: new Date().toISOString()

      }
    }
  

  )
  */

  const connection = await connect();


  try {

    const query = `
    UPDATE faq_categories
    SET name = ?
    WHERE id = ?
    `;

    const values = [name, id];

    const [rows, fields] = await connection.query(query, values) as any;

    connection.release();

    if (rows) {
      return rows;
    } else {
      return [];
    }

  } catch (error) {

    connection.release();

    console.error(' error: ', error);
    return [];
  }


}




/* delete one */
export async function deleteOne(
  id: string,
): Promise<any> {


  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('faqs');




  return await collection.deleteOne({
      id: id,
  });
  */

  const connection = await connect();

  try {
      
      const query = `
      DELETE FROM faqs
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
  
      console.error(' error: ', error);
      return [];
    }

}