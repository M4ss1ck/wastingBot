const TeleBot = require("telebot");
const bot = new TeleBot("1712168159:AAFhf_IJmGpoEAIW9ZLGknzKIuOjNbScsNE");

bot.on(["/start", "/hello", "/jelou"], (msg) =>
  msg.reply.text("Ya empezaron a joder...")
);

bot.on("/ping", (msg) => msg.reply.text("Pong!"));

bot.on("/chatid", (msg) =>
  msg.reply.text("El ID de este chat es " + msg.chat.id, { asReply: true })
);

bot.on(/^\/say (.+)$/, (msg, props) => {
  const text = props.match[1];
  console.log(msg);
  return bot.sendMessage(msg.chat.id, text, { replyToMessage: msg.message_id });
});

// my username is currently hardcoded
bot.on("/quit", (msg) => {
  console.log(msg.from);
  if (msg.from.username === "m4ss1ck") {
    return bot.leaveChat(msg.chat.id);
  }
});

// Función reemplazar
// TODO: que funcione con caracteres especiales
bot.on(/^\/s\/(.+)\/(.+)/, (msg, props) => {
  const oldm = props.match[1];
  const newm = props.match[2];
  const text =
    '<b>En realidad quisiste decir:</b> \n\n"' +
    msg.reply_to_message.text.replace(oldm, newm) +
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

//Funciones del tipo "nudes", "beso"...

bot.on("text", (msg) => {
  console.log(msg.reply_to_message);
  if (msg.text.match(/^(nud(e|es))$/i)) {
    return bot.sendMessage(
      msg.chat.id,
      "@" +
        msg.from.username +
        " le envía su <b>colección de nudes</b> a @" +
        msg.reply_to_message.from.username,
      { parseMode: "html" }
    );
  }
  if (msg.text.match(/^(pinga|penga)$/i)) {
    return bot.sendMessage(
      msg.chat.id,
      "@" +
        msg.from.username +
        " <em>cariñosamente</em> manda <b>pa' la pinga</b> a @" +
        msg.reply_to_message.from.username,

      { parseMode: "html" }
    );
  }
});

bot.start();
