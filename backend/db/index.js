import db from 'pg';
const Pool = db.Pool;

const pool = new Pool({
  user: 'rohan',
  password: 'Mastodon0d',
  database: 'moviego',
  host: 'localhost',
  port: '5432',
});

export default pool;
