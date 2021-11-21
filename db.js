import pkg from "pg";
import fs from "fs";
import fastcsv from "fast-csv";
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

// función para exportar la BD a un archivo CSV
async function exportTable(nombre) {
  //const path = process.cwd();
  await query(`SELECT * FROM ${nombre}`, [], (err, res) => {
    if (err) {
      console.error(err.stack);
    } else {
      const jsonData = JSON.parse(JSON.stringify(res.rows));
      //console.log("\njsonData:", jsonData);
      // exportar bd a csv
      try {
        fastcsv
          .writeToPath(`${nombre}.csv`, jsonData, { headers: true })
          .on("finish", function () {
            console.log(`Tabla ${nombre} exportada correctamente.`);
          });
      } catch (error) {
        console.log(error);
      }
    }
  });
}

// funcion para importar una tabla CSV a la BD
async function importTable(name, data) {
  const path = process.cwd();
  fs.writeFileSync(`${path}\\${name}.csv`, data, "utf8");
  //FIXME: error de parsing de datos
  query(
    `COPY ${name} FROM '${path}\\${name}.csv' DELIMITER ',' CSV HEADER`,
    [],
    (err, res) => {
      if (err) {
        console.error(err.stack);
      } else {
        console.log(`Tabla ${name} importada correctamente.`);
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

export { query, updateUserStat, exportTable, importTable, borrarBD };
