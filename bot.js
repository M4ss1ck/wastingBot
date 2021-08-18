import TeleBot from "telebot";
import { Parser } from "expr-eval";
//import express from "express";
import process from "process";
import lista from "./launcher_list.js";

import Jimp from "jimp";
import fs from "fs";

import Datastore from "nedb-promises";

import axios from "axios";

//const app = express();

let db;
const iniciarbd = async () => {
  db = await Datastore.create({
    filename: "database/nicks.db",
    autoload: true,
    corruptAlertThreshold: 1,
  });
};
iniciarbd();

try {
  fs.accessSync("database/nicks.db");
  console.log("[BD] La BD está ubicada en database/nicks.db");
} catch (err) {
  console.log("[BD] La BD no se encuentra");
  console.error(err);
  fs.copyFile("database/copy_nicks.db", "database/nicks.db", (err) => {
    if (err) {
      console.log("[ERROR DE COPIA] ", err);
    }
  });
  console.log("[BD] se utilizará la copia de respaldo");
}

const my_id = process.env.ADMIN_ID;
const victim = process.env.VICTIM;

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
  let id;
  if (self.type === "callbackQuery") {
    id = msg.message.chat.id;
  } else {
    id = msg.chat.id;
  }

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
  let id;
  if (self.type === "callbackQuery") {
    id = msg.message.chat.id;
  } else {
    id = msg.chat.id;
  }
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

bot.on(/^\/calc (.+)$/, (msg, props) => {
  const math = props.match[1];
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
});

bot.on(["/start", "/jelou"], (msg, self) => {
  console.log("SELF: ", self);
  console.log("MSG: ", msg);
  let id;
  if (self.type === "callbackQuery") {
    id = msg.message.chat.id;
  } else {
    id = msg.chat.id;
  }
  return bot.sendMessage(id, "Envía /ayuda para ver algunas opciones.");
});

bot.on("/ping", (msg, self) => {
  let id;
  if (self.type === "callbackQuery") {
    id = msg.message.chat.id;
  } else {
    id = msg.chat.id;
  }
  return bot.sendMessage(id, "Pong!");
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
        )}`,

        {
          parseMode: "html",
          replyToMessage: msg.reply_to_message.message_id,
        }
      );
    }
  });
});

bot.on(
  "/size",
  (msg) => {
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
        }\nEmoji ${msg.reply_to_message.sticker.emoji}\nTamaño: ${roundToTwo(
          msg.reply_to_message.sticker.file_size / 1024
        )}KB`,
        { parseMode: "html", replyToMessage: msg.reply_to_message.message_id }
      );
    }

    if (msg.reply_to_message.photo) {
      bot.sendMessage(
        msg.chat.id,
        `Dimensiones: ${
          msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
            .width
        }x${
          msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
            .height
        }\nTamaño: ${roundToTwo(
          msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
            .file_size / 1024
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
        }s\nTamaño: ${roundToTwo(
          msg.reply_to_message.animation.file_size / 1024
        )}KB`,

        { parseMode: "html", replyToMessage: msg.reply_to_message.message_id }
      );
    }
  }
  // msg.reply.text(
  //   "Tamaño: " +
  //     roundToTwo(
  //       msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
  //         .file_size / 1024
  //     ) +
  //     "KB",
  //   {
  //     asReply: true,
  //   }
  // )
);

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
    if (msg.sticker) {
      bot.sendMessage(
        msg.from.id,
        `Dimensiones: ${msg.sticker.width}x${msg.sticker.height}\nEmoji ${
          msg.sticker.emoji
        }\nTamaño: ${roundToTwo(msg.sticker.file_size / 1024)}KB`,
        { parseMode: "html", replyToMessage: msg.message_id }
      );
    }

    if (msg.photo) {
      bot.sendMessage(
        msg.from.id,
        `Dimensiones: ${msg.photo[msg.photo.length - 1].width}x${
          msg.photo[msg.photo.length - 1].height
        }\nTamaño: ${roundToTwo(
          msg.photo[msg.photo.length - 1].file_size / 1024
        )}KB`,

        { parseMode: "html", replyToMessage: msg.message_id }
      );
    }
    if (msg.animation) {
      bot.sendMessage(
        msg.from.id,
        `Dimensiones: ${msg.animation.width}x${
          msg.animation.height
        }\nDuración: ${msg.animation.duration}s\nTamaño: ${roundToTwo(
          msg.animation.file_size / 1024
        )}KB`,

        { parseMode: "html", replyToMessage: msg.message_id }
      );
    }
  }
});

// Testing sending files
bot.on(/^\/foto (.+)$/, (msg, self) => {
  const url = self.match[1];
  let id;
  if (self.type === "callbackQuery") {
    id = msg.message.chat.id;
  } else {
    id = msg.chat.id;
  }
  return bot.sendPhoto(id, url).catch((error) => {
    console.log("Hubo un error", error.description);
    return bot.sendMessage(msg.from.id, error.description);
  });
});

// trying to convert photos
bot.on(/^\/conv(\s(\d+|auto)(\s(\d+|auto))?(\s(\d+|auto))?)?$/, (msg, self) => {
  console.log(self);
  //console.log(self.match.length);
  let id;
  if (self.type === "callbackQuery") {
    id = msg.message.chat.id;
  } else {
    id = msg.chat.id;
  }
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
        let size = roundToTwo(
          msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
            .file_size / 1024
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

        if (self.match[6] !== undefined) {
          //si tenemos los 3 valores
          ancho =
            self.match[2] === "auto" ? ancho_auto : parseInt(self.match[2]);
          alto = self.match[4] === "auto" ? alto_auto : parseInt(self.match[4]);
          calidad =
            self.match[6] === "auto" ? calidad_auto : parseInt(self.match[6]);
        } else {
          if (self.match[4] !== undefined) {
            // tenemos 2 valores: ancho y alto (imagen cuadrada, a menos q sea auto) y calidad
            ancho =
              self.match[2] === "auto" ? ancho_auto : parseInt(self.match[2]);
            alto =
              self.match[2] === "auto" ? alto_auto : parseInt(self.match[2]);
            calidad =
              self.match[4] === "auto" ? calidad_auto : parseInt(self.match[4]);
          } else {
            if (self.match[2] !== undefined) {
              // tenemos un solo valor: calidad, lo demás será auto
              ancho = ancho_auto;
              alto = alto_auto;
              calidad =
                self.match[2] === "auto"
                  ? calidad_auto
                  : parseInt(self.match[2]);
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

        return convertir(id, url, name, size, ancho, alto, calidad);
      });
  }
});

bot.on(/^\/get (.+)$/, (msg, props) => {
  const url = props.match[1];
  return bot.sendDocument(msg.chat.id, url).catch((error) => {
    console.log("Hubo un puto error", error.description);
    return bot.sendMessage(msg.from.id, error.description);
  });
});

// echo
bot.on(/^\/say (.+)$/, (msg, props) => {
  const text = props.match[1];
  console.log(msg);
  return bot.sendMessage(msg.chat.id, text, { replyToMessage: msg.message_id });
});

// my username is currently hardcoded FIXED
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
bot.on(/^\/s\/(.+)\/(.+)?/, (msg, props) => {
  const oldm = props.match[1];
  const newm = props.match[2] === undefined ? "" : props.match[2];
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

// Usando el array exportado

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

  let name = msg.from.first_name;
  //const tg_id = msg.from.id;
  db.findOne({ tg_id: from_id.toString() }).then((res) => {
    name = res === null ? name : res.nick;

    lista.map((launcher) => {
      const re = new RegExp("^" + launcher.search + "$", "i");

      if (msg.text.match(re)) {
        console.log(re);
        if (!msg.reply_to_message) {
          console.log("[alone] [name] ", name);
          return bot.sendMessage(
            msg.chat.id,
            `<a href="tg://user?id=${from_id}"> ${name} </a> ${
              launcher.alone[Math.floor(Math.random() * launcher.alone.length)]
            }`,
            { parseMode: "html" }
          );
        } else {
          let reply_name = msg.reply_to_message.from.first_name;
          const reply_id = msg.reply_to_message.from.id;
          db.findOne({ tg_id: reply_id.toString() }).then((res) => {
            reply_name = res === null ? reply_name : res.nick;

            return bot.sendMessage(
              msg.chat.id,
              `<a href="tg://user?id=${from_id}"> ${name} </a> ${
                launcher.as_reply[
                  Math.floor(Math.random() * launcher.as_reply.length)
                ]
              } <a href="tg://user?id=${reply_id}"> ${reply_name} </a>`,
              { parseMode: "html" }
            );
          });
        }
      }
    });
  });
});

//para la reputación
bot.on([/^\++$/, /^this$/i], (msg) => {
  const from_id = msg.from.id;
  db.findOne({ tg_id: from_id.toString() })
    .then((res) => {
      const user_nick =
        res === null
          ? msg.from.first_name
          : res.nick
          ? res.nick
          : msg.from.first_name;
      const user_rep = res ? parseInt(res.rep - 1000) : 1;
      db.update(
        { tg_id: from_id.toString() },
        { $set: { rep: parseInt(user_rep + 1000) } }
      );
      if (!msg.reply_to_message) {
        return bot.sendMessage(
          msg.chat.id,
          `Debes responder un mensaje, ${user_nick}`
        );
      } else {
        // se está respondiendo un mensaje
        // ahora hay que evitar el farmeo de puntos

        if (
          msg.reply_to_message.from.id === from_id &&
          from_id !== parseInt(my_id)
        ) {
          //responder a uno mismo
          return bot.sendMessage(
            msg.chat.id,
            `<a href="tg://user?id=${from_id}">${user_nick}</a> ha intentado hacer trampas... \n<em>qué idiota</em>`,
            { parseMode: "html" }
          );
        } else {
          // aquí va el manejo de la reputación
          const reply_id = msg.reply_to_message.from.id;

          //buscando al que sube la reputación en la BD
          db.findOne({ tg_id: reply_id.toString() })
            .then((res) => {
              const reply_nick =
                res === null
                  ? msg.reply_to_message.from.first_name
                  : res.nick
                  ? res.nick
                  : msg.reply_to_message.from.first_name;

              if (res === null) {
                let new_rep = {
                  tg_id: reply_id.toString(),
                  rep: 1001,
                  fecha: new Date(),
                  nick: reply_nick,
                };
                db.insert(new_rep);
                db.find({}).sort({ fecha: -1 });
                return bot.sendMessage(
                  msg.chat.id,
                  `<a href="tg://user?id=${from_id}">${user_nick}</a> hace posible que comience el viaje de <a href="tg://user?id=${reply_id}">${reply_nick}</a> al otorgarle 1 punto de reputación.`,
                  { parseMode: "html" }
                );
              } else {
                let reply_rep = res.rep ? parseInt(res.rep - 999) : 2;
                let new_rep = {
                  rep: parseInt(reply_rep + 1000),
                  fecha: new Date(),
                };

                db.update({ tg_id: reply_id.toString() }, { $set: new_rep });
                db.find({}).sort({ fecha: -1 });
                console.log(
                  `${reply_nick} tiene ${reply_rep} puntos de reputación ahora, cortesía de ${user_nick} (quien tiene ${user_rep})`
                );
                bot.sendMessage(
                  msg.chat.id,
                  `<a href="tg://user?id=${reply_id}">${reply_nick}</a> tiene ${reply_rep} puntos de reputación ahora, cortesía de <a href="tg://user?id=${from_id}">${user_nick}</a> (quien tiene ${user_rep})`,
                  { parseMode: "html" }
                );
              }
            })
            .catch((err) => console.error(err));
        }
      }
    })
    .then((res) => {
      fs.copyFile("database/nicks.db", "database/copy_nicks.db", (err) => {
        if (err) {
          console.log("[ERROR DE COPIA] ", err);
        }
      });
      console.log("[BD] actualizada");
    });
});

// lo mismo pero para quitar rep
bot.on([/^(\-|—)+$/, /^fe(o|a)$/i, /^asc(o|a)$/i, /^thisn't$/i], (msg) => {
  const from_id = msg.from.id;
  db.findOne({ tg_id: from_id.toString() })
    .then((res) => {
      const user_nick =
        res === null
          ? msg.from.first_name
          : res.nick
          ? res.nick
          : msg.from.first_name;

      const user_rep = res ? parseInt(res.rep - 1000) : 1;
      db.update(
        { tg_id: from_id.toString() },
        { $set: { rep: parseInt(user_rep + 1000) } }
      ); // intentando arreglar algo
      if (!msg.reply_to_message) {
        return bot.sendMessage(
          msg.chat.id,
          `Debes responder un mensaje, ${user_nick}`
        );
      } else {
        // se está respondiendo un mensaje
        // ahora hay que evitar el farmeo de puntos, aunque no me interesa xq estamos quitando

        // aquí va el manejo de la reputación
        const reply_id = msg.reply_to_message.from.id;

        //buscando al que sube la reputación en la BD
        db.findOne({ tg_id: reply_id.toString() })
          .then((res) => {
            const reply_nick =
              res === null
                ? msg.reply_to_message.from.first_name
                : res.nick
                ? res.nick
                : msg.reply_to_message.from.first_name;

            if (res === null) {
              let new_rep = {
                tg_id: reply_id.toString(),
                rep: 999,
                fecha: new Date(),
                nick: reply_nick,
              };
              db.insert(new_rep);
              db.find({}).sort({ fecha: -1 });
              return bot.sendMessage(
                msg.chat.id,
                `<a href="tg://user?id=${from_id}">${user_nick}</a> hace posible que comience el viaje de <a href="tg://user?id=${reply_id}">${reply_nick}</a>, pero lo hizo quitándole reputación. Ahora tiene -1.`,
                { parseMode: "html" }
              );
            } else {
              let reply_rep = res.rep ? parseInt(res.rep - 1000 - 1) : 0;
              let new_rep = {
                rep: parseInt(reply_rep + 1000),
                fecha: new Date(),
              };

              db.update({ tg_id: reply_id.toString() }, { $set: new_rep });
              db.find({}).sort({ fecha: -1 });
              console.log(
                `${reply_nick} tiene ${reply_rep} puntos de reputación ahora, cortesía de ${user_nick} (quien tiene ${user_rep})`
              );
              bot.sendMessage(
                msg.chat.id,
                `<a href="tg://user?id=${reply_id}">${reply_nick}</a> tiene ${reply_rep} puntos de reputación ahora, cortesía de <a href="tg://user?id=${from_id}">${user_nick}</a> (quien tiene ${user_rep})`,
                { parseMode: "html" }
              );
            }
          })
          .catch((err) => console.error(err));
      }
    })
    .then((res) => {
      fs.copyFile("database/nicks.db", "database/copy_nicks.db", (err) => {
        if (err) {
          console.log("[ERROR DE COPIA] ", err);
        }
      });
      console.log("[BD] actualizada");
    });
});

// para reiniciar los valores de rep
bot.on("/reset_rep", (msg) => {
  if (msg.from.id.toString() === my_id) {
    db.update({}, { $set: { rep: 1000 } });
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

    db.findOne({ tg_id: dest_id.toString() })
      .then((res) => {
        const dest_nick =
          res === null
            ? msg.from.first_name
            : res.nick
            ? res.nick
            : msg.from.first_name;
        if (res === null) {
          const new_input = {
            tg_id: dest_id.toString(),
            nick: dest_nick,
            rep: parseInt(dest_rep) + 1000,
            fecha: new Date(),
          };
          db.insert(new_input);
          db.find({}).sort({ fecha: -1 });
          return bot.sendMessage(
            msg.chat.id,
            `Se ha registrado a ${dest_nick} con reputación ${dest_rep}`
          );
        } else {
          db.update(
            { tg_id: dest_id.toString() },
            { $set: { rep: parseInt(dest_rep) + 1000 } }
          );
          db.find({}).sort({ fecha: -1 });
          return bot.sendMessage(
            msg.chat.id,
            `Se ha actualizado el registro de ${dest_nick} con reputación ${dest_rep}`
          );
        }
      })
      .then((res) => {
        fs.copyFile("database/nicks.db", "database/copy_nicks.db", (err) => {
          if (err) {
            console.log("[ERROR DE COPIA] ", err);
          }
        });
        console.log("[BD] actualizada");
      });
  }
});

bot.on("/bd", (msg) => {
  db.find({})
    .then((res) => {
      console.log(res);
      if (msg.from.id.toString() === my_id) {
        bot.sendDocument(msg.from.id, "database/nicks.db", {
          caption: `Copia de seguridad de la BD ${new Date()}`,
        });
      }
    })
    .catch((e) => console.error(e));
});

bot.on(["/set_bd", "/set_db"], (msg) => {
  console.log(msg);
  if (msg.reply_to_message && msg.from.id.toString() === my_id) {
    if (msg.reply_to_message.document) {
      console.log("[DOCUMENT FOUND]");
      bot.getFile(msg.reply_to_message.document.file_id).then((res) => {
        console.log(res);
        const url = res.fileLink;
        axios({
          //method: "get",
          url: url,
          //responseType: "blob",
        }).then(async (res) => {
          console.log(res.data);
          const new_data = res.data
            .replace(/,"_id":"[a-zA-Z0-9]+"}/g, "}")
            .replace(/\n/g, "123")
            .split("123");

          let list = [];
          //list.push(new_data);
          //console.log(new_data);
          //console.log(JSON.parse(new_data[0]));
          for (let i = 0; i < new_data.length - 1; i++) {
            list.push(JSON.parse(new_data[i]));
          }
          console.log(list);
          await db.insert(list);
          db.find({}).sort({ fecha: -1 });
        });
      });
    }
    //console.log("test");
  }
});

// SPAM
bot.on(/^\/tag( \d+)?$/, (msg, self) => {
  let n = 1;
  console.log("SELF: \n", self);

  console.log("MATCH: \n", self.match);
  if (self.match !== undefined) {
    n = self.match[1];
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
  console.log(msg.reply_to_message);
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

bot.on(/^\/nick (.+)$/, (msg, props) => {
  const texto = props.match[1];
  const tg_id = msg.from.id;
  db.findOne({ tg_id: tg_id.toString() })
    .then((res, err) => {
      //console.log(res);
      console.log(err);
      if (res === null) {
        let new_nick = {
          tg_id: tg_id.toString(),
          nick: texto,
          fecha: new Date(),
          rep: 1000,
        };
        db.insert(new_nick);

        console.log(
          "El nick de " +
            msg.from.first_name +
            " será " +
            texto +
            "\ncon una reputación de 0"
        );
        return bot
          .sendMessage(
            msg.chat.id,
            "El nick de " + msg.from.first_name + " será " + texto,
            {
              parseMode: "html",
            }
          )
          .catch((error) => {
            console.log("Hubo un error", error.description);
            return bot.sendMessage(msg.from.id, error.description);
          });
      } else {
        let new_nick = {
          nick: texto,
          //fecha: new Date(),
        };
        db.update({ tg_id: tg_id.toString() }, { $set: new_nick });
        console.log(
          "El nuevo nick de " +
            msg.from.first_name +
            " será " +
            texto +
            "\ncon una reputación de " +
            (res.rep - 1000)
        );
        return bot
          .sendMessage(
            msg.chat.id,
            "El nuevo nick de " + msg.from.first_name + " será " + texto,
            {
              parseMode: "html",
            }
          )
          .catch((error) => {
            console.log("Hubo un error", error.description);
            return bot.sendMessage(msg.from.id, error.description);
          });
      }
    })
    .then((res) => {
      console.log(res);
      fs.copyFile("database/nicks.db", "database/copy_nicks.db", (err) => {
        if (err) {
          console.log("[ERROR DE COPIA] ", err);
        }
      });
    });
});

// error handling

bot.on("error", (error) => console.error("ERROR", error));

// bot.on("error", (error, data) => {
//   // console.log(msg);
//   console.log(error);
//   return bot.sendMessage(data.from.id, error.description);
// });

bot.start();

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

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

async function convertir(id, url, name, size, ancho, alto, calidad) {
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

// hacer un contador
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
