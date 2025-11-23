import type { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import GoogleProvider from 'next-auth/providers/google';

import KakaoProvider from 'next-auth/providers/kakao';

import NaverProvider from "next-auth/providers/naver";

import { env } from '@/env.mjs';
import isEqual from 'lodash/isEqual';


import { pagesOptions } from './pages-options';

/////import { getUserByEmail } from '@/lib/api/user';

//////import { getUserByEmail } from '@/lib/api/user';

import { getUserByLoginId } from '@/lib/api/user';


/////////import { email } from 'react-admin';

/*
INVALID_CALLBACK_URL_ERROR: Callback URL mismatch. This may indicate a configuration issue on the IDP
*/


// check if user exists from database
/*
const getUser = async (email: string) => {
  const result = await getUserByEmail(email);
  return result;
}
*/



export const authOptions: NextAuthOptions = {

  /// debug: true,
  pages: {
    ...pagesOptions,
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // https://next-auth.js.org/configuration/callbacks



  callbacks: {

    async session({ session, token }) {

      return {
        ...session,
        user: {
          ...session.user,
          id: token.idToken as string,
        },
      };

    },


    async jwt({ token, user }) {
      if (user) {
        // return user as JWT
        token.user = user;
      }
      return token;
    },

    /*
    async signIn({ user, account, profile, email, credentials }) {
      // console.log('signIn', { user, account, profile, email, credentials });
      return true;
    },
    */

    async redirect({ url, baseUrl }) {

      
      
      const parsedUrl = new URL(url, baseUrl);

      if (parsedUrl.searchParams.has('callbackUrl')) {

        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;

      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
      
      

      ///return `${baseUrl}/`;
      

    },
    
    

  },


  providers: [

    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},


      async authorize(
        credentials: any,
      ) {

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid

        // auth.d.ts 참고




        // check if user exists from database

  

        
        var userId = credentials?.id;

        /*
        
        if (credentials?.id === 'admin') {
          userId = 'admin@cryptoss.beauty';
        } else if (credentials?.id === 'doingdoit1') {
          userId = 'doingdoit1@cryptoss.beauty';
        } else if (credentials?.id === 'doingdoit2') {
          userId = 'doingdoit2@cryptoss.beauty';
        } else if (credentials?.id === 'doingdoit3') {
          userId = 'doingdoit3@cryptoss.beauty';
        } else if (credentials?.id === 'doingdoit4') {
          userId = 'doingdoit4@cryptoss.beauty';
        } else if (credentials?.id === 'doingdoit5') {
          userId = 'doingdoit5@cryptoss.beauty';
        }


        const result = await getUserByEmail(userId);


        console.log("auth-options-doingdoit userId:", userId);

        ///console.log("auth-options-doingdoit result:", result);

        */

        const result = await getUserByLoginId(userId);

        console.log("auth-options-doingdoit userId:", userId);
        console.log("auth-options-doingdoit result:", result);

        if (!result) {
          // User not found

          console.log("auth-options-doingdoit User not found");

          

          return null;
        }


        if ( result?.password === credentials?.password ) {

          // Any object returned will be saved in `user` property of the JWT

          /*
          if (!result?.surveyResult) {
            //result.surveyResult = [];
          }
          */

          if (result?.status === 'withdraw') {

            ///alert("탈퇴한 회원입니다.");

            //console.log("탈퇴한 회원입니다.");

            // 탈퇴한 회원입니다. popup alert
            


            return null;

          }



          const user = {
            id: result?.id as string,
            name: result?.nickname as string,
            email: result?.email as string,
            image: result?.avatar as string,
            role: 'user',
            roles: result?.roles as string[],
          };
       

          return user;
          

          //return result;



        }
        
 


        return null;
      },



    
    }),




    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),



    KakaoProvider({
      
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',

    }),



    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',


    })


  ],

};
