import TeleBot from "telebot";
import { Parser } from "expr-eval";
//import express from "express";
import process from "process";
import lista from "./launcher_list.js";

//const app = express();

const my_id = process.env.ADMIN_ID;
const victim = process.env.VICTIM;

const bot = new TeleBot(process.env.TG_TOKEN);
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

bot.on(["/group", "/grupo", "/promo"], (msg) => {
  let replyMarkup = bot.inlineKeyboard(
    [
      [
        bot.inlineButton("Grupo", {
          url: "https://t.me/juestin_taim",
        }),

        bot.inlineButton("canal", {
          url: "https://t.me/wasting_time_pro",
        }),
      ],
    ],
    { resize: true }
  );

  return bot.sendMessage(
    msg.chat.id,
    "Sea usted bienvenid@ a la comunidad de <b>Wasting Time</b>. Donde podrá pasar tiempo con sus amigos, compartir memes, jugar a encontrar el lobo y probablemente morir en el intento.",
    { parseMode: "html", replyMarkup }
  );
});

bot.on(["/gay", "/ghei"], (msg) => {
  let replyMarkup = bot.inlineKeyboard([
    [
      bot.inlineButton("en otro chat", { inline: "soy loca?" }),
      bot.inlineButton("aquí mismo", { inlineCurrent: "soy loquísima?" }),
    ],
  ]);

  return bot.sendMessage(msg.chat.id, "Mi % de loca", { replyMarkup });
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
  console.log(msg.data);
  return bot.answerCallbackQuery(
    msg.id,
    `Inline button callback: ${msg.data}`,
    { text: msg.data, showAlert: true }
  );
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

bot.on(["/start", "/jelou"], (msg) =>
  msg.reply.text("Ya empezaron a joder...")
);

bot.on("/ping", (msg) => msg.reply.text("Pong!"));

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
          } a <a href="tg://user?id=${msg.reply_to_message.from.id}"> ${
            msg.reply_to_message.from.first_name
          } </a>`,
          { parseMode: "html" }
        );
      }
    }
  });
});

// EXPERIMENTAL
bot.on(/^\/tag( \d+)?$/, (msg, props) => {
  let n = 1;
  if (props) {
    console.log(props);
    n = props.match[1];
    if (n > 50 || n === undefined) {
      n = 1;
    }
  }

  let new_victim = victim;
  if (msg.reply_to_message) {
    new_victim = msg.reply_to_message.from.id;
  }
  console.log("Se repetirá: " + n + "veces");
  console.log(
    "ID de la víctima: " +
      new_victim +
      " comparado al mío " +
      my_id +
      " y el original " +
      victim
  );
  console.log(new_victim.toString() === my_id.toString());
  if (new_victim.toString() === my_id.toString()) {
    bot
      .sendMessage(
        msg.chat.id,
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
          msg.chat.id,
          `<a href="tg://user?id=${new_victim}"> tag tag </a>\n<em>llamada número ${i}</em>`,
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
  console.log("reason is", reason);
  console.log("promise is", promise);
  // Application specific logging, throwing an error, or other logic here
  bot.start();
});

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}
