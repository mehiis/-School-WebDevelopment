import mysql from 'mysql2';
import 'dotenv/config';

//'createPool' because, 'createConnection' terminates itself within some time.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  //ei merkitystä???
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  //t. ile
});

const promisePool = pool.promise();
export default promisePool;
