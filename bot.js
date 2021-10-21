import TeleBot from "telebot";
import { Parser } from "expr-eval";
//import express from "express";
import process from "process";
//import lista from "./launcher_list.js";

import Jimp from "jimp";

import axios from "axios";

import {
  roundToAny,
  convertir,
  dankMemes,
  lectulandia,
  lectulandia1,
  dankMemesEsp,
  cuantaRazon,
  cuantaRazonUno,
  setRango,
  adornarRango,
} from "./functions.js";

import cron from "node-cron";

import { query, updateUserStat } from "./db.js";

//const app = express();

const my_id = process.env.ADMIN_ID;
const victim = process.env.VICTIM;

// hora en que arranca el bot
const inicio = new Date();

const bot = new TeleBot({
  token: process.env.TG_TOKEN,
  usePlugins: ["commandButton", "reporter"],
  pluginConfig: {
    reporter: {
      // What to report?
      events: ["reconnect", "reconnected", "stop", "error"],
      // User list
      to: [my_id],
    },
  },
});
const parser = new Parser({
  operators: {
    // These default to true, but are included to be explicit
    add: true,
    concatenate: true,
    conditional: true,
    divide: true,
    factorial: true,
    multiply: true,
    power: true,
    remainder: true,
    subtract: true,
    logical: true,
    comparison: true,
    in: true,
    assignment: true,
  },
});

let default_del = ["/borrame", /^@m4ss1ck ghei$/];

bot.on(["/group", "/grupo", "/promo"], (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;

  let replyMarkup = bot.inlineKeyboard(
    [
      [
        bot.inlineButton("Grupo", {
          url: "https://t.me/juestin_taim",
        }),

        bot.inlineButton("Canal", {
          url: "https://t.me/wasting_time_pro",
        }),
      ],
    ],
    { resize: true }
  );

  return bot.sendMessage(
    id,
    "Sea usted bienvenid@ a la comunidad de <b>Wasting Time</b>. Donde podrá pasar tiempo con sus amigos, compartir memes, jugar a encontrar el lobo y probablemente morir en el intento.",
    { parseMode: "html", replyMarkup }
  );
});

bot.on(["/help", "/ayuda"], (msg, self) => {
  console.log(self);
  const replyMarkup = bot.inlineKeyboard([
    [
      // First row with command callback button
      bot.inlineButton("Probar respuesta del bot", { callback: "/ping" }),
    ],
    [
      bot.inlineButton("[EXPERIMENTAL] % de homosexualidad", {
        callback: "/gay",
      }),
    ],
    [
      bot.inlineButton("1 tag", { callback: "/tag" }),
      bot.inlineButton("Tag x5", { callback: "/tag 5" }),
    ],
    [
      // Second row with regular command button
      bot.inlineButton("SPAM", { callback: "/grupo" }),
    ],
  ]);
  return bot.sendMessage(
    msg.chat.id,
    "Este es el bot de pruebas de <b>Massick</b>. Poseo montones de funciones inútiles, entre ellas:\n" +
      "/calc <em>operaciones</em> - para realizar... <em>adivina</em>... operaciones matemáticas\n" +
      "/s/<em>old</em>/<em>new</em> - para, respondiendo un mensaje, reemplazar <em>old</em> por <em>new</em>\n" +
      "/size - para ver el tamaño de una foto, se usa respondiendo el mensaje\n" +
      "/tag <em>n</em> - para molestar a Yacel o, en su defecto, a cualquier otro miembro del chat <em>n veces</em>\n" +
      "/group, /grupo o /promo - spam\n" +
      "/help o /ayuda - para ver este menú\n\n" +
      "También puede utilizar algunas palabras claves como <em>nudes</em>, <em>patada</em>, <em>beso</em> y otras (muchas más en el futuro)",
    { parseMode: "html", replyMarkup }
  );
});

bot.on(["/jaja", "/jajaja", "/porn"], (msg) => {
  if (!msg.reply_to_message) {
    return bot.sendMessage(
      msg.chat.id,
      `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name}</a>, el comando se usa respondiendo un mensaje`,
      { parseMode: "html", replyToMessage: msg.message_id }
    );
  }
  if (msg.reply_to_message.from.id.toString() === my_id) {
    console.log("Me intentaron hacer tag");
    return bot
      .sendVoice(msg.chat.id, "./audio/risas.ogg", {
        replyToMessage: msg.message_id,
      })
      .then(bot.sendMessage(msg.chat.id, "Yo tú no lo vuelvo a intentar"))
      .catch((err) => console.error("ERROR: ", err));
  } else {
    return bot
      .sendVoice(msg.chat.id, "./audio/risas.ogg", {
        replyToMessage: msg.reply_to_message.message_id,
      })
      .then(bot.deleteMessage(msg.chat.id, msg.message_id))
      .catch((err) => console.error("ERROR: ", err));
  }
});

bot.on(["/gay", "/ghei"], (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;

  let replyMarkup = bot.inlineKeyboard([
    [
      bot.inlineButton("en otro chat", { inline: "soy loca?" }),
      bot.inlineButton("aquí mismo", { inlineCurrent: "soy loquísima?" }),
    ],
  ]);

  return bot.sendMessage(id, "Mi % de loca", { replyMarkup });
});

bot.on("inlineQuery", (msg) => {
  const query = msg.query;
  const answers = bot.answerList(msg.id, { cacheTime: 1 });

  if (msg.from.id.toString() === my_id) {
    answers.addArticle({
      id: msg.id + query,
      title: "Cuál es tu % gay?",
      //description: `Your query: ${query}`,
      message_text: `Según este bot soy ${Math.floor(Math.random() * 10)}% gay`,
      cacheTime: 1,
    });
  } else {
    if (msg.from.id.toString() === victim) {
      answers.addArticle({
        id: query + msg.id,
        title: "Cuál es tu % gay?",
        //description: `Your query: ${query}`,
        message_text: `ERROR: Memoria insuficiente \n[bot.error.overflow] Gayness safety limit exceeded`,
        cacheTime: 1,
      });
    } else {
      answers.addArticle({
        id: query + msg.id,
        title: "Cuál es tu % gay?",
        //description: `Your query: ${query}`,
        message_text: `Según este bot soy ${Math.floor(
          Math.random() * 100
        )}% gay`,
        cacheTime: 1,
      });
    }
  }

  console.log("El mensaje recibido es ", msg, " y la respuesta ", answers);
  return bot.answerQuery(answers);
});

// usar con bot.inlineButton("callback", { callback: "this_is_data" })
bot.on("callbackQuery", (msg) => {
  // User message alert
  console.log(`Inline button callback: ${msg.data}`);
  return bot.answerCallbackQuery(msg.id);
});

bot.on(/^\/cal(c|c@\w+)( (.+))?$/, (msg, props) => {
  const math = props.match[3];
  if (math === undefined) {
    return bot.sendMessage(
      msg.chat.id,
      `Debe introducir una expresión matemática.\nEjemplos: <pre>/calc 2+3^6</pre>\n<pre>/calc PI^4</pre>\n<pre>/calc 25346*3456/32</pre>`,
      {
        parseMode: "html",
        replyToMessage: msg.message_id,
      }
    );
  } else {
    let result = parser.parse(math).simplify();
    console.log("El resultado de " + math + " es " + result);
    return bot
      .sendMessage(msg.chat.id, `<pre>${result}</pre>`, {
        parseMode: "html",
        replyToMessage: msg.message_id,
      })
      .catch((error) => {
        console.log("Hubo un error", error.description);
        return bot.sendMessage(msg.from.id, error.description);
      });
  }
});

bot.on(["/start", "/jelou"], async (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  return bot.sendMessage(id, "Envía /ayuda para ver algunas opciones.");
});

bot.on("/ping", (msg, self) => {
  const ahora = new Date();
  const activo = ahora - inicio;
  // dar el resultado en dependencia del tiempo
  let tiempo;
  if (activo > 60 * 60 * 1000) {
    const valor = roundToAny(activo / 3600000, 2);
    const horas = Math.floor(valor);
    const minutos = roundToAny((valor - horas) * 60, 0);
    tiempo = `${horas} h ${minutos} min`;
  } else if (activo > 60000) {
    const valor = roundToAny(activo / 60000, 2);
    const minutos = Math.floor(valor);
    const segundos = roundToAny((valor - minutos) * 60, 0);
    tiempo = `${minutos} min ${segundos} s`;
  } else {
    tiempo = `${roundToAny(activo / 1000, 1)} s`;
  }
  let id;
  if (self.type === "callbackQuery") {
    id = msg.message.chat.id;
  } else {
    id = msg.chat.id;
  }
  bot.getMe().then((res) => {
    bot.sendMessage(
      id,
      `[${res.first_name} (@${res.username})] Tiempo activo: ${tiempo}`
    );
  });
  //return bot.sendMessage(id, `Pong! Tiempo activo: ${tiempo}`);
});

bot.on("/info", (msg) => {
  //console.log(msg);

  const opts = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  bot.getChat(msg.chat.id).then((res) => {
    console.log(res);
    if (!msg.reply_to_message) {
      const fecha = new Date(msg.date * 1000);
      if (msg.chat.type === "private") {
        let user = res.username ? `@${res.username}` : "no tiene";
        bot.sendMessage(
          msg.chat.id,
          `ID: ${res.id}\nNombre: ${
            res.first_name
          }\nNombre de usuario: ${user}\nDescripción: ${
            res.bio
          }\nFecha: ${fecha.toLocaleDateString("es-CU", opts)}`,

          {
            parseMode: "html",
            replyToMessage: msg.message_id,
          }
        );
      } else {
        let user = msg.from.username ? `@${msg.from.username}` : "no tiene";
        let link = res.invite_link
          ? `<a href="${res.invite_link}">${res.title}</a>`
          : "ni idea";
        bot.sendMessage(
          msg.chat.id,
          `ID: ${res.id}\nNombre del grupo: ${
            res.title
          }\nEnlace: ${link}\n\nID (usuario): ${msg.from.id}\nNombre: ${
            msg.from.first_name
          }\nNombre de usuario: ${user}\nFecha: ${fecha.toLocaleDateString(
            "es-CU",
            opts
          )}`,

          {
            parseMode: "html",
            replyToMessage: msg.message_id,
          }
        );
      }
    } else {
      // ESTÁS RESPONDIENDO UN MENSAJE
      let user = msg.reply_to_message.from.username
        ? `@${msg.reply_to_message.from.username}`
        : "no tiene";
      const fecha = new Date(msg.reply_to_message.date * 1000);
      const grupo = msg.reply_to_message.chat.title
        ? `\nNombre del grupo: ${msg.reply_to_message.chat.title}`
        : "";
      bot.sendMessage(
        msg.chat.id,
        `<b>Sobre el mensaje respondido:</b>\nID: ${
          msg.reply_to_message.chat.id
        }${grupo}\nID (usuario): ${msg.reply_to_message.from.id}\nNombre: ${
          msg.reply_to_message.from.first_name
        }\nNombre de usuario: ${user}\nFecha: ${fecha.toLocaleDateString(
          "es-CU",
          opts
        )}\nmessageId: ${msg.reply_to_message.message_id}`,

        {
          parseMode: "html",
          replyToMessage: msg.reply_to_message.message_id,
        }
      );
    }
  });
});

bot.on("/size", (msg) => {
  if (!msg.reply_to_message) {
    return bot.sendMessage(
      msg.chat.id,
      `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name}</a>, el comando se usa respondiendo un mensaje`,
      { parseMode: "html", replyToMessage: msg.message_id }
    );
  }
  if (msg.reply_to_message.sticker) {
    bot.sendMessage(
      msg.chat.id,
      `Dimensiones: ${msg.reply_to_message.sticker.width}x${
        msg.reply_to_message.sticker.height
      }\nEmoji ${msg.reply_to_message.sticker.emoji}\nTamaño: ${roundToAny(
        msg.reply_to_message.sticker.file_size / 1024,
        1
      )}KB`,
      { parseMode: "html", replyToMessage: msg.reply_to_message.message_id }
    );
  }

  if (msg.reply_to_message.photo) {
    bot.sendMessage(
      msg.chat.id,
      `Dimensiones: ${
        msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].width
      }x${
        msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].height
      }\nTamaño: ${roundToAny(
        msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
          .file_size / 1024,
        1
      )}KB`,

      { parseMode: "html", replyToMessage: msg.reply_to_message.message_id }
    );
  }
  if (msg.reply_to_message.animation) {
    bot.sendMessage(
      msg.chat.id,
      `Dimensiones: ${msg.reply_to_message.animation.width}x${
        msg.reply_to_message.animation.height
      }\nDuración: ${
        msg.reply_to_message.animation.duration
      }s\nTamaño: ${roundToAny(
        msg.reply_to_message.animation.file_size / 1024,
        1
      )}KB`,

      { parseMode: "html", replyToMessage: msg.reply_to_message.message_id }
    );
  }
});

bot.on("forward", (msg) => {
  console.log(msg);
  const fecha = new Date(msg.forward_date * 1000);
  const opts = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  if (msg.chat.type === "private") {
    if (!msg.forward_from) {
      if (msg.forward_from_chat) {
        bot.sendMessage(
          msg.from.id,
          `Remitente: ${msg.forward_from_chat.title} \n(ID: ${
            msg.forward_from_chat.id
          })\nFecha: ${fecha.toLocaleDateString("es-CU", opts)}`,
          { parseMode: "html", replyToMessage: msg.message_id }
        );
      } else {
        console.log("SENDER NAME: ", msg.forward_sender_name);
        bot
          .sendMessage(
            msg.from.id,
            `Remitente: ${
              msg.forward_sender_name
            }\nFecha: ${fecha.toLocaleDateString("es-CU", opts)}`,
            {
              parseMode: "html",
              replyToMessage: msg.message_id,
            }
          )
          .catch((error) => {
            console.log("Hubo un error", error.description);
          });
      }
    } else {
      bot
        .sendMessage(
          msg.from.id,
          `Remitente: <a href="tg://user?id=${msg.forward_from.id}"> ${
            msg.forward_from.first_name
          } </a>\nFecha: ${fecha.toLocaleDateString("es-CU", opts)}`,
          { parseMode: "html", replyToMessage: msg.message_id }
        )
        .catch((error) => {
          console.log("Hubo un error", error.description);
        });
    }

    //console.log(msg);

    if (msg.sticker) {
      bot.sendMessage(
        msg.from.id,
        `Dimensiones: ${msg.sticker.width}x${msg.sticker.height}\nEmoji ${
          msg.sticker.emoji
        }\nTamaño: ${roundToAny(msg.sticker.file_size / 1024, 1)}KB`,
        { parseMode: "html", replyToMessage: msg.message_id }
      );
    }

    if (msg.photo) {
      bot.sendMessage(
        msg.from.id,
        `Dimensiones: ${msg.photo[msg.photo.length - 1].width}x${
          msg.photo[msg.photo.length - 1].height
        }\nTamaño: ${roundToAny(
          msg.photo[msg.photo.length - 1].file_size / 1024,
          1
        )}KB`,

        { parseMode: "html", replyToMessage: msg.message_id }
      );
    }
    if (msg.animation) {
      bot.sendMessage(
        msg.from.id,
        `Dimensiones: ${msg.animation.width}x${
          msg.animation.height
        }\nDuración: ${msg.animation.duration}s\nTamaño: ${roundToAny(
          msg.animation.file_size / 1024,
          1
        )}KB`,

        { parseMode: "html", replyToMessage: msg.message_id }
      );
    }

    if (msg.video) {
      bot.sendMessage(
        msg.from.id,
        `Nombre: ${msg.video.file_name}\nDimensiones: ${msg.video.width}x${
          msg.video.height
        }\nDuración: ${roundToAny(
          msg.video.duration / 60,
          1
        )} min\nTamaño: ${roundToAny(msg.video.file_size / 1024 / 1024, 1)}MB`,

        { parseMode: "html", replyToMessage: msg.message_id }
      );
    }
  }
});

// Testing sending files
bot.on(/^\/(foto|foto@\w+)( (.+))?$/, (msg, self) => {
  const url = self.match[3];
  // checking if there's a callback
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;

  if (url === undefined) {
    return bot.sendMessage(id, "Debe incluir un enlace válido");
  } else {
    return bot.sendPhoto(id, url).catch((error) => {
      console.log("Hubo un error", error.description);
      return bot.sendMessage(msg.from.id, error.description);
    });
  }
});

// trying to convert photos
bot.on(
  /^\/con(v|v@\w+)(\s(\d+|auto)(\s(\d+|auto))?(\s(\d+|auto))?)?$/,
  (msg, self) => {
    console.log(self);
    //console.log(self.match.length);
    // checking if there's a callback
    let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;

    if (!msg.reply_to_message) {
      return bot.sendMessage(
        id,
        "Debes responder un mensaje para usar este comando"
      );
    }
    if (msg.reply_to_message.photo) {
      bot
        .getFile(
          msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
            .file_id
        )
        .then((res) => {
          console.log(res);
          //analizar los distintos valores de la expresión regular
          let url = res.fileLink;
          let name =
            msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
              .file_unique_id;
          let size = roundToAny(
            msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
              .file_size / 1024,
            1
          );
          //inicializar los valores ancho, alto y calidad
          let ancho, alto, calidad;

          let ancho_auto = Math.round(
            msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
              .width / 2
          );
          let alto_auto = Math.round(
            msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
              .height / 2
          );
          let calidad_auto = 50;

          if (self.match[7] !== undefined) {
            //si tenemos los 3 valores
            ancho =
              self.match[3] === "auto" ? ancho_auto : parseInt(self.match[3]);
            alto =
              self.match[5] === "auto" ? alto_auto : parseInt(self.match[5]);
            calidad =
              self.match[7] === "auto" ? calidad_auto : parseInt(self.match[7]);
          } else {
            if (self.match[5] !== undefined) {
              // tenemos 2 valores: ancho y alto (imagen cuadrada, a menos q sea auto) y calidad
              ancho =
                self.match[3] === "auto" ? ancho_auto : parseInt(self.match[3]);
              alto =
                self.match[3] === "auto" ? alto_auto : parseInt(self.match[3]);
              calidad =
                self.match[5] === "auto"
                  ? calidad_auto
                  : parseInt(self.match[5]);
            } else {
              if (self.match[3] !== undefined) {
                // tenemos un solo valor: calidad, lo demás será auto
                ancho = ancho_auto;
                alto = alto_auto;
                calidad =
                  self.match[3] === "auto"
                    ? calidad_auto
                    : parseInt(self.match[3]);
              } else {
                //los valores por defecto
                ancho = ancho_auto;
                alto = alto_auto;
                calidad = calidad_auto;
              }
            }
          }
          // hay que controlar que las nuevas dimensiones sean menores, o no?
          // calidad si debe ser 1-100, aunque los otros valores deben ser positivos
          if (ancho < 1 || alto < 1 || calidad < 1 || calidad > 100) {
            return bot.sendMessage(id, "Valores inválidos", {
              replyToMessage: msg.message_id,
            });
          }

          return convertir(
            Jimp,
            bot,
            id,
            url,
            name,
            size,
            ancho,
            alto,
            calidad
          );
        });
    }
  }
);

bot.on(/^\/ge(t|t@\w+) (.+)$/, (msg, self) => {
  const url = self.match[3];
  // checking if there's a callback
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;

  if (url === undefined) {
    return bot.sendMessage(id, "Debe incluir un enlace válido");
  } else {
    return bot.sendDocument(id, url).catch((error) => {
      console.log("Hubo un error", error.description);
      return bot.sendMessage(msg.from.id, error.description);
    });
  }
});

// echo
bot.on(/^\/say (.+)$/, (msg, props) => {
  const text = props.match[1];
  console.log(msg);
  return bot.sendMessage(msg.chat.id, text, { replyToMessage: msg.message_id });
});

bot.on("/quit", (msg) => {
  console.log(msg.from);
  if (msg.from.username === process.env.ADMIN_USERNAME) {
    return bot.leaveChat(msg.chat.id).catch((error) => {
      console.log("Hubo un error", error.description);
      return bot.sendMessage(msg.from.id, error.description);
    });
  }
});

// Función reemplazar
// TODO: que funcione con caracteres especiales
bot.on(/^\/(s|s@\w+)\/(.+)?\/(.+)?/, (msg, props) => {
  const oldm = props.match[2];
  const newm = props.match[3] === undefined ? "" : props.match[3];
  console.log(props);
  if (props.match[2] === undefined) {
    return bot.sendMessage(
      msg.chat.id,
      `Debe escoger qué parte del mensaje desea reemplazar y con qué desea hacerlo.\nPor ejemplo, si tenemos un mensaje que diga "Eres feo" y queremos transformarlo en "Eres hermoso", debemos usar <pre>/s/feo/hermoso</pre> respondiendo dicho mensaje.\n\n<b>Nota:</b> Si el bot es administrador, borrará nuestro mensaje`,
      {
        parseMode: "html",
        replyToMessage: msg.message_id,
      }
    );
  } else {
    let text = "";
    if (msg.reply_to_message) {
      console.log("CAPTION: " + msg.reply_to_message.caption);
      if (msg.reply_to_message.text === undefined) {
        text =
          '<b>En realidad quisiste decir:</b> \n\n"' +
          msg.reply_to_message.caption.replace(new RegExp(oldm, "g"), newm) +
          '"';
      } else {
        text =
          '<b>En realidad quisiste decir:</b> \n\n"' +
          msg.reply_to_message.text.replace(new RegExp(oldm, "g"), newm) +
          '"';
      }

      return bot
        .sendMessage(msg.chat.id, text, {
          parseMode: "html",
          replyToMessage: msg.reply_to_message.message_id,
        })
        .then(() =>
          bot
            .deleteMessage(msg.chat.id, msg.message_id)
            .catch((e) => console.error(e))
        );
    } else {
      bot.sendMessage(
        msg.chat.id,
        "Debes responder un mensaje o de lo contrario no funcionará",
        {
          parseMode: "html",
          replyToMessage: msg.message_id,
        }
      );
    }
  }
});

bot.on(/^\/(s|s@\w+)(\/)?$/, (msg) => {
  return bot.sendMessage(
    msg.chat.id,
    `Debe escoger qué parte del mensaje desea reemplazar y con qué desea hacerlo.\nPor ejemplo, si tenemos un mensaje que diga "Eres feo" y queremos transformarlo en "Eres hermoso", debemos usar <pre>/s/feo/hermoso</pre> respondiendo dicho mensaje.\n\n<b>Nota:</b> Si el bot es administrador, borrará nuestro mensaje`,
    {
      parseMode: "html",
      replyToMessage: msg.message_id,
    }
  );
});

// dividir en 2 comandos distintos (FAILED)
bot.on(/^\/set_del( .+)?$/, (msg, props) => {
  if (msg.reply_to_message) {
    const new_del_input = new RegExp("^" + msg.reply_to_message.text + "$");
    default_del.push(new_del_input);
    return (
      bot.sendMessage(
        msg.from.id,
        "Se eliminarán los mensajes que consistan en: " +
          new_del_input +
          "\nLa lista completa es: \n" +
          default_del
      ) &&
      bot.on(default_del, (msg) =>
        bot.deleteMessage(msg.chat.id, msg.message_id).catch((error) => {
          console.log(
            "Hubo un error al intentar borrar el mensaje: ",
            error.description
          );
          return bot.sendMessage(msg.from.id, error.description);
        })
      )
    );
  } else if (props.match[1] !== undefined) {
    const del_input = new RegExp("^" + props.match[1] + "$");

    default_del.push(del_input);
    console.log("Borrar por defecto:", default_del, "Regex:", del_input);
    return (
      bot.sendMessage(
        msg.from.id,
        "Se eliminarán los mensajes que consistan en: " +
          del_input +
          "\nLa lista completa es: \n" +
          default_del
      ) &&
      bot.on(default_del, (msg) =>
        bot.deleteMessage(msg.chat.id, msg.message_id).catch((error) => {
          console.log(
            "Hubo un error al intentar borrar el mensaje: ",
            error.description
          );
          return bot.sendMessage(msg.from.id, error.description);
        })
      )
    );
  } else
    return bot.sendMessage(
      msg.from.id,
      "Responde un mensaje o pon algo de texto. No soy mago."
    );
});

bot.on(default_del, (msg) =>
  bot.deleteMessage(msg.chat.id, msg.message_id).catch((error) => {
    console.log(
      "Hubo un error al intentar borrar el mensaje: ",
      error.description
    );
    return bot.sendMessage(msg.from.id, error.description);
  })
);

// Usando el array exportado (CAMBIAR)

bot.on("text", (msg) => {
  const {
    text,
    chat: { id: chat_id, type },
    from: { id: from_id, first_name, last_name, username },
  } = msg;

  console.log(
    `[${type}] ${chat_id}: ${[first_name, last_name, username && `@${username}`]
      .filter(Boolean)
      .join(" ")} (${from_id}) - ${text}`
  );

  query("SELECT * FROM filters", [], (err, res) => {
    if (err) {
      console.log("[ERROR UPDATING]");
      console.log(err.stack);
    } else {
      //console.log(res.rows);
      res.rows.map((trigger) => {
        const regex = new RegExp("^" + trigger.filtro + "$", "i");
        let caption =
          trigger.respuesta[1] === undefined ? null : trigger.respuesta[1];
        if (msg.text.match(regex) || msg.caption?.match(regex)) {
          console.log("TIPO DE FILTRO\n", trigger.tipo);
          if (trigger.tipo === "text") {
            bot.sendMessage(chat_id, trigger.respuesta[0], {
              replyToMessage: msg.message_id,
            });
          } else if (trigger.tipo === "photo") {
            bot.sendPhoto(chat_id, trigger.respuesta[0], {
              caption: caption,
              replyToMessage: msg.message_id,
            });
          } else if (trigger.tipo === "sticker") {
            bot.sendSticker(chat_id, trigger.respuesta[0], {
              replyToMessage: msg.message_id,
            });
          } else if (trigger.tipo === "voice") {
            bot.sendVoice(chat_id, trigger.respuesta[0], {
              caption: caption,
              replyToMessage: msg.message_id,
            });
          } else if (trigger.tipo === "video") {
            bot.sendVideo(chat_id, trigger.respuesta[0], {
              caption: caption,
              replyToMessage: msg.message_id,
            });
          } else {
            bot.sendDocument(chat_id, trigger.respuesta[0], {
              caption: caption,
              replyToMessage: msg.message_id,
            });
          }
        }
      });
    }
  });
});

// añadir un atajo
bot.on("/add", (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;

  if (msg.reply_to_message) {
    const trigger = msg.text.replace("/add ", "");
    let answer;
    let type;
    if (msg.reply_to_message.text) {
      type = "text";
      answer = [msg.reply_to_message.text];
    } else if (msg.reply_to_message.photo) {
      type = "photo";
      answer = [
        msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
          .file_id,
      ];
    } else if (msg.reply_to_message.voice) {
      type = "voice";
      answer = [msg.reply_to_message.voice.file_id];
    } else if (msg.reply_to_message.video) {
      type = "video";
      answer = msg.reply_to_message.video.file_id;
    } else if (msg.reply_to_message.sticker) {
      type = "sticker";
      answer = msg.reply_to_message.sticker.file_id;
    } else {
      type = "document";
      answer = [msg.reply_to_message.document.file_id];
    }
    if (msg.reply_to_message.caption !== undefined) {
      answer.push(msg.reply_to_message.caption);
    }
    console.log(trigger, "\n", type, "\n", answer);
    // insertar los valores
    const values = [trigger, answer, type, id];
    query(
      "INSERT INTO filters(filtro, respuesta, tipo, chat) VALUES($1, $2, $3, $4)",
      values,
      (err, res) => {
        if (err) {
          console.log("[ERROR UPDATING]");
          console.log(err.stack);
        } else {
          console.log("[filtro agregado]");
          bot.sendMessage(id, `Nuevo filtro <pre>${trigger}</pre>`, {
            parseMode: "html",
          });
        }
      }
    );
  }
});

bot.on("/filtros", (msg) => {
  query("SELECT * FROM filters", [], (err, res) => {
    if (err) {
      console.log("[ERROR UPDATING]");
      console.log(err.stack);
    } else {
      console.log(res.rows);
    }
  });
});

//crear tabla
bot.on("/create_table", (msg) => {
  query(
    "CREATE TABLE IF NOT EXISTS public.filters(filtro text NOT NULL, respuesta text[] NOT NULL, tipo text NOT NULL, chat text); ALTER TABLE public.filters OWNER to postgres;"
  );
  bot.sendMessage(msg.chat.id, "tabla creada");
});

//para la reputación
//postgres

bot.on(
  [/^\++$/, /^this$/i, /^op$/i, /^nice$/i, /^nai(s|z)$/i, /^g(u|oo)d$/i],
  (msg) => {
    if (msg.reply_to_message) {
      //id del remitente
      const from_id = msg.from.id;
      //extraer nick y rep del remitente
      query(
        `SELECT rep, nick FROM usuarios WHERE tg_id = '${from_id}'`,
        [],
        (err, res) => {
          if (err) {
            console.log("[ERROR SELECTING] weird af");
            console.log(err.stack);
          } else {
            // inicializar rep y nick del usuario
            let from_rep = 0;
            let from_nick = msg.from.first_name;
            let from_rango = setRango(from_rep);
            // en caso de no encontrar elementos en la tabla, agrega un nuevo usuario
            if (res.rows[0] === undefined) {
              const values = [
                from_id,
                from_rep,
                new Date(),
                from_nick,
                from_rango,
              ];
              query(
                "INSERT INTO usuarios(tg_id, rep, fecha, nick, rango) VALUES($1, $2, $3, $4, $5)",
                values,
                (err, res) => {
                  if (err) {
                    console.log("[ERROR UPDATING]");
                    console.log(err.stack);
                  } else {
                    console.log("[usuario agregado]");
                    //console.log(res.rows[0].nick);
                    //console.log(res);
                  }
                }
              );
            } else {
              // si todo va bien, tomo los valores
              from_rep = res.rows[0].rep;
              from_nick = res.rows[0].nick;
              from_rango = setRango(from_rep);
              // en caso de que el usuario no tenga rango
              if (res.rows[0].rango === null) {
                updateUserStat(from_id, "rango", from_rango);
              }
            }

            //farmeo de puntos
            if (
              msg.reply_to_message.from.id === from_id &&
              from_id !== parseInt(my_id)
            ) {
              //responder a uno mismo
              return bot.sendMessage(
                msg.chat.id,
                `<a href="tg://user?id=${from_id}">[${adornarRango(
                  from_rango
                )}] ${from_nick}</a> ha intentado hacer trampas... \n<em>qué idiota</em>`,
                { parseMode: "html" }
              );
            } else {
              // aquí va el manejo de la reputación
              const reply_id = msg.reply_to_message.from.id;

              //buscando al que sube la reputación en la BD
              query(
                `SELECT rep, nick, rango FROM usuarios WHERE tg_id = '${reply_id}'`,
                [],
                (err, res) => {
                  if (err) {
                    console.log("[ERROR SELECTING] weird af");
                    console.log(err.stack);
                  } else {
                    // inicializar rep y nick del otro usuario
                    let reply_rep = 1;
                    let reply_nick = msg.reply_to_message.from.first_name;
                    let reply_rango = setRango(reply_rep);
                    // en caso de no encontrar elementos en la tabla, agrega un nuevo usuario
                    if (res.rows[0] === undefined) {
                      const values = [
                        reply_id,
                        reply_rep,
                        new Date(),
                        reply_nick,
                        reply_rango,
                      ];
                      query(
                        "INSERT INTO usuarios(tg_id, rep, fecha, nick, rango) VALUES($1, $2, $3, $4, $5)",
                        values,
                        (err, res) => {
                          if (err) {
                            console.log("[ERROR UPDATING]");
                            console.log(err.stack);
                          } else {
                            console.log(
                              "[usuario agregado][mensaje respondido]"
                            );
                            //console.log(res.rows[0].nick);
                            //console.log(res);
                          }
                        }
                      );
                    } else {
                      // si todo va bien, tomo los valores
                      reply_rep = res.rows[0].rep;
                      reply_nick = res.rows[0].nick;
                      reply_rango = setRango(reply_rep + 1);
                      // en caso de que el usuario no tenga rango
                      if (res.rows[0].rango === null) {
                        updateUserStat(reply_id, "rango", reply_rango);
                      }
                    }

                    query(
                      `UPDATE usuarios SET rep = rep + 1, rango = '${setRango(
                        reply_rep + 1
                      )}', fecha = now() WHERE tg_id = '${reply_id}' RETURNING *`,
                      [],
                      (err, res) => {
                        if (err) {
                          console.log("[ERROR UPDATING]");
                          console.log(err.stack);
                        } else {
                          console.log(
                            "[rep y rango actualizados][mensaje respondido]"
                          );
                          //console.log(res.rows[0].nick);
                          //console.log(res.rows[0].rango);
                          reply_rango = res.rows[0].rango;
                        }
                      }
                    );

                    console.log(
                      `[${adornarRango(reply_rango)}] ${reply_nick} tiene ${
                        reply_rep + 1
                      } puntos de reputación ahora, cortesía de [${adornarRango(
                        from_rango
                      )}] ${from_nick} (rep: ${from_rep})`
                    );
                    bot.sendMessage(
                      msg.chat.id,
                      `<a href="tg://user?id=${reply_id}">[${adornarRango(
                        reply_rango
                      )}] ${reply_nick}</a> tiene ${
                        reply_rep + 1
                      } puntos de reputación ahora, cortesía de <a href="tg://user?id=${from_id}">[${adornarRango(
                        from_rango
                      )}] ${from_nick}</a>`,
                      { parseMode: "html" }
                    );
                  }
                }
              );
            }
          }
        }
      );
    }
  }
);

// lo mismo pero para quitar rep
bot.on(
  [
    /^(\-|—)+$/,
    /^fe(o|a)$/i,
    /^asc(o|a)$/i,
    /^thisn't$/i,
    /^uff$/i,
    /^mm+$/i,
    /^n(op|ope)$/i,
    /^yesn't$/i,
  ],
  (msg) => {
    if (msg.reply_to_message) {
      //id del remitente
      const from_id = msg.from.id;
      //extraer nick y rep del remitente
      query(
        `SELECT rep, nick FROM usuarios WHERE tg_id = '${from_id}'`,
        [],
        (err, res) => {
          if (err) {
            console.log("[ERROR SELECTING] weird af");
            console.log(err.stack);
          } else {
            // inicializar rep y nick del usuario
            let from_rep = 0;
            let from_nick = msg.from.first_name;
            let from_rango = setRango(from_rep);
            // en caso de no encontrar elementos en la tabla, agrega un nuevo usuario
            if (res.rows[0] === undefined) {
              const values = [
                from_id,
                from_rep,
                new Date(),
                from_nick,
                from_rango,
              ];
              query(
                "INSERT INTO usuarios(tg_id, rep, fecha, nick, rango) VALUES($1, $2, $3, $4, $5)",
                values,
                (err, res) => {
                  if (err) {
                    console.log("[ERROR UPDATING]");
                    console.log(err.stack);
                  } else {
                    console.log("[usuario agregado]");
                    //console.log(res.rows[0].nick);
                    //console.log(res);
                  }
                }
              );
            } else {
              // si todo va bien, tomo los valores
              from_rep = res.rows[0].rep;
              from_nick = res.rows[0].nick;
              from_rango = setRango(from_rep);
              // en caso de que el usuario no tenga rango
              if (res.rows[0].rango === null) {
                updateUserStat(from_id, "rango", from_rango);
              }
            }

            //farmeo de puntos
            if (
              msg.reply_to_message.from.id === from_id &&
              from_id !== parseInt(my_id)
            ) {
              //responder a uno mismo
              return bot.sendMessage(
                msg.chat.id,
                `<a href="tg://user?id=${from_id}">[${adornarRango(
                  from_rango
                )}] ${from_nick}</a> ha intentado hacer trampas... \n<em>qué idiota</em>`,
                { parseMode: "html" }
              );
            } else {
              // aquí va el manejo de la reputación
              const reply_id = msg.reply_to_message.from.id;

              //buscando al que sube la reputación en la BD
              query(
                `SELECT rep, nick, rango FROM usuarios WHERE tg_id = '${reply_id}'`,
                [],
                (err, res) => {
                  if (err) {
                    console.log("[ERROR SELECTING] weird af");
                    console.log(err.stack);
                  } else {
                    // inicializar rep y nick del otro usuario
                    let reply_rep = 0;
                    let reply_nick = msg.reply_to_message.from.first_name;
                    let reply_rango = setRango(reply_rep);
                    // en caso de no encontrar elementos en la tabla, agrega un nuevo usuario
                    if (res.rows[0] === undefined) {
                      const values = [
                        reply_id,
                        reply_rep,
                        new Date(),
                        reply_nick,
                        reply_rango,
                      ];
                      query(
                        "INSERT INTO usuarios(tg_id, rep, fecha, nick, rango) VALUES($1, $2, $3, $4, $5)",
                        values,
                        (err, res) => {
                          if (err) {
                            console.log("[ERROR UPDATING]");
                            console.log(err.stack);
                          } else {
                            console.log(
                              "[usuario agregado][mensaje respondido]"
                            );
                            //console.log(res.rows[0].nick);
                            //console.log(res);
                          }
                        }
                      );
                    } else {
                      // si todo va bien, tomo los valores
                      reply_rep = res.rows[0].rep;
                      reply_nick = res.rows[0].nick;
                      reply_rango = setRango(reply_rep - 1);
                      // en caso de que el usuario no tenga rango
                      if (res.rows[0].rango === null) {
                        updateUserStat(reply_id, "rango", reply_rango);
                      }
                    }

                    query(
                      `UPDATE usuarios SET rep = rep - 1, rango = '${setRango(
                        reply_rep - 1
                      )}', fecha = now() WHERE tg_id = '${reply_id}' RETURNING *`,
                      [],
                      (err, res) => {
                        if (err) {
                          console.log("[ERROR UPDATING]");
                          console.log(err.stack);
                        } else {
                          console.log(
                            "[rep y rango actualizados][mensaje respondido]"
                          );
                          //console.log(res.rows[0].nick);
                          //console.log(res.rows[0].rango);
                          reply_rango = res.rows[0].rango;
                        }
                      }
                    );

                    console.log(
                      `[${adornarRango(reply_rango)}] ${reply_nick} tiene ${
                        reply_rep - 1
                      } puntos de reputación ahora, cortesía de [${adornarRango(
                        from_rango
                      )}] ${from_nick} (rep: ${from_rep})`
                    );
                    bot.sendMessage(
                      msg.chat.id,
                      `<a href="tg://user?id=${reply_id}">[${adornarRango(
                        reply_rango
                      )}] ${reply_nick}</a> tiene ${
                        reply_rep - 1
                      } puntos de reputación ahora, cortesía de <a href="tg://user?id=${from_id}">[${adornarRango(
                        from_rango
                      )}] ${from_nick}</a>`,
                      { parseMode: "html" }
                    );
                  }
                }
              );
            }
          }
        }
      );
    }
  }
);

// para reiniciar los valores de rep
bot.on("/reset_rep", (msg) => {
  if (msg.from.id.toString() === my_id) {
    query("UPDATE usuarios SET rep = 0");

    return bot.sendMessage(
      msg.chat.id,
      `Se ha reiniciado la reputación para todos los usuarios`
    );
  }
});

bot.on(/^\/set_rep (\d+) (\d+|\-\d+)$/, (msg, props) => {
  console.log(props.match);

  if (msg.from.id.toString() === my_id) {
    const dest_id = props.match[1];
    const dest_rep = props.match[2];

    query(
      `SELECT rep, nick FROM usuarios WHERE tg_id = '${dest_id}'`,
      [],
      (err, res) => {
        if (err) {
          console.log("[ERROR SELECTING] weird af");
          console.log(err.stack);
        } else {
          // inicializar rep y nick del otro usuario

          let dest_nick = msg.from.first_name;
          // en caso de no encontrar elementos en la tabla, agrega un nuevo usuario
          if (res.rows[0] === undefined) {
            const values = {
              tg_id: dest_id.toString(),
              nick: dest_nick,
              rep: parseInt(dest_rep),
              fecha: new Date(),
            };
            query(
              "INSERT INTO usuarios(tg_id, rep, fecha, nick) VALUES($1, $2, $3, $4)",
              values,
              (err, res) => {
                if (err) {
                  console.log("[ERROR UPDATING]");
                  console.log(err.stack);
                } else {
                  console.log("[res.rows[0]]");
                  console.log(res.rows[0]);
                  //console.log(res);
                }
              }
            );
            return bot.sendMessage(
              msg.chat.id,
              `Se ha registrado a ${dest_nick} con reputación ${dest_rep}`
            );
          } else {
            console.log("[res.rows[0]]");
            console.log(res.rows[0]);
            // si todo va bien, tomo los valores

            dest_nick = res.rows[0].nick;

            updateUserStat(dest_id, "rep", parseInt(dest_rep));

            return bot.sendMessage(
              msg.chat.id,
              `Se ha actualizado el registro de ${dest_nick} con reputación ${dest_rep}`
            );
          }
        }
      }
    );
  }
});

// importar BD, no debe ser necesario (por lo menos la implementación actual no sirve)

// bot.on(["/set_bd", "/set_db"], (msg) => {
//   console.log(msg);
//   if (msg.reply_to_message && msg.from.id.toString() === my_id) {
//     if (msg.reply_to_message.document) {
//       console.log("[DOCUMENT FOUND]");
//       bot.getFile(msg.reply_to_message.document.file_id).then((res) => {
//         const url = res.fileLink;
//         axios({
//           url: url,
//         }).then(async (res) => {
//           const new_data = res.data
//             .replace(/,"_id":"[a-zA-Z0-9]+"}/g, "}")
//             .replace(/\n/g, "123")
//             .split("123");

//           let list = [];
//           for (let i = 0; i < new_data.length - 1; i++) {
//             list.push(JSON.parse(new_data[i]));
//           }
//           for (let i = 0; i < list.length; i++) {
//             list[i].fecha = new Date(list[i].fecha.$$date);
//           }
//           await db.insert(list);
//         });
//       });
//     }
//   }
// });

// SPAM
bot.on(/^\/ta(g|g@\w+)( \d+)?$/, (msg, self) => {
  let n = 1;
  //console.log("SELF: \n", self);
  //console.log("MATCH: \n", self.match);
  if (self.match !== undefined) {
    n = self.match[2];
    if (n > 50 || n === undefined) {
      n = 1;
    }
  }

  let new_victim = victim;
  if (msg.reply_to_message) {
    new_victim = msg.reply_to_message.from.id;
  }
  console.log("Se repetirá: " + n + " veces");

  //diferenciando las queries
  let id;
  if (self.type === "callbackQuery") {
    id = msg.message.chat.id;
  } else {
    id = msg.chat.id;
  }

  if (new_victim.toString() === my_id.toString()) {
    bot
      .sendMessage(
        id,
        `<a href="tg://user?id=${msg.from.id}">Cariño</a>, no puedo hacer eso`,
        { parseMode: "html" }
      )
      .catch((err) => {
        console.error(err);
      });
  } else {
    // no sé si poner los nicks personalizados aquí... mejor no
    // voy a usar async await para que la salida esté en orden
    // como en https://zellwk.com/blog/async-await-in-loops/

    const forEnOrden = async (_) => {
      for (let i = 0; i < n; i++) {
        await bot
          .sendMessage(
            id,
            `<a href="tg://user?id=${new_victim}">tag tag</a>\n<em>llamada número ${
              i + 1
            }</em>`,
            { parseMode: "html" }
          )
          .catch((err) => {
            console.error(err);
          });
      }
    };

    forEnOrden();
  }
});

bot.on("/sticker", (msg) => {
  if (msg.reply_to_message.sticker) {
    return bot
      .setChatStickerSet(msg.chat.id, msg.reply_to_message.sticker.set_name)
      .catch((error) => {
        console.log("Hubo un puto error", error.description);
        return bot.sendMessage(msg.from.id, error.description);
      });
  }
});

// trabajo con bases de datos

bot.on(/^\/(nick|nick@\w+) (.+)$/, (msg, props) => {
  const nuevo_nick = props.match[2];
  const tg_id = msg.from.id;
  //buscar el id en la bd
  query(
    `SELECT nick FROM usuarios WHERE tg_id = '${tg_id}'`,
    [],
    (err, res) => {
      if (err) {
        console.log("[ERROR SELECTING] weird af");
        console.log(err.stack);
      } else {
        // en caso de no encontrar elementos en la tabla, agrega un nuevo usuario
        if (res.rows[0] === undefined) {
          const values = [tg_id, 0, new Date(), nuevo_nick];
          query(
            "INSERT INTO usuarios(tg_id, rep, fecha, nick) VALUES($1, $2, $3, $4)",
            values,
            (err, res) => {
              if (err) {
                console.log("[ERROR UPDATING]");
                console.log(err.stack);
              } else {
                console.log("[usuario agregado]");
              }
            }
          );
        } else {
          // si todo va bien, cambio el nick
          updateUserStat(tg_id, "nick", nuevo_nick);
        }
        console.log(
          "El nick de " + msg.from.first_name + " será " + nuevo_nick
        );
        return bot
          .sendMessage(
            msg.chat.id,
            "El nick de " + msg.from.first_name + " será " + nuevo_nick,
            {
              parseMode: "html",
            }
          )
          .catch((error) => {
            console.log(
              "[/nick] Hubo un error agregando un usuario",
              error.description
            );
            return bot.sendMessage(msg.from.id, error.description);
          });
      }
    }
  );
});

// webhook: https://wastingbot.up.railway.app/webhooks/railway
// app.post("/webhooks/railway/", async (req, res) => {
//   const {
//     type,
//     project: { name },
//   } = req.body;

//   bot.sendMessage(process.env.ADMIN_ID, `${type}: ${name}`);
//   res.status(200);
// });

// app.use(express.json());
// // app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
// // app.use(bodyParser.text({ type: "text/html" }));

// app.get("/", async (req, res) => {
//   res.json({ Hello: "World" });
// });

bot.on("stop", (data) => {
  // After 5 seconds, START the bot
  setTimeout(function () {
    bot.start();
  }, 5 * 1000);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Ha ocurrido un error");
  console.log("Motivo:\n", reason);
  console.log("Promesa:\n", promise);
  // Application specific logging, throwing an error, or other logic here
  //bot.start();
});

// probando ejemplo de reddit
bot.on(/^\/meme$/, (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  const mainUrl = `https://reddit.com/r/dankmemes`;
  axios
    .get(mainUrl)
    .then(async (response) => {
      const cant = await dankMemes(response.data);

      let botones = [
        [
          bot.inlineButton(`Post aleatorio`, {
            callback: `/memeRandom`,
          }),
        ],
        [],
      ];
      for (let i = 0; i < cant; i++) {
        const boton = [
          bot.inlineButton(`img ${i + 1}`, {
            callback: `/meme ${i}`,
          }),
        ];
        botones[1] = [].concat(...botones[1], boton);
      }
      const replyMarkup = bot.inlineKeyboard(botones);

      await bot.sendMessage(
        id,
        `${cant} memes robados de https://reddit.com/r/dankmemes`,
        { parseMode: "html", webPreview: false, replyMarkup }
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

bot.on(/^\/meme (\d+)$/, (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  const index = self.match[1];
  console.log(index);
  const mainUrl = `https://reddit.com/r/dankmemes`;
  axios.get(mainUrl).then(async (response) => {
    const url = await dankMemesEsp(response.data, index);
    await bot.sendPhoto(id, url, {
      caption: `Robado de https://reddit.com/r/dankmemes`,
    });
  });
});

bot.on("/memeRandom", (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  const mainUrl = `https://reddit.com/r/dankmemes`;
  axios
    .get(mainUrl)
    .then(async (response) => {
      const url = await dankMemes(response.data);
      bot.sendPhoto(id, url, {
        caption: `Robado de https://reddit.com/r/dankmemes`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

bot.on([/^\/lec$/, /^\/lectulandia$/], (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  if (msg.chat.type === "private") {
    const mainUrl = `https://www.lectulandia.co/book/`;
    axios
      .get(mainUrl)
      .then((response) => {
        const books = lectulandia(response.data);

        const encabezado = `He encontrado ${books.length} libros: `;
        //let texto = [encabezado];

        let botones = [];
        for (let i = 0; i < books.length; i++) {
          const [enlace, portada, titulo, autor_nombre, autor_enlace, desc] =
            books[i];
          // const caption = `<b>Título:</b> <a href="${enlace}">${titulo}</a>\n<b>Autor:</b> <a href="${autor_enlace}">${autor_nombre}</a>`;
          // texto.push(caption);
          const boton = [
            bot.inlineButton(`${titulo} de ${autor_nombre}`, {
              callback: `/lec ${i}`,
            }),
          ];
          botones.push(boton);
        }

        // const mensaje = texto.join("\n\n");

        const replyMarkup = bot.inlineKeyboard(botones);

        bot.sendMessage(id, encabezado, {
          parseMode: "html",
          webPreview: false,
          replyMarkup,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    bot.sendMessage(
      id,
      "Este comando sólo funciona por privado para no inundar el chat y evitar abusos",
      { replyToMessage: msg.message_id }
    );
  }
});

// para un libro en específico y después para la botonera

bot.on(/^\/(lec|lectulandia) (\d+)$/, (msg, self) => {
  //console.log(self);
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  if (
    (msg.chat && msg.chat.type === "private") ||
    self.type === "callbackQuery"
  ) {
    const index = self.match[2];
    const mainUrl = `https://www.lectulandia.co/book/`;
    axios
      .get(mainUrl)
      .then((response) => {
        const book = lectulandia1(response.data, index);
        const [enlace, portada, titulo, autor_nombre, autor_enlace, desc] =
          book;
        const caption = `<b>Título:</b> <a href="${enlace}">${titulo}</a>\n<b>Autor:</b> <a href="${autor_enlace}">${autor_nombre}</a>\n\n<em>${desc}</em>`;
        //console.log(caption);
        bot.sendPhoto(id, portada, {
          caption: caption,
          parseMode: "html",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    bot.sendMessage(
      msg.chat.id,
      "Este comando sólo funciona por privado para no inundar el chat y evitar abusos",
      { replyToMessage: msg.message_id }
    );
  }
});

// lo mismo de lectulandia para cuantarazon.com

bot.on([/^\/cr( p(\d+))?$/i, /^\/cuantarazon( p(\d+))?$/i], (msg, self) => {
  //console.log(msg.message_id);
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  const pagina = self.match[2] === undefined ? 1 : self.match[2];
  const mainUrl = `https://www.cuantarazon.com/ultimos/p/${pagina}`;
  axios
    .get(mainUrl)
    .then(async (response) => {
      const cant = await cuantaRazon(response.data);

      await bot
        .sendMessage(
          id,
          `${cant} fotos robadas de https://www.cuantarazon.com\n(página ${pagina})`,
          { parseMode: "html", webPreview: false }
        )
        .then((res) => {
          let botones = [];
          for (let i = 0; i < cant; i++) {
            const boton = [
              bot.inlineButton(`Foto número ${i + 1}`, {
                callback: `/cr ${i} p${pagina}`,
              }),
            ];

            botones.push(boton);
          }
          //botón para cambiar de página
          const ultimoBoton = [
            bot.inlineButton(`Siguiente página (${pagina + 1})`, {
              callback: `/editcr ${res.message_id} p${pagina + 1}`,
            }),
          ];
          botones.push(ultimoBoton);

          const replyMarkup = bot.inlineKeyboard(botones);

          bot.editMessageReplyMarkup(
            { chatId: id, messageId: res.message_id },
            { replyMarkup }
          );
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// editar la lista de imágenes de cuantarazon.com

bot.on(/^\/editcr (\d+)( p(\d+))?$/i, (msg, self) => {
  //console.log(msg.message_id);
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  const msgId = parseInt(self.match[1]);
  const pagina = self.match[3] === undefined ? 1 : parseInt(self.match[3]);
  const mainUrl = `https://www.cuantarazon.com/ultimos/p/${pagina}`;
  axios
    .get(mainUrl)
    .then(async (response) => {
      const cant = await cuantaRazon(response.data);

      let botones = [];
      for (let i = 0; i < cant; i++) {
        const boton = [
          bot.inlineButton(`Foto número ${i + 1}`, {
            callback: `/cr ${i} p${pagina}`,
          }),
        ];

        botones.push(boton);
      }
      //botón para cambiar de página
      const ultimoBoton = [
        bot.inlineButton(`Siguiente página (${pagina + 1})`, {
          callback: `/editcr ${msgId} p${pagina + 1}`,
        }),
      ];
      botones.push(ultimoBoton);

      const replyMarkup = bot.inlineKeyboard(botones);

      //console.log(id, msgId);
      bot
        .editMessageText(
          { chatId: id, messageId: msgId },
          `Más fotos robadas de https://www.cuantarazon.com\n(página ${pagina})`,
          { replyMarkup, parseMode: "html", webPreview: false }
        )

        // .then(() =>
        //   bot.editMessageReplyMarkup(
        //     { chatId: id, messageId: msgId },
        //     { replyMarkup }
        //   )
        // )
        .catch((err) => console.error(err));

      // await bot.sendMessage(
      //   id,
      //   `${cant} fotos robadas de https://www.cuantarazon.com\n(página ${pagina})`,
      //   { parseMode: "html", webPreview: false, replyMarkup }
      // );
    })
    .catch((err) => {
      console.log(err);
    });
});

// para un meme en específico y después para la botonera

bot.on(/^\/(cr|cuantarazon) (\d+)( p(\d+))?$/, (msg, self) => {
  //console.log(self);
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  const index = self.match[2];
  const pagina = self.match[4] === undefined ? 1 : self.match[4];
  //console.log(index);
  const mainUrl = `https://www.cuantarazon.com/ultimos/p/${pagina}`;
  axios.get(mainUrl).then(async (response) => {
    const [url, titulo] = await cuantaRazonUno(response.data, index);
    //console.log(url, titulo);
    await bot.sendPhoto(id, url, {
      caption: `<a href="${url}">${titulo}</a>\nRobada de https://www.cuantarazon.com`,
      parseMode: "html",
    });
  });
});

// ud attempt
bot.on("/ud", (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;

  const term = msg.text.replace("/ud ", "");
  let options = {
    method: "GET",
    url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
    params: { term: term },
    headers: {
      "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(typeof response.data.list);
      console.log(response.data.list);

      const cantDef = response.data.list.length;
      const data = response.data.list[0];
      let def = data.definition;
      let ejem = data.example;
      // el tamaño máximo de un mensaje son 4096 caracteres
      if (def.length > 2000) {
        def = def.substring(0, 2000) + "...";
      }
      if (ejem.length > 2000) {
        ejem = ejem.substring(0, 2000) + "...";
      }

      bot
        .sendMessage(
          id,
          `<b>${term}:</b>\n\n<em>Def.</em>: ${def}\n\n<em>Ex.: ${ejem}</em>`,
          { parseMode: "html", webPreview: false }
        )
        .then((res) => {
          //botonera
          let botones = [[], []];
          // quitar botón de la primera definición
          if (cantDef > 1) {
            for (let i = 1; i < cantDef; i++) {
              const boton = [
                bot.inlineButton(`Def ${i + 1}`, {
                  callback: `/ud1 ${i} ${res.message_id} ${term}`,
                }),
              ];

              if (i < 6) {
                botones[0] = [].concat(...botones[0], boton);
              } else {
                botones[1] = [].concat(...botones[1], boton);
              }
            }
            const replyMarkup = bot.inlineKeyboard(botones);
            bot.editMessageReplyMarkup(
              { chatId: id, messageId: res.message_id },
              { replyMarkup }
            );
          }
        });
    })
    .catch(function (error) {
      console.error(error);
    });
});

// para pedir una acepción distinta
bot.on(/^\/ud1 (\d+) (\d+) (.+)$/i, (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  const elem = parseInt(self.match[1]);
  const msgId = parseInt(self.match[2]);
  const term = self.match[3];
  let options = {
    method: "GET",
    url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
    params: { term: term },
    headers: {
      "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(typeof response.data.list);
      console.log(response.data.list);

      const cantDef = response.data.list.length;
      const data = response.data.list[elem];
      let def = data.definition;
      let ejem = data.example;

      console.log(cantDef);
      // el tamaño máximo de un mensaje son 4096 caracteres
      if (def.length > 2000) {
        def = def.substring(0, 2000) + "...";
      }
      if (ejem.length > 2000) {
        ejem = ejem.substring(0, 2000) + "...";
      }
      //botonera
      let botones = [[], []];
      for (let i = 0; i < cantDef; i++) {
        if (i !== elem) {
          const boton = [
            bot.inlineButton(`Def ${i + 1}`, {
              callback: `/ud1 ${i} ${msgId} ${term}`,
            }),
          ];

          if (i < 5) {
            botones[0] = [].concat(...botones[0], boton);
          } else {
            botones[1] = [].concat(...botones[1], boton);
          }
        }
      }

      const replyMarkup = bot.inlineKeyboard(botones);

      bot
        .editMessageText(
          { chatId: id, messageId: msgId },
          `<b>${term}:</b>\n\n<em>Def.</em>: ${def}\n\n<em>Ex.: ${ejem}</em>`,
          { replyMarkup, parseMode: "html", webPreview: false }
        )

        .catch((err) => console.error(err));

      // bot.sendMessage(
      //   id,
      //   `<b>${term}:</b>\n\n<em>Def.</em>: ${def}\n\n<em>Ex.: ${ejem}</em>`,
      //   { replyMarkup, parseMode: "html", webPreview: false }
      // );
    })
    .catch(function (error) {
      console.error(error);
    });
});

bot.on(/^\/ud$/i, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Comando para buscar palabras en el Urban Dictionary\nEjemplo: <pre>/ud cum</pre>",
    { parseMode: "html", replyToMessage: msg.message_id }
  );
});

// traducciones
bot.on(/^\/tr (\w{2})( .+)?$/, (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;

  const destino = self.match[1];
  let term;
  let replyto;
  //diferenciar cuando se responde un mensaje a cuando se pone la frase junto al comando
  if (msg.reply_to_message) {
    replyto = msg.reply_to_message.message_id;
    if (msg.reply_to_message.text === undefined) {
      term = msg.reply_to_message.caption;
    } else {
      term = msg.reply_to_message.text;
    }
  } else {
    replyto = msg.message_id;
    term = msg.text.replace(/\/tr \w{2}\s/i, "");
  }

  let options = {
    method: "POST",
    url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    },
    data: { q: term, source: "auto", target: destino },
  };
  axios
    .request(options)
    .then(function (response) {
      //console.log(response.data.data.translations.translatedText);
      const trad = response.data.data.translations.translatedText;
      console.log(`Traducción a ${destino}: ${trad}`);
      bot.sendMessage(id, trad, { replyToMessage: replyto });
    })
    .catch(function (error) {
      console.error(error);
    });
});

// por defecto traduce a español
bot.on(/^\/tr( .{3,})?$/, (msg, self) => {
  let id = self.type === "callbackQuery" ? msg.message.chat.id : msg.chat.id;
  let term;
  let replyto;
  //diferenciar cuando se responde un mensaje a cuando se pone la frase junto al comando
  if (msg.reply_to_message) {
    replyto = msg.reply_to_message.message_id;
    if (msg.reply_to_message.text === undefined) {
      term = msg.reply_to_message.caption;
    } else {
      term = msg.reply_to_message.text;
    }
  } else {
    replyto = msg.message_id;
    term = msg.text.replace("/tr ", "");
    console.log(term);
    if (term === "" || term === "/tr") {
      return bot.sendMessage(
        id,
        "Debes escribir algo o responder un mensaje que desees traducir",
        { replyToMessage: replyto }
      );
    }
  }

  let options = {
    method: "POST",
    url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    },
    data: { q: term, source: "auto", target: "es" },
  };
  axios
    .request(options)
    .then(function (response) {
      //console.log(response.data.data.translations.translatedText);
      const trad = response.data.data.translations.translatedText;
      console.log(`Traducción por defecto a español: ${trad}`);
      bot.sendMessage(id, trad, { replyToMessage: replyto });
    })
    .catch(function (error) {
      console.error(error);
    });
});

// para que el bot no deje de funcionar a la semana, que envíe mensajes constantemente
cron.schedule("0 */1 * * *", () => {
  const chat_id = process.env.KEEP_ALIVE_CHAT_ID;
  const ahora = new Date();
  const activo = ahora - inicio;
  // dar el resultado en dependencia del tiempo
  let tiempo;
  if (activo > 60 * 60 * 1000) {
    const valor = roundToAny(activo / 3600000, 1);
    const horas = Math.floor(valor);
    const minutos = roundToAny((valor - horas) * 60, 0);
    tiempo = `${horas} h ${minutos} min`;
  } else if (activo > 60000) {
    const valor = roundToAny(activo / 60000, 1);
    const minutos = Math.floor(valor);
    const segundos = roundToAny((valor - minutos) * 60, 0);
    tiempo = `${minutos} min ${segundos} s`;
  } else {
    tiempo = `${roundToAny(activo / 1000, 1)} s`;
  }

  console.log(`[${res.first_name}] Tiempo activo: ${tiempo}`);
  //bot.sendMessage(chat_id, `[OK] tiempo activo: ${tiempo}`);
  bot.getMe().then((res) => {
    bot.sendMessage(
      chat_id,
      `[${res.first_name} (@${res.username})] Tiempo activo: ${tiempo}`
    );
  });
});

// TODO: hacer un contador
// function updateKeyboard(count) {

//   let apples = 'apples';
//   let oranges = 'oranges';

//   if (count == 'apples') {
//       apples = `==> ${ apples } <==`;
//   } else {
//       oranges = `==> ${ oranges } <==`;
//   }

//   return bot.inlineKeyboard([
//       [
//           bot.inlineButton(apples, {callback: 'apples'}),
//           bot.inlineButton(oranges, {callback: 'oranges'})
//       ]
//   ]);

// }

// error handling

bot.on("error", (error) => console.error("ERROR", error));

bot.start();
