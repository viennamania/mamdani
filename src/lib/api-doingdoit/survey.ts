import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { S, V, u } from 'uploadthing/dist/types-e8f81bbc';
import exp from 'constants';


/* mongoDB ojbect id */
import { ObjectId } from 'mongodb';


import pool, {connect, query} from '@/config/db';
import { json } from 'stream/consumers';
import { Josefin_Sans } from 'next/font/google';
import { en, ro } from '@faker-js/faker';
import { list } from 'postcss';



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



  if (!sort) {
    sort = 'createdAt';
  }

  if (!order) {
    order = 'desc';
  }

  console.log("startDate: " + startDate);
  console.log("endDate: " + endDate);

  if (!startDate) {
    startDate = '2022-01-01';
  }

  if (!endDate) {
    endDate = new Date().toISOString();
  }
  


  const startDateTime = new Date(new Date(startDate).getTime() ).toISOString();
  const endDateTime = new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000 - 1).toISOString(); // + 23h 59m 59s

 

  console.log("userId: " + userId);


  const connection = await connect();

  try {


    if (userId !== undefined) {


      



      // get all surveys by userId

      const query = `
      SELECT *
      FROM surveys
      WHERE
      createdAt >= ? AND createdAt <= ?
      AND userId = ?
      ORDER BY ${sort} ${order}
      LIMIT ?, ?`;

      const values = [
        startDateTime, endDateTime,
        userId, (page - 1) * limit, limit];

      const [rows, fields] = await connection.query(query, values) as any;

      const totalCountQuery = `
      SELECT COUNT(*) as count
      FROM surveys
      WHERE
      createdAt >= ? AND createdAt <= ?
      AND userId = ?`;

      const totalCountValues = [
        startDateTime, endDateTime,
        userId];

      const [rows2, fields2] = await connection.query(totalCountQuery, totalCountValues) as any;

      connection.release();


      if (rows) {

        return {
          _id: '1',
          surveys: rows,
          totalCount: rows2[0].count
        };
      } else {
          
          return {
            _id: '1',
            surveys: [],
            totalCount: 0
          };
      }

    } else {



      // get all surveys
      // join userId with users(id, nickname, avatar)
      // search by user email or nickname

      const query = `
      SELECT a._id as _id, a.id as id, a.userId as userId, a.surveyResult as surveyResult, a.createdAt as createdAt, b.email as userEmail, b.nickname as userNickname, b.avatar as userAvatar
      FROM surveys a
      LEFT JOIN users b ON a.userId = b.id
      WHERE
      a.createdAt BETWEEN ? AND ?
      AND

      (email LIKE ? OR nickname LIKE ?)

      ORDER BY ${sort} ${order}
      LIMIT ?, ?`;
    



      const values = [
        startDateTime, endDateTime,
        `%${q}%`,
        `%${q}%`,
         (page - 1) * limit, limit
      ];

      const [rows, fields] = await connection.query(query, values) as any;

    

      // total count
      const totalCountQuery = `
      SELECT COUNT(*) as count
      FROM surveys a
      LEFT JOIN users b ON a.userId = b.id
      WHERE
      a.createdAt BETWEEN ? AND ?
      AND
      (email LIKE ? OR nickname LIKE ?)
      `;

      const totalCountValues = [
        startDateTime, endDateTime,
        `%${q}%`,
        `%${q}%`,
      ];

      const [rows2, fields2] = await connection.query(totalCountQuery, totalCountValues) as any;

      connection.release();

    
      if (rows) {

        return {
          _id: '1',
          surveys: rows,
          totalCount: rows2[0].count
        };
      } else {
          
          return {
            _id: '1',
            surveys: [],
            totalCount: 0
          };
      }


    }

    

  } catch (error) {
      
      connection.release();
  
      console.log(error);
  
      return {
        _id: '1',
        surveys: [],
        totalCount: 0
      };
  
    }

  

}




// getOne
export async function getOne(
  id: string,
): Promise<SurveyProps | null> {



  const connection = await connect();

  try {

    // surverys join users by userId

    const query = `
    SELECT a._id as _id, a.id as id, a.userId as userId, a.surveyResult as surveyResult, a.createdAt as createdAt, b.email as userEmail, b.nickname as userNickname, b.avatar as userAvatar
    FROM surveys a
    LEFT JOIN users b ON a.userId = b.id
    WHERE a.id = ?`;

    const values = [
      id
    ];

    const [rows, fields] = await connection.query(query, values) as any;

    connection.release();

    if (rows[0]) {

      return rows[0];

    } else {

      return null;
    }
      
  } catch (error) {

    connection.release();

    console.log(error);

    return null;

  }

}






export async function getResultById(
  _id: string,
): Promise<SurveyProps | null> {

  console.log('getResultById  _id: ' + _id);

  const connection = await connect();


  try {

    
    const [rows, fields] = await connection.query(
      'SELECT * FROM surveys WHERE id = ?',
      [_id]
    ) as any;
    
    connection.release();

    ////////////console.log('rows[0]: ' + JSON.stringify(rows[0]));

    if (rows[0]) {

      return rows[0];

    } else {

      return null;
    }
      
  } catch (error) {

    connection.release();

    console.log(error);

    return null;


  }

}




export async function getResultByUserId(
  _userId: number,
): Promise<SurveyProps | null> {

  console.log('getResultByUserId  _userId: ' + _userId);

 

  const connection = await connect();

  try {
    
    
    const [rows, fields] = await connection.query(
      'SELECT * FROM surveys WHERE userId = ? ORDER BY createdAt DESC LIMIT 1',
      [_userId]
    ) as any;
    
    connection.release();

    //console.log('rows[0]: ' + JSON.stringify(rows[0]));

    if (rows[0]) {

      return rows[0];

    } else {

      return null;
    }
      
  } catch (error) {

    connection.release();

    console.log(error);

    return null;

  }



}










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



/* register surveys */
export async function registerOne (
  {
    userId,


    surveyResult,


    
  }: {
 
    userId: string,


    surveyResult: any,


  }
) {

  const connection = await connect();


  // generate unique id
  ///const id = new ObjectId().toHexString();

  // generate uuid v4

  const id = require('uuid').v4();



  
  
  console.log('registerOne id: ' + id);




  // serveyResult is json object, convert to string
  //const surveyResultString = JSON.stringify(surveyResult);

  // encode surveyResult
  const surveyResultString =   encodeURIComponent(JSON.stringify(surveyResult));




  const surveyResultJson = JSON.stringify(surveyResult);
  const character = JSON.stringify(surveyResult?.character);
  const mbti = JSON.stringify(surveyResult?.mbti);
  const nutrition = JSON.stringify(surveyResult?.nutrition);

  console.log('character: ' + character);
  console.log('mbti: ' + mbti);
  console.log('nutrition: ' + nutrition);

 
  try {

   
    const query = `
    INSERT INTO surveys
    (id, userId, surveyResult, surveyResultJson, createdAt)
    VALUES (?, ?, ?, ?, ?)`;

    const values = [
      id, userId, surveyResultString, surveyResultJson, new Date()
    ];



    const [rows, fields] = await connection.query(query, values) as any;



    
    connection.release();


    if (rows) {
   
      return (
        {
          insertedId: id,
        }
      )

    } else {

      return null;
    }

  } catch (error) {

    connection.release();

    console.log(error);

    return null;
  } 


}


  



// getStatsAll
// get stats of all surveys

// get daily stats from surveys
// sort by createdAt date desc
// return date, totalCount

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






// getStatsByMbti
// surveyResultJson is json object
// mbit is json object like {"I", "S"", "T", "J"}
// get each mbti count and percentage between startDate and endDate

export async function getStatsByMbti(
  {
    startDate,
    endDate,
  } : {
    startDate: string,
    endDate: string,
  }
): Promise<any> {


  console.log('getStatsByMbti');
  console.log('startDate: ' + startDate);
  console.log('endDate: ' + endDate);



  const connection = await connect();

  try {
      
      // get all surveys between startDate and endDate
      // get surveyResultJson
      // get mbti from surveyResultJson
      // count each mbti
      // return count and percentage

      // mbti =>

      // ISTJ
      // ISFJ
      // INFJ
      // INTJ
      // ISTP
      // ISFP
      // INFP
      // INTP
      // ESTP
      // ESFP
      // ENFP
      // ENTP
      // ESTJ
      // ESFJ
      // ENFJ
      // ENTJ											  


      const surveyResult = [] as { mbti: string, count: number, percentage: number }[];

      surveyResult.push(

        { 'mbti': 'ISTJ', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ISFJ', 'count': 0, 'percentage': 0 },
        { 'mbti': 'INFJ', 'count': 0, 'percentage': 0 },
        { 'mbti': 'INTJ', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ISTP', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ISFP', 'count': 0, 'percentage': 0 },
        { 'mbti': 'INFP', 'count': 0, 'percentage': 0 },
        { 'mbti': 'INTP', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ESTP', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ESFP', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ENFP', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ENTP', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ESTJ', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ESFJ', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ENFJ', 'count': 0, 'percentage': 0 },
        { 'mbti': 'ENTJ', 'count': 0, 'percentage': 0 },

      );




      const query = `
      SELECT surveyResultJson
      FROM surveys
      WHERE
      createdAt BETWEEN ? AND ?`;
  
      const values = [
        startDate,
        endDate
      ];
  
      const [rows, fields] = await connection.query(query, values) as any;
  

      rows.forEach((row: any) => {

        const mbti = row.surveyResultJson.mbti[0] + row.surveyResultJson.mbti[1] + row.surveyResultJson.mbti[2] + row.surveyResultJson.mbti[3];

        console.log('mbti: ' + mbti);

        
        if (mbti) {
            
            const index = surveyResult.findIndex((item: any) => item.mbti === mbti);
  
            if (index === -1) {
              surveyResult.push(
                {
                  mbti: mbti,
                  count: 1,
                  percentage: 0
                }
              );
            } else {
              surveyResult[index].count++;
            }
  
          }

      } );

      // calculate percentage

      const totalCount = rows.length;

      surveyResult.forEach((item: any) => {
        item.percentage = item.count / totalCount * 100;
      });

      connection.release();

      return surveyResult;

  } catch (error) {

    connection.release();

    console.log(error);

    return null;

  }

}



// getStatsByQuestion
// surveyResultJson is json object

// get each questionArray and answerArray count


export async function getStatsByQuestion(
  {
    startDate,
    endDate,
  } : {
    startDate: string,
    endDate: string,
  }
): Promise<any> {

  const connection = await connect();

  try {


    const query = `
    SELECT surveyResultJson
    FROM surveys
    WHERE
    createdAt BETWEEN ? AND ?`;

    const values = [
      startDate,
      endDate
    ];

    const [rows, fields] = await connection.query(query, values) as any;



    // questionArray and answerArray
 
    const surveyResult = [] as {
      question: string, count1: number, count2: number, count3: number, count4: number
    }[];

    
    /*
      const questionArray = [

      "평소 밥 먹는 스타일은?",

      "평소 고지방 육류(삼겹살, 갈비, 곱창 등)를 먹는 스타일은?",

      "평소 야채나 채소를 먹는 스타일은?",

      "평소 빵, 케이크, 과자, 초콜릿 등 간식 먹는 스타일은?",

      "평소 음주 스타일은?",

      "평소 야식 스타일은?",

      "처음 와본 식당에서 무엇을 먹을 지 고민 중이다. 당신의 선택은?",
      "얼굴만 알고 지내던 옆옆팀 사람들과 같이 밥을 먹게 되었다. 당신의 반응은?",
      "건강을 위해 식단관리를 시작했다. 점심은 주로 회사에서 먹는 편. 당신의 선택은?",

      "친구가 주말에 다녀온 디저트 가게에서 인생 디저트를 만났다고 한다. 당신의 반응은?",

      "토요일 날 친구들과 점심, 디저트, 저녁까지 온 종일 함께 시간을 보내고 집에 돌아왔다. 당신의 상태는?",

      "난생 처음으로 탕후루를 먹어보았다. 당신의 반응은?",

      "바디 프로필 촬영을 위해 식단을 관리 중이다. 친구가 연인과 헤어졌다고 술 한잔하자고 한다. 당신의 선택은?",

      "먹방 예능 '맛있는녀석들'에 평소 자주가던 화덕피자 가게가 나왔다. 당신의 반응은?",

      "친구가 '민트초코떡볶이'가 출시되었다고 같이 먹으러 가자고 한다. 당신의 반응은?",

      "여행지에서 식당을 고르는 중이다. 당신의 반응은?",
    ];
    */

    surveyResult.push(
        
        {
          question: "평소 밥 먹는 스타일은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },
        {
          question: "평소 고지방 육류(삼겹살, 갈비, 곱창 등)를 먹는 스타일은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },
        {
          question: "평소 야채나 채소를 먹는 스타일은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },
        {
          question: "평소 빵, 케이크, 과자, 초콜릿 등 간식 먹는 스타일은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },
        {
          question: "평소 음주 스타일은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },
        {
          question: "평소 야식 스타일은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },
        {
          question: "처음 와본 식당에서 무엇을 먹을 지 고민 중이다. 당신의 선택은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },
        {
          question: "얼굴만 알고 지내던 옆옆팀 사람들과 같이 밥을 먹게 되었다. 당신의 반응은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },

        {
          question: "건강을 위해 식단관리를 시작했다. 점심은 주로 회사에서 먹는 편. 당신의 선택은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },

        {
          question: "친구가 주말에 다녀온 디저트 가게에서 인생 디저트를 만났다고 한다. 당신의 반응은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },

        {
          question: "토요일 날 친구들과 점심, 디저트, 저녁까지 온 종일 함께 시간을 보내고 집에 돌아왔다. 당신의 상태는?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },

        {
          question: "난생 처음으로 탕후루를 먹어보았다. 당신의 반응은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },

        {
          question: "바디 프로필 촬영을 위해 식단을 관리 중이다. 친구가 연인과 헤어졌다고 술 한잔하자고 한다. 당신의 선택은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },

        {
          question: "먹방 예능 '맛있는녀석들'에 평소 자주가던 화덕피자 가게가 나왔다. 당신의 반응은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },

        {
          question: "친구가 '민트초코떡볶이'가 출시되었다고 같이 먹으러 가자고 한다. 당신의 반응은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },

        {
          question: "여행지에서 식당을 고르는 중이다. 당신의 반응은?",
          count1: 0,
          count2: 0,
          count3: 0,
          count4: 0
        },

    );

 

    rows.forEach((row: any) => {

      //console.log('surveyResultJson: ' + JSON.stringify(row.surveyResultJson));


      row.surveyResultJson.questionArray.forEach((question: any, index: number) => {

        ///console.log('question: ' + question);


        
        const questionIndex = surveyResult.findIndex((item: any) => item.question === question);

        //console.log('questionIndex: ' + questionIndex);


        if (questionIndex === -1) {

          const answer = row.surveyResultJson.selectionArray[index];

          if (answer === 'A') {
            surveyResult.push(
              {
                question: question,
                count1: 1,
                count2: 0,
                count3: 0,
                count4: 0
              }
            );
          } else if (answer === 'B') {
            surveyResult.push(
              {
                question: question,
                count1: 0,
                count2: 1,
                count3: 0,
                count4: 0
              }
            );
            
          } else if (answer === 'C') {
            surveyResult.push(
              {
                question: question,
                count1: 0,
                count2: 0,
                count3: 1,
                count4: 0
              }
            );

          } else if (answer === 'D') {
            
            surveyResult.push(
              {
                question: question,
                count1: 0,
                count2: 0,
                count3: 0,
                count4: 1
              }
            );
          }

        } else {

          const answer = row.surveyResultJson.selectionArray?.[index];

          


          if (answer === 'A') {
            surveyResult[questionIndex].count1++;
          } else if (answer === 'B') {
            surveyResult[questionIndex].count2++;
          } else if (answer === 'C') {
            surveyResult[questionIndex].count3++;
          } else if (answer === 'D') {
            surveyResult[questionIndex].count4++;
          }

        }



      } );


      //console.log('surveyResult: ' + JSON.stringify(surveyResult));


    } );


  

    connection.release();

    return surveyResult;

  } catch (error) {

    connection.release();

    console.log(error);

    return null;

  }


}