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

// Función reemplazar
// TODO: que funcione con caracteres especiales
bot.on(/^\/s\/(.+)\/(.+)/, (msg, props) => {
  const oldm = props.match[1];
  const newm = props.match[2];
  const text =
    'En realidad quisiste decir: \n"' +
    msg.reply_to_message.text.replace(oldm, newm) +
    '"';
  //console.log(msg.reply_to_message);
  return bot.sendMessage(msg.chat.id, text, {
    replyToMessage: msg.reply_to_message.message_id,
  });
});

//Funciones del tipo "nudes", "beso"...

bot.on(["nude", "Nude", "Nudes", "nudes"], (msg) => {
  const victim = msg.reply_to_message.username;
  const agressor = msg.from.username;
  const text = agressor + " le envía su colección de nudes a " + victim;
  console.log(text);
  return msg.reply.text(text);
});

bot.start();
