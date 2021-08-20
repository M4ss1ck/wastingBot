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

export { roundToAny, convertir, dankMemes };
