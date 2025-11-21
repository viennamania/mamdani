


/*
export {}
const mysql = require("mysql2");

require('dotenv').config();
let db;

try {
    db = mysql.createConnection({
        user : process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB
});
} catch (err) {
    console.error(err);
}


module.exports = db;

*/


import { de } from '@faker-js/faker';
import exp from 'constants';
import mysql from 'mysql2/promise';


declare global {
    interface Global {
        [key: string]: any;
    }
}


/**
 * Register service.
 * @description Stores instances in `global` to prevent memory leaks in development.
 * @arg {string} name Service name.
 * @arg {function} initFn Function returning the service instance.
 * @return {*} Service instance.
 */



/*

declare global {
    interface Global {
        [key: string]: any;
    }
}


const registerService = (name: string, initFn: () => any) => {
    if (process.env.NODE_ENV === 'development') {
        if (!(name in global)) {

            global[name] = initFn();
        }
        return global[name];
    }
    return initFn();
};
*/

declare global {
    interface Global {
        [key: string]: any;
    }
}


const registerService = (name: string, initFn: () => any) => {
    if (process.env.NODE_ENV === 'development') {
        if (!(name in global)) {
            global = {
                ...global,
                [name]: initFn()
            };
        }
        return global as any;

    }

    return initFn();

}





/*
errror:  Error: Too many connections
*/


/*
export const pool = registerService('db', () => {
    return mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
});
*/




export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0
});



export const connect = async () => {
    return pool.getConnection();
}

export const query = async (query: string, values: any) => {
    const connection = await connect();
    const [rows, fields] = await connection.query(query, values);
    connection.release();
    return rows;
}

export const close = async () => {
    return pool.end();
}

export default pool;


