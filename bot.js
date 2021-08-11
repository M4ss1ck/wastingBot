import TeleBot from "telebot";
import { Parser } from "expr-eval";
//import express from "express";
import process from "process";
import lista from "./launcher_list.js";

//const app = express();

const my_id = process.env.ADMIN_ID;
const victim = process.env.VICTIM;

const bot = new TeleBot({
  token: process.env.TG_TOKEN,
  usePlugins: ["commandButton"],
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
  console.log(msg?.reply_to_message);
  bot.getChat(msg.chat.id).then((res) => {
    console.log(res);
    bot.sendMessage(
      msg.chat.id,
      `Este es el grupo <b>${res.title}</b> cuyo id es <pre>${res.id}</pre>`,

      {
        parseMode: "html",
        replyToMessage: msg.message_id,
      }
    );
  });
});

bot.on("/size", (msg) =>
  msg.reply.text(
    "Tamaño: " +
      roundToTwo(
        msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
          .file_size / 1024
      ) +
      "KB",
    {
      asReply: true,
    }
  )
);

bot.on("forward", (msg) => {
  console.log(msg);
  if (msg.chat.type === "private") {
    if (!msg.forward_from) {
      if (msg.forward_from_chat) {
        bot.sendMessage(
          msg.from.id,
          `Remitente: ${msg.forward_from_chat.title} \n(ID: ${msg.forward_from_chat.id}).`,
          { parseMode: "html", replyToMessage: msg.message_id }
        );
      } else {
        console.log("SENDER NAME: ", msg.forward_sender_name);
        bot
          .sendMessage(msg.from.id, `Remitente: ${msg.forward_sender_name}`, {
            parseMode: "html",
            replyToMessage: msg.message_id,
          })
          .catch((error) => {
            console.log("Hubo un error", error.description);
          });
      }
    } else {
      bot
        .sendMessage(
          msg.from.id,
          `Remitente: <a href="tg://user?id=${msg.forward_from.id}"> ${msg.forward_from.first_name} </a>`,
          { parseMode: "html", replyToMessage: msg.message_id }
        )
        .catch((error) => {
          console.log("Hubo un error", error.description);
        });
    }
    if (msg.sticker) {
      bot.sendMessage(
        msg.from.id,
        `Dimensiones: <pre>${msg.sticker.width} x ${
          msg.sticker.height
        } px</pre>\nEmoji ${msg.sticker.emoji} \nTamaño: ${roundToTwo(
          msg.sticker.file_size / 1024
        )}KB`,
        { parseMode: "html", replyToMessage: msg.message_id }
      );
    }

    if (msg.photo) {
      // const replyMarkup = bot.inlineKeyboard([
      //   msg.photo.map((i) => {
      //     console.log(i.file_size);
      //     return bot.inlineButton(
      //       `Tamaño ${roundToTwo(i.file_size / 1024)}KB`,
      //       {
      //         callback: `/foto ${i.file_id}`,
      //       }
      //     );
      //   }),
      // ]);
      // console.log(replyMarkup);

      let sizes = [];
      for (let i = 0; i < msg.photo.length - 1; i++) {
        const size = `${roundToTwo(
          msg.photo[i].file_size / 1024
        )}KB - <pre>/foto ${msg.photo[i].file_id}</pre>`;
        sizes.push(size);
      }
      console.log(sizes);
      bot
        .sendMessage(
          msg.from.id,
          `Dimensiones: <pre>${msg.photo[msg.photo.length - 1].width} x ${
            msg.photo[msg.photo.length - 1].height
          } px</pre>\nTamaño: ${roundToTwo(
            msg.photo[msg.photo.length - 1].file_size / 1024
          )}KB`,

          { parseMode: "html", replyToMessage: msg.message_id }
        )
        .then(() => {
          bot.sendMessage(
            msg.from.id,
            `<b>Otros tamaños</b>\n(copie el código y envíeselo al bot)\n${sizes.join(
              "\n"
            )}`,
            {
              parseMode: "html",
            }
          );
        });
    }
  }
});

// Testing sending files
bot.on(/^\/foto (.+)$/, (msg, props) => {
  const url = props.match[1];
  return bot.sendPhoto(msg.chat.id, url).catch((error) => {
    console.log("Hubo un error", error.description);
    return bot.sendMessage(msg.from.id, error.description);
  });
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
bot.on(/^\/s\/(.+)\/(.+)/, (msg, props) => {
  const oldm = props.match[1];
  const newm = props.match[2];
  let text = "";
  if (msg.reply_to_message.caption) {
    console.log("CAPTION: " + msg.reply_to_message.caption);
  }
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

  return (
    bot.sendMessage(msg.chat.id, text, {
      parseMode: "html",
      replyToMessage: msg.reply_to_message.message_id,
    }) && bot.deleteMessage(msg.chat.id, msg.message_id)
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

// Usando el array exportado

bot.on("text", (msg) => {
  lista.map((launcher) => {
    const re = new RegExp("^" + launcher.search + "$", "i");

    if (msg.text.match(re)) {
      console.log(re);
      if (!msg.reply_to_message) {
        return bot.sendMessage(
          msg.chat.id,
          `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name} </a> ${
            launcher.alone[Math.floor(Math.random() * launcher.alone.length)]
          }`,
          { parseMode: "html" }
        );
      } else {
        return bot.sendMessage(
          msg.chat.id,
          `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name} </a> ${
            launcher.as_reply[
              Math.floor(Math.random() * launcher.as_reply.length)
            ]
          } <a href="tg://user?id=${msg.reply_to_message.from.id}"> ${
            msg.reply_to_message.from.first_name
          } </a>`,
          { parseMode: "html" }
        );
      }
    }
  });
});

// EXPERIMENTAL
bot.on(/^\/tag( \d+)?$/, (msg, self) => {
  let n = 1;
  console.log("SELF: \n", self);
  // FIX: no funciona el tag múltiple
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
  console.log(
    "ID de la víctima: " +
      new_victim +
      " comparado al mío " +
      my_id +
      " y el original " +
      victim
  );

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
    for (let i = 0; i < n; i++) {
      bot
        .sendMessage(
          id,
          `<a href="tg://user?id=${new_victim}"> tag tag </a>\n<em>llamada número ${
            i + 1
          }</em>`,
          { parseMode: "html" }
        )
        .catch((err) => {
          console.error(err);
        });
    }
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
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
