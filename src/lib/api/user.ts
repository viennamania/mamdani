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

  stabilityId: string,
  storecode: string,
  sellerWalletAddress: string,


  sellerAccountName: string,
  sellerBankName: string,
  sellerAccountNumber: string,

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



export async function getUserById(_id: object): Promise<UserProps | null> {

  console.log('getUserById _id: ' + _id);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection.findOne<UserProps>(
    { id: _id },
    { projection: { _id: 0, emailVerified: 0 } }
    ////{ projection: { _id: 0, emailVerified: 0 } }
  );

  console.log('getUserById results: ' + results);

  if (results) {
    return {
      ...results,
      //bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}







export async function getUser(id: number): Promise<UserProps | null> {

  console.log('getUser id: ' + id);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');
  const results = await collection.findOne<UserProps>(
    { id },
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




export async function getUserByMobile(mobile: string): Promise<UserProps | null> {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');
  const results = await collection.findOne<UserProps>(
    { mobile: mobile },
    { projection: { _id: 0, emailVerified: 0 } }
    ////{ projection: { _id: 0, emailVerified: 0 } }
  );


  return results || null;

}






export async function getUserByEmail(email: string): Promise<UserProps | null> {

  console.log('getUserByEmail email: ' + email);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');
  const results = await collection.findOne<UserProps>(
    { email: email },
    { projection: { _id: 0, emailVerified: 0 } }
    ////{ projection: { _id: 0, emailVerified: 0 } }
  );

  ////console.log('getUserByEmail results: ' + results);

  if (!results) {
    return null;
  }


  // user history insert or update
  // 데일리 영어로


  const collectionHistory = client.db('doingdoit').collection('user_daily_history');
  /// '2023-12-05' access count 55
  /// '2023-12-06' access count 22
  // korean time is utc + 9
  // format '2023-12-06'

  const todayDate = new Date().toISOString().slice(0, 10);

  

  const resultsHistory = await collectionHistory.findOne<UserProps>(
    {
      email: email,
      date: todayDate,
    },
    { projection: { _id: 0, emailVerified: 0 } }
    ////{ projection: { _id: 0, emailVerified: 0 } }
  );

  
  if (resultsHistory) {

    const resultsHistoryUpdate = await collectionHistory.updateOne(
      {
        email: email,
        date: todayDate,
      },
      { $inc: { count: 1 } }
    );
  } else {
      
    const resultsHistoryInsert = await collectionHistory.insertOne(
      {
        email: email,
        date: todayDate,
        count: 1,
      }
    );
  }



  if (results) {
    return {
      ...results,
      //bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}



export async function getFirstUser(): Promise<UserProps | null> {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');
  const results = await collection.findOne<UserProps>(
    {},
    {
      projection: { _id: 0, emailVerified: 0 }
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


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection
  .aggregate<UserProps>([

    {
      $match: {

        // valide email address
        email: {
          $regex: '@',
          $options: 'i'
        },

        // if nickname is not exist, then exclude it
        //nickname: {
        //  $exists: true
        //},


        
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
          { mobile: { $regex: query, $options: 'i' } },
          { nickname: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      },
    },

    // regTypeArray match
    {
      $match: {
        regType: {
          $in: regTypeArray,
        },
      },
    },

    // startDate, endDate match for createdAt

    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },

  

    // when  regType is 'all', then return all users
    // and when regType is 'email', 'kakao', 'naver', 'google', 'apple', then return users by regType
   

    

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


  const resultsCount = await collection.aggregate([
    {
      $match: {

        // valide email address
        email: {
          $regex: '@',
          $options: 'i'
        },

        // if nickname is not exist, then exclude it
        //nickname: {
        //  $exists: true
        //},
        
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
          { mobile: { $regex: query, $options: 'i' } },
          { nickname: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      },
    },

    // regTypeArray match
    {
      $match: {
        regType: {
          $in: regTypeArray,
        },
      },
    },

    // startDate, endDate match for createdAt

    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },
    
    {
      $count: 'count',
    },
  ]).toArray();


 


  return {
    _id: '1',
    users: results,
    totalCount: resultsCount[0]?.count || 0,
  };

  
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





/*

        name: userName,
        nickname: userNickname,
        mobile: userMobile,

        //birthDate: userBirthDate,
        ///birthDate: `${userBirthDateYear}-${userBirthDateMonth}-${userBirthDateDay}`,
        //birthDate: userBirthDate,
        /// userBirthDate => 2022-01-01
        // convert month to 1 ~ 12

        birthDate: `${userBirthDateYear}-${userBirthDateMonth + 1}-${userBirthDateDay}`,


        gender: userGender,
        avatar: userAvatar,
        weight: userWeight,
        height: userHeight,
        purpose: userPurposeValue,
        medicalHistory: userMedicalHistory,
        familyMedicalHistory: userFamilyMedicalHistory,

        stabilityId: stabilityId ? stabilityId : '',
        */


/* set user */
export async function setUser (

  {
    email,
    password,
    regType,
    isAgreedTerms,
    isAgreedPrivacy,
    isAgreedMarketing,

    name,
    nickname,
    mobile,
    birthDate,
    gender,
    avatar,
    weight,
    height,
    purpose,
    medicalHistory,
    familyMedicalHistory,
    stabilityId,
  }: {
    email: string,
    password: string,
    regType: string,
    isAgreedTerms: string,
    isAgreedPrivacy: string,
    isAgreedMarketing: string,

    name: string,
    nickname: string,
    mobile: string,
    birthDate: string,
    gender: string,
    avatar: string,
    weight: number,
    height: number,
    purpose: string,
    medicalHistory: string,
    familyMedicalHistory: string,
    stabilityId: string,

  } 
): Promise<UserProps | null> {


    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('users');
  

    // delete all documents wherer email is ''
    const resultsDelete = await collection.deleteMany({ email: '' });






      /* check if email exists */
      const resultsCheck = await collection.findOne<UserProps>(
        { email: email },
        { projection: { _id: 0, emailVerified: 0 } }
      );

      if (resultsCheck) {
        return null;
      }


    // get sequence number and increment it

    // random 6 digit number
    const id = Math.floor(100000 + Math.random() * 900000).toString();

    //console.log('setUser email: ' + email);
    //console.log('setUser password: ' + password);
    ///console.log('setUser id: ' + id);

  

    // insert one document and read it
    const res1 = await collection.insertOne(
      {
        id: id,
        email: email,
        password: password,
        regType: regType,
        isAgreedTerms: isAgreedTerms,
        isAgreedPrivacy: isAgreedPrivacy,
        isAgreedMarketing: isAgreedMarketing,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),


        roles: [
          'user',
          //'admin',
          //'moderator',
          //'writer',
          //'editor',
        ],

        name: name,
        nickname: nickname,
        mobile: mobile,
        birthDate: birthDate,
        gender: gender,
        avatar: avatar,
        weight: weight,
        height: height,
        purpose: purpose,
        medicalHistory: medicalHistory,
        familyMedicalHistory: familyMedicalHistory,
        stabilityId: stabilityId,
      }
    );


    return await collection.findOne<UserProps>(
      { id: id },
      { projection: { _id: 0, emailVerified: 0 } }
    );
    


    //console.log('setUser res1: ' + res1);

    /*
    const results =  await collection.findOne(
      {
        id: id,
      }
    );

    console.log('setUser results: ' + results); 
  
    
    
    //return results;

    if (results) {
      return {
        ...results,
        //bioMdx: await getMdxSource(results.bio || placeholderBio)
      };
    } else {
      return null;
    }
    */



  
}



// checkEmailRegistered
export async function checkEmailRegistered(email: string): Promise<any> {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');
  const results = await collection.findOne<UserProps>(
    { email: email },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  /*
      result: 'Y',
      regType: regType,
      status: status,
  */

  if (results) {
    return {
      result: 'Y',
      regType: results.regType,
      status: results.status,
    };
  } else {
    return {
      result: 'N',
      regType: null,
      status: null,
    };
  }
}



// getUserByLoginId

// convert mysql function to mongodb
/*
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
*/
// converted mongodb function

export async function getUserByLoginId(loginId: string): Promise<UserProps | null> {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');
  const results = await collection.findOne<UserProps>(
    { email: loginId },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    
    // insert user visit history
    const collectionVisit = client.db('doingdoit').collection('user_visit_history');
    const resultsVisit = await collectionVisit.insertOne(
      {
        createdAt: new Date(),
        userId: results.id,
        pageUrl: 'login',
        ip: 'ip',
        userAgent: 'userAgent',
      }
    );
    return results;
  } else {
    return null;
  }
}



/* set user */
export async function setManager (

  {
    email,
    password,
    regType,
    roles,
    isAgreedTerms,
    isAgreedPrivacy,
    isAgreedMarketing,
  }: {
    email: string,
    password: string,
    regType: string,
    roles: string,
    isAgreedTerms: string,
    isAgreedPrivacy: string,
    isAgreedMarketing: string,

  } 
): Promise<UserProps | null> {

  /*
    {
      email,
      password,
      regType,
      isAgreedTerms,
      isAgreedPrivacy,
      isAgreedMarketing,
    }: {
      email: string,
      password: string,
      regType: string,
      isAgreedTerms: string,
      isAgreedPrivacy: string,
      isAgreedMarketing: string,

    }
  ) {
    */

    console.log('setUser email: ' + email);
    console.log('setUser password: ' + password);
    console.log('setUser regType: ' + regType);
    console.log('setUser isAgreedTerms: ' + isAgreedTerms);
    console.log('setUser isAgreedPrivacy: ' + isAgreedPrivacy);
    console.log('setUser isAgreedMarketing: ' + isAgreedMarketing);


    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('users');
  

    // delete all documents wherer email is ''
    const resultsDelete = await collection.deleteMany({ email: '' });






      /* check if email exists */
      const resultsCheck = await collection.findOne<UserProps>(
        { email: email },
        { projection: { _id: 0, emailVerified: 0 } }
      );

      if (resultsCheck) {
        return null;
      }


    // get sequence number and increment it

    // random 6 digit number
    const id = Math.floor(100000 + Math.random() * 900000).toString();

    //console.log('setUser email: ' + email);
    //console.log('setUser password: ' + password);
    ///console.log('setUser id: ' + id);

  

    // insert one document and read it
    const res1 = await collection.insertOne(
      {
        id: id,
        email: email,
        password: password,
        regType: regType,
        isAgreedTerms: isAgreedTerms,
        isAgreedPrivacy: isAgreedPrivacy,
        isAgreedMarketing: isAgreedMarketing,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),


        roles: [
          'user',
          //'admin',
          //'moderator',
          //'writer',
          //'editor',
        ],
      }
    );


    return await collection.findOne<UserProps>(
      { id: id },
      { projection: { _id: 0, emailVerified: 0 } }
    );
    


    //console.log('setUser res1: ' + res1);

    /*
    const results =  await collection.findOne(
      {
        id: id,
      }
    );

    console.log('setUser results: ' + results); 
  
    
    
    //return results;

    if (results) {
      return {
        ...results,
        //bioMdx: await getMdxSource(results.bio || placeholderBio)
      };
    } else {
      return null;
    }
    */



  
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

      sellerAccountName,
      sellerBankName,
      sellerAccountNumber,

      stabilityId,
      storecode,
      sellerWalletAddress,
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

      sellerAccountName: string,
      sellerBankName: string,
      sellerAccountNumber: string,

      stabilityId: string,
      storecode: string,
      sellerWalletAddress: string,
    }
  ) {



    console.log('sellerAccountName: ' + sellerAccountName);
    console.log('sellerBankName: ' + sellerBankName);
    console.log('sellerAccountNumber: ' + sellerAccountNumber);


    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('users');
  

    //return await collection.updateOne({ username }, { $set: { bio } });

    // update on by email
    // if value is undefined, then do not update it
    /*
    const results = await collection.updateOne(
      { email: email },
      { $set:
      
        {
          name: name,
          nickname: nickname,
          birthDate: birthDate,
          emailVerified: emailVerified,
          mobile: mobile,
          avatar: avatar,
          gender: gender,
          weight: weight,
          height: height,
          purpose: purpose,
          marketingAgree: marketingAgree,
          medicalHistory: medicalHistory,
          familyMedicalHistory: familyMedicalHistory,
          password: password,

          sellerAccountNumber: sellerAccountNumber,

        }
      }
    );
    */
   
    // if value is undefined, then do not update it
    const updateFields: any = {};

    if (name !== undefined) updateFields.name = name;
    if (nickname !== undefined) updateFields.nickname = nickname;
    if (birthDate !== undefined) updateFields.birthDate = birthDate;
    if (emailVerified !== undefined) updateFields.emailVerified = emailVerified;
    if (mobile !== undefined) updateFields.mobile = mobile;
    if (avatar !== undefined) updateFields.avatar = avatar;
    if (gender !== undefined) updateFields.gender = gender;
    if (weight !== undefined) updateFields.weight = weight;
    if (height !== undefined) updateFields.height = height;
    if (purpose !== undefined) updateFields.purpose = purpose;
    if (marketingAgree !== undefined) updateFields.marketingAgree = marketingAgree;
    if (medicalHistory !== undefined) updateFields.medicalHistory = medicalHistory;
    if (familyMedicalHistory !== undefined) updateFields.familyMedicalHistory = familyMedicalHistory;
    
    if (password !== undefined && password !== '') updateFields.password = password;
    
    if (sellerAccountName !== undefined) updateFields.sellerAccountName = sellerAccountName;
    if (sellerBankName !== undefined) updateFields.sellerBankName = sellerBankName;
    if (sellerAccountNumber !== undefined) updateFields.sellerAccountNumber = sellerAccountNumber;
    
    if (stabilityId !== undefined) updateFields.stabilityId = stabilityId;
    if (storecode !== undefined) updateFields.storecode = storecode;
    if (sellerWalletAddress !== undefined) updateFields.sellerWalletAddress = sellerWalletAddress;

    const results = await collection.updateOne(
      { email: email },
      { $set: updateFields }
    );
 

    return results;
  
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
  
    // if value is undefined, then do not update it
    const updateFields: any = {};
    if (name !== undefined) updateFields.name = name;
    if (nickname !== undefined) updateFields.nickname = nickname;
    if (birthDate !== undefined) updateFields.birthDate = birthDate;
    if (avatar !== undefined) updateFields.avatar = avatar;
    if (gender !== undefined) updateFields.gender = gender;
    if (weight !== undefined) updateFields.weight = weight;
    if (height !== undefined) updateFields.height = height;
    if (purpose !== undefined) updateFields.purpose = purpose;
    if (medicalHistory !== undefined) updateFields.medicalHistory = medicalHistory;
    if (familyMedicalHistory !== undefined) updateFields.familyMedicalHistory = familyMedicalHistory;


    const results = await collection.updateOne(
      { id: id },
      { $set: updateFields }
    );


    // update on by id
    /*
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
    */


    console.log('updateUserById results: ' + results);

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

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('users');

    const results = await collection.updateOne(
      { id: id },
      { $set:
      
        {
          avatar: avatar,
        }
      }
    );

    return results;
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

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('users');

    const results = await collection.updateOne(
      { email: email },
      { $set:
      
        {
          avatar: avatar,
        }
      }
    );

    return results;
  }


  export async function updateWalletAddressByEmail (
    {
      email,
      walletAddress,
    }: {
      email: string,
      walletAddress: string,
    }
  ) {

    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('users');

    const results = await collection.updateOne(
      { email: email },
      { $set:
      
        {
          walletAddress: walletAddress,
        }
      }
    );

    return results;
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

  const query = q || '';


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection
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

    // regTypeArray match
    {
      $match: {
        regType: {
          $in: regTypeArray,
        },
      },
    },

    // startDate, endDate match for createdAt

    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },

  

    // when  regType is 'all', then return all users
    // and when regType is 'email', 'kakao', 'naver', 'google', 'apple', then return users by regType
   

    

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


  const resultsCount = await collection.aggregate([
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

    // regTypeArray match
    {
      $match: {
        regType: {
          $in: regTypeArray,
        },
      },
    },

    // startDate, endDate match for createdAt

    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },
    
    {
      $count: 'count',
    },
  ]).toArray();


 


  return {
    _id: '1',
    users: results,
    totalCount: resultsCount[0]?.count || 0,
  };

  
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










// check duplicate email and return true or false

export async function checkDuplicateEmail (
  _email: string,
): Promise<string> {

  ///console.log('checkDuplicateEmail _email: ' + _email);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection.findOne<UserProps>(
    { email: _email },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  console.log('checkDuplicateEmail results: ' + results);

  if (results) {
    return 'Y';
  } else {
    return 'N';
  }
}



// check duplicate nickname and return true or false
export async function checkDuplicateNickname (
  _nickname: string,
): Promise<string> {

  console.log('checkDuplicateNickname _nickname: ' + _nickname);

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
}




export async function checkDuplicateMobile (
  _mobile: string,
): Promise<string> {

  console.log('checkMobile _mobile: ' + _mobile);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection.findOne<UserProps>(
    { mobile: _mobile },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  console.log('checkMobile results: ' + results);

  if (results) {
    return 'Y';
  } else {
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
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('user_contract');

    // when collection does not exist, create collection



  
    const results = await collection.findOne(
      { contractName: contractName },
      { projection: { _id: 0, contractName: 0, contractVersion: 0, contractStatus: 0 } }
    );
  
    console.log('getContract results: ' + results);
  
    return results?.contractContent || '';
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
    id: string,
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

}


// sendVerificationCode
// generate 4 digit random number for verification code
// match mobile and uuid
// save it to mongodb
export async function sendVerificationCode (
  _mobile: string,
  _uuid: string,
) {

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

  console.log('sendVerificationCodeForEmail _email: ' + _email);
  console.log('sendVerificationCodeForEmail _uuid: ' + _uuid);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('user_verification_code_email');

  const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

  ///const verificationCode = "1234";



  //const html = `인증번호는 ${verificationCode} 입니다.`;
  /*
     <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>인증번호</h2>
      <p>인증번호는 ${verificationCode} 입니다.</p>
    </div>
    */

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


  try {
    // Nodemailer transporter 생성
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'doingdoit.cs@gmail.com',
        
        pass: 'jspk xmnr dmeo pdhu', // Gmail '앱 비밀번호'

      },
    });
    

    /*
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
          user: 'doingdoit.cs@gmail.com', 
          pass: 'jspk xmnr dmeo pdhu' 
      }
    });
    */



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

    console.log('이메일 전송 성공:', info.response);

  

  } catch (error) {
   
    console.error('이메일 전송 실패:', error);


  
  }









  const results = await collection.updateOne(
    { email: _email, uuid: _uuid },
    { $set:
    
      {
        email: _email,
        uuid: _uuid,
        verificationCode: verificationCode,
        createdAt: new Date(),
      }
    },
    { upsert: true }
  );

  return results;

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

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('user_verification_code_email');

  const results = await collection.findOne(
    {
      email: _email, uuid: _uuid, verificationCode: _verificationCode,
      createdAt: {
        $gte: new Date(new Date().getTime() - 3 * 60 * 1000)
      }
    },
    { projection: { _id: 0, email: 0, uuid: 0, verificationCode: 0, createdAt: 0 } }

  );

  console.log('verifyVerificationCode results: ' + results);

  if (results) {

    const collectionUser = client.db('doingdoit').collection('users');

    // get user by mobile
    const resultsUser = await collectionUser.findOne<UserProps>(
      { email: _email },
      { projection: { _id: 0, emailVerified: 0 } }
    );
   
    return resultsUser || null;

  } else {

    return null;
  }

}




// updatePasswordByEmail

export async function updatePasswordByEmail (
  _email: string,
  _password: string,
) {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection.updateOne(
    { email: _email },
    { $set:
    
      {
        password: _password,
      }
    }
  );

  return results;

}








/* delete one */
export async function deleteOne(
  id: string,
): Promise<any> {


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');





  const result =  await collection.deleteOne({
      id: id,
  });


  // delete all feeds having userId

  const collectionFeed = client.db('doingdoit').collection('feeds');

  await collectionFeed.deleteMany({
    userId: id,
  });


  // delete all feed_scraps having feedId
  // delete all feed_likes having feedId

  const collectionFeedScrap = client.db('doingdoit').collection('feed_scraps');

  await collectionFeedScrap.deleteMany({
    userId: id,
  });

  const collectionFeedLike = client.db('doingdoit').collection('feed_likes');

  await collectionFeedLike.deleteMany({
    userId: id,
  });


  // delete all favorite_foods having userId
  const collectionFavoriteFood = client.db('doingdoit').collection('favorite_foods');

  await collectionFavoriteFood.deleteMany({
    userId: id,
  });

  // delete user_foods having userId
  const collectionUserFood = client.db('doingdoit').collection('user_foods');

  await collectionUserFood.deleteMany({
    userId: id,
  });



  // delete boards having userId
  const collectionBoard = client.db('doingdoit').collection('boards');

  await collectionBoard.deleteMany({
    userId: id,
  });

  // delete comments having userId
  const collectionComment = client.db('doingdoit').collection('comments');

  await collectionComment.deleteMany({
    userId: id,
  });

  // delete comment_replies having userId
  const collectionCommentReply = client.db('doingdoit').collection('comment_replies');

  await collectionCommentReply.deleteMany({
    userId: id,
  });


  // delete likes having userId
  const collectionLike = client.db('doingdoit').collection('likes');

  await collectionLike.deleteMany({
    userId: id,
  });


  // delete surveys having userId
  const collectionSurvey = client.db('doingdoit').collection('surveys');

  await collectionSurvey.deleteMany({
    userId: id,
  });



  // delete points
  const collectionPoint = client.db('doingdoit').collection('points');

  await collectionPoint.deleteMany({
    userId: id,
  });


  // delete notifications

  const collectionNotification = client.db('doingdoit').collection('notifications');

  await collectionNotification.deleteMany({
    userId: id,
  });

 

  return result;


}






// withdraw user

export async function withdrawByEmail (
  _email: string,
) {

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection.updateOne(
    { email: _email },
    { $set:
    
      {
        status: 'withdraw',
        withdrawAt: new Date(),
      }
    }
  );

  return results;

}



// withdraw recovery user

export async function withdrawRecoveryById (
  id: string,
) {

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

  return results;

}



/* mysql version
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
*/
// converted mongodb function

export async function getAttendanceCountByUserId(
  userId: string,
): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('points');

  const results = await collection.countDocuments(
    {
      userId: userId,
      title: 'attendance',
    }
  );

  return results;
}


// mysql version
/*
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
*/
// converted mongodb function

export async function getAllFeedbackWriterList(): Promise<UserProps[]> {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');
  const results = await collection
    .find<UserProps>(
      {
        nickname: { $exists: true, $ne: null },
        'access.access_feed': true,
      },
      { projection: { _id: 0, emailVerified: 0 } }
    )
    .sort({ createdAt: -1 })
    .toArray();
  return results;
}



// mysql version
/*
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
*/
// converted mongodb function

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
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  if (!sort) {
      sort = 'createdAt';
  }
  
  if (!order) {
      order = 'desc';
  }

  const results = await collection
    .find<UserProps>(
      {
        roles: 'user',
        status: 'active',
        nickname: { $exists: true, $ne: null },
        $or: [
          { email: { $regex: q, $options: 'i' } },
          { name: { $regex: q, $options: 'i' } },
          { nickname: { $regex: q, $options: 'i' } },
        ],
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
        regType: { $in: regTypeArray },
      },
      { projection: { _id: 0, emailVerified: 0 } }
    )
    .sort({ [sort]: order === 'asc' ? 1 : -1 })
    .toArray();

  return results;
}



/* mysql version
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

*/
// converted mongodb function

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

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  const results = await collection
  .aggregate<UserProps>([

    {
      $match: {

        // if nickname is not exist, then exclude it
        nickname: {
          $exists: true
        },

        roles: {
          $ne: 'user'
        },

        status: {
          $eq: 'active'
        },

        regType: {
          $in: regTypeArray,
        },

        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },

      }
    },

    {
      $match: {
        $or: [
          { email: { $regex: query, $options: 'i' } },
          { nickname: { $regex: query, $options: 'i' } },
          { mobile: { $regex: query, $options: 'i' } },
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
  const resultsCount = await collection.aggregate([
    {
      $match: {

        // if nickname is not exist, then exclude it
        nickname: {
          $exists: true
        },

        roles: {
          $ne: 'user'
        },

        status: {
          $eq: 'active'
        },

        regType: {
          $in: regTypeArray,
        },

        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },

      }
    },

    {
      $match: {
        $or: [
          { email: { $regex: query, $options: 'i' } },
          { nickname: { $regex: query, $options: 'i' } },
          { mobile: { $regex: query, $options: 'i' } },
        ],
      },
    },

    {
      $count: 'count',
    },
  ]).toArray();

  return {
    _id: '1',
    users: results,
    totalCount: resultsCount[0]?.count || 0,
  };
}


/* mysql version
/*
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

*/
// converted mongodb function

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
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('users');

  if (!sort) {
      sort = 'createdAt';
  }
  
  if (!order) {
      order = 'desc';
  }

  const results = await collection
    .find<UserProps>(
      {
        roles: 'user',
        status: 'withdraw',
        $or: [
          { email: { $regex: q, $options: 'i' } },
          { name: { $regex: q, $options: 'i' } },
          { nickname: { $regex: q, $options: 'i' } },
        ],
        withdrawAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
        regType: { $in: regTypeArray },
        nickname: { $exists: true, $ne: null },
      },
      { projection: { _id: 0, emailVerified: 0 } }
    )
    .sort({ [sort]: order === 'asc' ? 1 : -1 })
    .toArray();

  return results;
} 