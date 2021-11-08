import pkg from "pg";
const { Pool } = pkg;
import execa from "execa";

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
      console.log(`query: "${text}" time: ${duration}`);
    }
    if (callback) {
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

// función para exportar la BD, añadir C:\Program Files\PostgreSQL\13\bin a PATH
async function exportDB() {
  const { stdout, stderr } = await execa("pg_dump", [
    "--host",
    process.env.PGHOST,
    "--port",
    process.env.PGPORT,
    "--username",
    process.env.PGUSER,
    "--dbname",
    process.env.PGDATABASE,
    "--file",
    "db.sql",
  ]);
  console.log(stdout);
  console.log(stderr);
}

export { query, updateUserStat, exportDB };
