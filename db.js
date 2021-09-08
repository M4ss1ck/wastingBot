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
      console.log(`query: "${text}" time: ${duration}`);
    }

    if (callback) {
      //console.log(callback);
      callback(err, res);
    }
  });
}

// función específica para buscar un usuario de la BD y actualizar un valor
function updateUserStat(id, key, value) {
  const text = `UPDATE usuarios SET ${key} = '${value}', fecha = now() WHERE tg_id = '${id}' RETURNING *`;
  query(text.toString(), [], (err, res) => {
    if (err) {
      console.log("[ERROR UPDATING]");
      console.log(err.stack);
      console.log(text);
    } else {
      console.log(`[${key} actualizado]`);
      console.log(res.rows[0].nick);
      //console.log(res);
    }
  });
}

export { query, updateUserStat };
