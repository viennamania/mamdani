import { MongoClient } from 'mongodb';

import { faker } from '@faker-js/faker';

import dotenv from 'dotenv';

///import { random } from 'lodash';
///import pkg, { update } from 'lodash';

import pkg from 'lodash';
const { update } = pkg;

const { random } = pkg;


dotenv.config();

const setup = async () => {

  console.log('Setting up database...');

  console.log('process.env.MONGODB_URI)', process.env.MONGODB_URI);


  let client;

  try {

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    console.log('Connected to database');

    const hasData = await client
      .db('doingdoit')
      .collection('boards')
      .countDocuments();

    if (hasData) {
      console.log('Database already exists with data');
      client.close();
      return;
    }

    const records = [...Array(823)].map((x, index) => {

      const id =  ( index + 100000 ).toString();

      const createdAt = faker.date.past(); // 등록일

      const email = 'creath.park@gmail.com'; // 이메일


      const category = faker.commerce.department(); // 카테고리
      const avatar = "https://doingdoit.vercel.app/images/avatar.svg"; // 이미지

      const tags = [
        '태그1', '태그2', '태그3',
      ]

      // 제목 
      const title = '제목';
      
      const content = faker.lorem.paragraphs(1);

      const scrapCount = random(1, 100); // 스크랩
      const likeCount = random(1, 100); // 좋아요
      const commentCount = random(1, 100); // 댓글
      const viewCount = random(1, 100); // 조회수

      return {
        id,
        createdAt,
        updatedAt: createdAt,

        email,
        category,
        avatar,
        tags,
        title,
        content,
        scrapCount,
        likeCount,
        commentCount,
        viewCount,
      };
    });


    const insert = await client
      .db('doingdoit')
      .collection('boards')
      .insertMany(records);

    if (insert.acknowledged) {
      console.log('Successfully inserted records');
    }
  } catch (error) {

    console.error(error);

    return 'Database is not ready yet';
  } finally {
    if (client) {
      await client.close();
    }
  }
};



try {

  setup();
} catch {
  console.warn('Database is not ready yet. Skipping seeding...');
}

export { setup };
