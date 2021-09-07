import pkg from "pg";
const { Pool } = pkg;

const credenciales = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const pool = new Pool(credenciales);

function query(text, params, callback) {
  const start = Date.now();
  return pool.query(text, params, (err, res) => {
    const duration = Date.now() - start;
    if (res) {
      console.log("[executed query]", { text, duration, rows: res.rowCount });
    }

    if (callback) {
      console.log(callback);
      callback(err, res);
    }
  });
}

export { query };
