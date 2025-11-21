import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { S, u } from 'uploadthing/dist/types-e8f81bbc';






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


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('guides');


  console.log('limit: ' + limit);
  console.log('page: ' + page);
  console.log('sort: ' + sort);
  console.log('order: ' + order);

  
  ///const query = q === null ? '' : q;

  const query = q || '';

  console.log('query: [' + query + ']');



  const boards = await collection
    .aggregate<BoardProps>([


      // match by q and feedTitle and feedContent and hiddenYn is exist  and not 'Y'
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            ////{ content: { $regex: query, $options: 'i' } },
            { nickname: { $regex: query, $options: 'i' } },

            // tags array match
            { tags: { $elemMatch: { $regex: query, $options: 'i' } } },

          ],

        }
      },

      /// if index 0 element of images array is null, exclude it
      {
        $match: {
          $and: [

            
            {
              'images.0': { $ne: null },
            },
          ]
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

      {
        $sort: {
          isTop: -1,
          [sort]: order === 'asc' ? 1 : -1,
        },
      },


      {
          $skip: (page - 1) * limit,
      },
      
      {
          $limit: limit,
      },

      
    ])
    .toArray();

    const totalCount = await getCount(

      '',
      q,
    );

    return {
      _id: '1',
      boards: boards,
      totalCount: totalCount,
    };

}





/* get count */
export async function getCount(
  email: string,
  q: string,
): Promise<number> {


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('guides');


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
  const collection = client.db('doingdoit').collection('guides');
  return await collection.updateOne({ username }, { $set: { bio } });
}



export async function getOne(id: string): Promise<BoardProps | null> {
  console.log('getOne id: ' + id);

  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('guides');
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





// updateOne
export async function updateOne(
  {
    id,
    title,
    content,
    images,
    tags,
    category,
  }: {
    id: string,
    title: string,
    content: string,
    images: string[],
    tags: string[],
    category: string,
  }
) {
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('guides');

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
        updatedAt: new Date().toISOString()

      }
    }

)}




export async function updateBasic(
  id: string,
  title: string,
  content: string,


  ) {
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('guides');
  
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
    const collection = client.db('doingdoit').collection('guides');
  
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

    
  }: {
 
    userId: string,


    title: string,
    content: string,

    images: string[],

    tags: string[],
 

  }
) {

  /*
  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('guides');


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

    
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,

    }
  );



    return results;
    */


    // join user

    





}
  
  


    
  export async function getBoardById(id: string): Promise<BoardProps | null> {

    console.log('getBoardById  id: ' + id);
  
    const client = await clientPromise;
    const collection = client.db('doingdoit').collection('guides');
    
    
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

  
 


 // like 
 export async function like(
  id: string,
  userId: string,
  userEmail: string,
  userNickname: string,
  userAvatar: string,

) {



  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('guides');

  const results = await collection.findOne<BoardProps>(
    { id: id },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (results) {

    // like document insert and update each count
    const likeCollection = client.db('doingdoit').collection('guide_likes');

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
  id: string,
): Promise<any> {


  const client = await clientPromise;
  const collection = client.db('doingdoit').collection('guides');




  return await collection.deleteOne({
      id: id,
  });

}