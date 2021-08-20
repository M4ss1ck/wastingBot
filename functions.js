import fs from "fs";
import cheerio from "cheerio";

function roundToAny(num, n = 2) {
  return +(Math.round(num + `e+${n}`) + `e-${n}`);
}

async function convertir(Jimp, bot, id, url, name, size, ancho, alto, calidad) {
  try {
    const image = await Jimp.read(url);
    await image
      .resize(ancho, alto)
      .quality(calidad)
      .writeAsync(`images/${name}.png`);
    //console.log("IMAGEN: \n", final.bitmap);
    await bot.sendPhoto(id, `images/${name}.png`, {
      caption: `Tamaño original: ${size} KB`,
    });
    fs.unlinkSync(`images/${name}.png`);
  } catch (err) {
    console.error(err);
  }
}

const dankMemes = (html) => {
  const $ = cheerio.load(html);
  const urlMeme = $(
    "._2_tDEnGMLxpM6uOa2kaDB3.ImageBox-image.media-element._1XWObl-3b9tPy64oaG6fax"
  );
  // console.log(urlMeme);
  const indexValue = randNo(urlMeme.length);
  console.log(
    `La dirección es:\n${urlMeme[indexValue].attribs.src}\nEn total son ${urlMeme.length} memes`
  );
  return urlMeme[indexValue].attribs.src;
};
const randNo = (limit) => {
  const thatNo = Math.floor(Math.random() * limit);
  return thatNo;
};

const lectulandia = (html) => {
  const $ = cheerio.load(html);
  const urlBook = $(".card");
  //const indexValue = randNo(urlBook.length);

  let books = [];

  for (let indexValue = 0; indexValue < urlBook.length; indexValue++) {
    const enlace = `https://www.lectulandia.co${urlBook[indexValue].children[1].attribs.href}`;
    const portada = urlBook[indexValue].children[3].attribs.src;
    const titulo =
      urlBook[indexValue].children[5].children[1].children[1].attribs.title;
    const autor_nombre =
      urlBook[indexValue].children[5].children[3].children[1].children[0].data;
    const autor_enlace = `https://www.lectulandia.co${urlBook[indexValue].children[5].children[3].children[1].attribs.href}`;
    const desc =
      urlBook[indexValue].children[5].children[5].children[1].children[0].data;

    const book = [enlace, portada, titulo, autor_nombre, autor_enlace, desc];

    books.push(book);
  }

  // console.log(
  //   `Libro aleatorio:\n${urlBook[indexValue]}\nEn total son ${urlBook.length} libros`
  // );
  // console.log(urlBook[indexValue].attribs);
  // console.log("\n[ENLACE]\n");
  // console.log(urlBook[indexValue].children[1].attribs.href);

  // console.log("\n[IMAGEN]\n");
  // console.log(urlBook[indexValue].children[3].attribs.title);
  // console.log(urlBook[indexValue].children[3].attribs.src);

  // console.log("\n[DETALLES]\n");
  // console.log("[título]\n");
  // console.log(
  //   urlBook[indexValue].children[5].children[1].children[1].attribs.title
  // );

  // console.log("[autor]\n");
  // console.log(
  //   urlBook[indexValue].children[5].children[3].children[1].children[0].data
  // );
  // console.log(
  //   urlBook[indexValue].children[5].children[3].children[1].attribs.href
  // );

  // console.log("\n[descripción]\n");
  // const desc = urlBook[indexValue].children[5].children[5].children[1].children;
  // console.log(desc);
  // console.log("\n\n");
  // console.log(urlBook[indexValue].children[5].children[5].children);
  // console.log("\n[atributos]\n");
  // console.log(urlBook[indexValue].children[5].children[5].children[1].attribs);

  // if (urlBook[indexValue].children[5].children[5].children[2] !== undefined) {
  //   console.log("\n[SERIE] \n" + desc[0].data);
  //   console.log(
  //     urlBook[indexValue].children[5].children[5].children[2].attribs
  //   );
  // }

  return books;
};

export { roundToAny, convertir, dankMemes, lectulandia };
