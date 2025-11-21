
import pool, {connect, query} from '@/config/db';


import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import _, { create, random, result } from 'lodash';
import { ro } from '@faker-js/faker';

// mongodb object id
import { ObjectId } from 'mongodb';



import nodemailer from 'nodemailer';
import { U } from 'uploadthing/dist/types-e8f81bbc';
import { COMPILER_INDEXES } from 'next/dist/shared/lib/constants';
import exp from 'constants';
import { parse } from 'path';





export interface UserProps {
  /*
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  followers: number;
  verified: boolean;
  */

  _id: ObjectId,
  id: string,
  name: string,
  nickname: string,
  email: string,
  password: string,
  avatar: string,
  regType: string,
  mobile: string,
  gender: string,
  weight: number,
  height: number,
  birthDate: string,
  purpose: string,
  
  //marketingAgree: string,
  isAgreedTerms: string,
  isAgreedPrivacy: string,
  isAgreedMarketing: string,

  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  loginedAt: string,
  followers : number,
  emailVerified: boolean,

  roles: string[],

  status: string,

  sequenceNumber: number,

}




export interface ResultProps {
  _id: string;
  users: UserProps[];
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



export async function getUserById(_id: number): Promise<UserProps | null> {

  console.log('getUserById _id: ' + _id);


  const connection = await connect();

  try {

    const [rows, fields] = await connection.query(
      'SELECT * FROM users WHERE id = ?',
      [_id]
    ) as any;
    
    connection.release();

    if (rows[0]) {
        return rows[0] as UserProps;
    } else {
        return null;
    }
 
  } catch (err) {
    connection.release();

    console.error(err);
    return null;
  }

}







export async function getUser(id: number): Promise<UserProps | null> {

  console.log('getUser id: ' + id);

  const connection = await connect();

  try {

    const [rows, fields] = await connection.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    ) as any;
    
    connection.release();

    if (rows[0]) {
      return rows[0] as UserProps;

    } else {
        return null;
    }
 
  } catch (err) {
    connection.release();

    console.error(err);
    return null;
  }

}




export async function getUserProfile(id: number): Promise<UserProps | null> {

  console.log('getUser id: ' + id);

  const connection = await connect();

  try {

    const [rows, fields] = await connection.query(
      'SELECT nickname, avatar FROM users WHERE id = ?',
      [id]
    ) as any;
    
    connection.release();

    if (rows[0]) {
      return rows[0] as UserProps;

    } else {
        return null;
    }
 
  } catch (err) {
    connection.release();

    console.error(err);
    return null;
  }

}







export async function getUserByMobile(mobile: string): Promise<UserProps | null> {

  /*

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');
  const results = await collection.findOne<UserProps>(
    { mobile: mobile },
    { projection: { _id: 0, emailVerified: 0 } }
    ////{ projection: { _id: 0, emailVerified: 0 } }
  );


  return results || null;
  */

 

  const connection = await connect();

  try {
      
      const [rows, fields] = await connection.query(
        'SELECT * FROM users WHERE mobile = ?',
        [mobile]
      ) as any;
      
      connection.release();
  
      if (rows[0]) {
        return rows[0] as UserProps;
      } else {
          return null;
      }
  
    } catch (err) {
      connection.release();
  
      console.error(err);
      return null;
    }


}






export async function getUserByEmail(email: string): Promise<UserProps | null> {

  ////console.log('getUserByEmail email: ' + email);


  if (!email) {
    return null;
  } 


  const connection = await connect();


  try {
  
    const [rows, fields] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as any;

    connection.release();

    if (rows[0]) {


        // insert user visit history
        const [rowsVisit, fieldsVisit] = await connection.query(
          'INSERT INTO user_visit_history (createdAt, userId, pageUrl, ip, userAgent) VALUES (?, ?, ?, ?, ?)',
          [new Date(), rows[0].id, 'login', 'ip', 'userAgent']
        ) as any;





        // check if title of points has same day, then not insert point history

        const [rowAttendance, fieldsAttendance] = await connection.query(

          ///'SELECT * FROM points WHERE userId = ? AND title = ? AND DATE(createdAt) = CURDATE()',

          // check day of createdAt

          'SELECT * FROM points WHERE userId = ? AND title = ? AND   DATE_FORMAT(createdAt, "%Y-%m-%d") = DATE_FORMAT(?, "%Y-%m-%d")',

          [rows[0].id, 'attendance', new Date()]
        ) as any;

        if (rowAttendance[0]) {

          //console.log('rowAttendance[0] exist');

        } else {

          //console.log('rowsVisited[0] not exist');

          // insert point history


          // get point from point_category talbe
          const [pointRows, pointFields] = await connection.query(
            'SELECT point FROM point_category WHERE category = ?',
            ['attendance']
          ) as any;

          if (pointRows[0]) {

            const point = pointRows[0].point;

            console.log('point: ' + point);

            if (point > 0) {

              const pointQuery = `
              INSERT INTO points
              (userId, point, title, createdAt) 
              VALUES (?, ?, ?, ?)
              `;
              const pointValues = [rows[0].id, point, 'attendance', new Date()];
      
              await connection.query(pointQuery, pointValues);

            }

          }




        }











        return rows[0] as UserProps;

    } else {
        return null;
    }

  } catch (err) {

    connection.release();
    
    console.error(err);
    return null;
  }

}







export async function getUserByLoginId(loginId: string): Promise<UserProps | null> {

  ////console.log('getUserByEmail email: ' + email);


  if (!loginId) {
    return null;
  } 


  const connection = await connect();


  try {
  
    const [rows, fields] = await connection.query(
      'SELECT * FROM users WHERE loginId = ?',
      [loginId]
    ) as any;

    connection.release();

    if (rows[0]) {


        // insert user visit history
        const [rowsVisit, fieldsVisit] = await connection.query(
          'INSERT INTO user_visit_history (createdAt, userId, pageUrl, ip, userAgent) VALUES (?, ?, ?, ?, ?)',
          [new Date(), rows[0].id, 'login', 'ip', 'userAgent']
        ) as any;





        // check if title of points has same day, then not insert point history

        const [rowAttendance, fieldsAttendance] = await connection.query(

          ///'SELECT * FROM points WHERE userId = ? AND title = ? AND DATE(createdAt) = CURDATE()',

          // check day of createdAt

          'SELECT * FROM points WHERE userId = ? AND title = ? AND   DATE_FORMAT(createdAt, "%Y-%m-%d") = DATE_FORMAT(?, "%Y-%m-%d")',

          [rows[0].id, 'attendance', new Date()]
        ) as any;

        if (rowAttendance[0]) {

          //console.log('rowAttendance[0] exist');

        } else {

          //console.log('rowsVisited[0] not exist');

          // insert point history

          // check point_category table

          // get point from point_category talbe

          const [pointRows, pointFields] = await connection.query(
            'SELECT point FROM point_category WHERE category = ?',
            ['attendance']
          ) as any;

          if (pointRows[0]) {

            const point = pointRows[0].point;

            console.log('point: ' + point);

            if (point > 0) {

              const pointQuery = `
              INSERT INTO points
              (userId, point, title, createdAt) 
              VALUES (?, ?, ?, ?)
              `;
              const pointValues = [rows[0].id, point, 'attendance', new Date()];
      
              await connection.query(pointQuery, pointValues);

            }

          }

          


        }



        return rows[0] as UserProps;

    } else {
        return null;
    }

  } catch (err) {

    connection.release();
    
    console.error(err);
    return null;
  }

}







export async function getAllUsers( {
  limit,
  page,
  sort,
  order,
  q,
  regTypeArray,
  startDate,
  endDate,
}: {
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
  regTypeArray: string[],
  startDate: string,
  endDate: string,
}): Promise<ResultProps> {



  console.log('limit: ' + limit);
  console.log('page: ' + page);
  console.log('sort: ' + sort);
  console.log('order: ' + order);
  console.log('q: ' + q);
  console.log('regTypeArray: ' + regTypeArray);

  const query = q || '';



  const  connection = await connect();

  try {


    // where roles is 'user' and regType is in regTypeArray

    // and status is 'active'


    // get sequence number from table








    // get serial number from table
    // get sequence number from table
    //     @rownum := @rownum + 1 AS sequenceNumber,


   // return total count of users

  
   //  nickname IS NOT NULL


    const query = `SELECT *

    FROM users


    WHERE
    
    roles = ?
    
    AND regType IN (?)

    AND nickname IS NOT NULL

    AND status = ?

    AND createdAt >= ? AND createdAt < ?
    AND (email LIKE ? OR nickname LIKE ? OR mobile LIKE ?)
    ORDER BY ${sort} ${order}
    LIMIT ?, ?`;



    const values = ['user', regTypeArray, `active`,
    startDate, endDate,
    `%${q}%`, `%${q}%`, `%${q}%`, (page - 1) * limit, limit];

    
    const [rows, fields] = await connection.query(query, values) as any;



    //// nickname IS NOT NULL

    const queryCount = `
    SELECT
    COUNT(*) AS count
    FROM users

    WHERE
    
    roles = ?
    
    AND regType IN (?)

    AND nickname IS NOT NULL

    AND status = ?

    AND createdAt >= ? AND createdAt < ?

    AND (email LIKE ? OR nickname LIKE ? OR mobile LIKE ?)
    `;


    const valuesCount = ['user', regTypeArray, `active`,
    startDate, endDate,
    `%${q}%`, `%${q}%`, `%${q}%`];

    const [rowsCount, fieldsCount] = await connection.query(queryCount, valuesCount) as any;


    connection.release();

    if (rows) {
      return {
        _id: '1',
        users: rows,
        totalCount: rowsCount[0].count,
      };
    } else {
      return {
        _id: '1',
        users: [],
        totalCount: 0,
      };
    }

  } catch (err) {
    connection.release();
    console.error(err);
    return {
      _id: '1',
      users: [],
      totalCount: 0,
    };
  }

  
}







export async function getAllManagers( {
  limit,
  page,
  sort,
  order,
  q,
  regTypeArray,
  startDate,
  endDate,
}: {
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
  regTypeArray: string[],
  startDate: string,
  endDate: string,
}): Promise<ResultProps> {



  console.log('limit: ' + limit);
  console.log('page: ' + page);
  console.log('sort: ' + sort);
  console.log('order: ' + order);
  console.log('q: ' + q);
  console.log('regTypeArray: ' + regTypeArray);

  const query = q || '';



  const  connection = await connect();

  try {


    // where roles is not 'user'
    
    // regType is in regTypeArray

    // and status is 'active'



  
    const query = `SELECT
    * FROM users
    WHERE
    nickname IS NOT NULL

    AND roles = ?
    
    AND regType IN (?)

    AND status = ?

    AND createdAt >= ? AND createdAt < ?
    AND (email LIKE ? OR nickname LIKE ? OR mobile LIKE ?)
    ORDER BY ${sort} ${order}
    LIMIT ?, ?`;



    const values = [`admin`, regTypeArray, `active`,
    startDate, endDate,
    `%${q}%`, `%${q}%`, `%${q}%`, (page - 1) * limit, limit];

    
    const [rows, fields] = await connection.query(query, values) as any;


    console.log('rows: ' + rows);


    const queryCount = `
    SELECT
    COUNT(*) AS count
    FROM users
    WHERE
    nickname IS NOT NULL

    AND roles = ?
    
    AND regType IN (?)

    AND status = ?

    AND createdAt >= ? AND createdAt < ?

    AND (email LIKE ? OR nickname LIKE ? OR mobile LIKE ?)
    `;


    const valuesCount = [`admin`, regTypeArray, `active`,
    startDate, endDate,
    `%${q}%`, `%${q}%`, `%${q}%`];

    const [rowsCount, fieldsCount] = await connection.query(queryCount, valuesCount) as any;


    connection.release();

    if (rows) {
      return {
        _id: '1',
        users: rows,
        totalCount: rowsCount[0].count,
      };
    } else {
      return {
        _id: '1',
        users: [],
        totalCount: 0,
      };
    }

  } catch (err) {
    connection.release();
    console.error(err);
    return {
      _id: '1',
      users: [],
      totalCount: 0,
    };
  }

  
}




export async function searchUser(query: string): Promise<UserProps[]> {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');
  return await collection
    .aggregate<UserProps>([
      {
        $search: {
          index: 'name-index',
          /* 
          name-index is a search index as follows:

          {
            "mappings": {
              "fields": {
                "followers": {
                  "type": "number"
                },
                "name": {
                  "analyzer": "lucene.whitespace",
                  "searchAnalyzer": "lucene.whitespace",
                  "type": "string"
                },
                "username": {
                  "type": "string"
                }
              }
            }
          }

          */
          text: {
            query: query,
            path: {
              wildcard: '*' // match on both name and username
            },
            fuzzy: {},
            score: {
              // search ranking algorithm: multiply relevance score by the log1p of follower count
              function: {
                multiply: [
                  {
                    score: 'relevance'
                  },
                  {
                    log1p: {
                      path: {
                        value: 'followers'
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        // filter out users that are not verified
        $match: {
          verified: true
        }
      },
      // limit to 10 results
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          emailVerified: 0,
          score: {
            $meta: 'searchScore'
          }
        }
      }
    ])
    .toArray();
}



export async function getUserCount(
  query: string = 'no query',
): Promise<number> {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');


  const result = await collection.aggregate([
    {
      $match: {

        // valide email address
        email: {
          $regex: '@',
          $options: 'i'
        },

        // if nickname is not exist, then exclude it
        nickname: {
          $exists: true
        },
        
        status: {
          $exists: true,
          $eq: 'active'
        },
        
        // if roles is exist and then roles is in ['user']
        // if roles is not exist and then roles is in ['user']

        $or: [
          { roles: { $exists: true, $in: ['user'] } },
          { roles: { $exists: false } },
        ],

      }
    },

    

    {
      $match: {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { nickname: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      },
    },
    



    {
      $count: 'count',
    },

  ]).toArray();

  console.log('getUserCount : ' + result[0]?.count);


  return result[0]?.count || 0;


}










export async function updateUser(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');
  return await collection.updateOne({ username }, { $set: { bio } });
}





/* set user */
export async function setUser (

  {
    email,
    loginId,
    password,
    regType,
    isAgreedTerms,
    isAgreedPrivacy,
    isAgreedMarketing,


    mobile,
    name,
    nickname,
    avatar,
    //생년월일
    birthDate,
    //성별
    gender,
    weight,
    height,
    purpose,
    medicalHistory,
    familyMedicalHistory,






  }: {
    email: string,
    loginId: string,
    password: string,
    regType: string,
    isAgreedTerms: string,
    isAgreedPrivacy: string,
    isAgreedMarketing: string,

    mobile: string,
    name: string,
    nickname: string,
    avatar: string,
    //생년월일
    birthDate: string,
    //성별
    gender: string,
    weight: number,
    height: number,
    purpose: string,
    medicalHistory: string,
    familyMedicalHistory: string,


  } 
): Promise<UserProps | null> {



    const connection = await connect();

    try {

      // check if email is already exist

      const [rowsCheck, fieldsCheck] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      ) as any;

      if (rowsCheck[0]) {

        connection.release();
        return null;
      }



      // sequence number
      const [rowsSequence, fieldsSequence] = await connection.query(
        'SELECT * FROM users WHERE status = ? AND roles = ? AND nickname IS NOT NULL',
        ['active', 'user']
      ) as any;
      const sequenceNumber = rowsSequence.length + 1;

      /*
      const [rows, fields] = await connection.query(
        'INSERT INTO users(email,loginId, password, regType, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing, status, createdAt, updatedAt, roles, sequenceNumber ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [email, loginId, password, regType, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing, 'active', new Date(), new Date(), 'user', sequenceNumber]
      ) as any;
      */
     /*
     INSERT INTO users
        (email, loginId, password, regType, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing,
          name, nickname, avatar, birthDate, gender, weight, height, purpose, medicalHistory, familyMedicalHistory,
          status,createdAt, updatedAt, roles, sequenceNumber)
        VALUES ('songpa800@gmail.com', 'songpa800@gmail.com', 'abcd1234~', 'email', 'Y', 'Y', 'Y',
          '', '오픈', '', '1994-1-1', '남성', 77, 177, '체중증가', 'N', 'Y',
          'active', '2024-03-28 16:55:30.235', '2024-03-28 16:55:30.235', 'user', 46
        );
      */

      const query = `
      INSERT INTO users
      (email, loginId, password, regType, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing,
        mobile, name, nickname, avatar, birthDate, gender, weight, height, purpose, medicalHistory, familyMedicalHistory,
        status,createdAt, updatedAt, roles, sequenceNumber)
      VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?
      )
      `;
        

      const value = [
        email, loginId, password, regType, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing,
        mobile, name, nickname, avatar, birthDate, gender, weight, height, purpose, medicalHistory, familyMedicalHistory,
        'active', new Date(), new Date(), 'user', sequenceNumber
      ]

      const [rows, fields] = await connection.query(query, value) as any;




      /// insert and return inserted user



      connection.release();



      if (rows) {

        const data = {
          id: rows.insertId,
        } as UserProps;

        return data;


      } else {
          return null;
      }

    } catch (err) {
      connection.release();
      console.error(err);
      return null;
    }

  
  }







/* set manager */
export async function setManager (

  {
    email,
    loginId,
    password,
    regType,
    roles,
    nickname,
    mobile,
    description,
    isAgreedTerms,
    isAgreedPrivacy,
    isAgreedMarketing,
    access,
  }: {
    email: string,
    loginId: string,
    password: string,
    regType: string,
    roles: string,
    nickname: string,
    mobile: string,
    description: string,
    isAgreedTerms: string,
    isAgreedPrivacy: string,
    isAgreedMarketing: string,
    access: object,
  } 
): Promise<UserProps | null> {



    const connection = await connect();

    try {

      // check if email is already exist

      const [rowsCheck, fieldsCheck] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      ) as any;

      if (rowsCheck[0]) {

        connection.release();
        return null;
      }


      const jsonAccess = JSON.stringify(access);

      /// insert and return inserted user
    

      /*
      const [rows, fields] = await connection.query(
        'INSERT INTO users (email, loginId, password, regType, nickname, mobile, description, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing, status, createdAt, updatedAt, roles, access) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [email, loginId, password, regType, nickname, mobile, description, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing, 'active', new Date(), new Date(), roles, access]
      ) as any;
      */

      const query = `
      INSERT INTO users
      (email, loginId, password, regType, nickname, mobile, description, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing, status, createdAt, updatedAt, roles, access)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const value = [email, loginId, password, regType, nickname, mobile, description, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing, 'active', new Date(), new Date(), roles, jsonAccess];

      const [rows, fields] = await connection.query(query, value) as any;




     

      // fetch users from db which is matched with status is 'active' and reles is 'admin' order by createdAt asc
      // and then update "sequenceNumber" field to sequence number from 1 to count of users

    
      const query2 = `
      SELECT id FROM users WHERE status = ? AND roles = ?
      ORDER BY createdAt ASC
      `;
      const value2 = ['active', 'admin'];

      const [rowsUsers, fieldsUsers] = await connection.query(query2, value2) as any;

      for (let i = 0; i < rowsUsers.length; i++) {

        // update sequence number
        const query = `
        UPDATE users SET sequenceNumber = ? WHERE id = ?
        `;
        const values = [i + 1, rowsUsers[i].id];

        await connection.query(query, values);

      }







      connection.release();



      if (rows) {

        const data = {
          id: rows.insertId,
        } as UserProps;

        return data;


      } else {
          return null;
      }

    } catch (err) {
      connection.release();
      console.error(err);
      return null;
    }

  
  }










/* update manager */
export async function updateManager (

  {
    id,
    email,
    loginId,
    password,
    regType,
    roles,
    nickname,
    mobile,
    description,
    isAgreedTerms,
    isAgreedPrivacy,
    isAgreedMarketing,
    access,
  }: {
    id: number,
    email: string,
    loginId: string,
    password: string,
    regType: string,
    roles: string,
    nickname: string,
    mobile: string,
    description: string,
    isAgreedTerms: string,
    isAgreedPrivacy: string,
    isAgreedMarketing: string,
    access: object,
  } 
): Promise<UserProps | null> {


    const connection = await connect();

    try {

      


      const jsonAccess = JSON.stringify(access);

      /*
      const query = `
      INSERT INTO users
      (email, loginId, password, regType, nickname, mobile, description, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing, status, createdAt, updatedAt, roles, access)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const value = [email, loginId, password, regType, nickname, mobile, description, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing, 'active', new Date(), new Date(), roles, jsonAccess];

      const [rows, fields] = await connection.query(query, value) as any;
      */

      // update

      const query = `
      UPDATE users
      SET email = ?, loginId = ?, password = ?, regType = ?, nickname = ?, mobile = ?, description = ?, isAgreedTerms = ?, isAgreedPrivacy = ?, isAgreedMarketing = ?, updatedAt = ?, roles = ?, access = ?
      WHERE id = ?
      `;

      const value = [email, loginId, password, regType, nickname, mobile, description, isAgreedTerms, isAgreedPrivacy, isAgreedMarketing, new Date(), roles, jsonAccess, id];

      const [rows, fields] = await connection.query(query, value) as any;




      connection.release();



      if (rows) {

        return rows;


      } else {
          return null;
      }

    } catch (err) {
      connection.release();
      console.error(err);
      return null;
    }

  
  }



  


  export async function updateUserByEmail (
    {
      email,
      name,
      nickname,
      //생년월일
      birthDate,
      emailVerified,
      mobile,
      avatar,

      //성별
      gender,
      weight,
      height,
      purpose,
      marketingAgree,
      medicalHistory,
      familyMedicalHistory,
      password,

    }: {
      email: string,
      name: string,
      nickname: string,
      //생년월일
      birthDate: string,
      emailVerified: string,
      mobile: string,
      avatar: string,
      gender: string,
      weight: number,
      height: number,
      purpose: string,
      marketingAgree: string,
      medicalHistory: string,
      familyMedicalHistory: string,
      password: string,
    }
  ) {


    const connection = await connect();

    try {
  
      const [rows, fields] = await connection.query(
        'UPDATE users SET name = ?, nickname = ?, birthDate = ?, emailVerified = ?, mobile = ?, avatar = ?, gender = ?, weight = ?, height = ?, purpose = ?, marketingAgree = ?, medicalHistory = ?, familyMedicalHistory = ?, password = ? WHERE email = ?',
        [name, nickname, birthDate, emailVerified, mobile, avatar, gender, weight, height, purpose, marketingAgree, medicalHistory, familyMedicalHistory, password, email]
      ) as any;





      // fetch users from db which is matched with status is 'active' and reles is 'user' order by createdAt asc
      // and then update "sequenceNumber" field to sequence number from 1 to count of users

    
      const query = `
      SELECT id FROM users WHERE status = ? AND roles = ? AND nickname IS NOT NULL
      ORDER BY createdAt ASC
      `;
      const values = ['active', 'user'];

      const [rowsUsers, fieldsUsers] = await connection.query(query, values) as any;

      for (let i = 0; i < rowsUsers.length; i++) {

        // update sequence number
        const query = `
        UPDATE users SET sequenceNumber = ? WHERE id = ?
        `;
        const values = [i + 1, rowsUsers[i].id];

        await connection.query(query, values);

      }

      const query2 = `
      SELECT id FROM users WHERE status = ? AND roles = ? AND nickname IS NOT NULL
      ORDER BY createdAt ASC
      `;
      const values2 = ['withdraw', 'user'];

      const [rowsUsers2, fieldsUsers2] = await connection.query(query2, values2) as any;

      for (let i = 0; i < rowsUsers2.length; i++) {

        // update sequence number
        const query = `
        UPDATE users SET sequenceNumber = ? WHERE id = ?
        `;
        const values = [i + 1, rowsUsers2[i].id];

        await connection.query(query, values);

      }


      connection.release();




      // update nickname from feeds collection where userId is id

      // get userId from users table where email is email

      const [rowsUserId, fieldsUserId] = await connection.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      ) as any;

      const userId = rowsUserId[0].id;

      const client = await clientPromise;
      const collection = client.db('doingdoit').collection('feeds');
  

      const resultsFeeds = await collection.updateMany(
        {
          userId: userId,
        },
        {
          $set: {
            nickname: nickname,
          }
        }
      );
    









      if (rows) {
          return rows;
      } else {
          return null;
      }

    } catch (err) {
      connection.release();
      console.error(err);
      return null;
    }
  
  }


  /*
        id,
      name,
      nickname,
      avatar,
      birthDate,
      gender,
      weight,
      height,
      purpose,
      marketingAgree,
      medicalHistory,
      familyMedicalHistory,
      */

  export async function updateUserById (
    {
      id,
      name,
      nickname,
      avatar,
      //생년월일
      birthDate,
      //성별
      gender,
      weight,
      height,
      purpose,
      medicalHistory,
      familyMedicalHistory,

    }: {
      id: string,
      name: string,
      nickname: string,
      avatar: string,
      //생년월일
      birthDate: string,
      gender: string,
      weight: number,
      height: number,
      purpose: string,
      medicalHistory: string,
      familyMedicalHistory: string,
    }
  ) {

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('users');
  

    //return await collection.updateOne({ username }, { $set: { bio } });

    // update on by id
    const results = await collection.updateOne(
      { id: id },
      { $set:
      
        {
          name: name,
          nickname: nickname,
          avatar: avatar,
          birthDate: birthDate,
          gender: gender,
          weight: weight,
          height: height,
          purpose: purpose,
          medicalHistory: medicalHistory,
          familyMedicalHistory: familyMedicalHistory,

        }
      }
    );


    ///console.log('updateUserById results: ' + results);






    return results;
  
  }



  export async function updateAvatarById (
    {
      id,
      avatar,

    }: {
      id: string,
      avatar: string,
    }
  ) {


    console.log('updateAvatarById id: ' + id) + ' avatar: ' + avatar;

    const connection = await connect();

    try {
    

      const [rows, fields] = await connection.query(
        'UPDATE users SET avatar = ? WHERE id = ?',
        [avatar, id]
      ) as any;

      connection.release();

      if (rows) {
          return rows;
      } else {
          return null;
      }

    } catch (err) {
      connection.release();
      console.error(err);
      return null;
    }


  }





  export async function updateAvatarByEmail (
    {
      email,
      avatar,

    }: {
      email: string,
      avatar: string,
    }
  ) {

    console.log('updateAvatarByEmail email: ' + email + ' avatar: ' + avatar);


    const connection = await connect();

    try {
  

      const [rows, fields] = await connection.query(
        'UPDATE users SET avatar = ? WHERE email = ?',
        [avatar, email]
      ) as any;

      connection.release();

      if (rows) {
          return rows;
      } else {
          return null;
      }

    } catch (err) {
      connection.release();
      console.error(err);
      return null;
    }


  }







  /*
  export async function getAllWithdrewers(
    limit: number = 10,
    page: number = 1,
    sort: string = 'no sort',
    order: string = 'no order',
    query: string = 'no query',
  ): Promise<UserProps[]> {
  
    console.log('limit: ' + limit);
    console.log('page: ' + page);
    console.log('sort: ' + sort);
    console.log('order: ' + order);
    console.log('query: ' + query);
  
  
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('users');
  
    return await collection
    .aggregate<UserProps>([
  
      
  
      
      {
        $match: {
  
          // valide email address
          email: {
            $regex: '@',
            $options: 'i'
          },
  
          // if nickname is not exist, then exclude it
          nickname: {
            $exists: true
          },
  
  
          
          status: {
            $exists: true,
            $eq: 'withdraw'
          },
          
          // if roles is exist and then roles is in ['user']
          // if roles is not exist and then roles is in ['user']
  
          $or: [
            { roles: { $exists: true, $in: ['user'] } },
            { roles: { $exists: false } },
          ],
  
        }
      },
  
      {
        $match: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { nickname: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
          ],
        },
      },
      
  
      {
        $sort: {
            [sort]: order === 'asc' ? 1 : -1,
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
  
  
    
  }
  */


 

export async function getAllWithdrewers( {
  limit,
  page,
  sort,
  order,
  q,
  regTypeArray,
  startDate,
  endDate,
}: {
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,
  regTypeArray: string[],
  startDate: string,
  endDate: string,
}): Promise<ResultProps> {



  console.log('limit: ' + limit);
  console.log('page: ' + page);
  console.log('sort: ' + sort);
  console.log('order: ' + order);
  console.log('q: ' + q);
  console.log('regTypeArray: ' + regTypeArray);
  console.log('startDate: ' + startDate);
  console.log('endDate: ' + endDate);


  const query = q || '';

  // where roles is 'user' and regType is in regTypeArray and status is 'withdraw'

  const  connection = await connect();

  try {

    /// nickname IS NOT NULL

    const query = `SELECT *

    FROM users

    WHERE
    
    roles = ?
    And regType IN (?)
    AND status = ?
    AND withdrawAt >= ? AND withdrawAt < ?
    AND (email LIKE ? OR nickname LIKE ? OR mobile LIKE ?)
    ORDER BY ${sort} ${order}
    LIMIT ?, ?`;

    const values = ['user', regTypeArray, `withdraw`, startDate, endDate, `%${q}%`, `%${q}%`, `%${q}%`, (page - 1) * limit, limit];

    const [rows, fields] = await connection.query(query, values) as any;


    //// nickname IS NOT NULL

    const queryCount = `
    SELECT
    COUNT(*) AS count
    FROM users
    WHERE
    
    roles = ?
    And regType IN (?)
    AND status = ?
    AND withdrawAt >= ? AND withdrawAt < ?
    AND (email LIKE ? OR nickname LIKE ? OR mobile LIKE ?)
    `;
    const valuesCount = ['user', regTypeArray, `withdraw`, startDate, endDate, `%${q}%`, `%${q}%`, `%${q}%`];

    const [rowsCount, fieldsCount] = await connection.query(queryCount, valuesCount) as any;

    connection.release();

    if (rows) {
      return {
        _id: '1',
        users: rows,
        totalCount: rowsCount[0].count,
      };
    } else {
      return {
        _id: '1',
        users: [],
        totalCount: 0,
      };
    }

  } catch (err) {

    connection.release();
    console.error(err);
    return {
      _id: '1',
      users: [],
      totalCount: 0,
    };
  }


  
}

 
  





  export async function getWithdrewerCount(
    query: string = 'no query',
  ): Promise<number> {
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('users');
  
  
    const result = await collection.aggregate([
      {
        $match: {
  
          // valide email address
          email: {
            $regex: '@',
            $options: 'i'
          },
  
          // if nickname is not exist, then exclude it
          nickname: {
            $exists: true
          },
          
          status: {
            $exists: true,
            $eq: 'withdraw'
          },
          
          // if roles is exist and then roles is in ['user']
          // if roles is not exist and then roles is in ['user']
  
          $or: [
            { roles: { $exists: true, $in: ['user'] } },
            { roles: { $exists: false } },
          ],
  
        }
      },
  
      
  
      {
        $match: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { nickname: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
          ],
        },
      },
      
  
  
  
      {
        $count: 'count',
      },
  
    ]).toArray();
  
  
    return result[0]?.count || 0;
  
  
  }





  // check email registered or not
  export async function checkEmailRegistered (
    email: string,
  ): Promise<any> {
  
    console.log('checkEmailRegistered email: ' + email);
  
    const connection = await connect();
  
    try {
  
      const [rows, fields] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      ) as any;
  
      connection.release();

      
  
      if (rows[0]) {

          ///console.log('checkEmailRegistered rows[0] ' + JSON.stringify(rows[0]));

          return {
            result: 'Y',
            regType: rows[0].regType,
            status: rows[0].status,
          };
          

      } else {

          return {
            result: 'N',
            regType: '',
            status: '',
          };  
      }
   
    } catch (err) {
      connection.release();
      console.error(err);
      return 'N';
  
    } 
  
  
  }



// check duplicate email and return true or false

export async function checkDuplicateEmail (
  email: string,
): Promise<string> {

  ///console.log('checkDuplicateEmail _email: ' + email);

  const connection = await connect();

  try {

    const [rows, fields] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as any;

    connection.release();

    if (rows[0]) {
        return 'Y';
    } else {
        return 'N';
    }
 
  } catch (err) {
    connection.release();
    console.error(err);
    return 'N';

  } 


}



// check duplicate nickname and return true or false
export async function checkDuplicateNickname (
  _nickname: string,
): Promise<string> {

  console.log('checkDuplicateNickname _nickname: ' + _nickname);

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection.findOne<UserProps>(
    { nickname: _nickname },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  console.log('checkDuplicateNickname results: ' + results);

  if (results) {
    return 'Y';
  } else {
    return 'N';
  }
  */

  const connection = await connect();

  try {

    const [rows, fields] = await connection.query(
      'SELECT * FROM users WHERE nickname = ?',
      [_nickname]
    ) as any;

    connection.release();

    if (rows[0]) {
        return 'Y';
    } else {
        return 'N';
    }
 
  } catch (err) {
    connection.release();
    console.error(err);
    return 'N';
  }




}




export async function checkDuplicateMobile (
  mobile: string,
): Promise<string> {

  console.log('checkMobile mobile: ' + mobile);


  /*

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection.findOne<UserProps>(
    { mobile: mobile },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  console.log('checkMobile results: ' + results);

  if (results) {
    return 'Y';
  } else {
    return 'N';
  }
  */


  const connection = await connect();

  try {

    const [rows, fields] = await connection.query(
      'SELECT * FROM users WHERE mobile = ?',
      [mobile]
    ) as any;

    connection.release();

    if (rows[0]) {
        return 'Y';
    } else {
        return 'N';
    }
 
  } catch (err) {

    connection.release();
    console.error(err);
    return 'N';
  }


}





// create or update user contract
export async function updateContract (
  {
    contractName,
    contractVersion,
    contractStatus,
    contractContent,
  }: {
    contractName: string,
    contractVersion: string,
    contractStatus: string,
    contractContent: string,
  }
) {
  
    //console.log('updateContract contractName: ' + contractName);
    //console.log('updateContract contractVersion: ' + contractVersion);
    //console.log('updateContract contractStatus: ' + contractStatus);
    //console.log('updateContract contractContent: ' + contractContent);
  
    /*
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('user_contract');
  
    const results = await collection.updateOne(
      { contractName: contractName },
      { $set:
      
        {
          contractName: contractName,
          contractVersion: contractVersion,
          contractStatus: contractStatus,
          contractContent: contractContent,
        }
      },
      { upsert: true }
    );
  
    console.log('updateContract results: ' + results);
  
    return results;
    */

    // update where contractName is contractName

    const connection = await connect();

    try {

      const [rows, fields] = await connection.query(
        'UPDATE user_contract SET contractVersion = ?, contractStatus = ?, contractContent = ? WHERE contractName = ?',
        [contractVersion, contractStatus, contractContent, contractName]
      ) as any;

      connection.release();

      if (rows) {
          return rows;
      } else {
          return null;
      }

    } catch (err) {
      connection.release();
      console.error(err);
      return null;
    }



}



  // get user contract
export async function getContract (
  {
    contractName,
  }: {
    contractName: string,
  }

): Promise<string> {
  
    ///console.log('getContract contractName: ' + contractName);
  
    /*
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('user_contract');

    // when collection does not exist, create collection



  
    const results = await collection.findOne(
      { contractName: contractName },
      { projection: { _id: 0, contractName: 0, contractVersion: 0, contractStatus: 0 } }
    );
  
    console.log('getContract results: ' + results);
  
    return results?.contractContent || '';
    */


    const connection = await connect();

    try {

      const [rows, fields] = await connection.query(
        'SELECT contractContent FROM user_contract WHERE contractName = ?',
        [contractName]
      ) as any;

      connection.release();

      if (rows) {
          return rows[0].contractContent;
      } else {
          return '';
      }

    } catch (err) {
      connection.release();
      console.error(err);
      return '';
    }


}



// updateProfileById
/*
          id: _id,
          name: userName,
          nickname: userNickname,
          birthDate: userBirthDate,
          gender: userGender,
          avatar: userAvatar,
          weight: userWeight,
          height: userHeight,
          purpose: userPurpose,
          medicalHistory: userMedicalHistory,
          familyMedicalHistory: userFamilyMedicalHistory,
*/





export async function updateProfileById (
  {
    id,
    name,
    nickname,
    mobile,
    avatar,
    //생년월일
    birthDate,
    //성별
    gender,
    weight,
    height,
    purpose,
    medicalHistory,
    familyMedicalHistory,

  }: {
    id: number,
    name: string,
    nickname: string,
    mobile: string,
    avatar: string,
    //생년월일
    birthDate: string,
    gender: string,
    weight: number,
    height: number,
    purpose: string,
    medicalHistory: string,
    familyMedicalHistory: string,
  }
) {

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');


  //return await collection.updateOne({ username }, { $set: { bio } });

  // update on by id
  const results = await collection.updateOne(
    { id: id },
    { $set:
    
      {
        name: name,
        nickname: nickname,
        mobile: mobile,
        avatar: avatar,
        birthDate: birthDate,
        gender: gender,
        weight: weight,
        height: height,
        purpose: purpose,
        medicalHistory: medicalHistory,
        familyMedicalHistory: familyMedicalHistory,

      }
    }
  );


  ///console.log('updateProfileById results: ' + results);

  return results;
  */

  const connection = await connect();

  try {
  

    const [rows, fields] = await connection.query(
      'UPDATE users SET name = ?, nickname = ?, mobile = ?, avatar = ?, birthDate = ?, gender = ?, weight = ?, height = ?, purpose = ?, medicalHistory = ?, familyMedicalHistory = ? WHERE id = ?',
      [name, nickname, mobile, avatar, birthDate, gender, weight, height, purpose, medicalHistory, familyMedicalHistory, id]
    ) as any;

    connection.release();

    if (rows) {
        return rows;
    } else {
        return null;
    }

  } catch (err) {
    connection.release();
    console.error(err);
    return null;
  }


}


// sendVerificationCode
// generate 4 digit random number for verification code
// match mobile and uuid
// save it to mongodb
export async function sendVerificationCode (
  mobile: string,
  uuid: string,
) {


  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('user_verification_code');

  //const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const verificationCode = "1234";




  const results = await collection.updateOne(
    { mobile: _mobile, uuid: _uuid },
    { $set:
    
      {
        mobile: _mobile,
        uuid: _uuid,
        verificationCode: verificationCode,
        createdAt: new Date(),
      }
    },
    { upsert: true }
  );

  return results;
  */

  return null;

}


// verifyVerificationCode
// check if verification code is valid and  last 3 minutes afer createdAt
// if valid, then return 'Y'
// if not valid, then return user info

export async function verifyVerificationCode (
  _mobile: string,
  _uuid: string,
  _verificationCode: string,
): Promise<UserProps | null> {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('user_verification_code');

  const results = await collection.findOne(
    {
      mobile: _mobile, uuid: _uuid, verificationCode: _verificationCode,
      createdAt: {
        $gte: new Date(new Date().getTime() - 3 * 60 * 1000)
      }
    },
    { projection: { _id: 0, mobile: 0, uuid: 0, verificationCode: 0, createdAt: 0 } }

  );

  ///console.log('verifyVerificationCode results: ' + results);

  if (results) {

    const collectionUser = client.db('doingdoit').collection('users');

    // get user by mobile
    const resultsUser = await collectionUser.findOne<UserProps>(
      { mobile: _mobile },
      { projection: { _id: 0, emailVerified: 0 } }
    );
   
    return resultsUser || null;

  } else {

    return null;
  }

}







// sendVerificationCode
// generate 4 digit random number for verification code
// match mobile and uuid
// save it to mongodb
export async function sendVerificationCodeForEmail (
  _email: string,
  _uuid: string,
) {

  console.log('sendVerificationCodeForEmail=========== _email: ' + _email);
  console.log('sendVerificationCodeForEmail=========== _uuid: ' + _uuid);



  const connection = await connect();

  try {
      
      const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
  
      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>원클릭 인증번호</title>
        </head>
        <body>
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>원클릭 인증번호</h2>
            
            <h1>인증번호는 ${verificationCode} 입니다.</h1>
    
          </div>
        </body>
      </html>
      `;
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'doingdoit.cs@gmail.com',
        
          pass: 'jspk xmnr dmeo pdhu', // Gmail '앱 비밀번호'
  
        },
      });


    // 전송할 이메일 내용 설정
    const mailOptions = {

      from: 'doingdoit.cs@gmail.com',

      //to: 'songpalabs@gmail.com', //필자의 naver 계정에 보내보았다.

      to: _email,

      subject: '[원클릭] 인증번호',
      
      //text: html,

      html: html,

    };

    // 이메일 전송
    const info = await transporter.sendMail(mailOptions);

    console.log('이메일 전송 성공====', info.response);




    // if email is exist, then update verification code
    // if email is not exist, then insert verification code


    // check if email is exist

    console.log('check if email is exist _email: ' + _email);

    const [rows, fields] = await connection.query(
      'SELECT * FROM user_verification_code_email WHERE email = ?',
      [_email]
    ) as any;



    console.log('rows: ' + rows);

    if (rows[0]) {

      // update

      const [rows, fields] = await connection.query(
        'UPDATE user_verification_code_email SET verificationCode = ?, createdAt = ? WHERE email = ?',
        [verificationCode, new Date(), _email]
      ) as any;

      console.log('update rows: ' + rows);

    } else {

      // insert

      const [rows, fields] = await connection.query(
        'INSERT INTO user_verification_code_email (email, uuid, verificationCode, createdAt) VALUES (?, ?, ?, ?)',
        [_email, _uuid, verificationCode, new Date()]
      ) as any;

      console.log('insert rows: ' + rows);

    }

  

    connection.release();

    return rows;


  } catch (error) {

    connection.release();
    console.error('이메일 전송 실패:', error);
    return null;

  }
    

}





// verifyVerificationCode
// check if verification code is valid and  last 3 minutes afer createdAt
// if valid, then return 'Y'
// if not valid, then return user info

export async function verifyVerificationCodeByEmail (
  _email: string,
  _uuid: string,
  _verificationCode: string,
): Promise<UserProps | null> {


  console.log('verifyVerificationCodeByEmail _email: ' + _email);
  console.log('verifyVerificationCodeByEmail _uuid: ' + _uuid);
  console.log('verifyVerificationCodeByEmail _verificationCode: ' + _verificationCode);



  const connection = await connect();

  try {

    /*
    const [rows, fields] = await connection.query(
      'SELECT * FROM user_verification_code_email WHERE email = ? AND uuid = ? AND verificationCode = ? AND createdAt >= ?',
      [_email, _uuid, _verificationCode, new Date(new Date().getTime() - 3 * 60 * 1000)]
    ) as any;
    */

    const [rows, fields] = await connection.query(
      'SELECT * FROM user_verification_code_email WHERE email = ? AND verificationCode = ? AND createdAt >= ?',
      [_email, _verificationCode, new Date(new Date().getTime() - 3 * 60 * 1000)]
    ) as any;

    connection.release();

    if (rows[0]) {

      const connectionUser = await connect();

      try {

        const [rowsUser, fieldsUser] = await connectionUser.query(
          'SELECT * FROM users WHERE email = ?',
          [_email]
        ) as any;

        connectionUser.release();

        if (rowsUser[0]) {
            return rowsUser[0];
        } else {
            return null;
        }

      } catch (err) {
        connectionUser.release();
        console.error(err);
        return null;
      }

    } else {
      return null;
    }

  } catch (err) {
    connection.release();
    console.error(err);
    return null;
  }

}




// updatePasswordByEmail

export async function updatePasswordByEmail (
  _email: string,
  _password: string,
) {



  const connection = await connect();

  try {
      
      const [rows, fields] = await connection.query(
        'UPDATE users SET password = ? WHERE email = ?',
        [_password, _email]
      ) as any;
  
      connection.release();
  
      if (rows) {
          return rows;
      } else {
          return null;
      }
  
    
  } catch (err) {
    connection.release();
    console.error(err);
    return null;
  }



}








/* delete one */
export async function deleteOne(
  id: string,
): Promise<any> {

  const connection = await connect();

  try {

    // get email from users table where id is id
    const [rowsEmail, fieldsEmail] = await connection.query(
      'SELECT email FROM users WHERE id = ?',
      [parseInt(id)]
    ) as any;

    let userEmail = '';
    if (rowsEmail[0]) {
      userEmail = rowsEmail[0].email;
    } else {
      return null;
    }

    // delete user_visit_history having userId
    const [rowsVisitHistory, fieldsVisitHistory] = await connection.query(
      'DELETE FROM user_visit_history WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete surveys having userId

    const [rowsSurvey, fieldsSurvey] = await connection.query(
      'DELETE FROM surveys WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete points having userId
    const [rowsPoint, fieldsPoint] = await connection.query(
      'DELETE FROM points WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete notifications having userId
    const [rowsNotification, fieldsNotification] = await connection.query(
      'DELETE FROM notifications WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete likes having userId
    const [rowsLike, fieldsLike] = await connection.query(
      'DELETE FROM likes WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete comment_replies having userId
    const [rowsCommentReply, fieldsCommentReply] = await connection.query(
      'DELETE FROM comment_replies WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete comments having userId
    const [rowsComment, fieldsComment] = await connection.query(
      'DELETE FROM comments WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete boards having userId
    const [rowsBoard, fieldsBoard] = await connection.query(
      'DELETE FROM boards WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete user_foods having userId
    const [rowsUserFood, fieldsUserFood] = await connection.query(
      'DELETE FROM user_foods WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete favorite_foods having userId
    const [rowsFavoriteFood, fieldsFavoriteFood] = await connection.query(
      'DELETE FROM favorite_foods WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;



    // delete user_verification_code_email having email
    
    const [rowsVerificationCodeEmail, fieldsVerificationCodeEmail] = await connection.query(
      'DELETE FROM user_verification_code_email WHERE email = ?',
      [
        userEmail,
      ]
    ) as any;
    


    // delete feeds, feed_likes, feed_scraps having userId

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('feeds');
  
  
  
  
  
    const result =  await collection.deleteOne({
      email: userEmail,
    });
  
    console.log('deleteOne result: ' + result);
  
    
    // delete all feed_scraps having feedId
    // delete all feed_likes having feedId
  
    const collectionFeedScrap = client.db('doingdoit').collection('feed_scraps');
  
    
    await collectionFeedScrap.deleteMany({
      userEmail: userEmail,
    });
    
  
    const collectionFeedLike = client.db('doingdoit').collection('feed_likes');
  
    await collectionFeedLike.deleteMany({
      userEmail: userEmail,
    });





    /*
    // delete feed_likes having userId
    const [rowsFeedLike, fieldsFeedLike] = await connection.query(
      'DELETE FROM feed_likes WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete feed_scraps having userId
    const [rowsFeedScrap, fieldsFeedScrap] = await connection.query(
      'DELETE FROM feed_scraps WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;

    // delete feeds having userId
    const [rowsFeed, fieldsFeed] = await connection.query(
      'DELETE FROM feeds WHERE userId = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;
    */



  





    // delete users having id

    const [rowsUser, fieldsUser] = await connection.query(
      'DELETE FROM users WHERE id = ?',
      [
        //id
        parseInt(id),
      ]
    ) as any;







    const query2 = `
    SELECT id FROM users WHERE status = ? AND roles = ?
    ORDER BY createdAt ASC
    `;
    const value2 = ['active', 'admin'];

    const [rowsUsers, fieldsUsers] = await connection.query(query2, value2) as any;

    for (let i = 0; i < rowsUsers.length; i++) {

      // update sequence number
      const query = `
      UPDATE users SET sequenceNumber = ? WHERE id = ?
      `;
      const values = [i + 1, rowsUsers[i].id];

      await connection.query(query, values);

    }





    connection.release();

    if (rowsUser) {
        return rowsUser;

    } else {
        return null;
    }



  } catch (err) {
    connection.release();
    console.error(err);
    return null;
  }


}






// withdraw user

export async function withdrawByEmail (
  _email: string,
) {

  console.log('withdrawByEmail _email: ' + _email);



  // update users set status = 'withdraw', withdrawAt = now() where email = _email

  const connection = await connect();

  try {
      
      const [rows, fields] = await connection.query(
        'UPDATE users SET status = ?, withdrawAt = ? WHERE email = ?',
        ['withdraw', new Date(), _email]
      ) as any;






    // fetch users from db which is matched with status is 'active' and reles is 'user' order by createdAt asc
      // and then update "sequenceNumber" field to sequence number from 1 to count of users

    
      const query = `
      SELECT id FROM users WHERE status = ? AND roles = ? AND nickname IS NOT NULL
      ORDER BY createdAt ASC
      `;
      const values = ['active', 'user'];

      const [rowsUsers, fieldsUsers] = await connection.query(query, values) as any;

      for (let i = 0; i < rowsUsers.length; i++) {

        // update sequence number
        const query = `
        UPDATE users SET sequenceNumber = ? WHERE id = ?
        `;
        const values = [i + 1, rowsUsers[i].id];

        await connection.query(query, values);

      }

      const query2 = `
      SELECT id FROM users WHERE status = ? AND roles = ? AND nickname IS NOT NULL
      ORDER BY createdAt ASC
      `;
      const values2 = ['withdraw', 'user'];

      const [rowsUsers2, fieldsUsers2] = await connection.query(query2, values2) as any;

      for (let i = 0; i < rowsUsers2.length; i++) {

        // update sequence number
        const query = `
        UPDATE users SET sequenceNumber = ? WHERE id = ?
        `;
        const values = [i + 1, rowsUsers2[i].id];

        await connection.query(query, values);

      }








  
      connection.release();
  
      if (rows) {
          return rows;
      } else {
          return null;
      }
  
    } catch (err) {
      connection.release();
      console.error(err);
      return null;
    }


}



// withdraw recovery user

export async function withdrawRecoveryById (
  id: string,
) {

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection.updateOne(
    { id: id },
    { $set:
    
      {
        status: 'active',
      }
    }
  );
  */

  const connection = await connect();

  try {
      
      const [rows, fields] = await connection.query(
        'UPDATE users SET status = ? WHERE id = ?',
        ['active', id]
      ) as any;
  





    // fetch users from db which is matched with status is 'active' and reles is 'user' order by createdAt asc
      // and then update "sequenceNumber" field to sequence number from 1 to count of users

    
      const query = `
      SELECT id FROM users WHERE status = ? AND roles = ? AND nickname IS NOT NULL
      ORDER BY createdAt ASC
      `;
      const values = ['active', 'user'];

      const [rowsUsers, fieldsUsers] = await connection.query(query, values) as any;

      for (let i = 0; i < rowsUsers.length; i++) {

        // update sequence number
        const query = `
        UPDATE users SET sequenceNumber = ? WHERE id = ?
        `;
        const values = [i + 1, rowsUsers[i].id];

        await connection.query(query, values);

      }

      const query2 = `
      SELECT id FROM users WHERE status = ? AND roles = ? AND nickname IS NOT NULL
      ORDER BY createdAt ASC
      `;
      const values2 = ['withdraw', 'user'];

      const [rowsUsers2, fieldsUsers2] = await connection.query(query2, values2) as any;

      for (let i = 0; i < rowsUsers2.length; i++) {

        // update sequence number
        const query = `
        UPDATE users SET sequenceNumber = ? WHERE id = ?
        `;
        const values = [i + 1, rowsUsers2[i].id];

        await connection.query(query, values);

      }




      connection.release();
  
      if (rows) {
          return rows;
      } else {
          return null;
      }
  
    } catch (err) {
      connection.release();
      console.error(err);
      return null;
    }

}









export async function getAttendanceCountByUserId(
  userId: number,
) {
      

  const connection = await connect();

  try {


    // get count of attendance by userId
    // get count of attendance from points table where title is 'attendance' and userId is userId

    const query = `
    SELECT COUNT(*) AS count FROM points
    WHERE title = 'attendance' AND userId = ?
    `;

    const values = [userId];

    const [rows, fields] = await connection.query(query, values) as any;

    console.log('getAttendanceCountByUserId rows: ' + rows);



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









export async function getStatisticsDaily(
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


  
  const connection = await connect();

  try {

    const query = `
    SELECT 
    DATE_FORMAT(createdAt, '%Y-%m-%d') AS day,
    COUNT(*) AS count
    FROM users
    WHERE createdAt BETWEEN ? AND ?
    GROUP BY DATE_FORMAT(createdAt, '%Y-%m-%d')
    ORDER BY DATE_FORMAT(createdAt, '%Y-%m-%d') ASC
    `;

    const values = [startDate, endDate];

    const [rows, fields] = await connection.query(query, values) as any;

    ///console.log('getStatisticsDaily rows: ' + rows);

    connection.release();

    if (rows) {
      return rows;
    } else {
      return [];
    }

  } catch (error) {
    connection.release();
    console.error('getStatisticsDaily error: ', error);
    return [];
  }

}




export async function getStatisticsDailyVisit(
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


  
  const connection = await connect();

  try {

    /*
    const query = `
    SELECT 
    DATE_FORMAT(createdAt, '%Y-%m-%d') AS day,
    COUNT(*) AS 가입자수
    FROM users
    WHERE createdAt >= ? AND createdAt < ?
    GROUP BY DATE_FORMAT(createdAt, '%Y-%m-%d')
    ORDER BY DATE_FORMAT(createdAt, '%Y-%m-%d') ASC
    `;
    */

    // user_visit_history

    const query = `
    SELECT
    DATE_FORMAT(createdAt, '%Y-%m-%d') AS day,
    COUNT(*) AS count
    FROM user_visit_history
    WHERE createdAt BETWEEN ? AND ?
    GROUP BY DATE_FORMAT(createdAt, '%Y-%m-%d')
    ORDER BY DATE_FORMAT(createdAt, '%Y-%m-%d') ASC
    `;




    const values = [startDate, endDate];

    const [rows, fields] = await connection.query(query, values) as any;

    ///console.log('getStatisticsDailyVisit rows: ' + rows);

    connection.release();

    if (rows) {
      return rows;
    } else {
      return [];
    }

  } catch (error) {
    connection.release();
    console.error('getStatisticsDaily error: ', error);
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

  // get total user count
  // get today user count

  const connection = await connect();

  try {

    const query = `
    SELECT 
    COUNT(*) AS totalUserCount
    FROM users
    WHERE roles = 'user' AND nickname IS NOT NULL AND status = 'active'
    `;

    const values = [] as any;

    const [rows, fields] = await connection.query(query, values) as any;

    
    const queryToday = `
    SELECT
    COUNT(*) AS todayUserCount
    FROM users
    WHERE roles = 'user' AND nickname IS NOT NULL AND status = 'active'
    AND DATE_FORMAT(createdAt, '%Y-%m-%d') = DATE_FORMAT(?, '%Y-%m-%d')
    `;

    
    const valuesToday = [ new Date() ];



    //const valuesToday = [new Date()];

    const [rowsToday, fieldsToday] = await connection.query(queryToday, valuesToday) as any;


    // total withdraw user count
    // today withdraw user count

    const queryWithdraw = `
    SELECT
    COUNT(*) AS totalWithdrawUserCount
    FROM users
    WHERE status = 'withdraw'
    `;
    const valuesWithdraw = [] as any;

    const [rowsWithdraw, fieldsWithdraw] = await connection.query(queryWithdraw, valuesWithdraw) as any;


    const queryWithdrawToday = `
    SELECT
    COUNT(*) AS todayWithdrawUserCount
    FROM users
    WHERE status = 'withdraw' AND DATE_FORMAT(withdrawAt, '%Y-%m-%d') = DATE_FORMAT(?, '%Y-%m-%d')
    `;
    const valuesWithdrawToday = [ new Date() ];

    const [rowsWithdrawToday, fieldsWithdrawToday] = await connection.query(queryWithdrawToday, valuesWithdrawToday) as any;








    connection.release();

    if (rows) {
      return {
        totalUserCount: rows[0].totalUserCount,
        todayUserCount: rowsToday[0].todayUserCount,
        totalWithdrawUserCount: rowsWithdraw[0].totalWithdrawUserCount,
        todayWithdrawUserCount: rowsWithdrawToday[0].todayWithdrawUserCount,
      };
    } else {
      return {
        totalUserCount: 0,
        todayUserCount: 0,
        totalWithdrawUserCount: 0,
        todayWithdrawUserCount: 0,
      };
    }

  } catch (error) {
    connection.release();
    console.error('getStatisticsSummary error: ', error);
    return {
      totalUserCount: 0,
      todayUserCount: 0,
      totalWithdrawUserCount: 0,
      todayWithdrawUserCount: 0,
    };
  }

}










export async function getAllForDownload({

  sort,
  order,
  q,
  startDate,
  endDate,
  regTypeArray,

}: {

  sort: string,
  order: string,
  q: string,
  startDate: string,
  endDate: string,
  regTypeArray: string[],

}): Promise<UserProps[]> {


  const connection = await connect();

  try {

      if (!sort) {
          sort = 'createdAt';
      }
      
      if (!order) {
          order = 'desc';
      }
      

      /// nickname IS NOT NULL


      const query = `
      SELECT * FROM users
      WHERE
      
      roles = ? AND status = ?

      AND nickname IS NOT NULL

      
      AND (email LIKE ? OR name LIKE ? OR nickname LIKE ?)
      AND createdAt >= ?
      AND createdAt < ?
      AND regType IN (?)
      ORDER BY ${sort} ${order}
      `;


      const values = [
          'user',
          'active',
          `%${q}%`,
          `%${q}%`,
          `%${q}%`,
          startDate,
          endDate,
          regTypeArray,
      ];

      const [rows, fields] = await connection.query(query, values) as any
  
      if (rows) {
          return rows
      } else {
          return [];
      }

  } catch (error) {

      connection.release();

      console.error('getAllForDownload error: ', error);
      return [];

  }

}







export async function getWithdrawForDownload({

  sort,
  order,
  q,
  startDate,
  endDate,
  regTypeArray,

}: {

  sort: string,
  order: string,
  q: string,
  startDate: string,
  endDate: string,
  regTypeArray: string[],

}): Promise<UserProps[]> {


  const connection = await connect();

  try {

      if (!sort) {
          sort = 'createdAt';
      }
      
      if (!order) {
          order = 'desc';
      }
      

      //// nickname IS NOT NULL


      const query = `
      SELECT * FROM users
      WHERE
      
      roles = ? AND status = ?
      AND (email LIKE ? OR name LIKE ? OR nickname LIKE ?)
      AND withdrawAt >= ?
      AND withdrawAt < ?
      AND regType IN (?)
      ORDER BY ${sort} ${order}
      `;


      const values = [
          'user',
          'withdraw',
          `%${q}%`,
          `%${q}%`,
          `%${q}%`,
          startDate,
          endDate,
          regTypeArray,
      ];

      const [rows, fields] = await connection.query(query, values) as any
  
      if (rows) {
          return rows
      } else {
          return [];
      }

  } catch (error) {

      connection.release();

      console.error(' error: ', error);
      return [];

  }

}


// get all feedbackWriter list
// access field is json
// where access_feed is true

export async function getAllFeedbackWriterList(): Promise<UserProps[]> {

  /////console.log('getAllFeedbackWriterList');
  

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

    
    ///console.log('getAllFeedbackWriterList rows: ' + JSON.stringify(rows));



    if (rows) {
        return rows
    } else {
        return [];
    }

  } catch (error) {

    connection.release();

    console.error('getAllFeedbackWriterList error: ', error);
    return [];

  }

}