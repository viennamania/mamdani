/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: hello world 를 반환합니다. 블라블라
 *     responses:
 *       200:
 *         description: Hello World!
 */



import pool from '@/config/db';

export async function GET(_request: Request) {
    // Do whatever you want


    try {

      const result = await pool.query('SELECT * FROM users');
      console.log(result[0]);

    } catch (err) {
      console.error(err);
    }




    return new Response('Hello World!', {
      status: 200,
    });
}


// Compare this snippet from src/app/api/hello/route.ts:
// import { NextResponse, NextRequest } from 'next/server';
//
// export const GET = async (req: NextRequest, res: NextResponse) => {