const TeleBot = require("telebot");
const bot = new TeleBot("1712168159:AAFhf_IJmGpoEAIW9ZLGknzKIuOjNbScsNE");

bot.on(["/start", "/hello", "/jelou"], (msg) =>
  msg.reply.text("Ya empezaron a joder...")
);

bot.on("/ping", (msg) => msg.reply.text("Pong!"));

bot.on("/chatid", (msg) =>
  msg.reply.text("El ID de este chat es " + msg.chat.id, { asReply: true })
);

// Testing sending files
bot.on(/^\/foto (.+)$/, (msg, props) => {
  const url = props.match[1];
  return bot.sendPhoto(msg.chat.id, url);
});

bot.on(/^\/get (.+)$/, (msg, props) => {
  const url = props.match[1];
  return bot.sendDocument(msg.chat.id, url);
});

// echo
bot.on(/^\/say (.+)$/, (msg, props) => {
  const text = props.match[1];
  console.log(msg);
  return bot.sendMessage(msg.chat.id, text, { replyToMessage: msg.message_id });
});

// my username is currently hardcoded
bot.on("/quit", (msg) => {
  console.log(msg.from);
  if (msg.from.username === "m4ss1ck") {
    return bot.leaveChat(msg.chat.id).catch((error) => {
      console.log("Hubo un puto error", error.description);
      return bot.sendMessage(msg.from.id, error.description);
    });
  }
});

// Función reemplazar
// TODO: que funcione con caracteres especiales
bot.on(/^\/s\/(.+)\/(.+)/, (msg, props) => {
  const oldm = props.match[1];
  const newm = props.match[2];
  const text =
    '<b>En realidad quisiste decir:</b> \n\n"' +
    msg.reply_to_message.text.replaceAll(oldm, newm) +
    '"';
  //console.log(msg.reply_to_message);
  // bot.deleteMessage(<chat_id>, <from_message_id>);
  return (
    bot.sendMessage(msg.chat.id, text, {
      parseMode: "html",
      replyToMessage: msg.reply_to_message.message_id,
    }) && bot.deleteMessage(msg.chat.id, msg.message_id)
  );
});

// setChatStickerSet(<chat_id>, <sticker_set_name>)

//Funciones del tipo "nudes", "beso"...

bot.on("text", (msg) => {
  console.log(msg.reply_to_message);
  if (msg.text.match(/^(nud(e|es))$/i)) {
    return bot.sendMessage(
      msg.chat.id,
      `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name} </a> le envía su <b>colección de nudes</b> a <a href="tg://user?id=${msg.reply_to_message.from.id}"> ${msg.reply_to_message.from.first_name} </a>`,
      { parseMode: "html" }
    );
  }
  if (msg.text.match(/^(pinga|penga)$/i)) {
    return bot.sendMessage(
      msg.chat.id,
      `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name} </a> <em>cariñosamente</em> manda <b>pa' la pinga</b> a <a href="tg://user?id=${msg.reply_to_message.from.id}"> ${msg.reply_to_message.from.first_name} </a>`,

      { parseMode: "html" }
    );
  }
});

bot.on("/tag", (msg) =>
  bot.sendMessage(
    msg.chat.id,
    `<a href="tg://user?id=706890648"> tag tag </a>, puto`,
    { parseMode: "html" }
  )
);

bot.on("/info", (msg) => {
  console.log(msg);
});

// error handling

// bot.on("error", (error, data) => {
//   // console.log(msg);
//   console.log(error);
//   return bot.sendMessage(data.from.id, error.description);
// });

bot.start();
