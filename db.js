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
    if (res) {
      const duration = Date.now() - start;
      //console.log("[executed query]", { text, duration, rows: res.rowCount });
      console.log(`[executed query] time: ${duration}`);
    }

    if (callback) {
      //console.log(callback);
      callback(err, res);
    }
  });
}

export { query };
