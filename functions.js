import fs from "fs";

function roundToAny(num, n = 2) {
  return +(Math.round(num + "e" + n) + "e" - n);
}

async function convertir(Jimp, id, url, name, size, ancho, alto, calidad) {
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

export { roundToAny, convertir };
