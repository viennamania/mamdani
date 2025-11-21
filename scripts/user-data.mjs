import { MongoClient } from 'mongodb';

import { faker } from '@faker-js/faker';

import dotenv from 'dotenv';

///import { random } from 'lodash';
import pkg from 'lodash';
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
      .collection('users')
      .countDocuments();

    if (hasData) {
      console.log('Database already exists with data');
      client.close();
      return;
    }


    const records = [...Array(823)].map(( x, index ) => {


      /*
          id: '0652',
    name: '김동현',
    nickname: '주니주니',
    email: 'Leila48@yahoo.com',
    regType: '이메일',
    mobile: '010-3223-3223',
    gender: '남',
    weight: '86',
    height: '173',
    birthDate: '1990-01-01',
    purpose: '다이어트',
    marketingAgree: 'Y',
    avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-05.webp',
    createdAt: '2021-06-01T08:00:00.000Z',
    updatedAt: '2021-06-01T08:00:00.000Z',
    deletedAt: null,
    emailVerified: true,
    loginedAt: '2021-06-01T08:00:00.000Z',
    */

      //const [fName, lName] = faker.name.findName().split(' ');

      //const id =  random(10000, 99999).toString();
      const id =  ( index + 100001 ).toString();

      const fName = faker.person.firstName();
      const lName = faker.person.lastName();


      const name = faker.internet.userName(fName, lName);
      const nickname = fName;
      const email = faker.internet.email(fName);

      const password = "1234";
      
      //const regType = faker.random.arrayElement(['이메일', '카카오', '네이버', '페이스북']);

      const regType =  ( random(1, 4) === 1 ) ? '이메일' : random(1, 4) === 2 ? '카카오' : random(1, 4) === 3 ? '네이버' : '페이스북';




      ////const mobile = faker.phone.phoneNumber();

      ////const mobile = faker.phone.phoneNumberFormat(0);

      const mobile = "010" + random(10000000, 99999999);


      ////const gender = faker.random.arrayElement(['남', '여']);
      const gender =  ( random(1, 2) === 1 ) ? '남' : '여';

      
      //const weight = faker.random.number(100);
      const weight = random(40, 120);

      const height = random(140, 200);
      const birthDate = faker.date.past();
      //const purpose = faker.random.arrayElement(['다이어트', '근육', '체력', '건강']);

      const purpose =  ( random(1, 4) === 1 ) ? '다이어트' : random(1, 4) === 2 ? '근육' : random(1, 4) === 3 ? '체력' : '건강';

      //const marketingAgree = faker.random.arrayElement(['Y', 'N']);
      const marketingAgree =  ( random(1, 2) === 1 ) ? 'Y' : 'N';

      const avatar = faker.image.avatar();

      const createdAt = faker.date.past();
      const updatedAt = faker.date.past();
      const deletedAt = faker.date.past();
      
      //const emailVerified = faker.random.arrayElement([true, false]);
      const emailVerified =  ( random(1, 2) === 1 ) ? true : false;

      const loginedAt = faker.date.past();
      ///const followers = faker.random.number(1000);
      const followers = random(0, 1000);

      const status = ( random(1, 2) === 1 ) ? 'active' : 'inactive';

      

      return {
        id,
        name,
        nickname,
        email,
        password,
        avatar,
        regType,
        mobile,
        gender,
        weight,
        height,
        birthDate,
        purpose,
        marketingAgree,
        createdAt,
        updatedAt,
        deletedAt,
        loginedAt,
        followers,
        emailVerified,
        status,
      };

    });


    records.push({
      id: '100000',
      name: '김동현',
      nickname: '주니주니',
      email: 'creath.park@gmail.com',
      password: '1234',
      avatar: 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-05.webp',
      regType: '이메일',
      mobile: '010-3223-3223',
      weight: '86',
      height: '173',
      birthDate: '1990-01-01',
      purpose: '다이어트',
      marketingAgree: 'Y',
      createdAt: '2021-06-01T08:00:00.000Z',
      updatedAt: '2021-06-01T08:00:00.000Z',
      deletedAt: null,
      loginedAt: '2021-06-01T08:00:00.000Z',
      followers: 0,
      emailVerified: true,
      status: 'active',
    });



    const insert = await client
      .db('doingdoit')
      .collection('users')
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
