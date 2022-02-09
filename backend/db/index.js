import db from 'pg';
const Pool = db.Pool;

// const pool = new Pool({
//   user: 'rohan',
//   password: 'Mastodon0d',
//   database: 'moviego',
//   host: 'localhost',
//   port: '5432',
// });

const pool = new Pool({
  // create connection to database
  connectionString: process.env.DATABASE_URL, // use DATABASE_URL environment variable from Heroku app
  ssl: {
    rejectUnauthorized: false, // don't check for SSL cert
  },
});

export default pool;
