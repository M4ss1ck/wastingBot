import pkg from "pg";
import fs from "fs";
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
async function exportTable(nombre) {
  const path = process.cwd();
  await query(
    `COPY ${nombre} TO '${path}/db/${nombre}.csv' delimiters ';' WITH CSV HEADER`,
    [],
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows);
        //fs.accessSync(`${path}\\db\\${nombre}.csv`);
      }
    }
  );
}

function borrarBD(url) {
  fs.unlink(url, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

export { query, updateUserStat, exportTable, borrarBD };
